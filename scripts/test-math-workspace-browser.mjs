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

const waitReady=page=>page.waitForFunction(()=>document.querySelector('#status')?.textContent.startsWith('Ready:'));

try{
  browser=await chromium.launch({headless:true,executablePath:process.env.REVIEW_CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage']});
  const context=await browser.newContext({viewport:{width:1280,height:900}});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));

  // Exact T25 resume includes session, main/transfer task and presentation.
  await page.goto(base+'/t25-course.html?session=7&presentation=plain&task=transfer');
  await waitReady(page);
  assert.equal(await page.locator('#session').inputValue(),'7');
  assert.equal(await page.locator('#presentation').inputValue(),'plain');
  assert((await page.locator('#taskMeta').textContent()).includes('007-T'));
  assert((await page.locator('#workspacePosition').textContent()).includes('transfer'));

  // Same-tab working and scroll survive a generic workspace round-trip.
  await page.fill('#answer','Unsaved T25 working that must survive a workspace jump.');
  await page.evaluate(()=>window.scrollTo(0,1000));
  const t25Scroll=await page.evaluate(()=>window.scrollY);
  assert(t25Scroll>300);
  await page.click('#workspaceSMMC');
  await waitReady(page);
  assert(page.url().includes('/smmc-course.html'));
  await page.click('#workspaceT25');
  await waitReady(page);
  assert.equal(await page.locator('#session').inputValue(),'7');
  assert((await page.locator('#taskMeta').textContent()).includes('007-T'));
  assert.equal(await page.locator('#answer').inputValue(),'Unsaved T25 working that must survive a workspace jump.');
  await page.waitForTimeout(80);
  assert(Math.abs((await page.evaluate(()=>window.scrollY))-t25Scroll)<120);

  // Mathematical T25 -> SMMC connection opens the exact mapped historical problem.
  assert((await page.locator('#smmcConnections a').count())>0);
  const firstSmmcHref=await page.locator('#smmcConnections a').first().getAttribute('href');
  const firstSmmcUrl=new URL(firstSmmcHref,base+'/');
  const mappedProblem=firstSmmcUrl.searchParams.get('problem');
  assert(mappedProblem?.startsWith('SMMC-'));
  assert.equal(firstSmmcUrl.searchParams.get('focus'),'histTitle');

  await page.locator('#smmcConnections a').first().click();
  await waitReady(page);
  assert.equal(await page.locator('#problemSelect').inputValue(),mappedProblem);
  assert(await page.locator('#tabMap').evaluate(el=>el.classList.contains('active')));

  // T25 and Aster are the same exact session/task with different presentation.
  assert((await page.locator('#workspaceT25').getAttribute('href')).includes('session=7'));
  assert((await page.locator('#workspaceT25').getAttribute('href')).includes('task=transfer'));
  await page.click('#workspaceAster');
  await waitReady(page);
  assert.equal(await page.locator('#session').inputValue(),'7');
  assert.equal(await page.locator('#presentation').inputValue(),'anime');
  assert((await page.locator('#taskMeta').textContent()).includes('007-T'));
  assert(await page.locator('#scene').isVisible());

  // SMMC resumes the historical problem we left.
  await page.click('#workspaceSMMC');
  await waitReady(page);
  assert.equal(await page.locator('#problemSelect').inputValue(),mappedProblem);
  assert(await page.locator('#tabMap').evaluate(el=>el.classList.contains('active')));

  // SMMC Study remembers exact unit, transfer task, scroll and unsaved working.
  await page.click('#tabStudy');
  await page.selectOption('#unitSelect','S-BRIDGE-N1-U02');
  await page.click('#transferTask');
  assert((await page.locator('#taskMeta').textContent()).includes('S-NEUTRAL-N1-04'));
  await page.fill('#answer','Unsaved SMMC working that must survive a workspace jump.');
  await page.evaluate(()=>window.scrollTo(0,900));
  const smmcScroll=await page.evaluate(()=>window.scrollY);
  assert(smmcScroll>300);

  await page.click('#workspaceT25');
  await waitReady(page);
  assert.equal(await page.locator('#session').inputValue(),'7');
  assert((await page.locator('#taskMeta').textContent()).includes('007-T'));

  await page.click('#workspaceSMMC');
  await waitReady(page);
  assert(await page.locator('#tabStudy').evaluate(el=>el.classList.contains('active')));
  assert.equal(await page.locator('#unitSelect').inputValue(),'S-BRIDGE-N1-U02');
  assert((await page.locator('#taskMeta').textContent()).includes('S-NEUTRAL-N1-04'));
  assert.equal(await page.locator('#answer').inputValue(),'Unsaved SMMC working that must survive a workspace jump.');
  await page.waitForTimeout(80);
  assert(Math.abs((await page.evaluate(()=>window.scrollY))-smmcScroll)<120);

  // SMMC mathematical connection cards deliberately deep-link to the T25 task area.
  const plainLink=page.locator('#unitT25Connections a').filter({hasText:'Open T25'}).first();
  const asterLink=page.locator('#unitT25Connections a').filter({hasText:'Open in Aster'}).first();
  assert((await plainLink.getAttribute('href')).includes('focus=problem'));
  assert((await plainLink.getAttribute('href')).includes('task=main'));
  assert((await asterLink.getAttribute('href')).includes('presentation=anime'));

  // Sticky workspace switcher remains available away from the page header.
  const position=await page.locator('.workspace-dock').evaluate(el=>getComputedStyle(el).position);
  assert.equal(position,'sticky');

  assert.deepEqual(errors,[]);
  console.log('PASS: workspace resumes exact T25 task/presentation/scroll/draft and exact SMMC tab/problem/unit/task/scroll/draft with deep mathematical links.');
} finally {
  if(browser)await browser.close();
  server.close();
}
