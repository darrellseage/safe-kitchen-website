/**
 * Homepage wording (docs/REDESIGN_PROPOSAL.md §4). Kept out of components so
 * copy can be reviewed and edited in one place. Claims follow the proposal's
 * status table (§3) and claims list (§6): no invented figures, no FSA
 * endorsement, honest feature status, sample data always labelled.
 */
import { whenLive, type FeatureKey } from "@/config/features";

export const hero = {
  titleLead: "Running a kitchen is hard enough.",
  titleAccent: "The paperwork shouldn’t be.",
  credibility: "Designed by chefs and owners, for chefs and owners.",
  body: "Safe Kitchen is the all-in-one kitchen management app for takeaways, restaurants, cafés and pubs. Food safety records, unlimited staff training, rotas, clock-in and smart ordering, with AI checks that catch costly mistakes. Less paperwork, more time running your kitchen.",
  primary: "Get early access",
  secondary: "Take the 60-second tour",
  priceLead: "From",
  priceTail: "a month per site + VAT",
  pricePoints: ["Unlimited staff", "Level 2 food hygiene training included", "No set-up fees"],
  freeNote: "Early access is free. No card. No commitment.",
  note: whenLive(
    "Safe Kitchen is in development. Screens show sample data, and every feature is labelled with its real status.",
    "Screens show sample data.",
  ),
};


/** The six messages the homepage must land (owner, 1 Nov 2026). Shown straight after the hero. */
export const promises = {
  label: "Why kitchens choose Safe Kitchen",
  items: [
    { title: "Less paperwork, more kitchen", body: "Checks take a few taps, so your team spends its time cooking, not filling in forms." },
    { title: "Everything in one system", body: "Food safety, training, rotas, clock-in and ordering in one easy-to-use app." },
    { title: "AI that catches costly mistakes", body: "Missing checks, incomplete records and duplicate orders flagged before they cost you." },
    { title: "Unlimited staff and training", body: "Level 2 food hygiene training for every member of staff, at one affordable price per site." },
  ],
  footer: "Built around the realities of busy professional kitchens.",
};

