/** Scheduled vs actual time (Clock-In & Attendance demo). Times are "HH:MM". */

export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Minutes after the scheduled start; 0 if on time or early. */
export function minutesLate(scheduled: string, actual: string): number {
  return Math.max(0, toMinutes(actual) - toMinutes(scheduled));
}

/** Difference between actual and scheduled hours, rounded to 0.1, with a sign. */
export function hoursDifference(scheduled: number, actual: number): string {
  const diff = Math.round((actual - scheduled) * 10) / 10;
  if (diff === 0) return "0.0 h";
  return `${diff > 0 ? "+" : "−"}${Math.abs(diff).toFixed(1)} h`;
}
