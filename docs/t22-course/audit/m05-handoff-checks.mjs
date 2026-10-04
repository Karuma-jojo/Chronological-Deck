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

assert.equal(a.version,'m05-authoring-v2-independent-review-repair-r1');
assert.equal(a.instructionVersion,'m05-instruction-v2-independent-review-repair-r1');
assert.equal(a.module.status,'v2-independent-review-repair-r1-awaiting-full-validation-and-exact-head-confirmation');
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,24);
assert.equal(Object.keys(a.evidenceDistance.items).length,48);
assert.equal(Object.keys(a.wrongSolverAudit.sessions).length,24);
assert.equal(Object.keys(a.decisionAudit.items).length,1);
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
 'codex/t22-m05-deep-source-restart',
 'DEEP BOUNDED RECONSTRUCTION',
 'm05-authoring-v2-independent-review-repair-r1',
 '24 sessions',
 '48 fixed Main/Transfer task slots',
 '120 ownership claims',
 'zero fixed Mains labelled fresh',
 'one changed-surface Transfer claim',
 'Do not merge to main',
 'Do not self-declare acceptance'
])assert(hand.includes(token),token);
for(const token of [
 'Decision anatomy',
 'Lottery preferences',
 'general bimatrix',
 'Strictly competitive 2×2',
 'm05-authoring-v2-independent-review-repair-r1'
])assert(boundary.includes(token),token);

assert.equal(a.reconstructionAudit.preservedPublicContracts.length,12);
assert.equal(a.reconstructionAudit.materiallyChangedPublicContracts.length,36);
assert.equal(a.independentReviewRepairAudit.changedAssessmentIds.length,10);
const repairV4=new Set(a.independentReviewRepairAudit.changedAssessmentIds);
for(const pid of a.reconstructionAudit.materiallyChangedPublicContracts)assert.equal(a.problems[pid].obligationVersion,repairV4.has(pid)?4:3,pid);

console.log('PASS: M05 v2 handoff matches deep-source 24/48/120 candidate, source/evidence/representation ledgers, provenance versioning and explicit independent-review stop boundary.');
