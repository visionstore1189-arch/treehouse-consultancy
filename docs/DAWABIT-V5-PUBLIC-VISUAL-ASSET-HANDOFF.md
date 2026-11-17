# Dawabit v5 — verified public visual asset handoff
**Prepared:** 17 November 2026. **Release state:** Staging only; no production publish or protected-demo deployment.

## What was actually inspected and packaged
The uploaded conversation supplied 88 items (including duplicates and confidential documents). Only approved public originals were selected for a separate, 53-file staging asset archive named `Dawabit_v5_APPROVED_PUBLIC_ASSETS_staging.zip`. Each file has a recorded byte count, intrinsic dimensions (for raster images), and SHA-256 in `APPROVED_PUBLIC_ASSETS_MANIFEST.json` inside that ZIP.

- **2** public Overview screenshots (English and Arabic). These are `Dawabit_Screen_1_Overview_v5.jpg` and `Dawabit_Screen_1_Overview_v5_AR.jpg`.
- **21** original panels and explainer graphics: 15 verdict-panel variants and 6 How It Works / Sector Grid variants (English light, English dark, Arabic light).
- **16** official logo/wordmark/mark/favicons in SVG; **13** additional branded PNG logos/favicons and the social card.
- No protected screenshots 2–4, interactive demo HTML, sample PDF, product tour, client1 index.html, checksum, access credentials or private instructions.

(The archive intentionally includes alternate public colour variations, even when a specific page displays one of the approved selections.)

## Required installation on the staging checkout
Extract the public asset ZIP **at the Git repository root** so each entry lands under `public/brand/`. The archive contains no `node_modules`, build output or project source overrides.

Install using the repository's validator:
```bash
# The folder here must contain the extracted public/ and manifest JSON
npm run assets:install -- /path/to/extracted-zip
npm run check:assets
npm test
npm run typecheck
npm run build
npm run check:links
```
The installer:
- checks source byte sizes and SHA-256 against the pack manifest;
- rejects obvious restricted file names and attempts to leave `public/brand`;
- copies exact original files without re-encoding;
- ensures the approved EN/AR images required by the site exist; and
- only **after** successful verification enables the official image render flags.

The installer does NOT turn on enquiry submissions, sample-report downloads, customer login, production deploy, indexing, Access policies or domain changes.

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

## Current limitation
The GitHub connector can safely change source text, but does not currently expose an original-byte upload from these conversation PNG/JPG attachments. **The archive is prepared but not yet committed to GitHub.** Visual render flags remain disabled in the connected staging branch until the copied originals are actually checked in. Do not claim that the images are live based only on the passing code build.
