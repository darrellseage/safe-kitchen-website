import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { inspection } from "@/content/home";
import { InspectionModeDemo } from "./inspection-mode-demo";

/** Inspection: a short real-time story, then Inspection Mode with every record in one place. */
export function InspectionStory() {
  return (
    <Section id="inspection" labelledBy="eho-title" tone="seafoam">
      <SectionHeading id="eho-title" eyebrow={inspection.eyebrow} status={inspection.status} title={inspection.title} accent={inspection.accent} intro={inspection.intro} />
      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <ol className="grid">
            {inspection.timeline.map((t, i) => (
              <li key={t.time} className="relative grid grid-cols-[76px_1fr] gap-4 pb-8 last:pb-0">
                {i < inspection.timeline.length - 1 ? <span aria-hidden="true" className="absolute top-3 bottom-0 left-[87px] w-0.5 bg-brand-100" /> : null}
                <time className="text-[22px] leading-none font-extrabold text-brand-700 tabular">{t.time}</time>
                <Reveal delay={i * 0.15} y={12} className="relative ps-6">
                  <span aria-hidden="true" className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-brand-500 bg-brand-50" />
                  <p className="text-lg font-bold">{t.title}</p>
                  <p className="text-[15.5px] text-ink-muted">{t.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-[30ch] text-[clamp(1.35rem,2.4vw,1.8rem)] leading-tight font-extrabold tracking-[-0.015em] text-brand-900">{inspection.closing}</p>
          <p className="mt-4 max-w-[52ch] text-sm text-ink-muted">{inspection.note}</p>
        </div>
        <InspectionModeDemo />
      </div>
    </Section>
  );
}
