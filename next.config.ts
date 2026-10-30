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
    // Stock photos are served from Unsplash (licences and accuracy reviews in
    // src/content/images.ts). Only this host is allowed.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" }],
    qualities: [70, 80],
  },
};

export default nextConfig;
