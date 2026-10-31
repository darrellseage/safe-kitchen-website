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
  credibility: "Designed by chefs and owners. Built for real kitchens.",
  body: "Food safety records, staff training, rotas, supplier ordering and intelligent oversight. One simple platform designed to make running your kitchen easier.",
  primary: "Get early access",
  secondary: "See how it works",
  note: whenLive(
    "All screens are illustrative. Food safety records are in development; training, rotas, clock-in, the AI Checker and ordering are planned.",
    "Screens show sample data.",
  ),
};

export const overview = {
  eyebrow: "What Safe Kitchen does",
  title: "One kitchen. One system.",
  accent: "Everything where it should be.",
  intro: "Six connected tools, designed for busy kitchen teams and the people who run the business.",
};

export const kitchenTypes = {
  label: "Made for kitchens like yours",
  types: [
    { label: "Takeaways", image: "takeaway" },
    { label: "Restaurants", image: "restaurant" },
    { label: "Cafés", image: "cafe" },
    { label: "Pubs", image: "pub" },
  ],
} as const;

/** The overall sales promise, shown straight after the hero. */
export const promises = {
  items: [
    { title: "Protect your reputation", body: "Organised records, checks you can see and training you can prove." },
    { title: "Reduce costs", body: "Catch duplicate orders and cut avoidable waste before it hits your profit." },
    { title: "Save time", body: "Less paperwork and chasing, more time running your business." },
    { title: "Train your team", body: "Unlimited Level 2 food hygiene training, with no per-person course fees." },
  ],
  footer: "One simple platform. Unlimited staff. From £14.99 per month.",
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
  outcomes: [
    { title: "Checks in a few taps", body: "Big buttons on a shared tablet or phone. Nothing is filled in for you." },
    { title: "Clear who did what", body: "Name, time and device are saved with every record, automatically." },
    { title: "Everything in one place", body: "Records, rotas and orders, organised by day and site." },
  ],
};

export const demo = {
  eyebrow: "Simple Food Safety",
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
    text: "Two wrongly recorded paid hours a week at £15 an hour adds up to {amount} a year.",
    note: "Illustrative scenario, not a saving Safe Kitchen is guaranteed to produce.",
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
  example: { weekly: 5000, percent: 2, text: "If £5,000 of weekly purchasing included just 2% avoidable spend, that’s {amount} a year." },
  steps: ["Build order", "Check order", "Manager approval", "Send to supplier", "Track delivery"],
  note: "Orders are sent by email or by a direct supplier link where the supplier supports it. A sent order is never shown as accepted until the supplier confirms.",
};

export const waste = {
  title: "Stop throwing your profits",
  accent: "in the bin.",
  intro: "Food waste is money you’ve already spent. Better ordering, clearer stock awareness and tighter daily routines all help you waste less.",
  example: { annual: 10000, percent: 10, text: "Cut a £10,000 food waste bill by 10% and that’s {amount} back each year." },
  disclaimer: "Illustrative figures, not a guaranteed saving. Results depend on how each kitchen works.",
};

export const audiences = {
  title: "Simple for your team.",
  accent: "Powerful for your business.",
  chefs: {
    title: "For chefs and kitchen teams",
    points: ["Easier daily routines", "Less paperwork", "Your rota on your phone", "Clear responsibilities", "Less chasing"],
  },
  owners: {
    title: "For owners and managers",
    points: ["See what’s happening, even when you’re away", "Everything organised by site", "Oversight of every order", "Useful insights, not more reports", "More control across sites"],
  },
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
  title: "Your entire kitchen team.",
  accent: "One simple subscription.",
  tagline: "Everything your kitchen needs from £14.99 a month.",
  intro: whenLive(
    "One plan per site covers every Safe Kitchen tool as it launches: food safety, staff training, rotas, clock-in, the AI Checker and ordering. Unlimited staff. No hidden charges.",
    "One plan per site covers every Safe Kitchen tool: food safety, staff training, rotas, clock-in, the AI Checker and ordering. Unlimited staff. No hidden charges.",
  ),
  monthlyLabel: "Monthly",
  annualLabel: "Annually",
  multiTitle: "Several sites?",
  multiBody: "Running a few kitchens? Tell us about your sites and we’ll talk it through.",
};

