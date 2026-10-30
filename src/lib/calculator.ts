/**
 * Paperwork time estimate (homepage Section 7). Uses only the visitor's own
 * figures; it never predicts savings.
 */
export type CalculatorInput = {
  sites: number;
  minutesPerDay: number;
  daysPerWeek: number;
  hourlyCost: number;
};

export type CalculatorResult = {
  hoursPerWeek: number;
  hoursPerYear: number;
  costPerYear: number;
};

export const calculatorLimits = {
  sites: { min: 1, max: 50 },
  minutesPerDay: { min: 0, max: 480 },
  daysPerWeek: { min: 1, max: 7 },
  hourlyCost: { min: 0, max: 200 },
} as const satisfies Record<keyof CalculatorInput, { min: number; max: number }>;

export const calculatorExample: CalculatorInput = { sites: 1, minutesPerDay: 30, daysPerWeek: 6, hourlyCost: 13 };

export const WEEKS_PER_YEAR = 52;

/** Keeps a value inside its allowed range; anything unreadable becomes the minimum. */
export function clampInput(key: keyof CalculatorInput, value: number): number {
  const { min, max } = calculatorLimits[key];
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function estimatePaperwork(input: CalculatorInput): CalculatorResult {
  const sites = clampInput("sites", input.sites);
  const minutes = clampInput("minutesPerDay", input.minutesPerDay);
  const days = clampInput("daysPerWeek", input.daysPerWeek);
  const rate = clampInput("hourlyCost", input.hourlyCost);
  const hoursPerWeek = (sites * minutes * days) / 60;
  const hoursPerYear = hoursPerWeek * WEEKS_PER_YEAR;
  return { hoursPerWeek, hoursPerYear, costPerYear: hoursPerYear * rate };
}
