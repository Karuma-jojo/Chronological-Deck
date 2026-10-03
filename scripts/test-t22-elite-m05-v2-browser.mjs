import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';

const require=createRequire(import.meta.url);let chromium;
try{({chromium}=require('playwright'));}catch{try{({chromium}=require('./review-tests/node_modules/@playwright/test'));}catch{({chromium}=require((process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules')+'/playwright'));}}

const server=createServer(async(req,res)=>{
 try{
  const path=resolve('.','.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html')));
  if(!path.startsWith(resolve('.')+'/')){res.writeHead(403).end();return;}
  res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css'})[extname(path)]||'text/plain');
  res.end(await readFile(path));
 }catch{res.writeHead(404).end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;let browser;

try{
 browser=await chromium.launch({headless:true,executablePath:process.env.REVIEW_CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage']});
 const context=await browser.newContext({viewport:{width:390,height:844}});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));

 await page.goto(base+'/t22-course.html?module=5&session=1');
 await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
 assert.equal(await page.locator('#module').inputValue(),'T22E-TRD01');
 assert.equal(await page.locator('#session option').count(),24);
 assert((await page.locator('#moduleTitle').textContent()).includes('Trading Games'));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);

 const candidate=await page.evaluate(async()=>{
  const r=await fetch('/course/t22/authoring/m05.json',{cache:'no-store'});const json=await r.json();
  const core=await import('/js/t22-course/core.js');
  const course={version:json.version,module:json.module,modules:[json.module],sessions:structuredClone(json.sessions),problems:structuredClone(json.problems),assessmentEquivalences:{}};
  await core.prepareContractHashes(course);await core.prepareAssessmentFingerprints(course,json.evaluators);
  const host=document.createElement('pre');host.style.whiteSpace='pre-wrap';host.style.overflowWrap='anywhere';document.body.append(host);
  let badEscaped=0,badReplacement=0;
  for(const s of json.sessions){
   for(const text of [s.title,s.focus,s.lesson,s.guidedFeedback,json.problems[s.main].prompt,json.problems[s.transfer].prompt,json.evaluators[s.main].reference,json.evaluators[s.transfer].reference,...json.evaluators[s.main].rubric.map(r=>r.criterion),...json.evaluators[s.transfer].rubric.map(r=>r.criterion)]){
    host.textContent=text;const rendered=host.innerText;
    if(rendered.includes('\\\\n'))badEscaped++;
    if(rendered.includes('\uFFFD'))badReplacement++;
   }
  }
  return {
   ok:r.ok,status:r.status,id:json.module.id,moduleStatus:json.module.status,version:json.version,
   sessions:json.sessions.length,problems:Object.keys(json.problems).length,evaluators:Object.keys(json.evaluators).length,
   hashes:course.sessions.every(s=>/^[0-9a-f]{64}$/.test(s.contractHash)),fingerprints:Object.keys(course.assessmentFingerprints).length,
   badEscaped,badReplacement,
   ids:json.sessions.map(s=>[s.id,s.main,s.transfer]),
   guided:json.sessions.every(s=>typeof s.guidedFeedback==='string'&&s.guidedFeedback.startsWith('Check after attempting.')),
   evidenceDistance:Object.keys(json.evidenceDistance?.items||{}).length,
   decision:Object.keys(json.decisionAudit?.items||{}).length,
   wrong:Object.keys(json.wrongSolverAudit?.sessions||{}).length,
   reprLedger:json.representationProgression?.length,
   sourceLedger:json.sourceLedger?.length,
   renderedSessionRepresentations:json.sessions.filter(s=>Array.isArray(s.representations)&&s.representations.length).length,
   renderedProblemRepresentations:Object.values(json.problems).filter(p=>Array.isArray(p.representations)&&p.representations.length).length,
   preserved:json.reconstructionAudit?.preservedPublicContracts?.length,
   changed:json.reconstructionAudit?.materiallyChangedPublicContracts?.length
  };
 });
 assert.equal(candidate.ok,true);assert.equal(candidate.status,200);assert.equal(candidate.id,'T22E-TRD01');
 assert.equal(candidate.version,'m05-authoring-v2-independent-review-repair-r1');
 assert.equal(candidate.moduleStatus,'v2-independent-review-repair-r1-awaiting-full-validation-and-exact-head-confirmation');
 assert.equal(candidate.sessions,24);assert.equal(candidate.problems,48);assert.equal(candidate.evaluators,48);
 assert.equal(candidate.hashes,true);assert.equal(candidate.fingerprints,48);assert.equal(candidate.guided,true);
 assert.equal(candidate.badEscaped,0);assert.equal(candidate.badReplacement,0);
 assert.equal(candidate.evidenceDistance,48);assert.equal(candidate.decision,1);assert.equal(candidate.wrong,24);
 assert(candidate.reprLedger>=15);assert(candidate.sourceLedger>=10);
 assert(candidate.renderedSessionRepresentations>=18);assert(candidate.renderedProblemRepresentations>=15);
 assert.equal(candidate.preserved,12);assert.equal(candidate.changed,36);
 for(let i=0;i<candidate.ids.length;i++){const ss=String(i+1).padStart(2,'0');assert.deepEqual(candidate.ids[i],[`T22V3::T22E-TRD01::S${ss}@1`,`T22V3::T22E-TRD01::S${ss}-M@1`,`T22V3::T22E-TRD01::S${ss}-T@1`]);}

 // Every lesson, staged guided-feedback state, Main, Transfer, reference and rubric.
 for(let n=1;n<=24;n++){
  await page.selectOption('#session',String(n));
  assert((await page.locator('#sessionMeta').textContent()).includes(`S${String(n).padStart(2,'0')}@1`));
  await page.click('#note');
  const lesson=await page.locator('#learningText').textContent();
  for(const token of ['Orient.','Guided check','Fade.'])assert(lesson.includes(token),`S${n} missing ${token}`);
  assert(/Worked /.test(lesson),`S${n} missing worked instructional stage`);
  assert.equal(await page.locator('#guidedPanel').isVisible(),true);
  assert.equal(await page.locator('#guidedCheck').isDisabled(),true);
  await page.fill('#guidedAnswer',`S${n} attempted before feedback.`);
  await page.click('#guidedCheck');
  assert((await page.locator('#guidedFeedback').textContent()).startsWith('Check after attempting.'));
  for(const kind of ['main','transfer']){
   await page.click(kind==='main'?'#mainTask':'#transferTask');
   assert((await page.locator('#problem').textContent()).length>55,`S${n} ${kind} prompt too short`);
   await page.fill('#answer',`M05 v2 browser probe S${n} ${kind} — model, working and scope recorded.`);
   await page.click('#save');await page.click('#reveal');await page.waitForSelector('#reference:not([hidden])');
   const ref=await page.locator('#reference').textContent();
   assert(ref.includes('points:'),`S${n} ${kind} rubric not rendered`);
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`S${n} mobile overflow`);
 }

 // Representation-critical surfaces.
 await page.selectOption('#session','1');await page.click('#note');
 assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);
 assert((await page.locator('#learningRepresentations').textContent()).includes('action × chance state'));
 await page.click('#mainTask');assert.equal(await page.locator('#problemRepresentations').getAttribute('hidden')!==null,true);

 await page.selectOption('#session','4');await page.click('#note');
 assert.equal(await page.locator('#learningRepresentations .repr-tree').count(),1);
 assert((await page.locator('#learningRepresentations').textContent()).includes('DECISION NODE'));
 assert((await page.locator('#learningRepresentations').textContent()).includes('CHANCE NODE'));
 await page.click('#mainTask');assert.equal(await page.locator('#problemRepresentations').getAttribute('hidden')!==null,true);
 await page.click('#transferTask');assert.equal(await page.locator('#problemRepresentations .repr-tree').count(),1);
 assert((await page.locator('#problemRepresentations').textContent()).includes('.50'));

 await page.selectOption('#session','12');await page.click('#note');
 assert.equal(await page.locator('#learningRepresentations .repr-tree').count(),1);
 assert((await page.locator('#learningRepresentations').textContent()).includes('RUIN'));

 await page.selectOption('#session','13');await page.click('#note');
 assert.equal(await page.locator('#learningRepresentations .repr-svg').count(),1);
 assert((await page.locator('#learningRepresentations').textContent()).includes('feasible'));

 await page.selectOption('#session','16');await page.click('#note');
 assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);
 assert((await page.locator('#learningRepresentations').textContent()).includes('√3/2'));
 await page.click('#transferTask');assert.equal(await page.locator('#problemRepresentations .repr-table').count(),1);

 await page.selectOption('#session','20');await page.click('#note');
 assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);
 assert((await page.locator('#learningRepresentations').textContent()).includes('(3,4)'));

 await page.selectOption('#session','22');await page.click('#note');
 assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);
 await page.click('#transferTask');assert.equal(await page.locator('#problemRepresentations .repr-table').count(),1);
 assert((await page.locator('#problemRepresentations').textContent()).includes('(3,4)'));

 // S24 Main deliberately receives no problem representation: representation choice is part of the integrated synthesis.
 await page.selectOption('#session','24');await page.click('#mainTask');
 assert.equal(await page.locator('#problemRepresentations').count(),1);
 assert.equal(await page.locator('#problemRepresentations').getAttribute('hidden')!==null,true);
 assert((await page.locator('#problem').textContent()).includes('Build whatever auditable representation'));
 await page.click('#transferTask');assert.equal(await page.locator('#problemRepresentations .repr-table').count(),1);

 const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));
 const attempts=stored.attempts.filter(a=>a.problemId.includes('T22E-TRD01'));
 assert.equal(attempts.length,48);
 assert(attempts.every(a=>a.noteSeenDuringAttempt===true&&a.assistance==='guided'));

 // Export/import/reload round trip.
 const downloadEvent=page.waitForEvent('download');await page.click('#export');
 const download=await downloadEvent,exported=JSON.parse(await readFile(await download.path()));
 const ctx2=await browser.newContext({viewport:{width:390,height:844}}),p2=await ctx2.newPage();
 await p2.goto(base+'/t22-course.html?module=5&session=24');await p2.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
 await p2.setInputFiles('#import',{name:'m05-v2-evidence.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
 await p2.waitForFunction(()=>document.querySelector('#status').textContent.includes('Evidence merged'));
 await p2.reload();await p2.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
 const restored=await p2.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));
 assert.equal(restored.attempts.filter(a=>a.problemId.includes('T22E-TRD01')).length,48);
 assert.equal(await p2.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
 await ctx2.close();

 assert.deepEqual(errors,[]);
 await context.close();
 console.log('PASS M05 v2 browser: all24 lessons, staged guided feedback, 48 task/reference/rubric surfaces, decision/table/tree/path/utility/game representations, S24 representation-choice gate, mobile rendering and evidence export/import/reload.');
}finally{
 if(browser)await browser.close();
 await new Promise(r=>server.close(r));
}
