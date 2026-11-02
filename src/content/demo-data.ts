/**
 * Illustrative demo records for product mock-ups. Names, times and readings are
 * made up. No figure here is a safety limit or food safety guidance.
 */
import type { Dish } from "@/lib/allergens";
import type { RecordItem, TaskState } from "@/components/product/ui-bits";
import { whenLive } from "@/config/features";
import type { RotaReview } from "@/lib/demos/rota-review";

export const nowTasks: Array<{ title: string; meta: string; right: string; state: TaskState }> = [
  { title: "Opening checks", meta: "Sam · 09:41", right: "6/6", state: "done" },
  { title: "Walk-in fridge", meta: "Sam · 10:02 · slider", right: "Recorded", state: "done" },
  { title: "Hot holding: curry", meta: "Tap to record the reading", right: "Due now", state: "now" },
  { title: "Clean and disinfect prep boards", meta: "Prep area", right: "11:00", state: "todo" },
];

export const recordsThursday: RecordItem[] = [
  { title: "Walk-in fridge", value: "Recorded", meta: "Sam · 10:02 · Kitchen tablet · slider" },
  { title: "Freezer 1", value: "Recorded", meta: "Priya · 10:14 · Phone · keypad" },
  { title: "Prep boards cleaned and disinfected", value: "Done", meta: "Jon · 11:03 · Kitchen tablet" },
  { title: "Opening checks", value: "6 of 6", meta: "Sam · 09:41 · Kitchen tablet" },
  { title: "Fridge 2 · afternoon", value: "Missing", meta: "Shown to the manager, never hidden", missing: true },
];

export const paperSheet = {
  title: "Fridge / freezer temps · week 44",
  days: ["Mon", "Tue", "Wed", "Thu"],
  rows: [
    { unit: "Walk-in", cells: ["ok", "ok JP", "", "?"] },
    { unit: "Fridge 2", cells: ["", "done", "", ""] },
    { unit: "Freezer 1", cells: ["✓", "", "✓", ""] },
  ],
  sticky: "Who did Wed close?? Need a new sheet for Thurs",
};

/* ---------- Smart Rotas demo (illustrative) ---------- */

export const rotaDays = ["Mon", "Tue", "Wed"] as const;

export const rotaPhotoRows = [
  { name: "Sam", cells: ["9–5", "9–5", "off"] },
  { name: "Priya", cells: ["12–10", "12–10?", "12–10"] },
  { name: "Jo", cells: ["off", "5–11", "5–11"] },
];

export const rotaDraft: RotaReview = {
  shifts: [
    { id: "s-mon", person: "Sam", day: "Mon", time: "09:00–17:00", state: "confirmed" },
    { id: "s-tue", person: "Sam", day: "Tue", time: "09:00–17:00", state: "confirmed" },
    { id: "p-mon", person: "Priya", day: "Mon", time: "12:00–22:00", state: "confirmed" },
    { id: "p-tue", person: "Priya", day: "Tue", time: "12:00–22:00", state: "check" },
    { id: "p-wed", person: "Priya", day: "Wed", time: "12:00–22:00", state: "confirmed" },
    { id: "j-tue", person: "Jo?", day: "Tue", time: "17:00–23:00", state: "confirmed" },
    { id: "j-wed", person: "Jo?", day: "Wed", time: "17:00–23:00", state: "check" },
  ],
  unmatched: ["Jo?"],
};

export const rotaStaff = ["Jo Walsh", "Joanne Price"];

/* ---------- Clock-in demo (illustrative) ---------- */
export const attendanceToday = [
  { person: "Sam", shift: "09:00", actual: "08:57" },
  { person: "Priya", shift: "12:00", actual: "12:09" },
];

export const weekHours = [
  { person: "Sam", scheduled: 32, actual: 32.3 },
  { person: "Priya", scheduled: 40, actual: 39.1, late: 1 },
];

/* ---------- AI Checker demo (illustrative) ---------- */
export type AiFlag = { id: string; severity: "Urgent" | "Review" | "Info"; title: string; why: string; record: string; followUp: string };

