import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m04.json','utf8'));
const pad=n=>String(n).padStart(2,'0');
const sid=n=>`T22V3::ARC048::S${pad(n)}@1`;
const by=n=>a.sessions.find(s=>s.id===sid(n));
const stableNum=s=>Number(s.id.match(/::S(\d+)@1$/)?.[1]);
const close=(x,y,e=1e-12)=>assert(Math.abs(x-y)<e,`${x} != ${y}`);
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const route=[1,2,3,4,5,6,25,7,8,9,10,11,12,13,14,15,16,26,17,28,18,27,19,20,21,22,23,24];

assert.equal(a.module.id,'ARC048');
assert.equal(a.version,'m04-authoring-v2.2-28-session-whole-curriculum-r1');
assert.equal(a.instructionVersion,'m04-instruction-v2.2-28-session-whole-curriculum-r1');
assert.equal(a.module.status,'v2.2-28-session-whole-curriculum-rebuild-candidate');
assert.deepEqual(a.boundary.prerequisiteModules,['T22E-DISC01']);
assert.equal(a.sessions.length,28);
assert.equal(Object.keys(a.problems).length,56);
assert.equal(Object.keys(a.evaluators).length,56);
assert.equal(Object.values(a.claimEvidence).flat().length,140);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,28);
assert.equal(Object.keys(a.evidenceDistance.items).length,56);
assert.equal(Object.keys(a.wrongSolverAudit.sessions).length,28);
assert.equal(a.representationProgression.length,14);
assert.equal(a.wholeCurriculumRebuild?.status,'builder candidate; not independently confirmed');
assert(fs.existsSync(a.researchBasis.designGate));
assert(fs.existsSync(a.researchBasis.deepSourceAudit));
assert(fs.existsSync(a.researchBasis.sourceDossier));
assert.deepEqual(a.sessions.map(stableNum),route);
assert.deepEqual(a.sessions.map(s=>s.order),Array.from({length:28},(_,i)=>i+1));
for(const n of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28])assert(by(n),`missing stable S${n}`);

const allowed=new Set(['retrieval','proof reconstruction','fresh Main evidence','changed-surface Transfer']);
const semanticAllowed=new Set(['builder-reviewed-separated-awaiting-independent-confirmation','builder-repaired-awaiting-independent-confirmation','reviewed-separated','builder-authored-awaiting-independent-review']);
const decisionTargets=[];
const hashes=new Set();
for(const s of a.sessions){
  const n=stableNum(s),key='S'+pad(n);
  assert.equal(s.requiredOwnership.length,5,`S${n} ownership`);
  assert(s.lesson.length>700,`S${n} lesson too thin`);
  for(const token of ['Orient.','Define.','Connect.','Explain.','Worked example:','Guided check:','Fade.','Distinction check.']) assert(s.lesson.includes(token),`S${n} missing ${token}`);
  assert(s.guidedFeedback?.startsWith('Check after attempting.'),`S${n} staged feedback missing`);
  assert(!s.lesson.includes('\\\\n'),`S${n} visible escape`);
  assert(semanticAllowed.has(a.semanticSeparationAudit.sessions[s.id]?.status),`S${n} semantic status`);
  const contract={id:s.id,title:s.title,focus:s.focus,purpose:s.purpose,centralCapability:s.centralCapability,principalObstacle:s.principalObstacle,entryPrerequisites:s.entryPrerequisites,requiredOwnership:s.requiredOwnership,applicationScope:s.applicationScope,transferScope:s.transferScope,inScope:s.inScope,outOfScope:s.outOfScope,exitCondition:s.exitCondition};
  const h=crypto.createHash('sha256').update(JSON.stringify(stable(contract))).digest('hex');
  assert(!hashes.has(h),`duplicate session contract S${n}`);hashes.add(h);
  assert.equal(a.claimEvidence[s.id].length,5,`S${n} claim count`);
  a.claimEvidence[s.id].forEach((e,i)=>{
    assert.equal(e.claim,s.requiredOwnership[i],`S${n} claim text ${i+1}`);
    assert(['main','transfer'].includes(e.task));
    const pid=s[e.task];
    assert.equal(e.publicRequest,a.problems[pid].prompt,`S${n} public request drift`);
    assert.deepEqual(a.coverage[s.id][i],[e.task],`S${n} coverage drift`);
    for(const criterion of e.rubricEvidence) assert(a.evaluators[pid].rubric.some(r=>r.criterion===criterion),`S${n} missing rubric observer ${criterion}`);
  });
  assert(a.prerequisiteAudit[key]?.length,`S${n} prerequisite audit`);
  for(const kind of ['main','transfer']){
    const id=s[kind],ev=a.evaluators[id],ed=a.evidenceDistance.items[id];
    assert.equal(a.problems[id].order,s.order,`S${n} ${kind} learner order`);
    assert.equal(ev.rubric.reduce((z,r)=>z+r.points,0),10,`S${n} ${kind} rubric total`);
    assert(allowed.has(ed.class),`${id} bad evidence class`);
    if(ed.class==='fresh Main evidence'||ed.class==='changed-surface Transfer')decisionTargets.push(id);
    assert(a.instructionSeparation[s.id][kind]?.length,`S${n} ${kind} separation missing`);
    for(const frag of a.instructionSeparation[s.id][kind]){
      assert(a.problems[id].prompt.includes(frag),`S${n} ${kind} missing fragment ${frag}`);
      assert(!s.lesson.includes(frag),`S${n} ${kind} leaked fragment ${frag}`);
    }
  }
  const tClass=a.evidenceDistance.items[s.transfer].class;
  if(tClass==='changed-surface Transfer') assert(s.transferScope.startsWith('Changed-surface transfer:'),`S${n} changed-surface scope not honest`);
  else assert(s.transferScope.startsWith('Retrieval/fluency'),`S${n} retrieval scope not honest`);
}
assert.deepEqual(Object.keys(a.decisionAudit.items).sort(),decisionTargets.sort());
assert.equal(decisionTargets.length,9);
for(const id of decisionTargets){
  const d=a.decisionAudit.items[id];
  assert.equal(typeof d.decisionSuppliedByPrompt,'boolean');
  assert.equal(typeof d.decisionRehearsedInVisibleInstruction,'boolean');
  assert(d.claimedLearnerDecision?.length>20);
  assert(d.scoredLearnerAction?.length>20);
  assert(d.classificationJustification?.length>20);
}

