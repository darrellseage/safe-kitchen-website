# Website restructure plan: multi-page, original design kept

> **Status (11 Nov 2026):** **Stage B built** on branch `claude/multi-page-restructure`, awaiting the owner's review. Not merged to `main`; nothing public.
> **Owner decisions (11 Nov 2026):** the original Safe Kitchen design stays (Concepts A, B, C and A+ are not used); the site becomes multi-page; it is written as the finished launch-ready site with **no per-feature labels**, protected by a pre-launch stage (`docs/RELEASE_READINESS.md`); the homepage gains the founder's professional experience band (`docs/LOGO_CHECKLIST.md`), making eight homepage sections. Recorded in the app's decision log as D-089.
> **What was built:** sections 2–6 below, as planned, with these differences: components stayed in `src/components/home/` (moving them would only have churned imports); the one-page Claude preview exporter was removed because it can't show a multi-page site; `/features/temperature-checks` and `/features/reports` follow the recommendations in section 8. Screenshots of every page: `docs/review/restructure/`.
> **Measured:** homepage 7,442px on desktop (was 27,250px) and 12,631px on a phone (was 35,257px); 19 pages; 22 distinct internal links, all valid.

---

## 1. Content inventory (what exists today)

**Routes:** `/` (homepage), `/privacy`, `/cookies`, `/terms`, `/accessibility`. No feature pages. Server actions for the form. Nothing from the Safe Kitchen application lives in this repository.

**Homepage: 17 sections, 4,885 words, 27,250px tall on desktop, 35,257px on a phone.**

| # | Section (component) | Desktop height | Interactive demo | Verdict |
|---|---|---|---|---|
| 1 | Hero (`hero.tsx`) | 924 | – | **Stay** (minor layout tidy) |
| 2 | Key messages band (`promises-band.tsx`) | 327 | – | Fold into hero and feature overview |
| 3 | 60-second tour (`guided-tour.tsx`) | 963 | Tour (6 steps, play/pause) | **Move** to How it works |
| 4 | Founder story (`founder-story.tsx`) | 1,047 | – | **Stay**, shortened; full version on About |
| 5 | Sound familiar? + hygiene rating (`sound-familiar.tsx`, `hygiene-ratings.tsx`) | 1,537 | – | **Move**: scenarios to How it works; hygiene figures to Inspection Mode page |
| 6 | Before and after (`transformation.tsx`) | 1,040 | Scroll/toggle scene | **Move** to How it works |
| 7 | Training (`training-section.tsx`) | 1,964 | Training course demo | **Move** to its feature page |
| 8 | AI Checker (`ai-checker-section.tsx`) | 1,394 | AI Checker demo | **Move** to Reports & oversight |
| 9 | Rotas + clock-in (`rotas-section.tsx`, `clock-in-section.tsx`) | 2,642 | Rota import demo, clock-in demo | **Move** to its feature page |
| 10 | Ordering + food waste (`ordering-section.tsx`, `waste-section.tsx`) | 1,536 | Order check demo | **Move** to its feature page |
| 11 | Records + Inspection Mode (`food-safety.tsx`, `inspection-story.tsx`) | 2,303 | Temperature demo, Inspection Mode demo | **Split**: short Inspection intro stays; details move |
| 12 | Allergens (`allergens-section.tsx`) | about 2,800 | Allergen demo | **Move** to its feature page |
| 13 | Built for you (`audiences-section.tsx`) | 1,013 | Site switcher | **Move**: buyer tabs to How it works; site switcher to Reports & oversight |
| 14 | Your numbers (`your-numbers.tsx`) + five systems vs one | 2,141 | 3 calculators | **Split**: "five systems vs one" stays as "What it replaces"; calculators move to Pricing |
| 15 | Pricing (`pricing.tsx`) | 1,391 | – | **Stay**, condensed; full version on Pricing |
| 16 | Straight answers + FAQ (`trust-section.tsx`, `faq.tsx`) | 2,513 | Accordion | **Move**: status and trust cards to About; FAQ to FAQs |
| 17 | Sign-up (`final-cta.tsx`, `early-access-form.tsx`) | 1,049 | Two-step form, call booking | **Stay** |

