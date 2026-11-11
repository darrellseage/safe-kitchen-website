import Image from "next/image";
import { customers, experience, type ExperienceEntry } from "@/content/experience";

/** One company: its approved logo, or its name in the site's own type until a logo is approved. */
function Company({ entry }: { entry: ExperienceEntry }) {
  return entry.logo ? (
    <Image src={entry.logo.src} alt={entry.name} width={entry.logo.width} height={entry.logo.height} className="h-9 w-auto max-w-[160px] object-contain opacity-80 grayscale" />
  ) : (
    <span className="text-[19px] font-extrabold tracking-[-0.02em] whitespace-nowrap text-ink-muted">{entry.name}</span>
  );
}

function Row({ entries, hidden }: { entries: ExperienceEntry[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} aria-label={hidden ? undefined : experience.listLabel} className="logo-track flex items-center gap-x-8 sm:gap-x-12 sm:pe-12">
      {entries.map((e) => (
        <li key={e.name} className="flex h-12 flex-none items-center">
          <Company entry={e} />
        </li>
      ))}
    </ul>
  );
}

/**
 * The founder's professional experience, directly under the hero. A slow,
 * continuous row on wider screens (pure CSS; pauses on hover and keyboard
 * focus); a still, wrapped row when reduced motion is on or the screen is
 * narrow. The height is fixed, so nothing shifts as it loads.
 */
export function ExperienceBand() {
  const { companies } = experience;
  if (companies.length === 0) return null;
  return (
    <section aria-labelledby="experience-title" className="border-y border-line bg-surface">
      <div className="mx-auto grid w-[min(1200px,100%-40px)] grid-cols-[minmax(0,1fr)] gap-5 py-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:items-center lg:gap-10">
        <div>
          <h2 id="experience-title" className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">
            {experience.heading}
          </h2>
          <p className="mt-1.5 max-w-[46ch] text-[15.5px] text-ink-muted">{experience.support}</p>
        </div>
        <div className="min-w-0">
          <div tabIndex={0} role="group" aria-label={experience.listLabel} className="logo-marquee rounded-xl">
            <Row entries={companies} />
            <Row entries={companies} hidden />
          </div>
          <p className="mt-2 text-[12.5px] text-ink-subtle">{experience.clarification}</p>
        </div>
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
        <ul className="mt-4 flex flex-wrap items-center gap-x-12 gap-y-4">
          {customers.companies.map((e) => (
            <li key={e.name} className="flex h-12 items-center">
              <Company entry={e} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
