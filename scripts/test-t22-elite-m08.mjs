import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {emptyEvidence,prepareContractHashes,prepareAssessmentFingerprints,evidenceIsCurrent,validateEvidence} from '../js/t22-course/core.js';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m08.json');
const semantic=read('docs/t22-course/audit/m08-semantic-contract.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const by=n=>a.sessions.find(s=>s.order===n);
assert.equal(a.version,'m08-authoring-v5-independent-accepted');
assert.equal(a.instructionVersion,'m08-instruction-v3-25-session-sizing');
assert.equal(a.module.id,'T22E-CODE01');
assert.equal(a.module.status,'independently-accepted-frozen');
assert.deepEqual(a.boundary.prerequisiteModules,['T22E-FND01','T22E-DISC01','ARC048']);
assert.deepEqual(deps.modules.find(x=>x.id==='T22E-CODE01').prerequisites,a.boundary.prerequisiteModules);
assert.equal(a.sessions.length,25);
assert.equal(Object.keys(a.problems).length,50);
assert.equal(Object.keys(a.evaluators).length,50);
assert.equal(Object.values(a.claimEvidence).flat().length,125);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,25);
assert.equal(Object.keys(semantic.sessions).length,25);
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const hashes=new Set();
for(const s of a.sessions){
 assert.equal(s.requiredOwnership.length,5);
 assert(s.lesson.includes('Worked example:')&&s.lesson.includes('Guided check:'),s.id);
 assert.equal(a.claimEvidence[s.id].length,5);
 assert.equal(a.semanticSeparationAudit.sessions[s.id].status,'bounded-followup-accepted-frozen');
 const h=crypto.createHash('sha256').update(JSON.stringify(stable({title:s.title,focus:s.focus,purpose:s.purpose,claims:s.requiredOwnership,lesson:s.lesson}))).digest('hex');
 assert(!hashes.has(h));hashes.add(h);
 for(const kind of ['main','transfer']){
  const id=s[kind],p=a.problems[id],ev=a.evaluators[id];
  assert([1,2,3].includes(p.obligationVersion));
  assert.equal(ev.rubric.length,5);
  assert.equal(ev.rubric.reduce((z,r)=>z+r.points,0),10);
  for(const frag of a.instructionSeparation[s.id][kind]){
   assert(p.prompt.includes(frag),`${s.id} ${kind} separation fragment missing from task`);
   assert(!s.lesson.includes(frag),`${s.id} ${kind} task fragment leaked into lesson`);
  }
 }
 const rec=semantic.sessions[String(s.order).padStart(2,'0')];
 assert.equal(rec.sessionId,s.id);assert.equal(rec.links.length,5);
 for(let i=0;i<5;i++){
  const row=a.claimEvidence[s.id][i],link=rec.links[i],pid=s[row.task],ev=a.evaluators[pid];
  assert.equal(row.claim,s.requiredOwnership[i]);
  assert.equal(link.claim,row.claim);
  assert.equal(link.task,row.task);
  assert.equal(row.publicRequest,a.problems[pid].prompt);
  const expected=link.rows.map(r=>ev.rubric[r-1].criterion);
  assert.deepEqual(row.rubricEvidence,expected,`${s.id} claim ${i+1} semantic rubric drift`);
  assert.deepEqual(a.coverage[s.id][i],[row.task]);
 }
 assert(a.prerequisiteAudit['S'+String(s.order).padStart(2,'0')]?.length);
}
// Mutation sensitivity: wrong-but-existing criteria/tasks must fail the reviewed semantic contract.
function checkSemantic(pack){
 for(const s of pack.sessions){
  const rec=semantic.sessions[String(s.order).padStart(2,'0')];
  for(let i=0;i<5;i++){
   const row=pack.claimEvidence[s.id][i],link=rec.links[i],pid=s[link.task],ev=pack.evaluators[pid];
   assert.equal(row.claim,s.requiredOwnership[i]);
   assert.equal(row.task,link.task);
   assert.equal(row.publicRequest,pack.problems[pid].prompt);
   assert.deepEqual(row.rubricEvidence,link.rows.map(r=>ev.rubric[r-1].criterion));
  }
 }
}
checkSemantic(a);
{
 const m=structuredClone(a),s=by(13);
 m.claimEvidence[s.id][2].rubricEvidence=[m.evaluators[s.transfer].rubric[0].criterion];
 assert.throws(()=>checkSemantic(m));
}
{
 const m=structuredClone(a),s=by(18);
 m.claimEvidence[s.id][2].task='transfer';
 m.claimEvidence[s.id][2].publicRequest=m.problems[s.transfer].prompt;
 m.claimEvidence[s.id][2].rubricEvidence=[m.evaluators[s.transfer].rubric[0].criterion];
 assert.throws(()=>checkSemantic(m));
}
// Source/boundary pins.
for(const id of ['PY-FLOAT','PY-FRAC','PY-ITER','PY-RNG','PY-ASSERT','PY-FAQ','PY-MOD','PY-ERR','PY-ZIP'])assert(a.sourceLedger.sources.some(x=>x.id===id));
for(const forbidden of ['numpy','pandas','bootstrap','confidence interval','central limit theorem','backtest']){
 assert(!a.sessions.some(s=>s.lesson.toLowerCase().includes(forbidden)),`M08 boundary leak: ${forbidden}`);
}
assert(by(13).lesson.includes('No RNG is involved'));
assert(by(2).lesson.includes('23//4')&&by(2).lesson.includes('23%4'));
assert.deepEqual(by(2).entryPrerequisites,['M03-S12 quotient/remainder identity','JIT Python numeric operators']);
assert(by(5).entryPrerequisites[0].includes('finite accumulation is taught JIT in this lesson'));
assert(by(3).lesson.includes('import math')&&by(3).lesson.includes('abs_tol'));
assert(by(8).lesson.includes('passed as arguments')&&by(8).lesson.includes('without parentheses'));
assert(by(10).lesson.includes('counts.get(x,0)+1'));
assert(by(12).lesson.includes('strict=True')&&by(12).lesson.includes('ValueError'));
assert(by(12).lesson.includes('weighted_average=weighted_sum/weight_sum')&&by(12).lesson.includes('total weight must be nonzero'));
assert(by(13).lesson.includes('from itertools import product'));
assert(by(14).lesson.includes('from fractions import Fraction'));
assert(by(18).lesson.includes('-O'));
assert(by(19).lesson.includes('traceback')&&by(19).lesson.includes('source line'));
assert(by(19).lesson.includes('raise ValueError')&&by(19).lesson.includes('count < 1'));
assert(by(20).lesson.includes('from random import Random')&&by(20).lesson.includes('internal state'));
assert.deepEqual(by(7).entryPrerequisites,['M03-S20 functions as mappings','M08-S01 assignment','Python function definitions']);
assert(by(22).lesson.includes('estimate0.322'));
assert(a.problems[by(22).main].prompt.includes('Random(31415)')&&a.problems[by(22).main].prompt.includes('N=1200'));
assert(by(23).lesson.includes('getstate()')&&by(23).lesson.includes('setstate()'));
assert(by(24).lesson.includes('six diagonal pairs'));
assert(a.problems[by(13).main].prompt.includes('write the Boolean predicate yourself')&&a.problems[by(13).main].prompt.includes('6×6 using the product rule'));
assert(a.problems[by(23).main].prompt.includes('captures the current generator state with `getstate()`')&&a.problems[by(23).main].prompt.includes('restores the saved state with `setstate(...)`'));
assert(a.problems[by(24).main].prompt.includes('choose a diagnostic event different')&&!a.problems[by(24).main].prompt.includes('a+b==9'));
assert(by(25).lesson.includes('model → exact oracle'));

