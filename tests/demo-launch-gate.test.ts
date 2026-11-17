import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { config, protectedDemoHref } from "../src/lib/config";

const configSource = readFileSync("src/lib/config.ts", "utf8");
const publicPage = readFileSync("src/components/pages.tsx", "utf8");
const css = readFileSync("src/app/globals.css", "utf8");

test("unapproved demonstration link fails closed in the public website", () => {
  // The release workflow intentionally does not set this variable. A
  // surprise enabled flag is a test failure, not an invitation to publish.
  assert.equal(config.demoAccessApproved, false);
  assert.equal(protectedDemoHref, "");
  assert.equal(config.protectedDemoUrl, "");
});

test("only an explicit build-time approved protected hostname can appear", () => {
  assert.match(configSource, /NEXT_PUBLIC_DAWABIT_DEMO_ACCESS_APPROVED === "true"/);
  assert.match(configSource, /NEXT_PUBLIC_DAWABIT_PROTECTED_DEMO_URL/);
  assert.match(configSource, /u\.protocol !== "https:"/);
  assert.match(configSource, /demo\.treehouseconsulting\.co\.uk/);
  assert.match(configSource, /u\.username \|\| u\.password/);
});

test("demo button is under request page only, gated and opens separate tab", () => {
  assert.match(publicPage, /path==="dawabit\/demo" && \(/);
  assert.match(publicPage, /protectedDemoHref \? \(/);
  assert.match(publicPage, /href=\{protectedDemoHref\}/);
  assert.match(publicPage, /target="_blank" rel="noopener noreferrer"/);
  assert.match(publicPage, /PROTECTED ACCESS PENDING/);
  assert.match(publicPage, /فتح العرض التوضيحي/);
  assert.doesNotMatch(publicPage, /dawabit-demo\.vision-store1189\.workers\.dev/);
  assert.match(css, /\.dawabit-demo-launch:focus-visible/);
});
