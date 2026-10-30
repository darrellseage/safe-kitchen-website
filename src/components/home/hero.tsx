import { ArrowDown, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { DeviceFrame } from "@/components/ui/device-frame";
import { ScreenHeader, TaskRow } from "@/components/product/ui-bits";
import { nowTasks } from "@/content/demo-data";
import { hero } from "@/content/home";
import { ctaHref } from "@/content/navigation";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="lamp relative -mt-18 overflow-x-clip pt-18">
      <div className="mx-auto grid w-[min(1200px,100%-40px)] items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <h1
            id="hero-title"
            className="animate-rise font-display text-[clamp(2.9rem,6.2vw,5.4rem)] leading-[0.95] font-extrabold tracking-[-0.045em]"
          >
            {hero.titleLead}{" "}
            <span className="block font-semibold text-fog-400">
              {hero.titleSoft} <em className="text-herb-400 not-italic">{hero.titleAccent}</em>
            </span>
          </h1>
          <p className="mt-7 max-w-[44ch] text-lg text-fog-200 md:text-xl">{hero.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={ctaHref}>{hero.primary}</ButtonLink>
            <ButtonLink href="/#how-it-works" variant="ghost">
              {hero.secondary}
              <ArrowDown className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fog-400">
            {hero.points.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <Check className="size-4 text-herb-400" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="Illustration of the Safe Kitchen app: a kitchen tablet showing today's checks, a phone recording a freezer reading, and a manager summary."
      className="relative mx-auto h-[340px] w-full max-w-[560px] animate-rise [animation-delay:150ms] sm:h-[600px]"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgb(255_233_196/0.16),transparent_70%)]"
      />
      <div className="absolute top-6 left-0 w-full sm:left-[4%] sm:w-[88%] sm:[transform:perspective(1600px)_rotateY(-9deg)_rotateX(4deg)]">
        <DeviceFrame label={hero.visualLabel}>
          <ScreenHeader title="Now" subtitle="Lunch prep · Kitchen tablet" />
          <div className="grid gap-2 p-3 text-sm">
            {nowTasks.map((t) => (
              <TaskRow key={t.title} {...t} />
            ))}
          </div>
        </DeviceFrame>
      </div>

      <div className="absolute bottom-4 left-0 hidden w-60 rounded-2xl border border-night-600/70 bg-night-900/75 p-4 text-sm shadow-[0_30px_60px_-16px_rgb(0_0_0/0.7)] backdrop-blur-xl sm:block">
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-fog-400 uppercase">Today · 2 sites</p>
        <div className="flex justify-between border-t border-night-700 py-2">
          <span>Checks done</span>
          <b className="tabular">18 of 21</b>
        </div>
        <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-night-700">
          <div className="h-full w-[86%] rounded-full bg-herb-400" />
        </div>
        <div className="flex justify-between border-t border-night-700 py-2">
          <span>Waiting for review</span>
          <b className="tabular">1</b>
        </div>
        <div className="flex justify-between border-t border-night-700 pt-2">
          <span>Missing</span>
          <b>Fridge 2 · PM</b>
        </div>
      </div>

      <div className="absolute -right-2 bottom-0 hidden w-52 animate-float sm:block">
        <DeviceFrame kind="phone">
          <div className="px-3.5 pt-4 pb-3.5">
            <p className="text-xs font-semibold text-ui-muted">Freezer 1 · reading</p>
            <p className="mt-1 font-display text-4xl font-extrabold tracking-tight tabular sm:text-[44px]">
              −19.4<span className="text-xl font-semibold text-ui-muted">°C</span>
            </p>
            <div className="relative mt-3 h-10 rounded-xl border border-ui-line bg-[linear-gradient(90deg,var(--color-scale-cold),var(--color-ui-sunken)_50%,var(--color-scale-warm))]">
              <span className="absolute top-1/2 left-[38%] size-8 -translate-1/2 rounded-full border-[3px] border-ui-teal bg-ui-raised shadow" />
            </div>
            <p className="mt-3 rounded-xl bg-ui-teal py-3 text-center text-sm font-bold text-white">Save reading</p>
            <p className="mt-2 text-[11.5px] leading-snug text-ui-muted">Priya · 10:14 · Keypad available</p>
          </div>
        </DeviceFrame>
      </div>
    </div>
  );
}
