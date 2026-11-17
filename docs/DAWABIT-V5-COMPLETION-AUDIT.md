# Dawabit by Treehouse — v5 implementation, release and dependency audit
**Status:** 17 November 2026 · Staging-only · Not client launch approval

This document records what can be verified from the working GitHub branch, the client's Website Change List v5 (17 November 2026), the v5 asset pack manifest, and the separate Client 1 Requirements Guide Hosting Instructions v2. It is **not** a claim that the live Cloudflare website has been upgraded.

## Scope and source hierarchy

1. Governing specification: **Treehouse_Website_Change_List_v5.docx**. It supersedes all TIBQA/Mutabiq/v1–v4 documents.
2. Official assets: **Dawabit_Developer_Pack_v5**, including logo masters, screens, graphics, demo and restricted sample report. Do not redraw official imagery.
3. Separate confidential project: **Dawabit_Client1_Guide_Hosting_Instructions_v2.docx**. Client 1 access must never inherit the public website or main Dawabit application permissions.
4. Acceptance: bilingual content, correct source attribution, protected demo, intended domain routing, zero retired brand names in public render, 360/390/768/1024 responsive tests and screenshot evidence.

## Item-by-item release matrix

| Ref | Requirement | GitHub staging | Release gate / evidence |
| --- | --- | --- | --- |
| R1–R3 | Final Dawabit by Treehouse/ضوابط naming and meaning | Implemented in public-facing source; one Arabic SEO team claim corrected in hardening | Native-speaker Arabic editorial review; scan public build again |
| R4 | Retired /tibqa/, /mutabiq/ and Arabic URLs → /dawabit/ by 301 | `public/_redirects` staged | Test HTTP redirects on final Cloudflare domain |
| R5 | Exact official English/Arabic SVG marks, navy/green/mint | 17 official SVG/master/favicon files validated by build | PNG favicon variants/social card and actual screenshot/panel binaries still need installation |
| R6 | No retired names in site text, image descriptions, metadata and sitemap | Static export has automated retired-name checks | Recheck all launch artifacts, screenshots and production URLs |
| F1 | Firm called Treehouse Consulting, not Consultancy | Staged | Final editorial review |
| F2 | Primary `treehouseconsulting.co.uk`, secondary `treehouseconsultancy.co.uk`, www redirects | Primary canonical/hreflang/sitemap staged; old domain attached to existing Cloudflare Pages | Company registration, Cloudflare custom domain, path-preserving 301 redirects, TLS and email preservation; **do not alter without confirmation** |
| F3 | Draft noindex and robots block | Kept on | Only remove after launch approval |
| A1 | Enquiry forms, monitored recipient | `mailto:enquiries@treehouseconsulting.co.uk` fallback present; submissions disabled | Confirm actual mailbox, approved privacy/legal notices, spam protection, form delivery and log/retention controls |
| A2–A3 | Customer login decision | Customer login hidden, auth backend isolated | E9 company decision; do not advertise an unfinished login |
| A4 | Privacy/terms/cookies | Unapproved placeholder routes unpublished | Final approved bilingual legal text and company details |
| A5 | Insights page | Unpublished until meaningful articles exist | Three client-approved articles |
| A6 | Footer legal links/trade mark | Trade mark/disclaimer present | Publish legal links when their approved pages exist; do not create broken or fake notices |
| A7–A8 | Five-step method, evidence chain next to step 04 | Text structure staged; conceptual fallback only | Original Evidence Chain and How It Works Strip graphics must be installed |
| A9 | Verdict graphics used once, not duplicated | Static explanatory fallback and deliberate content gates | Replace with precise original panels, visually review |
| A10, S1–S3 | All-sector messaging and 19 ISIC4 sections | English/Arabic copy and sectors staged | E5 regulator status approval and E7 native Arabic classification review |
| A11 | Mobile and tablet test at 360/390/768/1024, both languages | Automated 14-route × 2-locale × 4-width = 112-case browser test in release-hardening workflow; screenshot artifacts | Repeat after official image binaries, legal approvals and final deployment |
| G1–G2 | Private demo custom domain and server-side access | Existing Worker demo is separate; **no public link in staged site** | Assign authorised custom domain; enforce Access/Worker gate before serving bytes; remove/bind default Workers URL |
| G3 | Public screen 1 only; screens 2–4, tour, interactive demo, PDF behind protection | Public detailed screens, product tour and PDF excluded | Verify all alternative URLs, redirects, preview domains and access policies |
| G4 | Tailored demo request form and agreed response text | Request page staged, enquiries disabled | E1 monitored inbox, E3 legal and anti-spam backend |
| B1–B10 | Prescribed v5 visual placement, bilingual originals | File manifest and clearly labelled editorial fallbacks staged | Install original overview and 14 EN/AR panel/strip paths; check file hashes, dimensions, contrast, captions; do not activate missing files |
| N1 | Security and data handling page | Withheld from sitemap/public route | E4 hosting, encryption, retention, AI-training and legal approvals; no bracketed placeholders |
| N2 | Human-reviewed AI explanation | Staged in both languages | Editorial review; preserve limitation that AI does not replace professional judgement |
| N3 | Regulatory library review date | No invented date | Firm must provide actual date |
| N4–N5 | Audience roles and engagement options | Staged | Review market/offer wording |
| N6–N8 | FAQ, trade mark, menu and sitemap | FAQ/trade mark staged; menu excludes security until approved | Add security/legal routes only when their notices are publishable |
| E1–E10 | Client decisions | Unanswered items remain gated | Company sign-off required; see v5 change list Part E |

