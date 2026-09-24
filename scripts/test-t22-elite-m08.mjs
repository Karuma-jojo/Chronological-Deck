import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m08.json');
const semantic=read('docs/t22-course/audit/m08-semantic-contract.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const by=n=>a.sessions.find(s=>s.order===n);
assert.equal(a.version,'m08-authoring-v3-25-session-sizing');
assert.equal(a.instructionVersion,'m08-instruction-v3-25-session-sizing');
assert.equal(a.module.id,'T22E-CODE01');
assert.equal(a.module.status,'session-sizing-rebalanced-25-fully-authored-awaiting-verification');
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
 assert(['independent-repair-semantic-separated-pending-final-followup','session-sizing-split-semantic-separated-pending-final-followup'].includes(a.semanticSeparationAudit.sessions[s.id].status));
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
assert(by(3).lesson.includes('import math')&&by(3).lesson.includes('abs_tol'));
assert(by(8).lesson.includes('passed as arguments')&&by(8).lesson.includes('without parentheses'));
assert(by(12).lesson.includes('strict=True')&&by(12).lesson.includes('ValueError'));
assert(by(13).lesson.includes('from itertools import product'));
assert(by(14).lesson.includes('from fractions import Fraction'));
assert(by(18).lesson.includes('-O'));
assert(by(19).lesson.includes('traceback')&&by(19).lesson.includes('source line'));
assert(by(20).lesson.includes('from random import Random')&&by(20).lesson.includes('internal state'));
assert.deepEqual(by(7).entryPrerequisites,['M03-S20 functions as mappings','M08-S01 assignment','Python function definitions']);
assert(by(22).lesson.includes('estimate0.322'));
assert(a.problems[by(22).main].prompt.includes('Random(31415)')&&a.problems[by(22).main].prompt.includes('N=1200'));
assert(by(23).lesson.includes('getstate()')&&by(23).lesson.includes('setstate()'));
assert(by(24).lesson.includes('six diagonal pairs'));
assert(a.problems[by(24).main].prompt.includes('a+b==9'));
assert(by(25).lesson.includes('model → exact oracle'));

// Independent assessment-contamination guards.
assert.equal(a.assessmentIndependenceAudit.version,'m08-session-sizing-r3-25-sessions-2026-09-24');
for(const [ord,guard] of Object.entries(a.assessmentIndependenceAudit.sessions)){
 const ss=by(Number(ord)), prompt=a.problems[ss.main].prompt;
 for(const bad of guard.forbidInMain) assert(!prompt.includes(bad),`S${ord} Main regressed to worked-example surface: ${bad}`);
 assert.notEqual(guard.lessonSurface,guard.mainSurface,`S${ord} lesson/Main surfaces must differ`);
}
const repairedMains=[8,9,10,12,14,15,16,17,19,20,22,23,24,25];
for(const n of repairedMains) assert.equal(a.problems[by(n).main].obligationVersion,2,`S${n} repaired Main must stale old evidence`);
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

assert.equal(by(2).id,'T22V3::T22E-CODE01::S02@1');
assert.equal(by(3).id,'T22V3::T22E-CODE01::S02F@1');
assert.equal(by(4).id,'T22V3::T22E-CODE01::S03@1');
assert(by(2).title.includes('quotient/remainder'));
assert(by(3).title.includes('Floating-point'));
assert(!fs.existsSync('course/t22/authoring/m09.json'),'M09 must remain closed');
console.log('PASS M08 session-sizing structural/pedagogy: 25 sessions, 50 tasks, 125 semantic links; exact quotient/remainder split from floating-point tolerance while stable existing session IDs are preserved; hard M09 stop.');
