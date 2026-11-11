import type { Metadata } from "next";
import { FaqList } from "@/components/home/faq";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { faqs, faqTopics } from "@/content/faqs";
import { routes } from "@/content/site-map";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about Safe Kitchen: food safety records, inspections, allergens, training, rotas, ordering, pricing and data.",
  alternates: { canonical: routes.faqs },
};

// FAQ structured data: only facts stated on the page.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
};

export default function FaqsPage() {
  return (
    <main id="main">
      <PageHero id="faqs-title" eyebrow="FAQs" title="Questions kitchen owners ask." intro="Plain answers about what Safe Kitchen does, what it costs and what it doesn’t do." />
      <Section labelledBy="faqs-list" tone="white">
        <h2 id="faqs-list" className="sr-only">
          All questions
        </h2>
        <div className="grid gap-12">
          {faqTopics.map((topic) => (
            <div key={topic} className="grid gap-4 lg:grid-cols-[0.6fr_1.4fr] lg:gap-10">
              <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{topic}</h3>
              <FaqList items={faqs.filter((f) => f.topic === topic)} headingLevel="h4" />
            </div>
          ))}
        </div>
      </Section>
      <CtaBand title="Still have a question? Book a call." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}
