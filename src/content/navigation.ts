/**
 * Links to homepage sections. On the real site they start with "/" so they
 * work from every page. The private preview copy (NEXT_PUBLIC_PREVIEW_EXPORT)
 * is a single page, so its links stay on the page.
 */
export const isPreviewExport = process.env.NEXT_PUBLIC_PREVIEW_EXPORT === "1";
const home = isPreviewExport ? "" : "/";
export const section = (id: string) => `${home}#${id}`;
export const homeHref = home || "index.html";
/** Other pages: "/privacy" on the real site, "privacy.html" in the single-folder preview. */
export const pageHref = (slug: string) => (home ? `/${slug}` : `${slug}.html`);

/**
 * The link to use for a header or footer item on a given page. The header and
 * footer appear on every page, so in the preview a homepage section link
 * ("#tour") must point back to the homepage ("index.html#tour") when shown on
 * another page (privacy, terms…). Real-site links ("/#tour") already work everywhere.
 */
export function hrefFor(href: string, pathname: string | null, preview = isPreviewExport): string {
  return preview && href.startsWith("#") && !isHomePath(pathname) ? `index.html${href}` : href;
}

export const isHomePath = (pathname: string | null) =>
  !pathname || pathname === "/" || pathname === "/index" || pathname.endsWith("/index.html");


export const mainNav = [
  { href: section("tour"), label: "Tour" },
  { href: section("training"), label: "Training" },
  { href: section("ai-checker"), label: "AI Checker" },
  { href: section("rotas"), label: "Rotas" },
  { href: section("ordering"), label: "Ordering" },
  { href: section("food-safety"), label: "Records" },
  { href: section("pricing"), label: "Pricing" },
  { href: section("straight-answers"), label: "FAQ" },
] as const;

export const legalNav = [
  { href: pageHref("privacy"), label: "Privacy" },
  { href: pageHref("cookies"), label: "Cookies" },
  { href: pageHref("terms"), label: "Terms" },
  { href: pageHref("accessibility"), label: "Accessibility" },
] as const;

export const ctaHref = section("early-access");
