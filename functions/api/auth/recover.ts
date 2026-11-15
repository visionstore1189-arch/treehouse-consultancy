import { authEnabled, emailValid, readBody, response, sameOrigin, supa, type AuthEnv } from "./_shared";
export const onRequestPost: PagesFunction<AuthEnv> = async ({ request, env }) => {
  if (!authEnabled(env)) return response({ error: "auth_not_configured" }, 503);
  if (!sameOrigin(request)) return response({ error: "invalid_origin" }, 403);
  const data = await readBody(request);
  if (!data || !emailValid(data.email)) return response({ error: "invalid_input" }, 400);
  // Suppress account enumeration: the response is identical for existing and unknown emails.
  try {
    const target = new URL("/client/reset-password/", request.url).toString();
    const url = "/auth/v1/recover?redirect_to=" + encodeURIComponent(target);
    await supa(env, url, { method: "POST", body: JSON.stringify({ email: data.email }) });
    return response({ ok: true });
  } catch { return response({ error: "authentication_unavailable" }, 503); }
};