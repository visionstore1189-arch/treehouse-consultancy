/**
 * Dawabit brand-domain redirect Worker — PUBLIC ROUTES ONLY.
 *
 * Intentionally NOT deployed: client v5 Part E2 holds DNS/domain attachment.
 * Once approved, Cloudflare custom domains dawabit.co and www.dawabit.co may
 * be associated with this dedicated Worker. Never put the confidential demo,
 * a customer portal or an unprotected guide here.
 */
const PRIMARY = "https://treehouseconsulting.co.uk";
const HOSTS = new Set(["dawabit.co", "www.dawabit.co"]);

const PAGES = new Map([
  ["/", "/dawabit/"],
  ["/ar", "/ar/dawabit/"],
  ["/dawabit", "/dawabit/"],
  ["/ar/dawabit", "/ar/dawabit/"],
  ["/how-it-works", "/dawabit/how-it-works/"],
  ["/ar/how-it-works", "/ar/dawabit/how-it-works/"],
  ["/coverage", "/dawabit/coverage/"],
  ["/ar/coverage", "/ar/dawabit/coverage/"],
  ["/faq", "/dawabit/faq/"],
  ["/ar/faq", "/ar/dawabit/faq/"],
  // "/demo" is only the PUBLIC demo request page; never the private Worker.
  ["/demo", "/dawabit/demo/"],
  ["/ar/demo", "/ar/dawabit/demo/"],
  ["/contact", "/contact/"],
  ["/ar/contact", "/ar/contact/"],
]);

export function redirectDestination(rawUrl) {
  let source;
  try { source = new URL(rawUrl); } catch { return null; }
  if (!HOSTS.has(source.hostname.toLowerCase())) return null;

  // Intentionally restrict to an explicit route map rather than allowing
  // arbitrary host/path forwarding or rehosting of sensitive client content.
  const pathname = source.pathname.replace(/\/+/g, "/").replace(/\/+$/, "") || "/";
  const selected = PAGES.get(pathname) || (
    pathname.startsWith("/ar/") ? "/ar/dawabit/" : "/dawabit/"
  );
  const dest = new URL(selected, PRIMARY);
  dest.search = source.search;
  return dest.href;
}

export default {
  async fetch(request) {
    const method = request.method.toUpperCase();
    if (method !== "GET" && method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
      });
    }
    const target = redirectDestination(request.url);
    if (!target) {
      return new Response("Unknown brand-domain host", {
        status: 404,
        headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
      });
    }
    return new Response(null, {
      status: 301,
      headers: {
        Location: target,
        "Cache-Control": "public, max-age=300",
        "X-Robots-Tag": "noindex, nofollow",
        "X-Content-Type-Options": "nosniff",
      },
    });
  },
};
