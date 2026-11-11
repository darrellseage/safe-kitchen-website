import { Info } from "lucide-react";
import { preLaunchNotice } from "@/content/cta";

/** Shown on every page until the site is in its "launched" stage (src/config/features.ts). */
export function ReleaseNotice() {
  if (!preLaunchNotice) return null;
  return (
    <aside aria-label="Website status" className="bg-deep text-white">
      <p className="mx-auto flex w-[min(1200px,100%-32px)] items-start gap-2.5 py-2.5 text-[13.5px] font-medium">
        <Info className="mt-0.5 size-4 flex-none text-accent-300" aria-hidden="true" />
        {preLaunchNotice}
      </p>
    </aside>
  );
}
