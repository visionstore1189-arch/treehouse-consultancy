# Verification report

Verification date: 15 November 2026. All results refer to the local production export served by Wrangler Pages on this development machine, not to a live Cloudflare account or the existing Mutabiq application.

## Build and server checks

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed with Next.js route type generation and strict TypeScript |
| `npm test` | 11 tests passed |
| `npm run build` | Passed; Next.js 16.4.6 generated 48 bilingual content routes plus support routes |
| Static export verifier | All 48 expected pages have an h1, canonical tag, correct `lang` and `dir` |
| `npm run cf:build` | Cloudflare Pages Function compiled successfully |
| `npm run check:links` | No missing exported internal link or asset targets |
| Wrangler production preview | Homepage returned 200; static response security headers present |
| Unconfigured `/api/enquiry` | POST returns 503; no fake successful submission |
| Dependency audit at installation | No vulnerabilities reported by npm at the time of installation |

The 11 tests cover required production configuration, exact origins and methods, schema failures, consent and notice-version checks, honeypots, oversized requests, Turnstile success/hostname/action, per-IP quota, successful persistence/notification, delayed email, and fail-closed Mutabiq entitlement decisions. SQLite is real and in memory; external Turnstile and Resend calls are mocked. This does not verify real provider credentials, email deliverability or the actual production D1 binding.

## Browser checks performed

The local site was exercised through the Codex in-app browser.

- All 48 English/Arabic routes checked at 390 × 844. One h1 per page, correct exported language/direction, no broken loaded images and no page-wide horizontal overflow.
- All 48 routes checked at 1440 × 1000. One h1 per page, correct language/direction, no page-wide overflow and no unlabelled controls in the DOM check.
- Sixteen additional checks covered representative English/Arabic templates at 320 × 740 and 768 × 1024; no page-wide overflow was found.
- Desktop navigation disclosure, Escape dismissal and coverage-page navigation tested.
- Coverage filter changed from all 10 regulator rows to the two UK rows.
- The language switch retained `/mutabiq/coverage/` while switching to Arabic and correct RTL.
- Assessment explorer changed to Gap and displayed its matching description/evidence; the selected state and live panel updated.
- Mobile Arabic menu opened; Escape closed it and focus returned to the menu trigger.
- Forms visibly reported their unavailable state; controls and submit button were disabled.
- Login and reserved portal were visibly non-operational, without credentials or client data.
- React Three Fiber canvas rendered on the desktop homepage. Selecting the Clarity layer changed the pressed state; Pause motion changed to Resume motion. The static fallback is present.
- The branded bilingual 404 was inspected and returned HTTP 404.
- Rendered text contrast was inspected using computed foreground/background colours on the main page templates. Low-contrast muted labels found during review were darkened. This limited check does not replace a full contrast/accessibility audit for gradients, every state and assistive technology.

`mobile-route-audit.json`, `desktop-route-audit.json` and `responsive-audit.json` contain the per-route browser observations. The delivered screenshots show the actual local desktop output. Mobile layouts were inspected in the browser and their measurements are recorded in the audits; the screenshot exporter produced scaled mobile captures, so those unusable files were excluded.

## Known verification limits

- No live Cloudflare deployment, repository connection, DNS update, certificate issuance or redirect has been executed. Their guides are supplied.
- Browser access was unavailable during the final screenshot refresh after the user's follow-up. Earlier verified screenshots and route-audit results are included; final code/build checks were rerun from the terminal.
- No production Turnstile challenge has been completed, no real email has been sent and no live enquiry record has been stored. Complete authorised end-to-end tests after configuration.
- The client-owned Mutabiq app was not accessed or tested. Authentication, MFA, authorisation, subscriptions and protected downloads remain client integration work.
- Reduced-motion behaviour was verified from code and the fallback path, not by changing the user's operating-system preference. Real WebGL context failure and low-memory GPU behaviour were not simulated.
- The browser console reported a Three.js Clock deprecation warning originating in the React Three Fiber runtime. Rendering worked; no application exception was observed. Track the upstream dependency update.
- Viewport emulation is not a test on physical phones. Safari/iOS, Firefox, Android devices, touch ergonomics, hardware GPU frame rates, VoiceOver/NVDA and 200%/400% zoom acceptance still need targeted checks.
- The under-2.5-second mobile load target and production Core Web Vitals have not been certified. Self-hosted fonts, lazy 3D, capped pixel ratio, static HTML and motion fallbacks are implemented, but real mobile network/CPU measurements are outstanding.
- WCAG 2.2 AA is the implementation target, not a claim of completed independent certification.
- Arabic terminology, legal notices, coverage claims and statutory company details require client review. No CMS editorial workflow or analytics provider has been configured.

## Repeatable acceptance procedure

Run the commands in README, serve with `npm run preview`, and inspect both languages at 320, 390, 768 and 1440px. Test keyboard-only navigation, focus visibility and mobile dialog Escape behaviour. Toggle all verdicts and coverage filters. Verify direct reloads of deep links, the language switch, disabled-state messaging, custom 404 and noindex on reserved pages. Before live forms, test real submissions, expired challenges, duplicate attempts, notification failure, retrieval by authorised staff and retention cleanup.
