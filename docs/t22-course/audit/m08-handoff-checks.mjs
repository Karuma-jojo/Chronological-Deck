import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m08.json');
const meta=read('course/t22/generated/course-meta.json');
const road=read('course/t22/generated/roadmap.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const sem=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const contract=read('docs/t22-course/audit/m08-semantic-contract.json');
const hand=fs.readFileSync('docs/t22-course/M08-REVIEW-HANDOFF.md','utf8');
const boundary=fs.readFileSync('docs/t22-course/M08-BOUNDARY.md','utf8');
const builderAudit=fs.readFileSync('docs/t22-course/M08-CERBERUS-AUDIT.md','utf8');
const independent=fs.readFileSync('docs/t22-course/M08-INDEPENDENT-REVIEW.md','utf8');
const resolution=fs.readFileSync('docs/t22-course/M08-RESOLUTION.md','utf8');
const browser=fs.readFileSync('scripts/test-t22-elite-course-browser.mjs','utf8');
const workflow=fs.readFileSync('.github/workflows/t22-elite-checks.yml','utf8');
const core=fs.readFileSync('js/t22-course/core.js','utf8');

assert.equal(a.module.id,'T22E-CODE01');
assert.equal(a.module.status,'independent-audit-repaired-candidate-awaiting-followup');
assert.equal(a.version,'m08-authoring-v2-independent-repair');
assert.equal(a.instructionVersion,'m08-instruction-v2-independent-repair');
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.equal(a.repairVersionAudit.changedPublicTasks.length,23);
assert.equal(Object.keys(a.assessmentSeparationAudit.sessions).length,24);
assert.deepEqual(a.boundary.prerequisiteModules,['T22E-FND01','T22E-DISC01','ARC048']);
assert.deepEqual(deps.modules.find(x=>x.id==='T22E-CODE01').prerequisites,a.boundary.prerequisiteModules);
assert.equal(road.modules.find(x=>x.id==='T22E-CODE01').availability,'validation');
assert.equal(sem.entries.find(x=>x.id==='T22E-CODE01').semanticStatus,'boundary-accepted-content-candidate');
assert(meta.moduleSources.some(x=>x.order===8&&x.id==='T22E-CODE01'&&x.source==='course/t22/authoring/m08.json'));
assert(!meta.moduleSources.some(x=>x.order>=9));
assert(!fs.existsSync('course/t22/authoring/m09.json'),'M09 must remain closed');
assert.equal(contract.version,'m08-semantic-contract-independent-r2-2026-09-24');
assert.equal(Object.keys(contract.sessions).length,24);
assert(core.includes("STORAGE_KEY='chrono_t22_elite_course_evidence_v1'"));
assert(browser.includes("T22E-CODE01"));
assert(browser.includes("eight-module export/import"));
assert(browser.includes("packet exposure through M08"));
assert(workflow.includes("actions/setup-python@v5"));
assert(workflow.includes("node scripts/test-t22-elite-m08.mjs"));
assert(workflow.includes("node docs/t22-course/audit/m08-independent-oracles.mjs"));

for(const token of [
  'M08-R01','M08-R02','M08-R03','M08-R04','M08-R05','M08-R06','M08-R07','M08-R08','M08-R09','M08-R10',
  'REPAIRS REQUIRED','no freeze/acceptance'
]) assert(independent.includes(token),token);

for(const token of [
  '23 changed public obligations','obligationVersion=2','assessmentSeparationAudit',
  'zip(..., strict=True)','traceback','S14–S16','bounded follow-up'
]) assert(resolution.includes(token),token);

for(const token of [
  'independent-audit repaired + fully validated candidate','23 changed public obligations',
  'm08-authoring-v2-independent-repair','m08-semantic-contract-independent-r2-2026-09-24',
  '772e5dc12bcd44340bbf1d96a093d1b802c10699','35961691590','107511449788',
  '37/37 workflows succeeded','M09 remains closed'
]) assert(hand.includes(token),token);

for(const token of ['M01','M03','M04','M21','M30','PY-MATH','PY-IMPORT','PY-ZIP','PY-TRACE','Hard stop']) assert(boundary.includes(token),token);
assert(builderAudit.startsWith('> **Historical builder audit.**'));

console.log('PASS M08 repair handoff: 24/48/120 independent-audit repaired and fully validated candidate, 23 v2 obligations, semantic contamination guards, rebuilt Python oracles, exact green repair-head evidence, eight-module browser integration and hard M09 stop.');
