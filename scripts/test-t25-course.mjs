import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {T25_ATOMIC_CARDS as cards} from '../js/data/t25-atomic-arcs.js';
import {emptyEvidence,validateEvidence,mergeEvidence,expose,publicOpening,compilerPacket,reviewQueue} from '../js/course/core.js';
const c=JSON.parse(readFileSync('course/generated/course.json')),keys=JSON.parse(readFileSync('course/generated/evaluator.json'));
assert.equal(c.sessions.length,162);assert.equal(c.targets.length,80);assert.equal(Object.keys(c.problems).length,361);assert.deepEqual(Object.keys(keys),Object.keys(c.problems));
for(const [i,s] of c.sessions.entries()){
 assert.equal(s.order,i+1);assert.equal(s.card.id,cards[i].id);assert.equal(s.contractHash,createHash('sha256').update(JSON.stringify(cards[i])).digest('hex'));
 for(const id of [s.main,s.transfer]){assert.equal(c.problems[id].order,s.order);assert(keys[id].reference.length>30);assert.equal(keys[id].rubric.reduce((n,r)=>n+r.points,0),10);}
 for(const anime of [false,true]){
  const p=publicOpening(c,s,anime);assert(p.startsWith('[WALL]'));assert(p.includes(c.problems[s.main].prompt));assert(!p.includes(keys[s.main].reference));assert(!p.includes(s.lesson));assert(!p.includes(c.problems[s.transfer].prompt));assert.equal(p.includes('[ANIME]'),anime);
 }
 const packet=compilerPacket(c,s,keys,true);assert(packet.includes(s.contractHash));for(const claim of s.card.requiredOwnership)assert(packet.includes(claim));assert(packet.includes(keys[s.transfer].reference));
}
const codes=new Set(c.targets.map(t=>t.code));assert.equal(c.scope.length,47);for(const row of c.scope)for(const t of row.targets)assert(codes.has(t),`Unknown scope target ${t}`);
assert.equal(c.questionRoutes.length,392);assert.equal(new Set(c.questionRoutes.map(q=>q.question_id)).size,392);for(const q of c.questionRoutes)assert(codes.has(q.primary_target));
assert.equal(c.sets.length,19);for(const s of c.sets){assert(s.problems.length>=3);assert.equal(new Set(s.problems).size,s.problems.length);for(const id of s.problems)assert(c.problems[id]);}
for(const [id,p] of Object.entries(c.problems))if(p.options){assert.equal(p.options.length,4);assert(Number.isInteger(keys[id].answer)&&keys[id].answer>=0&&keys[id].answer<4);}
let a=emptyEvidence();expose(a,'T25-001-M','2026-01-01T00:00:00.000Z');expose(a,'T25-001-T','2026-01-01T00:00:01.000Z','packetExportedAt');assert.equal(a.exposures['T25-001-T'].views,1);validateEvidence(a,c);
const attempt={id:'a',problemId:'T25-001-M',at:'2026-01-01T00:00:00.000Z',answer:'My derivation',assistance:'independent',result:'unreviewed',error:'',minutes:12,referenceSeenBefore:false,noteSeenDuringAttempt:false};a.attempts.push(attempt);assert.equal(reviewQueue(c,a)[0].reason,'Saved attempt awaits review');
a.attempts.push({...attempt,id:'r',reviewOf:'a',result:'secure'});validateEvidence(a,c);const q=reviewQueue(c,a,Date.parse('2026-01-09T00:00:00Z'));assert.equal(q[0].order,1);assert.equal(q[0].reason,'Delayed retention review due');
assert.deepEqual(mergeEvidence(a,a,c),validateEvidence(a,c));const conflict=structuredClone(a);conflict.attempts[0].answer='Different';assert.throws(()=>mergeEvidence(a,conflict,c));
for(const mutate of [x=>x.attempts[0].minutes=-1,x=>x.attempts[0].problemId='unknown',x=>x.attempts[0].at='bad',x=>x.attempts[0].assistance='magic',x=>x.attempts.push(x.attempts[0]),x=>x.attempts[1].reviewOf='missing',x=>x.exposures['T25-001-M'].views=0]){const b=structuredClone(a);mutate(b);assert.throws(()=>validateEvidence(b,c));}
const b=structuredClone(a);b.attempts.push({...attempt,id:'r2',reviewOf:'a',result:'shaky',at:'2026-01-10T00:00:00.000Z'});assert.equal(reviewQueue(c,b)[0].reason,'Repair recorded difficulty');
for(const path of ['docs/t25-course/RELEASE.md','docs/t25-course/RUN-LOG.md','t25-course.html'])assert(existsSync(path));
console.log('PASS: 162 current contract hashes; 361 paired tasks/keys; 324 plain/anime opening leak checks; 47 scope rows; 392 historical route identities; 19 sets; objective keys; evidence import/merge validation; reference-export edge; delayed review and repair scheduling.');
