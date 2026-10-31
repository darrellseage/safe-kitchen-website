/**
 * Stock photo manifest. Every photo used on the site is listed here with its
 * source, licence and food-safety accuracy review (copied from the app's
 * reviewed manifest, src/demo-content/images.ts, 29 Oct 2026). Photos are
 * served from Unsplash; self-host or replace with commissioned photos before
 * launch where possible.
 */
export type StockImage = {
  src: string;
  alt: string;
  /** CSS object-position keeping the subject in frame at every crop. */
  focal: string;
  sourceUrl: string;
  photographer: string;
  licence: "Unsplash License";
  accuracyNote: string;
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const images = {
  kitchenLine: {
    src: u("1771360963016-1408c2de12c4"),
    alt: "A chef cooking at a stainless-steel range in a busy commercial kitchen",
    focal: "50% 40%",
    sourceUrl: "https://unsplash.com/photos/a-chef-cooking-in-a-commercial-kitchen-F9v4iq0RDZ0",
    photographer: "Ahmet Safa Türkyılmaz",
    licence: "Unsplash License",
    accuracyNote: "Chef's hair is not covered: use only as a darkened background, never to illustrate hygiene.",
  },
  plating: {
    src: u("1532635211-8ec15f2ce05c"),
    alt: "A chef in a cap, apron and disposable gloves plating dishes on a counter",
    focal: "55% 30%",
    sourceUrl: "https://unsplash.com/photos/man-cooking-in-kitchen-iv6yNy7oBqQ",
    photographer: "Elevate",
    licence: "Unsplash License",
    accuracyNote: "Hair covered, gloves worn. Avoid close crops of the yellow-gloved hand.",
  },
  takeaway: {
    src: u("1774028156636-e514fa039c19"),
    alt: "Inside a takeaway, with menu boards above the counter",
    focal: "50% 50%",
    sourceUrl: "https://unsplash.com/photos/interior-of-a-pink-and-white-diner-with-menu-boards-rT-_NtST13Q",
    photographer: "Bruno BD",
    licence: "Unsplash License",
    accuracyNote: "Premises only.",
  },
  restaurant: {
    src: u("1667388969250-1c7220bf3f37"),
    alt: "A warmly lit restaurant dining room with wooden tables",
    focal: "50% 50%",
    sourceUrl: "https://unsplash.com/photos/a-room-with-tables-and-chairs-e4B5AvA7Jqo",
    photographer: "Glenov Brankovic",
    licence: "Unsplash License",
    accuracyNote: "Premises only.",
  },
  cafe: {
    src: u("1767201364709-6081f4be46cc"),
    alt: "A bright café counter with a coffee machine and baked goods",
    focal: "50% 50%",
    sourceUrl: "https://unsplash.com/photos/a-bright-coffee-shop-counter-with-baked-goods-QFTFsEdvrwE",
    photographer: "Babak Eshaghian",
    licence: "Unsplash License",
    accuracyNote: "Premises only.",
  },
  pub: {
    src: u("1759503167345-a371b3fe36fd"),
    alt: "The front of a traditional pub with hanging flower baskets",
    focal: "50% 50%",
    sourceUrl: "https://unsplash.com/photos/people-inside-a-teal-colored-building-with-hanging-flowers-_V9xd3nOogY",
    photographer: "Joakim Kingstrom",
    licence: "Unsplash License",
    accuracyNote: "Premises only.",
  },
  owner: {
    src: u("1758887261865-a2b89c0f7ac5"),
    alt: "A smiling restaurant owner standing in his restaurant",
    focal: "50% 22%",
    sourceUrl: "https://unsplash.com/photos/man-with-beard-in-a-red-shirt-smiling-indoors--tJfonfU7Qc",
    photographer: "Babak Eshaghian",
    licence: "Unsplash License",
    accuracyNote: "Front-of-house portrait. No food handling shown.",
  },
} satisfies Record<string, StockImage>;
