import "server-only";

/**
 * Notification emails through Resend (approved 30 Oct 2026). Needs
 * RESEND_API_KEY, NOTIFY_EMAIL (who receives new enquiries) and NOTIFY_FROM (a
 * sender on a verified domain). Without them, nothing is sent and nothing fails.
 */
export async function notifyOwner(subject: string, lines: string[]): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.NOTIFY_FROM;
  if (!key || !to || !from) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text: lines.join("\n") }),
      cache: "no-store",
    });
  } catch {
    // A failed notification must never lose the enquiry, which is already saved.
  }
}
