/**
 * Honest status for every capability mentioned on the site, checked against
 * the app's plan (docs/REDESIGN_PROPOSAL.md §3). Nothing is "available" until
 * it is really live for customers. Change a status here and every label on
 * the site follows.
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

/** A feature's status, or "available" for everything in a launch preview. */
export function statusOf(key: FeatureKey): FeatureStatus {
  return siteConfig.launchPreview ? "available" : featureStatus[key];
}

/** Picks the honest wording now, or the launched wording in a launch preview. */
export function whenLive(now: string, launched: string): string {
  return siteConfig.launchPreview ? launched : now;
}