**All 12 interactive pieces are kept:** temperature check, Inspection Mode, allergen demo, training course, rota import, clock-in, order check, AI Checker, site switcher, guided tour, before/after scene, three calculators, plus the two-step form.

**Duplicated content today**
- Price stated in the hero, pricing section, final CTA and FAQ (keep hero line and pricing; drop from final CTA body).
- "Unlimited staff" (5 times), "no set-up fee" (4), "Level 2 training included" (5).
- Training disclosure in the training section, trust cards and FAQ (one source, shown on the Training page and FAQs only).
- Inspection story told in "Sound familiar?", the Inspection timeline and the tour.
- Clock-in privacy points in the section and the FAQ; AI limits in the section, trust card and FAQ.
- Planned-feature status in section chips, the tour, the trust status lists and the first FAQ.
- Ordering and food waste both appear again inside the savings calculator.

**Content needing clarification or correction before Stage B**
1. **"Temperature Monitoring"** suggests automatic sensors, which are "Our vision" only. Recommend the page title **"Temperature checks"** (menu label can read "Temperature checks & records").
2. **Which temperature records are in the app's plan?** The site's status file has one entry (`temperatures`). Delivery checks, probe accuracy checks, cooling and reheating records were listed in an earlier brief but are not in `features.ts` or confirmed against the app's `PROJECT_PLAN.md`. I'll list only what the app plan confirms and mark the rest for the owner to confirm.
3. **"Reports"**: confirmed items are the manager overview, Inspection Mode print/PDF, the AI Checker's summaries, timesheet export and record export (planned). No analytics dashboards exist in the plan, so none will be described.
4. **AI Checker has no place in the owner's eight-item list.** Recommend it leads the Reports & Management Oversight page.
5. **Launch-preview wording (`whenLive`)** still exists in the code. Recommend removing it during the restructure so every page has one honest version (owner decision).
6. "Level 2" wording and the allergen legal sentence still need a solicitor (already recorded).
7. Pilot wording ("four restaurants will test it before launch") is not on the site yet: owner to confirm it may appear on About.
8. `docs/HANDOVER.md` still says there is no `main` branch; it will be corrected in Stage B.

---

## 2. Proposed sitemap

```
/                              Home (7 sections)
/features                      All features (overview of the eight, grouped)
/features/food-safety          Food Safety & SFBB
/features/inspection-mode      EHO Inspection Mode
/features/temperature-checks   Temperature checks & records
/features/allergens            Allergen management
/features/training             Staff training & certificates
/features/rotas-clock-in       Staff rotas & clock-in
/features/ordering             Smart ordering & suppliers
/features/reports              Reports, AI Checker & management oversight
/how-it-works                  How it works
/pricing                       Pricing
/about                         About / Founder (with honest status and data)
/faqs                          FAQs
/early-access                  Early access, demo or call (the existing form)
/privacy /cookies /terms /accessibility   (unchanged)
```

**Shared or separate?**
- **Rotas + clock-in: one page.** Clock-in depends on the rota; they are already one section with a shared workflow rail.
- **Ordering + suppliers + food waste: one page.** Waste is a consequence of ordering, not a feature.
- **Reports + AI Checker + multi-site: one page.** All three are "what the manager sees".
- **Food Safety & SFBB, Inspection Mode and Temperature checks: three pages**, as the owner listed. Each has its own demo and its own search intent ("digital SFBB", "EHO inspection records", "digital temperature log"). To avoid duplication: Food Safety is the umbrella (diary, cleaning, checklists, problems, suppliers, pest control, shared tablet) and links out; the temperature demo lives only on Temperature checks; the Inspection demo only on Inspection Mode.
- **`/features` overview: justified.** It is the dropdown's parent, the mobile menu's "All features" link and the breadcrumb root. It reuses the homepage feature cards, so no new copy.
- **`/faqs`: justified.** Each feature page shows its 3–4 relevant questions; `/faqs` shows all, grouped. One data file feeds both. FAQ structured data goes on `/faqs` only.
- **`/early-access`: justified.** Every page's call to action needs one clean target. The same form component is also embedded at the foot of the homepage.

