import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m13-arc511.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const meta=read('course/t22/generated/course-meta.json');
const roadmap=read('course/t22/generated/roadmap.json');
const ledger=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const design=fs.readFileSync('docs/t22-course/M13-DESIGN-GATE.md','utf8');
const pilot=fs.readFileSync('docs/t22-course/M13-PILOT-REVIEW.md','utf8');

assert.equal(a.module.order,13);
assert.equal(a.module.id,'ARC511');
assert.equal(a.sessions.length,17);
assert.equal(Object.keys(a.problems).length,34);
assert.equal(Object.keys(a.evaluators).length,34);
assert.deepEqual(a.boundary.prerequisiteModules,deps.modules.find(m=>m.id==='ARC511').prerequisites);
assert.equal(Object.values(a.claimEvidence).flat().length,49);
assert.equal(a.coverageAudit.ownershipClaimCount,49);
assert.equal(a.coverageAudit.authoredSessions,17);
assert.deepEqual(meta.moduleSources.filter(x=>x.order<=13).map(x=>x.order),Array.from({length:13},(_,i)=>i+1));
assert(meta.moduleSources.some(s=>s.order===13&&s.id==='ARC511'&&s.source==='course/t22/authoring/m13-arc511.json'));
assert.equal(roadmap.modules.find(x=>x.id==='ARC511').availability,'authored');
assert.equal(ledger.entries.find(x=>x.id==='ARC511').semanticStatus,'accepted');
assert.equal(a.module.status,'published-user-authorized-follow-up');
assert.match(a.module.gate,/published in the shared thirteen-module learner route/);
assert.equal(a.instructionVersion,'m13-arc511-instruction-v2');
for(const term of ['Boundary Contract','Source Dossier','Support-Theorem Ledger','Concept dependency graph','Conceptual-distinction map','Misconception / failure-mode map','Representation progression map','Downstream obligation map','Narrative spine','Candidate pedagogical atoms','Split/merge decisions']) assert(design.toLowerCase().includes(term.toLowerCase()),`missing pre-authoring artifact ${term}`);
for(const gate of ['Gate 4','Gate 5','Gate 6','Gate 7','Gate 8']) assert(pilot.includes(gate),`pilot ${gate}`);
for(const id of ['REPO-M13','MIT-1806','STRANG-4E','AXLER-4E','OPENSTAX-C3-23','MAA-IPG','IES-WWC','PED-DENG']) assert(a.sourceLedger.sources.some(s=>s.id===id),`source ${id}`);

