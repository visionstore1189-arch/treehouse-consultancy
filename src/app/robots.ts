import type { MetadataRoute } from "next";
import { config } from "@/lib/config";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/", // DRAFT ONLY: remove at approved launch
    },
    sitemap: config.siteUrl + "/sitemap.xml",
  };
}
