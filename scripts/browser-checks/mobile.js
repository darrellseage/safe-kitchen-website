const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:3000/';
let fails = 0; const ok = (c, m) => { if (!c) fails++; console.log((c ? 'PASS ' : 'FAIL ') + m); };
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL, { waitUntil: 'networkidle' });
  console.log('INFO phone height', await p.evaluate(() => document.documentElement.scrollHeight));
  const labels = ['See the before and after', 'Try the training course demo', 'Try the AI Checker demo', 'Try the rota import demo', 'Try the clock-in demo', 'Try the order check demo', 'Try a temperature check', 'Try Inspection Mode', 'Try the calculators'];
  for (const l of labels) {
    const named = p.getByRole('button', { name: l });
    ok(await named.count() === 1, `button present: ${l}`);
    const ctl = await named.getAttribute('aria-controls');
    const btn = p.locator(`button[aria-controls="${ctl}"]`);
    const panel = p.locator('#' + CSS_escape(ctl));
    ok(!(await panel.isVisible()), `  closed by default`);
    await btn.click();
    ok(await panel.isVisible() && await btn.getAttribute('aria-expanded') === 'true' && (await btn.innerText()).includes('Hide the demo'), `  opens`);
  }
  // A demo still works once opened (rota)
  const rota = p.locator('#rotas');
  await rota.getByRole('button', { name: 'Use this photo' }).click();
  ok((await rota.innerText()).length > 0, 'rota demo responds after opening');
  await p.locator('#savings').getByRole('tab', { name: 'Revenue at risk' }).click();
  ok((await p.locator('#savings').innerText()).includes('£15,600'), 'calculators work after opening');
  // Selling points still visible without opening anything
  const q = await b.newPage({ viewport: { width: 375, height: 812 } });
  await q.goto(URL, { waitUntil: 'networkidle' });
  for (const [id, t] of [['training', '£1,050.01'], ['pricing', '£17.99'], ['pricing', '£179.99'], ['ai-checker', 'Missing temperature checks'], ['ordering', 'Duplicate orders'], ['rotas', 'Take a photo of your rota'], ['early-access', 'Join early access']]) {
    ok((await q.locator('#' + id).innerText()).includes(t), `visible without demos: #${id} "${t}"`);
  }
  ok(await q.getByRole('banner').getByRole('link', { name: /early access/i }).isVisible(), 'header early-access button visible');
  ok(await q.evaluate(() => document.documentElement.scrollWidth) === 375, 'no sideways scroll');
  await q.getByRole('button', { name: 'Open menu' }).click();
  await q.getByRole('dialog').getByRole('link', { name: 'Pricing' }).click();
  await q.waitForTimeout(900);
  ok(await q.evaluate(() => location.hash) === '#pricing', 'menu jumps to pricing');
  await q.screenshot({ path: '/tmp/sk-checks-phone-full.png', fullPage: true });
  ok(errs.length === 0, 'no page errors ' + JSON.stringify(errs));
  console.log(fails ? `${fails} FAILED` : 'ALL PASSED');
  await b.close();
})();
function CSS_escape(s) { return s.replace(/([:.\[\]()#])/g, '\\$1'); }
