import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { overview } from "@/content/home";
import { FeatureCards } from "./feature-cards";

/** Homepage overview of everything Safe Kitchen does: eight cards, each linking to its page. */
export function FeatureOverview() {
  return (
    <Section id="features" labelledBy="overview-title" tone="white">
      <SectionHeading id="overview-title" eyebrow={overview.eyebrow} title={overview.title} accent={overview.accent} intro={overview.intro} />
      <FeatureCards className="mt-10" />
    </Section>
  );
}
