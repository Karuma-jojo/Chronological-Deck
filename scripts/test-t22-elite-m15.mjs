import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m15-side278.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const meta=read('course/t22/generated/course-meta.json');
const road=read('course/t22/generated/roadmap.json');
const sem=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const design=fs.readFileSync('docs/t22-course/M15-DESIGN-GATE.md','utf8');
const pilot=fs.readFileSync('docs/t22-course/M15-PILOT-REVIEW.md','utf8');

assert.equal(a.module.order,15);
assert.equal(a.module.id,'SIDE278');
assert.equal(a.module.status,'repaired-builder-candidate-unpublished');
assert.equal(a.sessions.length,16);
assert.equal(Object.keys(a.problems).length,32);
assert.equal(Object.keys(a.evaluators).length,32);
assert.equal(Object.values(a.claimEvidence).flat().length,48);
assert.equal(a.coverageAudit.pedagogicalAtoms,16);
assert.equal(a.coverageAudit.authoredSessions,16);
assert.equal(a.coverageAudit.fixedAssessments,32);
assert.equal(a.coverageAudit.ownershipClaimCount,48);

// Boundary and publication hygiene.
assert.deepEqual(a.boundary.prerequisiteModules,['SIDE276']);
assert.deepEqual(deps.modules.find(x=>x.id==='SIDE278').prerequisites,['SIDE276']);
assert.equal(meta.moduleSources.length,14,'M15 must not be persisted in learner registry before review/publication');
assert(!meta.moduleSources.some(x=>x.id==='SIDE278'),'M15 leaked into persisted learner registry');
assert.equal(road.modules.find(x=>x.id==='SIDE278').availability,'planned');
const semRow=sem.entries.find(x=>x.id==='SIDE278');
assert.equal(semRow.semanticStatus,'boundary-accepted-content-candidate');
assert.equal(semRow.bridges.length,1);
assert.equal(semRow.bridges[0].id,'M15-B01');
assert.match(semRow.bridges[0].content,/transpose|column/i);
assert.equal(a.publication.status,'unpublished');
assert.equal(a.publication.learnerRegistry,'M01–M14 only');

// Gates 0–3 / source-role stack.
for(const term of [
  'Boundary Contract','Source Dossier','Support-Theorem Ledger',
  'Concept dependency graph','Conceptual-distinction map',
  'Misconception / failure-mode map','Representation progression map',
  'Downstream obligation map','Narrative spine',
  'Candidate pedagogical atoms','Split/merge'
]) assert(design.toLowerCase().includes(term.toLowerCase()),'missing design artifact '+term);
for(const gate of ['Gate 4','Gate 5','Gate 6','Gate 7','Gate 8'])
  assert(pilot.includes(gate),'pilot missing '+gate);
for(const id of ['REPO-M15','STRANG-4E','MIT-1806','AXLER-4E','HEFFERON','MAA-IPG','IES-WWC','PED-DORIER','PED-INNER','PED-VECTOR-PROJ'])
  assert(a.sourceLedger.sources.some(s=>s.id===id),'missing source role '+id);
assert(!a.sourceLedger.sources.some(s=>s.id==='PED-PROJ'),'vague pre-recovery pedagogy source survived');
assert.match(design,/supplied PDF pages 199[–-]246/);
assert.match(design,/sessions \*\*14[–-]17\*\*/i);
assert.match(design,/23 freshmen, non-mathematics majors/i);
assert.match(design,/no new diagram-reading capability is claimed/i);

