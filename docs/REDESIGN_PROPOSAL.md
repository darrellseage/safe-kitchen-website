# Safe Kitchen website: redesign proposal (light, five pillars)

> **Status:** proposal for the owner's approval. No redesign code has been written.
> **Prepared:** 31 October 2026, in response to the "Master website prompt" and the "Smart Clock-In & Attendance" addition.
> **Replaces:** the dark "The Pass" direction in [STAGE_1_PROPOSAL.md](STAGE_1_PROPOSAL.md). That document's decisions on architecture, honesty rules, services, pricing and SEO still stand unless changed below.
> **Sources checked:** the app repository's CLAUDE.md, PROJECT_PLAN.md (§11.3–11.8), DECISIONS.md (D-042, D-047 to D-054, D-056, D-074, open decisions O-019 to O-032), DESIGN_SYSTEM.md (§2–5, §9.4–9.7, §11), SFBB_CONTENT_MATRIX.md, and the current website build on branch `claude/stage-2-homepage`.

---

## 0. Summary

1. **Light and warm, built from the app's own design system.** White and the app's warm white (`#FAF7F2`), the app's deep greens, the app's teal for buttons, Plus Jakarta Sans, 16px cards, soft warm shadows. No dark sections. No separate website palette.
2. **Five pillars, food safety first:** Simple Food Safety · Smart Staff Rotas · Smart Clock-In & Attendance · AI Checker · Smart Supplier Ordering. Each gets its own section and an interactive demo modelled on the real screen designs already specified in the app's DESIGN_SYSTEM.md §9.
3. **Honest status is essential, because only one pillar is being built.** Food safety is **In development**. Rotas, clock-in, AI Checker and ordering are **Planned** in the app's roadmap (Growth Phases 5 and 6 and the AI Monitoring Engine), with no code yet. Nothing is "Available now". Every demo is labelled as illustrative.
4. **One decision must come first.** Making rotas, clock-in and ordering headline pillars reverses app decision D-042 ("not a general restaurant management platform") and settles open decision O-019. I need your explicit go-ahead to record that (question 1).
5. **Most of the Stage 2 build is kept:** the separate-app architecture, content and config files, the calculator, the form, spam checks, the temperature demo logic and all tests. The visual layer is redone, and five new demos are added.

---

## 1. What exists today, and what changes

| Area | Keep | Redesign | New |
|---|---|---|---|
| Architecture (separate Next.js app, D-073) | ✅ | | |
| Config: site, pricing, feature status | ✅ (labels extended) | | |
| Content files (all wording outside components) | ✅ structure | Copy rewritten | Pillar copy |
| Logic and tests (calculator, slider maths, form rules, spam checks, pricing) | ✅ | | Ordering calculator logic, clock-in and order-check demo logic, with tests |
| Temperature demo | ✅ flow and logic | Light restyle, dashboard step | |
| Early-access / demo / call form and server action | ✅ | Light restyle | |
| FAQ, pricing, EHO story, roadmap | ✅ structure | Light restyle, new content | |
| Header and footer | ✅ behaviour | Light restyle, new navigation | |
| Dark tokens, "The Pass" lamp lighting, Bricolage Grotesque | | ❌ removed | |
| Hero, "Sound familiar?", before-and-after | | Rewritten | |
| Rotas, clock-in, AI Checker, ordering, ordering calculator, chefs-and-owners | | | ✅ |

The dark build stays on its branch for reference. The redesign starts from it on a new branch.

---

## 2. Brand: built from the app's design system

All values come from the app's DESIGN_SYSTEM.md v0.3 and `globals.css`. The website adds no new brand colours.

