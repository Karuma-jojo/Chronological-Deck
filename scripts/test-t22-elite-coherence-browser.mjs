import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {resolve,extname} from 'node:path';
const require=createRequire(import.meta.url);let chromium;
try{({chromium}=require('playwright'));}catch{try{({chromium}=require('./review-tests/node_modules/@playwright/test'));}catch{({chromium}=require((process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules')+'/playwright'));}}
const bridge=JSON.parse(await fs.readFile('course/t22/authoring/m06-decision-bridge.json')),probes=JSON.parse(await fs.readFile('course/t22/authoring/m01-m05-cumulative-probes.json'));
const server=createServer(async(req,res)=>{try{const path=resolve('.','.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html')));if(!path.startsWith(resolve('.')+'/')){res.writeHead(403).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css'})[extname(path)]||'text/plain');res.end(await fs.readFile(path));}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.REVIEW_CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage']});
 const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${server.address().port}/t22-course.html?module=6&session=25`);await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
 assert.equal(await page.locator('#module option').count(),15);assert.equal(await page.locator('#session option').count(),28);assert.equal(await page.locator('#roadmap .roadmap-row').count(),65);
 assert((await page.locator('#moduleGate').textContent()).includes('new builder-checked candidate'));
 for(const s of bridge.sessions){
  await page.selectOption('#session',String(s.order));assert((await page.locator('#sessionMeta').textContent()).includes(s.id));assert((await page.locator('#contractText').textContent()).includes(s.entryPrerequisites[0]));
  await page.click('#note');assert((await page.locator('#learningText').textContent()).includes(s.lesson));
  for(const k of ['main','transfer']){
   await page.click(k==='main'?'#mainTask':'#transferTask');assert.equal((await page.locator('#problem').textContent()).trim(),bridge.problems[s[k]].prompt);assert(await page.locator('#reveal').isDisabled());
   await page.fill('#answer',`Browser evidence workflow ${s.id} ${k}: model and derivation.`);await page.click('#save');await page.click('#reveal');assert((await page.locator('#reference').textContent()).includes(bridge.evaluators[s[k]].reference));
  }
 }
 const bridgeState=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));assert.equal(bridgeState.attempts.length,8);assert(bridgeState.attempts.every(a=>a.assistance==='guided'&&/^[0-9a-f]{64}$/.test(a.assessmentFingerprint)));
 // Use a separate context so merely testing the bridge cannot contaminate probe evidence.
 const ctx=await browser.newContext({permissions:['clipboard-read','clipboard-write']}),p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(`http://127.0.0.1:${server.address().port}/t22-course.html?module=5&session=28`);await p.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
 assert((await p.locator('#sessionMeta').textContent()).includes('T22E-TRD01::S24@1'));assert(await p.locator('#probePanel').isVisible());assert.equal(await p.locator('#cumulativeProbe option').count(),4);
 for(const id of Object.keys(probes.problems)){
  await p.selectOption('#cumulativeProbe',id);await p.click('#startProbe');assert.equal((await p.locator('#problem').textContent()).trim(),probes.problems[id].prompt);assert(await p.locator('#reference').isHidden());assert(await p.locator('#reveal').isDisabled());
  await p.fill('#answer',`Candidate cumulative derivation for ${id}`);await p.click('#save');await p.click('#reveal');assert((await p.locator('#reference').textContent()).includes(probes.evaluators[id].reference));await p.click('#saveReview');
 }
 assert((await p.locator('#evidenceSummary').textContent()).startsWith('0/28'),'Secure probe reviews must not manufacture fixed-task clearance');
 await p.click('#copyPacket');const state=await p.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));assert(state.exposures[Object.keys(probes.problems).at(-1)].referenceSeenAt,'Probe packet must mark its own answer exposure');
 const dl=p.waitForEvent('download');await p.click('#export');const file=await (await dl).path(),exported=JSON.parse(await fs.readFile(file));await p.setInputFiles('#import',{name:'coherence-evidence.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});await p.waitForFunction(()=>document.querySelector('#status').textContent.includes('Evidence merged'));await p.reload();await p.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));assert.equal((await p.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')))).attempts.length,8);
 await p.selectOption('#module','T22E-FND02');await p.selectOption('#session','18');assert((await p.locator('#contractText').textContent()).includes('M12-S10'));assert(!(await p.locator('#contractText').textContent()).includes('Infinite geometric series reserved M09'));
 await p.selectOption('#module','ARC048');await p.selectOption('#session','20');assert((await p.locator('#contractText').textContent()).includes('M26 canonical discrete laws'));await p.click('#copyPacket');assert((await p.evaluate(()=>navigator.clipboard.readText())).includes('M26 canonical discrete laws'),'Evaluator packet must carry the same current destinations as the learner contract');await p.selectOption('#session','28');assert((await p.locator('#contractText').textContent()).includes('M04-S25–S28'));
 assert.equal(errors.length,0,errors.join('\n'));await ctx.close();console.log('PASS Chromium coherence: all eight bridge surfaces, four cumulative probes, provenance/answer exposure, export/import, no silent clearance and corrected learner-facing handoffs.');
}finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
