import {checkModule} from './m05-m06-semantic-checks.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));

const a=read('course/t22/authoring/m05.json');
checkModule(a);
const meta=read('course/t22/generated/course-meta.json');
const road=read('course/t22/generated/roadmap.json');
const sem=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const hand=fs.readFileSync('docs/t22-course/M05-REVIEW-HANDOFF.md','utf8');
const boundary=fs.readFileSync('docs/t22-course/M05-BOUNDARY.md','utf8');
const core=fs.readFileSync('js/t22-course/core.js','utf8');

assert.equal(a.version,'m05-authoring-v2.1-whole-curriculum-candidate');
assert.equal(a.instructionVersion,'m05-instruction-v2.1-whole-curriculum-candidate');
assert.equal(a.module.status,'v2.1-whole-curriculum-candidate-awaiting-independent-review');
assert.equal(a.sessions.length,28);
assert.equal(Object.keys(a.problems).length,56);
assert.equal(Object.keys(a.evaluators).length,56);
assert.equal(Object.values(a.claimEvidence).flat().length,140);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,28);
assert.equal(Object.keys(a.evidenceDistance.items).length,56);
assert.equal(Object.keys(a.wrongSolverAudit.sessions).length,28);
assert.equal(Object.keys(a.decisionAudit.items).length,0);
assert(a.sourceLedger.length>=10);
assert(a.representationProgression.length>=15);
for(const s of a.sessions){
 assert.equal(s.requiredOwnership.length,5);
 assert.equal(a.claimEvidence[s.id].length,5);
 for(const k of ['main','transfer'])assert.equal(a.evaluators[s[k]].rubric.reduce((z,r)=>z+r.points,0),10);
}

// Published route metadata remains registered while this branch carries a non-published candidate.
assert.equal(road.modules.find(x=>x.id==='T22E-TRD01').availability,'authored');
assert.equal(sem.entries.find(x=>x.id==='T22E-TRD01').semanticStatus,'accepted');
assert(meta.moduleSources.some(x=>x.id==='T22E-TRD01'&&x.source==='course/t22/authoring/m05.json'));
assert(core.includes("STORAGE_KEY='chrono_t22_elite_course_evidence_v1'"));
assert(fs.existsSync('course/t22/authoring/m07.json'));
assert(fs.existsSync('course/t22/authoring/m08.json'));

// Permanent source/design artifacts.
for(const p of ['docs/t22-course/M05-DEEP-SOURCE-AUDIT-v1.0.md','docs/t22-course/M05-V2-DESIGN-GATE.md'])assert(fs.existsSync(p),p);
for(const token of [
 'codex/t22-m05-whole-curriculum-rebuild',

 'm05-authoring-v2.1-whole-curriculum-candidate',
 '28 sessions',
 '56 fixed Main/Transfer task slots',
 '140 ownership claims',
 'zero fixed Mains labelled fresh',
 'zero changed-surface Transfer claims',
 'Do not merge to main',
 'Do not self-declare acceptance'
])assert(hand.includes(token),token);
for(const token of [
 'Decision anatomy',
 'Lottery preferences',
 'general bimatrix',
 'Strictly competitive 2×2',
 'm05-authoring-v2.1-whole-curriculum-candidate'
])assert(boundary.includes(token),token);

assert.equal(a.reconstructionAudit.preservedPublicContracts.length,12);
assert.equal(a.reconstructionAudit.materiallyChangedPublicContracts.length,36);
assert.equal(a.independentReviewRepairAudit.changedAssessmentIds.length,10);
const repairV4=new Set(a.independentReviewRepairAudit.changedAssessmentIds);
for(const pid of a.reconstructionAudit.materiallyChangedPublicContracts)assert.equal(a.problems[pid].obligationVersion,(repairV4.has(pid)?4:3)+(a.wholeCurriculumRebuild.changedAssessmentIds.includes(pid)?1:0),pid);

console.log('PASS: M05 v2 handoff matches whole-curriculum 28/56/140 candidate, source/evidence/representation ledgers, provenance versioning and explicit independent-review stop boundary.');
