import fs from 'node:fs';
import assert from 'node:assert/strict';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m04.json');
const meta=read('course/t22/generated/course-meta.json');
const road=read('course/t22/generated/roadmap.json');
const led=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const oldHand=fs.readFileSync('docs/t22-course/M04-REVIEW-HANDOFF.md','utf8');
const oldRes=fs.readFileSync('docs/t22-course/M04-RESOLUTION.md','utf8');
const design=fs.readFileSync('docs/t22-course/M04-V2-DESIGN-GATE.md','utf8');
const audit=fs.readFileSync('docs/t22-course/M04-DEEP-SOURCE-AUDIT-v1.0.md','utf8');
const dossier=fs.readFileSync('docs/t22-course/M04-SOURCE-DOSSIER-AND-PEDAGOGY-EVIDENCE.md','utf8');
const core=fs.readFileSync('js/t22-course/core.js','utf8');
const by=n=>a.sessions.find(s=>s.order===n);

assert.equal(a.version,'m04-authoring-v2.0-deep-reconstruction-r1');
assert.equal(a.instructionVersion,'m04-instruction-v2-deep-reconstruction-r1');
assert.equal(a.module.status,'v2-deep-reconstruction-builder-candidate');
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,24);
assert.equal(Object.keys(a.evidenceDistance.items).length,48);
assert.equal(Object.keys(a.wrongSolverAudit.sessions).length,24);

assert.equal(a.claimEvidence[by(5).id][2].task,'transfer');
assert.equal(a.claimEvidence[by(13).id][4].task,'transfer');
assert(by(11).lesson.includes('P(A∩B^c)=P(A)-P(A∩B)'));
assert(by(22).lesson.includes('labelled ordered samples'));
assert(!by(4).lesson.includes('generated independently'));

for(const n of [1,7,9,15,17,18,24])assert(a.problems[by(n).main].obligationVersion>=2,`S${n} Main version`);
assert.equal(a.problems[by(5).transfer].obligationVersion,3);
assert.equal(a.problems[by(21).main].obligationVersion,2);

assert(design.includes('KEEP 24'));
assert(design.includes('Representation Progression Map'));
assert(audit.includes('Representation progression is missing as a designed system'));
assert(dossier.includes('Pedagogy-Evidence Ledger'));
for(const token of ['Díaz & Batanero','Konold','Batanero & Álvarez-Arroyo','Blitzstein'])assert(dossier.includes(token),token);

assert.equal(road.modules.find(x=>x.id==='ARC048').availability,'authored','published roadmap remains historical while v2 branch is under review');
assert.equal(led.entries.find(x=>x.id==='ARC048').semanticStatus,'accepted','historical semantic acceptance remains provenance during branch repair');
assert(meta.moduleSources.some(x=>x.id==='ARC048'&&x.source==='course/t22/authoring/m04.json'));
assert(core.includes("STORAGE_KEY='chrono_t22_elite_course_evidence_v1'"));

for(const s of a.sessions){
  assert.equal(s.requiredOwnership.length,5);
  assert.equal(a.claimEvidence[s.id].length,5);
  a.claimEvidence[s.id].forEach((e,i)=>{
    assert.equal(e.claim,s.requiredOwnership[i]);
    assert(['main','transfer'].includes(e.task));
    const id=s[e.task];
    assert.equal(e.publicRequest,a.problems[id].prompt);
    for(const criterion of e.rubricEvidence)assert(a.evaluators[id].rubric.some(r=>r.criterion===criterion));
  });
}

// Historical receipts stay intact and are not rewritten as v2 acceptance.
for(const token of ['7d377d847728a7ebec6e4b81f2864238bd0b1683','10df637dbb46bd4985a1f98fc298c746b52bf1fd','120/120 manually re-audited'])assert(oldHand.includes(token),token);
for(const token of ['M04-01','M04-02','M04-03','M04-04','chrono_t22_elite_course_evidence_v1'])assert(oldRes.includes(token),token);

console.log('PASS: M04 v2 handoff checks preserve historical Astra receipts/evidence identity while pinning the new 24-session source, representation and evidence reconstruction candidate.');
