"use server";

import { headers } from "next/headers";
import { bookingConfig } from "@/config/booking";
import { availableSlots, isBookable, type Slot } from "@/lib/booking/slots";
import { detailsFromFormData, detailsSchema, startFromFormData, startSchema, type EarlyAccessField } from "@/lib/early-access/schema";
import { createRateLimiter, looksLikeSpam } from "@/lib/early-access/spam";
import { getEnquiryStore } from "@/lib/early-access/store";
import { notifyOwner } from "@/lib/services/email";
import { passesTurnstile } from "@/lib/services/turnstile";

export type EarlyAccessState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<EarlyAccessField, string>> }
  | { status: "error"; message: string }
  /** Step 1 saved; step 2 can add details to enquiry `id`. */
  | { status: "started"; id: string; email: string; interest: string }
  | { status: "sent"; interest: string; slotLabel?: string };

// Ten requests per address every ten minutes (covers both steps).
const allow = createRateLimiter(10, 10 * 60 * 1000);

const ipAddress = async () => (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

function errorsFrom(issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>) {
  const errors: Partial<Record<EarlyAccessField, string>> = {};
  for (const issue of issues) errors[issue.path[0] as EarlyAccessField] ??= issue.message;
  return errors;
}

/** Real free call slots: configured hours minus anything already booked. */
export async function getCallSlots(): Promise<Slot[]> {
  const store = await getEnquiryStore();
  const now = new Date();
  const booked = store ? await store.bookedSlots(now.toISOString()) : [];
  return availableSlots(now, bookingConfig, booked);
}

/** Step 1: email, what they'd like and optional marketing consent. Saved straight away. */
export async function startEnquiry(_prev: EarlyAccessState, form: FormData): Promise<EarlyAccessState> {
  const parsed = startSchema.safeParse(startFromFormData(form));
  if (!parsed.success) return { status: "invalid", errors: errorsFrom(parsed.error.issues) };
  const data = parsed.data;

  // Spam: answer as if it worked, so bots learn nothing, but store nothing.
  if (looksLikeSpam(form)) return { status: "started", id: crypto.randomUUID(), email: data.email, interest: data.interest };

  const ip = await ipAddress();
  if (!allow(ip)) return { status: "error", message: "Too many attempts from this connection. Please wait a few minutes and try again." };
  const token = form.get("cf-turnstile-response");
  if (!(await passesTurnstile(typeof token === "string" ? token : null, ip))) {
    return { status: "error", message: "We couldn’t confirm you’re not a robot. Please try again." };
  }

  const store = await getEnquiryStore();
  if (!store) return { status: "error", message: "Sign-ups aren’t open just yet. Please try again soon." };

  try {
    const { id } = await store.start(data);
    await notifyOwner(`New Safe Kitchen ${data.interest.replace("_", " ")}: ${data.email}`, [
      `Email: ${data.email}`,
      `Interest: ${data.interest}`,
      `Marketing updates: ${data.marketing ? "yes (consent recorded)" : "no"}`,
      "Business details follow if they complete step 2.",
    ]);
    return { status: "started", id, email: data.email, interest: data.interest };
  } catch {
    return { status: "error", message: "Something went wrong saving your details. Please try again in a moment." };
  }
}

/** Step 2: business details, and the call slot for "Book a call". */
export async function completeEnquiry(_prev: EarlyAccessState, form: FormData): Promise<EarlyAccessState> {
  const parsed = detailsSchema.safeParse(detailsFromFormData(form));
  if (!parsed.success) return { status: "invalid", errors: errorsFrom(parsed.error.issues) };
  const data = parsed.data;

  const ip = await ipAddress();
  if (!allow(ip)) return { status: "error", message: "Too many attempts from this connection. Please wait a few minutes and try again." };

  const store = await getEnquiryStore();
  if (!store) return { status: "error", message: "Sign-ups aren’t open just yet. Please try again soon." };

  const now = new Date();
  let slotLabel: string | undefined;
  if (data.interest === "call" && data.slot) {
    const booked = await store.bookedSlots(now.toISOString());
    if (!isBookable(data.slot, now, bookingConfig, booked)) {
      return { status: "invalid", errors: { slot: "That time has just been taken. Please choose another." } };
    }
    const slot = availableSlots(now, bookingConfig, booked).find((s) => s.start === new Date(data.slot).toISOString());
    slotLabel = slot ? `${slot.dayLabel} at ${slot.timeLabel}` : undefined;
  }

  try {
    // Unknown id (for example after a spam-filtered step 1): answer as if it worked, store nothing.
    if (!(await store.complete(data))) return { status: "sent", interest: data.interest };
    if (data.interest === "call" && data.slot && !(await store.bookSlot(new Date(data.slot).toISOString(), data.id))) {
      return { status: "invalid", errors: { slot: "That time has just been taken. Please choose another." } };
    }
    await notifyOwner(`Safe Kitchen ${data.interest.replace("_", " ")} details: ${data.business || data.name}`, [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Business: ${data.business || "(not given)"} (${data.businessType}, ${data.sites} sites)`,
      `Interest: ${data.interest}${slotLabel ? `, call booked for ${slotLabel} (UK time)` : ""}`,
      data.message ? `Message: ${data.message}` : "",
    ]);
  } catch {
    return { status: "error", message: "Something went wrong saving your details. Please try again in a moment." };
  }
  return { status: "sent", interest: data.interest, slotLabel };
}
