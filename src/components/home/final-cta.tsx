import { Check } from "lucide-react";
import { formatGBP, pricing, withVat } from "@/config/pricing";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { finalCta, hero, promises } from "@/content/home";
import { EarlyAccessForm } from "./early-access-form";

/** Final call to action: early access, a demo or a booked call, with the price restated. */
export function FinalCta() {
  return (
    <Section id="early-access" labelledBy="final-title" tone="forest">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading id="final-title" size="xl" title={finalCta.title} accent={finalCta.accent} intro={finalCta.intro} />
          <ul className="mt-6 flex flex-wrap gap-2">
            {finalCta.freePoints.map((p) => (
              <li key={p} className="rounded-full bg-white/10 px-3.5 py-1.5 font-bold">
                {p}
              </li>
            ))}
          </ul>
          <ul className="mt-8 grid gap-3">
            {promises.items.map((p) => (
              <li key={p.title} className="flex gap-3 text-lg font-bold">
                <Check className="mt-1 size-5 flex-none text-brand-500" aria-hidden="true" />
                {p.title}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-line pt-6 text-lg font-extrabold">
            {formatGBP(pricing.monthly)} a month or {formatGBP(pricing.annual)} a year per site + VAT
          </p>
          <p className="mt-1 text-ink-muted">
            {formatGBP(withVat(pricing.monthly))} or {formatGBP(withVat(pricing.annual))} including VAT · {hero.pricePoints.join(" · ")}
          </p>
        </div>
        <EarlyAccessForm />
      </div>
    </Section>
  );
}
