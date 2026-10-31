import type { ReactNode } from "react";
import type { FeatureKey } from "@/config/features";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Stage 1 (Foundation) placeholder: the real heading, copy and status for a
 * section, with a labelled space showing what will be built there and when.
 * Each scaffold is replaced by the finished section in Stages 2 to 4.
 */
export function SectionScaffold({
  id,
  tone,
  eyebrow,
  title,
  accent,
  intro,
  status,
  stage,
  plan,
  children,
}: {
  id: string;
  tone?: "white" | "warm" | "green";
  eyebrow?: string;
  title: string;
  accent?: string;
  intro?: string;
  status?: FeatureKey;
  stage: number;
  plan: string[];
  children?: ReactNode;
}) {
  return (
    <Section id={id} labelledBy={`${id}-title`} tone={tone}>
      <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} accent={accent} intro={intro} status={status} />
      {children}
      <div className="mt-12 rounded-3xl border-2 border-dashed border-line bg-surface-raised/60 p-6 sm:p-8">
        <p className="text-[13px] font-bold tracking-[0.08em] text-ink-muted uppercase">Built in Stage {stage}</p>
        <ul className="mt-3 grid gap-1.5 text-ink-muted sm:grid-cols-2">
          {plan.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="mt-2.5 size-1.5 flex-none rounded-full bg-control-border" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