/** The guided tour: one sample day, each step linking to its full interactive demo. */
export const tour = {
  eyebrow: "The 60-second tour",
  title: "A day in your kitchen,",
  accent: "with Safe Kitchen.",
  intro: "Six moments from one sample day. Step through them, or press play. Every step links to a full interactive demo further down the page.",
  flag: "Sample day · illustrative data",
  steps: [
    {
      id: "clock-in",
      time: "08:55",
      feature: "clockIn",
      pillar: "Clock-in",
      icon: "clock",
      title: "Sam clocks in on his phone",
      body: "Location is checked only at that moment. No location? He uses his PIN on the kitchen tablet instead.",
      screen: { heading: "Clock-in", lines: [{ text: "Sam · Chef", value: "08:55", tone: "ok" }, { text: "Rota: 09:00 to 17:00", value: "On time", tone: "ok" }] },
      demo: "clock-in",
      demoLabel: "Try clock-in",
    },
    {
      id: "checks",
      time: "09:40",
      feature: "temperatures",
      pillar: "Food safety",
      icon: "thermometer",
      title: "Opening checks in a few taps",
      body: "Fridge readings, cleaning and opening checks on the shared tablet. Name, time and device are saved automatically.",
      screen: { heading: "Now · Opening", lines: [{ text: "Walk-in fridge reading", value: "Saved", tone: "ok" }, { text: "Opening checklist", value: "4 of 6", tone: "now" }] },
      demo: "food-safety",
      demoLabel: "Try a temperature check",
    },
    {
      id: "training",
      time: "11:00",
      feature: "trainingCourse",
      pillar: "Training",
      icon: "graduation",
      title: "Priya starts her Level 2 course",
      body: "Added as a new starter, the course goes straight to her phone. No per-person fee, and the certificate saves to her record.",
      screen: { heading: "Training", lines: [{ text: "Level 2 Food Hygiene", value: "Lesson 3 of 8", tone: "now" }, { text: "Course fee", value: "Included", tone: "ok" }] },
      demo: "training",
      demoLabel: "Try the training course",
    },
    {
      id: "rota",
      time: "14:00",
      feature: "rotaImport",
      pillar: "Rotas",
      icon: "calendar",
      title: "Next week’s rota, from a photo",
      body: "The manager photographs the rota on the wall. Safe Kitchen turns it into a draft and highlights anything it isn’t sure about.",
      screen: { heading: "Rota import · draft", lines: [{ text: "18 shifts read", value: "Check 1", tone: "now" }, { text: "Send to staff phones", value: "After review", tone: "todo" }] },
      demo: "rotas",
      demoLabel: "Try the rota import",
    },
    {
      id: "ordering",
      time: "16:30",
      feature: "ordering",
      pillar: "Ordering",
      icon: "basket",
      title: "A duplicate order caught",
      body: "Someone adds 20 kg of chicken breast that’s already on Thursday’s delivery. Safe Kitchen flags it before anything is sent.",
      screen: { heading: "Order check", lines: [{ text: "Chicken breast 20 kg", value: "Possible duplicate", tone: "warn" }, { text: "Manager approval", value: "Needed", tone: "todo" }] },
      demo: "ordering",
      demoLabel: "Try the order check",
    },
    {
      id: "ai",
      time: "22:15",
      feature: "aiChecker",
      pillar: "AI Checker",
      icon: "eye",
      title: "The AI Checker’s end-of-day summary",
      body: "One afternoon fridge reading is missing. The manager sees it tonight, not at the next inspection, and every record is ready in Inspection Mode.",
      screen: { heading: "AI Checker · today", lines: [{ text: "Fridge 2: no afternoon reading", value: "Needs attention", tone: "warn" }, { text: "Inspection Mode", value: "Up to date", tone: "ok" }] },
      demo: "ai-checker",
      demoLabel: "Try the AI Checker",
    },
  ] satisfies Array<{
    id: string;
    time: string;
    feature: FeatureKey;
    pillar: string;
    icon: "clock" | "thermometer" | "graduation" | "calendar" | "basket" | "eye";
    title: string;
    body: string;
    screen: { heading: string; lines: Array<{ text: string; value: string; tone: "ok" | "now" | "todo" | "warn" }> };
    demo: string;
    demoLabel: string;
  }>,
};

export const hygiene = {
  title: "Your food hygiene rating",
  accent: "could be costing you customers.",
  intro: "Your food hygiene rating matters to your customers. It isn’t just a sticker on the door: it can influence whether they choose your business.",
  helps: [
    "Keep organised, complete food safety records",
    "See which checks are done, missing or overdue",
    "Track staff training and certificates",
    "Have everything ready when the EHO walks in",
  ],
  helpsTitle: "How Safe Kitchen helps",
  calculatorLink: "Work out what’s at risk for your business",
  disclaimer: "Safe Kitchen helps you keep and show good records. It can’t guarantee any hygiene rating: ratings depend on the inspection of your premises, practices and management.",
  calculator: {
    title: "What could losing customer confidence cost your business?",
    note: "A hypothetical scenario to show the scale of even small changes in sales. It isn’t a prediction of what any rating would cost you.",
  },
};

export const comparison = {
  title: "Why manage five different systems",
  accent: "when you could use one?",
  before: {
    title: "The usual way",
    items: ["Paper food safety records", "Training bought one person at a time", "Rotas typed up by hand", "Spreadsheet timesheets", "Manual checks on orders", "Records spread across folders and apps", "Time spent chasing missing information"],
  },
  after: {
    title: "With Safe Kitchen",
    items: ["Food safety records in one place", "Training included, unlimited staff", "Rotas from a photo or spreadsheet", "Clock-in and attendance tracking", "Smart ordering checks", "Automatic alerts", "Management dashboards across sites"],
  },
};

export const valueCalc = {
  title: "How much could Safe Kitchen",
  accent: "be worth to your business?",
  intro: "Adjust the figures to match your kitchen. Every number is an estimate from your own figures, not a promised saving.",
  overlapNote: "Ordering and food waste reductions overlap (over-ordering causes waste), so only the larger of the two counts towards the total.",
  timeNote: "Management time value isn’t automatically a cash saving on your payroll.",
};

