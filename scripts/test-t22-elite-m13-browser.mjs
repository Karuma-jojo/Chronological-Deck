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

  // Learner registry remains published through M12; M13 is a candidate.
  await page.goto(base+'/t22-course.html?module=12&session=1');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#module option').count(),12,'publication route must expose twelve modules');
  assert.equal(await page.locator('#module').inputValue(),'SIDE267');
  assert(!(await page.locator('#module').allTextContents()).join(' ').includes('Vectors, Span, Basis & Dot Products'));
  assert.equal(await page.locator('#session option').count(),19);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);

  const candidate=await page.evaluate(async()=>{
    const r=await fetch('/course/t22/authoring/m13-arc511.json',{cache:'no-store'});
    const json=await r.json();
    const core=await import('/js/t22-course/core.js');
    const course={version:json.version,module:json.module,modules:[json.module],sessions:structuredClone(json.sessions),problems:structuredClone(json.problems),assessmentEquivalences:{}};
    await core.prepareContractHashes(course);
    await core.prepareAssessmentFingerprints(course,json.evaluators);
    const host=document.createElement('pre');
    host.id='m13-render-probe';host.style.whiteSpace='pre-wrap';host.style.overflowWrap='anywhere';document.body.append(host);
    let badEscaped=0,badReplacement=0;
    for(const s of json.sessions){
      for(const text of [s.title,s.focus,s.lesson,s.guidedFeedback,json.problems[s.main].prompt,json.problems[s.transfer].prompt,json.evaluators[s.main].reference,json.evaluators[s.transfer].reference,...json.evaluators[s.main].rubric.map(r=>r.criterion),...json.evaluators[s.transfer].rubric.map(r=>r.criterion)]){
        host.textContent=text;
        const rendered=host.innerText;
        if(rendered.includes('\\\\n'))badEscaped++;
        if(rendered.includes('\uFFFD'))badReplacement++;
      }
    }
    return {
      ok:r.ok,status:r.status,id:json.module.id,order:json.module.order,moduleStatus:json.module.status,
      sessions:json.sessions.length,problems:Object.keys(json.problems).length,evaluators:Object.keys(json.evaluators).length,
      hashes:course.sessions.every(s=>/^[0-9a-f]{64}$/.test(s.contractHash)),
      fingerprints:Object.keys(course.assessmentFingerprints).length,
      badEscaped,badReplacement,
      ids:json.sessions.map(s=>[s.id,s.main,s.transfer]),
      lessonNewlines:json.sessions.every(s=>s.lesson.includes('\n')&&!s.lesson.includes('\\\\n')),
      htmlWidth:document.documentElement.scrollWidth,innerWidth
    };
  });
  assert.equal(candidate.ok,true);assert.equal(candidate.status,200);
  assert.equal(candidate.id,'ARC511');assert.equal(candidate.order,13);assert.equal(candidate.moduleStatus,'repaired-awaiting-follow-up');
  assert.equal(candidate.sessions,17);assert.equal(candidate.problems,34);assert.equal(candidate.evaluators,34);
  assert.equal(candidate.hashes,true);assert.equal(candidate.fingerprints,34);
  assert.equal(candidate.badEscaped,0);assert.equal(candidate.badReplacement,0);assert.equal(candidate.lessonNewlines,true);
  for(let i=0;i<candidate.ids.length;i++){
    const ss=String(i+1).padStart(2,'0');
    assert.deepEqual(candidate.ids[i],[`T22V3::ARC511::S${ss}@1`,`T22V3::ARC511::S${ss}-M@${[11,17].includes(i+1)?2:1}`,`T22V3::ARC511::S${ss}-T@${i+1===11?2:1}`]);
  }
  // Load M13 through the real UI in this browser test only. The persisted
  // course metadata and roadmap still keep it unpublished.
  await page.route('**/course/t22/generated/course-meta.json',async route=>{
    const response=await route.fetch(),meta=await response.json();
    meta.moduleSources.push({order:13,id:'ARC511',sourceType:'authoring-pack',source:'course/t22/authoring/m13-arc511.json'});
    await route.fulfill({response,json:meta});
  });
  await page.goto(base+'/t22-course.html?module=13&session=1');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#module option').count(),13);
  assert.equal(await page.locator('#module').inputValue(),'ARC511');
  assert.equal(await page.locator('#session option').count(),17);
  for(let n=1;n<=17;n++){
    await page.selectOption('#session',String(n));
    assert((await page.locator('#sessionMeta').textContent()).includes(`S${String(n).padStart(2,'0')}@1`));
    await page.click('#note');
    assert.equal(await page.locator('#guidedPanel').isVisible(),true);
    assert.equal(await page.locator('#guidedCheck').isDisabled(),true);
    assert.equal(await page.locator('#guidedFeedback').isVisible(),false);
    await page.fill('#guidedAnswer',`S${n} attempted before checking.`);
    await page.click('#guidedCheck');
    assert((await page.locator('#guidedFeedback').textContent()).startsWith('Check after attempting.'));
    for(const kind of ['main','transfer']){
      await page.click(kind==='main'?'#mainTask':'#transferTask');
      assert((await page.locator('#problem').textContent()).length>90);
      await page.fill('#answer',`Browser render probe for S${n} ${kind}.`);
      await page.click('#save');
      await page.click('#reveal');
      await page.waitForSelector('#reference:not([hidden])');
      assert.equal(await page.locator('#reference').isVisible(),true);
      assert((await page.locator('#reference').textContent()).includes('points:'));
    }
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(errors,[]);
  await context.close();

  console.log('PASS M13 repaired candidate browser probe: persisted learner registry remains through M12; test-only M13 route renders all 17 lessons, staged guided checks, 34 task/reference/rubric surfaces, and runtime hashes/fingerprints without text corruption.');
}finally{
  if(browser)await browser.close();
  await new Promise(r=>server.close(r));
}
