import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m06.json');
const meta=read('course/t22/generated/course-meta.json');
const road=read('course/t22/generated/roadmap.json');
const sem=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const hand=fs.readFileSync('docs/t22-course/M06-REVIEW-HANDOFF.md','utf8');
const core=fs.readFileSync('js/t22-course/core.js','utf8');
assert.equal(a.version,'m06-authoring-v1.0-internal-accepted');
assert.equal(a.instructionVersion,'m06-instruction-v1');
assert.equal(a.module.status,'authored-v1-internal-accepted');
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,24);
for(const s of a.sessions){
 assert.equal(s.requiredOwnership.length,5);
 assert.equal(a.claimEvidence[s.id].length,5);
 assert.equal(a.semanticSeparationAudit.sessions[s.id].status,'reviewed-separated');
 for(const k of ['main','transfer'])assert.equal(a.evaluators[s[k]].rubric.reduce((z,r)=>z+r.points,0),10);
 a.claimEvidence[s.id].forEach((e,i)=>{
  assert.equal(e.claim,s.requiredOwnership[i]);
  assert.equal(e.task,'main');
  assert.equal(e.publicRequest,a.problems[s.main].prompt);
  assert.deepEqual(e.rubricEvidence,[a.evaluators[s.main].rubric[i].criterion]);
 });
}
assert.equal(road.modules.find(x=>x.id==='ARC502').availability,'authored');
assert.equal(sem.entries.find(x=>x.id==='ARC502').semanticStatus,'accepted');
assert.equal(road.modules.find(x=>x.id==='T22E-MKT01').availability,'planned');
assert(meta.moduleSources.some(x=>x.id==='ARC502'&&x.source==='course/t22/authoring/m06.json'));
assert.equal(meta.version,'T22E-course-0.6.0-m06');
assert.equal(meta.moduleSources.filter(x=>x.order<=6).length,6);
assert(core.includes("STORAGE_KEY='chrono_t22_elite_course_evidence_v1'"));
assert(!fs.existsSync('course/t22/authoring/m07.json'));
for(const token of ['66deecfa1f21b7730e702c4c0587a1f021212319','24','48','120/120','m06-instruction-v1','chrono_t22_elite_course_evidence_v1','STOP HERE. Do not author M07.'])assert(hand.includes(token),token);
console.log('PASS: M06 handoff matches 24/48/120 accepted Bayesian state, shared evidence key, six-module registration and hard M07 stop.');