// Gate 4–8 structural contract for every current session.
const allowed=new Set(['retrieval','proof reconstruction','fresh Main evidence','changed-surface Transfer']);
for(let i=0;i<16;i++){
  const s=a.sessions[i],n=i+1,ss=String(n).padStart(2,'0');
  assert.equal(s.order,n); assert.equal(s.id,`T22V3::SIDE278::S${ss}@1`);
  assert.equal(s.moduleId,'SIDE278');
  assert.equal(s.main,`T22V3::SIDE278::S${ss}-M@1`);
  assert.equal(s.transfer,`T22V3::SIDE278::S${ss}-T@1`);
  for(const token of ['Orient.','Worked example.','Guided practice.','Fade.','Distinction check.'])
    assert(s.lesson.includes(token),s.id+' missing learner-sequence token '+token);
  assert(s.lesson.length>900,s.id+' lesson too thin');
  assert(s.guidedFeedback.startsWith('Check after attempting. '),s.id+' staged feedback missing');
  assert(!s.lesson.includes(s.guidedFeedback.slice('Check after attempting. '.length)),s.id+' guided answer leaked into lesson');

  assert.deepEqual(a.coverage[s.id],s.requiredOwnership,s.id+' coverage drift');
  const claims=a.claimEvidence[s.id];
  assert.equal(claims.length,s.requiredOwnership.length,s.id+' claim count mismatch');
  for(const c of claims){
    assert(s.requiredOwnership.includes(c.claim),s.id+' foreign claim');
    const ids=c.taskIds;
    assert(ids.length>=1,s.id+' claim has no task');
    assert.deepEqual(c.publicRequestExact,ids.map(id=>a.problems[id].prompt),s.id+' stale public prompt receipt');
    const rows=ids.flatMap(id=>a.evaluators[id].rubric.map(r=>r.criterion));
    assert(c.rubricEvidence.length>=1,s.id+' claim has no rubric observer');
    for(const rr of c.rubricEvidence)assert(rows.includes(rr),s.id+' foreign rubric observer: '+rr);
    assert.equal(c.disposition,'adequate');
    assert(c.why.length>20&&c.escapeAttempt.length>20&&c.generalizationDistance.length>20,s.id+' weak claim-audit rationale');
  }

  const ed=a.evidenceDistance[s.id];
  assert(allowed.has(ed.main.classification)); assert(allowed.has(ed.transfer.classification));
  assert.notEqual(ed.main.classification,'changed-surface Transfer');
  assert.equal(ed.transfer.classification,'changed-surface Transfer');
  assert(ed.main.mechanism.length>40&&ed.transfer.mechanism.length>40);

  const sep=a.instructionSeparation.sessions[s.id];
  assert(sep&&sep.status.startsWith('CLEAR'),s.id+' instruction-separation unresolved');

  for(const kind of ['main','transfer']){
    const id=s[kind],p=a.problems[id],e=a.evaluators[id];
    assert(p&&e,id+' missing problem/evaluator');
    assert.equal(p.order,n); assert.equal(p.kind,kind); assert.equal(p.obligationVersion,1);
    assert(p.prompt.length>100,id+' prompt too thin');
    assert(e.reference.length>100,id+' reference too thin');
    assert(e.rubric.length>=2,id+' rubric too thin');
    assert.equal(e.rubric.reduce((z,r)=>z+r.points,0),10,id+' rubric total');
    assert(!s.lesson.includes(p.prompt),id+' exact prompt exposure');
    assert(!s.lesson.includes(e.reference),id+' exact answer exposure');
  }
}

// Gate 5 evidence labels must be honest after recovery.
for(const n of [1,2,3,4,5,6,7,8,10,11,12,13])
  assert.equal(a.evidenceDistance[a.sessions[n-1].id].main.classification,'proof reconstruction',`S${n} Main class`);
for(const n of [9,14,15])
  assert.equal(a.evidenceDistance[a.sessions[n-1].id].main.classification,'retrieval',`S${n} Main class`);
assert.equal(a.evidenceDistance[a.sessions[15].id].main.classification,'fresh Main evidence');
assert.equal(Object.keys(a.decisionAudit.tasks).length,17,'16 Transfers plus S16 synthesis Main require decision audits');
for(const s of a.sessions)assert(a.decisionAudit.tasks[s.transfer],s.transfer+' missing decision audit');
assert(a.decisionAudit.tasks[a.sessions[15].main],'S16 synthesis Main missing decision audit');

// Gate 8: one semantic-separation row per current task.
const taskIds=Object.keys(a.problems).sort();
assert.deepEqual(Object.keys(a.semanticSeparationAudit.tasks).sort(),taskIds);
for(const id of taskIds){
  const row=a.semanticSeparationAudit.tasks[id];
  assert(row.mathematicalDifference.length>40,id+' weak semantic difference');
  assert(row.exposureDisposition.startsWith('CLEAR'),id+' unresolved exposure');
  assert(Array.isArray(row.closestInstructionalExamples)&&row.closestInstructionalExamples.length>0,id+' missing comparator');
}

