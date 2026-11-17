# Treehouse Consulting — Dawabit by Treehouse

Bilingual English/Arabic regulatory advisory and technology website. **Dawabit (ضوابط) by Treehouse** is the firm's regulatory compliance assessment product.

> **Status: staging, not launch approved.** The repository's `main` branch and the live Cloudflare Pages project are **not** to be replaced merely because this branch builds. This implementation follows **Treehouse Website Change List v5, dated 17 November 2026**. Earlier TIBQA, Mutabiq and v3/v4 instructions are superseded.

## Architecture

- Next.js 16, React 19, TypeScript, accessible responsive components; static export to `out/`.
- Cloudflare Pages static hosting with isolated Functions under `functions/api/`.
- English routes under `/`; Arabic RTL equivalents under `/ar/`.
- Product pages: `/dawabit/`, `/dawabit/how-it-works/`, `/dawabit/coverage/`, `/dawabit/faq/`, and `/dawabit/demo/`, with equivalent Arabic routes.
- Public content covers services, UK/UAE/Saudi regulatory markets, and 19 ISIC4 sector sections. All illustrative example results are labelled.
- Official client-supplied Treehouse and Dawabit **SVG logo masters** are installed and used. The complete set of client-supplied v5 screenshots, verdict panels and explainer graphics must still be installed in their prescribed binary formats and validated.

## Brand and public-content rules

- Company: **Treehouse Consulting**.
- English product: **Dawabit by Treehouse**; Arabic: **ضوابط من تري هاوس**.
- Brand colours: navy `#0B1F3A`, green `#0B8457`, mint `#2FCB8B`.
- Retired product routes permanently redirect to matching Dawabit routes; no retired product copy should render in public HTML.
- Intended canonical domain is **https://treehouseconsulting.co.uk**. The existing **treehouseconsultancy.co.uk** should redirect after the company confirms domain ownership and the DNS change. No DNS or email records should be changed without approval.
- Keep `noindex, nofollow`, robots blocking and the existing privacy/security restrictions in place until a verified, expressly authorised launch.
- Do not publish claims about former regulators, security infrastructure, hosting/residency, model training, retention, product coverage, or team metrics unless confirmed and documented.

## Public versus restricted content

Public: company/service/market/sector descriptions, Dawabit's assessment method, its FAQ and a **single approved Overview screenshot** after installing the official visual assets. Additional public static panels must retain their `ILLUSTRATIVE EXAMPLE` labels.

Restricted: screens 2–4, interactive demonstration and product tour, sample assessment PDF, private requirements guides, assessment inputs, findings and report downloads. **Never place confidential files in `public/` or `out/`.** The demonstration may not be linked until Cloudflare Access or an equivalent server-side gate actually protects every request.

The confidential Client 1 Requirements Guide is an **independent** project. It must be uploaded unchanged to a separate Cloudflare Pages project with Cloudflare Access email allow-list and email one-time PIN, retaining its existing document password. No relationship to Dawabit application login or customer accounts is permitted.

## Build and checks

Node.js 24 or later:

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run cf:build
npm run check:links
```

The `build` script validates the official assets currently installed, verifies bilingual exported routes and checks deprecated product names are absent from the built public pages.

Automated browser QA lives in `.github/workflows/dawabit-v5-release-qa.yml` and `scripts/qa-dawabit-responsive.cjs`. It checks **19 published routes × 2 locales × 4 viewport widths (360, 390, 768, 1024) = 152 cases**, verifies mobile navigation and image loading, and uploads six 390px full-page English/Arabic screenshots. This audit runs against a **local static export** and does not prove production DNS, Cloudflare Access or email delivery.

## Release checklist and approvals

Read [DAWABIT_V5_RELEASE_GATES.md](DAWABIT_V5_RELEASE_GATES.md) before a deployment, enabling a form, turning on an image flag, adding a private link, or editing domains. The governing client's v5 checklist remains the source of truth.

Outstanding company decisions include the new mailbox and domain, approved privacy/terms/cookies text, security and AI handling facts, regulator-library coverage, substantiated team claims, native Arabic review, protected demo access recipients, customer login decision and actual launch permission.

**No action in this repository authorises switching production domains, sending confidential material, publishing an unprotected demo, or lifting the search-engine block.**
