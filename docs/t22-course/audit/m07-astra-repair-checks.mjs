import fs from 'node:fs';
import assert from 'node:assert/strict';
import {emptyEvidence,prepareContractHashes,prepareAssessmentFingerprints,evidenceIsCurrent,
  migrateHistoricalLessonAnswerExposure,mergeEvidence,validateEvidence,moduleEvidenceSummary} from '../../../js/t22-course/core.js';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const a=read('course/t22/authoring/m07.json');
const semantic=read('docs/t22-course/audit/m07-semantic-contract.json');
const baseline=read('docs/t22-course/audit/m07-review-baseline.json');
const by=n=>a.sessions[n-1];
const oldInstruction='m07-instruction-v1-cerberus';
const preAt='2026-09-24T00:30:00.000Z',seenAt='2026-09-24T01:00:00.000Z',postAt='2026-09-24T02:00:00.000Z',newAt='2026-09-24T03:00:00.000Z';

assert.equal(a.version,'m07-authoring-astra-r1');
assert.equal(a.instructionVersion,'m07-instruction-astra-r1');
assert.equal(a.module.status,'authored-astra-repaired-awaiting-independent-followup');
assert.equal(semantic.version,'m07-semantic-contract-astra-r1-2026-09-24');
assert.equal(Object.keys(semantic.sessions).length,24);
assert.equal(a.sessions.length,24);
assert.equal(Object.keys(a.problems).length,48);
assert.equal(Object.values(a.claimEvidence).flat().length,120);

function checkSemantic(pack){
 for(let n=1;n<=24;n++){
  const s=pack.sessions[n-1],rec=semantic.sessions[String(n).padStart(2,'0')];
  assert(rec&&rec.links.length===5);
  assert.equal(s.requiredOwnership.length,5);
  assert.equal(pack.claimEvidence[s.id].length,5);
  for(let i=0;i<5;i++){
   const link=rec.links[i],row=pack.claimEvidence[s.id][i],pid=s[link.task];
   assert.equal(row.claim,s.requiredOwnership[i],`S${n} C${i+1} claim drift`);
   assert.equal(row.task,link.task,`S${n} C${i+1} task drift`);
   assert.equal(row.publicRequest,pack.problems[pid].prompt,`S${n} C${i+1} public-request drift`);
   const expected=link.rows.map(r=>pack.evaluators[pid].rubric[r-1].criterion);
   assert.deepEqual(row.rubricEvidence,expected,`S${n} C${i+1} semantic rubric drift`);
   assert.deepEqual(pack.coverage[s.id][i],[link.task],`S${n} C${i+1} coverage direction drift`);
  }
 }
}
checkSemantic(a);

// Mutation sensitivity: a wrong criterion that still exists in the evaluator must fail.
{
 const mutant=structuredClone(a),s=mutant.sessions[15]; // S16 C2 is Transfer-owned.
 mutant.claimEvidence[s.id][1].rubricEvidence=[mutant.evaluators[s.transfer].rubric[1].criterion];
 assert.throws(()=>checkSemantic(mutant),/semantic rubric drift/);
}
{
 const mutant=structuredClone(a),s=mutant.sessions[21]; // S22 C4 exact-close evidence.
 mutant.claimEvidence[s.id][3].task='main';
 mutant.claimEvidence[s.id][3].publicRequest=mutant.problems[s.main].prompt;
 mutant.claimEvidence[s.id][3].rubricEvidence=[mutant.evaluators[s.main].rubric[3].criterion];
 mutant.coverage[s.id][3]=['main'];
 assert.throws(()=>checkSemantic(mutant),/task drift/);
}

// Current instruction must be clean of the reviewed solved/practice instances.
assert(!by(7).lesson.includes('R=−.20')&&!by(7).lesson.includes('g=ln.8.'),'S07 current instruction must not solve the legacy S07-M inverse-conversion pair');
assert(!by(16).lesson.includes('50.8/ask51.1')&&!by(16).lesson.includes('50.80'),'S16 current instruction must not rehearse S16-T data');
assert(!by(17).lesson.includes('buy order100')&&!by(17).lesson.includes('fill30, then20'),'S17 current instruction must not solve S17-M');
assert(!by(3).lesson.includes('80→92'),'S03 current practice must not overlap S04-M data');

