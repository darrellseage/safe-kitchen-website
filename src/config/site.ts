// Single source for the product name and site settings. "Safe Kitchen" is a
// working name (app DECISIONS.md D-068, O-002), so never hard-code it elsewhere.
export const siteConfig = {
  name: "Safe Kitchen",
  url: "https://safekitchen.uk",
  tagline: "One kitchen. One system. Everything where it should be.",
  promise: "Less admin. Less waste. More control.",
  description:
    "Kitchen management software for UK restaurants, takeaways, cafés and pubs: simple food safety records, smart staff rotas, clock-in and attendance, an AI checker and smart supplier ordering.",
  /**
   * Keep false until the owner says "go live" (trademark checks, O-002).
   * While false, every page asks search engines not to index it.
   */
  allowIndexing: false,
  /** Shown in the footer and privacy policy once supplied by the owner. */
  company: null as null | { legalName: string; address: string; companyNumber?: string; icoNumber?: string; email: string },
} as const;
