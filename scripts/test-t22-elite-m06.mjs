import {checkModule} from '../docs/t22-course/audit/m05-m06-semantic-checks.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const a=JSON.parse(fs.readFileSync('course/t22/authoring/m06.json','utf8'));
checkModule(a);
const by=n=>a.sessions.find(s=>s.order===n);
assert.equal(a.module.id,'ARC502');
assert.deepEqual(a.boundary.prerequisiteModules,['ARC048']);
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
 const h=crypto.createHash('sha256').update(JSON.stringify(stable({title:s.title,focus:s.focus,purpose:s.purpose,claims:s.requiredOwnership,lesson:s.lesson}))).digest('hex');assert(!hashes.has(h));hashes.add(h);
 for(const kind of ['main','transfer']){
  const id=s[kind],ev=a.evaluators[id];
  assert([1,2].includes(a.problems[id].obligationVersion));
  assert.equal(ev.rubric.length,5);
  assert.equal(ev.rubric.reduce((z,r)=>z+r.points,0),10);
  for(const f of a.instructionSeparation[s.id][kind]){
   assert(a.problems[id].prompt.includes(f));
   assert(!s.lesson.includes(f),`S${s.order} ${kind} lesson leaks fixed-task fragment`);
  }
 }
 assert(a.prerequisiteAudit['S'+String(s.order).padStart(2,'0')]?.length);
}
assert(by(1).lesson.includes('denominator population'));
assert(by(5).lesson.includes('not enough'));
assert(by(6).lesson.includes('two directions'));
assert(by(7).lesson.includes('disjoint and exhaustive'));
assert(by(11).lesson.includes('omitted'));
assert(by(12).lesson.includes('odds'));
assert(by(13).lesson.includes('not mean'));
assert(by(14).lesson.includes('common evidence denominator cancels'));
assert(by(17).lesson.includes('posterior forward'));
assert(by(18).lesson.includes('chain rule'));
assert(by(19).lesson.includes('conditionally independent'));
assert(by(21).lesson.includes('duplicate'));
assert(by(22).lesson.includes('Prior sensitivity'));
assert(by(23).lesson.includes('Likelihood sensitivity'));
assert(by(24).lesson.includes('complete Bayesian audit'));
for(const bad of ['expected utility','bankroll','bid/ask','log return','maximum likelihood estimation','MCMC']){
 assert(!a.sessions.some(s=>s.lesson.toLowerCase().includes(bad.toLowerCase())),`M06 lesson boundary leak: ${bad}`);
}
console.log('PASS M06 structural/pedagogy: 24 sessions, 48 tasks, 120 reviewed semantic claim→task/rubric links, denominator/completeness/dependence guards and separated Bayesian instruction.');