No redirects are needed: the site has never been public, so no old links exist.

---

## 3. Navigation

**Desktop header:** Logo · **Features ▾** · How it works · Pricing · About · FAQs · [Get early access]

**Features dropdown** (two columns, each item with a one-line description and its honest status chip):

| Food safety | Running the kitchen |
|---|---|
| Food Safety & SFBB | Staff training & certificates |
| EHO Inspection Mode | Staff rotas & clock-in |
| Temperature checks | Smart ordering & suppliers |
| Allergen management | Reports & oversight |

Footer of the dropdown: "See all features →".

- Built with Radix `NavigationMenu` (already installed in `radix-ui`): opens on click or Enter/Space, arrow keys move between items, Escape closes, focus returns to the trigger. The current page is marked with `aria-current="page"`.
- **Mobile:** the existing slide-in menu. "Features" is an expandable row (closed by default) showing the eight pages plus "All features"; then How it works, Pricing, About, FAQs, and the early-access button. Six rows when closed, all 52px tall, no horizontal scroll. The "Early access" button stays in the header.
- **Breadcrumbs** on feature pages only: Home › Features › Allergen management (with breadcrumb structured data).
- **On feature pages:** a "Related features" row (2–3 cards) and "Next feature →" link, so visitors can walk the set without returning to the menu.
- **Footer:** Features (8 links) · Company (How it works, Pricing, About, FAQs, Early access) · Legal (4 links).
- Header behaviour is unchanged: it hides when scrolling down and returns on scroll up; nothing is fixed over content.

---

## 4. Homepage: before and after

| Before (17 sections) | After (7 sections) |
|---|---|
| Hero | **1. Hero**: same design. Headline, the one-sentence description, price line, two buttons, founder line. Small tidy: the second button becomes "See how it works" → `/how-it-works`. |
| Key messages band | Folded into the hero sentence and section 3 |
| 60-second tour | → How it works |
| Founder story | **5. Founder**: photo, two short paragraphs, quote, "Read Darrell's story" → `/about` |
| Sound familiar? + hygiene rating | → How it works / Inspection Mode page |
| Before and after | → How it works |
| Training | Card in section 3 → `/features/training` |
| AI Checker | Card in section 3 → `/features/reports` |
| Rotas + clock-in | Card in section 3 → `/features/rotas-clock-in` |
| Ordering + waste | Card in section 3 → `/features/ordering` |
| Records + Inspection Mode | **2. EHO Inspection Mode**: the three-step visit timeline and the Inspection Mode demo (open on desktop, behind "Try the demo" on phones), with the "can't guarantee a rating" line and a link to the full page |
| Allergens | Card in section 3 → `/features/allergens` |
| Built for you | → How it works |
| Your numbers + five systems vs one | **4. What Safe Kitchen replaces**: the existing "five systems vs one" comparison. Calculators → Pricing |
| Pricing | **6. Pricing**: the two plan cards (with and without VAT), unlimited staff, no set-up fee, "See full pricing" → `/pricing` |
| Straight answers + FAQ | One line of honest status under section 3; the rest → About and FAQs |
| Sign-up | **7. Final call to action**: the two-step form, unchanged |

**Section 3 (feature overview):** eight cards in the original card style, each with an icon, name, one-line benefit, honest status chip and "See how it works →" linking to its page.

**Expected result:** about 7,000px on desktop (from 27,250px) and about 10,000px on a phone (from 35,257px), roughly 1,300 words (from 4,885). The homepage ships two demos instead of twelve, so it will load noticeably less JavaScript.

---

## 5. Feature page structure (one template, eight pages)

1. Breadcrumb
2. **Page hero**: eyebrow (feature name + status chip), problem-led headline, two-sentence explanation, button to early access
3. **What it does**: 3–4 benefit points, split "for owners and managers" / "for the kitchen team"
4. **Try it**: the existing interactive demo(s), labelled as sample data
5. **During a shift**: a short realistic timeline (reusing tour steps and existing copy)
6. **What's recorded / what you can do**: a plain list of supported records and actions, each with its honest status
7. **Good to know**: limits and disclosures (e.g. AI limits, clock-in privacy, training disclosure, FSA non-affiliation)
8. **Questions**: 3–4 FAQs from the shared FAQ file
9. **Related features**: 2–3 cards
10. **Call to action** band → `/early-access`

