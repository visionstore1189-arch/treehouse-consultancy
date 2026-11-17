# Dawabit by Treehouse — product app, Supabase and controlled sign-in audit

**Source of authority:** Treehouse Website Change List v5 (17 November 2026), especially R, G, B and E; client Demo Tailoring and Access Guide v2; live connected Supabase project audit on 17 November 2026. Earlier document revisions and previous product names are superseded.

## Verified state (do not mistake for full product integration)

| Capability | Verification | State |
|---|---|---|
| Corporate bilingual website | Next.js static export, Cloudflare Pages; EN/AR; official visual pack | Functional in v5 preview |
| Approved visual illustrations | 53 original public assets; public screen 1 only on product page; graphic panels 1–5 and explainer sets | Installed in staging |
| Five-stage assessment explanation | Scope, Map, Assess, Review, Report (client's approved public text) | New accessible interactive **marketing illustration**, not a customer assessment |
| Interactive demo | Client-supplied single HTML file (illustrative local-only data); separate Cloudflare Worker deployment | **Unprotected**, therefore not linked/embedded/published from website |
| Client 1 guide | Encrypted HTML, separate direct-upload package | Separate confidential delivery; Cloudflare Access **not yet configured** |
| Supabase Auth | One active project in London region (`eu-west-2`), one Auth user, publishable key and three public tables | Basic authentication infrastructure exists |
| Supabase organisation model | `organizations`, `organization_memberships`, `organization_subscriptions` all have RLS with user-linked SELECT policies; no ordinary client write rules | Basic entitlement model present |
| Real Dawabit assessment app | Assessment engine, complete regulatory libraries, customer uploads, evidence store, findings/reports, subscription billing | **Not demonstrated by the currently connected Supabase public schema or marketing repository** |
| Client portal navigation and sign-in | Pages/functions exist in historical code; firm must decide E9 | **UI unpublished and authentication API explicitly fail-closed pending approval** |

The connected Supabase project retains a superseded legacy *display name* and historical migration file. Preserve existing database/migration history; update the display name only with the firm's operational confirmation. Never present either legacy branding publicly.

## Security findings

1. Existing Cloudflare Pages Auth functions originally enabled their network calls as soon as a public Supabase URL/key was available, independent of whether the client-login UI had been authorised. The v5 premium branch now requires **server-only** `DAWABIT_CLIENT_LOGIN_APPROVED=true` in `AuthEnv`, otherwise `/api/auth/*` credential/session functions return 503. This is a second layer of protection, not a licence to expose login.
2. The marketing configuration independently keeps `authLoginEnabled:false`, `portalConnected:false`, form submissions and sample reports disabled. Do not flip until **E9, E1/E3, E8, E10 and penetration/tenant tests** are satisfied.
3. Supabase Auth Security Advisor reports **Leaked Password Protection Disabled**. Enable and test in the firm's Supabase Auth settings before inviting customers. Reference: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection
4. Membership/organisation/subscription tables have row-level policies scoped to authenticated `auth.uid()`. This is promising but **not sufficient** evidence for a production portal: run cross-tenant test accounts, role/admin tests, expired-plan tests and end-to-end authenticated origin tests.
5. Password/session endpoints must require HTTPS, `HttpOnly; Secure; SameSite=Lax`, origin checks, access entitlements, session lifetime limits, no-store caching and audit logging. Existing code provides some of these; production acceptance requires manual verification.
6. Do not place a service-role key, refresh token, customer passwords, secret keys, private documents, or assessment data in browser code, repository, static exports, public assets or client-supplied demos.

## Recommended end-state architecture

- **Marketing:** `treehouseconsulting.co.uk` (subject to E2) serves public firm content and approved illustrative images. The demo request page initially accepts enquiries only after E1/E3; an approved demo button may appear **only after** protected delivery is verified.
- **Demo:** isolated `demo.<firm-approved-host>` with Cloudflare Access or server-side Worker gate; only named users allowed; protect *all* direct Workers/preview/custom hosts, with a fail-closed default. Per Part G it **must not be embedded in an iframe**.
- **Client 1 guide:** a separate Pages project and exact unmodified encrypted HTML under an individual-email Cloudflare Access allowlist; protect all public aliases and verify the guide's in-page password screen follows Access. Never make it part of this repository.
- **Production client app:** separate authenticated application at an explicitly authorised hostname. Its own backend enforces authentication and tenant entitlement **on every data request**, independent of the marketing UI. Use Supabase Auth sessions and RLS only after app source/API, hosting, database tables, storage and permissions are inspected.
- **Supabase:** client-owned keys/config and migrations; avoid opening signup or inviting clients until E9 and legal/retention facts are approved. For Next.js SSR session cookies, follow the current maintained Supabase `@supabase/ssr` approach; however the current public Next.js site is statically exported, so keep sensitive API checks in Cloudflare Functions or a separate SSR app rather than treating a static client-side redirect as authorisation.

## Before authorising customer sign-in (firm E9 gate)

- [ ] Firm confirms whether sign-in/recovery pages should exist at all, their canonical paths, the client-application hostname and who owns user administration.
- [ ] Deliver and review the complete **actual** Dawabit app source, database and deployment architecture; the HTML demo alone does not meet this requirement.
- [ ] Enable Leaked Password Protection and configure MFA, signup, SMTP, allowed redirect URLs, invitation flow, password-reset route and session revocation.
- [ ] Set up real tenant test users and demonstrate no cross-organisation data access, including API endpoint tampering.
- [ ] Enforce RLS for assessment tables and private storage; test object-level authorization and revocation.
- [ ] Confirm retention, data residency, training-use, legal notices and DPIA/security statements with Treehouse (E3/E4).
- [ ] Obtain exact named user lists for demo, client guide and eventual client app; **do not reuse a broad allowlist across resources**.
- [ ] Review origin, CSRF, security headers, logging and caching; run accessibility/mobile/language tests.
- [ ] Only then set `DAWABIT_CLIENT_LOGIN_APPROVED=true` in the **Cloudflare server environment** and `authLoginEnabled:true` in a separately approved build, testing the result on a protected staging address first.

## Design and experience changes in this polish branch

- Interactive five-stage assessment journey derived **only from the approved client text**; bilingual, AR RTL, keyboard-operable, no autoplay and reduced-motion fallback.
- Editorial typography, responsive polish, purposeful hover/focus states, subtle sticky scroll progress and visible return-to-top.
- No fake software screenshots, customer data, working uploads or dashboard/portal claims.
- Keep approved client graphics and assets unchanged. Verify the v5 page placement rules B1–B10.

## Evidence and test plan

Automated tests cover the five-stage UI and fail-closed login gate. Cloudflare/GitHub CI on the PR must pass all routes and widths (EN and AR) and produce screenshots of Home, Product and Contact at 390px.

Manual launch testing must verify every public and private hostname, no indexing until E10, exact legal/mail approvals, demo server gate, Client 1 allowlist, successful and denied logins, mobile UI, and final old-name audit.

**No domain migration, public client-login enablement, Cloudflare Access configuration or confidential deployment is authorised by this document.** It is a staging implementation and accuracy report.
