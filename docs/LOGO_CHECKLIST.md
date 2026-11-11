# Logo checklist

> **Rule:** logos are only ever supplied by the owner or by the company itself. They are never copied from search results, logo libraries or similarly named businesses. A company without a supplied logo is shown as its name.
> **Where it's used:** `src/content/experience.ts` (data) and `src/components/home/experience-band.tsx` (display). To add a logo: put the official file in `public/logos/`, set `logo: { src, width, height }` on that company, and tick the row below.

## A. Founder professional experience (previous employers)

Shown under **"Built on real hospitality experience"**, directly beneath the homepage hero and on the About page, as one scrolling row of logos with no other text (owner instruction, 11 November 2026: no disclaimer and no text under the logos; the heading gives the context).

**Source of the logo files:** all six were cropped from one image the owner supplied on 11 November 2026 (a sheet of six logos, 1774 × 887 pixels). They are stored in `public/logos/`. No file was taken from the internet.

| Company (as on the logo) | Owner's wording | File | Status | Outstanding |
|---|---|---|---|---|
| Sapphire | Sapphire Café | `sapphire.png` | Shown | Official file from the business; permission not recorded |
| Burrito Bhais | Burritos Bhais | `burrito-bhais.png` | Shown | Official file; permission not recorded; **spelling differs from the owner's list** |
| Kluckaroo's | Kluckuroos | `kluckaroos.png` | Shown | Official file; permission not recorded; **spelling differs from the owner's list** |
| Sibu (Asian Soul Food) | Sibu | `sibu.png` | Shown | Official file; permission not recorded |
| Haven | Haven Holidays | `haven.png` | Shown | **Not checked against Haven's official logo**; official file and permission from Haven's brand team |
| Bourne Leisure | Bourne Leisure | `bourne-leisure.png` | Shown | **Not checked against Bourne Leisure's official logo**; official file and permission |
| Morley's | Morley's | none | **Shown as a name** | No logo was in the supplied image. Owner to confirm which Morley's and supply its logo |

**Things to resolve before the site goes public**
1. **Authenticity.** The supplied sheet looks like a prepared mock-up rather than files from each company, and it is low resolution (each logo is about 350 to 480 pixels wide). Outside websites are blocked in the working session, so none of the six could be compared with the company's official logo. Replace each with the official file (SVG preferred) from the company.
2. **Permission.** A logo is the company's trade mark. The site no longer carries a line saying these are past employers rather than customers or partners, so a visitor could read the row as endorsement. Written permission from each company, especially Haven and Bourne Leisure, is the safeguard. This is recorded as an open risk for the owner and the solicitor review.
3. **Morley's** logo.
4. **Spellings** of Burrito Bhais / Burritos Bhais and Kluckaroo's / Kluckuroos (the logo spelling is used for the image description).

## B. Safe Kitchen customers and pilot kitchens

A separate section (`customers` in `src/content/experience.ts`), never mixed with section A. **Empty and not shown.**

| Business | Relationship (pilot / customer) | Written agreement to be named | Logo file from the business | Shown |
|---|---|---|---|---|
| – | – | – | – | – |

A business is added only after it has agreed in writing to be named as a pilot kitchen or customer.
