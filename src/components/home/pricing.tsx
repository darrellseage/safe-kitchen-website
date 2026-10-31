"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { annualSaving, formatGBP, pricing } from "@/config/pricing";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { pricingCopy } from "@/content/home";
import { ctaHref, section } from "@/content/navigation";
import { cn } from "@/lib/cn";

/** Pricing: one plan per site, everything included, unlimited staff (app D-074, D-076, D-079). */
export function Pricing() {
  const [annual, setAnnual] = useState(true);
  const saving = annualSaving(pricing.monthly, pricing.annual);
  const percent = Math.round((saving / (pricing.monthly * 12)) * 1000) / 10;

  return (
    <Section id="pricing" labelledBy="pricing-title" tone="fern">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading id="pricing-title" title={pricingCopy.title} accent={pricingCopy.accent} intro={pricingCopy.intro} />
        <div role="group" aria-label="Billing period" className="grid grid-cols-2 rounded-full border border-line bg-surface-raised p-1 text-[15px] font-bold">
          {[false, true].map((isAnnual) => (
            <button
              key={String(isAnnual)}
              type="button"
              aria-pressed={annual === isAnnual}
              onClick={() => setAnnual(isAnnual)}
              className={cn("min-h-12 rounded-full px-5 transition-colors", annual === isAnnual ? "bg-accent-600 text-white" : "text-ink-muted hover:text-ink")}
            >
              {isAnnual ? pricingCopy.annualLabel : pricingCopy.monthlyLabel}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-6 text-xl font-extrabold text-brand-900">{pricingCopy.tagline}</p>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
        <article className="grid content-start gap-6 rounded-3xl border-2 border-accent-600 bg-surface-raised p-7 shadow-raised sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-[26px] font-extrabold tracking-[-0.02em]">Per site, unlimited staff</h3>
            {annual ? (
              <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-bold text-brand-700">
                Save {formatGBP(saving)} ({percent}%)
              </span>
            ) : null}
          </div>
          <div aria-live="polite">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-[clamp(3.2rem,7vw,4.8rem)] leading-none font-extrabold tracking-[-0.045em] tabular">
                {formatGBP(annual ? pricing.annual : pricing.monthly)}
              </span>
              <span className="text-lg text-ink-muted">
                {annual ? "a year" : "a month"} {pricing.vatNote}, {pricing.unit}
              </span>
            </p>
            <p className="mt-2 text-[15px] text-ink-muted">
              {annual
                ? `Compared with 12 monthly payments of ${formatGBP(pricing.monthly)}.`
                : `Or ${formatGBP(pricing.annual)} a year ${pricing.vatNote} and save ${formatGBP(saving)}.`}{" "}
              You’re never charged per employee.
            </p>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {pricing.includes.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 size-5 flex-none text-brand-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href={ctaHref} className="w-full sm:w-fit">
            Get early access
          </ButtonLink>
        </article>

        <article className="grid content-start gap-5 rounded-3xl border border-line bg-surface-raised p-7 sm:p-9">
          <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{pricingCopy.multiTitle}</h3>
          <p className="text-ink-muted">{pricingCopy.multiBody}</p>
          <ul className="grid gap-2.5">
            {pricing.multiSite.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 size-5 flex-none text-brand-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href={section("book-a-call")} variant="secondary" className="w-full sm:w-fit">
            Book a call
          </ButtonLink>
        </article>
      </div>
    </Section>
  );
}
