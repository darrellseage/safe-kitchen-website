/**
 * Founder story. Every fact here comes from the owner (1 Nov 2026), who gave
 * permission to use his name. Don't add roles, venues, awards or figures he
 * hasn't confirmed. `photo` stays null until he supplies a genuine photograph:
 * never use a stock or generated image of "the founder".
 */
export const founder = {
  name: "Darrell Seage",
  role: "Founder of Safe Kitchen",
  initials: "DS",
  photo: null as null | { src: string; alt: string },
  short: "Created by Darrell Seage, head chef and kitchen manager with over 15 years in professional kitchens.",
  eyebrow: "Designed by chefs and owners, for chefs and owners",
  title: "Built by someone who’s",
  accent: "worked the pass.",
  facts: [
    { value: "15+", label: "years in professional kitchens" },
    { value: "Head Chef", label: "and Kitchen Manager roles" },
    { value: "Multi-outlet", label: "managing multiple food outlets at a holiday park" },
  ],
  story: [
    "I’ve spent over 15 years in professional kitchens, including Head Chef and Kitchen Manager roles. I’ve worked in restaurants, cafés, pan-Asian kitchens and large hospitality operations, including managing multiple food outlets at a holiday park.",
    "I’ve been responsible for food hygiene standards, kitchen inspections, staff training, rotas, stock ordering, food costs, daily checks and managing kitchen teams. I’ve seen first-hand how much unnecessary paperwork and admin chefs and owners deal with every day.",
    "I created Safe Kitchen to solve those problems: a system designed around how kitchens actually operate. Fast, simple and practical, without unnecessary complications.",
  ],
  quote: "Chefs should be able to concentrate on cooking, not paperwork, and owners should have confidence that their kitchens are being managed properly.",
  responsibilitiesTitle: "What I’ve been responsible for",
  responsibilities: ["Food hygiene standards", "Kitchen inspections", "Staff training", "Rotas", "Stock ordering", "Food costs", "Daily checks", "Managing kitchen teams"],
  photoPending: "Photo of Darrell coming soon",
};
