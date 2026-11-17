import test, { before } from "node:test";
import assert from "node:assert/strict";

let worker: any;
before(async () => { worker = await import(new URL("../deploy/dawabit-co-redirect/worker.mjs", import.meta.url).href); });

test("Dawabit brand domain resolves only to the approved Treehouse public product", () => {
  assert.equal(worker.redirectDestination("https://dawabit.co/"), "https://treehouseconsulting.co.uk/dawabit/");
  assert.equal(worker.redirectDestination("https://www.dawabit.co/"), "https://treehouseconsulting.co.uk/dawabit/");
  assert.equal(worker.redirectDestination("https://dawabit.co/ar/"), "https://treehouseconsulting.co.uk/ar/dawabit/");
  assert.equal(worker.redirectDestination("https://dawabit.co/how-it-works/"), "https://treehouseconsulting.co.uk/dawabit/how-it-works/");
  assert.equal(worker.redirectDestination("https://dawabit.co/ar/coverage/?utm_source=abc"), "https://treehouseconsulting.co.uk/ar/dawabit/coverage/?utm_source=abc");
  assert.equal(worker.redirectDestination("https://dawabit.co/faq/"), "https://treehouseconsulting.co.uk/dawabit/faq/");
});

test("public demo routes open only the request form, not the restricted interactive demo", () => {
  assert.equal(worker.redirectDestination("https://dawabit.co/demo/"), "https://treehouseconsulting.co.uk/dawabit/demo/");
  assert.equal(worker.redirectDestination("https://www.dawabit.co/ar/demo/"), "https://treehouseconsulting.co.uk/ar/dawabit/demo/");
});

test("brand-domain Worker rejects arbitrary hosts to avoid open redirects or unprotected origins", async () => {
  for (const host of ["dawabit.co.evil.example", "demo.dawabit.co", "treehouseconsulting.co.uk", "dawabit-co-redirect.workers.dev"]) {
    assert.equal(worker.redirectDestination("https://" + host + "/"), null);
  }
  const invalid = await worker.default.fetch(new Request("https://not-dawabit.example/"));
  assert.equal(invalid.status, 404);
});

test("unknown deep links do not expose a customer portal or an unsafe upstream URL", () => {
  assert.equal(worker.redirectDestination("https://dawabit.co/private/client/"), "https://treehouseconsulting.co.uk/dawabit/");
  assert.equal(worker.redirectDestination("https://dawabit.co/ar/private/"), "https://treehouseconsulting.co.uk/ar/dawabit/");
});

test("Worker issues a 301 for canonical public pages and denies non-read methods", async () => {
  const response = await worker.default.fetch(new Request("https://www.dawabit.co/coverage/?utm_campaign=launch"));
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "https://treehouseconsulting.co.uk/dawabit/coverage/?utm_campaign=launch");
  assert.match(response.headers.get("x-robots-tag") || "", /noindex/);
  const rejected = await worker.default.fetch(new Request("https://dawabit.co/", {method:"POST"}));
  assert.equal(rejected.status, 405);
});
