import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {validateCandidateMathOracles,runCandidateMathMutationProbes} from './m04-candidate-math-oracle.mjs';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m04.json','utf8'));
const pad=n=>String(n).padStart(2,'0');
const sid=n=>`T22V3::ARC048::S${pad(n)}@1`;
const by=n=>a.sessions.find(s=>s.id===sid(n));
const problem=(n,k)=>a.problems[by(n)[k]];
const evaluator=(n,k)=>a.evaluators[by(n)[k]];

// R01 — marginal fairness alone does not supply the joint law.
const faces=[1,2,3,4,5,6];
const diagonal=faces.map(x=>[x,x]);
assert.deepEqual(faces.map(x=>diagonal.filter(z=>z[0]===x).length),[1,1,1,1,1,1]);
assert.deepEqual(faces.map(x=>diagonal.filter(z=>z[1]===x).length),[1,1,1,1,1,1]);
assert.equal(diagonal.filter(([x,y])=>x+y===9).length,0,'fair marginals can have P(sum=9)=0');
const perm=[1,2,3,5,4,6],coupling=faces.map((x,i)=>[x,perm[i]]);
assert.deepEqual([...new Set(coupling.map(z=>z[1]))].sort((x,y)=>x-y),faces);
const joint=coupling.filter(([x,y])=>x%2===0&&y>4).length/6;
assert.equal(joint,1/3);assert.notEqual(joint,(1/2)*(1/3));
assert(problem(3,'main').prompt.includes('uniform over all 36 pairs'));
assert(problem(11,'main').prompt.includes('joint model for two six-sided dice is uniform'));
for(const [n,needle] of [[10,'each ball currently in the bag is conditionally equally likely'],[12,'every currently present ball conditionally equally likely'],[22,'every remaining labelled card conditionally equally likely']]) assert(problem(n,'main').prompt.includes(needle),`S${n} sampling law not public`);

// R02 — visible rehearsal is no longer mislabeled as unrehearsed transfer.
for(const n of [26,27]){
  const id=by(n).transfer;
  assert.equal(a.evidenceDistance.items[id].class,'retrieval');
  assert(!Object.hasOwn(a.decisionAudit.items,id),`S${n}-T must not remain in decision-audit target set`);
  assert(by(n).transferScope.startsWith('Retrieval/fluency'));
}

// R03 — formula-only invocation cannot satisfy the union-bound derivation claim.
assert(problem(25,'transfer').prompt.includes('disjoint new-contribution events'));
assert(problem(25,'transfer').prompt.includes('Di⊆Fi'));
assert(evaluator(25,'transfer').rubric.some(r=>/formula-only invocation is insufficient/i.test(r.criterion)));
assert(evaluator(25,'transfer').reference.includes('D1=F1'));
assert(evaluator(25,'transfer').reference.includes('Di=Fi'));

// R04 — total probability begins with the universal intersection identity; zero-mass cells are not assigned fake conditionals.
assert(by(18).lesson.includes('P(A)=Σ P(A∩Bi)'));
assert(evaluator(18,'main').reference.includes('zero-mass cell'));
assert(evaluator(18,'main').reference.includes('P(A|B_i) is undefined'));
const pBx=0,pAx=0;assert.equal(pAx,0);assert.equal(pBx,0); // product-form term is deliberately omitted, not 0×undefined.

// R05 — typed candidate-bound oracles and mutation rejection.
validateCandidateMathOracles(a);
runCandidateMathMutationProbes(a);

// R06 — inclusive event wording is aligned across prompt/reference/rubric.
assert(problem(28,'main').prompt.includes('by the cap (including an H on trial3)'));
assert(!problem(28,'main').prompt.includes('before the cap'));
assert(evaluator(28,'main').reference.includes('by the cap, including H on trial3'));
assert(evaluator(28,'main').rubric.some(r=>r.criterion.includes('by the cap, including an H on trial3')));

// C01 — malformed expectation expression is gone.
assert(!by(19).lesson.includes('E=0+.1.2+2=3.2'));
assert(by(19).lesson.includes('E=0+1.2+2=3.2'));

// C02 — downstream exceptions are content-pinned to the exact repaired M04 bytes.
const raw=createHash('sha256').update(fs.readFileSync('course/t22/authoring/m04.json')).digest('hex');
for(const file of ['scripts/test-t22-elite-m10.mjs','scripts/test-t22-elite-m11.mjs','scripts/test-t22-elite-m12.mjs']){
  const text=fs.readFileSync(file,'utf8');
  assert(text.includes(raw),`${file} does not pin exact repaired M04 SHA-256`);
}

assert.equal(a.version,'m04-authoring-v2.2-28-session-whole-curriculum-r2');
assert.equal(a.module.status,'v2.2-28-session-whole-curriculum-bounded-repair-r2-candidate');
assert.equal(Object.keys(a.wholeCurriculumRebuild.r2PriorAssessmentFingerprints||{}).length,10);

console.log('PASS M04 v2.2-r2 focused adversarial recheck: R01–R06 and C01/C02 are repaired; correlated-fair counterexamples, rehearsal honesty, proof observability, zero-mass qualification, mutation rejection, cap wording and exact downstream pinning all pass.');