export const aiSummaries = {
  daily: { label: "Thursday", recorded: 46, outstanding: 2, review: 1 },
  weekly: { label: "This week", recorded: 318, outstanding: 7, review: 3 },
};

export const aiFlags: AiFlag[] = [
  {
    id: "fridge2",
    severity: "Review",
    title: "Fridge 2: no afternoon reading",
    why: "Fridge 2 is set to be checked twice a day. The morning reading was recorded at 09:12, but nothing has been recorded since.",
    record: "Fridge 2 · today’s records",
    followUp: "Ask the shift lead to take a reading now, and check the afternoon reminder is switched on.",
  },
  {
    id: "cleaning",
    severity: "Review",
    title: "Closing clean incomplete: prep area",
    why: "The prep area closing clean was started at 22:41, but two of the five items weren’t ticked.",
    record: "Closing clean · prep area · yesterday",
    followUp: "Check with the closing team whether the items were done and not ticked, or still need doing.",
  },
  {
    id: "action",
    severity: "Info",
    title: "Problem waiting 2 days for review",
    why: "A problem with the walk-in fridge door seal was recorded on Tuesday and is still waiting for a manager to review it.",
    record: "Problem · walk-in fridge seal",
    followUp: "Review the problem, add what was done, and mark it resolved or arrange a repair.",
  },
];

export const aiReport = {
  daily: ["46 checks recorded across 2 sites", "2 checks still outstanding", "1 problem waiting for review", "No urgent items today"],
  weekly: ["318 checks recorded across 2 sites", "Fridge 2 afternoon readings missed on 3 days", "Closing cleans complete on 6 of 7 days", "Suggested follow-up: review the Fridge 2 reminder time"],
};

/* ---------- Smart Ordering demo (illustrative) ---------- */
export const orderingDemo = {
  supplier: "Example Foods Ltd",
  delivery: "Thu 6 Nov",
  examplePricePerKg: 6.2,
  basket: [
    { product: "Rapeseed oil", detail: "20 L", quantity: 2 },
    { product: "Basmati rice", detail: "10 kg", quantity: 3 },
  ],
  newLine: { product: "Chicken breast", quantity: 20, unit: "kg", delivery: "Thu 6 Nov" },
  incoming: [{ product: "Chicken breast", quantity: 20, unit: "kg", delivery: "Thu 6 Nov", orderedBy: "Priya", orderedOn: "earlier today" }],
};

/* ---------- Staff training demo (illustrative; not the real course content) ---------- */
export const courseLessons = ["Personal hygiene", "Cleaning", "Cross-contamination", "Chilling and cooking", "Allergens", "Pest control"];

export const trainingQuestion = {
  question: "Before handling ready-to-eat food, what should you do?",
  options: ["Wash and dry your hands", "Wipe your hands on your apron", "Nothing, if you’re in a hurry"],
  correct: 0,
};

export const staffCertificates = [
  { name: "Priya Shah", role: "Head chef", detail: "Uploaded certificate · external provider · seen by manager", status: "Certificate saved", tone: "ok" },
  { name: "Jo Walsh", role: "Chef", detail: "Refresher due next month", status: "Due soon", tone: "warn" },
] as const;

