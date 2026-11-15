# Treehouse — Website Change List v1: implementation status

Source: Client draft site review, version 1, 15 November 2026. Do not claim the website has launched until client approvals and live integrations are complete.

## Implemented in code (awaiting final browser and CI QA)

- **A1**: draft-wide noindex and nofollow via metadata plus `X-Robots-Tag` headers, and `robots.txt` disallow-all. Revert these together after Treehouse signs off final launch.
- **A4**: removed the unwanted coverage footnote, 10 / 10 counter and desktop/mobile table hint. Coverage statuses now live in `src/content/coverage-status.json`; a non-developer can edit that JSON data in GitHub's file editor, triggering an automatic rebuild, without changing application code. Allowed values: `complete`, `inProgress`, `planned`, `underReview`. Verify statuses with Treehouse first.
- **A5**: Insights hidden from all navigation, home and footer until three articles are published. Login links hidden until actual portal authentication is connected.
- **A6**: labelled Mutabiq wordmark with correctly spaced English and Arabic accessible text.
- **A7**: compliance diagram label and counter separated in markup.
- **A8**: Markets dropdown now links to the market overview as well as UK, UAE, and Saudi market pages on mobile and desktop.
- **A9**: required form labels marked consistently; optional fields retain explicit optional wording.
- **A10**: static-export cleanup removes only any empty framework-generated `next-size-adjust` tags; canonical URLs must still be confirmed against the real domain at launch.
- **B1–B4**: Mutabiq overview hero headline and supporting line updated in English and Arabic, second section renamed to avoid duplication, and dark-background paragraph text contrast increased.
- **B7**: proof strip code and bilingual labels reserved in `src/content/mutabiq-assets.ts`, disabled with values unset until Treehouse approves all three figures.
- **C**: visual slots placed in the code at the Mutabiq hero, homepage, How it Works steps 1, 2, 3, 5 and beneath the four verdicts. Components preserve the full image, captions, descriptive alt text, browser-frame treatment, 1600w/3200w WebP source sets and below-the-fold lazy loading. The feature remains disabled until the actual files are supplied.

## Pending client files and operational setup — NOT completed

- **A2**: real form delivery. The existing Pages Function already validates, checks Turnstile, logs consent to D1 and emails with Resend, but it is deliberately off. Requires monitored inbox, a verified sender, approved privacy version/retention, Cloudflare D1 binding, secrets and a successful test of all three forms. Keep the offline notice until working.
- **A3 (resolved per client branding direction, 15 November 2026)**: the approved public-facing name is **Treehouse Consulting**. All English public pages, metadata, structured data and social preview text now use that name. If the registered legal entity differs, Treehouse must separately approve legally required disclosures before launch.
- **B5/C**: the four 3200×2000 original product screenshot PNGs were referenced in the review but not supplied to this working session. Upload them, convert to quality-reviewed WebP at 1600px and 3200px (do not crop out the Illustrative data label) into `public/brand/mutabiq-screens/` using base filenames in `src/content/mutabiq-assets.ts`. Then set `visualsEnabled: true` and inspect all routes on mobile and desktop in both languages.
- **B6/D**: `Mutabiq_Sample_Assessment_Report_v1.pdf` was not supplied. The sample report CTA/download remains **hidden** until Treehouse provides the file and the full secure name/organisation/work-email/country/consent workflow is implemented, stored, emailed and tested. Do not put an unprotected, indexable PDF under the public directory; use an authenticated or signed time-limited delivery endpoint after completed consent. The sample report is English only at first, with bilingual UI.
- **B7**: do not enable proof strip until three confirmed statistics are provided.
- **Part E**: final coverage statuses, legal company name/address, privacy/cookies/terms, three approved Insights articles, monitored inbox, .com domain, `.co.uk` redirect, and application host require confirmation. The new review says `app.mutabiq.com`, whereas previous spec says `app.treehouseconsultancy.com`; confirm which URL will be used and who owns each DNS zone.

### Technical note
This change set is prepared as a pull request. After CI succeeds, review changes, merge to main, then check that Cloudflare Pages deploys the latest commit. No claim is made about forms being connected or sample report being deliverable.
