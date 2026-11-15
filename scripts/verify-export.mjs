import { readFile, readdir, copyFile } from "node:fs/promises";
import path from "node:path";
const expected = [
  "",
  "mutabiq",
  "mutabiq/how-it-works",
  "mutabiq/coverage",
  "mutabiq/demo",
  "services",
  "services/compliance-assessment",
  "services/licensing-and-authorisation",
  "services/governance-risk-compliance",
  "services/regulatory-change",
  "services/independent-assurance",
  "uk",
  "uae",
  "saudi-arabia",
  "markets",
  "sectors",
  "insights",
  "about",
  "contact",
  "privacy",
  "cookies",
  "terms",
  "client/login",
  "client/portal",
];
await copyFile("scripts/not-found.html", "out/404.html");
let count = 0;
for (const locale of ["en", "ar"])
  for (const route of expected) {
    const file = path.join(
      "out",
      locale === "ar" ? "ar" : "",
      route,
      "index.html",
    );
    const html = await readFile(file, "utf8");
    if (
      !html.includes(`lang="${locale}"`) ||
      !html.includes(`dir="${locale === "ar" ? "rtl" : "ltr"}"`)
    )
      throw new Error(`Invalid language / direction: ${file}`);
    if (!html.includes("<h1")) throw new Error(`No h1: ${file}`);
    if (!html.includes('rel="canonical"'))
      throw new Error(`No canonical: ${file}`);
    count++;
  }
for (const name of ["sitemap.xml", "robots.txt", "_headers", "_routes.json"])
  await readFile(path.join("out", name));
console.log(
  `Static export verified: ${count} bilingual pages, metadata, language direction and Cloudflare support files.`,
);
