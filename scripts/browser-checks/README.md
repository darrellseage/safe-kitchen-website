# Browser checks

End-to-end checks run in a real browser (Playwright, pre-installed in Claude
cloud sessions). Start the site first with `npm run dev` (port 3000).

| Script | What it checks |
|---|---|
| `demos.js` | Every interactive demo (rota import, clock-in, AI Checker, ordering, temperature, training, Inspection Mode), no sideways scroll, reduced motion, tap targets at 375/768/1280px |
| `conversion.js` | Hero, key messages, tour, founder, sections, buyer tabs, calculators, pricing (with and without VAT), trust section, FAQ, number of calls to action, page heights |
| `form.js` | Two-step sign-up: early access + skip, demo, call booking (booked time then disappears) |
| `mobile.js` | Phone layout: every "Try the demo" button, selling points visible without opening demos, menu |
| `navigation.js` | From every legal page, header, footer and phone-menu links open the homepage at the right section (add `.html` as a second argument for the static preview) |
| `form-production.js` | Run against `npm run build && npm run start` with no database: every genuine sign-up, including one corrected straight after an error, gets the honest "not open yet" message and is never treated as a bot |

Run from any folder, pointing Node at the global Playwright:

```bash
NODE_PATH=$(npm root -g) node scripts/browser-checks/conversion.js http://localhost:3000/
```

`form.js` uses the in-memory store and the rate limiter (10 sends per 10
minutes per connection): restart `npm run dev` between repeated runs.
Against the static preview (`.preview-publish` served on a port) two checks
are expected to differ: the founding offer is shown, and booked call times
aren't removed (the preview saves nothing).
