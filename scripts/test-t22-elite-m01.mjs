import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const meta=read('course/t22/generated/course-meta.json');
const roadmap=read('course/t22/generated/roadmap.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const packs=meta.packs.map(read);
const evalPacks=meta.evaluatorPacks.map(read);
const course={...meta,sessions:packs.flatMap(p=>p.sessions).sort((a,b)=>a.order-b.order),problems:Object.assign({},...packs.map(p=>p.problems))};
const evaluator=Object.assign({},...evalPacks);

assert.equal(roadmap.modules.length,65);
assert.equal(deps.modules.length,65);
assert.equal(new Set(roadmap.modules.map(m=>m.id)).size,65);
assert.equal(new Set(deps.modules.map(m=>m.id)).size,65);
const pos=new Map(deps.modules.map(x=>[x.id,x.order]));
for(const m of deps.modules)for(const p of m.prerequisites){assert(pos.has(p),`${m.id} missing prereq ${p}`);assert(pos.get(p)<m.order,`${m.id} has backward prereq ${p}`);}
assert.equal(course.module.id,'T22E-FND01');
assert.equal(course.sessions.length,17);
assert.equal(Object.keys(course.problems).length,34);
assert.equal(Object.keys(evaluator).length,34);
assert.deepEqual(course.sessions.map(s=>s.order),Array.from({length:17},(_,i)=>i+1));
assert.equal(new Set(course.sessions.map(s=>s.id)).size,17);
assert.equal(new Set(Object.keys(course.problems)).size,34);
for(const s of course.sessions){
 assert.match(s.id,/^T22V3::T22E-FND01::S\d\d@1$/);
 assert.equal(s.contractHash.length,64);
 assert.equal(s.requiredOwnership.length,5);
 assert(s.entryPrerequisites.length>=1);
 assert(s.inScope.length>=4&&s.outOfScope.length>=4);
 const contract={id:s.id,title:s.title,focus:s.focus,purpose:s.purpose,centralCapability:s.centralCapability,principalObstacle:s.principalObstacle,entryPrerequisites:s.entryPrerequisites,requiredOwnership:s.requiredOwnership,applicationScope:s.applicationScope,transferScope:s.transferScope,inScope:s.inScope,outOfScope:s.outOfScope,exitCondition:s.exitCondition};
 const sort=x=>Array.isArray(x)?x.map(sort):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,sort(x[k])])):x;
 const exact=crypto.createHash('sha256').update(JSON.stringify(sort(contract))).digest('hex');
 assert.equal(exact,s.contractHash,`contract hash drift ${s.id}`);
 for(const id of [s.main,s.transfer]){
  assert(course.problems[id],`missing problem ${id}`);assert(evaluator[id],`missing evaluator ${id}`);
  assert.equal(evaluator[id].rubric.reduce((a,x)=>a+x.points,0),10,`${id} rubric must total 10`);
 }
}
assert(evaluator['T22V3::T22E-FND01::S01-M@1'].reference.includes('−29'));
assert(evaluator['T22V3::T22E-FND01::S05-M@1'].reference.includes('23,625'));
assert(evaluator['T22V3::T22E-FND01::S07-M@1'].reference.includes('6,138'));
assert(evaluator['T22V3::T22E-FND01::S11-M@1'].reference.includes('41/7'));
assert(evaluator['T22V3::T22E-FND01::S17-M@1'].reference.includes('5.12%'));
for(const p of ['t22-course.html','css/t22-course.css','js/t22-course/core.js','js/t22-course/ui.js'])assert(fs.existsSync(new URL(p,root)),`missing ${p}`);
console.log('PASS: M65 graph 65/65 topological; M01 17 sessions / 34 tasks / stable versioned IDs / 10-point evaluators.');
