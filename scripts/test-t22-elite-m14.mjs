import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m14-side276.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const meta=read('course/t22/generated/course-meta.json');
const roadmap=read('course/t22/generated/roadmap.json');
const ledger=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const prior=read('docs/t22-course/audit/m14-pre-v12-repair-version-receipt.json');
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

// Published M14 must be present in the shared learner registry and accepted route metadata.
assert.equal(meta.moduleSources.length,14);
const publishedSource=meta.moduleSources.find(x=>x.order===14&&x.id==='SIDE276');
assert(publishedSource,'M14 missing from published learner registry');
assert.equal(publishedSource.sourceType,'authoring-pack');
assert.equal(publishedSource.source,'course/t22/authoring/m14-side276.json');
assert.equal(roadmap.modules.find(x=>x.id==='SIDE276').availability,'authored');
assert.equal(ledger.entries.find(x=>x.id==='SIDE276').semanticStatus,'accepted');
assert.equal(a.module.status,'published-user-authorized-independent-accepted');

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
  'MAA-IPG','IES-WWC','PED-DORIER','PED-LT','PED-MM-SYS','PED-DET'
]) assert(a.sourceLedger.sources.some(s=>s.id===id),'missing source role '+id);

// Gate 10: prior assessment contracts were captured before v1.2 edits.
assert.equal(prior.priorHead,'937a4ca33a921ca87f83fa14651d87e473272ff1');
assert.equal(prior.changedAssessments.length,4);
for(const x of prior.changedAssessments){
  assert.match(x.oldFingerprint,/^[0-9a-f]{64}$/);
  assert(!a.problems[x.oldId],'old assessment id should not masquerade as current');
  assert(a.problems[x.plannedNewId],'versioned replacement missing '+x.plannedNewId);
}

const allowedEvidence=new Set(['retrieval','proof reconstruction','fresh Main evidence','changed-surface Transfer']);
const mainV=new Map([[11,2],[18,2],[19,2]]);
const transferV=new Map([[7,2],[9,2]]);

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
  assert(typeof c.generalizationDistance==='string'&&c.generalizationDistance.length>25,s.id+' missing Gate-7 generalization distance');
}

for(let i=0;i<19;i++){
  const s=a.sessions[i], n=i+1, ss=String(n).padStart(2,'0');
  assert.equal(s.order,n);
  assert.equal(s.id,`T22V3::SIDE276::S${ss}@1`);
  assert.equal(s.moduleId,'SIDE276');
  const mv=mainV.get(n)||1,tv=transferV.get(n)||1;
  assert.equal(s.main,`T22V3::SIDE276::S${ss}-M@${mv}`);
  assert.equal(s.transfer,`T22V3::SIDE276::S${ss}-T@${tv}`);
  for(const term of ['Worked example.','Guided practice.','Distinction check.'])
    assert(s.lesson.includes(term),s.id+' missing '+term);
  assert(s.lesson.length>900,s.id+' lesson too thin');
  assert(s.guidedFeedback.startsWith('Check after attempting. '),s.id+' feedback not staged');
  assert(!s.lesson.includes(s.guidedFeedback.slice(24)),s.id+' guided answer leaked into lesson');

  assert.equal(a.coverage[s.id].length,s.requiredOwnership.length,s.id+' coverage length');
  assert.deepEqual(a.coverage[s.id],s.requiredOwnership,s.id+' coverage drift');
  assert.equal(a.claimEvidence[s.id].length,s.requiredOwnership.length,s.id+' claim count');
  for(const c of a.claimEvidence[s.id]) validateClaim(s,c);

  const ed=a.evidenceDistance[s.id];
  assert(allowedEvidence.has(ed.main.classification),s.id+' illegal Main evidence class');
  assert(allowedEvidence.has(ed.transfer.classification),s.id+' illegal Transfer evidence class');
  assert.notEqual(ed.main.classification,'changed-surface Transfer',s.id+' Main cannot be Transfer-classified');
  assert.equal(ed.transfer.classification,'changed-surface Transfer',s.id+' Transfer slot must carry genuine changed-surface evidence after repair');
  assert(ed.main.mechanism.length>20&&ed.transfer.mechanism.length>20,s.id+' missing evidence mechanism');

  for(const kind of ['main','transfer']){
    const id=s[kind], p=a.problems[id], e=a.evaluators[id];
    assert(p&&e,id+' missing problem/evaluator');
    assert.equal(p.order,n); assert.equal(p.kind,kind);
    assert.equal(p.obligationVersion,kind==='main'?mv:tv,id+' obligation version mismatch');
    assert(p.prompt.length>100,id+' prompt too thin');
    assert(e.reference.length>100,id+' reference too thin');
    assert(e.rubric.length>=2,id+' rubric too thin');
    assert.equal(e.rubric.reduce((sum,r)=>sum+r.points,0),10,id+' rubric total');
    assert(!s.lesson.includes(p.prompt),id+' exact prompt exposure');
    assert(!s.lesson.includes(e.reference),id+' exact reference exposure');
  }
}

