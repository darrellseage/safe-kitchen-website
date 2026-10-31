// Builds a static copy of the homepage for a private review link.
// Usage: node scripts/preview-export.mjs
//   1. builds into .next-preview/ as a launch preview (every feature shown as live;
//      the normal build is unaffected and keeps honest status labels)
//   2. prepares .preview-publish/: the page host reserves names starting with "_",
//      so Next.js's "_next" folder is renamed "assets" and every reference updated.
import { execSync } from "node:child_process";
import { cpSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

execSync("npx next build", {
  stdio: "inherit",
  env: { ...process.env, PREVIEW_EXPORT: "1", NEXT_PUBLIC_PREVIEW_EXPORT: "1", NEXT_PUBLIC_LAUNCH_PREVIEW: "1" },
});

const out = ".preview-publish";
rmSync(out, { recursive: true, force: true });
cpSync(".next-preview/_next", join(out, "assets"), { recursive: true });
for (const page of ["index.html", "404.html"]) cpSync(join(".next-preview", page), join(out, page));

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.startsWith("_")) rmSync(path); // unused build manifests
    else if (/\.(html|js|css)$/.test(name)) writeFileSync(path, readFileSync(path, "utf8").replaceAll("_next/", "assets/"));
  }
}
walk(out);
console.log(`Preview ready in ${out}/`);
