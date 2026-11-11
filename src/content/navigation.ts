/**
 * Link helpers. The site is now several pages (docs/WEBSITE_RESTRUCTURE_PLAN.md),
 * so a "section" such as the training demo or the calculators lives on a
 * specific page. `section(id)` returns the address of that section wherever
 * it now lives, so components don't need to know which page they are on.
 */
import { featureHref, legalPages, routes } from "./site-map";

const sectionHome: Record<string, string> = {
  tour: `${routes.howItWorks}#tour`,
  "how-it-works": `${routes.howItWorks}#how-it-works`,
  familiar: `${routes.howItWorks}#familiar`,
  "built-for-you": `${routes.howItWorks}#built-for-you`,
  founder: routes.about,
  "straight-answers": `${routes.about}#straight-answers`,
  faq: routes.faqs,
  pricing: routes.pricing,
  savings: `${routes.pricing}#savings`,
  "early-access": routes.earlyAccess,
  "book-a-call": `${routes.earlyAccess}#book-a-call`,
  "request-demo": `${routes.earlyAccess}#request-demo`,
  "food-safety": featureHref("temperature-checks"),
  inspection: featureHref("inspection-mode"),
  allergens: featureHref("allergens"),
  training: featureHref("training"),
  rotas: featureHref("rotas-clock-in"),
  "clock-in": `${featureHref("rotas-clock-in")}#clock-in`,
  ordering: featureHref("ordering"),
  "ai-checker": featureHref("reports"),
};

/** The address of a named section, on whichever page it lives. */
export function section(id: string): string {
  const href = sectionHome[id];
  if (!href) throw new Error(`Unknown section "${id}": add it to sectionHome in src/content/navigation.ts`);
  return href;
}
export const sectionIds = Object.keys(sectionHome);

export const homeHref = routes.home;
export const pageHref = (slug: string) => `/${slug}`;
export const ctaHref = routes.earlyAccess;
export const legalNav = legalPages;

export const isHomePath = (pathname: string | null) => !pathname || pathname === "/";
/** True when a menu link points at the page being viewed (ignores any #section). */
export const isCurrent = (href: string, pathname: string | null) => {
  const path = href.split("#")[0];
  return path === "/" ? isHomePath(pathname) : pathname === path || !!pathname?.startsWith(`${path}/`);
};
