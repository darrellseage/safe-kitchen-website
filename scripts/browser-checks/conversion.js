const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:3000/';
let fails = 0;
const ok = (c, m) => { if (!c) fails++; console.log((c ? 'PASS ' : 'FAIL ') + m); };
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/404|500/.test(m.text())) errs.push(m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle' });

  // 1. Hero: what, who, price, founder
  const hero = p.locator('section[aria-labelledby="hero-title"]');
  const ht = await hero.innerText();
  ok(ht.includes('Designed by chefs and owners, for chefs and owners.'), 'Hero: chefs-and-owners line');
  ok(ht.includes('£14.99') && ht.includes('a month per site + VAT') && ht.includes('Unlimited staff') && ht.includes('Level 2 food hygiene training included') && ht.includes('No set-up fees'), 'Hero: price, per site, VAT, unlimited staff, training, no set-up fees');
  ok(['takeaways', 'restaurants', 'cafés and pubs'].every(a => ht.includes(a)), 'Hero: who it is for');
  ok(ht.includes('Darrell Seage') && ht.includes('15 years'), 'Hero: founder line');
  ok(ht.includes('Early access is free. No card. No commitment.'), 'Hero: free early access');
  // 2. Key messages
  const band = await p.locator('section[aria-labelledby="promises-title"]').innerText();
  ok(['Less paperwork, more kitchen', 'Everything in one system', 'AI that catches costly mistakes', 'Unlimited staff and training', 'Built around the realities of busy professional kitchens'].every(m => band.includes(m)), 'Key messages band: all six messages present');
  // 3. Tour
  await hero.getByRole('link', { name: 'Take the 60-second tour' }).click();
  await p.waitForTimeout(800);
  const tour = p.locator('#tour');
  ok(await tour.getByRole('heading', { name: 'Sam clocks in on his phone' }).isVisible(), 'Tour: starts at step 1');
  await tour.getByRole('button', { name: 'Next step' }).click();
  ok(await tour.getByRole('heading', { name: 'Opening checks in a few taps' }).isVisible(), 'Tour: next step');
  await tour.getByRole('button', { name: /Training/ }).click();
  ok(await tour.getByRole('heading', { name: 'Priya starts her Level 2 course' }).isVisible() && (await tour.innerText()).includes('3 of 6'), 'Tour: jump to a step');
  await tour.getByRole('button', { name: 'Play the tour' }).click();
  ok(await tour.getByRole('button', { name: 'Pause the tour' }).isVisible(), 'Tour: play shows pause');
  await p.waitForTimeout(9500);
  ok(await tour.getByRole('heading', { name: 'Next week’s rota, from a photo' }).isVisible(), 'Tour: plays on to the next step');
  await tour.getByRole('button', { name: 'Pause the tour' }).click();
  await tour.getByRole('link', { name: 'Try the rota import' }).click();
  await p.waitForTimeout(800);
  ok(await p.evaluate(() => location.hash) === '#rotas', 'Tour: "Try it" links to the full demo');
  ok((await tour.innerText()).includes('Planned'), 'Tour: honest status chip shown');
  // 4. Founder
  const f = p.locator('#founder');
  const ft = await f.innerText();
  ok(ft.includes('Darrell Seage') && ft.includes('pan-Asian') && ft.includes('holiday park') && ft.includes('concentrate on cooking, not paperwork'), 'Founder story present');
  ok(await f.locator('img[src*="founder-darrell"]').count() === 1, 'Founder: Darrell\'s own photo shown');
  // 5. Problem section
  const hyg = p.locator('#hygiene-rating');
  const hygText = await hyg.innerText();
  ok(['48%', '52%', '14%'].every(v => hygText.includes(v)) && !hygText.includes('66%'), 'FSA figures: verified 48%, 52%, 14% shown; derived 66% gone');
  ok(hygText.includes('people who order takeaways') && hygText.includes('people who have heard of the scheme'), 'FSA figures: surveyed groups described');
  ok(hygText.includes('published 29 September 2026') && hygText.includes('England, Wales and Northern Ireland (not Scotland)'), 'FSA figures: source date and coverage shown');
  ok(!hygText.includes('Figure being verified'), 'FSA figures: no "being verified" badge');
  // 6. Features
  const tr = await p.locator('#training').innerText();
  ok(tr.includes('£90.01') && tr.includes('£1,050.01') && tr.includes('Level 2 Food Hygiene course') && tr.includes('isn’t an externally accredited'), 'Training: comparison table, Level 2 name and disclosure');
  ok((await p.locator('#rotas').innerText()).includes('Word'), 'Rotas mention Word documents');
  ok(await p.locator('#rotas #clock-in').count() === 1 && (await p.locator('#clock-in').innerText()).includes('£1,560'), 'Clock-in is inside rotas, with its £1,560 line');
  ok(await p.locator('#ordering #food-waste').count() === 1 && (await p.locator('#ordering').innerText()).includes('£5,200'), 'Food waste is inside ordering, with £5,200 line');
  ok((await p.locator('#food-waste').innerText()).includes('WRAP'), 'Food waste keeps the WRAP source');
  ok(await p.locator('#food-safety #inspection').count() === 1, 'Inspection Mode is inside the records section');
  // 7. Buyer tabs
  const by = p.locator('#built-for-you');
  for (const t of ['Head chef', 'Restaurant manager', 'Multi-site operator', 'Takeaway owner']) {
    await by.getByRole('tab', { name: t }).click();
  }
  await by.getByRole('tab', { name: 'Head chef' }).click();
  ok((await by.innerText()).includes('It checks the paperwork, not your team'), 'Buyer tabs: head chef');
  await by.getByRole('tab', { name: 'Multi-site operator' }).click();
  await by.getByRole('button', { name: 'High Street' }).click();
  ok((await by.innerText()).includes('2 to approve'), 'Buyer tabs: multi-site switcher works');
  await by.getByRole('tab', { name: 'Takeaway owner' }).focus();
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
  ok(await by.getByRole('tab', { name: 'Head chef' }).getAttribute('aria-selected') === 'true', 'Buyer tabs: keyboard arrows');
  // 8. Your numbers
  const sav = p.locator('#savings');
  ok((await sav.innerText()).includes('£5,940'), 'Numbers: overall value default net £5,940');
  await sav.getByLabel('Sites').fill('2');
  ok((await sav.innerText()).includes('£299.98'), 'Numbers: two sites doubles the subscription');
  await sav.getByRole('tab', { name: 'Revenue at risk' }).click();
  ok((await sav.innerText()).includes('£15,600'), 'Numbers: revenue at risk £15,600');
  await sav.getByLabel('Weekly turnover').fill('10000');
  ok((await sav.innerText()).includes('£26,000'), 'Numbers: revenue updates to £26,000');
  await sav.getByRole('tab', { name: 'Admin time' }).click();
  ok((await sav.innerText()).includes('hours'), 'Numbers: admin time calculator');
  ok((await sav.innerText()).includes('when you could use one?'), 'Numbers: five systems vs one');
  // 9. Pricing
  const pt = await p.locator('#pricing').innerText();
  ok(pt.includes('£14.99') && pt.includes('£17.99') && pt.includes('£149.99') && pt.includes('£179.99'), 'Pricing: both plans with and without VAT');
  ok(pt.includes('£29.89') && pt.includes('£44.97') && pt.includes('Set-up fees') && pt.includes('12 minutes'), 'Pricing: saving, 3-site example, never-pay list, 12-minute line');
  ok(!pt.includes('Founding customer offer'), 'Pricing: founding offer hidden by default');
  // 10. Trust + FAQ
  const tt = await p.locator('#straight-answers').innerText();
  ok(tt.includes('Built and being tested') && tt.includes('Exporting your records') && tt.includes('Working offline') && tt.includes('isn’t an externally accredited'), 'Trust: status, exports, offline, certificates');
  await p.locator('#faq').getByRole('button', { name: 'How much does it cost?' }).click();
  ok(await p.locator('#faq').getByText('£17.99 including VAT', { exact: false }).isVisible(), 'FAQ opens');
  ok(await p.locator('#faq [data-state]').filter({ has: p.locator('h4') }).count() >= 9, 'FAQ: shortened list present');
  // 11. Calls to action
  const ctas = await p.locator('main').getByRole('link', { name: /early access/i }).count();
  ok(await p.getByRole('link', { name: 'See pricing' }).count() === 0 && ctas <= 4, `Calls to action reduced (early-access links in main: ${ctas})`);
  ok(errs.length === 0, 'No page errors ' + JSON.stringify(errs));

  // 12. Mobile: header button, no overflow, tap targets
  for (const [n, w2, h] of [['mobile', 375, 812], ['tablet', 768, 1024], ['desktop', 1280, 900]]) {
    const q = await b.newPage({ viewport: { width: w2, height: h }, reducedMotion: 'reduce' });
    await q.goto(URL, { waitUntil: 'networkidle' });
    ok(await q.getByRole('banner').getByRole('link', { name: /early access/i }).isVisible(), `${n}: early-access button in header`);
    ok(await q.evaluate(() => document.documentElement.scrollWidth) === w2, `${n}: no sideways scroll`);
    const small = await q.evaluate(() => [...document.querySelectorAll('main button, main a, main input:not([type=hidden]), main select, header a, header button')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height < 44 && !['checkbox','radio'].includes(e.type) && !e.closest('[aria-hidden="true"]') && getComputedStyle(e).display !== 'inline'; }).map(e => (e.textContent || e.id).trim().slice(0, 30)));
    ok(small.length === 0, `${n}: tap targets at least 44px ${JSON.stringify(small)}`);
    const height = await q.evaluate(() => document.documentElement.scrollHeight);
    console.log(`INFO ${n}: page height ${height}px`);
    await q.screenshot({ path: `/tmp/sk-checks-${n}.png`, fullPage: true });
    await q.screenshot({ path: `/tmp/sk-checks-${n}-first-screen.png` });
    await q.close();
  }
  console.log(fails ? `${fails} FAILED` : 'ALL PASSED');
  await b.close();
})();
