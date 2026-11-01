"use client";

import { useId, useState } from "react";
import { calculator } from "@/content/home";
import { calculatorExample, calculatorLimits, estimatePaperwork, type CalculatorInput } from "@/lib/calculator";

const fields: Array<{ key: keyof CalculatorInput; label: string; unit: string; hint?: string; prefix?: string; step?: number }> = [
  { key: "sites", label: "Kitchen sites", unit: "sites" },
  { key: "minutesPerDay", label: "Admin per site, per day", unit: "minutes", hint: "Checks, sheets, chasing signatures, filing and rotas." },
  { key: "daysPerWeek", label: "Days open per week", unit: "days" },
  { key: "hourlyCost", label: "Hourly labour cost", unit: "per hour", prefix: "£", step: 0.5 },
];

const whole = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

/** The visitor's own estimate of current admin time and cost. A tab of "Your numbers". */
export function PaperworkCalculator() {
  const [text, setText] = useState<Record<keyof CalculatorInput, string>>(
    () => Object.fromEntries(Object.entries(calculatorExample).map(([k, v]) => [k, String(v)])) as Record<keyof CalculatorInput, string>,
  );
  const id = useId();
  const input = Object.fromEntries(Object.entries(text).map(([k, v]) => [k, v === "" ? Number.NaN : Number(v)])) as CalculatorInput;
  const r = estimatePaperwork(input);

  return (
    <div>
      <div className="grid overflow-hidden rounded-3xl border border-line bg-surface-raised shadow-card lg:grid-cols-2">
        <form className="grid gap-6 p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
          {fields.map((f) => {
            const fid = `${id}-${f.key}`;
            const { min, max } = calculatorLimits[f.key];
            return (
              <div key={f.key} className="grid gap-2">
                <label htmlFor={fid} className="font-bold">
                  {f.label}
                </label>
                <div className="flex min-h-13 items-center gap-2 rounded-lg border-[1.5px] border-control-border bg-surface-raised px-4 focus-within:border-accent-600 focus-within:shadow-[0_0_0_3px_var(--color-accent-100)]">
                  {f.prefix ? <span className="text-ink-muted">{f.prefix}</span> : null}
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
                  <span className="text-ink-muted">{f.unit}</span>
                </div>
                {f.hint ? (
                  <p id={`${fid}-hint`} className="text-sm text-ink-muted">
                    {f.hint}
                  </p>
                ) : null}
              </div>
            );
          })}
          <p className="text-sm text-ink-muted">{calculator.defaultsNote}</p>
        </form>

        <div className="grid content-start gap-7 bg-brand-50 p-6 sm:p-8" aria-live="polite">
          <div>
            <p className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">Your estimate · hours per year</p>
            <p className="mt-2 text-[clamp(3rem,6vw,4.6rem)] leading-none font-extrabold tracking-[-0.04em] text-brand-900 tabular">
              {whole.format(r.hoursPerYear)}
              <span className="ms-2 text-[0.38em] font-bold tracking-normal text-brand-700">hours</span>
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">Per week</p>
              <p className="mt-2 text-4xl font-extrabold tracking-[-0.03em] text-brand-900 tabular">
                {r.hoursPerWeek.toFixed(1)}
                <span className="ms-1.5 text-base font-bold tracking-normal text-brand-700">hours</span>
              </p>
            </div>
            <div>
              <p className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">Labour cost per year</p>
              <p className="mt-2 text-4xl font-extrabold tracking-[-0.03em] text-brand-900 tabular">{money.format(r.costPerYear)}</p>
            </div>
          </div>
          <p className="border-t border-brand-100 pt-4 text-sm text-ink-muted">
            How it’s worked out: sites × minutes per day × days per week ÷ 60 = hours per week. × 52 weeks = hours per year.
            × hourly cost = labour cost per year.
          </p>
        </div>
      </div>
      <p className="mt-5 max-w-[80ch] text-sm text-ink-muted">{calculator.disclaimer}</p>
    </div>
  );
}
