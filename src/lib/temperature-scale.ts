/**
 * Maths for the demo temperature slider. A scale is an input range only:
 * it is never a safety limit (app DESIGN_SYSTEM.md §11.1a).
 */
export type Scale = { min: number; max: number };

/** Readings typed on the keypad may go beyond the scale, within reason. */
export const TYPED_RANGE: Scale = { min: -50, max: 150 };

export const roundTenth = (n: number) => Math.round(n * 10) / 10;

export function clampToScale(value: number, scale: Scale): number {
  return roundTenth(Math.min(scale.max, Math.max(scale.min, value)));
}

/** Converts a tap position (0 = coldest end, 1 = warmest) to a reading. */
export function valueAtPosition(position: number, scale: Scale): number {
  const p = Math.min(1, Math.max(0, position));
  return clampToScale(scale.min + p * (scale.max - scale.min), scale);
}

/** Where a reading sits on the scale (0 to 1). Values beyond it sit at the ends. */
export function positionOfValue(value: number, scale: Scale): number {
  return Math.min(1, Math.max(0, (value - scale.min) / (scale.max - scale.min)));
}

/** Parses keypad input such as "3.4", "-18" or "−18,5". Returns null if unreadable. */
export function parseReading(text: string): number | null {
  const cleaned = text.trim().replace(/[−–]/g, "-").replace(",", ".");
  if (!/^-?\d{1,3}(\.\d)?$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return n < TYPED_RANGE.min || n > TYPED_RANGE.max ? null : n;
}

/** Formats with a proper minus sign and one decimal place. */
export function formatReading(value: number): string {
  const fixed = Math.abs(value).toFixed(1);
  return value < 0 && fixed !== "0.0" ? `−${fixed}` : fixed;
}
