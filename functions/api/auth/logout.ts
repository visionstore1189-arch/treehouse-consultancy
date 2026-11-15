import { clearTokens, response, sameOrigin } from "./_shared";
export const onRequestPost: PagesFunction = async ({ request }) => {
  if (!sameOrigin(request)) return response({ error: "invalid_origin" }, 403);
  const result = response({ ok: true });
  clearTokens(result);
  return result;
};