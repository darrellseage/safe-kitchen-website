import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { founder } from "@/content/founder";
import { buyers, tour } from "@/content/home";
import { hrefFor, mainNav } from "@/content/navigation";

// Every id="…" used by a homepage component.
const dir = join(process.cwd(), "src/components/home");
const ids = new Set(
  readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .flatMap((f) => [...readFileSync(join(dir, f), "utf8").matchAll(/\bid="([a-z0-9-]+)"/g)].map((m) => m[1])),
);

describe("homepage links", () => {
  it("every tour step links to a section that exists", () => {
    for (const step of tour.steps) expect(ids, step.demo).toContain(step.demo);
  });
  it("every buyer tab links to a section that exists", () => {
    for (const tab of buyers.tabs) for (const h of tab.helps) if (h.href) expect(ids, h.href).toContain(h.href);
  });
  it("every menu item links to a section that exists", () => {
    for (const item of mainNav) expect(ids, item.href).toContain(item.href.split("#")[1]);
  });
});

describe("header and footer links on every page", () => {
  it("real site: section links start with / and work from any page", () => {
    expect(hrefFor("/#tour", "/privacy", false)).toBe("/#tour");
    expect(hrefFor("/#tour", "/", false)).toBe("/#tour");
    expect(hrefFor("/privacy", "/terms", false)).toBe("/privacy");
  });
  it("preview: section links stay on the homepage and lead back to it from other pages", () => {
    expect(hrefFor("#tour", "/", true)).toBe("#tour");
    expect(hrefFor("#pricing", "/index.html", true)).toBe("#pricing");
    for (const page of ["/privacy", "/cookies", "/terms", "/accessibility", "/privacy.html"])
      expect(hrefFor("#early-access", page, true)).toBe("index.html#early-access");
  });
  it("preview: page links are left alone", () => {
    expect(hrefFor("privacy.html", "/terms", true)).toBe("privacy.html");
    expect(hrefFor("index.html", "/terms", true)).toBe("index.html");
  });
});

describe("founder", () => {
  it("uses Darrell's own photo, stored on the site", () => {
    expect(founder.photo?.src).toBe("/images/founder-darrell.jpg");
  });
});
