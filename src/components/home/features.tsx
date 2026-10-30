import { featureStatus } from "@/config/features";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusChip } from "@/components/ui/status-chip";
import { features } from "@/content/home";
import { cn } from "@/lib/cn";

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-20 border-t border-night-700 py-24 md:py-32">
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeading id="features-title" title={features.title} intro={features.intro} />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((f, i) => (
            <li key={f.key}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <article className="grid h-full content-start gap-4 rounded-3xl border border-night-700 bg-night-900 p-5 transition-colors hover:border-night-600">
                  <div aria-hidden="true" className="grid min-h-33 gap-1.5 rounded-xl bg-ui-surface p-3 text-[13px] text-ui-ink">
                    {f.rows.map((r) => (
                      <div
                        key={r.label}
                        className={cn(
                          "flex justify-between gap-2 rounded-lg border px-2.5 py-2",
                          r.tone === "warn" ? "border-ui-warning/40 bg-ui-warning-100/60" : "border-ui-line bg-ui-raised",
                        )}
                      >
                        <span>{r.label}</span>
                        <b className={cn("tabular", r.tone === "done" && "text-ui-success")}>{r.value}</b>
                      </div>
                    ))}
                  </div>
                  <StatusChip status={featureStatus[f.key]} />
                  <h3 className="font-display text-2xl leading-tight font-bold tracking-[-0.02em]">{f.title}</h3>
                  <dl className="grid gap-2 text-[15px]">
                    {[
                      ["Problem", f.problem],
                      ["Easier day", f.easier],
                      ["Outcome", f.outcome],
                    ].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[92px_1fr] gap-2.5">
                        <dt className="pt-0.5 text-xs font-semibold tracking-[0.08em] text-fog-400 uppercase">{k}</dt>
                        <dd className="text-fog-200">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