| Page | Working headline (existing copy) | Existing content that moves here | Demos reused | Status today |
|---|---|---|---|---|
| Food Safety & SFBB | "Less paperwork. More kitchen." | Records section intro, "why" points, shared tablet and PINs, supplier list, pest control, cleaning, problems | (links to the two below) | In development |
| EHO Inspection Mode | "When the EHO walks in, everything's in one place." | Inspection timeline, what you can keep for an inspection, verified hygiene-rating figures, "can't guarantee a rating" | Inspection Mode demo | In development |
| Temperature checks | "Try a temperature check the way your team would." | Four design principles (gloves, never prefilled, automatic who/when, bad readings) | Temperature demo | In development |
| Allergen management | (existing allergens headline) | Whole allergens section and its six sourced facts | Allergen demo | Planned (part of the launch) |
| Staff training & certificates | "Stop paying for food hygiene training one employee at a time." | Comparison table, four steps, certificate disclosure, uploads of other certificates | Training course demo | Planned |
| Staff rotas & clock-in | "Take a photo of your rota. Let Safe Kitchen do the rest." | Rota steps, workflow rail, clock-in, privacy points | Rota import demo, clock-in demo | Planned |
| Smart ordering & suppliers | "Stop duplicate orders before they cost you money." | What it catches, order steps, food waste (WRAP source) | Order check demo | Planned |
| Reports & oversight | "A second set of eyes on your kitchen records." | AI Checker section and limits, site switcher, manager overview, timesheet and record export (planned) | AI Checker demo, site switcher | Planned / in development |

**Other pages**
- **How it works:** guided tour, before/after scene, "Sound familiar?" scenarios, buyer tabs (takeaway owner, head chef, manager, multi-site), shared tablet and PIN explanation, "what happens after you join early access".
- **Pricing:** full pricing section, "what you'll never pay for", multi-site example, the three calculators, pricing FAQs, founding offer (still hidden unless switched on).
- **About:** full founder story, the honest status lists ("built and being tested / in development / planned"), data, exports, offline, FSA non-affiliation, ideas being explored, pilot plan (if approved).
- **FAQs:** all questions, grouped (Getting started · Food safety and inspections · Training · Rotas and clock-in · Ordering · Pricing · Data and security).

No new claims: every page is assembled from existing, already-reviewed copy plus short linking sentences. New sentences will follow the same rules (no testimonials, endorsements, guarantees, certifications, savings promises, launch dates, SMS or cameras).

---

## 6. Reusable components

**Kept as they are:** every demo (`temperature-demo`, `inspection-mode-demo`, `allergen-demo`, `training-demo`, `rota-demo`, `clock-in-demo`, `ordering-demo`, `ai-checker-demo`, `site-switcher`, `guided-tour`, `transformation`, the three calculators), `early-access-form`, `demo-reveal`, `step-cards`, `sales-bits`, `workflow-rail`, all of `ui/` (Section, SectionHeading, StatusChip, ButtonLink, DeviceFrame, Reveal, PillarIcon), `site-footer`, `logo`, `legal-page`.

**Moved from `components/home/` to `components/features/`** (same code, so they can be used on any page): the feature sections and their demos.

**New, small, in the existing style:**
- `site/main-nav.tsx` (desktop dropdown) and an update to the mobile menu
- `ui/breadcrumbs.tsx`
- `features/feature-page.tsx` (the template above) and `features/feature-card.tsx`
- `ui/page-hero.tsx`, `ui/cta-band.tsx`, `features/related-features.tsx`, `features/shift-example.tsx`, `features/records-list.tsx`
- `faq/faq-list.tsx` (the existing accordion, taking a list of questions)

