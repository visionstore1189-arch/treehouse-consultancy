import type { Bilingual } from "./site";
export interface Article {
  slug: string;
  title: Bilingual;
  description: Bilingual;
  date: string;
  market: "uk" | "uae" | "saudi-arabia";
  topic: "compliance" | "governance" | "technology";
  author: "Treehouse";
  status: "draft" | "published";
  body: { heading: Bilingual; paragraphs: Bilingual[] }[];
}
// Launch articles have not been supplied. Do not publish invented briefings or dates.
// Add reviewed bilingual articles here, or replace this module with a CMS build adapter.
export const articles: Article[] = [];
export const publishedArticles = articles.filter(
  (a) => a.status === "published",
);
export const articleTopics = {
  compliance: { en: "Compliance", ar: "الالتزام" },
  governance: { en: "Governance", ar: "الحوكمة" },
  technology: { en: "Technology", ar: "التقنية" },
};
export const readingMinutes = (a: Article, locale: "en" | "ar") =>
  Math.max(
    1,
    Math.ceil(
      a.body
        .map((s) => s.paragraphs.map((p) => p[locale]).join(" "))
        .join(" ")
        .split(/\s+/).length / (locale === "ar" ? 160 : 220),
    ),
  );
