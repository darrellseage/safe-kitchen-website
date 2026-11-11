import type { Metadata } from "next";
import { ExperienceBand } from "@/components/home/experience-band";
import { FounderStory } from "@/components/home/founder-story";
import { TrustSection } from "@/components/home/trust-section";
import { CtaBand } from "@/components/ui/cta-band";
import { routes } from "@/content/site-map";

export const metadata: Metadata = {
  title: "About the founder",
  description: "Safe Kitchen was created by Darrell Seage, a head chef and kitchen manager with over 15 years in professional kitchens.",
  alternates: { canonical: routes.about },
};

export default function AboutPage() {
  return (
    <main id="main">
      <FounderStory asPage />
      <ExperienceBand />
      <TrustSection />
      <CtaBand title="Designed by chefs and owners, for chefs and owners." />
    </main>
  );
}
