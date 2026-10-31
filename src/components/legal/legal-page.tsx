import { Fragment } from "react";
import { legalDraftNotice, type LegalPage as Page } from "@/content/legal";

/** Renders placeholder text in [square brackets] highlighted, so gaps are obvious. */
function WithPlaceholders({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/g).map((part, i) =>
        part.startsWith("[") ? (
          <mark key={i} className="rounded bg-warning-100 px-1 text-ink">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function LegalPage({ page }: { page: Page }) {
  return (
    <main id="main" className="bg-surface-raised">
      <div className="mx-auto w-[min(760px,100%-40px)] py-16 md:py-24">
        <p className="mb-6 rounded-xl border border-warning/40 bg-warning-100 px-4 py-3 text-sm font-semibold">{legalDraftNotice}</p>
        <h1 className="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-extrabold tracking-[-0.035em]">{page.title}</h1>
        <p className="mt-2 text-sm text-ink-muted">{page.updated}</p>
        <p className="mt-6 text-lg text-ink-muted">{page.intro}</p>
        {page.sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="text-2xl font-extrabold tracking-[-0.02em]">{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p} className="mt-3 text-[17px] leading-relaxed">
                <WithPlaceholders text={p} />
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
