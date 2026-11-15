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
  // Fail closed: no authentication is implemented in this public site.
  portalConnected: false,
} as const;
export type Locale = "en" | "ar";
export const href = (locale: Locale, path = "") =>
  `${locale === "ar" ? "/ar" : ""}/${path ? path.replace(/^\/+|\/+$/g, "") + "/" : ""}`;
export const pick = <T>(locale: Locale, value: { en: T; ar: T }): T =>
  value[locale];
