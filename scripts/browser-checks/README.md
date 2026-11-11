# Browser checks

End-to-end checks run in a real browser (Playwright, pre-installed in Claude
cloud sessions). Start the site first with `npm run dev` (port 3000).

| Script | What it checks |
|---|---|
| `site.js` | Every page at 320, 375, 768 and 1280px: loads, one h1, no sideways scroll, tap targets, no duplicate ids, no page errors, pre-launch notice, no-index, no "Planned" labels; every internal link and #anchor; the Features dropdown by mouse and keyboard; breadcrumbs; the mobile menu; prices; the experience band; one real interaction with each demo on its page. Optional second argument: a folder for full-page screenshots. |
| `form.js` | The two-step sign-up on `/early-access`: early access + skip, demo, call booking (the booked time then disappears). |

```bash
NODE_PATH=$(npm root -g) node scripts/browser-checks/site.js http://localhost:3000 docs/review/restructure
NODE_PATH=$(npm root -g) node scripts/browser-checks/form.js http://localhost:3000
```

`form.js` uses the in-memory store and the rate limiter (10 sends per 10
minutes per connection): restart `npm run dev` between repeated runs.
