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

Vercel is the company that will host the website. Darrell does each step in the Vercel dashboard in a web browser, with Claude talking him through it one step at a time. Button names in Vercel's dashboard sometimes change; if one doesn't match, send Claude a screenshot.

**Good to know before you start:**
- Importing a repository makes Vercel build and publish it straight away, on a public `….vercel.app` address, unless Deployment Protection is set to **All Deployments**.
- Every push to GitHub makes Vercel build a new version automatically. Pushes to the production branch replace the main version; pushes to other branches make separate preview versions.

### 4a. Done (2 November 2026)
- [x] Vercel account created and the `safe-kitchen-website` repository imported (project `safe-kitchen-website`).
- [x] The first build published the repository's default branch, `claude/stage-1-proposal`, which holds only two old documents (the Stage 1 proposal and the first visual concept), not the website.
- [x] **Settings → Deployment Protection → Vercel Authentication → All Deployments**, saved. Checked in a private browser window: visitors now get a Vercel sign-in page. Everything on Vercel is private to Darrell's Vercel account.

### 4b. Choose the version Vercel publishes (done 2 November 2026)
- [x] `main` created from `claude/light-redesign` and pushed; Vercel **Production Branch** set to `main`.
- [x] **Framework Preset** changed from "Other" to **Next.js** (Vercel had guessed "Other" from the old two-document branch at import, so it served files instead of building the site and every page said "404"). Production redeployed: the real website now shows, signed in only.

The original steps, for reference:
The website code is on `claude/light-redesign`; the repository has no `main` branch yet.
1. Darrell approves committing the waiting changes on `claude/light-redesign`.
2. With Darrell's go-ahead, Claude creates a `main` branch from it and pushes it to GitHub.
3. In Vercel: **Settings → Git → Production Branch**, type `main`, **Save**.
4. **Deployments** tab: the newest `main` build should finish with a green tick. Open it (signed in) to check it's the real website.

### 4c. Keep data processing in the UK (next)
The form's server code runs in Washington DC (`iad1`) by default; the privacy notice says data stays in London.
1. **Settings → Functions → Function Region**: choose **London, England (lhr1)**, **Save**.
2. **Deployments**: open the newest build's **⋯** menu → **Redeploy**, so the change takes effect.

### 4d. Add the service keys
Only after sections 1 to 3 above are set up.
1. **Settings → Environment Variables**. Add each name from `.env.example` with its value, one at a time. Tick **Production** and **Preview**.
2. Never add `NEXT_PUBLIC_LAUNCH_PREVIEW`, `NEXT_PUBLIC_SHOW_FOUNDING_OFFER`, `PREVIEW_EXPORT` or `NEXT_PUBLIC_PREVIEW_EXPORT`: those are only for the private review copy.
3. **Redeploy** the newest build, then test the form while signed in.

### Domain connected (done 2 November 2026)
- [x] `safekitchen.uk` and `www.safekitchen.uk` added in Vercel (**Settings → Domains**), both on Production.
- [x] At names.co.uk (**Online Control Panel → DNS Administration → Add/Modify DNS Zone**, after ticking "I accept…" and **Activate** for advanced DNS), the two existing holding-page records were replaced:
  - A record, host empty (the domain itself): `85.233.160.22` → **`216.198.79.1`**
  - CNAME `www`: `fwd3.hosts.co.uk` → **`b1e5faa4a0089fba.vercel-dns-017.com.`**
- [x] Vercel shows both domains as configured (blue ticks) and generated the free SSL certificate (https) automatically.
- The site is still private on the domain too: All Deployments protection shows the Vercel sign-in page until go-live (4e step 4).
- No email (MX) records were set up or changed. Resend will need its own DNS records later (section 3).

### 4e. Go live (final stage, only with Darrell's go-ahead)
1. Choose a Vercel plan. The free **Hobby** plan is for personal, non-commercial use, so a business site needs **Pro** (check the current price on vercel.com).
2. ~~Connect `safekitchen.uk`~~ (done 2 November 2026, see above).
3. Claude switches `allowIndexing` on in `src/config/site.ts` so search engines can list the site (after the trademark check).
4. **Settings → Deployment Protection**: change **All Deployments** to **Standard Protection**, so the public can see `safekitchen.uk` while previews stay private.
5. Check the live site in a private window on a phone and a computer.

---

## Call booking hours

The calendar currently offers **Tuesdays and Thursdays, 2pm to 5pm UK time**, in 30-minute slots, up to two weeks ahead, with at least 24 hours' notice. These are placeholders. Tell me your real hours and I'll change them in `src/config/booking.ts`. Only genuinely free times are ever shown; booked times disappear, and nothing is shown as booked when it isn't.
