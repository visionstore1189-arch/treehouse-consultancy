import { authEnabled, emailValid, readBody, response, sameOrigin, supa, type AuthEnv } from "./_shared";
export const onRequestPost: PagesFunction<AuthEnv> = async ({ request, env }) => {
  if (!authEnabled(env)) return response({ error: "auth_not_configured" }, 503);
  if (!sameOrigin(request)) return response({ error: "invalid_origin" }, 403);
  const data = await readBody(request);
  if (!data || !emailValid(data.email)) return response({ error: "invalid_input" }, 400);
  // Suppress account enumeration: the response is identical for existing and unknown emails.
  try {
    const route = data.locale === "ar" ? "/ar/client/reset-password/" : "/client/reset-password/";
    const target = new URL(route, request.url).toString();
    const url = "/auth/v1/recover?redirect_to=" + encodeURIComponent(target);
    const result = await supa(env, url, { method: "POST", body: JSON.stringify({ email: data.email }) });
    if (!result.ok) {
      // Preserve the same response for an unknown account, while reporting delivery/configuration failures truthfully.
      const failure = await result.json().catch(() => ({})) as {code?: string};
      if (failure.code !== "user_not_found") return response({ error: "authentication_unavailable" }, 503);
    }
    return response({ ok: true });
  } catch { return response({ error: "authentication_unavailable" }, 503); }
};