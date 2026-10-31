import type { BookingConfig } from "@/config/booking";

export type Slot = { start: string; dayLabel: string; timeLabel: string };

/** Minutes the time zone is ahead of UTC at a given moment (e.g. 60 in BST). */
function offsetMinutes(at: Date, timeZone: string): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return Math.round((asUtc - Math.floor(at.getTime() / 60000) * 60000) / 60000);
}

/** Converts a wall-clock time in the time zone to a UTC Date. */
export function zonedToUtc(year: number, month: number, day: number, hour: number, minute: number, timeZone: string): Date {
  const guess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const first = new Date(guess.getTime() - offsetMinutes(guess, timeZone) * 60000);
  return new Date(guess.getTime() - offsetMinutes(first, timeZone) * 60000);
}

/** The calendar date (year, month, day, weekday) in the time zone. */
function zonedDate(at: Date, timeZone: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
  return { year: +parts.year, month: +parts.month, day: +parts.day, weekday };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Every free slot from `now` within the booking window, excluding booked start times (ISO). */
export function availableSlots(now: Date, config: BookingConfig, booked: Iterable<string> = []): Slot[] {
  const taken = new Set([...booked].map((b) => new Date(b).toISOString()));
  const earliest = now.getTime() + config.minNoticeHours * 3600000;
  const slots: Slot[] = [];
  const dayFmt = new Intl.DateTimeFormat("en-GB", { timeZone: config.timeZone, weekday: "long", day: "numeric", month: "long" });
  const timeFmt = new Intl.DateTimeFormat("en-GB", { timeZone: config.timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  for (let d = 0; d <= config.daysAhead; d++) {
    const date = zonedDate(new Date(now.getTime() + d * 86400000), config.timeZone);
    for (const [from, to] of config.weekly[date.weekday] ?? []) {
      for (let m = toMinutes(from); m + config.slotMinutes <= toMinutes(to); m += config.slotMinutes) {
        const start = zonedToUtc(date.year, date.month, date.day, Math.floor(m / 60), m % 60, config.timeZone);
        const iso = start.toISOString();
        if (start.getTime() < earliest || taken.has(iso)) continue;
        if (slots.some((s) => s.start === iso)) continue;
        slots.push({ start: iso, dayLabel: dayFmt.format(start), timeLabel: timeFmt.format(start) });
      }
    }
  }
  return slots;
}

/** True when a requested start time is one of the currently free slots. */
export function isBookable(startIso: string, now: Date, config: BookingConfig, booked: Iterable<string> = []): boolean {
  const t = new Date(startIso);
  if (Number.isNaN(t.getTime())) return false;
  return availableSlots(now, config, booked).some((s) => s.start === t.toISOString());
}
