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
const workflow=fs.readFileSync('.github/workflows/t22-elite-checks.yml','utf8');

assert.equal(a.module.order,14);
assert.equal(a.module.id,'SIDE276');
assert(['v1.2-followup-repaired-awaiting-exact-head-verification','v1.2-followup-repaired-awaiting-independent-acceptance'].includes(a.module.status),'unexpected final follow-up status');
assert.equal(a.sessions.length,19);
assert.equal(Object.keys(a.problems).length,38);
assert.equal(Object.keys(a.evaluators).length,38);
assert.equal(Object.values(a.claimEvidence).flat().length,60);

const dep=deps.modules.find(x=>x.id==='SIDE276');
assert(dep,'SIDE276 missing from dependency authority');
assert.deepEqual(a.boundary.prerequisiteModules,dep.prerequisites);
assert.deepEqual(a.boundary.prerequisiteModules,['ARC511']);

assert.equal(meta.moduleSources.length,13,'M14 must remain outside the shared learner registry');
assert(!meta.moduleSources.some(x=>x.order===14||x.id==='SIDE276'),'M14 was published before independent authorization');
assert.equal(meta.moduleSources.find(x=>x.order===13)?.id,'ARC511','M13 must remain the current learner frontier');

const road=roadmap.modules.find(x=>x.id==='SIDE276');
assert(road,'SIDE276 missing from roadmap');
assert.equal(road.availability,'planned','M14 roadmap state changed before independent acceptance');

const sem=semantic.entries.find(x=>x.id==='SIDE276');
assert(sem,'SIDE276 missing from semantic-prerequisite ledger');
assert.equal(sem.semanticStatus,'pending-boundary-audit','M14 semantic row advanced before independent acceptance');

for(const sourceId of [
  'REPO-M14','STRANG-4E','MIT-1806','AXLER-4E','HEFFERON',
  'MAA-IPG','IES-WWC','PED-DORIER','PED-LT','PED-MM-SYS','PED-DET'
]) assert(a.sourceLedger.sources.some(x=>x.id===sourceId),'missing source role '+sourceId);

for(const [name,text] of Object.entries({design,pilot,resolution,verification,handoff})){
  assert(text.includes('M14')||text.includes('SIDE276'),name+' does not identify the module');
}
for(const gate of ['Gate 4','Gate 5','Gate 6','Gate 7','Gate 8'])
  assert(pilot.includes(gate),'pilot receipt missing '+gate);

assert(resolution.includes('BOUNDED REPAIR'),'resolution must preserve bounded-repair disposition');
assert(resolution.includes('No finding required a rebuild'),'resolution must preserve the bounded-repair architecture decision');
assert(verification.includes('M14 remains intentionally **outside** the shared learner registry'),'verification lost unpublished-state receipt');
assert(handoff.includes('repaired implementation green')&&handoff.includes('independent follow-up'),'handoff lost v1.2 repair/follow-up status');
assert(handoff.includes('publish/register M14'),'handoff lost publication stop boundary');
assert(handoff.includes('open M15'),'handoff lost M15 stop boundary');

for(const cmd of [
  'node scripts/test-t22-elite-m14.mjs',
  'node docs/t22-course/audit/m14-math-checks.mjs',
  'node docs/t22-course/audit/m14-instruction-math-checks.mjs',
  'node docs/t22-course/audit/m14-handoff-checks.mjs',
  'node scripts/test-t22-elite-m14-browser.mjs'
]) assert(workflow.includes(cmd),'workflow missing '+cmd);

const authoringNames=fs.readdirSync('course/t22/authoring');
assert(!authoringNames.some(x=>/^m15(?:[-.])/i.test(x)),'M15 authoring opened before M14 independent acceptance');

assert(fs.existsSync('docs/t22-course/M14-DESIGN-GATE.md'));
assert(fs.existsSync('docs/t22-course/M14-PILOT-REVIEW.md'));
assert(fs.existsSync('docs/t22-course/M14-RESOLUTION.md'));
assert(fs.existsSync('docs/t22-course/M14-VERIFICATION.md'));
assert(fs.existsSync('docs/t22-course/M14-REVIEW-HANDOFF.md'));
assert(fs.existsSync('docs/t22-course/audit/m14-math-checks.mjs'));
assert(fs.existsSync('docs/t22-course/audit/m14-instruction-math-checks.mjs'));
assert(fs.existsSync('docs/t22-course/audit/m14-pre-v12-repair-version-receipt.json'));
assert(fs.existsSync('scripts/test-t22-elite-m14-browser.mjs'));
assert(fs.existsSync('docs/t22-course/audit/M14-V12-INTEGRATION-REVIEW.md'));
const integration=fs.readFileSync('docs/t22-course/audit/M14-V12-INTEGRATION-REVIEW.md','utf8');
assert(integration.includes('PASS_WITH_EVIDENCE for the repaired candidate'),'Gate-9 integration status missing');
assert(integration.includes('36221875839'),'Gate-9 receipt missing first full repaired run');
assert(!a.module.gate.includes('run #462'),'canonical gate must not retain stale #462 as current closure evidence');
assert(!a.module.gate.includes('remains pending until the browser probe'),'canonical gate retained stale Gate-11 pending language');

assert.equal(Object.keys(a.semanticSeparationAudit?.tasks||{}).length,38,'Gate 8 must cover all 38 current tasks');
assert.equal(Object.values(a.claimEvidence).flat().filter(c=>typeof c.generalizationDistance==='string'&&c.generalizationDistance.length>20).length,60,'Gate 7 generalization-distance coverage');
assert.equal(Object.keys(a.decisionAudit?.tasks||{}).length,21,'Gate 5 decision-audit coverage');
assert.equal(a.misconceptionDiscriminatorAudit?.cases?.length,19,'wrong-solver audit coverage');
assert.equal(a.misconceptionDiscriminatorAudit?.designGateCoverage?.length,16,'all design-gate misconception rows must be accounted for');
assert(a.misconceptionDiscriminatorAudit.designGateCoverage.every(x=>x.status==='covered'),'uncovered design-gate misconception row');
assert(handoff.includes('S07-T@1 → S07-T@2')&&handoff.includes('S09-T@1 → S09-T@2')&&handoff.includes('S11-M@1 → S11-M@2')&&handoff.includes('S18-M@1 → S18-M@2')&&handoff.includes('S19-M@1 → S19-M@2'),'handoff lost Gate-10 version receipts');

console.log('PASS M14 final follow-up handoff state: architecture preserved; S09-T@2 changed-surface repair, S14 ownership narrowing, 16/16 design-gate misconception coverage, canonical stale-state guards; M14 unpublished and M15 closed.');
