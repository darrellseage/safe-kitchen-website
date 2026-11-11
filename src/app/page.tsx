import { FeatureOverview } from "@/components/features/feature-overview";
import { ReplacesSection } from "@/components/home/comparison-section";
import { CustomerBand, ExperienceBand } from "@/components/home/experience-band";
import { FinalCta } from "@/components/home/final-cta";
import { FounderStory } from "@/components/home/founder-story";
import { Hero } from "@/components/home/hero";
import { InspectionSection } from "@/components/home/inspection-story";
import { Pricing } from "@/components/home/pricing";
import { SiteLink } from "@/components/site/site-link";
import { featureHref } from "@/content/site-map";

/**
 * Homepage (docs/WEBSITE_RESTRUCTURE_PLAN.md): hero, the founder's experience,
 * Inspection Mode, all features, what Safe Kitchen replaces, the founder,
 * pricing and the call to action. Detail lives on the feature pages.
 */
export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <ExperienceBand />
      <InspectionSection>
        <SiteLink href={featureHref("inspection-mode")} className="mt-8 inline-flex min-h-12 items-center font-bold text-accent-600 hover:text-accent-700">
          More about Inspection Mode →
        </SiteLink>
      </InspectionSection>
      <FeatureOverview />
      <ReplacesSection />
      <FounderStory compact />
      <CustomerBand />
      <Pricing compact />
      <FinalCta />
    </main>
  );
}
