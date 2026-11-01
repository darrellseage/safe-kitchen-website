const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:3000/';
const ok = (c, m) => console.log((c ? 'PASS ' : 'FAIL ') + m);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/404|500/.test(m.text())) errs.push(m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle' });

  // Rotas
  const rota = p.locator('#rotas');
  await rota.getByRole('button', { name: 'Use this photo' }).click();
  await rota.getByText('Reading your rota…').waitFor();
  await rota.getByText('5 shifts found').or(rota.getByText(/shifts found/)).first().waitFor({ timeout: 4000 });
  const publish = rota.getByRole('button', { name: 'Publish rota' });
  ok(await publish.isDisabled(), 'Rotas: Publish disabled while items need checking');
  ok(await rota.getByText('2 to check').isVisible() && await rota.getByText('1 person to match').isVisible(), 'Rotas: summary shows 2 to check and 1 person to match');
  while (await rota.getByRole('button', { name: /^Check / }).count()) await rota.getByRole('button', { name: /^Check / }).first().click();
  ok(await publish.isDisabled(), 'Rotas: still disabled until the person is matched');
  await rota.getByRole('combobox').selectOption('Jo Walsh');
  ok(await publish.isEnabled(), 'Rotas: Publish enabled once everything is resolved');
  await publish.click();
  ok(await rota.getByText('Publish and notify 3 staff?').isVisible(), 'Rotas: confirmation names the number of staff');
  await rota.getByRole('button', { name: 'Publish and notify' }).click();
  ok(await rota.getByText('3 staff notified (demo)').isVisible(), 'Rotas: published');
  await p.screenshot({ path: '/tmp/sk-checks-rota.png' });

  // Clock-in
  const clock = p.locator('#clock-in');
  await clock.getByRole('button', { name: 'What if my location can’t be confirmed?' }).click();
  await clock.getByText('We couldn’t confirm your location.').waitFor();
  ok(true, 'Clock-in: calm failure message with alternatives');
  await clock.getByRole('button', { name: 'Use the tablet PIN' }).click();
  ok((await clock.getByRole('button', { name: 'Tablet PIN', exact: true }).getAttribute('aria-pressed')) === 'true', 'Clock-in: switches to tablet PIN');
  await clock.getByRole('button', { name: 'Clock in', exact: true }).click();
  await clock.getByText('Clocked in · 16:56').waitFor();
  ok(await clock.getByText('kitchen tablet PIN').isVisible(), 'Clock-in: recorded via tablet PIN');
  ok(await clock.getByText('✓ In 16:56').isVisible(), 'Clock-in: manager board updates');
  ok(await clock.getByText('9 min late').isVisible(), 'Clock-in: lateness worked out (9 min)');
  await clock.getByRole('button', { name: 'Export timesheet' }).click();
  ok(await clock.getByText(/Timesheet ready as Excel or CSV/).isVisible(), 'Clock-in: timesheet export message');
  await p.screenshot({ path: '/tmp/sk-checks-clock.png' });

  // AI Checker
  const ai = p.locator('#ai-checker');
  await ai.scrollIntoViewIfNeeded(); await p.waitForTimeout(1600);
  await ai.getByRole('button', { name: /Closing clean incomplete/ }).click();
  ok(await ai.locator('#ai-why').getByText('two of the five items weren’t ticked', { exact: false }).isVisible(), 'AI Checker: opening a flag explains why');
  await ai.getByRole('button', { name: 'weekly' }).click();
  ok(await ai.getByText('318', { exact: true }).isVisible() && await ai.getByText('Weekly summary · This week').isVisible(), 'AI Checker: weekly switch updates numbers and report');
  await p.screenshot({ path: '/tmp/sk-checks-ai.png' });

  // Ordering
  const ord = p.locator('#ordering');
  await ord.getByRole('button', { name: 'Add 20 kg' }).click();
  await ord.getByText('Possible duplicate order detected').waitFor(); ok(true, 'Ordering: duplicate detected');
  ok(await ord.getByText('£124.00').isVisible(), 'Ordering: illustrative duplicate spend £124.00');
  await ord.getByRole('button', { name: 'View existing order' }).click();
  await ord.getByRole('button', { name: 'Remove from this order' }).click();
  await ord.getByRole('button', { name: 'Approve and send' }).click();
  await ord.getByText('Sent · waiting for the supplier to accept.').waitFor();
  ok(true, 'Ordering: approved and sent, shown as waiting for acceptance (not accepted)');
  await p.screenshot({ path: '/tmp/sk-checks-order.png' });
  ok(errs.length === 0, 'No page errors ' + JSON.stringify(errs));

  for (const [n, w, h] of [['mobile', 375, 812], ['tablet', 768, 1024], ['desktop', 1280, 900]]) {
    const q = await b.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    await q.goto(URL, { waitUntil: 'networkidle' });
    // On phones every demo sits behind a "Try the demo" button: open them all first.
    const ids = await q.evaluate(() => [...document.querySelectorAll('button[aria-expanded="false"][aria-controls]')].filter(b => /^(Try |See the before)/.test(b.textContent.trim()) && getComputedStyle(b).display !== 'none').map(b => b.getAttribute('aria-controls')));
    for (const id of ids) await q.locator(`button[aria-controls="${id}"]`).click();
    await q.locator('#rotas').getByRole('button', { name: 'Use this photo' }).click();
    await q.waitForTimeout(400);
    ok(await q.evaluate(() => document.documentElement.scrollWidth) === w, `${n}: no sideways scroll (with rota grid open)`);
    const hidden = await q.evaluate(() => [...document.querySelectorAll('main h2, main h3, main li')].filter(h => { if (h.closest('[aria-hidden="true"]')) return false; let e = h; while (e) { if (getComputedStyle(e).opacity === '0') return true; e = e.parentElement; } return false; }).map(h => h.textContent.slice(0, 30)));
    ok(hidden.length === 0, `${n}: reduced motion leaves nothing invisible ${JSON.stringify(hidden)}`);
    const small = await q.evaluate(() => [...document.querySelectorAll('main button, main a, main input:not([type=hidden]), main select')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height < 44 && !['checkbox','radio'].includes(e.type) && !e.closest('[aria-hidden="true"]') && getComputedStyle(e).display !== 'inline'; }).map(e => (e.textContent || e.id).trim().slice(0, 30)));
    ok(small.length === 0, `${n}: tap targets at least 44px ${JSON.stringify(small)}`);
    await q.screenshot({ path: `/tmp/sk-checks-${n}.png`, fullPage: true });
    await q.close();
  }
  await b.close();
})();
