# Safe Kitchen marketing website: Stage 1 proposal

> **Status:** proposal for the owner's approval. No website code has been written.
> **Prepared:** 30 October 2026
> **Sources read:** the operational app repository `darrellseage/safe-kitchen` (commit `9e23555`): CLAUDE.md, PROJECT_PLAN.md, DECISIONS.md (D-001 to D-072, open decisions O-001 to O-040), DESIGN_SYSTEM.md, SFBB_CONTENT_MATRIX.md, SECURITY.md, the source tree and `package.json`. This repository (`safe-kitchen-website`) is empty: no commits yet.

---

## 0. Summary

1. **Build the website as a separate Next.js app in this repository (`safe-kitchen-website`).** It shares nothing with the operational app at runtime: no database, no sign-in, no code imports. This means it cannot break the app.
2. **Every product feature is still in development.** The app is a working prototype with real accounts, businesses and tablet PINs on a development database. Daily checks, temperatures, cleaning and the inspection view are prototypes that save only in the browser. **The website can't describe any feature as "available now".** It should be an **early-access** site with honest status labels.
3. **The brief's "all-in-one kitchen management platform" positioning conflicts with D-042** (focus on food safety; no rotas, stock or payroll). That conflict is open decision **O-019**. I recommend the site leads with food safety and shows rotas, ordering and the other modules as clearly labelled future ideas. That needs your decision first.
4. **No verified temperature limits exist yet** (SFBB_CONTENT_MATRIX: "Nothing in this file has been verified yet", D-059). So the interactive demo can't show a pass or fail status against a real number. §6 proposes an honest alternative.
5. **The visual concept is "The Pass"**: a dark charcoal and forest-green brand built around the moment in a kitchen where everything is checked before it goes out. Paper tickets on a rail become calm digital cards.
6. Before I start Stage 2 I need decisions on **9 questions** (§11). The most important are O-019, hosting and lead storage, the temperature demo, and whether "Safe Kitchen" can be used publicly yet (O-002).

---

## 1. What the existing project tells us

### 1.1 Current build status (from CLAUDE.md "Current phase" and PROJECT_PLAN §11)

| Area | Status | Can the website show it? |
|---|---|---|
| Visual onboarding (business questions → kitchen profile → draft safe methods) | Clickable prototype, demo content only, no database | As "in development", with illustrative screens |
| Daily "Now" screen, 1–3 tap checks, temperature slider + keypad, cleaning, diary, problem flow | Prototype (Stage 1C), browser storage only, **no verified limits** | As "in development", illustrative demo |
| Inspection view (needs attention, missing records, print/PDF) | Prototype (Stage 1C) | As "in development" |
| Accounts, two-step verification, businesses, sites, roles, invitations | **Built** (Phase 2B), development database only | As "in development" (not open to customers) |
| Shared kitchen tablet: setup codes, 4-digit staff PINs, auto-lock, lockout | **Built** (Phase 2C), development database only | As "in development" |
| Real daily records saved to the database, offline-first (Phase 5) | Planned, core MVP | "In development" (part of the first release) |
| Cleaning schedules, supplier list, training records (Phase 6) | Planned, core MVP | "In development" |
| Corrective actions with manager review, four-weekly review (Phase 7) | Planned, core MVP | "In development" |
| Inspection view and evidence pack, real data (Phase 8) | Planned, **required for the first MVP** (D-040) | "In development" |
| Multiple languages (pl, ar, ur, bn) | AI-drafted, **unverified** | **Not claimed** (D-042). At most "planned" |
| Works offline | Planned (Phase 5), not built | **Not claimed** as a benefit. FAQ explains it's planned |
| Connected temperature probes | Planned only, research first (D-056) | "Exploring" |
| Staff rota, rota photo/spreadsheet import, clock-in | Planned only, **⚠️ O-019** | "Exploring", only if O-019 is decided (a) |
| Smart supplier ordering, supplier APIs | Planned only, **⚠️ O-019**, no supplier agreements (O-024) | "Exploring", no supplier names |
| AI monitoring and insights | Planned only (D-050) | "Exploring". AI is advisory, never authoritative |
| Food safety training | Planned only (D-064, D-065) | Optional "Exploring" |

**Status labels I propose** (stored in one config file so a feature can be moved with a one-line change):

- **In development**: part of the first release (core phases 2–8). Prototyped or being built.
- **Planned**: agreed on the roadmap, design not started.
- **Exploring**: an idea we're researching. It may change or not happen.
- **Available**: not used anywhere at launch. Switched on per feature once it's really live.

### 1.2 Rules from the project that the website must follow

