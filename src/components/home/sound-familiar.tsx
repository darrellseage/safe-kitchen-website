import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { familiar } from "@/content/home";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";

const tilt = ["-rotate-[1.6deg]", "rotate-[1.2deg] md:translate-y-2", "-rotate-[0.8deg]", "rotate-[1.8deg] md:translate-y-3"];

export function SoundFamiliar() {
  return (
    <section aria-labelledby="familiar-title" className="relative overflow-x-clip border-t border-night-700 py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <Image
          src={images.kitchenLine.src}
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover opacity-30 grayscale-[60%]"
          style={{ objectPosition: images.kitchenLine.focal }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(13_17_15/0.55),var(--color-night-950)_92%)]" />
      </div>

      <div className="relative mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeading id="familiar-title" title={familiar.title} intro={familiar.intro} />

        <div className="relative mt-16 pt-6">
          <div
            aria-hidden="true"
            className="absolute -inset-x-5 top-0 h-3.5 rounded bg-[linear-gradient(180deg,#5c6661,#2d3531_60%,#1c2220)] shadow-[0_6px_14px_rgb(0_0_0/0.5)]"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {familiar.tickets.map((t, i) => (
              <li key={t.title}>
                <Reveal delay={i * 0.12} y={-28}>
                  <article
                    className={cn(
                      "ticket-edge relative min-h-72 bg-paper px-5 pt-7 pb-7 text-paper-ink shadow-[0_18px_30px_-10px_rgb(0_0_0/0.6)]",
                      tilt[i],
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -top-2.5 left-1/2 h-4.5 w-12 -translate-x-1/2 rounded-sm bg-[linear-gradient(#b8bfbb,#7f8783)] shadow"
                    />
                    <p className="flex justify-between border-b-[1.5px] border-dashed border-paper-line pb-2.5 text-[12.5px] font-bold tracking-[0.08em] text-paper-muted uppercase">
                      <span>{t.day}</span>
                      <span className="tabular">{t.time}</span>
                    </p>
                    <h3 className="mt-4 font-display text-[22px] leading-[1.1] font-bold tracking-[-0.02em]">{t.title}</h3>
                    <p className="mt-3 text-[15px] text-paper-muted">{t.body}</p>
                    <p className="mt-4 inline-block -rotate-2 text-sm text-paper-red italic">“{t.scrawl}”</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
