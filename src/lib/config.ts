export const config = {
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://treehouseconsultancy.co.uk"
  ).replace(/\/$/, ""),
  formsEnabled: process.env.NEXT_PUBLIC_FORMS_ENABLED === "true",
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  sampleReportEnabled: process.env.NEXT_PUBLIC_SAMPLE_REPORT_ENABLED === "true",
  tibqaAppUrl:
    process.env.NEXT_PUBLIC_TIBQA_APP_URL ||
    "https://app.treehouseconsultancy.co.uk",
  // Treehouse Supabase owner, organisation and RLS are configured. Cloudflare Functions
  // have the public project settings; use NEXT_PUBLIC_AUTH_LOGIN_ENABLED=false as a kill switch.
  // This enables account sign-in, NOT access to the separate TIBQA application.
  authLoginEnabled: process.env.NEXT_PUBLIC_AUTH_LOGIN_ENABLED !== "false",
  // This static website never verifies passwords or client subscriptions.
  // Only enable linking to a real, independently secured application after its
  // authentication, MFA and organisation-based entitlements have been audited.
  tibqaLoginUrl: process.env.NEXT_PUBLIC_TIBQA_LOGIN_URL || "",
  portalConnected:
    process.env.NEXT_PUBLIC_TIBQA_PORTAL_CONNECTED === "true" &&
    /^https:\/\//.test(process.env.NEXT_PUBLIC_TIBQA_LOGIN_URL || ""),
} as const;
export type Locale = "en" | "ar";
export const href = (locale: Locale, path = "") =>
  `${locale === "ar" ? "/ar" : ""}/${path ? path.replace(/^\/+|\/+$/g, "") + "/" : ""}`;
export const pick = <T>(locale: Locale, value: { en: T; ar: T }): T =>
  value[locale];
