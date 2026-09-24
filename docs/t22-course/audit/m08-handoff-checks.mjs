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
const audit=fs.readFileSync('docs/t22-course/M08-CERBERUS-AUDIT.md','utf8');
const browser=fs.readFileSync('scripts/test-t22-elite-course-browser.mjs','utf8');
const workflow=fs.readFileSync('.github/workflows/t22-elite-checks.yml','utf8');
const core=fs.readFileSync('js/t22-course/core.js','utf8');

assert.equal(a.module.id,'T22E-CODE01');
assert.equal(a.module.status,'builder-validated-candidate-awaiting-independent-review');
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.deepEqual(a.boundary.prerequisiteModules,['T22E-FND01','T22E-DISC01','ARC048']);
assert.deepEqual(deps.modules.find(x=>x.id==='T22E-CODE01').prerequisites,a.boundary.prerequisiteModules);
assert.equal(road.modules.find(x=>x.id==='T22E-CODE01').availability,'validation');
assert.equal(sem.entries.find(x=>x.id==='T22E-CODE01').semanticStatus,'boundary-accepted-content-candidate');
assert(meta.moduleSources.some(x=>x.order===8&&x.id==='T22E-CODE01'&&x.source==='course/t22/authoring/m08.json'));
assert(!meta.moduleSources.some(x=>x.order>=9));
assert(!fs.existsSync('course/t22/authoring/m09.json'),'M09 must remain closed');
assert.equal(Object.keys(contract.sessions).length,24);
assert(core.includes("STORAGE_KEY='chrono_t22_elite_course_evidence_v1'"));
assert(browser.includes("T22E-CODE01"));
assert(browser.includes("eight-module export/import"));
assert(browser.includes("packet exposure through M08"));
assert(workflow.includes("actions/setup-python@v5"));
assert(workflow.includes("node scripts/test-t22-elite-m08.mjs"));
assert(workflow.includes("node docs/t22-course/audit/m08-independent-oracles.mjs"));

for(const token of [
  'c261410fb40809dc44cddb9dccf50e612ae0f1be',
  '35956181744',
  '107494885143',
  '24 sessions',
  '48 fixed assessments',
  '120 ownership claims',
  'M08-B01',
  'M08-B02',
  'M08-B03',
  'M08-B04',
  '322 hits',
  '5/36',
  '-11/18',
  'builder-validated candidate awaiting independent review',
  'M09 remains closed'
]) assert(hand.includes(token),token);

for(const token of ['M01', 'M03', 'M04', 'M21', 'M30', 'S12', 'Hard stop']) assert(boundary.includes(token),token);
for(const token of ['S17 observability gap','S18 assessment gap','wrong-solver','Remaining limitations','Builder-validated candidate awaiting independent review']) assert(audit.includes(token),token);

console.log('PASS M08 handoff: 24/48/120 builder candidate, official-source ledger, executable Python oracles, eight-module browser evidence, implementation run 35956181744 and hard M09 stop.');
