# Dawabit client account staging

The user explicitly requested restoration of a separate Supabase email/password login on 17 November 2026. This supersedes the previous hidden-login default for this branch only.

English and Arabic sign-in, recovery, first-password setup and account pages use the existing Cloudflare authentication endpoints. Cookies remain HttpOnly, Secure and same-origin. Supabase verifies credentials; active organisation membership is required before login establishes a browser session. No self-signup UI, private document bytes, passwords or privileged keys are added.

The confidential Client 1 guide is a separate deployment behind Cloudflare Access and its own unchanged document password. Website login alone grants no guide or application access. The supplied hosting pack does not contain an embeddable complete Dawabit application.

Before inviting the first user: confirm the exact approved identity privately, set exact canonical callback URLs, configure membership, confirm email delivery, and have the user set their own password. The agent must not choose or enter the user's new password in the browser. Verify real sign-in, denial for nonmembers, recovery and logout before production acceptance.

## Interactive demonstration

The original v5 developer pack also contains a self-contained interactive demonstration. This is distinct from the encrypted Client 1 guide. Its original HTML is held in `dawabit_demo_assets`, not in public assets or Git. `dawabit_demo_grants` provides expiring per-user access; both tables enforce RLS and expose no anonymous read or client write permission. The asset policy additionally requires active organization membership.

`GET /api/auth/demo` validates the Supabase session, uses that user's token for the RLS query and verifies the original SHA-256 before returning any HTML. Responses are private/no-store/no-transform, noindex and sandboxed. The workspace embeds it only when the server reports an active grant. The iframe permits scripts, printing and downloads without same-origin privileges or network connections. No subscription is invented to enable demonstration access. The supplied "Demo mode, illustrative data" labels remain intact. This demonstrates the supplied sample workflow, rather than performing live regulatory assessments.
