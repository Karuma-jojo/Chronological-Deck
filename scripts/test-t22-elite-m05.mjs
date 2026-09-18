import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const a=JSON.parse(fs.readFileSync('course/t22/authoring/m05.json','utf8'));
const by=n=>a.sessions.find(s=>s.order===n);
assert.equal(a.module.id,'T22E-TRD01');
assert.equal(a.boundary.prerequisiteModules.length,1);
assert.equal(a.boundary.prerequisiteModules[0],'ARC048');
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,24);
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const hashes=new Set();
for(const s of a.sessions){
 assert.equal(s.requiredOwnership.length,5);
 assert(s.lesson.includes('Worked example:')&&s.lesson.includes('Guided check:'));
 assert.equal(a.semanticSeparationAudit.sessions[s.id].status,'reviewed-separated');
 assert.equal(a.claimEvidence[s.id].length,5);
 const h=crypto.createHash('sha256').update(JSON.stringify(stable({title:s.title,focus:s.focus,purpose:s.purpose,claims:s.requiredOwnership,lesson:s.lesson}))).digest('hex');
 assert(!hashes.has(h));hashes.add(h);
 for(const kind of ['main','transfer']){
   const id=s[kind],ev=a.evaluators[id];
   assert.equal(a.problems[id].obligationVersion,1);
   assert.equal(ev.rubric.length,5);
   assert.equal(ev.rubric.reduce((z,r)=>z+r.points,0),10);
   for(const f of a.instructionSeparation[s.id][kind]){
     assert(a.problems[id].prompt.includes(f),`S${s.order} ${kind} missing separation fragment`);
     assert(!s.lesson.includes(f),`S${s.order} ${kind} lesson leaks fixed-task fragment`);
   }
 }
 a.claimEvidence[s.id].forEach((e,i)=>{
   assert.equal(e.claim,s.requiredOwnership[i]);
   assert.equal(e.task,'main');
   assert.equal(e.publicRequest,a.problems[s.main].prompt);
   assert.deepEqual(e.rubricEvidence,[a.evaluators[s.main].rubric[i].criterion]);
   assert.deepEqual(a.coverage[s.id][i],['main']);
 });
 assert(a.prerequisiteAudit['S'+String(s.order).padStart(2,'0')]?.length);
}
assert(by(3).lesson.includes('fair entry fee')&&by(3).lesson.includes('not a claim about anyone'));
assert(by(6).lesson.includes('EV and loss probability are different summaries'));
assert(by(9).lesson.includes('Independence is not required'));
assert(by(12).lesson.includes('finite')&&by(12).lesson.includes('ruin'));
assert(by(13).lesson.includes('constraint')&&by(13).lesson.includes('optimal stake'));
assert(by(16).lesson.includes('preferences or constraints'));
assert(by(17).lesson.includes('utility')&&by(17).lesson.includes('not dollars'));
assert(by(20).lesson.includes('maximin')&&by(20).lesson.includes('not a universal'));
assert(by(22).lesson.includes('indifferent'));
assert(by(24).lesson.includes('model facts first'));
for(const bad of ['Bayes\' rule','posterior odds','bid/ask','log return','Kelly criterion','variance']){
  assert(!a.sessions.some(s=>s.lesson.includes(bad)),`M05 lesson boundary leak: ${bad}`);
}
console.log('PASS M05 structural/pedagogy: 24 sessions, 48 tasks, 120 exact claim→Main/rubric links, 10-point evaluators, prerequisite and separation ledgers, decision-criterion boundary guards.');
