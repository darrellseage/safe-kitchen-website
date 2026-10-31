import { Section } from "@/components/ui/section";
import { SectionCta } from "./section-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { certificateDisclosure, training } from "@/content/home";
import { trainingComparison } from "@/lib/value";
import { PillarLines } from "./pillar-lines";
import { gbp } from "./sales-bits";
import { TrainingDemo } from "./training-demo";

/** Staff Training & Certificates: unlimited in-house training, course to phone, certificate saved. */
export function TrainingSection() {
  const { comparison } = training;
  return (
    <Section id="training" labelledBy="training-title">
      <SectionHeading id="training-title" eyebrow={training.eyebrow} status={training.status} title={training.title} accent={training.accent} intro={training.intro} />
      <PillarLines lines={training.lines} />

      <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-surface-raised shadow-card">
        <p className="border-b border-line bg-brand-50 px-6 py-4 text-lg font-extrabold">{comparison.title}</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-[15.5px]">
            <thead>
              <tr className="text-[13px] tracking-[0.06em] text-ink-muted uppercase">
                <th scope="col" className="px-6 py-3 text-start font-bold">Staff</th>
                <th scope="col" className="px-6 py-3 text-start font-bold">Separate courses at {gbp(comparison.coursePrice)}</th>
                <th scope="col" className="px-6 py-3 text-start font-bold">Safe Kitchen, one year</th>
                <th scope="col" className="px-6 py-3 text-start font-bold">Difference</th>
              </tr>
            </thead>
            <tbody>
              {comparison.staff.map((n) => {
                const r = trainingComparison(n, comparison.coursePrice);
                return (
                  <tr key={n} className="border-t border-line">
                    <th scope="row" className="px-6 py-3.5 text-start font-bold tabular">{n}</th>
                    <td className="px-6 py-3.5 tabular">{gbp(r.separate)}</td>
                    <td className="px-6 py-3.5 tabular">{gbp(r.plan, true)}</td>
                    <td className="px-6 py-3.5 text-lg font-extrabold text-brand-700 tabular">{gbp(r.difference, true)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="border-t border-line px-6 py-4 text-[13px] text-ink-muted">{comparison.note}</p>
      </div>

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
      <p className="mt-6 max-w-[85ch] text-sm text-ink-muted">
        {certificateDisclosure} {training.note}
      </p>
      <SectionCta text="New staff? No additional course fee. Training is included from £14.99 a month." />
    </Section>
  );
}
