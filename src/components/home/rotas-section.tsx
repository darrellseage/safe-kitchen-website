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
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {rotas.steps.map((st, i) => (
          <li key={st.title} className="rounded-2xl border border-line bg-surface p-5">
            <span className="grid size-8 place-items-center rounded-full bg-accent-600 text-sm font-bold text-white tabular">{i + 1}</span>
            <p className="mt-3 text-lg font-extrabold">{st.title}</p>
            <p className="mt-1 text-[15px] text-ink-muted">{st.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12">
        <RotaDemo />
      </div>
      <WorkflowRail />
    </Section>
  );
}
