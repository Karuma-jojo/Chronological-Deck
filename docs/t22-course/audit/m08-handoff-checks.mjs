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
const sizing=fs.readFileSync('docs/t22-course/M08-SESSION-SIZING-AUDIT.md','utf8');
const followup=fs.readFileSync('docs/t22-course/M08-INDEPENDENT-FOLLOWUP.md','utf8');
const browser=fs.readFileSync('scripts/test-t22-elite-course-browser.mjs','utf8');
const workflow=fs.readFileSync('.github/workflows/t22-elite-checks.yml','utf8');
const core=fs.readFileSync('js/t22-course/core.js','utf8');

assert.equal(a.module.id,'T22E-CODE01');
assert.equal(a.module.status,'independently-accepted-frozen');
assert.equal(a.sessions.length,25);
assert.equal(Object.keys(a.problems).length,50);
assert.equal(Object.keys(a.evaluators).length,50);
assert.equal(Object.values(a.claimEvidence).flat().length,125);
assert.deepEqual(a.boundary.prerequisiteModules,['T22E-FND01','T22E-DISC01','ARC048']);
assert.deepEqual(deps.modules.find(x=>x.id==='T22E-CODE01').prerequisites,a.boundary.prerequisiteModules);
assert.equal(road.modules.find(x=>x.id==='T22E-CODE01').availability,'authored');
assert.equal(sem.entries.find(x=>x.id==='T22E-CODE01').semanticStatus,'accepted');
assert(meta.moduleSources.some(x=>x.order===8&&x.id==='T22E-CODE01'&&x.source==='course/t22/authoring/m08.json'));
assert(meta.moduleSources.length>=13,'later-authorized publications may extend the learner registry');
assert(fs.existsSync('course/t22/authoring/m09.json'),'M09 is now explicitly authorized');
assert(!fs.existsSync('course/t22/authoring/m10.json'),'historical obsolete M10 path remains absent; canonical M10 is m10-arc053.json');
assert(fs.existsSync('course/t22/authoring/m10-arc053.json'));
assert(fs.existsSync('course/t22/authoring/m11-arc510.json'));
assert(fs.existsSync('course/t22/authoring/m12-side267.json'));
assert.equal(Object.keys(contract.sessions).length,25);
assert(core.includes("STORAGE_KEY='chrono_t22_elite_course_evidence_v1'"));
assert(browser.includes("T22E-CODE01"));
assert(browser.includes("twelve-module export/import"));
assert(browser.includes("packet exposure through M08"));
assert(workflow.includes("actions/setup-python@v5"));
assert(workflow.includes("node scripts/test-t22-elite-m08.mjs"));
assert(workflow.includes("node docs/t22-course/audit/m08-independent-oracles.mjs"));

for(const token of [
  'M08-R01 BLOCKER',
  'M08-R08 MEDIUM',
  '25 sessions',
  'obligationVersion',
  'assessmentIndependenceAudit',
  'seed31415',
  '492 / .41',
  '1/9',
  '5/36',
  '-11/18',
  'INDEPENDENTLY ACCEPTED / FROZEN',
  '35970605448',
  'M09 remains closed'
]) assert(hand.includes(token),token);

for(const token of ['M01', 'M03', 'M04', 'M21', 'M30', 'S12', 'Hard stop']) assert(boundary.includes(token),token);
assert(sizing.includes('25 sessions; add one, merge none'));
assert(sizing.includes('S02 — Integer division'));
assert(sizing.includes('S03 — Floating-point'));
assert(fs.existsSync('docs/t22-course/M08-INDEPENDENT-REVIEW.md'));
assert(fs.existsSync('docs/t22-course/M08-RESOLUTION.md'));
for(const token of ['ACCEPTED / FROZEN','f048a93b8cf0fff8bcd915437b8ba2ec8bacefd5','35970605448','stale','S02F@1']) assert(followup.includes(token),token);
const review=fs.readFileSync('docs/t22-course/M08-INDEPENDENT-REVIEW.md','utf8');
const resolution=fs.readFileSync('docs/t22-course/M08-RESOLUTION.md','utf8');
for(const token of ['M08-R01','M08-R08','REPAIRS REQUIRED']) assert(review.includes(token),token);
for(const token of ['R01 — fresh assessment surfaces','R08 — strict zip','M09 remains closed']) assert(resolution.includes(token),token);

console.log('PASS M08 handoff: independently accepted/frozen 25-session M08; 50 tasks/125 claims; bounded follow-up/provenance evidence retained; later-authorized M09 and hard M10 stop.');
