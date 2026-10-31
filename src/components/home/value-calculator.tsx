"use client";

import { useId, useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { valueCalc } from "@/content/home";
import { cn } from "@/lib/cn";
import { combinedValue, type ValueInputs } from "@/lib/value";
import { gbp, num, NumberField } from "./sales-bits";

type Field = { key: keyof ValueInputs; label: string; prefix?: string; suffix?: string; step?: number; hint?: string };

const groups: Array<{ title: string; fields: Field[] }> = [
  { title: "Your business", fields: [{ key: "sites", label: "Sites", suffix: "sites" }] },
  {
    title: "Training",
    fields: [
      { key: "staffTrainedPerYear", label: "Staff trained per year", hint: "New starters and refreshers." },
      { key: "coursePrice", label: "Price of a separate course", prefix: "£", step: 1, hint: "Typical online courses: about £15 to £25." },
    ],
  },
  {
    title: "Management time",
    fields: [
      { key: "minutesSavedPerDay", label: "Admin time saved per day", suffix: "min" },
      { key: "hourlyCost", label: "Manager’s hourly cost", prefix: "£", step: 0.5 },
    ],
  },
  {
    title: "Ordering",
    fields: [
      { key: "weeklyPurchasing", label: "Weekly purchasing per site", prefix: "£", step: 100 },
      { key: "percentAvoidable", label: "Avoidable spend", suffix: "%", step: 0.5 },
    ],
  },
  {
    title: "Food waste",
    fields: [
      { key: "annualWasteCost", label: "Yearly food waste per site", prefix: "£", step: 500, hint: "WRAP’s 2013 estimate: about £10,000." },
      { key: "percentWasteReduction", label: "Reduction", suffix: "%", step: 1 },
    ],
  },
];

const defaults: Record<keyof ValueInputs, string> = {
  sites: "1",
  staffTrainedPerYear: "10",
  coursePrice: "24",
  minutesSavedPerDay: "10",
  hourlyCost: "15",
  weeklyPurchasing: "5000",
  percentAvoidable: "2",
  annualWasteCost: "10000",
  percentWasteReduction: "10",
};

/** Combined illustrative value, with purchasing and waste counted once. */
export function ValueCalculator() {
  const id = useId();
  const [text, setText] = useState(defaults);
  const inputs = Object.fromEntries(Object.entries(text).map(([k, v]) => [k, num(v)])) as ValueInputs;
  const r = combinedValue(inputs);
  const orderingCounts = r.ordering >= r.waste;

  const rows: Array<{ label: string; value: number; muted?: boolean; note?: string }> = [
    { label: "Separate training courses avoided", value: r.training },
    { label: "Management time value", value: r.time, note: valueCalc.timeNote },
    { label: "Ordering reduction", value: r.ordering, muted: !orderingCounts },
    { label: "Food waste reduction", value: r.waste, muted: orderingCounts },
  ];

  return (
    <Section id="savings" labelledBy="savings-title" tone="green">
      <SectionHeading id="savings-title" title={valueCalc.title} accent={valueCalc.accent} intro={valueCalc.intro} />
      <div className="mt-12 grid overflow-hidden rounded-3xl border border-line bg-surface-raised shadow-raised lg:grid-cols-[1.15fr_0.85fr]">
        <form className="grid content-start gap-7 p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
          {groups.map((g) => (
            <fieldset key={g.title} className="grid gap-4">
              <legend className="mb-3 text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{g.title}</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {g.fields.map((f) => (
                  <NumberField
                    key={f.key}
                    id={`${id}-${f.key}`}
                    label={f.label}
                    prefix={f.prefix}
                    suffix={f.suffix}
                    step={f.step}
                    hint={f.hint}
                    value={text[f.key]}
                    onChange={(v) => setText((t) => ({ ...t, [f.key]: v }))}
                  />
                ))}
              </div>
            </fieldset>
          ))}
        </form>

        <div className="grid content-start gap-5 bg-brand-900 p-6 text-white sm:p-8" aria-live="polite">
          <p className="text-[13px] font-bold tracking-[0.08em] text-accent-300 uppercase">Your illustrative yearly value</p>
          <ul className="grid gap-3">
            {rows.map((row) => (
              <li key={row.label} className={cn("grid grid-cols-[1fr_auto] gap-x-3 border-b border-white/15 pb-3", row.muted && "opacity-55")}>
                <span>
                  {row.label}
                  {row.muted ? <span className="block text-xs">Overlaps, not counted</span> : null}
                  {row.note ? <span className="block text-xs text-white/70">{row.note}</span> : null}
                </span>
                <span className={cn("font-bold tabular", row.muted && "line-through")}>{gbp(row.value)}</span>
              </li>
            ))}
            <li className="grid grid-cols-[1fr_auto] gap-x-3 pt-1">
              <span>
                Safe Kitchen for {r.sites} {r.sites === 1 ? "site" : "sites"}, one year
              </span>
              <span className="font-bold tabular">−{gbp(r.subscription, true)}</span>
            </li>
          </ul>
          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-sm text-white/80">Illustrative net value</p>
            <p className="text-[clamp(2.6rem,5vw,3.8rem)] leading-none font-extrabold tracking-[-0.04em] tabular">{gbp(r.net)}</p>
          </div>
          <p className="text-[13px] text-white/75">
            {valueCalc.overlapNote} These are estimates from your own figures, not guaranteed or measured savings.
          </p>
        </div>
      </div>
    </Section>
  );
}
