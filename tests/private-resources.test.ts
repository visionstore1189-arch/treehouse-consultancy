import test from "node:test";
import assert from "node:assert/strict";
import { privateResources } from "../functions/api/auth/me";
const env = { CLIENT1_ACCESS_READY: "true", CLIENT1_ALLOWED_EMAIL: "approved@example.test", CLIENT1_GUIDE_URL: "https://private.example.test/" };
test("private guide links require deployment readiness, named identity and active membership", () => {
  assert.deepEqual(privateResources(env, "other@example.test", true), []);
  assert.deepEqual(privateResources(env, "approved@example.test", false), []);
  assert.deepEqual(privateResources({ ...env, CLIENT1_ACCESS_READY: "false" }, "approved@example.test", true), []);
  assert.deepEqual(privateResources(env, "APPROVED@example.test", true), [{ id: "client1-guide", url: "https://private.example.test/" }]);
});
test("private guide links reject invalid and credential-bearing destinations", () => {
  for (const url of ["http://private.example.test/", "https://user:pass@private.example.test/", "https://private.example.test/?token=secret", "invalid"]) {
    assert.deepEqual(privateResources({ ...env, CLIENT1_GUIDE_URL: url }, "approved@example.test", true), []);
  }
});
