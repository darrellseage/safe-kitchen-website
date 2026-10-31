// Owner decisions (app DECISIONS.md D-074, D-076, D-079): one price per site
// covers everything, including staff training. Change prices here only.
export const pricing = {
  currency: "GBP",
  monthly: 14.99,
  annual: 149.99,
  vatNote: "+ VAT",
  unit: "per site",
  includes: [
    "Unlimited staff",
    "No hidden charges",
    "Every tool as it launches: food safety, training, rotas, clock-in, AI Checker and ordering",
    "Staff food safety course and certificates included",
    "Shared kitchen tablet with personal staff PINs",
    "Inspection view, print or save as PDF",
  ],
  multiSite: [
    "Everything in the per-site plan, for every site",
    "Manager overview across your sites",
    "Roles for owners, managers and staff",
  ],
} as const;

/** How much a year costs on monthly billing compared with the annual plan. */
export function annualSaving(monthly: number, annual: number): number {
  return Math.round((monthly * 12 - annual) * 100) / 100;
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
}
