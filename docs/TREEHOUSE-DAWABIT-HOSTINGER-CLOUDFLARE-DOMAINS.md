# Treehouse Consulting and Dawabit — two-domain routing & protected app plan
**Prepared 17 November 2026 — source of truth: Treehouse Website Change List v5, Parts F/G/R/E.**
**Status:** Domain registration verified in the connected Hostinger *read-only* dashboard; **NO DNS, Cloudflare routes, Access rules or production hostnames changed by this work**. This is a release-ready, security-gated implementation plan, not a record of completed DNS activation.

## Verified Hostinger and Cloudflare account facts

| Domain / service | Verified state | Required destination |
|---|---|---|
| `treehouseconsulting.co.uk` | Active in logged-in Hostinger, renews Nov 2028 | **Corporate primary**: existing Cloudflare Pages `treehouse-consultancy` project; canonical URL / EN and AR routes |
| `dawabit.co` | Active in logged-in Hostinger, renews Nov 2027 | **Brand redirect** to `https://treehouseconsulting.co.uk/dawabit/`, per v5 F2 “other Dawabit names” |
| `treehouseconsultancy.co.uk` | Existing GoDaddy domain / existing Cloudflare DNS and Pages site; old marketing copy still publicly served | **301** redirect, same path and query string, to the new corporate primary **only after** full verification |
| `www.` for both corporate domains | Must verify DNS and TLS | 301 to non-www final canonical |
| `www.dawabit.co` | Requires its own hostname registration and TLS | Same public brand redirect |
| `demo.treehouseconsulting.co.uk` | **Not yet routed** | Separate `dawabit-demo` Worker + **Worker-level Cloudflare Access**; named approved users only |
| `dawabit-demo` current Worker address | Firm says it is unprotected | **MUST NOT publish or link** until protection and workers.dev bypass closure are verified |
| `client1` private project | Separate encrypted original guide supplied by firm; no Access acceptance yet | Separate Cloudflare Pages project and individual-email Access allowlist, no public links |

**Important:** The domain registration records above were visible in Hostinger. The current authoritative nameservers, zone records, DNSSEC, MX, SPF, DKIM, DMARC and domain-validation status **were not visible on the Hostinger domain listing**, so do not assume the zones are already configured correctly.

## Exact target topology

```text
Public / Corporate
treehouseconsulting.co.uk  ───────► Cloudflare Pages: treehouse-consultancy (main after release approval)
www.treehouseconsulting.co.uk ─────► 301 treehouseconsulting.co.uk
treehouseconsultancy.co.uk ────────► 301 same path/query on treehouseconsulting.co.uk
www.treehouseconsultancy.co.uk ────► 301 same path/query on treehouseconsulting.co.uk

Public / Dawabit brand
dawabit.co (+ www) ────────────────► isolated public 301 Worker, to /dawabit/ on corporate site

Restricted / demonstration
demo.treehouseconsulting.co.uk ───► existing dawabit-demo Worker + Worker-level Cloudflare Access
                                    named emails and OTP, gate BEFORE bytes delivered;
                                    disable / protect workers.dev and all previews

Restricted / Client 1
separate private client hostname ─► separate Pages project + email OTP Access on
                                    custom, pages.dev and preview hostnames.
                                    HTML content must remain exact original bytes
```

The `dawabit.co` Worker in `deploy/dawabit-co-redirect/` implements **only the public-domain redirects**, not the real customer application or an unsecured iframe. `/demo/` deliberately points to the **public request-for-demo page**, never the protected demo file. Its `workers_dev` and preview URLs are disabled by default.

## Registrar / DNS migration sequence — DO NOT SKIP

### Gate 0: obtain client sign-offs
- **E2**: firm confirms registered primary domain, domain-account ownership/rights, use of `dawabit.co` as a public redirect, routing/redirect policy, and permission to change NS/DNS.
- **E1**: mailbox `enquiries@treehouseconsulting.co.uk` exists, can send and receive and is actively monitored.
- **E3/E4/E8/E9/E10**: legal/privacy, published security claims, approved demo identity list and method, client login decision, release date and robots/indexing decision.
- No implied permission to publish confidential demo merely because the domain was registered.

### Gate 1: capture DNS and email truth BEFORE ANY CHANGE
For **each** domain in Hostinger and the old domain in GoDaddy/Cloudflare:
1. Record actual authoritative nameservers and their ownership; export DNS zone or take an exact record inventory of A, AAAA, CNAME, MX, TXT (SPF, DKIM, DMARC), CAA, SRV, TLSA, CNAME mail verifications and subdomains.
2. Record whether DNSSEC / DS records are set at the registrar; coordinate safe DNSSEC migration, with explicit rollback procedure.
3. Check who currently hosts `enquiries@` and existing mail; do NOT delete or “reset to default” existing DNS. Validate the actual mail-provider records by name/value/priority.
4. Note existing pages, robots and redirect conditions. Before NS update, stage **all** needed MX/TXT/CAA/custom DNS records in the new Cloudflare zone.
5. Check that Hostinger registrar locks/transfer features and account two-factor settings remain intact. A nameserver switch is **not** a registration transfer.

