import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const canonical=x=>Array.isArray(x)?x.map(canonical):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
export const digest=x=>crypto.createHash('sha256').update(JSON.stringify(canonical(x))).digest('hex');
export function reviewPayload(a,s){return {session:s,tasks:Object.fromEntries(['main','transfer'].map(k=>[k,{problem:a.problems[s[k]],evaluator:a.evaluators[s[k]]}])),claims:a.claimEvidence[s.id],coverage:a.coverage[s.id],separation:a.semanticSeparationAudit.sessions[s.id]};}
export function checkModule(a){
 const reviewed=JSON.parse(fs.readFileSync('docs/t22-course/audit/m05-m06-reviewed-contracts.json','utf8')).modules[a.module.id];
 assert(reviewed,'Module must have a bounded semantic review');
 for(const s of a.sessions){
  const rec=reviewed.sessions[s.id];assert(rec,`Unreviewed session ${s.id}`);
  assert.equal(digest(reviewPayload(a,s)),rec.reviewHash,`Semantic review stale: ${s.id}; reread public tasks, rubric rows and instruction before updating the review record`);
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
