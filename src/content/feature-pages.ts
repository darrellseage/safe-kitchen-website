/**
 * What each feature page says beyond its main section and demo: who it helps,
 * an example from a shift, what's recorded, limits worth knowing, and related
 * pages. Launch-ready copy. Rules: nothing here may state an official limit,
 * temperature, time or legal requirement; limits and actions always come from
 * the kitchen's own approved safe methods.
 */
import { certificateDisclosure, aiChecker, allergens, inspection } from "./home";
import type { FeatureSlug } from "./site-map";

export type FeatureContent = {
  metaTitle: string;
  metaDescription: string;
  /** Only for pages without an existing section to open them. */
  hero?: { eyebrow: string; title: string; accent: string; intro: string };
  owners: string[];
  team: string[];
  shift: { title: string; steps: Array<{ time: string; title: string; body: string }> };
  records: { title: string; items: string[] };
  goodToKnow: string[];
  related: FeatureSlug[];
};

const fsa = "Safe Kitchen is built around the Food Standards Agency’s Safer Food, Better Business system, but it isn’t affiliated with or endorsed by the FSA or any local authority.";
const yourMethods = "Safety limits and corrective actions come from your own approved safe methods. Safe Kitchen never invents a limit or approves an action for you.";

export const featureContent: Record<FeatureSlug, FeatureContent> = {
  "food-safety": {
    metaTitle: "Food Safety & SFBB records",
    metaDescription: "Daily food safety records for UK kitchens, built around Safer Food, Better Business: checks, temperatures, cleaning and problems recorded in a few taps.",
    hero: {
      eyebrow: "Food Safety & SFBB",
      title: "Your food safety paperwork,",
      accent: "done as the day happens.",
      intro: "Safe Kitchen holds the daily records behind your Safer Food, Better Business system: opening and closing checks, temperatures, cleaning, problems and what you did about them. Each one takes a few taps on a shared kitchen tablet or a phone.",
    },
    owners: [
      "See which checks are done, missing or overdue without phoning the kitchen",
      "Records organised by day and by site, ready to show",
      "Your supplier list and pest control records kept with everything else",
      "Every record shows who made it, when and on which device",
    ],
    team: [
      "Only what needs doing now, with big buttons that work with gloves on",
      "Nothing is filled in for you",
      "A problem is as quick to record as a pass",
      "Everyone signs in on the shared tablet with their own PIN",
    ],
    shift: {
      title: "One day’s records",
      steps: [
        { time: "09:40", title: "Opening checks", body: "Sam works through the opening checklist on the kitchen tablet." },
        { time: "10:02", title: "Fridge and freezer readings", body: "Each reading is entered by hand and saved with Sam’s name, the time and the device." },
        { time: "15:10", title: "A problem, and what was done", body: "A reading is outside the kitchen’s own limit. Sam records the action taken, chosen from the kitchen’s approved safe methods." },
        { time: "22:00", title: "Closing checks and cleaning", body: "The closing team ticks off the cleaning schedule. Anything missed stays visible for the manager." },
      ],
    },
    records: {
      title: "What you can record",
      items: [
        "Opening and closing checks",
        "Fridge, freezer and food temperature readings",
        "Cleaning schedules",
        "Problems and the corrective actions taken",
        "Your supplier list",
        "Pest control checks",
        "Staff training records and certificates",
        "Documents you upload, such as pest control reports",
      ],
    },
    goodToKnow: [
      yourMethods,
      "Records are never silently changed. A correction is saved as an amendment, and the original stays.",
      "Your business stays responsible for its food safety system. Your local authority can advise on what they expect to see.",
      fsa,
    ],
    related: ["temperature-checks", "inspection-mode", "allergens"],
  },
  "inspection-mode": {
    metaTitle: "EHO Inspection Mode",
    metaDescription: "Show an Environmental Health Officer your records in seconds: daily checks, training certificates, suppliers, pest control and documents in one place.",
    owners: [
      "The last 28 days of records on screen, on a laptop, tablet or phone",
      "Training certificates, supplier list, pest control and documents one tap apart",
      "Print the records or save them as a PDF",
      "No folders to find and nothing “in the office somewhere”",
    ],
    team: [
      "The team carries on with service while a manager shows the records",
      "Anything missing or unresolved is shown honestly, never hidden",
      "Each record shows who made it and when",
    ],
    shift: { title: "An unannounced visit", steps: inspection.timeline.map((t) => ({ time: t.time, title: t.title, body: t.body })) },
    records: {
      title: "What Inspection Mode brings together",
      items: [
        "Daily food safety records and temperature readings",
        "Cleaning records",
        "Problems and the corrective actions taken",
        "Allergen records and sign-offs",
        "Staff training records and certificates",
        "Your supplier list",
        "Pest control checks and reports",
        "Other documents you upload",
      ],
    },
    goodToKnow: [
      "Safe Kitchen can’t guarantee any food hygiene rating. Ratings depend on the inspection of your premises, practices and management.",
      "There is no scheme under which Environmental Health Officers approve record-keeping software, and Safe Kitchen doesn’t claim to be approved.",
      fsa,
    ],
    related: ["food-safety", "temperature-checks", "training"],
  },
  "temperature-checks": {
    metaTitle: "Temperature checks and records",
    metaDescription: "Record fridge, freezer and food temperature readings in a few taps, with the name, time and device saved automatically. Nothing is prefilled.",
    owners: [
      "Every reading shows who took it, when, on which device and how it was entered",
      "Readings outside your limits ask for the action taken",
      "Missed readings stay visible instead of disappearing",
      "Readings sit in Inspection Mode with the rest of your records",
    ],
    team: [
      "Tap the scale, nudge by 0.1 or type the reading",
      "The scale starts empty, so nobody can save a reading they didn’t take",
      "A bad reading is as easy to record as a good one",
      "Controls are large enough to use with gloves on",
    ],
    shift: {
      title: "A reading that isn’t right",
      steps: [
        { time: "10:02", title: "The reading is recorded", body: "Sam enters what the thermometer shows. It’s outside the kitchen’s own limit, and it’s saved exactly as entered." },
        { time: "10:04", title: "The action is recorded", body: "Sam chooses what was done from the kitchen’s approved safe methods." },
        { time: "10:20", title: "A second reading", body: "The re-check is saved as a new record. The first reading is kept." },
        { time: "Later", title: "Shown, not hunted for", body: "The reading, the action and the re-check appear together in Inspection Mode." },
      ],
    },
    records: {
      title: "What’s saved with each reading",
      items: ["The reading itself, exactly as entered", "Who recorded it", "The time it was taken and the time it was saved", "The device and how it was entered", "Any corrective action, and the re-check", "Any later correction, kept as an amendment"],
    },
    goodToKnow: [
      yourMethods,
      "Readings are entered by a person. Safe Kitchen doesn’t take readings automatically, and connected probes and sensors aren’t part of Safe Kitchen today.",
      "The demo on this page uses sample equipment and isn’t food safety guidance.",
    ],
    related: ["food-safety", "inspection-mode", "reports"],
  },
  allergens: {
    metaTitle: "Allergen management",
    metaDescription: "Record the allergens in every dish, give staff a two-tap answer and customers a QR-code allergen menu, with Natasha’s Law labels from the same records.",
    owners: [
      "One signed-off allergen record for every dish",
      "Changes to a recipe or supplier product flag every affected dish",
      "A QR-code menu and printable chart that stay up to date",
      "Allergen records and sign-offs ready in Inspection Mode",
    ],
    team: [
      "Tap a dish, or filter by allergen, instead of guessing",
      "An answer on the tablet when the chef who wrote the menu is off",
      "Labels for prepacked food printed from the same records",
    ],
    shift: {
      title: "Saturday night, table 12",
      steps: [
        { time: "19:42", title: "A customer asks about sesame", body: "The server opens the allergen filter on the kitchen tablet." },
        { time: "19:43", title: "The dishes are on screen", body: "Each dish shows the allergens recorded for it and any cross-contact risk the kitchen has noted." },
        { time: "19:44", title: "The kitchen is told", body: "The server tells the chef about the allergy, as the screen prompts. The conversation still happens." },
      ],
    },
    records: {
      title: "What’s recorded",
      items: allergens.helps.map((h) => `${h.title}: ${h.body}`),
    },
    goodToKnow: [allergens.note, "Safe Kitchen never tells a customer a dish is “safe for them”."],
    related: ["food-safety", "inspection-mode", "training"],
  },
  training: {
    metaTitle: "Staff training and certificates",
    metaDescription: "Level 2 food hygiene training for every member of staff, included in your plan, with lessons, test and certificate in the app.",
    owners: ["No per-person or per-course fees", "See who has finished, who is part-way and who hasn’t started", "Certificates filed against each person’s record", "Certificates from other providers can be uploaded and sit alongside"],
    team: ["The course arrives on your own phone, or you can sit it on the kitchen tablet", "Short lessons, then the test", "Your certificate is saved for you"],
    shift: {
      title: "A new starter’s first week",
      steps: [
        { time: "Day 1", title: "Priya is added to the team", body: "Safe Kitchen suggests the course for her role and the manager confirms." },
        { time: "Day 1", title: "The course is on her phone", body: "She works through the lessons between shifts." },
        { time: "Day 3", title: "She passes the test", body: "Her certificate is saved to her record." },
        { time: "Any day", title: "An inspector asks about training", body: "Her certificate is two taps away in Inspection Mode." },
      ],
    },
    records: { title: "What’s recorded", items: ["Who has been sent the course", "Progress through the lessons", "The test result", "The Safe Kitchen certificate", "Certificates you upload from other training providers, labelled with their provider"] },
    goodToKnow: [certificateDisclosure],
    related: ["inspection-mode", "rotas-clock-in", "allergens"],
  },
  "rotas-clock-in": {
    metaTitle: "Staff rotas and clock-in",
    metaDescription: "Turn the rota you already made into a digital rota from a photo or spreadsheet, send it to staff phones, and turn clock-ins into timesheets.",
    owners: ["No retyping a rota you’ve already written", "See who’s in and who’s late", "Timesheets ready to review and export for your payroll", "Every correction to a clock-in is kept"],
    team: ["The rota on your phone, not lost in a group chat", "Clock in on your phone or with your PIN on the tablet", "Location is checked only at the moment you clock in or out"],
    shift: {
      title: "From the wall to the timesheet",
      steps: [
        { time: "Mon 14:00", title: "The rota is photographed", body: "Safe Kitchen turns it into a draft and highlights anything it isn’t sure about." },
        { time: "Mon 14:10", title: "The manager checks and publishes", body: "Nothing is sent to staff until the manager presses Publish." },
        { time: "Tue 08:55", title: "Sam clocks in", body: "On his phone, with location checked at that moment, or with his PIN on the kitchen tablet." },
        { time: "Sun", title: "Timesheets are reviewed", body: "The manager checks the week and exports it for payroll." },
      ],
    },
    records: {
      title: "What you can do",
      items: ["Upload a rota as a photo, screenshot, PDF, Word document or Excel spreadsheet", "Check and edit the draft before publishing", "Send the published rota to staff phones", "Clock in and out by phone location, QR code or tablet PIN", "See attendance against the rota", "Review timesheets and export them for payroll"],
    },
    goodToKnow: [
      "There is no tracking during shifts. Location is checked only when someone clocks in or out, and staff can use their tablet PIN instead.",
      "Location checks reduce mistakes but aren’t foolproof. Managers review and correct records, and every change is kept.",
      "Safe Kitchen doesn’t run payroll. It gives you timesheets to export.",
    ],
    related: ["training", "reports", "ordering"],
  },
  ordering: {
    metaTitle: "Smart ordering and suppliers",
    metaDescription: "Build orders for the suppliers you already use, with checks for duplicates and unusual quantities before a manager approves and sends.",
    owners: ["Possible duplicate and oversized orders flagged before they’re sent", "A manager approves every order", "See what’s ordered before you order again", "Your supplier list kept with your food safety records"],
    team: ["Build an order for a supplier in one place", "A clear warning, with the reason, when something looks wrong", "No guessing whether an order has gone"],
    shift: {
      title: "An order that was already placed",
      steps: [
        { time: "16:30", title: "An order is built", body: "Chicken breast is added to tomorrow’s order." },
        { time: "16:31", title: "A possible duplicate is flagged", body: "The same item is already on Thursday’s delivery. Safe Kitchen shows why it was flagged." },
        { time: "16:35", title: "The manager decides", body: "The line is removed, the order is approved and sent to the supplier." },
        { time: "Next day", title: "Sent isn’t accepted", body: "The order shows as sent until the supplier confirms it." },
      ],
    },
    records: { title: "What you can do", items: ["Keep a list of your suppliers", "Build an order for a supplier", "See warnings for possible duplicates, unusually large orders and unusual patterns", "Approve an order as a manager", "Send it by email, or by a direct link where a supplier supports one", "Track it from sent to delivered"] },
    goodToKnow: [
      "You keep ordering from, and paying, your suppliers directly.",
      "Warnings are prompts for a manager to check. Safe Kitchen never changes or sends an order on its own.",
      "Safe Kitchen doesn’t promise a particular saving. Results depend on how each kitchen works.",
    ],
    related: ["reports", "food-safety", "rotas-clock-in"],
  },
  reports: {
    metaTitle: "Reports, AI Checker and management oversight",
    metaDescription: "A daily or weekly summary of what’s missing, incomplete or unusual in your kitchen records, and a clear view of every site.",
    owners: ["Know what’s been checked, what’s missing and what needs attention", "Daily or weekly summaries, with urgent items flagged straight away", "Switch between sites and see each one’s day", "Print or export records when you need them"],
    team: ["It checks the paperwork, not the people", "Gaps are spotted the same day, not at the next inspection", "Each flag explains why and links to the record"],
    shift: {
      title: "The end of a long Tuesday",
      steps: [
        { time: "22:15", title: "The summary arrives", body: "One afternoon fridge reading is missing, and one cleaning task is incomplete." },
        { time: "22:16", title: "The manager opens the flag", body: "It explains why it was raised and links straight to the record." },
        { time: "Wed 09:00", title: "It’s dealt with", body: "The manager follows it up with the team and records what was done." },
      ],
    },
    records: {
      title: "What you can see",
      items: aiChecker.catches.concat(["A view of each site: checks, who’s on shift, what needs attention and orders", "Inspection Mode records to print or save as a PDF", "Timesheets to export", "An export of your records if you leave"]),
    },
    goodToKnow: [aiChecker.note, "The AI Checker reads records and forms. It doesn’t use cameras and it doesn’t watch staff."],
    related: ["inspection-mode", "food-safety", "rotas-clock-in"],
  },
};
