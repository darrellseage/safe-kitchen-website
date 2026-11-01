import { Bot, ChefHat, GraduationCap, Layers3, NotebookPen } from "lucide-react";
import { promises } from "@/content/home";

const icons = [NotebookPen, Layers3, Bot, GraduationCap];

/** The homepage's key messages (owner, 1 Nov 2026), straight after the hero. */
export function PromisesBand() {
  return (
    <section aria-labelledby="promises-title" className="bg-deep text-white">
      <div className="mx-auto w-[min(1200px,100%-40px)] py-12 md:py-14">
        <h2 id="promises-title" className="sr-only">
          {promises.label}
        </h2>
        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {promises.items.map((p, i) => {
            const Icon = icons[i];
            return (
              <li key={p.title} className="flex gap-3.5">
                <span className="grid size-11 flex-none place-items-center rounded-xl bg-white/10 text-accent-300">
                  <Icon className="size-5.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xl leading-tight font-extrabold tracking-[-0.02em]">{p.title}</span>
                  <span className="mt-1 block text-[15px] text-white/80">{p.body}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-9 flex items-center gap-3 border-t border-white/15 pt-7 text-lg font-extrabold">
          <ChefHat className="size-6 flex-none text-accent-300" aria-hidden="true" />
          {promises.footer}
        </p>
      </div>
    </section>
  );
}
