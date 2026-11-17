"use client";
import { useEffect } from "react";
import { href, type Locale } from "@/lib/config";

// Dashboard invitations may return to the Site URL. Forward only recognised
// invitation/recovery tokens to our fixed same-origin password setup route.
export function AuthCallbackRedirect({ locale }: { locale: Locale }) {
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const query = new URLSearchParams(window.location.search);
    const type = hash.get("type") || query.get("type");
    if (type !== "invite" && type !== "recovery") return;
    const target = href(locale, "client/reset-password");
    if (window.location.pathname === target) return;
    if (hash.get("access_token") && hash.get("refresh_token")) {
      window.location.replace(target + "#" + hash.toString());
    } else if (query.get("token_hash")) {
      const safe = new URLSearchParams({ type, token_hash: query.get("token_hash")! });
      window.location.replace(target + "?" + safe.toString());
    }
  }, [locale]);
  return null;
}
