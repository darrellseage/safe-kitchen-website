import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { demo } from "@/content/home";
import { TemperatureDemo } from "./temperature-demo";

/** Section 5: Simple Food Safety, with the interactive temperature check. */
export function FoodSafety() {
  return (
    <Section id="food-safety" labelledBy="food-safety-title" tone="sage">
      <SectionHeading id="food-safety-title" eyebrow={demo.eyebrow} status={demo.status} title={demo.title} accent={demo.accent} intro={demo.intro} />
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-bold text-brand-900">
        {demo.lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <div className="mt-12">
        <TemperatureDemo />
      </div>
    </Section>
  );
}
