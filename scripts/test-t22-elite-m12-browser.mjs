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

  // Learner registry is intentionally published through M12.
  await page.goto(base+'/t22-course.html?module=12&session=19');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#module option').count(),13,'publication route must expose twelve modules');
  assert.equal(await page.locator('#module').inputValue(),'SIDE267');
  assert((await page.locator('#module').allTextContents()).join(' ').includes('Taylor Approximation, Asymptotics & Error'));
  assert.equal(await page.locator('#session option').count(),19);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);

  const candidate=await page.evaluate(async()=>{
    const r=await fetch('/course/t22/authoring/m12-side267.json',{cache:'no-store'});
    const json=await r.json();
    const core=await import('/js/t22-course/core.js');
    const course={version:json.version,module:json.module,modules:[json.module],sessions:structuredClone(json.sessions),problems:structuredClone(json.problems),assessmentEquivalences:{}};
    await core.prepareContractHashes(course);
    await core.prepareAssessmentFingerprints(course,json.evaluators);
    const host=document.createElement('pre');
    host.id='m12-render-probe';host.style.whiteSpace='pre-wrap';host.style.overflowWrap='anywhere';document.body.append(host);
    let badEscaped=0,badReplacement=0;
    for(const s of json.sessions){
      for(const text of [s.title,s.focus,s.lesson,json.problems[s.main].prompt,json.problems[s.transfer].prompt,json.evaluators[s.main].reference,json.evaluators[s.transfer].reference]){
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
  assert.equal(candidate.id,'SIDE267');assert.equal(candidate.order,12);assert.match(candidate.moduleStatus,/published-independent-audit-repaired/);
  assert.equal(candidate.sessions,19);assert.equal(candidate.problems,38);assert.equal(candidate.evaluators,38);
  assert.equal(candidate.hashes,true);assert.equal(candidate.fingerprints,38);
  assert.equal(candidate.badEscaped,0);assert.equal(candidate.badReplacement,0);assert.equal(candidate.lessonNewlines,true);
  for(let i=0;i<candidate.ids.length;i++){
    const ss=String(i+1).padStart(2,'0');
    assert.deepEqual(candidate.ids[i],[`T22V3::SIDE267::S${ss}@1`,`T22V3::SIDE267::S${ss}-M@1`,`T22V3::SIDE267::S${ss}-T@1`]);
  }
  assert.deepEqual(errors,[]);
  await context.close();

  console.log('PASS M12 browser publication/render probe: learner UI exposes SIDE267 in the twelve-module route; Chromium parses all 19 sessions, computes runtime hashes/fingerprints and renders changed text surfaces without escaped-newline or replacement-character corruption.');
}finally{
  if(browser)await browser.close();
  await new Promise(r=>server.close(r));
}
