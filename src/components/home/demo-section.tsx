import { SectionHeading } from "@/components/ui/section-heading";
import { demo } from "@/content/home";
import { TemperatureDemo } from "./temperature-demo";

export function DemoSection() {
  return (
    <section aria-labelledby="demo-title" className="lamp border-t border-night-700 py-24 md:py-32">
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeading id="demo-title" title={demo.title} intro={demo.intro} />
        <div className="mt-14">
          <TemperatureDemo />
        </div>
      </div>
    </section>
  );
}
