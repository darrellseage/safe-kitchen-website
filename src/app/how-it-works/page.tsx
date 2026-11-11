import type { Metadata } from "next";
import { AudiencesSection } from "@/components/home/audiences-section";
import { GuidedTour } from "@/components/home/guided-tour";
import { SoundFamiliar } from "@/components/home/sound-familiar";
import { StepCards } from "@/components/home/step-cards";
import { Transformation } from "@/components/home/transformation";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { howItWorks } from "@/content/home";
import { routes } from "@/content/site-map";

export const metadata: Metadata = {
  title: "How it works",
  description: "How Safe Kitchen fits into a kitchen’s day: set up once, record checks in a few taps on a shared tablet, and see everything in one place.",
  alternates: { canonical: routes.howItWorks },
};

export default function HowItWorksPage() {
  return (
    <main id="main">
      <PageHero id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} accent={howItWorks.accent} intro={howItWorks.intro}>
        <StepCards steps={howItWorks.steps} />
      </PageHero>
      <GuidedTour />
      <Transformation />
      <SoundFamiliar />
      <AudiencesSection />
      <CtaBand />
    </main>
  );
}
