# Dawabit by Treehouse — Client v5 re-audit and completion register
**17 November 2026 · controlling source: `Treehouse_Website_Change_List_v5.docx` (17 pages), official Dawabit Developer Pack v5 and `Dawabit_Client1_Guide_Hosting_Instructions_v2.docx` (3 pages).**

This supersedes the stale *status* entries in `docs/DAWABIT-V5-COMPLETION-AUDIT.md` and any earlier v1–v4 product plans. The v5 document says **do not use or publish the old product names or assets**. Historical redirects in `public/_redirects` remain necessary to support visitors with old bookmarks; they are not endorsement of the old brand.

## Verified work in the current staging source

| Client ref | Implementation / verified evidence | Status |
|---|---|---|
| R1–R3 | Dawabit by Treehouse / ضوابط من تري هاوس, official naming, endorsement and meaning | Implemented in staging; AR specialist review E7 remains |
| R4 | 301 old URL paths to same Dawabit path, EN and AR; sitemap/canonical built for new Treehouse primary | Code ready, remote production redirect acceptance pending E2 |
| R5 | Original approved logos, SVG/favicon, graphics and screen 1 only: 53 exact public assets | Installed in staging, public assets verified by current build |
| R6 | Automated export checks for legacy brand **in rendered site** (redirect files necessarily contain old URLs) | Must re-run after production domain binding |
| F1 | Treehouse Consulting firm name across public pages | Staging complete |
| F2 | `treehouseconsulting.co.uk` proposed primary, `treehouseconsultancy.co.uk` proposed path-preserving 301 | New .co.uk domain **registered** in Hostinger. NOT attached to production Pages; E2 approval, DNS/SSL/email audit remain |
| F2 Dawabit | Hostinger `dawabit.co` registered, isolated public brand Worker routing it to corporate `/dawabit/` | Worker code + tests staged, **NOT deployed/attached** |
| F3 | Robots and response noindex remain in place | Correct while awaiting E10 |
| A1 | Contact, demo request and coverage form fallback to correct `mailto:` | Public fallback ready; submission blocked until E1 monitored mailbox + E3 approved notices + D1/Turnstile/Resend configured |
| A2–A3 | No advertised login to a non-existent subscription app | Public login/offline, decision E9 pending; Supabase groundwork is **not** a complete production app |
| A4 | No fabricated approved legal policy; neutral placeholders and legal links exist | E3 full bilingual legal notices needed before forms or live launch |
| A5 | Empty insights removed/redirected, awaiting three reviewed articles | Correct hold |
| A6 + N7 | EN/AR footer legal routes, trademark line and exact © 2026 copy | Corrected duplicated copyright in this recheck |
| A7–A8 | 5-step graphic and Evidence Chain panel beside Review step | Exact public v5 assets in staging |
| A9 + B1–B10 | Static worked examples and verdict panels at prescribed pages; only product screen 1 public | Implemented; private sample PDF, tour, screens 2–4 and HTML **not** in corporate public folder |
| A10 + S1–S3 | Regulated organisations positioning, 10 featured and 9 additional ISIC4 sectors, financial regulator table unchanged | Implemented; E5 status approval and E7 Arabic review pending |
| A11 | QA suite checks 360/390/768/1024, EN/AR; six 390px Home, Product and Contact screenshots collected | Repeat QA on current commit and on eventual production host |
| G1 | Public request page has hidden, exact-host HTTPS new-tab demo button below the request form | **Prepared; disabled until demo Worker Access is confirmed and E2/E8 approved** |
| G2 | Server-side Worker-level Cloudflare Access before response bytes, allowlist and logs | NOT CONFIGURED. Public search-engine blocking is not sufficient |
| G3 | Sensitive app screens and sample PDF private only | Corporate public build restriction implemented |
| G4 | Demo request fields exactly name, organisation, work email, sector, country, message; message required; exact EN confirmation | Corrected in this recheck; backend still deliberately inactive pending E1/E3 |
| N1 | Bilingual six-part Security/data handling page, menu, footer, SEO, product/demo links | **Built, gated off** unless E4 approved provider/country (EN+AR), retention (EN+AR), Saudi hosting and model-training facts are provided; no unapproved claims exported |
| N2 | Client-supplied human-reviewed AI explanation | On How it works page |
| N3 | Library maintenance statement | Date of last actual review not supplied; do not invent or display a fake date |
| N4–N5 | Buyer roles, engagement options | In product page, EN/AR |
| N6 | FAQ EN/AR with E4-safe security response | Ready; links to N1 only once published |
| N8 | Menu and sitemap | All publicly publishable pages; security page intentionally absent until E4 |
| Client 1 | Separate Pages project only, client guide encrypted unchanged, OTP email allowlist, default + preview hostname coverage | NOT RELEASED. No approved user emails, Access project or acceptance evidence; keep original HTML out of public GitHub/site |

