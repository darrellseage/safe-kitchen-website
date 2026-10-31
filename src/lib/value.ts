/**
 * Illustrative business-value maths for the sales calculators. Every result is
 * an estimate from the visitor's own figures, never a promised saving.
 */
import { pricing } from "@/config/pricing";

export const WEEKS_PER_YEAR = 52;
export const WORKING_DAYS_PER_YEAR = 260;

const round2 = (n: number) => Math.round(n * 100) / 100;
const safe = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

/** Hypothetical annual revenue at risk: weekly turnover × % reduction × 52. */
export function revenueAtRisk(weeklyTurnover: number, percentReduction: number): number {
  return round2(safe(weeklyTurnover) * (safe(percentReduction) / 100) * WEEKS_PER_YEAR);
}

/** What buying a separate course for each person would cost, against the annual plan. */
export function trainingComparison(staff: number, coursePrice: number, annualPlan: number = pricing.annual) {
  const separate = round2(safe(staff) * safe(coursePrice));
  return { separate, plan: annualPlan, difference: round2(separate - annualPlan) };
}

/** Hypothetical annual purchasing reduction: weekly purchasing × % avoidable × 52. */
export function orderingReduction(weeklyPurchasing: number, percentAvoidable: number): number {
  return round2(safe(weeklyPurchasing) * (safe(percentAvoidable) / 100) * WEEKS_PER_YEAR);
}

/** Hypothetical annual food waste reduction: annual waste cost × % reduction. */
export function wasteReduction(annualWasteCost: number, percentReduction: number): number {
  return round2(safe(annualWasteCost) * (safe(percentReduction) / 100));
}

/** Value of management time: minutes per working day × 260 ÷ 60 × hourly cost. Not a cash payroll saving. */
export function timeValue(minutesPerDay: number, hourlyCost: number): number {
  return round2(((safe(minutesPerDay) * WORKING_DAYS_PER_YEAR) / 60) * safe(hourlyCost));
}

/** Minutes a week whose time value matches the annual plan at a given hourly cost. */
export function minutesPerWeekToCover(annualPlan: number, hourlyCost: number): number {
  return hourlyCost > 0 ? (annualPlan / hourlyCost / WEEKS_PER_YEAR) * 60 : 0;
}

/** Hypothetical annual cost of wrongly recorded paid hours: hours per week × hourly rate × 52. */
export function attendanceCost(hoursPerWeek: number, hourlyRate: number): number {
  return round2(safe(hoursPerWeek) * safe(hourlyRate) * WEEKS_PER_YEAR);
}

export type ValueInputs = {
  sites: number;
  staffTrainedPerYear: number;
  coursePrice: number;
  minutesSavedPerDay: number;
  hourlyCost: number;
  weeklyPurchasing: number;
  percentAvoidable: number;
  annualWasteCost: number;
  percentWasteReduction: number;
};

/**
 * Combined illustrative value. Purchasing and food waste reductions overlap
 * (over-ordering is a cause of waste), so only the larger of the two counts
 * towards the total.
 */
export function combinedValue(i: ValueInputs) {
  const sites = Math.max(1, Math.round(safe(i.sites)) || 1);
  const training = round2(safe(i.staffTrainedPerYear) * safe(i.coursePrice));
  const time = round2(timeValue(i.minutesSavedPerDay, i.hourlyCost) * sites);
  const ordering = round2(orderingReduction(i.weeklyPurchasing, i.percentAvoidable) * sites);
  const waste = round2(wasteReduction(i.annualWasteCost, i.percentWasteReduction) * sites);
  const purchasingAndWaste = Math.max(ordering, waste);
  const subscription = round2(pricing.annual * sites);
  const total = round2(training + time + purchasingAndWaste);
  return { sites, training, time, ordering, waste, purchasingAndWaste, subscription, total, net: round2(total - subscription) };
}
