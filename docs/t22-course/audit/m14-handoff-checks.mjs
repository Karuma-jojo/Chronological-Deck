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
assert.equal(a.module.status,'builder-verified-adversarially-repaired-awaiting-independent-review');
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
assert(resolution.includes('DO NOT REBUILD'),'resolution must explicitly reject an unsupported rebuild');
assert(verification.includes('M14 remains intentionally **outside** the shared learner registry'),'verification lost unpublished-state receipt');
assert(handoff.includes('awaiting independent review'),'handoff lost independent-review status');
assert(handoff.includes('Do not publish/register M14'),'handoff lost publication stop boundary');
assert(handoff.includes('Do not') && handoff.includes('open M15'),'handoff lost M15 stop boundary');

for(const cmd of [
  'node scripts/test-t22-elite-m14.mjs',
  'node docs/t22-course/audit/m14-math-checks.mjs',
  'node docs/t22-course/audit/m14-instruction-math-checks.mjs'
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

console.log('PASS M14 handoff state: 19 sessions, 38 fixed tasks, 60 claims; source roles complete; M13 remains learner frontier; M14 unpublished and isolated; M15 closed; verification and independent-review stop boundary intact.');
