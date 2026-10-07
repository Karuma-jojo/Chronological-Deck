import fs from 'node:fs';
import assert from 'node:assert/strict';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m04.json');
const meta=read('course/t22/generated/course-meta.json');
const road=read('course/t22/generated/roadmap.json');
const led=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const oldHand=fs.readFileSync('docs/t22-course/M04-REVIEW-HANDOFF.md','utf8');
const oldRes=fs.readFileSync('docs/t22-course/M04-RESOLUTION.md','utf8');
const oldDesign=fs.readFileSync('docs/t22-course/M04-V2-DESIGN-GATE.md','utf8');
const design=fs.readFileSync('docs/t22-course/M04-V2.2-28-SESSION-DESIGN-GATE.md','utf8');
const audit=fs.readFileSync('docs/t22-course/M04-DEEP-SOURCE-AUDIT-v1.0.md','utf8');
const dossier=fs.readFileSync('docs/t22-course/M04-SOURCE-DOSSIER-AND-PEDAGOGY-EVIDENCE.md','utf8');
const review=fs.readFileSync('docs/t22-course/M04-V2-INDEPENDENT-ADVERSARIAL-REVIEW.md','utf8');
const finalV21=fs.readFileSync('docs/t22-course/M04-V2-FINAL-CONFIRMATION.md','utf8');
const boundary=fs.readFileSync('docs/t22-course/M04-BOUNDARY.md','utf8');
const core=fs.readFileSync('js/t22-course/core.js','utf8');
const pad=n=>String(n).padStart(2,'0');
const sid=n=>`T22V3::ARC048::S${pad(n)}@1`;
const by=n=>a.sessions.find(s=>s.id===sid(n));
const stableNum=s=>Number(s.id.match(/::S(\d+)@1$/)?.[1]);
const route=[1,2,3,4,5,6,25,7,8,9,10,11,12,13,14,15,16,26,17,28,18,27,19,20,21,22,23,24];

assert.equal(a.version,'m04-authoring-v2.2-28-session-whole-curriculum-r1');
assert.equal(a.instructionVersion,'m04-instruction-v2.2-28-session-whole-curriculum-r1');
assert.equal(a.module.status,'v2.2-28-session-whole-curriculum-rebuild-candidate');
assert.equal(a.sessions.length,28);
assert.equal(Object.keys(a.problems).length,56);
assert.equal(Object.keys(a.evaluators).length,56);
assert.equal(Object.values(a.claimEvidence).flat().length,140);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,28);
assert.equal(Object.keys(a.evidenceDistance.items).length,56);
assert.equal(Object.keys(a.wrongSolverAudit.sessions).length,28);
assert.equal(a.representationProgression.length,14);
assert.deepEqual(a.sessions.map(stableNum),route);
assert.equal(Object.keys(a.decisionAudit.items).length,9);

for(const n of route){
  const s=by(n);assert(s,`S${n}`);
  assert.equal(s.requiredOwnership.length,5);
  assert.equal(a.claimEvidence[s.id].length,5);
  a.claimEvidence[s.id].forEach((e,i)=>{
    assert.equal(e.claim,s.requiredOwnership[i]);
    assert(['main','transfer'].includes(e.task));
    const id=s[e.task];
    assert.equal(e.publicRequest,a.problems[id].prompt);
    for(const criterion of e.rubricEvidence) assert(a.evaluators[id].rubric.some(r=>r.criterion===criterion));
  });
}

assert.equal(a.claimEvidence[by(5).id][2].task,'transfer');
assert.equal(a.claimEvidence[by(13).id][4].task,'transfer');
assert(by(11).lesson.includes('P(A∩B^c)=P(A)-P(A∩B)'));
assert(!by(4).lesson.includes('generated independently'));
assert(by(3).lesson.includes('M03')&&by(3).lesson.includes('fibre'));
assert(by(22).lesson.includes('M03-S34')&&by(22).lesson.includes('M03-S35'));

assert.equal(a.problems[by(18).main].obligationVersion,3);
assert.equal(a.problems[by(18).transfer].obligationVersion,3);
assert.equal(a.problems[by(19).main].obligationVersion,2);
assert.equal(a.problems[by(19).transfer].obligationVersion,3);
assert.equal(a.problems[by(20).transfer].obligationVersion,2);
assert.equal(a.problems[by(24).main].obligationVersion,3);
assert.equal(a.problems[by(24).transfer].obligationVersion,4);
for(const n of [25,26,27,28]){
  assert.equal(a.problems[by(n).main].obligationVersion,1);
  assert.equal(a.problems[by(n).transfer].obligationVersion,1);
}

assert(oldDesign.includes('KEEP 24'),'historical v2.0 design gate must remain intact as provenance');
assert(design.includes('28-session'));
assert(design.includes('S25 · Finite probability bounds'));
assert(design.includes('S26 · Longer finite paths'));
assert(design.includes('S27 · Observation & reporting mechanisms'));
assert(design.includes('S28 · Finite stopped experiments'));
assert(boundary.includes('Current v2.2 learner route — 28 sessions'));
assert(audit.includes('Representation progression is missing as a designed system'));
assert(dossier.includes('Pedagogy-Evidence Ledger'));
for(const token of ['Díaz & Batanero','Konold','Batanero & Álvarez-Arroyo','Blitzstein']) assert(dossier.includes(token),token);
for(const token of ['R01','R02','R03','R04','R05','R06','BOUNDED REPAIR REQUIRED']) assert(review.includes(token),token);
assert(finalV21.includes('v2.1 final independent confirmation'));
assert(finalV21.includes('37023511435'),'historical v2.1 workflow receipt preserved');

assert.deepEqual(
  a.sessions.filter(s=>a.evidenceDistance.items[s.transfer].class==='changed-surface Transfer').map(stableNum).sort((x,y)=>x-y),
  [9,10,13,24,25,26,27,28]
);
assert.equal(a.evidenceDistance.items[by(14).main].class,'retrieval');
assert.equal(a.evidenceDistance.items[by(24).main].class,'fresh Main evidence');
assert.equal(a.evidenceDistance.items[by(25).main].class,'proof reconstruction');

assert.equal(road.modules.find(x=>x.id==='ARC048').availability,'authored','published roadmap remains historical provenance while v2.2 branch is under review');
assert.equal(led.entries.find(x=>x.id==='ARC048').semanticStatus,'accepted','historical semantic acceptance remains provenance during v2.2 candidate work');
assert(meta.moduleSources.some(x=>x.id==='ARC048'&&x.source==='course/t22/authoring/m04.json'));
assert(core.includes("STORAGE_KEY='chrono_t22_elite_course_evidence_v1'"));

// Historical receipts are immutable evidence for the older contract, not certification of v2.2.
for(const token of ['7d377d847728a7ebec6e4b81f2864238bd0b1683','10df637dbb46bd4985a1f98fc298c746b52bf1fd','120/120 manually re-audited']) assert(oldHand.includes(token),token);
for(const token of ['M04-01','M04-02','M04-03','M04-04','chrono_t22_elite_course_evidence_v1']) assert(oldRes.includes(token),token);
assert.equal(a.wholeCurriculumRebuild.historicalV21Confirmation,'docs/t22-course/M04-V2-FINAL-CONFIRMATION.md');
assert.equal(a.wholeCurriculumRebuild.status,'builder candidate; not independently confirmed');

console.log('PASS: M04 v2.2 handoff checks preserve v2.1 provenance while pinning the 28-session whole-curriculum candidate, stable-ID route, versioned assessment deltas and non-acceptance status.');
