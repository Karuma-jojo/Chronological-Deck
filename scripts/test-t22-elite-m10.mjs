import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m10-arc053.json');
const m09=read('course/t22/authoring/m09.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const meta=read('course/t22/generated/course-meta.json');
const baseline=read('docs/t22-course/audit/m10-preserved-baseline.json');
const ownershipAudit=read('docs/t22-course/audit/m10-ownership-audit.json');
const contract=read('docs/t22-course/audit/m10-semantic-contract.json');
const gate=fs.readFileSync('docs/t22-course/M10-DESIGN-GATE.md','utf8');

function gitBlobSha(path){
  const b=fs.readFileSync(path);
  const header=Buffer.from('blob '+b.length+'\0');
  return createHash('sha1').update(Buffer.concat([header,b])).digest('hex');
}
function norm(x){return String(x||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');}
function grams(x,n=12){
  const t=norm(x).split(' ').filter(Boolean),out=new Set();
  for(let i=0;i+n<=t.length;i++)out.add(t.slice(i,i+n).join(' '));
  return out;
}
const taskIds=s=>[s.main,s.transfer];
const expectedV2=new Set([
  'T22V3::ARC053::S12-M@1',
  'T22V3::ARC053::S14-T@1',
  'T22V3::ARC053::S15-T@1',
  'T22V3::ARC053::S20-M@1',
  'T22V3::ARC053::S21-M@1'
]);
const allowedClass=new Set(['retrieval','proof reconstruction','fresh Main evidence','changed-surface Transfer']);

assert.equal(a.module.order,10);
assert.equal(a.module.id,'ARC053');
assert.equal(a.module.title,'Derivatives & Local Linearity');
assert.match(a.module.status,/semantic-repair-builder-candidate-unpublished/);
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(a.coverageAudit.originalOwnershipClaimCount,72);
assert.equal(a.coverageAudit.ownershipClaimCount,69);
assert.equal(Object.values(a.claimEvidence).flat().length,69);
assert.deepEqual(a.boundary.prerequisiteModules,deps.modules.find(m=>m.id==='ARC053').prerequisites);
assert.match(a.boundary.decisiveProhibition,/do not justify M10 with integration/i);
assert.match(a.boundary.decisiveProhibition,/Taylor/i);
assert.match(a.boundary.decisiveProhibition,/MVT/i);

assert.equal(meta.moduleSources.length,9,'M10 repair must not rewrite the accepted nine-module runtime registry');
assert.equal(meta.moduleSources.at(-1).source,'course/t22/authoring/m09.json');
assert(!meta.moduleSources.some(x=>x.order>=10),'M10 remains deliberately unregistered');
assert(!fs.existsSync('course/t22/authoring/m10.json'),'historical M07-M09 stop-boundary path remains absent');
assert(fs.existsSync('course/t22/authoring/m10-arc053.json'));

for(const [path,sha] of Object.entries(baseline.files))assert.equal(gitBlobSha(path),sha,path+' changed during M10-only repair');

for(const heading of ['Boundary contract','Concept dependency graph','Conceptual-distinction map','Failure-mode map','Narrative spine','Candidate session boundaries'])assert.match(gate,new RegExp(heading,'i'));
assert.match(gate,/24 pedagogical atoms/i);

// The audit must account for every pre-repair claim, not merely the final set.
assert.equal(ownershipAudit.records.length,72);
assert.equal(ownershipAudit.summary.originalClaims,72);
assert.equal(ownershipAudit.summary.finalClaims,69);
assert.equal(ownershipAudit.summary.removed,3);
assert.equal(new Set(ownershipAudit.records.map(r=>r.session+':'+r.originalClaimIndex)).size,72);
for(const r of ownershipAudit.records){
  assert(['remap','narrow+remap','remove','assessment-repair+narrow','assessment-repair+remap','narrow+classification','assessment-repair'].includes(r.disposition),r.disposition);
  assert(r.rationale?.length>20,'ownership audit rationale too thin');
  if(r.disposition==='remove')assert.equal(r.finalClaim,null);
  else assert(r.finalClaim?.length>10);
}

// Pin the reviewed semantic contract independently of positional conventions.
assert.equal(contract.sessions.length,24);
assert.equal(contract.originalOwnershipClaimCount,72);
assert.equal(contract.repairedOwnershipClaimCount,69);
assert.deepEqual(new Set(contract.changedObligations.map(x=>x.id)),expectedV2);

const ids=new Set(),problemIds=new Set();
const m09Lessons=m09.sessions.map(s=>s.lesson).join('\n');
for(let i=0;i<a.sessions.length;i++){
  const s=a.sessions[i],order=i+1,ss=String(order).padStart(2,'0');
  assert.equal(s.order,order);
  assert.equal(s.id,`T22V3::ARC053::S${ss}@1`);
  assert.equal(s.moduleId,'ARC053');
  assert(!ids.has(s.id));ids.add(s.id);
  assert(s.lesson.includes('Worked example:'),s.id+' missing worked example');
  assert(s.lesson.includes('Guided practice:'),s.id+' missing guided practice');
  assert(s.entryPrerequisites.length>0);
  assert(s.requiredOwnership.length>=2,'ownership should follow mathematics, not a fixed count');
  assert.equal(a.claimEvidence[s.id].length,s.requiredOwnership.length);
  assert.equal(a.coverage[s.id].length,s.requiredOwnership.length);

  const sem=a.semanticSeparationAudit.sessions[s.id];
  assert(sem?.main&&sem?.transfer,s.id+' missing semantic independence classification');
  assert(allowedClass.has(sem.main.classification));
  assert(allowedClass.has(sem.transfer.classification));
  assert(sem.main.reason.length>30&&sem.transfer.reason.length>30);
  assert(!sem.main.classification.includes('fresh')||sem.main.classification==='fresh Main evidence');
  assert.equal(sem.transfer.classification,'changed-surface Transfer');

  const c=contract.sessions[i];
  assert.equal(c.id,s.id);
  assert.deepEqual(c.requiredOwnership,s.requiredOwnership);
  assert.deepEqual(c.claimEvidence,a.claimEvidence[s.id]);
  assert.equal(c.main.prompt,a.problems[s.main].prompt);
  assert.equal(c.transfer.prompt,a.problems[s.transfer].prompt);
  assert.deepEqual(c.main.rubric,a.evaluators[s.main].rubric);
  assert.deepEqual(c.transfer.rubric,a.evaluators[s.transfer].rubric);
  assert.equal(c.main.classification,sem.main.classification);
  assert.equal(c.transfer.classification,sem.transfer.classification);

  for(const [kind,id] of [['main',s.main],['transfer',s.transfer]]){
    assert.equal(id,`T22V3::ARC053::S${ss}-${kind==='main'?'M':'T'}@1`);
    assert(!problemIds.has(id));problemIds.add(id);
    const p=a.problems[id],e=a.evaluators[id];
    assert(p&&e,s.id+' missing '+kind);
    assert.equal(p.order,order);assert.equal(p.kind,kind);
    assert.equal(p.obligationVersion,expectedV2.has(id)?2:1,id+' obligation version');
    assert(p.prompt.length>=80,id+' prompt too thin');
    assert(e.reference.length>=60,id+' reference too thin');
    assert(e.rubric.length>=2,id+' rubric too thin');
    assert.equal(e.rubric.reduce((z,r)=>z+r.points,0),10,id+' rubric must total 10');
  }

  // Global prior-instruction screen includes every M09 lesson plus all M10 lessons legally seen through this session.
  const available=m09Lessons+'\n'+a.sessions.filter(x=>x.order<=s.order).map(x=>x.lesson).join('\n');
  const lessonGrams=grams(available);
  for(const id of taskIds(s)){
    const p=a.problems[id],e=a.evaluators[id];
    assert(!norm(available).includes(norm(p.prompt)),id+' exact prompt leaked into legal instruction');
    assert(!norm(available).includes(norm(e.reference)),id+' exact reference leaked into legal instruction');
    for(const [label,text] of [['prompt',p.prompt],['reference',e.reference]]){
      const overlap=[...grams(text)].filter(g=>lessonGrams.has(g));
      assert.equal(overlap.length,0,`${id} ${label} has 12-token legal-instruction overlap: ${overlap[0]||''}`);
    }
  }

  // Every ownership row must be literally anchored to its public task(s) and exact reviewed rubric rows.
  for(const ev of a.claimEvidence[s.id]){
    assert(s.requiredOwnership.includes(ev.claim),s.id+' claim must be owned');
    assert(['main','transfer','main+transfer'].includes(ev.task));
    const tasks=ev.task==='main'?[s.main]:ev.task==='transfer'?[s.transfer]:[s.main,s.transfer];
    const prompts=tasks.map(id=>a.problems[id].prompt);
    const criteria=tasks.flatMap(id=>a.evaluators[id].rubric.map(r=>r.criterion));
    for(const p of prompts)assert(ev.publicRequest.includes(p),s.id+' public request must include every cited task');
    assert(ev.rubricEvidence.length>=1,s.id+' ownership must cite an observable rubric action');
    for(const row of ev.rubricEvidence)assert(criteria.includes(row),s.id+' mapping cites a rubric row outside the cited task');
  }
}

// Asymptotic-notation prerequisite repair: concrete ratio first, no formal big-O in M10.
assert(a.sessions[6].lesson.includes('r(h)=o(h) as h→0 means exactly r(h)/h→0'));
const preS07=a.sessions.slice(0,6).map(s=>s.lesson+'\n'+a.problems[s.main].prompt+'\n'+a.problems[s.transfer].prompt).join('\n');
assert(!/o\([hk]\)/.test(preS07),'little-o used before S07 definition');
const allM10=a.sessions.map(s=>s.lesson+'\n'+a.problems[s.main].prompt+'\n'+a.problems[s.transfer].prompt+'\n'+a.evaluators[s.main].reference+'\n'+a.evaluators[s.transfer].reference).join('\n');
assert(!/O\([hk]\)/.test(allM10),'formal big-O leaked into M10');
assert.match(a.sessions[13].lesson,/k\(h\)\/h.*bounded/i);
assert.match(a.prerequisiteAudit.notationRepair.bigOPolicy,/Formal O\(h\) notation is not used/);

// High-risk semantic findings are executable guards.
assert(a.sessions[11].requiredOwnership[0].startsWith('Reconstruct the product rule'));
assert.equal(a.problems[a.sessions[11].main].obligationVersion,2);
assert(!a.sessions[12].requiredOwnership.some(x=>/negative integer/i.test(x)));
assert(a.sessions[13].requiredOwnership.some(x=>/does not require a nonzero inner increment/i.test(x)));
assert.equal(a.problems[a.sessions[13].transfer].obligationVersion,2);
assert(a.sessions[14].requiredOwnership.some(x=>/missing chain factor/i.test(x)));
assert.equal(a.problems[a.sessions[14].transfer].obligationVersion,2);
assert.equal(a.semanticSeparationAudit.sessions[a.sessions[15].id].main.classification,'proof reconstruction');
assert(!a.sessions[17].requiredOwnership.some(x=>/prove the scoped inverse/i.test(x)));
assert(a.sessions[19].requiredOwnership.some(x=>/zero-point normalization/i.test(x)));
assert.equal(a.problems[a.sessions[19].main].obligationVersion,2);
assert(a.sessions[20].requiredOwnership.some(x=>/b\^x.*ln b/i.test(x)));
assert.equal(a.problems[a.sessions[20].main].obligationVersion,2);
assert.equal(a.semanticSeparationAudit.sessionSizingReview.S21.verdict,'retain one session');

const requiredSources=['MIT-1801-DIFF','MIT-1801-RATE','OS-31','OS-32','OS-33','OS-35','OS-36','OS-37','OS-38','OS-39','LEBL-41','MIT-18014','IES-WWC'];
for(const id of requiredSources)assert(a.sourceLedger.sources.some(s=>s.id===id),'missing source '+id);

const lessons=a.sessions.map(s=>s.lesson.toLowerCase()).join('\n');
for(const banned of ['mean value theorem',"l'hopital","l’hopital","newton's method",'jacobian','hessian'])assert(!lessons.includes(banned),'future premise leaked into M10 lesson: '+banned);

console.log('PASS M10 semantic/evidence repair: 72 original claims audited; 69 observable claims retained; 5 versioned task repairs; arbitrary claim/rubric counts; M09+M10 global instruction separation; asymptotic notation repaired; M01-M09/runtime blobs preserved.');
