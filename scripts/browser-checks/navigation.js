// Header, footer and phone-menu links on every legal page lead to the right homepage section.
// Usage: node navigation.js http://localhost:3000/   (static preview: add ".html" as a second argument)
const { chromium } = require('playwright');
const B=process.argv[2]||'http://localhost:3000/'; const ext=process.argv[3]||'';
(async()=>{const b=await chromium.launch();let fails=0;const ok=(c,m)=>{if(!c)fails++;console.log((c?'PASS ':'FAIL ')+m)};
 // The site scrolls smoothly, so wait until scrolling has stopped before measuring.
 const settle=async p=>{let last=-1;for(let i=0;i<40;i++){await p.waitForTimeout(150);const y=await p.evaluate(()=>scrollY);if(y===last)return;last=y}};
 for(const pg of ['privacy','cookies','terms','accessibility']){
  for(const [w,where,name,hash] of [[1280,'nav[aria-label="Main"]','Pricing','pricing'],[1280,'footer nav[aria-label="Footer"]','Tour','tour'],[375,'header','Early access','early-access']]){
   const p=await b.newPage({viewport:{width:w,height:900}});await p.goto(B+pg+ext,{waitUntil:'networkidle'});
   await p.locator(where).getByRole('link',{name,exact:true}).first().click();
   await p.waitForURL(u=>u.hash==='#'+hash,{timeout:8000}).catch(()=>{});await p.waitForTimeout(300);await settle(p);
   const r=await p.evaluate(h=>{const e=document.getElementById(h);return {url:location.pathname+location.hash, has:!!e, top:e?Math.round(e.getBoundingClientRect().top):null}},hash);
   ok(r.has&&r.top!==null&&r.top<900&&r.top>-200,`/${pg}${ext} → "${name}" (${w}px) lands on homepage #${hash} [${r.url}, top ${r.top}]`);await p.close();}}
 // menu (phone) from privacy
 const p=await b.newPage({viewport:{width:375,height:812}});await p.goto(B+'privacy'+ext,{waitUntil:'networkidle'});
 await p.getByRole('button',{name:'Open menu'}).click();await p.getByRole('dialog').getByRole('link',{name:'Training'}).click();await p.waitForURL(u=>u.hash==='#training',{timeout:8000}).catch(()=>{});await p.waitForTimeout(300);await settle(p);
 ok(await p.evaluate(()=>{const e=document.getElementById('training');const t=e&&e.getBoundingClientRect().top;return location.hash==='#training'&&t>-200&&t<812}),`/privacy${ext} phone menu → Training works`);
 console.log(fails?fails+' FAILED':'ALL PASSED');await b.close();process.exit(fails?1:0)})();
