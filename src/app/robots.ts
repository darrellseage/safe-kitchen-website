import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Nothing may be crawled until the owner says "go live" (siteConfig.allowIndexing). */
export default function robots(): MetadataRoute.Robots {
  return siteConfig.allowIndexing
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteConfig.url}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
