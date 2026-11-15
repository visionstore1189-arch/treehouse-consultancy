import { enquirySchema } from "../../src/lib/form-schema";
import { formCopy } from "../../src/content/forms";
export interface Env {
  ENQUIRIES?: D1Database;
  FORMS_ENABLED?: string;
  PRIVACY_APPROVED?: string;
  PRIVACY_VERSION?: string;
  ALLOWED_ORIGINS?: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_HOSTNAMES?: string;
  RATE_LIMIT_SALT?: string;
  RESEND_API_KEY?: string;
  MAIL_FROM?: string;
  MAIL_TO?: string;
  RETENTION_DAYS?: string;
}
const response = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
      "Referrer-Policy": "no-referrer",
    },
  });
export function configured(env: Env): boolean {
  return (
    env.FORMS_ENABLED === "true" &&
    env.PRIVACY_APPROVED === "true" &&
    !!env.ENQUIRIES &&
    !!env.PRIVACY_VERSION &&
    !env.PRIVACY_VERSION.startsWith("pending") &&
    !!env.ALLOWED_ORIGINS &&
    !!env.TURNSTILE_SECRET_KEY &&
    !!env.TURNSTILE_HOSTNAMES &&
    !!env.RATE_LIMIT_SALT &&
    env.RATE_LIMIT_SALT.length >= 32 &&
    !!env.RESEND_API_KEY &&
    !!env.MAIL_FROM &&
    !!env.MAIL_TO &&
    Number.isInteger(Number(env.RETENTION_DAYS)) &&
    Number(env.RETENTION_DAYS) > 0 &&
    Number(env.RETENTION_DAYS) <= 365
  );
}
async function boundedJson(request: Request) {
  if (!request.body) throw new Error("body");
  let size = 0;
  const chunks: Uint8Array[] = [];
  const reader = request.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16384) {
      await reader.cancel();
      throw new Error("size");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    bytes.set(c, offset);
    offset += c.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}
async function hashIp(ip: string, salt: string) {
  const b = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${salt}:${ip}`),
  );
  return Array.from(new Uint8Array(b))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
export const onRequest: PagesFunction<Env> = async ({
  request,
  env,
  waitUntil,
}) => {
  if (request.method !== "POST")
    return response({ error: "method_not_allowed" }, 405);
  if (!configured(env)) return response({ error: "forms_unavailable" }, 503);
  const origins = env.ALLOWED_ORIGINS!.split(",").map((x) => x.trim());
  if (!origins.includes(request.headers.get("Origin") || ""))
    return response({ error: "invalid_origin" }, 403);
  if (
    !(request.headers.get("Content-Type") || "")
      .toLowerCase()
      .startsWith("application/json")
  )
    return response({ error: "invalid_content_type" }, 415);
  let body: unknown;
  try {
    body = await boundedJson(request);
  } catch {
    return response({ error: "invalid_body" }, 400);
  }
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success)
    return response(
      {
        error: "validation_failed",
        fields: [...new Set(parsed.error.issues.map((i) => i.path[0]))],
      },
      400,
    );
  const data = parsed.data;
  if (data.consentVersion !== env.PRIVACY_VERSION)
    return response({ error: "privacy_version_changed" }, 409);
  const db = env.ENQUIRIES!;
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const now = new Date();
  const bucket = Math.floor(now.getTime() / 600000);
  const hash = await hashIp(ip, env.RATE_LIMIT_SALT!);
  try {
    // An atomic counter prevents concurrent requests from bypassing the per-IP quota.
    const quota = await db
      .prepare(
        "INSERT INTO rate_limits (key, count, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count",
      )
      .bind(`${hash}:${bucket}`, now.getTime() + 1200000)
      .first<{ count: number }>();
    if (!quota || quota.count > 5)
      return response({ error: "rate_limited" }, 429);
    const challenge = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: data.token,
          remoteip: ip,
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!challenge.ok)
      return response({ error: "security_check_unavailable" }, 503);
    const verify = (await challenge.json()) as {
      success: boolean;
      hostname?: string;
      action?: string;
    };
    if (
      !verify.success ||
      !env
        .TURNSTILE_HOSTNAMES!.split(",")
        .map((x) => x.trim())
        .includes(verify.hostname || "") ||
      verify.action !== data.kind
    )
      return response({ error: "security_check_failed" }, 400);
    const id = crypto.randomUUID();
    const { token, website, consent, ...record } = data;
    await db
      .prepare(
        "INSERT INTO enquiries (id, kind, locale, email, payload, consent_at, consent_version, consent_text, email_status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      )
      .bind(
        id,
        data.kind,
        data.locale,
        data.email,
        JSON.stringify(record),
        now.toISOString(),
        data.consentVersion,
        formCopy.consent[data.locale],
        "pending",
        now.toISOString(),
      )
      .run();
    let emailNotified = false;
    try {
      const mail = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `enquiry-${id}`,
        },
        body: JSON.stringify({
          from: env.MAIL_FROM,
          to: env.MAIL_TO!.split(",").map((x) => x.trim()),
          reply_to: data.email,
          subject: `Treehouse ${data.kind} enquiry · ${id.slice(0, 8)}`,
          text: `Reference: ${id}\nReceived: ${now.toISOString()}\n\n${Object.entries(
            record,
          )
            .map(([k, v]) => `${k}: ${v}`)
            .join(
              "\n",
            )}\n\nConsent recorded: ${now.toISOString()}\nNotice version: ${data.consentVersion}\nConsent wording: ${formCopy.consent[data.locale]}`,
        }),
        signal: AbortSignal.timeout(8000),
      });
      emailNotified = mail.ok;
      await db
        .prepare("UPDATE enquiries SET email_status=? WHERE id=?")
        .bind(emailNotified ? "sent" : "failed", id)
        .run();
    } catch {
      try {
        await db
          .prepare("UPDATE enquiries SET email_status='failed' WHERE id=?")
          .bind(id)
          .run();
      } catch {
        /* Saved record remains pending for operator reconciliation. */
      }
    }
    // Approved retention applies to submission records and short-lived abuse counters.
    const cutoff = new Date(
      now.getTime() - Number(env.RETENTION_DAYS) * 86400000,
    ).toISOString();
    waitUntil(
      db
        .batch([
          db
            .prepare("DELETE FROM rate_limits WHERE expires_at < ?")
            .bind(now.getTime()),
          db.prepare("DELETE FROM enquiries WHERE created_at < ?").bind(cutoff),
        ])
        .then(() => {})
        .catch(() => {}),
    );
    return response(
      { accepted: true, emailNotified, reference: id },
      emailNotified ? 201 : 202,
    );
  } catch {
    return response({ error: "temporarily_unavailable" }, 503);
  }
};
