import { SiteLink } from "@/components/site/site-link";
import { ButtonLink } from "@/components/ui/button-link";
import { formatGBP, pricing } from "@/config/pricing";
import { cta } from "@/content/cta";
import { routes } from "@/content/site-map";

/** The call to action at the foot of every detailed page. */
export function CtaBand({ title = "See it in your own kitchen." }: { title?: string }) {
  return (
    <section aria-labelledby="cta-band-title" className="bg-deep text-white">
      <div className="mx-auto flex w-[min(1200px,100%-40px)] flex-wrap items-center justify-between gap-6 py-14">
        <div>
          <h2 id="cta-band-title" className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
            {title}
          </h2>
          <p className="mt-2 text-white/85">
            {formatGBP(pricing.monthly)} a month per site + VAT. Unlimited staff. {cta.note}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 max-sm:w-full">
          <ButtonLink href={cta.href} variant="light" className="max-sm:w-full">
            {cta.label}
          </ButtonLink>
          <SiteLink href={routes.pricing} className="inline-flex min-h-13 items-center justify-center rounded-full border-[1.5px] border-white/40 px-6 font-bold text-white transition-colors hover:bg-white/10 max-sm:w-full">
            See pricing
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
