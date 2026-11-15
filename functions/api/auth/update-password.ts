import { authEnabled, readBody, response, sameOrigin, session, setTokens, supa, type AuthEnv } from "./_shared";
export const onRequestPost: PagesFunction<AuthEnv> = async ({ request, env }) => {
  if (!authEnabled(env)) return response({ error: "auth_not_configured" }, 503);
  if (!sameOrigin(request)) return response({ error: "invalid_origin" }, 403);
  const data = await readBody(request);
  if (!data || typeof data.password !== "string" || data.password.length < 12
    || data.password.length > 1024)
    return response({ error: "password_too_short" }, 400);
  const identity = await session(request, env);
  if (!identity) return response({ error: "not_authenticated" }, 401);
  try {
    const res = await supa(env, "/auth/v1/user", {
      method: "PUT", body: JSON.stringify({ password: data.password }),
    }, identity.accessToken);
    if (!res.ok) return response({ error: "password_update_failed" }, 400);
    const result = response({ ok: true });
    if (identity.tokens) setTokens(result, identity.tokens);
    return result;
  } catch { return response({ error: "authentication_unavailable" }, 503); }
};