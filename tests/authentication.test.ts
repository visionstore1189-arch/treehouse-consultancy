import test from "node:test";
import assert from "node:assert/strict";
import { authEnabled, sameOrigin, readBody } from "../functions/api/auth/_shared";
import { onRequestPost as signIn } from "../functions/api/auth/login";
import { onRequestGet as getMe } from "../functions/api/auth/me";
import type { AuthEnv } from "../functions/api/auth/_shared";

const env: AuthEnv = {
  SUPABASE_URL: "https://treehouse-test.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test_for_unit_tests",
};
function request(path: string, payload?: unknown, origin = "https://treehouse.test") {
  return new Request("https://treehouse.test" + path, {
    method: payload === undefined ? "GET" : "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });
}
test("login endpoint is disabled unless a valid backend is configured", async () => {
  assert.equal(authEnabled({}), false);
  assert.equal(authEnabled({ SUPABASE_URL: "http://localhost", SUPABASE_PUBLISHABLE_KEY: "key" }), false);
  assert.equal(authEnabled(env), true);
  const res = await signIn({ env: {}, request: request("/api/auth/login", { email: "a@b.com", password: "x" }) } as never);
  assert.equal(res.status, 503);
});
test("reject cross-site requests and malformed JSON", async () => {
  assert.equal(sameOrigin(request("/api/auth/login", {}, "https://evil.test")), false);
  assert.equal(await readBody(request("/api/auth/login", [])), null);
  const res = await signIn({ env, request: request("/api/auth/login", {email: "test@example.com", password: "password"}, "https://evil.test") } as never);
  assert.equal(res.status, 403);
});
test("password sign-in verifies Supabase user before setting HttpOnly cookies", async (t) => {
  t.mock.method(globalThis, "fetch", async (url: string, init?: RequestInit) => {
    if (String(url).includes("grant_type=password")) {
      assert.match(String(init?.body), /password/);
      return Response.json({access_token:"access.test", refresh_token:"refresh.test", expires_in:3600});
    }
    if (String(url).endsWith("/auth/v1/user")) return Response.json({ id:"11111111-1111-4111-8111-111111111111", email:"test@example.com" });
    throw new Error("Unexpected URL: " + url);
  });
  const res = await signIn({ env, request: request("/api/auth/login", {email:"test@example.com",password:"long-password"}) } as never);
  assert.equal(res.status, 200);
  assert.match(res.headers.get("set-cookie") || "", /HttpOnly/);
  assert.match(res.headers.get("set-cookie") || "", /Secure/);
  assert.match(res.headers.get("set-cookie") || "", /SameSite=Lax/);
  assert.match(res.headers.get("cache-control") || "", /no-store/);
});
test("portal state requires backend-authenticated identity and ignores fake cookies", async () => {
  const res = await getMe({ env, request: new Request("https://treehouse.test/api/auth/me", {headers: {Cookie: "__Host-th_access=garbage"}}) } as never);
  assert.equal(res.status, 401);
  const body = await res.json() as {authenticated: boolean};
  assert.equal(body.authenticated, false);
});
