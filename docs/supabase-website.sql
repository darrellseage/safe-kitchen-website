-- Safe Kitchen WEBSITE database (a separate Supabase project in London,
-- never the app's). Run once in the Supabase SQL editor.
-- Row Level Security is on with no policies: only the server-side secret key
-- used by the website can read or write. Nothing is exposed to browsers.
--
-- Enquiries are saved in two steps (owner decision 1 Nov 2026):
--   step 1: email, what they'd like, optional marketing consent (saved at once)
--   step 2: name and business details (completed_at is set)
-- Rows with completed_at null are step-1-only enquiries.

create table if not exists public.enquiries (
  id uuid primary key,
  received_at timestamptz not null default now(),
  email text not null check (char_length(email) between 3 and 254),
  interest text not null check (interest in ('early_access', 'demo', 'call')),
  -- Marketing consent: what was agreed to, and when (UK GDPR, PECR).
  marketing_opt_in boolean not null default false,
  marketing_consent_at timestamptz,
  marketing_consent_version text,
  marketing_consent_text text,
  -- Step 2
  name text check (name is null or char_length(name) between 1 and 100),
  business text check (business is null or char_length(business) <= 120),
  business_type text,
  sites text,
  message text check (message is null or char_length(message) <= 1000),
  completed_at timestamptz,
  constraint consent_recorded check (not marketing_opt_in or marketing_consent_at is not null)
);

create table if not exists public.call_bookings (
  slot_start timestamptz primary key, -- one booking per slot
  enquiry_id uuid not null references public.enquiries (id) on delete cascade,
  booked_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;
alter table public.call_bookings enable row level security;
-- No policies on purpose.
