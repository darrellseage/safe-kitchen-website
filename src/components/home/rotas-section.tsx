import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { rotas } from "@/content/home";
import { PillarLines } from "./pillar-lines";
import { RotaDemo } from "./rota-demo";
import { WorkflowRail } from "./workflow-rail";

/** Section 6: Smart Staff Rotas, ending in the rota-to-timesheet steps that lead into clock-in. */
export function RotasSection() {
  return (
    <Section id="rotas" labelledBy="rotas-title">
      <SectionHeading id="rotas-title" eyebrow={rotas.eyebrow} status={rotas.status} title={rotas.title} accent={rotas.accent} intro={rotas.intro} />
      <PillarLines lines={rotas.lines} />
      <div className="mt-12">
        <RotaDemo />
      </div>
      <WorkflowRail />
    </Section>
  );
}
