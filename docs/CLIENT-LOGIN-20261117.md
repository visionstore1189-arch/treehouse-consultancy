# Dawabit client account staging

The user explicitly requested restoration of a separate Supabase email/password login on 17 November 2026. This supersedes the previous hidden-login default for this branch only.

English and Arabic sign-in, recovery, first-password setup and account pages use the existing Cloudflare authentication endpoints. Cookies remain HttpOnly, Secure and same-origin. Supabase verifies credentials; active organisation membership is required before login establishes a browser session. No self-signup UI, private document bytes, passwords or privileged keys are added.

The confidential Client 1 guide is a separate deployment behind Cloudflare Access and its own unchanged document password. Website login alone grants no guide or application access. The supplied hosting pack does not contain an embeddable complete Dawabit application.

Before inviting the first user: confirm the exact approved identity privately, set exact canonical callback URLs, configure membership, confirm email delivery, and have the user set their own password. The agent must not choose or enter the user's new password in the browser. Verify real sign-in, denial for nonmembers, recovery and logout before production acceptance.
