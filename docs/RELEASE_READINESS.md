# Release readiness (internal)

> The website is built as the finished, launch-ready site (owner decision 11 Nov 2026, app D-089). It carries launch wording and no per-feature labels. **Until launch it runs in the pre-launch stage**: one notice on every page says Safe Kitchen isn't available to customers yet, calls to action only register interest, and search engines are told not to index it.
> This file is the internal record of what must be true before the stage is switched. It is not shown on the website.

## How the switch works

| Setting | Where | Today | For launch |
|---|---|---|---|
| Feature readiness | `src/config/features.ts` (`featureStatus`) | Mixed (see below) | Every launch feature `"available"` |
| Release stage | Environment variable `NEXT_PUBLIC_RELEASE_STAGE` | not set (pre-launch) | `launched` |
| App sign-up address | `src/config/site.ts` (`appSignUpUrl`) | `null` | The app's sign-up URL |
| Search indexing | `src/config/site.ts` (`allowIndexing`) | `false` | `true` |
| Vercel Deployment Protection | Vercel dashboard | Vercel Authentication on **all** deployments | Standard Protection (production public) |
| Production branch | Vercel dashboard / GitHub | `main` (still the old one-page site) | `main` with the approved site merged |

Setting `NEXT_PUBLIC_RELEASE_STAGE=launched` **does nothing** until every launch feature below is `"available"`: the code checks (`releaseReady`) and stays in pre-launch, and a unit test fails if that rule is removed. When launched, the notice bar disappears and the "Get early access" buttons become "Start your subscription", pointing at the app's sign-up. No payment or account is ever created on the website itself.

## Feature readiness (from `featureStatus`, 11 Nov 2026)

| Area | Feature | Readiness | Evidence needed before "available" |
|---|---|---|---|
| Foundation | Accounts, sign-in, two-step verification, sites, staff, invitations | Built, being tested (app Phase 2B) | Pilot sign-off |
| Foundation | Shared kitchen tablet, staff PINs | In development (2C approved) | Pilot sign-off |
| Food safety | Temperature records | In development | Built, tested, reviewed content, pilot |
| Food safety | Cleaning, checklists, problems and corrective actions | In development | As above |
| Food safety | Manager overview | In development | As above |
| Food safety | Inspection Mode (print / PDF) | In development | As above |
| Food safety | Supplier list, pest control records | In development | As above |
| Food safety | Document uploads | Planned | As above |
| Allergens | Dish records, staff filter, QR menu, change alerts | Planned | As above, plus solicitor check of the legal wording |
| Allergens | Natasha's Law (PPDS) labels | Planned | As above |
| Training | Level 2 course | Planned | Course content reviewed by a qualified person; "Level 2" wording reviewed |
| Training | Certificates and uploads | Planned | Built and tested |
| Rotas | Rotas, import from photo / PDF / Word / Excel | Planned | Built and tested |
| Clock-in | Clock-in (location, QR, PIN), attendance, timesheet export | Planned | Built and tested; privacy notice for staff |
| Oversight | AI Checker | Planned | Built and tested; limits wording kept |
| Ordering | Supplier ordering and checks | Planned | Built and tested |
| Data | Record export when leaving | Planned | Built and tested (app D-083) |
| Data | Offline recording and sync | Planned | Built and fully tested (app D-038) |
| Later ideas | Probes, sensors, supplier integrations, stock suggestions | Our vision | Not part of the launch; shown only as ideas |

## Claims in the launch copy that must be true at launch

Each of these is stated on the website today as launch wording. Confirm each before switching stage, or change the wording.

- [ ] Daily checks work without a connection and sync without losing or duplicating records (About, "If the internet drops")
- [ ] Records can be exported when a customer leaves (About, FAQs, Reports)
- [ ] Data is hosted in the UK (About)
- [ ] Two-step verification for owners and managers; personal PINs for staff; records never silently changed (About, FAQs)
- [ ] Rota import accepts photo, screenshot, PDF, Word and Excel (Rotas page, FAQs)
- [ ] Clock-in by phone location, QR code or tablet PIN; location only at the moment of clocking (Rotas page)
- [ ] Orders sent by email or supplier link; "sent" never shown as "accepted" (Ordering page)
- [ ] QR allergen menu, printable chart, change alerts and PPDS labels (Allergens page)
- [ ] Inspection Mode shows the last 28 days and prints / saves as PDF (Inspection page)
- [ ] The in-house Level 2 course exists, with assessment and certificate, and the disclosure is shown (Training page)
- [ ] AI Checker summaries daily or weekly, with reasons and links (Reports page)
- [ ] Multi-site view and roles (Reports page, Pricing)
- [ ] Prices: £14.99 / £149.99 + VAT per site, unlimited staff, no set-up fees (everywhere; from `pricing.ts`)

## Never, at any stage

No invented testimonials, customer numbers, EHO or FSA endorsements, compliance or rating guarantees, certifications or savings promises. No SMS features, cameras or AI sales tools.

## Other launch tasks (unchanged)

Company and legal details, ICO registration, solicitor review of legal pages and the founding-offer terms, trademark check, real call hours, database / spam protection / email accounts connected, analytics with a consent banner, founder experience logos: official files and written permissions for all seven, and the Morley's logo (see `LOGO_CHECKLIST.md`).
