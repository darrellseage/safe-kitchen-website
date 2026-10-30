/**
 * Honest status for every feature mentioned on the site (Stage 1 proposal §1.1).
 * Nothing is "available" until it is really live for customers.
 * Change a status here and every label on the site follows.
 */
export type FeatureStatus = "available" | "in_development" | "planned" | "exploring";

export const statusLabels: Record<FeatureStatus, string> = {
  available: "Available",
  in_development: "In development",
  planned: "Planned",
  exploring: "Exploring",
};

export const featureStatus = {
  temperatures: "in_development",
  cleaning: "in_development",
  checklists: "in_development",
  problems: "in_development",
  managerOverview: "in_development",
  inspectionView: "in_development",
  sharedTablet: "in_development",
  training: "planned",
  probes: "exploring",
  aiInsights: "exploring",
  rotas: "exploring",
  ordering: "exploring",
} as const satisfies Record<string, FeatureStatus>;
