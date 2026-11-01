import { BadgeCheck, Check, Clock3, X } from "lucide-react";
import { annualSaving, foundingOffer, formatGBP, pricing, sitesCost, withVat } from "@/config/pricing";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { pricingCopy } from "@/content/home";
import { ctaHref, section } from "@/content/navigation";
import { minutesPerWeekToCover } from "@/lib/value";
import { cn } from "@/lib/cn";

/**
 * Pricing: one plan per site, everything included, unlimited staff (app D-074,
 * D-076, D-079). Monthly and annual side by side, with and without VAT.
 */
export function Pricing() {
  const saving = annualSaving(pricing.monthly, pricing.annual);
  const plans = [
    { label: pricingCopy.monthlyLabel, price: pricing.monthly, per: pricingCopy.perMonth, best: false },
    { label: pricingCopy.annualLabel, price: pricing.annual, per: pricingCopy.perYear, best: true },
  ];
  const sites = pricing.multiSiteExample;

  return (
    <Section id="pricing" labelledBy="pricing-title" tone="fern">
      <SectionHeading id="pricing-title" eyebrow={pricingCopy.eyebrow} title={pricingCopy.title} accent={pricingCopy.accent} intro={pricingCopy.intro} />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {plans.map((p) => (
          <article
            key={p.label}
            aria-label={`${p.label} plan`}
            className={cn("grid content-start gap-3 rounded-3xl bg-surface-raised p-6 sm:p-8", p.best ? "border-2 border-accent-600 shadow-raised" : "border border-line shadow-card")}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{p.label}</h3>
              {p.best ? <span className="rounded-full bg-accent-600 px-3 py-1 text-sm font-bold text-white">{pricingCopy.annualBadge}</span> : null}
            </div>
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-[clamp(2.8rem,6vw,4rem)] leading-none font-extrabold tracking-[-0.045em] tabular">{formatGBP(p.price)}</span>
              <span className="text-lg font-semibold text-ink-muted">
                {p.per} {pricing.vatNote}
              </span>
            </p>
            <p className="text-[15.5px] text-ink-muted">
              <b className="text-ink tabular">{formatGBP(withVat(p.price))}</b> {p.per} {pricingCopy.incVat} · {pricing.unit} · unlimited staff
            </p>
            {p.best ? (
              <p className="w-fit rounded-full bg-brand-100 px-3 py-1 text-sm font-bold text-brand-700">
                {pricingCopy.annualSaving.replace("{amount}", formatGBP(saving))}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      {foundingOffer.announce ? (
        <aside className="mt-4 flex gap-4 rounded-3xl bg-deep p-6 text-white sm:p-7">
          <BadgeCheck className="mt-0.5 size-7 flex-none text-accent-300" aria-hidden="true" />
          <div>
            <p className="text-xl font-extrabold">{pricingCopy.founding.title}</p>
            <p className="mt-1 text-white/85">{pricingCopy.founding.body.replace("{limit}", String(foundingOffer.limit))}</p>
            <p className="mt-2 text-[13px] text-white/70">{pricingCopy.founding.terms}</p>
          </div>
        </aside>
      ) : null}

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="grid gap-6 rounded-3xl border border-line bg-surface-raised p-6 sm:p-8">
          <div>
            <p className="text-lg font-extrabold">{pricingCopy.includesTitle}</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {pricing.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 size-5 flex-none text-brand-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-line pt-6">
            <p className="text-lg font-extrabold">{pricingCopy.neverPayTitle}</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {pricing.neverPay.map((item) => (
                <li key={item} className="flex gap-3">
                  <X className="mt-0.5 size-5 flex-none text-control-border" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="flex gap-3 rounded-2xl bg-brand-50 p-4 text-[15.5px]">
            <Clock3 className="mt-0.5 size-5 flex-none text-brand-700" aria-hidden="true" />
            <span>
              {pricingCopy.coverLine.replace("{minutes}", String(Math.ceil(minutesPerWeekToCover(pricing.annual, 15))))}{" "}
              <span className="text-[13px] text-ink-muted">{pricingCopy.coverNote}</span>
            </span>
          </p>
        </div>

        <div className="grid content-start gap-4 rounded-3xl border border-line bg-surface-raised p-6 sm:p-8">
          <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{pricingCopy.multiTitle}</h3>
          <p className="text-lg font-semibold">
            {pricingCopy.multiExample.replace("{sites}", String(sites)).replace("{amount}", formatGBP(sitesCost(sites)))}
          </p>
          <ul className="grid gap-2.5">
            {pricing.multiSite.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 size-5 flex-none text-brand-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-ink-muted">{pricingCopy.multiBody}</p>
          <ButtonLink href={section("book-a-call")} variant="secondary" className="w-full sm:w-fit">
            Book a call
          </ButtonLink>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ButtonLink href={ctaHref} className="max-sm:w-full">
          Get early access
        </ButtonLink>
        <p className="max-w-[60ch] text-[15px] font-semibold text-brand-900">{pricingCopy.earlyNote}</p>
      </div>
    </Section>
  );
}
