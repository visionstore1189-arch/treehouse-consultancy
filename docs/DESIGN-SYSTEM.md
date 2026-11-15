# Treehouse reusable design system

The visual system combines midnight navy, forest green and soft ivory with the unmodified client logo. It is shared by every English and Arabic page. Components live in `src/components/`; tokens and responsive rules live in `src/app/globals.css`. Tailwind v4 is available through the PostCSS integration and matching theme tokens.

## Foundations

| Token | Value | Use |
| --- | --- | --- |
| `--navy` | `#0a2028` | Hero, market sections, reserved portal sidebar |
| `--deep` | `#091b22` | Homepage hero |
| `--forest` | `#0c5c46` | Primary actions, links and brand details |
| `--mint` | `#a4e6c8` | Hero emphasis and actions on dark backgrounds |
| `--paper` | `#f7f8f4` | Main page surface |
| `--ink` | `#183039` | Primary text |
| `--muted` | `#54646a` | Body copy |
| `--line` | `#dce3dd` | Dividers and borders |

Use semantic verdict colours only with visible text: Addressed, Partially Addressed, Gap and Out of Document Scope. Colour alone never communicates a verdict.

Typography: self-hosted Manrope Variable for English and Noto Sans Arabic Variable for Arabic. English display type uses restrained negative tracking; Arabic keeps natural tracking and increased line-height. Body, form and table styles are separate from display styles. Form controls use at least 16px input text to avoid unwanted mobile zoom.

Layout: a 1,280px maximum container; 56px desktop side gutters, reducing to 20px on phones. Sections use a deliberate 55–104px vertical rhythm. Responsive rules cover 1,250, 1,100, 800 and 600px. The navigation switches to an accessible native dialog below 1,100px. Tables use their own keyboard-focusable horizontal scrolling region rather than widening the page.

## Component catalogue

| Component | Behaviour and reuse |
| --- | --- |
| `Brand` | Official transparent PNG, proportionally displayed in an overflow crop; no recolouring or redrawing |
| `Button` | Localised internal links, primary/secondary variants, directional arrows, press feedback |
| `Eyebrow` | Section label with a small brand marker |
| `Wordmark` | Text-based Mutabiq / مطابق mark with Treehouse endorsement; no claim of registered trademark |
| `Header` | Desktop disclosure navigation; mobile modal navigation; matching-route language switch |
| `Footer` | Corporate, market and legal navigation with approved disclaimer |
| `Closing` | Reusable final enquiry band |
| `Reveal` | Once-per-section restrained scroll movement; content remains visible before hydration |
| `HeroArt` / `Scene` | Lazy-loaded interactive React Three Fiber structure with static SVG fallback |
| `AssessmentExplorer` | Keyboard-operable verdict buttons; text evidence panel with live announcement |
| `CoverageTable` | Market filtering, semantic headers, explicit status labels, horizontal table region |
| `ServicesList` / `MarketCards` | Reusable navigation-rich overview sections |
| `EnquiryForm` | Contact, demonstration and regulator-request variants; shared validation and state handling |
| `InsightsList` | Market/topic filters, approved article cards or honest empty state |
| `SitePage` | Shared page composition and structured-data output |

Example:

```tsx
import { Button, Eyebrow } from '@/components/ui';
import { Reveal } from '@/components/reveal';
import { ui } from '@/content/site';

<Reveal>
  <Eyebrow>{ui.tagline[locale]}</Eyebrow>
  <Button locale={locale} to="mutabiq/demo">{ui.demo[locale]}</Button>
</Reveal>
```

Use `href(locale, path)` from `src/lib/config.ts` for all internal URLs. Add bilingual copy to `src/content/`, not to presentation components. Use CSS logical properties (`margin-inline`, `inset-inline-end`) and the `.directional` class for mirrored arrows. Do not reverse the brand artwork.

## Motion decisions

The hero visual explains the relationship between regulation, evidence and clarity. It loads after primary text, reacts subtly to pointer movement and includes a pause control. Its canvas is capped at 1.5 device pixels per CSS pixel. It stops continuous rendering while paused or offscreen. Reduced-motion users see a static SVG and do not import the Three.js scene.

Scroll reveals use Motion for React, transform only, once per section, 550ms, with a 0–80ms stagger. Content is never hidden by an initial opacity of zero. Ordinary button press feedback uses 160ms and a 0.97 scale. Hover motion is limited to fine pointers. Disclosure entry is 180ms with `cubic-bezier(.23,1,.32,1)`; no `transition: all` is used. Keyboard navigation stays immediate.

These choices apply the installed `emil-design-eng`, `animate` and `animation-performance` skills. Profile frame rate on a real mid-range phone before making production performance claims; desktop smoothness alone is not evidence of mobile GPU performance.

## Accessibility and fallback rules

- One h1 per route, semantic headings, landmarks, tables and labels.
- Skip-to-content link and visible keyboard focus.
- Native dialog focus containment, Escape dismissal and trigger-focus restoration.
- RTL HTML and Arabic typography are present in the exported HTML, before JavaScript.
- Language switch preserves the page path; language selection is never forced by location.
- Status labels and explanatory text accompany every colour.
- No credential collection, uploads or fake success states in the reserved portal.
- No essential navigation or copy depends on WebGL. Static fallback remains if WebGL fails.
- Form submission is unavailable until configuration is real. Native required fields and server-side validation both apply once enabled.
- Full WCAG 2.2 AA certification requires the remaining assistive-technology, contrast and physical-device acceptance checks described in `QA.md`.

## Source asset

`public/brand/treehouse-official.png` is the uploaded source asset, unchanged. Its transparent canvas has significant whitespace, so `Brand` crops the display with CSS while preserving its original colours and proportions. The social card is supplementary site artwork, not a replacement logo.
