# Brand and design directions

> **Date:** 5 November 2026. **Status:** Stage A proposal for the owner's choice. Nothing on the live branch has changed.
> **Mockups (private):** https://claude.ai/artifact/GZAWDBGbKGyHMhHEVKkBPa (index linking to Concept A, B and C). Sources: `docs/design-concepts/*.html`. Screenshots: `docs/review/stage-a/shot-*.png`.
> Each mockup is a homepage sketch with real copy, the confirmed prices, the founder's own photo and honest status wording. Sample data throughout.

## Why the current design fails the brief

The audit scores originality at 4/10. The current site uses the app's design tokens faithfully, which made sense for product consistency, but the result is the default look of 2025–26 SaaS: one geometric sans, 24px-radius cards, pill buttons, pastel bands, floating UI cards. A visitor cannot tell from the first screen that this company knows kitchens. The three directions below each start from something only a kitchen has.

What's kept in all three: the name, the deep green (as a base in C, as the "safe" status colour in A and B), the honest-status system, the founder photo, the temperature-check principles, the disclosures and the prices. The mockups predate the 2 Nov allergens section; in the chosen concept, allergens joins the "rest of the day" row with the same ticket/record treatment.

---

## Concept A · "Stainless" · recommended

**Creative direction.** The website as a working kitchen: brushed-steel neutrals, record-sheet rules, one hot accent taken from a probe thermometer's amber LED display. Headlines are condensed, uppercase and loud, like the labels on a kitchen shelf. Everything else is quiet. The emotional centre is the unannounced inspection and the calm of records that are already open.

**Colour system.**
- Steel 900 `#15181b` (ground for hero, inspection and CTA), 800 `#1f2429`, 700 `#2b3238`; steel 200/100/50 for light sections.
- Amber `#ffb41f` (one accent: readings, primary buttons, the header rule), amber ink `#5a3a00` for text on amber.
- Safe green `#1e9a5a` used **only** to mean "recorded / complete", never decoration. Warning `#e2492a` sparingly.
- Rule: deep neutral + one accent + one status colour. No gradients.

**Typography.** Barlow Condensed 800 for headlines (uppercase, tight), Barlow for body, JetBrains Mono for times, readings, labels and stamps. The mono face is doing the brand work: every time or temperature on the site looks like a record.

**Hero concept.** "When the EHO walks in, your records are already open." Beside it, a probe-display panel: a large amber reading (3.4°C), who recorded it, on which device, "never prefilled", and today's checks beneath. It's the product's core promise as an object, not a dashboard.

**Photography.** Monochrome kitchen photography with the amber accent as the only colour (the founder portrait is shown in grayscale with a steel border). Commission real photos of the pilot kitchens with staff permission; until then, only the founder's photo and licensed images that pass the accuracy review.

**Layout and sections.** Hero → the "nine things on paper" strip (amber) → record sheet of what it replaces (strikethrough paper, green stamp) → Inspection Mode timeline and tablet → pricing (two steel plans) → founder (grey photo, amber quote rule, honest status box) → CTA. Section rhythm is dark / light / dark, with 2px black rules instead of card grids.

**Motion.** Almost none. One permitted moment: the amber reading can "settle" on load like an LED (reduced motion: static). Hover states are a 1px rule, not a lift. Scroll-driven effects removed.

**Emotional positioning.** Competence under pressure. The site should feel like a well-run kitchen at 11:55: ready.

**Trust-building.** The honest-status box is inside the founder section, in the founder's voice. The four-restaurant pilot is named as the proof plan. "Accepted by EHOs"-type claims are conspicuously absent, with a line explaining why.

**Headline / subheading.** "When the EHO walks in, your records are already open." / "Safe Kitchen replaces the SFBB folder, the fridge sheets, the cleaning rota and the training certificates with one system your team can run with wet hands during service. Built by a head chef, not a software company."

