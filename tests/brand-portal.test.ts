import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const read = (file: string) => readFileSync(file, "utf8");
const page = read("src/components/pages.tsx");
const site = read("src/content/site.ts");
const header = read("src/components/header.tsx");
const footer = read("src/components/footer.tsx");
const config = read("src/lib/config.ts");
const redirects = read("public/_redirects");

test("approved Dawabit by Treehouse and Arabic ضوابط are used in content and metadata", () => {
  assert.match(site, /product: t\("Dawabit", "ضوابط"\)/);
  assert.match(site, /endorsement: t\("by Treehouse", "من تري هاوس"\)/);
  assert.match(site, /Dawabit \(ضوابط\) is the Arabic word/);
  assert.match(read("src/content/seo.ts"), /"dawabit\/faq":/);
  assert.match(config, /treehouseconsulting\.co\.uk/);
  assert.doesNotMatch(config, /treehouseconsultancy\.co\.uk/);
  for (const file of [
    "src/content/site.ts", "src/content/seo.ts", "src/components/pages.tsx",
    "src/components/header.tsx", "src/components/footer.tsx",
    "src/components/ui.tsx", "src/lib/routes.ts"
  ]) {
    assert.doesNotMatch(read(file), /TIBQA|Tibqa|Mutabiq|R CAT|طبقًا|مطابق/);
  }
});

test("legacy product routes redirect permanently to the matching Dawabit routes", () => {
  for (const path of ["/tibqa/*", "/mutabiq/*", "/ar/tibqa/*", "/ar/mutabiq/*"]) {
    assert.ok(redirects.includes(path), path);
  }
  assert.match(redirects, /\/tibqa\/\* \/dawabit\/:splat 301/);
  assert.match(redirects, /\/ar\/mutabiq\/\* \/ar\/dawabit\/:splat 301/);
});

test("19 ISIC4 sector sections: ten featured cards, nine compact entries", () => {
  const featured = (site.match(/featured: true/g) || []).length;
  const additional = (site.match(/featured: false/g) || []).length;
  assert.equal(featured, 10);
  assert.equal(additional, 9);
  assert.match(site, /code: "K"/);
  assert.match(site, /code: "S"/);
  assert.doesNotMatch(site, /code: "T"|code: "U"/);
  assert.match(page, /sectorClassificationNote/);
});

test("staged site includes additional buyer and explanatory sections in both languages", () => {
  for (const name of ["dawabit-verdict-section", "dawabit-engagement-section",
    "dawabit-role-grid", "dawabit-ai-section", "dawabit-faq-section",
    "dawabit-sector-card-grid", "dawabit-method-grid",
    "dawabit-deliverables-section", "dawabit-assurance-section"]) {
    assert.ok(page.includes(name), name);
  }
  assert.match(site, /"dawabit\/faq":/);
  assert.match(page, /artificialIntelligenceText\[locale\]/);
});

test("unapproved login, unpublished legal notices and demo remain inaccessible", () => {
  assert.doesNotMatch(site, /"client\/login":/);
  assert.doesNotMatch(page, /case "client\/login":/);
  assert.doesNotMatch(header, /client\/login/);
  assert.doesNotMatch(footer, /client\/login/);
  assert.doesNotMatch(page, /dawabit-demo\.vision-store1189\.workers\.dev/);
  assert.doesNotMatch(site, /dawabit-demo\.vision-store1189\.workers\.dev/);
  assert.match(config, /formsEnabled: false/);
  assert.match(config, /sampleReportEnabled: false/);
  assert.match(config, /authLoginEnabled: false/);
  const publicPanelsReady = /approvedVisualsInstalled = true/.test(read("src/content/dawabit-v5.ts"));
  const publicOverviewReady = /visualsEnabled: true/.test(read("src/content/dawabit-assets.ts"));
  assert.equal(publicPanelsReady, publicOverviewReady, "Public images must activate together after original-byte checks");
  assert.match(page, /PROTECTED ACCESS PENDING/);
});

