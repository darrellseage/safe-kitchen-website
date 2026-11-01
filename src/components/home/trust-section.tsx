import { CheckCircle2, MonitorPlay } from "lucide-react";
import { siteConfig } from "@/config/site";
import { statusOf, type FeatureKey } from "@/config/features";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusChip } from "@/components/ui/status-chip";
import { roadmap, trust } from "@/content/home";
import { Faq } from "./faq";

/**
 * "Straight answers" (conversion review R9, R11, R12): what's really built,
 * what's coming, data security and limits, ideas we're exploring, then the FAQ.
 * The status lists come from src/config/features.ts, so they can't drift from
 * the labels elsewhere on the page.
 */
export function TrustSection() {
  // In a launch preview everything is shown as live, so the status lists would be meaningless.
  const showStatus = !siteConfig.launchPreview;
  // Group by each feature's current status, so a change in features.ts moves it to the right list.
  const listed: Array<[FeatureKey, string]> = trust.groups.flatMap((g): Array<[FeatureKey, string]> => g.features);
  return (
    <Section id="straight-answers" labelledBy="trust-title" tone="white">
      <SectionHeading id="trust-title" eyebrow={trust.eyebrow} title={trust.title} accent={trust.accent} intro={trust.intro} />

      <p className="mt-8 flex max-w-4xl gap-3 rounded-2xl border border-accent-600/30 bg-accent-50 p-4 text-[15.5px]">
        <MonitorPlay className="mt-0.5 size-5 flex-none text-accent-700" aria-hidden="true" />
        {trust.demoNote}
      </p>

      {showStatus ? (
        <div id="status" className="mt-8 grid scroll-mt-24 gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
            <p className="text-lg font-extrabold">{trust.built.title}</p>
            <p className="text-sm text-ink-muted">{trust.built.note}</p>
            <ul className="mt-4 grid gap-2.5">
              {trust.built.items.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-5 flex-none text-success" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          {trust.groups.map((g) => (
            <div key={g.title} className="rounded-3xl border border-line bg-surface p-6">
              <p className="text-lg font-extrabold">{g.title}</p>
              <ul className="mt-4 grid gap-2.5">
                {listed
                  .filter(([key]) => statusOf(key) === g.status)
                  .map(([key, label]) => (
                    <li key={key} className="flex gap-2.5">
                      <span aria-hidden="true" className={g.status === "planned" ? "mt-2 size-2 flex-none rounded-full bg-accent-600" : "mt-2 size-2 flex-none rounded-full bg-brand-500"} />
                      {label}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

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

      <Faq />
    </Section>
  );
}
