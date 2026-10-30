import { featureStatus } from "@/config/features";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusChip } from "@/components/ui/status-chip";
import { Reveal } from "@/components/ui/reveal";
import { roadmap } from "@/content/home";
import { cn } from "@/lib/cn";

export function Roadmap() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-title" className="lamp scroll-mt-20 border-t border-night-700 py-24 md:py-32">
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeading id="roadmap-title" title={roadmap.title} intro={roadmap.intro} />
        <ol className="relative mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {roadmap.items.map((item, i) => (
            <li key={item.key} className="relative">
              <Reveal delay={(i % 3) * 0.08} className="grid gap-3 border-t border-dashed border-night-600 pt-6">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -top-2 left-0 size-4 rounded-full border-2",
                    i === 0 ? "border-herb-400 bg-herb-400 shadow-[0_0_0_6px_rgb(127_224_163/0.15)]" : "border-fog-400 bg-night-950",
                  )}
                />
                <StatusChip status={featureStatus[item.key]} />
                <h3 className="font-display text-2xl leading-tight font-bold tracking-[-0.02em]">{item.title}</h3>
                <p className="text-fog-400">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-[70ch] text-sm text-fog-400">
          Planned and exploring features may change or may not happen. We’ll only describe a feature as available once
          it’s live and tested.
        </p>
      </div>
    </section>
  );
}
