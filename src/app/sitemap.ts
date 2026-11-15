import type { MetadataRoute } from "next";
import { routePaths } from "@/lib/routes";
import { config, href } from "@/lib/config";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return routePaths
    .filter(
      (p) =>
        !p.startsWith("client/") &&
        !["privacy", "cookies", "terms"].includes(p),
    )
    .flatMap((p) =>
      (["en", "ar"] as const).map((locale) => ({
        url: config.siteUrl + href(locale, p),
        alternates: {
          languages: {
            en: config.siteUrl + href("en", p),
            ar: config.siteUrl + href("ar", p),
          },
        },
      })),
    );
}
