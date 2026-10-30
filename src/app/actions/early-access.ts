"use server";

import { headers } from "next/headers";
import { earlyAccessSchema, fromFormData, type EarlyAccessField } from "@/lib/early-access/schema";
import { createRateLimiter, looksLikeSpam } from "@/lib/early-access/spam";
import { getEnquiryStore } from "@/lib/early-access/store";

export type EarlyAccessState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<EarlyAccessField, string>> }
  | { status: "error"; message: string }
  | { status: "sent"; interest: string };

// Five submissions per address every ten minutes.
const allow = createRateLimiter(5, 10 * 60 * 1000);

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

  // Spam: answer as if it worked, so bots learn nothing, but store nothing.
  if (looksLikeSpam(form)) return { status: "sent", interest: parsed.data.interest };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(ip)) {
    return { status: "error", message: "Too many attempts from this connection. Please wait a few minutes and try again." };
  }

  const store = getEnquiryStore();
  if (!store) {
    return { status: "error", message: "Sign-ups aren’t open just yet. Please try again soon." };
  }
  await store.save(parsed.data);
  return { status: "sent", interest: parsed.data.interest };
}
