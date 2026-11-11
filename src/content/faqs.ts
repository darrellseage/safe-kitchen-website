/**
 * Every question on the site, in one place. Feature pages show the questions
 * for their topic; /faqs shows them all, grouped. Written as launch-ready
 * copy (the pre-launch notice on every page says the product isn't available yet).
 */
import { formatGBP, pricing, withVat } from "@/config/pricing";
import { certificateDisclosure, courseName } from "./home";
import type { FeatureSlug } from "./site-map";

export type FaqTopic = "Getting started" | "Food safety and inspections" | "Allergens" | "Training" | "Rotas and clock-in" | "Ordering" | "Pricing" | "Data and security";

export type FaqItem = { q: string; a: string; topic: FaqTopic; features?: FeatureSlug[] };

export const faqTopics: FaqTopic[] = ["Getting started", "Food safety and inspections", "Allergens", "Training", "Rotas and clock-in", "Ordering", "Pricing", "Data and security"];

export const faqs: FaqItem[] = [
  {
    topic: "Getting started",
    q: "Is early access free?",
    a: "Yes. Joining early access is completely free, with no payment card and no commitment. You’ll hear first as Safe Kitchen opens, and you can help shape what we build.",
  },
  {
    topic: "Getting started",
    q: "Is it easy for chefs to use?",
    a: "That’s the whole point. Safe Kitchen is designed so a routine check takes a few taps on a shared tablet or phone, with big buttons that work with gloves on. Readings are never filled in for you, and staff only see what needs doing now.",
    features: ["food-safety", "temperature-checks"],
  },
  {
    topic: "Getting started",
    q: "What do I need in the kitchen?",
    a: "A phone or a tablet. Most kitchens use one shared tablet, where each member of staff signs in with their own PIN, plus managers’ own phones or a laptop.",
    features: ["food-safety"],
  },
  {
    topic: "Getting started",
    q: "Can I manage more than one site?",
    a: "Yes. Safe Kitchen works for one site or several, with roles for owners, managers and staff, and a view of each site’s day. Pricing is per site.",
    features: ["reports"],
  },
  {
    topic: "Food safety and inspections",
    q: "Does it replace paper food safety records?",
    a: "It holds your daily food safety records digitally, organised by date, so you don’t need paper sheets for the checks you record in Safe Kitchen. Your business stays responsible for its food safety system, and your local authority can advise on what they expect to see.",
    features: ["food-safety", "temperature-checks"],
  },
  {
    topic: "Food safety and inspections",
    q: "Can I show my records to an EHO?",
    a: "Yes, that’s what Inspection Mode is for. Your daily food safety records, cleaning and pest control checks, supplier list, staff training records and certificates, and documents you upload are brought together on screen, with anything missing or unresolved shown honestly. You can print them or save them as a PDF.",
    features: ["inspection-mode", "food-safety"],
  },
  {
    topic: "Food safety and inspections",
    q: "Will Safe Kitchen guarantee my food hygiene rating?",
    a: "No. Safe Kitchen helps you keep and show good records. Ratings depend on the inspection of your premises, practices and management, and no software can guarantee one.",
    features: ["inspection-mode"],
  },
  {
    topic: "Food safety and inspections",
    q: "Who decides the temperature limits and what to do when a reading is wrong?",
    a: "You do. Limits and corrective actions come from your own approved safe methods. Safe Kitchen never invents a limit or approves an action for you, and the original reading is always kept.",
    features: ["temperature-checks", "food-safety"],
  },
  {
    topic: "Food safety and inspections",
    q: "Is Safe Kitchen approved by the Food Standards Agency or by EHOs?",
    a: "No. Safe Kitchen is built around the FSA’s Safer Food, Better Business system, but it isn’t affiliated with or endorsed by the FSA or any local authority. There is no scheme under which Environmental Health Officers approve record-keeping software.",
    features: ["food-safety", "inspection-mode"],
  },
  {
    topic: "Allergens",
    q: "Can customers check allergens themselves?",
    a: "Yes. Each site has a QR-code allergen menu and a printable chart, built from the allergen records your manager has signed off, with a filter for the 14 regulated allergens. It never tells a customer a dish is “safe for them”: it shows what’s in each dish and any cross-contact risks you’ve recorded, and asks them to tell staff about their allergy.",
    features: ["allergens"],
  },
  {
    topic: "Allergens",
    q: "What happens when a recipe or a supplier product changes?",
    a: "Every dish that uses it is flagged for re-checking, and a manager signs off the updated allergen record before it’s shown again.",
    features: ["allergens"],
  },
  {
    topic: "Training",
    q: "What are the training certificates?",
    a: `When you add a new member of staff, Safe Kitchen sends our ${courseName} to their phone, or they can do it on the kitchen tablet. After a successful assessment, a Safe Kitchen certificate is saved to their record. ${certificateDisclosure} You can also upload certificates from other providers.`,
    features: ["training"],
  },
  {
    topic: "Training",
    q: "Is there a fee for each person or each course?",
    a: "No. Training is included in your plan for every member of staff at the site, including new starters.",
    features: ["training"],
  },
  {
    topic: "Rotas and clock-in",
    q: "Can I import the rota I already use?",
    a: "Yes. Upload a photo, screenshot, PDF, Word document or Excel spreadsheet of your existing rota. Safe Kitchen turns it into a draft, highlights anything it isn’t sure about, and you check it before anything is sent to staff.",
    features: ["rotas-clock-in"],
  },
  {
    topic: "Rotas and clock-in",
    q: "Does clock-in track where my staff are?",
    a: "No. Location is checked only at the moment someone clocks in or out, never during a shift. Staff who can’t or don’t want to share their location can clock in on the kitchen tablet with their own PIN instead.",
    features: ["rotas-clock-in"],
  },
  {
    topic: "Rotas and clock-in",
    q: "Does Safe Kitchen run payroll?",
    a: "No. It turns shifts into timesheets that you review and export for your own payroll.",
    features: ["rotas-clock-in"],
  },
  {
    topic: "Ordering",
    q: "Which suppliers can I order from?",
    a: "You build orders for the suppliers you already use, and Safe Kitchen sends them by email, or by a direct link where a supplier supports one. You keep paying suppliers directly.",
    features: ["ordering"],
  },
  {
    topic: "Ordering",
    q: "Does Safe Kitchen place orders on its own?",
    a: "No. It checks an order for possible duplicates and unusual quantities, and a manager approves it before anything is sent. A sent order is never shown as accepted until the supplier confirms.",
    features: ["ordering"],
  },
  {
    topic: "Pricing",
    q: "How much does it cost?",
    a: `${formatGBP(pricing.monthly)} a month (${formatGBP(withVat(pricing.monthly))} including VAT) or ${formatGBP(pricing.annual)} a year (${formatGBP(withVat(pricing.annual))} including VAT) for each site. That covers every Safe Kitchen tool, including the staff food hygiene course and certificates, with unlimited staff and no set-up fees.`,
  },
  {
    topic: "Pricing",
    q: "Am I charged for each member of staff?",
    a: "No. The price is per site, and every member of staff at that site is included.",
  },
  {
    topic: "Data and security",
    q: "What does the AI Checker actually check?",
    a: "Your records and forms: checks that are missing, incomplete, overdue or look unusual, and problems still waiting for review. It explains why each item was flagged and links to the record. It doesn’t use cameras, it can’t confirm a check was physically done, and it never replaces a manager’s judgement.",
    features: ["reports"],
  },
  {
    topic: "Data and security",
    q: "How secure is the data?",
    a: "Each business’s records are kept separate at database level, with automated tests that prove one business can’t see another’s data. Owners and managers use two-step verification, staff use personal PINs on shared tablets, and records are never silently changed.",
    features: ["reports"],
  },
  {
    topic: "Data and security",
    q: "Can I take my records with me if I leave?",
    a: "Yes. You can print or save records as PDFs from Inspection Mode, and export your records if you leave Safe Kitchen.",
    features: ["reports", "inspection-mode"],
  },
];

export const faqsFor = (slug: FeatureSlug) => faqs.filter((f) => f.features?.includes(slug));
