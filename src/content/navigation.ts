/**
 * Links to homepage sections. On the real site they start with "/" so they
 * work from every page. The private preview copy (NEXT_PUBLIC_PREVIEW_EXPORT)
 * is a single page, so its links stay on the page.
 */
const home = process.env.NEXT_PUBLIC_PREVIEW_EXPORT === "1" ? "" : "/";
export const section = (id: string) => `${home}#${id}`;
export const homeHref = home || "#main";

export const mainNav = [
  { href: section("food-safety"), label: "Food safety" },
  { href: section("training"), label: "Training" },
  { href: section("rotas"), label: "Rotas & clock-in" },
  { href: section("ai-checker"), label: "AI Checker" },
  { href: section("ordering"), label: "Ordering" },
  { href: section("pricing"), label: "Pricing" },
  { href: section("faq"), label: "FAQ" },
] as const;

export const legalNav = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
] as const;

export const ctaHref = section("early-access");
