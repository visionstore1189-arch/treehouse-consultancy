/**
 * Install only the exact approved public Dawabit v5 visual assets.
 *
 * Usage:
 * 1. Extract Dawabit_v5_APPROVED_PUBLIC_ASSETS_staging.zip to a local directory.
 * 2. node scripts/install-dawabit-v5-public-assets.mjs /absolute/path/to/extracted
 * 3. npm run check:assets && npm run build
 *
 * This NEVER copies Client1 content, restricted product screens or demos.
 */
import { readFile, copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const root = path.resolve(process.cwd());
const from = path.resolve(process.argv[2] ?? ".");
const manifestPath = path.join(from, "APPROVED_PUBLIC_ASSETS_MANIFEST.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (!Array.isArray(manifest.assets) || manifest.assets.length < 20) {
  throw new Error("Expected the complete approved-public-assets manifest.");
}
const deny = /(?:Dawabit_Screen_[234]_|client.?1|requirements.?guide|sample.?report|demo_v|product.?tour|password|secret|tibqa|mutabiq)/i;
const required = [
  "public/brand/dawabit-screens/Dawabit_Screen_1_Overview_v5.jpg",
  "public/brand/dawabit-screens/Dawabit_Screen_1_Overview_v5_AR.jpg",
  ...["Verdict_Panel_1_Definitions", "Verdict_Panel_2_Worked_Examples",
    "Verdict_Panel_3_Evidence_Chain", "Verdict_Panel_4_Results_Summary",
    "Verdict_Panel_5_Badge_Strip", "How_It_Works_Strip",
    "Sector_Grid"].flatMap(prefix => [
      "public/brand/dawabit/graphics/" + prefix + "_EN_Light_v2.png",
      "public/brand/dawabit/graphics/" + prefix + "_AR_Light_v2.png",
    ]),
];
const included = new Set(manifest.assets.map(item => item.path));
for (const requiredFile of required) {
  if (!included.has(requiredFile)) {
    throw new Error("Missing approved image in v5 package: " + requiredFile);
  }
}
let copied = 0;
for (const item of manifest.assets) {
  const rel = item.path;
  if (typeof rel !== "string" || !rel.startsWith("public/brand/") ||
      rel.includes("..") || path.isAbsolute(rel) || deny.test(rel)) {
    throw new Error("Rejected disallowed asset path: " + rel);
  }
  const input = path.resolve(from, rel);
  const target = path.resolve(root, rel);
  if (!input.startsWith(from + path.sep) || !target.startsWith(root + path.sep)) {
    throw new Error("Rejected asset path escape: " + rel);
  }
  const data = await readFile(input);
  const actual = createHash("sha256").update(data).digest("hex");
  if (actual !== item.sha256 || data.length !== item.bytes) {
    throw new Error("Original bytes do not match manifest for: " + rel);
  }
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(input, target);
  copied += 1;
}
for (const rel of required) {
  const info = await stat(path.resolve(root, rel));
  if (!info.isFile() || info.size < 10000) throw new Error("Missing or truncated: " + rel);
}
const flags = [
  ["src/content/dawabit-assets.ts", "visualsEnabled: false", "visualsEnabled: true"],
  ["src/content/dawabit-v5.ts", "approvedVisualsInstalled = false", "approvedVisualsInstalled = true"],
];
for (const [file, before, after] of flags) {
  const target = path.resolve(root, file);
  const original = await readFile(target, "utf8");
  if (!original.includes(before)) throw new Error("Expected visual flag missing: " + file);
  await writeFile(target, original.replace(before, after), "utf8");
}
console.log("Installed " + copied + " byte-verified public v5 assets, including " + required.length + " required images.");
console.log("The site remains noindex and confidential content stays excluded.");
console.log("Run npm run check:assets, npm test and npm run build, then perform human image QA.");
