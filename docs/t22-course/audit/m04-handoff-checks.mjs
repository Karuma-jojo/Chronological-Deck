import fs from 'node:fs';
import assert from 'node:assert/strict';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m04.json');
const meta=read('course/t22/generated/course-meta.json');
const road=read('course/t22/generated/roadmap.json');
const led=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const hand=fs.readFileSync('docs/t22-course/M04-REVIEW-HANDOFF.md','utf8');
const res=fs.readFileSync('docs/t22-course/M04-RESOLUTION.md','utf8');
const core=fs.readFileSync('js/t22-course/core.js','utf8');
const by=n=>a.sessions.find(s=>s.order===n);

assert.equal(a.version,'m04-authoring-v1.2-astra-r1');
assert.equal(a.instructionVersion,'m04-instruction-astra-r1');
assert.equal(a.module.status,'authored-v1.2-astra-repaired');
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,24);

assert.equal(a.problems[by(5).transfer].obligationVersion,2);
assert.equal(a.problems[by(21).main].obligationVersion,2);
assert.equal(a.claimEvidence[by(5).id][2].task,'transfer');
assert.equal(a.claimEvidence[by(13).id][4].task,'transfer');
assert(by(11).lesson.includes('P(A∩B^c)=P(A)−P(A∩B)'));
assert(by(22).lesson.includes('each original labelled object appears equally often'));
assert(!by(4).lesson.includes('generated independently'));

assert.equal(road.modules.find(x=>x.id==='ARC048').availability,'authored');
assert.equal(led.entries.find(x=>x.id==='ARC048').semanticStatus,'accepted');
assert(['planned','authored'].includes(road.modules.find(x=>x.id==='T22E-TRD01').availability));
assert(['planned','authored'].includes(road.modules.find(x=>x.id==='ARC502').availability));
assert.equal(road.modules.find(x=>x.id==='T22E-MKT01').availability,'planned');
assert.equal(meta.version,'T22E-course-0.4.1-m04-astra-r1');
assert(meta.moduleSources.some(x=>x.id==='ARC048'&&x.source==='course/t22/authoring/m04.json'));
assert(core.includes("STORAGE_KEY='chrono_t22_elite_course_evidence_v1'"));
assert(!fs.existsSync('course/t22/authoring/m07.json'),'M07 must remain closed during the authorized M05→M06 trial');

for(const s of a.sessions){
  assert.equal(s.requiredOwnership.length,5);
  assert.equal(a.claimEvidence[s.id].length,5);
  assert.equal(a.semanticSeparationAudit.sessions[s.id].status,'reviewed-separated');
  a.claimEvidence[s.id].forEach((e,i)=>{
    assert.equal(e.claim,s.requiredOwnership[i]);
    const id=s[e.task];
    assert(['main','transfer'].includes(e.task));
    assert.equal(e.publicRequest,a.problems[id].prompt);
    for(const criterion of e.rubricEvidence)assert(a.evaluators[id].rubric.some(r=>r.criterion===criterion));
  });
}

for(const token of [
  '7d377d847728a7ebec6e4b81f2864238bd0b1683',
  '10df637dbb46bd4985a1f98fc298c746b52bf1fd',
  'm04-instruction-astra-r1',
  '120/120 manually re-audited',
  'S05 claim 3 and S13 claim 5 intentionally use Transfer',
  'STOP HERE FOR BOUNDED FOLLOW-UP REVIEW OF THE ASTRA REPAIRS'
]) assert(hand.includes(token),token);

for(const token of [
  'M04-01',
  'M04-02',
  'M04-03',
  'M04-04',
  'obligationVersion 2',
  'S05-T',
  'S21-M',
  'chrono_t22_elite_course_evidence_v1',
  'STOP FOR BOUNDED FOLLOW-UP REVIEW'
]) assert(res.includes(token),token);

console.log('PASS: M04 Astra repair handoff matches 24/48/120 state, versioned S05-T/S21-M contracts, repaired S11/S22 prerequisites, shared evidence key and closed M07 boundary during the authorized M05→M06 trial.');
