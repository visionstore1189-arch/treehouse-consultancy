/* Cloudflare Pages auth helper. No service-role key or passwords are ever stored. */
export interface AuthEnv {
  CLIENT1_GUIDE_URL?: string;
  CLIENT1_ALLOWED_EMAIL?: string;
  CLIENT1_ACCESS_READY?: string;
  SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
}
// The project URL and sb_publishable key are public configuration, NOT privileged secrets.
// Explicit Cloudflare bindings take precedence for future project rotation.
const SUPABASE_PROJECT_URL = "https://rylvuhuqjofliceipbka.supabase.co";
const SUPABASE_PUBLIC_KEY = "sb_publishable_vCVWhaqD8HUMI3VnswXZGg_v4zOoIG9";
const projectUrl = (env: AuthEnv) => env.SUPABASE_URL ?? SUPABASE_PROJECT_URL;
const publishableKey = (env: AuthEnv) => env.SUPABASE_PUBLISHABLE_KEY ?? SUPABASE_PUBLIC_KEY;
export type Tokens = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  token_type?: string;
};
type Session = { user: { id: string; email?: string }; accessToken: string; tokens?: Tokens };

const ACCESS = "__Host-th_access";
const REFRESH = "__Host-th_refresh";
export const authEnabled = (env: AuthEnv): boolean => {
  try {
    const u = new URL(projectUrl(env));
    return u.protocol === "https:" && /^[a-z0-9-]+\.supabase\.co$/i.test(u.hostname)
      && u.pathname === "/" && publishableKey(env).startsWith("sb_publishable_");
  } catch { return false; }
};
export const response = (body: unknown, status = 200): Response => Response.json(body, {
  status,
  headers: {
    "Cache-Control": "no-store, max-age=0",
    "Pragma": "no-cache",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
  },
});
export const sameOrigin = (r: Request): boolean => {
  const origin = r.headers.get("Origin");
  if (!origin || r.headers.get("Sec-Fetch-Site") === "cross-site") return false;
  try {
    const expected = new URL(r.url);
    const got = new URL(origin);
    return got.origin === expected.origin && (got.protocol === "https:" || got.hostname === "localhost");
  } catch { return false; }
};
export const readBody = async (request: Request): Promise<Record<string, unknown> | null> => {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return null;
  if (Number(request.headers.get("content-length") || "0") > 8192 || !request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) { await reader.cancel(); return null; }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    const obj: unknown = JSON.parse(new TextDecoder().decode(bytes));
    return obj && typeof obj === "object" && !Array.isArray(obj) ? obj as Record<string, unknown> : null;
  } catch { return null; }
};
export const supa = (env: AuthEnv, path: string, init: RequestInit = {}, bearer?: string): Promise<Response> => {
  if (!authEnabled(env) || !path.startsWith("/")) throw new Error("auth_not_configured");
  const headers = new Headers(init.headers);
  headers.set("apikey", publishableKey(env));
  headers.set("Accept", "application/json");
  if (init.body) headers.set("Content-Type", "application/json");
  if (bearer) headers.set("Authorization", "Bearer " + bearer);
  // Cloudflare Workers supports redirect "manual" or "follow", never "error".
  // Never auto-follow auth redirects: caller treats 3xx responses as failures.
  return fetch(projectUrl(env).replace(/\/$/, "") + path, { ...init, headers, redirect: "manual" });
};
const cookie = (req: Request, name: string): string => {
  const part = (req.headers.get("Cookie") || "").split(";").map(v => v.trim())
    .find(v => v.startsWith(name + "="));
  return part?.slice(name.length + 1) || "";
};
export const setTokens = (resp: Response, tokens: Tokens): void => {
  const expiry = Math.max(60, Math.min(3600, Number(tokens.expires_in) || 3600));
  resp.headers.append("Set-Cookie", `${ACCESS}=${tokens.access_token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${expiry}`);
  resp.headers.append("Set-Cookie", `${REFRESH}=${tokens.refresh_token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000`);
};
export const clearTokens = (resp: Response): void => {
  for (const name of [ACCESS, REFRESH])
    resp.headers.append("Set-Cookie", `${name}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
};
export const verifiedUser = async (env: AuthEnv, token: string): Promise<Session["user"] | null> => {
  if (!token || token.length > 4096) return null;
  try {
    const result = await supa(env, "/auth/v1/user", { method: "GET" }, token);
    if (!result.ok) return null;
    const user: unknown = await result.json();
    if (!user || typeof user !== "object" || typeof (user as {id?: unknown}).id !== "string") return null;
    const { id, email } = user as { id: string; email?: string };
    return { id, email };
  } catch { return null; }
};
export const session = async (request: Request, env: AuthEnv): Promise<Session | null> => {
  if (!authEnabled(env)) return null;
  const existing = cookie(request, ACCESS);
  const verified = await verifiedUser(env, existing);
  if (verified) return { user: verified, accessToken: existing };
  const refresh = cookie(request, REFRESH);
  if (!refresh || refresh.length > 4096) return null;
  try {
    const res = await supa(env, "/auth/v1/token?grant_type=refresh_token", {
      method: "POST", body: JSON.stringify({ refresh_token: refresh }),
    });
    if (!res.ok) return null;
    const tokens = await res.json() as Tokens;
    if (!tokens.access_token || !tokens.refresh_token) return null;
    const user = await verifiedUser(env, tokens.access_token);
    return user ? { user, accessToken: tokens.access_token, tokens } : null;
  } catch { return null; }
};
export const emailValid = (x: unknown): x is string =>
  typeof x === "string" && x.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
