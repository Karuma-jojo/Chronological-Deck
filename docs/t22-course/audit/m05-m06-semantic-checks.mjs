import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const canonical=x=>Array.isArray(x)?x.map(canonical):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
export const digest=x=>crypto.createHash('sha256').update(JSON.stringify(canonical(x))).digest('hex');
export function reviewPayload(a,s){return {session:s,tasks:Object.fromEntries(['main','transfer'].map(k=>[k,{problem:a.problems[s[k]],evaluator:a.evaluators[s[k]]}])),claims:a.claimEvidence[s.id],coverage:a.coverage[s.id],separation:a.semanticSeparationAudit.sessions[s.id]};}

function checkCandidateV2(a,reviewed){
 assert(['m05-authoring-v2-independent-review-repair-r1','m05-authoring-v2.1-whole-curriculum-candidate'].includes(a.version));
 const expanded=a.version==='m05-authoring-v2.1-whole-curriculum-candidate',taskCount=expanded?56:48,sessionCount=expanded?28:24;
 assert(a.sourceLedger?.length>=10,'M05 v2 source ledger missing');
 assert.equal(Object.keys(a.evidenceDistance?.items||{}).length,taskCount,'M05 v2 evidence-distance ledger must cover48 tasks');
 assert.equal(Object.keys(a.wrongSolverAudit?.sessions||{}).length,sessionCount,'M05 v2 wrong-solver audit must cover24 sessions');
 assert(Array.isArray(a.representationProgression)&&a.representationProgression.length>=15,'M05 v2 representation progression missing');
 assert(a.independentReviewRepairAudit?.findings?.length===8,'M05 independent-review repair ledger missing');
 for(const s of a.sessions){
  assert.equal(s.requiredOwnership.length,5,'M05 v2 '+s.id+' claim count');
  const evs=a.claimEvidence[s.id];assert.equal(evs.length,5,'M05 v2 '+s.id+' claim evidence');
  evs.forEach((e,i)=>{
   assert.equal(e.claim,s.requiredOwnership[i],'M05 v2 claim text drift '+s.id+' #'+(i+1));
   assert(['main','transfer'].includes(e.task),'M05 v2 invalid task link '+s.id);
   assert.equal(e.publicRequest,a.problems[s[e.task]].prompt,'M05 v2 public request drift '+s.id);
   assert(e.rubricEvidence.length>0,'M05 v2 empty rubric observer '+s.id);
   const criteria=a.evaluators[s[e.task]].rubric.map(r=>r.criterion);
   assert(e.rubricEvidence.every(c=>criteria.includes(c)),'M05 v2 nonexistent rubric observer '+s.id);
   assert.deepEqual(a.coverage[s.id][i],[e.task],'M05 v2 coverage drift '+s.id);
  });
  for(const k of ['main','transfer']){
   const pid=s[k],p=a.problems[pid],ev=a.evaluators[pid];
   assert([1,2,3,4,5].includes(p.obligationVersion),'M05 v2 obligation version '+pid);
   assert.equal(ev.rubric.length,5,'M05 v2 rubric length '+pid);
   assert.equal(ev.rubric.reduce((z,r)=>z+r.points,0),10,'M05 v2 rubric total '+pid);
   assert(a.evidenceDistance.items[pid],'M05 v2 missing evidence distance '+pid);
  }
  assert(a.semanticSeparationAudit.sessions[s.id],'M05 v2 missing semantic separation '+s.id);
  assert(a.wrongSolverAudit.sessions[s.id],'M05 v2 missing wrong solver '+s.id);
 }
 // Historical reviewed baseline remains available for provenance/browser migration tests,
 // but it is not misrepresented as independent review of this rebuilt candidate.
 if(expanded){const pinned=JSON.parse(fs.readFileSync('docs/t22-course/audit/m05-v2.1-builder-contracts.json'));assert.equal(pinned.version,a.version);assert.equal(pinned.status,'builder-audited-candidate-awaiting-independent-review');assert.equal(Object.keys(pinned.sessions).length,28);for(const s of a.sessions)assert.equal(digest(reviewPayload(a,s)),pinned.sessions[s.id],'Builder semantic contract stale: '+s.id);}
 return {...reviewed,candidateV2:true};
}

export function checkModule(a){
 const reviewed=JSON.parse(fs.readFileSync('docs/t22-course/audit/m05-m06-reviewed-contracts.json','utf8')).modules[a.module.id];
 assert(reviewed,'Module must have a bounded semantic review/baseline');
 if(a.module.id==='T22E-TRD01'&&['m05-authoring-v2-independent-review-repair-r1','m05-authoring-v2.1-whole-curriculum-candidate'].includes(a.version))return checkCandidateV2(a,reviewed);
 for(const s of a.sessions){
  const rec=reviewed.sessions[s.id];assert(rec,'Unreviewed session '+s.id);
  assert.equal(digest(reviewPayload(a,s)),rec.reviewHash,'Semantic review stale: '+s.id+'; reread public tasks, rubric rows and instruction before updating the review record');
  a.claimEvidence[s.id].forEach((e,i)=>{
   assert.equal(e.claim,s.requiredOwnership[i]);
   assert(['main','transfer'].includes(e.task));
   assert.equal(e.publicRequest,a.problems[s[e.task]].prompt);
   assert(e.rubricEvidence.length>0);
   const criteria=a.evaluators[s[e.task]].rubric.map(r=>r.criterion);
   assert(e.rubricEvidence.every(c=>criteria.includes(c)));
   assert.deepEqual(e.rubricEvidence,rec.links[i].rows.map(r=>criteria[r-1]));
   assert.equal(e.task,rec.links[i].task);
   assert.deepEqual(a.coverage[s.id][i],[e.task]);
  });
  for(const k of ['main','transfer'])assert.equal(a.problems[s[k]].obligationVersion,rec.obligationVersions[k]);
 }
 return reviewed;
}
