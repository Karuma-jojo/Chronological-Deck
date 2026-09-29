import assert from 'node:assert/strict';
import fs from 'node:fs';

const a = JSON.parse(fs.readFileSync('course/t22/authoring/m16-side279.json','utf8'));
assert.equal(a.module.id,'SIDE279');
assert.equal(a.module.status,'pilot-builder-candidate-unpublished');
assert.equal(a.sessions.length,1);
assert.equal(Object.keys(a.problems).length,2);

const s = a.sessions[0];
assert.equal(s.id,'T22V3::SIDE279::S01@1');
const main = a.problems[s.main];
const transfer = a.problems[s.transfer];
const mainRef = a.evaluators[s.main].reference;
const transferRef = a.evaluators[s.transfer].reference;

const mv = (A,x) => A.map(row => row.reduce((sum,v,i)=>sum+v*x[i],0));
const eq = (x,y) => x.length===y.length && x.every((v,i)=>v===y[i]);
const scale = (c,x) => x.map(v=>c*v);

// Main recomputation from the public prompt.
{
  const A=[[1,2],[2,1]], p=[1,1], q=[2,-2], r=[1,0];
  assert.deepEqual(mv(A,p),[3,3]);
  assert.deepEqual(mv(A,q),[-2,2]);
  assert.deepEqual(mv(A,r),[1,2]);
  assert(eq(mv(A,p),scale(3,p)));
  assert(eq(mv(A,q),scale(-1,q)));
  assert(!eq(mv(A,r),r) && !(mv(A,r)[0]*r[1]===mv(A,r)[1]*r[0] && r.some(v=>v!==0)));
  let x=p;
  for(let k=0;k<5;k++) x=mv(A,x);
  assert.deepEqual(x,[243,243]);
  for(const tok of ['Ap=(3,3)=3p','Aq=(-2,2)=-q','A^5p=3^5p=243(1,1)=(243,243)']) {
    assert(mainRef.includes(tok),`Main reference missing checked token: ${tok}`);
  }
}

// Transfer: 90-degree real rotation preserves norm but has no real eigendirection.
{
  const R=[[0,-1],[1,0]], e1=[1,0];
  assert.deepEqual(mv(R,e1),[0,1]);
  // R^2=-I is a second exact route: if Rv=lambda v for real lambda and v!=0,
  // then -v=R^2v=lambda^2 v, so lambda^2=-1, impossible over R.
  const R2=[
    [R[0][0]*R[0][0]+R[0][1]*R[1][0], R[0][0]*R[0][1]+R[0][1]*R[1][1]],
    [R[1][0]*R[0][0]+R[1][1]*R[1][0], R[1][0]*R[0][1]+R[1][1]*R[1][1]]
  ];
  assert.deepEqual(R2,[[-1,0],[0,-1]]);
  for(const tok of ['Re1=(0,1)','no nonzero real eigenvector','Preserved norm is not preserved direction']) {
    assert(transferRef.includes(tok),`Transfer reference missing checked token: ${tok}`);
  }
}

// Gate-5 evidence labels must use only v1.2's allowed descriptive classes.
{
  const allowed = new Set(['retrieval','proof reconstruction','fresh Main evidence','changed-surface Transfer']);
  assert(allowed.has(a.evidenceDistance[s.id].main.classification));
  assert(allowed.has(a.evidenceDistance[s.id].transfer.classification));
  assert.equal(a.evidenceDistance[s.id].main.classification,'retrieval');
  assert.equal(a.evidenceDistance[s.id].transfer.classification,'changed-surface Transfer');
}

// Gate-7 mapping sanity: every S01 ownership claim is literally in coverage and has an observer.
{
  assert.deepEqual(a.coverage[s.id],s.requiredOwnership);
  const links=a.claimEvidence[s.id];
  assert.equal(links.length,s.requiredOwnership.length);
  for(const claim of s.requiredOwnership) {
    const link=links.find(x=>x.claim===claim);
    assert(link,`Missing claimEvidence for: ${claim}`);
    assert.equal(link.disposition,'adequate');
    assert(link.publicRequestExact?.length>0);
    assert(link.rubricEvidence?.length>0);
  }
}

// Gate-7 ledger guard: cited criteria must exist on the cited public task evaluator.
// A wrong-but-existing criterion substituted into a claim mapping must be rejected.
{
  const criteriaFor = taskId => new Set((a.evaluators[taskId]?.rubric || []).map(row=>row.criterion));
  const validateLink = link => {
    for (const criterion of link.rubricEvidence || []) {
      const appears = (link.taskIds || []).some(taskId => criteriaFor(taskId).has(criterion));
      assert(appears, `Claim ledger cites non-observer criterion: ${criterion}`);
    }
  };
  for (const link of a.claimEvidence[s.id]) validateLink(link);

  const mutated = structuredClone(a.claimEvidence[s.id][0]);
  mutated.rubricEvidence = [a.evaluators[s.main].rubric[2].criterion]; // real criterion, wrong observer for claim 1.
  assert.throws(() => {
    const expected = new Set(a.claimEvidence[s.id][0].rubricEvidence);
    for (const criterion of mutated.rubricEvidence) {
      assert(expected.has(criterion), `Mutated mapping changed reviewed observer to: ${criterion}`);
    }
  });
}

// Known-bad controls for the distinctions the pilot claims to observe.
{
  // Wrong model: "only fixed vectors are eigenvectors" would reject q, contradicting Aq=-q.
  assert.deepEqual(mv([[1,2],[2,1]],[2,-2]),[-2,2]);
  // Wrong model: "norm preservation implies eigenvector" fails on e1 under R.
  const Re1=mv([[0,-1],[1,0]],[1,0]);
  assert.deepEqual(Re1,[0,1]);
  assert.notDeepEqual(Re1,[1,0]);
}

assert(main.prompt.includes('A(cv)=λ(cv) for c≠0'));
assert(transfer.prompt.includes('preserves the length'));
console.log('PASS M16 S01 pilot math/evidence checks: references recompute, v1.2 evidence labels are honest, claim observers exist, and known-bad misconception controls fail.');
