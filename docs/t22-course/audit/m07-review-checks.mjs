// Historical independent-review checks for 1e5e948, not a publication/acceptance gate.
// Run from repository root. Later repairs may deliberately invalidate reproductions below.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {emptyEvidence, prepareContractHashes, prepareAssessmentFingerprints,
  expose, migrateHistoricalLessonAnswerExposure, moduleEvidenceSummary} from '../../../js/t22-course/core.js';
const raw=fs.readFileSync('course/t22/authoring/m07.json','utf8');
const a=JSON.parse(raw);
const near=(got,want)=>assert(Math.abs(got-want)<1e-9,`${got} != ${want}`);
const checks=[];
function pair(n,main,mainExpected,transfer,transferExpected){
 assert.equal(main.length,mainExpected.length); assert.equal(transfer.length,transferExpected.length);
 main.forEach((x,i)=>near(x,mainExpected[i])); transfer.forEach((x,i)=>near(x,transferExpected[i]));
 checks.push({session:n,main,transfer});
}
// Independently reconstructed from public givens. S15-T is conditional on all8 filling.
pair(1,[5*42,5*1.2,5*45,-5*42+5*1.2+5*45],[210,6,225,21],
 [4*18,4*.75,4*17,-4*18+4*.75+4*17],[72,3,68,-1]);
pair(2,[12-7,-2+7],[5,5],[6-3,4-3],[3,1]);
pair(3,[81-75,(81-75)/75],[6,.08],[60-64,(60-64)/64],[-4,-.0625]);
pair(4,[92/80,92/80-1,400*92/80],[1.15,.15,460],[47.5/50,47.5/50-1,600*47.5/50],[.95,-.05,570]);
pair(5,[1.25*.8,1.25*.8-1,.25-.2],[1,0,.05],[1.1*1.2*.75,1.1*1.2*.75-1,.1+.2-.25],[.99,-.01,.05]);
pair(6,[Math.exp(Math.log(100/80)),Math.exp(Math.log(90/100)),Math.exp(Math.log(100/80)+Math.log(90/100))],[1.25,.9,1.125],
 [Math.exp(Math.log(55/50)),Math.exp(Math.log(66/55)),Math.exp(Math.log(55/50)+Math.log(66/55))],[1.1,1.2,1.32]);
pair(7,[Math.exp(Math.log(1+.25)),Math.exp(Math.log(.8))-1],[1.25,-.2],
 [Math.exp(Math.log(1-.1)),Math.exp(Math.log(1.3))-1],[.9,.3]);
pair(8,[(39-40)/40,39-40+3,(39-40+3)/40],[-.025,2,.05],[(84-80)/80,84-80+2,(84-80+2)/80],[.05,6,.075]);
pair(9,[30*(28-25),(28-25)/25],[90,.12],[12*(47-50),(47-50)/50],[-36,-.06]);
pair(10,[40*(30-27),-40*(27-30)],[120,120],[15*(80-86),-15*(86-80)],[-90,-90]);
pair(11,[50*20,Math.abs(50)*20,(21.4-20)/20,50*(21.4-20)],[1000,1000,.07,70],
 [-25*40,Math.abs(-25)*40,(38-40)/40,-25*(38-40)],[-1000,1000,-.05,50]);
pair(12,[8*(18-15),20-8,(20-8)*(16-15),8*(18-15)+(20-8)*(16-15)],[24,12,12,36],
 [5*(28-30),12-5,7*(31-30),5*(28-30)+7*(31-30)],[-10,7,7,-3]);
pair(13,[49.1-48.9,(49.1+48.9)/2],[.2,49],[102.8-102.4,(102.8+102.4)/2],[.4,102.6]);
pair(14,[40*75.5,40*75.2,40*(75.2-75.5)],[3020,3008,-12],[15*(20.25-20.1)],[2.25]);
pair(15,[10*101.4,101.4-101,10*(101.4-101)],[1014,.4,4],
 [8*49.8,49.8-50,8*(49.8-50)],[398.4,-.2,-1.6]);
pair(16,[Number(20.2<=20.1),Number(20.08<=20.1)],[0,1],
 [Number(50.8>=51),Number(51.05>=51)],[0,1]);
pair(17,[30,30+20,100-30,100-30-20,30+20],[30,50,70,50,50],
 [20,20+15,50-20,50-20-15,10-20-15],[20,35,30,15,-25]);
pair(18,[30+20+50,30*10+20*10.2+50*10.1,(30*10+20*10.2+50*10.1)/100],[100,1009,10.09],
 [40+60,40*25.1+60*24.9,(40*25.1+60*24.9)/100],[100,2498,24.98]);
