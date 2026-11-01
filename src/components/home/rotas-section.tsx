import { Section } from "@/components/ui/section";
import { DemoReveal } from "./demo-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { rotas } from "@/content/home";
import { PillarLines } from "./pillar-lines";
import { StepCards } from "./step-cards";
import { RotaDemo } from "./rota-demo";
import { WorkflowRail } from "./workflow-rail";
import { ClockInPart } from "./clock-in-section";

/** Rotas from a photo, then the rota-to-timesheet steps, then clock-in and attendance. */
export function RotasSection() {
  return (
    <Section id="rotas" labelledBy="rotas-title">
      <SectionHeading id="rotas-title" eyebrow={rotas.eyebrow} status={rotas.status} title={rotas.title} accent={rotas.accent} intro={rotas.intro} />
      <PillarLines lines={rotas.lines} />
      <StepCards steps={rotas.steps} />
      <DemoReveal label="Try the rota import demo">
        <RotaDemo />
      </DemoReveal>
      <WorkflowRail />
      <ClockInPart />
    </Section>
  );
}
