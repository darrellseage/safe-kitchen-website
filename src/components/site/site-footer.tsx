import Link from "next/link";
import { siteConfig } from "@/config/site";
import { legalNav, mainNav } from "@/content/navigation";
import { Logo } from "./logo";

export function SiteFooter() {
  const { company } = siteConfig;
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid w-[min(1200px,100%-40px)] gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="grid content-start gap-4">
          <Logo />
          <p className="max-w-[34ch] text-lg font-bold tracking-tight text-brand-900">{siteConfig.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-3 text-[13px] font-bold tracking-[0.08em] text-ink-muted uppercase">Explore</h2>
          <ul className="grid gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center hover:text-accent-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal">
          <h2 className="mb-3 text-[13px] font-bold tracking-[0.08em] text-ink-muted uppercase">Legal</h2>
          <ul className="grid gap-1">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center hover:text-accent-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto grid w-[min(1200px,100%-40px)] gap-2 border-t border-line py-8 text-sm text-ink-muted">
        <p>
          {siteConfig.name} is not affiliated with or endorsed by the Food Standards Agency or any local authority. Safer
          Food, Better Business is a Food Standards Agency publication.
        </p>
        {company ? (
          <p>
            © {new Date().getFullYear()} {company.legalName}. {company.address}.
            {company.companyNumber ? ` Company number ${company.companyNumber}.` : ""}
          </p>
        ) : null}
      </div>
    </footer>
  );
}