## Separate Client 1 guide — higher confidentiality requirement

The version 2 hosting specification requires:

- A distinct `dawabit-client1` Cloudflare Pages project at `client1.treehouseconsultancy.co.uk` (unless the firm issues an updated authorised address).
- One self-contained encrypted guide `site/index.html` uploaded **unchanged**, alongside `site/_headers` and `site/robots.txt`; verify the distributed SHA-256 value in `checksum.txt`.
- Cloudflare Access with allow-listed named email addresses and an email one-time PIN **before any visitor can receive the guide bytes**.
- Keep the guide's independent document-password screen; never ask for, store or bypass that password.
- Prevent indexing, caching and framing, and prevent cross-access to the corporate website or any Dawabit assessment workspace.
- Protect or disable **all** other origin routes (`pages.dev`, deployment previews and any alternate hostname) to prevent bypassing the custom-domain Access policy.
- Record policy administration, access logs, revocation test and the client's approval. Test stops at the independent password screen.

**Not done:** No evidence that the separate project, verified all-host Access policy, named allow-list or checksum-verified deployment exists. Do not upload the encrypted guide to a publicly reachable project merely to show progress.

## Original binaries and source limitations

The prepared archive **Dawabit_v5_official_assets_ready_for_GitHub.zip** is available in the project's file library but cannot currently be transferred as raw bytes into this GitHub connection. The asset flag switches therefore remain **false**. Successful code builds do **not** imply that the client's official visual pack is installed.

Approved public asset destinations, once original source bytes are available:

- `public/brand/dawabit-screens/Dawabit_Screen_1_Overview_v5.jpg` and `Dawabit_Screen_1_Overview_v5_AR.jpg`
- `public/brand/dawabit/graphics/` for the official EN/AR verdict, evidence, method and sector panels specified in `src/content/dawabit-v5.ts`
- Approved `public/brand/social-card-v5.png` and branded favicon PNG variants when available

Never place screen 2/3/4, the interactive demonstration HTML, sample PDF, private report, client guide, credentials, secrets, access tokens or password files into the static site's `public/` directory.

## Deployment acceptance evidence required

1. Passing GitHub CI for the exact reviewed commit: typecheck, tests, build, Cloudflare Functions and link integrity.
2. 112 responsive browser cases, 0 exceptions or overflow issues, and six full-page 390px English/Arabic captures.
3. Official visual file-by-file audit: original checksums, size, alt text, contrast, half-resolution display, real image loading, caption and no CLS.
4. An approved Cloudflare demo protection policy and observed denied/allowed/revoked access, including default Worker routes and preview hosts.
5. Demo request form delivery to the actual monitored address, legal-consent version, spam/rate-limit and data-processing checks.
6. Client1 guide isolated and behind Access and independent document password, with guide SHA-256 verified.
7. Confirmed domain registration, preserved MX/SPF/DKIM/DMARC, TLS, path-preserving 301s, and no unapproved change to existing site/email.
8. Company-signed launch authorisation before removing `noindex, nofollow` or updating production.

**Conclusion:** Code staging is substantially prepared and can be objectively verified, but publication, confidential access, legal claims, domains and client-furnished binary visuals are distinct unresolved release gates. Neither a green CI badge nor a public Pages preview overrides them.