export const familiar = {
  title: "Sound familiar?",
  intro: "None of this is about bad kitchens. It’s what happens when paperwork has to compete with service.",
  scenarios: [
    {
      who: "The chef",
      title: "It’s Friday night. The checks still aren’t done.",
      body: "Orders are coming in, the team is stretched, and someone still needs to fill in the temperature sheet.",
    },
    {
      who: "The inspection",
      title: "The EHO wants last month’s records.",
      body: "The manager is in the office, searching through folders for the right week.",
    },
    {
      who: "The owner",
      title: "You’re away. Were the checks done?",
      body: "The only way to find out is to phone the manager, again.",
    },
  ],
};

export const calculator = {
  title: "How much time is paperwork costing your kitchen?",
  intro: "Spend less time on paperwork and more time running your kitchen. Start by seeing what admin costs you today.",
  disclaimer:
    "This estimates the time you currently spend on paperwork, based only on the figures you enter. It isn’t a prediction of how much time Safe Kitchen will save, and those savings haven’t been independently measured.",
  defaultsNote: "Example values shown. Replace them with your own.",
  coverLine: "Save just {minutes} minutes a week and you’ve recovered the value of your annual subscription in management time.",
  coverNote: "At £15 an hour and £149.99 a year. Time value isn’t automatically a cash saving on your payroll.",
};

export const transformation = {
  title: "What if it didn’t have to be this way?",
  intro: "Paper logs, rota photos on WhatsApp, supplier emails and sticky notes. Scroll to see them find their place.",
  paperLabel: "Before",
  digitalLabel: "Safe Kitchen",
};

export const demo = {
  eyebrow: "Inspection-ready records",
  status: "temperatures" as FeatureKey,
  title: "Less paperwork.",
  accent: "More kitchen.",
  intro: "You became a chef to cook, not to fill in paperwork. Try a temperature check the way your team would.",
  flag: whenLive("Illustrative demo · not a real account · not food safety guidance", "Interactive demo · sample data · not food safety guidance"),
  lines: ["Built for busy kitchens, not complicated office work.", "Less paperwork. More time to run your business.", "Your records shouldn’t be harder to find than your ingredients."],
  why: [
    { title: "Gloves on, hands wet", body: "Every control is at least 48px. Tap anywhere on the scale, nudge by 0.1, or type the exact reading." },
    { title: "Never prefilled", body: "The scale starts empty, so nobody can save a reading they didn’t take." },
    { title: "Who, when and how, automatically", body: "Name, time, device and entry method are saved with each reading. No extra typing." },
    { title: "Bad readings are as easy as good ones", body: "Staff never have to fight the app to record a problem, and the original reading is never overwritten." },
  ],
};

/**
 * Staff training. The course's level and accreditation are still to be
 * confirmed (app DECISIONS.md O-034). Set `levelClaim` (for example "Level 2")
 * only once the owner confirms the course is accredited or delivered with an
 * accredited provider; every mention on the site follows it.
 */
const levelClaim: string | null = "Level 2"; // owner decision 31 Oct 2026 (app D-080): in-house course, Safe Kitchen certificates
export const courseName = levelClaim ? `${levelClaim} Food Hygiene course` : "Food Hygiene course";

/** Shown wherever the course is promoted. Required with the "Level 2" wording (D-080). */
export const certificateDisclosure =
  "Safe Kitchen runs its own in-house course and issues Safe Kitchen certificates after a successful assessment. It isn’t an externally accredited or regulated qualification, and it isn’t endorsed by any awarding or governing body.";

export const training = {
  eyebrow: "Staff Training & Certificates",
  status: "trainingCourse" as FeatureKey,
  title: "Stop paying for food hygiene training",
  accent: "one employee at a time.",
  intro: `Our in-house ${courseName} is included in your subscription, with unlimited staff per site and no per-person course fees. Add a new starter and it goes straight to their phone, or they can do it on the kitchen tablet. Lessons, test and certificate are all in the app.`,
  lines: ["Unlimited staff training. No additional per-person course fees.", "New staff? No additional course fee.", "30 staff. One subscription. Unlimited food hygiene training."],
  comparison: {
    title: "What separate courses could cost",
    coursePrice: 24,
    staff: [10, 20, 30, 50],
    note: "Illustrative: one course per person at £24, against one year of Safe Kitchen for one site. Typical online Level 2 food hygiene courses cost about £15 to £25 per person (prices checked October 2026). Your costs will vary.",
  },
  steps: [
    { title: "Add the employee", body: "Safe Kitchen recommends the course for their role. You confirm." },
    { title: "Course sent to their phone", body: "Or they sit it on the shared kitchen tablet." },
    { title: "Lessons and test in the app", body: "Short lessons, then the test. Progress shows on your dashboard." },
    { title: "Certificate saved", body: "Filed to their record, and two taps away during an inspection." },
  ],
  note: "Already trained elsewhere? Upload existing certificates and they sit alongside Safe Kitchen ones, clearly labelled with their provider.",
};

