import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m08.json');
const semantic=read('docs/t22-course/audit/m08-semantic-contract.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const by=n=>a.sessions.find(s=>s.order===n);

assert.equal(a.version,'m08-authoring-v2-independent-repair');
assert.equal(a.instructionVersion,'m08-instruction-v2-independent-repair');
assert.equal(a.module.id,'T22E-CODE01');
assert.equal(a.module.status,'independent-audit-repaired-candidate-awaiting-followup');
assert.deepEqual(a.boundary.prerequisiteModules,['T22E-FND01','T22E-DISC01','ARC048']);
assert.deepEqual(deps.modules.find(x=>x.id==='T22E-CODE01').prerequisites,a.boundary.prerequisiteModules);
assert(!a.sessions.some(s=>s.entryPrerequisites.some(x=>x.includes('M02'))),'M08 session prerequisite must not contradict canonical M01/M03/M04 boundary');
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);
assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,24);
assert.equal(Object.keys(a.assessmentSeparationAudit.sessions).length,24);
assert.equal(Object.keys(semantic.sessions).length,24);
assert.equal(semantic.version,'m08-semantic-contract-independent-r2-2026-09-24');

const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const hashes=new Set();
const changed=new Set(a.repairVersionAudit.changedPublicTasks);
const obligationVersions=a.repairVersionAudit.obligationVersions||{};

function checkAssessmentSeparation(pack){
  for(const s of pack.sessions){
    const rec=pack.assessmentSeparationAudit.sessions[s.id];
    assert(rec,'missing assessment separation '+s.id);
    assert.equal(rec.status,'independent-repair-reviewed-separated');
    assert.notEqual(rec.lessonModelKey,rec.mainModelKey, s.id+' lesson/Main semantic instance keys collide');
    assert(rec.noveltyReason.includes(rec.lessonModelKey) && rec.noveltyReason.includes(rec.mainModelKey));
    for(const frag of rec.forbiddenLessonFragments){
      for(const prior of pack.sessions.filter(x=>x.order<=s.order)){
        assert(!prior.lesson.includes(frag), s.id+' repaired Main answer/instance leaked into S'+String(prior.order).padStart(2,'0')+' lesson: '+frag);
      }
    }
  }
}

for(const s of a.sessions){
  assert.equal(s.requiredOwnership.length,5);
  assert(s.lesson.includes('Worked example:')&&s.lesson.includes('Guided check:'),s.id);
  assert.equal(a.claimEvidence[s.id].length,5);
  assert.equal(a.semanticSeparationAudit.sessions[s.id].status,'independent-repair-reviewed-separated');
  const h=crypto.createHash('sha256').update(JSON.stringify(stable({title:s.title,focus:s.focus,purpose:s.purpose,claims:s.requiredOwnership,lesson:s.lesson}))).digest('hex');
  assert(!hashes.has(h)); hashes.add(h);
  for(const kind of ['main','transfer']){
    const id=s[kind],p=a.problems[id],ev=a.evaluators[id];
    assert.equal(p.obligationVersion,changed.has(id)?obligationVersions[id]:1,id+' obligationVersion mismatch');
    assert.equal(ev.rubric.length,5);
    assert.equal(ev.rubric.reduce((z,r)=>z+r.points,0),10);
    for(const frag of a.instructionSeparation[s.id][kind]){
      assert(p.prompt.includes(frag),s.id+' '+kind+' separation fragment missing from task');
      assert(!s.lesson.includes(frag),s.id+' '+kind+' task fragment leaked into lesson');
    }
  }
  const rec=semantic.sessions[String(s.order).padStart(2,'0')];
  assert.equal(rec.sessionId,s.id); assert.equal(rec.links.length,5);
  for(let i=0;i<5;i++){
    const row=a.claimEvidence[s.id][i],link=rec.links[i],pid=s[row.task],ev=a.evaluators[pid];
    assert.equal(row.claim,s.requiredOwnership[i]);
    assert.equal(link.claim,row.claim);
    assert.equal(link.task,row.task);
    assert.equal(row.publicRequest,a.problems[pid].prompt);
    const expected=link.rows.map(r=>ev.rubric[r-1].criterion);
    assert.deepEqual(row.rubricEvidence,expected,s.id+' claim '+(i+1)+' semantic rubric drift');
    assert.deepEqual(a.coverage[s.id][i],[row.task]);
  }
  assert(a.prerequisiteAudit['S'+String(s.order).padStart(2,'0')]?.length);
}
checkAssessmentSeparation(a);

