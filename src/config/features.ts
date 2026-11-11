/**
 * Internal readiness record for every capability mentioned on the site,
 * checked against the app's plan. Nothing is "available" until it is really
 * built, tested and approved by the owner. The site cannot switch to its
 * "launched" stage until every launch feature here is "available"
 * (docs/RELEASE_READINESS.md).
 */
import { siteConfig } from "./site";

export type FeatureStatus = "available" | "in_development" | "planned" | "vision";

export const statusLabels: Record<FeatureStatus, string> = {
  available: "Available",
  in_development: "In development",
  planned: "Planned",
  vision: "Our vision",
};

export const featureStatus = {
  // Pillar 1: Simple Food Safety (core phases 2–8)
  temperatures: "in_development",
  cleaning: "in_development",
  checklists: "in_development",
  problems: "in_development",
  managerOverview: "in_development",
  inspectionView: "in_development",
  sharedTablet: "in_development",
  // Food safety documents kept for inspections (core phases 6–8)
  supplierList: "in_development",
  pestControl: "in_development",
  documentUploads: "planned",
  // Pillar: Staff Training & Certificates (D-064, D-065; course scope open, O-034)
  trainingCourse: "planned",
  staffCertificates: "planned",
  // Pillar 2: Smart Staff Rotas (Growth Phase 6, D-049, D-054, D-078)
  rotas: "planned",
  rotaImport: "planned",
  // Pillar 3: Smart Clock-In & Attendance (D-049, D-078)
  clockIn: "planned",
  attendance: "planned",
  // Pillar 4: AI Checker (AI Monitoring Engine, D-050, D-077)
  aiChecker: "planned",
  // Pillar 5: Smart Supplier Ordering (Growth Phase 5, D-047, D-048)
  ordering: "planned",
  // Allergen module (app D-088; part of the launch, D-087)
  allergens: "planned",
  ppdsLabels: "planned",
  // Customer data and reliability (app PROJECT_PLAN; D-083 record export, D-038 offline-first)
  recordExports: "planned",
  offline: "planned",
  // Future
  probes: "vision",
  sensors: "vision",
  supplierIntegrations: "vision",
  stockSuggestions: "vision",
} as const satisfies Record<string, FeatureStatus>;

export type FeatureKey = keyof typeof featureStatus;

/**
 * True only when every feature in the launch plan is built, tested and marked
 * "available" above. "Our vision" ideas are not part of the launch.
 */
export const releaseReady = (Object.values(featureStatus) as FeatureStatus[]).every((s) => s === "available" || s === "vision");

/** The stage the site is actually in. A "launched" request is refused until releaseReady. */
export const releaseStage: "pre-launch" | "launched" =
  siteConfig.requestedStage === "launched" && releaseReady ? "launched" : "pre-launch";

/**
 * What the public site shows for a feature. The website is launch-ready copy:
 * launch features carry no label (the pre-launch notice on every page says the
 * product isn't available yet); only "Our vision" ideas stay labelled.
 * `featureStatus` above is the internal readiness record.
 */
export function statusOf(key: FeatureKey): FeatureStatus {
  return featureStatus[key] === "vision" ? "vision" : "available";
}

/** Launch wording is always used; the first argument is kept as a record of the pre-launch wording. */
export function whenLive(_now: string, launched: string): string {
  return launched;
}
