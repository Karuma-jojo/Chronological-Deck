import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
const key='chrono_t22_elite_course_evidence_v1';
const state=p=>p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
const ready=p=>p.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
export async function runRepairBrowserChecks(browser,base){
 const review=JSON.parse(await readFile('docs/t22-course/audit/m05-m06-reviewed-contracts.json'));
 for(const [module,mid,sourceN,targetN] of [[5,'T22E-TRD01',18,18],[6,'ARC502',10,1]]){
  const source=`T22V3::${mid}::S${String(sourceN).padStart(2,'0')}-M@1`,target=`T22V3::${mid}::S${String(targetN).padStart(2,'0')}-M@1`,sid=target.replace('-M@','@');
  const ctx=await browser.newContext(),p=await ctx.newPage();await p.goto(`${base}/t22-course.html?module=${module}&session=${sourceN}`);await ready(p);
  // Current instruction is guided in this attempt, but not permanently answer-revealed after a fresh visit.
  await p.click('#note');await p.click('#previous');await p.click('#next');await p.fill('#answer','Fresh reconstruction after current separated instruction');await p.click('#save');
  let st=await state(p);assert.equal(st.attempts.at(-1).assistance,'independent');assert.equal(st.attempts.at(-1).referenceSeenBefore,false);
  const oldAt='2026-09-18T07:00:00.000Z',old={schema:'t22e-course-evidence-v1',attempts:[{id:'historical-'+module,problemId:target,at:'2026-09-18T06:00:00.000Z',answer:'Original pre-exposure reasoning — preserve verbatim',assistance:'independent',minutes:7,result:'secure',error:'',referenceSeenBefore:false,noteSeenDuringAttempt:false,contractHash:review.modules[mid].baseline.contractHashes[sid],assessmentFingerprint:review.modules[mid].baseline.assessmentFingerprints[target]}],artifacts:[],exposures:{[source]:{firstSeen:oldAt,lastSeen:oldAt,views:1,lessonSeenAt:oldAt,lessonContentVersion:`m0${module}-instruction-v1`}}};
  // Import an old, unmigrated export into a browser that has already read the clean current version.
  await p.setInputFiles('#import',{name:'old.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(old))});await p.waitForFunction(()=>document.querySelector('#status').textContent.includes('Evidence merged'));
  st=await state(p);assert.equal(st.exposures[target].referenceSeenAt,oldAt);assert.deepEqual(st.attempts.find(x=>x.id==='historical-'+module),old.attempts[0]);
  await p.selectOption('#session',String(targetN));if(module===6)assert((await p.locator('#history').textContent()).includes('STALE CONTRACT/ASSESSMENT'));
  await p.fill('#answer','New work after importing historical answer-bearing exposure');await p.click('#save');st=await state(p);assert.equal(st.attempts.at(-1).assistance,'revealed');assert.equal(st.attempts.at(-1).referenceSeenBefore,true);
  const download=p.waitForEvent('download');await p.click('#export');const artifact=await download;const exported=JSON.parse(await readFile(await artifact.path()));
  const ctx2=await browser.newContext(),p2=await ctx2.newPage();await p2.goto(`${base}/t22-course.html?module=${module}&session=${targetN}`);await ready(p2);await p2.setInputFiles('#import',{name:'roundtrip.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});await p2.waitForFunction(()=>document.querySelector('#status').textContent.includes('Evidence merged'));await p2.reload();await ready(p2);
  const imported=await state(p2);assert.equal(imported.exposures[target].referenceSeenAt,oldAt);assert.deepEqual(imported.attempts,exported.attempts);await ctx2.close();await ctx.close();
 }
 // A changed first-passage task keeps its historical response, marked stale, under the stable ID.
 const ctx=await browser.newContext(),p=await ctx.newPage();await p.goto(base+'/t22-course.html?module=5&session=12');await ready(p);await p.click('#transferTask');assert((await p.locator('#problem').textContent()).includes('unstopped endpoint'));
 await p.fill('#answer','New first-passage response');await p.click('#save');let st=await state(p),saved=st.attempts.at(-1);saved.assessmentFingerprint=review.modules['T22E-TRD01'].baseline.assessmentFingerprints[saved.problemId];saved.answer='Historical two-play answer .09';
 await p.evaluate(({key,st})=>localStorage.setItem(key,JSON.stringify(st)),{key,st});await p.reload();await ready(p);await p.click('#transferTask');assert((await p.locator('#history').textContent()).includes('STALE CONTRACT/ASSESSMENT'));assert((await p.locator('#history').textContent()).includes('Historical two-play answer .09'));await ctx.close();
 // Offered old guided practice alone is not a solved-answer reveal.
 for(const [module,mid,n] of [[5,'T22E-TRD01',15],[5,'T22E-TRD01',16],[6,'ARC502',18]]){
  const c=await browser.newContext(),p=await c.newPage();await p.goto(`${base}/t22-course.html?module=${module}&session=${n}`);await ready(p);
  await p.evaluate(({key,mid,n,module})=>{const at='2026-09-18T07:00:00.000Z',pid=`T22V3::${mid}::S${String(n).padStart(2,'0')}-M@1`;localStorage.setItem(key,JSON.stringify({schema:'t22e-course-evidence-v1',attempts:[],artifacts:[],exposures:{[pid]:{firstSeen:at,lastSeen:at,views:1,lessonSeenAt:at,lessonContentVersion:`m0${module}-instruction-v1`}}}));},{key,mid,n,module});
  await p.reload();await ready(p);await p.click('#transferTask');await p.fill('#answer','Fresh response after old unsolved practice');await p.click('#save');const st=await state(p);assert.equal(st.attempts.at(-1).referenceSeenBefore,false);await c.close();
 }
 console.log('PASS repair browser: clean current notes, historical cross-session import into current instruction, preserved pre-exposure evidence, exposed later work, stale changed-task responses, export/import/reload, guided practice without fabricated reveals.');
}
