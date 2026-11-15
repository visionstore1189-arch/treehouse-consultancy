import { authEnabled, response, supa, type AuthEnv } from "./_shared";
export const onRequestGet: PagesFunction<AuthEnv> = async ({ env }) => {
  if (!authEnabled(env)) return response({ ready: false }, 503);
  try {
    const health = await supa(env, "/auth/v1/health", { method: "GET" });
    return response({ ready: health.ok }, health.ok ? 200 : 503);
  } catch {
    return response({ ready: false }, 503);
  }
};