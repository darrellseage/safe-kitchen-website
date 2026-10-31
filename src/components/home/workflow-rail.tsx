import { workflow } from "@/content/home";

/** Rota → clock-in → timesheet steps that connect the Rotas and Clock-In sections. */
export function WorkflowRail() {
  return (
    <ol aria-label={workflow.label} className="mt-12 grid gap-0 md:grid-cols-5">
      {workflow.steps.map((s, i) => (
        <li key={s.title} className="relative min-h-14 ps-12 pb-6 md:ps-0 md:pt-12 md:pe-4 md:pb-0">
          <span className="absolute top-0 left-0 z-10 grid size-8 place-items-center rounded-full bg-accent-600 text-sm font-bold text-white tabular">{i + 1}</span>
          {i < workflow.steps.length - 1 ? (
            <span aria-hidden="true" className="absolute top-8 bottom-0 left-[15px] w-0.5 bg-accent-100 md:top-[15px] md:right-0 md:bottom-auto md:left-8 md:h-0.5 md:w-auto" />
          ) : null}
          <span className="block font-bold">{s.title}</span>
          <span className="block text-sm text-ink-muted">{s.body}</span>
        </li>
      ))}
    </ol>
  );
}
