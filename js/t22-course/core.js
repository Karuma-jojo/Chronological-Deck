export const STORAGE_KEY='chrono_t22_elite_course_evidence_v1';
export const EVIDENCE_SCHEMA='t22e-course-evidence-v1';
export const emptyEvidence=()=>({schema:EVIDENCE_SCHEMA,attempts:[],exposures:{},artifacts:[]});
const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const stamp=x=>typeof x==='string'&&/^\d{4}-\d\d-\d\dT/.test(x)&&Number.isFinite(Date.parse(x));
const assistanceValues=new Set(['independent','concept_hint','method_hint','guided','ai_assisted','revealed']);
const resultValues=new Set(['unreviewed','secure','shaky','incorrect']);
const errorValues=new Set(['','concept','model','units','arithmetic','algebra','logic','method','justification','careless','time']);
const hex64=x=>typeof x==='string'&&/^[0-9a-f]{64}$/i.test(x);

function canonical(value){
 if(Array.isArray(value)) return value.map(canonical);
 if(obj(value)) return Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])]));
 return value;
}
async function sha256(value){
 const data=new TextEncoder().encode(typeof value==='string'?value:JSON.stringify(canonical(value)));
 const digest=await globalThis.crypto.subtle.digest('SHA-256',data);
 return [...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,'0')).join('');
}
export function sessionForProblem(course,problemId){
 return course.sessions.find(s=>s.main===problemId||s.transfer===problemId||(Array.isArray(s.replacements)&&s.replacements.includes(problemId)))||null;
}
export async function prepareAssessmentFingerprints(course,keys){
 const fingerprints={};
 for(const [problemId,problem] of Object.entries(course.problems)){
  const evaluator=keys?.[problemId];
  if(!evaluator) throw Error(`Missing evaluator for assessment fingerprint ${problemId}`);
  const session=sessionForProblem(course,problemId);
  fingerprints[problemId]=await sha256({
   problemId,
   obligationVersion:problem.obligationVersion,
   kind:problem.kind,
   prompt:problem.prompt,
   sessionId:session?.id||null,
   markingContract:{reference:evaluator.reference,rubric:evaluator.rubric,marking:evaluator.marking}
  });
 }
 course.assessmentFingerprints=fingerprints;
 course.assessmentEquivalences=course.assessmentEquivalences||{};
 return course;
}