**Why it is distinctive.** No competitor found uses an industrial, record-sheet identity; the small UK apps are bright consumer templates and the enterprise ones are corporate blue. It visibly says "kitchen" from the header rule down, and the monospace times/readings make every number on the page look like evidence.

**Weaknesses and conversion risks.** Dark hero sections can read as "serious/expensive" to a café owner expecting friendly; mitigated by the amber and the plain copy. Uppercase condensed headlines must be kept short or they shout. Grayscale photography can look cold; use it only for the founder and kitchen environment shots, never for food. Must be tested with reviewers over 50 for legibility of mono labels.

---

## Concept B · "The Record"

**Creative direction.** The SFBB diary, redrawn. Paper-white ground, ruled lines, ink-blue "handwritten" entries set in mono, and a green "Checked" stamp as the only brand colour. The page itself is the thing the inspector trusts. Calm, documentary, exact.

**Colour system.** Paper `#fbfaf6`, paper-2 `#f2efe6`, line `#d9d3c4`, ink `#1b2430`, ink-muted `#54606c`, pen blue `#1d4ed8` (entries, links, emphasis), stamp green `#128a4a` (status, primary button), warn `#b4531a`. Single-theme, light.

**Typography.** Archivo (expanded width 125% for headlines, normal for body) and IBM Plex Mono for entries, times and labels. Expanded grotesque gives authority without decoration.

**Hero concept.** "Every check your inspector will ask for. Recorded as it happens." with a mono sub-line "Who. When. Which device. Never prefilled." Beside it, one day's digital diary page: entries in pen blue, a missed clean shown honestly in orange, and a rotated "Checked · 4-weekly review" stamp.

**Photography.** Minimal and documentary: real kitchens in natural light, slightly desaturated, framed like evidence photos. The founder portrait on paper with a 1px rule.

**Layout.** Hero → index of records with honest status labels (the whole status system as the second section, which is unusually candid) → inspections ("The visit nobody books") → pricing ("One line on the invoice") → founder ("Fifteen years of filling these in by hand") → CTA. Hairline rules, no cards.

**Motion.** None beyond focus and hover. The stamp could "land" once on load (reduced motion: static).

**Emotional positioning.** Reassurance through exactness. "This is a proper record."

**Trust-building.** Transparency is the design: the second section is the status table. The copy quotes the fear scenario and labels it "not a testimonial".

**Headline / subheading.** "Every check your inspector will ask for. Recorded as it happens." / "Safe Kitchen is the Safer Food, Better Business diary rebuilt for a phone and a shared kitchen tablet…"

**Why it is distinctive.** It borrows the visual language of the paper system every UK kitchen already knows, so it is instantly legible to the audience, and no competitor presents itself as *the record* rather than *an app*.

**Weaknesses and conversion risks.** It sells food safety records first and the all-in-one scope second, which undersells rotas, clock-in and ordering. Paper aesthetics can read as old-fashioned or as "just a digital form", which is exactly SafeTap's and SFBB+'s territory at £5–£15. Pen-blue mono entries are a strong idea but risk looking like fake handwriting if over-used. Lowest emotional energy of the three.

---

## Concept C · "Service"

**Creative direction.** The kitchen's own voice. Keeps the existing deep Safe Kitchen green as the ground, adds a pass-light orange as the single hot accent, and borrows kitchen-ticket printer motifs (perforated tickets, Courier-style type) for product moments. Big, confident editorial headline; everything else plain.

**Colour system.** Green 950 `#06261d`, 900 `#0b3b2e`, mint `#dcefe6`, cream `#f6f3ea`, ink `#101a16`, ticket paper `#fffdf5`, hot `#ff5a1f` (buttons, highlights, the logo dot), hot ink `#5a1c05`. Single-theme.

**Typography.** Bricolage Grotesque 800 (slightly condensed) for headlines, Figtree for body, Courier Prime for tickets. The ticket face appears only on product tickets and labels.

