import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';

const require=createRequire(import.meta.url);let chromium;
try{({chromium}=require('playwright'));}catch{try{({chromium}=require('./review-tests/node_modules/@playwright/test'));}catch{({chromium}=require((process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules')+'/playwright'));}}

const candidate=JSON.parse(await readFile('course/t22/authoring/m15-side278.json','utf8'));

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

  // Publication boundary: persisted route must remain exactly M01-M14.
  await page.goto(base+'/t22-course.html?module=14&session=1');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#module option').count(),14,'persisted learner registry must remain through M14');
  assert.equal(await page.locator('#module').inputValue(),'SIDE276');
  assert(!(await page.locator('#module').allTextContents()).join(' ').includes('Orthogonality, Projection & Least Squares Geometry'));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);

  // Build runtime contracts for the candidate independently of publication.
  const runtime=await page.evaluate(async()=>{
    const r=await fetch('/course/t22/authoring/m15-side278.json',{cache:'no-store'});
    const json=await r.json();
    const core=await import('/js/t22-course/core.js');
    const course={version:json.version,module:json.module,modules:[json.module],sessions:structuredClone(json.sessions),problems:structuredClone(json.problems),assessmentEquivalences:{}};
    await core.prepareContractHashes(course);
    await core.prepareAssessmentFingerprints(course,json.evaluators);
    return {
      ok:r.ok,status:r.status,id:json.module.id,order:json.module.order,moduleStatus:json.module.status,
      sessions:json.sessions.length,tasks:Object.keys(json.problems).length,
      hashes:course.sessions.every(s=>/^[0-9a-f]{64}$/.test(s.contractHash)),
      fingerprints:Object.keys(course.assessmentFingerprints).length
    };
  });
  assert.equal(runtime.ok,true);assert.equal(runtime.status,200);
  assert.equal(runtime.id,'SIDE278');assert.equal(runtime.order,15);
  assert.equal(runtime.moduleStatus,'repaired-builder-candidate-unpublished');
  assert.equal(runtime.sessions,16);assert.equal(runtime.tasks,32);assert.equal(runtime.hashes,true);assert.equal(runtime.fingerprints,32);

  // Mount M15 through the real learner UI in this browser only. Persisted
  // metadata is never written or published.
  await page.route('**/course/t22/generated/course-meta.json',async route=>{
    const response=await route.fetch(),meta=await response.json();
    assert.equal(meta.moduleSources.length,14,'test interception must begin from published M01-M14 metadata');
    meta.moduleSources.push({order:15,id:'SIDE278',sourceType:'authoring-pack',source:'course/t22/authoring/m15-side278.json'});
    await route.fulfill({response,json:meta});
  });

  await page.goto(base+'/t22-course.html?module=15&session=1');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#module option').count(),15);
  assert.equal(await page.locator('#module').inputValue(),'SIDE278');
  assert((await page.locator('#module').allTextContents()).join(' ').includes('Orthogonality, Projection & Least Squares Geometry'));
  assert.equal(await page.locator('#session option').count(),16);

  let renderedSurfaces=0;
  for(let n=1;n<=16;n++){
    const s=candidate.sessions[n-1];
    await page.selectOption('#session',String(n));
    assert((await page.locator('#sessionMeta').textContent()).includes(`S${String(n).padStart(2,'0')}@1`));
    assert.equal(await page.locator('#title').textContent(),s.title);
    assert.equal(await page.locator('#focus').textContent(),s.focus);
    const contract=await page.locator('#contractText').textContent();
    assert(contract.includes(s.centralCapability));
    for(const claim of s.requiredOwnership)assert(contract.includes(claim));
    renderedSurfaces+=2+s.requiredOwnership.length;

    await page.click('#note');
    assert.equal(await page.locator('#learning').isVisible(),true);
    const lessonText=await page.locator('#learning').textContent();
    assert(lessonText.includes(s.lesson));
    assert(!lessonText.includes('\\n'));
    assert(!lessonText.includes('\uFFFD'));
    assert.equal(await page.locator('#guidedPanel').isVisible(),true);
    assert.equal(await page.locator('#guidedCheck').isDisabled(),true);
    assert.equal(await page.locator('#guidedFeedback').isVisible(),false);
    await page.fill('#guidedAnswer',`M15 S${n} guided render probe attempted before feedback.`);
    await page.click('#guidedCheck');
    const gf=await page.locator('#guidedFeedback').textContent();
    assert.equal(gf,s.guidedFeedback);
    assert(!gf.includes('\\n'));assert(!gf.includes('\uFFFD'));
    renderedSurfaces+=2;

    for(const kind of ['main','transfer']){
      const id=s[kind],p=candidate.problems[id],e=candidate.evaluators[id];
      await page.click(kind==='main'?'#mainTask':'#transferTask');
      assert.equal(await page.locator('#problem').textContent(),p.prompt);
      assert(!p.prompt.includes('\uFFFD'));
      renderedSurfaces++;
      await page.fill('#answer',`Browser render probe for M15 S${n} ${kind}; not learner evidence.`);
      await page.click('#save');
      await page.click('#reveal');
      await page.waitForSelector('#reference:not([hidden])');
      const ref=await page.locator('#reference').textContent();
      assert(ref.includes(e.reference));
      assert(!ref.includes('\\n'));assert(!ref.includes('\uFFFD'));
      for(const row of e.rubric)assert(ref.includes(`${row.points} points: ${row.criterion}`));
      renderedSurfaces+=1+e.rubric.length;
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
    }
  }
  assert(renderedSurfaces>150,'unexpectedly few M15 learner surfaces rendered');

  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));
  const attempts=stored.attempts.filter(x=>x.problemId.includes('SIDE278'));
  assert.equal(attempts.length,32);
  assert(attempts.every(x=>x.noteSeenDuringAttempt===true&&x.assistance==='guided'));

  const downloadEvent=page.waitForEvent('download');await page.click('#export');
  const download=await downloadEvent,exported=JSON.parse(await readFile(await download.path()));
  await page.setInputFiles('#import',{name:'m15-candidate-evidence.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
  await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Evidence merged'));
  await page.reload();await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#module').inputValue(),'SIDE278');
  assert.equal(await page.locator('#session option').count(),16);
  const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));
  assert.equal(restored.attempts.filter(x=>x.problemId.includes('SIDE278')).length,32);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(errors,[]);
  await context.close();

  console.log(`PASS M15 candidate browser: persisted learner registry stayed M01-M14; test-only M15 rendered all 16 lessons/guided states and 32 prompt/reference/rubric paths, saved/revealed/exported/imported/reloaded without text corruption or overflow. Surfaces checked: ${renderedSurfaces}.`);
}finally{
  if(browser)await browser.close();
  await new Promise(r=>server.close(r));
}
