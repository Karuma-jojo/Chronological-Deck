export const STORAGE_KEY='chrono_t22_elite_course_evidence_v1';
export const EVIDENCE_SCHEMA='t22e-course-evidence-v1';
export const emptyEvidence=()=>({schema:EVIDENCE_SCHEMA,attempts:[],exposures:{},artifacts:[]});
const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const stamp=x=>typeof x==='string'&&/^\d{4}-\d\d-\d\dT/.test(x)&&Number.isFinite(Date.parse(x));
const assistanceValues=new Set(['independent','concept_hint','method_hint','guided','ai_assisted','revealed']);
const resultValues=new Set(['unreviewed','secure','shaky','incorrect']);
const errorValues=new Set(['','concept','model','units','arithmetic','algebra','logic','method','justification','careless','time']);

function sessionForProblem(course,problemId){
 const p=course.problems[problemId];
 return p?course.sessions[p.order-1]:null;
}

export function validateEvidence(value,course){
 if(!obj(value)||value.schema!==EVIDENCE_SCHEMA||!Array.isArray(value.attempts)||value.attempts.length>20000||!obj(value.exposures)||!Array.isArray(value.artifacts)||value.artifacts.length>2000) throw Error('Unsupported T22 Elite evidence file');
 const out=emptyEvidence(),seen=new Set();
 for(const a of value.attempts){
  const session=sessionForProblem(course,a?.problemId);
  if(!obj(a)||typeof a.id!=='string'||a.id.length>120||seen.has(a.id)||!session||!stamp(a.at)||typeof a.answer!=='string'||a.answer.length>100000||!assistanceValues.has(a.assistance)||!resultValues.has(a.result)||!Number.isFinite(a.minutes)||a.minutes<0||a.minutes>100000||typeof a.referenceSeenBefore!=='boolean'||typeof a.noteSeenDuringAttempt!=='boolean'||!errorValues.has(a.error)||typeof a.contractHash!=='string'||a.contractHash.length!==64) throw Error('Invalid or duplicate T22 Elite attempt');
  if(a.reviewOf!==undefined&&(typeof a.reviewOf!=='string'||a.reviewOf===a.id)) throw Error('Invalid review link');
  seen.add(a.id);
  out.attempts.push({id:a.id,problemId:a.problemId,at:a.at,answer:a.answer,assistance:a.assistance,result:a.result,minutes:a.minutes,referenceSeenBefore:a.referenceSeenBefore,noteSeenDuringAttempt:a.noteSeenDuringAttempt,error:a.error,contractHash:a.contractHash,...(a.reviewOf?{reviewOf:a.reviewOf}:{})});
 }
 for(const a of out.attempts) if(a.reviewOf){
  const p=out.attempts.find(x=>x.id===a.reviewOf);
  if(!p||p.problemId!==a.problemId||p.answer!==a.answer) throw Error('Review does not match its saved attempt');
 }
 for(const [id,e] of Object.entries(value.exposures)){
  if(!Object.hasOwn(course.problems,id)||!obj(e)||!stamp(e.firstSeen)||!stamp(e.lastSeen)||Date.parse(e.lastSeen)<Date.parse(e.firstSeen)||!Number.isInteger(e.views)||e.views<1) throw Error('Invalid exposure');
  const safe={firstSeen:e.firstSeen,lastSeen:e.lastSeen,views:e.views};
  for(const k of ['referenceSeenAt','lessonSeenAt','packetExportedAt']) if(e[k]!==undefined){if(!stamp(e[k])) throw Error('Invalid exposure timestamp');safe[k]=e[k];}
  out.exposures[id]=safe;
 }
 for(const a of value.artifacts){
  if(!obj(a)||typeof a.id!=='string'||a.id.length>120||!stamp(a.at)||typeof a.moduleId!=='string'||typeof a.kind!=='string'||typeof a.summary!=='string'||a.summary.length>5000) throw Error('Invalid artifact record');
  out.artifacts.push({id:a.id,at:a.at,moduleId:a.moduleId,kind:a.kind,summary:a.summary});
 }
 return out;
}

export function mergeEvidence(a,b,course){
 a=validateEvidence(a,course); b=validateEvidence(b,course);
 const attempts=new Map(a.attempts.map(x=>[x.id,x]));
 for(const x of b.attempts){if(attempts.has(x.id)&&JSON.stringify(attempts.get(x.id))!==JSON.stringify(x)) throw Error('Conflicting attempt ID; neither copy was overwritten'); attempts.set(x.id,x);}
 const artifacts=new Map(a.artifacts.map(x=>[x.id,x]));
 for(const x of b.artifacts){if(artifacts.has(x.id)&&JSON.stringify(artifacts.get(x.id))!==JSON.stringify(x)) throw Error('Conflicting artifact ID; neither copy was overwritten'); artifacts.set(x.id,x);}
 const out={schema:EVIDENCE_SCHEMA,attempts:[...attempts.values()].sort((x,y)=>x.at.localeCompare(y.at)),exposures:{...a.exposures},artifacts:[...artifacts.values()].sort((x,y)=>x.at.localeCompare(y.at))};
 for(const [id,e] of Object.entries(b.exposures)){
  const old=out.exposures[id]; if(!old){out.exposures[id]=e; continue;}
  const joined={firstSeen:[old.firstSeen,e.firstSeen].sort()[0],lastSeen:[old.lastSeen,e.lastSeen].sort().at(-1),views:Math.max(old.views,e.views)};
  for(const k of ['referenceSeenAt','lessonSeenAt','packetExportedAt']){const v=[old[k],e[k]].filter(Boolean).sort(); if(v.length) joined[k]=v[0];}
  out.exposures[id]=joined;
 }
 return validateEvidence(out,course);
}

