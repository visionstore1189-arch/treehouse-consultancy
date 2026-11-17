import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { securityPublication, securityPublicationReady } from "../src/content/security-publication";
import { pages } from "../src/content/site";
import { routePaths } from "../src/lib/routes";
import { enquirySchema } from "../src/lib/form-schema";

const read = (f: string) => readFileSync(f, "utf8");

test("N1 security: full page is prepared but absent from build/menu/sitemap without confirmed E4", () => {
  assert.equal(securityPublicationReady, false);
  assert.equal(securityPublication.ready, false);
  assert.equal(securityPublication.items.length, 6);
  assert.equal(pages["dawabit/security"], undefined);
  assert.equal(routePaths.includes("dawabit/security"), false);
  assert.match(read("src/components/header.tsx"), /securityPublication\.ready \?/);
  assert.match(read("src/components/footer.tsx"), /securityPublication\.ready/);
  assert.match(read("src/components/pages.tsx"), /if \(!securityPublication\.ready\) return null/);
  assert.match(read("src/components/pages.tsx"), /case "dawabit\/security":/);
});

test("N1 page does not invent hosting or retention particulars or leak bracketed facts", () => {
  const source = read("src/content/security-publication.ts");
  assert.match(source, /NEXT_PUBLIC_DAWABIT_E4_SECURITY_APPROVED === "true"/);
  assert.match(source, /NEXT_PUBLIC_DAWABIT_HOSTING_LOCATION_EN/);
  assert.match(source, /NEXT_PUBLIC_DAWABIT_HOSTING_LOCATION_AR/);
  assert.match(source, /NEXT_PUBLIC_DAWABIT_RETENTION_EN/);
  assert.match(source, /NEXT_PUBLIC_DAWABIT_RETENTION_AR/);
  assert.match(source, /NEXT_PUBLIC_DAWABIT_SAUDI_HOSTING_CONFIRMED === "true"/);
  assert.match(source, /NEXT_PUBLIC_DAWABIT_DOCUMENTS_NOT_USED_FOR_TRAINING === "true"/);
  assert.deepEqual(
    securityPublication.items.map(x => x.title.en),
    [
      "Where your data is held",
      "Who can see it",
      "Use in artificial intelligence",
      "Encryption",
      "Retention and deletion",
      "Confidentiality",
    ],
  );
  for (const item of securityPublication.items) {
    assert.ok(item.title.en && item.title.ar && item.text.en && item.text.ar);
    assert.equal(item.text.en.includes("[hosting provider"), false);
  }
});

test("G4 forms: exact six public request fields, with no extra required role or regulator", () => {
  const formSource = read("src/components/enquiry-form.tsx");
  assert.match(formSource, /kind !== "demo" && field\("role"\)/);
  assert.doesNotMatch(formSource, /c\.offline\[/);
  assert.doesNotMatch(read("src/content/forms.ts"), /Online enquiries open shortly/i);
  assert.match(formSource, /kind === "coverage" && field\("regulator"\)/);
  assert.doesNotMatch(formSource, /kind === "demo" && field\("phone"/);
  assert.match(formSource, /name="sector"/);
  assert.match(formSource, /name="country"/);
  assert.match(formSource, /required\s*\/>/);
  const validDemo = {
    kind: "demo",
    locale: "en",
    name: "Test Person",
    organisation: "Example Company",
    email: "person@example.com",
    sector: "Financial and insurance activities",
    country: "United Kingdom",
    message: "Please show the full regulatory evidence workflow.",
    consent: true,
    consentVersion: "approved-example-v1",
    website: "",
    token: "test-token",
  };
  assert.equal(enquirySchema.safeParse(validDemo).success, true);
  assert.equal(enquirySchema.safeParse({...validDemo, message:""}).success, false);
  assert.equal(enquirySchema.safeParse({...validDemo, sector:""}).success, false);
  assert.equal(enquirySchema.safeParse({...validDemo, email:"bad-address"}).success, false);
});

test("A6/N7 footer prints client's approved bilingual 2026 trademark once", () => {
  const footer = read("src/components/footer.tsx");
  assert.match(footer, /Dawabit is a trade mark of Treehouse Consulting\. © 2026 Treehouse Consulting\. All rights reserved\./);
  assert.doesNotMatch(footer, /new Date\(\)\.getFullYear\(\)/);
  assert.match(footer, /«ضوابط» علامة تجارية/);
});

test("R/F/G secrets: obsolete example domain names removed; private screens stay excluded", () => {
  const env = read(".env.example");
  assert.doesNotMatch(env, /mutabiq|tibqa|treehouseconsultancy\.com/i);
  assert.match(env, /NEXT_PUBLIC_DAWABIT_E4_SECURITY_APPROVED=false/);
  assert.match(env, /NEXT_PUBLIC_DAWABIT_DEMO_ACCESS_APPROVED=false/);
  const available = readdirSync("public/brand/dawabit-screens");
  assert.deepEqual(available.sort(), [
    "Dawabit_Screen_1_Overview_v5.jpg",
    "Dawabit_Screen_1_Overview_v5_AR.jpg",
  ].sort());
  assert.doesNotMatch(read("src/lib/config.ts"), /dawabit-demo\.vision-store1189\.workers\.dev/);
});