**New content files:** `content/features.ts` (one entry per page: slug, name, headline, benefits, records, related, FAQ ids, SEO title and description), `content/faqs.ts` (all questions with topic tags), `content/site-map.ts` (one list that drives the header, mobile menu, footer, breadcrumbs and `sitemap.xml`). `content/home.ts` is split so each page imports only its own copy.

---

## 7. Technical implementation plan (Stage B, after approval)

**Current set-up, confirmed**
- Branches: `claude/light-redesign` (working), `main` (Vercel production branch). The Vercel project has **Vercel Authentication on all deployments**, so every build, including `main`, needs the owner's sign-in. Pushing any branch creates a protected preview build.
- Stack: Next.js 16.4 App Router, React 19, Tailwind v4, Radix, `motion`, Vitest (9 test files), four Playwright browser-check scripts.
- `allowIndexing` is false, so every page tells search engines not to index it.
- The form saves nothing in production until the database is connected; there is no checkout, no payments and no self-registration anywhere in this repository.

**Steps**

| Step | Work | Checks |
|---|---|---|
| B0 | Create branch `claude/multi-page-restructure` from `claude/light-redesign`; record the decision in the app's decision log (next free ID) | – |
| B1 | Site map file, route helpers, new header (dropdown), mobile menu, footer, breadcrumbs | Keyboard and screen-reader roles, 320/375/768/1280px |
| B2 | Move feature sections into `components/features/`; build the feature-page template and the eight pages, reusing demos | Existing demo checks pass on their new pages |
| B3 | How it works, Pricing, About, FAQs, Early access pages | Form and booking checks; pricing consistency test across all pages |
| B4 | New seven-section homepage | Height and word targets; before/after screenshots |
| B5 | Metadata per page (title, description, canonical), `sitemap.xml` and `robots` (still no-index), breadcrumb and FAQ structured data | Build output; no duplicate titles |
| B6 | Remove the launch-preview flag (if approved); update `HANDOVER.md` | Unit tests |
| B7 | Tests: update `content-links` test to cover every route and link; add a link crawler (every internal link returns a page), a navigation check (dropdown, mobile menu, keyboard) and a pricing-consistency check; run TypeScript, lint, unit tests, production build and all browser checks | All listed in the report |
| B8 | Push the branch: Vercel builds a **sign-in-protected preview**. Desktop and mobile screenshots of every page saved in `docs/review/restructure/` | Owner reviews; nothing merged to `main` without approval |

**Notes and risks**
- **Private preview:** the single-folder preview exporter used for earlier Claude preview pages only handles a one-page site. For a multi-page site the protected Vercel preview is the right tool. I can't see the Vercel dashboard, so the owner opens the preview link while signed in; I'll supply screenshots of every page as well.
- **Performance:** each page loads only its own demos; the homepage drops from twelve interactive pieces to two.
- **SEO:** unique title and description per page, one H1 per page, canonical URLs, no duplicated body copy (shared facts come from one file but each page presents different sections).
- **Risk: thin pages.** Planned features have less real detail than built ones. Each page states its status plainly and only lists confirmed records and actions.
- **Risk: copy drift across 14 pages.** Prices, statuses, disclosures and FAQs each stay in a single file, with tests that fail if a page states a price that isn't from `pricing.ts`.
- **The application is not affected:** it lives in a different repository and nothing here touches it.
- **Not done in Stage B:** analytics, cookie banner, public indexing, domain, payments, self-registration, merging to `main`.

---

## 8. Decisions needed from the owner

1. Approve the sitemap (14 pages plus the 4 legal pages) and the navigation.
2. Approve the seven-section homepage map.
3. Page title **"Temperature checks"** rather than "Temperature Monitoring" (sensors are not part of the launch plan).
4. AI Checker on the **Reports & oversight** page (or its own ninth page).
5. Confirm which temperature records the app will support (delivery, probe checks, cooling, reheating), or leave them off until confirmed.
6. Remove the launch-preview wording so each page has one honest version.
7. May the pilot wording ("four restaurants will test it before launch") appear on About?
8. Review through the protected Vercel preview plus screenshots (recommended), or keep a single-page Claude preview as well.
