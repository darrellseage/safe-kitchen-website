import "server-only";

/**
 * Cloudflare Turnstile check (approved 30 Oct 2026). Without TURNSTILE_SECRET_KEY
 * (local development) the check is skipped; the honeypot, timing and rate-limit
 * checks still apply.
 */
export async function passesTurnstile(token: string | null, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    cache: "no-store",
  });
  if (!res.ok) return false;
  const body = (await res.json()) as { success?: boolean };
  return body.success === true;
}