// Historical repaired contracts remain pinned; v2.2 changes are explicitly versioned.
const historicalVersions={
  '1M':2,'1T':2,'2T':2,'3T':2,'4T':2,'5T':3,'6T':2,'7M':2,'7T':2,'8T':2,'9T':2,'10T':2,
  '15M':2,'15T':2,'16T':2,'17M':2,'17T':2,'18M':3,'18T':3,'19T':3,'20T':2,'21M':2,'23T':2,'24M':3
};
for(const [k,v] of Object.entries(historicalVersions)){
  const n=Number(k.match(/\d+/)[0]),kind=k.endsWith('M')?'main':'transfer';
  assert.equal(a.problems[by(n)[kind]].obligationVersion,v,`${k} version`);
}
assert.equal(a.problems[by(19).main].obligationVersion,2,'v2.2 S19 Main strengthened/versioned');
assert.equal(a.problems[by(24).transfer].obligationVersion,4,'v2.2 S24 Transfer exit probe versioned');
for(const n of [25,26,27,28]){
  assert.equal(a.problems[by(n).main].obligationVersion,1);
  assert.equal(a.problems[by(n).transfer].obligationVersion,1);
}

// Stable retained mathematics and historical repairs.
assert.equal(a.claimEvidence[by(5).id][2].task,'transfer');
assert.equal(a.claimEvidence[by(13).id][4].task,'transfer');
assert(by(11).lesson.includes('P(A∩B^c)=P(A)-P(A∩B)'));
assert(by(11).lesson.includes('P(A)P(B^c)'));
assert(!by(4).lesson.includes('generated independently'));
assert(by(3).lesson.includes('M03')&&by(3).lesson.includes('fibre'));
assert(by(22).lesson.includes('M03-S34')&&by(22).lesson.includes('M03-S35'));
assert(by(15).lesson.includes('Independence and identical trial probabilities are separate assumptions'));
assert(by(7).lesson.includes('S27'));
assert(a.problems[by(19).main].prompt.includes('payoff units'));
assert(a.problems[by(19).main].prompt.includes('smallest and largest possible payoff'));

// Representation progression remains concrete.
assert(by(7).representations?.some(x=>x.kind==='table'));
assert(by(9).representations?.some(x=>x.kind==='probabilityTree'));
assert(by(18).representations?.some(x=>x.kind==='table'));
assert(by(25).representations?.some(x=>x.kind==='table'));
assert(by(26).representations?.some(x=>x.kind==='table'));
assert(by(27).representations?.some(x=>x.kind==='table'));
assert(by(28).representations?.some(x=>x.kind==='table'));
for(const n of [25,26,27,28])assert(a.problems[by(n).main].representations?.length,`S${n} public representation missing`);

