import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m14-side276.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const meta=read('course/t22/generated/course-meta.json');
const roadmap=read('course/t22/generated/roadmap.json');
const semantic=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');

const design=fs.readFileSync('docs/t22-course/M14-DESIGN-GATE.md','utf8');
const pilot=fs.readFileSync('docs/t22-course/M14-PILOT-REVIEW.md','utf8');
const resolution=fs.readFileSync('docs/t22-course/M14-RESOLUTION.md','utf8');
const verification=fs.readFileSync('docs/t22-course/M14-VERIFICATION.md','utf8');
const handoff=fs.readFileSync('docs/t22-course/M14-REVIEW-HANDOFF.md','utf8');
const integration=fs.readFileSync('docs/t22-course/audit/M14-V12-INTEGRATION-REVIEW.md','utf8');
const workflow=fs.readFileSync('.github/workflows/t22-elite-checks.yml','utf8');

assert.equal(a.module.order,14);
assert.equal(a.module.id,'SIDE276');
assert.equal(a.module.status,'published-user-authorized-independent-accepted');
assert.equal(a.sessions.length,19);
assert.equal(Object.keys(a.problems).length,38);
assert.equal(Object.keys(a.evaluators).length,38);
assert.equal(Object.values(a.claimEvidence).flat().length,60);

const dep=deps.modules.find(x=>x.id==='SIDE276');
assert(dep,'SIDE276 missing from dependency authority');
assert.deepEqual(a.boundary.prerequisiteModules,dep.prerequisites);
assert.deepEqual(a.boundary.prerequisiteModules,['ARC511']);

// M14 publication invariants must survive legitimate later-module publication.
assert(meta.moduleSources.length>=14,'published registry must retain M01-M14 or later');
const m14Source=meta.moduleSources.find(x=>x.order===14&&x.id==='SIDE276');
assert(m14Source,'published registry lost M14/SIDE276');
assert.equal(m14Source.source,'course/t22/authoring/m14-side276.json');
assert.match(meta.version,/^T22E-course-0\.(?:1[4-9]|[2-9]\d)\./,'course version must be M14 publication or later');

const road=roadmap.modules.find(x=>x.id==='SIDE276');
assert(road,'SIDE276 missing from roadmap');
assert.equal(road.availability,'authored','M14 must be visible as authored');

const sem=semantic.entries.find(x=>x.id==='SIDE276');
assert(sem,'SIDE276 missing from semantic-prerequisite ledger');
assert.equal(sem.semanticStatus,'accepted','published M14 semantic boundary must be accepted');
assert.equal(sem.bridges.length,3,'M14 semantic ledger should retain the three bounded local bridges');

for(const sourceId of [
  'REPO-M14','STRANG-4E','MIT-1806','AXLER-4E','HEFFERON',
  'MAA-IPG','IES-WWC','PED-DORIER','PED-LT','PED-MM-SYS','PED-DET'
]) assert(a.sourceLedger.sources.some(x=>x.id===sourceId),'missing source role '+sourceId);

for(const [name,text] of Object.entries({design,pilot,resolution,verification,handoff})){
  assert(text.includes('M14')||text.includes('SIDE276'),name+' does not identify the module');
}
for(const gate of ['Gate 4','Gate 5','Gate 6','Gate 7','Gate 8'])
  assert(pilot.includes(gate),'pilot receipt missing '+gate);

assert(verification.includes('M14 is **published**'),'verification lost published-state receipt');
assert(verification.includes('current learner frontier: **M14 / SIDE276**'),'verification lost M14 frontier receipt');
assert(handoff.includes('M14 is now registered as the fourteenth learner module'),'handoff lost publication closure');
assert(handoff.includes('M15 / SIDE278 — planned and closed'),'handoff lost M15 stop boundary');
assert(resolution.startsWith('> **Current status (2026-09-26): PUBLISHED.**'),'resolution missing publication supersession notice');

for(const cmd of [
  'node scripts/test-t22-elite-m14.mjs',
  'node docs/t22-course/audit/m14-math-checks.mjs',
  'node docs/t22-course/audit/m14-instruction-math-checks.mjs',
  'node docs/t22-course/audit/m14-handoff-checks.mjs',
  'node scripts/test-t22-elite-m14-browser.mjs'
]) assert(workflow.includes(cmd),'workflow missing '+cmd);

assert.equal(Object.keys(a.semanticSeparationAudit?.tasks||{}).length,38,'Gate 8 must cover all 38 current tasks');
assert.equal(Object.values(a.claimEvidence).flat().filter(c=>typeof c.generalizationDistance==='string'&&c.generalizationDistance.length>20).length,60,'Gate 7 generalization-distance coverage');
assert.equal(Object.keys(a.decisionAudit?.tasks||{}).length,21,'Gate 5 decision-audit coverage');
assert.equal(a.misconceptionDiscriminatorAudit?.cases?.length,19,'wrong-solver audit coverage');
assert.equal(a.misconceptionDiscriminatorAudit?.designGateCoverage?.length,16,'design-gate misconception coverage');
assert(a.misconceptionDiscriminatorAudit.designGateCoverage.every(x=>x.status==='covered'),'uncovered design-gate misconception row');

assert(integration.includes('PASS_WITH_EVIDENCE for the repaired candidate'),'Gate-9 integration status missing');
assert(a.publication?.status==='published','canonical publication receipt missing');
assert.equal(a.publication?.roadmapAvailability,'authored');
assert.equal(a.publication?.semanticStatus,'accepted');

const authoringNames=fs.readdirSync('course/t22/authoring');
if(authoringNames.some(x=>/^m15(?:[-.])/i.test(x))){
  const later=read('course/t22/authoring/m15-side278.json');
  assert.equal(later.module?.order,15,'later M15 pack has unexpected order');
  assert.equal(later.module?.id,'SIDE278','later M15 pack has unexpected id');
  const registered=meta.moduleSources.find(x=>x.order===15&&x.id==='SIDE278');
  if(registered) assert.equal(registered.source,'course/t22/authoring/m15-side278.json','later published M15 source mismatch');
}

assert(fs.existsSync('docs/t22-course/audit/m14-pre-v12-repair-version-receipt.json'));
assert(fs.existsSync('docs/t22-course/audit/m14-followup-pre-fu-repair-version-receipt.json'));
assert(fs.existsSync('scripts/test-t22-elite-m14-browser.mjs'));

console.log('PASS M14 publication state: SIDE276 remains the authored/accepted module-14 contract; 19 sessions, 38 tasks, 60 claims, 38 separation rows, 21 decision audits and 16/16 misconception coverage are preserved across later-module publication.');
