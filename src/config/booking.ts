/**
 * Call booking availability. Only real availability is ever shown: slots
 * already booked disappear, and nothing is faked as booked (owner decision,
 * 30 Oct 2026). Placeholder hours until the owner confirms them.
 */
export const bookingConfig = {
  timeZone: "Europe/London",
  slotMinutes: 30,
  /** How far ahead people can book. */
  daysAhead: 14,
  /** The earliest bookable slot is at least this far away. */
  minNoticeHours: 24,
  /** Weekly hours, by day (0 = Sunday … 6 = Saturday), in UK time. */
  weekly: {
    2: [["14:00", "17:00"]],
    4: [["14:00", "17:00"]],
  } as Partial<Record<number, Array<[string, string]>>>,
};

export type BookingConfig = typeof bookingConfig;
