# Client 1 — isolated confidential hosting and Cloudflare Access release gate
**Specification:** Dawabit_Client1_Guide_Hosting_Instructions_v2.docx, 17 November 2026.
**Classification:** confidential operational checklist. **Status:** Not deployed / not access-tested by this GitHub change.

## Non-negotiable isolation
- Create a **new** Cloudflare Pages project named `<private-pages-project>` by direct upload. Do **not** add content to the existing `treehouse-consultancy` project or the public GitHub repository.
- Upload **only** the unchanged `site/index.html`, `site/_headers`, `site/robots.txt` at the new project's root. Never upload `checksum.txt`, the private Word instructions, a ZIP pack containing secrets, or the guide to any public site.
- The encrypted HTML is exactly **595,988 bytes**. Expected SHA-256: `<compare-to-private-checksum-file>`. Verify before upload and after authenticated retrieval. Do not edit, reformat, minify, compress or inject scripts.
- Custom hostname: `<firm-approved-private-client-hostname>`. Cloudflare DNS zone is already under the firm's account, but check for any existing record before assignment.
- Keep independent in-page password protection, without requesting or storing its password.
- Do not add the hostname to public navigation, source code, sitemap, SEO metadata or public documentation.

## Mandatory fail-closed access configuration
1. Complete Cloudflare Zero Trust onboarding with the Free plan, under the firm's Cloudflare account.
2. Enable the **One-time PIN** identity provider explicitly. Current Cloudflare documentation notes that One-time PIN is **not automatically added** for new Zero Trust organisations.
3. Obtain **the exact named user email addresses from the firm**. Create a self-hosted Access application matching the entire custom hostname and a specific **Emails** allow list. No “everyone”, wildcard domain, or broad “email domain” rules. Set policy/application session lifetime to **24 hours**.
4. Protect `<private-pages-project>.pages.dev` production hostname as well, with the **same named-email policy**. Never rely solely on a custom-hostname Access application.
5. Turn on **Pages preview-deployment protection** (Workers & Pages > project > Settings > General > Enable access policy). This **does not** automatically protect the project's main `pages.dev` hostname or custom domain. Follow Cloudflare's documented additional Access application / hostname procedure.
6. Verify randomly generated preview URLs, branch aliases, and every known deployment URL. Do not distribute links or enable client access while **any** route serves confidential HTML without Access.
7. Remove access immediately when firm instructs; test revocation. Do not change the final hostname after owner tags are created, because the HTML stores these in browser-local storage by origin.

## Protected-delivery sequence
Because Pages direct upload typically generates an accessible `pages.dev` URL, **do not send the confidential guide until the Access policy protects every delivery hostname**. If the platform cannot establish Access before initial deployment, first deploy a harmless placeholder to obtain all hostnames, configure custom-domain and Pages preview Access, test denied access, then replace the placeholder with the exact original three-file site. Perform an immediate re-test and treat accidental exposure as an incident; do not silently accept a brief public interval.

## Acceptance tests — must be personally observed, never assumed
- [ ] Unauthenticated private window: custom domain redirects to Cloudflare Access login, no HTML sent.
- [ ] Named allowed email: one-time code arrives; entered OTP grants access to **the guide's own password screen**, not its contents.
- [ ] Unlisted email: denied. A fake “code sent” screen does not count as access; verify refusal of the actual request.
- [ ] Main `pages.dev`: same Access gate, no HTML leaked.
- [ ] Deployment and preview aliases: same protection.
- [ ] Response headers: `X-Robots-Tag`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Cache-Control` from original `_headers` file.
- [ ] Authenticated downloaded raw `index.html`: SHA-256 identical to the supplied checksum.
- [ ] Android phone and iPhone: same Access and password-screen result.
- [ ] Public website and sitemap: no link, mention, or accidental copy of client1 address.
- [ ] Access policy screenshots, approved-email list and timestamped test evidence recorded for client.

**Never mark this deployment complete without a verified allow list and all-host access tests.**

## References for operational validation
- Client's own *Dawabit Client 1 Requirements Guide Hosting Instructions v2*, sections 1–7.
- https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain
- https://developers.cloudflare.com/pages/configuration/preview-deployments/#customize-preview-deployments-access
- https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/
- https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/