**Hero concept.** "Cook. We'll keep the paperwork." with three kitchen tickets: a reading saved, an AI Checker flag ("It checks the paperwork, not your team"), a duplicate order stopped. Each ticket carries an honest "Planned" label where needed.

**Photography.** Full-bleed kitchen environment band with a dark green overlay and large type; founder photo in colour with rounded corners. Warmer than A.

**Layout.** Hero → four buyer fears (takeaway owner, head chef, manager, multi-site) → photo band → "One day, three tickets" → pricing (mint) → founder (dark) → CTA.

**Motion.** Tickets can slide in once from the top like a printer (reduced motion: static). Hover on tickets: none. Buttons: colour only.

**Emotional positioning.** Relief and confidence. The chef is the hero and the product is the quiet partner.

**Trust-building.** "Honest status" box in the founder section; "Planned" printed on tickets for planned features; the buyer-fear cards state limits ("It can't guarantee a rating").

**Headline / subheading.** "Cook. We'll keep the paperwork." / "Safe Kitchen is the one app for a UK kitchen: food safety records, staff training, rotas, clock-in and ordering checks, built by a head chef who has stood on the pass while the EHO was in the office."

**Why it is distinctive.** The ticket motif is unmistakably hospitality and no competitor uses it; the oversized headline is memorable; it keeps continuity with the existing green so the app and site still feel related.

**Weaknesses and conversion risks.** It is the loudest and the most "brand", which can read as a hospitality lifestyle brand rather than a compliance tool; an inspector-minded owner may trust it less than A or B. The ticket metaphor is about orders, and the product's heart is records. The orange accent must be kept away from warning/danger meanings in the app. Highest risk of looking like a template if the ticket idea is dropped in implementation.

---

## Comparison and recommendation

| | A · Stainless | B · The Record | C · Service |
|---|---|---|---|
| Says "kitchen" in 2 seconds | Yes | Partly (says "record") | Yes |
| Leads with the strongest fear (inspection) | Yes | Yes | Partly |
| Carries the all-in-one scope | Yes (strip + sheet) | Weakly | Yes |
| Credibility with an inspector-minded owner | High | Highest | Medium |
| Distinctiveness vs UK competitors | High | High | High |
| Risk of looking like a template after implementation | Low | Low | Medium |
| Mobile legibility | Good (condensed type is phone-friendly) | Good | Good; very large H1 needs care |
| Continuity with the app's green | Low (green = status only) | Low | High |
| Emotional energy | Medium-high | Low | High |

**Recommendation: Concept A ("Stainless"), with two borrowings.** Take the honest "index of records" status table from B as a section, and the four buyer-fear cards from C as the "who it's for" section. A is the direction that most directly expresses the brief: it looks like it was built by someone who has run a kitchen, it leads with inspection readiness without over-promising, it carries the whole scope in the amber strip and the record sheet, and it is the hardest to mistake for a template.

The cost of A is the break from the app's green palette. That is acceptable: the website is a sales surface, the app is a work surface, and the shared elements (name, mark, status greens, the temperature-check principles) are enough for the two to feel related. If the owner wants stronger continuity with the app, C is the fallback.

## Rules for Stage B regardless of concept

1. One accent colour, one status colour. No decorative gradients, no floating cards, no pastel section bands.
2. Headlines carry meaning in the first five words; subheadings carry the category ("digital SFBB records and kitchen management").
3. Every number set in the mono face is a record (time, temperature, price). Nothing else uses it.
4. Photos: only the founder's own photo and images that pass the accuracy review, until the pilot kitchens can be photographed with consent.
5. Replace the placeholder logo mark with a mark that fits the chosen concept (A: a solid amber square rotated 45°, as in the mockup; to be designed properly).
6. Delete the "launch preview" flag. Private previews show honest status only.
7. Light mode only is acceptable for a marketing site; if dark mode is added later it must be designed, not inverted.
