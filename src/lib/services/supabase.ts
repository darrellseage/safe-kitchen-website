import "server-only";

/**
 * Minimal Supabase REST client for the website's own project (London), used
 * only on the server. Needs SUPABASE_URL and SUPABASE_SECRET_KEY. Tables have
 * Row Level Security on with no public policies (docs/supabase-website.sql),
 * so only this server-side key can write to them.
 */
export function supabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
}

async function rest(path: string, init: RequestInit): Promise<Response> {
  const key = process.env.SUPABASE_SECRET_KEY!;
  return fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...init.headers },
    cache: "no-store",
  });
}

export async function insertRow<T extends Record<string, unknown>>(table: string, row: T): Promise<{ ok: boolean; status: number; data?: unknown }> {
  const res = await rest(table, { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(row) });
  return { ok: res.ok, status: res.status, data: res.ok ? await res.json() : undefined };
}

export async function selectColumn(table: string, column: string, filter: string): Promise<string[]> {
  const res = await rest(`${table}?select=${column}&${filter}`, { method: "GET" });
  if (!res.ok) throw new Error(`Supabase select failed (${res.status})`);
  const rows = (await res.json()) as Array<Record<string, string>>;
  return rows.map((r) => r[column]);
}