type FaqItem = { q: string; a: string };

/** FAQ. Answers that mention a feature's status have a launched version (whenLive). */
const faqItems: Array<FaqItem & { hideWhenLive?: boolean }> = [
  {
    q: "What’s available now?",
    a: "Safe Kitchen is in development and isn’t open to customers yet. Food safety records are being built first. Staff training, rotas, clock-in and attendance, the AI Checker and supplier ordering are planned to follow. Every feature on this page carries a label showing its status, and early-access members hear first as each one opens.",
    hideWhenLive: true,
  },
  {
    q: "Is it easy for chefs to use?",
    a: whenLive(
      "That’s the whole point. Safe Kitchen is designed so a routine check takes a few taps on a shared tablet or phone, with big buttons that work with gloves on. Readings are never filled in for you, and staff only see what needs doing now. We’re testing it with real kitchen teams during early access.",
      "That’s the whole point. Safe Kitchen is designed so a routine check takes a few taps on a shared tablet or phone, with big buttons that work with gloves on. Readings are never filled in for you, and staff only see what needs doing now.",
    ),
  },
  {
    q: "Does it replace paper food safety records?",
    a: "It’s designed to hold your daily food safety records digitally, organised by date, so you don’t need paper sheets for the checks you record in Safe Kitchen. Your business stays responsible for its food safety system, and your local authority can advise on what they expect to see.",
  },
  {
    q: "Can I show records to an EHO?",
    a: whenLive(
      "Yes, that’s what Inspection Mode is for. Records are on screen in a clear layout, with anything missing or unresolved shown honestly, and you can print them or save them as a PDF. It’s in development and part of our first release.",
      "Yes, that’s what Inspection Mode is for. Records are on screen in a clear layout, with anything missing or unresolved shown honestly, and you can print them or save them as a PDF.",
    ),
  },
  {
    q: "Is there food safety training for staff?",
    a: whenLive(
      `Yes, that’s planned. When you add a new member of staff, Safe Kitchen can send our ${courseName} to their phone, or they can do it on the kitchen tablet. The lessons and test are in the app, and the certificate is saved to their record automatically. It’s included in your plan, with no per-course fees. You can also upload certificates from other training providers. Training is planned and not available yet.`,
      `Yes. When you add a new member of staff, Safe Kitchen sends our ${courseName} to their phone, or they can do it on the kitchen tablet. The lessons and test are in the app, and the certificate is saved to their record automatically. It’s included in your plan, with no per-course fees. You can also upload certificates from other training providers.`,
    ),
  },
  {
    q: "What can I keep in the app for an inspection?",
    a: whenLive(
      "Your daily food safety records, cleaning and pest control checks, your supplier list, staff training records and certificates, and other documents you upload, such as pest control reports. Inspection Mode brings them together so you can show them on screen or as a PDF. Daily records, the supplier list and pest checks are part of our first release; training and document uploads are planned to follow.",
      "Your daily food safety records, cleaning and pest control checks, your supplier list, staff training records and certificates, and other documents you upload, such as pest control reports. Inspection Mode brings them together so you can show them on screen or as a PDF.",
    ),
  },
  {
    q: "Can I import the rota I already use?",
    a: whenLive(
      "That’s the plan. You’ll be able to upload a photo, screenshot, PDF or Excel spreadsheet of your existing rota. Safe Kitchen turns it into a draft, highlights anything it isn’t sure about, and you check and correct it before anything is sent to staff. This feature is planned and not available yet.",
      "Yes. Upload a photo, screenshot, PDF or Excel spreadsheet of your existing rota. Safe Kitchen turns it into a draft, highlights anything it isn’t sure about, and you check and correct it before anything is sent to staff.",
    ),
  },
  {
    q: "Does clock-in track where my staff are?",
    a: whenLive(
      "No. Location is checked only at the moment someone clocks in or out, never during a shift. Staff who can’t or don’t want to share their location can clock in on the kitchen tablet with their own PIN instead. Location checks reduce mistakes but aren’t foolproof, so managers can review and correct records. Clock-in is planned and not available yet.",
      "No. Location is checked only at the moment someone clocks in or out, never during a shift. Staff who can’t or don’t want to share their location can clock in on the kitchen tablet with their own PIN instead. Location checks reduce mistakes but aren’t foolproof, so managers can review and correct records.",
    ),
  },
  {
    q: "What does the AI Checker actually check?",
    a: whenLive(
      "Your records and forms: checks that are missing, incomplete, overdue or look unusual, and problems still waiting for review. It explains why each item was flagged and links to the record. It doesn’t use cameras, it can’t confirm a check was physically done, and it never replaces a manager’s judgement. It’s planned and not available yet.",
      "Your records and forms: checks that are missing, incomplete, overdue or look unusual, and problems still waiting for review. It explains why each item was flagged and links to the record. It doesn’t use cameras, it can’t confirm a check was physically done, and it never replaces a manager’s judgement.",
    ),
  },
  {
    q: "Which suppliers can I order from?",
    a: whenLive(
      "The plan is that you’ll build orders for the suppliers you already use, and Safe Kitchen will send them by email, or by a direct link where a supplier supports one. You keep paying suppliers directly. We’ll only name supported suppliers once a connection is confirmed. Ordering is planned and not available yet.",
      "You build orders for the suppliers you already use, and Safe Kitchen sends them by email, or by a direct link where a supplier supports one. You keep paying suppliers directly.",
    ),
  },
  {
    q: "Can I manage multiple sites?",
    a: "Yes. Safe Kitchen is built for businesses with one site or several, with roles for owners, managers and staff. Pricing is per site, and multi-site businesses can book a call to talk it through.",
  },
  {
    q: "What happens if the internet goes down?",
    a: whenLive(
      "We’re building daily checks to keep working without a connection and to sync when you’re back online, without losing or duplicating records. This isn’t available yet. We’ll only say it works offline once it’s been fully tested.",
      "Daily checks keep working without a connection and sync when you’re back online, without losing or duplicating records.",
    ),
  },
  {
    q: "How secure is the data?",
    a: whenLive(
      "Each business’s records are kept separate at database level, with automated tests that prove one business can’t see another’s data. Owners and managers use two-step verification, staff use personal PINs on shared tablets, and records are never silently changed. Data is planned to be hosted in the UK.",
      "Each business’s records are kept separate at database level, with automated tests that prove one business can’t see another’s data. Owners and managers use two-step verification, staff use personal PINs on shared tablets, and records are never silently changed. Data is hosted in the UK.",
    ),
  },
  {
    q: "How much does it cost?",
    a: "£14.99 a month or £149.99 a year, plus VAT, for each site. That covers every Safe Kitchen tool, including the staff food safety course and certificates, with unlimited staff and no hidden charges.",
  },
  {
    q: "Is Safe Kitchen approved by the Food Standards Agency?",
    a: "No. Safe Kitchen is built around the FSA’s Safer Food, Better Business system, but it isn’t affiliated with or endorsed by the FSA or any local authority.",
  },
];

export const faq = {
  title: "Questions kitchen owners ask.",
  items: faqItems
    .filter((i) => !(i.hideWhenLive && whenLive("show", "hide") === "hide"))
    .map(({ q, a }): FaqItem => ({ q, a })),
};

export const finalCta = {
  title: "Less admin. Less waste.",
  accent: "More control.",
  intro: "Discover a simpler, smarter way to manage your kitchen. Join early access, request a demo or book a call.",
};
