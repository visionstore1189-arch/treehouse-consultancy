# Content editing and CMS integration

Content is separated from layout. A fully functioning editor-friendly CMS has **not** been configured. Editing the current TypeScript content files and rebuilding still needs a developer or a technically confident editor. This does not fulfil the pack's requirement for independent nontechnical publishing; that remains an explicit outstanding requirement.

## Current content model

| File | Editable content |
| --- | --- |
| `src/content/site.ts` | English/Arabic UI labels, navigation, page copy, services, markets, coverage records, product method, verdicts and legal placeholders |
| `src/content/seo.ts` | Approved search titles and descriptions where provided |
| `src/content/forms.ts` | Field labels, confirmation/error states, consent wording and version |
| `src/content/articles.ts` | Article schema, article collection and topic labels |
| `src/lib/config.ts` / environment | Site and future application URLs, launch flags |

Every translated string uses `{ en, ar }`. Keep both languages present. The supplied Arabic homepage, navigation, verdicts and Saudi copy were retained; remaining Arabic copy is a draft translation and needs native regulatory review. Keep review status in the editorial process rather than silently presenting it as legally approved.

The coverage values currently reproduce the pack's Complete statuses. They are client-supplied, not an independent regulatory-library audit. The client must reconfirm instruments, versions and availability before launch. Only the client should approve a change in status.

No launch articles were supplied. `articles` is empty, and the site shows an honest empty state. Do not create synthetic dates, authors, client examples or statistics. The article template includes author, date, reading-time calculation, Article structured data and mirrored Arabic routes for published entries.

## Add an article

Create a record following the exported `Article` interface:

```ts
{
  slug: 'approved-slug',
  title: { en: 'Approved title', ar: 'العنوان المعتمد' },
  description: { en: 'Approved summary', ar: 'الملخص المعتمد' },
  date: '2026-11-15',
  market: 'uk',
  topic: 'compliance',
  author: 'Treehouse',
  status: 'draft',
  body: [{
    heading: { en: 'Approved heading', ar: 'العنوان المعتمد' },
    paragraphs: [{ en: 'Approved paragraph.', ar: 'الفقرة المعتمدة.' }]
  }]
}
```

Keep drafts as `draft`. Set `published` only after factual, legal and bilingual review. The route generator then exports `/insights/approved-slug/` and `/ar/insights/approved-slug/`, and both appear in the sitemap. Build and preview before merging. Article content is rendered as text, not arbitrary HTML.

## Free CMS integration path

A build-time CMS adapter can preserve the current static deployment. No production Next.js server or paid database is needed for the marketing content.

1. Choose a CMS with a suitable free tier or a Git-based editor after confirming editor count, bilingual fields, private repository support and identity requirements. No CMS provider has been selected or billed in this delivery.
2. Model pages, bilingual fields, service records, market records, regulator status, articles, metadata and legal versions as collections. Enforce a unique slug, English and Arabic text, publication status and reviewer approval.
3. Fetch approved content at **build time** using a read-only credential stored in Cloudflare build secrets. Generate a validated JSON snapshot in a private build directory, then adapt it to the current `site.ts` and `articles.ts` interfaces. Never expose management tokens in `NEXT_PUBLIC_*` variables.
4. Keep preview and published content separate. Drafts must not enter static exports or client bundles. A private Git repository alone does not protect public build output.
5. Trigger a Pages rebuild through a narrowly scoped deploy hook after publication. Keep the hook URL secret. Debounce batches of edits to remain within the free build allowance.
6. Implement image optimisation and safe text/Markdown rendering without raw HTML injection. Keep client documents and the Mutabiq library out of the CMS.
7. Test editor sign-in, roles, bilingual required fields, draft preview access, approval, rollback and a complete update to a regulator's status without code changes.

A Git-based CMS can also write validated content files through authenticated commits and use Pages Git integration. It still needs a properly configured OAuth/authentication endpoint and editorial access controls; placing an `admin` HTML page in this export would not complete that setup.

## Privacy, analytics and legal publishing

The legal pages are reserved, noindexed templates rather than claimed legal notices. Replace them with client-approved text and complete company identification details. Update consent wording and version together on the frontend and Function.

No analytics or advertising scripts are loaded. Conversion reporting by form, market and language remains outstanding. A future analytics adapter must respect the approved consent model before loading any optional tracker; no personal enquiry data should enter analytics. When analytics is enabled, add an appropriate preference interface, withdrawal path and updated cookie policy before publication.
