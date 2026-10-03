import fs from 'node:fs';
import assert from 'node:assert/strict';
import {checkModule} from '../docs/t22-course/audit/m05-m06-semantic-checks.mjs';
import {emptyEvidence,prepareContractHashes,prepareAssessmentFingerprints,evidenceIsCurrent,migrateHistoricalLessonAnswerExposure,mergeEvidence,validateEvidence,moduleEvidenceSummary} from '../js/t22-course/core.js';

const read=p=>JSON.parse(fs.readFileSync(p));
const preAt='2026-09-18T06:00:00.000Z',seenAt='2026-09-18T07:00:00.000Z',postAt='2026-09-18T08:00:00.000Z',newAt='2026-10-03T09:00:00.000Z';

for(const m of ['m05','m06']){
 const a=read('course/t22/authoring/'+m+'.json'),review=checkModule(a);
 for(const s of a.sessions)s.instructionVersion=a.instructionVersion;
 await prepareContractHashes(a);await prepareAssessmentFingerprints(a,a.evaluators);
 const make=(pid,at,id)=>({id,problemId:pid,at,answer:'Saved independent reasoning',assistance:'independent',minutes:5,result:'secure',error:'',referenceSeenBefore:false,noteSeenDuringAttempt:false,contractHash:a.sessions.find(s=>s.main===pid||s.transfer===pid).contractHash,assessmentFingerprint:a.assessmentFingerprints[pid]});

 if(m==='m05'&&a.version==='m05-authoring-v2-independent-review-repair-r1'){
  const changed=new Set(a.reconstructionAudit.materiallyChangedPublicContracts);
  const preserved=new Set(a.reconstructionAudit.preservedPublicContracts);
  const reconstructionBaseline=read('docs/t22-course/audit/m05-v2-reconstruction-baseline.json');
  assert.equal(reconstructionBaseline.baselineMain,a.reconstructionAudit.baselineMain);
  assert.equal(reconstructionBaseline.baselineM05Blob,a.reconstructionAudit.baselineM05Blob);
  assert.equal(Object.keys(reconstructionBaseline.assessments).length,48);
  assert.equal(changed.size,36);assert.equal(preserved.size,12);
  for(const s of a.sessions)for(const k of ['main','transfer']){
   const pid=s[k],baseFp=review.baseline.assessmentFingerprints[pid],published=reconstructionBaseline.assessments[pid];
   assert(baseFp,'historical M05 baseline fingerprint missing '+pid);
   assert(published,'published-current reconstruction baseline missing '+pid);
   const samePublished=JSON.stringify({problem:a.problems[pid],evaluator:a.evaluators[pid]})===JSON.stringify(published);
   if(changed.has(pid)){
    const repairV4=new Set(a.independentReviewRepairAudit.changedAssessmentIds);
    assert.equal(a.problems[pid].obligationVersion,repairV4.has(pid)?4:3,pid);
    assert.equal(samePublished,false,'materially changed M05 v2 contract still equals published baseline '+pid);
   }else{
    assert(preserved.has(pid),'unclassified M05 v2 task '+pid);
    assert([1,2].includes(a.problems[pid].obligationVersion),pid);
    assert.equal(samePublished,true,'preserved M05 public contract drifted from recovered published baseline '+pid);
   }
   // Historical pre-repair records are retained verbatim even when later/current contract hashes make them stale.
   const prior={...make(pid,preAt,'old-'+pid),assessmentFingerprint:baseFp,contractHash:review.baseline.contractHashes[s.id]};
   const round=validateEvidence(JSON.parse(JSON.stringify({...emptyEvidence(),attempts:[prior]})),a);
   assert.deepEqual(round.attempts[0],prior,'Historical M05 evidence must be retained');
   if(changed.has(pid))assert.equal(evidenceIsCurrent(prior,a),false,'Changed M05 v2 contract must not silently recertify prior evidence');
  }
 }else{
  // Historical M06 Astra repair contract remains pinned exactly.
  for(const s of a.sessions)for(const k of ['main','transfer']){
   const pid=s[k],changed=a.repairVersionAudit.changedAssessmentIds.includes(pid);
   assert.equal(a.problems[pid].obligationVersion,changed?2:1);
   assert.equal(a.assessmentFingerprints[pid]!==review.baseline.assessmentFingerprints[pid],changed,pid);
   const prior={...make(pid,preAt,'old-'+pid),assessmentFingerprint:review.baseline.assessmentFingerprints[pid],contractHash:review.baseline.contractHashes[s.id]};
   assert.equal(evidenceIsCurrent(prior,a),!changed&&s.contractHash===review.baseline.contractHashes[s.id]);
   const round=validateEvidence(JSON.parse(JSON.stringify({...emptyEvidence(),attempts:[prior]})),a);
   assert.deepEqual(round.attempts[0],prior,'Stale evidence is retained, never deleted/recertified');
  }
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
   // If the historical attempt still matches the current task+session contract it may qualify;
   // otherwise reconstruction makes it stale. In both cases it must be preserved.
   const summary=moduleEvidenceSummary(a,state).sessions.find(s=>s.sessionId===target.id)[kind];
   assert.equal(typeof summary,'boolean');
   const after={...state,attempts:[make(pid,postAt,'after-'+pid)]};
   assert.equal(moduleEvidenceSummary(a,after).sessions.find(s=>s.sessionId===target.id)[kind],false,'Post-answer-exposure work cannot qualify');
  }
  assert.equal(migrateHistoricalLessonAnswerExposure(state,a),false,'Idempotent');
  const clean={...emptyEvidence(),exposures:{[source.main]:{firstSeen:newAt,lastSeen:newAt,views:1,lessonSeenAt:newAt,lessonContentVersion:a.instructionVersion}}};
  assert.equal(migrateHistoricalLessonAnswerExposure(clean,a),false,'Current separated instruction does not create permanent historical exposure');
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
 console.log('PASS '+m+': candidate/current semantic mappings, assessment provenance, historical answer exposure, guided-vs-solved distinction and merge order protections.');
}
