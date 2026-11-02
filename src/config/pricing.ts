// Owner decisions (app DECISIONS.md D-074, D-076, D-079, D-081): one price per
// site covers everything, including staff training. No set-up fees. Change
// prices here only.
export const pricing = {
  currency: "GBP",
  monthly: 14.99,
  annual: 149.99,
  /** UK standard rate. Prices are shown excluding VAT, with the VAT-inclusive figure alongside. */
  vatRate: 0.2,
  vatNote: "+ VAT",
  unit: "per site",
  includes: [
    "Unlimited staff",
    "Level 2 food hygiene training and certificates",
    "Food safety management and records",
    "Inspection view, print or save as PDF",
    "AI Checker for your records",
    "Allergen menus, filter and Natasha’s Law labels",
    "Rotas from a photo or spreadsheet",
    "Clock-in and attendance tracking",
    "Smart ordering checks",
    "Shared kitchen tablet with personal staff PINs",
    "Management visibility across sites",
  ],
  /** Things customers are never charged for (owner decision 1 Nov 2026: no set-up fees). */
  neverPay: ["Per-employee fees", "Per-course training fees", "Set-up fees", "Extra modules or add-ons"],
  /** Example shown under the prices. */
  multiSiteExample: 3,
  multiSite: [
    "Everything in the per-site plan, for every site",
    "Manager overview across your sites",
    "Roles for owners, managers and staff",
  ],
} as const;

/**
 * Founding-customer price lock (owner decision 1 Nov 2026, app D-082).
 * Not active until launch. `announce` controls whether the website mentions
 * it; keep false on the public site until the owner approves the wording and
 * the final terms are written. Counting qualifying customers happens in the
 * app's billing (Phase 10), never on the website.
 */
export const foundingOffer = {
  limit: 100,
  announce: process.env.NEXT_PUBLIC_SHOW_FOUNDING_OFFER === "1",
} as const;

/** How much a year costs on monthly billing compared with the annual plan. */
export function annualSaving(monthly: number, annual: number): number {
  return Math.round((monthly * 12 - annual) * 100) / 100;
}

/** Price including VAT, rounded to the penny. */
export function withVat(amount: number, rate: number = pricing.vatRate): number {
  return Math.round(amount * (1 + rate) * 100) / 100;
}

/** Monthly cost for several sites, excluding VAT. */
export function sitesCost(sites: number, perSite: number = pricing.monthly): number {
  return Math.round(sites * perSite * 100) / 100;
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
}
