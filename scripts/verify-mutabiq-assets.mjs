import { stat } from "node:fs/promises";
import path from "node:path";
const names = [
  "TIBQA_Screen_1_Overview_v3.jpg",
  "TIBQA_Screen_2_Requirements_v3.jpg",
  "TIBQA_Screen_3_Finding_v3.jpg",
  "TIBQA_Screen_4_Scope_v3.jpg",
];
const missing = [];
for (const name of names) {
  const file = path.resolve("public/brand/tibqa-screens", name);
  try { const s = await stat(file); if (!s.isFile() || s.size < 5000) missing.push(file); }
  catch { missing.push(file); }
}
if (missing.length) throw new Error("Missing approved TIBQA v3 product screens:\n" + missing.join("\n"));
console.log("All four approved TIBQA v3 product screens verified.");
