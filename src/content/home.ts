/**
 * Homepage wording. Kept out of components so copy can be reviewed and edited
 * in one place. Claims follow the Stage 1 proposal §7 (claims audit): no
 * invented figures, no FSA endorsement, honest feature status.
 */
import type { featureStatus } from "@/config/features";

type FeatureKey = keyof typeof featureStatus;

export const hero = {
  titleLead: "Your kitchen is busy enough.",
  titleSoft: "Your paperwork",
  titleAccent: "shouldn’t be.",
  body: "Less chasing checks. Less paperwork. More control. Meet the simpler way to manage food safety and your kitchen.",
  primary: "Get early access",
  secondary: "See how it works",
  points: ["Built around Safer Food, Better Business", "Designed for gloves and wet hands", "Unlimited staff per site"],
  visualLabel: "Illustrative · in development",
};

export const familiar = {
  title: "Sound familiar?",
  intro: "None of this is about bad kitchens. It’s what happens when paperwork has to compete with service.",
  tickets: [
    {
      day: "Fri",
      time: "21:40",
      title: "The temperature sheet still needs filling in.",
      body: "Service is flat out, and the fridge log says “AM” and nothing else.",
      scrawl: "do it after close",
    },
    {
      day: "Tue",
      time: "10:12",
      title: "The EHO is here. Where’s last month’s folder?",
      body: "Someone’s in the office going through a box of curled-up paper.",
      scrawl: "try the back shelf?",
    },
    {
      day: "Sun",
      time: "23:05",
      title: "A cleaning check was missed. Nobody knows who.",
      body: "There’s a tick with no initials, and three people were on shift.",
      scrawl: "??",
    },
    {
      day: "Wed",
      time: "19:30",
      title: "The rota changed. Again.",
      body: "The manager spends the evening messaging staff one by one.",
      scrawl: "seen?",
    },
  ],
};

export const transformation = {
  title: "There’s a simpler way.",
  intro: "Scroll to see the same week, twice.",
  paperLabel: "Paper",
  digitalLabel: "Safe Kitchen",
  outcomes: [
    { title: "Checks in a few taps", body: "Big buttons on a shared tablet or phone. Nothing is filled in for you." },
    { title: "Clear who did what", body: "Name, time and device are saved with every record, automatically." },
    { title: "Records in one place", body: "Organised by day and site, ready when you need them." },
  ],
};

export const demo = {
  title: "Built for chefs. Not paperwork.",
  intro: "Try a temperature check the way your team would. It takes a few taps.",
  flag: "Illustrative demo · not a real account · not food safety guidance",
  why: [
    { title: "Gloves on, hands wet", body: "Every control is at least 48px. Tap anywhere on the scale, nudge by 0.1, or type the exact reading." },
    { title: "Never prefilled", body: "The scale starts empty, so nobody can save a reading they didn’t take." },
    { title: "Who, when and how, automatically", body: "Name, time, device and entry method are saved with each reading. No extra typing." },
    { title: "Bad readings are as easy as good ones", body: "Staff never have to fight the app to record a problem, and the original reading is never overwritten." },
  ],
};

export type FeatureStory = {
  key: FeatureKey;
  title: string;
  problem: string;
  easier: string;
  outcome: string;
  rows: Array<{ label: string; value: string; tone?: "warn" | "done" }>;
};

