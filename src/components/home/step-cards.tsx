import { cn } from "@/lib/cn";

/** Numbered steps: compact rows on phones, cards side by side on larger screens. */
export function StepCards({ steps, className }: { steps: ReadonlyArray<{ title: string; body: string }>; className?: string }) {
  return (
    <ol className={cn("mt-10 grid gap-2 sm:gap-4", steps.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3", className)}>
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-3 rounded-2xl border border-line bg-surface-raised p-4 sm:block sm:p-5">
          <span className="grid size-8 flex-none place-items-center rounded-full bg-accent-600 text-sm font-bold text-white tabular">{i + 1}</span>
          <span className="block">
            <span className="block font-extrabold sm:mt-3 sm:text-lg">{s.title}</span>
            <span className="mt-0.5 block text-[15px] text-ink-muted">{s.body}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
