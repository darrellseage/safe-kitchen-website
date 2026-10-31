import type { ReactNode } from "react";
import { ArrowDown, Check, ScanEye, ShoppingBasket } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { DeviceFrame } from "@/components/ui/device-frame";
import { ScreenHeader, TaskRow } from "@/components/product/ui-bits";
import { nowTasks } from "@/content/demo-data";
import { hero } from "@/content/home";
import { ctaHref, section } from "@/content/navigation";

/** Section 1: headline and a layered, illustrative view of the five pillars working together. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip bg-surface-raised">
      <div className="mx-auto grid w-[min(1200px,100%-40px)] items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h1 id="hero-title" className="animate-rise text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.98] font-extrabold tracking-[-0.045em]">
            {hero.titleLead} <span className="block text-brand-500">{hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-ink-muted md:text-xl">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={ctaHref}>{hero.primary}</ButtonLink>
            <ButtonLink href={section("overview")} variant="secondary">
              {hero.secondary}
              <ArrowDown className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <p className="mt-8 max-w-[56ch] text-sm text-ink-muted">{hero.note}</p>
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
      className="relative mx-auto h-[540px] w-full max-w-[580px] animate-rise [animation-delay:150ms] sm:h-[540px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-12 bottom-6 rounded-[32px] bg-[linear-gradient(160deg,var(--color-brand-50),var(--color-accent-100))] sm:left-12"
      />
      <div className="absolute top-12 left-0 w-full sm:w-[62%]">
        <DeviceFrame label="Illustrative">
          <ScreenHeader title="Now" subtitle="Lunch prep · Kitchen tablet" />
          <div className="grid gap-2 p-3 text-sm">
            {nowTasks.map((t) => (
              <TaskRow key={t.title} {...t} compact />
            ))}
          </div>
        </DeviceFrame>
      </div>

      <FloatCard className="top-0 right-0 w-52 animate-bob max-sm:top-auto max-sm:right-2 max-sm:bottom-2">
        <CardLabel>Clock-in · planned</CardLabel>
        <p className="mt-1 text-[28px] leading-none font-extrabold tracking-[-0.03em] tabular">08:57</p>
        <p className="mt-1.5 flex items-center gap-1 text-[13.5px] font-bold text-success">
          <Check className="size-4" aria-hidden="true" />
          Sam clocked in
        </p>
      </FloatCard>

      <FloatCard className="right-0 bottom-6 hidden w-60 animate-bob [animation-delay:-2.5s] sm:block">
        <CardLabel>
          <ScanEye className="size-3.5" aria-hidden="true" />
          AI Checker · planned
        </CardLabel>
        <p className="mt-1 text-[17px] font-extrabold">2 things need attention</p>
        <p className="text-[13px] text-ink-muted">Fridge 2: no afternoon reading</p>
      </FloatCard>

      <FloatCard className="bottom-6 left-0 hidden w-[17rem] border-warning/40 bg-warning-100/50 sm:block">
        <CardLabel>
          <ShoppingBasket className="size-3.5" aria-hidden="true" />
          Ordering · planned
        </CardLabel>
        <p className="mt-1 font-extrabold text-warning-ink">Possible duplicate order</p>
        <p className="text-[13px] text-ink-muted">Chicken breast 20 kg is already on Thursday’s delivery</p>
      </FloatCard>
    </div>
  );
}
