import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {prepareAssessmentFingerprints,emptyEvidence,migrateHistoricalLessonAnswerExposure,moduleEvidenceSummary,expose} from '../js/t22-course/core.js';
import {applyCourseOverrides} from '../js/t22-course/overrides.js';
const root=new URL('../',import.meta.url);const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const meta=read('course/t22/generated/course-meta.json'),roadmap=read('course/t22/generated/roadmap.json'),deps=read('docs/t22-rebuild/m65.dependencies.json');const packs=meta.packs.map(read),evalPacks=meta.evaluatorPacks.map(read),repair=read(meta.repairPack);
const course={...meta,sessions:packs.flatMap(p=>p.sessions).sort((a,b)=>a.order-b.order),problems:Object.assign({},...packs.map(p=>p.problems))};const evaluator=Object.assign({},...evalPacks);applyCourseOverrides(course,evaluator,repair);await prepareAssessmentFingerprints(course,evaluator);
assert.equal(roadmap.modules.length,65);assert.equal(deps.modules.length,65);assert.equal(new Set(roadmap.modules.map(m=>m.id)).size,65);assert.equal(new Set(deps.modules.map(m=>m.id)).size,65);const pos=new Map(deps.modules.map(x=>[x.id,x.order]));for(const m of deps.modules)for(const p of m.prerequisites){assert(pos.has(p),`${m.id} missing prereq ${p}`);assert(pos.get(p)<m.order,`${m.id} has backward prereq ${p}`);}
assert.equal(course.module.id,'T22E-FND01');assert.equal(course.sessions.length,17);assert.equal(Object.keys(course.problems).length,34);assert.equal(Object.keys(evaluator).length,34);assert.deepEqual(course.sessions.map(s=>s.order),Array.from({length:17},(_,i)=>i+1));assert.equal(new Set(course.sessions.map(s=>s.id)).size,17);
const sort=x=>Array.isArray(x)?x.map(sort):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,sort(x[k])])):x;
for(const s of course.sessions){assert.match(s.id,/^T22V3::T22E-FND01::S\d\d@1$/);assert.equal(s.contractHash.length,64);assert.equal(s.requiredOwnership.length,5);assert(s.entryPrerequisites.length>=1);assert(s.inScope.length>=4&&s.outOfScope.length>=4);const contract={id:s.id,title:s.title,focus:s.focus,purpose:s.purpose,centralCapability:s.centralCapability,principalObstacle:s.principalObstacle,entryPrerequisites:s.entryPrerequisites,requiredOwnership:s.requiredOwnership,applicationScope:s.applicationScope,transferScope:s.transferScope,inScope:s.inScope,outOfScope:s.outOfScope,exitCondition:s.exitCondition};assert.equal(crypto.createHash('sha256').update(JSON.stringify(sort(contract))).digest('hex'),s.contractHash,`contract hash drift ${s.id}`);assert(s.lesson.includes('Worked example:'),`${s.id} lacks worked example`);assert(s.lesson.includes('Guided check:'),`${s.id} lacks guided practice`);const coverage=course.claimCoverage[s.id];assert(Array.isArray(coverage)&&coverage.length===s.requiredOwnership.length,`${s.id} coverage must map all ownership claims`);for(const entries of coverage){assert(entries.length>=1);for(const kind of entries)assert(['main','transfer'].includes(kind),`${s.id} invalid evidence kind ${kind}`);}const ce=course.claimEvidence[s.id];assert.equal(ce.length,s.requiredOwnership.length,`${s.id} exact claim evidence must cover every ownership claim`);ce.forEach((e,i)=>{assert.equal(e.claim,s.requiredOwnership[i]);assert(['main','transfer'].includes(e.task));const pid=s[e.task];assert.equal(e.publicRequest,course.problems[pid].prompt);assert(Array.isArray(e.rubricEvidence)&&e.rubricEvidence.length);for(const criterion of e.rubricEvidence)assert(evaluator[pid].rubric.some(r=>r.criterion===criterion),`${s.id} exact rubric observer missing`);});for(const id of [s.main,s.transfer]){assert(course.problems[id]);assert(evaluator[id]);assert.equal(evaluator[id].rubric.reduce((a,x)=>a+x.points,0),10,`${id} rubric must total10`);assert.match(course.assessmentFingerprints[id],/^[0-9a-f]{64}$/);}}