### Gate 2: add full domains to the correct Cloudflare account
- Add `treehouseconsulting.co.uk` and `dawabit.co` as **separate Cloudflare zones**. For a Pages apex or Worker custom domain, Cloudflare docs require the apex domain to be an active Cloudflare zone using Cloudflare authoritative nameservers.
- Import and manually reconcile DNS and email records **before** changing nameservers at Hostinger. Never copy example nameserver values: use the **unique** two nameservers Cloudflare assigned to each zone.
- Update both registered domains' Hostinger nameservers only after E2 sign-off, record-level parity, and mail continuity checks. Observe propagation, SSL issuance and DS status.
- Preserve GoDaddy/old-zone email and existing DNS until the new production hostname passes smoke tests.

### Gate 3: deploy corporate site first
- Merge the existing draft production PR only after approved client Part E requirements; Pages project stays `treehouse-consultancy` with `main` as production. Do not replace it with a new empty Hostinger hosting site.
- In Cloudflare Workers & Pages > `treehouse-consultancy` > **Custom domains**, attach `treehouseconsulting.co.uk`; attach `www.treehouseconsulting.co.uk` as needed before applying canonical 301.
- Cloudflare Pages must recognise and issue TLS for the custom hostname. DNS alone **without** associating the hostname in Pages can produce a connection error.
- Test `/`, `/ar/`, `/dawabit/`, `/ar/dawabit/`, `/contact/`, mobile, headers, canonical/hreflang, public images and protected links. Verify no old branding, secure forms still gated unless E1/E3.
- Only then make `treehouseconsultancy.co.uk` and `www` redirect every path/query to the new host, preserving locale and existing product-route redirects. Check loop prevention and HTTPS.

### Gate 4: activate public `dawabit.co` redirect
- Worker source: `deploy/dawabit-co-redirect/worker.mjs`; Cloudflare config: `deploy/dawabit-co-redirect/wrangler.toml`.
- Run unit tests `npm test` and inspect the source. **Do not deploy until E2 and corporate hostname verified.**
- After both brand-domain zones and TLS are ready, deploy as independent Worker and add `dawabit.co`, `www.dawabit.co` as its **Custom Domains**. Confirm `workers.dev`/preview disabled, HTTPS and 301s, including Arabic and queries.
- Do **not** use `dawabit.co` as an unsecured replacement app, demo origin, or client-login endpoint. Version 5 directs Dawabit brand domains to the main website's product page.

### Gate 5: separate, PROTECTED demo (firm E8 required)
1. Obtain the firm's exact named email list and Access method. No wildcard/email-domain allowlist.
2. Configure Cloudflare Zero Trust, OTP identity provider and **Worker-level Access** on the existing `dawabit-demo` Worker. Official Cloudflare documentation says Worker-level Access can cover its production/custom/worker.dev/preview hosts, but verify the exact live account policies.
3. Test unauthenticated and unauthorised requests with direct Worker URL before HTML is sent, authorised OTP access, denial after revocation and 14-day prospect access expiry.
4. Add `demo.treehouseconsulting.co.uk` as a **Worker Custom Domain** in the authorised Cloudflare zone. Disable workers.dev public routing or protect it under the same Worker-level Access.
5. Only after gate passes, add the button **Open the demonstration / فتح العرض التوضيحي** below the public request form on `/dawabit/demo/`, opening a separate tab. Never include protected URL in public nav, homepage, sitemap or an iframe. If the Access policy is not verified, keep the button absent.

### Gate 6: independent Client 1
Keep the encrypted guide's separate three-file pack out of GitHub/public Pages. Configure its own Pages and Access policies on **custom, main pages.dev and every preview host**, perform named-email allowlist tests, compare exact SHA-256 and verify its internal password screen. Do not distribute link until complete.

### Gate 7: signed production acceptance
- Verify HTTPS apex/www, 301 path/query preservation, no loop or old product landing, and 404/resolver handling.
- Verify original MX, SPF, DKIM, DMARC, DNSSEC and real send/receive for all firm mailboxes.
- Confirm accessibility and AR RTL pages at 360/390/768/1024; product screen 1 only on product page.
- Confirm live routes don't contain forbidden superseded branding and that protected demo remains inaccessible before Access.
- Keep `noindex, nofollow` until E10 launch.
- Store public launch evidence and restrict private acceptance logs; maintain rollback plan for DNS.
- **Never mark complete based on registrar “Active” alone.**

## Available tool boundary during this preparation
The connected browser in this Chat mode can **read** the already opened Hostinger, Cloudflare and GoDaddy tabs, but it cannot click, type or alter nameservers, DNS, Cloudflare routes or Zero Trust. The connected GitHub tool **can** create/test source changes, which is why the isolated redirect Worker and this plan are committed to staging. A Cloud Browser-capable Work-mode session or separately installed, authorised DNS provider connector is required to execute those graphical DNS/Access actions.

## Current official technical references
- Cloudflare Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Cloudflare Workers custom domains: https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- Cloudflare Access for Workers (worker-level protected origin): https://developers.cloudflare.com/workers/configuration/cloudflare-access/
- Hostinger Cloudflare migration and email record preservation: https://www.hostinger.com/support/4741545-how-to-use-cloudflare-in-hostinger/
- Hostinger DNS edit/export: https://www.hostinger.com/support/1583249-how-to-manage-dns-records-at-hostinger/

**Release action status: Registered domains verified; public routing code prepared; no DNS/domain Access changes performed.**
