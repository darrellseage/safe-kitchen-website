"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { annualSaving, formatGBP, pricing } from "@/config/pricing";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { pricingCopy } from "@/content/home";
import { ctaHref, section } from "@/content/navigation";
import { cn } from "@/lib/cn";

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const saving = annualSaving(pricing.monthly, pricing.annual);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-20 border-t border-night-700 py-24 md:py-32">
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading id="pricing-title" title={pricingCopy.title} intro={pricingCopy.intro} />
          <div role="group" aria-label="Billing period" className="grid grid-cols-2 rounded-full border border-night-700 bg-night-900 p-1 text-[15px] font-semibold">
            {[false, true].map((isAnnual) => (
              <button
                key={String(isAnnual)}
                type="button"
                aria-pressed={annual === isAnnual}
                onClick={() => setAnnual(isAnnual)}
                className={cn(
                  "min-h-12 rounded-full px-5 transition-colors",
                  annual === isAnnual ? "bg-herb-400 text-forest-950" : "text-fog-400 hover:text-fog-50",
                )}
              >
                {isAnnual ? pricingCopy.annualLabel : pricingCopy.monthlyLabel}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <article className="lamp grid content-start gap-6 rounded-3xl border border-forest-700 bg-forest-900 p-7 sm:p-9">
            <h3 className="font-display text-[26px] font-bold tracking-[-0.02em]">Per site</h3>
            <div aria-live="polite">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-[clamp(3.2rem,7vw,4.8rem)] leading-none font-extrabold tracking-[-0.04em] tabular">
                  {formatGBP(annual ? pricing.annual : pricing.monthly)}
                </span>
                <span className="text-lg text-fog-200">
                  {annual ? "a year" : "a month"} {pricing.vatNote}, {pricing.unit}
                </span>
              </p>
              <p className="mt-2 text-[15px] text-mist-300">
                {annual
                  ? `Save ${formatGBP(saving)} a year compared with paying monthly.`
                  : `Or ${formatGBP(pricing.annual)} a year ${pricing.vatNote} and save ${formatGBP(saving)}.`}
              </p>
            </div>
            <ul className="grid gap-2.5">
              {pricing.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 size-5 flex-none text-herb-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href={ctaHref} className="w-full sm:w-fit">
              Get early access
            </ButtonLink>
          </article>

          <article className="grid content-start gap-6 rounded-3xl border border-night-700 bg-night-900 p-7 sm:p-9">
            <h3 className="font-display text-[26px] font-bold tracking-[-0.02em]">{pricingCopy.multiTitle}</h3>
            <p className="text-fog-200">{pricingCopy.multiBody}</p>
            <ul className="grid gap-2.5">
              {pricing.multiSite.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 size-5 flex-none text-herb-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href={section("book-a-call")} variant="ghost" className="w-full sm:w-fit">
              Book a call
            </ButtonLink>
          </article>
        </div>
      </div>
    </section>
  );
}
