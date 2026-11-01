import { whenLive } from "@/config/features";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChefHat, PlayCircle, ScanEye, ShoppingBasket } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { DeviceFrame } from "@/components/ui/device-frame";
import { ScreenHeader, TaskRow } from "@/components/product/ui-bits";
import { nowTasks } from "@/content/demo-data";
import { hero } from "@/content/home";
import { founder } from "@/content/founder";
import { formatGBP, pricing } from "@/config/pricing";
import { ctaHref, section } from "@/content/navigation";

/** Section 1: what it is, who it's for, the price, and the founder line, all on the first screen. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip bg-surface-raised">
      <div className="mx-auto grid w-[min(1200px,100%-40px)] items-center gap-12 py-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-5 flex w-fit items-center gap-2.5 rounded-full bg-brand-50 py-1.5 ps-1.5 pe-4 text-[15px] font-extrabold text-brand-900">
            <span className="grid size-8 flex-none place-items-center rounded-full bg-deep text-white">
              <ChefHat className="size-4.5" aria-hidden="true" />
            </span>
            {hero.credibility}
          </p>
          <h1 id="hero-title" className="animate-rise text-[clamp(2.5rem,5vw,4.4rem)] leading-[0.98] font-extrabold tracking-[-0.045em]">
            {hero.titleLead} <span className="block text-brand-500">{hero.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-[54ch] text-lg text-ink-muted">{hero.body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-line bg-surface px-4 py-3">
            <p className="flex items-baseline gap-x-1.5">
              <span className="text-sm text-ink-muted">{hero.priceLead}</span>
              <span className="text-2xl font-extrabold tracking-[-0.03em] text-brand-900 tabular">{formatGBP(pricing.monthly)}</span>
              <span className="text-sm font-semibold text-ink-muted">{hero.priceTail}</span>
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[14.5px] font-semibold">
              {hero.pricePoints.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Check className="size-4 flex-none text-brand-500" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={ctaHref} className="max-sm:w-full">
              {hero.primary}
            </ButtonLink>
            <ButtonLink href={section("tour")} variant="secondary" className="max-sm:w-full">
              <PlayCircle className="size-5" aria-hidden="true" />
              {hero.secondary}
            </ButtonLink>
          </div>
          <p className="mt-3 text-sm font-semibold text-brand-700">{hero.freeNote}</p>
          <p className="mt-6 flex items-center gap-3 border-t border-line pt-5 text-[15px] text-ink-muted">
            {founder.photo ? (
              <Image src={founder.photo.src} alt="" width={44} height={44} quality={80} className="size-11 flex-none rounded-full object-cover" style={{ objectPosition: founder.photo.focal }} />
            ) : (
              <span aria-hidden="true" className="grid size-11 flex-none place-items-center rounded-full bg-deep text-[13px] font-extrabold text-white">
                {founder.initials}
              </span>
            )}
            <span>
              {founder.short}{" "}
              <Link href={section("founder")} className="font-semibold text-accent-600 underline underline-offset-2">
                Read Darrell’s story
              </Link>
            </span>
          </p>
          <p className="mt-4 max-w-[60ch] text-[13px] text-ink-muted">{hero.note}</p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function FloatCard({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`absolute rounded-2xl border border-line bg-surface-raised p-4 text-sm shadow-raised ${className}`}>{children}</div>
  );
}

function CardLabel({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-1.5 text-xs font-bold tracking-[0.06em] text-ink-muted uppercase">{children}</p>;
}

function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="Illustration of Safe Kitchen: a kitchen tablet showing today's food safety checks, with cards for a staff clock-in, an AI Checker summary and a possible duplicate supplier order."
      className="relative mx-auto h-[470px] w-full max-w-[580px] animate-rise [animation-delay:150ms] sm:h-[540px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-12 bottom-6 rounded-[32px] bg-[linear-gradient(160deg,var(--color-brand-50),var(--color-accent-100))] sm:left-12"
      />
      <div className="absolute top-12 left-0 w-full sm:w-[62%]">
        <DeviceFrame label={whenLive("Illustrative", "Sample data")}>
          <ScreenHeader title="Now" subtitle="Lunch prep · Kitchen tablet" />
          <div className="grid gap-2 p-3 text-sm">
            {nowTasks.map((t) => (
              <TaskRow key={t.title} {...t} compact />
            ))}
          </div>
        </DeviceFrame>
      </div>

      <FloatCard className="top-0 right-0 w-52 animate-bob max-sm:top-auto max-sm:right-2 max-sm:bottom-2">
        <CardLabel>{whenLive("Clock-in · planned", "Clock-in")}</CardLabel>
        <p className="mt-1 text-[28px] leading-none font-extrabold tracking-[-0.03em] tabular">08:57</p>
        <p className="mt-1.5 flex items-center gap-1 text-[13.5px] font-bold text-success">
          <Check className="size-4" aria-hidden="true" />
          Sam clocked in
        </p>
      </FloatCard>

      <FloatCard className="right-0 bottom-6 hidden w-60 animate-bob [animation-delay:-2.5s] sm:block">
        <CardLabel>
          <ScanEye className="size-3.5" aria-hidden="true" />
          {whenLive("AI Checker · planned", "AI Checker")}
        </CardLabel>
        <p className="mt-1 text-[17px] font-extrabold">2 things need attention</p>
        <p className="text-[13px] text-ink-muted">Fridge 2: no afternoon reading</p>
      </FloatCard>

      <FloatCard className="bottom-6 left-0 hidden w-[17rem] border-warning/40 bg-warning-100/50 sm:block">
        <CardLabel>
          <ShoppingBasket className="size-3.5" aria-hidden="true" />
          {whenLive("Ordering · planned", "Ordering")}
        </CardLabel>
        <p className="mt-1 font-extrabold text-warning-ink">Possible duplicate order</p>
        <p className="text-[13px] text-ink-muted">Chicken breast 20 kg is already on Thursday’s delivery</p>
      </FloatCard>
    </div>
  );
}
