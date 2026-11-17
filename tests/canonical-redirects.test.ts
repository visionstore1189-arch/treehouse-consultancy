import test from "node:test";
import assert from "node:assert/strict";
import { publicRedirect } from "../functions/_middleware";

test("canonical aliases preserve deep paths and queries in one HTTPS redirect", () => {
  for (const host of ["treehouseconsultancy.co.uk", "www.treehouseconsultancy.co.uk", "www.treehouseconsulting.co.uk"]) {
    const result = publicRedirect(new Request(`https://${host}/ar/contact/?source=a%20b`));
    assert.equal(result?.status, 301);
    assert.equal(result?.headers.get("Location"), "https://treehouseconsulting.co.uk/ar/contact/?source=a%20b");
  }
});
test("retired links still redirect after all public routes pass through middleware", () => {
  const result = publicRedirect(new Request("https://www.treehouseconsultancy.co.uk/ar/mutabiq/tour/?q=1"));
  assert.equal(result?.headers.get("Location"), "https://treehouseconsulting.co.uk/ar/dawabit/tour/?q=1");
  assert.equal(publicRedirect(new Request("https://treehouseconsulting.co.uk/insights/"))?.status, 302);
});
test("canonical origin, unknown hosts, API requests and submissions are never cross-origin redirected", () => {
  for (const url of ["https://treehouseconsulting.co.uk/contact/", "https://review.pages.dev/contact/", "https://treehouseconsultancy.co.uk/api/auth/me"]) {
    assert.equal(publicRedirect(new Request(url)), undefined);
  }
  assert.equal(publicRedirect(new Request("https://treehouseconsultancy.co.uk/contact/", {method:"POST",body:"sensitive"})), undefined);
});
