/**
 * Rota import review (Smart Rotas demo). Mirrors the app's planned rules
 * (DECISIONS.md D-054): imported shifts are a draft, uncertain items must be
 * checked, unknown names must be matched by a manager, and nothing can be
 * published until every item is resolved. Missing shifts are never invented.
 */
export type ShiftState = "confirmed" | "check";

export type DraftShift = { id: string; person: string; day: string; time: string | null; state: ShiftState };

export type RotaReview = {
  shifts: DraftShift[];
  /** Names read from the document that don't match a registered staff member yet. */
  unmatched: string[];
};

export function reviewSummary({ shifts, unmatched }: RotaReview) {
  const found = shifts.filter((s) => s.time !== null).length;
  const toCheck = shifts.filter((s) => s.state === "check").length;
  return { found, toCheck, toMatch: unmatched.length, canPublish: toCheck === 0 && unmatched.length === 0 };
}

export function confirmShift(review: RotaReview, id: string): RotaReview {
  return { ...review, shifts: review.shifts.map((s) => (s.id === id ? { ...s, state: "confirmed" } : s)) };
}

/** Matches a name read from the document to a registered person. */
export function matchPerson(review: RotaReview, readName: string, person: string): RotaReview {
  return {
    unmatched: review.unmatched.filter((n) => n !== readName),
    shifts: review.shifts.map((s) => (s.person === readName ? { ...s, person } : s)),
  };
}

/** People who will be notified when the rota is published. */
export function peopleToNotify(review: RotaReview): string[] {
  return [...new Set(review.shifts.filter((s) => s.time !== null).map((s) => s.person))];
}
