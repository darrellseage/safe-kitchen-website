import { describe, expect, it } from "vitest";
import { annualSaving, foundingOffer, formatGBP, pricing, sitesCost, withVat } from "@/config/pricing";

describe("pricing", () => {
  it("matches the owner's decision (D-074)", () => {
    expect(pricing.monthly).toBe(14.99);
    expect(pricing.annual).toBe(149.99);
    expect(pricing.includes).toContain("Unlimited staff");
    expect(pricing.neverPay).toContain("Set-up fees");
  });
  it("works out the annual saving to the penny", () => {
    expect(annualSaving(pricing.monthly, pricing.annual)).toBe(29.89);
    expect(formatGBP(29.89)).toBe("£29.89");
  });
  it("shows the owner's VAT-inclusive prices (1 Nov 2026)", () => {
    expect(withVat(pricing.monthly)).toBe(17.99);
    expect(withVat(pricing.annual)).toBe(179.99);
  });
  it("works out a multi-site example", () => {
    expect(sitesCost(3)).toBe(44.97);
  });
  it("keeps the founding offer to 100 and hidden unless switched on", () => {
    expect(foundingOffer.limit).toBe(100);
    expect(foundingOffer.announce).toBe(false);
  });
});
