# Official Dawabit v5 public-asset upload drop

This folder is for **one client-approved PUBLIC-ASSETS ZIP only**. It is not a place to store confidential client files, unrestricted product screens, sample reports, or access credentials.

### One-file upload procedure
1. From the GitHub repository branch selector, select **`dawabit-v5-release-hardening-20261117`**, not `main`.
2. Open this `asset-import/` folder and select **Add file → Upload files**.
3. Upload the prepared **`Dawabit_v5_APPROVED_PUBLIC_ASSETS_staging.zip`** file with this exact filename. The archive is available in the source ChatGPT conversation and contains an approved 53-file manifest.
4. Commit directly to this **staging branch**.
5. The `Import verified Dawabit v5 public assets` GitHub Action will run checksums, reject prohibited files, run typecheck/tests/build, commit approved binaries, enable only public visual flags, and remove the one-time ZIP.

**No upload from the ChatGPT connector was possible:** it can edit repository source text but cannot stream the attached JPEG/PNG binaries without a connected graphical browser or direct byte-transfer action. This folder provides a controlled handoff so a Cloud Browser/Work session can do one upload rather than 53.

### Deployment safety
- Even after a successful import, this is **not a go-live authorisation**.
- Do not merge this PR to the production branch until the firm approves the Part E decisions, demo and Client 1 confidential hosting are server-side protected, enquiry delivery and legal texts are approved, and the deployed bilingual pages are rechecked.
- Do not upload the confidential `Dawabit_Client1_SITE_ONLY_validated.zip` here.
