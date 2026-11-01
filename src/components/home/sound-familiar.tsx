import Image from "next/image";
import { FolderOpen } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { familiar } from "@/content/home";
import { images, type StockImage } from "@/content/images";
import { HygieneRatings } from "./hygiene-ratings";

const visuals: Array<StockImage | "folders"> = [images.plating, "folders", images.owner];

/** The problem: three moments kitchen teams and owners recognise, and what's at stake for the hygiene rating. */
export function SoundFamiliar() {
  return (
    <Section id="familiar" labelledBy="familiar-title" tone="fern">
      <SectionHeading id="familiar-title" title={familiar.title} intro={familiar.intro} />
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {familiar.scenarios.map((s, i) => {
          const visual = visuals[i];
          return (
            <li key={s.who}>
              <Reveal delay={i * 0.1} className="h-full">
                <article className="grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-card">
                  <div className="relative aspect-[16/9] bg-surface-sunken md:aspect-[4/3]">
                    {visual === "folders" ? (
                      <FoldersIllustration />
                    ) : (
                      <Image
                        src={visual.src}
                        alt={visual.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        quality={70}
                        className="object-cover"
                        style={{ objectPosition: visual.focal }}
                      />
                    )}
                  </div>
                  <div className="grid content-start gap-2 p-6">
                    <p className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{s.who}</p>
                    <h3 className="text-[22px] leading-tight font-extrabold tracking-[-0.02em]">{s.title}</h3>
                    <p className="text-ink-muted">{s.body}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
      <HygieneRatings />
    </Section>
  );
}

/** Drawn stand-in for the inspection scenario: a shelf of overflowing folders. */
function FoldersIllustration() {
  const spines = ["bg-brand-700", "bg-accent-600", "bg-control-border", "bg-brand-500", "bg-warning", "bg-accent-700", "bg-ink-subtle"];
  return (
    <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-[linear-gradient(160deg,var(--color-surface),var(--color-surface-sunken))]">
      <div className="relative w-[78%]">
        <div className="flex items-end gap-1.5">
          {spines.map((c, i) => (
            <span key={i} className={`${c} block w-[12%] rounded-t-md opacity-90`} style={{ height: `${96 + ((i * 37) % 44)}px` }} />
          ))}
        </div>
        <div className="h-2.5 rounded-sm bg-paper-line" />
        <div className="absolute -top-4 -right-2 rotate-6 rounded-md bg-paper p-3 shadow-raised">
          <FolderOpen className="size-6 text-warning" />
          <span className="mt-1.5 block h-1.5 w-16 rounded bg-paper-line" />
          <span className="mt-1 block h-1.5 w-10 rounded bg-paper-line" />
        </div>
      </div>
    </div>
  );
}