export const rotas = {
  eyebrow: "Smart Staff Rotas",
  status: "rotas" as FeatureKey,
  title: "Take a photo of your rota.",
  accent: "Let Safe Kitchen do the rest.",
  intro:
    "Already made this week’s rota? Don’t make it twice. Snap the one on the wall, or upload your Excel spreadsheet or Word document, and Safe Kitchen turns it into an editable digital rota for your team.",
  lines: ["No retyping shifts.", "No rota photos lost in WhatsApp.", "Less time organising shifts. More time running your kitchen."],
  steps: [
    { title: "Upload your rota", body: "A photo, Excel spreadsheet, Word document, screenshot or PDF." },
    { title: "Safe Kitchen converts it", body: "Into a digital schedule, highlighting anything it isn’t sure about." },
    { title: "Review and send", body: "Check the shifts, then send the rota straight to your staff’s phones." },
  ],
  note: "Imported rotas are always a draft until a manager has checked them. Nothing is sent to staff until you press Publish.",
};

export const workflow = {
  label: "From rota to timesheet",
  steps: [
    { title: "Create rota", body: "Upload or build it" },
    { title: "Send to staff", body: "Notified when it’s published" },
    { title: "Clock in", body: "Location, QR code or tablet PIN" },
    { title: "Track attendance", body: "Live for managers" },
    { title: "Review timesheets", body: "Export for your payroll" },
  ],
};

export const clockIn = {
  eyebrow: "Smart Clock-In & Attendance",
  status: "clockIn" as FeatureKey,
  title: "Know who’s clocked in.",
  accent: "Know when. Know where.",
  intro: "Clock-in and clock-out on staff phones, location verification at the moment of clocking, attendance records and accurate timesheets, connected directly to your rota. Less manual admin, more manager oversight.",
  example: {
    hours: 2,
    rate: 15,
    text: "Illustrative: two wrongly recorded paid hours a week at £15 an hour adds up to {amount} a year.",
  },
  lines: [
    "Clock in. Get on with your shift.",
    "No more guessing who’s on the clock.",
    "From rota to timesheet, without the paperwork.",
    "One less thing for managers to chase.",
  ],
  privacy: [
    { title: "Only at clock-in", body: "Location is checked when someone clocks in or out. There’s no tracking during shifts." },
    { title: "An alternative for everyone", body: "Staff who can’t or don’t want to share their location can clock in on the kitchen tablet with their own PIN." },
    { title: "Managers stay in charge", body: "Location checks reduce mistakes and misuse, but they aren’t foolproof. Managers review and correct records, and every change is kept." },
  ],
};

export const aiChecker = {
  eyebrow: "AI Checker",
  status: "aiChecker" as FeatureKey,
  title: "A second set of eyes",
  accent: "on your kitchen records.",
  intro:
    "This is what sets Safe Kitchen apart from a basic digital diary. You can’t check every form, so the AI Checker looks through your records for anything missing, incomplete or unusual, explains why, and links you straight to it. Daily or weekly summaries, with urgent items flagged to managers straight away.",
  catches: ["Missing temperature checks", "Overdue cleaning tasks", "Unusual temperature readings", "Incomplete records", "Outstanding corrective actions", "Training gaps", "Manager alerts"],
  lines: ["Know what’s been checked, what’s missing and what needs attention.", "Stay informed, even when you’re not there."],
  note: "The AI Checker supports managers. It can’t confirm that a check was physically done or that a record is true, and it never replaces your own judgement or legal responsibilities. Safety limits come from your approved methods, never from AI.",
};

