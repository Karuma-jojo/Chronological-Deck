import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m03.json','utf8'));
const pack=fs.readFileSync('docs/t22-course/artifacts/T22-Elite-M03-Master-Pack-v2.0-r4.md','utf8');
const by=n=>a.sessions.find(s=>s.id===`T22V3::T22E-DISC01::S${String(n).padStart(2,'0')}@1`);

assert.equal(a.version,'m03-authoring-v2.0-six-tools-candidate-r4');
assert.equal(a.sessions.length,36);
assert.equal(Object.keys(a.problems).length,72);
assert.equal(Object.values(a.claimEvidence).flat().length,180);

// MC-01 — task-specific grading, not "five claims in both".
assert(pack.includes('Grade **each task only against the ownership claims and public obligations assigned to that task below**'));
assert(!/all five ownership claims in both/i.test(pack));
assert.equal((pack.match(/^# Position /gm)||[]).length,36);
for(const s of a.sessions){
  assert(pack.includes(`**Stable session ID:** \`${s.id}\``));
  const ev=a.claimEvidence[s.id];
  for(const e of ev) assert(pack.includes(e.claim));
}

// MC-02 — JIT divisibility notation before first use.
const s04=by(4);
assert.equal(s04.instructionVersion,'m03-s04-instruction-v2-jit-divisibility-r1');
assert(s04.lesson.indexOf('d|n means n=dk') < s04.lesson.indexOf('4|n implies'));
assert(s04.lesson.includes('S08 owns the full divisibility/parity proof language'));

// MC-03 — prime/composite definitions before worked example.
const s14=by(14);
assert.equal(s14.instructionVersion,'m03-s14-instruction-v2-prime-composite-r1');
assert(s14.lesson.indexOf('is prime if') < s14.lesson.indexOf('Worked example:'));
assert(s14.lesson.indexOf('is composite if') < s14.lesson.indexOf('Worked example:'));

// MC-04 — |A| definition.
const s16=by(16);
assert.equal(s16.instructionVersion,'m03-s16-instruction-v2-cardinality-notation-r1');
assert(s16.lesson.startsWith('For a finite set A, |A| means its cardinality'));

// MC-05 — factorial / permutation / combination ranges.
const s24=by(24),s25=by(25),s26=by(26);
assert.equal(s24.instructionVersion,'m03-s24-instruction-v2-factorial-range-r1');
assert(s24.lesson.includes('define 0!=1')||s24.lesson.includes('define 0!=1'.replace('define ','')));
assert(s24.lesson.includes('n≥0')&&s24.lesson.includes('0≤r≤n')&&s24.lesson.includes('P(n,0)=1'));
assert.equal(s25.instructionVersion,'m03-s25-instruction-v2-multinomial-range-r1');
assert(s25.lesson.includes('nonnegative integers')&&s25.lesson.includes('0!=1'));
assert.equal(s26.instructionVersion,'m03-s26-instruction-v2-combination-range-r1');
assert(s26.lesson.includes('n≥0')&&s26.lesson.includes('0≤r≤n'));
assert(s26.lesson.includes('C(n,0)=C(n,n)=1'));
assert(s26.lesson.includes('endpoint terms k=0 and k=n'));

// These six cleanup items are instruction/pack changes only.
for(const n of [4,14,16,24,25,26]){
  const s=by(n);
  assert(a.problems[s.main]&&a.problems[s.transfer]);
  assert.equal(a.evaluators[s.main].rubric.reduce((z,r)=>z+r.points,0),10);
  assert.equal(a.evaluators[s.transfer].rubric.reduce((z,r)=>z+r.points,0),10);
}

// MC-06 — historical stale status is not copied into the replacement pack.
assert(!pack.includes('v1.7 evidence/provenance repair is **not frozen yet**'));
assert(pack.includes('r3 exact SHA reviewed'));
assert(pack.includes('This pack does not self-declare acceptance.'));

console.log('PASS: M03 v2 r4 final micro-cleanup — task-specific grading, JIT definitions, factorial/range boundaries and review-repair pack status are pinned.');
