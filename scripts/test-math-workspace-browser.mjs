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
let browser;
const errors=[];

try{
  browser=await chromium.launch({headless:true,executablePath:process.env.REVIEW_CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage']});
  const context=await browser.newContext({viewport:{width:1280,height:900}});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));

  // Start at T25 F4.1 (session 7), where multiple SMMC records are mapped.
  await page.goto(base+'/t25-course.html?session=7&presentation=plain');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#session').inputValue(),'7');
  assert.equal(await page.locator('#presentation').inputValue(),'plain');
  assert((await page.locator('#workspacePosition').textContent()).includes('Session 007'));
  assert((await page.locator('#workspacePosition').textContent()).includes('Plain'));
  assert((await page.locator('#smmcConnections a').count())>0);

  const firstSmmcHref=await page.locator('#smmcConnections a').first().getAttribute('href');
  const firstSmmcUrl=new URL(firstSmmcHref,base+'/');
  const mappedProblem=firstSmmcUrl.searchParams.get('problem');
  assert(mappedProblem?.startsWith('SMMC-'));

  // Jump to the mapped SMMC problem.
  await page.locator('#smmcConnections a').first().click();
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert(page.url().includes('/smmc-course.html'));
  assert.equal(await page.locator('#problemSelect').inputValue(),mappedProblem);
  assert(await page.locator('#tabMap').evaluate(el=>el.classList.contains('active')));
  assert((await page.locator('#workspaceT25').getAttribute('href')).includes('session=7'));
  assert((await page.locator('#workspaceT25').getAttribute('href')).includes('presentation=plain'));

  // Return to the exact T25 session, then switch to Aster without changing session.
  await page.click('#workspaceT25');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#session').inputValue(),'7');
  assert.equal(await page.locator('#presentation').inputValue(),'plain');

  await page.click('#workspaceAster');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#session').inputValue(),'7');
  assert.equal(await page.locator('#presentation').inputValue(),'anime');
  assert(await page.locator('#scene').isVisible());

  // SMMC resumes the same historical problem we left.
  await page.click('#workspaceSMMC');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#problemSelect').inputValue(),mappedProblem);
  assert(await page.locator('#tabMap').evaluate(el=>el.classList.contains('active')));

  // Now preserve a Study-unit position and its transfer task across a round-trip.
  await page.click('#tabStudy');
  await page.selectOption('#unitSelect','S-BRIDGE-N1-U02');
  await page.click('#transferTask');
  assert((await page.locator('#taskMeta').textContent()).includes('S-NEUTRAL-N1-04'));

  await page.click('#workspaceT25');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await page.locator('#session').inputValue(),'7');

  await page.click('#workspaceSMMC');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert(await page.locator('#tabStudy').evaluate(el=>el.classList.contains('active')));
  assert.equal(await page.locator('#unitSelect').inputValue(),'S-BRIDGE-N1-U02');
  assert((await page.locator('#taskMeta').textContent()).includes('S-NEUTRAL-N1-04'));

  // SMMC's mathematical connection cards expose both presentation choices.
  assert((await page.locator('#unitT25Connections .t25-connection').count())>0);
  assert((await page.locator('#unitT25Connections a').filter({hasText:'Open T25'}).count())>0);
  assert((await page.locator('#unitT25Connections a').filter({hasText:'Open in Aster'}).count())>0);

  assert.deepEqual(errors,[]);
  console.log('PASS: T25, Aster and SMMC preserve session/problem/unit/task positions and provide bidirectional mathematical cross-links.');
} finally {
  if(browser)await browser.close();
  server.close();
}
