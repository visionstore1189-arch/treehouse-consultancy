# Cloudflare Pages deployment

This project is compatible with Cloudflare Pages Free using Next.js `output: 'export'`. The export is static HTML, CSS and JavaScript in `out/`. The `functions/` directory is compiled separately by Cloudflare Pages. Do not deploy with a Next.js server adapter or use the OpenNext/Workers SSR preset for this project.

## Initial free deployment

1. Follow `GITHUB.md` to place this directory at the root of a private repository. Commit the lockfile. Keep the GitHub repository private; Pages serves the compiled public website separately.
2. In Cloudflare, choose Workers & Pages → create a **Pages** project → connect the Git repository. Choose the private repository and `main` production branch.
3. Set framework preset to **Next.js (Static HTML Export)**, or use no preset with the following settings:

| Setting | Value |
| --- | --- |
| Root directory | Repository root |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `24` via `NODE_VERSION` |
| Production branch | `main` |
| Build-time site URL | `NEXT_PUBLIC_SITE_URL=https://<assigned-project>.pages.dev` initially |
| Forms | `NEXT_PUBLIC_FORMS_ENABLED=false` |
| Mutabiq application URL | `NEXT_PUBLIC_MUTABIQ_APP_URL=https://app.treehouseconsultancy.com` |

4. Build the site. Pages will compile the repository-root `functions/` directory. The browser-upload dashboard path is not suitable for this combined static + Functions deployment; use Git integration or Wrangler.
5. Check the assigned HTTPS URL and every key route, including `/ar/`, `/ar/mutabiq/coverage/` and a service detail page. Confirm that `/api/enquiry` rejects unconfigured submissions with 503.
6. Set Preview variables independently. Leave forms off on unapproved preview domains, use a separate test database/inbox when needed, and protect preview deployments before putting sensitive drafts there.

For a CLI deployment after selecting the real project name:

```sh
npx wrangler login
npm ci
npm run build
npx wrangler pages deploy out --project-name YOUR_PAGES_PROJECT
```

Run this from the project root so Wrangler can locate `functions/`. Set `name` in `wrangler.toml` to the real Pages project name. Keep `out/` as `pages_build_output_dir`.

## Activate the enquiry backend

Do this only after Treehouse approves the notices and data handling arrangements. There is no hard-coded recipient or test address receiving enquiries.

1. Create a Cloudflare D1 database:

```sh
npx wrangler d1 create treehouse-enquiries
```

2. Add the returned identifier to `wrangler.toml`. Identifiers are not secrets, but use the actual account output:

```toml
[[d1_databases]]
binding = "ENQUIRIES"
database_name = "treehouse-enquiries"
database_id = "REPLACE_WITH_RETURNED_DATABASE_ID"
migrations_dir = "migrations"
```

Apply the schema and confirm the same D1 binding on the Pages project. Configure a separate database for preview if preview forms are needed.

```sh
npx wrangler d1 migrations apply treehouse-enquiries --remote
```

3. Create a free Turnstile widget. Allow only the actual site hostnames. Store the public site key as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in build variables. Store the secret as `TURNSTILE_SECRET_KEY` in Pages runtime secrets. The Function verifies success, hostname and action (`contact`, `demo`, `coverage`); missing or stale tokens are rejected.
4. Create a Resend Free account. Verify an owned sending domain with its supplied DNS records. Configure a monitored destination inbox. Disable open/click tracking. Keep the provider on its free plan. Set `RESEND_API_KEY` as a runtime secret. The API key is never part of the static build.
5. Obtain approved bilingual privacy, cookie and terms text, company details, retention period, processors and transfer arrangements. Replace the pending legal copy. Change `privacyVersion` in `src/content/forms.ts` to an approved version such as `2026-11-v1` and match `PRIVACY_VERSION` server-side.
6. Set the runtime values below in **Production** and separately in **Preview**. Do not place secrets in `NEXT_PUBLIC_*` variables.

| Runtime value | Requirement |
| --- | --- |
| `FORMS_ENABLED` | `true` only when the full backend is ready |
| `PRIVACY_APPROVED` | `true` after client approval |
| `PRIVACY_VERSION` | Same reviewed identifier as `src/content/forms.ts`; must not start with `pending` |
| `ALLOWED_ORIGINS` | Comma-separated exact origins, e.g. `https://treehouseconsultancy.com`; no trailing slash |
| `TURNSTILE_SECRET_KEY` | Secret widget key |
| `TURNSTILE_HOSTNAMES` | Comma-separated exact hostnames; no scheme |
| `RATE_LIMIT_SALT` | Random secret of at least 32 characters; generate locally and store securely |
| `RESEND_API_KEY` | Secret email provider key |
| `MAIL_FROM` | Verified sender, e.g. `Treehouse <enquiries@OWNED_DOMAIN>` |
| `MAIL_TO` | Monitored inbox or comma-separated approved inboxes |
| `RETENTION_DAYS` | Client-approved integer from 1 to 365 |
| `ENQUIRIES` | D1 binding, not a text variable |

