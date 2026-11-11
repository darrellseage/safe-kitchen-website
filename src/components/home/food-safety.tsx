import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { demo } from "@/content/home";
import { DemoReveal } from "./demo-reveal";
import { TemperatureDemo } from "./temperature-demo";

/** Temperature checks: record a reading the way the team would, with the interactive demo. */
export function TemperatureSection({ asPage = false }: { asPage?: boolean } = {}) {
  return (
    <Section id="temperature-checks" labelledBy="food-safety-title" tone="mint">
      <SectionHeading id="food-safety-title" as={asPage ? "h1" : "h2"} eyebrow={demo.eyebrow} status={demo.status} title={demo.title} accent={demo.accent} intro={demo.intro} />
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-bold text-brand-900">
        {demo.lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <DemoReveal label="Try a temperature check">
        <TemperatureDemo />
      </DemoReveal>
    </Section>
  );
}
