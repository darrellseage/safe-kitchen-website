# Safe Kitchen website: conversion review

> **Status:** recommendations for the owner's approval. **No website changes have been made.**
> **Date:** 31 October 2026. **Reviewed:** the launch preview (branch `claude/light-redesign`, commit `1c68f8a`).
> **Scope:** sales conversion optimisation, not a redesign. The brand, interactive demos, functionality and content-integrity safeguards stay. Known placeholders (hygiene statistics, legal drafts, stock photos, booking hours) are out of scope here.

---

## 1. What the page does today

The homepage has **22 sections** and is about 25,000 pixels tall on a desktop: roughly 28 screens of scrolling, and far more on a phone.

| # | Section | Conversion job | Issue |
|---|---|---|---|
| 1 | Hero | First impression | Says *what* (a list of five things) but not *who it's for* or *the price*. The "Designed by chefs and owners" line has nothing behind it |
| 2 | Value band (deep green) | Promise | Good. Has its own CTA (one of 9) |
| 3 | Six-pillar overview + kitchen photos | Orientation | Good; the photos say who it's for, but only far down |
| 4 | Sound familiar? | Recognition | Good |
| 5 | Food hygiene ratings + revenue calculator | Pain | Strong, but a second calculator this early is heavy |
| 6 | Paperwork calculator + "12 minutes" example | Pain (time) | Third money idea in a row |
| 7 | Before and after | Bridge | Strong visual; overlaps with a guided tour |
| 8 | Food safety demo | Proof | Good |
| 9 | Training: comparison table, steps, demo | **Top selling point** | Only reached after about 9 screens |
| 10 | Inspection Mode | **Top selling point** | Splits "records" away from the food safety demo |
| 11 | Rotas + workflow steps | **Top selling point** | Good |
| 12 | Clock-in + £1,560 example | Feature | Example #2 |
| 13 | AI Checker | **Top selling point** | Reached after about 15 screens |
| 14 | Ordering + £5,200 example | **Top selling point** | Example #3 |
| 15 | Food waste + £1,000 example | Cost | Overlaps ordering (the calculator already says so) |
| 16 | Five systems vs one | Consolidation | Good, short |
| 17 | Chefs and owners + site switcher | Audiences | Good, but generic and late |
| 18 | Savings calculator | Value | Fourth calculator; repeats sections 5, 6, 12, 14 and 15 |
| 19 | Roadmap | Future | Fine |
| 20 | Pricing | **Decision** | Monthly/annual is a toggle; VAT and per-site are in small print; inc-VAT cost not shown |
| 21 | FAQ (15 questions) | Objections | Long; key trust answers are hidden in accordions |
| 22 | Sign-up form | **Conversion** | 6 required fields before anything is sent |

**Calls to action:** header button (hidden on phones), hero, value band, 5 identical "Get early access / See pricing" boxes, pricing, final form. That's **9 prompts**, most saying the same thing.

**Money examples:** £15,600 (revenue at risk), the 12-minute line, £1,560 (clock-in), £5,200 (ordering), £1,000 (waste), then all of them again in the savings calculator.

**The core problem:** everything a buyer needs is on the page, but the strongest reasons to buy arrive late, the price arrives last, and the repetition makes the page feel longer than its content.

---

## 2. Prioritised recommendations

Priority **P1** is the biggest likely effect on sign-ups; **P3** is useful but smaller. No uplift percentages are claimed: the effect of each change should be measured with the analytics set up in Stage 5 (see R14).

### P1: biggest impact

**R1. Rewrite the hero so the first screen answers "what, who, why and how much".**
- Keep the headline. Under it, one sentence that says what it is and who for, for example: *"The kitchen management app for takeaways, restaurants, cafés and pubs: food safety records, staff training, rotas, ordering checks and an AI that spots what's been missed."*
- Add a **price line** next to the buttons: *"From £14.99 a month per site + VAT · Unlimited staff · Level 2 food hygiene training included."*
- Add a small row of the four kitchen types (icons or the existing photos as thumbnails), so visitors recognise themselves immediately.
- Buttons: **Get early access** (primary) and **Take the 60-second tour** (replacing "See how it works").
- *Why it converts:* most visitors decide within the first screen whether to keep reading. Today they don't learn the price, or that it's for kitchens like theirs, until much later.

