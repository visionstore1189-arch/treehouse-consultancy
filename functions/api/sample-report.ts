import { sampleReportSchema } from "../../src/lib/sample-report-schema";
import { formCopy } from "../../src/content/forms";
import { configured, type Env as EnquiryEnv } from "./enquiry";

interface Env extends EnquiryEnv {
  SAMPLE_REPORT_ENABLED?: string;
  REPORT_FILES?: R2Bucket;
  REPORT_LINK_SECRET?: string;
  REPORT_FILE_KEY?: string;
}
const fileKey = (env: Env) => env.REPORT_FILE_KEY || "private/Dawabit_Sample_Assessment_Report_v3.pdf";
const pdfName = "Dawabit_Sample_Assessment_Report_v3.pdf";
const err = (error: string, status = 400) => Response.json({ error }, {
  status,
  headers: {
    "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive",
    "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer",
    "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
  },
});
const enabled = (env: Env) =>
  configured(env) && env.SAMPLE_REPORT_ENABLED === "true" &&
  !!env.REPORT_FILES && !!env.REPORT_LINK_SECRET &&
  env.REPORT_LINK_SECRET.length >= 32;

const key = async (secret: string) => crypto.subtle.importKey(
  "raw", new TextEncoder().encode(secret),
  { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"],
);
const hex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer)).map((x) => x.toString(16).padStart(2, "0")).join("");
const sign = async (id: string, expiry: number, secret: string) =>
  hex(await crypto.subtle.sign("HMAC", await key(secret), new TextEncoder().encode(`${id}.${expiry}`)));
