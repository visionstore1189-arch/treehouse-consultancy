# Mutabiq product visuals and private sample report — client handover

## Screenshots (approved illustrative examples)

The client supplied four PNG screenshots. The project expects eight optimised WebP files (1600px and 3200px for each), keeping the **entire original UI and “Illustrative data” label** and showing the bilingual caption beneath each image.

Upload these files to **public/brand/mutabiq-screens/** with exact names:

- `Mutabiq_Screen_1_Overview_v1-1600.webp` and `-3200.webp`
- `Mutabiq_Screen_2_Requirements_v1-1600.webp` and `-3200.webp`
- `Mutabiq_Screen_3_Finding_v1-1600.webp` and `-3200.webp`
- `Mutabiq_Screen_4_Scope_v1-1600.webp` and `-3200.webp`

If assets are available locally, open `public/brand/` in the GitHub Code tab, create or open `mutabiq-screens/`, select **Add file → Upload files** and drag all eight WebPs; commit to `main` only after CI has passed.

The PNGs supplied to the assistant's working session were 2048×1280, not the 3200×2000 originals described in the client specification. The 3200px files provided for deployment are therefore proportional upscales; no new detail is invented. Request the original higher-resolution exports from Treehouse for the final 2x artwork if needed.

Set the **build-time** environment variable `NEXT_PUBLIC_MUTABIQ_VISUALS_ENABLED=true` after the files exist. The build guard `scripts/verify-mutabiq-assets.mjs` refuses deployment if this flag is true but any WebP is missing. Until then, visuals are hidden to prevent broken images.

The image locations and English/Arabic alt text are defined in `src/content/mutabiq-assets.ts`, with rendering in `src/components/mutabiq-visual.tsx` and slots already included in `src/components/pages.tsx`. On the Arabic pages, use the original English screenshots pending approved Arabic exports.

## Report — private storage only

The sample report PDF is four pages, titled `Mutabiq_Sample_Assessment_Report_v1.pdf`.

**Never put this PDF in public/** and never commit it to the public GitHub repository or link to it directly. The client requires a consent form and a gated download. The new Cloudflare Pages Function is at `functions/api/sample-report.ts` and its D1 migration is `migrations/0002_sample_report_requests.sql`.

After legal approval and production validation:

1. Create a **private Cloudflare R2 bucket** (binding `REPORT_FILES`) and upload the original PDF to key `private/Mutabiq_Sample_Assessment_Report_v1.pdf`. Do not enable bucket public access.
2. Apply both D1 migrations to `ENQUIRIES`. The report form uses the existing `rate_limits` table, so both migrations are required.
3. Complete the existing forms prerequisites: monitored recipient `MAIL_TO`, verified `MAIL_FROM`, Resend API key, Turnstile public/secret keys and allowed hostnames, consent notice and approved version, and D1 privacy retention policy.
4. Add runtime `SAMPLE_REPORT_ENABLED=true`, `REPORT_LINK_SECRET` (random 32+ characters), `REPORT_FILE_KEY=private/Mutabiq_Sample_Assessment_Report_v1.pdf`; bind `REPORT_FILES` to the private R2 bucket.
5. Set build-time `NEXT_PUBLIC_SAMPLE_REPORT_ENABLED=true`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to the approved Turnstile site key, and ensure `privacyVersion` matches runtime `PRIVACY_VERSION`. Run a full rebuild.
6. Verify with test submissions: successful form, consent timestamp stored in D1, 15-minute HMAC download, email to the requester and monitored inbox, expiry after 15 minutes, wrong signature rejection, no direct public PDF URL, quota/Turnstile failures, and Arabic layout.
7. Keep the feature off until all these checks pass and legal review is signed off.

The website doesn't distribute any confidential Mutabiq application files.

## Deferred client decisions
- Confirm whether the public legal firm name is **Consulting** or **Consultancy**; screenshot and supplied logo disagree with the developer pack.
- Confirm the final .com website domain, .co.uk redirect, and app hostname (`app.mutabiq.com` vs `app.treehouseconsultancy.com`).
- Provide three approved metrics before turning on the proof strip.
- Complete legal pages, monitored mail and final regulatory-status approvals.
