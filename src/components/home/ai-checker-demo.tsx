"use client";

import { whenLive } from "@/config/features";
import { ChevronRight, FileText, Sparkles } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { aiFlags, aiReport, aiSummaries, type AiFlag } from "@/content/demo-data";
import { cn } from "@/lib/cn";

type Period = "daily" | "weekly";

const severityTone: Record<AiFlag["severity"], string> = {
  Urgent: "bg-danger-100 text-danger",
  Review: "bg-warning-100 text-warning-ink",
  Info: "bg-accent-100 text-accent-700",
};

/**
 * AI Checker demo (planned feature), following the app's planned monitoring
 * design (DESIGN_SYSTEM.md §9.7): neutral wording, "why this was flagged",
 * a link to the record, and suggested follow-ups. Flags are prompts to check,
 * never proof that anything went wrong.
 */
export function AiCheckerDemo() {
  const [period, setPeriod] = useState<Period>("daily");
  const [openId, setOpenId] = useState(aiFlags[0].id);
  const summary = aiSummaries[period];
  const open = aiFlags.find((f) => f.id === openId) ?? aiFlags[0];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-3xl border border-line bg-surface-raised p-5 shadow-raised sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xl font-extrabold">Your kitchen at a glance</p>
            <span className="mt-1 inline-block rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-bold text-ink-muted">
              {whenLive("Illustrative demo · sample data · planned feature", "Interactive demo · sample data")}
            </span>
          </div>
          <div role="group" aria-label="Summary period" className="grid grid-cols-2 rounded-full border border-line bg-surface p-1">
            {(["daily", "weekly"] as const).map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={period === p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "min-h-11 rounded-full px-4 text-sm font-bold capitalize transition-colors",
                  period === p ? "bg-surface-raised text-ink shadow-card" : "text-ink-muted hover:text-ink",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-2.5" aria-live="polite">
          {[
            ["Checks recorded", summary.recorded],
            ["Outstanding", summary.outstanding],
            ["Needs review", summary.review],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-surface p-3">
              <dd className="text-[28px] leading-none font-extrabold tracking-[-0.03em] tabular">{value}</dd>
              <dt className="mt-1 text-[13px] text-ink-muted">{label}</dt>
            </div>
          ))}
        </dl>

        <p className="mt-6 flex items-center gap-2 text-[13px] font-bold tracking-[0.06em] text-brand-700 uppercase">
          <Sparkles className="size-4" aria-hidden="true" />
          Needs attention
        </p>
        <ul className="mt-2 grid gap-2">
          {aiFlags.map((f, i) => (
            <li key={f.id} className="reveal" style={{ "--reveal-y": "8px", "--reveal-start": `${i * 12}%` } as CSSProperties}>
              <button
                type="button"
                aria-expanded={openId === f.id}
                aria-controls="ai-why"
                onClick={() => setOpenId(f.id)}
                className={cn(
                  "grid min-h-14 w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border bg-surface-raised px-3.5 py-2.5 text-start transition-[border-color,box-shadow]",
                  openId === f.id ? "border-accent-600 shadow-[0_0_0_3px_var(--color-accent-100)]" : "border-line hover:border-control-border",
                )}
              >
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-extrabold", severityTone[f.severity])}>{f.severity}</span>
                <span className="font-bold">{f.title}</span>
                <ChevronRight className="size-4 text-ink-muted" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4">
        <section id="ai-why" aria-live="polite" aria-label="Why this was flagged" className="grid gap-3 rounded-3xl border border-line bg-surface-raised p-5 shadow-card">
          <p className="text-xs font-extrabold tracking-[0.06em] text-brand-700 uppercase">Why this was flagged</p>
          <p className="text-lg font-extrabold">{open.title}</p>
          <p className="text-ink-muted">{open.why}</p>
          <p className="text-xs font-extrabold tracking-[0.06em] text-brand-700 uppercase">Record</p>
          <p className="inline-flex items-center gap-1.5 font-bold text-accent-600">
            <FileText className="size-4" aria-hidden="true" />
            {open.record}
          </p>
          <p className="text-xs font-extrabold tracking-[0.06em] text-brand-700 uppercase">Suggested follow-up</p>
          <p className="text-ink-muted">{open.followUp}</p>
          <p className="border-t border-line pt-3 text-[13px] text-ink-muted">A flag is a prompt to check, not proof that anything went wrong.</p>
        </section>

        <section aria-label="Sample summary report" className="rounded-3xl border border-line bg-brand-50 p-5">
          <p className="font-extrabold">
            {period === "daily" ? "Daily summary" : "Weekly summary"} · {summary.label}
          </p>
          <ul className="mt-2 grid gap-1.5 text-[15px]">
            {aiReport[period].map((line) => (
              <li key={line} className="flex gap-2">
                <span aria-hidden="true" className="mt-2.5 size-1.5 flex-none rounded-full bg-brand-500" />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-ink-muted">Urgent items are flagged straight away, not left for the summary.</p>
        </section>
      </div>
    </div>
  );
}
