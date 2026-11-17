# Dawabit client account staging

The user explicitly requested restoration of a separate Supabase email/password login on 17 November 2026. This supersedes the previous hidden-login default for this branch only.

English and Arabic sign-in, recovery, first-password setup and account pages use the existing Cloudflare authentication endpoints. Cookies remain HttpOnly, Secure and same-origin. Supabase verifies credentials; active organisation membership is required before login establishes a browser session. No self-signup UI, private document bytes, passwords or privileged keys are added.

The confidential Client 1 guide is a separate deployment behind Cloudflare Access and its own unchanged document password. Website login alone grants no guide or application access. The supplied hosting pack does not contain an embeddable complete Dawabit application.

Before inviting the first user: confirm the exact approved identity privately, set exact canonical callback URLs, configure membership, confirm email delivery, and have the user set their own password. The agent must not choose or enter the user's new password in the browser. Verify real sign-in, denial for nonmembers, recovery and logout before production acceptance.

## Interactive demonstration

The original v5 developer pack also contains a self-contained interactive demonstration. This is distinct from the encrypted Client 1 guide. Its original HTML is held in `dawabit_demo_assets`, not in public assets or Git. `dawabit_demo_grants` provides expiring per-user access; both tables enforce RLS and expose no anonymous read or client write permission. The asset policy additionally requires active organization membership.

`GET /api/auth/demo` validates the Supabase session, uses that user's token for the RLS query and verifies the original SHA-256 before returning any HTML. Responses are private/no-store/no-transform, noindex and sandboxed. The workspace embeds it only when the server reports an active grant. The iframe permits scripts, printing and downloads without same-origin privileges or network connections. No subscription is invented to enable demonstration access. The supplied "Demo mode, illustrative data" labels remain intact. This demonstrates the supplied sample workflow, rather than performing live regulatory assessments.

## Trial and paid access

Trial and paid accounts use the same supplied demonstration, as requested. A trial grant starts without a deadline. Successful password login, or the first authenticated workspace visit after invitation password setup, calls the atomic `activate_dawabit_trial` RPC. Its narrowly scoped implementation lives in a non-exposed schema, requires `auth.uid()` plus active membership and only activates the caller's pending trial once. Database time sets exactly 24 hours; repeated calls cannot extend it. Clients have no write permissions on grants. Expired or revoked grants cannot retrieve the HTML even with a valid login cookie.

Paid grants are manual after payment confirmation; this change does not collect payments or fabricate subscriptions. A paid grant may have an approved end date or remain valid until revoked. Existing preview deadlines are preserved. The workspace shows access type and expiry, removes the frame at its deadline and refreshes entitlement every minute. Server checks protect every new file request; previously delivered client-side HTML cannot be recalled from an offline copy.

Provisioning: invite the exact approved email through Supabase; assign a separate organization with reader membership. Then create a named grant with `access_kind=trial`, `activated_at=null`, `expires_at=null` (first-use trial), or `access_kind=paid` and the approved end date/null after confirmed payment. Revocation sets `revoked_at`. Do not convert trials to paid or extend deadlines without the account owner's instruction. Password setup remains with each user. Confidential guide access is independent and unchanged.
