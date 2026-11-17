# Treehouse Consulting — Dawabit by Treehouse v5 deployment runbook

**Status: staging only. Last reconciled: 17 November 2026.**
**Controlling specification:** `Treehouse_Website_Change_List_v5.docx` and the developer asset pack v5, dated 17 November 2026. All earlier instructions are superseded.

> Do not treat a successful GitHub Action or a publicly responding URL as permission to launch. The firm must confirm the decisions in Part E, and confidential resources must be access-controlled **before** their HTML is served.

## 1. Architecture and current source of truth

- Repository: `visionstore1189-arch/treehouse-consultancy`.
- Production branch: `main`, connected to Cloudflare Pages project `treehouse-consultancy`. **Do not force push, overwrite or merge to production until the firm authorises release.**
- Review changes on `dawabit-v5-release-hardening-20261117` in draft PR **#12**, targeting `dawabit-v5-client-rebrand-staging-2026`.
- Next.js is a **static export** (`npm run build` generates `out/`). Cloudflare Pages Functions in `functions/` are built separately. Use Node.js 24 and the committed lockfile.
- The approved product is **Dawabit by Treehouse** / **ضوابط من تري هاوس**. Use only the verified official logos and colours navy `#0B1F3A`, green `#0B8457`, mint `#2FCB8B`.
- The firm’s proposed primary website is `treehouseconsulting.co.uk`; the currently deployed website uses `treehouseconsultancy.co.uk`. Registration, DNS migration, primary-domain and redirect choices require **E2 approval**. Preserve business email records throughout.

## 2. Public official assets — installed, awaiting final visual acceptance

**Completed on staging**: all 53 official original public assets are now in GitHub, including 16 SVG logos/favicons and 37 PNG/JPG files. The English/Arabic Overview screenshots, verdict panels, explainer graphics, favicon PNGs and updated OpenGraph social image are present at the exact paths referenced by the site. The 37 new binaries were compared against their original byte-for-byte Git object hashes; zero mismatches. Rendering flags are **enabled** in the staged source.

The prior manual ZIP upload workflow is **not needed** for this v5 delivery and must not be triggered a second time. To verify in a fresh staging checkout:

```sh
npm ci
npm run check:assets
npm run typecheck
npm test
npm run build
npm run cf:build
npm run check:links
```

Review the six real mobile screenshot artifacts from the latest staging QA workflow. Confirm official images render with the right language and natural aspect ratios. Confidential screenshots 2–4, guide HTML, live demo, animated product tour and sample report remain excluded from this site's public directory.

**Original public images in GitHub are not the same as a deployed live website.** Production release still requires the firm's Part E approvals and secured confidential destinations.

## 3. Cloudflare Pages staging and production

The existing Pages project should retain its Git integration and its `main` production branch. Do not accidentally create a second public corporate site or deploy the confidential Client 1 material to this project.

Build settings:

| Setting | Value |
| --- | --- |
| Framework | Next.js static export |
| Root directory | Repository root |
| Build command | `npm ci && npm run build` |
| Output directory | `out` |
| Node version | `24` |
| Production branch | `main` |
| Public forms | Disabled until E1/E3 and full server configuration |
| Indexing | Noindex/robots blocked until approved launch date E10 |

Cloudflare Pages Functions must remain available for `/api/*` routes. A simple static direct-upload of `out/` alone is **not** a complete replacement for Git-integrated Pages + Functions.

**Safe staging review:** use a Cloudflare Pages preview deployment only with non-confidential content, robots/noindex, no working customer login, no open sample report and no unprotected demo URL. Do not represent staging as production.

## 4. Domain migration — hold until firm authorisation (E2)

1. Confirm ownership and DNS state for both corporate domains. Record all current MX, SPF, DKIM, DMARC, DNSSEC, subdomain, verification and service records; back up the zone.
2. Verify that the intended primary domain has been registered, is in the correct Cloudflare account and can issue TLS certificates.
3. Upon written approval, attach the primary root domain and HTTPS to the existing corporate Pages project. Use correct canonical URLs, `hreflang`, sitemap and OpenGraph asset hostnames.
4. Only after the new hostname is fully verified, configure permanent same-path redirects from the previous root domain and redirects for both `www` versions. Preserve query strings, language paths and working mail.
5. Keep versioned legacy product-route redirects to the new `/dawabit/` routes; ensure no redirect loops.
6. Test old and new URLs with `curl -I`, canonical pages, multilingual routes and both mobile widths. No fabricated DNS propagation or TLS-ready claims.

Never alter production DNS based on this runbook alone.

## 5. Contact/demo/coverage enquiries — fail closed until E1/E3

The owner has specified `enquiries@treehouseconsulting.co.uk` as the destination. That **does not establish that the mailbox is created or monitored**. Until its operational status is confirmed, present it as a clickable `mailto:` fallback; do not pretend form delivery succeeded.

After the firm supplies an approved privacy policy, mailbox verification and retention facts, the Pages Function `functions/api/enquiry.ts` supports an approved D1 + Turnstile + Resend flow.

