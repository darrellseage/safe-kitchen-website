# Allergen menu and filter: product and website proposal

> **Status:** proposal for Darrell's decision (2 November 2026). Nothing is built or published.
> **Why:** Darrell noticed that the website has no allergen feature: an easy dish-by-dish allergen view for staff and customers, with a filter that shows which dishes don't contain chosen allergens. Allergens are one of the biggest risks for any food business, so this should be sold on its pain points.

---

## 1. Where this stands today

- **App plan:** allergens appear only as an SFBB safe method (allergen management) and as an onboarding question about *how* the business gives allergen information to customers (PROJECT_PLAN.md; SFBB matrix CC-04). There is **no dish-by-dish allergen chart, no staff or customer view and no filter** in the plan or decision log.
- **Website:** allergens are only mentioned as one lesson in the training course demo.
- **Rule:** the website can only describe features that are in the plan, with an honest status label. Under app D-087, a feature labelled **"Planned"** is a mandatory part of the launch.

## 2. Decisions needed from Darrell

1. **Is the allergen feature part of the product, and part of the launch?** Options: **Planned** (part of the launch, D-087) or **Our vision** (an idea for later). This becomes app decision D-088.
2. **Scope.** Recommended for launch:
   - every dish's allergens, built from its ingredients, for the **14 regulated allergens**, signed off by a manager and versioned (like safe methods);
   - **staff view** on the kitchen tablet or phone: tap a dish to see its allergens, or filter "dishes without…";
   - **customer view**: a QR-code allergen menu and a printable allergen chart, with the same filter;
   - **change alerts**: when a recipe or a supplier product changes, the affected dishes are flagged for a manager to re-check;
   - allergen records included in **Inspection Mode**.
   - Possibly later: labels for food **prepacked for direct sale** (Natasha's Law). Say whether you want this at launch.
3. **Approve the website wording** in section 5.

## 3. Safety rules for the feature (recommended)

These protect customers and the business, and keep the product honest:

- The filter shows dishes that **don't contain the selected allergens as ingredients**. It never says a dish is "safe for you" or "allergen-free" unless the business has confirmed it controls cross-contact.
- **Cross-contact ("may contain") warnings** are shown alongside the filter, and customers are always prompted to **tell staff about their allergy**. This matches the FSA's recommended approach: written information plus a conversation.
- Allergen information is **never generated or guessed by AI**. It comes from the business's own ingredients, with a manager's sign-off. The AI Checker may flag gaps (for example, a dish with no allergen sign-off) but never fills them in.
- Every change is versioned and auditable (D-051), and nothing is ever silently overwritten.
- Customer-facing allergen text is safety-critical: it only appears in a language once a translation has been reviewed (TRANSLATIONS.md rules).
- The business stays responsible for its food. Safe Kitchen helps keep the information accurate and visible; it can't guarantee compliance.

## 4. Verified facts for the pain points

Checked on 2 November 2026. Each claim below goes on the site only with its source.

| Claim | Source |
|---|---|
| Food businesses must tell customers if they use any of the **14 regulated allergens** as ingredients in their food and drink. | FSA, *Food allergy and intolerance advice for consumers* (food.gov.uk) |
| Since 2025, the FSA's best practice is that **written allergen information should always be available** for non-prepacked food, **alongside a conversation** between staff and customer. It's best practice; there's been no change in the law. | FSA, *Allergen Information for Non-Prepacked Foods Best Practice* (GOV.UK, published 24 February 2025; announced 5 March 2025) |
| Serving unsafe food (for example, food containing an allergen when the customer asked for it to be allergen-free) can lead to an **unlimited fine and up to 2 years in prison**. | Lancaster City Council, *Allergen advice* (Food Safety and Hygiene (England) Regulations 2013). Ideally confirm with the regulations on legislation.gov.uk or a solicitor before publishing |
| An Uxbridge restaurant was ordered to pay **£43,816** after a customer with a nut allergy was hospitalised. On a revisit, officers found its allergen menu "confusing" and still inaccurate. | Hillingdon Council press release, 30 April 2025 |
| A pub company was fined **£26,802.76** after a 9-year-old boy with a wheat allergy suffered a serious reaction. | Hitchin Nub News, 8 May 2025 (prosecution by Hertfordshire County Council) |
| A restaurant owner was **jailed for six years for manslaughter** after a customer with a peanut allergy died from a takeaway marked "no nuts". The owner had swapped almond powder for a cheaper mix containing peanuts. | Teesside Crown Court, May 2016 (ITV News, BBC and others) |
| Around **6% of UK adults (about 2.4 million people)** have a clinically confirmed food allergy. | FSA, *Patterns and Prevalence of Adult Food Allergy* (May 2024) |
| **Hospital admissions for food anaphylaxis tripled** in the UK between 1998 and 2018. | Baseggio Conrado et al., *BMJ* 2021 (funded by the FSA and MRC) |

**Notes on tone and accuracy:**
- Deaths from food allergy are real but **rare** (the same BMJ study estimates fewer than 10 a year in the UK, and falling). Don't publish a "deaths per year" figure as a scare statistic. The manslaughter case makes the point honestly.
- **Don't name the people who died** in sales copy (for example Paul Wilson or Natasha Ednan-Laperouse). It's respectful to their families, and the facts of the cases are enough.
- Don't use the Jersey case (£10,000, June 2026): Jersey has its own laws.
- Never claim the feature makes a business "compliant", "Natasha's Law ready" or "EHO approved".

## 5. Proposed website wording (for approval)

**Section heading:** Allergens. The one question you can't afford to get wrong.

**Problem (short):**
> A customer asks, "Is there nut in this?" It's Saturday night, the chef who wrote the menu is off, and the supplier changed the curry paste last week. One wrong answer can put someone in hospital, and put your business in court.

**Proof points (each with its source in small print):**
- Every food business must tell customers which of the **14 regulated allergens** are in its food.
- The FSA's best practice is now **written allergen information, always available**, plus a conversation with the customer.
- Getting it wrong can mean an **unlimited fine and up to two years in prison**. In 2025, one restaurant was ordered to pay **£43,816** after a customer with a nut allergy was hospitalised.
- In 2016, a restaurant owner was **jailed for six years for manslaughter** after swapping almond powder for a cheaper mix containing peanuts.
- About **2.4 million UK adults** have a confirmed food allergy, so allergy customers come through most doors every week.

**How Safe Kitchen helps** (status chip: Planned or Our vision, per decision 1):
- **Every dish, every allergen:** build each dish from its ingredients once, and Safe Kitchen shows which of the 14 allergens it contains, signed off by a manager.
- **Answers in two taps:** staff tap a dish on the kitchen tablet, or filter "show dishes without sesame", instead of guessing or hunting for the chef.
- **Customers can check for themselves:** a QR-code allergen menu and a printable chart, always up to date, with a prompt to tell staff about their allergy.
- **Changes don't slip through:** change a recipe or a supplier product, and every affected dish is flagged for re-checking before it's served.
- **Ready for the EHO:** allergen records and sign-offs sit in Inspection Mode, with training records showing staff have done the allergen lesson.

**Honest small print:**
> Safe Kitchen shows the allergens you've recorded for each dish. It can't see what happens in your kitchen, so cross-contact controls and a conversation with every allergy customer are still essential. Your business remains responsible for the food it serves.

**Placement:**
- a new feature section after "Inspection-ready records";
- one line in "Sound familiar?" (for example, "Nobody's sure what's in the special");
- a mention in the Takeaway owner and Head chef tabs;
- a step in the 60-second tour.

## 6. Sources

- FSA, Food allergy and intolerance advice for consumers: https://www.food.gov.uk/safety-hygiene/food-allergy-and-intolerance
- FSA, Allergen Information for Non-Prepacked Foods Best Practice: https://www.gov.uk/government/publications/allergen-information-for-non-prepacked-foods-best-practice/allergen-information-for-non-prepacked-foods-best-practice
- Lancaster City Council, Allergen advice: https://www.lancaster.gov.uk/environmental-health/food-safety/allergen-advice
- Hillingdon Council, Uxbridge restaurant fined more than £40,000 (30 April 2025): https://www.hillingdon.gov.uk/article/14517/Uxbridge-restaurant-fined-more-than-40000-after-allergen-contamination-led-to-customer-being-hospitalised
- Hitchin Nub News, Pub chain fined following 9-year-old's severe allergic reaction (8 May 2025): https://hitchin.nub.news/news/local-news/pub-chain-fined-following-9-year-olds-severe-allergic-reaction-259492
- ITV News, Indian restaurant owner jailed for six years (23 May 2016): https://itv.com/news/2016-05-23/indian-restaurant-owner-guilty-of-killing-customer-with-curry
- FSA, Patterns and Prevalence of Adult Food Allergy (16 May 2024): https://www.food.gov.uk/research/food-hypersensitivity
- Imperial College London, Deaths from food allergy rare and decreasing in the UK (BMJ 2021): https://www.imperial.ac.uk/news/215053/deaths-from-food-allergy-rare-decreasing/