export const ordering = {
  eyebrow: "Smart Supplier Ordering",
  status: "ordering" as FeatureKey,
  title: "Stop duplicate orders",
  accent: "before they cost you money.",
  intro: "Unnecessary orders eat into your profit. Build orders for the suppliers you already use, and Safe Kitchen’s AI checks help your managers spot mistakes before anything is bought.",
  catches: ["Duplicate orders", "Unusually large orders", "Possible over-ordering", "Possible under-ordering", "Stock shortages", "Unnecessary purchases", "Unusual ordering patterns"],
  lines: ["Stop unnecessary orders eating into your profit.", "Know what’s ordered before you order again."],
  example: { weekly: 5000, percent: 2, text: "Illustrative: if £5,000 of weekly purchasing included just 2% avoidable spend, that’s {amount} a year." },
  steps: ["Build order", "Check order", "Manager approval", "Send to supplier", "Track delivery"],
  note: "Orders are sent by email or by a direct supplier link where the supplier supports it. A sent order is never shown as accepted until the supplier confirms.",
};

export const waste = {
  title: "Less waste, too.",
  body: "Food waste is money you’ve already spent. Fewer duplicate and oversized orders means less going in the bin.",
  disclaimer: "Results depend on how each kitchen works. Safe Kitchen doesn’t promise a particular saving.",
};

/** "Built for you": the four buyers (conversion review R8). Links point at the demos. */
export const buyers = {
  eyebrow: "Built for you",
  title: "Whoever runs the kitchen,",
  accent: "it’s built around your day.",
  tabs: [
    {
      id: "takeaway",
      label: "Takeaway owner",
      image: "takeaway",
      headline: "Fast service, small team, tight margins.",
      pains: ["New staff starting all the time", "Checks squeezed in between orders", "Your hygiene rating is on show to every customer", "No room in the margin for duplicate orders"],
      helps: [
        { title: "New starter? Course on day one", body: "The Level 2 course goes to their phone, with no per-person fee.", href: "training" },
        { title: "Checks in a few taps", body: "Big buttons that work mid-rush on a shared tablet or phone.", href: "food-safety" },
        { title: "Duplicate orders caught", body: "Flagged before anything is sent to the supplier.", href: "ordering" },
      ],
    },
    {
      id: "chef",
      label: "Head chef",
      image: "chef",
      headline: "You want to cook, not chase paperwork.",
      pains: ["Checks competing with service", "Chasing the team for missing entries", "Rotas lost in WhatsApp", "Gaps in the paperwork landing on you"],
      helps: [
        { title: "Made for gloves and wet hands", body: "Nothing is filled in for you, and a bad reading is as quick to record as a good one.", href: "food-safety" },
        { title: "Rota from a photo", body: "Snap the rota you’ve already made and send it to everyone’s phone.", href: "rotas" },
        { title: "It checks the paperwork, not your team", body: "The AI Checker flags gaps in records before the end of the day. It doesn’t watch or judge staff.", href: "ai-checker" },
      ],
    },
    {
      id: "manager",
      label: "Restaurant manager",
      image: "manager",
      headline: "Everything you chase, in one place.",
      pains: ["Missing checks and unsigned records", "Rota changes and late arrivals", "Approving supplier orders", "Being ready when the EHO walks in"],
      helps: [
        { title: "Who’s in, who’s late", body: "Clock-in connected to the rota, ready to review as timesheets.", href: "clock-in" },
        { title: "A daily summary", body: "The AI Checker tells you what needs attention, and links straight to it.", href: "ai-checker" },
        { title: "Inspection-ready", body: "Records, training certificates, suppliers and pest control a tap away.", href: "inspection" },
      ],
    },
    {
      id: "multi-site",
      label: "Multi-site operator",
      image: null,
      headline: "The same standards at every site.",
      pains: ["Different ways of working at each site", "Not knowing what’s happening when you’re away", "Software costs that grow with every new hire", "Bringing a new site up to standard"],
      helps: [
        { title: "One view across your sites", body: "Checks, shifts, attention items and orders, site by site. Try the site switcher here.", href: null },
        { title: "Priced per site, never per person", body: "Every member of staff at every site is included. Adding a site is one more plan.", href: "pricing" },
        { title: "Roles for everyone", body: "Owners, managers and staff each see only what they need.", href: "pricing" },
      ],
    },
  ] satisfies Array<{
    id: string;
    label: string;
    image: "takeaway" | "chef" | "manager" | null;
    headline: string;
    pains: string[];
    helps: Array<{ title: string; body: string; href: string | null }>;
  }>,
  painsTitle: "What gets in the way",
  helpsTitle: "What helps most",
  siteSwitcherNote: "Switch between sites and see each one’s day at a glance.",
};

