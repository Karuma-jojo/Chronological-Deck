import assert from 'node:assert/strict';
import fs from 'node:fs';
const pack=JSON.parse(fs.readFileSync('course/t22/authoring/m09.json','utf8'));
const state=page=>page.evaluate(()=>JSON.parse(localStorage.getItem('chrono_t22_elite_course_evidence_v1')));
export async function runM09BrowserChecks(browser,base,sharedPage){
 const c=await browser.newContext({viewport:{width:390,height:844},permissions:['clipboard-read','clipboard-write']});
 const p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'/t22-course.html?module=9&session=1');
 await p.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
 assert.equal(await p.locator('#module').inputValue(),'SIDE263');
 assert.equal(await p.locator('#session option').count(),27);
 // Read every actual rendered assessment and lesson at mobile width.
 for(const s of pack.sessions){
  await p.selectOption('#session',String(s.order));
  for(const k of ['main','transfer']){
   await p.click(k==='main'?'#mainTask':'#transferTask');
   assert((await p.locator('#problem').textContent()).includes(pack.problems[s[k]].prompt),s.id+' '+k);
  }
  await p.click('#note');
  assert((await p.locator('#learning').textContent()).includes(s.lesson),s.id+' lesson');
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),s.id+' mobile overflow');
 }
 await p.selectOption('#session','2');await p.click('#mainTask');await p.click('#note');
 await p.fill('#answer','M09 main unsaved proof with epsilon cutoff');
 await p.click('#transferTask');await p.fill('#answer','M09 transfer unsaved quantifier rebuttal');await p.selectOption('#assistance','method_hint');
 await p.selectOption('#module','T22E-FND01');await p.selectOption('#module','SIDE263');await p.selectOption('#session','2');
 assert.equal(await p.locator('#answer').inputValue(),'M09 main unsaved proof with epsilon cutoff');
 await p.selectOption('#assistance','independent');await p.click('#save');
 assert.equal((await state(p)).attempts.at(-1).assistance,'guided');
 await p.click('#transferTask');assert.equal(await p.locator('#answer').inputValue(),'M09 transfer unsaved quantifier rebuttal');
 assert.equal(await p.locator('#assistance').inputValue(),'method_hint');
 await p.click('#save');await p.click('#reveal');await p.click('#saveReview');
 const st=await state(p);assert(st.attempts.at(-1).reviewOf);assert(st.attempts.at(-2).problemId.includes('SIDE263::S02-T'));
 await p.selectOption('#session','27');await p.click('#copyPacket');
 const packet=await p.evaluate(()=>navigator.clipboard.readText());assert(packet.includes('module SIDE263'));
 const exposed=await state(p);for(const k of ['main','transfer'])assert(exposed.exposures[pack.sessions[26][k]].referenceSeenAt);
 await p.click('#mainTask');await p.fill('#answer','Post-packet M09 synthesis');await p.selectOption('#assistance','independent');await p.click('#save');
 assert.equal((await state(p)).attempts.at(-1).assistance,'revealed');
 assert.deepEqual(errors,[]);await c.close();
 // A clean context proves that ordinary method instruction does not permanently reveal fixed answers.
 const clean=await browser.newContext();const q=await clean.newPage();
 await q.goto(base+'/t22-course.html?module=9&session=1');await q.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Ready:'));
 await q.click('#note');await q.click('#next');await q.click('#previous');await q.fill('#answer','Fresh M09 work after a distinct method example.');await q.click('#save');
 const fresh=(await state(q)).attempts.at(-1);assert.equal(fresh.assistance,'independent');assert.equal(fresh.referenceSeenBefore,false);assert.match(fresh.contractHash,/^[a-f0-9]{64}$/);assert.match(fresh.assessmentFingerprint,/^[a-f0-9]{64}$/);await clean.close();
 // Include M09 in the existing cross-module export/import round trip on the shared page.
 await sharedPage.selectOption('#module','SIDE263');await sharedPage.fill('#answer','M09 shared-store tail proof');await sharedPage.click('#save');
 assert((await state(sharedPage)).attempts.some(a=>a.problemId.includes('SIDE263')));
 console.log('PASS M09 browser: 27 lessons/54 tasks rendered, mobile width, drafts, guidance, save/reveal/review, packet exposure, clean navigation and nine-module export participation.');
}
