import { Audience } from "@/components/home/audience";
import { PaperworkCalculator } from "@/components/home/calculator";
import { DemoSection } from "@/components/home/demo-section";
import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { InspectionStory } from "@/components/home/inspection-story";
import { Pricing } from "@/components/home/pricing";
import { Roadmap } from "@/components/home/roadmap";
import { SoundFamiliar } from "@/components/home/sound-familiar";
import { Transformation } from "@/components/home/transformation";
import { faq } from "@/content/home";

// FAQ structured data: only facts stated on the page (Stage 1 proposal §8.4).
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <SoundFamiliar />
      <Transformation />
      <DemoSection />
      <Features />
      <Audience />
      <InspectionStory />
      <PaperworkCalculator />
      <Roadmap />
      <Pricing />
      <Faq />
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}
