import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {appendSupplement,registerProbeBank,routingText,routingNotes} from '../js/t22-course/supplements.js';
import {prepareContractHashes,prepareAssessmentFingerprints,emptyEvidence,validateEvidence,moduleEvidenceSummary,evidenceIsCurrent} from '../js/t22-course/core.js';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=x=>createHash('sha256').update(x).digest('hex');
const canonical=x=>Array.isArray(x)?x.map(canonical):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
const digest=x=>sha(JSON.stringify(canonical(x)));
const close=(x,y)=>assert(Math.abs(x-y)<1e-10,`${x} != ${y}`);
const base=read('course/t22/authoring/m06.json'),bridge=read('course/t22/authoring/m06-decision-bridge.json'),probes=read('course/t22/authoring/m01-m05-cumulative-probes.json');
const contracts=read('docs/t22-course/audit/coherence-builder-contracts.json');
function checkBridge(b){
 assert.equal(b.status,'builder-checked-candidate-awaiting-independent-review');
 assert.equal(digest(b),contracts.bridge);
 assert.equal(b.sessions.length,4);assert.equal(Object.keys(b.problems).length,8);
 for(const s of b.sessions){
  assert(s.entryPrerequisites.length);assert.equal(s.requiredOwnership.length,5);
  assert(s.lesson.includes('Worked example:')&&s.lesson.includes('Guided check:'));
  assert.equal(b.claimEvidence[s.id].length,5);
  b.claimEvidence[s.id].forEach((link,i)=>{
   assert.equal(link.claim,s.requiredOwnership[i]);assert.equal(link.publicRequest,b.problems[s[link.task]].prompt);
   assert.deepEqual(link.rubricEvidence,[b.evaluators[s[link.task]].rubric[i].criterion]);
   assert.deepEqual(b.coverage[s.id][i],[link.task]);
  });
  for(const k of ['main','transfer']){
   const p=b.problems[s[k]],ev=b.evaluators[s[k]];
   assert.equal(p.obligationVersion,1);assert.equal(ev.rubric.length,5);assert.equal(ev.rubric.reduce((z,r)=>z+r.points,0),10);
   for(const fragment of b.instructionSeparation[s.id][k]){assert(p.prompt.includes(fragment));assert(!s.lesson.includes(fragment));}
   const m=b.mathModels[s[k]],v=informationValues(m);
   for(const [key,value] of Object.entries(m.expected)){
    if(key==='posterior'){value.forEach((x,i)=>close(v.posterior[i],x));}else close(v[key],value);
   }
  }
 }
}
// One route normalizes each posterior; a second sums joint masses directly.
// Agreement also checks zero-mass reports without defining their conditionals.
function informationValues(m){
 close(m.prior.reduce((z,p)=>z+p,0),1);assert(m.prior.every(p=>p>=0));
 const baseline=Math.max(...m.payoffs.map(row=>row.reduce((z,r,h)=>z+m.prior[h]*r,0)));
 const perfect=m.prior.reduce((z,p,h)=>z+p*Math.max(...m.payoffs.map(row=>row[h])),0);
 const result={baseline,perfect,evpi:perfect-baseline};
 if(m.channel){
  m.channel.forEach(row=>{close(row.reduce((z,p)=>z+p,0),1);assert(row.every(p=>p>=0));});
  const masses=m.channel[0].map((_,s)=>m.prior.reduce((z,p,h)=>z+p*m.channel[h][s],0));
  const normalized=masses.reduce((z,mass,s)=>z+(mass===0?0:mass*Math.max(...m.payoffs.map(row=>row.reduce((v,r,h)=>v+m.prior[h]*m.channel[h][s]/mass*r,0)))),0);
  const direct=masses.reduce((z,_,s)=>z+Math.max(...m.payoffs.map(row=>row.reduce((v,r,h)=>v+m.prior[h]*m.channel[h][s]*r,0))),0);
  close(normalized,direct);assert(direct>=baseline-1e-10&&direct<=perfect+1e-10);
  Object.assign(result,{sample:direct,evsi:direct-baseline});
  if(m.observed!==undefined){const s=m.observed;assert(masses[s]>0);result.signalMass=masses[s];result.posterior=m.prior.map((p,h)=>p*m.channel[h][s]/masses[s]);result.observedValue=Math.max(...m.payoffs.map(row=>row.reduce((z,r,h)=>z+result.posterior[h]*r,0)));}
 }
 return result;
}
checkBridge(bridge);
for(const kind of ['reference','rubric','prompt','model','claim']){
 const b=structuredClone(bridge),s=b.sessions[2];
 if(kind==='reference')b.evaluators[s.main].reference=b.evaluators[s.main].reference.replace('17/10','18/10');
 if(kind==='rubric')b.evaluators[s.main].rubric[0].criterion+=' Incorrect extra condition.';
 if(kind==='prompt')b.problems[s.main].prompt=b.problems[s.main].prompt.replace('3/4','2/3');
 if(kind==='model')b.mathModels[s.main].channel[0][0]=.76;
 if(kind==='claim')b.claimEvidence[s.id][0].task='transfer';
 assert.throws(()=>checkBridge(b),kind+' corruption must not pass as the frozen builder candidate');
}
// Information bounds are exercised at null, perfect and impossible signals.
for(const channel of [[[.5,.5],[.5,.5]],[[1,0],[0,1]],[[1,0],[1,0]]])informationValues({prior:[.4,.6],payoffs:[[10,-6],[0,0]],channel});
const nullV=informationValues({prior:[.4,.6],payoffs:[[10,-6],[0,0]],channel:[[.5,.5],[.5,.5]]});close(nullV.evsi,0);
const perfectV=informationValues({prior:[.4,.6],payoffs:[[10,-6],[0,0]],channel:[[1,0],[0,1]]});close(perfectV.evsi,perfectV.evpi);
assert.equal(digest(probes),contracts.probes);
assert.equal(Object.keys(probes.problems).length,4);
for(const [id,p] of Object.entries(probes.problems)){assert.equal(p.kind,'probe');assert.equal(probes.evaluators[id].rubric.reduce((z,r)=>z+r.points,0),10);assert(probes.probeMeta[id].claimSources.length>=4);}
// Independent finite enumeration cross-checks all four cumulative references.
const report=[2/25,2/25,1/50,9/50],notReport=[1/50,8/25,9/50,3/25];close([...report,...notReport].reduce((a,b)=>a+b),1);close((report[0]+report[1])/report.reduce((a,b)=>a+b),4/9);close(30*4/9-18*5/9,10/3);
for(const x of [0,7/20]){const atoms=[x,7/20-x,11/20-x,1/10+x];assert(atoms.every(x=>x>=0));close(atoms.reduce((a,b)=>a+b),1);}close(7-20*(3/10),1);
const cards=['A1','A2','B','C'];let successes=0,pairs=0;for(const x of cards)for(const y of cards)if(x!==y){pairs++;if(x.startsWith('A')!==y.startsWith('A'))successes++;}assert.equal(pairs,12);assert.equal(successes,8);close(4*successes/pairs-2*(1-successes/pairs),2);
const terminal=[['H',.5],['TH',.5*.25],['TTH',.5*.75*.75],['TTT',.5*.75*.25]];close(terminal.reduce((z,[,p])=>z+p,0),1);close(terminal.reduce((z,[path,p])=>z+p*path.length,0),15/8);close(terminal.reduce((z,[path,p])=>z+p*((path.endsWith('H')?4:-4)-path.length),0),11/8);close(terminal.at(-1)[1],3/32);
// No rewrite or silent loss of historical evidence: original contracts/fingerprints match.
const before={...structuredClone(base),modules:[base.module]};await prepareContractHashes(before);await prepareAssessmentFingerprints(before,base.evaluators);
const combined=appendSupplement(base,bridge);assert.equal(combined.sessions.length,28);assert.deepEqual(combined.sessions.slice(0,24),base.sessions);await prepareContractHashes(combined);await prepareAssessmentFingerprints(combined,combined.evaluators);
for(const s of before.sessions){assert.equal(s.contractHash,combined.sessions.find(x=>x.id===s.id).contractHash);for(const k of ['main','transfer'])assert.equal(before.assessmentFingerprints[s[k]],combined.assessmentFingerprints[s[k]]);}
assert.throws(()=>appendSupplement(combined,bridge));
const m5=read('course/t22/authoring/m05.json'),course={...structuredClone(m5),modules:[m5.module]},keys=structuredClone(m5.evaluators);await prepareContractHashes(course);const oldHashes=course.sessions.map(s=>s.contractHash);await prepareAssessmentFingerprints(course,keys);const oldFP={...course.assessmentFingerprints};registerProbeBank(course,keys,probes);await prepareContractHashes(course);await prepareAssessmentFingerprints(course,keys);assert.deepEqual(course.sessions.map(s=>s.contractHash),oldHashes);for(const [id,h] of Object.entries(oldFP))assert.equal(course.assessmentFingerprints[id],h);
const pid=Object.keys(probes.problems)[0],session=course.sessions.find(s=>s.replacements?.includes(pid)),a={id:'probe-before',problemId:pid,at:'2026-10-07T01:00:00Z',answer:'An original cumulative argument',assistance:'independent',result:'secure',minutes:10,referenceSeenBefore:false,noteSeenDuringAttempt:false,error:'',contractHash:session.contractHash,assessmentFingerprint:course.assessmentFingerprints[pid]};
const state=emptyEvidence();state.attempts.push(a);assert(evidenceIsCurrent(a,course));assert.equal(validateEvidence(state,course).attempts.length,1);assert.equal(moduleEvidenceSummary(course,state).both,0,'Probe does not clear a fixed pair');
const preserve=read('docs/t22-course/audit/coherence-preserved-core.json');for(const [file,h] of Object.entries(preserve.files))assert.equal(sha(fs.readFileSync(file)),h,file+' existing core drift');
const repairs=read('course/t22/extensions/handoff-repairs.json');assert(routingText('Infinite geometric series reserved M09',repairs).includes('M12-S10'));assert(routingText('Unbounded geometric waiting laws until M50',repairs).startsWith('M26'));assert(routingNotes('T22V3::ARC048::S24@1',repairs)[0].includes('M04-S25–S28'));
const deps=read('docs/t22-rebuild/m65.dependencies.json'),old=read('docs/t22-course/audit/coherence-graph-before.json'),by=new Map(deps.modules.map(m=>[m.order,m]));
const additions={6:[5],26:[25],34:[28],42:[39,40,41],49:[16,30,42],50:[28,30,42]};assert.equal(deps.modules.length,65);
for(const m of old.modules){const expected=additions[m.order]?{...m,prerequisites:[...new Set([...m.prerequisites,...(additions[m.order]||[]).map(n=>by.get(n).id)])].sort((a,b)=>deps.modules.find(m=>m.id===a).order-deps.modules.find(m=>m.id===b).order)}:m;assert.deepEqual(by.get(m.order),expected);}
const extensions=read('course/t22/extensions/capability-extensions.json'),extBy=new Map(extensions.extensions.map(e=>[e.id,e])),visiting=new Set(),done=new Set();
function visit(e){assert(!visiting.has(e.id),'Extension cycle');if(done.has(e.id))return;visiting.add(e.id);assert.equal(e.status,'planned-not-authored');assert.equal(by.get(e.ownerOrder).id,e.owner);for(const req of [...e.requires,...(e.advancedRequires||[])]){if(extBy.has(req)){assert(extBy.get(req).ownerOrder<=e.ownerOrder,'Forward extension prerequisite');visit(extBy.get(req));}else{assert(/^M\d\d$/.test(req));assert(Number(req.slice(1))<=e.ownerOrder,'Forward macro prerequisite');}}for(const u of e.units){assert(u.exitTask.length>60);assert.equal(u.evidenceStatus,'task-contract-only-no-learner-evidence');}visiting.delete(e.id);done.add(e.id);}
extensions.extensions.forEach(visit);assert(extBy.get('M53-G').requires.includes('M09-A'));assert(extBy.get('M53-G').units.some(u=>u.exitTask.includes('strong-duality')));assert(extBy.get('M09-U').units.some(u=>u.title.includes('vNM')));
const register=read('docs/t22-rebuild/DEFERRED-COVERAGE.json');assert.equal(register.records.length,245);assert.equal(register.rawOccurrences,558);assert(register.records.every(r=>r.current_owner&&r.scope_resolution&&['scoped-existing-owner','explicit-route-exclusion','implemented-supplement','corrected-handoff','named-extension-obligation','goal-specific-checklist'].includes(r.disposition)));
const pub=read('docs/t22-rebuild/CURRENT-PUBLICATION.json'),meta=read('course/t22/generated/course-meta.json');assert.equal(pub.modules.length,15);for(const m of pub.modules){const source=meta.moduleSources.find(s=>s.id===m.id);if(source.source){const a=read(source.source);assert.equal(m.coreVersion,a.version);assert.equal(m.coreSessionCount,a.sessions.length);assert.equal(m.coreTaskCount,Object.keys(a.problems).length);}}
assert.equal(pub.modules[5].runtimeSessionCount,28);assert.equal(pub.modules[4].coreSessionCount,28);
console.log('PASS coherence repairs: immutable core bytes/evidence; four M06 decision sessions/eight candidate-bound oracles; four cumulative probes without silent clearance; all 245 exact deferral statements; scoped extension DAG; literal prerequisite-edge repair; honest current publication counts.');
