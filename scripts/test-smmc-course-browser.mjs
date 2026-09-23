// PR-gate smoke test for the current SMMC UI head.
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

  await page.goto(base+'/smmc-course.html');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));

  assert.equal(await page.locator('#unitSelect option').count(),8);
  assert((await page.locator('#status').textContent()).includes('16 neutral tasks'));
  await page.click('#tabMap');
  assert.equal((await page.locator('#overlapSummary').textContent()).replace(/\s+/g,' ').trim(),'All 88 39 GREEN 27 AMBER 22 RED East A+B 30 GREEN 24 AMBER 18 RED');
  await page.click('#tabStudy');

  await page.fill('#answer','Smoke-test reasoning.');
  await page.click('#saveAttempt');
  assert(!(await page.locator('#revealRef').isDisabled()));
  await page.click('#revealRef');
  assert(await page.locator('#reference').isVisible());

  const neutral=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_neutral_study_v1')));
  assert.equal(neutral.attempts.length,1);

  await page.click('#selfReport');
  const hist1=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert.equal(hist1.units['S-METHOD-B1-U01'].selfReportedComplete,true);
  assert.equal(hist1.units['S-METHOD-B1-U01'].certifiedAt,undefined);

  await page.click('#tabMap');
  assert.equal(await page.locator('#problemSelect option').count(),88);

  await page.selectOption('#problemSelect','SMMC-2021-A3');
  assert(await page.locator('#researchInfo').isHidden());
  assert(!(await page.locator('#unlockBadge').textContent()).includes('AMBER'));

  await page.fill('#t25Input','F4,M2,M3,P2');
  await page.click('#applyTargets');
  assert.equal((await page.locator('#unlockBadge').textContent()).trim(),'SMMC unit needed');

  await page.click('#revealResearch');
  assert(await page.locator('#researchInfo').isVisible());
  assert.equal((await page.locator('#researchColor').textContent()).trim(),'AMBER');

  const hist2=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert(hist2.exposures['SMMC-2021-A3'].domainMetadataSeenAt);
  assert.equal(hist2.exposures['SMMC-2022-C2'],undefined);

  await page.selectOption('#problemSelect','SMMC-2022-C2');
  assert(await page.locator('#researchInfo').isHidden());
  assert((await page.locator('#histExposure').textContent()).includes('sealed'));

  assert.deepEqual(errors,[]);
  console.log('PASS: SMMC page loads 8 units/16 tasks/88 historical rows; neutral attempts stay separate; self-report does not certify; research labels reveal explicitly and contaminate only the selected problem.');
} finally {
  if(browser)await browser.close();
  server.close();
}
