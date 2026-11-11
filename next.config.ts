import type { NextConfig } from "next";

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
    // Photos are stored in public/images (licences and accuracy reviews
    // in src/content/images.ts). No outside image hosts are allowed.
    qualities: [70, 80],
  },
};

export default nextConfig;
