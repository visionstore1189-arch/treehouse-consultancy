import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { onRequest, configured, type Env } from "../functions/api/enquiry";
import { canAccess } from "../src/lib/dawabit";
import { enquirySchema } from "../src/lib/form-schema";
const valid = {
  kind: "contact",
  locale: "en",
  name: "Test Person",
  organisation: "Example Ltd",
  role: "Compliance",
  email: "test@example.com",
  country: "United Kingdom",
  subject: "Advisory services",
  message: "Test enquiry only",
  consent: true,
  consentVersion: "reviewed-v1",
  website: "",
  token: "test-token",
};
function database() {
  const sql = new DatabaseSync(":memory:");
  sql.exec(
    readFileSync(
      new URL("../migrations/0001_enquiries.sql", import.meta.url),
      "utf8",
    ),
  );
  const prepare = (query: string) => {
    let values: unknown[] = [];
    const statement = {
      bind: (...v: unknown[]) => {
        values = v;
        return statement;
      },
      first: async () => sql.prepare(query).get(...(values as never[])) || null,
      run: async () => sql.prepare(query).run(...(values as never[])),
    };
    return statement;
  };
  return {
    sql,
    db: {
      prepare,
      batch: async (statements: { run: () => Promise<unknown> }[]) =>
        Promise.all(statements.map((s) => s.run())),
    } as unknown as D1Database,
  };
}
function environment(db: D1Database): Env {
  return {
    ENQUIRIES: db,
    FORMS_ENABLED: "true",
    PRIVACY_APPROVED: "true",
    PRIVACY_VERSION: "reviewed-v1",
    ALLOWED_ORIGINS: "https://treehouse.test",
    TURNSTILE_SECRET_KEY: "server-secret",
    TURNSTILE_HOSTNAMES: "treehouse.test",
    RATE_LIMIT_SALT: "0".repeat(32),
    RESEND_API_KEY: "mail-secret",
    MAIL_FROM: "enquiries@treehouse.test",
    MAIL_TO: "team@treehouse.test",
    RETENTION_DAYS: "90",
  };
}
async function invoke(
  env: Env,
  body: unknown = valid,
  origin = "https://treehouse.test",
  method = "POST",
) {
  const pending: Promise<unknown>[] = [];
  const request = new Request("https://treehouse.test/api/enquiry", {
    method,
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      "CF-Connecting-IP": "192.0.2.1",
    },
    body: method === "POST" ? JSON.stringify(body) : undefined,
  });
  const result = await onRequest({
    request,
    env,
    waitUntil: (p: Promise<unknown>) => pending.push(p),
  } as never);
  await Promise.all(pending);
  return result;
}
function network(
  t: test.TestContext,
  options: {
    mail?: number;
    hostname?: string;
    action?: string;
    success?: boolean;
  } = {},
) {
  let mails = 0;
  t.mock.method(
    globalThis,
    "fetch",
    async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("siteverify"))
        return Response.json({
          success: options.success ?? true,
          hostname: options.hostname ?? "treehouse.test",
          action: options.action ?? "contact",
        });
      if (url.includes("resend.com")) {
        mails++;
        assert.match(String(init?.body), /Consent recorded/);
        assert.match(String(init?.body), /test@example.com/);
        return Response.json(
          { id: "mail-test" },
          { status: options.mail ?? 200 },
        );
      }
      throw new Error("Unexpected network request");
    },
  );
  return () => mails;
}
test("forms fail closed without every production dependency", async () => {
  const { db } = database();
  assert.equal(configured(environment(db)), true);
  for (const key of [
    "ENQUIRIES",
    "FORMS_ENABLED",
    "PRIVACY_APPROVED",
    "PRIVACY_VERSION",
    "ALLOWED_ORIGINS",
    "TURNSTILE_SECRET_KEY",
    "TURNSTILE_HOSTNAMES",
    "RATE_LIMIT_SALT",
    "RESEND_API_KEY",
    "MAIL_FROM",
    "MAIL_TO",
    "RETENTION_DAYS",
  ] as const) {
    const env = { ...environment(db), [key]: undefined };
    assert.equal((await invoke(env)).status, 503, key);
  }
});
test("rejects cross-origin, wrong method, invalid fields and stale consent", async () => {
  const { db } = database(),
    env = environment(db);
  assert.equal((await invoke(env, valid, "https://attacker.test")).status, 403);
  assert.equal((await invoke(env, valid, undefined, "GET")).status, 405);
  assert.equal((await invoke(env, { ...valid, consent: false })).status, 400);
  assert.equal(
    (await invoke(env, { ...valid, email: "not-an-email" })).status,
    400,
  );
  assert.equal((await invoke(env, { ...valid, website: "spam" })).status, 400);
  assert.equal(
    (await invoke(env, { ...valid, consentVersion: "old" })).status,
    409,
  );
});
test("valid submission stores timestamped consent and sends email only after persistence", async (t) => {
  const { db, sql } = database(),
    mails = network(t);
  const res = await invoke(environment(db));
  assert.equal(res.status, 201);
  assert.equal(mails(), 1);
  const data = (await res.json()) as {
    emailNotified: boolean;
    reference: string;
  };
  assert.equal(data.emailNotified, true);
  const row = sql
    .prepare("SELECT * FROM enquiries WHERE id=?")
    .get(data.reference)!;
  assert.equal(row.email_status, "sent");
  assert.equal(row.consent_version, "reviewed-v1");
  assert.ok(row.consent_at);
  assert.ok(!String(row.payload).includes("test-token"));
  assert.ok(!JSON.stringify(data).includes("secret"));
});
test("email failure is truthfully reported as saved and retained for reconciliation", async (t) => {
  network(t, { mail: 429 });
  const { db, sql } = database();
  const res = await invoke(environment(db));
  assert.equal(res.status, 202);
  assert.equal(
    ((await res.json()) as { emailNotified: boolean }).emailNotified,
    false,
  );
  assert.equal(
    sql.prepare("SELECT email_status FROM enquiries").get()!.email_status,
    "failed",
  );
});
test("hostname mismatch and action mismatch never store enquiries", async (t) => {
  network(t, { hostname: "attacker.test" });
  const { db, sql } = database();
  assert.equal((await invoke(environment(db))).status, 400);
  assert.equal(sql.prepare("SELECT count(*) AS n FROM enquiries").get()!.n, 0);
});
test("action mismatch is rejected", async (t) => {
  network(t, { action: "demo" });
  const { db } = database();
  assert.equal((await invoke(environment(db))).status, 400);
});
test("invalid challenge is rejected", async (t) => {
  network(t, { success: false });
  const { db } = database();
  assert.equal((await invoke(environment(db))).status, 400);
});
test("per-IP rate limit stops the sixth request", async (t) => {
  network(t);
  const { db } = database(),
    env = environment(db);
  for (let i = 0; i < 5; i++) assert.equal((await invoke(env)).status, 201);
  assert.equal((await invoke(env)).status, 429);
});
test("large request is rejected before parsing", async () => {
  const { db } = database();
  assert.equal(
    (await invoke(environment(db), { ...valid, message: "x".repeat(17000) }))
      .status,
    400,
  );
});
test("demo and regulator requests enforce their own required fields", () => {
  assert.equal(
    enquirySchema.safeParse({ ...valid, kind: "demo" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({
      ...valid,
      kind: "coverage",
      regulator: "FCA",
      sector: "Banking",
    }).success,
    true,
  );
  assert.equal(
    enquirySchema.safeParse({
      ...valid,
      kind: "demo",
      regulator: "FCA",
      sector: "Banking",
      message: "",
    }).success,
    true,
  );
});
test("access contract denies expired, cross-tenant, unpaid and missing-MFA sessions", () => {
  const session = {
    userId: "u",
    tenantId: "a",
    expiresAt: "2099-01-01",
    mfaVerified: true as const,
    roles: ["reader"],
  };
  const entitlement = {
    tenantId: "a",
    subscriptionId: "s",
    status: "active" as const,
    features: ["assessments"],
  };
  assert.equal(canAccess(session, entitlement, "assessments"), true);
  assert.equal(canAccess(null, entitlement, "assessments"), false);
  assert.equal(
    canAccess(
      { ...session, expiresAt: "2000-01-01" },
      entitlement,
      "assessments",
    ),
    false,
  );
  assert.equal(
    canAccess(session, { ...entitlement, tenantId: "b" }, "assessments"),
    false,
  );
  assert.equal(
    canAccess(session, { ...entitlement, status: "past_due" }, "assessments"),
    false,
  );
  assert.equal(
    canAccess(
      { ...session, mfaVerified: false } as never,
      entitlement,
      "assessments",
    ),
    false,
  );
  assert.equal(canAccess(session, entitlement, "documents"), false);
});

test("v5 G4 demonstration needs no extra role or regulator field", () => {
  const {role, ...demo} = valid;
  assert.equal(enquirySchema.safeParse({...demo,kind:"demo",sector:"Manufacturing"}).success,true);
  assert.equal(enquirySchema.safeParse({...demo,kind:"contact"}).success,false);
});
