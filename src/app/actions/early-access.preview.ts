/**
 * Stand-in for ./early-access.ts in the private static preview, which has no
 * server. It behaves like the real form for review purposes but saves nothing.
 * Selected by next.config.ts when PREVIEW_EXPORT=1.
 */
import { bookingConfig } from "@/config/booking";
import { availableSlots, type Slot } from "@/lib/booking/slots";
import { detailsFromFormData, detailsSchema, startFromFormData, startSchema, type EarlyAccessField } from "@/lib/early-access/schema";

export type EarlyAccessState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<EarlyAccessField, string>> }
  | { status: "error"; message: string }
  | { status: "started"; id: string; email: string; interest: string }
  | { status: "sent"; interest: string; slotLabel?: string };

function errorsFrom(issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>) {
  const errors: Partial<Record<EarlyAccessField, string>> = {};
  for (const issue of issues) errors[issue.path[0] as EarlyAccessField] ??= issue.message;
  return errors;
}

export async function getCallSlots(): Promise<Slot[]> {
  return availableSlots(new Date(), bookingConfig);
}

export async function startEnquiry(_prev: EarlyAccessState, form: FormData): Promise<EarlyAccessState> {
  const parsed = startSchema.safeParse(startFromFormData(form));
  if (!parsed.success) return { status: "invalid", errors: errorsFrom(parsed.error.issues) };
  return { status: "started", id: crypto.randomUUID(), email: parsed.data.email, interest: parsed.data.interest };
}

export async function completeEnquiry(_prev: EarlyAccessState, form: FormData): Promise<EarlyAccessState> {
  const parsed = detailsSchema.safeParse(detailsFromFormData(form));
  if (!parsed.success) return { status: "invalid", errors: errorsFrom(parsed.error.issues) };
  const slot = parsed.data.slot ? availableSlots(new Date(), bookingConfig).find((s) => s.start === new Date(parsed.data.slot).toISOString()) : undefined;
  return { status: "sent", interest: parsed.data.interest, slotLabel: slot ? `${slot.dayLabel} at ${slot.timeLabel}` : undefined };
}
