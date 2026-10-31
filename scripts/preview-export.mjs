// Builds a static copy of the homepage for a private review link.
// Usage: node scripts/preview-export.mjs
//   1. builds into .next-preview/ as a launch preview (every feature shown as live;
//      the normal build is unaffected and keeps honest status labels)
//   2. prepares .preview-publish/: the page host reserves names starting with "_",
//      so Next.js's "_next" folder is renamed "assets" and every reference updated,
//      and photo paths are made relative so they load inside the page.
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
const pages = ["index.html", "404.html", "privacy.html", "cookies.html", "terms.html", "accessibility.html"];
for (const page of pages) cpSync(join(".next-preview", page), join(out, page));
cpSync(".next-preview/images", join(out, "images"), { recursive: true });

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.startsWith("_")) rmSync(path); // unused build manifests
    else if (/\.(html|js|css)$/.test(name)) writeFileSync(
        path,
        readFileSync(path, "utf8")
          .replaceAll("_next/", "assets/")
          // Photos load from the page's own folder, not the site root.
          .replace(/(["'(])\/images\//g, "$1./images/")
          // Legal pages are separate files in the preview.
          .replace(/href="\/(privacy|cookies|terms|accessibility)"/g, 'href="$1.html"'),
      );
  }
}
walk(out);
console.log(`Preview ready in ${out}/`);
