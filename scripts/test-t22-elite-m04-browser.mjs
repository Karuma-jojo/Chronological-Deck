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

  await page.goto(base+'/t22-course.html?module=4&session=1');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#module').inputValue(),'ARC048');
  assert.equal(await page.locator('#session option').count(),24);
  assert((await page.locator('#moduleTitle').textContent()).includes('Finite Probability'));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);

  const candidate=await page.evaluate(async()=>{
    const r=await fetch('/course/t22/authoring/m04.json',{cache:'no-store'});const json=await r.json();
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
    return {ok:r.ok,status:r.status,id:json.module.id,moduleStatus:json.module.status,sessions:json.sessions.length,problems:Object.keys(json.problems).length,evaluators:Object.keys(json.evaluators).length,
      hashes:course.sessions.every(s=>/^[0-9a-f]{64}$/.test(s.contractHash)),fingerprints:Object.keys(course.assessmentFingerprints).length,badEscaped,badReplacement,
      ids:json.sessions.map(s=>[s.id,s.main,s.transfer]),guided:json.sessions.every(s=>typeof s.guidedFeedback==='string'&&s.guidedFeedback.startsWith('Check after attempting.')),
      evidenceDistance:Object.keys(json.evidenceDistance?.items||{}).length,decision:Object.keys(json.decisionAudit?.items||{}).length,wrong:Object.keys(json.wrongSolverAudit?.sessions||{}).length,repr:json.representationProgression?.length
    };
  });
  assert.equal(candidate.ok,true);assert.equal(candidate.status,200);assert.equal(candidate.id,'ARC048');assert.equal(candidate.moduleStatus,'v2.1-independent-review-repair-candidate');
  assert.equal(candidate.sessions,24);assert.equal(candidate.problems,48);assert.equal(candidate.evaluators,48);assert.equal(candidate.hashes,true);assert.equal(candidate.fingerprints,48);
  assert.equal(candidate.badEscaped,0);assert.equal(candidate.badReplacement,0);assert.equal(candidate.guided,true);
  assert.equal(candidate.evidenceDistance,48);assert.equal(candidate.decision,5);assert.equal(candidate.wrong,24);assert.equal(candidate.repr,10);
  for(let i=0;i<candidate.ids.length;i++){const ss=String(i+1).padStart(2,'0');assert.deepEqual(candidate.ids[i],[`T22V3::ARC048::S${ss}@1`,`T22V3::ARC048::S${ss}-M@1`,`T22V3::ARC048::S${ss}-T@1`]);}

  // Every lesson, staged guided check, Main, Transfer, reference and rubric surface.
  for(let n=1;n<=24;n++){
    await page.selectOption('#session',String(n));
    assert((await page.locator('#sessionMeta').textContent()).includes(`S${String(n).padStart(2,'0')}@1`));
    await page.click('#note');
    const lesson=await page.locator('#learningText').textContent();
    for(const token of ['Orient.','Define.','Connect.','Explain.','Worked example:','Guided check:','Fade.','Distinction check.'])assert(lesson.includes(token),`S${n} missing ${token}`);
    assert.equal(await page.locator('#guidedPanel').isVisible(),true);assert.equal(await page.locator('#guidedCheck').isDisabled(),true);
    await page.fill('#guidedAnswer',`S${n} attempted before feedback.`);await page.click('#guidedCheck');
    assert((await page.locator('#guidedFeedback').textContent()).startsWith('Check after attempting.'));
    for(const kind of ['main','transfer']){
      await page.click(kind==='main'?'#mainTask':'#transferTask');
      assert((await page.locator('#problem').textContent()).length>70,`S${n} ${kind} prompt too short`);
      await page.fill('#answer',`M04 v2 browser probe S${n} ${kind}.`);await page.click('#save');await page.click('#reveal');await page.waitForSelector('#reference:not([hidden])');
      const ref=await page.locator('#reference').textContent();assert(ref.includes('points:'),`S${n} ${kind} rubric not rendered`);
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`S${n} mobile overflow`);
  }

  // Representation-critical sessions render actual artifacts rather than prose-only claims.
  await page.selectOption('#session','7');await page.click('#note');assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);
  assert((await page.locator('#learningRepresentations').textContent()).includes('Conditioning changes the reference'));
  await page.click('#transferTask');assert.equal(await page.locator('#problemRepresentations .repr-table').count(),1);
  await page.selectOption('#session','9');await page.click('#note');assert.equal(await page.locator('#learningRepresentations .repr-tree').count(),1);
  assert((await page.locator('#learningRepresentations').textContent()).includes('leaf .30'));
  await page.click('#transferTask');assert.equal(await page.locator('#problemRepresentations .repr-tree').count(),1);
  assert((await page.locator('#problemRepresentations').textContent()).includes('leaf .50'));
  await page.selectOption('#session','18');await page.click('#note');assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);
  await page.click('#mainTask');assert.equal(await page.locator('#problemRepresentations .repr-table').count(),1);

  // Independent-review repairs: S20 discriminator and S24 fresh synthesis render the repaired contracts.
  await page.selectOption('#session','20');await page.click('#transferTask');assert((await page.locator('#problem').textContent()).includes('naive average of the four distinct labels'));
  await page.selectOption('#session','24');await page.click('#mainTask');assert((await page.locator('#problem').textContent()).includes('operations log covers250 tasks'));
  await page.click('#transferTask');assert((await page.locator('#problem').textContent()).includes('compute P(X|flag) directly'));

  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));
  assert.equal(stored.attempts.filter(a=>a.problemId.includes('ARC048')).length,48);
  assert(stored.attempts.filter(a=>a.problemId.includes('ARC048')).every(a=>a.noteSeenDuringAttempt===true&&a.assistance==='guided'));

  const downloadEvent=page.waitForEvent('download');await page.click('#export');const download=await downloadEvent,exported=JSON.parse(await readFile(await download.path()));
  await page.setInputFiles('#import',{name:'m04-v2-evidence.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
  await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Evidence merged'));
  await page.reload();await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#module').inputValue(),'ARC048');
  const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));
  assert.equal(restored.attempts.filter(a=>a.problemId.includes('ARC048')).length,48);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(errors,[]);
  await context.close();

  console.log('PASS M04 v2 browser: all 24 lessons, staged guided checks, 48 fixed task/reference/rubric surfaces, table/tree artifacts, mobile rendering and evidence export/import/reload work on the real learner UI.');
}finally{
  if(browser)await browser.close();
  await new Promise(r=>server.close(r));
}
