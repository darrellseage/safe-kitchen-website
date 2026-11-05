# Safe Kitchen website: Stage A audit

> **Date:** 5 November 2026. **Audited:** branch `claude/light-redesign` at commit `2760c91`, running locally, and the private preview of the same build. **Method:** every section and component read in source; the page measured in a real browser at 320, 375, 768 and 1280px (`scripts/browser-checks/` plus an audit script); screenshots in `docs/review/stage-a/`.
> **Stance:** this is a critical audit of work I did myself over the last week. I've tried not to defend it.

## 1. Scores out of 10

| Dimension | Score | Evidence |
|---|---|---|
| **Originality / brand identity** | **4** | Plus Jakarta Sans, rounded cards, pill buttons, alternating pastel green bands, floating "cards" around a device frame in the hero. Every one of those is a current SaaS default. Nothing on the page could only belong to a kitchen company. Remove the word "kitchen" and the layout would serve a payroll app. |
| **Trust / credibility** | **6** | Strong: honest status labels, a real founder with real experience, mandatory disclosures, no fake testimonials, VAT shown. Weak: no customers, no pilot named, no reviews, a placeholder logo, draft legal pages, stock photos (two of which the manifest itself says can't illustrate hygiene). The "Straight answers" section is the single most trust-building block and it's the fourteenth section down. |
| **Design quality** | **6** | Clean, consistent, accessible (48px targets, reduced motion, logical properties). But the system is a careful application of defaults, not a point of view. The green-on-green section rhythm reads as "colour-blocked template". Visual hierarchy inside sections is flat: the same card radius and shadow everywhere. |
| **Clarity (five-second test)** | **7** | After the conversion pass the first screen says what it is, who it's for and the price. That's good. But it still leads with "Running a kitchen is hard enough. The paperwork shouldn't be.", which is a feeling, not a category. A visitor has to read the body copy to learn it's an SFBB-replacement app. The 60-second tour needs scrolling to reach. |
| **Emotional impact** | **5** | The copy is polite and sensible. The strongest fear in the market (the unannounced inspection) is there, but in section eleven, inside the "records" section, after training, AI, rotas and ordering. The hero visual is a to-do list, which is nobody's fear or desire. The founder story is the most emotionally credible content on the page and arrives fourth. |
| **Conversion potential** | **6** | Four calls to action is right. The two-step form is good. Against that: the page is 24,400px on desktop and 31,100px on a phone, 4,100 words, 16 sections, 10 CTA-type links. No sticky mobile CTA. No proof of any kind (even a pilot). Pricing is clear but buried at section 14. |
| **Mobile experience** | **7** | No horizontal overflow at 320px, all targets ≥44px, "Try the demo" buttons shorten the page by a quarter. But 31,000px is still 38 screens, headline sizes crowd the first screen, and the eight-item menu lists sections rather than answering questions. |

**Overall: a competent, honest, generic SaaS page.** It would not embarrass the company. It also would not be remembered, and it does not yet make a restaurant owner feel the product understands their worst Tuesday.

## 2. Measurements (local production build, 5 Nov 2026)

| Metric | Desktop 1280 | Phone 375 | Narrow 320 |
|---|---|---|---|
| Page height | 24,436px | 31,148px | 34,078px |
| Words in `<main>` | 4,146 | 3,059 (demos closed) | 3,059 |
| Sections | 16 | 16 | 16 |
| DOM nodes | 2,107 | 2,107 | 2,107 |
| Requests on load | 31 | 29 | 28 |
| LCP (dev server, no throttling) | 0.8–1.6s | 0.5s | 0.5s |
| CLS | 0 | 0 | 0 |
| Horizontal overflow | none | none | none |
| CTA-type links in main | 10 | 10 | 10 |

Production assets in `.preview-publish`: JavaScript 1.1MB across 12 chunks (uncompressed; roughly 300KB over the wire), CSS 56KB, fonts 68KB, HTML 350KB, images 3.2MB total on disk (not all load at once; the hero loads none). Lighthouse could not be run (not installed; installing was not approved), so Core Web Vitals under throttling are **not measured**. The JavaScript figure is the main performance risk: `motion`, Radix and seven interactive demos all ship to the homepage.

## 3. The 20 biggest weaknesses

Ordered by how much each one costs conversions, with evidence.

1. **It looks like generic AI-era SaaS.** Rounded 24px cards, pill buttons, soft shadows, floating UI cards around a device frame, pastel green bands, a geometric sans. These are the exact patterns a buyer now sees on every B2B landing page. There is no visual idea that belongs to kitchens.
2. **The hero visual is a to-do list.** The tablet "Now" screen shows four tasks. It explains the product but carries no emotion and no differentiation. The three floating cards (clock-in, AI, ordering) fragment attention.
3. **The strongest fear is buried.** "When the EHO walks in" is an H3 inside section 11 ("Inspection-ready records"), at roughly 15,000px on desktop. In this market, inspection anxiety is the lead, not a sub-section.
4. **No proof of any kind.** No pilot kitchens, no reviews, no "built with" names, no screenshots of the real app (the real app exists: accounts, tablet, PIN sign-in are built). The page shows mock-ups of planned features and none of the built ones.
5. **Length.** 31,000px on a phone, 24,000px on desktop, 4,100 words. The conversion pass cut 22 sections to 16 and the demos behind buttons, but it still asks a takeaway owner for 10+ minutes of attention.
6. **Feature-led structure.** Sections 7–11 are one feature each (training, AI, rotas, ordering, records). That is how the product team thinks, not how a buyer decides. A buyer asks "will this get me through an inspection and save me time?"
7. **Planned features dominate.** Six of the seven interactive demos are for planned features. Honest labels fix the legal problem but not the credibility one: the most elaborate parts of the page are the least real.
8. **Headline is a mood, not a category.** "Running a kitchen is hard enough. The paperwork shouldn't be." could introduce an accountancy app. The product category ("digital SFBB and kitchen records") appears only in body copy.
9. **The founder is a card, not a reason.** The founder story is well written but presented like a team page. It should be the spine of the whole site's voice (concept work addresses this).
10. **Three calculators with illustrative numbers.** They're tabbed now, but their inputs are all defaults, and the headline figure "£5,940 illustrative net value" risks reading as a claim. Competitors like Trail and Leafe make savings claims; Safe Kitchen should win by being the one that doesn't.
11. **Repetition of the price.** The price appears in the hero, the pricing section, the final CTA and the FAQ. Good for clarity; combined with four "unlimited staff" mentions and three "no set-up fee" mentions it reads as nervous.
12. **The 60-second tour is below the fold** and uses the same mock-up style as everything else, so it doesn't feel like a demonstration, it feels like more cards.
13. **Navigation lists sections** (Tour, Training, AI Checker, Rotas, Ordering, Records, Pricing, FAQ). Buyers' questions ("What is it?", "What does it cost?", "Is it ready?") map badly onto that list. On phones the menu is a full-screen list of eight.
14. **No sticky mobile CTA.** The header hides on scroll by design (to respect the app's no-fixed-bars rule). On a 38-screen page that means the only CTAs are at screen 1, 2, 30 and 38.
15. **Stock photography contradicts the message.** `kitchen-line.jpg` and `plating.jpg` are flagged in the manifest as unsuitable for hygiene illustration. Any photo that isn't the founder's is a generic hospitality stock image a competitor could buy tomorrow.
16. **Placeholder logo.** A leaf-and-tick mark that signals "template" before a word is read.
17. **Unverified statistics still in the build** (hidden on the real site, shown in launch preview). They should be verified or deleted, not carried.
18. **JavaScript weight.** About 1.1MB uncompressed of client code on a marketing homepage, driven by `motion`, Radix and seven demos. Phones on 4G in a kitchen back office will feel it.
19. **The "launch preview" mode is a liability.** It exists so the owner could see "everything live". If a preview with that flag is ever shared, it misrepresents the product. Stage B should delete the flag.
20. **Legal and company placeholders in the footer and legal pages** (`[Company or trading name]`, `[ICO registration number]`) are visible in every preview and undermine the "serious company" impression even for private reviewers.

## 4. What is working and should survive

- The honest-status system (`features.ts`, `StatusChip`, `whenLive`) and every disclosure. This is a genuine differentiator in a market where competitors claim "EHO accepted" without evidence (see competitor research).
- The two-step form, the booking logic, spam protection, the content/config/logic separation and the tests (51 unit, 4 browser suites).
- The temperature demo's design principles (nothing prefilled, big targets, bad readings as easy as good). The demo itself is a keeper; its styling can change.
- Accessibility basics: skip link, targets, reduced motion, logical properties, keyboard-operable tabs and accordions.
- The founder story content and photo.
- The pricing facts and their single source in `pricing.ts`.

## 5. Objections the page doesn't answer

| Objection | Current answer | Verdict |
|---|---|---|
| "Will my EHO accept digital records?" | FAQ says Inspection Mode prints/PDFs; "not affiliated with the FSA" | Weak. Needs the FSA's own position (digital diaries are acceptable where they cover the same procedures; the FSA ran a digital-diary feasibility study) with a source link, once gov.uk is reachable. |
| "What happens when the tablet breaks / the wifi dies?" | Offline: "planned, not yet" | Honest but scary. Needs the fallback story (phone, PIN, paper for the day, no data loss). |
| "I already have the free SFBB pack. Why pay?" | Not answered | Must be answered. The pack is free; the value is the time, the finding, and the one-system part. |
| "Isn't £14.99 too cheap to be serious?" | Not answered | Needs the reason the price is low (one founder, no sales team, per-site not per-user). |
| "Who else uses it?" | Nobody yet | Say so, and turn the pilot into the proof story. |
| "What if I leave?" | Export "planned" | Fine. |
| "Can I keep paper for some things?" | Not answered | Yes; say so. |

## 6. Accessibility and technical notes

- Heading order is sound (one H1, H2 per section, H3 inside). 36 headings on one page is itself a navigation problem.
- All five `<img>` elements have alt text; decorative founder thumbnails use empty alt.
- Keyboard: tabs, accordions, tour buttons and form all operable. Screen-reader testing has not been done.
- Colour contrast: previously checked visually; the white-on-white tab bug found on 1 Nov shows the forest/`.tone-forest` token override is fragile. Stage B should remove token-inverting sections.
- SEO: `noindex` while `allowIndexing` is false (correct). FAQ JSON-LD present. No sitemap, robots, Open Graph image or organisation schema yet (Stage 5 scope).
- Not tested: Lighthouse/Core Web Vitals under throttling, screen readers, Safari/iOS real devices, Windows high-contrast mode.

## 7. Before screenshots

`docs/review/stage-a/before-desktop-first.png`, `before-mobile-first.png`, `before-narrow-first.png`, plus full-page captures. Compare against the Stage B result using the same script (`scripts/browser-checks/` and `docs/review/stage-a/audit.js`).
