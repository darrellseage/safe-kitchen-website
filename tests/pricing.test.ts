import { describe, expect, it } from "vitest";
import { annualSaving, formatGBP, pricing } from "@/config/pricing";

describe("pricing", () => {
  it("matches the owner's decision (D-074)", () => {
    expect(pricing.monthly).toBe(14.99);
    expect(pricing.annual).toBe(149.99);
    expect(pricing.includes).toContain("Unlimited staff");
  });
  it("works out the annual saving to the penny", () => {
    expect(annualSaving(pricing.monthly, pricing.annual)).toBe(29.89);
    expect(formatGBP(29.89)).toBe("£29.89");
  });
});