// Gate 8: separation is task-level semantic evidence, not a duplicate label table.
const taskIds=Object.keys(a.problems).sort();
const sepIds=Object.keys(a.semanticSeparationAudit?.tasks||{}).sort();
assert.deepEqual(sepIds,taskIds,'Gate-8 ledger must cover all 38 current tasks exactly');
assert.equal(a.semanticSeparationAudit.status.startsWith('PASS_WITH_EVIDENCE'),true);
for(const id of taskIds){
  const r=a.semanticSeparationAudit.tasks[id];
  assert.equal(r.sessionId,a.sessions.find(s=>s.main===id||s.transfer===id).id,id+' wrong separation session');
  assert(['main','transfer'].includes(r.kind),id+' bad separation kind');
  assert(Array.isArray(r.closestInstructionalExamples)&&r.closestInstructionalExamples.length,id+' no closest instruction');
  assert(r.mathematicalDifference.length>40,id+' weak mathematical-instance difference');
  assert(r.exposureDisposition.length>30,id+' missing exposure disposition');
}

// Gate 5 decision audit: every meaningful Transfer plus S04 ordering and S19 synthesis.
assert.equal(Object.keys(a.decisionAudit?.tasks||{}).length,21);
for(const id of [a.sessions[3].main,a.sessions[18].main,...a.sessions.map(s=>s.transfer)]){
  const r=a.decisionAudit.tasks[id];
  assert(r,id+' missing decision audit');
  for(const k of ['claimedLearnerDecision','alreadySuppliedByPrompt','decisivelyRehearsedInVisibleInstruction','learnerActionActuallyScored'])
    assert(typeof r[k]==='string'&&r[k].length>15,id+' weak decision-audit '+k);
}

// Gate 6 wrong-solver discrimination: rows must be actual rubric rows.
assert.equal(a.misconceptionDiscriminatorAudit.cases.length,19);
assert.equal(a.misconceptionDiscriminatorAudit.designGateCoverage.length,16);
assert(a.misconceptionDiscriminatorAudit.designGateCoverage.every(x=>x.status==='covered'&&x.caseIds.length>0),'all design-gate misconception rows must be explicitly covered');
const mcIds=new Set(a.misconceptionDiscriminatorAudit.cases.map(x=>x.caseId));
assert.equal(mcIds.size,a.misconceptionDiscriminatorAudit.cases.length,'misconception case IDs must be unique');
for(const row of a.misconceptionDiscriminatorAudit.designGateCoverage)for(const id of row.caseIds)assert(mcIds.has(id),'design-gate row cites missing misconception case '+id);
for(const c of a.misconceptionDiscriminatorAudit.cases){
  assert(a.problems[c.targetTask],'misconception target missing '+c.targetTask);
  const rows=a.evaluators[c.targetTask].rubric.map(r=>r.criterion);
  assert(c.rubricRowsFailed.length>0,c.targetTask+' no failed rubric rows');
  for(const r of c.rubricRowsFailed) assert(rows.includes(r),c.targetTask+' misconception audit cites foreign row');
  assert(c.plausibleFlawedResponse.length>25&&c.discriminationResult.length>25,c.targetTask+' weak wrong-solver audit');
}

// Independent-review findings R06/R07/R08/R09 must remain closed.
assert(a.problems[a.sessions[10].main].prompt.includes('if an m-by-n matrix has r pivots'));
assert(a.evaluators[a.sessions[10].main].rubric.some(r=>r.criterion.includes('r pivots give rank r')));
assert(a.sessions[13].requiredOwnership[2].startsWith('Apply and justify the inverse-order rule'),'S14 still overclaims proof of the general inverse-product identity');
assert(!a.sessions[13].requiredOwnership.some(x=>/Prove and apply \(AB\)/.test(x)),'S14 retained overstrong prove-and-apply ownership verb');
assert(!a.sessions[13].requiredOwnership.some(x=>/singular matrices/.test(x)),'S14 retained unobserved singular branch');
assert(a.problems[a.sessions[17].main].prompt.includes('Prove generally from determinant multiplicativity'));
assert(a.evaluators[a.sessions[17].main].rubric.some(r=>r.criterion.includes('det(P^{-1}AP)=det(A)')));
assert.equal(a.sessions[8].transfer,'T22V3::SIDE276::S09-T@2');
assert(a.problems[a.sessions[8].transfer].prompt.includes('Two accepted parameter settings'));
assert(!/nullspace|null space|N\(C\)|invisible parameter direction/i.test(a.problems[a.sessions[8].transfer].prompt),'S09 Transfer must not supply the hidden nullspace method cue');
assert(a.evidenceDistance[a.sessions[8].id].transfer.mechanism.includes('same-output collision'));
assert(a.decisionAudit.tasks[a.sessions[8].transfer].alreadySuppliedByPrompt.startsWith('PARTLY'));
assert(a.problems[a.sessions[18].main].prompt.includes('choose the order of attack'));
assert(a.evaluators[a.sessions[18].main].rubric[0].criterion.includes('Chooses a coherent audit route'));
assert(a.sessions[18].lesson.includes('choose an order, reuse evidence where legitimate'));

