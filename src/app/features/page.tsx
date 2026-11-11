import type { Metadata } from "next";
import { FeatureCards } from "@/components/features/feature-cards";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { featurePages, routes } from "@/content/site-map";

export const metadata: Metadata = {
  title: "Features",
  description: "Everything Safe Kitchen does: food safety records, inspection mode, temperature checks, allergens, staff training, rotas and clock-in, ordering and reports.",
  alternates: { canonical: routes.features },
};

const groups = ["Food safety", "Running the kitchen"] as const;

export default function FeaturesPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { label: "Home", href: routes.home },
          { label: "Features", href: routes.features },
        ]}
      />
      <PageHero
        id="features-title"
        eyebrow="Features"
        title="Everything your kitchen runs on,"
        accent="in one place."
        intro="Eight connected tools, one price per site, unlimited staff. Choose one to see how it works and try it for yourself."
      />
      {groups.map((group, i) => (
        <Section key={group} labelledBy={`group-${i}`} tone={i === 0 ? "white" : "warm"}>
          <h2 id={`group-${i}`} className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">
            {group}
          </h2>
          <FeatureCards slugs={featurePages.filter((f) => f.group === group).map((f) => f.slug)} columns={4} className="mt-8" />
        </Section>
      ))}
      <CtaBand />
    </main>
  );
}
