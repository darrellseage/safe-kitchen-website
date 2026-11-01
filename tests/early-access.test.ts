import { describe, expect, it } from "vitest";
import { detailsSchema, MARKETING_CONSENT, startFromFormData, startSchema } from "@/lib/early-access/schema";
import { createRateLimiter, looksLikeSpam, MIN_FILL_MS } from "@/lib/early-access/spam";
import { memoryEnquiry, memoryStore } from "@/lib/early-access/store";

const start = { email: "Sam@Example.co.uk", interest: "demo", marketing: false };
const details = {
  id: "0b7d2c1e-6f4a-4c3b-9a8e-1d2f3a4b5c6d",
  email: "sam@example.co.uk",
  name: "Sam Patel",
  business: "",
  businessType: "takeaway",
  sites: "1",
  interest: "demo",
  message: "",
  slot: "",
};

function form(fields: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

describe("step 1 (startSchema)", () => {
  it("needs only an email and a choice, and stores the email in lower case", () => {
    const r = startSchema.safeParse(start);
    expect(r.success).toBe(true);
    expect(r.data?.email).toBe("sam@example.co.uk");
  });

  it("explains an invalid email or choice", () => {
    const r = startSchema.safeParse({ ...start, email: "not-an-email", interest: "castle" });
    expect(r.success).toBe(false);
    expect(r.error?.issues.map((i) => i.path[0])).toEqual(expect.arrayContaining(["email", "interest"]));
  });

  it("leaves marketing off unless the box is ticked", () => {
    expect(startFromFormData(form({ ...start, marketing: "" })).marketing).toBe(false);
    expect(startFromFormData(form({ ...start, marketing: "on" })).marketing).toBe(true);
  });
});

describe("step 2 (detailsSchema)", () => {
  it("accepts details with no business name", () => {
    expect(detailsSchema.safeParse(details).success).toBe(true);
  });
  it("explains each missing field", () => {
    const r = detailsSchema.safeParse({ ...details, name: " ", businessType: "castle", sites: "" });
    expect(r.success).toBe(false);
    expect(r.error?.issues.map((i) => i.path[0])).toEqual(expect.arrayContaining(["name", "businessType", "sites"]));
  });
});

describe("two-step enquiry store", () => {
  it("saves step 1 straight away, with marketing consent recorded only when given", async () => {
    const a = await memoryStore.start({ email: "a@example.co.uk", interest: "early_access", marketing: true });
    const b = await memoryStore.start({ email: "b@example.co.uk", interest: "early_access", marketing: false });
    expect(memoryEnquiry(a.id)?.marketingConsent).toMatchObject({ version: MARKETING_CONSENT.version, text: MARKETING_CONSENT.text });
    expect(memoryEnquiry(b.id)?.marketingConsent).toBeNull();
    expect(memoryEnquiry(b.id)?.completedAt).toBeNull();
  });

  it("adds step 2 only when the id and email match", async () => {
    const { id } = await memoryStore.start({ email: "c@example.co.uk", interest: "demo", marketing: false });
    expect(await memoryStore.complete({ ...detailsSchema.parse(details), id, email: "someone@else.co.uk" })).toBe(false);
    expect(await memoryStore.complete({ ...detailsSchema.parse(details), id, email: "c@example.co.uk" })).toBe(true);
    expect(memoryEnquiry(id)?.details?.name).toBe("Sam Patel");
    expect(memoryEnquiry(id)?.completedAt).not.toBeNull();
  });
});

describe("spam checks", () => {
  const now = 1_000_000;
  it("flags a filled honeypot field", () => {
    expect(looksLikeSpam(form({ website: "http://spam", started: String(now - 10_000) }), now)).toBe(true);
  });
  it("flags forms submitted faster than a person could", () => {
    expect(looksLikeSpam(form({ website: "", started: String(now - MIN_FILL_MS + 1) }), now)).toBe(true);
  });
  it("accepts a normal submission", () => {
    expect(looksLikeSpam(form({ website: "", started: String(now - 20_000) }), now)).toBe(false);
  });
  it("rate-limits repeated submissions from one address", () => {
    const allow = createRateLimiter(2, 60_000);
    expect(allow("ip", 0)).toBe(true);
    expect(allow("ip", 1)).toBe(true);
    expect(allow("ip", 2)).toBe(false);
    expect(allow("ip", 60_001)).toBe(true);
  });
});