- No invented FSA requirements, temperatures, times or frequencies. Demo figures show "[verified figure]" or no number.
- Never imply FSA or EHO endorsement. No FSA logos. A clear "not affiliated with the FSA" statement.
- The business stays responsible for food safety. The software supports their system and guarantees nothing.
- Don't claim offline or multiple languages until delivered and reviewed (D-042).
- Don't assume pricing (O-018, O-025). Pricing must fit "unlimited staff", so it won't be per user (D-042). See question 7.
- "Safe Kitchen" is a **working name**. Trademark, Companies House and domain checks are needed **before public use** (O-002). A public website is public use. See question 3.
- Launch scope is **England, SFBB caterers pack** (D-001). Scotland (CookSafe) and Northern Ireland (Safe Catering) are out of scope at launch.
- Target customers (D-042): independent takeaways, restaurants, cafés, and groups of 1–5 sites. Pubs serving food and hotel kitchens fit the caterers pack. Larger multi-site groups aren't the initial focus.
- UK English. WCAG 2.2 AA. 48px touch targets. Respect `prefers-reduced-motion`. No fixed bars over content (D-025).
- Ask before installing software, connecting external services, committing, pushing or publishing.

---

## 2. Architecture recommendation

### 2.1 Recommendation: a separate app in this repository

PROJECT_PLAN §4.2 originally sketched a `(marketing)` route group inside the operational app. I recommend a **separate Next.js app in `safe-kitchen-website`** instead:

| Reason | Detail |
|---|---|
| **Can't break the app** | The app runs `cacheComponents`, next-intl with a language cookie, a Supabase session proxy (`src/proxy.ts`) and a root page that redirects to onboarding. Marketing pages inside it would share all of that. A separate app shares none of it. |
| **Separate release speed** | Copy, SEO and design changes can ship daily without a production build of the safety-critical app, and app releases never wait for the website. |
| **No marketing code in the app** | Animation libraries, the calculator and marketing images never reach chefs' phones or tablets. |
| **Smaller security surface** | The website has no customer data and no sign-in. Its only data is early-access enquiries, kept in separate storage (§8). |
| **Clean domains** | `safekitchen.uk` for the website and later `app.safekitchen.uk` for the product. The "Sign in" link simply points at the app's URL. |
| **Different language model** | The app has to be multilingual. The marketing site is English-only for now, so it doesn't need the app's translation system. |

**What we give up:** a little duplication of design tokens and the logo. I'll copy them deliberately, documented as "copied from the app's DESIGN_SYSTEM.md v0.3", rather than sharing a package. A shared package isn't worth the complexity for one logo and a palette.

**Records to keep:** if you approve, I'll draft decision **D-073** ("The marketing website is a separate app in `safe-kitchen-website`, superseding the `(marketing)` route group in PROJECT_PLAN §4.2") for the app's DECISIONS.md. I won't change the app repository unless you approve that edit.

### 2.2 Keeping the operational app safe

- No changes to the app repository's code, database, migrations, Supabase projects or settings.
- The website never connects to the app's Supabase projects (`safe-kitchen-dev` or the future production project).
- Product screens on the website are **recreated** as marketing components using the app's design tokens and demo-style content. They don't import or embed the real app. That keeps them illustrative and stops demo data being confused with real records.
- I work on a branch in this repository and commit only with your approval.

### 2.3 Technology (matching the app's versions)

| Item | Choice | Note |
|---|---|---|
| Framework | Next.js **16.4.3**, App Router, React **19.3.0** | Same versions as the app. I'll read `node_modules/next/dist/docs/` before using APIs (AGENTS.md) |
| Language | TypeScript `strict` | Same as the app |
| Styling | Tailwind CSS v4 with CSS-variable design tokens | No hard-coded hex values in components |
| Components | Radix primitives (`radix-ui`, already used by the app) for accordion (FAQ), dialog, slider and tabs | Accessible by default |
| Validation | Zod **4.6.7**, shared between form and server action | Same as the app |
| Icons | `lucide-react` | Same as the app |
| Animation | **Motion** (one dependency), plus CSS and native scroll-driven animations | GSAP only if a scene needs it. See §5.4 |
| Fonts | `next/font` (self-hosted, no layout shift) | See §3.3 |
| Tests | Vitest (logic, calculator, validation) + Playwright (pre-installed in this environment) for screenshots at 375/768/1280, interaction checks and axe accessibility checks | `@axe-core/playwright` would be a new dev dependency: asking first |

**New dependencies that need your approval:** `next`, `react`, `react-dom`, `tailwindcss`, `typescript`, `zod`, `radix-ui`, `lucide-react` (all already used by the app), plus **`motion`** and dev-only `@axe-core/playwright` (both new to the project). No other libraries.

---

## 3. Visual concept: "The Pass"

### 3.1 The idea

In a commercial kitchen, **the pass** is where everything is checked before it goes out. It's calm, lit and in control while service rages behind it. Safe Kitchen should feel like the pass: the one calm, well-lit place in a busy kitchen.

Two motifs carry the whole site:

