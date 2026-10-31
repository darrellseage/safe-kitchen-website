/**
 * Stand-in for ./early-access.ts in the private static preview, which has no
 * server. It behaves like the real form for review purposes but saves nothing.
 * Selected by next.config.ts when PREVIEW_EXPORT=1.
 */
import { bookingConfig } from "@/config/booking";
import { availableSlots, type Slot } from "@/lib/booking/slots";
import { earlyAccessSchema, fromFormData, type EarlyAccessField } from "@/lib/early-access/schema";

export type EarlyAccessState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<EarlyAccessField, string>> }
  | { status: "error"; message: string }
  | { status: "sent"; interest: string; slotLabel?: string };

export async function getCallSlots(): Promise<Slot[]> {
  return availableSlots(new Date(), bookingConfig);
}

export async function submitEarlyAccess(_prev: EarlyAccessState, form: FormData): Promise<EarlyAccessState> {
  const parsed = earlyAccessSchema.safeParse(fromFormData(form));
  if (!parsed.success) {
    const errors: Partial<Record<EarlyAccessField, string>> = {};
    for (const issue of parsed.error.issues) errors[issue.path[0] as EarlyAccessField] ??= issue.message;
    return { status: "invalid", errors };
  }
  const slot = parsed.data.slot ? availableSlots(new Date(), bookingConfig).find((s) => s.start === new Date(parsed.data.slot).toISOString()) : undefined;
  return { status: "sent", interest: parsed.data.interest, slotLabel: slot ? `${slot.dayLabel} at ${slot.timeLabel}` : undefined };
}