export function validateEvidence(value,course){
 if(!obj(value)||value.schema!==EVIDENCE_SCHEMA||!Array.isArray(value.attempts)||value.attempts.length>20000||!obj(value.exposures)||!Array.isArray(value.artifacts)||value.artifacts.length>2000) throw Error('Unsupported T22 Elite evidence file');
 const out=emptyEvidence(),seen=new Set();
 for(const a of value.attempts){
  const session=sessionForProblem(course,a?.problemId);
  if(!obj(a)||typeof a.id!=='string'||a.id.length>120||seen.has(a.id)||!session||!stamp(a.at)||typeof a.answer!=='string'||a.answer.length>100000||!assistanceValues.has(a.assistance)||!resultValues.has(a.result)||!Number.isFinite(a.minutes)||a.minutes<0||a.minutes>100000||typeof a.referenceSeenBefore!=='boolean'||typeof a.noteSeenDuringAttempt!=='boolean'||!errorValues.has(a.error)||typeof a.contractHash!=='string'||a.contractHash.length!==64) throw Error('Invalid or duplicate T22 Elite attempt');
  if(a.assessmentFingerprint!==undefined&&!hex64(a.assessmentFingerprint)) throw Error('Invalid assessment fingerprint');
  if(a.reviewOf!==undefined&&(typeof a.reviewOf!=='string'||a.reviewOf===a.id)) throw Error('Invalid review link');
  seen.add(a.id);
  out.attempts.push({
   id:a.id,problemId:a.problemId,at:a.at,answer:a.answer,assistance:a.assistance,result:a.result,minutes:a.minutes,
   referenceSeenBefore:a.referenceSeenBefore,noteSeenDuringAttempt:a.noteSeenDuringAttempt,error:a.error,contractHash:a.contractHash,
   ...(a.assessmentFingerprint?{assessmentFingerprint:a.assessmentFingerprint}:{}),
   ...(a.reviewOf?{reviewOf:a.reviewOf}:{})
  });
 }
 for(const a of out.attempts) if(a.reviewOf){
  const p=out.attempts.find(x=>x.id===a.reviewOf);
  if(!p||p.reviewOf||p.problemId!==a.problemId||p.answer!==a.answer) throw Error('Review does not match its original saved attempt');
 }
 for(const [id,e] of Object.entries(value.exposures)){
  if(!Object.hasOwn(course.problems,id)||!obj(e)||!stamp(e.firstSeen)||!stamp(e.lastSeen)||Date.parse(e.lastSeen)<Date.parse(e.firstSeen)||!Number.isInteger(e.views)||e.views<1) throw Error('Invalid exposure');
  const safe={firstSeen:e.firstSeen,lastSeen:e.lastSeen,views:e.views};
  for(const k of ['referenceSeenAt','lessonSeenAt','lessonAnswerSeenAt','packetExportedAt']) if(e[k]!==undefined){if(!stamp(e[k])) throw Error('Invalid exposure timestamp');safe[k]=e[k];}
  if(e.lessonContentVersion!==undefined){if(typeof e.lessonContentVersion!=='string'||e.lessonContentVersion.length>120) throw Error('Invalid lesson content version');safe.lessonContentVersion=e.lessonContentVersion;}
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
  for(const k of ['referenceSeenAt','lessonSeenAt','lessonAnswerSeenAt','packetExportedAt']){const v=[old[k],e[k]].filter(Boolean).sort(); if(v.length) joined[k]=v[0];}
  const versioned=[old,e].filter(x=>x.lessonContentVersion).sort((x,y)=>(x.lessonSeenAt||x.lastSeen).localeCompare(y.lessonSeenAt||y.lastSeen));
  if(versioned.length) joined.lessonContentVersion=versioned.at(-1).lessonContentVersion;
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
export function exposeAnswersForSession(state,session,at=new Date().toISOString()){
 for(const id of [session.main,session.transfer]){
  expose(state,id,at,'packetExportedAt');
  expose(state,id,at,'referenceSeenAt');
 }
}

export function migrateHistoricalLessonAnswerExposure(state,course){
 const spec=course.historicalLessonAnswerOverlap?.sessions||{};
 let changed=false;
 for(const [sessionId,targetIds] of Object.entries(spec)){
  const s=course.sessions.find(x=>x.id===sessionId); if(!s) continue;
  const legacyTimes=[s.main,s.transfer].map(id=>state.exposures[id]).filter(e=>e?.lessonSeenAt&&e.lessonContentVersion!==course.instructionVersion).map(e=>e.lessonSeenAt).sort();
  if(!legacyTimes.length) continue;
  const at=legacyTimes[0];
  for(const id of targetIds){
   const old=state.exposures[id];
   const firstSeen=[old?.firstSeen,at].filter(Boolean).sort()[0];
   const lastSeen=[old?.lastSeen,at].filter(Boolean).sort().at(-1);
   const referenceSeenAt=[old?.referenceSeenAt,at].filter(Boolean).sort()[0];
   const lessonAnswerSeenAt=[old?.lessonAnswerSeenAt,at].filter(Boolean).sort()[0];
   const next={...old,firstSeen,lastSeen,views:Math.max(1,old?.views||0),referenceSeenAt,lessonAnswerSeenAt};
   if(JSON.stringify(old||null)!==JSON.stringify(next)){state.exposures[id]=next;changed=true;}
  }
 }
 return changed;
}
export function answerExposureAt(state,problemId){return state.exposures[problemId]?.referenceSeenAt||null;}
function answerExposedBy(state,attempt){
 const at=answerExposureAt(state,attempt.problemId);
 return !!at&&Date.parse(at)<=Date.parse(attempt.at);
}

export function taskText(problem){return problem.prompt;}
function assessmentFingerprintAccepted(attempt,course){
 const current=course.assessmentFingerprints?.[attempt.problemId];
 if(!current||!attempt.assessmentFingerprint) return false;
 if(attempt.assessmentFingerprint===current) return true;
 return (course.assessmentEquivalences?.[attempt.problemId]||[]).includes(attempt.assessmentFingerprint);
}
export function evidenceIsCurrent(attempt,course){
 const s=sessionForProblem(course,attempt.problemId);
 return !!s&&attempt.contractHash===s.contractHash&&assessmentFingerprintAccepted(attempt,course);
}
function originalsFor(state,problemId){
 return state.attempts.filter(a=>!a.reviewOf&&a.problemId===problemId).sort((a,b)=>a.at.localeCompare(b.at));
}
function latestReview(state,root){
 return state.attempts.filter(a=>a.reviewOf===root.id).sort((a,b)=>a.at.localeCompare(b.at)).at(-1)||null;
}
export function effectiveAttempt(root,state){
 const review=latestReview(state,root);
 return {root,review,result:review?.result??root.result,error:review?.error??root.error};
}
function qualifies(root,state,course){
 const e=effectiveAttempt(root,state);
 return evidenceIsCurrent(root,course)&&e.result==='secure'&&root.assistance==='independent'&&!root.noteSeenDuringAttempt&&!root.referenceSeenBefore&&!answerExposedBy(state,root);
}
function taskStatus(course,state,problemId,label){
 const roots=originalsFor(state,problemId);
 const current=roots.filter(a=>evidenceIsCurrent(a,course));
 const qualified=current.filter(a=>qualifies(a,state,course));
 if(qualified.length) return {ok:true,qualified,roots,current,label};
 if(!roots.length) return {ok:false,reason:`${label} investigation still needed`,priority:1,replacementNeeded:!!state.exposures[problemId]?.referenceSeenAt,qualified,roots,current,label};
 if(!current.length) return {ok:false,reason:`${label} has only stale-contract/assessment evidence`,priority:0,replacementNeeded:!!state.exposures[problemId]?.referenceSeenAt,qualified,roots,current,label};
 const latest=current.at(-1),eff=effectiveAttempt(latest,state);
 if(eff.result==='unreviewed') return {ok:false,reason:`${label} attempt awaits review`,priority:2,replacementNeeded:false,qualified,roots,current,label};
 if(['shaky','incorrect'].includes(eff.result)) return {ok:false,reason:`Repair ${label.toLowerCase()} difficulty`,priority:0,replacementNeeded:!!state.exposures[problemId]?.referenceSeenAt,qualified,roots,current,label};
 return {ok:false,reason:`Fresh independent ${label.toLowerCase()} evidence still needed`,priority:1,replacementNeeded:!!state.exposures[problemId]?.referenceSeenAt,qualified,roots,current,label};
}

export function reviewQueue(course,state,now=Date.now()){
 const rows=[];
 for(const s of course.sessions){
  const main=taskStatus(course,state,s.main,'Main');
  const transfer=taskStatus(course,state,s.transfer,'Transfer');
  const firstMissing=!main.ok?main:!transfer.ok?transfer:null;
  if(firstMissing){
   const suffix=firstMissing.replacementNeeded?' · fixed reference exposed; use a fresh replacement probe':'';
   rows.push({order:s.order,sessionId:s.id,reason:firstMissing.reason+suffix,priority:firstMissing.priority,due:null,replacementNeeded:firstMissing.replacementNeeded});
   continue;
  }
  const genuine=[...main.qualified,...transfer.qualified].sort((a,b)=>a.at.localeCompare(b.at));
  const days=[...new Set(genuine.map(a=>a.at.slice(0,10)))];
  const last=genuine.at(-1);
  const interval=course.reviewDays[Math.min(days.length-1,course.reviewDays.length-1)];
  const due=Date.parse(last.at)+interval*86400000;
  rows.push({order:s.order,sessionId:s.id,reason:due<=now?'Delayed retrieval review due (default interval)':'Next retrieval review (default interval)',priority:due<=now?1:4,due,replacementNeeded:false});
 }
 return rows.sort((a,b)=>a.priority-b.priority||(a.due??Infinity)-(b.due??Infinity)||a.order-b.order);
}

export function moduleEvidenceSummary(course,state){
 const rows=course.sessions.map(s=>{
  const main=originalsFor(state,s.main).some(a=>qualifies(a,state,course));
  const transfer=originalsFor(state,s.transfer).some(a=>qualifies(a,state,course));
  return {order:s.order,sessionId:s.id,main,transfer};
 });
 return {sessions:rows,total:rows.length,both:rows.filter(r=>r.main&&r.transfer).length};
}

export function compilerPacket(course,session,keys,problemId=session.main){
 const other=problemId===session.main?session.transfer:session.main;
 return [
  '[T22 ELITE — ENGINE ONLY; ANSWER-BEARING PACKET]',
  `Course ${course.version}; route ${course.routeVersion}; module ${course.module.id}; session ${session.id}; contract ${session.contractHash}`,
  'SESSION CONTRACT', JSON.stringify({title:session.title,focus:session.focus,purpose:session.purpose,centralCapability:session.centralCapability,principalObstacle:session.principalObstacle,entryPrerequisites:session.entryPrerequisites,requiredOwnership:session.requiredOwnership,applicationScope:session.applicationScope,transferScope:session.transferScope,inScope:session.inScope,outOfScope:session.outOfScope,exitCondition:session.exitCondition},null,2),
  'CURRENT TASK', taskText(course.problems[problemId]),
  'CURRENT REFERENCE', keys[problemId].reference,
  'SIBLING TASK', taskText(course.problems[other]),
  'SIBLING REFERENCE', keys[other].reference,
  'LEARNING NOTE — ASSISTANCE, NOT INDEPENDENT EVIDENCE', session.lesson,
  'ASSESSMENT RULES', 'Accept any mathematically valid route. Separate arithmetic slips from conceptual failure. Do not infer mastery of unobserved required-ownership items. A saved/reviewed attempt is study evidence, not automatic macro-module clearance.',
  '[END ENGINE INPUT]'
 ].join('\n\n');
}
export function freshProbePacket(course,session){
 return [
  '[T22 ELITE — FRESH REPLACEMENT PROBE REQUEST; NO SOLUTION IN LEARNER OUTPUT]',
  `Module ${course.module.id}; session ${session.id}; contract ${session.contractHash}`,
  'CAPABILITY',session.centralCapability,
  'REQUIRED OWNERSHIP',...session.requiredOwnership.map(x=>`- ${x}`),
  'TRANSFER SCOPE',session.transferScope,
  'AUTHORING RULES',
  '- Produce one genuinely fresh problem whose surface and numbers are not copied from the fixed main/transfer tasks.',
  '- Test one or more still-relevant ownership claims and require visible reasoning.',
  '- Do not reveal, hint at, or append the solution/reference in the learner-facing output.',
  '- State any assumptions needed for an unambiguous problem.',
  '- This ad-hoc probe is practice/assessment material only until registered with a stable obligation ID and evaluator; it does not silently create course clearance.'
 ].join('\n');
}
