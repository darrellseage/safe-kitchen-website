/**
 * Lightweight spam checks for the early-access form. Cloudflare Turnstile is
 * added in Stage 3 (approved 30 Oct 2026); these checks stay as a first layer.
 */
export const HONEYPOT_FIELD = "website";
export const STARTED_FIELD = "started";

/** People take longer than this to fill in the form; bots usually don't. */
export const MIN_FILL_MS = 2500;

export function looksLikeSpam(form: FormData, now = Date.now()): boolean {
  const honeypot = form.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;
  const started = Number(form.get(STARTED_FIELD));
  if (!Number.isFinite(started) || started <= 0) return true;
  return now - started < MIN_FILL_MS;
}

/** Simple per-key limit (e.g. per IP address) within a time window. */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (key: string, now = Date.now()): boolean => {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    return true;
  };
}