// Honest evidence classifications.
assert.equal(a.evidenceDistance.items[by(14).main].class,'retrieval');
assert.equal(a.evidenceDistance.items[by(24).main].class,'fresh Main evidence');
assert.equal(a.evidenceDistance.items[by(25).main].class,'proof reconstruction');
assert.deepEqual(
  a.sessions.filter(s=>a.evidenceDistance.items[s.transfer].class==='changed-surface Transfer').map(stableNum).sort((x,y)=>x-y),
  [9,10,13,24,25,26,27,28]
);
assert.equal(Object.keys(a.decisionAudit.items).length,9);

// New boundaries stay downstream.
for(const n of [25,26,27,28]){
  const text=[by(n).lesson,...by(n).outOfScope].join(' ');
  assert(!/optional stopping theorem is taught|Bayes theorem is taught|Markov property is taught/i.test(text));
}
assert(by(25).outOfScope.some(x=>x.includes('M28')));
assert(by(26).outOfScope.some(x=>x.includes('M49')));
assert(by(27).outOfScope.some(x=>x.includes('M06')));
assert(by(28).outOfScope.some(x=>x.includes('M49')));

// Deterministic math checks: retained contracts.
close(.05+.15+.20+.25+.35,1);
close(.55/.80,11/16); close(.55/.60,11/12);
close(18/24,3/4); close(18/30,3/5);
close(.4*.1,.04); close(.4*.9,.36); close(.6*.25,.15); close(.6*.75,.45);
close(.3*.7,.21); close(.21/.4,.525);
close(.8**3*.2,.1024); close(.3**3*.7**2,.01323);
close(6*.2*.8**5,.393216);
close(1-.75**4,.68359375); close(1-.6**5,.92224);
close(.5*.01+.3*.03+.2*.06,.026); close(.2*.4+.5*.1+.3*.25,.205);
close(8*.1+4*.2+1*.3-2*.4,1.1);
close((1+1+1+1+3+7+9+9)/8,4);
close((1+3+7+9)/4,5);
close(.4*.7+.6*.5,.58); close(.4*.7,.28); close(4*.58-3*.42,1.06);

// S19 strengthened Main.
close(-3*.2+1*.5+7*.3,2);assert(2>=-3&&2<=7);

// S25 exact/bounded finite probability.
close(Math.max(0,.6+.5-1),.1);close(Math.min(.6,.5),.5);
close(.6+.5-.5,.6);close(.6+.5-.1,1);
close(.15+.20+.30,.65);close(Math.max(.15,.20,.30),.30);

// S26 full-history and heterogeneous paths.
const s26Leaves=[.4*.5*.2,.4*.5*.8,.4*.5*.7,.4*.5*.3,.6*.25*.8,.6*.25*.2,.6*.75*.4,.6*.75*.6];
close(s26Leaves.reduce((x,y)=>x+y,0),1);
close(s26Leaves[0]+s26Leaves[2]+s26Leaves[4]+s26Leaves[6],.48);
close(.2*.5*.2+.8*.5*.2+.8*.5*.8,.42);
close(3*.5*.5**2,.375);

// S27 observation mechanisms.
close((1/4)/(3/4),1/3);
close((2/8)/(4/8),1/2);
close(.10+.20*.75+.30*.25,.325);
close(.10/.325,4/13);
close(.10/.60,1/6);

// S28 stopped experiments.
close(.5+.25+.125+.125,1);close(.5+.25+.125,7/8);
const contest=[.36,.16,.144,.096,.144,.096];close(contest.reduce((x,y)=>x+y,0),1);close(.36+.144+.144,.648);
close(.216+.144,.36);close(.096+.064,.16);

// Expanded S24 exit probe.
const overlapLo=.1,overlapHi=.5;
const unionLo=1.1-overlapHi,unionHi=1.1-overlapLo;
close(unionLo,.6);close(unionHi,1);
close(6*unionLo-1,2.6);close(6*unionHi-1,5);close(6*.8-1,3.8);

console.log('PASS: M04 v2.2 whole-curriculum candidate — 28 sessions/56 tasks/140 claims; stable IDs preserved, four new foundations wired, strengthened evidence versioned, exact math and evidence-distance ledgers checked.');
