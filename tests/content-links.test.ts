import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { featureStatus, releaseReady, releaseStage, statusOf, type FeatureKey } from "@/config/features";
import { cta, preLaunchNotice } from "@/content/cta";
import { customers, experience } from "@/content/experience";
import { faqs, faqsFor, faqTopics } from "@/content/faqs";
import { featureContent } from "@/content/feature-pages";
import { founder } from "@/content/founder";
import { buyers, tour } from "@/content/home";
import { isCurrent, section, sectionIds } from "@/content/navigation";
import { allPaths, featurePages, primaryNav, routes } from "@/content/site-map";

const root = process.cwd();
// Every id="…" used by a component, to check #anchors really exist.
const ids = new Set(
  ["src/components/home", "src/components/features", "src/components/ui"].flatMap((dir) =>
    readdirSync(join(root, dir))
      .filter((f) => f.endsWith(".tsx"))
      .flatMap((f) => [...readFileSync(join(root, dir, f), "utf8").matchAll(/\bid="([a-z0-9-]+)"/g)].map((m) => m[1])),
  ),
);
const pageFile = (path: string) => {
  if (path === "/") return "src/app/page.tsx";
  if (path.startsWith("/features/")) return "src/app/features/[slug]/page.tsx";
  return `src/app${path}/page.tsx`;
};
const checkHref = (href: string) => {
  const [path, anchor] = href.split("#");
  expect(allPaths, href).toContain(path);
  if (anchor) expect(ids, href).toContain(anchor);
};

describe("pages and links", () => {
  it("every page in the site map has a page file", () => {
    for (const path of allPaths) expect(existsSync(join(root, pageFile(path))), path).toBe(true);
  });
  it("has the eight agreed feature pages, each with content", () => {
    expect(featurePages.map((f) => f.slug)).toEqual(["food-safety", "inspection-mode", "temperature-checks", "allergens", "training", "rotas-clock-in", "ordering", "reports"]);
    for (const f of featurePages) {
      const c = featureContent[f.slug];
      expect(c.metaTitle.length, f.slug).toBeGreaterThan(5);
      expect(c.owners.length && c.team.length && c.shift.steps.length && c.records.items.length && c.goodToKnow.length, f.slug).toBeGreaterThan(0);
      for (const r of c.related) expect(featurePages.some((p) => p.slug === r) && r !== f.slug, `${f.slug} → ${r}`).toBe(true);
      expect(faqsFor(f.slug).length, `${f.slug} questions`).toBeGreaterThan(0);
    }
  });
  it("every named section points at a real page and anchor", () => {
    for (const id of sectionIds) checkHref(section(id));
  });
  it("tour steps, buyer tabs and the menu link to real places", () => {
    for (const step of tour.steps) checkHref(section(step.demo));
    for (const tab of buyers.tabs) for (const h of tab.helps) if (h.href) checkHref(section(h.href));
    for (const item of primaryNav) checkHref(item.href);
  });
  it("marks the current page in the menu", () => {
    expect(isCurrent(routes.features, "/features/allergens")).toBe(true);
    expect(isCurrent(routes.pricing, "/pricing")).toBe(true);
    expect(isCurrent(routes.pricing, "/")).toBe(false);
    expect(isCurrent("/", "/")).toBe(true);
  });
  it("every FAQ belongs to a known topic", () => {
    for (const f of faqs) expect(faqTopics).toContain(f.topic);
    expect(new Set(faqs.map((f) => f.q)).size).toBe(faqs.length);
  });
});

describe("release stage", () => {
  it("stays pre-launch until every launch feature is built and approved", () => {
    expect(releaseReady).toBe(false);
    expect(releaseStage).toBe("pre-launch");
    expect(preLaunchNotice).toMatch(/isn’t available to customers yet/);
  });
  it("calls to action register interest on this site, never a payment", () => {
    expect(cta.href).toBe(routes.earlyAccess);
    expect(cta.label).toBe("Get early access");
  });
  it("shows no per-feature labels for launch features, only for ideas beyond the launch", () => {
    for (const key of Object.keys(featureStatus) as FeatureKey[]) expect(statusOf(key)).toBe(featureStatus[key] === "vision" ? "vision" : "available");
  });
});

describe("founder experience and customers", () => {
  it("lists the seven companies the owner confirmed", () => {
    expect(experience.companies.map((c) => c.name)).toEqual(["Sapphire", "Burrito Bhais", "Kluckaroo’s", "Sibu Asian Soul Food", "Haven", "Bourne Leisure", "Morley’s"]);
    expect(experience.heading).toBe("Built on real hospitality experience");
  });
  it("shows a logo only from the site's own approved files", () => {
    for (const c of experience.companies) if (c.logo) expect(existsSync(join(root, "public", c.logo.src)), c.name).toBe(true);
  });
  it("names no customers until a business has agreed", () => {
    expect(customers.companies).toEqual([]);
  });
  it("uses Darrell's own photo, stored on the site", () => {
    expect(founder.photo?.src).toBe("/images/founder-darrell.jpg");
  });
});
