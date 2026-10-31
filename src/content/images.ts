/**
 * Stock photo manifest. Files are stored in public/images (downloaded
 * 31 Oct 2026 at 1600px wide), so the site doesn't depend on Unsplash. Every photo used on the site is listed here with its
 * source, licence and food-safety accuracy review (copied from the app's
 * reviewed manifest, src/demo-content/images.ts, 29 Oct 2026). Photos are
 * replaced by commissioned photos before launch where possible.
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

const local = (name: string) => `/images/${name}.jpg`;

export const images = {
  kitchenLine: {
    src: local("kitchen-line"),
    alt: "A chef cooking at a stainless-steel range in a busy commercial kitchen",
    focal: "50% 40%",
    sourceUrl: "https://unsplash.com/photos/a-chef-cooking-in-a-commercial-kitchen-F9v4iq0RDZ0",
    photographer: "Ahmet Safa Türkyılmaz",
    licence: "Unsplash License",
    accuracyNote: "Chef's hair is not covered: use only as a darkened background, never to illustrate hygiene.",
  },
  plating: {
    src: local("plating"),
    alt: "A chef in a cap, apron and disposable gloves plating dishes on a counter",
    focal: "55% 30%",
    sourceUrl: "https://unsplash.com/photos/man-cooking-in-kitchen-iv6yNy7oBqQ",
    photographer: "Elevate",
    licence: "Unsplash License",
    accuracyNote: "Hair covered, gloves worn. Avoid close crops of the yellow-gloved hand.",
  },
  takeaway: {
    src: local("takeaway"),
    alt: "Inside a takeaway, with menu boards above the counter",
    focal: "50% 50%",
    sourceUrl: "https://unsplash.com/photos/interior-of-a-pink-and-white-diner-with-menu-boards-rT-_NtST13Q",
    photographer: "Bruno BD",
    licence: "Unsplash License",
    accuracyNote: "Premises only.",
  },
  restaurant: {
    src: local("restaurant"),
    alt: "A warmly lit restaurant dining room with wooden tables",
    focal: "50% 50%",
    sourceUrl: "https://unsplash.com/photos/a-room-with-tables-and-chairs-e4B5AvA7Jqo",
    photographer: "Glenov Brankovic",
    licence: "Unsplash License",
    accuracyNote: "Premises only.",
  },
  cafe: {
    src: local("cafe"),
    alt: "A bright café counter with a coffee machine and baked goods",
    focal: "50% 50%",
    sourceUrl: "https://unsplash.com/photos/a-bright-coffee-shop-counter-with-baked-goods-QFTFsEdvrwE",
    photographer: "Babak Eshaghian",
    licence: "Unsplash License",
    accuracyNote: "Premises only.",
  },
  pub: {
    src: local("pub"),
    alt: "The front of a traditional pub with hanging flower baskets",
    focal: "50% 50%",
    sourceUrl: "https://unsplash.com/photos/people-inside-a-teal-colored-building-with-hanging-flowers-_V9xd3nOogY",
    photographer: "Joakim Kingstrom",
    licence: "Unsplash License",
    accuracyNote: "Premises only.",
  },
  owner: {
    src: local("owner"),
    alt: "A smiling restaurant owner standing in his restaurant",
    focal: "50% 22%",
    sourceUrl: "https://unsplash.com/photos/man-with-beard-in-a-red-shirt-smiling-indoors--tJfonfU7Qc",
    photographer: "Babak Eshaghian",
    licence: "Unsplash License",
    accuracyNote: "Front-of-house portrait. No food handling shown.",
  },
  chef: {
    src: local("chef"),
    alt: "A chef in a white jacket and tall chef’s hat standing with arms folded in a kitchen",
    focal: "50% 35%",
    sourceUrl: "https://unsplash.com/photos/chef-in-white-uniform-in-kitchen-GrpoMEmbQrA",
    photographer: "Ionel Lagaillarde",
    licence: "Unsplash License",
    accuracyNote: "Clean whites, hair covered by hat.",
  },
  manager: {
    src: local("manager"),
    alt: "A restaurant manager standing in a modern restaurant, with staff working behind her",
    focal: "50% 30%",
    sourceUrl: "https://unsplash.com/photos/woman-holding-a-mug-in-a-modern-office-kitchen-vxmmzZbQ_0M",
    photographer: "Rodrigo Rodrigues | WOLF Λ R T",
    licence: "Unsplash License",
    accuracyNote: "Front-of-house portrait. No food handling shown.",
  },
} satisfies Record<string, StockImage>;
