import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { A01_REVIEW_TARGET } from '../../js/data/review-store.js';
import { T25_ATOMIC_CARDS } from '../../js/data/t25-atomic-arcs.js';
import { fixture, USER } from './fixture.mjs';

let server, browser, base;
before(async()=>{
 server=createServer(async(req,res)=>{
  try{const path=resolve('.','.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html')));
   if(!path.startsWith(resolve('.')+'/')){res.writeHead(403).end();return}
   const content=await readFile(path);res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json'})[extname(path)]||'text/plain');res.end(content)
  }catch{res.writeHead(404).end()}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));base=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({headless:true,executablePath:process.env.REVIEW_CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage']});
});
after(async()=>{await browser?.close();await new Promise(r=>server?.close(r))});

async function setup({signed=true,missing=false,offline=false}={}) {
 const f=await fixture();const context=await browser.newContext();const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let dropped=false, recordCalls=[];
 await context.addInitScript(({signed,USER})=>{
  localStorage.setItem('chrono_mastery_world_v1_terminal','T25');
  if(signed){localStorage.setItem('chrono_mastery_sync_config_v1',JSON.stringify({url:'https://review-test.invalid',key:'test-public-key'}));localStorage.setItem('chrono_mastery_sync_session_v1',JSON.stringify({access_token:'test-token',user:{id:USER},expires_at:Math.floor(Date.now()/1000)+3600}));}
 },{signed,USER});
 await context.route('https://review-test.invalid/**',async route=>{
  const url=new URL(route.request().url());const name=url.pathname.split('/').pop();
  if(!url.pathname.includes('/rpc/'))return route.fulfill({status:200,contentType:'application/json',body:'[]'});
  if(!name.startsWith('chrono_'))return route.fulfill({status:200,contentType:'application/json',body:'[]'});
  if(offline)return route.abort();
  if(missing&&name.includes('review'))return route.fulfill({status:404,contentType:'application/json',body:JSON.stringify({code:'PGRST202'})});
  const b=route.request().postDataJSON();
  const specs={
   chrono_load_logical_arc_authority:[['p_logical_arc_id'],['text']],
   chrono_load_arc_review:[['p_logical_arc_id','p_curriculum_scope'],['text','text']],
   chrono_create_arc_review_item:[['p_item','p_today'],['jsonb','date']],
   chrono_update_arc_review_item:[['p_item_id','p_patch','p_expected_version','p_today'],['uuid','jsonb','integer','date']],
   chrono_record_arc_review_attempt:[['p_item_id','p_attempt_id','p_expected_version','p_attempt','p_reviewed_on'],['uuid','uuid','integer','jsonb','date']],
   chrono_list_arc_review_attempts:[['p_item_id'],['uuid']],
  };
  if(!specs[name])return route.fulfill({status:200,contentType:'application/json',body:'[]'});
  try{
   const [keys,types]=specs[name];
   if(name==='chrono_record_arc_review_attempt')recordCalls.push(b);
   const args=keys.map(k=>typeof b[k]==='object'&&b[k]!==null?JSON.stringify(b[k]):b[k]??null);
   const value=(await f.db.query(`select public.${name}(${types.map((t,i)=>`$${i+1}::${t}`).join(',')}) v`,args)).rows[0].v;
   if(name==='chrono_record_arc_review_attempt'&&dropped){dropped=false;return route.abort()}
   return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(value)});
  }catch(e){return route.fulfill({status:400,contentType:'application/json',body:JSON.stringify({message:e.message})})}
 });
 await page.goto(base);await page.waitForSelector('#t25AtomicSelect',{state:'attached'});
 await page.locator('#t25ReviewPanel > summary').click();
 await page.waitForFunction(()=>!document.querySelector('#t25ReviewStatus').textContent.includes('Loading'));
 return {page,context,f,errors,recordCalls,dropNext:()=>{dropped=true},close:async()=>{await context.close();await f.db.close()}};
}

