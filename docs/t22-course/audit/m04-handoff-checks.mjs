import fs from 'node:fs';import assert from 'node:assert/strict';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m04.json'),meta=read('course/t22/generated/course-meta.json'),road=read('course/t22/generated/roadmap.json'),led=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const hand=fs.readFileSync('docs/t22-course/M04-REVIEW-HANDOFF.md','utf8'),core=fs.readFileSync('js/t22-course/core.js','utf8');
assert.equal(a.module.status,'authored-v1.1-accepted');assert.equal(a.sessions.length,24);assert.equal(Object.keys(a.problems).length,48);assert.equal(Object.values(a.claimEvidence).flat().length,120);assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,24);
assert.equal(road.modules.find(x=>x.id==='ARC048').availability,'authored');assert.equal(led.entries.find(x=>x.id==='ARC048').semanticStatus,'accepted');
assert.equal(road.modules.find(x=>x.id==='T22E-TRD01').availability,'planned');assert.equal(road.modules.find(x=>x.id==='ARC502').availability,'planned');
assert(meta.moduleSources.some(x=>x.id==='ARC048'&&x.source==='course/t22/authoring/m04.json'));assert(core.includes("STORAGE_KEY='chrono_t22_elite_course_evidence_v1'"));
assert(!fs.existsSync('course/t22/authoring/m05.json'));assert(!fs.existsSync('course/t22/authoring/m06.json'));
for(const s of a.sessions){assert.equal(s.requiredOwnership.length,5);assert.equal(a.claimEvidence[s.id].length,5);assert.equal(a.semanticSeparationAudit.sessions[s.id].status,'reviewed-separated');}
for(const token of ['d23b9d3b1b618904f907f8f6d6bfaef55c72873e','35357495764','35358108648','35358320673','35358556729','35358756035','24/24','48/48','120/120','STOP HERE. M04 is internally accepted and ready for independent review. M05 and M06 have not been authored.'])assert(hand.includes(token),token);
console.log('PASS: M04 handoff matches accepted 24/48/120 repository state; semantic audit 24/24; shared evidence key unchanged; M05/M06 remain planned and un-authored.');
