/**
 * Pre-send order checks (Smart Ordering demo). Rules first, as planned in the
 * app (DECISIONS.md D-048): possible duplicates against incoming orders, and
 * quantities far above what the kitchen usually orders. Results are prompts
 * for a person to check, never automatic decisions.
 */
export type OrderLine = { product: string; quantity: number; unit: string; delivery: string };
export type IncomingOrder = OrderLine & { orderedBy: string; orderedOn: string };

export function findPossibleDuplicate(line: OrderLine, incoming: IncomingOrder[]): IncomingOrder | null {
  return (
    incoming.find(
      (o) => o.product.toLowerCase() === line.product.toLowerCase() && o.unit === line.unit && o.delivery === line.delivery,
    ) ?? null
  );
}

/** Illustrative value of a possible duplicate, at an example unit price. */
export function duplicateSpend(quantity: number, examplePricePerUnit: number): number {
  return Math.round(quantity * examplePricePerUnit * 100) / 100;
}

/** True when a quantity is well above the usual order (default: more than 3 times). */
export function isUnusualQuantity(quantity: number, usual: number, factor = 3): boolean {
  return usual > 0 && quantity > usual * factor;
}
