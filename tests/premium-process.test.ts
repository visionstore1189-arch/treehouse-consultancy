import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const explorer = readFileSync("src/components/dawabit-process-explorer.tsx", "utf8");
const page = readFileSync("src/components/pages.tsx", "utf8");
const styles = readFileSync("src/app/globals.css", "utf8");

test("product page includes an interactive and explicitly illustrative five-step method", () => {
  assert.match(page, /DawabitProcessExplorer locale=\{locale\}/);
  assert.match(explorer, /steps\.map\(/);
  assert.match(explorer, /current\.text\[locale\]/);
  assert.match(explorer, /current\.output\[locale\]/);
  assert.match(explorer, /Illustrative workflow, not a live client assessment/);
  assert.match(explorer, /رسم توضيحي للمنهج/);
  assert.doesNotMatch(explorer, /workers\.dev|<iframe|<object|token|secret/i);
});

test("interactive process controls are keyboard accessible and report their state", () => {
  assert.match(explorer, /type="button"/);
  assert.match(explorer, /aria-pressed=\{active === index\}/);
  assert.match(explorer, /aria-controls="premium-process-detail"/);
  assert.match(explorer, /aria-live="polite"/);
  assert.match(explorer, /disabled=\{active === 0\}/);
  assert.match(explorer, /disabled=\{active === steps\.length - 1\}/);
});

test("premium interaction is responsive and respects motion preferences", () => {
  assert.match(styles, /\.premium-process-shell/);
  assert.match(styles, /\.premium-process-navigation/);
  assert.match(styles, /@media \(max-width: 850px\)/);
  assert.match(styles, /@media \(max-width: 550px\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

