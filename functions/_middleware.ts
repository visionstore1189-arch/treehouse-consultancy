// Pages _redirects does not support host matching. Keep canonicalisation on the server.
const aliases = new Set([
  "treehouseconsultancy.co.uk",
  "www.treehouseconsultancy.co.uk",
  "www.treehouseconsulting.co.uk",
]);
export function publicRedirect(request: Request): Response | undefined {
  const url = new URL(request.url);
  // Never move credential-bearing API submissions between origins.
  if (!["GET", "HEAD"].includes(request.method) || url.pathname.startsWith("/api/")) return;
  let status = 301;
  let changed = false;
  if (aliases.has(url.hostname)) {
    url.protocol = "https:";
    url.host = "treehouseconsulting.co.uk";
    changed = true;
  }
  const retired = url.pathname.match(/^(\/ar)?\/(?:tibqa|mutabiq)(\/.*)?$/);
  if (retired) {
    url.pathname = `${retired[1] || ""}/dawabit${retired[2] || "/"}`;
    changed = true;
  }
  if (/^\/(?:ar\/)?insights\/$/.test(url.pathname)) {
    url.pathname = url.pathname.startsWith("/ar/") ? "/ar/" : "/";
    status = changed ? 301 : 302;
    changed = true;
  }
  if (changed) return new Response(null, {status, headers: {
    Location: url.href,
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
  }});
}
export const onRequest: PagesFunction = async context => publicRedirect(context.request) || context.next();
