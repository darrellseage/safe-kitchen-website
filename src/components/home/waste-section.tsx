import { ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionCta } from "./section-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { waste } from "@/content/home";
import { wasteStat } from "@/content/stats";
import { wasteReduction } from "@/lib/value";
import { ExampleCard, gbp } from "./sales-bits";

/** The hidden cost of food waste (WRAP 2013 estimate), and how better ordering helps. */
export function WasteSection() {
  return (
    <Section id="food-waste" labelledBy="waste-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading id="waste-title" title={waste.title} accent={waste.accent} intro={waste.intro} />
          <ExampleCard amount={gbp(wasteReduction(waste.example.annual, waste.example.percent))} text={waste.example.text} note={waste.disclaimer} />
        </div>
        <figure className="rounded-3xl border border-line bg-surface p-7 shadow-card">
          <p className="text-[clamp(3.4rem,8vw,5.2rem)] leading-none font-extrabold tracking-[-0.045em] text-brand-500 tabular">{wasteStat.value}</p>
          <p className="mt-3 text-xl font-bold">{wasteStat.label}</p>
          <p className="mt-2 text-[15px] text-ink-muted">{wasteStat.note}</p>
          <figcaption className="mt-4 text-[13px] text-ink-muted">
            Source:{" "}
            <a href={wasteStat.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-600 underline underline-offset-2">
              {wasteStat.source}
              <ExternalLink className="ms-1 inline size-3.5 align-[-2px]" aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      </div>
      <SectionCta />
    </Section>
  );
}
