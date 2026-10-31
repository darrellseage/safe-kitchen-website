import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { training } from "@/content/home";
import { PillarLines } from "./pillar-lines";
import { TrainingDemo } from "./training-demo";

/** Staff Training & Certificates: course to phone, test in the app, certificate saved. */
export function TrainingSection() {
  return (
    <Section id="training" labelledBy="training-title">
      <SectionHeading id="training-title" eyebrow={training.eyebrow} status={training.status} title={training.title} accent={training.accent} intro={training.intro} />
      <PillarLines lines={training.lines} />
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {training.steps.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-line bg-surface p-5">
            <span className="grid size-8 place-items-center rounded-full bg-accent-600 text-sm font-bold text-white tabular">{i + 1}</span>
            <p className="mt-3 font-extrabold">{s.title}</p>
            <p className="mt-1 text-[15px] text-ink-muted">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12">
        <TrainingDemo />
      </div>
      <p className="mt-6 max-w-[80ch] text-sm text-ink-muted">{training.note}</p>
    </Section>
  );
}
