import { PaperworkCalculator } from "@/components/home/calculator";
import { FoodSafety } from "@/components/home/food-safety";
import { ComparisonSection } from "@/components/home/comparison-section";
import { Faq } from "@/components/home/faq";
import { HygieneRatings } from "@/components/home/hygiene-ratings";
import { Pricing } from "@/components/home/pricing";
import { PromisesBand } from "@/components/home/promises-band";
import { ValueCalculator } from "@/components/home/value-calculator";
import { WasteSection } from "@/components/home/waste-section";
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
import { SectionScaffold } from "@/components/home/section-scaffold";
import {
  audiences,
  faq,
  finalCta,
  roadmap,
} from "@/content/home";

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
      <SectionScaffold id="chefs-and-owners" title={audiences.title} accent={audiences.accent} stage={4} plan={[...audiences.chefs.points.map((p) => `Chefs: ${p}`), ...audiences.owners.points.slice(0, 3).map((p) => `Owners: ${p}`), "Manager switching between sites"]} />
      <ValueCalculator />
      <SectionScaffold id="roadmap" title={roadmap.title} accent={roadmap.accent} intro={roadmap.intro} stage={4} plan={roadmap.items.map((i) => i.title)} />
      <Pricing />
      <Faq />
      <SectionScaffold id="early-access" tone="green" title={finalCta.title} accent={finalCta.accent} intro={finalCta.intro} stage={4} plan={["Early access, request a demo or book a call", "Booking calendar with real availability", "Spam protection and secure storage", "Privacy notice"]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}
