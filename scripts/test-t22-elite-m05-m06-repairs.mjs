import fs from 'node:fs';import assert from 'node:assert/strict';
import {checkModule} from '../docs/t22-course/audit/m05-m06-semantic-checks.mjs';
import {emptyEvidence,prepareContractHashes,prepareAssessmentFingerprints,evidenceIsCurrent,migrateHistoricalLessonAnswerExposure,mergeEvidence,validateEvidence,moduleEvidenceSummary} from '../js/t22-course/core.js';
const read=p=>JSON.parse(fs.readFileSync(p));
const preAt='2026-09-18T06:00:00.000Z',seenAt='2026-09-18T07:00:00.000Z',postAt='2026-09-18T08:00:00.000Z',newAt='2026-09-23T09:00:00.000Z';
for(const m of ['m05','m06']){
 const a=read(`course/t22/authoring/${m}.json`),review=checkModule(a);
 // A positional regression can still name an existing row: it must fail the reviewed semantic contract.
 const mutant=structuredClone(a),s2=mutant.sessions[m==='m05'?1:0];
 mutant.claimEvidence[s2.id][0].rubricEvidence=[mutant.evaluators[s2.main].rubric[0].criterion];
 assert.throws(()=>checkModule(mutant),/Semantic review stale/);
 for(const s of a.sessions)s.instructionVersion=a.instructionVersion;
 await prepareContractHashes(a);await prepareAssessmentFingerprints(a,a.evaluators);
 const make=(pid,at,id)=>({id,problemId:pid,at,answer:'Saved independent reasoning',assistance:'independent',minutes:5,result:'secure',error:'',referenceSeenBefore:false,noteSeenDuringAttempt:false,contractHash:a.sessions.find(s=>s.main===pid||s.transfer===pid).contractHash,assessmentFingerprint:a.assessmentFingerprints[pid]});
 // Every changed prompt/evaluator must have a new fingerprint and obligation v2; unchanged ones retain v1.
 for(const s of a.sessions)for(const k of ['main','transfer']){
  const pid=s[k],changed=a.repairVersionAudit.changedAssessmentIds.includes(pid);
  assert.equal(a.problems[pid].obligationVersion,changed?2:1);
  assert.equal(a.assessmentFingerprints[pid]!==review.baseline.assessmentFingerprints[pid],changed,pid);
  const prior={...make(pid,preAt,'old-'+pid),assessmentFingerprint:review.baseline.assessmentFingerprints[pid],contractHash:review.baseline.contractHashes[s.id]};
  assert.equal(evidenceIsCurrent(prior,a),!changed&&s.contractHash===review.baseline.contractHashes[s.id]);
  const round=validateEvidence(JSON.parse(JSON.stringify({...emptyEvidence(),attempts:[prior]})),a);
  assert.deepEqual(round.attempts[0],prior,'Stale evidence is retained, never deleted/recertified');
 }
 let links=0;
 for(const [sourceId,targets] of Object.entries(a.historicalLessonAnswerOverlap.sessions)){
  const source=a.sessions.find(s=>s.id===sourceId);
  const oldExposure={firstSeen:seenAt,lastSeen:seenAt,views:1,lessonSeenAt:seenAt,lessonContentVersion:m+'-instruction-v1'};
  const state={...emptyEvidence(),exposures:{[source.main]:oldExposure}};
  for(const pid of targets){state.attempts.push(make(pid,preAt,'pre-'+pid));links++;}
  assert(migrateHistoricalLessonAnswerExposure(state,a));
  for(const pid of targets){
   assert.equal(state.exposures[pid].referenceSeenAt,seenAt);
   const target=a.sessions.find(s=>s.main===pid||s.transfer===pid),kind=target.main===pid?'main':'transfer';
   assert.equal(moduleEvidenceSummary(a,state).sessions.find(s=>s.sessionId===target.id)[kind],true,'Pre-exposure current evidence still qualifies');
   const after={...state,attempts:[make(pid,postAt,'after-'+pid)]};
   assert.equal(moduleEvidenceSummary(a,after).sessions.find(s=>s.sessionId===target.id)[kind],false,'Post-exposure cannot qualify');
  }
  assert.equal(migrateHistoricalLessonAnswerExposure(state,a),false,'Idempotent');
  const clean={...emptyEvidence(),exposures:{[source.main]:{firstSeen:newAt,lastSeen:newAt,views:1,lessonSeenAt:newAt,lessonContentVersion:a.instructionVersion}}};
  assert.equal(migrateHistoricalLessonAnswerExposure(clean,a),false,'Current separated instruction does not cause permanent exposure');
  // Critical import order: old unmigrated export into newer clean lesson state, and reverse order.
  for(const pair of [[clean,{...emptyEvidence(),exposures:{[source.main]:oldExposure}}],[{...emptyEvidence(),exposures:{[source.main]:oldExposure}},clean]]){
   const merged=mergeEvidence(...pair,a);
   for(const pid of targets)assert.equal(merged.exposures[pid].referenceSeenAt,seenAt,'Import cannot hide legacy exposure behind current lesson version');
   assert.deepEqual(validateEvidence(JSON.parse(JSON.stringify(merged)),a),merged);
  }
 }
 for(const [sourceId,targets] of Object.entries(a.historicalGuidedPracticeOverlap.sessions)){
  const source=a.sessions.find(s=>s.id===sourceId),state={...emptyEvidence(),exposures:{[source.main]:{firstSeen:seenAt,lastSeen:seenAt,views:1,lessonSeenAt:seenAt,lessonContentVersion:m+'-instruction-v1'}}};
  migrateHistoricalLessonAnswerExposure(state,a);
  for(const pid of targets)assert.equal(state.exposures[pid]?.referenceSeenAt,undefined,'Unsolved practice must not invent a reveal');
 }
 console.log(`PASS ${m}: reviewed semantic mappings, all48 assessment versions/fingerprints, ${links} timestamp-aware historical links, clean current instruction, guided-vs-solved distinction and both import orders.`);
}
