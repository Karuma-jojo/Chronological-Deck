import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const ledger=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const roadmap=read('course/t22/generated/roadmap.json');
assert.equal(deps.version,'M65-semantic-r2-2026-09-18');assert.equal(deps.modules.length,65);assert.equal(ledger.entries.length,65);
const depBy=new Map(deps.modules.map(m=>[m.id,m])),pos=new Map(deps.modules.map(m=>[m.id,m.order])),ledBy=new Map(ledger.entries.map(m=>[m.id,m]));
assert.equal(depBy.size,65);assert.equal(ledBy.size,65);
for(const m of deps.modules){assert(ledBy.has(m.id),`missing semantic ledger row ${m.id}`);assert.equal(ledBy.get(m.id).order,m.order);for(const p of m.prerequisites){assert(pos.has(p),`${m.id} missing prerequisite ${p}`);assert(pos.get(p)<m.order,`${m.id} backward prerequisite ${p}`);}}
for(const row of ledger.entries){assert(['new','reused','adapted'].includes(row.mode));assert(['accepted','pending-boundary-audit','boundary-accepted-content-candidate','planned-with-known-edge','planned-with-known-bridge'].includes(row.semanticStatus));assert(Array.isArray(row.bridges));}
assert(ledBy.get('T22E-FND01').semanticStatus==='accepted');
assert(ledBy.get('T22E-DISC01').semanticStatus==='accepted','M03 publication state must remain semantically accepted');
assert(ledBy.get('ARC048').semanticStatus==='accepted','M04 publication state must remain semantically accepted');
// M03 semantic-boundary repair.
assert(depBy.get('T22E-DISC01').prerequisites.includes('T22E-FND02'),'M03 formal map reasoning requires M02 function foundations');
// Astra A-06 named ancestry repairs.
assert(depBy.get('T22E-MKT01').prerequisites.includes('T22E-FND02'),'M07 log returns require M02 logarithms');
assert(depBy.get('ARC517').prerequisites.includes('SIDE271'),'M26 joint continuous laws require multivariable context');
assert(depBy.get('ARC531').prerequisites.includes('T22E-CODE02'),'M33 numerical MLE requires research-computing ancestry');
assert(depBy.get('ARC542').prerequisites.includes('T22E-FND02'),'M42 stability bridge requires precalculus/polynomial ancestry');
const bridge=(id,bid)=>ledBy.get(id).bridges.find(b=>b.id===bid);
assert(bridge('SIDE263','M09-B01')?.content.includes('without assuming ARC053'));
assert(bridge('ARC517','M26-B01')?.content.includes('iterated integrals'));
assert(bridge('ARC531','M33-B01')?.content.includes('convergence/status'));
assert(bridge('ARC542','M42-B01')?.content.includes('modulus'));
// Publication gate: anything exposed as authored must have semantic acceptance.
for(const m of roadmap.modules.filter(x=>x.availability==='authored'))assert.equal(ledBy.get(m.id)?.semanticStatus,'accepted',`${m.id} is authored without semantic acceptance`);
console.log('PASS: 65/65 semantic-ledger rows; topological graph; M07/M26/M33/M42 edge repairs; M09/M26/M33/M42 bridge owners; authored-module semantic gate.');
