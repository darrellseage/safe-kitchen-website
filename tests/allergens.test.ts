import { describe, expect, it } from "vitest";
import { ALLERGENS, filterDishes, sortedAllergens, type Dish } from "@/lib/allergens";

const dishes: Dish[] = [
  { id: "curry", name: "Curry", contains: ["milk", "nuts"], state: "signed-off" },
  { id: "chips", name: "Chips", contains: [], mayContain: { allergens: ["fish", "gluten"], reason: "Shared fryer" }, state: "signed-off" },
  { id: "hummus", name: "Hummus", contains: ["sesame", "gluten"], state: "signed-off" },
  { id: "pudding", name: "Pudding", contains: ["gluten", "eggs", "milk"], state: "recheck", recheckReason: "Supplier changed the sauce" },
];

describe("the 14 regulated allergens", () => {
  it("lists exactly 14, each once", () => {
    expect(ALLERGENS).toHaveLength(14);
    expect(new Set(ALLERGENS.map((a) => a.id)).size).toBe(14);
  });
});

describe("allergen filter", () => {
  it("with nothing selected, shows every signed-off dish and nothing awaiting re-check", () => {
    const r = filterDishes(dishes, []);
    expect(r.shown.map((s) => s.dish.id)).toEqual(["curry", "chips", "hummus"]);
    expect(r.hiddenContains).toBe(0);
  });
  it("leaves out dishes that contain a selected allergen", () => {
    const r = filterDishes(dishes, ["sesame"]);
    expect(r.shown.map((s) => s.dish.id)).toEqual(["curry", "chips"]);
    expect(r.hiddenContains).toBe(1);
  });
  it("needs every selected allergen to be absent", () => {
    expect(filterDishes(dishes, ["milk", "sesame"]).shown.map((s) => s.dish.id)).toEqual(["chips"]);
  });
  it("keeps 'may contain' warnings for the selected allergens, never hides them", () => {
    const chips = filterDishes(dishes, ["fish"]).shown.find((s) => s.dish.id === "chips");
    expect(chips?.mayContain).toEqual(["fish"]);
    expect(filterDishes(dishes, ["milk"]).shown.find((s) => s.dish.id === "chips")?.mayContain).toEqual([]);
  });
  it("never offers a dish waiting for re-checking as 'without' anything", () => {
    for (const sel of [[], ["sesame"], ["peanuts"]] as const) {
      const r = filterDishes(dishes, sel);
      expect(r.shown.some((s) => s.dish.id === "pudding")).toBe(false);
      expect(r.awaitingRecheck.map((d) => d.id)).toEqual(["pudding"]);
    }
  });
  it("sorts allergens in the FSA list's order", () => {
    expect(sortedAllergens(["nuts", "milk", "celery"])).toEqual(["celery", "milk", "nuts"]);
  });
});
