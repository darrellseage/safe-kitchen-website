import { z } from "zod";

export const businessTypes = [
  { value: "takeaway", label: "Takeaway" },
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Café" },
  { value: "pub", label: "Pub serving food" },
  { value: "hotel", label: "Hotel kitchen" },
  { value: "other", label: "Something else" },
] as const;

export const siteCounts = [
  { value: "1", label: "1 site" },
  { value: "2-5", label: "2 to 5 sites" },
  { value: "6+", label: "6 or more sites" },
] as const;

export const interests = [
  { value: "early_access", label: "Join early access" },
  { value: "demo", label: "Request a demo" },
  { value: "call", label: "Book a call" },
] as const;

const values = <T extends ReadonlyArray<{ value: string }>>(list: T) =>
  list.map((item) => item.value) as [T[number]["value"], ...T[number]["value"][]];

/**
 * Wording shown next to the optional product-updates box. Saved with each
 * consent so we can show exactly what someone agreed to (UK GDPR, PECR).
 * Change the version whenever the wording changes.
 */
export const MARKETING_CONSENT = {
  version: "2026-11-01",
  text: "Also send me occasional Safe Kitchen product news by email. You can unsubscribe at any time.",
} as const;

const email = z.string().trim().toLowerCase().max(254, "Email must be 254 characters or fewer").pipe(z.email("Enter an email address like name@example.co.uk"));

/** Step 1: what someone wants and how to reach them. Saved as soon as it's sent (owner decision 1 Nov 2026). */
export const startSchema = z.object({
  email,
  interest: z.enum(values(interests), { error: "Choose what you’d like" }),
  marketing: z.boolean().default(false),
});

/** Step 2: about the business. Optional for early access; needed to arrange a demo or call. */
export const detailsSchema = z.object({
  id: z.uuid("Something went wrong. Please start again."),
  email,
  name: z.string().trim().min(1, "Enter your name").max(100, "Name must be 100 characters or fewer"),
  business: z.string().trim().max(120, "Business name must be 120 characters or fewer").optional().default(""),
  businessType: z.enum(values(businessTypes), { error: "Choose your type of business" }),
  sites: z.enum(values(siteCounts), { error: "Choose how many sites you have" }),
  interest: z.enum(values(interests), { error: "Choose what you’d like" }),
  message: z.string().trim().max(1000, "Message must be 1,000 characters or fewer").optional().default(""),
  /** Chosen call slot (ISO start time), only for "Book a call". Checked against real availability on the server. */
  slot: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine((v) => v === "" || !Number.isNaN(Date.parse(v)), "Choose a time from the list"),
});

export type StartInput = z.infer<typeof startSchema>;
export type DetailsInput = z.infer<typeof detailsSchema>;
export type StartField = keyof StartInput;
export type DetailsField = keyof DetailsInput;
export type EarlyAccessField = StartField | DetailsField;

const text = (form: FormData, key: string) => {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
};

/** Turns submitted step-1 form data into the shape the schema expects. */
export function startFromFormData(form: FormData) {
  return { email: text(form, "email"), interest: text(form, "interest"), marketing: form.get("marketing") === "on" };
}

/** Turns submitted step-2 form data into the shape the schema expects. */
export function detailsFromFormData(form: FormData) {
  return {
    id: text(form, "id"),
    email: text(form, "email"),
    name: text(form, "name"),
    business: text(form, "business"),
    businessType: text(form, "businessType"),
    sites: text(form, "sites"),
    interest: text(form, "interest"),
    message: text(form, "message"),
    slot: text(form, "slot"),
  };
}
