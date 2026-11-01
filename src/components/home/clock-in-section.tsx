import { SectionHeading } from "@/components/ui/section-heading";
import { DemoReveal } from "./demo-reveal";
import { clockIn } from "@/content/home";
import { ClockInDemo } from "./clock-in-demo";
import { PillarLines } from "./pillar-lines";
import { ExampleLine, gbp } from "./sales-bits";
import { attendanceCost } from "@/lib/value";

/** Clock-in & attendance, the second half of the rotas section, with the privacy commitments alongside the demo. */
export function ClockInPart() {
  return (
    <div id="clock-in" className="mt-20 scroll-mt-24 border-t border-line pt-16">
      <SectionHeading id="clock-in-title" as="h3" eyebrow={clockIn.eyebrow} status={clockIn.status} title={clockIn.title} accent={clockIn.accent} intro={clockIn.intro} />
      <PillarLines lines={clockIn.lines} />
      <ExampleLine amount={gbp(attendanceCost(clockIn.example.hours, clockIn.example.rate))} text={clockIn.example.text} />
      <DemoReveal label="Try the clock-in demo">
        <ClockInDemo />
      </DemoReveal>
      <ul className="mt-10 grid gap-2 sm:gap-4 md:grid-cols-3" aria-label="Clock-in and privacy">
        {clockIn.privacy.map((p) => (
          <li key={p.title} className="rounded-2xl border border-line bg-surface-raised p-4 sm:p-5">
            <p className="font-extrabold">{p.title}</p>
            <p className="mt-1 text-[15px] text-ink-muted">{p.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
