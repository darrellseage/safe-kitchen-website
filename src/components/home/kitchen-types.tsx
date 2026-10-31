import Image from "next/image";
import { kitchenTypes } from "@/content/home";
import { images } from "@/content/images";

/** Photo strip of the kitchens Safe Kitchen is built for. */
export function KitchenTypes() {
  return (
    <div className="mt-14">
      <p className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{kitchenTypes.label}</p>
      <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kitchenTypes.types.map((t) => {
          const img = images[t.image];
          return (
            <li key={t.label} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface-sunken shadow-card">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                quality={70}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ objectPosition: img.focal }}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgb(6_38_29/0.75))]" />
              <p className="absolute inset-x-4 bottom-3 text-lg font-extrabold text-white">{t.label}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
