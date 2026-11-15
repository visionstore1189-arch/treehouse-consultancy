# MUTABIQ branded client-access handover

## Status
The public English/Arabic Treehouse website now displays the supplied green MUTABIQ wordmark and a distinct client access section on the home and MUTABIQ overview pages. It also shows a prominent header and mobile-menu login entry, plus a dedicated client sign-in interface.

**Important:** This is not a working authentication system. The public Cloudflare Pages site is a static marketing frontend and must never accept, store, hash, or verify passwords, grant subscription access, or expose confidential assessments.

The sign-in UI displays disabled username and password fields until a **separately hosted, audited application** exists. The /client/portal route contains no customer data or functional access.

## Integrating the client's existing application
1. Deploy MUTABIQ on an authenticated HTTPS origin (the client must confirm whether the final hostname is `app.mutabiq.com` or `app.treehouseconsultancy.com`). Do not serve application code, regulator libraries or client documents from the public website.
2. Configure an identity provider with named client accounts, MFA and secure password recovery or enterprise SSO. Issue first-time enrolment invitations to customers through the identity provider; do **not** create or exchange passwords in GitHub or browser JavaScript.
3. Enforce every permission, organisation ID, and paid subscription entitlement **server-side**, including document download paths and API endpoints. Use tenant-isolation tests, session expiry, audit logs and rate limits.
4. When all security checks have passed, configure the Cloudflare Pages build variables:
   - `NEXT_PUBLIC_MUTABIQ_LOGIN_URL` — fully qualified `https://` URL of the secure application's actual login route.
   - `NEXT_PUBLIC_MUTABIQ_PORTAL_CONNECTED=true` — enable the real login-link action.
5. Redeploy Cloudflare Pages and verify that both language variants redirect only to the correct secured login service. Do not turn on the flag before login, MFA, entitlement checks and organisation isolation have been tested.
6. If session-based redirect is required, coordinate the integration with the MUTABIQ backend engineer. Never use a marketing-site-only "logged in" localStorage or cookie flag to authorize access.

## Branding and layout
- Public favicon is `public/favicon.svg`, a vector trace of the supplied transparent Treehouse six-bar icon.
- MUTABIQ brand mark and English wordmark are under `public/brand/mutabiq-mark.svg`, `mutabiq-wordmark.svg`, and `mutabiq-wordmark-light.svg`. These are lightweight traced-vector adaptations of the supplied transparent artwork, not substitutes for the source PNG. If pixel-exact reproduction is required, replace these files with the original logo assets.
- Visible English product references display **MUTABIQ**; Arabic remains **مطابق**. Lowercase URL slugs remain unchanged to preserve existing links.
- The public market cards appear left-to-right: **Saudi Arabia**, **United Kingdom**, **United Arab Emirates**. Arabic card text retains RTL typography.
- Do not alter any of the client's original illustrative screenshots, including the visible "Mutabiq" wording inside them.

## Launch limitations
The secure portal is **not yet active** and no real logins or password credentials were created. Enquiry forms and the protected sample report remain disabled until their independent Cloudflare, email and privacy dependencies are configured and approved.
