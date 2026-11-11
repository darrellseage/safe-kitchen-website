import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allPaths } from "@/content/site-map";

/** Every page, from the single page list. Search engines are still told not to index (robots.ts) until launch. */
export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths.map((path) => ({ url: `${siteConfig.url}${path === "/" ? "" : path}` }));
}
