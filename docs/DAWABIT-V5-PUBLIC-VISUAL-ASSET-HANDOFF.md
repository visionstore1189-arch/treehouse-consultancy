# Dawabit v5 — verified public visual asset handoff
**Verified and installed in GitHub staging:** 17 November 2026. **Release state:** Public image assets in staging; no production publish or protected-demo deployment.

## What was actually inspected and packaged
The uploaded conversation supplied 88 items (including duplicates and confidential documents). Only approved public originals were selected for a separate, 53-file staging asset archive named `Dawabit_v5_APPROVED_PUBLIC_ASSETS_staging.zip`. Each file has a recorded byte count, intrinsic dimensions (for raster images), and SHA-256 in `APPROVED_PUBLIC_ASSETS_MANIFEST.json` inside that ZIP.

- **2** public Overview screenshots (English and Arabic). These are `Dawabit_Screen_1_Overview_v5.jpg` and `Dawabit_Screen_1_Overview_v5_AR.jpg`.
- **21** original panels and explainer graphics: 15 verdict-panel variants and 6 How It Works / Sector Grid variants (English light, English dark, Arabic light).
- **16** official logo/wordmark/mark/favicons in SVG; **13** additional branded PNG logos/favicons and the social card.
- No protected screenshots 2–4, interactive demo HTML, sample PDF, product tour, client1 index.html, checksum, access credentials or private instructions.

(The archive intentionally includes alternate public colour variations, even when a specific page displays one of the approved selections.)

## Original files installed and verified on staging
The approved original public files have **already been installed directly into GitHub** on branch `dawabit-v5-release-hardening-20261117`, commit `416e42813b27c0fd4403c0f99eadf3f1350c1d2d`. This includes **37 original PNG/JPG assets** plus the **16 original SVG masters** that were already in the branch.

Each newly uploaded image was compared with its source bytes using the Git blob SHA-1 formula and the source SHA-256 manifest; **37/37 matched exactly**. The corresponding Git tree paths were independently re-enumerated and verified, with **zero missing files or mismatches**. Official public image flags in `src/content/dawabit-assets.ts` and `src/content/dawabit-v5.ts` are now enabled.

To validate a fresh local checkout, run:
```sh
npm ci
npm run check:assets
npm run typecheck
npm test
npm run build
npm run cf:build
npm run check:links
```

**Do not upload the asset ZIP a second time**; `asset-import/` is a historical alternative only. These verified assets do not authorise production publishing, enquiry submissions, sample reports, client login, search indexing, DNS changes, or Access policy changes.

## On-page quality acceptance
- Recheck the Home, Product and Contact pages at **360px and 390px** mobile widths in both languages, plus tablet widths 768 and 1024. Inspect navigation, focus, font sizes, image clarity, letter/Arabic shaping, line breaks, contrast, loading, and responsive spacing.
- Check that the Arabic RTL image and language are actually paired, not merely mirrored English.
- Ensure every graphic retains its **Illustrative example** caption and has contextual alt text.
- Confirm no restricted screenshot is accessible from a public asset URL, Pages preview domain or open GitHub repository.
- Run the full branded-output old-name search, including sitemap, OpenGraph assets, route redirects and 404 pages.
- Obtain the firm's final sign-off before merging to main, changing DNS, unlocking forms, publishing legal/security claims or enabling search indexing.

## Deferred security work
Confidential Client1 Guide has **its own** `Dawabit_Client1_SITE_ONLY_validated.zip`, with the encrypted HTML byte-verified. It is NOT a public asset and must NEVER be installed into this repository. See `docs/CLIENT1-CLOUDFLARE-ACCESS-RELEASE-GATE.md`.

Similarly, the interactive Dawabit Demo (Workers deployment) must be protected server-side before its link appears publicly.

## Current release limitation
The original public assets are fully installed and enabled in the GitHub **staging branch**. The website is **not yet launched to production**: the firm must approve Part E items, Cloudflare Access must protect confidential workspaces and the demonstration, deployment must be verified at the intended hostname, and the new official-image rendering needs review via the current 390px bilingual browser screenshots.
