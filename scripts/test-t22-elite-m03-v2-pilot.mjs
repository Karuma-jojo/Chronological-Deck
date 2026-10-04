import fs from 'node:fs';
import assert from 'node:assert/strict';

const p=JSON.parse(fs.readFileSync('docs/t22-course/artifacts/M03-V2-S31-PILOT.json','utf8'));
const s=p.session;
const main=p.problems[s.id.replace('@1','-M@1')];
const transfer=p.problems[s.id.replace('@1','-T@1')];

assert.equal(p.version,'m03-v2-s31-pilot-r1');
assert.equal(s.id,'T22V3::T22E-DISC01::S31@1');
assert.equal(s.order,7);
assert.equal(s.requiredOwnership.length,5);
assert(s.lesson.includes('Worked example:'));
assert(s.lesson.includes('Guided check:'));
assert(!/epsilon|ε|delta|δ/i.test(s.lesson),'S31 pilot must not leak M09 epsilon/delta machinery');
assert.equal(Object.keys(p.problems).length,2);
assert.equal(Object.keys(p.evaluators).length,2);
assert.equal(p.claimEvidence.length,s.requiredOwnership.length);
assert.equal(p.coverage.length,s.requiredOwnership.length);

for(const [id,problem] of Object.entries(p.problems)){
  assert.equal(p.evaluators[id].rubric.reduce((n,r)=>n+r.points,0),10,`${id} rubric must total 10`);
  assert.equal(problem.order,s.order);
  assert(['main','transfer'].includes(problem.kind));
}
for(let i=0;i<s.requiredOwnership.length;i++){
  const e=p.claimEvidence[i];
  assert.equal(e.claim,s.requiredOwnership[i]);
  assert(['main','transfer'].includes(e.task));
  const id=e.task==='main'?s.id.replace('@1','-M@1'):s.id.replace('@1','-T@1');
  assert.equal(e.publicRequest,p.problems[id].prompt);
  assert.deepEqual(p.coverage[i],[e.task]);
  for(const criterion of e.rubricEvidence){
    assert(p.evaluators[id].rubric.some(r=>r.criterion===criterion),`missing exact rubric observer: ${criterion}`);
  }
}
for(const frag of p.instructionSeparation.main){
  assert(main.prompt.includes(frag));
  assert(!s.lesson.includes(frag),'Main separation fragment leaked into visible instruction');
}
for(const frag of p.instructionSeparation.transfer){
  assert(transfer.prompt.includes(frag));
  assert(!s.lesson.includes(frag),'Transfer separation fragment leaked into visible instruction');
}

assert.equal(p.evidenceDistance.main.class,'proof reconstruction');
assert.equal(p.evidenceDistance.transfer.class,'changed-surface Transfer');
assert.equal(p.decisionAudit.transfer.decisionSuppliedByPrompt,false);
assert.equal(p.decisionAudit.transfer.decisionRehearsedInVisibleInstruction,false);

// Independent deterministic math checks for the fixed surfaces.
for(let n=-100;n<=100;n++){
  const m=n+1;
  assert(Number.isInteger(m));
  assert(m>n);
  assert.equal(Math.abs((m-n)%2),1);
}
for(let m=-100;m<=100;m++){
  const n=m;
  assert(!(m>n && Math.abs((m-n)%2)===1));
}
const allowed={a:new Set([1,2]),b:new Set([2,3]),c:new Set([1,3])};
const witness={a:1,b:2,c:3};
for(const x of Object.keys(allowed))assert(allowed[x].has(witness[x]));
const common=[1,2,3].filter(y=>Object.values(allowed).every(A=>A.has(y)));
assert.deepEqual(common,[]);

assert(main.prompt.includes('exact logical negation of B'));
assert(transfer.prompt.includes('construct an explicit function f:X→Y'));
assert(p.wrongSolverAudit.requiredDiscrimination.includes('one fixed m'));

console.log('PASS: M03 v2 S31 pilot — quantifier order/dependence is self-contained, observable, separated and mathematically checked.');