/* ---------- Inspection Mode demo (illustrative) ---------- */
export const inspectionTabs = [
  {
    id: "records",
    label: "Daily records",
    status: "inspectionView",
    rows: [
      { a: "30 Oct · 10:02", b: "Walk-in fridge", c: "Sam", d: "Recorded" },
      { a: "30 Oct · 10:14", b: "Freezer 1", c: "Priya", d: "Recorded" },
      { a: "29 Oct · 22:40", b: "Closing checks", c: "Jo", d: "8 of 8" },
      { a: "29 Oct · 15:05", b: "Hot holding: curry", c: "Sam", d: "Corrected", corrected: true },
    ],
    head: ["Date", "Check", "Recorded by", "Result"],
    attention: ["Fridge 2: no record on 2 of 7 days", "1 problem waiting for manager review"],
  },
  {
    id: "training",
    label: "Staff training",
    status: "staffCertificates",
    rows: [
      { a: "Priya Shah", b: "Head chef", c: "External certificate", d: "Saved" },
      { a: "Sam Patel", b: "Kitchen assistant", c: "Safe Kitchen course", d: "Saved" },
      { a: "Jo Walsh", b: "Chef", c: "Safe Kitchen course", d: "Refresher due" },
    ],
    head: ["Name", "Role", "Certificate", "Status"],
    attention: ["1 refresher due next month"],
  },
  {
    id: "suppliers",
    label: "Suppliers",
    status: "supplierList",
    rows: [
      { a: "Example Foods Ltd", b: "Meat, poultry, dry goods", c: "Tue, Thu", d: "Approved" },
      { a: "Green Valley Produce", b: "Fruit and vegetables", c: "Daily", d: "Approved" },
      { a: "Coastline Fish Co.", b: "Fresh fish", c: "Wed, Fri", d: "Approved" },
    ],
    head: ["Supplier", "Supplies", "Deliveries", "Status"],
    attention: [],
  },
  {
    id: "pest",
    label: "Pest control",
    status: "pestControl",
    rows: [
      { a: "Daily", b: "Pest checks (kitchen, stores)", c: "Opening checks", d: "28 of 28 days" },
      { a: "14 Oct", b: "Contractor visit report", c: whenLive("Uploaded PDF (planned)", "Uploaded PDF"), d: "No activity found" },
      { a: "Next visit", b: "Contractor visit", c: "Booked", d: "11 Nov" },
    ],
    head: ["When", "Record", "Source", "Result"],
    attention: [],
  },
  {
    id: "documents",
    label: "Documents",
    status: "documentUploads",
    rows: [
      { a: "Food business registration", b: "Uploaded PDF", c: "Mar 2025", d: "Saved" },
      { a: "Pest control contract", b: "Uploaded PDF", c: "Jan 2026", d: "Saved" },
      { a: "Safer Food, Better Business methods", b: "In the app", c: "Signed off", d: "Up to date" },
    ],
    head: ["Document", "Type", "Date", "Status"],
    attention: [],
  },
] as const;

/* ---------- Site switcher (illustrative) ---------- */
export const siteSnapshots = [
  { id: "main", name: "Main kitchen", checks: "18 of 21", onShift: 6, attention: 2, orders: "1 arriving Thu" },
  { id: "high-street", name: "High Street", checks: "12 of 14", onShift: 4, attention: 0, orders: "2 to approve" },
  { id: "station-road", name: "Station Road", checks: "9 of 9", onShift: 3, attention: 1, orders: "None due" },
] as const;

/**
 * Allergen demo (app D-088): a made-up sample menu. The allergens shown are
 * invented for the demo, not information about any real dish or recipe.
 */
export const allergenMenu: Dish[] = [
  { id: "tikka", name: "Chicken tikka masala", contains: ["milk", "nuts", "mustard"], state: "signed-off" },
  { id: "samosa", name: "Vegetable samosas", contains: ["gluten"], state: "signed-off" },
  { id: "fish", name: "Fish and chips", contains: ["fish", "gluten", "eggs"], state: "signed-off" },
  { id: "chips", name: "Chips", contains: [], mayContain: { allergens: ["fish", "gluten", "eggs"], reason: "Cooked in the same fryer as battered fish" }, state: "signed-off" },
  { id: "hummus", name: "Hummus and flatbread", contains: ["sesame", "gluten"], state: "signed-off" },
  { id: "thai", name: "Thai green curry with prawns", contains: ["crustaceans", "fish", "soybeans"], state: "signed-off" },
  { id: "salad", name: "Chickpea and quinoa salad", contains: ["celery", "sulphites"], state: "signed-off" },
  {
    id: "pudding",
    name: "Sticky toffee pudding",
    contains: ["gluten", "eggs", "milk"],
    state: "recheck",
    recheckReason: "The supplier changed the toffee sauce product. A manager needs to check its allergens before this dish is shown again.",
  },
];
