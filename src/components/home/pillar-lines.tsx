/** Short supporting headlines under a pillar heading. */
export function PillarLines({ lines }: { lines: readonly string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-bold text-brand-900">
      {lines.map((l) => (
        <li key={l}>{l}</li>
      ))}
    </ul>
  );
}
