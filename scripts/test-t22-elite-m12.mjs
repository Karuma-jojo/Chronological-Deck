import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m12-side267.json');
const m09=read('course/t22/authoring/m09.json');
const m10=read('course/t22/authoring/m10-arc053.json');
const deps=read('docs/t22-rebuild/m65.dependencies.json');
const ledger=read('docs/t22-rebuild/SEMANTIC-PREREQUISITES.json');
const meta=read('course/t22/generated/course-meta.json');
const baseline=read('docs/t22-course/audit/m12-preserved-baseline.json');
const contract=read('docs/t22-course/audit/m12-semantic-contract.json');
const gate=fs.readFileSync('docs/t22-course/M12-DESIGN-GATE.md','utf8');
const pilot=fs.readFileSync('docs/t22-course/M12-PILOT-REVIEW.md','utf8');

function gitBlobSha(path){
  const b=fs.readFileSync(path);
  return createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
}
function norm(x){return String(x||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');}
function grams(x,n=14){
  const t=norm(x).split(' ').filter(Boolean),out=new Set();
  for(let i=0;i+n<=t.length;i++)out.add(t.slice(i,i+n).join(' '));
  return out;
}
const allowedClass=new Set(['retrieval','proof reconstruction','fresh Main evidence','changed-surface Transfer']);

// Canonical identity / boundary.
assert.equal(a.module.order,12);
assert.equal(a.module.id,'SIDE267');
assert.equal(a.module.title,'Taylor Approximation, Asymptotics & Error');
assert.match(a.module.status,/unpublished/);
assert.equal(a.sessions.length,19,'M12 session count must remain design-derived');
assert.equal(Object.keys(a.problems).length,38);
assert.equal(Object.keys(a.evaluators).length,38);
assert.deepEqual(a.boundary.prerequisiteModules,['SIDE263','ARC053']);
assert.deepEqual(a.boundary.prerequisiteModules,deps.modules.find(m=>m.id==='SIDE267').prerequisites);
assert(!a.boundary.prerequisiteModules.includes('ARC510'),'M11 is chronologically prior but not a formal M12 prerequisite');
assert.match(a.boundary.decisiveProhibition,/one-variable|deterministic/i);
assert.match(a.boundary.decisiveProhibition,/multivariable|probability|numerical/i);
assert.match(a.module.gate,/19 design-derived sessions/i);
assert.match(a.module.gate,/unpublished/i);
assert.match(a.module.nextBoundary,/M13/i);

// Shared learner registry remains frozen at M09.
assert.equal(meta.moduleSources.length,9,'M12 must not publish itself into the learner registry');
assert.equal(meta.moduleSources.at(-1).source,'course/t22/authoring/m09.json');
assert(!meta.moduleSources.some(x=>x.order>=10),'M10-M12 must remain deliberately unregistered');

// Protected M01-M11/runtime baseline.
for(const [path,sha] of Object.entries(baseline.files))assert.equal(gitBlobSha(path),sha,path+' changed during M12-only work');

// Gate-3 artifacts and pilot.
for(const heading of [
  'Boundary Contract','Source Dossier','Support-Theorem Ledger','Concept Dependency Graph',
  'Conceptual-Distinction Map','Misconception / Failure-Mode Map','Representation Progression Map',
  'Downstream Obligation Map','Narrative Spine','Candidate Pedagogical Atoms',
  'Split/Merge Justification','Candidate Session Architecture'
]) assert.match(gate,new RegExp(heading.replace(/[\/\-]/g,'.?'),'i'),'design gate missing '+heading);
assert.match(gate,/19 candidate learner-state transitions/i);
assert.match(gate,/Pilot selected: S06/i);
assert.match(pilot,/PASS_WITH_EVIDENCE/i);
for(const g of ['Gate 4','Gate 5','Gate 6','Gate 7','Gate 8'])assert.match(pilot,new RegExp(g),'pilot receipt missing '+g);

// Semantic ledger bridges are visible.
const led=ledger.entries.find(x=>x.id==='SIDE267');
assert.equal(led.semanticStatus,'boundary-accepted-content-candidate');
assert(led.bridges.some(b=>b.id==='M12-B01'&&/partial-sum/i.test(b.content)),'series bridge missing');
assert(led.bridges.some(b=>b.id==='M12-B02'&&/Rolle|MVT/i.test(b.content)),'MVT support bridge missing');

// Source-role stack.
const requiredSources=['REPO-M12','MIT-1801-TAY','OS2-52','OS2-61','OS2-63','LEBL-TAYLOR','SPIVAK-20','DLMF-21','MAA-IPG','IES-WWC','PED-SMITH','PED-VISUAL','HAIRER-ADV'];
for(const id of requiredSources)assert(a.sourceLedger.sources.some(s=>s.id===id),'missing M12 source '+id);
assert.match(a.sourceLedger.sources.find(s=>s.id==='HAIRER-ADV').notImported,/regularity structures|SPDE/i,'Hairer must be a non-import boundary comparator');
assert.match(a.sourceLedger.sources.find(s=>s.id==='PED-SMITH').limitations,/physics|population|sample/i,'pedagogy population limitation missing');

// Contract snapshot.
const claimCount=Object.values(a.claimEvidence).flat().length;
assert.equal(claimCount,58);
assert.equal(a.coverageAudit.ownershipClaimCount,claimCount);
assert.equal(contract.ownershipClaimCount,claimCount);
assert.equal(contract.sessions.length,19);
assert.deepEqual(new Set(contract.evidenceClasses),allowedClass);
assert.equal(contract.unpublished,true);

const priorBase=m09.sessions.map(s=>s.lesson).join('\n')+'\n'+m10.sessions.map(s=>s.lesson).join('\n');
const ids=new Set(),problemIds=new Set();
function validateClaim(s,ev){
  assert(s.requiredOwnership.includes(ev.claim),s.id+' claim must exactly match owned capability');
  assert(['main','transfer','main+transfer'].includes(ev.task));
  const taskIds=ev.task==='main'?[s.main]:ev.task==='transfer'?[s.transfer]:[s.main,s.transfer];
  assert.deepEqual(ev.taskIds,taskIds,s.id+' exact taskIds drift');
  assert.equal(ev.publicRequestExact.length,taskIds.length);
  for(let i=0;i<taskIds.length;i++)assert.equal(ev.publicRequestExact[i],a.problems[taskIds[i]].prompt,s.id+' exact public request drift');
  const availableCriteria=taskIds.flatMap(id=>a.evaluators[id].rubric.map(r=>r.criterion));
  assert(ev.rubricEvidence.length>=1,s.id+' ownership lacks exact rubric evidence');
  for(const row of ev.rubricEvidence)assert(availableCriteria.includes(row),s.id+' cites non-existent rubric criterion: '+row);
  assert(ev.why?.length>15&&ev.escapeAttempt?.length>15&&ev.disposition==='adequate',s.id+' weak semantic evidence receipt');
}

for(let i=0;i<a.sessions.length;i++){
  const s=a.sessions[i],order=i+1,ss=String(order).padStart(2,'0');
  assert.equal(s.order,order);
  assert.equal(s.id,`T22V3::SIDE267::S${ss}@1`);
  assert.equal(s.moduleId,'SIDE267');
  assert(!ids.has(s.id));ids.add(s.id);
  assert.equal(s.main,`T22V3::SIDE267::S${ss}-M@1`);
  assert.equal(s.transfer,`T22V3::SIDE267::S${ss}-T@1`);
  assert(s.lesson.length>=700,s.id+' lesson too thin');
  assert(s.lesson.includes('\n'),s.id+' lesson must contain real line breaks');
  assert(!s.lesson.includes('\\n'),s.id+' contains visible escaped-newline serialization');
  assert.match(s.lesson,/Worked (example|context|audit|synthesis)[.:]/i,s.id+' lacks a solved worked stage');
  assert.match(s.lesson,/Guided (practice|synthesis)[.:]/i,s.id+' lacks guided practice');
  assert.match(s.lesson,/Distinction check|Boundary\.|Final distinction\./i,s.id+' lacks explicit distinction/boundary check');
  assert(s.entryPrerequisites.length>0);
  assert.equal(a.claimEvidence[s.id].length,s.requiredOwnership.length);
  assert.equal(a.coverage[s.id].length,s.requiredOwnership.length);

  const sem=a.semanticSeparationAudit.sessions[s.id];
  assert(sem?.main&&sem?.transfer,s.id+' missing evidence classification');
  assert(allowedClass.has(sem.main.classification));
  assert.equal(sem.transfer.classification,'changed-surface Transfer');
  assert(sem.main.reason.length>35&&sem.transfer.reason.length>35);
  assert.deepEqual(a.evidenceDistance[s.id],sem);

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
    assert(!problemIds.has(id));problemIds.add(id);
    const p=a.problems[id],e=a.evaluators[id];
    assert(p&&e,s.id+' missing '+kind);
    assert.equal(p.order,order);assert.equal(p.kind,kind);assert.equal(p.obligationVersion,1);
    assert(p.prompt.length>=90,id+' prompt too thin');
    assert(e.reference.length>=80,id+' reference too thin');
    assert(e.rubric.length>=2,id+' rubric too thin');
    assert.equal(e.rubric.reduce((z,r)=>z+r.points,0),10,id+' rubric total must be 10');

    const available=priorBase+'\n'+a.sessions.filter(x=>x.order<=s.order).map(x=>x.lesson).join('\n');
    assert(!norm(available).includes(norm(p.prompt)),id+' exact prompt leaked into instruction');
    assert(!norm(available).includes(norm(e.reference)),id+' exact reference leaked into instruction');
    const ag=grams(available);
    for(const [label,text] of [['prompt',p.prompt],['reference',e.reference]]){
      const overlap=[...grams(text)].find(g=>ag.has(g));
      assert(!overlap,`${id} ${label} 14-token legal-instruction overlap: ${overlap||''}`);
    }
  }
  for(const ev of a.claimEvidence[s.id])validateClaim(s,ev);
}

// Mutation guard: reviewed claim mapping must reject a fake-but-existing criterion.
{
  const s=a.sessions[0], good=a.claimEvidence[s.id][0];
  const bad=structuredClone(good);
  bad.rubricEvidence=[a.evaluators[s.transfer].rubric[0].criterion];
  let rejected=false;try{validateClaim(s,bad);}catch{rejected=true;}
  assert(rejected,'semantic mutation guard failed to reject criterion from wrong task');
}

// Required conceptual protections.
assert.match(a.sessions[1].lesson,/factorial|k!/i,'S02 factorial derivation missing');
assert.match(a.sessions[2].lesson,/Maclaurin.*special center|Maclaurin.*a=0/i,'arbitrary-center protection missing');
assert.match(a.sessions[4].lesson,/Rolle/i);assert.match(a.sessions[4].lesson,/Mean Value|MVT/i);
assert.match(a.sessions[5].lesson,/Lagrange/i);assert.match(a.sessions[5].lesson,/point c is supplied|c strictly between|unknown intermediate/i);
assert.match(a.sessions[7].lesson,/O\(h\^k\)|O and o|little-o/i);
assert.match(a.sessions[8].lesson,/ratio.*1|f\/g.*1|asymptotic/i);
assert.match(a.sessions[9].lesson,/partial sums/i);
assert.match(a.sessions[10].lesson,/power series/i);
assert.match(a.sessions[11].lesson,/candidate/i);
assert.match(a.sessions[13].lesson,/R_n.*0|remainder.*0/i);
assert.match(a.sessions[14].purpose,/documented gap|recognizing|generating/i);
assert.match(a.sessions[16].lesson,/analytic/i);
assert.match(a.sessions[16].lesson,/converges.*wrong function|wrong function/i);
assert.match(a.sessions[18].lesson,/O\/o|series representation|remainder/i);

// Honest Main evidence classes.
const expected={
 1:'retrieval',2:'retrieval',3:'retrieval',4:'retrieval',
 5:'proof reconstruction',6:'proof reconstruction',7:'retrieval',8:'retrieval',9:'retrieval',
 10:'proof reconstruction',11:'retrieval',12:'retrieval',13:'retrieval',14:'proof reconstruction',
 15:'fresh Main evidence',16:'fresh Main evidence',17:'proof reconstruction',18:'fresh Main evidence',19:'fresh Main evidence'
};
for(const [n,cls] of Object.entries(expected))assert.equal(a.semanticSeparationAudit.sessions[a.sessions[Number(n)-1].id].main.classification,cls,'S'+n+' Main evidence distance drift');

// Future machinery may be named only in explicit boundary metadata, not used as lesson/reference premises.
const premiseText=a.sessions.map(s=>s.lesson+'\n'+a.evaluators[s.main].reference+'\n'+a.evaluators[s.transfer].reference).join('\n').toLowerCase();
for(const banned of ['jacobian','hessian','regularity structure','renormalization','ito calculus','central limit theorem','newton method','quasi-newton','analytic continuation']){
  assert(!premiseText.includes(banned),'future machinery used as an M12 premise/reference: '+banned);
}

// Canonical state: no pilot/candidate-pending language inside mathematical ownership.
assert(!a.boundary.owns.join(' ').toLowerCase().includes('pilot'));
assert(!/s06 is the required pilot|candidate sessions pending/i.test(a.module.gate));

console.log('PASS M12 semantic/evidence validator: 19 design-derived sessions, 38 tasks, 58 literal ownership links; series/MVT bridges explicit; source roles complete; prior runtime preserved; M12 remains unpublished.');
