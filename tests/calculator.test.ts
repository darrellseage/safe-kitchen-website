import { describe, expect, it } from "vitest";
import { calculatorExample, clampInput, estimatePaperwork } from "@/lib/calculator";

describe("estimatePaperwork", () => {
  it("multiplies sites, minutes and days into weekly and yearly hours", () => {
    const r = estimatePaperwork(calculatorExample);
    expect(r.hoursPerWeek).toBe(3);
    expect(r.hoursPerYear).toBe(156);
    expect(r.costPerYear).toBe(2028);
  });

  it("scales with the number of sites", () => {
    const r = estimatePaperwork({ ...calculatorExample, sites: 3 });
    expect(r.hoursPerYear).toBe(468);
  });

  it("clamps out-of-range and unreadable values instead of producing nonsense", () => {
    expect(clampInput("daysPerWeek", 12)).toBe(7);
    expect(clampInput("sites", 0)).toBe(1);
    expect(clampInput("hourlyCost", Number.NaN)).toBe(0);
    expect(estimatePaperwork({ sites: -4, minutesPerDay: -10, daysPerWeek: 0, hourlyCost: -1 })).toEqual({
      hoursPerWeek: 0,
      hoursPerYear: 0,
      costPerYear: 0,
    });
  });
});