1. **The ticket rail.** Kitchens already run on paper tickets clipped to a rail. "Before" is told with paper: dockets, clipboards, curled temperature sheets, scribbled initials. "After", the same items become **digital cards** with the same proportions, now aligned, timestamped and complete. The before-and-after transformation (Section 3) is literally tickets becoming cards.
2. **Pass-lamp light.** Sections sit in deep charcoal, lit from above by a soft, warm-white pool of light (a radial gradient, never a rainbow), as if under heat lamps. Product interfaces sit in that light like plates on the pass. This gives depth and drama with almost no weight: CSS only, no images.

Nothing cartoonish, no blobs, no generic purple-to-blue gradients, no 3D robots, no stock "chef giving thumbs up".

### 3.2 Palette (extends the app's DESIGN_SYSTEM.md tokens, which plan for dark mode in §2.5)

| Role | Token | Value | Use |
|---|---|---|---|
| Charcoal (base) | `night-950` | `#0D110F` | Page background |
| Charcoal (raised) | `night-900` | `#141A17` | Panels, cards on dark |
| Charcoal (line) | `night-700` | `#26302B` | Hairline borders, dividers |
| Forest (deep) | `brand-950` | `#06261D` | From the app. Section washes, footer |
| Forest | `brand-900` | `#0B3B2E` | From the app. Feature panels, CTA band |
| Fresh green (accent) | `herb-400` | `#7FE0A3` (to be contrast-tested) | **Sparingly**: one CTA, focus rings, live indicators, key numbers |
| Paper | `paper` | `#F3EEE4` | The "before" paper world, light sections (echoes the app's warm `#FAF7F2`) |
| Text on dark | `fog-100` / `fog-400` | `#ECEFEC` / `#A3ADA8` | Body and secondary text (≥ 4.5:1 checked) |
| Status | `success` / `warning` / `danger` | From the app | Only inside product mockups, always with an icon and a word |

The product mockups use the **app's real light theme** (warm white, teal actions), framed in dark glass. That's honest, because it's what customers will actually see, and the light UI glowing in a dark page is the strongest visual contrast on the site.

### 3.3 Typography

- **Display: Bricolage Grotesque** (variable, open licence, self-hosted). Oversized, tight-tracked headlines with real character. Not the Inter/Geist look of every SaaS template.
- **Text and UI: Plus Jakarta Sans**, the app's own typeface, so the website and product feel like one brand.
- **Numbers:** tabular figures for temperatures, times and calculator results.
- Scale: display headlines `clamp(2.75rem, 7vw, 6.5rem)`, body 17–18px, nothing below 13px (DESIGN_SYSTEM D-026).

### 3.4 Imagery

The app's photos are hot-linked Unsplash images, each with a recorded licence and food-safety accuracy review, marked for replacement before launch. For the website I recommend:

- **Product-led visuals first:** the hero, demo and features are built from real interface components, not pictures. They're sharp at every size, light to load and honest.
- **A few photos of real commercial kitchens**, self-hosted, optimised with `next/image`, each recorded in an image manifest with licence, photographer and accuracy review (hair covered, gloves correct, clean surfaces, no unsafe practice shown), using the app's process from `src/demo-content/images.ts`.
- **Photo treatment:** desaturated, cool-shadowed, with the warm pass-lamp highlight, so mixed sources look like one shoot.
- **Before public launch:** commissioned photography of a real UK kitchen (see question 6).

---

## 4. Homepage story

The page follows one emotional arc: **recognition → relief → proof → confidence → action.** Each section has one job.

| # | Section | Job | Key content and design |
|---|---|---|---|
| — | **Header** | Orientation | Logo, How it works, Features, Roadmap, Pricing, FAQ, "Get early access" button. Hides on scroll down and returns on scroll up, never covering content (D-025). Mobile: a simple sheet menu |
| 1 | **Hero** | Instant recognition + promise | *"Your kitchen is busy enough. / Your paperwork shouldn't be."* Supporting copy as briefed. CTAs: **Get early access** / **See how it works**. Visual: a tilted, layered Safe Kitchen interface under pass-lamp light. A tablet shows the "Now" screen with checks ticking off, while a manager overview card and a phone with a temperature entry float behind it with subtle parallax. A small "Illustrative · in development" chip sits on the visual. Built in HTML/CSS, not video, so the headline text is the fastest thing to load |
| 2 | **"Sound familiar?"** | Empathy without fear | Four ticket-rail "dockets" that clip in one by one as you scroll: Friday-night temperature sheet · the EHO and last month's folder · the missed cleaning check nobody signed · the rota-change evening of messages. Each has a short, human caption ("It's 9:40pm on a Friday. The fridge sheet still says 'AM' and nothing else."). No red alarms, no "you could be fined". The rota docket is the only one that touches a future feature. It's written as a recognised frustration with no product promise, and stays only if O-019 allows (see question 1) |
| 3 | **"There's a simpler way."** | The transformation | The before-and-after scene. A paper scene (clipboard, curling temperature log, sticky notes, a folder) **reorganises itself** as you scroll: sheets slide into place and become a clean list of digital records with names, times and ticks. On mobile it's a two-state toggle ("Paper" / "Safe Kitchen") with no long scrolling scene. Under it, three plain outcome lines: *Checks in a few taps · Clear who did what · Records in one place* |
| 4 | **"Built for chefs. Not paperwork."** | Product proof by doing | The interactive temperature-check demo (§6), on a tablet frame. Callouts beside it say why it's built this way: big targets for gloves and wet hands, the reading is never prefilled, name and time are captured automatically, and a bad reading is as easy to record as a good one |
| 5 | **Feature stories** | Show how each day gets easier | Six panels, each with a small animated interface and three lines: **Problem → Easier day → Outcome**. 1) Temperature records 2) Cleaning schedules 3) Opening and closing checks 4) Problems and corrective actions recorded, with manager review 5) Manager overview: what's done, what's missing, across sites 6) Records history and inspection view, with print or save as PDF. Every panel carries its status label |
| 6 | **"When the EHO walks in, be ready."** | Make the inspection moment calm | A short timeline story: *10:12 a visitor at the door → 10:13 manager opens the inspection view → 10:14 the last 28 days are on screen: temperatures, cleaning, problems and what was done.* It shows that missing records are **shown honestly** ("Fridge 2: no record on 2 of 7 days"), as the app does. The closing line avoids outcomes: *"Organised records won't do the inspection for you. They just mean you're not hunting for them."* |
| 7 | **Paperwork time calculator** | Make the hidden cost personal | Four inputs (sites, daily paperwork minutes, days per week, hourly cost) → estimated hours per week, per year and the labour cost per year. Big tabular numbers. Clearly labelled "Your estimate" with the formula visible. Disclaimer: *"This estimates the time you currently spend on paperwork, based only on your figures. It is not a prediction of how much time Safe Kitchen will save."* No default values presented as industry averages. Neutral example defaults are labelled "example" |
| 8 | **"Built for today's kitchens. Ready for tomorrow."** | Excite without promising | A roadmap "rail": cards for connected temperature probes, AI-assisted insights (advisory only, never sets limits), staff rotas and clock-in, smart supplier ordering and training. Each is labelled **Planned** or **Exploring** with one honest sentence. Heading copy: *"Food safety comes first. Here's what we're exploring next. Early-access members help decide."* Rota and ordering appear only if O-019 is decided (a) |
| 9 | **Pricing** | Remove the "how much?" objection without inventing a price | Plan cards driven by a config file, with the price field showing "Pricing announced before launch" until you set one. Copy as far as you approve it (e.g. per-site pricing, unlimited staff, no setup fee: question 7). Plus a strong "Early-access members get founding terms" style CTA **only if you confirm** you'll offer something |
| 10 | **FAQ** | Handle objections honestly | Accessible accordion with the 8 briefed questions, using the answers in §7. Marked up with FAQPage structured data |
| 11 | **"Less paperwork. More kitchen."** | Convert | Full-width forest-green band in pass-lamp light. Early-access form inline (name, email, business name, business type, number of sites, optional "what's your biggest headache?"), plus an optional "I'd like a demo" tick box. Privacy line under the button |
| — | **Footer** | Trust and compliance | Navigation, privacy, cookies, terms, accessibility statement. *"Safe Kitchen is not affiliated with or endorsed by the Food Standards Agency."* Working-name company details (question 8) |

