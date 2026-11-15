# MUTABIQ branded client-access handover

## Status
The public English/Arabic Treehouse website now displays the supplied green MUTABIQ wordmark and a distinct client access section on the home and MUTABIQ overview pages. It also shows a prominent header and mobile-menu login entry, plus a dedicated client sign-in interface.

**Client account authentication is enabled:** The marketing site now uses Cloudflare Pages Functions connected to a dedicated Supabase Auth project for verified email/password sign-in. Cloudflare validates passwords with Supabase; it never stores passwords, privileged API keys or user documents. Login is restricted to server-approved organisation members. The `/client/portal` page shows the verified user’s own organisation and subscription status only.

**The actual MUTABIQ software is not connected.** This marketing-site account is not permission to view confidential assessments, regulatory libraries or software data. Those require independently enforced backend authorization, MFA and subscription checks before launch.

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
The marketing-site customer account login is connected to Supabase for approved organisation members. Subscriber invitations and password recovery still require exact Supabase Auth URL allowlists, production SMTP and an invitation-only signup policy; those have not been verified. The actual MUTABIQ application remains disconnected. Enquiry forms and the protected sample report remain disabled until their independent Cloudflare, email and privacy dependencies are configured and approved.
