/**
 * The 14 regulated allergens, as named by the Food Standards Agency
 * ("Food allergy and intolerance advice for consumers", food.gov.uk,
 * checked 2 November 2026), and the logic behind the allergen demo
 * (app D-088). Pure functions, unit-tested in tests/allergens.test.ts.
 */
export const ALLERGENS = [
  { id: "celery", name: "Celery" },
  { id: "gluten", name: "Cereals containing gluten", short: "Gluten", examples: "such as wheat, rye, barley and oats" },
  { id: "crustaceans", name: "Crustaceans", examples: "such as prawns, crabs and lobsters" },
  { id: "eggs", name: "Eggs" },
  { id: "fish", name: "Fish" },
  { id: "lupin", name: "Lupin" },
  { id: "milk", name: "Milk" },
  { id: "molluscs", name: "Molluscs", examples: "such as mussels and oysters" },
  { id: "mustard", name: "Mustard" },
  { id: "peanuts", name: "Peanuts" },
  { id: "sesame", name: "Sesame" },
  { id: "soybeans", name: "Soybeans", short: "Soya" },
  { id: "sulphites", name: "Sulphur dioxide and sulphites", short: "Sulphites", examples: "at more than ten parts per million" },
  { id: "nuts", name: "Tree nuts", short: "Tree nuts", examples: "such as almonds, hazelnuts, walnuts, brazil nuts, cashews, pecans, pistachios and macadamia nuts" },
] as const satisfies ReadonlyArray<{ id: string; name: string; short?: string; examples?: string }>;

export type AllergenId = (typeof ALLERGENS)[number]["id"];

export const allergenName = (id: AllergenId): string => {
  const a = ALLERGENS.find((x) => x.id === id)!;
  return "short" in a ? a.short : a.name;
};

export type Dish = {
  id: string;
  name: string;
  /** Regulated allergens used as ingredients, from the dish's recipe. */
  contains: AllergenId[];
  /** Cross-contact risks the business has recorded ("may contain"), with the reason. */
  mayContain?: { allergens: AllergenId[]; reason: string };
  /** "signed-off" by a manager, or "recheck" after a recipe or supplier change. */
  state: "signed-off" | "recheck";
  /** Why the dish needs re-checking (staff view only). */
  recheckReason?: string;
};

export type View = "staff" | "customer";

export type FilterResult = {
  /** Dishes that don't contain any selected allergen as an ingredient. */
  shown: Array<{ dish: Dish; mayContain: AllergenId[] }>;
  /** How many signed-off dishes were left out because they contain a selected allergen. */
  hiddenContains: number;
  /** Dishes waiting for a manager to re-check them: never in "without…" results. */
  awaitingRecheck: Dish[];
};

/**
 * Dishes without the selected allergens (app D-088 safety rules):
 * - a dish is left out if it contains any selected allergen as an ingredient;
 * - "may contain" risks for the selected allergens are kept and shown, never hidden;
 * - a dish waiting for re-checking is never offered as "without" anything, and
 *   customers never see it at all (staff see it listed separately, with the reason).
 * With nothing selected, every signed-off dish is shown.
 */
export function filterDishes(dishes: readonly Dish[], selected: readonly AllergenId[]): FilterResult {
  const signedOff = dishes.filter((d) => d.state === "signed-off");
  const shown = signedOff
    .filter((d) => !d.contains.some((a) => selected.includes(a)))
    .map((dish) => ({ dish, mayContain: (dish.mayContain?.allergens ?? []).filter((a) => selected.includes(a)) }));
  return {
    shown,
    hiddenContains: signedOff.length - shown.length,
    awaitingRecheck: dishes.filter((d) => d.state === "recheck"),
  };
}

/** Allergens in a dish, in the FSA list's order, for display. */
export const sortedAllergens = (ids: readonly AllergenId[]): AllergenId[] =>
  ALLERGENS.map((a) => a.id).filter((id) => ids.includes(id));
