import { authEnabled, readBody, response, sameOrigin, setTokens, supa, verifiedUser, type AuthEnv, type Tokens } from "./_shared";
/** Exchange a short-lived invitation/recovery token; never store it in public JS storage. */
export const onRequestPost: PagesFunction<AuthEnv> = async ({ request, env }) => {
  if (!authEnabled(env)) return response({ error: "auth_not_configured" }, 503);
  if (!sameOrigin(request)) return response({ error: "invalid_origin" }, 403);
  const data = await readBody(request);
  if (!data) return response({ error: "invalid_input" }, 400);
  try {
    let tokens: Tokens;
    if (typeof data.token_hash === "string" && data.token_hash.length < 500
      && ["invite", "recovery"].includes(String(data.type))) {
      const res = await supa(env, "/auth/v1/verify", {
        method: "POST",
        body: JSON.stringify({ token_hash: data.token_hash, type: data.type }),
      });
      if (!res.ok) return response({ error: "invalid_or_expired_link" }, 401);
      tokens = await res.json() as Tokens;
    } else if (typeof data.access_token === "string" && data.access_token.length < 4096
      && typeof data.refresh_token === "string" && data.refresh_token.length < 4096) {
      tokens = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: 3600,
      };
    } else return response({ error: "invalid_input" }, 400);
    if (!tokens.access_token || !tokens.refresh_token
      || !(await verifiedUser(env, tokens.access_token)))
      return response({ error: "invalid_or_expired_link" }, 401);
    const result = response({ ok: true });
    setTokens(result, tokens);
    return result;
  } catch { return response({ error: "authentication_unavailable" }, 503); }
};