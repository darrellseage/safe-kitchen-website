import { MonitorPlay } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusChip } from "@/components/ui/status-chip";
import { roadmap, trust } from "@/content/home";

/**
 * "Straight answers" (conversion review R9, R11, R12): what's really built,
 * what's coming, data security and limits, our vision (ideas for later), then the FAQ.
 * The status lists come from src/config/features.ts, so they can't drift from
 * the labels elsewhere on the page.
 */
export function TrustSection() {
  return (
    <Section id="straight-answers" labelledBy="trust-title" tone="white">
      <SectionHeading id="trust-title" eyebrow={trust.eyebrow} title={trust.title} accent={trust.accent} intro={trust.intro} />

      <p className="mt-8 flex max-w-4xl gap-3 rounded-2xl border border-accent-600/30 bg-accent-50 p-4 text-[15.5px]">
        <MonitorPlay className="mt-0.5 size-5 flex-none text-accent-700" aria-hidden="true" />
        {trust.demoNote}
      </p>


      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trust.cards.map((c) => (
          <li key={c.title} className="rounded-3xl border border-line bg-surface-raised p-5 shadow-card sm:p-6">
            <p className="text-lg font-extrabold">{c.title}</p>
            <p className="mt-2 text-[15.5px] text-ink-muted">{c.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <p className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{trust.exploringTitle}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {roadmap.items.map((item) => (
            <li key={item.key} className="grid content-start gap-1.5 rounded-2xl border border-line bg-surface p-4 sm:p-5">
              <StatusChip feature={item.key} />
              <p className="font-extrabold">{item.title}</p>
              <p className="text-[14.5px] text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-[80ch] text-sm text-ink-muted">{roadmap.note}</p>
      </div>

    </Section>
  );
}
