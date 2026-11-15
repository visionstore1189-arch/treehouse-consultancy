import { stat } from "node:fs/promises";
import path from "node:path";
const enabled = process.env.NEXT_PUBLIC_MUTABIQ_VISUALS_ENABLED === "true";
if (enabled) {
  const names = [
    "Mutabiq_Screen_1_Overview_v1",
    "Mutabiq_Screen_2_Requirements_v1",
    "Mutabiq_Screen_3_Finding_v1",
    "Mutabiq_Screen_4_Scope_v1",
  ];
  const missing = [];
  for (const base of names) for (const size of [1600, 3200]) {
    const file = path.resolve("public/brand/mutabiq-screens", `${base}-${size}.webp`);
    try { const s = await stat(file); if (!s.isFile() || s.size < 1000) missing.push(file); }
    catch { missing.push(file); }
  }
  if (missing.length) throw new Error(
    "Mutabiq visuals enabled, but source WebP files missing:\n" +
    missing.map((f) => " - " + f).join("\n") +
    "\nKeep NEXT_PUBLIC_MUTABIQ_VISUALS_ENABLED=false until all files are uploaded."
  );
}
console.log(enabled ? "Mutabiq visual assets verified." : "Mutabiq visuals disabled until approved assets are uploaded.");
