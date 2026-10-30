# Safe Kitchen website

The marketing website for **Safe Kitchen** (working name), planned for `safekitchen.uk`. It is a separate app from the operational Safe Kitchen app (app DECISIONS.md D-073) and shares no database, sign-in or code with it.

Start with [docs/STAGE_1_PROPOSAL.md](docs/STAGE_1_PROPOSAL.md): architecture, visual concept ("The Pass"), homepage story, claims audit and the owner's decisions.

## Run it locally

```bash
npm install
npm run dev        # website at http://localhost:3000
npm test           # unit tests (calculator, form rules, spam checks, slider maths, pricing)
npm run lint       # code-quality checks
npm run typecheck  # TypeScript
npm run build      # production build
```

## Where things live

- `src/config/`: product name and site settings (`site.ts`, including `allowIndexing`, which stays `false` until go-live), **prices** (`pricing.ts`) and **feature status labels** (`features.ts`)
- `src/content/`: all homepage wording (`home.ts`), navigation, illustrative demo data and the stock photo manifest with licences and accuracy notes
- `src/lib/`: logic with tests (calculator, temperature slider maths, early-access form rules, spam checks, enquiry storage)
- `src/components/home/`: one file per homepage section. `src/components/product/`: recreated pieces of the app's interface for mock-ups. `src/components/ui/` and `src/components/site/`: shared building blocks, header and footer
- `src/app/actions/early-access.ts`: the form's server action
- `docs/visual-concept/`: Stage 1 concept board. `docs/review/`: screenshots for each review

## Content rules (from the app project)

- Never invent FSA requirements, temperatures, times or frequencies. Demo readings are illustrative and never judged against a limit.
- Never imply FSA or local authority endorsement.
- Features stay labelled "In development", "Planned" or "Exploring" until they are live (`src/config/features.ts`).
- No invented testimonials, customer numbers or time-saving statistics.
- UK English.

## Status

Stage 2 (homepage) is built. Enquiries are kept in memory in development only. Stage 3 adds the approved services (Supabase enquiry storage, Cloudflare Turnstile, Resend emails, booking calendar) and the supporting and legal pages.