7. Rebuild with `NEXT_PUBLIC_FORMS_ENABLED=true` and the correct public Turnstile site key. Changing build-time values requires a rebuild; runtime values require the Pages deployment to pick up its configuration.
8. Submit an authorised test enquiry from the final domain. Verify all three forms, bilingual confirmation, D1 consent text/timestamp/version, and receipt in the monitored inbox. Confirm expiry, rate limits and bad tokens. Never use provider test credentials for a production launch.

## Submission and recovery behaviour

The Function rejects other methods, cross-origin requests, oversized JSON, missing fields, false consent, honeypots, stale notice versions, failed Turnstile verification and excessive requests. It permits five attempts per IP hash per ten-minute bucket. The IP itself is not stored in D1; Turnstile receives it for security verification. A salted hash is stored temporarily for rate limiting.

A valid request is saved before email delivery is attempted. HTTP 201 means the record was stored and the provider accepted the notification; it is not proof that the final mailbox received it. HTTP 202 means stored with delayed/failed notification. The interface explicitly tells the visitor not to resubmit. Provider idempotency is keyed to the saved reference. Ambiguous client-side network failures may still require operator reconciliation.

Monitor `email_status IN ('pending','failed')` in D1. No automatic retry job or administrative dashboard has been provisioned. Until one is approved and connected, reconcile those records manually in the restricted Cloudflare dashboard and contact the enquirer from the monitored inbox. Do not expose D1 or add a public “all enquiries” endpoint.

The handler prunes expired rate counters and submissions older than `RETENTION_DAYS` after successful enquiries. This is opportunistic cleanup, not a guaranteed daily schedule. Configure an approved daily maintenance job before live collection if strict deletion deadlines require it. Apply matching retention to provider logs, inboxes and backups. Confirm D1 residency/processor terms and international transfers with the client's adviser before storing personal data.

## Custom domains

The free `pages.dev` URL works without buying a domain. Connect an existing domain as follows:

1. Confirm client ownership of `treehouseconsultancy.com`. Add the zone to the same Cloudflare account and use the Free plan.
2. Before changing nameservers, copy and verify all existing DNS records, especially MX, SPF, DKIM and DMARC. Preserve existing mail and the `app` host.
3. For the apex domain, use the Cloudflare-provided nameservers at the registrar. In Pages → Custom domains, add `treehouseconsultancy.com` and complete the guided binding. Cloudflare provisions the required record and TLS certificate. Wait until certificate status is active.
4. Add `www.treehouseconsultancy.com`. Configure a permanent redirect from `www` to the apex, preserving the request path and query string. Do not redirect the `app` subdomain.
5. Rebuild with `NEXT_PUBLIC_SITE_URL=https://treehouseconsultancy.com`. Update allowed form origins, Turnstile hostname settings and verified email sender DNS as needed.
6. If the client owns `treehouseconsultancy.co.uk`, place it on Cloudflare and add a host-specific permanent **301** redirect to `https://treehouseconsultancy.com/uk/`. Inventory any historical URLs and map them individually if necessary. The requested market root is `/uk/`; there are no `/uk/services/…` routes to redirect blindly to.
7. Leave `app.treehouseconsultancy.com` bound to the client-owned application and its own security controls. Do not point it at this public export.
8. Test HTTPS, apex/www redirects, `.co.uk` 301, Arabic deep links, canonical/hreflang tags and the separate application host.

Register a domain in Pages before creating a standalone CNAME. A subdomain can use an external DNS provider via CNAME; apex Pages hosting requires the Cloudflare zone/nameserver arrangement. See the official domain guide below.

## Budget boundaries and operations

As checked on 15 November 2026, Pages Free includes 500 builds/month and a 20,000-file site limit. Static asset requests are free. Pages Functions share the Workers Free allowance of 100,000 requests/day across the account. D1 Free includes 5 million rows read/day, 100,000 rows written/day and 5 GB total storage, with additional per-database limits. Resend Free lists 3,000 emails/month and 100/day. Turnstile has a free plan. Check account-specific limits before activation; this project never selects a paid upgrade automatically.

Use Git history and Pages deployment rollback for the public website. Establish daily database backup/export and a restore drill before enquiries go live. D1 Time Travel is useful but is not a configured, client-owned daily export policy. Uptime alerts, backup retention, named operators and an incident process remain operational dependencies. Do not claim an uptime SLA or daily backup job has been purchased or enabled.

## Official references

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Cloudflare static Next.js deployment](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Pages bindings](https://developers.cloudflare.com/pages/functions/bindings/)
- [Turnstile server verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Pages Functions pricing](https://developers.cloudflare.com/pages/functions/pricing/)
- [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/)
- [Turnstile plans](https://developers.cloudflare.com/turnstile/plans/)
- [Resend free plan](https://resend.com/pricing)
- [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