| Role | App token | Value | Website use |
|---|---|---|---|
| Page background | `surface-raised` | `#FFFFFF` | Main background |
| Alternate background | `surface` | `#FAF7F2` | Every other section, so the page has rhythm without dark bands |
| Inset areas | `surface-sunken` | `#F2EDE4` | Calculator inputs, demo trays |
| Soft green tint | `brand-50` / `brand-100` | `#EEF7F2` / `#DCEFE6` | Pillar section backgrounds, final CTA band |
| Headings and text | `ink` / `ink-muted` | `#1C2421` / `#4F5B56` | All text (contrast checked in the app) |
| Brand green | `brand-900` / `brand-700` / `brand-500` | `#0B3B2E` / `#145A44` / `#2E8B6A` | Logo, highlighted words in headlines, icons, illustrations |
| Primary actions | `accent-600` (hover `accent-700`) | `#0F7C7A` | **All buttons and links, exactly as in the app** |
| Highlights | `accent-500` / `accent-100` | `#14A3A0` / `#D7F0EE` | Progress, selected states, demo highlights |
| Status | `success` / `warning` / `danger` | App values | Only inside product demos, always icon + word + colour |
| Borders | `line` | `#E6DFD3` | Cards and dividers |

- **Type:** **Plus Jakarta Sans only**, the app's typeface. Headlines use weight 800 with tight tracking at large sizes (up to about 88px on desktop), which gives confidence without a second font. Tabular figures for times, temperatures, hours and money.
- **Shape and depth (app §4):** 16px card radius, 24px for hero panels, pill badges, warm soft shadows (`shadow-card`, `shadow-raised`). Product screens sit on white with a hairline border and a soft long shadow, like a device on a clean steel counter.
- **Buttons (app §5.2):** primary teal with white text, 52px tall on mobile; secondary white with a border.
- **Imagery:** bright, natural photos of real commercial kitchens, licensed stock as approved, each checked for food-safety accuracy (hair covered, gloves correct, clean surfaces) and recorded in the image manifest. Product demos stay the main visuals; photos give warmth in "Sound familiar?" and "Built for chefs and owners".
- **Signature motif: "everything where it should be."** Scattered items (a paper sheet, a WhatsApp rota screenshot, a supplier email, a sticky note) settle into neat, aligned cards on a white grid. This carries the brand line "One kitchen. One system. Everything where it should be." through the before-and-after scene and the pillar demos.

---

## 3. Product status: every capability classified

From the app's plan and decisions. **Nothing is "Available now"**: the app is a working prototype, and real accounts and tablets exist only on a development database.

| Capability | Status on the website | Basis |
|---|---|---|
| Temperature checks, cleaning, opening/closing checks, problems with manager review, records and inspection view, manager overview | **In development** | Core phases 2–8, prototyped (D-040, D-062) |
| Shared kitchen tablet with staff PINs, roles, multi-site accounts | **In development** | Built on the development database (Phase 2B/2C) |
| Record exports (print or save as PDF) | **In development** | Phase 8 evidence pack |
| HACCP/SFBB-aligned workflows | **In development**, worded "built around Safer Food, Better Business" | Content not yet verified (SFBB_CONTENT_MATRIX) |
| Smart Staff Rotas (build, publish, notify) | **Planned** | Growth Phase 6, D-049 |
| Rota import from photo, screenshot or PDF (AI Rota Scanner) | **Planned** | D-054 |
| Rota import from Excel/CSV spreadsheet files | **Planned** (needs adding to the app plan) | The brief. D-054 covers spreadsheet *layouts*, not spreadsheet *files* |
| Rota import from Word documents | **Our vision** | Not in the plan |
| Rota notifications | **Planned**: "notifications when the rota is published or changed". **No channel named** | D-049. Channels and providers undecided (O-035) |
| Clock-in: QR code with location check at the moment of clocking, manager-approved exceptions | **Planned** | D-049, DESIGN_SYSTEM §9.6 |
| Clock-in: phone-only location check without QR | **Planned** (needs adding to the app plan) | The brief. The plan pairs QR with location |
| Clock-in on the shared kitchen tablet with a staff PIN (no location needed) | **Planned** (proposed as the no-location alternative) | Tablet PINs exist (D-072); clock-in on them needs adding to the plan |
| Scheduled vs actual hours, late and missed clock-in alerts, attendance dashboard, manager corrections | **Planned** | §11.4 attendance reporting |
| Timesheet export for payroll | **Planned**, "where supported" | D-049 |
| AI Checker: missing checks, incomplete records, overdue items, unusual entries, "why this was flagged" | **Planned** | AI Monitoring Engine, D-050, after core Phase 5 |
| Daily and weekly summaries, urgent items flagged straight away | **Planned** (summaries need adding to the plan) | D-050 covers alerts and schedules |
| "Areas where training may help" | **Planned**, worded neutrally, never naming or blaming staff | D-050, O-028 |
| Smart Supplier Ordering, duplicate and unusual-quantity checks, approval, status tracking | **Planned** | Growth Phase 5, D-047, D-048 |
| Sending orders by email or supplier API/EDI | **Planned**, "where the supplier supports it". **No supplier names** | O-024 |
| Stock-based suggestions and shortage warnings | **Our vision**, only with reliable stock data | O-020 (no stock module defined) |
| Bluetooth probes, connected fridge and freezer sensors | **Our vision** (research first) | D-056, O-032 |
| Staff training records | **Planned** | D-064 |
| AI kitchen camera monitoring | **Not shown (recommended)** | Not in the plan. Serious privacy implications. See question 3 |

