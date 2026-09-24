import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const a=JSON.parse(fs.readFileSync('course/t22/authoring/m04.json','utf8'));
const by=n=>a.sessions.find(s=>s.order===n);
const P=(task,r)=>({task,r});
const claimPlan={
  1:[P('main',[0]),P('main',[1]),P('main',[2]),P('main',[3]),P('main',[4])],
  2:[P('main',[0]),P('main',[1]),P('main',[2]),P('main',[0,4]),P('main',[3])],
  3:[P('main',[0]),P('main',[1]),P('main',[2]),P('main',[3]),P('main',[4])],
  4:[P('main',[0]),P('main',[1]),P('main',[2]),P('main',[3]),P('main',[0,1])],
  5:[P('main',[0]),P('main',[1]),P('transfer',[2,4]),P('main',[4]),P('main',[2,3])],
  6:[P('main',[0]),P('main',[2]),P('main',[1]),P('main',[3]),P('main',[4])],
  7:[P('main',[0]),P('main',[1]),P('main',[0,3]),P('main',[2,3]),P('main',[4])],
  8:[P('main',[0]),P('main',[1]),P('main',[3]),P('main',[2]),P('main',[4])],
  9:[P('main',[0]),P('main',[0]),P('main',[1]),P('main',[3,4]),P('main',[2])],
 10:[P('main',[4]),P('main',[0]),P('main',[1]),P('main',[2,3]),P('main',[3,4])],
 11:[P('main',[2]),P('main',[1,2]),P('main',[2]),P('main',[3]),P('main',[4])],
 12:[P('main',[2,4]),P('main',[1,2]),P('main',[2]),P('main',[3]),P('main',[4])],
 13:[P('main',[0]),P('main',[1,2]),P('main',[2,3]),P('main',[4]),P('transfer',[3,4])],
 14:[P('main',[1,2]),P('main',[3,4]),P('main',[1,2]),P('main',[3]),P('main',[2,3,4])],
 15:[P('main',[4]),P('main',[0]),P('main',[1,2]),P('main',[3]),P('main',[3])],
 16:[P('main',[0]),P('main',[1]),P('main',[2]),P('main',[3]),P('main',[4])],
 17:[P('main',[3]),P('main',[0]),P('main',[2]),P('main',[1,3]),P('main',[4])],
 18:[P('main',[0]),P('main',[0]),P('main',[1]),P('main',[2,3]),P('main',[3,4])],
 19:[P('main',[1]),P('main',[1]),P('main',[2]),P('main',[0]),P('main',[3,4])],
 20:[P('main',[0,3]),P('main',[0]),P('main',[1,2]),P('main',[4]),P('main',[3,4])],
 21:[P('main',[0]),P('main',[0]),P('main',[1]),P('main',[3]),P('main',[4])],
 22:[P('main',[0]),P('main',[1]),P('main',[2]),P('main',[3]),P('main',[4])],
 23:[P('main',[0]),P('main',[1]),P('main',[2]),P('main',[3]),P('main',[4])],
 24:[P('main',[0]),P('main',[1]),P('main',[2]),P('main',[3]),P('main',[4])]
};

assert.equal(a.module.id,'ARC048');
assert.equal(a.version,'m04-authoring-v1.2-astra-r1');
assert.equal(a.instructionVersion,'m04-instruction-astra-r1');
assert.deepEqual(a.boundary.prerequisiteModules,['T22E-DISC01']);
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,24);
assert.deepEqual(a.crossModulePrerequisiteCleanup.changedContractSessionIds,[by(18).id]);
assert.deepEqual(a.crossModulePrerequisiteCleanup.fixedAssessmentChanges,[]);

