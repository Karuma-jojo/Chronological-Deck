import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m03.json','utf8'));
const labs=fs.readFileSync('docs/t22-course/M03-V2-STRATEGY-LABS.md','utf8');
const pack=fs.readFileSync('docs/t22-course/artifacts/T22-Elite-M03-Master-Pack-v2.0-r4.md','utf8');
const by=n=>a.sessions.find(s=>s.id===`T22V3::T22E-DISC01::S${String(n).padStart(2,'0')}@1`);
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const fnv1a=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return h.toString(16).padStart(8,'0');};

assert.equal(a.version,'m03-authoring-v2.0-six-tools-candidate-r4');
assert.equal(a.module.status,'v2-r4-independent-review-repair-candidate-awaiting-follow-up-review');
assert.equal(a.sessions.length,36);assert.equal(Object.keys(a.problems).length,72);assert.equal(Object.keys(a.evaluators).length,72);assert.equal(Object.values(a.claimEvidence).flat().length,180);

// R01/R02: learner-facing lab artifact is clean and genuinely replaced.
for(const [label,text] of [['labs',labs],['pack',pack]]){
  for(let i=0;i<text.length;i++){const code=text.charCodeAt(i);assert(code>=32||[9,10,13].includes(code),`${label} control char U+${code.toString(16)} @${i}`);}
}
for(const bad of ['3mid','nge1','xle5','ldots','xin X','yin Y']){assert(!labs.includes(bad),bad);assert(!pack.includes(bad),bad);}
for(const must of ['x < (x+y)/2 < y','aₙ₊₁ = aₙ + 2n + 1','exactly two positions contain even symbols','two teams of four','difference divisible by 4','axis-aligned rectangles','inserts |a−b|'])assert(labs.includes(must),must);

// R03: ownership verbs match what fixed public tasks literally observe.
assert.equal(by(33).requiredOwnership[0],'Invoke the well-ordering principle correctly to justify a least element of a nonempty subset of the nonnegative integers.');
assert.equal(by(34).requiredOwnership[0],'Formalize and use a supplied explicit finite encoding map between two collections.');
assert.equal(by(34).requiredOwnership[4],'Audit a proposed multiplicity division by inspecting fibre sizes and reject it when the relevant fibres are not constant.');
assert.equal(by(35).requiredOwnership[0],'Use an explicitly supplied finite incidence or pair set as the common object in a double-counting proof.');
assert.equal(by(36).requiredOwnership[0],'Interpret and model a supplied state space, legal moves, initial state and target/terminal condition of a finite process.');
for(const s of [by(33),by(34),by(35),by(36)])for(let i=0;i<s.requiredOwnership.length;i++)assert.equal(a.claimEvidence[s.id][i].claim,s.requiredOwnership[i]);

// R04: prompt cueing is no longer hidden by the metadata.
assert.equal(a.evidenceDistance.items[by(7).main].class,'proof reconstruction');
assert.deepEqual([a.decisionAudit.items[by(7).main].decisionSuppliedByPrompt,a.decisionAudit.items[by(7).main].decisionRehearsedInVisibleInstruction],[true,true]);
assert.deepEqual([a.decisionAudit.items[by(31).transfer].decisionSuppliedByPrompt,a.decisionAudit.items[by(31).transfer].decisionRehearsedInVisibleInstruction],[true,true]);
assert.deepEqual([a.decisionAudit.items[by(34).transfer].decisionSuppliedByPrompt,a.decisionAudit.items[by(34).transfer].decisionRehearsedInVisibleInstruction],[true,true]);

// Independent-review repair must not mutate any of the 72 fixed prompt/evaluator contracts.
const fixed=JSON.stringify(stable({problems:a.problems,evaluators:a.evaluators}));
assert.equal(fnv1a(fixed),'5758ca03','fixed assessment/evaluator contract drifted from reviewed r3 SHA 05d7bae...');

// R05: candidate wording is neutral; exact-head run data belongs to a post-validation receipt.
assert.equal(a.repairVersionAudit.currentCandidateStatus,'v2-r4-independent-review-repair-candidate-awaiting-follow-up-review');
assert.equal(a.repairVersionAudit.v2SixToolsUpgrade.status,'review-repair-r1-candidate-requires-exact-head-validation-and-follow-up-review');
assert(pack.includes('does not claim either gate is pending or passed'));
assert(pack.includes('This pack does not self-declare acceptance.'));

console.log('PASS: M03 v2 r4 independent-review repair contract R01–R05 implemented without fixed-task drift.');
