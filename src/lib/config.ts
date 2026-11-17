export const config = {
  // The approved v3 canonical, regardless of preview host and legacy .com variables.
  siteUrl: "https://treehouseconsulting.co.uk",
  formsEnabled: false, // v3: activate only after signed-off privacy, inbox, Turnstile, storage and consent validation
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  sampleReportEnabled: false, // v3: hidden until the forms and final legal notice are live
  dawabitAppUrl:
    process.env.NEXT_PUBLIC_Dawabit_APP_URL ||
    "https://app.treehouseconsulting.co.uk",
  // Treehouse Supabase owner, organisation and RLS are configured. Cloudflare Functions
  // have the public project settings; use NEXT_PUBLIC_AUTH_LOGIN_ENABLED=false as a kill switch.
  // This enables account sign-in, NOT access to the separate Dawabit application.
  authLoginEnabled: process.env.NEXT_PUBLIC_AUTH_LOGIN_ENABLED !== "false",
  // This static website never verifies passwords or client subscriptions.
  // Only enable linking to a real, independently secured application after its
  // authentication, MFA and organisation-based entitlements have been audited.
  dawabitLoginUrl: process.env.NEXT_PUBLIC_Dawabit_LOGIN_URL || "",
  portalConnected:
    process.env.NEXT_PUBLIC_Dawabit_PORTAL_CONNECTED === "true" &&
    /^https:\/\//.test(process.env.NEXT_PUBLIC_Dawabit_LOGIN_URL || ""),
} as const;
export type Locale = "en" | "ar";
export const href = (locale: Locale, path = "") =>
  `${locale === "ar" ? "/ar" : ""}/${path ? path.replace(/^\/+|\/+$/g, "") + "/" : ""}`;
export const pick = <T>(locale: Locale, value: { en: T; ar: T }): T =>
  value[locale];
