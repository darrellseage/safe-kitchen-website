import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { FeaturePage } from "@/components/features/feature-page";
import { AiCheckerSection } from "@/components/home/ai-checker-section";
import { AllergensSection } from "@/components/home/allergens-section";
import { TemperatureSection } from "@/components/home/food-safety";
import { HygieneRatings } from "@/components/home/hygiene-ratings";
import { InspectionSection } from "@/components/home/inspection-story";
import { OrderingSection } from "@/components/home/ordering-section";
import { RotasSection } from "@/components/home/rotas-section";
import { SiteSwitcher } from "@/components/home/site-switcher";
import { TrainingSection } from "@/components/home/training-section";
import { Section } from "@/components/ui/section";
import { featureContent } from "@/content/feature-pages";
import { featureHref, featurePages, type FeatureSlug } from "@/content/site-map";

/** The existing section and demo that open each feature page. Food Safety & SFBB opens with its own page hero instead. */
const sections: Record<FeatureSlug, ReactNode> = {
  "food-safety": null,
  "inspection-mode": (
    <InspectionSection asPage>
      <HygieneRatings />
    </InspectionSection>
  ),
  "temperature-checks": <TemperatureSection asPage />,
  allergens: <AllergensSection asPage />,
  training: <TrainingSection asPage />,
  "rotas-clock-in": <RotasSection asPage />,
  ordering: <OrderingSection asPage />,
  reports: (
    <>
      <AiCheckerSection asPage />
      <Section labelledBy="sites-title" tone="white">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 id="sites-title" className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">
              Every site’s day, at a glance.
            </h2>
            <p className="mt-4 max-w-[52ch] text-lg text-ink-muted">Switch between your sites and see each one’s checks, who’s on shift, what needs attention and what’s on order.</p>
          </div>
          <SiteSwitcher />
        </div>
      </Section>
    </>
  ),
};

export const dynamicParams = false;
export function generateStaticParams() {
  return featurePages.map((f) => ({ slug: f.slug }));
}

const isFeature = (slug: string): slug is FeatureSlug => featurePages.some((f) => f.slug === slug);

export async function generateMetadata({ params }: PageProps<"/features/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isFeature(slug)) return {};
  const c = featureContent[slug];
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: featureHref(slug) } };
}

export default async function Page({ params }: PageProps<"/features/[slug]">) {
  const { slug } = await params;
  if (!isFeature(slug)) notFound();
  return <FeaturePage slug={slug}>{sections[slug]}</FeaturePage>;
}
