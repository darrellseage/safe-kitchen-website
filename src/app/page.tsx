import { PaperworkCalculator } from "@/components/home/calculator";
import { FoodSafety } from "@/components/home/food-safety";
import { ComparisonSection } from "@/components/home/comparison-section";
import { Faq } from "@/components/home/faq";
import { HygieneRatings } from "@/components/home/hygiene-ratings";
import { Pricing } from "@/components/home/pricing";
import { PromisesBand } from "@/components/home/promises-band";
import { ValueCalculator } from "@/components/home/value-calculator";
import { WasteSection } from "@/components/home/waste-section";
import { AudiencesSection } from "@/components/home/audiences-section";
import { FinalCta } from "@/components/home/final-cta";
import { Roadmap } from "@/components/home/roadmap";
import { AiCheckerSection } from "@/components/home/ai-checker-section";
import { ClockInSection } from "@/components/home/clock-in-section";
import { Hero } from "@/components/home/hero";
import { OrderingSection } from "@/components/home/ordering-section";
import { RotasSection } from "@/components/home/rotas-section";
import { InspectionStory } from "@/components/home/inspection-story";
import { SoundFamiliar } from "@/components/home/sound-familiar";
import { TrainingSection } from "@/components/home/training-section";
import { Transformation } from "@/components/home/transformation";
import { PillarOverview } from "@/components/home/pillar-overview";
import { faq } from "@/content/home";

// FAQ structured data: only facts stated on the page.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

/**
 * Homepage in the agreed order (docs/REDESIGN_PROPOSAL.md §4).
 * Stage 1 (Foundation): real headings, copy and status labels for every
 * section; demos arrive in later stages.
 */
export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <PromisesBand />
      <PillarOverview />
      <SoundFamiliar />
      <HygieneRatings />
      <PaperworkCalculator />
      <Transformation />
      <FoodSafety />
      <TrainingSection />
      <InspectionStory />
      <RotasSection />
      <ClockInSection />
      <AiCheckerSection />
      <OrderingSection />
      <WasteSection />
      <ComparisonSection />
      <AudiencesSection />
      <ValueCalculator />
      <Roadmap />
      <Pricing />
      <Faq />
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}
