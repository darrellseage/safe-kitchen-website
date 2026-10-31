-- Safe Kitchen WEBSITE database (a separate Supabase project in London,
-- never the app's). Run once in the Supabase SQL editor.
-- Row Level Security is on with no policies: only the server-side secret key
-- used by the website can read or write. Nothing is exposed to browsers.

create table if not exists public.enquiries (
  id uuid primary key,
  received_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  business text not null check (char_length(business) between 1 and 120),
  business_type text not null,
  sites text not null,
  interest text not null check (interest in ('early_access', 'demo', 'call')),
  message text not null default '' check (char_length(message) <= 1000),
  marketing_opt_in boolean not null default false
);

create table if not exists public.call_bookings (
  slot_start timestamptz primary key, -- one booking per slot
  enquiry_id uuid not null references public.enquiries (id) on delete cascade,
  booked_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;
alter table public.call_bookings enable row level security;
-- No policies on purpose.