// Mutation sensitivity: semantic links and assessment-separation declarations must fail when corrupted.
function checkSemantic(pack){
  for(const s of pack.sessions){
    const rec=semantic.sessions[String(s.order).padStart(2,'0')];
    for(let i=0;i<5;i++){
      const row=pack.claimEvidence[s.id][i],link=rec.links[i],pid=s[link.task],ev=pack.evaluators[pid];
      assert.equal(row.claim,s.requiredOwnership[i]);
      assert.equal(row.task,link.task);
      assert.equal(row.publicRequest,pack.problems[pid].prompt);
      assert.deepEqual(row.rubricEvidence,link.rows.map(r=>ev.rubric[r-1].criterion));
    }
  }
}
checkSemantic(a);
{
  const m=structuredClone(a),s=m.sessions.find(x=>x.order===9);
  m.claimEvidence[s.id][3].rubricEvidence=[m.evaluators[s.main].rubric[3].criterion];
  assert.throws(()=>checkSemantic(m));
}
{
  const m=structuredClone(a),s=m.sessions.find(x=>x.order===24);
  m.claimEvidence[s.id][0].task='transfer';
  m.claimEvidence[s.id][0].publicRequest=m.problems[s.transfer].prompt;
  m.claimEvidence[s.id][0].rubricEvidence=[m.evaluators[s.transfer].rubric[0].criterion];
  assert.throws(()=>checkSemantic(m));
}
{
  const m=structuredClone(a),s=m.sessions.find(x=>x.order===21);
  m.assessmentSeparationAudit.sessions[s.id].lessonModelKey=m.assessmentSeparationAudit.sessions[s.id].mainModelKey;
  assert.throws(()=>checkAssessmentSeparation(m));
}
{
  const m=structuredClone(a),s=m.sessions.find(x=>x.order===21);
  s.lesson+=' leaked 0.322';
  assert.throws(()=>checkAssessmentSeparation(m));
}

// Primary-source/boundary pins.
for(const id of ['PY-FLOAT','PY-FRAC','PY-ITER','PY-RNG','PY-ASSERT','PY-FAQ','PY-IMPORT','PY-MATH','PY-ZIP','PY-TRACE']){
  assert(a.sourceLedger.sources.some(x=>x.id===id),'missing source '+id);
}
for(const forbidden of ['numpy','pandas','bootstrap','confidence interval','central limit theorem','backtest']){
  assert(!a.sessions.some(s=>s.lesson.toLowerCase().includes(forbidden)),`M08 boundary leak: ${forbidden}`);
}
assert(by(2).lesson.includes('import math')&&by(2).lesson.includes('abs_tol'));
assert(by(7).lesson.includes('function object')&&by(7).lesson.includes('predicate(x)'));
assert(!by(7).lesson.includes(' if predicate(x) else'),'S07 must not introduce untaught conditional-expression syntax');
assert(by(9).lesson.includes('counts.get(label,0)+1'));
assert(by(11).lesson.includes('strict=True'));
assert(by(12).lesson.includes('from itertools import product')&&by(12).lesson.includes('No RNG is involved'));
assert(a.problems[by(12).main].prompt.includes('from itertools import product'));
assert(a.problems[by(12).main].prompt.includes('product(range(1,7), repeat=2)'));
assert(!a.problems[by(12).main].prompt.includes('itertools.product'),'from-import Main must not require an unbound module name');
assert(by(13).lesson.includes('from fractions import Fraction'));
assert(by(17).lesson.includes('-O'));
assert(!Object.values(a.evaluators).some(ev=>ev.reference.includes('lambda ')),'learner-facing references must not introduce untaught lambda syntax');
assert(by(18).lesson.includes('traceback'));
assert(by(19).lesson.includes('from random import Random')&&by(19).lesson.includes('Random(17)'));
assert(!by(19).lesson.includes('Random(23)'));
assert(by(21).lesson.includes('Random(17)')&&!by(21).lesson.includes('322')&&!by(21).lesson.includes('0.322'));
assert(by(22).lesson.includes('Random(5)')&&!by(22).lesson.includes('Random(31)'));
assert(!a.problems[by(22).main].prompt.includes('[r.random() for'),'S22 Main must use previously taught loops/list append, not hidden list comprehensions');
assert.equal(a.problems[by(18).transfer].obligationVersion,3);
assert.equal(a.problems[by(22).main].obligationVersion,4);
assert(by(23).lesson.includes('two independent fair bits')&&!by(23).lesson.includes('six diagonal pairs'));
assert(!by(14).lesson.includes('[x for'),'S14 lesson must not introduce an untaught list comprehension');
assert.equal(a.repairVersionAudit.changedPublicTasks.length,29);
assert.equal(Object.values(a.repairVersionAudit.obligationVersions).filter(v=>v===2).length,27);
assert.equal(Object.values(a.repairVersionAudit.obligationVersions).filter(v=>v===3).length,1);
assert.equal(Object.values(a.repairVersionAudit.obligationVersions).filter(v=>v===4).length,1);
for(const s of a.sessions){
  for(const t of [s.lesson,a.problems[s.main].prompt,a.problems[s.transfer].prompt,a.evaluators[s.main].reference,a.evaluators[s.transfer].reference]){
    assert(!/;\s*(for|while|def|try|with)\b/.test(t),s.id+' contains invalid semicolon-before-compound Python');
  }
}
assert(a.followupAudit.findings['M08-F05']);
assert(by(24).lesson.includes('model → exact oracle'));
assert(!fs.existsSync('course/t22/authoring/m09.json'),'M09 must remain closed');

console.log('PASS M08 independent repair: 24 sessions, 48 tasks, 120 semantic links, exact v1/v2/v3/v4 obligation provenance, fresh lesson/Main instances, no hidden novice syntax or invalid compressed compound statements, executable programming ownership, primary-source pins and hard M09 stop.');
