import { Clock3, GraduationCap, PiggyBank, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { promises } from "@/content/home";
import { ctaHref } from "@/content/navigation";

const icons = [ShieldCheck, PiggyBank, Clock3, GraduationCap];

/** The overall sales promise: reputation, costs, time, training. The page's one deep-green band. */
export function PromisesBand() {
  return (
    <section aria-label="What Safe Kitchen does for your business" className="bg-brand-900 text-white">
      <div className="mx-auto w-[min(1200px,100%-40px)] py-14">
        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {promises.items.map((p, i) => {
            const Icon = icons[i];
            return (
              <li key={p.title} className="flex gap-3.5">
                <span className="grid size-11 flex-none place-items-center rounded-xl bg-white/10 text-accent-300">
                  <Icon className="size-5.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xl font-extrabold tracking-[-0.02em]">{p.title}.</span>
                  <span className="block text-[15px] text-white/80">{p.body}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-7">
          <p className="text-lg font-extrabold">{promises.footer}</p>
          <ButtonLink href={ctaHref} variant="light">
            Get early access
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
