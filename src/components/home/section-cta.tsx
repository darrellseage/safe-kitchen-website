import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { ctaHref, section } from "@/content/navigation";

/** Call to action repeated after the main selling sections. */
export function SectionCta({ text = "One simple platform. Unlimited staff. From £14.99 a month." }: { text?: string }) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface-raised px-6 py-5 shadow-card">
      <p className="text-lg font-extrabold text-brand-900">{text}</p>
      <div className="flex flex-wrap gap-2">
        <ButtonLink href={ctaHref}>Get early access</ButtonLink>
        <ButtonLink href={section("pricing")} variant="secondary">
          See pricing
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </div>
  );
}
