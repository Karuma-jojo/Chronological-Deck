// Desired-behavior regression checks for Astra A-01 through A-03.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {
 emptyEvidence,validateEvidence,evidenceIsCurrent,moduleEvidenceSummary,reviewQueue,
 exposeAnswersForSession,compilerPacket,prepareAssessmentFingerprints
} from '../../../js/t22-course/core.js';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const meta=read('course/t22/generated/course-meta.json');
const packs=meta.packs.map(read),keys=Object.assign({},...meta.evaluatorPacks.map(read));
const makeCourse=()=>({...structuredClone(meta),sessions:structuredClone(packs.flatMap(p=>p.sessions)),problems:structuredClone(Object.assign({},...packs.map(p=>p.problems)))});
const course=makeCourse();
await prepareAssessmentFingerprints(course,keys);
const s=course.sessions[0],pid=s.main;
const attempt=(id,problemId=pid,at='2026-09-17T01:00:00.000Z',extra={})=>({
 id,problemId,at,answer:'independent working',assistance:'independent',result:'secure',minutes:1,
 referenceSeenBefore:false,noteSeenDuringAttempt:false,error:'',contractHash:course.sessions.find(x=>x.main===problemId||x.transfer===problemId).contractHash,
 assessmentFingerprint:course.assessmentFingerprints[problemId],...extra
});

// A-01: prompt, rubric or substantive reference edits stale prior evidence.
const a=attempt('original');
assert(evidenceIsCurrent(a,course));
for(const mutation of ['prompt','rubric','reference']){
 const changed=makeCourse(),changedKeys=structuredClone(keys);
 if(mutation==='prompt') changed.problems[pid].prompt+=' materially changed';
 if(mutation==='rubric') changedKeys[pid].rubric[0].criterion+=' materially changed';
 if(mutation==='reference') changedKeys[pid].reference+=' materially changed condition';
 await prepareAssessmentFingerprints(changed,changedKeys);
 assert.equal(evidenceIsCurrent(a,changed),false,`${mutation} edit must stale old evidence`);
 if(mutation==='prompt'){
  changed.assessmentEquivalences={[pid]:[a.assessmentFingerprint]};
  assert.equal(evidenceIsCurrent(a,changed),true,'explicit reviewed fingerprint equivalence may preserve nonsemantic wording evidence');
 }
}
const roundTrip=validateEvidence(validateEvidence({schema:meta.evidenceSchema,attempts:[a],exposures:{},artifacts:[]},course),course);
assert.deepEqual(roundTrip.attempts[0],a,'unchanged current evidence round-trips unchanged');
const legacy={...a};delete legacy.assessmentFingerprint;
const legacyRound=validateEvidence({schema:meta.evidenceSchema,attempts:[legacy],exposures:{},artifacts:[]},course);
assert.equal(evidenceIsCurrent(legacyRound.attempts[0],course),false,'pre-fingerprint evidence is preserved but not upgraded to trusted current evidence');

// A-02: answer-bearing packet export exposes both fixed tasks; only later attempts are tainted.
const packetState=emptyEvidence();
packetState.attempts.push(a);
const packet=compilerPacket(course,s,keys,s.main);
assert(packet.includes(keys[s.main].reference)&&packet.includes(keys[s.transfer].reference));
exposeAnswersForSession(packetState,s,'2026-09-17T02:00:00.000Z');
assert(packetState.exposures[s.main].referenceSeenAt);
assert(packetState.exposures[s.transfer].referenceSeenAt);
assert.equal(moduleEvidenceSummary(course,packetState).sessions[0].main,true,'pre-export independent attempt remains valid under original conditions');
const postOnly=emptyEvidence();
exposeAnswersForSession(postOnly,s,'2026-09-17T02:00:00.000Z');
postOnly.attempts.push(
 attempt('post-main',s.main,'2026-09-17T03:00:00.000Z',{referenceSeenBefore:true,assistance:'revealed'}),
 attempt('post-transfer',s.transfer,'2026-09-17T03:05:00.000Z',{referenceSeenBefore:true,assistance:'revealed'})
);
assert.deepEqual(moduleEvidenceSummary(course,postOnly).sessions[0],{order:1,sessionId:s.id,main:false,transfer:false});

// A-03: reviews attach to an original attempt; they never become extra practice days.
const retention=emptyEvidence();
const main=attempt('main',s.main,'2026-09-17T01:00:00.000Z');
const transfer=attempt('transfer',s.transfer,'2026-09-17T01:05:00.000Z');
retention.attempts.push(main,transfer);
const initial=reviewQueue(course,retention,Date.parse('2026-09-17T02:00:00Z')).find(r=>r.order===1);
retention.attempts.push({...main,id:'main-review',reviewOf:main.id,at:'2026-09-18T01:00:00.000Z',result:'secure'});
const afterReview=reviewQueue(course,retention,Date.parse('2026-09-18T02:00:00Z')).find(r=>r.order===1);
assert.equal(afterReview.due,initial.due,'review timestamp must not reset retention due date');
const mainOnly=emptyEvidence();mainOnly.attempts.push(main);
assert.match(reviewQueue(course,mainOnly,Date.parse(main.at)).find(r=>r.order===1).reason,/Transfer investigation still needed/);
retention.attempts.push(attempt('main-retrieval',s.main,'2026-09-20T01:00:00.000Z'));
const afterNewAttempt=reviewQueue(course,retention,Date.parse('2026-09-20T02:00:00Z')).find(r=>r.order===1);
assert.notEqual(afterNewAttempt.due,initial.due,'genuinely new mathematical attempt may change retention state');

// Independent arithmetic checks retained from the audit.
const close=(x,y)=>assert(Math.abs(x-y)<1e-9);
close(-18-(7-3*(-4))+2**3,-29);close(3/8+5/12-1/6,5/8);close((7/9)/(14/15),5/6);
close(24000*1.125*.875,23625);close(50000*1.1*.96*1.05,55440);close(1.98e6*.0031,6138);
close(497*61,30317);close(16**(.75),8);close((3*(41/7)-5)/2-((41/7)+1)/3,4);
close(50000*1.1*.96-240,52560);close((52560/50000-1)*100,5.12);
console.log('PASS: Astra A-01/A-02/A-03 evidence-integrity regressions and selected arithmetic checks.');
