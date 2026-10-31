import { PaperworkCalculator } from "@/components/home/calculator";
import { FoodSafety } from "@/components/home/food-safety";
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
  orderingCalculator,
  pricingCopy,
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
      <PillarOverview />
      <SoundFamiliar />
      <PaperworkCalculator />
      <Transformation />
      <FoodSafety />
      <TrainingSection />
      <InspectionStory />
      <RotasSection />
      <ClockInSection />
      <AiCheckerSection />
      <OrderingSection />
      <SectionScaffold id="ordering-cost" title={orderingCalculator.title} intro={orderingCalculator.intro} stage={4} plan={["Orders per week, mistakes per month, average cost of a mistake", "Estimated yearly cost, formula shown", "Your figures only, no promised savings"]} />
      <SectionScaffold id="chefs-and-owners" title={audiences.title} accent={audiences.accent} stage={4} plan={[...audiences.chefs.points.map((p) => `Chefs: ${p}`), ...audiences.owners.points.slice(0, 3).map((p) => `Owners: ${p}`), "Manager switching between sites"]} />
      <SectionScaffold id="roadmap" title={roadmap.title} accent={roadmap.accent} intro={roadmap.intro} stage={4} plan={roadmap.items.map((i) => i.title)} />
      <SectionScaffold id="pricing" tone="warm" title={pricingCopy.title} accent={pricingCopy.accent} intro={pricingCopy.intro} stage={4} plan={["£14.99 a month or £149.99 a year + VAT, per site", "Monthly / annual switch with the saving", "Several sites: book a call"]} />
      <SectionScaffold id="faq" title={faq.title} stage={4} plan={faq.items.map((i) => i.q)} />
      <SectionScaffold id="early-access" tone="green" title={finalCta.title} accent={finalCta.accent} intro={finalCta.intro} stage={4} plan={["Early access, request a demo or book a call", "Booking calendar with real availability", "Spam protection and secure storage", "Privacy notice"]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}
