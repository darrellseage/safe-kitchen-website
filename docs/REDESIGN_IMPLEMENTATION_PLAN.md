# Redesign implementation plan (Stage B, after approval)

> **Date:** 5 November 2026. **Status:** proposal. Nothing starts until the owner approves a design direction (see `BRAND_DESIGN_DIRECTIONS.md`). Stage B happens on a new branch and is reviewed privately. **Hosting note:** since 2 Nov the repository is connected to Vercel with Vercel Authentication on all deployments and `main` as the production branch. Pushing a Stage B branch creates a sign-in-protected preview build, not a public site; nothing is merged to `main` without the owner's approval, and Deployment Protection must stay on.

## 1. Non-negotiables carried into Stage B

- No public launch, no paid subscriptions, no live checkout, no launch date, no public self-registration. The early-access form stays free and non-committal.
- Honest status labels on every feature; every demo labelled sample data; planned features never shown as available. **Delete the `NEXT_PUBLIC_LAUNCH_PREVIEW` flag and the "launched" wording branches.**
- No invented statistics, testimonials, accreditations, performance claims or "EHO approved".
- The Safe Kitchen application repository is not touched. Only its decision log gets new entries (next free ID after D-088).
- Keep: the two-step form and its spam protection, booking logic, services layer, `pricing.ts`, `features.ts`, the content/config/logic split, all 51 unit tests, the four browser-check suites, the legal pages, and the accessibility baseline.

## 2. Architecture (what exists, what changes)

Existing: Next.js 16.4 App Router, React 19, Tailwind v4 tokens in `globals.css`, content in `src/content`, config in `src/config`, logic in `src/lib`, components in `src/components/{home,ui,site,product,legal}`, static preview exporter in `scripts/preview-export.mjs`, Vitest + Playwright scripts.

Changes:
1. **Tokens:** replace the `@theme` palette with the chosen concept's tokens (Concept A: steel, amber, safe green, warning). Remove `tone-forest` token inversion and the seven section tones; sections choose `light` or `dark` with explicit text colours.
2. **Fonts:** swap `next/font/google` Plus Jakarta Sans for Barlow Condensed + Barlow + JetBrains Mono (A), self-hosted by `next/font` (no runtime Google Fonts requests). Subset to latin.
3. **Components:** new `ui/` primitives: `Rule`, `Stamp`, `ProbeDisplay`, `RecordSheet`, `Ticket` (if borrowing from C), `StatusIndex` (from B). Retire `promises-band`, `guided-tour`, `sound-familiar`, `transformation`, `your-numbers` (calculators move to `/numbers` route or a dialog), `roadmap` leftovers, `kitchen-types`.
4. **Page:** `page.tsx` becomes the nine-section structure in `CONVERSION_STRATEGY.md §4`. Each planned-feature demo stays, restyled, behind `DemoReveal` at all widths except the two core demos (temperature, Inspection Mode), which are open on desktop.
5. **JavaScript diet:** remove `motion` from the homepage (CSS transitions only), lazy-load each demo with `next/dynamic` on first open, keep Radix for tabs/accordion/dialog only. Target ≤ 500KB uncompressed client JS.
6. **Images:** founder photo plus licensed photos that pass the accuracy review; add `sizes`, AVIF/WebP via `next/image`, and a real OG image. Replace the placeholder logo with a concept-matched mark (SVG).
7. **Navigation:** five items that answer questions (How it works · Pricing · Straight answers · Founder · Early access) plus the CTA; mobile menu becomes a short sheet. Header behaviour unchanged (hides on scroll down, never fixed over content).
8. **Status:** `features.ts` unchanged in shape (allergens already present since 2 Nov); the status index section renders from it, and wording follows D-086/D-087: "Planned" means part of the launch plan, "Our vision" does not.
9. **SEO/metadata (Stage 5 can overlap):** title/description per concept copy, `robots` noindex until go-live, FAQ JSON-LD from the shortened FAQ, Organisation schema with the founder once legal details exist.
10. **Content:** `home.ts` rewritten section by section from the recommended copy; `founder.ts` unchanged; `legal.ts` unchanged except the launch-preview removal.

## 3. Work breakdown

