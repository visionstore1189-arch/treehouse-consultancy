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
    if (!tokens.access_token || !tokens.refresh_token
      || !(await verifiedUser(env, tokens.access_token)))
      return response({ error: "invalid_credentials" }, 401);
    const result = response({ ok: true });
    setTokens(result, tokens);
    return result;
  } catch { return response({ error: "authentication_unavailable" }, 503); }
};