// Known-bad cross-session defects discovered in recovery must stay repaired.
assert(!a.problems[a.sessions[6].main].prompt.includes('v=(2,-1,4)'),'S07 Main regressed to S04 worked projection');
assert(!a.problems[a.sessions[6].main].prompt.includes('p=(2,-1,0)'),'S07 Main regressed to S04 worked projection');
assert(!a.problems[a.sessions[8].main].prompt.includes('v1=(1,1,0), v2=(1,0,1)'),'S09 Main regressed to S08 solved prefix');
assert(!a.problems[a.sessions[8].transfer].prompt.includes('d1=(1,0,1), d2=(0,1,1)'),'S09 Transfer regressed to later S11 column pair');
assert(!a.problems[a.sessions[5].main].prompt.includes('v=(3,1,2)'),'S06 Main regressed to S04 Main target');
assert(!a.problems[a.sessions[11].main].prompt.includes('A=[[1,0],[0,1],[1,1]]'),'S12 Main regressed to S11 matrix');
assert(!a.problems[a.sessions[12].main].prompt.includes('A=[[1,0],[0,1],[1,1]]'),'S13 Main regressed to S11 matrix');

// Mutation-sensitive claim observer: a wrong-but-existing rubric row must fail.
function validateClaimLinks(x){
  for(const s of x.sessions)for(const c of x.claimEvidence[s.id]){
    const rows=c.taskIds.flatMap(id=>x.evaluators[id].rubric.map(r=>r.criterion));
    for(const rr of c.rubricEvidence)assert(rows.includes(rr),s.id+' invalid observer '+rr);
    assert.deepEqual(c.publicRequestExact,c.taskIds.map(id=>x.problems[id].prompt),s.id+' stale prompt receipt');
  }
}
validateClaimLinks(a);
{
  const bad=structuredClone(a);
  const s=bad.sessions[9]; // S10
  bad.claimEvidence[s.id][0].rubricEvidence=[bad.evaluators[s.main].rubric[3].criterion];
  // Existing row but semantically wrong for transpose shape. External contract pins the exact correct observer.
  assert.notEqual(bad.claimEvidence[s.id][0].rubricEvidence[0],a.claimEvidence[a.sessions[9].id][0].rubricEvidence[0]);
  assert.equal(a.claimEvidence[a.sessions[9].id][0].rubricEvidence[0],a.evaluators[a.sessions[9].main].rubric[0].criterion);
}
assert.equal(a.claimEvidence[a.sessions[12].id][1].rubricEvidence[0],a.evaluators[a.sessions[12].main].rubric[2].criterion,'S13 solve claim must map to solve/residual row');
assert.equal(a.sessions[1].requiredOwnership[2],'Distinguish a complete orthonormal basis from an incomplete orthonormal set when interpreting dot-product coefficients.');

// Wrong-solver ledger must cite current exact rubric rows.
assert.equal(a.misconceptionDiscriminatorAudit.cases.length,18);
assert.equal(a.misconceptionDiscriminatorAudit.designGateCoverage.length,18);
const mcIds=new Set(a.misconceptionDiscriminatorAudit.cases.map(x=>x.caseId));
for(const row of a.misconceptionDiscriminatorAudit.designGateCoverage){
  assert.equal(row.status,'covered'); for(const id of row.caseIds)assert(mcIds.has(id));
}
for(const c of a.misconceptionDiscriminatorAudit.cases){
  assert(a.problems[c.targetTask],c.caseId+' missing task');
  const rows=a.evaluators[c.targetTask].rubric.map(r=>r.criterion);
  for(const rr of c.rubricRowsFailed)assert(rows.includes(rr),c.caseId+' stale rubric row');
}

// Future ownership must stay out of fixed assessment premises.
const forbidden=/\b(eigenvalues?|eigenvectors?|diagonalization|spectral theorem|positive semidefinite|\bPSD\b|\bQR\b|Cholesky|SVD|pseudoinverse|condition number|Householder|Givens|p-value|standard error|ridge|lasso)\b/i;
for(const [id,p] of Object.entries(a.problems))assert(!forbidden.test(p.prompt),id+' consumes future machinery');

// Gate-10 provenance: initial unpublished candidate, no evidence migration.
assert.match(a.initialVersionAudit.status,/no prior learner evidence/i);
assert.equal(a.initialVersionAudit.priorCanonicalPack,null);
assert(a.followupRepair.repairedTasks.length>=8);
assert.match(a.followupRepair.supportTheoremOrder,/S09|S10/);

console.log('PASS M15 structural/pedagogy/semantic candidate: 16 sessions, 32 fixed tasks, 48 literal ownership claims, 32 separation rows, 17 decision audits, 18 wrong-solver discriminators; publication remains closed.');
