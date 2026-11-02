import { AiCheckerSection } from "@/components/home/ai-checker-section";
import { AllergensSection } from "@/components/home/allergens-section";
import { AudiencesSection } from "@/components/home/audiences-section";
import { FinalCta } from "@/components/home/final-cta";
import { FoodSafety } from "@/components/home/food-safety";
import { FounderStory } from "@/components/home/founder-story";
import { GuidedTour } from "@/components/home/guided-tour";
import { Hero } from "@/components/home/hero";
import { OrderingSection } from "@/components/home/ordering-section";
import { Pricing } from "@/components/home/pricing";
import { PromisesBand } from "@/components/home/promises-band";
import { RotasSection } from "@/components/home/rotas-section";
import { SoundFamiliar } from "@/components/home/sound-familiar";
import { TrainingSection } from "@/components/home/training-section";
import { Transformation } from "@/components/home/transformation";
import { TrustSection } from "@/components/home/trust-section";
import { YourNumbers } from "@/components/home/your-numbers";
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
 * Homepage, in the order approved in docs/CONVERSION_REVIEW.md §3 (1 Nov 2026):
 * first impression, tour and founder near the top, then the problem, the five
 * strongest selling points (plus allergen menus, app D-088), who it's for, the numbers, pricing, straight
 * answers and the sign-up form. Every interactive demo is kept.
 */
export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <PromisesBand />
      <GuidedTour />
      <FounderStory />
      <SoundFamiliar />
      <Transformation />
      <TrainingSection />
      <AiCheckerSection />
      <RotasSection />
      <OrderingSection />
      <FoodSafety />
      <AllergensSection />
      <AudiencesSection />
      <YourNumbers />
      <Pricing />
      <TrustSection />
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}
