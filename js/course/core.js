export const STORAGE_KEY='chrono_t25_course_evidence_v1';
export const emptyEvidence=()=>({version:1,attempts:[],exposures:{},story:{}});
const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const stamp=x=>typeof x==='string'&&/^\d{4}-\d\d-\d\dT/.test(x)&&Number.isFinite(Date.parse(x));
const choices=new Set(['independent','hint','guided','revealed']);
const results=new Set(['unreviewed','secure','shaky','incorrect']);
export function validateEvidence(value,course){
 if(!obj(value)||value.version!==1||!Array.isArray(value.attempts)||value.attempts.length>10000||!obj(value.exposures)||!obj(value.story))throw Error('Unsupported evidence file');
 const seen=new Set();const out=emptyEvidence();
 for(const a of value.attempts){
  if(!obj(a)||typeof a.id!=='string'||a.id.length>100||seen.has(a.id)||!Object.hasOwn(course.problems,a.problemId)||!stamp(a.at)||typeof a.answer!=='string'||a.answer.length>50000||!choices.has(a.assistance)||!results.has(a.result)||!Number.isFinite(a.minutes)||a.minutes<0||a.minutes>100000||typeof a.referenceSeenBefore!=='boolean'||typeof a.noteSeenDuringAttempt!=='boolean'||!['','model','domain','method','algebra','justification','time'].includes(a.error))throw Error('Invalid or duplicate attempt');
  if(a.reviewOf!==undefined&&(typeof a.reviewOf!=='string'||a.reviewOf===a.id))throw Error('Invalid review link');
  seen.add(a.id);out.attempts.push({id:a.id,problemId:a.problemId,at:a.at,answer:a.answer,assistance:a.assistance,result:a.result,minutes:a.minutes,referenceSeenBefore:a.referenceSeenBefore,noteSeenDuringAttempt:a.noteSeenDuringAttempt,error:a.error,...(a.reviewOf?{reviewOf:a.reviewOf}:{})});
 }
 for(const a of out.attempts)if(a.reviewOf){const p=out.attempts.find(x=>x.id===a.reviewOf);if(!p||p.problemId!==a.problemId||p.answer!==a.answer)throw Error('Review does not match its saved attempt');}
 for(const [id,e] of Object.entries(value.exposures)){
  if(!Object.hasOwn(course.problems,id)||!obj(e)||!stamp(e.firstSeen)||!stamp(e.lastSeen)||Date.parse(e.lastSeen)<Date.parse(e.firstSeen)||!Number.isInteger(e.views)||e.views<1)throw Error('Invalid exposure');
  const safe={firstSeen:e.firstSeen,lastSeen:e.lastSeen,views:e.views};
  for(const k of ['referenceSeenAt','lessonSeenAt','packetExportedAt'])if(e[k]!==undefined){if(!stamp(e[k]))throw Error('Invalid exposure timestamp');safe[k]=e[k];}
  out.exposures[id]=safe;
 }
 for(const [phase,s] of Object.entries(value.story)){
  const episode=course.campaign.find(x=>String(x.phase)===phase);
  if(!episode||!obj(s)||!Number.isInteger(s.choice)||s.choice<0||s.choice>=episode.choice.length||typeof s.completed!=='boolean')throw Error('Invalid story choice');
  out.story[phase]={choice:s.choice,completed:s.completed};
 }
 return out;
}
export function mergeEvidence(a,b,course){
 a=validateEvidence(a,course);b=validateEvidence(b,course);const map=new Map(a.attempts.map(x=>[x.id,x]));
 for(const x of b.attempts){if(map.has(x.id)&&JSON.stringify(map.get(x.id))!==JSON.stringify(x))throw Error('Conflicting attempt ID; neither copy was overwritten');map.set(x.id,x);}
 const out={version:1,attempts:[...map.values()].sort((x,y)=>x.at.localeCompare(y.at)),exposures:{...a.exposures},story:{...b.story,...a.story}};
 for(const [id,e] of Object.entries(b.exposures)){
  const old=out.exposures[id];if(!old){out.exposures[id]=e;continue;}
  const joined={firstSeen:[old.firstSeen,e.firstSeen].sort()[0],lastSeen:[old.lastSeen,e.lastSeen].sort().at(-1),views:Math.max(old.views,e.views)};
  for(const k of ['referenceSeenAt','lessonSeenAt','packetExportedAt']){const v=[old[k],e[k]].filter(Boolean).sort();if(v.length)joined[k]=v[0];}out.exposures[id]=joined;
 }
 return validateEvidence(out,course);
}
export function expose(state,id,at=new Date().toISOString(),kind){
 const old=state.exposures[id];state.exposures[id]={...old,firstSeen:old?.firstSeen||at,lastSeen:at,views:(old?.views||0)+(kind?0:1)};
 if(kind)state.exposures[id][kind]??=at;
 return state.exposures[id];
}
export function taskText(p){return p.prompt+(p.options?'\n\n'+p.options.map((x,i)=>`${String.fromCharCode(65+i)}. ${x}`).join('\n'):'');}
export function sceneText(episode){return `[SCENE — FICTION]\n\n${episode.place}.\n\n${episode.incident}\n\n${episode.role}\n\n${episode.cast}\n\nThe hearing remains pending while you work. Your next move is the mathematical investigation below.`;}
export function publicOpening(course,session,anime=false,problemId=session.main){
 return ['[WALL]',...(anime?['[ANIME]',sceneText(course.campaign.find(x=>x.phase===session.phase))]:[]),'[MISSION TASK]',taskText(course.problems[problemId])].join('\n\n');
}
export function compilerPacket(course,session,keys,anime=false){
 return ['[COURSE INPUT — ENGINE ONLY; DO NOT PRINT TO PLAYER]',`Course ${course.version}; card hash ${session.contractHash}`,JSON.stringify(session.card,null,2),'Compile this one card under the installed λ compiler and frozen SPIRE runtime. Validate the task and reference; authoring is not a proof certificate. Map every required-ownership item to evidence, leaving unobserved items pending and using bounded fresh probes if necessary. Accept every valid solution route. Do not treat this packet or exposure as mastery.','MAIN TASK',taskText(course.problems[session.main]),'MAIN EVALUATOR REFERENCE',keys[session.main].reference,'TRANSFER TASK — DO NOT RELEASE EARLY',taskText(course.problems[session.transfer]),'TRANSFER REFERENCE',keys[session.transfer].reference,'LEARNING NOTE — NOT AUTHORIZED UNDER WALL',session.lesson,anime?'ANIME: use the following presentation contract; freeze all academic obligations before wrapping. No clues through imagery, counts, dialogue or reactions. Outcomes require a completed deliverable certified through the normal runtime. No time/attempt penalties. Guardian grammar wins.\n'+JSON.stringify(course.campaign.find(x=>x.phase===session.phase),null,2):'PLAIN PRESENTATION','[END ENGINE INPUT]'].join('\n\n');
}
export function reviewQueue(course,state,now=Date.now()){
 const rows=[];
 for(const s of course.sessions){
  const events=state.attempts.filter(a=>[s.main,s.transfer].includes(a.problemId));
  if(!events.length){rows.push({order:s.order,reason:'No attempt recorded',priority:4,due:null});continue;}
  const latest=events.at(-1);
  if(['shaky','incorrect'].includes(latest.result)){rows.push({order:s.order,reason:'Repair recorded difficulty',priority:0,due:null});continue;}
  if(latest.result==='unreviewed'){rows.push({order:s.order,reason:'Saved attempt awaits review',priority:2,due:null});continue;}
  const good=events.filter(a=>a.result==='secure'&&a.assistance==='independent'&&!a.noteSeenDuringAttempt);
  if(!good.length){rows.push({order:s.order,reason:'Independent evidence still needed',priority:1,due:null});continue;}
  const days=[...new Set(good.map(a=>a.at.slice(0,10)))];const last=good.at(-1);const due=Date.parse(last.at)+course.reviewDays[Math.min(days.length-1,course.reviewDays.length-1)]*86400000;
  rows.push({order:s.order,reason:due<=now?'Delayed retention review due':'Next retention review',priority:due<=now?1:3,due});
 }
 return rows.sort((a,b)=>a.priority-b.priority||(a.due??0)-(b.due??0)||a.order-b.order);
}