**R2. Back up "Designed by chefs and owners" with the real founder story.**
- A short founder section straight after the guided tour: photo, name, role, years in professional kitchens, the kinds of kitchens, the moment that led to Safe Kitchen, and a signature line. Plus a one-line version in the hero ("Built by [Name], [X] years as a [chef / owner]").
- **Needs from you:** your real experience (roles, years, kitchen types, anything notable), a photo you're happy to use, and your permission to name you. Nothing will be invented or embellished.
- *Why it converts:* for small independent businesses, trust in the person behind the product is often the deciding factor, and it's the one thing competitors can't copy. Today the claim has no evidence on the page.

**R3. Add a short guided tour near the top: "A day in your kitchen with Safe Kitchen".**
- Six steps, roughly 10 seconds each, using the existing interface pieces. Each step can be clicked through or played automatically, and has a "Try it" link to the full demo further down:
  1. 08:55: Sam clocks in on his phone (clock-in)
  2. 09:40: opening checks and a fridge reading in two taps (food safety)
  3. 11:00: new starter Priya gets her Level 2 course on her phone (training)
  4. 14:00: the manager photographs next week's rota and publishes it (rotas)
  5. 16:30: "Possible duplicate order: 20 kg chicken already ordered today" (ordering)
  6. 22:15: the AI Checker flags "Fridge 2: no afternoon reading" and the EHO view is ready (AI Checker + inspection)
- Replaces the before-and-after scene's job as the "here's how it works" moment. **Recommendation:** keep the before-and-after scene but move it into step 0 of the tour ("Before: paper, WhatsApp, sticky notes"). That turns two sections into one.
- Fully works without animation, with keyboard controls, and on phones as a swipeable card stack.
- *Why it converts:* it shows the whole product in under a minute, before the visitor gets tired of scrolling, and links straight to the deeper demos for those who want them.

**R4. Bring the five strongest selling points forward and give each one clear prominence.**
New order after the tour and founder section:
1. **Unlimited in-house Level 2 food hygiene training** (the comparison table, kept and slimmed)
2. **AI Checker**
3. **Rota photo import** (with clock-in folded in as "and then…", sharing one section)
4. **Smart ordering** (with food waste folded in as a short line plus the WRAP figure, not a separate section)
5. **Inspection-ready records** (the food safety temperature demo and Inspection Mode merged into one section: "record it in seconds → find it in seconds")
- Each gets the same pattern: headline → one-line problem → the key benefit in bold → the demo → one honest status note.
- *Why it converts:* the reasons that justify £14.99 currently appear between screens 9 and 16. Moving them up and grouping related features cuts about six sections without losing any detail.

**R5. Make pricing impossible to misread.**
- Show **monthly and annual side by side** instead of a toggle:
  - *Monthly:* £14.99 + VAT per site per month (£17.99 including VAT).
  - *Annual:* £149.99 + VAT per site per year (£179.99 including VAT), "save £29.89, about 2 months free".
  - The VAT-inclusive figures are arithmetic at the standard 20% rate; please confirm you want them shown.
- A one-line **multi-site example**: *"3 sites = £44.97 a month + VAT. Every member of staff at every site is included."*
- A short "**What you'll never pay for**" list: per-user fees, per-course training fees, setup fees, extra modules (only if you confirm there are no setup fees).
- Repeat the price line in a slim strip just before the sign-up form.
- *Why it converts:* price confusion is a common reason people leave. "Per site, not per person" is a strong differentiator and should be unmissable.

### P2: strong improvements

**R6. Cut the calls to action from 9 to 4, and fix the phone header.**
- Keep: header button, hero, after the tour, pricing, and the final form. Remove the five repeated CTA boxes and the value band's button.
- Between sections, use a light text link ("See pricing →") only where it helps.
- **Phones:** show a compact "Get early access" button in the header next to the menu (today phone visitors only get a menu icon). The header already hides while scrolling down and returns when scrolling up, so it never covers content.
- *Why it converts:* repeated identical boxes become wallpaper. Fewer, well-placed prompts feel more confident and get noticed.

