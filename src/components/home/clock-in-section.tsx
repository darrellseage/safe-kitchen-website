import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { clockIn } from "@/content/home";
import { ClockInDemo } from "./clock-in-demo";
import { PillarLines } from "./pillar-lines";
import { ExampleCard, gbp } from "./sales-bits";
import { attendanceCost } from "@/lib/value";

/** Section 7: Smart Clock-In & Attendance, with the privacy commitments alongside the demo. */
export function ClockInSection() {
  return (
    <Section id="clock-in" labelledBy="clock-in-title" tone="warm">
      <SectionHeading id="clock-in-title" eyebrow={clockIn.eyebrow} status={clockIn.status} title={clockIn.title} accent={clockIn.accent} intro={clockIn.intro} />
      <PillarLines lines={clockIn.lines} />
      <ExampleCard amount={gbp(attendanceCost(clockIn.example.hours, clockIn.example.rate))} text={clockIn.example.text} note={clockIn.example.note} />
      <div className="mt-12">
        <ClockInDemo />
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-3" aria-label="Clock-in and privacy">
        {clockIn.privacy.map((p) => (
          <li key={p.title} className="rounded-2xl border border-line bg-surface-raised p-5">
            <p className="font-extrabold">{p.title}</p>
            <p className="mt-1 text-[15px] text-ink-muted">{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
