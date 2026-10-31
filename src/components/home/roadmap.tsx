import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusChip } from "@/components/ui/status-chip";
import { roadmap } from "@/content/home";

/** What's coming next, each with its honest status. */
export function Roadmap() {
  return (
    <Section id="roadmap" labelledBy="roadmap-title" tone="mint">
      <SectionHeading id="roadmap-title" title={roadmap.title} accent={roadmap.accent} intro={roadmap.intro} />
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {roadmap.items.map((item) => (
          <li key={item.key} className="grid content-start gap-3 rounded-2xl border border-line bg-surface-raised p-5 shadow-card">
            <StatusChip feature={item.key} />
            <h3 className="text-lg leading-tight font-extrabold tracking-[-0.015em]">{item.title}</h3>
            <p className="text-[15px] text-ink-muted">{item.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-[80ch] text-sm text-ink-muted">{roadmap.note}</p>
    </Section>
  );
}
