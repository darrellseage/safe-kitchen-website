import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { audience } from "@/content/home";
import { images } from "@/content/images";

export function Audience() {
  return (
    <section aria-labelledby="audience-title" className="border-t border-night-700 py-24 md:py-28">
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeading id="audience-title" title={audience.title} intro={audience.intro} />
        <ul className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {audience.types.map((t) => {
            const img = images[t.image];
            return (
              <li key={t.label} className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-night-700 bg-night-900">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  quality={70}
                  className="object-cover brightness-[0.8] saturate-[0.7] transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ objectPosition: img.focal }}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(6_38_29/0.9))]" />
                <p className="absolute inset-x-4 bottom-4 font-display text-2xl font-bold tracking-[-0.02em]">{t.label}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
