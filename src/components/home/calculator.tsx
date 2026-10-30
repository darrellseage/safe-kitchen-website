"use client";

import { useId, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { calculator } from "@/content/home";
import { calculatorExample, calculatorLimits, estimatePaperwork, type CalculatorInput } from "@/lib/calculator";

const fields: Array<{ key: keyof CalculatorInput; label: string; unit: string; hint?: string; prefix?: string; step?: number }> = [
  { key: "sites", label: "Kitchen sites", unit: "sites" },
  { key: "minutesPerDay", label: "Paperwork per site, per day", unit: "minutes", hint: "Checks, sheets, chasing signatures and filing." },
  { key: "daysPerWeek", label: "Days open per week", unit: "days" },
  { key: "hourlyCost", label: "Hourly labour cost", unit: "per hour", prefix: "£", step: 0.5 },
];

const whole = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export function PaperworkCalculator() {
  const [text, setText] = useState<Record<keyof CalculatorInput, string>>(
    () => Object.fromEntries(Object.entries(calculatorExample).map(([k, v]) => [k, String(v)])) as Record<keyof CalculatorInput, string>,
  );
  const id = useId();
  const input = Object.fromEntries(Object.entries(text).map(([k, v]) => [k, v === "" ? Number.NaN : Number(v)])) as CalculatorInput;
  const r = estimatePaperwork(input);

  return (
    <section aria-labelledby="calc-title" className="border-t border-night-700 py-24 md:py-32">
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeading id="calc-title" title={calculator.title} intro={calculator.intro} />
        <div className="mt-14 grid overflow-hidden rounded-3xl border border-night-700 lg:grid-cols-2">
          <form className="grid gap-6 bg-night-900 p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
            {fields.map((f) => {
              const fid = `${id}-${f.key}`;
              const { min, max } = calculatorLimits[f.key];
              return (
                <div key={f.key} className="grid gap-2">
                  <label htmlFor={fid} className="font-semibold">
                    {f.label}
                  </label>
                  <div className="flex min-h-13 items-center gap-2 rounded-xl border border-night-600 bg-night-950 px-4 focus-within:border-herb-400">
                    {f.prefix ? <span className="text-fog-400">{f.prefix}</span> : null}
                    <input
                      id={fid}
                      type="number"
                      inputMode={f.step ? "decimal" : "numeric"}
                      min={min}
                      max={max}
                      step={f.step ?? 1}
                      value={text[f.key]}
                      onChange={(e) => setText((t) => ({ ...t, [f.key]: e.target.value }))}
                      aria-describedby={f.hint ? `${fid}-hint` : undefined}
                      className="min-w-0 flex-1 self-stretch bg-transparent text-lg font-semibold tabular outline-none"
                    />
                    <span className="text-fog-400">{f.unit}</span>
                  </div>
                  {f.hint ? (
                    <p id={`${fid}-hint`} className="text-sm text-fog-400">
                      {f.hint}
                    </p>
                  ) : null}
                </div>
              );
            })}
            <p className="text-sm text-fog-400">{calculator.defaultsNote}</p>
          </form>

          <div className="lamp grid content-start gap-7 bg-forest-950 p-6 sm:p-8" aria-live="polite">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-mist-300 uppercase">Your estimate · hours per year</p>
              <p className="mt-2 font-display text-[clamp(3rem,6vw,4.6rem)] leading-none font-extrabold tracking-[-0.035em] tabular">
                {whole.format(r.hoursPerYear)}
                <span className="ms-2 text-[0.38em] font-semibold tracking-normal text-mist-300">hours</span>
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] text-mist-300 uppercase">Per week</p>
                <p className="mt-2 font-display text-4xl font-extrabold tracking-[-0.03em] tabular">
                  {r.hoursPerWeek.toFixed(1)}
                  <span className="ms-1.5 text-base font-semibold tracking-normal text-mist-300">hours</span>
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] text-mist-300 uppercase">Labour cost per year</p>
                <p className="mt-2 font-display text-4xl font-extrabold tracking-[-0.03em] tabular">{money.format(r.costPerYear)}</p>
              </div>
            </div>
            <p className="border-t border-white/10 pt-4 text-sm text-mist-300">
              How it’s worked out: sites × minutes per day × days per week ÷ 60 = hours per week. × 52 weeks = hours per
              year. × hourly cost = labour cost per year.
            </p>
          </div>
        </div>
        <p className="mt-5 max-w-[80ch] text-sm text-fog-400">{calculator.disclaimer}</p>
      </div>
    </section>
  );
}
