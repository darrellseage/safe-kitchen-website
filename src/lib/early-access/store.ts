import type { EarlyAccessInput } from "./schema";

/**
 * Where enquiries and call bookings are saved. Local development keeps them
 * in memory. With SUPABASE_URL and SUPABASE_SECRET_KEY set, they go to the
 * website's own Supabase project (London), never the app's.
 */
export type EnquiryRecord = EarlyAccessInput & { id: string; receivedAt: string };

export interface EnquiryStore {
  save(input: EarlyAccessInput): Promise<EnquiryRecord>;
  /** Start times (ISO) already booked from a given time onwards. */
  bookedSlots(fromIso: string): Promise<string[]>;
  /** Books a slot; false if someone else booked it first. */
  bookSlot(startIso: string, enquiryId: string): Promise<boolean>;
}

const memory: { enquiries: EnquiryRecord[]; bookings: Map<string, string> } = { enquiries: [], bookings: new Map() };

export const memoryStore: EnquiryStore = {
  async save(input) {
    const record = { ...input, id: crypto.randomUUID(), receivedAt: new Date().toISOString() };
    memory.enquiries.push(record);
    return record;
  },
  async bookedSlots(fromIso) {
    return [...memory.bookings.keys()].filter((s) => s >= fromIso);
  },
  async bookSlot(startIso, enquiryId) {
    if (memory.bookings.has(startIso)) return false;
    memory.bookings.set(startIso, enquiryId);
    return true;
  },
};

async function supabaseStore(): Promise<EnquiryStore> {
  const { insertRow, selectColumn } = await import("@/lib/services/supabase");
  return {
    async save(input) {
      const id = crypto.randomUUID();
      const receivedAt = new Date().toISOString();
      const res = await insertRow("enquiries", {
        id,
        received_at: receivedAt,
        name: input.name,
        email: input.email,
        business: input.business,
        business_type: input.businessType,
        sites: input.sites,
        interest: input.interest,
        message: input.message,
        marketing_opt_in: input.marketing,
      });
      if (!res.ok) throw new Error(`Could not save enquiry (${res.status})`);
      return { ...input, id, receivedAt };
    },
    async bookedSlots(fromIso) {
      return selectColumn("call_bookings", "slot_start", `slot_start=gte.${encodeURIComponent(fromIso)}`);
    },
    async bookSlot(startIso, enquiryId) {
      // slot_start is unique in the database, so two people can't book the same slot.
      const res = await insertRow("call_bookings", { slot_start: startIso, enquiry_id: enquiryId });
      if (res.status === 409) return false;
      if (!res.ok) throw new Error(`Could not book the slot (${res.status})`);
      return true;
    },
  };
}

/** Returns null when no store is set up (production without Supabase), so the form can say so honestly. */
export async function getEnquiryStore(): Promise<EnquiryStore | null> {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY) return supabaseStore();
  return process.env.NODE_ENV === "production" ? null : memoryStore;
}
