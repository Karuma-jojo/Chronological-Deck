import fs from 'node:fs';import assert from 'node:assert/strict';import {migrateHistoricalLessonAnswerExposure} from '../../../js/t22-course/core.js';
const a=JSON.parse(fs.readFileSync('course/t22/authoring/m03.json','utf8'));const by=n=>a.sessions.find(s=>s.order===n);
assert.equal(a.instructionVersion,'m03-instruction-astra-r1');assert.equal(Object.keys(a.semanticSeparationAudit.sessions).length,30);
for(const s of a.sessions){assert.equal(a.semanticSeparationAudit.sessions[s.id].status,'reviewed-separated');assert(s.lesson.includes('Worked example:'));assert(s.lesson.includes('Guided check:'));}
const worked=n=>by(n).lesson.split('Worked example:')[1].split('Guided check:')[0].trim();
for(const n of [10,11,12,13,14,17,18,19,20,21,22,23,24,27,28,29,30])assert(worked(n).length>=90,'S'+n+' worked reasoning too thin');
assert(by(22).lesson.includes('transitive means ∀x,y,z∈D'));assert(by(22).lesson.includes('either identical or disjoint'));
assert(by(27).lesson.includes('choosing the separator positions among n+k−1 positions'));assert(by(29).lesson.includes('⌈x⌉ is the least integer greater than or equal to x'));
const s21=by(21);assert.equal(a.claimEvidence[s21.id][4].task,'transfer');assert(a.evaluators[s21.transfer].rubric.some(r=>r.criterion.includes('no two-sided inverse')));
const s18=by(18);assert.equal(a.problems[s18.transfer].obligationVersion,2);assert(a.problems[s18.transfer].prompt.includes('A∩(B∪C)'));
const s30=by(30);assert.equal(a.problems[s30.transfer].obligationVersion,2);assert(a.evaluators[s30.transfer].rubric.some(r=>r.criterion.includes('three-event inclusion-exclusion')));
const overlap=a.historicalLessonAnswerOverlap.sessions;assert.deepEqual(Object.keys(overlap).sort(),[by(11).id,by(12).id,by(22).id,by(29).id].sort());
for(const [sid,targets] of Object.entries(overlap))for(const pid of targets)assert([a.sessions.find(s=>s.id===sid).main,a.sessions.find(s=>s.id===sid).transfer].includes(pid));
const s29=by(29),oldAt='2026-09-18T08:00:00.000Z',preAt='2026-09-18T07:00:00.000Z';for(const s of a.sessions)s.instructionVersion=a.instructionVersion;
const course={...a,sessions:a.sessions,problems:a.problems,instructionVersion:a.instructionVersion};
const state={schema:'t22e-course-evidence-v1',attempts:[{id:'pre',problemId:s29.main,at:preAt,answer:'pre-exposure work',assistance:'independent',minutes:5,result:'secure',error:'',referenceSeenBefore:false,noteSeenDuringAttempt:false,contractHash:'0'.repeat(64),assessmentFingerprint:'1'.repeat(64)}],artifacts:[],exposures:{[s29.main]:{firstSeen:oldAt,lastSeen:oldAt,views:1,lessonSeenAt:oldAt,lessonContentVersion:'m03-instruction-v1'}}};
assert.equal(migrateHistoricalLessonAnswerExposure(state,course),true);assert.equal(state.exposures[s29.main].lessonAnswerSeenAt,oldAt);assert.equal(state.exposures[s29.main].referenceSeenAt,oldAt);assert.equal(state.attempts[0].at,preAt);assert.equal(state.attempts[0].referenceSeenBefore,false);assert.equal(migrateHistoricalLessonAnswerExposure(state,course),false);
console.log('PASS M03 repair gate: semantic separation audit 30/30; worked reasoning strengthened; S21 direction fixed; S18/S30 assessment versions repaired; timestamp-aware M03 historical exposure preserved.');

// Bounded independent follow-up: no hidden S21 marking obligation; new instruction is not historical leakage.
assert.equal(a.evaluators[s21.transfer].rubric.reduce((sum,r)=>sum+r.points,0),10);
assert(!a.evaluators[s21.transfer].rubric.some(r=>r.criterion.includes('set-valued preimage')));
const current={attempts:[],artifacts:[],exposures:{[s29.main]:{firstSeen:oldAt,lastSeen:oldAt,views:1,lessonSeenAt:oldAt,lessonContentVersion:a.instructionVersion}}};
assert.equal(migrateHistoricalLessonAnswerExposure(current,course),false);
assert.equal(current.exposures[s29.main].referenceSeenAt,undefined);
const {prepareContractHashes,prepareAssessmentFingerprints,moduleEvidenceSummary}=await import('../../../js/t22-course/core.js');
await prepareContractHashes(course);await prepareAssessmentFingerprints(course,a.evaluators);
state.attempts[0].contractHash=s29.contractHash;state.attempts[0].assessmentFingerprint=course.assessmentFingerprints[s29.main];
assert.equal(moduleEvidenceSummary(course,state).sessions.find(s=>s.sessionId===s29.id).main,true,'Independent secure work before exposure remains qualifying');
const after={...state,attempts:[{...state.attempts[0],id:'after',at:'2026-09-18T09:00:00.000Z'}]};
assert.equal(moduleEvidenceSummary(course,after).sessions.find(s=>s.sessionId===s29.id).main,false,'The same work after historical exposure cannot qualify independently');
console.log('PASS bounded follow-up: S21 only scores public requests; current separated instruction is clean; pre-exposure evidence qualifies and post-exposure evidence does not.');