## Newly resolved in this recheck

1. **G4 exact demo fields** — removed extra required role, regulator and phone from the demo request; client-required message is mandatory. Contact and coverage retain their appropriate fields and backend schema checks.
2. **G4 response** — success message now matches the client's wording; consent and server-side anti-spam remain required when the company activates forms.
3. **N1 security page** — implemented all six sections, bilingual responsive design, source-specific body copy and URL/metadata; hidden by validated E4 build-time gate. The route does not exist in export, nav, or sitemap by default.
4. **A6/N7 footer** — removed second copyright/year statement while preserving the client's precise trade-mark text.
5. **Environment integrity** — replaced an obsolete `.env.example` referencing a non-primary domain and retired product. Current example documents the client signoff gates and uses no secrets.
6. **Defence-in-depth regression tests** — added assertions for the exact six demo fields, hidden N1 route, public-only image list, metadata and retired environment keys.

## Work that cannot be completed without firm answers or account write access

**Firm E1–E10 sign-offs (source Part E):**

- E1: confirm `enquiries@treehouseconsulting.co.uk` exists, receives email and is monitored.
- E2: confirm the firm authorises new primary domain, old-domain forwarding, `dawabit.co` forwarding and full Cloudflare/DNS routing, while preserving existing mail.
- E3: approved EN/AR privacy notice, website terms and cookie policy; only then activate forms.
- E4: confirmed actual hosting location/provider, retention, model-training status and Saudi hosting arrangements. The N1 gate requires every fact to avoid unsupported statements.
- E5: confirmed non-financial regulator coverage/status claims.
- E6: substantiated figures and team experience claims; three-figure About band remains omitted.
- E7: native-speaker check of new Arabic material and ISIC4 terms.
- E8: **exact named demo email allowlist**, policy method and Access acceptance.
- E9: whether to enable customer login and full app integration. Demo HTML/Supabase Auth foundation do **not** constitute a full production assessment backend.
- E10: approved production release date and explicit removal of indexing restrictions.

**Additional private Client 1 dependencies:** the firm must provide its separate allowed-user email list, and someone with Cloudflare write permissions must create the `dawabit-client1` Pages project + immutable host `client1.treehouseconsultancy.co.uk` and secure all alternate `pages.dev` and preview URLs with named-email OTP Access BEFORE uploading the guide. The source v2 explicitly forbids modification, minification, iframe or cross-client access, and requires original SHA-256 matching. **Do not move Client 1 to the new corporate domain without a separate client change request**: the guide's browser-saved owner tags are origin-dependent.

## Current deployment conditions

The Browser connector for logged-in Hostinger and Cloudflare in this chat can read tabs but **cannot click, type, create DNS zones, edit records, set Access policies or upload Pages projects**. GitHub can change and test staging source. No DNS, nameserver, MX, DKIM, SPF, DMARC or DS/DNSSEC change was executed during this audit; no unprotected client guide was uploaded. The corporate production PR #11 remains draft.

**Exact release acceptance sequence:**

1. GitHub staging: all tests, typecheck, Cloudflare Functions, static export, link and asset tests pass on same head SHA.
2. Browser QA: 176 bilingual route/viewport cases (or more when N1 is approved), six 390px screenshots, zero overflow, and no sensitive images in static export.
3. Client E1–E10 signoff and regulatory/legal copy acceptance.
4. DNS zone/record/email backup, correct Cloudflare activation and TLS on new domain, same-path redirects old website, isolated `dawabit.co` redirect.
5. Worker-level Access on demo BEFORE any public link. Test anonymous 403/login before body, one approved OTP, denied unlisted email, revoked user, workers.dev and preview origins; check Access logs.
6. Separate Client 1 Pages Project with identical full-origin Access protection, actual checksum and password-screen acceptance.
7. Deploy corporate v5 to `main` only after firm approval, confirm production URLs and live real-email delivery, keep noindex until E10.
8. Re-check all redirects, sitemap, canonicals, alt texts, official assets, translations, contrast and 390px pages in production; document rollback.

**Do not report that the corporate domain or protected Dawabit app is launched solely because GitHub/Cloudflare staging preview is green.**
