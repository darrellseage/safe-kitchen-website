const { chromium } = require('playwright');
const OUT = process.argv[2];
(async () => {
  const b = await chromium.launch();
  for (const [name, w, h] of [['desktop', 1280, 900], ['mobile', 375, 812], ['narrow', 320, 640]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    const reqs = []; p.on('response', r => reqs.push({ url: r.url(), type: r.request().resourceType(), size: Number(r.headers()['content-length'] || 0) }));
    const t0 = Date.now();
    await p.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    const load = Date.now() - t0;
    const m = await p.evaluate(async () => {
      const lcp = await new Promise(res => { let v = 0; new PerformanceObserver(l => { for (const e of l.getEntries()) v = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true }); setTimeout(() => res(v), 800); });
      const cls = await new Promise(res => { let v = 0; new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) v += e.value; }).observe({ type: 'layout-shift', buffered: true }); setTimeout(() => res(v), 300); });
      const text = document.querySelector('main').innerText;
      const heads = [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName + ' ' + h.textContent.trim().slice(0, 60));
      const imgs = [...document.images]; const noAlt = imgs.filter(i => !i.hasAttribute('alt')).length;
      const ctas = [...document.querySelectorAll('main a, main button')].filter(e => /early access|demo|book a call|pricing/i.test(e.textContent)).length;
      const sections = [...document.querySelectorAll('main > section')].map(s => [s.id || s.getAttribute('aria-labelledby'), Math.round(s.getBoundingClientRect().height)]);
      return { lcp: Math.round(lcp), cls: +cls.toFixed(3), words: text.split(/\s+/).length, heads, images: imgs.length, noAlt, ctas, sections, height: document.documentElement.scrollHeight, dom: document.querySelectorAll('*').length, scrollW: document.documentElement.scrollWidth };
    });
    const js = reqs.filter(r => r.type === 'script'); const css = reqs.filter(r => r.type === 'stylesheet'); const img = reqs.filter(r => r.type === 'image'); const font = reqs.filter(r => r.type === 'font');
    const sum = a => Math.round(a.reduce((n, r) => n + r.size, 0) / 1024);
    console.log(JSON.stringify({ name, w, loadMs: load, requests: reqs.length, jsKB: sum(js), jsFiles: js.length, cssKB: sum(css), imgKB: sum(img), imgFiles: img.length, fontKB: sum(font), ...m }, null, 1));
    await p.screenshot({ path: `${OUT}/before-${name}-first.png` });
    await p.screenshot({ path: `${OUT}/before-${name}-full.png`, fullPage: true });
    await ctx.close();
  }
  await b.close();
})();
