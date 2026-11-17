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
  for (const url of ["https://treehouseconsulting.co.uk/contact/", "https://review.pages.dev/contact/", "https://treehouseconsultancy.co.uk/api/enquiry"]) {
    assert.equal(publicRedirect(new Request(url)), undefined);
  }
  assert.equal(publicRedirect(new Request("https://treehouseconsultancy.co.uk/contact/", {method:"POST",body:"sensitive"})), undefined);
});

test("v6 retires all account paths on both domains and discards credential-bearing queries", () => {
  for (const host of ["treehouseconsulting.co.uk", "treehouseconsultancy.co.uk"]) {
    for (const path of ["/portal", "/portal/", "/portal/old", "/client/login/", "/client/reset-password/", "/ar/portal", "/ar/portal/old", "/ar/client/recover-password/"]) {
      const r=publicRedirect(new Request(`https://${host}${path}?token_hash=discard-me`));
      assert.equal(r?.status,301);
      assert.equal(r?.headers.get("Location"), "https://portal.treehouseconsulting.co.uk/"+(path.startsWith("/ar/")?"?lang=ar":""));
      assert.match(r?.headers.get("Set-Cookie")||"", /Max-Age=0/);
    }
  }
});
test("retired APIs never return files or forward old credentials", async () => {
  for (const method of ["GET","POST"]) for (const path of ["/api/auth/login","/api/auth/demo","/api/auth/resource/tour","/api/auth/me"]) {
    const r=publicRedirect(new Request("https://treehouseconsulting.co.uk"+path,{method}));
    assert.equal(r?.status,410);
    assert.equal(r?.headers.get("Location"),null);
    assert.deepEqual(await r?.json(),{error:"endpoint_retired"});
  }
});
