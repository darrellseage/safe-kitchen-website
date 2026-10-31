/**
 * Statistics used in sales messages. Each records its source and whether its
 * exact figure and wording have been checked against the original publication.
 * Unverified figures appear only in the private launch preview, marked as
 * being verified; the real site hides them until `verified` is true.
 */
export type Stat = { value: string; label: string; source: string; sourceUrl: string; verified: boolean; note?: string };

const fsaWave11 = {
  source: "Food Standards Agency, Food and You 2: FHRS report, Wave 11 (2026)",
  sourceUrl:
    "https://www.gov.uk/government/publications/food-hygiene-rating-scheme-fhrs-food-and-you-2-report-wave-11/food-hygiene-rating-scheme-fhrs-food-and-you-2-report-wave-11",
};

export const hygieneStats: Stat[] = [
  {
    value: "48%",
    label: "of consumers consider food hygiene ratings when choosing a takeaway",
    ...fsaWave11,
    verified: false,
    note: "Not yet confirmed: earlier waves reported 35% to 40% for takeaways.",
  },
  {
    value: "66%",
    label: "of people who know the scheme consider a rating of 4 or 5 the lowest they’d accept",
    ...fsaWave11,
    verified: false,
    note: "Search results show 52% chose 4 as the lowest acceptable rating; the 4-or-5 total is not yet confirmed.",
  },
  {
    value: "14%",
    label: "of people who know the scheme would only accept a rating of 5",
    ...fsaWave11,
    verified: false,
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
