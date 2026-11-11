import { Section } from "@/components/ui/section";
import { DemoReveal } from "./demo-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { aiChecker } from "@/content/home";
import { AiCheckerDemo } from "./ai-checker-demo";
import { PillarLines } from "./pillar-lines";
import { Catches } from "./sales-bits";

/** Section 8: the AI Checker, with its limits stated plainly. */
export function AiCheckerSection({ asPage = false }: { asPage?: boolean } = {}) {
  return (
    <Section id="ai-checker" labelledBy="ai-checker-title" tone="fern">
      <SectionHeading id="ai-checker-title" as={asPage ? "h1" : "h2"} eyebrow={aiChecker.eyebrow} status={aiChecker.status} title={aiChecker.title} accent={aiChecker.accent} intro={aiChecker.intro} />
      <PillarLines lines={aiChecker.lines} />
      <Catches label="It helps you spot" items={aiChecker.catches} />
      <DemoReveal label="Try the AI Checker demo">
        <AiCheckerDemo />
      </DemoReveal>
      <p className="mt-6 max-w-[85ch] text-sm text-ink-muted">{aiChecker.note}</p>
    </Section>
  );
}
