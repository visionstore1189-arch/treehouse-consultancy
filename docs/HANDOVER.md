# Treehouse client developer handover

The corporate website is built and locally tested on the requested free architecture. This delivery includes complete source, reusable components and design tokens, 48 statically generated bilingual pages, server-side form handling, integration contracts and deployment instructions. It is not yet a public production deployment.

The latest typed user instructions take precedence over the attached pack. In particular, the initial corporate site uses Cloudflare Pages Free; the existing Mutabiq application stays separate; unconnected login and form flows are explicitly unavailable. No paid service has been provisioned.

## What is implemented

- Next.js App Router, React/TypeScript, Tailwind CSS, Motion for React and React Three Fiber/Three.js.
- Original transparent Treehouse logo, navy/forest design, interactive 3D homepage, verdict explorer and restrained scroll motion.
- Every page in the pack, an additional markets index, client login and reserved portal; each has an Arabic mirror.
- Self-hosted English and Arabic fonts, exported language/direction attributes, matching-page language switch and logical RTL layouts.
- Shared header/footer, mobile dialog, reusable service/market templates and localised enquiry forms.
- Page metadata, canonical/hreflang links, sitemap, robots, Organisation and SoftwareApplication schema, and Article schema support.
- Separate bilingual content, coverage and article models; currently no published launch articles.
- A Pages Function with shared schema validation, payload limit, exact-origin checks, honeypot, verified Turnstile hostname/action, hashed-IP rate limit, D1 persistence and timestamped/versioned consent.
- Email adapter with truthful saved-but-not-notified handling, fixed server-side recipient configuration, and no client-side API secrets.
- Explicitly locked client interfaces and a documented server-side authentication, authorisation and subscription contract.
- Private GitHub instructions, a checks-only CI workflow, Pages deployment guide, domain guide and operational notes.

## Production dependencies

| Dependency | Owner | Current state and acceptance evidence |
| --- | --- | --- |
| Cloudflare account and Pages project | Developer/client | Not provisioned here. Connect repository, deploy and record successful production URL. |
| Private GitHub remote | Developer/client | Setup instructions supplied; no remote created or pushed. |
| Primary and .co.uk domains | Client | Ownership/registration unconfirmed. `pages.dev` can launch without a domain purchase. DNS, HTTPS and redirects need live tests. |
| Registered company name/number/office | Client | Not supplied. Confirm claims and populate approved statutory details. |
| Legal notices and consent | Client/adviser | Reserved, noindexed pages; no claim of compliance. Approve UK/UAE/Saudi visitor treatment, controller details, lawful bases, processors, transfers, rights and retention. |
| D1 database and binding | Developer | Schema and code supplied; real database, region and retention arrangements not configured. |
| Turnstile widget | Developer | Code supplied; real public/secret keys and hostnames not configured. |
| Free email provider and monitored inbox | Client/developer | Resend adapter supplied; verified domain, keys, sender and monitored recipient needed. End-to-end delivery untested. |
| Failure reconciliation | Named operator | Saved enquiries with failed notifications need monitoring; no scheduled retry service has been activated. |
| Daily backups and deletion schedule | Developer/client | Git/rollback guidance and cleanup code supplied. Scheduled database exports, strict retention cleanup, restore testing and access policy remain to be configured. |
| Uptime and incident alerts | Developer/client | No monitoring account or alert destination configured. No uptime SLA claimed. |
| Arabic review | Client | Supplied launch copy retained and remaining text drafted. Native Arabic regulatory review outstanding. |
| Coverage validation | Client | Complete statuses match the pack. Reconfirm library instruments, versions and available coverage before launch. |
| Three launch articles | Client | Not supplied. Listing/filter/article templates are ready; empty state is visible. |
| Mutabiq screenshots | Client | Not supplied. Current illustrations are clearly labelled, with no client data or fake live metrics. |
| Editor-friendly CMS | Developer/client | **Outstanding.** Structured content exists, but publishing still requires a source edit/rebuild. Build-time integration path documented. |
| Privacy-respecting analytics | Client/developer | **Outstanding.** No tracker active. Consent model, preference controls, provider and market/language/form reporting need configuration. |
| Existing Mutabiq connection | Client developer | Reserved URL and contracts only. Real authentication, MFA, sessions, tenant authorisation, subscriptions, audits and protected document storage must be verified in the separate app. |
| Production accessibility and performance acceptance | Developer/client | Local viewport, keyboard and structural checks done. Full WCAG 2.2 AA audit, real-device GPU/network tests, and production Core Web Vitals remain. |

## Safe launch sequence

1. Create the private remote and deploy the static site to a free Pages project with forms disabled.
2. Complete content, Arabic and corporate identity review. Keep legal pages and forms gated until approved.
3. Configure the free backend and email destination in staging. Run authorised end-to-end tests and verify stored consent and actual receipt.
4. Put backup, deletion, failed-email reconciliation and monitoring ownership in place. Then enable production forms and rebuild.
5. Connect the client-owned domains and verify HTTPS, redirects, deep links, search metadata and form hostname checks.
6. Connect the existing Mutabiq application separately only after its security/subscription acceptance tests pass.
7. Add the CMS and approved analytics without changing the static public-site architecture.

When final legal pages are approved, remove their temporary noindex/exclusion rules in `src/lib/routes.ts` and `src/app/sitemap.ts`. Keep the client login/portal noindex rules.

## Maintenance

Use the committed lockfile and Node 24. Re-run the documented checks for each content, dependency or security change. Keep the authoritative content in `src/content/`; avoid putting strings in components. Inspect free-tier quota dashboards and stop at limits rather than enabling automatic paid upgrades.

Use Pages rollback for a broken website release. If form delivery fails, set runtime `FORMS_ENABLED=false` and rebuild with the frontend flag false so visitors see the unavailable notice. Preserve stored enquiries for authorised reconciliation according to the approved retention policy. Never print tokens, full payloads or client information in public logs.
