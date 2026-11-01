# Safe Kitchen website: handover

> **Purpose:** everything a new Claude chat (or a developer) needs to carry on without the old conversation.
> **Written:** 1 November 2026. **Owner:** Darrell Seage (beginner developer: explain things in plain UK English, one step at a time, and ask before installing, committing, pushing, publishing or connecting services).
> **State in one line:** the marketing website is built and tested on a branch, with a private preview for review. **Nothing is live, nothing is deployed, no payments or offers are active.**

---

## 1. Start here (for a new Claude chat)

1. Read this file first, then `docs/CONVERSION_REVIEW.md` (latest decisions) and the app's `CLAUDE.md` and `DECISIONS.md` (D-073 to D-084 concern the website).
2. Work in **`darrellseage/safe-kitchen-website`** on branch **`claude/light-redesign`**. Don't touch the app repository's code. Only its decision documents are updated, on branch `claude/website-decisions`.
3. Check everything still runs:
   ```bash
   cd safe-kitchen-website
   npm install                 # only if node_modules is missing (ask first)
   npx tsc --noEmit && npm run lint && npm test && npm run build
   npm run dev                 # http://localhost:3000
   NODE_PATH=$(npm root -g) node scripts/browser-checks/conversion.js
   ```
4. Ask the owner what to do next (see §12, "What's waiting on the owner"). Don't start Stage 5 or deployment without an explicit go-ahead.

---

## 2. Repositories, branches and links