assert.equal(Object.keys(course.instructionSeparation).length,17,'A-07 separation ledger must cover all 17 sessions');assert.equal(Object.values(course.claimEvidence).flat().length,85,'v1.2 exact claim evidence must cover85 claims');assert.equal(Object.keys(course.evidenceDistance).length,34,'v1.2 evidence-distance ledger must cover34 fixed tasks');for(const x of Object.values(course.evidenceDistance))assert(['retrieval','proof reconstruction','fresh Main evidence','changed-surface Transfer'].includes(x.classification)&&x.reason);assert(course.representationProgression.length>=8,'M01 representation progression must be explicit');assert.equal(course.module.readinessDiagnostic.items.length,17,'M01 routing-only readiness diagnostic must sample all 17 sessions');
for(const s of course.sessions){
 const audit=course.instructionSeparation[s.id];assert(audit&&Array.isArray(audit.main)&&audit.main.length&&Array.isArray(audit.transfer)&&audit.transfer.length,`${s.id} must audit both fixed tasks`);
 for(const [kind,id] of [['main',s.main],['transfer',s.transfer]]) for(const fragment of audit[kind]){
  assert(course.problems[id].prompt.includes(fragment),`${s.id} separation fragment must belong to ${kind} task: ${fragment}`);
  assert(!s.lesson.includes(fragment),`${s.id} lesson leaks ${kind} task fragment: ${fragment}`);
 }
}
const legacySession=course.sessions.find(s=>s.order===16),legacy=emptyEvidence(),oldAt='2026-09-17T01:00:00.000Z';
legacy.exposures[legacySession.transfer]={firstSeen:oldAt,lastSeen:oldAt,views:1,lessonSeenAt:oldAt};
const before={id:'before',problemId:legacySession.main,at:'2026-09-16T01:00:00.000Z',answer:'work',assistance:'independent',result:'secure',minutes:1,referenceSeenBefore:false,noteSeenDuringAttempt:false,error:'',contractHash:legacySession.contractHash,assessmentFingerprint:course.assessmentFingerprints[legacySession.main]};
const after={...before,id:'after',at:'2026-09-18T01:00:00.000Z'};
legacy.attempts.push(before,after);assert(migrateHistoricalLessonAnswerExposure(legacy,course));assert.equal(legacy.exposures[legacySession.main].lessonAnswerSeenAt,oldAt);assert.equal(legacy.exposures[legacySession.main].referenceSeenAt,oldAt);
assert.equal(moduleEvidenceSummary(course,legacy).sessions.find(x=>x.order===16).main,true,'pre-exposure attempt must remain valid');
legacy.attempts.shift();assert.equal(moduleEvidenceSummary(course,legacy).sessions.find(x=>x.order===16).main,false,'post-legacy-lesson attempt must be contaminated');
const current=emptyEvidence();expose(current,legacySession.transfer,'2026-09-19T01:00:00.000Z','lessonSeenAt');current.exposures[legacySession.transfer].lessonContentVersion=course.instructionVersion;assert.equal(migrateHistoricalLessonAnswerExposure(current,course),false,'new separated lesson must not contaminate fixed assessments');

for(let i=1;i<=8;i++){const rows=course.instructionalAudit[`S${String(i).padStart(2,'0')}`];assert(Array.isArray(rows)&&rows.length>=1,`S${i} lacks prereq-symbol audit`);for(const row of rows){assert(row.item&&row.source);}}
// Lang-foundation L07/L08/L09 pins.
const ls1=course.sessions.find(s=>s.order===1),ls2=course.sessions.find(s=>s.order===2),ls9=course.sessions.find(s=>s.order===9),ls11=course.sessions.find(s=>s.order===11),ls13=course.sessions.find(s=>s.order===13);
assert(ls1.lesson.includes('commutative')&&ls1.lesson.includes('associative')&&ls1.lesson.includes('Additive inverses'),'L07 structural laws must be explicit in S01');
assert(ls2.lesson.includes('Cancellation is not a visual permission')&&ls2.lesson.includes('reciprocal'),'L07 fraction cancellation must be structural');
assert(ls9.lesson.includes('Distributivity')&&ls9.lesson.includes('Commutativity and associativity'),'L07 symbolic simplification must name underlying laws');
assert(ls11.lesson.includes('inverse operations applied equally to both sides'),'L07 equation legality must be tied to inverses');
assert(ls13.lesson.includes('no solution')&&ls13.lesson.includes('infinitely many solutions')&&ls13.lesson.includes('0=2')&&ls13.lesson.includes('0=0'),'L08 M01 systems must expose contradiction/identity one-no-infinite outcomes');
assert.equal(ls13.requiredOwnership[3],'Classify an elementary two-equation linear system as having one, no, or infinitely many solutions from its elimination outcome.','LF-R04 classification must be canonical ownership, not lesson-only prose');
assert.equal(ls13.contractHash,'ee7613d4e0a90042b30fbc8d143aed7e8918b9abff429ac5768f38b7ed34ad74','LF-R04 S13 contract hash must move with the stronger ownership contract');
assert.equal(course.problems[ls13.transfer].obligationVersion,3);
assert(course.problems[ls13.transfer].prompt.includes('Classify each system by elimination'));
for(const phrase of ['one solution','no solution','infinitely many solutions'])assert(course.problems[ls13.transfer].prompt.includes(phrase),'LF-R04 public Transfer must name '+phrase);
assert(evaluator[ls13.transfer].rubric.some(r=>r.criterion.includes('classifies it as one solution')));
assert(evaluator[ls13.transfer].rubric.some(r=>r.criterion.includes('classifies it as no solution')));
assert(evaluator[ls13.transfer].rubric.some(r=>r.criterion.includes('classifies it as infinitely many solutions')));
assert.equal(course.claimEvidence[ls13.id][3].task,'transfer');
for(const expected of ['one solution','no solution','infinitely many solutions'])assert(course.claimEvidence[ls13.id][3].rubricEvidence.some(r=>r.includes(expected)),'LF-R04 exact observer missing '+expected);