/** "Your numbers": the three calculators in one place (conversion review R7). */
export const numbers = {
  eyebrow: "Your numbers",
  title: "What could Safe Kitchen",
  accent: "be worth to you?",
  intro: "Three quick calculators using your own figures. They’re estimates to help you decide, not promised savings.",
  tabs: { value: "Overall value", admin: "Admin time", revenue: "Revenue at risk" },
};

export const inspection = {
  eyebrow: "Inspection Mode",
  status: "inspectionView" as FeatureKey,
  title: "When the EHO walks in,",
  accent: "everything’s in one place.",
  intro: "Daily records, staff training and certificates, your supplier list, pest control and other documents, all stored in the app and a tap away. No folders, no hunting, no “it’s in the office somewhere”.",
  timeline: [
    { time: "10:12", title: "A visitor at the back door", body: "No warning. Lunch prep is under way." },
    { time: "10:13", title: "The manager opens the inspection view", body: "On the office laptop, a tablet or a phone." },
    { time: "10:14", title: "The last 28 days are on screen", body: "Temperatures, cleaning, problems and what was done about them." },
  ],
  closing: "Organised records won’t do the inspection for you. They just mean you’re not hunting for them.",
  note: "Safe Kitchen helps you keep and find your records. Your business stays responsible for its food safety, and inspection outcomes depend on much more than paperwork.",
};

export const roadmap = {
  title: "Built for today’s kitchens.",
  accent: "Ready for tomorrow.",
  intro: "Food safety comes first. Here’s what’s planned next, and what we’re exploring. Early-access members help decide what comes first.",
  items: [
    { key: "probes", title: "Bluetooth temperature probes", body: "Readings straight from the probe, confirmed by the chef. Typing a reading always stays available." },
    { key: "sensors", title: "Connected fridge and freezer sensors", body: "Readings through the day, with alerts naming the unit." },
    { key: "supplierIntegrations", title: "More supplier connections", body: "Direct ordering links with more suppliers, where they support it." },
    { key: "stockSuggestions", title: "Smarter stock suggestions", body: "Order suggestions, only where reliable stock and usage data exists." },
  ] satisfies Array<{ key: FeatureKey; title: string; body: string }>,
  note: "Planned features and ideas we’re exploring may change or may not happen. We’ll only describe a feature as available once it’s live and tested.",
};

export const pricingCopy = {
  eyebrow: "Pricing",
  title: "One price per site.",
  accent: "Your whole team included.",
  intro: whenLive(
    "One plan covers every Safe Kitchen tool as it launches: food safety, staff training, rotas, clock-in, the AI Checker and ordering. Unlimited staff, and no set-up fees.",
    "One plan covers every Safe Kitchen tool: food safety, staff training, rotas, clock-in, the AI Checker and ordering. Unlimited staff, and no set-up fees.",
  ),
  monthlyLabel: "Monthly",
  annualLabel: "Annual",
  annualBadge: "Best value",
  perMonth: "a month",
  perYear: "a year",
  incVat: "including VAT",
  annualSaving: "Save {amount} a year compared with paying monthly",
  includesTitle: "Every plan includes",
  neverPayTitle: "What you’ll never pay for",
  multiTitle: "Several sites?",
  multiExample: "{sites} sites = {amount} a month + VAT, with every member of staff at every site included.",
  multiBody: "Tell us about your sites and we’ll talk it through.",
  coverLine: "Save just {minutes} minutes of management time a week and the annual plan has paid for itself.",
  coverNote: "At £15 an hour. Time value isn’t automatically a cash saving on your payroll.",
  earlyNote: whenLive(
    "Not open yet: join early access free, with no card and no commitment, and we’ll tell you as soon as you can subscribe.",
    "Join early access free, with no card and no commitment.",
  ),
  founding: {
    title: "Founding customer offer",
    body: "The first {limit} businesses to subscribe at launch keep their launch price for as long as their subscription continues without a break, plus a free onboarding call to get set up.",
    terms: "Applies to the original plan and site. VAT is charged separately at the rate that applies. Starts at launch; full terms will be published before then.",
  },
};