| What | Where |
|---|---|
| Website repo | `darrellseage/safe-kitchen-website` |
| Website working branch | **`claude/light-redesign`** (all current work). Older branches: `claude/stage-1-proposal` (the repo's default branch; there is no `main` yet), `claude/stage-2-homepage` |
| App repo | `darrellseage/safe-kitchen` (default `main`) |
| App branch with website decisions | **`claude/website-decisions`** (decision log only: D-073 to D-084, CLAUDE.md product focus, PROJECT_PLAN, TRAINING_PLATFORM_PLAN) |
| Pull requests | None opened yet. Only open one when the owner asks |
| **Current private preview** | https://claude.ai/artifact/X7w92WYj6C2RpCM7a9uNMV (artifact slug `f3e9fc83-81af-4501-918b-3c2455941b58`), private to the owner |
| Older private preview (left unchanged on purpose, may have been shared for a second opinion) | https://claude.ai/artifact/LThWT9aaAdEG9nEVDKB8M2 (slug `9d97efb5-6821-4864-80cf-a78c437d0d35`, "launch preview" look from 31 Oct) |
| Live website | **None.** The domain `safekitchen.uk` is planned (owner to buy). No hosting account has been connected |

Key commits on `claude/light-redesign` (newest first): see `git log --oneline`. Milestones: `1c68f8a` Stage 4 · `95df36e` conversion review · `0d2f8d3` conversion changes · `12d93b8` founder photo · `6e4d7f3` phone "Try the demo" buttons · then the handover commit.

---

## 3. What Safe Kitchen is (brand positioning)

- **Product:** a premium, mobile-first kitchen management app for UK food businesses, built around the Food Standards Agency's *Safer Food, Better Business* system. **All-in-one, food safety first** (app D-075).
- **For:** independent UK takeaways, restaurants, cafés, pubs and small groups. One plan per site covers everything.
- **Out of scope:** payroll (timesheet export only), POS, HR, menu costing. **No cameras**: the AI Checker checks records and forms (D-077).
- **Name:** "Safe Kitchen" is a working name (app D-068). It comes from one setting, `src/config/site.ts`. Trademark checks are outstanding.
- **Messages the homepage must land (owner, 1 Nov 2026):**
  1. Designed by chefs and owners, for chefs and owners.
  2. Less paperwork and more time running the kitchen.
  3. Everything in one easy-to-use system.
  4. AI-powered tools to reduce costly mistakes and unnecessary administration.
  5. Unlimited staff access and training for one affordable per-site price.
  6. Built around the realities of busy professional kitchens.
- **Tagline in config:** "One kitchen. One system. Everything where it should be." Hero headline: "Running a kitchen is hard enough. The paperwork shouldn't be."
- **Never claim:** FSA affiliation or endorsement, "EHO approved" (refused: see §10), guaranteed hygiene ratings, invented statistics, testimonials, accreditations or performance figures, or features as available before they're live and tested.

### Founder story (owner-supplied, 1 Nov 2026, permission to name him)
- **Darrell Seage**, founder. Over 15 years in professional kitchens, including **Head Chef and Kitchen Manager** roles. Restaurants, cafés, pan-Asian kitchens and large hospitality operations, including **managing multiple food outlets at a holiday park**.
- Responsible for food hygiene standards, kitchen inspections, staff training, rotas, stock ordering, food costs, daily checks and managing kitchen teams.
- Quote: "Chefs should be able to concentrate on cooking, not paperwork, and owners should have confidence that their kitchens are being managed properly."
- **Photo:** Darrell's own photograph, `public/images/founder-darrell.jpg` (supplied 1 Nov 2026). Never replace it with a stock or generated image.
- Copy lives in `src/content/founder.ts`. Don't add roles, venues, awards or numbers he hasn't confirmed. The story is written in the first person: the owner should approve the final wording.

---

## 4. Pricing and subscription decisions (confirmed)

| Item | Decision | Source |
|---|---|---|
| Monthly | **£14.99 + VAT per site** (£17.99 including VAT) | D-074, D-081 |
| Annual | **£149.99 + VAT per site** (£179.99 including VAT). Saves £29.89 a year (16.6%) | D-074, D-081 |
| Staff | **Unlimited staff** per site, never charged per employee | D-074 |
| What's included | Everything: food safety, Level 2 training and certificates, rotas, clock-in, AI Checker, ordering, Inspection Mode, shared tablet | D-076, D-079 |
| Set-up fees | **None** | D-081 |
| Multi-site | Per-site pricing (example on the site: 3 sites = £44.97 a month + VAT); larger groups can book a call | D-074 |
| Early access | **Free, no payment card, no commitment** | D-081 |
| VAT display | Show both excluding and including VAT (20% standard rate assumed) | D-081 |
| Free trial (future) | **Planned only:** 30 days per site, no card, subject to commercial and technical feasibility. **Not mentioned on the website** | D-084 (proposed) |
| Referral reward | Planned (Growth Phase 4): one month's credit after the referred business's first paid payment. Not on the website | app D-015 to D-022 |

Prices live only in `src/config/pricing.ts` (with tests in `tests/pricing.test.ts`).

### Founding customer offer: exact proposed terms (D-082)
**Status:** approved in principle by the owner; **NOT active**; **hidden on the real website** (`foundingOffer.announce` is false unless `NEXT_PUBLIC_SHOW_FOUNDING_OFFER=1`). It's shown only in the private preview so the owner can approve the wording.

- **Who:** the first **100 paying business customers**, counted by their first successful subscription payment **after launch**.
- **What:** they keep the price of their **original plan (monthly or annual) for their original site** for as long as that subscription continues **without interruption**. If it's cancelled or lapses, the locked price ends.
- **VAT:** the lock covers the price before VAT. VAT is charged separately at the rate that applies.
- **Extra:** one **complimentary onboarding call**.
- **Limits (draft):** not for additional sites or plan changes [to confirm]; not transferable; no cash alternative; change of ownership [to confirm].
- **Starts:** at launch only. Full terms need legal advice and must be published before the offer is advertised.
- **Tracking requirement (app Phase 10 billing):** assign each founding place atomically at the first successful paid payment, unique, capped at 100, auditable and never reused. Record the locked plan, site and price, and end the lock automatically on cancellation or lapse.
- **Website wording (preview only):** "The first 100 businesses to subscribe at launch keep their launch price for as long as their subscription continues without a break, plus a free onboarding call to get set up." Small print: "Applies to the original plan and site. VAT is charged separately at the rate that applies. Starts at launch; full terms will be published before then."
- **Draft terms** are on the Terms page (`src/content/legal.ts`, "Founding customer price lock (draft, not yet active)").

---

## 5. Complete feature list and honest status

Statuses come from `src/config/features.ts` (the single source for every label on the site) and the app's `CLAUDE.md`. **Nothing is open to customers yet.**

### Built in the app and being tested (not open to customers)
- Business accounts and secure sign-in (app Phase 2B-1)
- Two-step verification with backup and a recovery procedure (2B-2)
- Business, sites and staff set-up (2B-3) and invitations (2B-4)
- Shared kitchen tablet: set-up, setup codes, personal staff PINs, PIN sign-in, auto-lock, lockout and unlock, language per person (2C-1, 2C-2)
- Onboarding prototype and daily-check prototype screens (demo content, no database)

### In development
Daily temperature records · cleaning · checklists · problems and corrective actions · manager overview · **Inspection Mode** (print or save as PDF) · shared tablet daily use · supplier list · pest control records.

### Planned
**Level 2 Food Hygiene course** (in-house, Safe Kitchen certificates, D-080) · staff certificates and uploads of certificates from other providers · document uploads · **rotas** and **rota import** from a photo, screenshot, PDF, Word or Excel file (always a draft until a manager publishes; D-054, D-078, D-080) · **clock-in and attendance** (location checked only at clock-in, tablet PIN alternative; D-078) · timesheet export · **AI Checker** (checks records and forms; no cameras; never authoritative; D-077) · **smart supplier ordering** (duplicate and unusual order checks, manager approval, "sent" ≠ "accepted") · **record export when a customer leaves** (D-083: not advertised until built and tested) · **offline daily checks** (D-038: not claimed until tested).

### Our vision (ideas)
Bluetooth temperature probes · connected fridge and freezer sensors (manual entry always available; D-056, D-057) · more supplier connections · smarter stock suggestions.

### Staff training disclosure (mandatory wherever the course is promoted, D-080)
"Safe Kitchen runs its own in-house course and issues Safe Kitchen certificates after a successful assessment. It isn't an externally accredited or regulated qualification, and it isn't endorsed by any awarding or governing body."

---

## 6. Website: architecture

- **Stack:** Next.js 16.4.3 (App Router, Turbopack), React 19.3, TypeScript strict, Tailwind CSS v4, `motion` 14.9 (animations), `radix-ui` 1.8 (dialog, accordion, tabs), `lucide-react` (icons), `zod` 4 (validation), Vitest 5. **A separate project from the app** (D-073). This Next.js version differs from older documentation: check `node_modules/next/dist/docs/` before using new APIs.
- **Folders:**
  - `src/app/`: `page.tsx` (homepage order), `layout.tsx` (font, metadata, `noindex` while `allowIndexing` is false), legal pages `privacy`, `cookies`, `terms`, `accessibility`, server actions in `actions/early-access.ts` (plus `early-access.preview.ts`, the stand-in for the static preview)
  - `src/config/`: `site.ts` (name, URL, `allowIndexing`, `launchPreview`), `pricing.ts`, `features.ts` (statuses), `booking.ts` (call hours)
  - `src/content/`: all wording. `home.ts` (every homepage section), `founder.ts`, `legal.ts`, `stats.ts`, `demo-data.ts` (sample data), `images.ts` (photo licences and accuracy notes), `navigation.ts`
  - `src/lib/`: logic with tests. `value.ts`, `calculator.ts`, `temperature-scale.ts`, `demos/*`, `booking/slots.ts`, `early-access/{schema,spam,store}.ts`, `services/{supabase,turnstile,email}.ts` (server-only)
  - `src/components/home/`: one file per section or demo. `demo-reveal.tsx` is the phone "Try the demo" wrapper; `step-cards.tsx`, `sales-bits.tsx` are shared bits
  - `src/components/ui/`: section, section heading, status chip, buttons, device frame, reveal, icons. `src/components/site/`: header, footer, logo
- **Homepage order (16 sections):** Hero → key messages band → 60-second guided tour → founder story → "Sound familiar?" + hygiene rating → before and after scene → Training → AI Checker → Rotas + clock-in → Ordering + food waste → Inspection-ready records (temperature demo + Inspection Mode) → "Built for you" (takeaway owner, head chef, restaurant manager, multi-site) → "Your numbers" (3 calculators) + five systems vs one → Pricing → Straight answers (status, data, limits, ideas, FAQ) → two-step sign-up.
- **Phones:** long demos and the calculators sit behind "Try the demo" buttons (closed by default below 768px, always open on tablet and desktop). Header shows an "Early access" button. No fixed bars over content (app rule): the header hides while scrolling down and returns on scroll up.
- **Honest-status system:** `statusOf(feature)` and `StatusChip` show "In development", "Planned" or "Our vision". `whenLive(now, launched)` picks honest or launched wording. `NEXT_PUBLIC_LAUNCH_PREVIEW=1` shows everything as live: **private review only, never on the public site**.
- **Sign-up form (two steps):**
  - Step 1 is email, choice (early access, demo or call) and an optional, unticked product-news box. It's saved straight away, and the form says so before sending.
  - Step 2 is name, business (optional), type, sites and message, plus a call time for calls. It's optional for early access ("Skip for now") and required for demos and calls.
  - Spam protection: honeypot, minimum fill time, rate limit (10 per 10 minutes per connection, in memory) and Cloudflare Turnstile on step 1.
  - Marketing consent is stored with its wording version and time.
  - Without a database in production, the form honestly says "Sign-ups aren't open just yet".
- **Call booking:** Europe/London, 30-minute slots, 14 days ahead, 24 hours' notice. **Placeholder hours: Tuesday and Thursday, 2pm to 5pm.** Only genuinely free times are shown, and a booked slot is unique in the database.
- **Services (switch on by environment variables, see `.env.example` and `docs/SETUP_SERVICES.md`):** Supabase (`SUPABASE_URL`, `SUPABASE_SECRET_KEY`, a separate London project, run `docs/supabase-website.sql`), Turnstile (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`), Resend (`RESEND_API_KEY`, `NOTIFY_EMAIL`, `NOTIFY_FROM`). Preview flags: `NEXT_PUBLIC_LAUNCH_PREVIEW`, `NEXT_PUBLIC_SHOW_FOUNDING_OFFER`, `PREVIEW_EXPORT`, `NEXT_PUBLIC_PREVIEW_EXPORT`. **No accounts are set up yet.**
- **Private preview build:** `node scripts/preview-export.mjs` builds a static copy into `.preview-publish/`, with honest labels and the founding offer visible (`--launch` gives the old "everything live" look). It's published with the Claude artifacts tool `publish_files` (mode `replace`, slug above). The static copy's form saves nothing.

## 7. Design, branding and colours

- **Font:** Plus Jakarta Sans only (`--font-jakarta`), extra-bold headings with tight letter spacing.
- **Colours** (copied from the app's DESIGN_SYSTEM.md, defined in `src/app/globals.css`; components use tokens, never hex values):

| Token | Hex | Use |
|---|---|---|
| brand-950 | `#06261d` | darkest green |
| deep / brand-900 | `#0b3b2e` | deep green backgrounds (`bg-deep`), dark text |
| brand-800 / 700 / 500 | `#104a3a` / `#145a44` / `#2e8b6a` | greens; 500 is the headline accent |
| brand-200 / 100 / 50 | `#c5e4d3` / `#dcefe6` / `#eef7f2` | light green section tones |
| accent-700 / 600 / 500 | `#0b6462` / `#0f7c7a` / `#14a3a0` | teal: buttons and actions (600) |
| accent-300 / 100 / 50 | `#7fd3cf` / `#d7f0ee` / `#ecf8f7` | light teal |
| surface / raised / sunken | `#faf7f2` / `#ffffff` / `#f2ede4` | warm neutrals |
| line / control-border | `#e6dfd3` / `#857d70` | borders |
| ink / muted / subtle | `#1c2421` / `#4f5b56` / `#616d68` | text |
| success / warning / danger / info | `#1f8a4c` / `#b7791f` / `#c2410c` / `#2563eb` | status |

- **Section tones** alternate light and darker greens: white, warm, mint, sage, seafoam, fern and forest (deep green with light text through `.tone-forest`).
- **Logo:** a placeholder leaf-and-tick mark (`src/components/site/logo.tsx`) until final branding.
- **Photos:** licensed Unsplash stock photos stored in `public/images` (licences and accuracy notes in `src/content/images.ts`), plus Darrell's own photo. Replace the stock photos with commissioned ones before launch where possible.
- **Accessibility built in:** WCAG 2.2 AA target, 48px touch targets, keyboard support, skip link, reduced-motion support (content is never hidden by animation), logical (RTL-safe) spacing.

---

## 8. Conversion and marketing decisions (1 Nov 2026)

All ten review priorities were approved and built (full reasoning in `docs/CONVERSION_REVIEW.md`):
- **Hero:** answers what, who, why and how much on the first screen: price, per site, + VAT, unlimited staff, training included, no set-up fees, free early access, plus the founder line with photo.
- **Founder story** near the top, under "Designed by chefs and owners, for chefs and owners".
- **Fewer sections:** 22 became 16 by merging related features. The five repeated sign-up boxes are gone (four sign-up prompts remain: header, hero, pricing, final form).
- **Top selling points first:** unlimited Level 2 training, AI Checker, rota photo import, smart ordering, inspection-ready records.
- **60-second guided tour** (6 steps, play/pause, each linking to its full demo). Every original demo is kept.
- **Phones:** "Try the demo" buttons keep the page about 24% shorter (about 31,100px, down from 40,900px) while selling points, prices and buttons stay visible.
- **Pricing:** monthly and annual side by side, with and without VAT, a "what you'll never pay for" list, a multi-site example and the "12 minutes a week pays for the annual plan" line.
- **Trust:** "Straight answers" section with real development status, data security, exports (planned), offline (not yet), training certificates, AI limits and no FSA affiliation.
- **Buyer tabs:** takeaway owner, head chef ("It checks the paperwork, not your team"), restaurant manager and multi-site operator.
- **Calculators:** combined into one "Your numbers" section (overall value, admin time, revenue at risk). All figures are labelled illustrative.

---

## 9. Testing and verification

- **Unit tests:** `npm test` (51 tests: pricing including VAT, value calculations, calculator, booking slots and time zones, spam checks, the two-step store, demo logic, homepage links).
- **Browser checks:** `scripts/browser-checks/` (see its README). Last run on 1 Nov 2026: demos 27/27, conversion all passed, form all passed, mobile all passed. Against the static preview, the founding offer showing and the booked time not disappearing are expected differences.
- **Also passing:** `npx tsc --noEmit`, `npm run lint`, `npm run build`.

## 10. Known issues, limits and untested areas

- **FSA hygiene statistics** (48% / 66% / 14%) are **unverified**, because gov.uk was blocked by the session's network policy. They're hidden on the real site and shown only in the "launch" preview. Allow `www.gov.uk` and `assets.publishing.service.gov.uk` in the environment, then verify them.
- **Legal pages are drafts** with `[placeholders]` (company details, ICO number, retention period, liability, founding-offer details). A solicitor review is needed.
- **Call hours are placeholders** (Tue/Thu 2–5pm).
- **Stock photos** are stand-ins.
- **No services connected** (Supabase, Turnstile, Resend, Vercel). The database script `docs/supabase-website.sql` was changed for the two-step form; run the current version when setting up (no tables exist yet).
- **Rate limiter** is in memory per server instance. On Vercel it isn't shared between instances; Turnstile is the main protection.
- **Step 2** of the form relies on step 1's id and email (Turnstile runs on step 1 only). The two-step form needs JavaScript; there's no no-JavaScript fallback for step 2 (untested).
- **Screen-reader testing** hasn't been done (keyboard and automated checks have).
- **Desktop page** is still long (about 24,400px), because the demos stay open on larger screens by design.
- **"Level 2"** wording for an unaccredited in-house course carries legal risk: the disclosure is mandatory, and a solicitor review or CPD accreditation is recommended.
- **"EHO approved"** was requested and refused. It would be a banned claim under consumer protection law (CPRs/DMCC Act 2024, CAP Code). Lawful alternatives: a named reviewer quoted with written permission, a genuine testimonial, or "built with input from environmental health professionals" if true.
- **"Designed by chefs and owners"** is confirmed by the owner. Keep it accurate.
- The website repo has **no `main` branch** (default is `claude/stage-1-proposal`). Decide on a main branch before deployment.
- **Not built yet (Stage 5):** analytics (GA4 with a consent banner), SEO files (sitemap, robots, Open Graph images), structured data beyond the FAQ, performance audit.

## 11. Compliance and legal checklist (outstanding)

- Company or trading name, registered address, company number → `siteConfig.company`
- ICO registration (data protection fee) and number
- Privacy notice retention period; solicitor review of all legal pages
- Founding-offer terms (launch date, extra sites, plan changes, ownership changes) finalised with legal advice before advertising
- Marketing emails: consent records are kept. Check PECR/UK GDPR with an adviser before sending marketing
- Course content reviewed by a qualified person; "Level 2" wording reviewed
- Trademark check for "Safe Kitchen" before going live (`allowIndexing` stays false until then)
- Never imply FSA or local authority endorsement

## 12. What's waiting on the owner

1. **Review the private preview** (phone and desktop) and approve or request changes.
2. **Approve the founding-offer wording** and confirm the draft limits (extra sites, plan changes).
3. **Approve the founder story wording** (first person).
4. Real **call hours**.
5. Company and legal details, ICO registration, solicitor review.
6. Buy **safekitchen.uk**. Create the Supabase website project, Cloudflare Turnstile, Resend and Vercel accounts (step-by-step guide in `docs/SETUP_SERVICES.md`; never paste secret keys into chat).
7. Allow gov.uk in the Claude environment's network settings so the FSA statistics can be verified.
8. Decide when to start **Stage 5** (analytics with consent, SEO, accessibility and performance polish) and **Stage 6** (deployment preparation).
9. Whether to open pull requests for `claude/light-redesign` and `claude/website-decisions`.

## 13. Rules to keep following

- Ask before installing software, committing, pushing, publishing, connecting services or deploying. Work one step at a time.
- **Don't change the Safe Kitchen app's code.** Website decisions go in the app's `DECISIONS.md` (next ID **D-085**) on its branch.
- Don't activate payments or public offers, or launch anything publicly, without explicit approval.
- No invented figures, testimonials, accreditations or features. Every money figure is labelled illustrative, and statistics need a verified source.
- Keep honest status labels on the public site. The launch-preview look is for private review only.
- UK English. Prices and wording live in `src/config` and `src/content`, never hard-coded in components.

## 14. Exact message to paste into a new Claude chat

```
I'm Darrell, continuing work on the Safe Kitchen marketing website.
Please read docs/HANDOVER.md in the darrellseage/safe-kitchen-website repository
(branch claude/light-redesign) before doing anything, then docs/CONVERSION_REVIEW.md.
The app repository darrellseage/safe-kitchen (branch claude/website-decisions) holds
the decision log (DECISIONS.md D-073 to D-084): don't change the app's code.
Run the checks in section 1 of the handover, then give me a short summary of where
we are and wait for my instructions. Ask before committing, pushing, publishing,
installing anything or connecting services, and don't deploy or activate any
offers or payments.
```
