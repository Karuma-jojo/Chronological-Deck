import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m14-side276.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const meta=read('course/t22/generated/course-meta.json');
const roadmap=read('course/t22/generated/roadmap.json');
const ledger=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const design=fs.readFileSync('docs/t22-course/M14-DESIGN-GATE.md','utf8');
const pilot=fs.readFileSync('docs/t22-course/M14-PILOT-REVIEW.md','utf8');

assert.equal(a.module.order,14);
assert.equal(a.module.id,'SIDE276');
assert.equal(a.sessions.length,19);
assert.equal(Object.keys(a.problems).length,38);
assert.equal(Object.keys(a.evaluators).length,38);
assert.equal(Object.values(a.claimEvidence).flat().length,60);
assert.deepEqual(a.boundary.prerequisiteModules,deps.modules.find(m=>m.id==='SIDE276').prerequisites);
assert.equal(a.coverageAudit.authoredSessions,19);
assert.equal(a.coverageAudit.fixedAssessments,38);
assert.equal(a.coverageAudit.ownershipClaimCount,60);

// BUILD means M14 is intentionally not in the shared learner registry yet.
assert.equal(meta.moduleSources.length,13);
assert(!meta.moduleSources.some(x=>x.order===14||x.id==='SIDE276'));
assert.equal(roadmap.modules.find(x=>x.id==='SIDE276').availability,'planned');
assert.equal(ledger.entries.find(x=>x.id==='SIDE276').semanticStatus,'pending-boundary-audit');

for(const term of [
  'Boundary Contract','Source Dossier','Support-Theorem Ledger',
  'Concept dependency graph','Conceptual-distinction map',
  'Misconception / failure-mode map','Representation progression map',
  'Downstream obligation map','Narrative spine',
  'Candidate pedagogical atoms'
]) assert(design.toLowerCase().includes(term.toLowerCase()),'missing design artifact '+term);

for(const gate of ['Gate 4','Gate 5','Gate 6','Gate 7','Gate 8'])
  assert(pilot.includes(gate),'pilot missing '+gate);

for(const id of [
  'REPO-M14','STRANG-4E','MIT-1806','AXLER-4E','HEFFERON',
  'MAA-IPG','IES-WWC','PED-DORIER','PED-LT','PED-MM-SYS'
]) assert(a.sourceLedger.sources.some(s=>s.id===id),'missing source role '+id);

function validateClaim(s,c){
  assert(s.requiredOwnership.includes(c.claim),s.id+' foreign ownership claim');
  const ids=c.task.split('+').map(k=>s[k]);
  assert.deepEqual(c.taskIds,ids,s.id+' stale taskIds');
  assert.deepEqual(c.publicRequestExact,ids.map(id=>a.problems[id].prompt),s.id+' stale public prompt receipt');
  const rows=ids.flatMap(id=>a.evaluators[id].rubric.map(r=>r.criterion));
  assert(c.rubricEvidence.length>0,s.id+' empty rubric evidence');
  for(const r of c.rubricEvidence) assert(rows.includes(r),s.id+' invalid scoring locator '+r);
  assert.equal(c.disposition,'adequate',s.id+' unresolved ownership claim');
  assert(c.why.length>25 && c.escapeAttempt.length>25,s.id+' weak observer rationale');
}

for(let i=0;i<19;i++){
  const s=a.sessions[i], n=String(i+1).padStart(2,'0');
  assert.equal(s.order,i+1);
  assert.equal(s.id,`T22V3::SIDE276::S${n}@1`);
  assert.equal(s.moduleId,'SIDE276');
  assert.equal(s.main,`T22V3::SIDE276::S${n}-M@1`);
  assert.equal(s.transfer,`T22V3::SIDE276::S${n}-T@1`);
  for(const term of ['Worked example.','Guided practice.','Distinction check.'])
    assert(s.lesson.includes(term),s.id+' missing '+term);
  assert(s.lesson.length>900,s.id+' lesson too thin');
  assert(s.guidedFeedback.startsWith('Check after attempting. '),s.id+' feedback not staged');
  assert(!s.lesson.includes(s.guidedFeedback.slice(24)),s.id+' guided answer leaked into lesson');

  assert.equal(a.coverage[s.id].length,s.requiredOwnership.length,s.id+' coverage length');
  assert.equal(a.claimEvidence[s.id].length,s.requiredOwnership.length,s.id+' claim count');
  for(const c of a.claimEvidence[s.id]) validateClaim(s,c);

  assert.deepEqual(a.semanticSeparationAudit.sessions[s.id],a.evidenceDistance[s.id],s.id+' semantic receipt mismatch');
  for(const kind of ['main','transfer']){
    const id=s[kind], p=a.problems[id], e=a.evaluators[id];
    assert(p && e,id+' missing problem/evaluator');
    assert.equal(p.order,i+1); assert.equal(p.kind,kind); assert.equal(p.obligationVersion,1);
    assert(p.prompt.length>100,id+' prompt too thin');
    assert(e.reference.length>100,id+' reference too thin');
    assert(e.rubric.length>=2,id+' rubric too thin');
    assert.equal(e.rubric.reduce((sum,r)=>sum+r.points,0),10,id+' rubric total');
    assert(!s.lesson.includes(p.prompt),id+' exact prompt exposure');
    assert(!s.lesson.includes(e.reference),id+' exact reference exposure');
  }
}

