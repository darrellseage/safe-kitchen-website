"use server";

import { headers } from "next/headers";
import { bookingConfig } from "@/config/booking";
import { availableSlots, isBookable, type Slot } from "@/lib/booking/slots";
import { earlyAccessSchema, fromFormData, type EarlyAccessField } from "@/lib/early-access/schema";
import { createRateLimiter, looksLikeSpam } from "@/lib/early-access/spam";
import { getEnquiryStore } from "@/lib/early-access/store";
import { notifyOwner } from "@/lib/services/email";
import { passesTurnstile } from "@/lib/services/turnstile";

export type EarlyAccessState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<EarlyAccessField, string>> }
  | { status: "error"; message: string }
  | { status: "sent"; interest: string; slotLabel?: string };

// Five submissions per address every ten minutes.
const allow = createRateLimiter(5, 10 * 60 * 1000);

/** Real free call slots: configured hours minus anything already booked. */
export async function getCallSlots(): Promise<Slot[]> {
  const store = await getEnquiryStore();
  const now = new Date();
  const booked = store ? await store.bookedSlots(now.toISOString()) : [];
  return availableSlots(now, bookingConfig, booked);
}

export async function submitEarlyAccess(_prev: EarlyAccessState, form: FormData): Promise<EarlyAccessState> {
  const parsed = earlyAccessSchema.safeParse(fromFormData(form));
  if (!parsed.success) {
    const errors: Partial<Record<EarlyAccessField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as EarlyAccessField;
      errors[field] ??= issue.message;
    }
    return { status: "invalid", errors };
  }
  const data = parsed.data;

  // Spam: answer as if it worked, so bots learn nothing, but store nothing.
  if (looksLikeSpam(form)) return { status: "sent", interest: data.interest };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(ip)) {
    return { status: "error", message: "Too many attempts from this connection. Please wait a few minutes and try again." };
  }
  const token = form.get("cf-turnstile-response");
  if (!(await passesTurnstile(typeof token === "string" ? token : null, ip))) {
    return { status: "error", message: "We couldn’t confirm you’re not a robot. Please try again." };
  }

  const store = await getEnquiryStore();
  if (!store) {
    return { status: "error", message: "Sign-ups aren’t open just yet. Please try again soon." };
  }

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
    const record = await store.save(data);
    if (data.interest === "call" && data.slot && !(await store.bookSlot(new Date(data.slot).toISOString(), record.id))) {
      return { status: "invalid", errors: { slot: "That time has just been taken. Please choose another." } };
    }
    await notifyOwner(`New Safe Kitchen ${data.interest.replace("_", " ")}: ${data.business}`, [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Business: ${data.business} (${data.businessType}, ${data.sites} sites)`,
      `Interest: ${data.interest}${slotLabel ? `, call booked for ${slotLabel} (UK time)` : ""}`,
      `Marketing updates: ${data.marketing ? "yes" : "no"}`,
      data.message ? `Message: ${data.message}` : "",
    ]);
  } catch {
    return { status: "error", message: "Something went wrong saving your details. Please try again in a moment." };
  }
  return { status: "sent", interest: data.interest, slotLabel };
}
