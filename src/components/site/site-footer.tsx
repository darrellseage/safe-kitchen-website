import Link from "next/link";
import { siteConfig } from "@/config/site";
import { legalNav, mainNav } from "@/content/navigation";
import { Logo } from "./logo";

export function SiteFooter() {
  const { company } = siteConfig;
  return (
    <footer className="border-t border-night-700 bg-forest-950/40">
      <div className="mx-auto grid w-[min(1200px,100%-40px)] gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="grid content-start gap-4">
          <Logo />
          <p className="max-w-[40ch] text-fog-400">{siteConfig.tagline} Digital food safety records for busy UK kitchens.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-3 text-sm font-semibold tracking-[0.08em] text-fog-400 uppercase">Explore</h2>
          <ul className="grid gap-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-8 items-center hover:text-herb-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal">
          <h2 className="mb-3 text-sm font-semibold tracking-[0.08em] text-fog-400 uppercase">Legal</h2>
          <ul className="grid gap-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-8 items-center hover:text-herb-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto grid w-[min(1200px,100%-40px)] gap-2 border-t border-night-700 py-8 text-sm text-fog-400">
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
