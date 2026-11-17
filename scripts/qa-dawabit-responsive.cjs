/* Dawabit v5: bilingual responsive audit for the local static export.
 * This is intentionally localhost-only. No customer site, demo or login is probed.
 * Set PLAYWRIGHT_PACKAGE to an installed Playwright module path.
 */
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || "playwright");
const fs = require("node:fs");
const path = require("node:path");

const base = process.env.DAWABIT_QA_BASE_URL || "http://127.0.0.1:8877";
if (!/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(base)) {
  throw new Error("The responsive audit can only target a local preview: " + base);
}

const routes = [
  "", "dawabit", "dawabit/how-it-works", "dawabit/coverage",
  "dawabit/demo", "dawabit/faq", "services", "sectors", "markets",
  "uk", "uae", "saudi-arabia", "about", "contact"
];
const widths = [360, 390, 768, 1024];
const screenshotsDir = path.resolve("qa-screenshots");
fs.mkdirSync(screenshotsDir, { recursive: true });
const failures = [];
let checked = 0;

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    for (const locale of ["en", "ar"]) {
      for (const width of widths) {
        const page = await browser.newPage({
          viewport: { width, height: 850 },
          deviceScaleFactor: 1,
          reducedMotion: "reduce",
        });
        const pageErrors = [];
        page.on("pageerror", error => pageErrors.push(error.message));
        for (const route of routes) {
          pageErrors.length = 0;
          const pathname = (locale === "ar" ? "/ar/" : "/") + (route ? route + "/" : "");
          const url = base + pathname;
          try {
            const response = await page.goto(url, {
              waitUntil: "domcontentloaded",
              timeout: 30000,
            });
            await page.evaluate(async () => {
              await document.fonts.ready;
              const images = [...document.images];
              for (const image of images) image.loading = "eager";
              await Promise.all(images.map(image => image.decode().catch(() => undefined)));
            });
            const result = await page.evaluate(() => {
              const visible = document.body.innerText || "";
              const images = [...document.images];
              return {
                headingCount: document.querySelectorAll("h1").length,
                lang: document.documentElement.lang,
                direction: document.documentElement.dir,
                documentWidth: document.documentElement.scrollWidth,
                viewport: window.innerWidth,
                canonical: document.querySelector('link[rel="canonical"]')?.href || "",
                robots: document.querySelector('meta[name="robots"]')?.content || "",
                legacyName: /TIBQA|Tibqa|Mutabiq|MUTABIQ|R CAT|طبقًا|طبًقا|مطابق/.test(visible),
                oldCanonical: document.querySelector('link[rel="canonical"]')?.href.includes("treehouseconsultancy.co.uk") || false,
                unprotectedDemoUrl: /dawabit-demo\.vision-store1189\.workers\.dev/i.test(document.documentElement.outerHTML),
                missingImageAlt: images.filter(image => !image.hasAttribute("alt")).map(image => image.src),
                brokenImages: images.filter(image => image.complete && image.naturalWidth === 0).map(image => image.src),
              };
            });
            const reasons = [];
            if (response?.status() !== 200) reasons.push("HTTP " + response?.status());
            if (result.headingCount !== 1) reasons.push("Expected exactly one H1");
            if (result.lang !== locale) reasons.push("Wrong HTML lang");
            if (result.direction !== (locale === "ar" ? "rtl" : "ltr")) reasons.push("Wrong HTML direction");
            if (result.documentWidth > result.viewport + 3) reasons.push("Horizontal overflow");
            if (!result.canonical.startsWith("https://treehouseconsulting.co.uk/")) reasons.push("Wrong canonical");
            if (!/noindex/i.test(result.robots)) reasons.push("Draft must remain noindex");
            if (result.legacyName) reasons.push("Retired product name visible");
            if (result.oldCanonical) reasons.push("Old canonical domain");
            if (result.unprotectedDemoUrl) reasons.push("Unprotected demonstration URL exposed");
            if (result.missingImageAlt.length) reasons.push("Images missing alt attribute");
            if (result.brokenImages.length) reasons.push("Broken images");
            if (pageErrors.length) reasons.push("JavaScript page error");

            if (width === 390 && ["", "dawabit", "contact"].includes(route)) {
              const filename = (locale === "ar" ? "arabic" : "english") + "-" +
                (route || "home").replaceAll("/", "-") + "-390.png";
              await page.screenshot({
                path: path.join(screenshotsDir, filename),
                fullPage: true,
                animations: "disabled",
                timeout: 30000,
              });
            }
            if (width === 390 && !route) {
              const menuButton = page.locator(".menu-trigger");
              if (!(await menuButton.isVisible())) {
                reasons.push("Mobile menu trigger absent");
              } else {
                await menuButton.click();
                if (!(await page.locator("dialog.mobile-menu").evaluate(el => el.open))) {
                  reasons.push("Mobile menu did not open");
                }
                const closeButton = page.locator("dialog.mobile-menu .icon-button");
                await closeButton.click();
                if (await page.locator("dialog.mobile-menu").evaluate(el => el.open)) {
                  reasons.push("Mobile menu did not close");
                }
              }
            }
            const item = { locale, width, route: pathname, reasons, ...result, pageErrors };
            console.log(JSON.stringify({ locale, width, route: pathname, pass: reasons.length === 0, reasons }));
            if (reasons.length) failures.push(item);
          } catch (error) {
            failures.push({ locale, width, route: pathname, error: String(error) });
            console.error("FAIL", locale, width, pathname, String(error));
          }
          checked++;
        }
        await page.close();
      }
    }
  } finally {
    await browser.close();
    const report = {
      auditedAt: new Date().toISOString(),
      base,
      checked,
      expected: routes.length * widths.length * 2,
      locales: ["en", "ar"],
      widths,
      failureCount: failures.length,
      failures,
      note: "Static export browser audit; Cloudflare Access and DNS require independent verification.",
    };
    fs.writeFileSync(path.join(screenshotsDir, "qa-report.json"), JSON.stringify(report, null, 2));
    console.log("DAWABIT_V5_RESPONSIVE_AUDIT", JSON.stringify({
      checked, failureCount: failures.length, screenshotsDir,
    }));
    if (failures.length || checked !== report.expected) process.exitCode = 1;
  }
}
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