const verify = async (id: string, expiry: number, signature: string, secret: string) => {
  const bytes = Uint8Array.from(signature.match(/.{2}/g) || [], (part) => parseInt(part, 16));
  return crypto.subtle.verify(
    "HMAC", await key(secret), bytes, new TextEncoder().encode(`${id}.${expiry}`),
  );
};
async function limitedJson(request: Request): Promise<unknown> {
  if (!request.body) throw new Error("missing_body");
  const reader = request.body.getReader();
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 12000) { await reader.cancel(); throw new Error("too_large"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
async function hashIP(ip: string, secret: string) {
  const buffer = await crypto.subtle.digest(
    "SHA-256", new TextEncoder().encode(`${secret}:${ip}`),
  );
  return hex(buffer);
}

export const onRequest: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (!enabled(env)) return err("report_not_available", 503);
  const db = env.ENQUIRIES!;
  if (request.method === "GET") {
    const token = new URL(request.url).searchParams.get("token") || "";
    const match = /^([a-f0-9-]{36})\.(\d{10,13})\.([a-f0-9]{64})$/.exec(token);
    if (!match) return err("invalid_link", 403);
    const [, id, expiryText, signature] = match;
    const expiry = Number(expiryText);
    if (!Number.isSafeInteger(expiry) || expiry <= Date.now()) return err("link_expired", 410);
    if (!(await verify(id, expiry, signature, env.REPORT_LINK_SECRET!)))
      return err("invalid_link", 403);
    const record = await db
      .prepare("SELECT expires_at FROM sample_report_requests WHERE id = ?")
      .bind(id).first<{ expires_at: number }>();
    if (!record || record.expires_at !== expiry) return err("invalid_link", 403);
    const object = await env.REPORT_FILES!.get(fileKey(env));
    if (!object?.body) return err("report_temporarily_unavailable", 503);
    return new Response(object.body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfName}"`,
        "Content-Length": String(object.size),
        "Cache-Control": "private, no-store, max-age=0",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "no-referrer",
        "Content-Security-Policy": "default-src 'none'; sandbox",
      },
    });
  }
  if (request.method !== "POST") return err("method_not_allowed", 405);
  if (!(env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).includes(request.headers.get("Origin") || ""))
    return err("invalid_origin", 403);
  if (!(request.headers.get("Content-Type") || "").toLowerCase().startsWith("application/json"))
    return err("invalid_content_type", 415);
  let body: unknown;
  try { body = await limitedJson(request); } catch { return err("invalid_body"); }
  const parsed = sampleReportSchema.safeParse(body);
  if (!parsed.success) return err("validation_failed");
  const data = parsed.data;
  if (data.consentVersion !== env.PRIVACY_VERSION) return err("privacy_version_changed", 409);
  const now = Date.now();
  const timestamp = new Date(now).toISOString();
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const hash = await hashIP(ip, env.RATE_LIMIT_SALT!);
  const bucket = Math.floor(now / 600000);
  try {
    const quota = await db.prepare(
      "INSERT INTO rate_limits (key, count, expires_at) VALUES (?, 1, ?) " +
      "ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count",
    ).bind(`report:${hash}:${bucket}`, now + 1200000).first<{count:number}>();
    if (!quota || quota.count > 5) return err("rate_limited", 429);
    const challenge = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY, response: data.token, remoteip: ip,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!challenge.ok) return err("security_check_unavailable", 503);
    const check = await challenge.json() as {success:boolean; hostname?:string; action?:string};
    const hostnames = (env.TURNSTILE_HOSTNAMES || "").split(",").map((s)=>s.trim());
    if (!check.success || !hostnames.includes(check.hostname || "") || check.action !== "sample-report")
      return err("security_check_failed", 403);
    // Verify that the PDF is private and actually present before accepting leads.
    const hasFile = await env.REPORT_FILES!.head(fileKey(env));
    if (!hasFile) return err("report_temporarily_unavailable", 503);
    const id = crypto.randomUUID();
    const expiresAt = now + 15 * 60_000;
    const signature = await sign(id, expiresAt, env.REPORT_LINK_SECRET!);
    const token = `${id}.${expiresAt}.${signature}`;
    const url = `/api/sample-report?token=${token}`;
    await db.prepare(
      "INSERT INTO sample_report_requests " +
      "(id, locale, name, organisation, email, country, consent_at, consent_version, " +
      "consent_text, email_status, expires_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      id, data.locale, data.name, data.organisation, data.email, data.country,
      timestamp, data.consentVersion, formCopy.consent[data.locale], "pending",
      expiresAt, timestamp,
    ).run();
    let emailNotified = false;
    try {
      const link = new URL(url, request.url).toString();
      const notify = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `sample-report-${id}`,
        },
        body: JSON.stringify({
          from: env.MAIL_FROM, to: data.email,
          bcc: env.MAIL_TO!.split(",").map((s) => s.trim()),
          subject: "Your Dawabit sample assessment report",
          text: `Hello ${data.name},\n\nThank you for your interest in Dawabit by Treehouse.\n\nDownload your illustrative sample assessment report using this link (valid for 15 minutes):\n${link}\n\nIf you did not request this report, you can ignore this email.\n\nTreehouse Consulting`,
        }),
        signal: AbortSignal.timeout(8000),
      });
      emailNotified = notify.ok;
      await db.prepare("UPDATE sample_report_requests SET email_status = ? WHERE id = ?")
        .bind(emailNotified ? "sent" : "failed", id).run();
    } catch {
      try { await db.prepare("UPDATE sample_report_requests SET email_status='failed' WHERE id=?").bind(id).run(); }
      catch { /* pending status is retained for operator reconciliation */ }
    }
    // Opportunistic cleanup; configure a scheduled job for strict retention requirements.
    const cutoff = new Date(now - Number(env.RETENTION_DAYS) * 86400000).toISOString();
    waitUntil(Promise.all([
      db.prepare("DELETE FROM sample_report_requests WHERE created_at < ?").bind(cutoff).run(),
      db.prepare("DELETE FROM rate_limits WHERE expires_at < ?").bind(now).run(),
    ]).then(() => {}).catch(() => {}));
    return Response.json({ accepted: true, emailNotified, downloadUrl: url, reference: id }, {
      status: emailNotified ? 201 : 202,
      headers: {
        "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow",
        "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer",
      },
    });
  } catch {
    return err("temporarily_unavailable", 503);
  }
};