test('all 162 authored sessions are reachable; navigation, search and terminal changes preserve the selected identity',async()=>{
 const s=await setup({signed:false});const {page}=s;
 try{
  assert.equal(await page.locator('#t25AtomicRouteSelect option').count(),162);
  assert.equal(await page.locator('#routeGraph .t25-v4-node.authored').count(),162);
  assert.equal(await page.locator('#routeGraph .t25-v4-node.planned').count(),0);
  const failures=await page.evaluate(async cards=>{
   const failures=[];
   for(const card of cards){
    const select=document.querySelector('#t25AtomicRouteSelect');
    select.value=String(card.routeOrder);select.dispatchEvent(new Event('change',{bubbles:true}));
    await Promise.resolve();
    const text=document.querySelector('#t25AtomicCardText').value;
    if(document.querySelector('#t25AtomicSelect').value!==card.id ||
       document.querySelector('#t25AtomicLayer').dataset.selectedAtomicId!==card.id ||
       document.querySelector('#routeGraph .selected.t25-v4-node')?.dataset.atomicOrder!==String(card.routeOrder) ||
       document.querySelector('#t25AtomicCopy').disabled ||
       !text.includes(`Session code: ${card.syllabusCode}\n`) ||
       !text.includes(`Atomic ID: ${card.id}\n`) || !text.includes(card.exitCondition))failures.push(card.syllabusCode);
   }
   return failures;
  },T25_ATOMIC_CARDS.map(({routeOrder,syllabusCode,id,exitCondition})=>({routeOrder,syllabusCode,id,exitCondition})));
  assert.deepEqual(failures,[]);
  assert.equal(await page.locator('#t25AtomicNext').isDisabled(),true);
  await page.locator('#t25AtomicPrev').click();
  assert.equal(await page.locator('#t25AtomicRouteSelect').inputValue(),'161');
  await page.locator('#routeSearch').fill('F1.2');
  assert.equal(await page.locator('#routeGraph .t25-v4-node:not(.searchdim)').count(),1);
  await page.locator('#routeGraph [data-atomic-order="2"]').press('Enter');
  assert.equal(await page.locator('#t25AtomicSelect').inputValue(),T25_ATOMIC_CARDS[1].id);
  await page.locator('#routeSearch').fill('');
  await page.locator('#t25AtomicPrev').click();
  assert.equal(await page.locator('#t25AtomicPrev').isDisabled(),true);
  await page.locator('#t25AtomicRouteSelect').selectOption('162');
  await page.locator('#t25Plan').selectOption('cmi');
  assert.equal(await page.locator('#routeGraph .t25-v4-node').count(),0);
  assert.equal(await page.locator('#t25AtomicSelect').inputValue(),T25_ATOMIC_CARDS.at(-1).id);
  await page.locator('#t25Plan').selectOption('mstat');
  assert.equal(await page.locator('#routeGraph .t25-v4-node').count(),162);
  await page.locator('#terminalSelect').selectOption('T22');
  assert.equal(await page.locator('#routeGraph .t25-v4-node').count(),0);
  assert.equal(await page.locator('#routeGraph').evaluate(e=>e.style.minWidth),'1100px','T22 restores its five-column graph width');
  assert.equal(await page.locator('#routeFilter').isDisabled(),false);
  await page.locator('#terminalSelect').selectOption('T25');
  assert.equal(await page.locator('#t25AtomicSelect').inputValue(),T25_ATOMIC_CARDS.at(-1).id);
  await page.reload();await page.waitForSelector('#t25AtomicRouteSelect');
  assert.equal(await page.locator('#t25AtomicRouteSelect').inputValue(),'162');
  assert.equal(await page.locator('#routeGraph .t25-v4-node.authored').count(),162);
  for(const name of ['Open λ Compiler','Open λ ARC Extractor']){
   const href=await page.locator('#t25AtomicLayer').getByRole('link',{name,exact:true}).getAttribute('href');
   assert.equal((await page.request.get(new URL(href,base).href)).status(),200,`${name} must open the actual canonical file`);
  }
  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.locator('#t25AtomicLayer').evaluate(e=>e.scrollWidth<=e.clientWidth+2),true,'session controls fit the narrow viewport');
  assert.deepEqual(s.errors,[]);
 }finally{await s.close()}
});

