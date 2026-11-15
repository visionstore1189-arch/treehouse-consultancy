export const config = {
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://treehouseconsultancy.com"
  ).replace(/\/$/, ""),
  formsEnabled: process.env.NEXT_PUBLIC_FORMS_ENABLED === "true",
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  sampleReportEnabled: process.env.NEXT_PUBLIC_SAMPLE_REPORT_ENABLED === "true",
  mutabiqAppUrl:
    process.env.NEXT_PUBLIC_MUTABIQ_APP_URL ||
    "https://app.treehouseconsultancy.com",
  // Enable the login UI only after the real Cloudflare auth functions, Supabase project, invitation settings and RLS are configured.
  authLoginEnabled: process.env.NEXT_PUBLIC_AUTH_LOGIN_ENABLED === "true",
  // This static website never verifies passwords or client subscriptions.
  // Only enable linking to a real, independently secured application after its
  // authentication, MFA and organisation-based entitlements have been audited.
  mutabiqLoginUrl: process.env.NEXT_PUBLIC_MUTABIQ_LOGIN_URL || "",
  portalConnected:
    process.env.NEXT_PUBLIC_MUTABIQ_PORTAL_CONNECTED === "true" &&
    /^https:\/\//.test(process.env.NEXT_PUBLIC_MUTABIQ_LOGIN_URL || ""),
} as const;
export type Locale = "en" | "ar";
export const href = (locale: Locale, path = "") =>
  `${locale === "ar" ? "/ar" : ""}/${path ? path.replace(/^\/+|\/+$/g, "") + "/" : ""}`;
export const pick = <T>(locale: Locale, value: { en: T; ar: T }): T =>
  value[locale];