### 4.1 Supporting pages (Stage 3)

`/how-it-works` · `/features` (with status labels) · `/roadmap` · `/pricing` · `/faq` · `/early-access` (standalone form + thank-you state) · `/about` (why we're building it, without invented stories) · `/privacy` · `/cookies` · `/terms` (website terms of use) · `/accessibility` · `404`.

**SEO landing pages** (Stage 4, optional): `/takeaways`, `/restaurants`, `/cafes` and two useful guides, e.g. "What are SFBB records?" and "Paper vs digital food safety records". These target the brief's search terms (digital food safety records, SFBB digital records, restaurant temperature logging, HACCP software UK) with genuinely useful writing. Any statement about FSA requirements must be checked against the official source and labelled, exactly as in the app.

---

## 5. Animation and interaction plan

### 5.1 Principles

- **Motion explains, never decorates.** Every animation shows a change of state: paper → digital, unchecked → checked, scattered → organised.
- **No scroll hijacking.** The page always scrolls at the visitor's speed. Scroll-linked scenes are short (one screen height at most) and never trap the visitor.
- **Fast first.** The hero headline renders from the server with no JavaScript. Entrance animations are CSS and finish within about 900ms. Nothing waits for a loader.
- **Reduced motion:** with `prefers-reduced-motion`, every scene shows its final state instantly, parallax is off and only opacity fades remain.

### 5.2 Scene list

| Scene | Technique | Mobile behaviour |
|---|---|---|
| Hero text reveal (line-by-line mask) | CSS keyframes, server-rendered | Same |
| Hero interface (checks ticking, card float) | Motion, started after first paint; pauses off-screen | Lighter: one device, no parallax |
| "Sound familiar?" dockets clip onto the rail | Motion `whileInView` stagger | Stacked cards, same reveal |
| Paper → digital transformation | Motion `useScroll` + transforms (GPU-only: transform/opacity) | Tap toggle instead of scroll scene |
| Interactive demo | Motion layout animations for state changes | Full-width, same flow |
| Feature panels | In-view mini animations, one at a time | Same, simpler |
| EHO timeline | Scroll-progress line, steps reveal | Same |
| Calculator numbers | Animated count-up (tabular figures, `aria-live` politely announces only the final value) | Same |
| Hover states | CSS only | n/a |

### 5.3 Performance budget

- Mid-range Android on 4G: **LCP < 2.0s**, **INP < 200ms**, **CLS < 0.05**.
- Homepage JavaScript under about **150 KB** compressed. Interactive parts load as separate client "islands". Everything else is server-rendered HTML.
- Lighthouse target: **95+** for performance, accessibility, best practices and SEO on mobile.
- No WebGL, no video in the hero, no fonts beyond two families.

### 5.4 Why Motion and not GSAP by default

Motion covers every scene above, and it's one small dependency. GSAP ScrollTrigger is excellent for long pinned timelines, but this site deliberately avoids pinning and scroll hijacking, so it would add weight without benefit. If a scene in Stage 4 genuinely needs it, I'll ask before adding it. This follows the project rule to avoid unnecessary dependencies.

---

## 6. The interactive temperature demo (Section 4)

### 6.1 The constraint

The brief requires that "any example status must have context-specific, verified thresholds and corrective-action requirements". The project has **no verified limits yet**: the content matrix is unverified, `verifiedLimits` is empty, and the app's demo shows "[verified figure]". So the demo **can't** say "Pass" or "Fail" against a number without inventing a safety figure.

### 6.2 Proposed design (works with no verified figures)

A tablet-framed demo labelled **"Illustrative demo · not a real account · not food safety guidance"**:

1. **Choose a check:** large picture cards, e.g. *Walk-in fridge*, *Freezer 1*, *Hot holding: curry*, *Cooked chicken: probe*. The names are illustrative.
2. **Enter the reading:** the app's real interaction pattern. The slider starts empty with no prefilled value, has 48px handles and ±0.1 buttons, plus a keypad toggle for gloves. Keyboard and screen-reader accessible.
3. **Save:** the record appears with what the app captures automatically: *Reading · Check · Recorded by "Sam (demo)" · Time · Entry method (slider or keypad) · Device "Kitchen tablet"*. The status line reads: **"Recorded. In Safe Kitchen, this reading is compared with the limit in your approved safe method."**
4. **See what happens when a reading is outside your limit:** a clearly separate toggle ("Show me a problem reading") walks through the problem flow. It shows the reading marked *Outside your limit* (icon + word, **no number**), the quick-select "What did you do?" chips, then *"Waiting for manager review"*. It explains that the original reading is never overwritten and that corrective-action guidance comes only from reviewed content.
5. **Dashboard view:** the new record slides into a manager overview list next to other demo records, and "Today" counts update.

Because the limit is never a number, nobody can mistake the demo for guidance, and it still shows the real value: speed, nothing hidden, accountability without micromanaging.

**Alternative (only if you choose it):** once a qualified reviewer approves specific SFBB figures with source references in the content matrix, the demo can show real pass/out-of-limit colours. Those figures would come from the same verified source as the app. I've built the demo config so limits can be added later without redesign.

---

## 7. Claims audit: what the website can and can't say

### 7.1 Supportable now (worded as design intent or in development)

| Claim | Wording | Basis |
|---|---|---|
| Built around SFBB | "Built around the Food Standards Agency's Safer Food, Better Business system for caterers, starting in England" + not-affiliated statement | D-001, PROJECT_PLAN §1 |
| Quick checks | "Designed so routine checks take a few taps" | D-039, D-063 (design principle, prototyped). **No "seconds saved" statistics** |
| Never prefilled; bad readings as easy as good | As stated | D-063, implemented in prototype |
| Who, when, what device: captured automatically | As stated | D-051, D-063 |
| Nothing silently overwritten; corrections kept | "Corrections are added, never overwritten" | D-051 |
| Missing records shown honestly | As stated | DESIGN_SYSTEM §11.4 |
| Shared kitchen tablet with personal staff PINs | "In development" | Phase 2C built (dev only) |
| Owner/manager/staff roles; multiple sites | "In development" | Phase 2B built (dev only) |
| Two-step verification for owners and managers | "In development" | Phase 2B |
| Inspection view, print or save as PDF | "In development" | D-040, prototype |
| Phones, tablets and desktop | "Designed for phones and tablets, and works on desktop" | Mobile-first web app, checked at 375/768/1280 |

### 7.2 Not supportable (won't appear)

- Any customer numbers, testimonials, logos, ratings, awards or certifications.
- "Guarantees compliance", "pass your inspection", "5-star rating", "EHO-approved", "FSA-approved".
- Time-saving statistics. The calculator shows **the visitor's own estimate** of current paperwork time only.
- "Works offline" and "available in your language" as **benefits** (D-042). The FAQ honestly says offline is planned.
- "Replaces paper records" as a blanket statement (see FAQ answer below).
- Supplier names or "integrates with Bidfood/Brakes/Booker" (O-024).
- Specific temperatures, times or frequencies.
- "HACCP certified" or "HACCP compliant" software. Safe Kitchen helps you keep records for your food safety management system.
- Data hosting claims beyond what's set up. The dev project is in London and production is **planned** for London (PROJECT_PLAN §4.5). The FAQ says "planned to be hosted in the UK" until production exists.

### 7.3 Draft FAQ answers (for your approval)

- **Is it easy for chefs to use?** "That's the whole point. Safe Kitchen is designed so a routine check takes a few taps on a shared tablet or phone, with big buttons that work with gloves on. Readings are never filled in for you, and staff only see what needs doing now. We're testing it with real kitchen teams during early access."
- **Does it replace paper records?** "It's designed to hold your daily food safety records digitally, organised by date, so you don't need to keep paper sheets for the checks you record in Safe Kitchen. You remain responsible for your food safety system, and your local authority can advise on what they expect to see." *(🔍 To check with your qualified reviewer before publishing.)*
- **Can I show records to an EHO?** "Yes, that's what the inspection view is for. Records are on screen in a clear layout, with anything missing or unresolved shown honestly, and you can print or save them as PDF. It's in development and part of our first release."
- **Can staff use it on phones or tablets?** "Yes. It's designed mobile-first, and a shared kitchen tablet can be used with personal staff PINs so everyone's entries are their own."
- **Does it work for takeaways?** "Yes. Independent takeaways, restaurants, cafés and pubs serving food are exactly who we're building for first. Setup asks about what you actually do (cooking, cooling, hot holding, deliveries), not just your business type."
- **Can I manage multiple sites?** "Safe Kitchen is built for businesses with one site or several, with roles for owners, managers and staff. Early access focuses on groups of up to about five sites."
- **What happens if the internet goes down?** "We're building daily checks to keep working without a connection and sync when you're back online, without losing or duplicating records. This isn't available yet. We'll only say it works offline once it's been fully tested."
- **How secure is the data?** "Each business's records are kept separate at database level, with automated tests that prove one business can't see another's data. Owners and managers use two-step verification, staff use personal PINs on shared tablets, and food safety records are never silently changed. Data is planned to be hosted in the UK." *(Only states what's built in Phase 2 plus a clearly marked plan.)*

---

## 8. Early-access form, data and compliance

### 8.1 Form

- Fields: name, email, business name, business type (select), number of sites (select), optional message, optional "I'd like a demo", required privacy acknowledgement text (not a pre-ticked box), and an **optional, unticked** marketing-updates opt-in kept separate from the enquiry (PECR).
- Validation: one Zod schema shared by the browser and a Next.js server action. Clear inline errors linked with `aria-describedby`, error summary on submit, focus management.
- **Spam protection, layered:** a hidden honeypot field, a minimum time-to-submit check, per-IP rate limiting, and (recommended) **Cloudflare Turnstile**, a free and privacy-friendly CAPTCHA alternative that's usually invisible. Turnstile is an external service, so it needs your approval.

### 8.2 Storage options (needs your decision: question 4)

| Option | How | Pros | Cons |
|---|---|---|---|
| **A. Separate Supabase project `safe-kitchen-website` (London, free tier)** ✅ recommended | One `early_access_leads` table, RLS on with **no** public policies. Inserts only from the server action using a server-only key stored in the host's environment settings | Familiar tool, UK/London region, completely separate from the app's databases, easy export | A new project to create (free), and the key must only ever live on the server |
| B. A table in the app's Supabase project | — | One less project | **Not recommended**: touches the app's database and mixes marketing data with customer data |
| C. Email-only (form sends an email) | Via an email provider | Simple | New paid/free provider, no durable record, harder to keep a clean list |

Whichever is chosen, I'll build it behind a small storage interface (as the app does with `src/lib/storage`), so local development works with no external service and nothing is connected until you approve.

### 8.3 Privacy, cookies and legal

- **Cookies:** I recommend **no tracking cookies at launch**. Then no cookie banner is legally needed, just a cookie notice page listing strictly necessary cookies (if any, e.g. Turnstile). If you want analytics, a cookieless option (e.g. Vercel Web Analytics or Plausible) keeps it banner-free. Google Analytics would need a proper consent banner. Question 5.
- **Privacy policy:** I'll draft it in plain English (who we are, what we collect, why: legitimate interests for responding to enquiries and consent for marketing updates, retention, rights, ICO complaint route). It needs your company details (question 8) and **solicitor review before launch** (O-004).
- **Terms of use** for the website, an **accessibility statement**, and the FSA non-affiliation statement in the footer.

### 8.4 SEO

- Server-rendered pages with semantic landmarks and one `h1` per page.
- Per-page `metadata` (title, description, canonical), Open Graph and Twitter cards with a generated OG image (`opengraph-image.tsx`).
- `sitemap.ts`, `robots.ts`, `manifest.ts`, favicons.
- Structured data, only where accurate: `Organization`, `WebSite`, `SoftwareApplication` (no `offers` or `aggregateRating` until real), `FAQPage`.
- Until O-002 (name clearance) is settled, the site can be deployed with `noindex` so it's reviewable without being publicly indexed (question 3).

---

## 9. Accessibility (WCAG 2.2 AA)

- Colour contrast ≥ 4.5:1 for text and ≥ 3:1 for UI on dark backgrounds. Every token pair is checked.
- Visible focus rings (herb green, 2px plus offset). Skip link. Logical heading order.
- Every interaction works by keyboard. The slider has arrow, Page Up/Down, Home and End support and a keypad alternative (DESIGN_SYSTEM §11.1a).
- 48px touch targets. Target size meets 2.5.8.
- Status always shown with icon + word, never colour alone.
- Animated content is never the only way to get information. Scroll scenes have static equivalents.
- Forms: labels, descriptions, error summary, autocomplete attributes, no time limits.
- Automated axe checks plus a manual keyboard and screen-reader (VoiceOver) pass.

---

## 10. Implementation stages

| Stage | Deliverable | Review point |
|---|---|---|
| **1** (this document) | Architecture, concept, story, animation plan, claims audit | **Your approval + answers to §11** |
| **2** | Project setup (same versions as the app), design tokens, fonts, layout shell, and the **complete responsive homepage**: all 11 sections, the interactive demo, the calculator, the FAQ and the form UI (with local-only storage) | Screenshots at 375/768/1280 + a preview you can run, lint/type/build/test report |
| **3** | Supporting pages, real lead capture (once storage is approved), pricing config, FAQ page, privacy/cookies/terms/accessibility drafts | Review of copy and legal drafts |
| **4** | Animation polish, reduced-motion pass, accessibility audit (axe + manual), SEO (metadata, OG images, structured data, sitemap), performance tuning to budget, optional SEO landing pages | Lighthouse and axe reports |
| **5** | Full test pass (desktop/tablet/mobile, Playwright), deployment guide for `safekitchen.uk` (DNS, HTTPS, environment variables, preview vs production), go-live checklist | Your go-ahead to publish. **Nothing is published without it** |

Within each stage I'll work on a branch and ask before committing or pushing.

---

## 11. Questions I need you to answer

1. **Positioning (O-019).** The brief describes an "all-in-one kitchen management platform" with rotas, clock-in and supplier ordering. D-042 says Safe Kitchen will *not* do rotas, stock or payroll, and O-019 is still open. **Recommended:** lead with food safety ("Food safety made simple"), and show rotas, clock-in and ordering only in the "Exploring" roadmap section. That's O-019 option (a). Do you approve, or should the site leave those modules out completely for now?
2. **Status labels.** Do you agree that nothing is labelled "Available" at launch, and the site is an early-access site with "In development / Planned / Exploring" labels? Is there a launch timeframe you're comfortable stating (e.g. "pilot in 2027")? If not, I'll state no dates.
3. **Brand and domain (O-002).** Do you own `safekitchen.uk`? Have the trademark and Companies House checks for "Safe Kitchen" been done? If not, I recommend building and reviewing on a private preview with `noindex` until they are.
4. **Hosting and services.** Recommended: **Vercel** for hosting (free hobby tier for previews; a commercial site needs the paid Pro plan, about $20/month), a **separate Supabase project in London** for enquiries, and **Cloudflare Turnstile** for spam protection. Each is an external account you'd create. Approve, or prefer something else? Who should be notified of new enquiries (email address), and do you want an email notification (needs an email provider, O-040)?
5. **Analytics.** None at launch (no cookie banner), cookieless analytics (no banner), or Google Analytics (needs a consent banner)?
6. **Photography.** Is a commissioned photoshoot of a real UK kitchen possible before launch? If not, I'll use a small number of carefully reviewed, properly licensed stock photos, self-hosted and recorded in a manifest, with the design led by product interfaces.
7. **Pricing wording.** Can the site say **"priced per site, with unlimited staff"** (consistent with D-042/O-018)? Any trial, setup fee or founding-member offer you're committed to? If not, the pricing section shows only "Pricing announced before launch" plus the early-access CTA.
8. **Legal details** for the privacy policy and footer: company or trading name, registered address, company number (if any), ICO registration fee number, and the contact email for privacy requests. Is `info@vellumiaskin.com` the right contact, or will there be a `@safekitchen.uk` address?
9. **Demos.** Should the final CTA offer "Request a demo" (meaning someone will run demos for early-access leads), or only "Join early access"?

Also, to confirm: may I add decision **D-073** (separate website app) to the app repository's DECISIONS.md? I won't touch the app repository otherwise.

---

## 12. What I will not do without approval

- Change anything in the `safe-kitchen` app repository, its databases or Supabase settings.
- Create accounts or projects (Vercel, Supabase, Cloudflare, analytics, email).
- Install dependencies, commit, push, open pull requests or publish anything.
- Publish specific temperatures, legal requirements or any claim from §7.2.

---

## 13. Owner decisions (30 October 2026)

| # | Question | Decision |
|---|---|---|
| 1 | Rotas, clock-in and ordering | **Show them** in the roadmap section, labelled "Exploring". (For the app's records this leans towards O-019 option (a); the app's DECISIONS.md is not changed without approval.) |
| 2 | Launch date | **No date stated** anywhere on the site. |
| 3 | Domain | Owner will buy **safekitchen.uk**. The site stays `noindex` until the owner says go live. Trademark checks (O-002) still recommended before public launch. |
| 4 | Hosting and services | Explained again in plain English, awaiting approval. |
| 5 | Analytics | **Google Analytics 4**, loaded only after cookie consent (UK PECR), plus Google Search Console. SEO growth plan below. |
| 6 | Photography | **Stock photos**: licensed, self-hosted, each checked for food-safety accuracy and recorded in an image manifest. |
| 7 | Pricing | **£14.99 a month or £149.99 a year, per site.** Multi-site businesses enquire. Follow-ups: VAT, unlimited staff, free trial. |
| 8 | Legal details | Owner will supply later. Placeholders are clearly marked and block go-live. |
| 9 | Final CTA | **Request a demo** or **book a call**, alongside early access. |

### 13.1 SEO and analytics plan

- **Measure:** GA4 with Consent Mode v2 behind an accessible cookie banner (Accept and Reject equally prominent; nothing loads before a choice). Key events: early-access sign-up, demo or call request, demo completed, calculator used, pricing viewed. Google Search Console and Bing Webmaster Tools for search queries and indexing (no cookies needed). UTM links for every campaign.
- **Rank:** fast pages (Core Web Vitals), one clear topic per page, accurate structured data (Organization, SoftwareApplication with the real price as an Offer, FAQPage, BreadcrumbList), per-page Open Graph images.
- **Content hub, "Kitchen guides":** useful, checked articles that answer what owners already search for, e.g. how to keep SFBB records digitally, what happens at a food hygiene inspection, paper vs digital records, and a plain-English glossary (SFBB, HACCP, EHO, food hygiene ratings). Every statement about official requirements is sourced and checked, as in the app.
- **Free printable templates (lead magnets):** fridge and freezer temperature log, opening and closing checklist, cleaning schedule. The limit fields are left blank ("from your safe method"), so no figures are invented. Download in exchange for an optional email.
- **Business-type pages:** takeaways, restaurants, cafés, pubs, hotel kitchens, each with genuinely different content. No thin copy-and-paste town pages.
- **Free tool page:** the paperwork time calculator as its own page.
- **Earn links:** founder story for hospitality trade press, guest articles, partnerships with food safety trainers and consultants, UK hospitality and SaaS directories (review sites only once the product is live).

### 13.2 Follow-up decisions (30 October 2026)

- **Pricing:** £14.99 a month or £149.99 a year **+ VAT**, per site. **Unlimited staff per site. No hidden charges.** Multi-site businesses enquire.
- **Booking calls:** owner wants a built-in booking calendar. It will show **only real availability**. Showing fake "booked" slots to create demand is not used, because it would be misleading under UK consumer protection law (see chat, 30 October 2026). Honest alternatives: offer a limited number of real slots each week, and show genuinely booked slots as unavailable.
- **Services approved ("approve all"):** Vercel (hosting; Pro plan for the live business site), a separate Supabase project in London (early-access and booking storage), Cloudflare Turnstile (spam protection) and Resend (sign-up and booking emails). The owner creates the accounts. Step-by-step instructions are given when each one is needed (Stage 3).