test('actual T25 v4 page + real PostgreSQL RPC bodies: create, attempt, retry, edit/history, archive',async()=>{
 const s=await setup();const {page,f}=s;
 try{
  assert.equal(await page.locator('#t25AtomicSelect').inputValue(),'T25-ARC801-A1001');
  assert.match(await page.locator('#t25ReviewIdentity').innerText(),/Incomplete/i,'fresh v4 authority must not inherit legacy A01 mastery');
  assert.doesNotMatch(await page.locator('#t25ReviewIdentity').innerText(),/Fully Mastered/i);
  await page.locator('#t25ReviewAdd').click();
  await page.locator('[name="prompt"]').fill(A01_REVIEW_TARGET.prompt);
  await page.locator('[name="reference"]').fill(A01_REVIEW_TARGET.reference);
  await page.locator('[name="personal_note"]').fill('V4 browser integration target; legacy A01 authority is intentionally not reassigned.');
  await page.locator('#t25ReviewForm [type="submit"]').click();await page.waitForFunction(()=>document.querySelector('#t25ReviewStatus').textContent.includes('item saved'));
  assert.match(await page.locator('#t25ReviewIdentity').innerText(),/Incomplete/i);
  assert.match(await page.locator('#t25ReviewSummary').innerText(),/unverified.*Active items: 1/);
  assert.equal((await f.db.query('select count(*)::int n from arc_review_items')).rows[0].n,1);
  assert.equal((await f.db.query("select logical_arc_id from arc_review_items limit 1")).rows[0].logical_arc_id,'T25-ARC801-A1001');
  await page.getByRole('button',{name:'Practice early',exact:true}).click();
  assert.equal(await page.locator('#t25ReviewReference').count(),0);
  await page.locator('#t25ReviewReveal').click();assert.equal(await page.locator('#t25ReviewReference').count(),0);
  await page.locator('#t25ReviewPaper').check();await page.locator('#t25ReviewReveal').click();
  assert.match(await page.locator('#t25ReviewReference').innerText(),/principal square root/);
  await page.locator('[name="result"]').selectOption('failed');await page.locator('[name="error_kind"]').selectOption('conceptual');
  s.dropNext();await page.locator('#t25ReviewGrade [type="submit"]').click();
  await page.waitForFunction(()=>document.querySelector('#t25ReviewStatus').textContent.includes('Not confirmed saved'));
  await page.getByRole('button',{name:'Retry same submission'}).click();
  await page.waitForFunction(()=>document.querySelector('#t25ReviewStatus').textContent.includes('retry confirmed'));
  assert.equal(s.recordCalls.length,2);assert.deepEqual(s.recordCalls[0],s.recordCalls[1]);
  assert.equal((await f.db.query('select count(*)::int n from arc_review_attempts')).rows[0].n,1);
  assert.match(await page.locator('#t25ReviewSummary').innerText(),/repair recommended/);
  await page.getByRole('button',{name:'Edit',exact:true}).click();await page.locator('[name="prompt"]').fill('New meaning <img src=x onerror=alert(1)>');await page.locator('#t25ReviewForm [type="submit"]').click();
  await page.waitForFunction(()=>document.querySelector('#t25ReviewStatus').textContent.includes('item saved'));
  await page.getByRole('button',{name:'View history',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#t25ReviewStatus').textContent.includes('History preserves'));
  assert.match(await page.locator('#t25ReviewWork').textContent(),/why is √\(u²\)/);
  await page.locator('#t25ReviewStack').click();await page.getByRole('button',{name:'Archive',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('#t25ReviewSummary').textContent.includes('Active items: 0'));
  assert.equal(await page.getByRole('button',{name:'Practice early',exact:true}).count(),0);
  assert.equal(await page.locator('#t25ReviewWork img').count(),0);
  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.locator('#t25ReviewPanel').evaluate(e=>e.scrollWidth<=e.clientWidth+2),true,'review panel fits narrow viewport');
  assert.deepEqual(s.errors,[]);
 }finally{await s.close()}
});

test('missing schema, signed out and network failure preserve audited session cards and compiler links',async()=>{
 for(const mode of [{missing:true},{signed:false},{offline:true}]){
  const s=await setup(mode);try{
   const text=await s.page.locator('#t25ReviewStatus').innerText();
   assert.match(text,mode.missing?/Review layer not installed/:mode.offline?/fetch/i:/Sign in/);
   assert.equal(await s.page.locator('#t25ReviewAdd').isDisabled(),true);
   assert.match(await s.page.locator('#t25AtomicCardText').inputValue(),/T25-ARC801-A1001/);
   assert.equal(await s.page.locator('#t25AtomicCopy').isEnabled(),true);
   assert.match(await s.page.getByRole('link',{name:'Open λ Compiler',exact:true}).getAttribute('href'),/Compiler/);
   assert.deepEqual(s.errors,[]);
  }finally{await s.close()}
 }
});

test('selected v4 atomic state survives parent redraw and sign-out clears private review content',async()=>{
 const s=await setup();try{
  // Drive the learner-facing route selector, not the hidden compatibility select.
  await s.page.locator('#t25AtomicRouteSelect').selectOption('2');
  await s.page.waitForFunction(()=>document.querySelector('#t25AtomicSelect').value==='T25-ARC801-A1002');
  assert.match(await s.page.locator('#t25AtomicSummary').innerText(),/F1\.2/);
  await s.page.waitForFunction(()=>document.querySelector('#t25ReviewIdentity').textContent.includes('T25-ARC801-A1002'));
  await s.page.locator('#t25Unit').selectOption('ARC802');
  assert.equal(await s.page.locator('#t25AtomicSelect').inputValue(),'T25-ARC801-A1002','parent context browsing must not rewrite atomic chronology');
  assert.equal(await s.page.locator('#t25ReviewPanel').isVisible(),true,'review selection follows the atomic card, not the parent dropdown');
  await s.page.locator('#t25ReviewAdd').click();await s.page.locator('[name="prompt"]').fill('Private draft');
  await s.page.evaluate(()=>{const session=JSON.parse(localStorage.getItem('chrono_mastery_sync_session_v1'));session.expires_at+=3600;session.access_token='refreshed-test-token';localStorage.setItem('chrono_mastery_sync_session_v1',JSON.stringify(session));document.dispatchEvent(new CustomEvent('chrono:cloud-context-changed'))});
  assert.equal(await s.page.locator('[name="prompt"]').inputValue(),'Private draft','routine token refresh preserves working');
  await s.page.evaluate(()=>{localStorage.removeItem('chrono_mastery_sync_session_v1');document.dispatchEvent(new CustomEvent('chrono:cloud-context-changed'))});
  await s.page.waitForFunction(()=>document.querySelector('#t25ReviewStatus').textContent.includes('Sign in'));
  assert.equal(await s.page.locator('#t25ReviewWork').innerText(),'');assert.deepEqual(s.errors,[]);
 }finally{await s.close()}
});
