import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(path, "utf8");
const page = read("src/components/pages.tsx");
const content = read("src/content/site.ts");
const ui = read("src/components/ui.tsx");
const header = read("src/components/header.tsx");
const footer = read("src/components/footer.tsx");
const config = read("src/lib/config.ts");
const favicon = read("public/favicon.svg");
const tour = read("src/components/tibqa-tour.tsx");

test("market cards place Saudi Arabia, United Kingdom, then UAE", () => {
  assert.match(page, /marketDisplayOrder = \["saudi-arabia", "uk", "uae"\]/);
  assert.match(page, /orderedMarkets\.map\(\(m, i\)/);
});
test("English TIBQA and Arabic طبقًا branding replace the retired product name", () => {
  assert.match(content, /product: t\("TIBQA", "طبقًا"\)/);
  assert.match(ui, /tibqa-wordmark\.svg/);
  assert.match(header, /tibqa-mark\.svg/);
  for (const file of ["src/content/site.ts", "src/content/seo.ts", "src/components/pages.tsx", "src/components/header.tsx", "src/components/footer.tsx", "src/components/ui.tsx"]) {
    assert.doesNotMatch(read(file), /\bMUTABIQ\b|\bMutabiq\b|مطابق/);
  }
});
test("old product routes redirect permanently to TIBQA in both languages", () => {
  const redirects = read("public/_redirects");
  assert.match(redirects, /\/mutabiq\/\* \/tibqa\/:splat 301/);
  assert.match(redirects, /\/ar\/mutabiq\/\* \/ar\/tibqa\/:splat 301/);
  assert.match(content, /"tibqa\/how-it-works"/);
  assert.match(page, /case "tibqa\/coverage"/);
});
test("login and unfinished Insights and legal pages are offline", () => {
  assert.doesNotMatch(header, /client\/login/);
  assert.doesNotMatch(footer, /client\/login/);
  assert.doesNotMatch(content, /"client\/login":|  insights: \{|  privacy: \{\n    title:/);
  assert.doesNotMatch(page, /<ClientAccessBand/);
  assert.match(config, /formsEnabled: false/);
  assert.match(config, /sampleReportEnabled: false/);
});
test("TIBQA hero features keyboard accessible, reduced-motion-aware official four-step tour", () => {
  assert.match(page, /<TibqaTour locale=\{locale\}/);
  assert.match(tour, /prefers-reduced-motion/);
  assert.match(tour, /6000/);
  assert.match(tour, /onMouseEnter/);
  assert.match(tour, /onKeyDown/);
  assert.match(tour, /role="tablist"/);
  assert.match(tour, /"Scope"/);
  assert.match(tour, /"Map"/);
  assert.match(tour, /"Assess"/);
  assert.match(tour, /"Report"/);
});
test("favicon stays supplied Treehouse icon", () => {
  assert.equal((favicon.match(/ M\d|d="M\d/g) || []).length > 0, true);
  assert.match(favicon, /#02784f/);
});
test("public brand stays Treehouse Consulting and .co.uk is canonical", () => {
  const paths = ["src/content/site.ts", "src/content/seo.ts", "src/lib/routes.ts", "src/components/pages.tsx", "public/brand/social-card.svg"];
  for (const path of paths) {
    assert.doesNotMatch(read(path), /Treehouse Consultancy|TREEHOUSE CONSULTANCY/);
  }
  assert.match(config, /https:\/\/treehouseconsultancy\.co\.uk/);
  assert.doesNotMatch(config, /treehouseconsultancy\.com/);
});
