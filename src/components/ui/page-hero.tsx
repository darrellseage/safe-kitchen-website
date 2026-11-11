import type { ReactNode } from "react";
import { Section, type SectionTone } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

/** The opening of a page that has no existing section to open it. Same heading style as every section. */
export function PageHero({ id, eyebrow, title, accent, intro, tone = "mint", children }: { id: string; eyebrow?: string; title: string; accent?: string; intro?: string; tone?: SectionTone; children?: ReactNode }) {
  return (
    <Section labelledBy={id} tone={tone}>
      <SectionHeading id={id} as="h1" eyebrow={eyebrow} title={title} accent={accent} intro={intro} />
      {children}
    </Section>
  );
}
