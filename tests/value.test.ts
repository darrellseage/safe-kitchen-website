import { describe, expect, it } from "vitest";
import {
  attendanceCost,
  combinedValue,
  minutesPerWeekToCover,
  orderingReduction,
  revenueAtRisk,
  timeValue,
  trainingComparison,
  wasteReduction,
} from "@/lib/value";

describe("sales calculators match the brief's worked examples", () => {
  it("revenue at risk: £6,000 a week at 5% is £15,600 a year", () => {
    expect(revenueAtRisk(6000, 5)).toBe(15600);
  });
  it("training: separate £24 courses against the £149.99 annual plan", () => {
    expect(trainingComparison(10, 24)).toEqual({ separate: 240, plan: 149.99, difference: 90.01 });
    expect(trainingComparison(20, 24).difference).toBe(330.01);
    expect(trainingComparison(30, 24).difference).toBe(570.01);
    expect(trainingComparison(50, 24).difference).toBe(1050.01);
  });
  it("ordering: £5,000 a week at 2% is £5,200 a year", () => {
    expect(orderingReduction(5000, 2)).toBe(5200);
  });
  it("waste: 10% of £10,000 is £1,000", () => {
    expect(wasteReduction(10000, 10)).toBe(1000);
  });
  it("time value at £15 an hour over 260 days", () => {
    expect(timeValue(10, 15)).toBe(650);
    expect(timeValue(20, 15)).toBe(1300);
    expect(timeValue(30, 15)).toBe(1950);
  });
  it("about 12 minutes a week at £15 an hour covers the £149.99 annual plan", () => {
    const minutes = minutesPerWeekToCover(149.99, 15);
    expect(minutes).toBeGreaterThan(11.5);
    expect(minutes).toBeLessThanOrEqual(12);
  });
  it("attendance: 2 hours a week at £15 is £1,560 a year", () => {
    expect(attendanceCost(2, 15)).toBe(1560);
  });
});

describe("combined value", () => {
  const inputs = {
    sites: 1,
    staffTrainedPerYear: 10,
    coursePrice: 24,
    minutesSavedPerDay: 10,
    hourlyCost: 15,
    weeklyPurchasing: 5000,
    percentAvoidable: 2,
    annualWasteCost: 10000,
    percentWasteReduction: 10,
  };
  it("counts purchasing and waste once (the larger), never both", () => {
    const r = combinedValue(inputs);
    expect(r.purchasingAndWaste).toBe(5200);
    expect(r.total).toBe(240 + 650 + 5200);
    expect(r.net).toBe(r.total - 149.99);
  });
  it("scales per-site figures and the subscription by site, but not the training headcount", () => {
    const r = combinedValue({ ...inputs, sites: 2 });
    expect(r.subscription).toBe(299.98);
    expect(r.time).toBe(1300);
    expect(r.training).toBe(240);
  });
  it("treats blank or negative inputs as zero", () => {
    const r = combinedValue({ ...inputs, weeklyPurchasing: Number.NaN, annualWasteCost: -5 });
    expect(r.purchasingAndWaste).toBe(0);
  });
});
