import Image from "next/image";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { audiences } from "@/content/home";
import { images, type StockImage } from "@/content/images";
import { SiteSwitcher } from "./site-switcher";

function Side({ title, points, image }: { title: string; points: readonly string[]; image: StockImage }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-surface-raised shadow-card">
      <div className="relative aspect-[16/10] bg-surface-sunken">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" quality={70} className="object-cover" style={{ objectPosition: image.focal }} />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{title}</h3>
        <ul className="mt-4 grid gap-2.5">
          {points.map((p) => (
            <li key={p} className="flex gap-3 text-[16.5px]">
              <Check className="mt-1 size-5 flex-none text-brand-500" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** For chefs and for owners: two perspectives, plus a manager switching between sites. */
export function AudiencesSection() {
  return (
    <Section id="chefs-and-owners" labelledBy="audiences-title">
      <SectionHeading id="audiences-title" title={audiences.title} accent={audiences.accent} />
      <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1fr_0.95fr]">
        <Side title={audiences.chefs.title} points={audiences.chefs.points} image={images.chef} />
        <Side title={audiences.owners.title} points={audiences.owners.points} image={images.manager} />
        <div className="grid content-start gap-4">
          <SiteSwitcher />
          <p className="text-[15px] text-ink-muted">Switch between your sites and see each one’s day at a glance: checks, who’s on shift, what needs attention and what’s on order.</p>
        </div>
      </div>
    </Section>
  );
}
