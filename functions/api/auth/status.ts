import { authEnabled, response, supa, type AuthEnv } from "./_shared";
export const onRequestGet: PagesFunction<AuthEnv> = async ({ env }) => {
  if (!authEnabled(env)) return response({ ready: false, stage: "configuration" }, 503);
  try {
    const health = await supa(env, "/auth/v1/health", { method: "GET" });
    if (health.ok) return response({ ready: true });
    // Health data only: expose no auth tokens, API keys, user records, or response bodies.
    return response({
      ready: false, stage: "upstream_response", upstreamStatus: health.status,
      configuredUrl: !!env.SUPABASE_URL, configuredKey: !!env.SUPABASE_PUBLISHABLE_KEY,
    }, 503);
  } catch (err) {
    return response({
      ready: false, stage: "network_error",
      errorType: err instanceof Error ? err.name : "unknown",
      configuredUrl: !!env.SUPABASE_URL, configuredKey: !!env.SUPABASE_PUBLISHABLE_KEY,
    }, 503);
  }
};