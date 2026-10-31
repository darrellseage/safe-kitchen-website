import { describe, expect, it } from "vitest";
import { bookingConfig } from "@/config/booking";
import { availableSlots, isBookable, zonedToUtc } from "@/lib/booking/slots";

const config = { ...bookingConfig, weekly: { 2: [["14:00", "15:00"]] as Array<[string, string]> }, daysAhead: 14, minNoticeHours: 24 };

describe("UK time conversion", () => {
  it("handles GMT and BST", () => {
    expect(zonedToUtc(2026, 1, 13, 14, 0, "Europe/London").toISOString()).toBe("2026-01-13T14:00:00.000Z");
    expect(zonedToUtc(2026, 7, 14, 14, 0, "Europe/London").toISOString()).toBe("2026-07-14T13:00:00.000Z");
  });
});

describe("available call slots", () => {
  const now = new Date("2026-11-02T09:00:00Z"); // Monday 2 November 2026, 09:00 GMT

  it("offers only the configured hours, in 30-minute slots, after the notice period", () => {
    const slots = availableSlots(now, config);
    // Tuesday 3 Nov is within 24 hours for 14:00? 3 Nov 14:00 is 29 hours away, so it counts.
    expect(slots.map((s) => s.start)).toEqual([
      "2026-11-03T14:00:00.000Z",
      "2026-11-03T14:30:00.000Z",
      "2026-11-10T14:00:00.000Z",
      "2026-11-10T14:30:00.000Z",
      "2026-11-17T14:00:00.000Z",
      "2026-11-17T14:30:00.000Z",
    ].slice(0, slots.length));
    expect(slots[0]).toMatchObject({ dayLabel: "Tuesday 3 November", timeLabel: "14:00" });
  });

  it("never offers a slot inside the notice period", () => {
    const lateMonday = new Date("2026-11-02T15:00:00Z");
    expect(availableSlots(lateMonday, config).some((s) => s.start === "2026-11-03T14:00:00.000Z")).toBe(false);
  });

  it("removes booked slots and refuses to book them", () => {
    const booked = ["2026-11-03T14:00:00.000Z"];
    expect(availableSlots(now, config, booked).some((s) => s.start === booked[0])).toBe(false);
    expect(isBookable(booked[0], now, config, booked)).toBe(false);
    expect(isBookable("2026-11-03T14:30:00.000Z", now, config, booked)).toBe(true);
  });

  it("refuses times that aren't real slots", () => {
    expect(isBookable("2026-11-03T14:10:00.000Z", now, config)).toBe(false);
    expect(isBookable("not a date", now, config)).toBe(false);
  });
});
