import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFile,mkdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const require=createRequire(import.meta.url);
let chromium;
try{({chromium}=require('playwright'));}catch{({chromium}=require((process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules')+'/playwright'));}
const server=createServer(async(req,res)=>{try{const path=resolve('.','.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html')));if(!path.startsWith(resolve('.')+'/')){res.writeHead(403).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css'})[extname(path)]||'text/plain');res.end(await readFile(path));}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
let browser;const errors=[];const results=[];
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.REVIEW_CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage']});
 const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 const requests=[];page.on('request',r=>requests.push(r.url()));
 await page.goto(base+'/t25-course.html');await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
 assert.equal(await page.locator('#session option').count(),162);
 assert(!requests.some(x=>x.endsWith('evaluator.json')),'References fetched before explicit request');
 assert(await page.locator('#reveal').isDisabled());assert(await page.locator('#reference').isHidden());
 await page.selectOption('#presentation','anime');assert(await page.locator('#scene').isVisible());
 await page.click('#copyOpening');const opening=await page.evaluate(()=>navigator.clipboard.readText());assert(opening.startsWith('[WALL]'));assert(opening.includes('[ANIME]'));assert(!opening.includes('EVALUATOR'));assert(!opening.includes('Dom f='));
 await page.fill('#answer','My independent working for the test.');await page.click('#save');assert(!(await page.locator('#reveal').isDisabled()));
 await page.click('#reveal');await page.waitForSelector('#reference:not([hidden])');assert((await page.locator('#reference').textContent()).includes('Dom f='));
 await page.click('#saveReview');const state=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t25_course_evidence_v1')));assert.equal(state.attempts.length,2);assert.equal(state.attempts[0].result,'unreviewed');assert.equal(state.attempts[1].result,'secure');assert.equal(state.attempts[0].referenceSeenBefore,false);
 const dl=page.waitForEvent('download');await page.click('#export');const download=await dl;const path=await download.path();const exported=JSON.parse(await readFile(path));assert.equal(exported.attempts.length,2);
 await page.setInputFiles('#import',{name:'evidence.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Evidence merged'));assert.equal((await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t25_course_evidence_v1')))).attempts.length,2);
 await page.setInputFiles('#import',{name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"version":9}')});await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Import rejected'));
 await page.click('#transferTask');assert((await page.locator('#taskMeta').textContent()).includes('001-T'));assert(await page.locator('#reveal').isDisabled());assert(await page.locator('#reference').isHidden());
 await page.click('#note');assert.equal(await page.locator('#assistance').inputValue(),'guided');await page.fill('#answer','Working after learning note.');await page.selectOption('#assistance','independent');await page.click('#save');assert.equal((await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t25_course_evidence_v1')))).attempts.at(-1).assistance,'guided');
 for(let i=1;i<=162;i++){await page.selectOption('#session',String(i));assert((await page.locator('#taskMeta').textContent()).includes(`T25-${String(i).padStart(3,'0')}-M`));assert(await page.locator('#reference').isHidden());}
 results.push('162-session navigation; no eager reference fetch; WALL copy isolation; save/reveal/review; export/import validation; assisted-note provenance');
 await page.locator('summary').filter({hasText:'Mixed & objective sets'}).click();await page.selectOption('#setSelect','MIXED-1');await page.click('#startSet');assert.equal(await page.locator('#title').textContent(),'Mixed practice');assert(await page.locator('#scene').isHidden());await page.selectOption('#presentation','plain');await page.selectOption('#presentation','anime');assert(await page.locator('#scene').isHidden());assert.equal(await page.locator('#setItems button').count(),8);
 await page.selectOption('#setSelect','OBJECTIVE-1');await page.click('#startSet');assert((await page.locator('#problem').textContent()).includes('A.'));assert(!(await page.locator('#problem').textContent()).includes('Correct option'));
 await page.selectOption('#session','1');await page.click('#saveChoice');await page.click('#finishStory');assert((await page.locator('#closure').textContent()).includes('departure bell'));
 await mkdir('test-artifacts/t25-course',{recursive:true});await page.screenshot({path:'test-artifacts/t25-course/desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:'test-artifacts/t25-course/mobile.png',fullPage:true});
 results.push('Mixed set topic/scene isolation; objective options; story continuity; 390px layout without horizontal overflow');
 // Reveal race: leave a task while its first evaluator fetch is still pending.
 const race=await browser.newContext();const rp=await race.newPage();let release,arrived;const arrival=new Promise(r=>arrived=r),gate=new Promise(r=>release=r);
 await rp.route('**/evaluator.json',async route=>{arrived();await gate;await route.continue();});
 await rp.goto(base+'/t25-course.html');await rp.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));await rp.fill('#answer','Attempt');await rp.click('#save');await rp.click('#reveal');await arrival;await rp.click('#next');release();await rp.waitForResponse(r=>r.url().endsWith('evaluator.json'));await rp.waitForTimeout(100);assert(await rp.locator('#reference').isHidden());assert(await rp.locator('#reveal').isDisabled());await race.close();results.push('Async reference navigation race blocked');
 // Preserve corrupt storage; do not silently replace it with a blank log.
 const corrupt=await browser.newContext();await corrupt.addInitScript(()=>localStorage.setItem('chrono_t25_course_evidence_v1','{broken'));const cp=await corrupt.newPage();await cp.goto(base+'/t25-course.html');await cp.waitForSelector('#session option');assert((await cp.locator('#status').textContent()).includes('not been overwritten'));assert.equal(await cp.evaluate(()=>localStorage.getItem('chrono_t25_course_evidence_v1')),'{broken');await corrupt.close();results.push('Corrupt evidence preserved');
 // Verify the link from the actual existing deck without cloud credentials.
 const deck=await browser.newContext();await deck.addInitScript(()=>localStorage.setItem('chrono_mastery_world_v1_terminal','T25'));const dp=await deck.newPage();await dp.goto(base+'/index.html');await dp.waitForSelector('#t25CourseLink');assert((await dp.locator('#t25CourseLink').getAttribute('href')).includes('t25-course.html?session='));await deck.close();results.push('Existing T25 panel links to selected course session');
 assert.deepEqual(errors,[]);console.log('PASS browser:\n'+results.map(x=>'- '+x).join('\n'));
 await context.close();
}finally{await browser?.close();await new Promise(r=>server.close(r));}
