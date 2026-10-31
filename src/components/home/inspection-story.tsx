import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { inspection } from "@/content/home";

const rows = [
  { date: "30 Oct · 10:02", check: "Walk-in fridge", by: "Sam", result: "Recorded" },
  { date: "30 Oct · 10:14", check: "Freezer 1", by: "Priya", result: "Recorded" },
  { date: "29 Oct · 22:40", check: "Closing checks", by: "Jon", result: "8 of 8" },
  { date: "29 Oct · 15:05", check: "Hot holding: curry", by: "Sam", result: "corrected", corrected: true },
];

export function InspectionStory() {
  return (
    <section aria-labelledby="eho-title" className="lamp border-t border-night-700 py-24 md:py-32">
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeading id="eho-title" title={inspection.title} />
        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <ol className="grid">
              {inspection.timeline.map((t, i) => (
                <li key={t.time} className="relative grid grid-cols-[76px_1fr] gap-4 pb-8 last:pb-0">
                  {i < inspection.timeline.length - 1 ? (
                    <span aria-hidden="true" className="absolute top-3 bottom-0 left-[87px] w-0.5 bg-night-700" />
                  ) : null}
                  <time className="font-display text-[22px] leading-none font-bold text-herb-400 tabular">{t.time}</time>
                  <Reveal delay={i * 0.15} y={12} className="relative ps-6">
                    <span aria-hidden="true" className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-herb-400 bg-night-950" />
                    <p className="text-lg font-semibold">{t.title}</p>
                    <p className="text-[15.5px] text-fog-400">{t.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
            <p className="mt-10 max-w-[30ch] font-display text-[clamp(1.35rem,2.4vw,1.8rem)] leading-tight font-semibold tracking-[-0.015em]">
              {inspection.closing}
            </p>
            <p className="mt-4 max-w-[52ch] text-sm text-fog-400">{inspection.note}</p>
          </div>

          <Reveal>
            <figure className="rounded-xl bg-surface-raised p-6 text-sm text-ink shadow-[0_40px_80px_-20px_rgb(0_0_0/0.75)] sm:p-7">
              <figcaption className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-2.5">
                <span className="font-display text-xl font-bold">Inspection view · Main kitchen</span>
                <span className="flex gap-1.5 text-[12.5px]" aria-hidden="true">
                  <span className="rounded-full border border-line px-2.5 py-1">Today</span>
                  <span className="rounded-full border border-line px-2.5 py-1">7 days</span>
                  <span className="rounded-full bg-ink px-2.5 py-1 text-white">28 days</span>
                </span>
              </figcaption>
              <div className="mt-4 rounded-lg border border-warning/40 bg-warning-100/70 p-3">
                <p className="text-[13px] font-bold tracking-[0.06em] text-ink uppercase">Needs attention</p>
                <ul className="mt-1 list-disc ps-5">
                  <li>Fridge 2: no record on 2 of 7 days</li>
                  <li>1 problem waiting for manager review</li>
                </ul>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-[13.5px]">
                  <thead>
                    <tr className="text-xs tracking-[0.06em] text-ink-muted uppercase">
                      {["Date", "Check", "Recorded by", "Result"].map((h) => (
                        <th key={h} className="border-b border-line px-1 py-1.5 text-start font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.date}>
                        <td className="border-b border-line px-1 py-2 tabular">{r.date}</td>
                        <td className="border-b border-line px-1 py-2">{r.check}</td>
                        <td className="border-b border-line px-1 py-2">{r.by}</td>
                        <td className="border-b border-line px-1 py-2">
                          {r.corrected ? (
                            <>
                              <s className="text-ink-muted">Entered by mistake</s> · corrected
                            </>
                          ) : (
                            r.result
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3.5 flex flex-wrap justify-between gap-2 text-[12.5px] text-ink-muted">
                <span>Illustrative demo data</span>
                <span>Page 1 of 6 · Print or save as PDF</span>
              </p>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
