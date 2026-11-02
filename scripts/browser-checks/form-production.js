// Run against a production build with no database (`npm run build && npm run start`).
// A genuine person must never be mistaken for a bot: the spam filter answers bots
// with a fake success and saves nothing, so with no database every genuine
// sign-up has to get the honest "not open yet" message instead.
const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:3000/';
let fails = 0;
const ok = (c, m) => { if (!c) fails++; console.log((c ? 'PASS ' : 'FAIL ') + m); };
const honest = 'Sign-ups aren’t open just yet';
async function open(b, hash = '') {
  const p = await b.newPage({ viewport: { width: 375, height: 812 } });
  await p.goto(URL + hash, { waitUntil: 'networkidle' });
  const f = p.locator('#early-access');
  await f.scrollIntoViewIfNeeded();
  return [p, f];
}
(async () => {
  const b = await chromium.launch();
  // 1. Straight through.
  let [p, f] = await open(b);
  await f.getByLabel('Email', { exact: true }).fill('owner@example.co.uk');
  await p.waitForTimeout(2700);
  await f.getByRole('button', { name: 'Join early access' }).click();
  await f.getByText(honest).waitFor({ timeout: 10000 }).catch(() => {});
  ok(await f.getByText(honest).isVisible(), 'Genuine sign-up gets the honest "not open yet" message');
  await p.close();

  // 2. Mistake, then a quick correction (the case that used to be treated as a bot).
  [p, f] = await open(b);
  await f.getByLabel('Email', { exact: true }).fill('not-an-email');
  await p.waitForTimeout(2700);
  await f.getByRole('button', { name: 'Join early access' }).click();
  await f.getByRole('alert').waitFor();
  await f.getByLabel('Email', { exact: true }).fill('owner@example.co.uk');
  await f.getByRole('button', { name: 'Join early access' }).click();
  await f.getByText(honest).waitFor({ timeout: 10000 }).catch(() => {});
  ok(await f.getByText(honest).isVisible() && !(await f.getByText('You’re on the early-access list.').count()), 'Quick correction after an error is not mistaken for a bot');
  await p.close();

  // 3. Demo request, also corrected quickly.
  [p, f] = await open(b, '#request-demo');
  await f.getByLabel('Email', { exact: true }).fill('chef@');
  await p.waitForTimeout(2700);
  await f.getByRole('button', { name: 'Continue' }).click();
  await f.getByRole('alert').waitFor();
  await f.getByLabel('Email', { exact: true }).fill('chef@example.co.uk');
  await f.getByRole('button', { name: 'Continue' }).click();
  await f.getByText(honest).waitFor({ timeout: 10000 }).catch(() => {});
  ok(await f.getByText(honest).isVisible(), 'Demo request: quick correction is not mistaken for a bot');
  await p.close();

  console.log(fails ? fails + ' FAILED' : 'ALL PASSED');
  await b.close();
  process.exit(fails ? 1 : 0);
})();