**R7. Combine the money content into one place.**
- Keep **one "Your numbers" section** with three tabs: *What admin costs you now* (paperwork calculator) · *What Safe Kitchen could be worth* (savings calculator) · *Revenue at risk* (hygiene rating scenario).
- In the feature sections, keep **one short illustrative line each**, without separate example boxes, and link to the calculator.
- Keep the "12 minutes a week covers the subscription" line, but only once, next to the price.
- *Why it converts:* one well-used calculator persuades more than four partly used ones, and removing overlap stops the page feeling like it's stretching for numbers.

**R8. Replace "Simple for your team / Powerful for your business" with "Built for you" tabs for the four buyers.**
Four tabs, each with that person's top pains, the three features that matter most to them, and a link to the relevant demo:
- **Takeaway owner:** price per site, quick checks during rushes, hygiene rating visible to customers, training new starters without per-person fees, duplicate orders. *Gap found:* no mention of fast-turnover staff or part-timers. Suggest *"New staff every month? Course sent to their phone on day one."*
- **Head chef:** gloves and wet hands, nothing prefilled, two-tap checks, rota on the phone, no chasing, problems recorded without blame. *Gap found:* the AI Checker can read as "watching staff". Suggest *"It checks the paperwork, not your team."*
- **Restaurant manager:** chasing checks, rota changes, who's late, approving orders, being ready for the EHO, summaries when off-site.
- **Multi-site operator:** one view across sites (the site switcher moves here), the same standards everywhere, per-site pricing that scales simply, roles for owners, managers and staff. *Gap found:* nothing on data export or adding sites later. Suggest a line on adding sites and, once confirmed, on exports.
- *Why it converts:* visitors see their own situation described in their own words, which today only happens in general terms.

**R9. Add one honest trust section: "Where Safe Kitchen is today, and how your data is looked after".**
Plain, accurate statements from the app's real state:
- **Development status:** built today: business accounts, two-step verification, shared kitchen tablet with staff PINs. In development: daily records, temperatures, cleaning and Inspection Mode. Planned: training, rotas, clock-in, AI Checker and ordering. Early-access members hear first as each opens.
- **Data security:** each business's records kept separate at database level with automated tests, two-step verification for owners and managers, personal PINs for staff, records never silently changed. Hosting planned in the UK.
- **Exports:** Inspection Mode prints and saves as PDF (in development); timesheets export to Excel or CSV (planned). We won't promise a full data export until it's built (see question 6).
- **Offline:** "Offline recording is planned but not available yet. We'll only say it works offline once it's been tested."
- **Training certificates:** Safe Kitchen certificates from an in-house course, not an externally accredited qualification (the existing disclosure, made visible rather than small print).
- *Why it converts:* careful buyers look for the catch. Answering it openly in one calm place builds more trust than scattered small print, and it keeps the site truthful while features are still being built. In the launch preview, this section would show launched wording, as everything else does.

**R10. Make the sign-up form easier to finish, especially on phones.**
- **Two steps:**
  - *Step 1:* email and what you'd like (early access / demo / call), then "Continue".
  - *Step 2:* name, business, type, sites and the optional call time.
  - Step 1 is saved as a partial lead only if you approve that and the privacy notice covers it (otherwise nothing is saved until step 2).
- Make business name **optional** at step 2.
- Above the form, say what early access means: *"Free to join. No card. No commitment. Be first to try each feature, and help shape what we build."* (Confirm this is accurate.)
- *Why it converts:* shorter first steps are generally easier to start, and stating "free, no card" removes the main reason to hesitate.

### P3: worthwhile refinements

**R11. Trim the FAQ to about 8 questions.** The trust answers move into R9. Keep: cost, per site/unlimited staff, training certificates, EHO, phones/tablets, rota import, AI Checker, FSA approval.

**R12. Keep the roadmap, but as part of R9's status section** rather than a separate section.

**R13. Keep the "five systems vs one" comparison** but move it next to pricing, where it supports the value argument.