// Stronger answer-bearing overlap control: no fixed task may reuse a full
// matrix literal from an earlier lesson/guided answer/reference or from its
// own lesson/guided answer. Incidental scalar/vector echoes are reviewed
// semantically rather than treated as automatic contamination.
const matrixRE=/\[\[[^\n]+?\]\]/g;
const matrices=t=>[...new Set(t.match(matrixRE)||[])];
for(const s of a.sessions){
  for(const kind of ['main','transfer']){
    const id=s[kind], literals=matrices(a.problems[id].prompt), earlier=[];
    for(const p of a.sessions){
      if(p.order>s.order) break;
      if(p.order<s.order){
        earlier.push(p.lesson,p.guidedFeedback);
        for(const k of ['main','transfer']) earlier.push(a.evaluators[p[k]].reference);
      } else {
        earlier.push(p.lesson,p.guidedFeedback);
        if(kind==='transfer') earlier.push(a.evaluators[p.main].reference);
      }
    }
    for(const m of literals)
      assert(!earlier.some(t=>t.includes(m)),id+' reuses an answer-bearing matrix '+m);
  }
}

// Future machinery may be named only as a boundary/prohibition, never consumed.
const futureUse=/\b(projection|least squares|eigenvalues?|eigenvectors?|diagonalization|spectral|SVD|pseudoinverse|Cholesky|QR|condition number|Jacobian|Hessian|floating-point|LU)\b/i;
for(const s of a.sessions){
  for(const id of [s.main,s.transfer]){
    const p=a.problems[id].prompt;
    if(futureUse.test(p)){
      // S13 only says not to use eigenvalues; no future method is requested.
      assert(id==='T22V3::SIDE276::S13-T@1' && /Without computing a determinant or eigenvalue/.test(p),id+' consumes future machinery');
    }
  }
}

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((sum,v,k)=>sum+v*B[k][j],0)));
const mv=(A,x)=>A.map(r=>r.reduce((sum,v,i)=>sum+v*x[i],0));
const det=A=>{
  if(A.length===1)return A[0][0];
  if(A.length===2)return A[0][0]*A[1][1]-A[0][1]*A[1][0];
  return A[0].reduce((sum,v,j)=>sum+(j%2?-1:1)*v*det(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
};
const eq=(x,y)=>assert.deepEqual(x,y);

// Selected independent reconstructions spanning the module.
eq(mm([[1,0,2],[-1,3,1]],[[1,2],[0,-1],[2,1]]),[[5,4],[1,-4]]); // S04
eq(mv([[1,1,1],[2,3,1],[1,2,0]],[1,1,2]),[4,7,3]);               // S07 family t=2
eq(mv([[1,-1,2],[2,-2,4]],[1,1,0]),[0,0]);                       // S08
eq(mv([[1,0,1],[0,1,1]],[1,0,2]),[3,2]);                         // S09 family t=2
assert.equal(det([[0,2,1],[1,1,0],[2,0,3]]),-8);                  // S15
assert.equal(det([[3,1],[1,2]]),5);                               // S16
eq(mm([[1,2],[1,3]],[[3,-2],[-1,1]]),[[1,0],[0,1]]);             // S14 fresh inverse
const D=mm(mm([[2,-1],[-1,1]],[[2,1],[0,3]]),[[1,1],[1,2]]);
eq(D,[[3,2],[0,2]]);                                              // S18
assert.equal(det(D),6);
eq(mv([[1,0,1],[1,1,2],[2,1,3]],[-1,-1,1]),[0,0,0]);             // S19
eq(mm(mm([[0,0,1],[0,1,0],[1,0,0]],[[1,0,1],[1,1,2],[2,1,3]]),[[0,0,1],[0,1,0],[1,0,0]]),
   [[3,1,2],[2,1,1],[1,0,1]]);

console.log('PASS M14 builder candidate: 19 sessions, 38 tasks, 60 literal ownership links; no full-matrix answer reuse; selected mathematics independently reconstructed; M14 remains unpublished pending independent review.');
