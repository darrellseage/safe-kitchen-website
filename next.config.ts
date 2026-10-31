import type { NextConfig } from "next";

// PREVIEW_EXPORT=1 builds a static copy of the site for a private review link
// (scripts/preview-export.mjs). Normal builds are unaffected.
const previewExport = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Stock photos are served from Unsplash (licences and accuracy reviews in
    // src/content/images.ts). Only this host is allowed.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" }],
    qualities: [70, 80],
    unoptimized: previewExport,
  },
  ...(previewExport ? { output: "export" as const, distDir: ".next-preview", assetPrefix: "." } : {}),
};

export default nextConfig;
