import Image from "next/image";
import { customers, experience, type ExperienceEntry } from "@/content/experience";

/** One company on a white tile: its logo at its own proportions, or its name until a logo file is supplied. */
function Company({ entry }: { entry: ExperienceEntry }) {
  return (
    <span className="flex h-24 min-w-[150px] items-center justify-center rounded-2xl border border-line bg-white px-6 shadow-card">
      {entry.logo ? (
        <Image
          src={entry.logo.src}
          alt={entry.name}
          width={entry.logo.width}
          height={entry.logo.height}
          quality={80}
          sizes="200px"
          loading="eager"
          className="rounded-lg"
          style={{ height: entry.logo.showAt, width: "auto" }}
        />
      ) : (
        <span className="text-[22px] font-extrabold tracking-[-0.03em] whitespace-nowrap text-brand-900">{entry.name}</span>
      )}
    </span>
  );
}

function Row({ entries, hidden }: { entries: ExperienceEntry[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} aria-label={hidden ? undefined : experience.listLabel} className="logo-track flex items-center gap-4 pe-4">
      {entries.map((e) => (
        <li key={e.name} className="flex-none">
          <Company entry={e} />
        </li>
      ))}
    </ul>
  );
}

/**
 * The founder's professional experience, directly under the hero: a heading
 * and one row of logos. The row scrolls slowly and continuously on every
 * screen size (pure CSS; pauses on hover and keyboard focus) and becomes a
 * still, wrapped row when reduced motion is on. Fixed tile heights mean
 * nothing shifts as the logos load.
 */
export function ExperienceBand() {
  const { companies } = experience;
  if (companies.length === 0) return null;
  return (
    <section aria-labelledby="experience-title" className="border-y border-line bg-surface py-10 md:py-12">
      <h2 id="experience-title" className="mx-auto w-[min(1200px,100%-40px)] text-center text-[clamp(1.35rem,2.6vw,1.9rem)] leading-tight font-extrabold tracking-[-0.025em] text-brand-900">
        {experience.heading}
      </h2>
      <div tabIndex={0} role="group" aria-label={experience.listLabel} className="logo-marquee mx-auto mt-7 w-[min(1320px,100%)]">
        <Row entries={companies} />
        <Row entries={companies} hidden />
      </div>
    </section>
  );
}

/** Safe Kitchen customers and pilot kitchens: a separate section, shown only once a business has agreed to be named. */
export function CustomerBand() {
  if (customers.companies.length === 0) return null;
  return (
    <section aria-labelledby="customers-title" className="border-y border-line bg-surface-raised">
      <div className="mx-auto w-[min(1200px,100%-40px)] py-9">
        <h2 id="customers-title" className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">
          {customers.heading}
        </h2>
        <ul className="mt-4 flex flex-wrap items-center gap-4">
          {customers.companies.map((e) => (
            <li key={e.name}>
              <Company entry={e} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
