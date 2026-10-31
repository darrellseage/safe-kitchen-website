import type { FeatureKey } from "@/config/features";

/** The five product pillars (app DECISIONS.md D-075), in homepage order. */
export const pillars = [
  {
    id: "food-safety",
    name: "Simple Food Safety",
    benefit: "Temperatures, cleaning and checks in a few taps. Records ready to find.",
    status: "temperatures",
    icon: "thermometer",
  },
  {
    id: "training",
    name: "Staff Training",
    benefit: "A food safety course sent to staff phones, with the test and certificate saved in the app.",
    status: "trainingCourse",
    icon: "graduation",
  },
  {
    id: "rotas",
    name: "Smart Staff Rotas",
    benefit: "Upload the rota you already made, from a photo or spreadsheet. Check it, then send it.",
    status: "rotas",
    icon: "calendar",
  },
  {
    id: "clock-in",
    name: "Clock-In & Attendance",
    benefit: "Know who’s in, who’s late, and turn shifts into timesheets.",
    status: "clockIn",
    icon: "clock",
  },
  {
    id: "ai-checker",
    name: "AI Checker",
    benefit: "Checks your forms and records are complete, and tells you what needs attention.",
    status: "aiChecker",
    icon: "eye",
  },
  {
    id: "ordering",
    name: "Smart Ordering",
    benefit: "Catch duplicates and odd quantities before they cost you.",
    status: "ordering",
    icon: "basket",
  },
] as const satisfies ReadonlyArray<{ id: string; name: string; benefit: string; status: FeatureKey; icon: string }>;

export type PillarIcon = (typeof pillars)[number]["icon"];
