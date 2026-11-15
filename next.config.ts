import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

const imageNames = [
  "TIBQA_Screen_1_Overview_v3.jpg",
  "TIBQA_Screen_2_Requirements_v3.jpg",
  "TIBQA_Screen_3_Finding_v3.jpg",
  "TIBQA_Screen_4_Scope_v3.jpg",
];
const visualsAvailable = imageNames.every((name) =>
  existsSync(join(process.cwd(), "public", "brand", "tibqa-screens", name)),
);
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  env: { NEXT_PUBLIC_TIBQA_VISUALS_ENABLED: visualsAvailable ? "true" : "false" },
};
export default config;
