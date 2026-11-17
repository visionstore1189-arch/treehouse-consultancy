import { activateDemoTrial } from "./_demo-access";
import { authEnabled, emailValid, readBody, response, sameOrigin, setTokens, supa, verifiedUser, type AuthEnv, type Tokens } from "./_shared";
export const onRequestPost: PagesFunction<AuthEnv> = async ({ request, env }) => {
  if (!authEnabled(env)) return response({ error: "auth_not_configured" }, 503);
  if (!sameOrigin(request)) return response({ error: "invalid_origin" }, 403);
  const data = await readBody(request);
  if (!data || !emailValid(data.email) || typeof data.password !== "string"
    || data.password.length < 1 || data.password.length > 1024)
    return response({ error: "invalid_input" }, 400);
  try {
    const res = await supa(env, "/auth/v1/token?grant_type=password", {
      method: "POST",
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    if (!res.ok) return response({ error: "invalid_credentials" }, res.status === 429 ? 429 : 401);
    const tokens = await res.json() as Tokens;
    if (!tokens.access_token || !tokens.refresh_token)
      return response({ error: "invalid_credentials" }, 401);
    const user = await verifiedUser(env, tokens.access_token);
    if (!user) return response({ error: "invalid_credentials" }, 401);
    // A Supabase account alone never grants Treehouse client access.
    // Allow only explicitly approved, active organisation members.
    const membership = await supa(
      env,
      "/rest/v1/organization_memberships?select=organization_id&user_id=eq." +
        encodeURIComponent(user.id) + "&status=eq.active&limit=1",
      { method: "GET" },
      tokens.access_token,
    );
    if (!membership.ok) return response({ error: "authorization_unavailable" }, 503);
    const rows: unknown = await membership.json();
    if (!Array.isArray(rows) || rows.length === 0)
      return response({ error: "account_not_authorized" }, 403);
    if (!await activateDemoTrial(env, tokens.access_token)) return response({ error: "access_records_unavailable" }, 503);
    const result = response({ ok: true });
    setTokens(result, tokens);
    return result;
  } catch { return response({ error: "authentication_unavailable" }, 503); }
};