import type { EarlyAccessInput } from "./schema";

/**
 * Where enquiries are saved. Stage 2 keeps them in memory on the server (for
 * local development only). Stage 3 adds the approved Supabase project (London)
 * behind this same interface.
 */
export type EnquiryRecord = EarlyAccessInput & { id: string; receivedAt: string };

export interface EnquiryStore {
  save(input: EarlyAccessInput): Promise<EnquiryRecord>;
}

const memory: EnquiryRecord[] = [];

export const memoryStore: EnquiryStore = {
  async save(input) {
    const record = { ...input, id: crypto.randomUUID(), receivedAt: new Date().toISOString() };
    memory.push(record);
    return record;
  },
};

/** Returns null when no store is set up, so the form can say so honestly. */
export function getEnquiryStore(): EnquiryStore | null {
  return process.env.NODE_ENV === "production" ? null : memoryStore;
}
