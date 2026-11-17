export const config = {
  // Client v5 canonical target. Do not change GoDaddy/Cloudflare DNS until the
  // firm confirms registration and domain settings (E2).
  siteUrl: "https://treehouseconsulting.co.uk",
  formsEnabled: false, // E1 + E3: monitored mailbox and approved privacy notice required.
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  sampleReportEnabled: false, // Not publicly downloadable; send only on request.
  // The user approved shared website login for server-authorized demonstration
  // and client resources. A separate production assessment engine is not configured.
  authLoginEnabled: true, // Explicitly requested by the user on 17 November 2026.
  dawabitAppUrl: "",
  dawabitLoginUrl: "",
  portalConnected: false,
} as const;
export type Locale = "en" | "ar";
export const href = (locale: Locale, path = "") =>
  `${locale === "ar" ? "/ar" : ""}/${path ? path.replace(/^\/+|\/+$/g, "") + "/" : ""}`;
export const pick = <T>(locale: Locale, value: { en: T; ar: T }): T =>
  value[locale];
