import { ExternalLink } from "lucide-react";
import { waste } from "@/content/home";
import { wasteStat } from "@/content/stats";

/** Food waste (WRAP 2013 estimate), as part of the ordering section: better ordering means less in the bin. */
export function WastePart() {
  return (
    <div id="food-waste" className="mt-12 grid scroll-mt-24 items-center gap-6 rounded-3xl border border-line bg-surface-raised p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
      <div>
        <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{waste.title}</h3>
        <p className="mt-2 max-w-[60ch] text-ink-muted">{waste.body}</p>
        <p className="mt-2 text-[13px] text-ink-muted">{waste.disclaimer}</p>
      </div>
      <figure className="lg:max-w-[340px]">
        <p className="text-[clamp(2.6rem,6vw,3.6rem)] leading-none font-extrabold tracking-[-0.045em] text-brand-500 tabular">{wasteStat.value}</p>
        <p className="mt-2 font-bold">{wasteStat.label}</p>
        <figcaption className="mt-2 text-[13px] text-ink-muted">
          {wasteStat.note} Source:{" "}
          <a href={wasteStat.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-600 underline underline-offset-2">
            {wasteStat.source}
            <ExternalLink className="ms-1 inline size-3.5 align-[-2px]" aria-hidden="true" />
          </a>
        </figcaption>
      </figure>
    </div>
  );
}
