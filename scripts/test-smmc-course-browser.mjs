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
  assert((await page.locator('#status').textContent()).startsWith('Ready:'));
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

  await page.getByText('Mark this lesson reviewed',{exact:true}).click();
  await page.click('#selfReport');
  const hist1=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert.equal(hist1.units['S-METHOD-B1-U01'].selfReportedComplete,true);
  assert.equal(hist1.units['S-METHOD-B1-U01'].certifiedAt,undefined);

  await page.click('#tabMap');
  assert.equal(await page.locator('#problemSelect option').count(),88);

  // R01: pristine problems must not be discoverable through hidden synopsis terms.
  await page.fill('#problemSearch','cycle');
  assert.equal(await page.locator('#problemSelect option').count(),0,'Pristine synopsis leaked through historical search');
  await page.fill('#problemSearch','');
  assert.equal(await page.locator('#problemSelect option').count(),88);

  await page.selectOption('#problemSelect','SMMC-2021-A3');
  assert(await page.locator('#researchInfo').isHidden());
  assert(await page.locator('#histSynopsis').isHidden());
  assert.equal((await page.locator('#histSynopsis').textContent()).trim(),'','Protected synopsis should not be present in the hidden DOM');
  assert.equal((await page.locator('#unlockBadge').textContent()).trim(),'Protected');
  assert(await page.locator('#mappingTools').isHidden(),'Exact prerequisite mapping leaked before hint-bearing exposure');
  assert(await page.locator('#problemConnections').isHidden(),'Exact T25 connections leaked before hint-bearing exposure');
  assert(!(await page.locator('#unlockText').textContent()).includes('S-BRIDGE-GR1-U01'));
  assert(!(await page.locator('#unlockText').textContent()).includes('SMMC unit needed'));
  assert(!(await page.locator('#openOfficialPaper').isDisabled()));
  assert((await page.locator('#paperGuide').textContent()).includes('contains all 4 problems'));
  assert((await page.locator('#paperExposure').textContent()).includes('pristine'));
  assert((await page.locator('#pristineInventory').textContent()).includes('18 / 18'));

  page.once('dialog',dialog=>dialog.accept());
  await page.click('#revealSynopsis');
  assert(await page.locator('#histSynopsis').isVisible());
  assert((await page.locator('#histExposure').textContent()).includes('transfer'));
  assert((await page.locator('#paperExposure').textContent()).includes('breached'));
  assert((await page.locator('#pristineInventory').textContent()).includes('17 / 18'));
  let hist2=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert(hist2.exposures['SMMC-2021-A3'].statementSeenAt);
  assert.equal(hist2.exposures['SMMC-2021-A2'],undefined,'Isolated summary exposure spilled to sibling problem');
  assert.equal(hist2.exposures['SMMC-2022-C2'],undefined);
  assert.equal((await page.locator('#unlockBadge').textContent()).trim(),'Protected','Statement-only transfer exposure must not reveal route class');
  assert(await page.locator('#mappingTools').isHidden());
  assert(await page.locator('#problemConnections').isHidden());

  // Once A3 alone is exposed, its synopsis may become searchable without exposing siblings.
  await page.fill('#problemSearch','cycle');
  assert.equal(await page.locator('#problemSelect option').count(),1);
  assert.equal(await page.locator('#problemSelect option').first().getAttribute('value'),'SMMC-2021-A3');
  await page.fill('#problemSearch','');

  page.once('dialog',dialog=>dialog.accept());
  await page.click('#revealResearch');
  assert(await page.locator('#researchInfo').isVisible());
  assert.equal((await page.locator('#researchColor').textContent()).trim(),'AMBER');
  assert((await page.locator('#histExposure').textContent()).includes('development'));
  assert(!(await page.locator('#mappingTools').isHidden()),'Hint-bearing prerequisite mapper did not unlock after development exposure');
  assert(!(await page.locator('#problemConnections').isHidden()),'Hint-bearing T25 connections did not unlock after development exposure');
  assert((await page.locator('#problemT25Connections').textContent()).includes('Rank and solution existence'));

  await page.locator('#mappingTools > summary').click();
  await page.fill('#t25Input','F4,M2,M3,P2');
  await page.click('#applyTargets');
  assert.equal((await page.locator('#unlockBadge').textContent()).trim(),'SMMC unit needed');
  assert((await page.locator('#unlockText').textContent()).includes('S-BRIDGE-GR1-U01'));

  hist2=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert(hist2.exposures['SMMC-2021-A3'].materialHintSeenAt);
  assert.equal(hist2.exposures['SMMC-2021-A2'],undefined,'Research metadata exposure spilled to sibling problem');
  assert.equal(hist2.exposures['SMMC-2022-C2'],undefined);

  await page.click('#revealResearch');
  assert(await page.locator('#researchInfo').isHidden());

  page.once('dialog',dialog=>dialog.accept());
  await page.click('#togglePaper');
  assert(await page.locator('#officialPaperFrame').isVisible());
  assert((await page.locator('#officialPaperFrame').getAttribute('src')).endsWith('/smmc-2021-paper-a.pdf#page=2'));
  const histAfterPaper=await page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert(histAfterPaper.papers['2021-A'].paperOpenedAt,'Full paper open did not persist paperOpenedAt');
  for(const id of ['SMMC-2021-A1','SMMC-2021-A2','SMMC-2021-A3','SMMC-2021-A4']){
    assert(histAfterPaper.exposures[id].statementSeenAt,`Full paper open failed to mark ${id} statement seen`);
  }
  assert(histAfterPaper.exposures['SMMC-2021-A3'].materialHintSeenAt,'Existing hint exposure was lost');
  assert.equal(histAfterPaper.exposures['SMMC-2021-B1'],undefined,'A-paper open spilled into B paper');
  assert((await page.locator('#paperExposure').textContent()).includes('opened'));
  assert((await page.locator('#pristineInventory').textContent()).includes('17 / 18'));
  await page.click('#togglePaper');
  assert(await page.locator('#officialPaperFrame').isHidden());

  await page.selectOption('#problemSelect','SMMC-2022-C2');
  assert(await page.locator('#researchInfo').isHidden());
  assert(await page.locator('#histSynopsis').isHidden());
  assert((await page.locator('#histExposure').textContent()).includes('sealed'));

  // Export/import must preserve the irreversible paper/problem exposure ledger.
  await page.locator('#toolsMenu > summary').click();
  const vaultDownloadPromise=page.waitForEvent('download');
  await page.click('#export');
  const vaultDownload=await vaultDownloadPromise;
  const vaultExport=JSON.parse(await readFile(await vaultDownload.path(),'utf8'));
  assert(vaultExport.historical.papers['2021-A'].paperOpenedAt);
  assert(vaultExport.historical.exposures['SMMC-2021-A3'].materialHintSeenAt);
  const vaultImport=await browser.newContext();
  const vaultImportPage=await vaultImport.newPage();
  await vaultImportPage.goto(base+'/smmc-course.html?tab=map&problem=SMMC-2021-A3');
  await vaultImportPage.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  await vaultImportPage.setInputFiles('#import',{name:'smmc-vault-record.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(vaultExport))});
  await vaultImportPage.waitForFunction(()=>document.querySelector('#status').textContent==='SMMC record imported.');
  const importedVault=await vaultImportPage.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert(importedVault.papers['2021-A'].paperOpenedAt);
  assert(importedVault.exposures['SMMC-2021-A3'].materialHintSeenAt);
  assert((await vaultImportPage.locator('#paperExposure').textContent()).includes('opened'));
  await vaultImport.close();

  // R02: historical reveals fail closed when durable local persistence fails.
  const storageFailContext=await browser.newContext({viewport:{width:1280,height:900}});
  const storageFailPage=await storageFailContext.newPage();
  storageFailPage.on('pageerror',e=>errors.push(e.message));
  await storageFailPage.goto(base+'/smmc-course.html?tab=map&problem=SMMC-2021-A3');
  await storageFailPage.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  await storageFailPage.evaluate(()=>{
    const original=Storage.prototype.setItem;
    globalThis.__chronoOriginalSetItem=original;
    Storage.prototype.setItem=function(key,value){
      if(key==='chrono_smmc_historical_evidence_v1')throw new DOMException('forced storage failure','QuotaExceededError');
      return original.call(this,key,value);
    };
  });
  storageFailPage.once('dialog',dialog=>dialog.accept());
  await storageFailPage.click('#revealSynopsis');
  assert(await storageFailPage.locator('#histSynopsis').isHidden(),'Synopsis revealed after exposure persistence failed');
  assert.equal((await storageFailPage.locator('#histSynopsis').textContent()).trim(),'');
  assert((await storageFailPage.locator('#status').textContent()).includes('Protected archive locked'));
  storageFailPage.once('dialog',dialog=>dialog.accept());
  await storageFailPage.click('#revealResearch');
  assert(await storageFailPage.locator('#researchInfo').isHidden(),'Research metadata revealed after exposure persistence failed');
  storageFailPage.once('dialog',dialog=>dialog.accept());
  await storageFailPage.click('#togglePaper');
  assert(await storageFailPage.locator('#officialPaperFrame').isHidden(),'Full paper revealed after exposure persistence failed');
  const failedDurableState=await storageFailPage.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')||'null'));
  assert(!failedDurableState?.exposures?.['SMMC-2021-A3'],'Failed persistence still created durable A3 exposure');
  await storageFailContext.close();

  // R03: an older in-flight cloud result must merge with, never overwrite, a newer live exposure.
  let releaseHistoricalGet;
  const historicalGetGate=new Promise(resolve=>{releaseHistoricalGet=resolve;});
  let historicalGetCount=0;
  let resolveHistoricalPatch;
  const historicalPatchSeen=new Promise(resolve=>{resolveHistoricalPatch=resolve;});
  let patchedHistoricalPayload=null;
  let remoteHistorical={
    version:1,attempts:[],exposures:{},papers:{},modules:{},units:{}
  };
  const cloudRows=new Map();
  const raceContext=await browser.newContext({viewport:{width:1280,height:900}});
  await raceContext.addInitScript(()=>{
    localStorage.setItem('chrono_mastery_sync_config_v1',JSON.stringify({url:'https://cloud.test',key:'test-key'}));
    localStorage.setItem('chrono_mastery_sync_session_v1',JSON.stringify({
      access_token:'test-token',refresh_token:'refresh-token',expires_at:4102444800,
      user:{id:'user-1',email:'learner@example.test'}
    }));
  });
  await raceContext.route('https://cloud.test/**',async route=>{
    const request=route.request(),url=new URL(request.url()),method=request.method();
    if(!url.pathname.includes('/rest/v1/chrono_workspace_state')){
      await route.fulfill({status:404,contentType:'application/json',body:'{}'});return;
    }
    const scope=(url.searchParams.get('scope')||'').replace(/^eq\./,'');
    if(method==='GET'){
      if(scope==='smmc_historical'){
        historicalGetCount+=1;
        if(historicalGetCount===1)await historicalGetGate;
        await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify([{
          scope,payload:remoteHistorical,lock_version:1,updated_at:'2026-09-30T00:00:00.000Z'
        }])});
        return;
      }
      const row=cloudRows.get(scope);
      await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(row?[row]:[])});
      return;
    }
    const body=JSON.parse(request.postData()||'{}');
    if(method==='POST'){
      const row={scope:body.scope,payload:body.payload,lock_version:1,updated_at:'2026-09-30T00:00:01.000Z'};
      cloudRows.set(body.scope,row);
      await route.fulfill({status:201,contentType:'application/json',body:JSON.stringify([row])});
      return;
    }
    if(method==='PATCH'){
      if(scope==='smmc_historical'){
        remoteHistorical=body.payload;
        patchedHistoricalPayload=body.payload;
        resolveHistoricalPatch();
      }else{
        cloudRows.set(scope,{scope,payload:body.payload,lock_version:body.lock_version,updated_at:'2026-09-30T00:00:02.000Z'});
      }
      await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify([{
        scope,payload:body.payload,lock_version:body.lock_version,updated_at:'2026-09-30T00:00:02.000Z'
      }])});
      return;
    }
    await route.fulfill({status:405,contentType:'application/json',body:'{}'});
  });
  const racePage=await raceContext.newPage();
  racePage.on('pageerror',e=>errors.push(e.message));
  await racePage.goto(base+'/smmc-course.html?tab=map&problem=SMMC-2021-A3');
  await racePage.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  racePage.once('dialog',dialog=>dialog.accept());
  await racePage.click('#revealSynopsis');
  const beforeStaleCloud=await racePage.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert(beforeStaleCloud.exposures['SMMC-2021-A3'].statementSeenAt);
  releaseHistoricalGet();
  await Promise.race([
    historicalPatchSeen,
    new Promise((_,reject)=>setTimeout(()=>reject(new Error('Stale cloud result was not re-synced')),5000))
  ]);
  await racePage.waitForFunction(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')).exposures['SMMC-2021-A3']?.statementSeenAt);
  const afterStaleCloud=await racePage.evaluate(()=>JSON.parse(localStorage.getItem('chrono_smmc_historical_evidence_v1')));
  assert(afterStaleCloud.exposures['SMMC-2021-A3'].statementSeenAt,'Older cloud result erased newer local exposure');
  assert(patchedHistoricalPayload?.exposures?.['SMMC-2021-A3']?.statementSeenAt,'Newer local exposure was not pushed back after stale cloud merge');
  await raceContext.close();

  // A fresh learner starts on the foundation route without changing old deep links.
  const learner=await browser.newContext({viewport:{width:390,height:844},acceptDownloads:true});
  const learn=await learner.newPage();
  learn.on('pageerror',e=>errors.push(e.message));
  const learningRequests=[];learn.on('request',r=>learningRequests.push(r.url()));
  await learn.goto(base+'/smmc-course.html');
  await learn.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert(await learn.locator('#pathView').isVisible());
  await learn.click('#continueFoundation');
  assert(await learn.locator('#learnPanel').isVisible());
  assert(await learn.locator('#practicePanel').isHidden());
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
    if(!await learn.locator('#browseLessons').evaluate(el=>el.open))await learn.locator('#browseLessons > summary').click();
    await learn.selectOption('#unitSelect',id);
    assert.equal(await learn.locator('#guidedPanel').isVisible(),i<=4);
    await learn.click('#showPractice');
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
  await learn.locator('#toolsMenu > summary').click();
  const downloadPromise=learn.waitForEvent('download');await learn.click('#export');
  const download=await downloadPromise;const exported=JSON.parse(await readFile(await download.path(),'utf8'));
  assert.deepEqual(exported.neutralStudy,saved);
  const imported=await browser.newContext();const importPage=await imported.newPage();
  await importPage.goto(base+'/smmc-course.html');
  await importPage.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  await importPage.setInputFiles('#import',{name:'smmc-record.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
  await importPage.waitForFunction(()=>document.querySelector('#status').textContent==='SMMC record imported.');
  assert((await importPage.locator('#foundationProgress').textContent()).startsWith('12 of 12'));
  if(!await learn.locator('#browseLessons').evaluate(el=>el.open))await learn.locator('#browseLessons > summary').click();
  await learn.selectOption('#unitSelect','S-FOUNDATION-ALG1-U01');
  assert.equal(await learn.locator('#guidedAnswer').inputValue(),'The product is zero if either factor is zero.');
  assert(!await learn.locator('#toolsMenu').evaluate(el=>el.open),'Backup menu stayed open after download');
  await learn.click('#showPractice');
  await learn.click('#mainTask');
  assert(!(await learn.locator('#nextExercise').isDisabled()),'Saved task did not restore next action');
  await learn.click('#nextExercise');
  assert((await learn.locator('#questionPosition').textContent()).startsWith('Problem 2'));
  await learn.click('#nextExercise');
  assert.equal(await learn.locator('#unitSelect').inputValue(),'S-FOUNDATION-ALG1-U02');
  assert(await learn.locator('#learnPanel').isVisible());
  await learn.click('#showReview');
  assert(await learn.locator('#attemptHistory').evaluate(el=>el.open));
  await learn.click('#tabPath');
  assert(await learn.locator('#pathView').isVisible());
  assert(await learn.locator('#studyView').isHidden());
  await learn.reload();
  await learn.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
  assert(await learn.locator('#pathView').isVisible(),'Path deep link lost on reload');
  await learn.click('#tabStudy');await learn.click('#showPractice');
  assert(await learn.locator('#practicePanel').isVisible());
  await learn.click('#tabPath');
  await learn.evaluate(()=>window.scrollTo(0,0));
  assert(await learn.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'Mobile horizontal overflow');
  await learn.screenshot({path:'/tmp/smmc-foundation-mobile.png',fullPage:true});
  await importPage.setViewportSize({width:1280,height:900});
  await importPage.click('#tabStudy');
  await importPage.screenshot({path:'/tmp/smmc-foundation-desktop.png',fullPage:true});
  await learner.close();await imported.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: SMMC Gate 0 browser coverage includes 14 units/28 neutral tasks/88 historical rows; pristine synopsis search isolation; protected coarse readiness; transactional fail-closed historical reveals under localStorage failure; stale in-flight cloud merge preservation and re-sync; isolated summary exposure; hint-bearing research exposure; whole-session paper marking; pristine inventory; export/import; foundation and workspace regressions.');
} finally {
  if(browser)await browser.close();
  server.close();
}
