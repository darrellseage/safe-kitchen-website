import { describe, expect, it } from "vitest";
import { earlyAccessSchema, fromFormData } from "@/lib/early-access/schema";
import { createRateLimiter, looksLikeSpam, MIN_FILL_MS } from "@/lib/early-access/spam";

const valid = {
  name: "Sam Patel",
  email: "sam@example.co.uk",
  business: "Sam’s Kitchen",
  businessType: "takeaway",
  sites: "1",
  interest: "demo",
  message: "",
  marketing: false,
};

function form(fields: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

describe("earlyAccessSchema", () => {
  it("accepts a complete enquiry", () => {
    expect(earlyAccessSchema.safeParse(valid).success).toBe(true);
  });

  it("explains each missing or invalid field", () => {
    const r = earlyAccessSchema.safeParse({ ...valid, name: " ", email: "not-an-email", businessType: "castle" });
    expect(r.success).toBe(false);
    const fields = r.error?.issues.map((i) => i.path[0]);
    expect(fields).toEqual(expect.arrayContaining(["name", "email", "businessType"]));
  });

  it("leaves marketing off unless the box is ticked", () => {
    expect(fromFormData(form({ ...valid, marketing: "" })).marketing).toBe(false);
    expect(fromFormData(form({ ...valid, marketing: "on" })).marketing).toBe(true);
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
