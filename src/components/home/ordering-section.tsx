import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ordering } from "@/content/home";
import { orderingReduction } from "@/lib/value";
import { OrderingDemo } from "./ordering-demo";
import { PillarLines } from "./pillar-lines";
import { Catches, ExampleLine, gbp } from "./sales-bits";
import { WastePart } from "./waste-section";

/** Smart Supplier Ordering with the duplicate-order check, and what it means for food waste. */
export function OrderingSection() {
  return (
    <Section id="ordering" labelledBy="ordering-title" tone="forest">
      <SectionHeading id="ordering-title" eyebrow={ordering.eyebrow} status={ordering.status} title={ordering.title} accent={ordering.accent} intro={ordering.intro} />
      <PillarLines lines={ordering.lines} />
      <Catches label="AI checks help you catch" items={ordering.catches} />
      <ExampleLine
        amount={gbp(orderingReduction(ordering.example.weekly, ordering.example.percent))}
        text={ordering.example.text}
        note="Not a guaranteed saving: managers review every warning before anything is bought."
      />
      <div className="mt-12">
        <OrderingDemo />
      </div>
      <WastePart />
    </Section>
  );
}
