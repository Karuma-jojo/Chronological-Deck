import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const read = p => JSON.parse(fs.readFileSync(p,'utf8'));
const a = read('course/t22/authoring/m10-arc053.json');
const deps = read('docs/t22-rebuild/m65.dependencies.json');
const meta = read('course/t22/generated/course-meta.json');
const baseline = read('docs/t22-course/audit/m10-preserved-baseline.json');
const gate = fs.readFileSync('docs/t22-course/M10-DESIGN-GATE.md','utf8');

function gitBlobSha(path){
  const b=fs.readFileSync(path);
  const header=Buffer.from('blob '+b.length+'\0');
  return createHash('sha1').update(Buffer.concat([header,b])).digest('hex');
}
function norm(x){return String(x||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');}
function grams(x,n=12){
  const t=norm(x).split(' ').filter(Boolean), out=new Set();
  for(let i=0;i+n<=t.length;i++)out.add(t.slice(i,i+n).join(' '));
  return out;
}

assert.equal(a.module.order,10);
assert.equal(a.module.id,'ARC053');
assert.equal(a.module.title,'Derivatives & Local Linearity');
assert.match(a.module.status,/builder-candidate-unpublished/);
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.keys(a.evaluators).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,72);
assert.deepEqual(a.boundary.prerequisiteModules,deps.modules.find(m=>m.id==='ARC053').prerequisites);
assert.match(a.boundary.decisiveProhibition,/do not justify M10 with integration/i);
assert.match(a.boundary.decisiveProhibition,/Taylor/i);
assert.match(a.boundary.decisiveProhibition,/MVT/i);

assert.equal(meta.moduleSources.length,9,'M10 build must not rewrite the accepted nine-module runtime registry');
assert.equal(meta.moduleSources.at(-1).source,'course/t22/authoring/m09.json');
assert(!meta.moduleSources.some(x=>x.order>=10),'M10 remains deliberately unregistered while M01-M09 stop-boundary records are preserved');
assert(!fs.existsSync('course/t22/authoring/m10.json'),'historical M07-M09 stop-boundary path remains absent');
assert(fs.existsSync('course/t22/authoring/m10-arc053.json'));

for(const [path,sha] of Object.entries(baseline.files)){
  assert.equal(gitBlobSha(path),sha,path+' changed during M10-only build');
}

assert.match(gate,/Boundary contract/i);
assert.match(gate,/Concept dependency graph/i);
assert.match(gate,/Conceptual-distinction map/i);
assert.match(gate,/Failure-mode map/i);
assert.match(gate,/Narrative spine/i);
assert.match(gate,/Candidate session boundaries/i);
assert.match(gate,/24 pedagogical atoms/i);

const ids=new Set(), problemIds=new Set();
for(let i=0;i<a.sessions.length;i++){
  const s=a.sessions[i], order=i+1, ss=String(order).padStart(2,'0');
  assert.equal(s.order,order);
  assert.equal(s.id,`T22V3::ARC053::S${ss}@1`);
  assert.equal(s.moduleId,'ARC053');
  assert(!ids.has(s.id)); ids.add(s.id);
  assert(s.lesson.includes('Worked example:'),s.id+' missing worked example');
  assert(s.lesson.includes('Guided practice:'),s.id+' missing guided practice');
  assert(s.entryPrerequisites.length>0);
  assert.equal(s.requiredOwnership.length,3);
  assert.equal(a.coverage[s.id].length,3);
  assert.equal(a.claimEvidence[s.id].length,3);
  assert.equal(a.semanticSeparationAudit.sessions[s.id]!==undefined,true);

  for(const [kind,id] of [['main',s.main],['transfer',s.transfer]]){
    assert.equal(id,`T22V3::ARC053::S${ss}-${kind==='main'?'M':'T'}@1`);
    assert(!problemIds.has(id)); problemIds.add(id);
    const p=a.problems[id], e=a.evaluators[id];
    assert(p&&e,s.id+' missing '+kind);
    assert.equal(p.order,order); assert.equal(p.kind,kind); assert.equal(p.obligationVersion,1);
    assert(p.prompt.length>=80,id+' prompt too thin');
    assert(e.reference.length>=60,id+' reference too thin');
    assert.equal(e.rubric.reduce((z,r)=>z+r.points,0),10,id+' rubric must total 10');
    assert.equal(e.rubric.length,3,id+' rubric rows');
  }

  const availableLessons=a.sessions.filter(x=>x.order<=s.order).map(x=>x.lesson).join('\n');
  const lessonGrams=grams(availableLessons);
  for(const id of [s.main,s.transfer]){
    const p=a.problems[id],e=a.evaluators[id];
    assert(!norm(availableLessons).includes(norm(p.prompt)),id+' exact prompt leaked into instruction');
    assert(!norm(availableLessons).includes(norm(e.reference)),id+' exact reference leaked into instruction');
    for(const [label,text] of [['prompt',p.prompt],['reference',e.reference]]){
      const overlap=[...grams(text)].filter(g=>lessonGrams.has(g));
      assert.equal(overlap.length,0,`${id} ${label} has 12-token instruction overlap: ${overlap[0]||''}`);
    }
  }

  for(const c of a.claimEvidence[s.id]){
    assert(s.requiredOwnership.includes(c.claim),s.id+' claim must be owned');
    const tasks=c.task==='main'?[s.main]:c.task==='transfer'?[s.transfer]:[s.main,s.transfer];
    const prompts=tasks.map(id=>a.problems[id].prompt);
    const criteria=tasks.flatMap(id=>a.evaluators[id].rubric.map(r=>r.criterion));
    assert(prompts.some(p=>c.publicRequest.includes(p)),s.id+' claim public request must expose its task');
    for(const r of c.rubricEvidence)assert(criteria.includes(r),s.id+' claim rubric mapping must be exact');
  }
}

const requiredSources=['MIT-1801-DIFF','MIT-1801-RATE','OS-31','OS-32','OS-33','OS-35','OS-36','OS-37','OS-38','OS-39','LEBL-41','MIT-18014','IES-WWC'];
for(const id of requiredSources)assert(a.sourceLedger.sources.some(s=>s.id===id),'missing source '+id);

const lessons=a.sessions.map(s=>s.lesson.toLowerCase()).join('\n');
for(const banned of ['mean value theorem',"l'hopital","l’hopital","newton's method",'jacobian','hessian']){
  assert(!lessons.includes(banned),'future premise leaked into M10 lesson: '+banned);
}
assert(a.sessions[15].lesson.includes('sin h/h→1'),'S16 must reactivate M09 trig limit');
assert(a.sessions[13].lesson.includes('never divides by g(a+h)-g(a)'),'S14 chain proof must avoid unsafe inner-increment division');
assert(a.sessions[17].lesson.includes("f'(b)≠0"),'S18 inverse theorem must expose nonzero forward slope');
assert(a.sessions[18].lesson.includes('differentiable local branch'),'S19 implicit work must remain conditional on a local branch');
assert(a.sessions[19].lesson.includes('lim(h→0)(e^h-1)/h=1'),'S20 must state the natural-exponential normalization');
assert(a.sessions[6].lesson.includes('r(h)/h'),'S07 must own scaled-remainder local linearity');

console.log('PASS M10 structural/pedagogy: 24 sessions, 48 fixed tasks/evaluators, 72 ownership links; global 12-token instruction separation; M01-M09/runtime blobs preserved; M10 intentionally unregistered.');