Before activation confirm all of:
- Cloudflare D1 `ENQUIRIES` bound to the correct environment, with migrations applied.
- `FORMS_ENABLED=true` and `PRIVACY_APPROVED=true` **only after authorisation**.
- Approved `PRIVACY_VERSION` matching the actual bilingual notice.
- Restrictive `ALLOWED_ORIGINS`, `TURNSTILE_SECRET_KEY`, `TURNSTILE_HOSTNAMES`, strong `RATE_LIMIT_SALT`, `RESEND_API_KEY`, verified `MAIL_FROM`, monitored `MAIL_TO` and approved `RETENTION_DAYS`.
- Build-time public Turnstile key on the correct production domain.
- All three page forms tested end-to-end for EN and AR, with a real delivered email, stored consent version, inaccessible administrative data and controlled cleanup.

Keep provider secrets in Cloudflare runtime secrets. Never put them in code, commits or browser-visible build variables.

## 6. Confidential interactive demonstration — protection first (E8)

The firm's independently deployed `dawabit-demo` Worker currently requires **server-enforced** access protection and a firm-approved invite list or method. Search engine blocking alone is **not an access control**.

- Configure Zero Trust and the authorised email-code or other approved identity method.
- Assign a firm-approved custom domain only after E2/E8.
- Protect the full origin and every bypass hostname/preview variant.
- Prove unauthenticated rejection **before HTML or files are delivered**, authorised access, unauthorised denial, and revocation.
- Do not expose the demo address in the public product menu or sitemap until this passes.

Do not move the private demonstration, product tour, screenshots 2–4 or sample assessment report into the corporate `public/` directory.

## 7. Client 1 encrypted HTML guide — separate access-controlled Pages project

This is **not** a page of the corporate site. The validated, immutable HTML is a separate three-file site containing `index.html`, `_headers`, `robots.txt`; the original HTML has its own password screen. Do not edit or minify it.

- Configure a dedicated Cloudflare Pages project using a harmless placeholder first, where necessary to establish protection.
- Create a custom-domain Access application using **only named firm-approved email addresses**, with email one-time-code sign-in and a 24-hour session.
- Independently protect the main `pages.dev` hostname and all deployment/preview aliases. Preview Access alone does not cover all origins.
- Only after verified fail-closed Access gates, deploy the exact original three files. Keep the private document password with the client; test access only as far as its password screen.
- Preserve no-store, noindex, nosniff, frame-deny and referrer headers from the original `_headers`. Check byte integrity against the private checksum, off-repository.
- Verify unlisted emails cannot fetch the document, including direct origin and asset URLs. Do not publish the confidential hostname in a public GitHub repository.

See `docs/CLIENT1-CLOUDFLARE-ACCESS-RELEASE-GATE.md`. **Do not perform the confidential upload in an unprotected project**, even momentarily.

## 8. Editorial and client approval gates (v5 Part E)

Required confirmations before production sign-off:
- E1: Enquiry mailbox exists, receives mail and is monitored.
- E2: Domain registration, primary URL, Cloudflare zone and corporate redirects.
- E3: Approved privacy, terms and cookie notices.
- E4: Confirmed hosting location/provider, data retention and model-training disclosure.
- E5: Additional regulator availability claims beyond financial-services coverage.
- E6: Team experience, past regulator positions, figures or performance claims.
- E7: Native Arabic editorial and official sector classification review.
- E8: Named demo users, authentication method and policy.
- E9: Whether public client-login/recovery pages should remain.
- E10: Authorised production launch date and indexing change.

Do not guess any missing approval, bypass the client's hold instruction or expose client private material.

## 9. Final release tests and evidence

- Run `npm run typecheck && npm test && npm run build && npm run cf:build && npm run check:links && npm run check:assets`.
- Run `node scripts/qa-dawabit-responsive.cjs` against the **actual staging build**: all 19 published routes in EN and AR at 360, 390, 768 and 1024 pixels (152 combinations). Verify text overflow, navigation, focus, accessibility, image asset loading, copy, canonical links and noindex.
- Capture dated **390px phone screenshots of Home, Dawabit product and Contact in both languages** after the approved assets are installed.
- Confirm public product screenshot **Overview screen 1 only on the product page**. All other demo screenshots are private.
- Inspect the live site (not just local CI) for legacy product words, redirect correctness and actual HTTPS/canonical behaviour.
- Check unauthenticated requests and intentionally denied users against the demo and Client 1 project; preserve evidence of Access policies and bypass-host tests.
- Perform a real inbox delivery test before enabling production forms. Verify final legal texts, retained email DNS and absence of leaked credentials.
- Keep `main` and production untouched until the client's release approval. When approved and after checks, merge reviewed changes, monitor deployment, perform full remote smoke testing and retain a tested rollback path.

## 10. Current evidence and truthful status

On 17 November 2026, staging CI passed **33 regression tests** and **152/152 responsive cases**. All 16 official SVG masters matched the uploaded originals byte-for-byte. The **remaining 37 PNG/JPG public files are not yet present in the staging repository**, so the public image activation flags are still false.

The connected Cloudflare account showed the existing corporate Pages project and the separate `dawabit-demo` Worker; its dashboard still offered **Set up Zero Trust**. This was a **read-only inspection**, not a successful security configuration. The public corporate site still displayed superseded branding.

**Do not claim that the v5 site is launched, the 37 raster images are published, enquiries are operational, or confidential guides are Access-protected until each has been independently verified.**
