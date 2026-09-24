import fs from 'node:fs';
import assert from 'node:assert/strict';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m07.json','utf8'));
const by=n=>a.sessions.find(s=>s.order===n);

assert.equal(a.version,'m07-authoring-astra-r1');
assert.equal(a.instructionVersion,'m07-instruction-astra-r1');
assert.equal(a.module.id,'T22E-MKT01');
assert.equal(a.module.order,7);
assert.equal(a.module.status,'authored-astra-repaired-awaiting-independent-followup');
assert.deepEqual(a.boundary.prerequisiteModules,['T22E-FND01','T22E-FND02','T22E-TRD01']);
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,24);

const seen=new Set();
for(let n=1;n<=24;n++){
 const s=by(n); assert(s); assert.equal(s.order,n);
 assert.equal(s.requiredOwnership.length,5);
 assert(s.lesson.includes('Worked example:')&&s.lesson.includes('Guided check:'));
 assert.equal(a.claimEvidence[s.id].length,5);
 assert.equal(a.semanticSeparationAudit.sessions[s.id].status,'astra-r1-builder-repaired');
 for(const kind of ['main','transfer']){
  const id=s[kind],p=a.problems[id],ev=a.evaluators[id];
  assert(p&&ev); assert.equal(p.order,n); assert.equal(p.kind,kind);
  const changed=a.repairVersionAudit.changedAssessmentIds.includes(id);
  assert.equal(p.obligationVersion,changed?2:1);
  assert.equal(ev.rubric.length,5); assert.equal(ev.rubric.reduce((z,r)=>z+r.points,0),10);
  assert(!seen.has(id)); seen.add(id);
  for(const frag of a.instructionSeparation[s.id][kind]){
   assert(p.prompt.includes(frag),`S${n} ${kind} separation fragment missing from task`);
   assert(!s.lesson.includes(frag),`S${n} ${kind} fixed-task text leaked into instruction`);
  }
 }
 for(let i=0;i<5;i++){
  const row=a.claimEvidence[s.id][i],p=a.problems[s[row.task]],ev=a.evaluators[s[row.task]];
  assert.equal(row.claim,s.requiredOwnership[i]);
  assert.equal(row.publicRequest,p.prompt);
  assert(row.rubricEvidence.length>=1);
  for(const criterion of row.rubricEvidence)assert(ev.rubric.some(r=>r.criterion===criterion),`S${n} claim ${i+1} missing semantic rubric criterion`);
 }
 assert(a.prerequisiteAudit['S'+String(n).padStart(2,'0')]?.length);
}

// CERBERUS high-risk capability-discrimination guards.
assert(by(5).lesson.includes('Simple returns generally do not add'));
assert(a.problems[by(5).main].prompt.includes('+25%')&&a.problems[by(5).main].prompt.includes('−20%'));
assert(a.evaluators[by(5).main].reference.includes('total simple return=0%')&&a.evaluators[by(5).main].reference.includes('arithmetic sum is+5%'));

assert(by(6).lesson.includes('middle price cancels'));
assert(a.problems[by(6).main].prompt.includes('show the intermediate price cancels'));
assert(by(7).lesson.includes('R>−1'));
assert(a.problems[by(7).main].prompt.includes('domain restriction'));

assert(by(10).lesson.includes('to cover means buying those units back')); assert(by(10).lesson.includes('signed position is−q'));
assert(a.evaluators[by(10).main].reference.includes('+120'));
assert(a.evaluators[by(11).transfer].reference.includes('P&L=(−25)(−2)=+50'));

assert(by(13).lesson.includes('mid is a reference'));
assert(by(13).entryPrerequisites.some(x=>x.includes('JIT midquote average')));
assert(!by(13).entryPrerequisites.some(x=>x.includes('M01 averages/subtraction')));
assert(a.problems[by(14).main].prompt.includes('immediate buy')&&a.problems[by(14).main].prompt.includes('immediate sell'));
assert(a.evaluators[by(14).main].reference.includes('buy uses ask75.50')&&a.evaluators[by(14).main].reference.includes('sell uses bid75.20'));

assert(by(15).lesson.includes('does not set a maximum buy price or minimum sell price'));
assert(a.problems[by(15).main].prompt.includes('does not identify the cause'));
assert(by(16).lesson.includes('price eligibility is not the same as a guaranteed fill'));
assert(a.problems[by(16).main].prompt.includes('price eligibility from fill certainty'));

assert(by(17).lesson.includes('cancelling the remainder does not undo them'));
assert(a.evaluators[by(17).main].reference.includes('final position remains+50'));
assert(by(18).lesson.includes('Quantity-weighted average execution price'));
assert(by(18).entryPrerequisites.some(x=>x.includes('JIT quantity-weighted average formula')));
assert(!by(18).entryPrerequisites.some(x=>x.includes('M01 weighted averages/arithmetic')));
assert(a.evaluators[by(18).main].reference.includes('10.09'));

assert(by(19).lesson.includes('average-cost convention'));
assert(a.evaluators[by(19).main].reference.includes('average cost=22'));
assert(by(20).lesson.includes('Only include costs stated by the model'));
assert(by(21).lesson.includes('Spread and explicit commission are distinct'));
assert(a.evaluators[by(21).main].reference.includes('Net=−13')); assert(a.evaluators[by(21).transfer].reference.includes('Net P&L=−8.50'));

assert(by(22).lesson.includes('Buy increases signed position; sell decreases it'));
assert(a.evaluators[by(22).main].reference.includes('opens long3')); assert(a.evaluators[by(22).transfer].reference.includes('exactly closing the long'));
assert(by(23).lesson.includes('cash+qM'));
assert(a.evaluators[by(23).main].reference.includes('Equity=4398+620=5018'));
assert(a.evaluators[by(24).main].reference.includes('average=3747/50=74.94'));
assert(a.evaluators[by(24).main].reference.includes('Net cash P&L=3768−3749=19')); assert(a.evaluators[by(24).transfer].reference.includes('Final net cash P&L=801−795.75=5.25'));

// Hard downstream boundaries: M07 may name deferred topics but must not teach their signature machinery.
for(const forbidden of ['law of one price','risk-neutral probability','state price','Black-Scholes','efficient frontier','covariance matrix','price-time priority','microprice','implementation shortfall','TWAP','VWAP']){
 assert(!a.sessions.some(s=>s.lesson.toLowerCase().includes(forbidden.toLowerCase())),`M07 taught deferred topic: ${forbidden}`);
}
assert(fs.existsSync('course/t22/authoring/m08.json'),'M08 is now explicitly authorized; M07 content remains frozen by its own semantic/provenance guards');

console.log('PASS M07 Astra-repair structural/pedagogy: 24 sessions, 48 fixed tasks, 120 explicit claim→public-request→rubric links, separated instruction, high-risk discrimination guards and hard downstream boundaries.');
