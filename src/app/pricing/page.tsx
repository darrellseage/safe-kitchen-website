import type { Metadata } from "next";
import { FaqList } from "@/components/home/faq";
import { Pricing } from "@/components/home/pricing";
import { YourNumbers } from "@/components/home/your-numbers";
import { CtaBand } from "@/components/ui/cta-band";
import { Section } from "@/components/ui/section";
import { formatGBP, pricing } from "@/config/pricing";
import { faqs } from "@/content/faqs";
import { routes } from "@/content/site-map";

export const metadata: Metadata = {
  title: "Pricing",
  description: `${formatGBP(pricing.monthly)} a month or ${formatGBP(pricing.annual)} a year per site, plus VAT. Unlimited staff, every Safe Kitchen tool and Level 2 food hygiene training included. No set-up fees.`,
  alternates: { canonical: routes.pricing },
};

export default function PricingPage() {
  return (
    <main id="main">
      <Pricing asPage />
      <YourNumbers />
      <Section labelledBy="pricing-faq-title" tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="pricing-faq-title" className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">
            Pricing questions
          </h2>
          <FaqList items={faqs.filter((f) => f.topic === "Pricing" || f.q === "Is early access free?" || f.q.startsWith("Is there a fee"))} />
        </div>
      </Section>
      <CtaBand title="One price per site. Your whole team included." />
    </main>
  );
}
