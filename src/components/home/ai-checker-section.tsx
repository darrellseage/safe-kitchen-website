import { Section } from "@/components/ui/section";
import { SectionCta } from "./section-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { aiChecker } from "@/content/home";
import { AiCheckerDemo } from "./ai-checker-demo";
import { PillarLines } from "./pillar-lines";
import { Catches } from "./sales-bits";

/** Section 8: the AI Checker, with its limits stated plainly. */
export function AiCheckerSection() {
  return (
    <Section id="ai-checker" labelledBy="ai-checker-title">
      <SectionHeading id="ai-checker-title" eyebrow={aiChecker.eyebrow} status={aiChecker.status} title={aiChecker.title} accent={aiChecker.accent} intro={aiChecker.intro} />
      <PillarLines lines={aiChecker.lines} />
      <Catches label="It helps you spot" items={aiChecker.catches} />
      <div className="mt-12">
        <AiCheckerDemo />
      </div>
      <p className="mt-6 max-w-[85ch] text-sm text-ink-muted">{aiChecker.note}</p>
      <SectionCta />
    </Section>
  );
}
