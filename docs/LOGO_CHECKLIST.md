# Logo checklist

> **Rule:** a logo appears on the website only when its row here is complete: the right company identified, an official logo file obtained from the company itself, and permission recorded. Until then the company's name is shown as text in the site's own typeface. Logos are never copied from search results, logo libraries or similarly named businesses.
> **Where it's used:** `src/content/experience.ts` (data) and `src/components/home/experience-band.tsx` (display). To add a logo: put the official file in `public/logos/`, set `logo: { src, width, height }` on that company, and tick the row below.

## A. Founder professional experience (previous employers)

Shown under **"Built on real hospitality experience"**, directly beneath the homepage hero and on the About page, with the clarification: *"Places Darrell has worked. They are not Safe Kitchen customers, and they don't use, endorse, sponsor or partner with Safe Kitchen."*

Confirmed by the owner on 11 November 2026. Status as of that date: **all seven shown as text; no logo files held; no permissions recorded.**

| Company | Which business exactly? | Official logo source | Logo file held | Permission to show logo | Shown as |
|---|---|---|---|---|---|
| Haven Holidays | UK holiday park operator (haven.com), part of Bourne Leisure | Haven's press office / brand team | No | **Not requested** | Text |
| Bourne Leisure | Parent group of Haven (also Butlin's and Warner Hotels) | Bourne Leisure corporate communications | No | **Not requested** | Text |
| Morley's | **Owner to confirm** which business and branch (there is a well-known south London fried chicken chain of this name, and other unrelated businesses) | The business itself | No | **Not requested** | Text |
| Kluckuroos | **Owner to confirm** location and website | The business itself | No | **Not requested** | Text |
| Burritos Bhais | **Owner to confirm** location and website | The business itself | No | **Not requested** | Text |
| Sibu | **Owner to confirm** location and website (not to be confused with similarly named businesses) | The business itself | No | **Not requested** | Text |
| Sapphire Café | **Owner to confirm** location and website (a common name) | The business itself | No | **Not requested** | Text |

**Why no logos yet**
- Official logo files could not be obtained in this working session: outside websites are blocked by the session's network settings, and for five of the seven the exact business needs the owner's confirmation first.
- A company's logo is its trade mark. Stating truthfully that Darrell worked there is fine; showing the logo is safest with a short written permission, especially from large groups (Haven and Bourne Leisure have brand guidelines).
- Haven and Bourne Leisure are parent and subsidiary. Both are listed because the owner asked for both.

**What the owner needs to do for each company**
1. Confirm the exact business (website or address) where it's marked above.
2. Ask for permission to show the logo on the Safe Kitchen website as a past employer (a one-line email is enough), and keep the reply.
3. Send the official logo file (SVG preferred, or a high-resolution PNG) supplied by the company.
4. Tell Claude: it will add the file, tick the row and switch that company from text to logo.

## B. Safe Kitchen customers and pilot kitchens

A separate section (`customers` in `src/content/experience.ts`), never mixed with section A. **Empty and not shown.**

| Business | Relationship (pilot / customer) | Written agreement to be named | Logo file from the business | Shown |
|---|---|---|---|---|
| – | – | – | – | – |

A business is added only after it has agreed in writing to be named as a pilot kitchen or customer.