const cost19=(10*20+20*23)/30, cost19t=(8*50+12*48)/20;
pair(19,[cost19,10+20,12*(25-cost19),30-12,cost19],[22,30,36,18,22],
 [cost19t,8+12,5*(47-cost19t),20-5,cost19t],[48.8,20,-9,15,48.8]);
pair(20,[25*(42-40),2+2,25*(42-40)-4],[50,4,46],
 [10*(80-75),1.5+1.5,10*(80-75)-3],[50,3,47]);
pair(21,[25*(49.8-50.2),1.5+1.5,25*(49.8-50.2)-3],[-10,3,-13],
 [40*(100.4-100.6),2+2,40*(100.4-100.6)-4],[-8,4,-12]);
pair(22,[-12+5,-12+5+10],[-7,3],[9-4,9-4-8],[5,-3]);
pair(23,[5000-20*30-2,20,20*31,5000-20*30-2+20*31,20*(31-30)-2],[4398,20,620,5018,18],
 [1000-8*40-1,8,8*39.5,1000-8*40-1+8*39.5,8*(39.5-40)-1],[679,8,316,995,-5]);
const entry=30*74.9+20*75, entryT=5*40+15*40.1;
pair(24,[entry/50,50*75.5-entry,entry+2,50*75.4,50*75.4-2-entry-2],[74.94,28,3749,3770,19],
 [entryT/20,entryT+1,20*40.5-1,20*40.5-1-entryT-1],[40.075,802.5,809,6.5]);
assert.equal(checks.length,24);
console.log('PASS independent numerical checks for all48 Main/Transfer tasks; S15-T assumes the unconfirmed full8-unit fill.');

// The actual ledger maps every claim to the same-index Main row; membership alone passes.
for(const s of a.sessions)for(let i=0;i<5;i++){
 const row=a.claimEvidence[s.id][i];
 assert.equal(row.task,'main');
 assert.deepEqual(row.rubricEvidence,[a.evaluators[s.main].rubric[i].criterion]);
}
assert(a.sessions[15].requiredOwnership[1].includes('sell-limit'));
assert(a.evaluators[a.sessions[15].main].rubric[1].criterion.includes('Current ask20.20'));
assert(a.sessions[16].lesson.includes('buy order100; fill30, then20'));
assert(a.problems[a.sessions[16].main].prompt.includes('buy order for100'));

// Reproduce the consequence, not merely the missing metadata. Current lesson exposure
// followed by a later nominally independent correct attempt can still qualify.
await prepareContractHashes(a); await prepareAssessmentFingerprints(a,a.evaluators);
for(const [n,kind] of [[7,'main'],[16,'transfer'],[17,'main']]){
 const s=a.sessions[n-1],state=emptyEvidence(),seen='2026-09-24T01:00:00.000Z';
 expose(state,s.main,seen,'lessonSeenAt');
 state.exposures[s.main].lessonContentVersion=a.instructionVersion;
 state.attempts.push({id:'review-example-'+n,problemId:s[kind],at:'2026-09-24T02:00:00.000Z',
  answer:'Synthetic correct saved answer',assistance:'independent',result:'secure',minutes:5,error:'',
  referenceSeenBefore:false,noteSeenDuringAttempt:false,contractHash:s.contractHash,
  assessmentFingerprint:a.assessmentFingerprints[s[kind]]});
 assert.equal(migrateHistoricalLessonAnswerExposure(state,a),false);
 assert.equal(moduleEvidenceSummary(a,state).sessions.find(r=>r.sessionId===s.id)[kind],true);
}
console.log('REPRODUCED: 120 positional Main links, S16 sell-limit mismatch, S17 worked-answer overlap, and unclassified solved lesson exposure for S07/S16/S17. This is NOT acceptance.');

if(process.argv.includes('--write-baseline')){
 const baseline={reviewedHead:'1e5e94842803c2221a34256daf04c40ee18b640b',instructionVersion:a.instructionVersion,
  authoringSha256:createHash('sha256').update(raw).digest('hex'),
  contractHashes:Object.fromEntries(a.sessions.map(s=>[s.id,s.contractHash])),
  assessmentFingerprints:a.assessmentFingerprints,
  obligationVersions:Object.fromEntries(Object.entries(a.problems).map(([id,p])=>[id,p.obligationVersion]))};
 fs.writeFileSync('docs/t22-course/audit/m07-review-baseline.json',JSON.stringify(baseline,null,2)+'\n');
 console.log('WROTE historical contract/assessment baseline for bounded repairs.');
}
