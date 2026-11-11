import { Check, Info } from "lucide-react";
import type { ReactNode } from "react";
import { FaqList } from "@/components/home/faq";
import { ButtonLink } from "@/components/ui/button-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { cta } from "@/content/cta";
import { faqsFor } from "@/content/faqs";
import { featureContent } from "@/content/feature-pages";
import { featureBySlug, featureHref, featurePages, routes, type FeatureSlug } from "@/content/site-map";
import { SiteLink } from "@/components/site/site-link";
import { FeatureCards } from "./feature-cards";

function Points({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-line bg-surface-raised p-6 shadow-card sm:p-7">
      <h3 className="text-xl font-extrabold tracking-[-0.02em]">{title}</h3>
      <ul className="mt-4 grid gap-3">
        {items.map((i) => (
          <li key={i} className="flex gap-3 text-[16.5px]">
            <Check className="mt-1 size-5 flex-none text-brand-500" aria-hidden="true" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The template for every feature page: breadcrumb, the feature's own section
 * and demo (passed as children), who it helps, an example from a shift,
 * what's recorded, limits worth knowing, questions, related features and a
 * call to action.
 */
export function FeaturePage({ slug, children }: { slug: FeatureSlug; children?: ReactNode }) {
  const page = featureBySlug(slug);
  const c = featureContent[slug];
  const questions = faqsFor(slug);
  const index = featurePages.findIndex((f) => f.slug === slug);
  const next = featurePages[(index + 1) % featurePages.length];

  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { label: "Home", href: routes.home },
          { label: "Features", href: routes.features },
          { label: page.name, href: featureHref(slug) },
        ]}
      />
      {c.hero ? (
        <PageHero id="page-title" eyebrow={c.hero.eyebrow} title={c.hero.title} accent={c.hero.accent} intro={c.hero.intro}>
          <div className="mt-7">
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
          </div>
        </PageHero>
      ) : null}
      {children}

      <Section labelledBy="helps-title" tone="white">
        <h2 id="helps-title" className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">
          What it means for you
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Points title="For owners and managers" items={c.owners} />
          <Points title="For the kitchen team" items={c.team} />
        </div>
      </Section>

      <Section labelledBy="shift-title" tone="mint">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">During a shift</p>
            <h2 id="shift-title" className="mt-3 text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">
              {c.shift.title}
            </h2>
            <ol className="mt-8 grid">
              {c.shift.steps.map((s, i) => (
                <li key={s.time + s.title} className="relative grid grid-cols-[84px_1fr] gap-4 pb-7 last:pb-0">
                  {i < c.shift.steps.length - 1 ? <span aria-hidden="true" className="absolute top-3 bottom-0 left-[95px] w-0.5 bg-brand-200" /> : null}
                  <span className="text-[17px] leading-tight font-extrabold text-brand-700 tabular">{s.time}</span>
                  <div className="relative ps-6">
                    <span aria-hidden="true" className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-brand-500 bg-brand-50" />
                    <p className="text-lg font-bold">{s.title}</p>
                    <p className="text-[15.5px] text-ink-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[13px] text-ink-muted">An example with sample names and times.</p>
          </div>
          <div className="rounded-3xl border border-line bg-surface-raised p-6 shadow-card sm:p-7">
            <h2 className="text-xl font-extrabold tracking-[-0.02em]">{c.records.title}</h2>
            <ul className="mt-4 grid gap-3">
              {c.records.items.map((i) => (
                <li key={i} className="flex gap-3 text-[16px]">
                  <Check className="mt-1 size-5 flex-none text-brand-500" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="know-title" tone="white">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="know-title" className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">
              Good to know
            </h2>
            <ul className="mt-6 grid gap-3">
              {c.goodToKnow.map((g) => (
                <li key={g} className="flex gap-3 rounded-2xl border border-line bg-surface p-4 text-[15.5px] text-ink-muted">
                  <Info className="mt-0.5 size-5 flex-none text-brand-700" aria-hidden="true" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
          {questions.length ? (
            <div>
              <h2 className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">Questions</h2>
              <div className="mt-6">
                <FaqList items={questions} />
              </div>
              <SiteLink href={routes.faqs} className="mt-4 inline-flex min-h-12 items-center font-bold text-accent-600 hover:text-accent-700">
                All questions →
              </SiteLink>
            </div>
          ) : null}
        </div>
      </Section>

      <Section labelledBy="related-title" tone="warm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="related-title" className="text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
            Related features
          </h2>
          <SiteLink href={featureHref(next.slug)} className="inline-flex min-h-12 items-center font-bold text-accent-600 hover:text-accent-700">
            Next: {next.name} →
          </SiteLink>
        </div>
        <FeatureCards slugs={c.related} className="mt-6" />
      </Section>
      <CtaBand />
    </main>
  );
}
