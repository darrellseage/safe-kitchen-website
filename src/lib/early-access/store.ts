import { MARKETING_CONSENT, type DetailsInput, type StartInput } from "./schema";

/**
 * Where enquiries and call bookings are saved. Local development keeps them
 * in memory. With SUPABASE_URL and SUPABASE_SECRET_KEY set, they go to the
 * website's own Supabase project (London), never the app's.
 *
 * An enquiry is saved in two steps (owner decision 1 Nov 2026): step 1 (email,
 * what they'd like, optional marketing consent) is saved straight away; step 2
 * adds the business details to the same record.
 */
export type EnquiryRecord = StartInput & {
  id: string;
  receivedAt: string;
  marketingConsent: null | { at: string; version: string; text: string };
  details: null | Omit<DetailsInput, "id" | "email" | "interest" | "slot">;
  completedAt: string | null;
};

export interface EnquiryStore {
  /** Saves step 1 and returns the new enquiry's id. */
  start(input: StartInput): Promise<{ id: string }>;
  /** Adds step 2 to an enquiry. False if no enquiry has that id and email. */
  complete(input: DetailsInput): Promise<boolean>;
  /** Start times (ISO) already booked from a given time onwards. */
  bookedSlots(fromIso: string): Promise<string[]>;
  /** Books a slot; false if someone else booked it first. */
  bookSlot(startIso: string, enquiryId: string): Promise<boolean>;
}

const consentFor = (marketing: boolean, at: string) => (marketing ? { at, version: MARKETING_CONSENT.version, text: MARKETING_CONSENT.text } : null);

const memory: { enquiries: Map<string, EnquiryRecord>; bookings: Map<string, string> } = { enquiries: new Map(), bookings: new Map() };

export const memoryStore: EnquiryStore = {
  async start(input) {
    const id = crypto.randomUUID();
    const receivedAt = new Date().toISOString();
    memory.enquiries.set(id, { ...input, id, receivedAt, marketingConsent: consentFor(input.marketing, receivedAt), details: null, completedAt: null });
    return { id };
  },
  async complete(input) {
    const record = memory.enquiries.get(input.id);
    if (!record || record.email !== input.email) return false;
    record.interest = input.interest;
    record.details = { name: input.name, business: input.business, businessType: input.businessType, sites: input.sites, message: input.message };
    record.completedAt = new Date().toISOString();
    return true;
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

/** For tests: what the memory store holds. */
export const memoryEnquiry = (id: string) => memory.enquiries.get(id);

async function supabaseStore(): Promise<EnquiryStore> {
  const { insertRow, selectColumn, updateRows } = await import("@/lib/services/supabase");
  return {
    async start(input) {
      const id = crypto.randomUUID();
      const receivedAt = new Date().toISOString();
      const consent = consentFor(input.marketing, receivedAt);
      const res = await insertRow("enquiries", {
        id,
        received_at: receivedAt,
        email: input.email,
        interest: input.interest,
        marketing_opt_in: input.marketing,
        marketing_consent_at: consent?.at ?? null,
        marketing_consent_version: consent?.version ?? null,
        marketing_consent_text: consent?.text ?? null,
      });
      if (!res.ok) throw new Error(`Could not save enquiry (${res.status})`);
      return { id };
    },
    async complete(input) {
      // Matching on id and email means a guessed id alone can't change someone else's enquiry.
      const rows = await updateRows("enquiries", `id=eq.${encodeURIComponent(input.id)}&email=eq.${encodeURIComponent(input.email)}`, {
        name: input.name,
        business: input.business,
        business_type: input.businessType,
        sites: input.sites,
        interest: input.interest,
        message: input.message,
        completed_at: new Date().toISOString(),
      });
      return rows > 0;
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
