import { Section } from "@/components/ui/section";
import { SectionCta } from "./section-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { ordering } from "@/content/home";
import { OrderingDemo } from "./ordering-demo";
import { PillarLines } from "./pillar-lines";
import { Catches, ExampleCard, gbp } from "./sales-bits";
import { orderingReduction } from "@/lib/value";

/** Section 9: Smart Supplier Ordering with the duplicate-order check. */
export function OrderingSection() {
  return (
    <Section id="ordering" labelledBy="ordering-title" tone="warm">
      <SectionHeading id="ordering-title" eyebrow={ordering.eyebrow} status={ordering.status} title={ordering.title} accent={ordering.accent} intro={ordering.intro} />
      <PillarLines lines={ordering.lines} />
      <Catches label="AI checks help you catch" items={ordering.catches} />
      <ExampleCard
        amount={gbp(orderingReduction(ordering.example.weekly, ordering.example.percent))}
        text={ordering.example.text}
        note="A hypothetical calculation, not a guaranteed saving. Managers review every warning before anything is bought."
      />
      <div className="mt-12">
        <OrderingDemo />
      </div>
      <SectionCta />
    </Section>
  );
}
