import { Section } from "@/components/ui/section";
import { DemoReveal } from "./demo-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { demo } from "@/content/home";
import { InspectionPart } from "./inspection-story";
import { TemperatureDemo } from "./temperature-demo";

/** Inspection-ready records: record it in seconds (temperature demo), find it in seconds (Inspection Mode). */
export function FoodSafety() {
  return (
    <Section id="food-safety" labelledBy="food-safety-title" tone="mint">
      <SectionHeading id="food-safety-title" eyebrow={demo.eyebrow} status={demo.status} title={demo.title} accent={demo.accent} intro={demo.intro} />
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-bold text-brand-900">
        {demo.lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <DemoReveal label="Try a temperature check">
        <TemperatureDemo />
      </DemoReveal>
      <InspectionPart />
    </Section>
  );
}
