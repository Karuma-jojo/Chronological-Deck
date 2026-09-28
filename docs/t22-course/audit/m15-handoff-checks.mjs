import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m15-side278.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const meta=read('course/t22/generated/course-meta.json');
const roadmap=read('course/t22/generated/roadmap.json');
const semantic=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');

const verification=fs.readFileSync('docs/t22-course/M15-VERIFICATION.md','utf8');
const handoff=fs.readFileSync('docs/t22-course/M15-REVIEW-HANDOFF.md','utf8');
const resolution=fs.readFileSync('docs/t22-course/M15-RESOLUTION.md','utf8');
const review=fs.readFileSync('docs/t22-course/M15-INDEPENDENT-REVIEW.md','utf8');
const workflow=fs.readFileSync('.github/workflows/t22-elite-checks.yml','utf8');

assert.equal(a.module.order,15);
assert.equal(a.module.id,'SIDE278');
assert.equal(a.module.status,'published-user-authorized-independent-accepted');
assert.equal(a.sessions.length,16);
assert.equal(Object.keys(a.problems).length,32);
assert.equal(Object.keys(a.evaluators).length,32);
assert.equal(Object.values(a.claimEvidence).flat().length,48);

const dep=deps.modules.find(x=>x.id==='SIDE278');
assert(dep,'SIDE278 missing from dependency authority');
assert.deepEqual(a.boundary.prerequisiteModules,dep.prerequisites);
assert.deepEqual(a.boundary.prerequisiteModules,['SIDE276']);

assert.equal(meta.moduleSources.length,15,'published registry must contain M01-M15');
assert.equal(meta.moduleSources.at(-1)?.order,15);
assert.equal(meta.moduleSources.at(-1)?.id,'SIDE278');
assert.equal(meta.moduleSources.at(-1)?.source,'course/t22/authoring/m15-side278.json');
assert.equal(meta.version,'T22E-course-0.15.0-through-m15-publication');

const road=roadmap.modules.find(x=>x.id==='SIDE278');
assert(road,'SIDE278 missing from roadmap');
assert.equal(road.availability,'authored');

const sem=semantic.entries.find(x=>x.id==='SIDE278');
assert(sem,'SIDE278 missing from semantic ledger');
assert.equal(sem.semanticStatus,'accepted');
assert(sem.bridges.some(x=>x.id==='M15-B01'&&x.implementedBy==='M15-S10'),'M15 transpose bridge missing');

assert.equal(a.publication?.status,'published');
assert.equal(a.publication?.authorizedBy,'user');
assert.equal(a.publication?.authorizedDate,'2026-09-28');
assert.equal(a.publication?.learnerRegistry,'course/t22/generated/course-meta.json');
assert.equal(a.publication?.roadmapAvailability,'authored');
assert.equal(a.publication?.semanticStatus,'accepted');
assert.equal(a.publication?.priorAcceptedHead,'94de6d26587854765e65d46615f2a4063f721bfa');
assert.equal(a.publication?.priorExactHeadRun?.id,36313956336);
assert.equal(a.publication?.priorExactHeadRun?.number,571);
assert.equal(a.publication?.priorExactHeadRun?.conclusion,'success');

let mainOnly=0,transferOnly=0,both=0;
for(const claims of Object.values(a.claimEvidence)) for(const c of claims){
  const hasM=c.taskIds.some(id=>id.includes('-M@'));
  const hasT=c.taskIds.some(id=>id.includes('-T@'));
  if(hasM&&hasT) both++; else if(hasM) mainOnly++; else if(hasT) transferOnly++;
}
assert.deepEqual({mainOnly,transferOnly,both},{mainOnly:35,transferOnly:11,both:2});
for(const n of [14,15]) for(const c of a.claimEvidence[a.sessions[n-1].id]){
  assert(c.taskIds.some(id=>id.includes('-M@')),'S'+n+' claim lost Main observer');
  assert(!c.taskIds.some(id=>id.includes('-T@2')),'S'+n+' claim cosmetically remapped to @2 Transfer');
}

assert(fs.existsSync('docs/t22-course/audit/m15-pre-independent-repair-version-receipt.json'));
assert.equal(a.sessions[13].transfer,'T22V3::SIDE278::S14-T@2');
assert.equal(a.sessions[14].transfer,'T22V3::SIDE278::S15-T@2');
assert.equal(a.problems[a.sessions[13].transfer].obligationVersion,2);
assert.equal(a.problems[a.sessions[14].transfer].obligationVersion,2);

assert(verification.includes('M15 is **published on the publication candidate branch**'));
assert(verification.includes('run #578'));
assert(verification.includes('36373130210'));
assert(handoff.includes('M15 is now registered as the fifteenth learner module'));
assert(handoff.includes('M16 / SIDE279 — planned and closed'));
assert(resolution.startsWith('> **Current status (2026-09-28): PUBLISHED ON PUBLICATION CANDIDATE.**'));
assert(review.startsWith('> **Current status (2026-09-28): INDEPENDENTLY ACCEPTED AND USER-AUTHORIZED FOR PUBLICATION.**'));

const m16Meta=meta.moduleSources.find(x=>x.id==='SIDE279');
assert.equal(m16Meta,undefined,'M16 must not be in learner registry');
assert.equal(roadmap.modules.find(x=>x.id==='SIDE279')?.availability,'planned','M16 roadmap must remain planned');
assert.notEqual(semantic.entries.find(x=>x.id==='SIDE279')?.semanticStatus,'accepted','M16 semantic status must remain unaccepted');
assert(!fs.existsSync('course/t22/authoring/m16-side279.json'),'M16 authoring must remain closed');

for(const cmd of [
  'node scripts/test-t22-elite-m15.mjs',
  'node docs/t22-course/audit/m15-math-checks.mjs',
  'node docs/t22-course/audit/m15-handoff-checks.mjs',
  'node scripts/test-t22-elite-m15-browser.mjs'
]) assert(workflow.includes(cmd),'workflow missing '+cmd);

console.log('PASS M15 publication state: SIDE278 is the published/accepted module-15 learner frontier; 16 sessions, 32 tasks and 48 claims are preserved; M14 remains intact and M16 remains closed.');
