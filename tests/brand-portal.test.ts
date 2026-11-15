import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync("src/components/pages.tsx", "utf8");
const content = readFileSync("src/content/site.ts", "utf8");
const ui = readFileSync("src/components/ui.tsx", "utf8");
const header = readFileSync("src/components/header.tsx", "utf8");
const config = readFileSync("src/lib/config.ts", "utf8");
const favicon = readFileSync("public/favicon.svg", "utf8");

test("market cards place Saudi Arabia, United Kingdom, then UAE", () => {
  assert.match(page, /marketDisplayOrder = \["saudi-arabia", "uk", "uae"\]/);
  assert.match(page, /orderedMarkets\.map\(\(m, i\)/);
});

test("brand name is uppercase in English while Arabic stays Arabic", () => {
  assert.match(content, /product: t\("MUTABIQ", "مطابق"\)/);
  assert.match(ui, /mutabiq-wordmark\.svg/);
  assert.match(header, /mutabiq-mark\.svg/);
  assert.doesNotMatch(content, /\bMutabiq\b/);
});

test("public portal cannot become active without an explicitly configured secure origin", () => {
  assert.match(config, /NEXT_PUBLIC_MUTABIQ_PORTAL_CONNECTED/);
  assert.match(config, /NEXT_PUBLIC_MUTABIQ_LOGIN_URL/);
  assert.match(config, /https:/);
  assert.match(page, /!config\.portalConnected/);
  assert.match(page, /type="password"[^\n]*disabled/);
});

test("favicon is the supplied six-bar icon and not the old tree glyph", () => {
  assert.equal((favicon.match(/ M\d|d="M\d/g) || []).length > 0, true);
  assert.match(favicon, /#02784f/);
});
