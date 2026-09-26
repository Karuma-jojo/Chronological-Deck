import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';

const require=createRequire(import.meta.url);let chromium;
try{({chromium}=require('playwright'));}catch{try{({chromium}=require('./review-tests/node_modules/@playwright/test'));}catch{({chromium}=require((process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules')+'/playwright'));}}

const candidate=JSON.parse(await readFile('course/t22/authoring/m14-side276.json','utf8'));

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

  // M14 is published: load the persisted learner registry without interception.
  const publishedMeta=JSON.parse(await readFile('course/t22/generated/course-meta.json','utf8'));
  assert.equal(publishedMeta.moduleSources.length,14,'published registry must contain M01-M14');
  assert(publishedMeta.moduleSources.some(x=>x.order===14&&x.id==='SIDE276'&&x.source==='course/t22/authoring/m14-side276.json'),'published registry missing SIDE276');

  await page.goto(base+'/t22-course.html?module=14&session=1');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));

  assert.equal(await page.locator('#module option').count(),14,'published learner route must expose M14');
  assert.equal(await page.locator('#module').inputValue(),'SIDE276');
  assert((await page.locator('#module').allTextContents()).join(' ').includes('Matrices, Linear Maps & Linear Systems'));
  assert.equal(await page.locator('#session option').count(),19);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);

  // Confirm runtime contracts/fingerprints are generated from the current
  // candidate and every task can be selected through the learner UI.
  const runtime=await page.evaluate(async()=>{
    const json=await (await fetch('/course/t22/authoring/m14-side276.json',{cache:'no-store'})).json();
    const core=await import('/js/t22-course/core.js');
    const course={version:json.version,module:json.module,modules:[json.module],sessions:structuredClone(json.sessions),problems:structuredClone(json.problems),assessmentEquivalences:{}};
    await core.prepareContractHashes(course);
    await core.prepareAssessmentFingerprints(course,json.evaluators);
    return {
      id:json.module.id,order:json.module.order,status:json.module.status,
      sessions:json.sessions.length,tasks:Object.keys(json.problems).length,
      hashes:course.sessions.every(s=>/^[0-9a-f]{64}$/.test(s.contractHash)),
      fingerprints:Object.keys(course.assessmentFingerprints).length
    };
  });
  assert.equal(runtime.id,'SIDE276');assert.equal(runtime.order,14);
  assert.equal(runtime.status,'published-user-authorized-independent-accepted');
  assert.equal(runtime.sessions,19);assert.equal(runtime.tasks,38);
  assert.equal(runtime.hashes,true);assert.equal(runtime.fingerprints,38);

  let renderedSurfaces=0;
  for(let n=1;n<=19;n++){
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
    await page.fill('#guidedAnswer',`M14 S${n} guided render probe attempted before feedback.`);
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
      await page.fill('#answer',`Browser render probe for M14 S${n} ${kind}; not learner evidence.`);
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

  // 19 lessons + guided feedback + both task/evaluator/rubric surfaces were
  // exercised in the actual UI, not merely placed in a hidden PRE element.
  assert(renderedSurfaces>180,'unexpectedly few learner surfaces were rendered');

  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));
  const m14Attempts=stored.attempts.filter(a=>a.problemId.includes('SIDE276'));
  assert.equal(m14Attempts.length,38);
  assert(m14Attempts.every(a=>a.noteSeenDuringAttempt===true&&a.assistance==='guided'));

  const downloadEvent=page.waitForEvent('download');await page.click('#export');
  const download=await downloadEvent,exported=JSON.parse(await readFile(await download.path()));
  await page.setInputFiles('#import',{name:'m14-ui-probe-evidence.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
  await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Evidence merged'));
  await page.reload();await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#module').inputValue(),'SIDE276');
  assert.equal(await page.locator('#session option').count(),19);
  const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));
  assert.equal(restored.attempts.filter(a=>a.problemId.includes('SIDE276')).length,38);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(errors,[]);
  await context.close();

  console.log(`PASS M14 published learner browser: persisted M01-M14 registry loaded SIDE276 in the real learner UI; all 19 lessons/guided states and 38 prompt/reference/rubric paths rendered, saved, revealed, exported/imported and reloaded without text corruption or horizontal overflow. Surfaces checked: ${renderedSurfaces}.`);
}finally{
  if(browser)await browser.close();
  await new Promise(r=>server.close(r));
}