export function expose(state,id,at=new Date().toISOString(),kind){
 const old=state.exposures[id];
 state.exposures[id]={...old,firstSeen:old?.firstSeen||at,lastSeen:at,views:Math.max(1,(old?.views||0)+(kind?0:1))};
 if(kind) state.exposures[id][kind]??=at;
 return state.exposures[id];
}

export function taskText(problem){return problem.prompt;}
export function evidenceIsCurrent(attempt,course){const s=sessionForProblem(course,attempt.problemId); return !!s&&attempt.contractHash===s.contractHash;}

export function reviewQueue(course,state,now=Date.now()){
 const rows=[];
 for(const s of course.sessions){
  const events=state.attempts.filter(a=>[s.main,s.transfer].includes(a.problemId));
  if(!events.length){rows.push({order:s.order,reason:'No attempt recorded',priority:5,due:null});continue;}
  const current=events.filter(a=>evidenceIsCurrent(a,course));
  if(!current.length){rows.push({order:s.order,reason:'Only stale-contract evidence exists',priority:0,due:null});continue;}
  const latest=current.at(-1);
  if(['shaky','incorrect'].includes(latest.result)){rows.push({order:s.order,reason:'Repair recorded difficulty',priority:0,due:null});continue;}
  if(latest.result==='unreviewed'){rows.push({order:s.order,reason:'Saved attempt awaits review',priority:2,due:null});continue;}
  const secure=current.filter(a=>a.result==='secure'&&a.assistance==='independent'&&!a.noteSeenDuringAttempt&&!a.referenceSeenBefore);
  if(!secure.length){rows.push({order:s.order,reason:'Fresh independent evidence still needed',priority:1,due:null});continue;}
  const days=[...new Set(secure.map(a=>a.at.slice(0,10)))]; const last=secure.at(-1);
  const due=Date.parse(last.at)+course.reviewDays[Math.min(days.length-1,course.reviewDays.length-1)]*86400000;
  rows.push({order:s.order,reason:due<=now?'Delayed transfer/retention review due':'Next delayed review',priority:due<=now?1:4,due});
 }
 return rows.sort((a,b)=>a.priority-b.priority||(a.due??Infinity)-(b.due??Infinity)||a.order-b.order);
}

export function moduleEvidenceSummary(course,state){
 const rows=course.sessions.map(s=>{
  const attempts=state.attempts.filter(a=>[s.main,s.transfer].includes(a.problemId)&&evidenceIsCurrent(a,course));
  const independentSecure=attempts.filter(a=>a.result==='secure'&&a.assistance==='independent'&&!a.noteSeenDuringAttempt&&!a.referenceSeenBefore);
  const kinds=new Set(independentSecure.map(a=>course.problems[a.problemId]?.kind));
  return {order:s.order,main:kinds.has('main'),transfer:kinds.has('transfer')};
 });
 return {sessions:rows,total:rows.length,both:rows.filter(r=>r.main&&r.transfer).length};
}

export function compilerPacket(course,session,keys,problemId=session.main){
 const other=problemId===session.main?session.transfer:session.main;
 return [
  '[T22 ELITE — ENGINE ONLY; DO NOT PRINT REFERENCES TO LEARNER]',
  `Course ${course.version}; route ${course.routeVersion}; module ${course.module.id}; session ${session.id}; contract ${session.contractHash}`,
  'SESSION CONTRACT', JSON.stringify({title:session.title,focus:session.focus,purpose:session.purpose,centralCapability:session.centralCapability,principalObstacle:session.principalObstacle,entryPrerequisites:session.entryPrerequisites,requiredOwnership:session.requiredOwnership,applicationScope:session.applicationScope,transferScope:session.transferScope,inScope:session.inScope,outOfScope:session.outOfScope,exitCondition:session.exitCondition},null,2),
  'CURRENT TASK', taskText(course.problems[problemId]),
  'CURRENT REFERENCE', keys[problemId].reference,
  'SIBLING TASK — DO NOT LEAK EARLY', taskText(course.problems[other]),
  'SIBLING REFERENCE', keys[other].reference,
  'LEARNING NOTE — ASSISTANCE, NOT INDEPENDENT EVIDENCE', session.lesson,
  'ASSESSMENT RULES', 'Accept any mathematically valid route. Separate arithmetic slips from conceptual failure. Do not infer mastery of unobserved required-ownership items. A saved/reviewed attempt is study evidence, not automatic macro-module clearance.',
  '[END ENGINE INPUT]'
 ].join('\n\n');
}
