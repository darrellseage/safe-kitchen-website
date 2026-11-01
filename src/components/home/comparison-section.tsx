import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { comparison } from "@/content/home";

/** The usual collection of separate methods, against one system. No competitor prices. Closes "Your numbers". */
export function ComparisonPart() {
  return (
    <div id="one-system" className="mt-20 scroll-mt-24 border-t border-line pt-16">
      <SectionHeading id="comparison-title" as="h3" title={comparison.title} accent={comparison.accent} />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-line bg-surface-raised p-7">
          <p className="text-xl font-extrabold text-ink-muted">{comparison.before.title}</p>
          <ul className="mt-4 grid gap-3">
            {comparison.before.items.map((i) => (
              <li key={i} className="flex gap-3 text-[16.5px] text-ink-muted">
                <X className="mt-1 size-5 flex-none text-control-border" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border-2 border-brand-500 bg-surface-raised p-7 shadow-raised">
          <p className="text-xl font-extrabold text-brand-900">{comparison.after.title}</p>
          <ul className="mt-4 grid gap-3">
            {comparison.after.items.map((i) => (
              <li key={i} className="flex gap-3 text-[16.5px] font-semibold">
                <Check className="mt-1 size-5 flex-none text-brand-500" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