/** "Where Safe Kitchen is today": honest status, data security and limits (conversion review R9). */
export const trust = {
  eyebrow: "Straight answers",
  title: "Where Safe Kitchen is today,",
  accent: "and how your data is looked after.",
  intro: "We’d rather tell you exactly where things stand than over-promise. Here’s what’s built, what’s coming, and the limits you should know about.",
  demoNote: "Every demo on this page is interactive and uses sample data, to show how Safe Kitchen is designed to work. A demo doesn’t mean the feature is open to customers yet.",
  built: {
    title: "Built and being tested",
    note: "Not open to customers yet",
    items: ["Business accounts and secure sign-in", "Two-step verification for owners and managers", "Business, sites and staff set-up, with invitations", "Shared kitchen tablet with personal staff PINs"],
  },
  groups: [
    {
      status: "in_development",
      title: "In development",
      features: [
        ["temperatures", "Daily food safety records"],
        ["cleaning", "Cleaning and checklists"],
        ["inspectionView", "Inspection Mode"],
        ["supplierList", "Supplier list and pest control records"],
        ["managerOverview", "Manager overview"],
      ],
    },
    {
      status: "planned",
      title: "Planned next",
      features: [
        ["trainingCourse", "Level 2 training and certificates"],
        ["rotaImport", "Rotas from a photo or spreadsheet"],
        ["clockIn", "Clock-in and attendance"],
        ["aiChecker", "AI Checker"],
        ["ordering", "Smart ordering"],
        ["recordExports", "Exporting your records"],
        ["offline", "Working offline"],
      ],
    },
  ] satisfies Array<{ status: "in_development" | "planned"; title: string; features: Array<[FeatureKey, string]> }>,
  cards: [
    {
      title: "Your records are kept separate",
      body: "Each business’s records are kept apart at database level, with automated tests proving one business can’t see another’s data. Owners and managers use two-step verification, staff use personal PINs, and records are never silently changed: every correction is kept. Data is planned to be hosted in the UK.",
    },
    {
      title: "Your records stay yours",
      body: "Inspection Mode lets you print records or save them as a PDF. We’re also building a way to export your records if you ever leave Safe Kitchen. We’ll only say it’s available once it’s built and tested.",
    },
    {
      title: "If the internet drops",
      body: "Offline recording is planned but not available yet. Until it is, daily checks need a connection. We’ll only say Safe Kitchen works offline once it’s been fully tested.",
    },
    { title: "Training certificates", body: certificateDisclosure },
    {
      title: "AI is never in charge",
      body: "The AI Checker points managers to records worth a look. It can’t confirm a check was physically done, it never sets safety limits, and it never replaces your own judgement.",
    },
    {
      title: "Not affiliated with the FSA",
      body: "Safe Kitchen is built around the Food Standards Agency’s Safer Food, Better Business system, but it isn’t affiliated with or endorsed by the FSA or any local authority.",
    },
  ],
  exploringTitle: "Ideas we’re exploring",
};

type FaqItem = { q: string; a: string };

