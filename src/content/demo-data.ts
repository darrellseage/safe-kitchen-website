/**
 * Illustrative demo records for product mock-ups. Names, times and readings are
 * made up. No figure here is a safety limit or food safety guidance.
 */
import type { RecordItem, TaskState } from "@/components/product/ui-bits";

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
