import { ChevronRight } from "lucide-react";
import { SiteLink } from "@/components/site/site-link";
import { siteConfig } from "@/config/site";

export type Crumb = { label: string; href: string };

/** Breadcrumb trail for detailed pages, with structured data. The last item is the current page. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${siteConfig.url}${c.href === "/" ? "" : c.href}` })),
  };
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-surface">
      <ol className="mx-auto flex w-[min(1200px,100%-40px)] flex-wrap items-center gap-x-1 text-sm font-semibold text-ink-muted">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 ? <ChevronRight className="size-4 flex-none rtl:rotate-180" aria-hidden="true" /> : null}
              {last ? (
                <span aria-current="page" className="inline-flex min-h-11 items-center text-ink">
                  {c.label}
                </span>
              ) : (
                <SiteLink href={c.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-accent-600 hover:underline">
                  {c.label}
                </SiteLink>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </nav>
  );
}
