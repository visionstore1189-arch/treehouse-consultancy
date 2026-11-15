# Treehouse Consulting — TIBQA website

Bilingual English/Arabic corporate website for Treehouse Consulting, showcasing **TIBQA (طبقًا)**, its regulatory compliance assessment software. Built in Next.js 16 with static export, Cloudflare Pages Functions, accessible responsive UI, and a separate future client application.

**Current status:** draft site; blocked from indexing. The client change list version 3 dated 15 November 2026 is the source of truth. The prior MUTABIQ product name is retired and redirects permanently to TIBQA product URLs.

- **Website canonical:** https://treehouseconsultancy.co.uk (no DNS changes have been made as part of this code revision)
- **Draft deployment:** https://treehouse-consultancy.pages.dev (noindex)
- **Product:** `/tibqa/`, `/ar/tibqa/`
- **Official illustrative visuals:** four TIBQA v3 screenshots, in a native, keyboard-accessible four-step hero tour with 6-second auto progression and reduced-motion support.
- **Privacy/security:** enquiry forms and sample-report download are disabled pending approved legal notices and monitored inbox; public login, account, Insights and unpublished legal routes are offline. Existing Supabase accounts/data are preserved but the future private TIBQA app is not connected.
- **Market card order:** Saudi Arabia, United Kingdom, United Arab Emirates.

## Build

Requires Node.js 24 LTS or later.

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run cf:build
npm run check:links
```

The static HTML output is `out/`. `npm run preview` runs the local Cloudflare Pages Functions emulator. The Next.js development server alone does not run the Pages Functions.

## Client review handover

**Read [TIBQA v3 change list implementation and remaining dependencies](docs/TIBQA-V3-REVIEW-HANDOVER.md)** before changing legal pages, enabling forms, exposing a client login, or switching domains. The final client privacy/cookie/terms, monitored inbox, production email and Turnstile settings, final vector wordmark, private R2 v3 report and confirmed regulator/library statistics are not yet supplied.

Full deployment technical notes are in `docs/DEPLOYMENT.md` but earlier domain and MUTABIQ references in historical documents must defer to the v3 handover.

## Code layout

- `src/app/` — static site routes, English/Arabic layouts, SEO robots and sitemap
- `src/components/` — product tour, visuals, bilingual page templates and forms
- `src/content/` — edited website copy, TIBQA assets, SEO and market coverage
- `src/lib/` — routing, validation and future secure application contract
- `public/brand/tibqa-screens/` — TIBQA v3 illustrative screenshots
- `functions/api/` — Cloudflare Pages Functions for future authorised enquiry/report workflows and isolated Supabase auth API
- `tests/` — security, route and branding regression tests
- `docs/` — client review, handovers and archived specifications

Do not re-enable public forms before an approved privacy notice and monitored inbox are in place. Do not treat the marketing website login as permission to access confidential TIBQA assessments.
