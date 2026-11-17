export const config = {
  // Client v5 canonical target. Do not change GoDaddy/Cloudflare DNS until the
  // firm confirms registration and domain settings (E2).
  siteUrl: "https://treehouseconsulting.co.uk",
  formsEnabled: false, // E1 + E3: monitored mailbox and approved privacy notice required.
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  sampleReportEnabled: false, // Not publicly downloadable; send only on request.
  // Account UI remains unpublished while the firm decides E9; backend and
  // existing Supabase users are preserved, never exposed as demo access.
  authLoginEnabled: false,
  dawabitAppUrl: "",
  dawabitLoginUrl: "",
  portalConnected: false,
} as const;
export type Locale = "en" | "ar";
export const href = (locale: Locale, path = "") =>
  `${locale === "ar" ? "/ar" : ""}/${path ? path.replace(/^\\/+|\\/+$/g, "") + "/" : ""}`;
export const pick = <T>(locale: Locale, value: { en: T; ar: T }): T =>
  value[locale];
