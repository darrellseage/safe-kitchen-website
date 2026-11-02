"use client";

import Image from "next/image";
import { SiteLink } from "@/components/site/site-link";
import { ArrowRight, X } from "lucide-react";
import { Tabs } from "radix-ui";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { buyers } from "@/content/home";
import { images } from "@/content/images";
import { section } from "@/content/navigation";
import { SiteSwitcher } from "./site-switcher";

/** "Built for you": takeaway owner, head chef, restaurant manager and multi-site operator. */
export function AudiencesSection() {
  return (
    <Section id="built-for-you" labelledBy="buyers-title" tone="white">
      <SectionHeading id="buyers-title" eyebrow={buyers.eyebrow} title={buyers.title} accent={buyers.accent} />
      <Tabs.Root defaultValue={buyers.tabs[0].id} className="mt-10">
        <Tabs.List aria-label="Choose your role" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {buyers.tabs.map((t) => (
            <Tabs.Trigger
              key={t.id}
              value={t.id}
              className="min-h-12 flex-none rounded-full border-[1.5px] border-line bg-surface-raised px-5 font-bold text-ink-muted transition-colors hover:text-ink data-[state=active]:border-accent-600 data-[state=active]:bg-accent-600 data-[state=active]:text-white"
            >
              {t.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {buyers.tabs.map((t) => {
          const img = t.image ? images[t.image] : null;
          return (
            <Tabs.Content key={t.id} value={t.id} className="mt-6 rounded-3xl border border-line bg-surface-raised p-5 shadow-card sm:p-8">
              <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="grid content-start gap-5">
                  {img ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-sunken">
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" quality={70} className="object-cover" style={{ objectPosition: img.focal }} />
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      <SiteSwitcher />
                      <p className="text-[15px] text-ink-muted">{buyers.siteSwitcherNote}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[13px] font-bold tracking-[0.08em] text-ink-muted uppercase">{buyers.painsTitle}</p>
                    <ul className="mt-3 grid gap-2">
                      {t.pains.map((p) => (
                        <li key={p} className="flex gap-2.5 text-[16px] text-ink-muted">
                          <X className="mt-1 size-4.5 flex-none text-control-border" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-extrabold tracking-[-0.025em]">{t.headline}</h3>
                  <p className="mt-6 text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{buyers.helpsTitle}</p>
                  <ul className="mt-3 grid gap-3">
                    {t.helps.map((h) => (
                      <li key={h.title}>
                        {h.href ? (
                          <SiteLink href={section(h.href)} className="group grid gap-1 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent-600">
                            <span className="flex items-center justify-between gap-3 text-lg font-extrabold">
                              {h.title}
                              <ArrowRight className="size-4.5 flex-none text-accent-600 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                            </span>
                            <span className="text-[15.5px] text-ink-muted">{h.body}</span>
                          </SiteLink>
                        ) : (
                          <div className="grid gap-1 rounded-2xl border border-line bg-surface p-4">
                            <span className="text-lg font-extrabold">{h.title}</span>
                            <span className="text-[15.5px] text-ink-muted">{h.body}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </Section>
  );
}
