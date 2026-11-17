import { authEnabled, clearTokens, response, session, setTokens, supa, type AuthEnv } from "./_shared";
// The supplied HTML is held behind database RLS, never in public assets or source control.
export const onRequestGet: PagesFunction<AuthEnv> = async ({ request, env }) => {
  if (!authEnabled(env)) return response({ error: "auth_not_configured" }, 503);
  const identity = await session(request, env);
  if (!identity) {
    const denied = response({ error: "sign_in_required" }, 401);
    clearTokens(denied);
    return denied;
  }
  try {
    // RLS independently requires an unexpired named-user grant and active membership.
    const upstream = await supa(env, "/rest/v1/dawabit_demo_assets?id=eq.demo-v2&select=html,sha256&limit=1",
      { method: "GET" }, identity.accessToken);
    if (!upstream.ok) return response({ error: "demo_unavailable" }, 503);
    const rows = await upstream.json() as { html: string; sha256: string }[];
    if (!rows.length) return response({ error: "demo_not_authorized" }, 403);
    const {html, sha256} = rows[0];
    const digest = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(html))))
      .map(b => b.toString(16).padStart(2, "0")).join("");
    if (digest !== sha256) return response({ error: "demo_integrity_error" }, 503);
    const result = new Response(html, { headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store, no-transform, max-age=0",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; connect-src 'none'; frame-ancestors 'self'; base-uri 'none'; form-action 'none'; sandbox allow-scripts allow-modals allow-downloads",
    }});
    if (identity.tokens) setTokens(result, identity.tokens);
    return result;
  } catch { return response({ error: "demo_unavailable" }, 503); }
};
