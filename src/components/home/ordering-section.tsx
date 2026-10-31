import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ordering } from "@/content/home";
import { OrderingDemo } from "./ordering-demo";
import { PillarLines } from "./pillar-lines";

/** Section 9: Smart Supplier Ordering with the duplicate-order check. */
export function OrderingSection() {
  return (
    <Section id="ordering" labelledBy="ordering-title" tone="warm">
      <SectionHeading id="ordering-title" eyebrow={ordering.eyebrow} status={ordering.status} title={ordering.title} accent={ordering.accent} intro={ordering.intro} />
      <PillarLines lines={ordering.lines} />
      <div className="mt-12">
        <OrderingDemo />
      </div>
    </Section>
  );
}