| Step | Work | Output | Check |
|---|---|---|---|
| B0 | Branch `claude/redesign-stainless` (or chosen concept) from the current `claude/light-redesign`; record the chosen direction in the app's decision log (next free ID after D-088) | Branch, decision | — |
| B1 | Tokens, fonts, base styles, logo mark; delete launch-preview flag | `globals.css`, `layout.tsx`, `site.ts`, `logo.tsx` | build, lint, tsc |
| B2 | Hero + "what it replaces" + header/nav | Sections 1–2 | browser check at 320/375/768/1280, before/after screenshots |
| B3 | Inspection Mode section and temperature demo restyle | Sections 3–4 | demos.js passes |
| B4 | Who it's for + planned features row with demos behind `DemoReveal` | Sections 5–6 | demos.js, mobile.js |
| B5 | Pricing + straight answers (status index, data, exports, offline, certificates, FSA, "why not EHO approved") | Section 7 | pricing tests, conversion.js |
| B6 | Founder + early-access section; form unchanged | Sections 8–9 | form.js |
| B7 | JavaScript diet (dynamic imports, remove motion), image pipeline, OG image | bundle ≤ 500KB | build output, size check script |
| B8 | Accessibility pass: contrast on steel/amber, focus states, heading outline, keyboard, reduced motion; screen-reader smoke test with VoiceOver on a real device if available | notes in `docs/review/stage-b/` | manual |
| B9 | Private preview export and publish (honest status only, founding offer visible for approval) | artifact link | all four browser suites against the preview |
| B10 | Report: what changed, screenshots before/after, measurements against §8 of the conversion strategy, tests run and not run | `docs/review/stage-b/REPORT.md` | — |

Estimated size: B1–B6 are the bulk; B7–B10 are polish and proof. No new runtime dependencies are needed for Concept A. Concept C would need none either; B none.

## 4. Testing plan (Phase 10 of the brief)

Run and report every time: `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`, the four browser suites at 320/375/768/1280, the audit script for height/words/JS, screenshot comparison (same script, same viewports; a pixel-diff is overkill, side-by-side is enough). Not available in this environment without approval to install: Lighthouse (Core Web Vitals under throttling), axe-core (automated accessibility). If the owner approves `npx lighthouse` and `@axe-core/playwright` as dev dependencies, add both to B8. Real iOS/Android device testing and screen readers are owner-side checks.

## 5. Risks and trade-offs

| Risk | Mitigation |
|---|---|
| Dark industrial look alienates café owners | Light sections for pricing/founder; warm amber; plain copy; test with 3–5 reviewers before Stage B sign-off |
| Breaking continuity with the app's green | Keep the mark, the status greens and the check principles shared; document in the app's DESIGN_SYSTEM as "website variant" |
| Condensed uppercase headlines reduce readability for some readers | Cap H1 at ~8 words; body stays mixed case; mono labels ≥ 12px with letter-spacing |
| Removing the tour and calculators loses work already built | Calculators move to a route; the tour's six steps become the structure of sections 3–6, so the content survives |
| Founder-led voice becomes a single point of failure if the story changes | Content lives in `founder.ts`; nothing else hard-codes it |
| Competitor pricing in docs goes stale | Docs say "as of 5 Nov 2026" and no competitor prices appear on the site |
| Planned features still outnumber built ones | Section 6 is compact and clearly labelled; sections 3–4 show the real core |
| The pilot never happens or slips | Copy says "four kitchens are testing it before anyone pays" only once the pilot is confirmed; until then "will test" |

## 6. Open decisions for the owner

1. Which concept (A recommended; or A with B's status index and C's fear cards, which is what the plan assumes).
2. Headline #1 or #2 (see `CONVERSION_STRATEGY.md §3`).
3. Approve replacing Plus Jakarta Sans on the website only.
4. Approve deleting the launch-preview flag.
5. Approve installing Lighthouse and axe-core as dev dependencies for Stage B testing (optional).
6. Confirm the pilot wording ("four restaurants will test it before launch") may appear on the site.
7. Whether the calculators stay as a separate page or are dropped for now.

## 7. Deliverables checklist (Phase 11)

- [x] `docs/COMPETITOR_RESEARCH.md` (matrix, sources, unknowns)
- [x] `docs/WEBSITE_AUDIT.md` (scores, 20 weaknesses, measurements, before screenshots)
- [x] `docs/BRAND_DESIGN_DIRECTIONS.md` (three concepts, mockups, recommendation)
- [x] `docs/CONVERSION_STRATEGY.md` (audiences, ten heroes, structure, funnel, pricing, copy, success criteria)
- [x] `docs/REDESIGN_IMPLEMENTATION_PLAN.md` (this file)
- [x] Private mockups: https://claude.ai/artifact/GZAWDBGbKGyHMhHEVKkBPa
- [ ] Stage B (after approval)
