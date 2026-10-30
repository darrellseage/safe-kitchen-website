// Single source for the product name and site settings. "Safe Kitchen" is a
// working name (app DECISIONS.md D-068, O-002), so never hard-code it elsewhere.
export const siteConfig = {
  name: "Safe Kitchen",
  url: "https://safekitchen.uk",
  tagline: "Food safety made simple.",
  description:
    "Digital food safety records for UK kitchens. Temperature checks, cleaning schedules and inspection-ready records, built around Safer Food, Better Business.",
  /**
   * Keep false until the owner says "go live" (trademark checks, O-002).
   * While false, every page asks search engines not to index it.
   */
  allowIndexing: false,
  /** Shown in the footer and privacy policy once supplied by the owner. */
  company: null as null | { legalName: string; address: string; companyNumber?: string; icoNumber?: string; email: string },
} as const;
