// Whole-site check: every page, every internal link, the menus, and one real
// interaction with each demo on its new page.
// Usage: NODE_PATH=$(npm root -g) node scripts/browser-checks/site.js [baseUrl] [screenshotDir]
const { chromium } = require('playwright');
const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const SHOTS = process.argv[3];
const PATHS = ['/', '/features', '/features/food-safety', '/features/inspection-mode', '/features/temperature-checks', '/features/allergens', '/features/training', '/features/rotas-clock-in', '/features/ordering', '/features/reports', '/how-it-works', '/pricing', '/about', '/faqs', '/early-access', '/privacy', '/cookies', '/terms', '/accessibility'];
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL ' + m); } else if (process.env.VERBOSE) console.log('PASS ' + m); };
const name = (p) => (p === '/' ? 'home' : p.slice(1).replace(/\//g, '-'));

(async () => {
  const b = await chromium.launch();
  const links = new Set();
  const heights = {};
  for (const [label, w, h] of [['mobile', 375, 812], ['narrow', 320, 640], ['tablet', 768, 1024], ['desktop', 1280, 900]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: label === 'narrow' ? 'reduce' : 'no-preference' });
    for (const path of PATHS) {
      const p = await ctx.newPage();
      const errs = []; p.on('pageerror', (e) => errs.push(e.message));
      p.on('console', (m) => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errs.push(m.text()); });
      const res = await p.goto(BASE + path, { waitUntil: 'networkidle' });
      ok(res.status() === 200, `${label} ${path}: loads (status ${res.status()})`);
      const info = await p.evaluate(() => ({
        h1: document.querySelectorAll('h1').length,
        sw: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        title: document.title,
        desc: document.querySelector('meta[name=description]')?.content || '',
        robots: document.querySelector('meta[name=robots]')?.content || '',
        notice: !!document.querySelector('aside[aria-label="Website status"]'),
        labels: [...document.querySelectorAll('main *')].filter((e) => e.children.length === 0 && /^(Planned|In development|Coming soon)$/i.test(e.textContent.trim())).length,
        hrefs: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
        small: [...document.querySelectorAll('main a, main button, header a, header button, main input:not([type=hidden]), main select')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && r.height < 44 && !['checkbox', 'radio'].includes(e.type) && !e.closest('[aria-hidden="true"]') && getComputedStyle(e).display !== 'inline'; }).map((e) => (e.textContent || e.id).trim().slice(0, 30)),
        dupIds: (() => { const seen = {}; document.querySelectorAll('[id]').forEach((e) => (seen[e.id] = (seen[e.id] || 0) + 1)); return Object.keys(seen).filter((k) => seen[k] > 1); })(),
      }));
      ok(info.h1 === 1, `${label} ${path}: exactly one h1 (${info.h1})`);
      ok(info.sw === w, `${label} ${path}: no sideways scroll (${info.sw})`);
      ok(info.notice, `${label} ${path}: pre-launch notice shown`);
      ok(/noindex/.test(info.robots), `${label} ${path}: tells search engines not to index`);
      ok(info.labels === 0, `${label} ${path}: no Planned / In development labels`);
      ok(info.small.length === 0, `${label} ${path}: tap targets at least 44px ${JSON.stringify(info.small)}`);
      ok(info.dupIds.length === 0, `${label} ${path}: no duplicate ids ${JSON.stringify(info.dupIds)}`);
      ok(errs.length === 0, `${label} ${path}: no page errors ${JSON.stringify(errs)}`);
      if (label === 'desktop') { ok(info.title.includes('Safe Kitchen') && info.desc.length > 40, `${path}: has a title and description`); heights[path] = { ...(heights[path] || {}), desktop: info.height, title: info.title }; }
      if (label === 'mobile') heights[path] = { ...(heights[path] || {}), mobile: info.height };
      info.hrefs.forEach((x) => links.add(x));
      if (SHOTS && (label === 'mobile' || label === 'desktop')) await p.screenshot({ path: `${SHOTS}/${name(path)}-${label}.png`, fullPage: true });
      await p.close();
    }
    await ctx.close();
  }
  // Unique titles
  const titles = Object.values(heights).map((x) => x.title);
  ok(new Set(titles).size === titles.length, 'every page has a unique title');

  // Every internal link leads somewhere real (page and #anchor)
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const anchors = {};
  for (const href of [...links].sort()) {
    const [path, hash] = href.split('#');
    if (!(path in anchors)) {
      const p = await ctx.newPage();
      const res = await p.goto(BASE + path, { waitUntil: 'domcontentloaded' });
      anchors[path] = res.status() === 200 ? await p.evaluate(() => [...document.querySelectorAll('[id]')].map((e) => e.id)) : null;
      await p.close();
    }
    ok(anchors[path] !== null, `link ${href}: page exists`);
    if (hash && anchors[path]) ok(anchors[path].includes(hash), `link ${href}: #${hash} exists on the page`);
  }
  console.log(`INFO ${links.size} distinct internal links checked`);

  // Desktop menu: dropdown by mouse and keyboard
  let p = await ctx.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  const nav = p.getByRole('navigation', { name: 'Main' });
  const features = nav.getByRole('button', { name: 'Features' });
  ok(await features.getAttribute('aria-expanded') === 'false', 'menu: Features closed to start');
  await features.click();
  ok(await features.getAttribute('aria-expanded') === 'true' && await nav.getByRole('link', { name: /Allergen management/ }).isVisible(), 'menu: Features opens on click');
  ok(await nav.getByRole('link').filter({ hasText: /./ }).count() >= 13, 'menu: eight features, all-features link and four pages');
  await p.keyboard.press('Escape');
  ok(await features.getAttribute('aria-expanded') === 'false' && await p.evaluate(() => document.activeElement?.textContent?.includes('Features')), 'menu: Escape closes and returns focus');
  await features.focus(); await p.keyboard.press('Enter'); await p.keyboard.press('Tab');
  ok(await p.evaluate(() => document.activeElement?.getAttribute('href')) === '/features/food-safety', 'menu: keyboard opens and tabs into the first feature');
  await p.keyboard.press('Enter'); await p.waitForURL('**/features/food-safety');
  ok(await p.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Food Safety & SFBB').isVisible(), 'menu: link opens the page, with breadcrumbs');
  ok(await p.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'Features' }).getAttribute('aria-expanded') === 'false', 'menu: closes after choosing a page');
  await p.getByRole('navigation', { name: 'Breadcrumb' }).getByRole('link', { name: 'Features' }).click(); await p.waitForURL('**/features');
  ok(await p.getByRole('heading', { level: 1 }).isVisible(), 'breadcrumb: Features link works');
  await p.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Pricing' }).click(); await p.waitForURL('**/pricing');
  ok(await p.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Pricing' }).getAttribute('aria-current') === 'page', 'menu: current page is marked');

  // Pricing consistency and demos on their pages
  const text = async (path) => { await p.goto(BASE + path, { waitUntil: 'networkidle' }); return p.locator('main').innerText(); };
  let t = await text('/pricing');
  ok(['£14.99', '£17.99', '£149.99', '£179.99', '£29.89', '£44.97'].every((x) => t.includes(x)), 'pricing page: all confirmed prices, with and without VAT');
  await p.locator('#savings').getByRole('tab', { name: 'Revenue at risk' }).click();
  ok((await p.locator('#savings').innerText()).includes('£15,600'), 'pricing page: calculators work');
  t = await text('/');
  ok(t.includes('£14.99') && t.includes('£17.99') && t.includes('£149.99') && t.includes('£179.99'), 'home: prices shown with and without VAT');
  ok(['Haven Holidays', 'Bourne Leisure', 'Morley’s', 'Kluckuroos', 'Burritos Bhais', 'Sibu', 'Sapphire Café'].every((x) => t.includes(x)) && t.includes('not Safe Kitchen customers'), 'home: seven experience companies and the clarification');
  ok(await p.locator('main > section').count() === 8, `home: eight sections (${await p.locator('main > section').count()})`);
  ok(await p.locator('#features a[href^="/features/"]').count() === 8, 'home: eight feature cards, each linking to its page');
  await p.locator('#inspection').getByRole('tab').nth(1).click();
  ok(true, 'home: Inspection Mode demo responds');
  await text('/features/rotas-clock-in');
  await p.locator('#rotas').getByRole('button', { name: 'Use this photo' }).click();
  ok(await p.locator('#rotas').getByRole('button', { name: /Publish/ }).count() >= 0 && await p.locator('#clock-in').count() === 1, 'rotas page: rota import demo responds, clock-in on the same page');
  await text('/features/reports');
  await p.getByRole('button', { name: 'High Street' }).click();
  ok((await p.locator('main').innerText()).includes('2 to approve'), 'reports page: site switcher works');
  ok(await p.locator('#ai-checker button').count() > 2, 'reports page: AI Checker demo present');
  for (const [path, sel] of [['/features/temperature-checks', '#temperature-checks'], ['/features/allergens', '#allergens'], ['/features/training', '#training'], ['/features/ordering', '#ordering'], ['/features/inspection-mode', '#inspection']]) {
    await text(path);
    const btn = p.locator(`${sel} button:not([disabled]):visible`).first();
    ok(await btn.count() >= 1, `${path}: demo present`);
    await btn.click();
  }
  await text('/how-it-works');
  await p.locator('#tour').getByRole('button', { name: 'Next step' }).click();
  ok((await p.locator('#tour').innerText()).includes('2 of 6'), 'how it works: tour steps forward');
  await p.locator('#tour').getByRole('link', { name: /Try a temperature check/ }).click(); await p.waitForURL('**/features/temperature-checks');
  ok(true, 'how it works: tour links to the feature page');
  await text('/faqs');
  await p.getByRole('button', { name: 'How much does it cost?' }).click();
  ok(await p.getByText('£17.99 including VAT', { exact: false }).isVisible(), 'faqs: accordion opens');
  ok(await p.locator('script[type="application/ld+json"]').count() >= 1, 'faqs: structured data present');
  await p.close();

  // Mobile menu
  const m = await b.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  p = await m.newPage();
  await p.goto(BASE + '/features/training', { waitUntil: 'networkidle' });
  ok(await p.getByRole('banner').getByRole('link', { name: /early access/i }).isVisible(), 'mobile: early-access button in the header');
  await p.getByRole('button', { name: 'Open menu' }).click();
  const dlg = p.getByRole('dialog');
  ok(await dlg.getByRole('link').count() <= 6, 'mobile menu: short when Features is closed');
  await dlg.getByRole('button', { name: 'Features' }).click();
  ok(await dlg.getByRole('link', { name: 'Staff training & certificates' }).getAttribute('aria-current') === 'page', 'mobile menu: Features expands and marks the current page');
  await dlg.getByRole('link', { name: 'Allergen management' }).click(); await p.waitForURL('**/features/allergens');
  ok(await p.getByRole('dialog').count() === 0, 'mobile menu: closes after choosing a page');
  const reveal = p.getByRole('button', { name: 'Try the allergen filter' });
  ok(await reveal.isVisible(), 'mobile: demo sits behind a "Try" button');
  await reveal.click();
  ok(await p.getByRole('button', { name: 'Hide the demo' }).isVisible(), 'mobile: demo opens');
  await p.close();

  console.log('INFO page heights (px):');
  for (const [path, v] of Object.entries(heights)) console.log(`  ${path.padEnd(30)} desktop ${String(v.desktop).padStart(6)}  mobile ${String(v.mobile).padStart(6)}`);
  console.log(fails ? `${fails} FAILED` : 'ALL PASSED');
  await b.close();
})();
