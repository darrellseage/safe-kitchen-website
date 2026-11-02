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
