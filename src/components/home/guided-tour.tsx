"use client";

import { SiteLink } from "@/components/site/site-link";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { PillarIcon } from "@/components/ui/pillar-icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusChip } from "@/components/ui/status-chip";
import { tour } from "@/content/home";
import { section } from "@/content/navigation";
import { cn } from "@/lib/cn";

const STEP_MS = 9000;
const lineTone = {
  ok: "bg-success-100 text-success",
  now: "bg-accent-100 text-accent-700",
  todo: "bg-surface-sunken text-ink-muted",
  warn: "bg-warning-100 text-warning-ink",
} as const;

/**
 * The 60-second tour: one sample day in six steps. Visitors step through it
 * or press play (never automatic, and always pausable). Each step links to
 * the full interactive demo further down.
 */
export function GuidedTour() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const steps = tour.steps;
  const step = steps[index];
  const last = steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (index === last) setPlaying(false);
      else setIndex(index + 1);
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, last]);

  const go = (i: number) => {
    setPlaying(false);
    setIndex(Math.max(0, Math.min(last, i)));
  };

  return (
    <Section id="tour" labelledBy="tour-title" tone="warm">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="tour-title" eyebrow={tour.eyebrow} title={tour.title} accent={tour.accent} intro={tour.intro} />
        <span className="rounded-full bg-surface-sunken px-3 py-1 text-xs font-bold text-ink-muted">{tour.flag}</span>
      </div>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <ol aria-label="Tour steps" className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0">
          {steps.map((s, i) => (
            <li key={s.id} className="flex-none snap-start">
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === index ? "step" : undefined}
                className={cn(
                  "relative flex min-h-14 w-full items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3 text-start transition-colors",
                  i === index ? "border-accent-600 bg-surface-raised shadow-card" : "border-line bg-surface-raised/60 hover:border-control-border",
                )}
              >
                <span className={cn("grid size-9 flex-none place-items-center rounded-xl", i === index ? "bg-accent-600 text-white" : "bg-brand-50 text-brand-700")}>
                  <PillarIcon name={s.icon} className="size-4.5" />
                </span>
                <span className="grid">
                  <span className="text-[13px] font-bold text-ink-muted tabular">
                    {s.time} · {s.pillar}
                  </span>
                  <span className="hidden font-bold lg:block">{s.title}</span>
                </span>
                {playing && i === index ? (
                  <span aria-hidden="true" key={`bar-${index}`} className="tour-progress absolute inset-x-0 bottom-0 h-1 origin-left bg-accent-600" style={{ animationDuration: `${STEP_MS}ms` }} />
                ) : null}
              </button>
            </li>
          ))}
        </ol>

        <div className="grid content-start gap-5 rounded-3xl border border-line bg-surface-raised p-5 shadow-raised sm:p-7">
          <div aria-live={playing ? "off" : "polite"} className="grid gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[28px] leading-none font-extrabold tracking-[-0.03em] text-brand-700 tabular">{step.time}</span>
              <span className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{step.pillar}</span>
              <StatusChip feature={step.feature} />
            </div>
            <div>
              <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-extrabold tracking-[-0.025em]">{step.title}</h3>
              <p className="mt-2 max-w-[56ch] text-lg text-ink-muted">{step.body}</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface">
              <p className="border-b border-line bg-surface-raised px-4 py-2.5 text-sm font-bold">{step.screen.heading}</p>
              <ul className="grid gap-2 p-3">
                {step.screen.lines.map((l) => (
                  <li key={l.text} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface-raised px-3.5 py-3 text-[15px] font-semibold">
                    {l.text}
                    <span className={cn("rounded-full px-2.5 py-1 text-[13px] font-bold", lineTone[l.tone])}>{l.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <SiteLink href={section(step.demo)} className="inline-flex min-h-12 items-center gap-1.5 font-bold text-accent-600 hover:text-accent-700">
              {step.demoLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </SiteLink>
            <div className="flex items-center gap-2">
              <span className="me-1 text-sm text-ink-muted tabular">
                {index + 1} of {steps.length}
              </span>
              <TourButton label="Previous step" onClick={() => go(index - 1)} disabled={index === 0}>
                <ChevronLeft className="size-5 rtl:rotate-180" aria-hidden="true" />
              </TourButton>
              <TourButton
                label={playing ? "Pause the tour" : "Play the tour"}
                onClick={() => {
                  if (!playing && index === last) setIndex(0);
                  setPlaying(!playing);
                }}
                primary
              >
                {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5" aria-hidden="true" />}
              </TourButton>
              <TourButton label="Next step" onClick={() => go(index + 1)} disabled={index === last}>
                <ChevronRight className="size-5 rtl:rotate-180" aria-hidden="true" />
              </TourButton>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function TourButton({ label, onClick, disabled, primary, children }: { label: string; onClick: () => void; disabled?: boolean; primary?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid size-12 place-items-center rounded-full transition-colors disabled:opacity-40",
        primary ? "bg-accent-600 text-white hover:bg-accent-700" : "border-[1.5px] border-line bg-surface-raised hover:border-control-border",
      )}
    >
      {children}
    </button>
  );
}
