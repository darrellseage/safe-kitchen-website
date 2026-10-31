import type { NextConfig } from "next";

// PREVIEW_EXPORT=1 builds a static copy of the site for a private review link
// (scripts/preview-export.mjs). Normal builds are unaffected.
const previewExport = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = {
  turbopack: {
    // The static preview has no server, so the form uses a stand-in that saves nothing.
    ...(previewExport ? { resolveAlias: { "@/app/actions/early-access": "./src/app/actions/early-access.preview.ts" } } : {}),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Stock photos are stored in public/images (licences and accuracy reviews
    // in src/content/images.ts). No outside image hosts are allowed.
    qualities: [70, 80],
    unoptimized: previewExport,
  },
  ...(previewExport ? { output: "export" as const, distDir: ".next-preview", assetPrefix: "." } : {}),
};

export default nextConfig;
