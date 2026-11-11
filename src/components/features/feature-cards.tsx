import { ArrowRight } from "lucide-react";
import { SiteLink } from "@/components/site/site-link";
import { PillarIcon } from "@/components/ui/pillar-icon";
import { featureHref, featurePages, type FeatureSlug } from "@/content/site-map";
import { cn } from "@/lib/cn";

/** Cards linking to feature pages. With no `slugs`, all eight are shown. */
export function FeatureCards({ slugs, columns, className }: { slugs?: FeatureSlug[]; columns?: 3 | 4; className?: string }) {
  const pages = slugs ? slugs.map((s) => featurePages.find((f) => f.slug === s)!) : featurePages;
  return (
    <ul className={cn("grid gap-3.5 sm:grid-cols-2", (columns ?? (slugs ? 3 : 4)) === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4", className)}>
      {pages.map((f) => (
        <li key={f.slug}>
          <SiteLink
            href={featureHref(f.slug)}
            className="group grid h-full content-start gap-3 rounded-2xl border border-line bg-surface-raised p-5 shadow-card transition-shadow hover:shadow-raised"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <PillarIcon name={f.icon} className="size-5.5" />
            </span>
            <span className="text-[19px] leading-tight font-extrabold tracking-[-0.02em] text-ink">{f.name}</span>
            <span className="text-[15px] text-ink-muted">{f.summary}</span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-accent-600">
              See how it works
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
            </span>
          </SiteLink>
        </li>
      ))}
    </ul>
  );
}
