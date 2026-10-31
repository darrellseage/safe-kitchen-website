import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { finalCta, promises } from "@/content/home";
import { EarlyAccessForm } from "./early-access-form";

/** Final call to action: early access, a demo or a booked call. */
export function FinalCta() {
  return (
    <Section id="early-access" labelledBy="final-title" tone="forest">
      <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading id="final-title" size="xl" title={finalCta.title} accent={finalCta.accent} intro={finalCta.intro} />
          <ul className="mt-8 grid gap-3">
            {promises.items.map((p) => (
              <li key={p.title} className="flex gap-3 text-lg font-bold">
                <Check className="mt-1 size-5 flex-none text-brand-500" aria-hidden="true" />
                {p.title}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg font-extrabold">{promises.footer}</p>
        </div>
        <EarlyAccessForm />
      </div>
    </Section>
  );
}
