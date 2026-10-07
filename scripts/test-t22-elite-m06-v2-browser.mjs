import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {resolve,extname} from 'node:path';
const require=createRequire(import.meta.url);let chromium;
try{({chromium}=require('playwright'));}catch{try{({chromium}=require('./review-tests/node_modules/@playwright/test'));}catch{({chromium}=require((process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules')+'/playwright'));}}
const a=JSON.parse(await fs.readFile('course/t22/authoring/m06-v2.json'));
const server=createServer(async(req,res)=>{try{const path=resolve('.','.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html')));if(!path.startsWith(resolve('.')+'/')){res.writeHead(403).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css'})[extname(path)]||'text/plain');res.end(await fs.readFile(path));}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.REVIEW_CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage']});
 const context=await browser.newContext({permissions:['clipboard-read','clipboard-write'],viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${server.address().port}/t22-course.html?module=6&session=1`);await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
 assert.equal(await page.locator('#module option').count(),15);assert.equal(await page.locator('#session option').count(),36);assert.equal(await page.locator('#roadmap .roadmap-row').count(),65);
 assert((await page.locator('#moduleGate').textContent()).includes('independent review'));
 const legacy=await page.evaluate(async()=>{
  const core=await import('/js/t22-course/core.js'),supp=await import('/js/t22-course/supplements.js');const base=await (await fetch('/course/t22/authoring/m06.json')).json(),bridge=await (await fetch('/course/t22/authoring/m06-decision-bridge.json')).json(),current=await (await fetch('/course/t22/authoring/m06-v2.json')).json();
  const old=supp.appendSupplement(base,bridge);old.modules=[old.module];current.modules=[current.module];await core.prepareContractHashes(old);await core.prepareAssessmentFingerprints(old,old.evaluators);await core.prepareContractHashes(current);await core.prepareAssessmentFingerprints(current,current.evaluators);
  const state=core.emptyEvidence();for(const id of ['T22V3::ARC502::S24-T@1','T22V3::ARC502::S28-T@1']){const s=core.sessionForProblem(old,id);state.attempts.push({id:'legacy-'+id,problemId:id,at:'2026-10-06T01:00:00Z',answer:'Historical original independently derived answer.',assistance:'independent',result:'secure',minutes:20,referenceSeenBefore:false,noteSeenDuringAttempt:false,error:'',contractHash:s.contractHash,assessmentFingerprint:old.assessmentFingerprints[id]});}
  const previous=await (await fetch('/docs/t22-course/audit/m06-v2-previous-assessments.json')).json();
  for(const record of previous.assessments){const id=record.problem.id;state.attempts.push({id:'previous-v2-'+id,problemId:id,at:'2026-10-07T16:00:00Z',answer:'Earlier v2 candidate response retained verbatim.',assistance:'independent',result:'secure',minutes:20,referenceSeenBefore:false,noteSeenDuringAttempt:false,error:'',contractHash:record.contractHash,assessmentFingerprint:record.assessmentFingerprint});}
  const valid=core.validateEvidence(state,current);return {state:valid,retained:valid.attempts.length,current:valid.attempts.map(x=>core.evidenceIsCurrent(x,current))};
 });assert.equal(legacy.retained,5);assert.deepEqual(legacy.current,[false,false,false,false,false]);
 await page.setInputFiles('#import',{name:'legacy-m06.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(legacy.state))});await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Evidence merged'));
 for(const s of a.sessions){
  await page.selectOption('#session',String(s.order));assert((await page.locator('#sessionMeta').textContent()).includes(s.id));assert((await page.locator('#contractText').textContent()).includes(s.requiredOwnership[0]));
  await page.click('#note');assert((await page.locator('#learningText').textContent()).includes(s.lesson));assert(await page.locator('#learningRepresentations table').count()>0);
  await page.fill('#guidedAnswer','My reasoning on the supported model.');await page.click('#guidedCheck');assert((await page.locator('#guidedFeedback').textContent()).includes(s.guidedFeedback));
  for(const kind of ['main','transfer']){
   await page.click(kind==='main'?'#mainTask':'#transferTask');assert.equal((await page.locator('#problem').textContent()).trim(),a.problems[s[kind]].prompt);assert(await page.locator('#reference').isHidden());assert(await page.locator('#reveal').isDisabled());
   await page.fill('#answer',`Derived joint masses and model conditions for ${s.id} ${kind}.`);await page.click('#save');await page.click('#reveal');assert((await page.locator('#reference').textContent()).includes(a.evaluators[s[kind]].reference));await page.click('#saveReview');
  }
  const width=await page.evaluate(()=>({ok:document.documentElement.scrollWidth<=innerWidth+1,viewport:innerWidth,document:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('main *,aside *')].filter(e=>e.getBoundingClientRect().width>0&&e.getBoundingClientRect().right>innerWidth+1).slice(-12).map(e=>({tag:e.tagName,id:e.id,cls:e.className,right:e.getBoundingClientRect().right,text:e.textContent.slice(0,80)}))}));
  assert.equal(width.ok,true,'Mobile overflow '+s.id+' '+JSON.stringify(width));
 }
 const state=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));assert.equal(state.attempts.length,149);assert.deepEqual(state.attempts.slice(0,5),legacy.state.attempts);assert(state.attempts.slice(5).every(x=>x.assistance==='guided'&&/^[0-9a-f]{64}$/.test(x.assessmentFingerprint)));
 const first=a.sessions[0];assert.equal(state.exposures[first.main].lessonContentVersion,a.instructionVersion);
 await page.click('#copyPacket');const packet=await page.evaluate(()=>navigator.clipboard.readText());assert(packet.includes(a.sessions.at(-1).id));assert(packet.includes(a.evaluators[a.sessions.at(-1).transfer].reference));
 const event=page.waitForEvent('download');await page.click('#export');const file=await (await event).path(),exported=JSON.parse(await fs.readFile(file));assert.equal(exported.attempts.length,149);
 await page.setInputFiles('#import',{name:'m06-current.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Evidence merged'));await page.reload();await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));assert.equal(restored.attempts.length,149);assert.deepEqual(restored.attempts.slice(0,5),legacy.state.attempts);
 assert.equal(errors.length,0,errors.join('\n'));console.log('PASS M06 v2-r1 Chromium: all36 learner positions/all72 assessment surfaces; guided feedback/provenance, save-before-reveal, rubric review, all five retained stale fingerprints, packet export, evidence roundtrip/reload and mobile width.');
}finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