assert.equal(course.module.readinessDiagnostic.items.length,17);
for(const route of ['S12 formula rearrangement/parameter branches','S13 simultaneous equations','S15 absolute value/distance','S17 synthesis/model coordination'])assert(course.module.readinessDiagnostic.items.some(x=>x.route===route),'L09 readiness missing '+route);
assert(course.module.readinessDiagnostic.intro.includes('does not certify that all of M01 is known'),'L09 diagnostic wording must remain routing-only');
// Independent follow-up R02/R03/R06/R08 semantic-observability pins.
const fs8=course.sessions.find(s=>s.order===8),fs9=course.sessions.find(s=>s.order===9),fs14=course.sessions.find(s=>s.order===14);
assert.deepEqual(course.claimEvidence[fs8.id][0].rubricEvidence,['Scientific-notation product is60.','16^(3/4)=8 with valid reasoning.'],'R06 exponent-law claim must point to positive observed uses, not a prohibition-only rubric');
assert.equal(course.problems[fs9.transfer].obligationVersion,2);
assert(course.problems[fs9.transfer].prompt.includes('Show an equality chain with at least two intermediate equivalent expressions'));
assert(evaluator[fs9.transfer].rubric.some(r=>r.criterion.includes('every displayed step is equivalent')));
assert.equal(course.claimEvidence[fs9.id][3].task,'transfer');
assert(course.claimEvidence[fs9.id][3].rubricEvidence.some(x=>x.includes('visible equality chain')),'R02 equality-preservation claim must require displayed equivalent steps');
assert.equal(course.claimEvidence[fs14.id][4].task,'main','R03 interval/ray testing ownership must map to Main');
assert(course.claimEvidence[fs14.id][4].rubricEvidence.includes('Inside/outside test points correctly verify both solution descriptions.'));
assert.equal(course.problems[fs14.transfer].obligationVersion,3);
assert.equal(course.problems[fs14.transfer].representations?.[0]?.intervals?.[0]?.continueFrom,true,'R08 infinite ray must carry an interval-specific continuation arrow');
assert(!course.problems['T22V3::T22E-FND01::S01-M@1'].prompt.includes('√7'));assert(!course.problems['T22V3::T22E-FND01::S07-M@1'].prompt.includes('10^'));assert(course.sessions.find(s=>s.order===8).lesson.includes('first reduce p/q to lowest terms')&&course.problems['T22V3::T22E-FND01::S08-T@1'].prompt.includes('81^(−1/2)'));assert(course.sessions.find(s=>s.order===14).lesson.includes('Interval notation'));assert(course.sessions.find(s=>s.order===16).lesson.includes('Completing the square explains the general method'));assert(course.problems['T22V3::T22E-FND01::S16-M@1'].prompt.includes('2x²+3x−1'));assert(course.problems['T22V3::T22E-FND01::S14-T@1'].representations?.[0]?.kind==='numberLine');assert(course.problems['T22V3::T22E-FND01::S15-T@1'].prompt.includes('<−2')&&course.problems['T22V3::T22E-FND01::S15-T@1'].prompt.includes('≥−2'));assert(evaluator['T22V3::T22E-FND01::S12-M@1'].reference.includes('any V0≠0'));assert(evaluator['T22V3::T22E-FND01::S12-T@1'].reference.includes('any nonzero a'));
const close=(a,b,abs=1e-9,rel=1e-12)=>assert(Math.abs(a-b)<=Math.max(abs,rel*Math.max(1,Math.abs(a),Math.abs(b))),`${a} != ${b}`);close(-18-(7-3*(-4))+2**3,-29);assert.deepEqual([-3,-2.75,-2.7,-2.6].sort((a,b)=>a-b),[-3,-2.75,-2.7,-2.6]);close(3/8+5/12-1/6,5/8);close((5/6)*(3/10),1/4);close(24000*1.125*.875,23625);close(18000/(2.5*60),120);close(1980000*.0031,6138);close(497*61,30317);close(16**(.75),8);close(27**(2/3),9);const r1=(-3+Math.sqrt(17))/4,r2=(-3-Math.sqrt(17))/4;for(const r of [r1,r2])assert(Math.abs(2*r*r+3*r-1)<1e-10);close(50000*1.1*.96-240,52560);close((52560/50000-1)*100,5.12);
for(const p of ['t22-course.html','css/t22-course.css','js/t22-course/core.js','js/t22-course/ui.js','js/t22-course/overrides.js','js/t22-course/representations.js'])assert(fs.existsSync(new URL(p,root)),`missing ${p}`);
console.log('PASS: M01 Lang final stitch — 17 sessions/34 tasks; S13 one/no/infinite classification is canonical ownership with fixed Transfer v3; structural-law/readiness and R02/R03/R06/R08 protections retained.');
