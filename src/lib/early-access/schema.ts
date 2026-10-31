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

/** Shared by the browser form and the server action. */
export const earlyAccessSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100, "Name must be 100 characters or fewer"),
  email: z.string().trim().max(254, "Email must be 254 characters or fewer").pipe(z.email("Enter an email address like name@example.co.uk")),
  business: z.string().trim().min(1, "Enter your business name").max(120, "Business name must be 120 characters or fewer"),
  businessType: z.enum(values(businessTypes), { error: "Choose your type of business" }),
  sites: z.enum(values(siteCounts), { error: "Choose how many sites you have" }),
  interest: z.enum(values(interests), { error: "Choose what you’d like" }),
  message: z.string().trim().max(1000, "Message must be 1,000 characters or fewer").optional().default(""),
  marketing: z.boolean().default(false),
  /** Chosen call slot (ISO start time), only for "Book a call". Checked against real availability on the server. */
  slot: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine((v) => v === "" || !Number.isNaN(Date.parse(v)), "Choose a time from the list"),
});

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;
export type EarlyAccessField = keyof EarlyAccessInput;

/** Turns submitted form data into the shape the schema expects. */
export function fromFormData(form: FormData) {
  const text = (key: string) => {
    const value = form.get(key);
    return typeof value === "string" ? value : "";
  };
  return {
    name: text("name"),
    email: text("email"),
    business: text("business"),
    businessType: text("businessType"),
    sites: text("sites"),
    interest: text("interest"),
    message: text("message"),
    marketing: form.get("marketing") === "on",
    slot: text("slot"),
  };
}