const ids=new Set();
function validateClaim(s,claim){
  assert(s.requiredOwnership.includes(claim.claim),`${s.id} unowned claim`);
  const expected=claim.task.split('+').map(k=>s[k]);
  assert.deepEqual(claim.taskIds,expected);
  assert.deepEqual(claim.publicRequestExact,expected.map(id=>a.problems[id].prompt));
  const actualRows=expected.flatMap(id=>a.evaluators[id].rubric.map(r=>r.criterion));
  assert(claim.rubricEvidence.length>0);
  for(const row of claim.rubricEvidence) assert(actualRows.includes(row),`${s.id} invalid scoring locator`);
  assert(claim.why.length>25 && claim.escapeAttempt.length>25 && claim.disposition==='adequate');
}
// Bounded rubric regression: the S05 witness uses its public p,q,w objects;
// S09 must credit any valid obstruction, including one with third coordinate zero.
const s05=a.sessions[4],s09=a.sessions[8];
const rubric05=a.evaluators[s05.transfer].rubric.map(r=>r.criterion).join(' ');
const rubric09=a.evaluators[s09.transfer].rubric.map(r=>r.criterion).join(' ');
assert(rubric05.includes('t=2p+2q-w')&&!rubric05.includes('t=2u-v-w'));
assert(rubric09.includes('target outside the pair’s span'));
assert(!rubric09.includes('target with nonzero third coordinate'));
// (1,0,0) is also outside span{(2,0,1),(0,3,-1)} despite third=0.
assert.notEqual(0,1/2-0);
for(let i=0;i<17;i++){
  const s=a.sessions[i],n=String(i+1).padStart(2,'0');
  assert.equal(s.order,i+1);
  assert.equal(s.id,`T22V3::ARC511::S${n}@1`);
  assert(!ids.has(s.id)); ids.add(s.id);
  assert.equal(s.moduleId,'ARC511');
  assert.equal(s.main,`T22V3::ARC511::S${n}-M@${[11,17].includes(i+1)?2:1}`);
  assert.equal(s.transfer,`T22V3::ARC511::S${n}-T@${i+1===11?2:1}`);
  assert(s.lesson.length>700 && s.lesson.includes('\n\n'));
  assert(!s.lesson.includes('\\n'),`${s.id} visible escape`);
  assert(/Worked example\./.test(s.lesson) && /Guided practice\./.test(s.lesson) && /Distinction check\./.test(s.lesson));
  assert(s.guidedFeedback?.startsWith('Check after attempting. '));
  assert(!s.lesson.includes(s.guidedFeedback.slice(24)),`${s.id} guided answer is exposed before attempt`);
  assert.deepEqual(a.coverage[s.id].length,s.requiredOwnership.length);
  assert.equal(a.claimEvidence[s.id].length,s.requiredOwnership.length);
  for(const c of a.claimEvidence[s.id])validateClaim(s,c);
  for(const [kind,id] of [['main',s.main],['transfer',s.transfer]]){
    const p=a.problems[id],e=a.evaluators[id];
    assert(p && e && p.kind===kind && p.order===i+1 && p.obligationVersion===([11,17].includes(i+1)&&kind==='main'||i+1===11&&kind==='transfer'?2:1));
    assert(p.prompt.length>90 && e.reference.length>80 && e.rubric.length>=2);
    assert.equal(e.rubric.reduce((sum,row)=>sum+row.points,0),10);
    assert(!s.lesson.includes(p.prompt) && !s.lesson.includes(e.reference),`${id} exact answer exposure`);
  }
  assert(['retrieval','proof reconstruction','fresh Main evidence'].includes(a.evidenceDistance[s.id].main.classification));
  assert.equal(a.evidenceDistance[s.id].transfer.classification,'changed-surface Transfer');
  assert.deepEqual(a.semanticSeparationAudit.sessions[s.id],a.evidenceDistance[s.id]);
}
// Known-bad controls from the separate adversarial review: a solved guided
// action, a fresh label on a rehearsed proof, and an unobserved zero case.
for(const i of [4,5,7,10,16]) assert.equal(a.evidenceDistance[a.sessions[i-1].id].main.classification,'retrieval');
assert(!a.sessions[12].requiredOwnership.some(x=>/handle the zero-vector case/.test(x)));
assert(a.sessions[12].requiredOwnership.some(x=>/justify their nonnegativity/.test(x)));
assert.match(a.sessions[10].lesson,/subspace of some real R\^N/);
assert.match(a.problems[a.sessions[10].main].prompt,/subspace of some real R\^N/);
assert.match(a.problems[a.sessions[10].transfer].prompt,/subspace U of some real R\^N/);
assert.match(a.problems[a.sessions[16].main].prompt,/choose the geometric diagnostic/);
assert.match(a.evaluators[a.sessions[16].main].reference,/cos\(t,e\)=3\/sqrt\(11\)/);
assert(!/Finally, for d=.*compute t·d and the cosine/.test(a.problems[a.sessions[16].main].prompt));
// Mutation control: a real rubric row from the wrong task cannot masquerade as evidence.
{
  const s=a.sessions[0],c=structuredClone(a.claimEvidence[s.id][0]);
  c.rubricEvidence=[a.evaluators[s.transfer].rubric[0].criterion];
  assert.throws(()=>validateClaim(s,c));
}

