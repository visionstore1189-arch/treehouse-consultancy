import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Source-level guardrails complement browser/visual QA in the CI workflow.
// The site must remain useful without JavaScript-powered decorative motion.
const hero = readFileSync("src/components/hero-art.tsx", "utf8");
const styles = readFileSync("src/app/globals.css", "utf8");
const pages = readFileSync("src/components/pages.tsx", "utf8");

test("existing 3D scene remains progressive and supports static reduced-motion fallback", () => {
  assert.match(hero, /const Scene = lazy/);
  assert.match(hero, /ready && !reduced/);
  assert.match(hero, /<Fallback \/>/);
  assert.match(hero, /prefers-reduced-motion: reduce/);
  assert.match(hero, /paused \|\| !visible \|\| !pageVisible/);
});

test("optional spatial depth is mouse-only, bounded and frame-throttled", () => {
  assert.match(hero, /event\.pointerType !== "mouse"/);
  assert.match(hero, /if \(reduced \|\| paused/);
  assert.match(hero, /requestAnimationFrame/);
  assert.match(hero, /cancelAnimationFrame/);
  assert.match(hero, /Math\.max\(0, Math\.min\(1,/);
  assert.match(hero, /onPointerLeave=\{resetDepth\}/);
  assert.doesNotMatch(hero, /fetch\(|localStorage|sessionStorage|sendBeacon/);
});

test("premium CSS provides keyboard equivalence and disables ornamental motion when requested", () => {
  assert.match(styles, /TREEHOUSE \/ DEPTH & INTERACTION POLISH/);
  assert.match(styles, /@media \(hover: hover\) and \(pointer: fine\) and \(prefers-reduced-motion: no-preference\)/);
  assert.match(styles, /\.market-grid \.market-card:focus-visible/);
  assert.match(styles, /\.service-row:focus-visible/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /\.market-grid \.market-card:focus-visible \{[\s\S]*?transform: none !important/);
});

test("Arabic and English product journeys still use approved copy and no private demo embed", () => {
  assert.match(pages, /DawabitProcessExplorer locale=\{locale\}/);
  assert.match(pages, /<HeroArt locale=\{locale\} \/>/);
  assert.doesNotMatch(hero, /dawabit-demo\.vision-store1189|<iframe|sample.report/i);
});