export const features: { title: string; intro: string; items: FeatureStory[] } = {
  title: "Everything your checks need. Nothing they don’t.",
  intro: "Each part of Safe Kitchen is designed around one question: can this be done with fewer taps, less typing and less chasing, without losing the record?",
  items: [
    {
      key: "temperatures",
      title: "Temperature records",
      problem: "Sheets filled in late, from memory.",
      easier: "Tap the check, set the reading, done.",
      outcome: "A timed, named record every time.",
      rows: [
        { label: "Walk-in fridge", value: "Recorded 10:02", tone: "done" },
        { label: "Freezer 1", value: "Recorded 10:14", tone: "done" },
        { label: "Fridge 2", value: "Due 14:00", tone: "warn" },
      ],
    },
    {
      key: "cleaning",
      title: "Cleaning schedules",
      problem: "Ticks with no names.",
      easier: "Staff see what’s due on their shift.",
      outcome: "Clear responsibility, without chasing.",
      rows: [
        { label: "Prep boards", value: "Done · Jon", tone: "done" },
        { label: "Fridge seals", value: "Due Fri" },
        { label: "Extraction canopy", value: "This week" },
      ],
    },
    {
      key: "checklists",
      title: "Opening and closing checks",
      problem: "The same list, on a clipboard nobody can find.",
      easier: "One tap per item, only for work actually done.",
      outcome: "Every shift starts and ends the same way.",
      rows: [
        { label: "Opening checks", value: "6 of 6", tone: "done" },
        { label: "Delivery check", value: "1 of 2" },
        { label: "Closing checks", value: "From 22:00" },
      ],
    },
    {
      key: "problems",
      title: "Problems and what was done",
      problem: "Issues fixed but never written down.",
      easier: "Pick what happened and what you did from quick options.",
      outcome: "Managers review it. Nothing is quietly lost.",
      rows: [
        { label: "Fridge 2 reading", value: "Waiting for review", tone: "warn" },
        { label: "Probe battery", value: "Resolved", tone: "done" },
        { label: "Delivery late", value: "Noted" },
      ],
    },
    {
      key: "managerOverview",
      title: "Manager overview",
      problem: "Ringing round to find out what’s done.",
      easier: "See every site’s day at a glance.",
      outcome: "Accountability without micromanaging.",
      rows: [
        { label: "Main kitchen", value: "18 of 21", tone: "done" },
        { label: "High Street", value: "12 of 14" },
        { label: "Missing", value: "Fridge 2 · PM", tone: "warn" },
      ],
    },
    {
      key: "inspectionView",
      title: "Records and inspection view",
      problem: "Hunting through folders.",
      easier: "Every record by date, in one place.",
      outcome: "Calm when someone asks to see them.",
      rows: [
        { label: "Period", value: "Last 28 days" },
        { label: "Needs attention", value: "2 items", tone: "warn" },
        { label: "Print or save as PDF", value: "Ready", tone: "done" },
      ],
    },
  ],
};

export const audience = {
  title: "Made for independent kitchens.",
  intro: "Takeaways, restaurants, cafés and pubs serving food, with one site or a handful. We’re starting in England with the Safer Food, Better Business pack for caterers.",
  types: [
    { label: "Takeaways", image: "takeaway" },
    { label: "Restaurants", image: "restaurant" },
    { label: "Cafés", image: "cafe" },
    { label: "Pubs", image: "pub" },
  ],
} as const;

export const inspection = {
  title: "When the EHO walks in, be ready.",
  timeline: [
    { time: "10:12", title: "A visitor at the back door", body: "No warning. Lunch prep is under way." },
    { time: "10:13", title: "The manager opens the inspection view", body: "On the office laptop, a tablet or a phone." },
    { time: "10:14", title: "The last 28 days are on screen", body: "Temperatures, cleaning, problems and what was done about them." },
  ],
  closing: "Organised records won’t do the inspection for you. They just mean you’re not hunting for them.",
  note: "Safe Kitchen helps you keep and find your records. Your business stays responsible for its food safety, and inspection outcomes depend on much more than paperwork.",
};

export const calculator = {
  title: "How much time goes on paperwork now?",
  intro: "Put in your own figures to see what kitchen paperwork costs you today.",
  disclaimer:
    "This estimates the time you currently spend on paperwork, based only on the figures you enter. It isn’t a prediction of how much time Safe Kitchen will save, and those savings haven’t been independently measured.",
  defaultsNote: "Example values shown. Replace them with your own.",
};

