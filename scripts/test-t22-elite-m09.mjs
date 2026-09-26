import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {prepareContractHashes,prepareAssessmentFingerprints,evidenceIsCurrent,emptyEvidence,exposeAnswersForSession,moduleEvidenceSummary,validateEvidence} from '../js/t22-course/core.js';
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const a=read('course/t22/authoring/m09.json'),contract=read('docs/t22-course/audit/m09-semantic-contract.json');
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const sha=x=>createHash('sha256').update(typeof x==='string'?x:JSON.stringify(stable(x))).digest('hex');
const meta=read('course/t22/generated/course-meta.json'),deps=read('docs/t22-rebuild/m65.dependencies.json');
assert.equal(a.module.id,'SIDE263');assert.equal(a.sessions.length,27);assert.equal(Object.keys(a.problems).length,54);assert.equal(Object.keys(a.evaluators).length,54);
assert.deepEqual(a.boundary.prerequisiteModules,deps.modules.find(m=>m.id==='SIDE263').prerequisites);
assert.equal(meta.moduleSources.filter(x=>x.order<=9).length,9);assert(meta.moduleSources.some(x=>x.order===9&&x.source==='course/t22/authoring/m09.json'));assert(meta.moduleSources.length>=13,'later-authorized publication must preserve M09 and all subsequently published modules');
assert(!fs.existsSync('course/t22/authoring/m10.json'),'M10 is outside this assignment');
const baseline=read('docs/t22-course/audit/m09-preserved-baseline.json');
for(const [file,hash] of Object.entries(baseline.files))assert.equal(sha(fs.readFileSync(file,'utf8')),hash,file+' accepted-baseline drift');
function check(pack){
 const seen=new Set();
 for(const s of pack.sessions){
  assert(!seen.has(s.id));seen.add(s.id);assert.equal(s.id,`T22V3::SIDE263::S${String(s.order).padStart(2,'0')}@1`);
  assert(s.lesson.includes('Guided practice:'));assert(/Worked (example|proof|audit):/.test(s.lesson));
  assert(s.entryPrerequisites.length);for(const x of s.entryPrerequisites){for(const m of x.matchAll(/M09-S(\d+)/g))assert(Number(m[1])<s.order,`${s.id} forward prerequisite`);assert(!/M08|M10|ARC053/.test(x));}
  assert.equal(pack.claimEvidence[s.id].length,s.requiredOwnership.length);
  const pinned=contract.sessions[s.id];assert.equal(sha(s.lesson),pinned.lessonSha256);
  assert.deepEqual(pack.claimEvidence[s.id],pinned.links,'semantic claim link drift');
  for(const k of ['main','transfer']){
   const pr=pack.problems[s[k]],ev=pack.evaluators[s[k]];
   assert.equal(pr.id,s[k]);assert.equal(pr.kind,k);assert.equal(pr.obligationVersion,1);
   assert.equal(ev.rubric.reduce((z,x)=>z+x.points,0),10);
   assert.equal(sha({prompt:pr.prompt,evaluator:ev}),pinned.assessmentSha256[k],'reviewed assessment drift');
  }
  for(const [i,link] of pack.claimEvidence[s.id].entries()){
   assert.equal(link.claim,s.requiredOwnership[i]);assert.equal(link.publicRequest,pack.problems[s[link.task]].prompt);
   for(const criterion of link.rubricEvidence)assert(pack.evaluators[s[link.task]].rubric.some(r=>r.criterion===criterion));
   assert.deepEqual(pack.coverage[s.id][i],[link.task]);
  }
 }
}
check(a);
// Existing-but-wrong row and task mutations must fail, not merely dangling links.
for(const type of ['criterion','task','prompt','lesson']){
 const m=structuredClone(a),s=m.sessions[0],link=m.claimEvidence[s.id][0];
 if(type==='criterion')link.rubricEvidence=[m.evaluators[s.main].rubric[1].criterion];
 if(type==='task'){link.task='transfer';link.publicRequest=m.problems[s.transfer].prompt;link.rubricEvidence=[m.evaluators[s.transfer].rubric[0].criterion];}
 if(type==='prompt')m.problems[s.main].prompt+=' Ignore minimality.';
 if(type==='lesson')s.lesson+=' The fixed answer is fifteen.';
 assert.throws(()=>check(m),type+' mutation escaped');
}
const course={...structuredClone(a),modules:[a.module],assessmentEquivalences:{},reviewDays:[2,7,21,60]};
await prepareContractHashes(course);await prepareAssessmentFingerprints(course,a.evaluators);
const s=course.sessions[0],attempt={id:'m09-before',problemId:s.main,at:'2026-09-24T01:00:00.000Z',answer:'A quantified proof',assistance:'independent',result:'secure',minutes:1,error:'',referenceSeenBefore:false,noteSeenDuringAttempt:false,contractHash:s.contractHash,assessmentFingerprint:course.assessmentFingerprints[s.main]};
assert(evidenceIsCurrent(attempt,course));
for(const kind of ['prompt','reference','rubric','contract']){
 const c=structuredClone(course),ev=structuredClone(a.evaluators);
 if(kind==='prompt')c.problems[s.main].prompt+=' New obligation.';
 if(kind==='reference')ev[s.main].reference+=' Changed condition.';
 if(kind==='rubric')ev[s.main].rubric[0].criterion+=' Changed scoring.';
 if(kind==='contract'){delete c.sessions[0].contractHash;c.sessions[0].requiredOwnership.push('New capability');await prepareContractHashes(c);}
 await prepareAssessmentFingerprints(c,ev);assert.equal(evidenceIsCurrent(attempt,c),false,kind+' must stale previous evidence');
}
const state=emptyEvidence();state.attempts.push(attempt);exposeAnswersForSession(state,s,'2026-09-24T02:00:00.000Z');
assert.equal(moduleEvidenceSummary(course,state).sessions[0].main,true,'later exposure preserves earlier independent evidence');
state.attempts.push({...attempt,id:'after',problemId:s.transfer,at:'2026-09-24T03:00:00.000Z',assessmentFingerprint:course.assessmentFingerprints[s.transfer]});
assert.equal(moduleEvidenceSummary(course,state).sessions[0].transfer,false,'post-packet attempt cannot be independent evidence');
assert.equal(validateEvidence(state,course).attempts.length,2);
assert.deepEqual(a.historicalLessonAnswerOverlap.sessions,{});assert.deepEqual(a.historicalGuidedPracticeOverlap.sessions,{});
assert(a.sourceLedger.sources.every(x=>/^https:\/\//.test(x.source)&&x.checked==='2026-09-24'));
console.log(`PASS M09: 27 sessions, 54 tasks, ${Object.values(a.claimEvidence).flat().length} pinned semantic links; mutation sensitivity, baseline preservation, source/prerequisite checks and evidence provenance.`);