// Novice terminology bridges.
assert(by(10).lesson.includes('to cover means buying those units back'));
assert(by(10).lesson.includes('initial sale receipts')&&by(10).lesson.includes('repurchase cost'));
assert(!by(10).requiredOwnership[4].includes('recalls'));
assert(by(9).lesson.includes('not itself a sale or a cash receipt'));
assert(by(12).lesson.includes('not a new cash event'));
assert(by(23).lesson.includes('cash does not change merely because the mark changed'));

// Prompt/rubric fairness and ambiguity repairs.
assert.equal(a.problems[by(7).main].obligationVersion,2);
assert.equal(a.evaluators[by(7).main].rubric[3].criterion,'Domain R>−1 for strictly positive prices is stated correctly.');
assert(a.problems[by(15).transfer].prompt.includes('all8 units at49.80'));
assert(a.sessions[14].lesson.includes('all10 units at30.08'));
assert(a.problems[by(17).main].prompt.includes('After each fill, compute cumulative filled quantity, remaining working quantity and signed position'));
assert(a.problems[by(24).main].prompt.includes('First diagnose whether it is immediately marketable'));

// Stronger Transfers: diagnosis/reconstruction rather than same-form number swaps.
assert(a.problems[by(19).transfer].prompt.includes('Audit the ledger from the raw fills'));
assert(a.problems[by(19).transfer].prompt.includes('average entry49.00'));
assert(a.problems[by(21).transfer].prompt.includes('Audit the decomposition'));
assert(a.problems[by(21).transfer].prompt.includes('commissions are already inside that spread'));
assert(a.problems[by(24).transfer].prompt.includes('draft ledger'));
assert(a.problems[by(24).transfer].prompt.includes('identify the draft errors'));

// Exact-close capability is now independently demonstrated.
assert(a.problems[by(22).transfer].prompt.includes('sell5'));
assert(a.evaluators[by(22).transfer].rubric[2].criterion.includes('exactly to0'));

// Versioning against Astra's historical baseline.
const changed=new Set(a.repairVersionAudit.changedAssessmentIds);
assert.equal(changed.size,10);
for(const ss of a.sessions)ss.instructionVersion=a.instructionVersion;
await prepareContractHashes(a);
await prepareAssessmentFingerprints(a,a.evaluators);
for(const ss of a.sessions)for(const kind of ['main','transfer']){
 const pid=ss[kind],isChanged=changed.has(pid);
 assert.equal(a.problems[pid].obligationVersion,isChanged?2:1,pid);
 assert.equal(a.assessmentFingerprints[pid]!==baseline.assessmentFingerprints[pid],isChanged,pid);
 const prior={id:'prior-'+pid,problemId:pid,at:preAt,answer:'Historical saved work',assistance:'independent',minutes:5,result:'secure',error:'',
   referenceSeenBefore:false,noteSeenDuringAttempt:false,contractHash:baseline.contractHashes[ss.id],assessmentFingerprint:baseline.assessmentFingerprints[pid]};
 assert.equal(evidenceIsCurrent(prior,a),!isChanged&&ss.contractHash===baseline.contractHashes[ss.id],pid);
 const round=validateEvidence({...emptyEvidence(),attempts:[prior]},a);
 assert.equal(round.attempts.length,1,'Old evidence must be retained even when stale');
}
const cleanupContracts=new Set(a.crossModulePrerequisiteCleanup?.changedContractSessionIds||[]);
for(const ss of a.sessions){
 const shouldChange=a.repairVersionAudit.changedContractSessionIds.includes(ss.id)||cleanupContracts.has(ss.id);
 assert.equal(ss.contractHash!==baseline.contractHashes[ss.id],shouldChange,`contract hash ${ss.id}`);
}

