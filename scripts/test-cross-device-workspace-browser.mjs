import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';

const require=createRequire(import.meta.url);
let chromium;
try{({chromium}=require('playwright'));}catch{
  try{({chromium}=require('./review-tests/node_modules/@playwright/test'));}catch{
    ({chromium}=require((process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules')+'/playwright'));
  }
}

const server=createServer(async(req,res)=>{
  try{
    const path=resolve('.','.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html')));
    if(!path.startsWith(resolve('.')+'/')){res.writeHead(403).end();return;}
    res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.css':'text/css'})[extname(path)]||'text/plain');
    res.end(await readFile(path));
  }catch{res.writeHead(404).end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+server.address().port;

const rows=new Map();
let clock=0;
const iso=()=>new Date(Date.UTC(2026,8,24,0,0,clock++)).toISOString();
const cors={'access-control-allow-origin':'*','content-type':'application/json'};

function scopeFrom(url){
  return (url.searchParams.get('scope')||'').replace(/^eq\./,'');
}
async function cloudRoute(route){
  const request=route.request(),url=new URL(request.url()),method=request.method().toUpperCase();
  if(!url.pathname.endsWith('/rest/v1/chrono_workspace_state')){
    await route.fulfill({status:404,headers:cors,body:JSON.stringify({message:'unexpected endpoint'})});return;
  }
  const scope=scopeFrom(url);
  if(method==='GET'){
    const row=rows.get(scope);
    await route.fulfill({status:200,headers:cors,body:JSON.stringify(row?[row]:[])});return;
  }
  if(method==='POST'){
    const body=JSON.parse(request.postData()||'{}');
    if(rows.has(body.scope)){
      await route.fulfill({status:409,headers:cors,body:JSON.stringify({message:'duplicate'})});return;
    }
    const row={scope:body.scope,payload:body.payload,lock_version:1,updated_at:iso()};
    rows.set(body.scope,row);
    await route.fulfill({status:201,headers:cors,body:JSON.stringify([row])});return;
  }
  if(method==='PATCH'){
    const wanted=Number((url.searchParams.get('lock_version')||'').replace(/^eq\./,''));
    const old=rows.get(scope);
    if(!old||old.lock_version!==wanted){
      await route.fulfill({status:200,headers:cors,body:'[]'});return;
    }
    const body=JSON.parse(request.postData()||'{}');
    const row={...old,...body,updated_at:iso()};
    rows.set(scope,row);
    await route.fulfill({status:200,headers:cors,body:JSON.stringify([row])});return;
  }
  await route.fulfill({status:405,headers:cors,body:JSON.stringify({message:'method'})});
}

const cfg={url:'https://example.supabase.co',key:'public-test-key'};
const session={
  access_token:'same-account-token',
  refresh_token:'same-account-refresh',
  expires_at:Math.floor(Date.now()/1000)+3600,
  user:{id:'11111111-1111-1111-1111-111111111111',email:'learner@example.com'}
};
const init=({cfg,session})=>{
  localStorage.setItem('chrono_mastery_sync_config_v1',JSON.stringify(cfg));
  localStorage.setItem('chrono_mastery_sync_session_v1',JSON.stringify(session));
};

let browser;
try{
  browser=await chromium.launch({headless:true,executablePath:process.env.REVIEW_CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage']});

  // Device A: create durable T25 and SMMC progress.
  const a=await browser.newContext({viewport:{width:1280,height:900}});
  await a.addInitScript(init,{cfg,session});
  await a.route('https://example.supabase.co/**',cloudRoute);
  const pa=await a.newPage();

  await pa.goto(base+'/t25-course.html?session=7&presentation=plain&task=transfer');
  await pa.waitForFunction(()=>document.querySelector('#status')?.textContent.startsWith('Ready:'));
  assert((await pa.locator('#taskMeta').textContent()).includes('007-T'));
  await pa.fill('#answer','Device A durable T25 transfer attempt.');
  await pa.click('#save');
  await pa.waitForTimeout(1250);
  assert(rows.get('t25_course')?.payload?.attempts?.some(x=>x.answer==='Device A durable T25 transfer attempt.'));
  assert.equal(rows.get('workspace_nav')?.payload?.t25?.session,7);
  assert.equal(rows.get('workspace_nav')?.payload?.t25?.task,'transfer');

  await pa.click('#workspaceSMMC');
  await pa.waitForFunction(()=>document.querySelector('#status')?.textContent.startsWith('Ready:'));
  await pa.click('#tabStudy');
  await pa.selectOption('#unitSelect','S-BRIDGE-N1-U02');
  await pa.click('#transferTask');
  await pa.fill('#answer','Device A durable SMMC transfer attempt.');
  await pa.click('#saveAttempt');
  await pa.click('#selfReport');
  await pa.waitForTimeout(1250);
  assert(rows.get('smmc_study')?.payload?.attempts?.some(x=>x.answer==='Device A durable SMMC transfer attempt.'));
  assert.equal(rows.get('smmc_historical')?.payload?.units?.['S-BRIDGE-N1-U02']?.selfReportedComplete,true);
  assert.equal(rows.get('workspace_nav')?.payload?.smmc?.unitId,'S-BRIDGE-N1-U02');
  assert.equal(rows.get('workspace_nav')?.payload?.smmc?.taskId,'S-NEUTRAL-N1-04');
  await a.close();

  // Device B: empty local workspace, same account. Must hydrate from cloud.
  const b=await browser.newContext({viewport:{width:1280,height:900}});
  await b.addInitScript(init,{cfg,session});
  await b.route('https://example.supabase.co/**',cloudRoute);
  const pb=await b.newPage();

  await pb.goto(base+'/t25-course.html');
  await pb.waitForFunction(()=>document.querySelector('#status')?.textContent.startsWith('Ready:'));
  await pb.waitForFunction(()=>document.querySelector('#history')?.textContent.includes('Device A durable T25 transfer attempt.'));
  assert.equal(await pb.locator('#session').inputValue(),'7');
  assert((await pb.locator('#taskMeta').textContent()).includes('007-T'));
  assert.equal(await pb.locator('#workspaceCloud').textContent(),'Synced ☁');

  await pb.click('#workspaceSMMC');
  await pb.waitForFunction(()=>document.querySelector('#status')?.textContent.startsWith('Ready:'));
  await pb.waitForFunction(()=>document.querySelector('#history')?.textContent.includes('Device A durable SMMC transfer attempt.'));
  assert(await pb.locator('#tabStudy').evaluate(el=>el.classList.contains('active')));
  assert.equal(await pb.locator('#unitSelect').inputValue(),'S-BRIDGE-N1-U02');
  assert((await pb.locator('#taskMeta').textContent()).includes('S-NEUTRAL-N1-04'));
  assert((await pb.locator('#unitProgress').textContent()).includes('Self-reported complete'));
  assert.equal(await pb.locator('#workspaceCloud').textContent(),'Synced ☁');

  await b.close();
  console.log('PASS: same-account device B restored T25 evidence, SMMC study/progress, and exact workspace location saved on device A.');
} finally {
  await browser?.close();
  await new Promise(r=>server.close(r));
}
