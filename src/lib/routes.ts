import type { Metadata } from "next";
import { pages } from "@/content/site";
import { seo } from "@/content/seo";
import { publishedArticles } from "@/content/articles";
import { config, href, type Locale } from "./config";
import { approvedVisualsInstalled } from "@/content/dawabit-v5";
export const routePaths = [
  ...Object.keys(pages),
  ...publishedArticles.map((a) => `insights/${a.slug}`),
];
export const staticParams = () =>
  routePaths.map((p) => ({ slug: p ? p.split("/") : [] }));
export function metadataFor(locale: Locale, path: string): Metadata {
  const a = publishedArticles.find((a) => path === `insights/${a.slug}`);
  const p = pages[path];
  const search = seo[path as keyof typeof seo];
  const title =
    search?.title[locale] ||
    a?.title[locale] ||
    p?.title[locale] ||
    "Treehouse Consulting";
  const description =
    search?.description[locale] ||
    a?.description[locale] ||
    p?.meta?.[locale] ||
    p?.intro[locale]?.slice(0, 180);
  const languages: Record<string, string> = {
    en: href("en", path),
    ar: href("ar", path),
    "x-default": href("en", path),
  };
  const region =
    path === "uk"
      ? "GB"
      : path === "uae"
        ? "AE"
        : path === "saudi-arabia"
          ? "SA"
          : null;
  if (region) {
    languages[`en-${region}`] = href("en", path);
    languages[`ar-${region}`] = href("ar", path);
  }
  return {
    metadataBase: new URL(config.siteUrl),
    title:
      path === "" || search
        ? title
        : `${title} | ${locale === "en" ? "Treehouse" : "تري هاوس"}`,
    description,
    alternates: { canonical: href(locale, path), languages },
    robots: { index: false, follow: false }, // DRAFT ONLY: remove at approved launch
    openGraph: {
      title,
      description,
      url: href(locale, path),
      siteName: "Treehouse Consulting",
      locale: locale === "en" ? "en_GB" : "ar_SA",
      type: a ? "article" : "website",
      images: [{ url: "/brand/social-card-v5.png", width: 1200, height: 630, alt: locale === "ar" ? "ضوابط من تري هاوس" : "Dawabit by Treehouse" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/social-card-v5.png"],
    },
    icons: {
      icon: [
        { url: "/brand/treehouse-favicon-v4.svg", type: "image/svg+xml" },
        { url: "/brand/treehouse-favicon-32-v4.png", type: "image/png", sizes: "32x32" },
        { url: "/brand/treehouse-favicon-512-v4.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/brand/treehouse-favicon-180-v4.png", sizes: "180x180" }],
    },
  };
}
