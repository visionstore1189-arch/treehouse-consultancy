import { readFile, readdir, copyFile } from "node:fs/promises";
import path from "node:path";
const expected = [
  "",
  "dawabit",
  "dawabit/how-it-works",
  "dawabit/coverage",
  "dawabit/demo",
  "dawabit/faq",
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
  "about",
  "contact",
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
    if (!html.includes("treehouseconsulting.co.uk"))
      throw new Error(`Wrong canonical domain: ${file}`);
    if (/TIBQA|Tibqa|Mutabiq|MUTABIQ|مطابق|طبقًا|طبًقا|treehouseconsultancy\.co\.uk/.test(html))
      throw new Error(`Retired product or old canonical leaked into public HTML: ${file}`);
    if (/dawabit-demo\.vision-store1189\.workers\.dev/i.test(html))
      throw new Error(`Unprotected demo URL leaked into public HTML: ${file}`);
    count++;
  }
for (const name of ["sitemap.xml", "robots.txt", "_headers", "_routes.json", "_redirects"])
  await readFile(path.join("out", name));
console.log(
  `Static export verified: ${count} bilingual pages, metadata, language direction and Cloudflare support files.`,
);
