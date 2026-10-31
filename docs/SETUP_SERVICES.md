# Connecting the website's services

The early-access form and call booking are fully built. They work on your computer without any accounts, keeping enquiries in memory. On the live site they need four services (approved 30 October 2026). Each one switches on by itself once its keys are added to the hosting settings, with no code changes.

Do these in order. Each takes about 10 minutes. **Never paste a secret key into a chat, an email or GitHub.** Keys only go into the settings screens described below.

---

## 1. Supabase: stores enquiries and booked calls (free)

This is a **new, separate** Supabase project just for the website. Don't use the app's project.

1. Go to supabase.com and sign in (you already have an account for the app).
2. Click **New project**. Name it `safe-kitchen-website`, choose the **London** region, and set a strong database password (save it in your password manager).
3. When it's ready, open **SQL Editor**, paste the whole of `docs/supabase-website.sql` from this repository, and click **Run**. This creates two tables, both locked down so only the website's server can use them.
4. Open **Project Settings → API**. You need two values for step 4:
   - **Project URL** → this becomes `SUPABASE_URL`
   - the **secret** key (sometimes labelled `service_role`) → this becomes `SUPABASE_SECRET_KEY`. Keep it secret.

To see enquiries later: **Table Editor → enquiries**, and **call_bookings** for booked calls.

## 2. Cloudflare Turnstile: blocks spam bots (free)

1. Go to dash.cloudflare.com and create a free account.
2. In the menu, open **Turnstile → Add widget**. Name it `Safe Kitchen website`, add the domain `safekitchen.uk` (and your Vercel preview address once you have it), and choose **Managed**.
3. Copy the two keys:
   - **Site key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (this one is public)
   - **Secret key** → `TURNSTILE_SECRET_KEY`

## 3. Resend: emails you when someone signs up (free for small volumes)

1. Go to resend.com and create an account.
2. **Domains → Add domain**: `safekitchen.uk`. Resend shows a few DNS records; add them where you bought the domain. Verification can take up to a day.
3. **API Keys → Create API key** → `RESEND_API_KEY`.
4. Choose:
   - `NOTIFY_EMAIL`: where new enquiries should go (for example your own email)
   - `NOTIFY_FROM`: who emails come from, on your verified domain, for example `Safe Kitchen <hello@safekitchen.uk>`

If you skip Resend for now, enquiries are still saved in Supabase; you just won't get an email.

## 4. Vercel: puts the website online

1. Go to vercel.com and sign up with your GitHub account.
2. **Add New → Project**, choose the `safe-kitchen-website` repository, and import it. Vercel recognises it as Next.js automatically.
3. Before the first deploy, open **Environment Variables** and add every value from steps 1 to 3 (the names are listed in `.env.example`).
4. Deploy. You'll get a private preview address. The site asks search engines not to list it until we switch `allowIndexing` on at go-live.
5. A business site needs Vercel's **Pro** plan (about $20 a month). The free plan is fine for private previews.

Connecting `safekitchen.uk` itself comes in the final stage, with your go-ahead.

---

## Call booking hours

The calendar currently offers **Tuesdays and Thursdays, 2pm to 5pm UK time**, in 30-minute slots, up to two weeks ahead, with at least 24 hours' notice. These are placeholders. Tell me your real hours and I'll change them in `src/config/booking.ts`. Only genuinely free times are ever shown; booked times disappear, and nothing is shown as booked when it isn't.
