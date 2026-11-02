"use client";

import { AlertTriangle, MessageCircle, RotateCcw } from "lucide-react";
import { useState } from "react";
import { whenLive } from "@/config/features";
import { allergenMenu } from "@/content/demo-data";
import { ALLERGENS, allergenName, filterDishes, sortedAllergens, type AllergenId, type View } from "@/lib/allergens";
import { cn } from "@/lib/cn";

const list = (ids: readonly AllergenId[]) => {
  const names = ids.map((id) => allergenName(id).toLowerCase());
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} or ${names.at(-1)}` : (names[0] ?? "");
};

/**
 * Allergen menu demo (planned feature, app D-088). Follows its safety rules:
 * the filter only leaves out dishes that contain a selected allergen as an
 * ingredient, "may contain" risks stay visible, dishes waiting for a re-check
 * are never offered, and nothing ever says a dish is "safe for you".
 */
export function AllergenDemo() {
  const [view, setView] = useState<View>("staff");
  const [selected, setSelected] = useState<AllergenId[]>(["nuts"]);
  const result = filterDishes(allergenMenu, selected);
  const signedOffCount = allergenMenu.filter((d) => d.state === "signed-off").length;

  const toggle = (id: AllergenId) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="rounded-3xl border border-line bg-surface-raised p-5 shadow-raised sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xl font-extrabold">{view === "staff" ? "Allergens: kitchen tablet" : "Allergen menu: customer’s phone"}</p>
          <span className="mt-1 inline-block rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-bold text-ink-muted">
            {whenLive("Illustrative demo · sample menu · planned feature", "Interactive demo · sample menu")}
          </span>
        </div>
        <div role="group" aria-label="Who is looking" className="grid grid-cols-2 rounded-full border border-line bg-surface p-1">
          {(
            [
              ["staff", "Staff"],
              ["customer", "Customer"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn(
                "min-h-11 rounded-full px-4 text-sm font-bold transition-colors",
                view === v ? "bg-surface-raised text-ink shadow-card" : "text-ink-muted hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === "customer" ? (
        <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent-50 p-3.5 font-semibold text-accent-700">
          <MessageCircle className="mt-0.5 size-5 flex-none" aria-hidden="true" />
          Please tell a member of staff about your allergy before you order.
        </p>
      ) : null}

      <fieldset className="mt-5">
        <legend className="flex w-full flex-wrap items-center justify-between gap-2 text-[13px] font-bold tracking-[0.06em] text-brand-700 uppercase">
          Show dishes without
          {selected.length ? (
            <button type="button" onClick={() => setSelected([])} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold tracking-normal text-accent-600 normal-case">
              <RotateCcw className="size-4" aria-hidden="true" />
              Clear
            </button>
          ) : null}
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {ALLERGENS.map((a) => {
            const on = selected.includes(a.id);
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={on}
                title={"examples" in a ? `${a.name} (${a.examples})` : a.name}
                onClick={() => toggle(a.id)}
                className={cn(
                  "min-h-11 rounded-full border-[1.5px] px-3.5 text-[14.5px] font-bold transition-colors",
                  on ? "border-accent-600 bg-accent-600 text-white" : "border-line bg-surface-raised text-ink hover:border-control-border",
                )}
              >
                {allergenName(a.id)}
              </button>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-5 font-bold" aria-live="polite">
        {selected.length
          ? `${result.shown.length} of ${signedOffCount} dishes don’t contain ${list(selected)} as an ingredient`
          : `All ${signedOffCount} dishes`}
      </p>

      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {result.shown.map(({ dish, mayContain }) => (
          <li key={dish.id} className="grid content-start gap-2 rounded-xl border border-line bg-surface p-3.5">
            <p className="font-extrabold">{dish.name}</p>
            <p className="text-[14.5px] text-ink-muted">
              {dish.contains.length ? `Contains: ${sortedAllergens(dish.contains).map(allergenName).join(", ")}` : "None of the 14 allergens recorded as ingredients"}
            </p>
            {mayContain.length ? (
              <p className="flex items-start gap-2 rounded-lg bg-warning-100 p-2.5 text-[14px] font-semibold text-warning-ink">
                <AlertTriangle className="mt-0.5 size-4 flex-none" aria-hidden="true" />
                May contain {list(mayContain)}: {dish.mayContain?.reason.toLowerCase()}. Ask staff.
              </p>
            ) : dish.mayContain ? (
              <p className="text-[13.5px] text-ink-muted">
                Cross-contact: {dish.mayContain.reason.toLowerCase()} ({sortedAllergens(dish.mayContain.allergens).map(allergenName).join(", ").toLowerCase()}).
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      {selected.length && result.hiddenContains ? (
        <p className="mt-3 text-[14.5px] text-ink-muted">
          {result.hiddenContains} {result.hiddenContains === 1 ? "dish contains" : "dishes contain"} {list(selected)} and {result.hiddenContains === 1 ? "isn’t" : "aren’t"} shown.
        </p>
      ) : null}

      {view === "staff" && result.awaitingRecheck.length ? (
        <div className="mt-5 rounded-xl border border-warning/40 bg-warning-100 p-3.5">
          <p className="text-[13px] font-extrabold tracking-[0.06em] text-warning-ink uppercase">Waiting for a manager to re-check</p>
          <ul className="mt-2 grid gap-2">
            {result.awaitingRecheck.map((d) => (
              <li key={d.id}>
                <p className="font-bold">{d.name}</p>
                <p className="text-[14.5px]">{d.recheckReason}</p>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[13.5px]">Customers don’t see this dish until it’s been checked and signed off again.</p>
        </div>
      ) : null}

      <p className="mt-5 border-t border-line pt-3 text-[13px] text-ink-muted">
        The allergens in this sample menu are made up for the demo. It never says a dish is “safe for you”: it shows what each dish contains, and the customer still talks to staff.
      </p>
    </div>
  );
}
