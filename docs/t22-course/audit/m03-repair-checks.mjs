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
