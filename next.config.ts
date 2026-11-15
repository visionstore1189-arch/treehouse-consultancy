import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

const imageNames = [
  "Mutabiq_Screen_1_Overview_v1",
  "Mutabiq_Screen_2_Requirements_v1",
  "Mutabiq_Screen_3_Finding_v1",
  "Mutabiq_Screen_4_Scope_v1",
];
const visualsAvailable = imageNames.every((name) =>
  [1600, 3200].every((width) =>
    existsSync(join(process.cwd(), "public", "brand", "mutabiq-screens", `${name}-${width}.webp`)),
  ),
);

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  // Product illustrations switch on automatically once all eight WebPs are committed.
  // Never show broken image links on an incomplete upload.
  env: { NEXT_PUBLIC_MUTABIQ_VISUALS_ENABLED: visualsAvailable ? "true" : "false" },
};
export default config;
