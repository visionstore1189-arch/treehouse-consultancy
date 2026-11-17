# Dawabit customer access — current verified status

The previous version of this document described historical login work and used a superseded product name. **Do not use its old deployment or enablement instructions.**

The authoritative current implementation, connected Supabase audit, security findings, migration/legacy precautions and sign-in acceptance checklist are in:

**[DAWABIT-PRODUCT-APP-READINESS.md](DAWABIT-PRODUCT-APP-READINESS.md)**

## Release constraints

- Treehouse's v5 **Part E9** still asks whether client login pages should remain. The public login and portal are deliberately unpublished.
- All Cloudflare Pages `/api/auth/*` credential/session handlers now check a server-only allow flag `DAWABIT_CLIENT_LOGIN_APPROVED`, which defaults to denied. The public Supabase key alone is not launch authorisation.
- The marketing website is **not** the complete production Dawabit application. Its existing Supabase Auth tables establish user/organisation/subscription metadata only.
- The stand-alone public-illustrative HTML demonstration must remain separated, with Cloudflare Access or equivalent server-side protection before sharing its link. Do **not** embed it in a public iframe.
- The encrypted Client 1 guide must remain in an isolated protected project and must never be uploaded to the marketing website.
- A full customer sign-in requires E9, legal, hosting and security approvals, plus real authorised tenant testing. No login credentials or private keys belong in the repository.

The original historical database migration must not be re-applied or renamed casually; preserve the database migration history.
