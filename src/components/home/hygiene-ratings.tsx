import Link from "next/link";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { hygiene } from "@/content/home";
import { section } from "@/content/navigation";
import { hygieneStats } from "@/content/stats";

/**
 * Food hygiene ratings and customer confidence, inside the "Sound familiar?" section. Unverified statistics are
 * shown only in the private launch preview, marked as being verified.
 */
export function HygieneRatings() {
  const stats = hygieneStats.filter((s) => s.verified || siteConfig.launchPreview);
  return (
    <div id="hygiene-rating" className="mt-16 rounded-3xl border border-line bg-surface-raised p-6 shadow-card sm:p-9">
      <SectionHeading id="hygiene-title" as="h3" title={hygiene.title} accent={hygiene.accent} intro={hygiene.intro} />
      {stats.length ? (
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <li key={s.value + s.label} className="grid content-start gap-2 rounded-3xl border border-line bg-surface p-6">
              <span className="text-[clamp(3.2rem,7vw,4.8rem)] leading-none font-extrabold tracking-[-0.045em] text-brand-500 tabular">{s.value}</span>
              <span className="text-lg font-bold">{s.label}</span>
              {!s.verified ? <span className="w-fit rounded-full bg-warning-100 px-2.5 py-1 text-xs font-bold text-warning-ink">Figure being verified</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {stats.length ? (
        <p className="mt-3 text-[13px] text-ink-muted">
          Source:{" "}
          <a href={stats[0].sourceUrl} className="font-semibold text-accent-600 underline underline-offset-2" rel="noopener noreferrer" target="_blank">
            {stats[0].source}
            <ExternalLink className="ms-1 inline size-3.5 align-[-2px]" aria-hidden="true" />
          </a>
        </p>
      ) : null}

      <div className="mt-8">
        <p className="text-xl font-extrabold">{hygiene.helpsTitle}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {hygiene.helps.map((h) => (
            <li key={h} className="flex gap-3 text-[16.5px]">
              <Check className="mt-1 size-5 flex-none text-brand-500" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-[80ch] text-sm text-ink-muted">{hygiene.disclaimer}</p>
        <Link href={section("savings")} className="mt-4 inline-flex min-h-12 items-center gap-1.5 font-bold text-accent-600 hover:text-accent-700">
          {hygiene.calculatorLink}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
