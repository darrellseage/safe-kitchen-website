import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PillarIcon } from "@/components/ui/pillar-icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusChip } from "@/components/ui/status-chip";
import { KitchenTypes } from "./kitchen-types";
import { overview } from "@/content/home";
import { section } from "@/content/navigation";
import { pillars } from "@/content/pillars";

/** Section 1b: the five pillars, each linking to its section. */
export function PillarOverview() {
  return (
    <Section id="overview" labelledBy="overview-title" tone="mint">
      <SectionHeading id="overview-title" eyebrow={overview.eyebrow} title={overview.title} accent={overview.accent} intro={overview.intro} />
      <ul className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p) => (
          <li key={p.id}>
            <Link
              href={section(p.id)}
              className="group grid h-full content-start gap-3 rounded-2xl border border-line bg-surface-raised p-5 shadow-card transition-shadow hover:shadow-raised"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <PillarIcon name={p.icon} className="size-5.5" />
              </span>
              <StatusChip feature={p.status} />
              <span className="text-[19px] leading-tight font-extrabold tracking-[-0.02em]">{p.name}</span>
              <span className="text-[15px] text-ink-muted">{p.benefit}</span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-accent-600">
                See how
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <KitchenTypes />
    </Section>
  );
}