const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const hashes=new Set();
for(const s of a.sessions){
  assert.equal(s.requiredOwnership.length,5);
  assert(s.lesson.includes('Worked example:')&&s.lesson.includes('Guided check:'));
  assert.equal(a.semanticSeparationAudit.sessions[s.id].status,'reviewed-separated');
  const c={id:s.id,title:s.title,focus:s.focus,purpose:s.purpose,centralCapability:s.centralCapability,principalObstacle:s.principalObstacle,entryPrerequisites:s.entryPrerequisites,requiredOwnership:s.requiredOwnership,applicationScope:s.applicationScope,transferScope:s.transferScope,inScope:s.inScope,outOfScope:s.outOfScope,exitCondition:s.exitCondition};
  const h=crypto.createHash('sha256').update(JSON.stringify(stable(c))).digest('hex');
  assert(!hashes.has(h)); hashes.add(h);
  assert.equal(a.claimEvidence[s.id].length,5);
  const plan=claimPlan[s.order];
  a.claimEvidence[s.id].forEach((e,i)=>{
    const expected=plan[i], id=s[expected.task], rubric=a.evaluators[id].rubric;
    assert.equal(e.claim,s.requiredOwnership[i]);
    assert.equal(e.task,expected.task);
    assert.equal(e.publicRequest,a.problems[id].prompt);
    assert.deepEqual(e.rubricEvidence,expected.r.map(j=>rubric[j].criterion));
    assert.deepEqual(a.coverage[s.id][i],[expected.task]);
  });
  for(const kind of ['main','transfer']){
    const id=s[kind];
    assert.equal(a.evaluators[id].rubric.reduce((z,r)=>z+r.points,0),10);
    assert(a.instructionSeparation[s.id][kind].length);
    for(const f of a.instructionSeparation[s.id][kind]){
      assert(a.problems[id].prompt.includes(f),`S${s.order} ${kind} missing separation fragment: ${f}`);
      assert(!s.lesson.includes(f),`S${s.order} ${kind} lesson leaks separation fragment: ${f}`);
    }
  }
  assert(a.prerequisiteAudit['S'+String(s.order).padStart(2,'0')]?.length);
}

const close=(x,y,e=1e-12)=>assert(Math.abs(x-y)<e,`${x} != ${y}`);
close(.08+.17+.30+.30+.15,1);
close(4/36,1/9);
close(1-1/16,15/16);
close(4/6,2/3);
close(.55+.40-.18,.77);
close(2/6,1/3);
close((.48*.35)/.42,.4);
close(.55*.9+.45*.7,.81);
close((5/8)*(3/7),15/56);
close(.5*(1/3),1/6);
close((4/6)*(3/5),.4);
close((1/4)*(3/8),3/32);
close(1/4,1/4);
assert.notEqual(0,1/8);
close(.8**3*.2,.1024);
close(10*.6**3*.4**2,.3456);
close(1-.75**4,.68359375);
close(.5*.01+.3*.03+.2*.06,.026);
close(-3*.2+1*.5+7*.3,2);
close((2+5+8+11+14+17)/6,9.5);
close((3+9+3)/3,5);
close(3*(4/10),1.2);
close(0*.75+12*.25,3);
close(.4*.75+.6*.5,.6);
close(4*.6-1*.4,2);

// Astra bounded repair regressions.
assert.equal(a.problems[by(5).transfer].obligationVersion,2);
assert(a.problems[by(5).transfer].prompt.includes("D='number is 10 or 11'"));
assert(a.evaluators[by(5).transfer].rubric.some(r=>r.criterion.includes('disjoint addition rule')));
assert.equal(a.claimEvidence[by(5).id][2].task,'transfer');

assert(by(11).lesson.includes('P(A∩B^c)=P(A)−P(A∩B)'));
assert(by(11).lesson.includes('P(A)P(B^c)'));
assert(a.prerequisiteAudit.S11.some(x=>x.item.includes('complemented event')));

assert.equal(a.claimEvidence[by(13).id][4].task,'transfer');

assert.equal(a.problems[by(21).main].obligationVersion,2);
assert(a.problems[by(21).main].prompt.includes('derive from the finite weighted-sum definition'));
assert(a.evaluators[by(21).main].rubric[0].criterion.includes('Derives finite linearity'));

assert(by(22).lesson.includes('each original labelled object appears equally often'));
assert(by(22).lesson.includes('equals the initial red fraction'));
assert(a.prerequisiteAudit.S22.some(x=>x.item.includes('ordered-sample model')));

assert(!by(4).lesson.includes('generated independently'));
assert(by(7).lesson.includes('P(B)>0'));
assert(by(14).lesson.includes('triple intersection'));
assert(by(18).lesson.includes('Bayes territory'));
assert(by(18).entryPrerequisites.some(x=>x.includes('JIT disjoint/exhaustive partition definition')));
assert(!by(18).entryPrerequisites.some(x=>x.includes('M03-S17 partitions/disjoint unions')));
assert(!by(21).lesson.includes('E[XY]=E[X]E[Y]'));
assert(by(23).lesson.includes('M05 will introduce'));
assert(by(24).lesson.includes('North with probability0.2'));

for(const n of [7,9,10,11,12,13,14,16,18,19,21,22,24]){
  const worked=by(n).lesson.split('Worked example:')[1].split('Guided check:')[0].trim();
  assert(worked.length>=90,'S'+n+' worked reasoning too thin');
}

console.log('PASS: M04 Astra-r1 — 24 sessions, 48 tasks, 120/120 manually pinned claim/task/rubric mappings, S05/S21 obligation-v2 repairs, S11/S22 novice bridges, and 24/24 separation records.');
