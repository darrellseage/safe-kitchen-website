import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** The app's logo mark (app src/components/brand/logo.tsx), a placeholder until final branding (O-002). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <rect width="32" height="32" rx="9" className="fill-accent-600" />
      <path
        d="M9 17.5c0-5.5 4.5-9.5 14-9.5 0 9.5-4 14-9.5 14-1.7 0-3.2-.5-4.5-1.5"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m12.5 17 2.5 2.5 5-5.5" fill="none" className="stroke-accent-300" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-lg font-extrabold tracking-tight whitespace-nowrap text-brand-900 sm:gap-2.5", className)}>
      <LogoMark />
      {siteConfig.name}
    </span>
  );
}
