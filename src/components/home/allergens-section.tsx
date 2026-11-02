import { ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { allergens } from "@/content/home";
import { allergenFacts } from "@/content/stats";
import { AllergenDemo } from "./allergen-demo";
import { DemoReveal } from "./demo-reveal";

/** Allergen menus (app D-088): what's at stake, with sources, then how Safe Kitchen helps and a filter demo. */
export function AllergensSection() {
  return (
    <Section id="allergens" labelledBy="allergens-title" tone="seafoam">
      <SectionHeading id="allergens-title" eyebrow={allergens.eyebrow} status={allergens.status} title={allergens.title} accent={allergens.accent} intro={allergens.intro} />

      <p className="mt-10 text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{allergens.factsTitle}</p>
      <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allergenFacts.map((f) => (
          <li key={f.lead} className="grid content-start gap-2 rounded-2xl border border-line border-s-4 border-s-danger bg-surface-raised p-5 shadow-card">
            <p className="text-xl font-extrabold tracking-[-0.02em]">{f.lead}</p>
            <p className="text-[15.5px] text-ink-muted">{f.body}</p>
            <a href={f.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center self-start text-[13px] font-semibold text-accent-600 underline underline-offset-2">
              Source: {f.source}
              <ExternalLink className="ms-1 inline size-3.5 align-[-2px]" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{allergens.helpsTitle}</p>
      <ul className="mt-3 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {allergens.helps.map((h) => (
          <li key={h.title}>
            <p className="text-lg font-extrabold">{h.title}</p>
            <p className="mt-1 text-[15.5px] text-ink-muted">{h.body}</p>
          </li>
        ))}
      </ul>

      <DemoReveal label={allergens.demoLabel}>
        <AllergenDemo />
      </DemoReveal>
      <p className="mt-6 max-w-[85ch] text-sm text-ink-muted">{allergens.note}</p>
    </Section>
  );
}