// Independent assessment-contamination guards.
assert.equal(a.assessmentIndependenceAudit.version,'m08-bounded-followup-r4-2026-09-24');
for(const [ord,guard] of Object.entries(a.assessmentIndependenceAudit.sessions)){
 const ss=by(Number(ord)), prompt=a.problems[ss.main].prompt;
 for(const bad of guard.forbidInMain) assert(!prompt.includes(bad),`S${ord} Main regressed to worked-example surface: ${bad}`);
 assert.notEqual(guard.lessonSurface,guard.mainSurface,`S${ord} lesson/Main surfaces must differ`);
}
const repairedMainsV2=[8,9,10,12,13,14,15,16,17,19,20,22,25];
for(const n of repairedMainsV2) assert.equal(a.problems[by(n).main].obligationVersion,2,`S${n} repaired Main must stale old evidence`);
for(const n of [23,24]) assert.equal(a.problems[by(n).main].obligationVersion,3,`S${n} bounded-followup Main must stale superseded evidence`);
assert.equal(a.problems[by(2).main].obligationVersion,3);
assert.equal(a.problems[by(2).transfer].obligationVersion,3);
for(const n of [10,12,14]) assert.equal(a.problems[by(n).transfer].obligationVersion,2,`S${n} repaired Transfer must stale old evidence`);
// Programming observability pins: the fixed tasks must demand an action, not only its numeric consequence.
assert(a.problems[by(9).main].prompt.includes('write a short loop'));
assert(a.problems[by(10).main].prompt.includes('updates a dictionary count'));
assert(a.problems[by(12).main].prompt.includes('strict=True'));
assert(a.problems[by(15).main].prompt.includes('filters B='));
assert(a.problems[by(17).main].prompt.includes('map each to a payoff'));
assert(a.problems[by(19).main].prompt.includes('Traceback'));
assert(a.problems[by(25).main].prompt.includes('Before any code'));
assert(by(2).requiredOwnership[4].includes('exact quotient/remainder reconstruction'));
assert(by(3).requiredOwnership[3].includes('State explicit relative and absolute tolerances'));
assert.equal(by(9).requiredOwnership[2],'Justify tuples for fixed records.');
assert.equal(a.claimEvidence[by(9).id][2].task,'main');
assert.deepEqual(a.claimEvidence[by(18).id][3].rubricEvidence,[a.evaluators[by(18).main].rubric[4].criterion]);
assert.deepEqual(a.claimEvidence[by(22).id][3].rubricEvidence,[a.evaluators[by(22).main].rubric[2].criterion,a.evaluators[by(22).main].rubric[3].criterion]);
assert(by(25).requiredOwnership[3].includes('evidence rather than proof'));

