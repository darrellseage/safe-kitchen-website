// Builds a static copy of the homepage for a private review link.
// Usage: node scripts/preview-export.mjs  →  output in .next-preview/
// The normal site build (npm run build) is unaffected.
import { execSync } from "node:child_process";

execSync("npx next build", {
  stdio: "inherit",
  env: { ...process.env, PREVIEW_EXPORT: "1", NEXT_PUBLIC_PREVIEW_EXPORT: "1" },
});
