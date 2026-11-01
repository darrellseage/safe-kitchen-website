"use client";

import { Tabs } from "radix-ui";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { calculator, hygiene, numbers, valueCalc } from "@/content/home";
import { PaperworkCalculator } from "./calculator";
import { ComparisonPart } from "./comparison-section";
import { RevenueCalculator } from "./revenue-calculator";
import { ValueCalculator } from "./value-calculator";

const tabs = [
  { id: "value", label: numbers.tabs.value, intro: valueCalc.intro, panel: <ValueCalculator /> },
  { id: "admin", label: numbers.tabs.admin, intro: calculator.intro, panel: <PaperworkCalculator /> },
  { id: "revenue", label: numbers.tabs.revenue, intro: hygiene.intro, panel: <RevenueCalculator /> },
];

/** The three calculators in one place (conversion review R7), then five systems against one. */
export function YourNumbers() {
  return (
    <Section id="savings" labelledBy="savings-title" tone="forest">
      <SectionHeading id="savings-title" eyebrow={numbers.eyebrow} title={numbers.title} accent={numbers.accent} intro={numbers.intro} />
      <Tabs.Root defaultValue="value" className="mt-10">
        <Tabs.List aria-label="Choose a calculator" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
          {tabs.map((t) => (
            <Tabs.Trigger
              key={t.id}
              value={t.id}
              className="min-h-12 flex-none rounded-full border-[1.5px] border-white/30 px-5 font-bold text-white/85 transition-colors hover:text-white data-[state=active]:border-white data-[state=active]:bg-white data-[state=active]:text-deep"
            >
              {t.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabs.map((t) => (
          <Tabs.Content key={t.id} value={t.id} className="mt-6">
            <p className="mb-5 max-w-[70ch] text-ink-muted">{t.intro}</p>
            {t.panel}
          </Tabs.Content>
        ))}
      </Tabs.Root>
      <ComparisonPart />
    </Section>
  );
}
