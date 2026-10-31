import { Hero } from "@/components/home/hero";
import { PillarOverview } from "@/components/home/pillar-overview";
import { SectionScaffold } from "@/components/home/section-scaffold";
import { WorkflowRail } from "@/components/home/workflow-rail";
import {
  aiChecker,
  audiences,
  calculator,
  clockIn,
  demo,
  familiar,
  faq,
  finalCta,
  inspection,
  ordering,
  orderingCalculator,
  pricingCopy,
  roadmap,
  rotas,
  transformation,
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
      <SectionScaffold id="familiar" title={familiar.title} intro={familiar.intro} stage={2} plan={familiar.scenarios.map((s) => `${s.who}: ${s.title}`)} />
      <SectionScaffold id="paperwork-cost" tone="warm" title={calculator.title} intro={calculator.intro} stage={2} plan={["Sites, minutes per day, days per week and hourly cost", "Hours per week and year, and labour cost per year", "Formula and assumptions shown", "Clear note: an estimate, not a promised saving"]} />
      <SectionScaffold id="how-it-works" title={transformation.title} intro={transformation.intro} stage={2} plan={["Paper log, rota photo, supplier email and sticky notes settle into one dashboard as you scroll", "Before / Safe Kitchen toggle for anyone who prefers to tap", "Three outcome lines", "Works fully with reduced motion"]} />
      <SectionScaffold id="food-safety" tone="green" eyebrow={demo.eyebrow} status={demo.status} title={demo.title} accent={demo.accent} intro={demo.intro} stage={2} plan={["Choose a check, set the reading, save", "Record lands in the manager dashboard", "Problem path with manager review, no invented limits", "Large touch controls and keypad"]} />
      <SectionScaffold id="rotas" eyebrow={rotas.eyebrow} status={rotas.status} title={rotas.title} accent={rotas.accent} intro={rotas.intro} stage={3} plan={["Photo or spreadsheet becomes a weekly rota", "“2 to check · 1 person to match” review", "Publish and notify staff", "Draft until a manager checks it"]}>
        <WorkflowRail />
      </SectionScaffold>
      <SectionScaffold id="clock-in" tone="warm" eyebrow={clockIn.eyebrow} status={clockIn.status} title={clockIn.title} accent={clockIn.accent} intro={clockIn.intro} stage={3} plan={["Phone clock-in by location, QR code or kitchen tablet PIN", "Manager’s “Who’s in” board updates live", "Rota vs actual hours and timesheet export", "Privacy: location only at clock-in, no tracking"]} />
      <SectionScaffold id="ai-checker" eyebrow={aiChecker.eyebrow} status={aiChecker.status} title={aiChecker.title} accent={aiChecker.accent} intro={aiChecker.intro} stage={3} plan={["“Your kitchen at a glance” with Daily / Weekly switch", "Explore flagged records and see why each was flagged", "Suggested follow-ups linked to the record", "Clear limits on what AI can and can’t do"]} />
      <SectionScaffold id="ordering" tone="warm" eyebrow={ordering.eyebrow} status={ordering.status} title={ordering.title} accent={ordering.accent} intro={ordering.intro} stage={3} plan={["Add 20 kg chicken breast to an order", "“Possible duplicate order detected”, with the existing order", "Illustrative duplicate spend at an example price", "Build → Check → Approve → Send → Track"]} />
      <SectionScaffold id="ordering-cost" tone="warm" title={orderingCalculator.title} intro={orderingCalculator.intro} stage={4} plan={["Orders per week, mistakes per month, average cost of a mistake", "Estimated yearly cost, formula shown", "Your figures only, no promised savings"]} />
      <SectionScaffold id="chefs-and-owners" title={audiences.title} accent={audiences.accent} stage={4} plan={[...audiences.chefs.points.map((p) => `Chefs: ${p}`), ...audiences.owners.points.slice(0, 3).map((p) => `Owners: ${p}`), "Manager switching between sites"]} />
      <SectionScaffold id="inspection" tone="green" eyebrow={inspection.eyebrow} status={inspection.status} title={inspection.title} accent={inspection.accent} intro={inspection.closing} stage={2} plan={inspection.timeline.map((t) => `${t.time}: ${t.title}`).concat("Inspection view with missing records shown honestly")} />
      <SectionScaffold id="roadmap" title={roadmap.title} accent={roadmap.accent} intro={roadmap.intro} stage={4} plan={roadmap.items.map((i) => i.title)} />
      <SectionScaffold id="pricing" tone="warm" title={pricingCopy.title} accent={pricingCopy.accent} intro={pricingCopy.intro} stage={4} plan={["£14.99 a month or £149.99 a year + VAT, per site", "Monthly / annual switch with the saving", "Several sites: book a call"]} />
      <SectionScaffold id="faq" title={faq.title} stage={4} plan={faq.items.map((i) => i.q)} />
      <SectionScaffold id="early-access" tone="green" title={finalCta.title} accent={finalCta.accent} intro={finalCta.intro} stage={4} plan={["Early access, request a demo or book a call", "Booking calendar with real availability", "Spam protection and secure storage", "Privacy notice"]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}
