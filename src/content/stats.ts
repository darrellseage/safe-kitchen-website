/**
 * Statistics used in sales messages. Each records its source and whether its
 * exact figure and wording have been checked against the original publication.
 * Unverified figures appear only in the private launch preview, marked as
 * being verified; the real site hides them until `verified` is true.
 */
export type Stat = {
  value: string;
  label: string;
  source: string;
  sourceUrl: string;
  verified: boolean;
  /** Who was surveyed, where and when, shown next to the source. */
  coverage?: string;
  note?: string;
};

/**
 * Verified on 1 Nov 2026 against the GOV.UK publication below (wave 11 report,
 * "Use of the FHRS in decision making"). Each figure is quoted exactly as
 * reported, for the group the report gives it for. The survey covers England,
 * Wales and Northern Ireland only: never present these figures as UK-wide or
 * as applying to Scotland.
 */
const fsaWave11 = {
  source: "Food Standards Agency, Food Hygiene Rating Scheme (FHRS) Food and You 2 report: wave 11, published 29 September 2026",
  sourceUrl:
    "https://www.gov.uk/government/publications/food-hygiene-rating-scheme-fhrs-food-and-you-2-report-wave-11/food-hygiene-rating-scheme-fhrs-food-and-you-2-report-wave-11",
  coverage: "Survey of people in England, Wales and Northern Ireland (not Scotland), carried out May to August 2025.",
};

export const hygieneStats: Stat[] = [
  {
    value: "48%",
    label: "of people who order takeaways consider the food hygiene rating when deciding where to order from",
    ...fsaWave11,
    verified: true,
  },
  {
    value: "52%",
    label: "of people who have heard of the scheme say 4 (good) is the lowest rating they’d generally accept",
    ...fsaWave11,
    verified: true,
    note: "Replaces an earlier 66%, which was 52% (rating 4) plus 14% (rating 5) added together and isn’t a figure the report gives.",
  },
  {
    value: "14%",
    label: "of people who have heard of the scheme would only consider a rating of 5 acceptable",
    ...fsaWave11,
    verified: true,
  },
];

export const wasteStat: Stat = {
  value: "£10,000",
  label: "estimated average annual cost of food waste per UK hospitality outlet",
  source: "WRAP, The True Cost of Food Waste within Hospitality and Food Service, November 2013 (2011 costs)",
  sourceUrl: "https://wrap.org.uk/content/true-cost-waste-hospitality-and-food-service",
  verified: true,
  note: "Includes ingredients, the labour to prepare and serve wasted food, energy and disposal.",
};

export const coursePriceNote = {
  text: "Typical online Level 2 food hygiene courses cost about £15 to £25 per person (prices checked October 2026).",
  verified: true,
};

/**
 * Allergen facts for the allergen section (app D-088), checked on 2 November
 * 2026 against the sources named. See docs/ALLERGEN_PROPOSAL.md §4 for the
 * research, and the tone rules: no "deaths per year" scare figure, no names
 * of people who died, no Jersey cases (different law).
 */
export type AllergenFact = { lead: string; body: string; source: string; sourceUrl: string };

export const allergenFacts: AllergenFact[] = [
  {
    lead: "It’s the law.",
    body: "Every food business must tell customers if it uses any of the 14 regulated allergens as ingredients in its food and drink.",
    source: "Food Standards Agency",
    sourceUrl: "https://www.food.gov.uk/safety-hygiene/food-allergy-and-intolerance",
  },
  {
    lead: "In writing, always.",
    body: "Since 2025, the FSA’s best practice is written allergen information that’s always available, plus a conversation with the customer.",
    source: "FSA best practice guidance, February 2025",
    sourceUrl:
      "https://www.gov.uk/government/publications/allergen-information-for-non-prepacked-foods-best-practice/allergen-information-for-non-prepacked-foods-best-practice",
  },
  {
    lead: "£43,816.",
    body: "What one restaurant was ordered to pay in 2025 after a customer with a nut allergy was hospitalised. On a revisit, officers found its allergen menu still confusing and inaccurate.",
    source: "Hillingdon Council, April 2025",
    sourceUrl:
      "https://www.hillingdon.gov.uk/article/14517/Uxbridge-restaurant-fined-more-than-40000-after-allergen-contamination-led-to-customer-being-hospitalised",
  },
  {
    lead: "Six years in prison.",
    body: "A restaurant owner was jailed for manslaughter after a customer with a peanut allergy died. He had swapped almond powder for a cheaper mix containing peanuts, and his takeaway was marked “no nuts”.",
    source: "Teesside Crown Court, 2016 (ITV News)",
    sourceUrl: "https://itv.com/news/2016-05-23/indian-restaurant-owner-guilty-of-killing-customer-with-curry",
  },
  {
    lead: "Unlimited fines.",
    body: "Serving food containing an allergen when a customer asked for it to be left out can mean an unlimited fine and up to two years in prison.",
    source: "Lancaster City Council allergen advice",
    sourceUrl: "https://www.lancaster.gov.uk/environmental-health/food-safety/allergen-advice",
  },
  {
    lead: "2.4 million adults.",
    body: "About 6% of UK adults have a clinically confirmed food allergy, and hospital admissions for food anaphylaxis tripled between 1998 and 2018.",
    source: "FSA, 2024; BMJ, 2021",
    sourceUrl: "https://www.food.gov.uk/research/food-hypersensitivity",
  },
];
