# Treehouse Consulting / Dawabit — premium interaction design review
Date: 17 November 2026 | Branch: `treehouse-premium-depth-ux-20261117`

## Audit scope and evidence

Inspected the currently accessible connected-browser corporate domains, Dawabit v5 preview, GitHub production branch, premium-polish branch, source components and styles. This is a **source and page-content review**, not a claim of a complete visual-device screenshot pass.

- Corporate production domains were found serving the older TIBQA copy in existing browser page contexts; staging displayed Dawabit v5. Production deployment must be independently rechecked.
- The implementation is **Next.js/React/TypeScript**, not Flutter.
- The homepage already features an original WebGL 3D regulatory structure via lazy-loaded React Three Fiber, with a static fallback and play/pause control. Adding a second 3D library or heavy hero video would be redundant.
- Both EN/AR versions use the official client-provided marks, approved product screenshots and illustrated regulatory panels.
- The premium-polish branch already contains a five-stage interactive, illustrated assessment journey, sticky reading progress and mobile navigation refinements. Reused those improvements rather than duplicating content.
- Trust claims, customer numbers, staff credentials, screenshots 2–4, sample PDF, private demo and legal/security statements remain subject to firm approval and must not be invented or exposed.

## Improvements implemented in this branch

1. **Hero depth:** Gentle, cursor-responsive tilt around the current WebGL scene, low-opacity spotlight tracking and orbit parallax. Bounded movement, animation-frame coalescing, no pointer-data persistence. Layer controls and pause switch preserved.
2. **Market/sector navigation:** Geometric market cards have desktop-only 3D elevation, richer border/glow and icon parallax with keyboard-focus equivalent; no screen-reader-only interaction.
3. **Service navigation and calls to action:** More explicit icon movement, focus states and a restrained gradient sheen. No new navigation destinations or claims.
4. **Interactive assessment journey:** Keeps the existing premium five-stage explainer with approved EN/AR methodology and illustrative warning.
5. **Reduced motion:** Decorative hover movement switches off under `prefers-reduced-motion: reduce`; touch devices retain the standard static layout.

## QA before deployment

- `npm ci && npm run check:assets && npm run typecheck && npm test && npm run build && npm run cf:build && npm run check:links`
- Verify both language versions at **360, 390, 768 and 1024px** and desktop at 1440px, including keyboard focus, RTL artwork orientation, horizontal overflow, image ratios, and interactions.
- Confirm scene control buttons and stage navigation are focusable, hover enhancements do not require mouse to access information, and no reduced-motion animations remain.
- Inspect contrast on navy panels, text sizes on dark backgrounds, image caption visibility and real device performance. Disable ornamental effects if low-powered devices show dropped frames.
- Confirm all retired TIBQA/Mutabiq public URLs use correct 301 paths while sitemap/canonical/hreflang point to the approved domain.
- Never merge or publish confidential demo/guide or enable forms/indexing before the firm's outstanding v5 Part E release gates are satisfied.

## Publish boundary

Changes are deliberately isolated to visual/UI files in a review branch; no authentication backend or domain configuration is included. A passing CI run is necessary but not sufficient for publication. Production rollout and demo access are a separate, authorised Cloudflare release process.
