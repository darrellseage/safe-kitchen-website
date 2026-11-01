import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { founder } from "@/content/founder";
import { buyers, tour } from "@/content/home";
import { mainNav } from "@/content/navigation";

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

describe("founder", () => {
  it("never shows a photo that isn't genuine (none supplied yet)", () => {
    expect(founder.photo).toBeNull();
  });
});
