import { SectionHeading } from "@/components/ui/section-heading";
import { finalCta } from "@/content/home";
import { EarlyAccessForm } from "./early-access-form";

export function FinalCta() {
  return (
    <section id="early-access" aria-labelledby="final-title" className="lamp relative scroll-mt-20 bg-forest-950 py-24 md:py-32">
      <div className="mx-auto w-[min(1000px,100%-40px)]">
        <SectionHeading id="final-title" size="xl" title={finalCta.title} intro={<span className="text-fog-200">{finalCta.intro}</span>} />
        <div className="mt-12">
          <EarlyAccessForm />
        </div>
      </div>
    </section>
  );
}
