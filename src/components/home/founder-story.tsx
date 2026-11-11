import Image from "next/image";
import { ArrowRight, Check, Quote } from "lucide-react";
import { SiteLink } from "@/components/site/site-link";
import { routes } from "@/content/site-map";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { founder } from "@/content/founder";

/** The founder's real kitchen experience, with his own photo. */
export function FounderStory({ asPage = false, compact = false }: { asPage?: boolean; compact?: boolean } = {}) {
  return (
    <Section id="founder" labelledBy="founder-title" tone="mint">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-5">
          <figure className="relative aspect-[4/3] max-w-[420px] lg:aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface-raised shadow-raised">
            {founder.photo ? (
              <Image src={founder.photo.src} alt={founder.photo.alt} fill sizes="(min-width: 1024px) 30vw, 90vw" quality={80} className="object-cover" style={{ objectPosition: founder.photo.focal }} />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(160deg,var(--color-brand-50),var(--color-accent-100))]">
                <span aria-hidden="true" className="grid size-24 place-items-center rounded-full bg-deep text-4xl lg:size-36 lg:text-5xl font-extrabold tracking-[-0.04em] text-white">
                  {founder.initials}
                </span>
                <span className="absolute inset-x-0 bottom-5 text-center text-sm font-semibold text-ink-muted">{founder.photoPending}</span>
              </div>
            )}
            <figcaption className="sr-only">{founder.name}</figcaption>
          </figure>
          <dl className="grid max-w-[420px] grid-cols-3 gap-2">
            {founder.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse justify-end rounded-2xl border border-line bg-surface-raised p-3.5">
                <dt className="mt-1 text-[13px] leading-snug text-ink-muted">{f.label}</dt>
                <dd className="text-lg leading-tight font-extrabold tracking-[-0.02em] text-brand-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <SectionHeading id="founder-title" as={asPage ? "h1" : "h2"} eyebrow={founder.eyebrow} title={founder.title} accent={founder.accent} />
          <div className="mt-6 grid max-w-[62ch] gap-4 text-lg text-ink-muted">
            {(compact ? founder.story.slice(0, 2) : founder.story).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <blockquote className="mt-8 flex max-w-[62ch] gap-4 rounded-3xl bg-deep p-6 text-white sm:p-7">
            <Quote className="size-7 flex-none text-accent-300" aria-hidden="true" />
            <div>
              <p className="text-[clamp(1.2rem,2vw,1.45rem)] leading-snug font-extrabold tracking-[-0.015em]">{founder.quote}</p>
              <footer className="mt-3 text-[15px] text-white/80">
                <b className="text-white">{founder.name}</b>, {founder.role}
              </footer>
            </div>
          </blockquote>
          {compact ? (
            <SiteLink href={routes.about} className="mt-6 inline-flex min-h-12 items-center gap-1.5 font-bold text-accent-600 hover:text-accent-700">
              Read Darrell’s story
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </SiteLink>
          ) : (
            <>
            <p className="mt-8 text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{founder.responsibilitiesTitle}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {founder.responsibilities.map((r) => (
                <li key={r} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-raised px-3.5 py-1.5 text-[14.5px] font-semibold">
                  <Check className="size-4 text-brand-500" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
