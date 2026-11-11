/**
 * The founder's professional experience (confirmed by the owner, 11 Nov 2026).
 * These are places Darrell has worked, shown under "Built on real hospitality
 * experience". Customers and pilot kitchens live in `customers` below and are
 * always shown in a separate section, never in this list.
 *
 * Logo files are in public/logos, cropped from the image the owner supplied
 * on 11 Nov 2026 (see docs/LOGO_CHECKLIST.md for sources and what is still
 * outstanding). A company without a logo file is shown as its name.
 */
export type ExperienceEntry = {
  /** Used as the logo's text alternative, spelled as on the logo. */
  name: string;
  /** Logo file with its real pixel size, and the height to show it at so the row looks even. */
  logo: null | { src: string; width: number; height: number; showAt: number };
};

export const experience = {
  heading: "Built on real hospitality experience",
  listLabel: "Companies Darrell has worked with",
  companies: [
    { name: "Sapphire", logo: { src: "/logos/sapphire.png", width: 388, height: 319, showAt: 62 } },
    { name: "Burrito Bhais", logo: { src: "/logos/burrito-bhais.png", width: 350, height: 330, showAt: 66 } },
    { name: "Kluckaroo’s", logo: { src: "/logos/kluckaroos.png", width: 389, height: 330, showAt: 66 } },
    { name: "Sibu Asian Soul Food", logo: { src: "/logos/sibu.png", width: 474, height: 227, showAt: 52 } },
    { name: "Haven", logo: { src: "/logos/haven.png", width: 450, height: 183, showAt: 46 } },
    { name: "Bourne Leisure", logo: { src: "/logos/bourne-leisure.png", width: 477, height: 153, showAt: 40 } },
    { name: "Morley’s", logo: null },
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
