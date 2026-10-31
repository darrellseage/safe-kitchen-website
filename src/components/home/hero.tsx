import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { DeviceFrame } from "@/components/ui/device-frame";
import { ScreenHeader, TaskRow } from "@/components/product/ui-bits";
import { nowTasks } from "@/content/demo-data";
import { hero } from "@/content/home";
import { ctaHref } from "@/content/navigation";

/** Section 1. Stage 1 shows the real headline and a first product screen; the full layered composition arrives in Stage 2. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-surface-raised">
      <div className="mx-auto grid w-[min(1200px,100%-40px)] items-center gap-14 py-14 md:py-20 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <h1 id="hero-title" className="animate-rise text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.98] font-extrabold tracking-[-0.045em]">
            {hero.titleLead} <span className="block text-brand-500">{hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-ink-muted md:text-xl">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={ctaHref}>{hero.primary}</ButtonLink>
            <ButtonLink href="/#overview" variant="secondary">
              {hero.secondary}
              <ArrowDown className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <p className="mt-8 max-w-[56ch] text-sm text-ink-muted">{hero.note}</p>
        </div>
        <div className="relative animate-rise [animation-delay:150ms]">
          <div aria-hidden="true" className="absolute inset-x-0 top-10 -bottom-6 rounded-[32px] bg-[linear-gradient(160deg,var(--color-brand-50),var(--color-accent-100))] sm:left-10" />
          <DeviceFrame label="Illustrative · in development" className="relative">
            <ScreenHeader title="Now" subtitle="Lunch prep · Kitchen tablet" />
            <div className="grid gap-2 p-3 text-sm">
              {nowTasks.map((t) => (
                <TaskRow key={t.title} {...t} />
              ))}
            </div>
          </DeviceFrame>
        </div>
      </div>
    </section>
  );
}