// Generalization audit repairs discovered beyond the review.
assert(a.sessions[3].requiredOwnership.some(x=>x.includes('interpret a product column')));
assert(!a.sessions[3].requiredOwnership.some(x=>x.includes('each product column')));
assert(a.sessions[12].requiredOwnership[2].includes('supplied nonzero null vector'));
assert(!a.sessions[12].requiredOwnership[2].includes('missing pivot'));
assert(a.sessions[15].requiredOwnership[1].includes('real 2-by-2 linear map'));

// Cheap overlap guard remains only a candidate finder, backed by the semantic ledger above.
assert(!a.problems[a.sessions[4].main].prompt.includes("x+2y=5, -y+z=-3, and 2x+y+z=3"),'S05 Main reused worked system');
assert(!a.problems[a.sessions[5].main].prompt.includes("x+2y-z=3, 2x+5y+z=8, and -x+2z=1"),'S06 Main reused guided practice');
assert(!a.problems[a.sessions[6].main].prompt.includes("x+y+z=4, 2x+3y+z=7, x+2y=3"),'S07 Main reused worked system');
assert(!a.problems[a.sessions[16].main].prompt.includes("c1=2b1+b2 and c2=-b1+3b2"),'S17 Main reused guided basis-change matrix');

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
    for(const m of literals) assert(!earlier.some(t=>t.includes(m)),id+' reuses an answer-bearing matrix '+m);
  }
}

// Future machinery may be named only as a prohibition/boundary.
const futureUse=/\b(projection|least squares|eigenvalues?|eigenvectors?|diagonalization|spectral|SVD|pseudoinverse|Cholesky|QR|condition number|Jacobian|Hessian|floating-point|LU)\b/i;
for(const s of a.sessions){
  for(const id of [s.main,s.transfer]){
    const p=a.problems[id].prompt;
    if(futureUse.test(p)) assert(id==='T22V3::SIDE276::S13-T@1'&&/Without computing a determinant or eigenvalue/.test(p),id+' consumes future machinery');
  }
}

const mm=(A,B)=>A.map(r=>B[0].map((_,jj)=>r.reduce((sum,v,k)=>sum+v*B[k][jj],0)));
const mv=(A,x)=>A.map(r=>r.reduce((sum,v,ii)=>sum+v*x[ii],0));
const det=A=>A.length===1?A[0][0]:A.length===2?A[0][0]*A[1][1]-A[0][1]*A[1][0]:A[0].reduce((sum,v,jj)=>sum+(jj%2?-1:1)*v*det(A.slice(1).map(r=>r.filter((_,k)=>k!==jj))),0);
const eq=(x,y)=>assert.deepEqual(x,y);

eq(mm([[1,0,2],[-1,3,1]],[[1,2],[0,-1],[2,1]]),[[5,4],[1,-4]]);
eq(mv([[1,1,1],[2,3,1],[3,4,2]],[-2,3,2]),[3,7,10]);
eq(mv([[1,-1,2],[2,-2,4]],[1,1,0]),[0,0]);
eq(mv([[1,0,1],[0,1,1]],[1,0,2]),[3,2]);
assert.equal(det([[0,2,1],[1,1,0],[2,0,3]]),-8);
assert.equal(det([[3,1],[1,2]]),5);
eq(mm([[1,2],[1,3]],[[3,-2],[-1,1]]),[[1,0],[0,1]]);
const D=mm(mm([[2,-1],[-1,1]],[[2,1],[0,3]]),[[1,1],[1,2]]);
eq(D,[[3,2],[0,2]]); assert.equal(det(D),6);
eq(mv([[1,0,1],[1,1,2],[2,1,3]],[-1,-1,1]),[0,0,0]);
eq(mm(mm([[0,0,1],[0,1,0],[1,0,0]],[[1,0,1],[1,1,2],[2,1,3]]),[[0,0,1],[0,1,0],[1,0,0]]),[[3,1,2],[2,1,1],[1,0,1]]);

console.log('PASS M14 published structural/evidence route: 19 sessions, 38 current tasks, 60 claim observers with generalization distance, 38 semantic-separation rows, 21 decision audits, 19 wrong-solver attacks covering 16/16 design-gate failure modes, SIDE276 registered as authored/accepted module 14.');
