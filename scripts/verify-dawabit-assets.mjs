import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const requiredSvg = [
  "public/brand/treehouse-logo-primary-v4.svg",
  "public/brand/treehouse-logo-reversed-v4.svg",
  "public/brand/treehouse-logo-mono-navy-v4.svg",
  "public/brand/treehouse-logo-mono-white-v4.svg",
  "public/brand/treehouse-wordmark-only-primary-v4.svg",
  "public/brand/treehouse-wordmark-only-reversed-v4.svg",
  "public/brand/treehouse-mark-v4.svg",
  "public/brand/dawabit-logo-primary-v4.svg",
  "public/brand/dawabit-logo-reversed-v4.svg",
  "public/brand/dawabit-logo-mono-navy-v4.svg",
  "public/brand/dawabit-logo-mono-white-v4.svg",
  "public/brand/dawabit-by-treehouse-lockup-ar-light-v1.svg",
  "public/brand/dawabit-by-treehouse-lockup-ar-v1.svg",
  "public/brand/dawabit-wordmark-ar-light-v1.svg",
  "public/brand/dawabit-wordmark-ar-v1.svg",
  "public/brand/treehouse-favicon-v4.svg",
  "public/favicon.svg",
];
for (const file of requiredSvg) {
  const info = await stat(path.resolve(file));
  if (!info.isFile() || info.size < 100) {
    throw new Error("Missing or truncated original brand master: " + file);
  }
  const raw = await readFile(path.resolve(file), "utf8");
  if (!raw.includes("<svg") || !raw.includes("</svg>")) {
    throw new Error("Invalid official SVG: " + file);
  }
}

async function enumerate(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await enumerate(full));
    if (entry.isFile()) output.push(full);
  }
  return output;
}

const files = await enumerate("public");
const forbidden = [
  { re: /(?:^|[/\\])(?:tibqa|mutabiq|r.cat)(?:[/\\._-]|$)/i, reason: "Retired product-branded asset" },
  { re: /Dawabit_Screen_[234]_/i, reason: "Protected product screen 2, 3 or 4" },
  { re: /Dawabit_(?:Sample_Assessment_Report|Demo_v\d+|Product_Tour)/i, reason: "Confidential report or demonstration source" },
  { re: /(?:client[-_ ]?1|client1).*(?:guide|requirements)|(?:guide|requirements).*(?:client[-_ ]?1|client1)/i, reason: "Confidential Client 1 guide" },
  { re: /(?:^|[/\\])(?:\.env(?:\..*)?|\.dev\.vars(?:\..*)?)$/i, reason: "Environment or runtime secret file" },
];
for (const file of files) {
  for (const rule of forbidden) {
    if (rule.re.test(file)) throw new Error(rule.reason + " must not ship in public/: " + file);
  }
}

const assets = await readFile("src/content/dawabit-assets.ts", "utf8");
const graphics = await readFile("src/content/dawabit-v5.ts", "utf8");
const overviewEnabled = /visualsEnabled:\s*true\b/.test(assets);
const panelsEnabled = /approvedVisualsInstalled\s*=\s*true\b/.test(graphics);
if (overviewEnabled !== panelsEnabled) {
  throw new Error("Official screenshot and infographic activation flags must be reviewed and enabled together.");
}
if (panelsEnabled) {
  // Never enable official visuals until the exact original files are installed,
  // not just their paths entered into a manifest or replaced with new renders.
  const urls = [
    ...assets.matchAll(/(?:file|arFile):\s*"([^"]+\.(?:jpe?g|png))"/g),
  ].map(match => "/brand/dawabit-screens/" + match[1]).concat(
    [...graphics.matchAll(/"((?:\/brand\/dawabit\/graphics\/)[^"]+\.(?:jpe?g|png))"/g)].map(match => match[1]),
  );
  if (urls.length < 16) {
    throw new Error("Incomplete approved Dawabit illustration manifest: " + urls.length + " files.");
  }
  for (const url of urls) {
    const local = path.join("public", url.slice(1));
    let info;
    try { info = await stat(local); }
    catch { throw new Error("Official v5 asset is enabled but missing: " + local); }
    if (!info.isFile() || info.size < 10000) {
      throw new Error("Official v5 asset is truncated or invalid: " + local);
    }
  }
  console.log("All " + urls.length + " official image paths resolve and have non-trivial file size.");
  console.log("Human visual review, content approval and SHA-256 manifest comparison are still required.");
}
console.log("Verified " + requiredSvg.length + " original SVG/favicons, " +
  files.length + " public files and private-content exclusions.");
if (!panelsEnabled) {
  console.log("Official v5 product screens and illustrated panels remain safely disabled until original binaries are installed.");
}