// Historical solved exposure: pre-exposure work survives; later work cannot qualify.
// New clean instruction cannot erase legacy exposure, regardless of merge order.
const make=(pid,at,id)=>{const ss=a.sessions.find(x=>x.main===pid||x.transfer===pid);return {
 id,problemId:pid,at,answer:'Synthetic saved independent work',assistance:'independent',minutes:5,result:'secure',error:'',
 referenceSeenBefore:false,noteSeenDuringAttempt:false,contractHash:ss.contractHash,assessmentFingerprint:a.assessmentFingerprints[pid]
};};
let solvedLinks=0;
for(const [sourceId,targets] of Object.entries(a.historicalLessonAnswerOverlap.sessions)){
 const source=a.sessions.find(x=>x.id===sourceId);
 const oldExposure={firstSeen:seenAt,lastSeen:seenAt,views:1,lessonSeenAt:seenAt,lessonContentVersion:oldInstruction};
 const state={...emptyEvidence(),exposures:{[source.main]:oldExposure}};
 for(const pid of targets){state.attempts.push(make(pid,preAt,'pre-'+pid));solvedLinks++;}
 assert(migrateHistoricalLessonAnswerExposure(state,a));
 for(const pid of targets){
  assert.equal(state.exposures[pid].referenceSeenAt,seenAt);
  const target=a.sessions.find(x=>x.main===pid||x.transfer===pid),kind=target.main===pid?'main':'transfer';
  assert.equal(moduleEvidenceSummary(a,state).sessions.find(x=>x.sessionId===target.id)[kind],true,'Pre-exposure evidence should retain historical eligibility');
  const after={...state,attempts:[make(pid,postAt,'post-'+pid)]};
  assert.equal(moduleEvidenceSummary(a,after).sessions.find(x=>x.sessionId===target.id)[kind],false,'Post-exposure work must not qualify independently');
 }
 assert.equal(migrateHistoricalLessonAnswerExposure(state,a),false,'Migration must be idempotent');
 const clean={...emptyEvidence(),exposures:{[source.main]:{firstSeen:newAt,lastSeen:newAt,views:1,lessonSeenAt:newAt,lessonContentVersion:a.instructionVersion}}};
 assert.equal(migrateHistoricalLessonAnswerExposure(clean,a),false,'Current clean lesson is not solved-answer exposure');
 for(const pair of [[clean,{...emptyEvidence(),exposures:{[source.main]:oldExposure}}],[{...emptyEvidence(),exposures:{[source.main]:oldExposure}},clean]]){
  const merged=mergeEvidence(...pair,a);
  for(const pid of targets)assert.equal(merged.exposures[pid].referenceSeenAt,seenAt,'Import order must not erase historical solved exposure');
  assert.deepEqual(validateEvidence(JSON.parse(JSON.stringify(merged)),a),merged);
 }
}
assert.equal(solvedLinks,3);

// S03→S04 is recorded practice overlap, not a fabricated answer reveal.
for(const [sourceId,targets] of Object.entries(a.historicalGuidedPracticeOverlap.sessions)){
 const source=a.sessions.find(x=>x.id===sourceId);
 const state={...emptyEvidence(),exposures:{[source.main]:{firstSeen:seenAt,lastSeen:seenAt,views:1,lessonSeenAt:seenAt,lessonContentVersion:oldInstruction}}};
 migrateHistoricalLessonAnswerExposure(state,a);
 for(const pid of targets)assert.equal(state.exposures[pid]?.referenceSeenAt,undefined,'Unsolved guided practice must not fabricate reference exposure');
}

assert(fs.existsSync('course/t22/authoring/m08.json'),'M08 is now explicitly authorized after the recorded M07 repair checkpoint');
console.log('PASS M07 Astra repair: semantic mutation contract, clean instruction, 10 versioned assessments, 5 ownership-contract changes, 3 solved-exposure links, guided-only S03→S04 overlap, novice bridges, stronger Transfers; historical M08 stop is superseded only by explicit later authorization.');
