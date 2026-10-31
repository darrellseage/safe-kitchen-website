"use client";

import { useId, useState } from "react";
import { hygiene } from "@/content/home";
import { revenueAtRisk } from "@/lib/value";
import { gbp, num, NumberField } from "./sales-bits";

/** Hypothetical revenue at risk: weekly turnover × % reduction × 52. */
export function RevenueCalculator() {
  const id = useId();
  const [turnover, setTurnover] = useState("6000");
  const [percent, setPercent] = useState("5");
  const result = revenueAtRisk(num(turnover), num(percent));
  return (
    <div className="grid overflow-hidden rounded-3xl border border-line bg-surface-raised shadow-card lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid content-start gap-5 p-6 sm:p-8">
        <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{hygiene.calculator.title}</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField id={`${id}-t`} label="Weekly turnover" prefix="£" value={turnover} onChange={setTurnover} step={100} />
          <NumberField id={`${id}-p`} label="Hypothetical drop in sales" suffix="%" value={percent} onChange={setPercent} step={0.5} />
        </div>
        <p className="text-sm text-ink-muted">{hygiene.calculator.note}</p>
      </div>
      <div className="grid content-center gap-2 bg-warning-100/60 p-6 sm:p-8" aria-live="polite">
        <p className="text-[13px] font-bold tracking-[0.08em] text-warning-ink uppercase">Potential annual revenue at risk</p>
        <p className="text-[clamp(2.8rem,6vw,4.2rem)] leading-none font-extrabold tracking-[-0.04em] text-ink tabular">{gbp(result)}</p>
        <p className="text-sm text-ink-muted">Weekly turnover × drop in sales × 52 weeks.</p>
      </div>
    </div>
  );
}
