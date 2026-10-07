import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';

const require=createRequire(import.meta.url);let chromium;
try{({chromium}=require('playwright'));}catch{try{({chromium}=require('./review-tests/node_modules/@playwright/test'));}catch{({chromium}=require((process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules')+'/playwright'));}}

const route=[1,2,3,4,5,6,25,7,8,9,10,11,12,13,14,15,16,26,17,28,18,27,19,20,21,22,23,24];
const pad=n=>String(n).padStart(2,'0');

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
  assert.equal(await page.locator('#session option').count(),28);
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
    return {
      ok:r.ok,status:r.status,id:json.module.id,moduleStatus:json.module.status,
      sessions:json.sessions.length,problems:Object.keys(json.problems).length,evaluators:Object.keys(json.evaluators).length,
      hashes:course.sessions.every(s=>/^[0-9a-f]{64}$/.test(s.contractHash)),fingerprints:Object.keys(course.assessmentFingerprints).length,
      badEscaped,badReplacement,
      ids:json.sessions.map(s=>[s.order,s.id,s.main,s.transfer]),
      guided:json.sessions.every(s=>typeof s.guidedFeedback==='string'&&s.guidedFeedback.startsWith('Check after attempting.')),
      evidenceDistance:Object.keys(json.evidenceDistance?.items||{}).length,
      decision:Object.keys(json.decisionAudit?.items||{}).length,
      wrong:Object.keys(json.wrongSolverAudit?.sessions||{}).length,
      repr:json.representationProgression?.length,
      staleR2:Object.entries(json.wholeCurriculumRebuild?.r2PriorAssessmentFingerprints||{}).every(([problemId,oldFp])=>{
        const session=core.sessionForProblem(course,problemId);
        return oldFp!==course.assessmentFingerprints[problemId] && core.evidenceIsCurrent({problemId,contractHash:session.contractHash,assessmentFingerprint:oldFp},course)===false;
      }),
      staleR2Count:Object.keys(json.wholeCurriculumRebuild?.r2PriorAssessmentFingerprints||{}).length
    };
  });
  assert.equal(candidate.ok,true);assert.equal(candidate.status,200);assert.equal(candidate.id,'ARC048');
  assert.equal(candidate.moduleStatus,'v2.2-28-session-whole-curriculum-bounded-repair-r2-candidate');
  assert.equal(candidate.sessions,28);assert.equal(candidate.problems,56);assert.equal(candidate.evaluators,56);assert.equal(candidate.hashes,true);assert.equal(candidate.fingerprints,56);
  assert.equal(candidate.badEscaped,0);assert.equal(candidate.badReplacement,0);assert.equal(candidate.guided,true);assert.equal(candidate.staleR2,true);assert.equal(candidate.staleR2Count,10);
  assert.equal(candidate.evidenceDistance,56);assert.equal(candidate.decision,7);assert.equal(candidate.wrong,28);assert.equal(candidate.repr,14);
  for(let i=0;i<route.length;i++){
    const n=route[i],ss=pad(n);
    assert.deepEqual(candidate.ids[i],[i+1,`T22V3::ARC048::S${ss}@1`,`T22V3::ARC048::S${ss}-M@1`,`T22V3::ARC048::S${ss}-T@1`]);
  }

  // Every lesson, staged guided check, Main, Transfer, reference and rubric surface in learner order.
  for(let order=1;order<=28;order++){
    const stable=route[order-1];
    await page.selectOption('#session',String(order));
    assert((await page.locator('#sessionMeta').textContent()).includes(`S${pad(stable)}@1`),`learner order ${order} must resolve to stable S${stable}`);
    await page.click('#note');
    const lesson=await page.locator('#learningText').textContent();
    for(const token of ['Orient.','Define.','Connect.','Explain.','Worked example:','Guided check:','Fade.','Distinction check.'])assert(lesson.includes(token),`stable S${stable} missing ${token}`);
    assert.equal(await page.locator('#guidedPanel').isVisible(),true);assert.equal(await page.locator('#guidedCheck').isDisabled(),true);
    await page.fill('#guidedAnswer',`M04 stable S${stable} attempted before feedback.`);await page.click('#guidedCheck');
    assert((await page.locator('#guidedFeedback').textContent()).startsWith('Check after attempting.'));
    for(const kind of ['main','transfer']){
      await page.click(kind==='main'?'#mainTask':'#transferTask');
      assert((await page.locator('#problem').textContent()).length>70,`stable S${stable} ${kind} prompt too short`);
      await page.fill('#answer',`M04 v2.2 browser probe stable S${stable} ${kind}.`);await page.click('#save');await page.click('#reveal');await page.waitForSelector('#reference:not([hidden])');
      const ref=await page.locator('#reference').textContent();assert(ref.includes('points:'),`stable S${stable} ${kind} rubric not rendered`);
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`stable S${stable} mobile overflow`);
  }

  // Retained and new representation-critical sessions render actual artifacts.
  await page.selectOption('#session','7'); // stable S25
  assert((await page.locator('#sessionMeta').textContent()).includes('S25@1'));await page.click('#note');
  assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);
  await page.click('#mainTask');assert.equal(await page.locator('#problemRepresentations .repr-table').count(),1);

  await page.selectOption('#session','8'); // stable S07
  assert((await page.locator('#sessionMeta').textContent()).includes('S07@1'));await page.click('#note');assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);
  await page.click('#transferTask');assert.equal(await page.locator('#problemRepresentations .repr-table').count(),1);

  await page.selectOption('#session','10'); // stable S09
  assert((await page.locator('#sessionMeta').textContent()).includes('S09@1'));await page.click('#note');assert.equal(await page.locator('#learningRepresentations .repr-tree').count(),1);
  await page.click('#transferTask');assert.equal(await page.locator('#problemRepresentations .repr-tree').count(),1);

  await page.selectOption('#session','18'); // stable S26
  assert((await page.locator('#sessionMeta').textContent()).includes('S26@1'));await page.click('#note');assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);
  await page.click('#mainTask');assert.equal(await page.locator('#problemRepresentations .repr-table').count(),1);

  await page.selectOption('#session','20'); // stable S28
  assert((await page.locator('#sessionMeta').textContent()).includes('S28@1'));await page.click('#note');assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);
  await page.click('#mainTask');assert.equal(await page.locator('#problemRepresentations .repr-table').count(),1);

  await page.selectOption('#session','21'); // stable S18
  assert((await page.locator('#sessionMeta').textContent()).includes('S18@1'));await page.click('#note');assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);

  await page.selectOption('#session','22'); // stable S27
  assert((await page.locator('#sessionMeta').textContent()).includes('S27@1'));await page.click('#note');assert.equal(await page.locator('#learningRepresentations .repr-table').count(),1);
  await page.click('#mainTask');assert.equal(await page.locator('#problemRepresentations .repr-table').count(),1);

  // Materially strengthened retained assessments.
  await page.selectOption('#session','23'); // stable S19
  assert((await page.locator('#sessionMeta').textContent()).includes('S19@1'));await page.click('#mainTask');
  assert((await page.locator('#problem').textContent()).includes('state its payoff units'));
  await page.selectOption('#session','28'); // stable S24
  assert((await page.locator('#sessionMeta').textContent()).includes('S24@1'));await page.click('#mainTask');
  assert((await page.locator('#problem').textContent()).includes('operations log covers250 tasks'));
  await page.click('#transferTask');const exitPrompt=await page.locator('#problem').textContent();
  assert(exitPrompt.includes('Final exit audit'));assert(exitPrompt.includes('complete feasible interval for expected score'));

  // New mathematics appears on the intended public surfaces.
  await page.selectOption('#session','7');await page.click('#mainTask');assert((await page.locator('#problem').textContent()).includes('P(A)=0.60'));
  await page.selectOption('#session','18');await page.click('#transferTask');assert((await page.locator('#problem').textContent()).includes('success probabilities0.20,0.50,0.80'));
  await page.selectOption('#session','22');await page.click('#transferTask');assert((await page.locator('#problem').textContent()).includes('HH:0.10, HT:0.20, TH:0.30, TT:0.40'));
  await page.selectOption('#session','20');await page.click('#transferTask');assert((await page.locator('#problem').textContent()).includes('Stop as soon as either player has two wins'));

  // Independent-review repair surfaces are public and unambiguous.
  await page.selectOption('#session','3');await page.click('#mainTask');assert((await page.locator('#problem').textContent()).includes('uniform over all 36 pairs'));
  await page.selectOption('#session','12');await page.click('#mainTask');assert((await page.locator('#problem').textContent()).includes('joint model for two six-sided dice is uniform'));
  await page.selectOption('#session','7');await page.click('#transferTask');assert((await page.locator('#problem').textContent()).includes('disjoint new-contribution events'));
  await page.selectOption('#session','21');await page.click('#mainTask');assert((await page.locator('#problem').textContent()).includes('universally valid identity P(A)=Σ_i P(A∩B_i)'));
  await page.selectOption('#session','20');await page.click('#mainTask');assert((await page.locator('#problem').textContent()).includes('by the cap (including an H on trial3)'));

  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));
  assert.equal(stored.attempts.filter(a=>a.problemId.includes('ARC048')).length,56);
  assert(stored.attempts.filter(a=>a.problemId.includes('ARC048')).every(a=>a.noteSeenDuringAttempt===true&&a.assistance==='guided'));

  const downloadEvent=page.waitForEvent('download');await page.click('#export');const download=await downloadEvent,exported=JSON.parse(await readFile(await download.path()));
  await page.setInputFiles('#import',{name:'m04-v2.2-evidence.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
  await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Evidence merged'));
  await page.reload();await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#module').inputValue(),'ARC048');
  assert.equal(await page.locator('#session option').count(),28);
  const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));
  assert.equal(restored.attempts.filter(a=>a.problemId.includes('ARC048')).length,56);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(errors,[]);
  await context.close();

  console.log('PASS M04 v2.2-r2 browser: 28-session stable-ID route, all 56 surfaces, reviewer repair wording, stale-r1 fingerprint rejection, representations, mobile rendering and evidence round-trip pass.');
}finally{
  if(browser)await browser.close();
  await new Promise(r=>server.close(r));
}
