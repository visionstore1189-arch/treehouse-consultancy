import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

// Static-export clean-up for the framework-generated empty metadata tag.
const root = path.resolve("out");
let scanned = 0, removed = 0;
async function visit(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { await visit(file); continue; }
    if (!entry.name.endsWith(".html")) continue;
    const before = await readFile(file, "utf8");
    // Remove only empty next-size-adjust tags; preserve all other metadata.
    const after = before.replace(/<meta\b(?=[^>]*\bname=[\"']next-size-adjust[\"'])(?=[^>]*\bcontent=[\"'][\"'])[^>]*>/gi, "");
    if (after !== before) { removed++; await writeFile(file, after); }
    scanned++;
  }
}
await visit(root);
console.log(`Checked ${scanned} exported pages; cleaned ${removed} empty framework metadata tags.`);
