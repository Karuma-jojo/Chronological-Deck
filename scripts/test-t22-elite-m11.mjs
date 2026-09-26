import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m11-arc510.json');
const m09=read('course/t22/authoring/m09.json');
const m10=read('course/t22/authoring/m10-arc053.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const meta=read('course/t22/generated/course-meta.json');
const baseline=read('docs/t22-course/audit/m11-preserved-baseline.json');
const ownership=read('docs/t22-course/audit/m11-ownership-audit.json');
const contract=read('docs/t22-course/audit/m11-semantic-contract.json');
const gate=fs.readFileSync('docs/t22-course/M11-DESIGN-GATE.md','utf8');

function gitBlobSha(path){
  const b=fs.readFileSync(path);
  const h=Buffer.from('blob '+b.length+'\0');
  return createHash('sha1').update(Buffer.concat([h,b])).digest('hex');
}
function norm(x){return String(x||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');}
function grams(x,n=12){
  const t=norm(x).split(' ').filter(Boolean),out=new Set();
  for(let i=0;i+n<=t.length;i++)out.add(t.slice(i,i+n).join(' '));
  return out;
}
const allowedClass=new Set(['retrieval','proof reconstruction','fresh Main evidence','changed-surface Transfer']);

assert.equal(a.module.order,11);
assert.equal(a.module.id,'ARC510');
assert.equal(a.module.title,'Integration & Accumulation');
assert.match(a.module.status,/published-independent-review-repaired/);
assert.equal(a.sessions.length,20,'session count is design-gate-derived, not inherited');
assert.equal(Object.keys(a.problems).length,40);
assert.equal(Object.keys(a.evaluators).length,40);
assert.deepEqual(a.boundary.prerequisiteModules,deps.modules.find(m=>m.id==='ARC510').prerequisites);
assert.deepEqual(a.boundary.prerequisiteModules,['SIDE263','ARC053']);
assert.match(a.boundary.decisiveProhibition,/M12|Taylor|asympt/i);
assert(a.boundary.owns.length>=9,'canonical M11 ownership boundary is still pilot-thin');
assert(!a.boundary.owns.join(' ').toLowerCase().includes('pilot scope'),'stale pilot ownership boundary');
assert.match(a.module.gate,/all 20 design-derived sessions/i);
assert(!/s01 is the required pilot/i.test(a.module.gate),'stale pilot module gate');

assert(meta.moduleSources.length>=12,'later publication may extend the registry but must preserve M11-M12');
assert(meta.moduleSources.some(x=>x.order===11&&x.id==='ARC510'&&x.source==='course/t22/authoring/m11-arc510.json'));
assert.equal(meta.moduleSources.filter(x=>x.order<=11).length,11);

const publicationAuthorized=new Set(['course/t22/authoring/m10-arc053.json','course/t22/generated/course-meta.json','scripts/test-t22-elite-m09.mjs','scripts/test-t22-elite-m10.mjs','docs/t22-course/audit/m06-handoff-checks.mjs','docs/t22-course/audit/m07-handoff-checks.mjs','docs/t22-course/audit/m08-handoff-checks.mjs','docs/t22-course/audit/m10-protected-semantic-rows.json','js/t22-course/ui.js','t22-course.html']);
for(const [path,sha] of Object.entries(baseline.files))if(!publicationAuthorized.has(path))assert.equal(gitBlobSha(path),sha,path+' changed outside authorized through-M12 publication surfaces');

for(const heading of ['Boundary contract','Source dossier','Concept dependency graph','Conceptual-distinction map','Failure-mode map','Narrative spine','Candidate session boundaries']){
  assert.match(gate,new RegExp(heading,'i'));
}
assert.match(gate,/20 pedagogical atoms/i);

const claimCount=Object.values(a.claimEvidence).flat().length;
assert.equal(a.coverageAudit.ownershipClaimCount,claimCount);
assert.match(a.coverageAudit.note,/emergent.*count/i);
assert.equal(contract.ownershipClaimCount,claimCount);
assert.equal(ownership.summary.finalClaims,claimCount);
assert.equal(ownership.records.length,ownership.summary.originalClaims);
assert.equal(new Set(ownership.records.map(r=>r.session+':'+r.originalClaimIndex)).size,ownership.records.length);
for(const r of ownership.records){
  assert(['retain','narrow','hypothesis-repair'].includes(r.disposition),r.disposition);
  assert(r.finalClaim?.length>10);
  assert(r.rationale?.length>30);
}
assert.equal(ownership.summary.removed,0);
assert.equal(ownership.assessmentRepairs.length,1);
assert.equal(ownership.assessmentRepairs[0].session,19);

assert.equal(contract.sessions.length,a.sessions.length);
assert.deepEqual(new Set(contract.evidenceClasses),allowedClass);
assert.equal(contract.unpublished,false);

const priorBase=m09.sessions.map(s=>s.lesson).join('\n')+'\n'+m10.sessions.map(s=>s.lesson).join('\n');
const ids=new Set(),problemIds=new Set();
for(let i=0;i<a.sessions.length;i++){
  const s=a.sessions[i],order=i+1,ss=String(order).padStart(2,'0');
  assert.equal(s.order,order);
  assert.equal(s.id,`T22V3::ARC510::S${ss}@1`);
  assert.equal(s.moduleId,'ARC510');
  assert(!ids.has(s.id));ids.add(s.id);
  for(const marker of ['Orient.','Define.','Connect.','Explain.','Worked example:','Guided practice:']) assert(s.lesson.includes(marker),s.id+' missing lesson atom '+marker);
  assert(s.lesson.includes('\n'),s.id+' lesson must contain real line breaks');
  assert(!s.lesson.includes('\\n'),s.id+' contains visible escaped-newline serialization');
  assert(s.entryPrerequisites.length>0);
  assert.equal(a.claimEvidence[s.id].length,s.requiredOwnership.length);
  assert.equal(a.coverage[s.id].length,s.requiredOwnership.length);

  const sem=a.semanticSeparationAudit.sessions[s.id];
  assert(sem?.main&&sem?.transfer,s.id+' missing evidence classification');
  assert(allowedClass.has(sem.main.classification));
  assert.equal(sem.transfer.classification,'changed-surface Transfer');
  assert(sem.main.reason.length>30&&sem.transfer.reason.length>30);

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
    assert.equal(id,`T22V3::ARC510::S${ss}-${kind==='main'?'M':'T'}@1`);
    assert(!problemIds.has(id));problemIds.add(id);
    const p=a.problems[id],e=a.evaluators[id];
    assert(p&&e,s.id+' missing '+kind);
    assert.equal(p.order,order);assert.equal(p.kind,kind);
    assert.equal(p.obligationVersion,1,'M11 initial published obligations retain v1 because publication itself does not change public task wording');
    assert(p.prompt.length>=80,id+' prompt too thin');
    assert(e.reference.length>=60,id+' reference too thin');
    assert(e.rubric.length>=1,id+' rubric missing rows');
    assert.equal(e.rubric.reduce((z,r)=>z+r.points,0),10,id+' rubric total');

    const available=priorBase+'\n'+a.sessions.filter(x=>x.order<=s.order).map(x=>x.lesson).join('\n');
    assert(!norm(available).includes(norm(p.prompt)),id+' exact prompt leaked into legal instruction');
    assert(!norm(available).includes(norm(e.reference)),id+' exact reference leaked into legal instruction');
    const ag=grams(available);
    for(const [label,text] of [['prompt',p.prompt],['reference',e.reference]]){
      const overlap=[...grams(text)].filter(g=>ag.has(g));
      assert.equal(overlap.length,0,`${id} ${label} 12-token legal-instruction overlap: ${overlap[0]||''}`);
    }
  }

  for(const ev of a.claimEvidence[s.id]){
    assert(s.requiredOwnership.includes(ev.claim),s.id+' claim must be owned');
    assert(['main','transfer','main+transfer'].includes(ev.task));
    const taskIds=ev.task==='main'?[s.main]:ev.task==='transfer'?[s.transfer]:[s.main,s.transfer];
    const prompts=taskIds.map(id=>a.problems[id].prompt);
    const criteria=taskIds.flatMap(id=>a.evaluators[id].rubric.map(r=>r.criterion));
    for(const p of prompts)assert(ev.publicRequest.includes(p),s.id+' public request missing cited task');
    assert(ev.rubricEvidence.length>=1,s.id+' ownership lacks scored evidence');
    for(const row of ev.rubricEvidence)assert(criteria.includes(row),s.id+' cites non-existent rubric row');
  }
}

assert.match(a.sessions[9].lesson,/Mean Value Theorem/);
assert.match(a.sessions[9].lesson,/continuous on an interval/i);
assert.match(a.problems[a.sessions[9].main].prompt,/continuous on I/);
assert(a.sessions[18].lesson.includes('1/sqrt(x²+1)'));
assert(!/monotone-bounded convergence/i.test(a.sessions[18].lesson),'S19 must not apply the M09 sequence theorem to real T');
assert.match(a.sessions[18].lesson,/sup\{F\(T\):T≥a\}/,'S19 supremum repair missing');
assert.match(a.sessions[5].lesson,/\|f\| is Riemann integrable/i,'S06 |f| closure fact missing');
assert.match(a.sessions[5].lesson,/signed\/net area/i,'S06 area contrast missing');
assert.match(a.sessions[6].lesson,/restriction to every closed subinterval is Riemann integrable/i,'S07 restriction-integrability support missing');
assert(a.problems[a.sessions[18].main].prompt.includes('1/sqrt(x²+4)'),'S19 freshness repair missing');
assert.match(a.initialVersionAudit.s19FreshnessRepair,/duplicated the lesson guided practice/i);
const requiredSources=['MIT-1801-RS','MIT-1801-IMP','OS-52','OS-53','OS-44','OS-55','OS2-31','OS2-37','LEBL-RIEMANN','LEBL-MVT','LEBL-RPROP','IES-WWC','MAA-IPG','PED-JONES','PED-WAGNER','PED-SIGN'];
for(const id of requiredSources)assert(a.sourceLedger.sources.some(s=>s.id===id),'missing M11 source '+id);
const expectedRetrieval=[1,2,5,6,9,13,14,19];
for(const n of expectedRetrieval)assert.equal(a.semanticSeparationAudit.sessions[a.sessions[n-1].id].main.classification,'retrieval','S'+n+' Main freshness is overstated');
assert.equal(a.sessions[1].requiredOwnership[0],'Use a supplied partition, compute its subinterval widths, and verify supplied tags on a bounded interval.');
assert.equal(a.sessions[2].requiredOwnership[0],'Apply the operational tagged-partition criterion for a proper Riemann integral.');
assert.equal(a.sessions[3].requiredOwnership[0],'Show that a bounded single-point value change can preserve a known Riemann integral by bounding its tagged-sum effect.');
assert(a.claimEvidence[a.sessions[16].id][2].rubricEvidence.includes(a.evaluators[a.sessions[16].main].rubric[0].criterion),'S17 infinity-substitution ownership is not mapped to the truncation observer');

const premiseText=a.sessions.map(s=>s.lesson+'\n'+a.evaluators[s.main].reference+'\n'+a.evaluators[s.transfer].reference).join('\n').toLowerCase();
for(const banned of ['taylor series','jacobian','lebesgue integral','differentiation under the integral sign',"l'hôpital","l’hôpital"]){
  assert(!premiseText.includes(banned),'future machinery used as an M11 instructional premise/reference: '+banned);
}

console.log('PASS M11 semantic/evidence validator: design-derived 20 sessions; all observable ownership rows audited; M09+M10+legal-M11 separation clean; protected content preserved; M11 published in the shared route through M12.');
