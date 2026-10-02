import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m04.json','utf8'));
const by=n=>a.sessions.find(s=>s.order===n);
const close=(x,y,e=1e-12)=>assert(Math.abs(x-y)<e,`${x} != ${y}`);
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;

assert.equal(a.module.id,'ARC048');
assert.equal(a.version,'m04-authoring-v2.0-deep-reconstruction-r1');
assert.equal(a.instructionVersion,'m04-instruction-v2-deep-reconstruction-r1');
assert.equal(a.module.status,'v2-deep-reconstruction-builder-candidate');
assert.deepEqual(a.boundary.prerequisiteModules,['T22E-DISC01']);
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,24);
assert.equal(Object.keys(a.evidenceDistance.items).length,48);
assert.equal(Object.keys(a.wrongSolverAudit.sessions).length,24);
assert.equal(a.representationProgression.length,10);
assert(fs.existsSync(a.researchBasis.designGate));
assert(fs.existsSync(a.researchBasis.deepSourceAudit));
assert(fs.existsSync(a.researchBasis.sourceDossier));

const allowed=new Set(['retrieval','proof reconstruction','fresh Main evidence','changed-surface Transfer']);
const decisionTargets=[];
const hashes=new Set();
for(const s of a.sessions){
  assert.equal(s.requiredOwnership.length,5);
  assert(s.lesson.length>700,`S${s.order} lesson too thin`);
  for(const token of ['Orient.','Define.','Connect.','Explain.','Worked example:','Guided check:','Fade.','Distinction check.']) assert(s.lesson.includes(token),`S${s.order} missing ${token}`);
  assert(s.guidedFeedback?.startsWith('Check after attempting.'),`S${s.order} staged feedback missing`);
  assert(!s.lesson.includes('\\\\n'),`S${s.order} visible escape`);
  const st=a.semanticSeparationAudit.sessions[s.id].status;
  assert(['builder-reviewed-separated-awaiting-independent-confirmation','reviewed-separated'].includes(st),`S${s.order} semantic status`);
  const c={id:s.id,title:s.title,focus:s.focus,purpose:s.purpose,centralCapability:s.centralCapability,principalObstacle:s.principalObstacle,entryPrerequisites:s.entryPrerequisites,requiredOwnership:s.requiredOwnership,applicationScope:s.applicationScope,transferScope:s.transferScope,inScope:s.inScope,outOfScope:s.outOfScope,exitCondition:s.exitCondition};
  const h=crypto.createHash('sha256').update(JSON.stringify(stable(c))).digest('hex');
  assert(!hashes.has(h)); hashes.add(h);
  assert.equal(a.claimEvidence[s.id].length,5);
  a.claimEvidence[s.id].forEach((e,i)=>{
    assert.equal(e.claim,s.requiredOwnership[i]);
    assert(['main','transfer'].includes(e.task));
    const pid=s[e.task];
    assert.equal(e.publicRequest,a.problems[pid].prompt);
    assert.deepEqual(a.coverage[s.id][i],[e.task]);
    for(const criterion of e.rubricEvidence)assert(a.evaluators[pid].rubric.some(r=>r.criterion===criterion),`${s.id} missing observer ${criterion}`);
  });
  for(const kind of ['main','transfer']){
    const id=s[kind],ev=a.evaluators[id],ed=a.evidenceDistance.items[id];
    assert.equal(ev.rubric.reduce((z,r)=>z+r.points,0),10);
    assert(allowed.has(ed.class),`${id} bad evidence class`);
    if(ed.class==='fresh Main evidence'||ed.class==='changed-surface Transfer')decisionTargets.push(id);
    assert(a.instructionSeparation[s.id][kind]?.length,`S${s.order} ${kind} separation missing`);
    for(const frag of a.instructionSeparation[s.id][kind]){
      assert(a.problems[id].prompt.includes(frag),`S${s.order} ${kind} missing fragment ${frag}`);
      assert(!s.lesson.includes(frag),`S${s.order} ${kind} leaked fragment ${frag}`);
    }
  }
  assert(a.prerequisiteAudit['S'+String(s.order).padStart(2,'0')]?.length,`S${s.order} prereq audit`);
  assert(a.transferScope.startsWith('Changed-surface transfer:'),`S${s.order} transferScope not honest`);
}
assert.deepEqual(Object.keys(a.decisionAudit.items).sort(),decisionTargets.sort());
for(const id of decisionTargets){
  const d=a.decisionAudit.items[id];
  assert.equal(typeof d.decisionSuppliedByPrompt,'boolean');
  assert.equal(typeof d.decisionRehearsedInVisibleInstruction,'boolean');
  assert(d.claimedLearnerDecision?.length>20);
  assert(d.scoredLearnerAction?.length>20);
  assert(d.classificationJustification?.length>20);
}

