# Treehouse Consulting — TIBQA v3 client review handover

> **16 November 2026 — direct owner override of the v3 login hold:** The TIBQA client account login is restored on the marketing website at `/client/login/` and `/ar/client/login/`. A dedicated, premium TIBQA account CTA appears on the **homepage directly below “One firm. Three markets.”** The header, footer, and individual TIBQA product pages contain no login promotion. Existing Supabase authentication and the account/organisation status screens are reused. The TIBQA assessment software is still a separate, unconnected application; access to its regulated data is not granted by the website login. Published Insights and unapproved legal pages remain offline.

Source of truth: **Treehouse_Website_Change_List_v3.docx**, dated 15 November 2026. It replaces the v1 instructions. Product English name: **TIBQA**, Arabic name: **طبقًا**, endorsed **by Treehouse / من تري هاوس**. The corporate brand remains Treehouse Consulting, matching the prior client instruction; the final legal firm name must still be confirmed by Treehouse.

## Implemented in this revision

- Product name, Arabic product name, SEO titles/descriptions, social metadata, software schema, routes, internal links, alt text and headings migrated to TIBQA. Tagline unchanged.
- Product routes: `/tibqa/`, `/tibqa/how-it-works/`, `/tibqa/coverage/`, `/tibqa/demo/` plus `/ar/` equivalents.
- Cloudflare `public/_redirects` performs 301 redirects from the legacy English and Arabic `/mutabiq/` routes. The legacy product screenshots and SVG wordmarks are removed from the public deployment.
- TIBQA wordmark light/dark and mark SVGs generated in the supplied green three-bar visual language. **Designer's exact final wordmark asset is still awaited.**
- Supplied TIBQA v3 screenshots extracted from the client's `TIBQA_Product_Tour_v2.html`: Scope, Requirements, Finding and Overview. Image labels explicitly state *Illustrative example*; not real regulatory data.
- Product hero: native accessible four-stage (Scope / Map / Assess / Report) TIBQA tour with manual tabs, left/right/home/end keyboard control, 6-second autoplay, hover and focus pause, hidden-tab pause, and reduced-motion disabling.
- Arabic tour step labels and captions, RTL layout and "مثال توضيحي" label. The same English-language sample screenshots are used temporarily, until the promised Arabic screenshots arrive.
- Findings image on Saudi Arabia page; single interactive verdict panel on the TIBQA overview page.
- Client access promo and login buttons were initially removed under v3; subsequently, the owner expressly restored a single homepage access band beneath Three Markets, together with account/login/recovery pages. Header and footer login buttons remain absent. Unpublished Insights routes remain 404. Existing Supabase users are preserved; the external assessment app is still NOT connected.
- Three forms display only the approved neutral line "Online enquiries open shortly." / "ستُفتح الاستفسارات الإلكترونية قريبًا." Until the legal/inbox prerequisites exist, no name, email or consent form is shown.
- Unapproved privacy, cookies and terms pages are withheld from the public draft rather than publishing fabricated or incomplete legal texts. All forms and sample-report download remain disabled until approved.
- Primary canonical and sitemap domain set to `https://treehouseconsultancy.co.uk`. Cloudflare Pages draft remains `noindex`, blocked by robots.
- TIBQA v3 sample report is the designated private `REPORT_FILE_KEY` fallback (`private/TIBQA_Sample_Assessment_Report_v3.pdf`). Its downloadable block remains hidden until legal and mail controls are approved.

## Still blocked on client approvals or infrastructure

1. **Enquiry forms (A1)**: monitored inbox address, final approved privacy notice, Cloudflare D1 production binding/migration, Turnstile keys, authenticated outbound sender (Resend), review of retention and consent versions, and an end-to-end monitored test email.
2. **Legal (A5)**: client-supplied final privacy, cookie and website terms text, including verified entity details. These pages currently 404 rather than display an internal placeholder.
3. **Private report (B5)**: client-provided v3 PDF must be stored in the approved private Cloudflare R2 bucket at `private/TIBQA_Sample_Assessment_Report_v3.pdf`, then the consent/download service tested. It is not publicly exposed.
4. **Domain (C)**: Treehouse must confirm DNS/ownership and desired go-live before any live host redirect, zone change or defensive domain redirect. The draft is not publicly indexed. App host for future TIBQA: `app.treehouseconsultancy.co.uk`; client files: `clients.treehouseconsultancy.co.uk` with Cloudflare Access. No domain-registration claims are made for `tibqa.com`, `tibqa.co.uk` or `tibqa.ae`.
5. **Brand/translation**: final vector artwork and native Arabic screenshots when supplied; regulatory Arabic copy requires specialist review.
6. **Regulatory coverage and library figures**: must be provided or confirmed by Treehouse before publishing coverage status or proof-strip statistics.
7. **Future assessment application**: the public TIBQA account login is now restored by explicit owner instruction. The assessment application must remain disconnected until its own secure backend, MFA, permissions, regulator requirements and subscriptions are approved. Existing subscription status remains distinct from regulated assessment application access.

## Quality gates

- `npm run typecheck`
- `npm test`
- `npm run build` (includes TIBQA asset verification and bilingual static export validation)
- `npm run cf:build`
- `npm run check:links`
- Manually verify 390px mobile and RTL with browser DevTools; review focus order and accessibility in the new tour.
- Confirm 301 redirects for the retired product name, 200 for English/Arabic TIBQA login and account pages, and 404 for Insights/unapproved legal pages in deployed Cloudflare Pages production.