/** FAQ. Answers that mention a feature's status have a launched version (whenLive). */
const faqItems: Array<FaqItem & { hideWhenLive?: boolean }> = [
  {
    q: "What’s available now?",
    a: "Safe Kitchen is in development and isn’t open to customers yet. Accounts, sign-in and the shared kitchen tablet are built and being tested, and daily food safety records are being built now. Staff training, rotas, clock-in, the AI Checker and ordering are planned to follow. Every feature on this page carries a label showing its status, and early-access members hear first as each one opens.",
    hideWhenLive: true,
  },
  {
    q: "Is early access free?",
    a: "Yes. Joining early access is completely free, with no payment card and no commitment. You’ll hear first as features open, and you can help shape what we build.",
  },
  {
    q: "How much does it cost?",
    a: "£14.99 a month (£17.99 including VAT) or £149.99 a year (£179.99 including VAT) for each site. That covers every Safe Kitchen tool, including the staff food hygiene course and certificates, with unlimited staff and no set-up fees.",
  },
  {
    q: "Is it easy for chefs to use?",
    a: whenLive(
      "That’s the whole point. Safe Kitchen is designed so a routine check takes a few taps on a shared tablet or phone, with big buttons that work with gloves on. Readings are never filled in for you, and staff only see what needs doing now. We’re testing it with real kitchen teams during early access.",
      "That’s the whole point. Safe Kitchen is designed so a routine check takes a few taps on a shared tablet or phone, with big buttons that work with gloves on. Readings are never filled in for you, and staff only see what needs doing now.",
    ),
  },
  {
    q: "Can I show my records to an EHO?",
    a: whenLive(
      "Yes, that’s what Inspection Mode is for. Your daily food safety records, cleaning and pest control checks, supplier list, staff training records and certificates, and documents you upload are brought together on screen, with anything missing or unresolved shown honestly. You can print them or save them as a PDF. Inspection Mode is in development; training and document uploads are planned to follow.",
      "Yes, that’s what Inspection Mode is for. Your daily food safety records, cleaning and pest control checks, supplier list, staff training records and certificates, and documents you upload are brought together on screen, with anything missing or unresolved shown honestly. You can print them or save them as a PDF.",
    ),
  },
  {
    q: "What are the training certificates?",
    a: whenLive(
      `When you add a new member of staff, Safe Kitchen can send our ${courseName} to their phone, or they can do it on the kitchen tablet. After a successful assessment, a Safe Kitchen certificate is saved to their record. ${certificateDisclosure} You can also upload certificates from other providers. Training is planned and not available yet.`,
      `When you add a new member of staff, Safe Kitchen sends our ${courseName} to their phone, or they can do it on the kitchen tablet. After a successful assessment, a Safe Kitchen certificate is saved to their record. ${certificateDisclosure} You can also upload certificates from other providers.`,
    ),
  },
  {
    q: "Can I import the rota I already use?",
    a: whenLive(
      "That’s the plan. You’ll be able to upload a photo, screenshot, PDF, Word document or Excel spreadsheet of your existing rota. Safe Kitchen turns it into a draft, highlights anything it isn’t sure about, and you check it before anything is sent to staff. This feature is planned and not available yet.",
      "Yes. Upload a photo, screenshot, PDF, Word document or Excel spreadsheet of your existing rota. Safe Kitchen turns it into a draft, highlights anything it isn’t sure about, and you check it before anything is sent to staff.",
    ),
  },
  {
    q: "Does clock-in track where my staff are?",
    a: whenLive(
      "No. Location is checked only at the moment someone clocks in or out, never during a shift. Staff who can’t or don’t want to share their location can clock in on the kitchen tablet with their own PIN instead. Clock-in is planned and not available yet.",
      "No. Location is checked only at the moment someone clocks in or out, never during a shift. Staff who can’t or don’t want to share their location can clock in on the kitchen tablet with their own PIN instead.",
    ),
  },
  {
    q: "Which suppliers can I order from?",
    a: whenLive(
      "The plan is that you’ll build orders for the suppliers you already use, and Safe Kitchen will send them by email, or by a direct link where a supplier supports one. You keep paying suppliers directly. Ordering is planned and not available yet.",
      "You build orders for the suppliers you already use, and Safe Kitchen sends them by email, or by a direct link where a supplier supports one. You keep paying suppliers directly.",
    ),
  },
];

export const faq = {
  title: "Other questions.",
  items: faqItems
    .filter((i) => !(i.hideWhenLive && whenLive("show", "hide") === "hide"))
    .map(({ q, a }): FaqItem => ({ q, a })),
};

export const finalCta = {
  title: "Less paperwork.",
  accent: "More time running your kitchen.",
  intro: "Join early access free. Be first to try each feature as it opens, and help shape what we build. Or request a demo or book a call.",
  freePoints: ["Free to join", "No payment card", "No commitment"],
};
