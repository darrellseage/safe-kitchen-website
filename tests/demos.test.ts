import { describe, expect, it } from "vitest";
import { hoursDifference, minutesLate } from "@/lib/demos/attendance";
import { duplicateSpend, findPossibleDuplicate, isUnusualQuantity } from "@/lib/demos/order-check";
import { confirmShift, matchPerson, peopleToNotify, reviewSummary, type RotaReview } from "@/lib/demos/rota-review";

const draft: RotaReview = {
  shifts: [
    { id: "a", person: "Sam", day: "Mon", time: "09:00–17:00", state: "confirmed" },
    { id: "b", person: "Priya", day: "Tue", time: "12:00–22:00", state: "check" },
    { id: "c", person: "Jo?", day: "Tue", time: "17:00–23:00", state: "confirmed" },
    { id: "d", person: "Sam", day: "Wed", time: null, state: "confirmed" },
  ],
  unmatched: ["Jo?"],
};

describe("rota review", () => {
  it("counts found shifts, items to check and people to match", () => {
    expect(reviewSummary(draft)).toEqual({ found: 3, toCheck: 1, toMatch: 1, canPublish: false });
  });
  it("only allows publishing once every item is checked and matched", () => {
    const checked = confirmShift(draft, "b");
    expect(reviewSummary(checked).canPublish).toBe(false);
    const matched = matchPerson(checked, "Jo?", "Jo Walsh");
    expect(reviewSummary(matched).canPublish).toBe(true);
    expect(peopleToNotify(matched)).toEqual(["Sam", "Priya", "Jo Walsh"]);
  });
  it("never fills in a missing shift", () => {
    expect(draft.shifts.find((s) => s.id === "d")?.time).toBeNull();
  });
});

describe("attendance", () => {
  it("works out lateness and leaves early arrivals at zero", () => {
    expect(minutesLate("12:00", "12:09")).toBe(9);
    expect(minutesLate("09:00", "08:57")).toBe(0);
  });
  it("shows the hours difference with a sign", () => {
    expect(hoursDifference(40, 39.1)).toBe("−0.9 h");
    expect(hoursDifference(32, 32.3)).toBe("+0.3 h");
    expect(hoursDifference(18, 18)).toBe("0.0 h");
  });
});

describe("order checks", () => {
  const incoming = [{ product: "Chicken breast", quantity: 20, unit: "kg", delivery: "Thu 6 Nov", orderedBy: "Priya", orderedOn: "Mon" }];
  it("spots the same product for the same delivery", () => {
    expect(findPossibleDuplicate({ product: "chicken breast", quantity: 20, unit: "kg", delivery: "Thu 6 Nov" }, incoming)?.orderedBy).toBe("Priya");
    expect(findPossibleDuplicate({ product: "Chicken breast", quantity: 20, unit: "kg", delivery: "Fri 7 Nov" }, incoming)).toBeNull();
  });
  it("calculates an illustrative duplicate value", () => {
    expect(duplicateSpend(20, 6.2)).toBe(124);
  });
  it("flags quantities far above the usual order", () => {
    expect(isUnusualQuantity(100, 10)).toBe(true);
    expect(isUnusualQuantity(20, 10)).toBe(false);
  });
});
