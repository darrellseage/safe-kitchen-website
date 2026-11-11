/**
 * Every page on the site, in one place. The header, mobile menu, footer,
 * breadcrumbs, feature cards and sitemap.xml are all built from this list, so
 * a page can't be linked under two different names or left out of the menu.
 */
export type FeatureSlug =
  | "food-safety"
  | "inspection-mode"
  | "temperature-checks"
  | "allergens"
  | "training"
  | "rotas-clock-in"
  | "ordering"
  | "reports";

export type FeatureIcon = "clipboard" | "shield" | "thermometer" | "wheat" | "graduation" | "calendar" | "basket" | "eye";

export const featurePages: ReadonlyArray<{
  slug: FeatureSlug;
  /** Menu and card name. */
  name: string;
  /** One line for menus and cards. */
  summary: string;
  icon: FeatureIcon;
  group: "Food safety" | "Running the kitchen";
}> = [
  { slug: "food-safety", name: "Food Safety & SFBB", summary: "Your daily food safety records in one place, built around Safer Food, Better Business.", icon: "clipboard", group: "Food safety" },
  { slug: "inspection-mode", name: "EHO Inspection Mode", summary: "Every record an inspector asks for, on screen in seconds.", icon: "shield", group: "Food safety" },
  { slug: "temperature-checks", name: "Temperature checks", summary: "Readings recorded in a few taps, with who, when and which device.", icon: "thermometer", group: "Food safety" },
  { slug: "allergens", name: "Allergen management", summary: "Every dish, every allergen, with a menu customers can check.", icon: "wheat", group: "Food safety" },
  { slug: "training", name: "Staff training & certificates", summary: "Level 2 food hygiene training for every member of staff, included.", icon: "graduation", group: "Running the kitchen" },
  { slug: "rotas-clock-in", name: "Staff rotas & clock-in", summary: "Rotas from a photo or spreadsheet, and clock-in that turns into timesheets.", icon: "calendar", group: "Running the kitchen" },
  { slug: "ordering", name: "Smart ordering & suppliers", summary: "Build supplier orders and catch duplicates before they cost you.", icon: "basket", group: "Running the kitchen" },
  { slug: "reports", name: "Reports & oversight", summary: "The AI Checker and a clear view of every site, even when you’re away.", icon: "eye", group: "Running the kitchen" },
];

export const featureHref = (slug: FeatureSlug) => `/features/${slug}`;
export const featureBySlug = (slug: FeatureSlug) => featurePages.find((f) => f.slug === slug)!;

export const routes = {
  home: "/",
  features: "/features",
  howItWorks: "/how-it-works",
  pricing: "/pricing",
  about: "/about",
  faqs: "/faqs",
  earlyAccess: "/early-access",
} as const;

/** Top-level menu, after the Features dropdown. */
export const primaryNav = [
  { href: routes.howItWorks, label: "How it works" },
  { href: routes.pricing, label: "Pricing" },
  { href: routes.about, label: "About" },
  { href: routes.faqs, label: "FAQs" },
] as const;

export const legalPages = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
] as const;

/** Every address on the site (used by sitemap.xml and the link tests). */
export const allPaths: string[] = [
  routes.home,
  routes.features,
  ...featurePages.map((f) => featureHref(f.slug)),
  routes.howItWorks,
  routes.pricing,
  routes.about,
  routes.faqs,
  routes.earlyAccess,
  ...legalPages.map((l) => l.href),
];
