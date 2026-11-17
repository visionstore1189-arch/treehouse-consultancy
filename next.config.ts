import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

const imageNames = [
  "Dawabit_Screen_1_Overview_v3.jpg",
  "Dawabit_Screen_2_Requirements_v3.jpg",
  "Dawabit_Screen_3_Finding_v3.jpg",
  "Dawabit_Screen_4_Scope_v3.jpg",
];
const visualsAvailable = imageNames.every((name) =>
  existsSync(join(process.cwd(), "public", "brand", "dawabit-screens", name)),
);
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  env: { NEXT_PUBLIC_Dawabit_VISUALS_ENABLED: visualsAvailable ? "true" : "false" },
};
export default config;