test("official supplied Arabic vector art and favicon installed", () => {
  for (const path of ["public/brand/dawabit-by-treehouse-lockup-ar-v1.svg",
    "public/brand/dawabit-by-treehouse-lockup-ar-light-v1.svg",
    "public/brand/dawabit-wordmark-ar-v1.svg",
    "public/brand/dawabit-wordmark-ar-light-v1.svg",
    "public/brand/treehouse-favicon-v4.svg", "public/favicon.svg"]) {
    assert.equal(existsSync(path), true, path);
    assert.match(read(path), /<svg/);
  }
  assert.doesNotMatch(read("src/components/ui.tsx"), /tibqa-wordmark/);
});

test("email fallback is clickable with client's address and remains non-submitting", () => {
  const form = read("src/components/enquiry-form.tsx");
  assert.match(form, /mailto:enquiries@treehouseconsulting\.co\.uk/);
  assert.match(form, /if \(!enabled\) return/);
  assert.match(form, /form-closed-email/);
});

test("brand palette matches client-provided navy, green and mint", () => {
  const css = read("src/app/globals.css");
  assert.match(css, /--navy: #0B1F3A/);
  assert.match(css, /--forest: #0B8457/);
  assert.match(css, /--mint: #2FCB8B/);
});

test("public product has only overview and no v3 screenshots/tour", () => {
  assert.doesNotMatch(page, /DawabitTour|TIBQAVisual|AssessmentExplorer locale=\{locale\}/);
  assert.doesNotMatch(page, /id="finding"|id="scope"|id="requirements"/);
  assert.match(page, /DawabitVisual locale=\{locale\} id="overview" priority/);
});

test("unverified former-regulator claims do not appear in buyer-facing metadata", () => {
  const seo = read("src/content/seo.ts");
  assert.doesNotMatch(seo, /former regulators|former regulatory officials|مسؤولون رقابيون سابقون/i);
  assert.match(seo, /الجهات الخاضعة للتنظيم/);
});

test("draft blocks remain active until official authorisations and legal text", () => {
  const robots = read("src/app/robots.ts");
  const headers = read("public/_headers");
  assert.match(robots, /disallow:\s*"\/"/);
  assert.match(headers, /X-Robots-Tag:\s*noindex, nofollow/);
  assert.match(read("src/lib/routes.ts"), /index: false, follow: false/);
  assert.match(config, /formsEnabled: false/);
  assert.match(config, /authLoginEnabled: false/);
  assert.match(config, /sampleReportEnabled: false/);
});

test("all mobile primary menus expose the same Dawabit, services and market subpages as desktop", () => {
  assert.match(header, /i < 3 \? \(/);
  assert.match(header, /subnav\(i\)\.map/);
  for (const path of ["dawabit/how-it-works", "dawabit/coverage", "dawabit/faq", "dawabit/demo"]) {
    assert.ok(header.includes(path), path);
  }
});

test("original public asset installation keeps private materials out of the site", () => {
  const installer = read("scripts/install-dawabit-v5-public-assets.mjs");
  assert.match(installer, /createHash\("sha256"\)/);
  assert.match(installer, /public\/brand\//);
  assert.match(installer, /Dawabit_Screen_1_Overview_v5/);
  assert.match(installer, /Dawabit_Screen_1_Overview_v5_AR/);
  assert.match(installer, /Dawabit_Screen_\[234\]/);
  assert.match(installer, /approvedVisualsInstalled = true/);
  assert.doesNotMatch(page, /client1\.treehouseconsultancy\.co\.uk/);
});

test("unapproved former-supervisor claims are not published while v5 E6 awaits sign-off", () => {
  const site = read("src/content/site.ts");
  const seo = read("src/content/seo.ts");
  for (const source of [site, seo]) {
    assert.doesNotMatch(source, /our work is led by people who have supervised|former regulators|former regulatory officials|سبق لهم الإشراف على مؤسسات مرخصة/i);
  }
  assert.match(site, /The regulatory perspective\./);
});