// Material fixed-contract versioning.
const versions={
  '1M':2,'1T':2,'2T':2,'3T':2,'4T':2,'5T':3,'6T':2,'7M':2,'7T':2,'8T':2,'9T':2,'10T':2,
  '15M':2,'15T':2,'16T':2,'17M':2,'17T':2,'18M':2,'18T':2,'19T':2,'21M':2,'23T':2,'24M':2,'24T':2
};
for(const [k,v] of Object.entries(versions)){
  const n=Number(k.match(/\d+/)[0]),kind=k.endsWith('M')?'main':'transfer';
  assert.equal(a.problems[by(n)[kind]].obligationVersion,v,`${k} version`);
}

// Historical repairs remain closed.
assert.equal(a.claimEvidence[by(5).id][2].task,'transfer');
assert.equal(a.claimEvidence[by(13).id][4].task,'transfer');
assert(by(11).lesson.includes('P(A∩B^c)=P(A)-P(A∩B)'));
assert(by(11).lesson.includes('P(A)P(B^c)'));
assert(a.prerequisiteAudit.S11.some(x=>x.item.includes('complemented event')));
assert(by(22).lesson.includes('labelled ordered samples'));
assert(by(22).lesson.includes('original category fraction'));
assert(!by(4).lesson.includes('independence before')&&!by(4).lesson.includes('generated independently'));

// Representation progression blockers are now real learner artifacts.
assert(by(7).lesson.includes('F   not F   total'));
assert(by(7).representations?.some(x=>x.kind==='table'&&x.rows?.length===3));
assert(by(9).lesson.includes('├─ L (.60)')&&by(9).lesson.includes('└─ R (.40)'));
assert(by(9).representations?.some(x=>x.kind==='probabilityTree'&&x.branches?.length===2));
assert(a.problems[by(9).transfer].representations?.some(x=>x.kind==='probabilityTree'));
assert(by(18).lesson.includes('joint contribution'));
assert(by(18).representations?.some(x=>x.kind==='table'));
assert(a.problems[by(18).main].representations?.some(x=>x.kind==='table'));
assert(a.problems[by(7).transfer].prompt.includes('two-way table'));
assert(a.problems[by(9).transfer].prompt.includes('routing tree'));
assert(a.problems[by(18).main].prompt.includes('finite branch table'));

// Conditioning and misconception discriminators.
assert(by(7).lesson.includes('favourable-count/total-count is only the special case'));
assert(a.problems[by(7).main].prompt.includes("P(a)=0.05"));
assert(a.problems[by(7).main].prompt.includes('without changing the past'));
assert(a.problems[by(15).main].prompt.includes('looks more random'));
assert(a.problems[by(15).main].prompt.includes("'due'"));
assert(a.problems[by(18).transfer].prompt.includes('(.4+.1+.25)/3')||a.problems[by(18).transfer].prompt.includes('(0.4+0.1+0.25)/3'));
assert(a.problems[by(24).main].prompt.includes('representation of your choice'));

// Deterministic math checks for changed contracts.
close(.05+.15+.20+.25+.35,1);
close(.55/.80,11/16); close(.55/.60,11/12);
close(18/24,3/4); close(18/30,3/5);
close(.4*.1,.04); close(.4*.9,.36); close(.6*.25,.15); close(.6*.75,.45);
close(.3*.7,.21); close(.21/.4,.525);
close(.8**3*.2,.1024); close(.3**3*.7**2,.01323);
close(6*.2*.8**5,.393216);
close(1-.75**4,.68359375); close(1-.6**5,.92224);
close(.5*.01+.3*.03+.2*.06,.026); close(.2*.4+.5*.1+.3*.25,.205);
close(8*.1+8*.2+1*.3-2*.4,1.9);
close(.35*.8+.65*.4,.54); close(5*.54-2*.46,1.78);
close(.25*.8+.75*.2,.35); close(6*.35,2.1);

console.log('PASS: M04 v2 deep reconstruction candidate — 24 sessions/48 tasks/120 claims, staged novice lessons, table-tree-partition representation progression, 48 evidence-distance labels, 23 decision audits, 24 wrong-solver attacks and versioned high-risk assessment repairs.');
