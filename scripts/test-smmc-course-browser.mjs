// Current-head PR gate.
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
  const requests=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',r=>requests.push(r.url()));

  const home=await context.newPage();
  await home.goto(base+'/index.html');
  await home.waitForSelector('#openSMMC');
  assert.equal(await home.locator('#openSMMC').getAttribute('href'),'smmc-course.html');
  await home.close();

  await page.goto(base+'/smmc-course.html?unit=S-METHOD-B1-U01');
  await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));

  assert.equal(await page.locator('#unitSelect option').count(),14);
  assert((await page.locator('#status').textContent()).includes('28 neutral tasks'));
  await page.click('#tabMap');
  assert.deepEqual(await page.locator('#overlapSummary .overlap-stat strong').allTextContents(),['39','27','22','30','24','18']);
  assert.deepEqual(await page.locator('#overlapSummary .overlap-stat span').allTextContents(),['GREEN','AMBER','RED','GREEN','AMBER','RED']);
  await page.click('#tabStudy');

  assert(!requests.some(x=>x.endsWith('/course/smmc/authoring/evaluator-v1.mjs')),'SMMC evaluator bank fetched before explicit reveal');
  await page.fill('#answer','Smoke-test reasoning.');
  await page.click('#saveAttempt');
  assert(!(await page.locator('#revealRef').isDisabled()));
  await page.click('#revealRef');
  await page.waitForSelector('#reference:not([hidden])');
  assert(requests.some(x=>x.endsWith('/course/smmc/authoring/evaluator-v1.mjs')),'SMMC evaluator bank was not lazy-loaded on reveal');
  assert(await page.locator('#reference').isVisible());

  const neutral=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_neutral_study_v1')));
  assert.equal(neutral.attempts.length,1);

  await page.click('#selfReport');
  const hist1=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert.equal(hist1.units['S-METHOD-B1-U01'].selfReportedComplete,true);
  assert.equal(hist1.units['S-METHOD-B1-U01'].certifiedAt,undefined);

  await page.click('#tabMap');
  assert.equal(await page.locator('#problemSelect option').count(),148);

  await page.selectOption('#problemSelect','SMMC-2021-A3');
  assert(await page.locator('#researchInfo').isHidden());
  assert(!(await page.locator('#unlockBadge').textContent()).includes('AMBER'));
  assert((await page.locator('#openOfficialPaper').getAttribute('href')).endsWith('/smmc-2021-paper-a.pdf#page=2'));
  assert((await page.locator('#paperGuide').textContent()).includes('Read A3 on page 2'));

  await page.fill('#t25Input','F4,M2,M3,P2');
  await page.click('#applyTargets');
  assert.equal((await page.locator('#unlockBadge').textContent()).trim(),'SMMC unit needed');

  await page.click('#revealResearch');
  assert(await page.locator('#researchInfo').isVisible());
  assert.equal((await page.locator('#researchColor').textContent()).trim(),'AMBER');

  const hist2=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert.equal(hist2.exposures['SMMC-2021-A3'],undefined);
  assert.equal(hist2.exposures['SMMC-2022-C2'],undefined);

  await page.click('#revealResearch');
  assert(await page.locator('#researchInfo').isHidden());

  await page.click('#togglePaper');
  assert(await page.locator('#officialPaperFrame').isVisible());
  assert((await page.locator('#officialPaperFrame').getAttribute('src')).endsWith('/smmc-2021-paper-a.pdf#page=2'));
  const histAfterPaper=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert.equal(histAfterPaper.exposures['SMMC-2021-A3'],undefined);
  await page.click('#togglePaper');
  assert(await page.locator('#officialPaperFrame').isHidden());

  await page.selectOption('#problemSelect','SMMC-2022-C2');
  assert(await page.locator('#researchInfo').isHidden());
  assert((await page.locator('#histExposure').textContent()).includes('sealed'));

  // A fresh learner starts on the foundation route without changing old deep links.
  const learner=await browser.newContext({viewport:{width:390,height:844},acceptDownloads:true});
  const learn=await learner.newPage();
  learn.on('pageerror',e=>errors.push(e.message));
  const learningRequests=[];learn.on('request',r=>learningRequests.push(r.url()));
  await learn.goto(base+'/smmc-course.html');
  await learn.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await learn.locator('#unitSelect').inputValue(),'S-FOUNDATION-ALG1-U01');
  assert.equal(await learn.locator('#foundationPath button').count(),6);
  assert(await learn.locator('#prevUnit').isDisabled());
  assert(await learn.locator('#unitConnections').isHidden());
  assert(!learningRequests.some(x=>/foundation-references|evaluator-v1/.test(x)),'References fetched before help');
  assert(await learn.locator('#revealHint').isDisabled());
  await learn.click('#guidedFeedbackButton');
  assert(await learn.locator('#guidedFeedback').isHidden(),'Blank work revealed guided feedback');
  await learn.fill('#guidedAnswer','The product is zero if either factor is zero.');
  await learn.click('#guidedFeedbackButton');
  await learn.waitForSelector('#guidedFeedback:not([hidden])');
  assert((await learn.locator('#guidedFeedback').textContent()).includes('−2'));
  assert(await learn.locator('#reference').isHidden());
  for(let i=1;i<=6;i++){
    const id=`S-FOUNDATION-ALG1-U0${i}`;
    await learn.selectOption('#unitSelect',id);
    assert.equal(await learn.locator('#guidedPanel').isVisible(),i<=4);
    for(const button of ['mainTask','transferTask']){
      await learn.click('#'+button);
      assert(await learn.locator('#reference').isHidden());
      assert(await learn.locator('#revealRef').isDisabled());
      await learn.fill('#answer','Saved reasoning for browser workflow verification.');
      await learn.click('#saveAttempt');
      await learn.click('#revealHint');
      await learn.waitForSelector('#hint:not([hidden])');
      assert.equal(await learn.locator('#assistance').inputValue(),'hint');
      await learn.click('#revealRef');
      await learn.waitForSelector('#reference:not([hidden])');
      assert((await learn.locator('#referenceText').textContent()).length>100);
      await learn.selectOption('#assistance','independent');
      await learn.click('#saveAttempt');
    }
  }
  assert((await learn.locator('#foundationProgress').textContent()).startsWith('12 of 12'));
  assert(await learn.locator('#nextUnit').isDisabled());
  const saved=await learn.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_neutral_study_v1')));
  assert.equal(saved.attempts.length,24);
  assert(saved.attempts.filter((_,i)=>i%2===1).every(a=>a.referenceSeenBefore&&a.assistance==='revealed'),'Prior exposure was lost');
  const history=await learn.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert.deepEqual(history.exposures,{},'Foundation tasks changed historical exposure');
  await learn.reload();
  await learn.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert.equal(await learn.locator('#unitSelect').inputValue(),'S-FOUNDATION-ALG1-U06');
  assert((await learn.locator('#foundationProgress').textContent()).startsWith('12 of 12'));
  const downloadPromise=learn.waitForEvent('download');await learn.click('#export');
  const download=await downloadPromise;const exported=JSON.parse(await readFile(await download.path(),'utf8'));
  assert.deepEqual(exported.neutralStudy,saved);
  const imported=await browser.newContext();const importPage=await imported.newPage();
  await importPage.goto(base+'/smmc-course.html');
  await importPage.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  await importPage.setInputFiles('#import',{name:'smmc-record.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
  await importPage.waitForFunction(()=>document.querySelector('#status').textContent==='SMMC record imported.');
  assert((await importPage.locator('#foundationProgress').textContent()).startsWith('12 of 12'));
  await learn.selectOption('#unitSelect','S-FOUNDATION-ALG1-U01');
  assert.equal(await learn.locator('#guidedAnswer').inputValue(),'The product is zero if either factor is zero.');
  await learn.evaluate(()=>window.scrollTo(0,0));
  assert(await learn.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'Mobile horizontal overflow');
  await learn.screenshot({path:'/tmp/smmc-foundation-mobile.png',fullPage:true});
  await importPage.setViewportSize({width:1280,height:900});
  await importPage.screenshot({path:'/tmp/smmc-foundation-desktop.png',fullPage:true});
  await learner.close();await imported.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: All 12 foundation tasks, guided attempt gate, lazy help, exposure persistence, mobile layout, reload and export/import; SMMC page loads 14 units/28 tasks/88 historical rows; official problem papers are linked; neutral attempts stay separate; self-report does not certify; research metadata and paper viewing are reversible and do not write contamination state.');
} finally {
  if(browser)await browser.close();
  server.close();
}