export const roadmap = {
  title: "Built for today’s kitchens. Ready for tomorrow.",
  intro: "Food safety comes first. Here’s what we’re exploring next, and early-access members help decide what comes first.",
  items: [
    { key: "inspectionView", title: "Food safety records", body: "Checks, temperatures, cleaning, problems and the inspection view." },
    { key: "training", title: "Staff training records", body: "Who’s trained in what, with proof ready when someone asks." },
    { key: "probes", title: "Connected temperature probes", body: "Optional Bluetooth probes and sensors. Manual recording always stays available." },
    { key: "aiInsights", title: "AI-assisted insights", body: "Spotting patterns for managers. Advisory only: it never sets limits or approves actions." },
    { key: "rotas", title: "Staff rotas and clock-in", body: "Rotas imported from a spreadsheet or photo, staff notifications and QR clock-in." },
    { key: "ordering", title: "Smart supplier ordering", body: "Ordering from the suppliers you already use, with checks before anything is sent." },
  ] satisfies Array<{ key: FeatureKey; title: string; body: string }>,
};

export const pricingCopy = {
  title: "One simple price per site.",
  intro: "Unlimited staff. No hidden charges. Pricing applies when Safe Kitchen launches; early-access members hear first.",
  monthlyLabel: "Monthly",
  annualLabel: "Annually",
  multiTitle: "Multiple sites",
  multiBody: "Running a few kitchens? Tell us about your sites and we’ll talk it through.",
};

export const faq = {
  title: "Questions kitchen owners ask.",
  items: [
    {
      q: "Is it easy for chefs to use?",
      a: "That’s the whole point. Safe Kitchen is designed so a routine check takes a few taps on a shared tablet or phone, with big buttons that work with gloves on. Readings are never filled in for you, and staff only see what needs doing now. We’re testing it with real kitchen teams during early access.",
    },
    {
      q: "Does it replace paper records?",
      a: "It’s designed to hold your daily food safety records digitally, organised by date, so you don’t need paper sheets for the checks you record in Safe Kitchen. Your business stays responsible for its food safety system, and your local authority can advise on what they expect to see.",
    },
    {
      q: "Can I show records to an EHO?",
      a: "Yes, that’s what the inspection view is for. Records are on screen in a clear layout, with anything missing or unresolved shown honestly, and you can print them or save them as a PDF. It’s in development and part of our first release.",
    },
    {
      q: "Can staff use it on phones or tablets?",
      a: "Yes. It’s designed for phones and tablets first, and works on a desktop too. A shared kitchen tablet can be used with personal staff PINs, so everyone’s entries are their own.",
    },
    {
      q: "Does it work for takeaways?",
      a: "Yes. Independent takeaways, restaurants, cafés and pubs serving food are exactly who we’re building for first. Setup asks about what you actually do, like cooking, cooling, hot holding and deliveries, not just your business type.",
    },
    {
      q: "Can I manage multiple sites?",
      a: "Yes. Safe Kitchen is built for businesses with one site or several, with roles for owners, managers and staff. Pricing is per site, and multi-site businesses can book a call to talk it through.",
    },
    {
      q: "What happens if the internet goes down?",
      a: "We’re building daily checks to keep working without a connection and to sync when you’re back online, without losing or duplicating records. This isn’t available yet. We’ll only say it works offline once it’s been fully tested.",
    },
    {
      q: "How secure is the data?",
      a: "Each business’s records are kept separate at database level, with automated tests that prove one business can’t see another’s data. Owners and managers use two-step verification, staff use personal PINs on shared tablets, and food safety records are never silently changed. Data is planned to be hosted in the UK.",
    },
    {
      q: "How much does it cost?",
      a: "£14.99 a month or £149.99 a year, plus VAT, for each site. That includes unlimited staff and there are no hidden charges. Pricing applies from launch.",
    },
    {
      q: "Is Safe Kitchen approved by the Food Standards Agency?",
      a: "No. Safe Kitchen is built around the FSA’s Safer Food, Better Business system, but it isn’t affiliated with or endorsed by the FSA or any local authority.",
    },
  ],
};

export const finalCta = {
  title: "Less paperwork. More kitchen.",
  intro: "Join early access, request a demo or book a call. We’ll be in touch personally, and you can help shape what we build first.",
};