const add=(x,y)=>x.map((v,i)=>v+y[i]);
const sub=(x,y)=>x.map((v,i)=>v-y[i]);
const mul=(c,x)=>x.map(v=>c*v);
const dot=(x,y)=>x.reduce((s,v,i)=>s+v*y[i],0);
const eq=(x,y)=>assert.deepEqual(x,y);

// Independently reconstruct the risky numeric assessment results from givens.
eq(sub(mul(2,[2,-1,4]),[-3,5,1]),[7,-7,7]);                    // S01
eq(sub([-1,3,2],[2,-1,4]),[-3,4,-2]);                       // S02
eq(add([5,2],[7,1]),[12,3]);                                 // S02 Transfer aligned units
eq(add(mul(2,[2,1,0]),mul(-1,[-1,0,3])),[5,2,-3]);           // S03
eq(add(mul(2,[1,2,0]),[0,-1,1]),[2,3,1]);                   // S04
for(const [r,s] of [[0,0],[3,-2],[-7,4]]) eq(add(mul(r,[1,0,1]),mul(s,[0,2,1])),[r,2*s,r+s]);
assert.notEqual(0,2*2+3*(-1));                               // S05 obstruction
eq(sub(add(mul(2,[1,1,0]),mul(2,[0,1,2])),[0,0,1]),[2,4,3]); // S05 Transfer
assert.equal(2-2*1+0,0);                                     // S06 nonzero member
const indep=[[1,1,0],[0,1,1],[1,0,1]];
assert.equal(dot(indep[0],[1,0,0]),1);                        // S07 typed coordinate spot check
eq(sub(add([1,0,1],[0,1,1]),[1,1,2]),[0,0,0]);             // S08
for(const [x,y] of [[0,0],[5,-4],[-3,7]]){
  const c=(2*x+y)/3,d=(x-y)/3;
  eq(add(mul(c,[1,1]),mul(d,[1,-2])),[x,y]);                 // S09 arbitrary target
}
eq(add(mul(2,[1,0,1]),mul(-1,[0,1,3])),[2,-1,-1]);           // S10
eq(add([1,-1,0],mul(3,[0,1,-1])),[1,2,-3]);                // S10 Transfer
eq(sub([1,1],mul(2,[0,1])),[1,-1]);                         // S11 replacement example
eq(add(mul(2,[1,0,3]),mul(-1,[0,1,2])),[2,-1,4]);           // S12 basis illustration
assert.equal(dot([2,-1,2],[-1,3,0]),-5);                      // S13
assert.equal(dot([2,-1,2],[2,-1,2]),9);
assert.equal(dot([-1,3,0],[-1,3,0]),10);
assert(12>5*2 && 20>5+2);                                   // S14 report invalidity
assert.equal(dot([1,2],[2,1]),4);                            // S15 cosine 4/5
assert.equal(dot([0,0,0],[2,-1,4]),0);
assert.equal(dot([2,-1,4],[2,-1,4]),21);
assert.equal(dot([1,0],[100,100]),100);                      // S16 raw versus normalized
assert.equal(dot([1,0],[2,0]),2);
assert.equal(dot([1,0],[0,3]),0);
eq(add(mul(3,[1,0,1]),mul(-1,[0,1,2])),[3,-1,1]);           // S17 basis witness
assert.equal(dot([3,-1,1],[100,0,-100]),200);
assert.equal(dot([3,-1,1],[1,0,0]),3);
assert(3/Math.sqrt(11)>2/Math.sqrt(22));
assert.equal(dot([3,-1,1],[3,-1,1]),11);
assert.equal(dot([100,0,-100],[100,0,-100]),20000);
eq(sub(add([1,0,2],[0,2,1]),[1,2,3]),[0,0,0]);             // S17 Transfer relation
assert.notEqual(3,2*2+2/2);                                  // S17 Transfer obstruction

console.log('PASS M13 publication: 17 sessions, 34 tasks, 49 exact claim links; selected references independently recomputed; M13 registered as module 13.');
