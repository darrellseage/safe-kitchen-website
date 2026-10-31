/**
 * Illustrative demo records for product mock-ups. Names, times and readings are
 * made up. No figure here is a safety limit or food safety guidance.
 */
import type { RecordItem, TaskState } from "@/components/product/ui-bits";
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
  incoming: [{ product: "Chicken breast", quantity: 20, unit: "kg", delivery: "Thu 6 Nov", orderedBy: "Priya", orderedOn: "Monday" }],
};
