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
  /**
   * Release stage (owner decision 11 Nov 2026). The website is built as the
   * finished, launch-ready site with launch wording and no per-feature labels.
   * Until launch it runs as "pre-launch": every page carries one notice saying
   * Safe Kitchen is not yet available, and calls to action register interest.
   * "launched" removes the notice and points calls to action at the app's
   * sign-up. It only takes effect when NEXT_PUBLIC_RELEASE_STAGE=launched AND
   * every launch feature in src/config/features.ts is marked "available"
   * (see releaseReady there and docs/RELEASE_READINESS.md).
   */
  requestedStage: process.env.NEXT_PUBLIC_RELEASE_STAGE === "launched" ? "launched" : "pre-launch",
  /** The app's sign-up address, used by calls to action once launched. Not available yet. */
  appSignUpUrl: null as string | null,
  /** Shown in the footer and privacy policy once supplied by the owner. */
  company: null as null | { legalName: string; address: string; companyNumber?: string; icoNumber?: string; email: string },
} as const;
