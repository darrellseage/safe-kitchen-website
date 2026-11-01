const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://localhost:3000/';
let fails = 0;
const ok = (c, m) => { if (!c) fails++; console.log((c ? 'PASS ' : 'FAIL ') + m); };
async function open(b, hash = '') {
  const p = await b.newPage({ viewport: { width: 375, height: 812 } });
  await p.goto(URL + hash, { waitUntil: 'networkidle' });
  const f = p.locator('#early-access');
  await f.scrollIntoViewIfNeeded();
  return [p, f];
}
(async () => {
  const b = await chromium.launch();
  // Early access: step 1 only, then skip
  let [p, f] = await open(b);
  ok(/step 1 of 2/i.test(await f.innerText()) && (await f.innerText()).includes('we save your email address and your choice'), 'Step 1 explains what is saved before sending');
  ok(await f.getByRole('checkbox').isChecked() === false, 'Marketing box starts unticked');
  await f.getByLabel('Email', { exact: true }).fill('not-an-email');
  await p.waitForTimeout(2700);
  await f.getByRole('button', { name: 'Join early access' }).click();
  await f.getByRole('alert').waitFor();
  ok((await f.getByRole('alert').innerText()).includes('Enter an email address'), 'Step 1: invalid email is explained');
  await f.getByLabel('Email', { exact: true }).fill('owner@example.co.uk');
  await f.getByRole('button', { name: 'Join early access' }).click();
  await f.getByText('You’re on the early-access list.').waitFor();
  ok(await p.evaluate(() => document.activeElement?.textContent?.includes('You’re on the early-access list.')), 'Step 2: focus moves to the confirmation');
  ok(await f.getByRole('button', { name: 'Skip for now' }).isVisible(), 'Early access: details are optional (Skip)');
  await f.getByRole('button', { name: 'Skip for now' }).click();
  ok(await f.getByText('We’ll be in touch personally').isVisible(), 'Early access: skip finishes');
  await p.close();

  // Demo: details required
  [p, f] = await open(b, '#request-demo');
  ok(await f.getByRole('radio', { name: 'Request a demo' }).isChecked(), '#request-demo preselects demo');
  await f.getByLabel('Email', { exact: true }).fill('chef@example.co.uk');
  await p.waitForTimeout(2700);
  await f.getByRole('button', { name: 'Continue' }).click();
  await f.getByText('One more step to arrange your demo').waitFor();
  ok(await f.getByRole('button', { name: 'Skip for now' }).count() === 0, 'Demo: no skip');
  await f.getByRole('button', { name: 'Request my demo' }).click();
  await f.getByRole('alert').waitFor();
  ok((await f.getByRole('alert').innerText()).includes('Enter your name'), 'Demo: missing details explained');
  await f.getByLabel('Your name').fill('Sam Patel');
  await f.getByLabel('Type of business').selectOption('takeaway');
  await f.getByLabel('Number of sites').selectOption('1');
  await f.getByRole('button', { name: 'Request my demo' }).click();
  await f.getByText('Thanks. We’ll email you to arrange your demo.').waitFor();
  ok(await f.getByText('Thanks. We’ll email you to arrange your demo.').isVisible(), 'Demo: sent without a business name');
  await p.close();

  // Call: book a slot, then it's gone for the next visitor
  [p, f] = await open(b, '#book-a-call');
  await f.getByLabel('Email', { exact: true }).fill('manager@example.co.uk');
  await p.waitForTimeout(2700);
  await f.getByRole('button', { name: 'Continue' }).click();
  await f.getByText('One more step to book your call').waitFor();
  const first = f.locator('input[name="slot"]').first();
  await first.waitFor({ state: 'attached' });
  const slotValue = await first.getAttribute('value');
  await first.locator('xpath=..').click();
  await f.getByLabel('Your name').fill('Jo Walsh');
  await f.getByLabel('Type of business').selectOption('restaurant');
  await f.getByLabel('Number of sites').selectOption('2-5');
  await f.getByRole('button', { name: 'Book my call' }).click();
  await f.getByText('Your call is booked for').waitFor();
  ok(true, 'Call: booked ' + (await f.getByText('Your call is booked for').innerText()));
  await p.close();
  [p, f] = await open(b, '#book-a-call');
  await f.getByLabel('Email', { exact: true }).fill('next@example.co.uk');
  await p.waitForTimeout(2700);
  await f.getByRole('button', { name: 'Continue' }).click();
  await f.locator('input[name="slot"]').first().waitFor({ state: 'attached' });
  ok(await f.locator(`input[name="slot"][value="${slotValue}"]`).count() === 0, 'Call: the booked time is no longer offered');
  await p.close();
  console.log(fails ? `${fails} FAILED` : 'ALL PASSED');
  await b.close();
})();
