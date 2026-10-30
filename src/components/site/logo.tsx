import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Placeholder mark until final branding (app DECISIONS.md O-002). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <rect width="32" height="32" rx="9" className="fill-forest-900" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill="none" className="stroke-forest-700" />
      <path d="m10 16.5 4 4 8-9" fill="none" className="stroke-herb-400" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight", className)}>
      <LogoMark />
      {siteConfig.name}
    </span>
  );
}
