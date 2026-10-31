import { Clock3, GraduationCap, PiggyBank, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { promises } from "@/content/home";
import { ctaHref } from "@/content/navigation";

const icons = [ShieldCheck, PiggyBank, Clock3, GraduationCap];

/** The overall sales promise: reputation, costs, time, training. */
export function PromisesBand() {
  return (
    <section aria-label="What Safe Kitchen does for your business" className="border-y border-brand-100 bg-brand-50">
      <div className="mx-auto w-[min(1200px,100%-40px)] py-12">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {promises.items.map((p, i) => {
            const Icon = icons[i];
            return (
              <li key={p.title} className="flex gap-3.5">
                <span className="grid size-11 flex-none place-items-center rounded-xl bg-surface-raised text-brand-700 shadow-card">
                  <Icon className="size-5.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xl font-extrabold tracking-[-0.02em] text-brand-900">{p.title}.</span>
                  <span className="block text-[15px] text-ink-muted">{p.body}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-brand-100 pt-6">
          <p className="text-lg font-extrabold text-brand-900">{promises.footer}</p>
          <ButtonLink href={ctaHref}>Get early access</ButtonLink>
        </div>
      </div>
    </section>
  );
}
