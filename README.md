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

The site is being rebuilt in the light, five-pillar direction ([docs/REDESIGN_PROPOSAL.md](docs/REDESIGN_PROPOSAL.md)) on branch `claude/light-redesign`.

- **Stage 1 (Foundation): done.** The app's own tokens and typeface, light header with pillar navigation, footer, hero, five-pillar overview, and every homepage section in order with its real headline, copy and status label. Sections still to be built show a labelled "Built in Stage N" panel.
- Stages 2 to 6: storytelling, product demos, conversion, polish, deployment preparation.
- Components from the earlier dark build (temperature demo, before-and-after scene, calculator, pricing, FAQ, EHO story, form) are kept and are restyled as their stage comes up.
