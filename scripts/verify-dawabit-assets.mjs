import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const required = [
  "public/brand/dawabit-by-treehouse-lockup-ar-light-v1.svg",
  "public/brand/dawabit-by-treehouse-lockup-ar-v1.svg",
  "public/brand/dawabit-wordmark-ar-light-v1.svg",
  "public/brand/dawabit-wordmark-ar-v1.svg",
  "public/brand/treehouse-favicon-v4.svg",
  "public/favicon.svg",
];
for (const asset of required) {
  const statResult = await stat(path.resolve(asset));
  if (!statResult.isFile() || statResult.size < 100) throw new Error("Missing official v5 asset: " + asset);
  const raw = await readFile(path.resolve(asset), "utf8");
  if (!raw.includes("<svg") || !raw.includes("</svg>")) throw new Error("Invalid SVG: " + asset);
}
for (const denied of [
  "public/brand/tibqa-mark.svg",
  "public/brand/tibqa-wordmark.svg",
  "public/brand/tibqa-wordmark-light.svg",
  "public/brand/tibqa-screens/TIBQA_Screen_1_Overview_v3.jpg",
]) {
  try { await stat(path.resolve(denied)); throw new Error("Retired client asset must not ship: " + denied); }
  catch (err) { if (String(err).includes("Retired client asset")) throw err; }
}
console.log("Verified 6 official Dawabit/Treehouse v5 SVG assets and retired branding removed.");
console.log("English master logos, v5 illustrations, social card and public v5 overview remain gated until real supplied originals are uploaded.");
