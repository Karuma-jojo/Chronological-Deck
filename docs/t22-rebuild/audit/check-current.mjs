// Bounded audit reproductions, not a whole-course certification.
// Run from repository root: node docs/t22-rebuild/audit/check-current.mjs
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {emptyEvidence,evidenceIsCurrent,moduleEvidenceSummary,reviewQueue,expose,compilerPacket} from '../../../js/t22-course/core.js';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const meta=read('course/t22/generated/course-meta.json');
const packs=meta.packs.map(read),keys=Object.assign({},...meta.evaluatorPacks.map(read));
const course={...meta,sessions:packs.flatMap(p=>p.sessions),problems:Object.assign({},...packs.map(p=>p.problems))};
const s=course.sessions[0];
const a={id:'audit-original',problemId:s.main,at:'2026-09-17T01:00:00.000Z',answer:'independent working',assistance:'independent',result:'secure',minutes:1,referenceSeenBefore:false,noteSeenDuringAttempt:false,error:'',contractHash:s.contractHash};
const changed=structuredClone(course);changed.problems[s.main].prompt='Materially different replacement problem';
const hashGap=evidenceIsCurrent(a,changed);
const state=emptyEvidence();state.attempts.push(a);
const initialDue=reviewQueue(course,state,Date.parse('2026-09-17T02:00:00Z')).find(r=>r.order===1).due;
state.attempts.push({...a,id:'audit-review',reviewOf:a.id,at:'2026-09-18T01:00:00.000Z'});
const reviewDue=reviewQueue(course,state,Date.parse('2026-09-18T02:00:00Z')).find(r=>r.order===1).due;
const packetState=emptyEvidence();const packet=compilerPacket(course,s,keys,s.main);expose(packetState,s.main,'2026-09-17T01:00:00.000Z','packetExportedAt');packetState.attempts.push(a);
const results={reviewedCommit:'da0776048f47f1b9d98ad71589e015d132c309f9',problemMutationStillCurrent:hashGap,reviewWithoutNewAttemptChangesDue:initialDue!==reviewDue,initialDue:new Date(initialDue).toISOString(),reviewOnlyDue:new Date(reviewDue).toISOString(),packetIncludesBothReferences:packet.includes(keys[s.main].reference)&&packet.includes(keys[s.transfer].reference),packetExposureStillAllowsIndependentMain:moduleEvidenceSummary(course,packetState).sessions[0].main,packetSiblingExposureMissing:!packetState.exposures[s.transfer],mainOnlyQueueReason:reviewQueue(course,{...emptyEvidence(),attempts:[a]},Date.parse(a.at)).find(r=>r.order===1).reason};
assert(hashGap);assert.notEqual(initialDue,reviewDue);assert(results.packetIncludesBothReferences);assert(results.packetExposureStillAllowsIndependentMain);
// Independently derived numerical checks for the newest M01 references.
const close=(a,b)=>assert(Math.abs(a-b)<1e-9);
close(-18-(7-3*(-4))+2**3,-29);close(3/8+5/12-1/6,5/8);close((7/9)/(14/15),5/6);
close(24000*1.125*.875,23625);close(50000*1.1*.96*1.05,55440);close(1.98e6*.0031,6138);
close(497*61,30317);close(16**(.75),8);close((3*(41/7)-5)/2-((41/7)+1)/3,4);
close(50000*1.1*.96-240,52560);close((52560/50000-1)*100,5.12);
results.selectedArithmetic='PASS';
console.log(JSON.stringify(results,null,2));