**R14. Measure everything (Stage 5).** Set up analytics events for: hero button clicks, tour started and finished, each demo used, calculator used, pricing viewed, form started, step 1 completed, and form sent. That shows where people drop off, so changes can be judged on evidence.

---

## 3. Suggested new page order (about 14 sections instead of 22)

1. Hero (what, who, price, founder line, two buttons)
2. Value band (no button)
3. **Guided tour** (with the before-and-after scene as step 0)
4. **Founder story** (needs your details)
5. Sound familiar? + hygiene ratings figures, as one problem section
6. **Training** (Level 2, unlimited, comparison table, demo)
7. **AI Checker**
8. **Rotas from a photo → clock-in** (one section)
9. **Smart ordering + food waste** (one section)
10. **Inspection-ready records** (temperature demo + Inspection Mode)
11. **Built for you** (four buyer tabs, site switcher in the multi-site tab)
12. **Your numbers** (one calculator with three tabs) + five systems vs one
13. **Pricing** (side by side, VAT clear, founding offer if approved) + **status, trust and data** + short FAQ
14. Sign-up form

Every existing demo stays; some move. Nothing is deleted that carries unique information.

---

## 4. Founding-customer offer and free trial (recommendations only)

**Nothing here is implemented or promised.** These are options to decide on, ideally with your accountant, because they affect revenue and billing (app Phase 10).

**Founding-customer offer (recommended in some form):** for businesses that join early access and subscribe at launch. Options, from least to most generous:

| Option | What it is | Pros | Cons |
|---|---|---|---|
| A. Price lock | Founding members keep £14.99 / £149.99 for as long as they stay subscribed, even if prices rise | Costs nothing now, rewards loyalty, easy to explain | Only matters if you plan to raise prices |
| B. Launch discount | For example the first 3 months free, or the first year at a reduced rate | Strong pull | Direct revenue cost |
| C. Extras | A free onboarding call, help setting up their rota and checks, priority feature requests | Low cost, builds relationships | Takes your time |

**Recommendation:** A + C. It's credible, low-risk, and plays to the founder-led message.

**Rules:** limits must be real (for example "first 50 businesses" only if you'll actually stop at 50), and the full terms must be written down before advertising.

**Free trial (after launch):**
- **Recommendation:** a 30-day free trial per site, no card needed, with sample data pre-loaded so people see value on day one.
- **Alternative:** 14 days. Shorter, but often too short to cover a full rota cycle and a delivery week.
- **Depends on:** billing (Phase 10) and the referral rules already decided (D-021: referral rewards apply after the first paid payment).

---

## 5. Review by buyer

| Buyer | What works now | What's missing or weak | Fix |
|---|---|---|---|
| **Takeaway owner** | Price, training savings, duplicate orders, hygiene rating pain | Price not seen early; staff turnover not mentioned; long scroll on a phone | R1, R5, R8, R10 |
| **Head chef** | Glove-friendly demo, nothing prefilled, rota on phone | AI Checker could read as surveillance; demos are far down the page | R3, R4, R8 ("checks the paperwork, not your team") |
| **Restaurant manager** | Rota photo import, clock-in, Inspection Mode, AI summaries | Benefits spread across many sections; no "my week with it" view | R3, R4 |
| **Multi-site operator** | Site switcher, per-site pricing, roles | Hidden in a generic section; no multi-site price example; exports and adding sites unclear | R5, R8, R9 |

---

## 6. Questions for the owner

1. **Founder story:** your real kitchen experience (roles, years, kinds of kitchens, anything notable), a photo, and permission to name you.
2. **Early access:** is it accurate to say "free to join, no card, no commitment"?
3. **Pricing display:** show VAT-inclusive figures (£17.99 / £179.99)? Any setup fees, or can we say "no setup fees"?
4. **Founding offer:** which option (A, B, C or a mix), and any real limit on numbers?
5. **Form:** OK to save step 1 (email + interest) on its own as a partial enquiry? This would need a line in the privacy notice.
6. **Exports:** will customers be able to export all their data if they leave? If yes, the site can say so as planned; if undecided, it stays out.
7. **Approval:** which recommendations should I implement? I suggest all of P1 and P2 together as one stage, then P3.