assert.equal(by(2).id,'T22V3::T22E-CODE01::S02@1');
assert.equal(by(3).id,'T22V3::T22E-CODE01::S02F@1');
assert.equal(by(4).id,'T22V3::T22E-CODE01::S03@1');
assert(by(2).title.includes('quotient/remainder'));
assert(by(3).title.includes('Floating-point'));
// Bounded-followup provenance: assessment-version bumps must stale old fingerprints without deleting attempts.
const current=structuredClone(a);
for(const s of current.sessions) s.instructionVersion=current.instructionVersion;
await prepareContractHashes(current);
await prepareAssessmentFingerprints(current,current.evaluators);
const prior=structuredClone(current);
const versionCases=[[13,1],[23,2],[24,2]];
for(const [n,v] of versionCases){ const s=prior.sessions.find(x=>x.order===n); prior.problems[s.main].obligationVersion=v; }
await prepareContractHashes(prior);
await prepareAssessmentFingerprints(prior,prior.evaluators);
for(const [n] of versionCases){
 const s=current.sessions.find(x=>x.order===n),pid=s.main;
 assert.notEqual(current.assessmentFingerprints[pid],prior.assessmentFingerprints[pid],`S${n} version bump must change fingerprint`);
 const oldAttempt={id:`prior-${pid}`,problemId:pid,at:'2026-09-24T06:00:00.000Z',answer:'historical saved work',assistance:'independent',minutes:5,result:'secure',error:'',referenceSeenBefore:false,noteSeenDuringAttempt:false,contractHash:s.contractHash,assessmentFingerprint:prior.assessmentFingerprints[pid]};
 assert.equal(evidenceIsCurrent(oldAttempt,current),false,`S${n} old assessment evidence must be stale`);
 const retained=validateEvidence({...emptyEvidence(),attempts:[oldAttempt]},current);
 assert.equal(retained.attempts.length,1,`S${n} stale attempt must be preserved`);
}
// The sizing split introduced exactly one new session ID; all old S03-S24 IDs remain stable despite visible +1 numbering.
assert.equal(current.sessions[2].id,'T22V3::T22E-CODE01::S02F@1');
for(let n=4;n<=25;n++) assert.equal(current.sessions[n-1].id,`T22V3::T22E-CODE01::S${String(n-1).padStart(2,'0')}@1`);
assert(!fs.existsSync('course/t22/authoring/m09.json'),'M09 must remain closed');
console.log('PASS M08 accepted/frozen: 25 sessions, 50 tasks, 125 semantic links; repaired observability/separation, stale-fingerprint preservation, S02F stable-ID migration and hard M09 stop.');
