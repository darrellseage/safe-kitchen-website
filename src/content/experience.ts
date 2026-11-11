/**
 * The founder's professional experience (confirmed by the owner, 11 Nov 2026).
 * These are places Darrell has worked. They are NOT customers, partners or
 * endorsers of Safe Kitchen, and must never be shown under a heading that
 * suggests they are. Customers and pilot kitchens live in `customers` below
 * and are always shown in a separate section.
 *
 * A logo is only shown when `logo` is set, and `logo` may only be set once
 * the row in docs/LOGO_CHECKLIST.md is complete: the right company identified,
 * an official logo file obtained from the company, and permission recorded.
 * Until then the company name is shown as text.
 */
export type ExperienceEntry = {
  name: string;
  /** Official logo file in public/logos, with its real pixel size. Null until approved. */
  logo: null | { src: string; width: number; height: number };
};

export const experience = {
  heading: "Built on real hospitality experience",
  support: "Over 15 years working in professional kitchens, from independent restaurants and takeaways to major hospitality operators.",
  clarification: "Places Darrell has worked. They are not Safe Kitchen customers, and they don’t use, endorse, sponsor or partner with Safe Kitchen.",
  listLabel: "Companies the founder has worked with",
  companies: [
    { name: "Haven Holidays", logo: null },
    { name: "Bourne Leisure", logo: null },
    { name: "Morley’s", logo: null },
    { name: "Kluckuroos", logo: null },
    { name: "Burritos Bhais", logo: null },
    { name: "Sibu", logo: null },
    { name: "Sapphire Café", logo: null },
  ] as ExperienceEntry[],
};

/**
 * Safe Kitchen customers and pilot kitchens. Empty until a business has
 * agreed in writing to be named. The section doesn't render while empty.
 */
export const customers = {
  heading: "Kitchens using Safe Kitchen",
  companies: [] as ExperienceEntry[],
};
