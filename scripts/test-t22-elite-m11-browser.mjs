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

  await page.goto(base+'/t22-course.html?module=11&session=20');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#module option').count(),13,'publication route must expose twelve modules');
  assert.equal(await page.locator('#module').inputValue(),'ARC510');
  assert((await page.locator('#module').allTextContents()).join(' ').includes('Integration & Accumulation'));
  assert.equal(await page.locator('#session option').count(),20);

  const candidate=await page.evaluate(async()=>{
    const r=await fetch('/course/t22/authoring/m11-arc510.json',{cache:'no-store'});
    return {ok:r.ok,status:r.status,json:await r.json()};
  });
  assert.equal(candidate.ok,true);assert.equal(candidate.status,200);
  const a=candidate.json;
  assert.equal(a.module.id,'ARC510');assert.equal(a.module.order,11);assert.match(a.module.status,/published-independent-review-repaired/);
  assert.equal(a.sessions.length,20);assert.equal(Object.keys(a.problems).length,40);assert.equal(Object.keys(a.evaluators).length,40);
  for(let i=0;i<a.sessions.length;i++){
    const s=a.sessions[i],ss=String(i+1).padStart(2,'0');
    assert.equal(s.id,`T22V3::ARC510::S${ss}@1`);
    assert.equal(a.problems[s.main].kind,'main');assert.equal(a.problems[s.transfer].kind,'transfer');
    assert(a.evaluators[s.main].reference.length>60);assert(a.evaluators[s.transfer].reference.length>60);
  }
  assert(a.problems[a.sessions[18].main].prompt.includes('1/sqrt(x²+4)'));
  assert(a.problems[a.sessions[19].transfer].prompt.includes('Do not use probability language'));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(errors,[]);
  await context.close();

  console.log('PASS M11 browser publication: learner UI exposes ARC510 in the twelve-module route; all 20 sessions parse/render with repaired Unicode task surfaces intact.');
}finally{
  if(browser)await browser.close();
  await new Promise(r=>server.close(r));
}
