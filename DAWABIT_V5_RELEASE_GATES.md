# Dawabit v5 — staging and release gates

This branch is a **review-only implementation** of the client's Website Change List v5 (17 November 2026). It must **not** replace the production domain until all release gates below are satisfied.

## Completed in GitHub staging
- Renamed TIBQA/Mutabiq to **Dawabit by Treehouse**, with English and Arabic copy, canonical domain migration metadata and retired-URL redirects.
- Expanded the pages for industry coverage, method, buyers, FAQs, contact, engagement options and market-specific regulator strips.
- Imported **all 11 original client-supplied SVG logo masters unchanged**, including the exact English Dawabit and Treehouse Consulting marks, and activated them in the responsive page header and product visuals.
- Kept unverified security, claims, data retention, unfinished legal and client portal items unpublished.
- Kept noindex/nofollow while the client has not authorised launch.
- English and Arabic automated responsive Playwright QA: 14 routes × 2 locales × 4 widths = **112 page cases**. See GitHub Actions run 43994858622 (post-logo successful), including 390px screenshots.
- Static Next.js build and safety checks pass.

## Remaining publication gates
1. **Original image binaries:** The client supplied original v5 screenshots and EN/AR verdict panels. The GitHub text connector cannot transfer PNG/JPG binary files. A verified ZIP prepared from the exact uploaded files contains 12 product screenshots, 21 official infographic panels and 11 original SVG logo masters, with SHA-256 manifest. Upload them with their precise directory paths. Keep `dawabitAssets.visualsEnabled` and `approvedVisualsInstalled` set to `false` until their URLs load correctly and have been visually checked at phone and desktop widths. Do not recreate or substitute official screenshots.
2. **Demonstration:** Configure the authorised custom demo domain and enforce **Cloudflare Access or a server-side auth gate before any HTML, images or scripts are served**; keep the Workers URL unlinked while public access remains possible. Test grant/revoke, access logging and 14-day prospect expiry. Only then enable the button on `/dawabit/demo/`, not in main navigation.
3. **Private sample report:** Never publish the sample PDF in `public/`. Provide only after the server-side validated form and private-file-delivery flow are in place, with rate limiting and the specified consent/data-handling rules.
4. **Client Part E approvals:** Obtain confirmation for all pending legal/security/hosting/retention wording, statistics, sector Arabic translation, client login decision and other reserved items. Publish no unapproved specifics.
5. **Domains and launch:** The firm must authorise any Cloudflare/GoDaddy domain changes. Preserve email records. At authorised launch, verify both domains, TLS, redirect, sitemap, robots, canonical, hreflang, forms and consent. Only then release robots noindex.
6. **Final screenshots:** Repeat the bilingual 390px mobile screenshots **after** binary image installation and final legal approvals.

## Nonnegotiable constraints
- Brand colours: navy `#0B1F3A`, green `#0B8457`, mint `#2FCB8B`.
- Every example compliance outcome is illustrative, never a real client finding.
- The official Dawabit name is always endorsed **by Treehouse**.
- Do not touch the live website or DNS until client launch approval.