**Label wording:** "In development" (being built for the first release) · "Planned" (on the roadmap, not started) · "Our vision" (exploring, may change). I don't recommend "Coming soon" for anything planned, because it implies a near date we haven't set.

**Where labels appear:** a chip next to every pillar heading, on every demo ("Illustrative demo · Planned feature"), in the five-pillar overview, and in the FAQ answer "What's available now?".

---

## 4. Revised homepage structure

The brief's 15 sections plus the clock-in section make a long page. Two things keep it easy to use: a **five-pillar overview** straight after the hero that works as jump links, and a header menu that goes straight to each pillar.

**Header:** Logo · Food safety · Rotas & clock-in · AI Checker · Ordering · Pricing · FAQ · **Get early access**. Phone: menu sheet with the same links.

| # | Section and headline | Customer pain it answers | Content and demo |
|---|---|---|---|
| 1 | **Hero.** "Running a kitchen is hard enough. The paperwork shouldn't be." | Overwhelm. "Is this for me?" | Supporting copy as briefed. CTAs **Get early access** / **See how it works**. A light product composition: a kitchen tablet "Now" screen with checks ticking, a phone showing "Clocked in · 08:57", a small AI Checker card ("2 things need attention") and an order chip ("Possible duplicate"). Chip: "Illustrative · in development and planned features". Gentle entrance animation |
| 1b | **Five-pillar overview.** "One kitchen. One system. Everything where it should be." | "What does it actually do?" | Five cards (icon, one-line benefit, status chip) linking to each section |
| 2 | **"Sound familiar?"** | Recognition | Three photo-led scenario cards as briefed: **the chef** (Friday night, checks still to do), **the inspection** (EHO arrives, hunting through folders), **the owner** (away from the site, phoning for updates). Short copy, gentle staggered reveal |
| 3 | **"How much time is paperwork costing your kitchen?"** | Hidden admin cost | The existing calculator, restyled light, with the same honest disclaimer |
| 4 | **"What if it didn't have to be this way?"** | Chaos to control | The signature scroll scene: a paper temperature log, a WhatsApp rota photo, a supplier email and sticky notes **settle into** one tidy Safe Kitchen dashboard (Food safety · Today's rota · Attention · Orders). A Paper / Safe Kitchen toggle does the same for anyone who prefers to tap, and is the only control with reduced motion |
| 5 | **Food safety: "Less paperwork. More kitchen."** · *In development* | Logs, missed checks, chasing | The existing temperature demo, restyled: choose a check → large slider or keypad → save → see the record land in the manager dashboard. No invented limits. Supporting lines: "You became a chef to cook. Not to fill in paperwork." · "Stop chasing checks. Start running your kitchen." |
| 6 | **Smart Rotas: "Already made your rota? Don't make it twice."** · *Planned* | Retyping rotas, WhatsApp chaos | **Demo:** a photo of a paper rota → "Reading your rota…" → shifts settle into a week grid → a summary bar "12 shifts found · 2 to check · 1 person to match" → the visitor taps the two amber "Check this" shifts and matches "Jo?" to a person → **Publish** unlocks → "Publish and notify 8 staff?" → sent. Exactly the app's review design (DESIGN_SYSTEM §9.5a). Formats shown: photo, screenshot, PDF, spreadsheet. Lines: "From photo to rota." · "Upload it. Check it. Send it." Note: "Imported rotas are always a draft until a manager checks them." |
| — | **Workflow rail (connects 6 and 7):** Create rota → Send to staff → Clock in → Track attendance → Review timesheets | "How do these fit together?" | A horizontal rail that lights up step by step as you scroll from the rota demo into clock-in. On phones it's a vertical list |
| 7 | **Clock-In & Attendance: "Know who's in. Know who's late. Know who's working."** · *Planned* | Late arrivals, forgotten clock-outs, manual hours, payroll admin, multi-site attendance | Supporting copy as briefed. **Demo, three linked panels:** (1) staff phone: "Morning shift · 09:00 · The Olive Tree" → **Clock in** → "Checking you're at The Olive Tree…" → "Clocked in · 08:57" with the server time; a switch lets the visitor try **QR code** instead, or the **kitchen tablet with a PIN** (no location needed). (2) Manager attendance board updates live: Sam ✓ 08:57 · Priya ✓ 09:02 · Jon "Not clocked in yet". (3) Scheduled vs actual table for the week with hours totals and an "Export timesheet" button. Lines: "Clock in. Get on with your shift." · "No more guessing who's on the clock." · "From rota to timesheet, without the paperwork." · "One less thing for managers to chase." **Privacy panel:** "Location is checked only at the moment you clock in. No tracking during shifts. Can't or don't want to share location? Clock in on the kitchen tablet with your PIN, or ask your manager." Plus: "Location checks reduce mistakes and misuse, but they aren't foolproof. Managers review and correct records." |
| 8 | **AI Checker: "An extra pair of eyes on your kitchen."** · *Planned* | Managers can't check everything; owners away | **Demo:** a light dashboard "Your kitchen at a glance" (sample data): checks recorded, outstanding, needing review. A Daily / Weekly switch. A list of flagged items the visitor can open: "Fridge 2: no afternoon reading" · "Cleaning record incomplete: prep area" · "Corrective action waiting 2 days". Opening one shows **"Why this was flagged"**, a link to the record, and a suggested follow-up. One item animates in as it's spotted. Lines: "Know what needs attention, without checking every form." · "Stay informed, even when you're not there." Footnote: "The AI Checker supports managers. It can't confirm that a check was physically done, and it never replaces your own judgement or legal responsibilities. Safety limits come from your approved methods, never from AI." |
| 9 | **Smart Ordering: "Catch costly ordering mistakes before they happen."** · *Planned* | Duplicates, over- and under-ordering, scattered orders | **Demo:** a supplier basket, the visitor adds **20 kg chicken breast** → amber sheet "Possible duplicate order detected" with the existing order (supplier, delivery date, 20 kg) and "Possible duplicate spend: £[example] (illustrative, at £[example]/kg)". Actions as in the app: **Change quantity** · **View existing order** · **Keep both orders** (authorised users). Then the flow rail: Build order → Check order → Manager approval → Send to supplier → Track delivery, where "Sent" is visibly different from "Accepted". Lines: "Know what's ordered before you order again." · "Your orders, all in one place." |
| 10 | **"Small ordering mistakes can add up."** | Hidden cost of mistakes | A second calculator, directly under the ordering demo: orders per week, mistakes per month, average value of a mistake → estimated yearly cost. Every input is editable, the formula is shown, and the result is labelled "your estimate, not a promised saving" |
| 11 | **"Simple for your team. Powerful for your business."** | "Will my team use it? Will I see what I need?" | Two halves with a photo each. **For chefs:** easier routines, less paperwork, rota on your phone, clear responsibilities, less chasing. **For owners:** visibility, organisation, ordering oversight, insights, control across sites. Includes animation 8 from the brief: a manager **switching between sites** (Main kitchen ↔ High Street) and the dashboard numbers changing |
| 12 | **"When the EHO walks in, be ready."** · *In development* | Inspection stress | The existing timeline and inspection view, restyled light. "Organised records won't do the inspection for you. They just mean you're not hunting for them." |
| 13 | **"Built for today's kitchens. Ready for tomorrow."** | "Will it grow with me?" | Our vision: Bluetooth probes, connected fridge and freezer sensors, more supplier integrations, deeper AI insights, staff training records. Clock-in moves out of this list because it's now a pillar. Camera monitoring is left out (question 3) |
| 14 | **Pricing** | Cost | Your approved price (D-074) from config. Wording on what it includes depends on question 2 |
| 15 | **FAQ** | Objections | Expanded: ease of use · food safety records · EHO inspections · staff access · phones and tablets · rota imports · clock-in and location privacy · AI checking · supplier ordering · multi-site · data security · internet connection · **what's available now?** · cost · FSA approval |
| 16 | **"Less admin. Less waste. More control."** | Act now | "Discover a simpler, smarter way to manage your kitchen." Early access / Request a demo / Book a call form (existing, restyled) on a soft green band |
| — | **Footer** | Trust | "One kitchen. One system. Everything where it should be." Links, legal pages, FSA non-affiliation statement |

---

## 5. Animation and interaction plan

| Brief priority | Where | How |
|---|---|---|
| 1. Paper → digital | Section 4 | Motion, scroll-linked transforms (transform and opacity only), toggle alternative |
| 2. Temperature entered and saved | Section 5 | Existing demo; record slides into the dashboard (Motion layout) |
| 3. Photo → digital rota | Section 6 | Motion layout animation: shift "chips" lift off the photo and settle into the grid; amber items pulse once |
| 4. AI spots an incomplete record | Section 8 | A flagged card slides in with a soft highlight; its "Why" panel expands |
| 5. Daily report generated | Section 8 | The Daily / Weekly switch rebuilds the summary numbers with a short count-up |
| 6. Duplicate order flagged | Section 9 | The amber sheet rises from the basket; the matching existing order highlights |
| 7. Order sent to supplier | Section 9 | Status rail steps along: Sent → Acknowledged → Accepted → Delivered |
| 8. Manager switches sites | Section 11 | Segmented control; numbers and lists cross-fade |
| Rota → clock-in workflow | Between 6 and 7 | Steps light up as the section scrolls into view (CSS scroll-driven, like the current reveals) |

- **Library:** Motion only, as now. GSAP isn't needed: no scene requires pinning, and the brief rules out scroll hijacking.
- **Reduced motion:** every demo works fully without animation, and every scroll scene has a tap control.
- **Performance:** demos are separate client "islands" loaded as they approach the screen. The hero is server-rendered. Same budget as before: under 2 seconds to show the main content on a mid-range phone, about 150 KB of JavaScript for the first view.

---

## 6. Claims that need your confirmation or verification

| Claim | Why it needs checking | Proposed handling |
|---|---|---|
| "All-in-one kitchen management platform" | Contradicts D-042, open O-019 | Use only after question 1 is answered |
| Price includes all five pillars | Packaging undecided (O-025) | Question 2 |
| Rota formats (Excel, Word) | Plan covers photo, screenshot, PDF | Show Excel as Planned and Word as "Our vision", or add both to the plan |
| Rota notification channels (WhatsApp, SMS, email, app) | Not decided (O-035) | Say "notifications" with no channel named |
| Clock-in without QR (phone location only) | Plan pairs QR with location | Show as Planned if you approve adding it |
| GPS / location privacy wording | UK GDPR, ICO guidance on monitoring workers; legal review not done (O-022) | Use the cautious wording above; legal review before the feature launches |
| Payroll export formats | No providers chosen | "Timesheet exports for payroll, where supported" |
| Supplier integrations | No agreements (O-024) | No supplier names, "where the supplier supports it" |
| Stock forecasts | No stock module (O-020) | "Our vision", only with reliable data |
| Duplicate-spend figures | Illustrative only | Labelled "example price, illustrative" |
| Ordering-mistake calculator | No measured data | Visitor's own figures, honest disclaimer |
| HACCP/SFBB "aligned" | Content not verified yet | "Built around Safer Food, Better Business" |

---

## 7. Architecture

No change: the website stays a **separate Next.js app** (D-073) with no connection to the app's databases. New demos are self-contained client components with sample data in `src/content/demo-data.ts`, and their logic goes in `src/lib/` with tests (order duplicate check, ordering calculator, clock-in demo state, rota review state). No new dependencies.

---

## 8. Staged plan (as in the brief)

| Stage | Deliverable | Review |
|---|---|---|
| **1. Foundation** | Light tokens from the app, typography, layout, header with pillar navigation, footer, responsive shell, section scaffolding with status chips | Screenshots at 375 / 768 / 1280 |
| **2. Storytelling** | Hero, five-pillar overview, Sound familiar?, admin calculator, before-and-after scene, food safety demo, EHO section | Screenshots + interaction checks |
| **3. Product demos** | Smart Rotas, workflow rail, Clock-In & Attendance, AI Checker, Smart Ordering | Demo walkthroughs at all sizes |
| **4. Conversion** | Ordering calculator, chefs-and-owners, roadmap, pricing, FAQ, form connected to the approved services (Supabase, Turnstile, Resend), booking calendar with real availability, legal pages | Form and booking tests |
| **5. Polish** | Animation tuning, reduced-motion pass, automated accessibility checks, performance, SEO (metadata, Open Graph images, sitemap, structured data), Google Analytics behind consent | Lighthouse and accessibility reports |
| **6. Deployment preparation** | Vercel set-up guide, private preview, domain steps for safekitchen.uk, go-live checklist. **No public launch without your go-ahead** | Your sign-off |

---

## 9. Questions for you

1. **Positioning (most important).** The brief makes Safe Kitchen an all-in-one kitchen platform with rotas, clock-in and ordering as headline pillars. Your app's decision D-042 says the opposite, and O-019 has been waiting for this choice. **Recommended:** record a new decision that Safe Kitchen is an all-in-one platform, with **food safety first** and the other modules added later as optional modules (O-019 option a). May I add that to the app's decision log and update its CLAUDE.md product-focus note to match?
2. **What does £14.99 include?** Recommended website wording: "£14.99 a month per site + VAT for Safe Kitchen food safety, with unlimited staff. Rotas, clock-in, AI Checker and ordering will be priced when they launch." Or does £14.99 cover all five pillars?
3. **AI kitchen camera monitoring.** It's in the brief's "future" list but not in your plan, and filming staff raises serious privacy and employment-law questions. **Recommended:** leave it off the website for now. Show it, or leave it off?
4. **Rotas:** may I add **Excel/CSV import** and **clock-in without a QR code** to the app plan as Planned, and show **Word import** as "Our vision"?
5. **Clock-in without location:** is **clock-in on the shared kitchen tablet with a staff PIN** the right alternative for staff who can't or won't share their location? (Recommended.)
6. **Typeface:** use the app's **Plus Jakarta Sans only** (recommended, for a consistent brand), or keep a separate display font for headlines?

Once these are answered, I'll start Stage 1 (Foundation).

---

## 10. Owner decisions (31 October 2026)

| # | Decision | Recorded in the app as |
|---|---|---|
| 1 | All-in-one platform, food safety first: rotas and smart ordering are in. **No payroll** (attendance is exported as timesheets) | D-075 (resolves O-019) |
| 2 | **£14.99 a month or £149.99 a year + VAT per site covers everything**, all five pillars, unlimited staff | D-076 (resolves O-025) |
| 3 | **No AI cameras.** The AI Checker checks that forms and records are filled in correctly | D-077 |
| 4 | Rota import adds **Excel and CSV spreadsheet files**, so any schedule can be brought in. Word stays "Our vision" | D-078 |
| 5 | Shared kitchen tablet with a staff PIN is the **no-location clock-in alternative** | D-078 |
| 6 | **Plus Jakarta Sans only**, consistent with the app | Website only |

Website consequences: the pricing section and FAQ say the price covers every pillar as each one launches. "Timesheet exports for payroll" becomes "Timesheet exports (Excel or CSV) for your payroll". AI camera monitoring is not shown anywhere. Stage 1 (Foundation) started 31 October 2026.

---

## 11. Addition: Staff Training and Inspection Mode (31 October 2026, owner request)

- **Staff Training & Certificates** becomes a sixth pillar, with its own section straight after Simple Food Safety: add an employee → course sent to their phone (or done on the kitchen tablet) → lessons and test in the app → certificate saved to their record and shown in Inspection Mode. Status **Planned** (app D-064, D-065). External certificates can be uploaded alongside.
- **Inspection Mode** replaces the simple EHO view, straight after training: tabs for daily records (In development), staff training (Planned), suppliers (In development), pest control (In development; uploaded contractor reports Planned) and documents (uploads Planned).
- **"Level 2" wording is on hold** until the owner confirms the course's accreditation (app O-034). The course is called "Food Safety and Hygiene course"; setting `levelClaim` in `src/content/home.ts` adds "Level 2" everywhere at once.
- Header gains a "Training" link; the overview shows six pillars; FAQ gains training and "what can I keep for an inspection?" answers; "Staff training records" leaves the roadmap list.

---

## 12. Sales and marketing enhancements (31 October 2026, owner brief)

Built into the existing page, not as one big block:
- **Value band** after the hero: protect your reputation, reduce costs, save time, train your team. "One simple platform. Unlimited staff. From £14.99 per month."
- **Food hygiene ratings** section with FSA Food and You 2 Wave 11 figures and a **revenue-at-risk calculator**. The three figures are **not yet verified** (gov.uk was unreachable from the build environment; earlier waves report 35–40% for takeaways), so the real site hides them and the private preview marks them "Figure being verified" (`src/content/stats.ts`).
- **Training:** "Stop paying for food hygiene training one employee at a time", the £24 comparison table (typical courses checked at about £15–£25), "Level 2" wording with the mandatory certificate disclosure (app D-080).
- **Rotas** (photo, Excel, Word, three steps), **clock-in** (£1,560 illustrative example, privacy wording kept), **AI Checker** (what it helps spot), **ordering** (what it catches, £5,200 example), **food waste** (WRAP 2013 £10,000 per outlet, verified, dated), **"Why manage five systems"** comparison, **combined savings calculator** (purchasing and waste counted once), **pricing** (16.6% annual saving, never per employee), FAQ and repeated calls to action.
- All money examples are labelled illustrative or hypothetical; logic in `src/lib/value.ts` with tests matching the brief's worked examples.

---

## 13. Stage 4 (Conversion) status, 31 October 2026

- **Built:** chefs-and-owners section (chef and manager photos, site switcher), roadmap, early-access / demo / call form on a deep-green band, call booking calendar (`src/config/booking.ts`; placeholder hours Tue and Thu 2–5pm UK time), service connections for Supabase (website project only), Cloudflare Turnstile and Resend, each switching on with its environment variables (`docs/SETUP_SERVICES.md`), and draft legal pages with highlighted placeholders.
- **Fixed:** the spam-timing check only started on keyboard focus, so autofilled forms (and earlier tests) were silently treated as spam. It now starts on any interaction; an end-to-end test proves a booked slot is saved and removed for the next visitor.
- **Honest failure:** the live build without a database says sign-ups aren't open, rather than pretending to save.
- **Needs the owner:** real call hours; company details, ICO number and retention period for the legal pages; solicitor review (O-004); creating the four service accounts.
