import {STORAGE_KEY,emptyEvidence,validateEvidence,mergeEvidence,expose,exposeAnswersForSession,taskText,reviewQueue,moduleEvidenceSummary,compilerPacket,freshProbePacket,evidenceIsCurrent,prepareAssessmentFingerprints,prepareContractHashes,migrateHistoricalLessonAnswerExposure,answerExposureAt} from './core.js';
import {applyCourseOverrides} from './overrides.js';

const $=id=>document.getElementById(id);
const tell=x=>$('status').textContent=x;
const uuid=()=>crypto.randomUUID();
let course,roadmap,state,session,problemId,lastSaved=null,keys=null,visit=0,noteSeen=false,storageOK=true,activeModuleId=null;
const drafts=new Map();
const put=(id,text)=>$(id).textContent=text;
async function json(url){const r=await fetch(url);if(!r.ok)throw Error(`Could not load ${url} (${r.status})`);return r.json();}
function persist(message){if(storageOK){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{storageOK=false;}}if(message)tell(message+(storageOK?'':' — held in memory only; export now to keep it.'));return storageOK;}
function options(select,items){select.replaceChildren(...items.map(([value,label,disabled])=>{const o=document.createElement('option');o.value=value;o.textContent=label;o.disabled=!!disabled;return o;}));}
function button(label,fn){const b=document.createElement('button');b.textContent=label;b.addEventListener('click',fn);return b;}
function modules(){return course.modules.slice().sort((a,b)=>a.order-b.order);}
function moduleMeta(id=activeModuleId){return course.modules.find(m=>m.id===id);}
function moduleSessions(id=activeModuleId){return course.sessions.filter(s=>s.moduleId===id).sort((a,b)=>a.order-b.order);}
function moduleCode(id=activeModuleId){const m=moduleMeta(id);return m?`M${String(m.order).padStart(2,'0')}`:'M??';}

function renderRoadmap(){
 const list=$('roadmap');list.replaceChildren();
 for(const m of roadmap.modules){
  const loaded=!!moduleMeta(m.id),active=m.id===activeModuleId;
  const row=document.createElement('div');row.className='roadmap-row'+(active?' active':' planned');
  const status=m.availability==='authored'?'AUTHORED':m.availability==='validation'?'VALIDATING':'PLANNED';
  row.innerHTML=`<span>${String(m.order).padStart(2,'0')}</span><b>${m.title}</b><em>${status}</em>`;
  if(loaded){row.tabIndex=0;row.setAttribute('role','button');row.addEventListener('click',()=>selectModule(m.id));row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectModule(m.id);}});}
  list.append(row);
 }
}
function renderQueue(){
 const rows=reviewQueue(course,state,Date.now(),activeModuleId).slice(0,12);
 $('queue').replaceChildren(...rows.map(r=>button(`${String(r.order).padStart(2,'0')} · ${r.reason}${r.due?' · '+new Date(r.due).toISOString().slice(0,10):''}`,()=>selectSession(r.sessionId))));
}
function renderModuleEvidence(){
 const s=moduleEvidenceSummary(course,state,activeModuleId),code=moduleCode();
 put('evidenceSummary',`${s.both}/${s.total} ${code} sessions currently have fresh independent secure evidence on both fixed main and transfer tasks. This is evidence coverage, not automatic module clearance.`);
}
function renderHistory(){
 const items=state.attempts.filter(a=>a.problemId===problemId).slice(-12).reverse();
 $('history').replaceChildren(...items.map(a=>{const el=document.createElement('article');const current=evidenceIsCurrent(a,course);el.textContent=`${a.at} · ${a.assistance} · ${a.result}${a.reviewOf?' · review':''}${current?'':' · STALE CONTRACT/ASSESSMENT'}\n${a.referenceSeenBefore?'Answer reference was already exposed. ':''}${a.noteSeenDuringAttempt?'Learning note used. ':''}\n${a.answer}`;return el;}));
}
function sessionsList(){
 const q=$('search').value.toLowerCase().trim(),all=moduleSessions();
 const list=all.filter(s=>`${s.order} ${s.id} ${s.title} ${s.focus}`.toLowerCase().includes(q));
 options($('session'),list.map(s=>[String(s.order),`${String(s.order).padStart(2,'0')} · ${s.title}`]));
 if(list.some(s=>s.id===session?.id))$('session').value=String(session.order);
}
function contractText(s){return [s.centralCapability,'PRINCIPAL OBSTACLE',s.principalObstacle,'ENTRY PREREQUISITES',...s.entryPrerequisites,'REQUIRED OWNERSHIP',...s.requiredOwnership,'APPLICATION SCOPE',s.applicationScope,'TRANSFER SCOPE',s.transferScope,'EXIT CONDITION',s.exitCondition,'OUT OF SCOPE',...s.outOfScope].join('\n\n');}
function captureDraft(){
 if(!problemId)return;
 drafts.set(problemId,{answer:$('answer').value,assistance:$('assistance').value,minutes:$('minutes').value,noteSeen:!!noteSeen});
}
function showProblem(id){
 captureDraft();
 problemId=id;visit++;lastSaved=null;
 const draft=drafts.get(id);noteSeen=!!draft?.noteSeen;
 const p=course.problems[id],prior=state.exposures[id];
 put('taskMeta',`${p.kind.toUpperCase()} · ${id}`);put('problem',taskText(p));
 put('exposure',prior?`Previously displayed in this browser log (${prior.views} view${prior.views===1?'':'s'}).${prior.referenceSeenAt?' Answer-bearing material has been exposed for this task.':''}`:'First display in this browser log. Outside exposure is unknown.');
 expose(state,id);persist();
 $('answer').value=draft?.answer||'';$('assistance').value=draft?.assistance||'independent';$('minutes').value=draft?.minutes??'0';$('reference').hidden=true;put('reference','');$('learning').hidden=true;put('learning','');$('reveal').disabled=true;$('review').disabled=true;renderHistory();renderQueue();renderModuleEvidence();
}
function selectSession(orderOrId,kind='main'){
 const list=moduleSessions(),wanted=typeof orderOrId==='string'&&orderOrId.includes('::')?list.find(s=>s.id===orderOrId):list.find(s=>s.order===Number(orderOrId));
 session=wanted;if(!session)throw Error('Unknown session in active module');
 $('search').value='';sessionsList();$('session').value=String(session.order);
 put('sessionMeta',`${moduleCode()} · Session ${String(session.order).padStart(2,'0')} · ${session.id}`);put('title',session.title);put('focus',session.focus);put('contractText',contractText(session));
 const idx=list.findIndex(s=>s.id===session.id);$('previous').disabled=idx===0;$('next').disabled=idx===list.length-1;
 showProblem(session[kind]);window.history.replaceState(null,'',`?module=${moduleMeta().order}&session=${session.order}`);
}
function applyModuleHeader(){
 const m=moduleMeta();put('moduleTitle',`${moduleCode()} · ${m.title}`);put('moduleDestination',m.destination||'');put('moduleGate',m.gate||'Module clearance requires current independent evidence; page completion alone is insufficient.');
 $('module').value=m.id;put('sessionSearchLabel',`Find a ${moduleCode()} session`);
}
function selectModule(id,requested=1){
 if(!moduleMeta(id))throw Error('Unknown authored module');
 captureDraft();activeModuleId=id;session=null;problemId=null;$('search').value='';applyModuleHeader();sessionsList();renderRoadmap();selectSession(requested);
}
async function reveal(){
 const id=problemId,token=visit,saved=lastSaved;if(!saved)return;
 try{if(problemId!==id||visit!==token||lastSaved!==saved)return;const r=keys[id];
  put('reference',r.reference+'\n\n'+r.rubric.map(x=>`${x.points} points: ${x.criterion}`).join('\n')+'\n\n'+r.marking);$('reference').hidden=false;expose(state,id,undefined,'referenceSeenAt');persist('Evaluator reference opened; answer exposure recorded.');
 }catch(e){tell(e.message);}
}
async function copy(text){try{await navigator.clipboard.writeText(text);tell('Copied.');return true;}catch{const area=document.createElement('textarea');area.value=text;area.readOnly=true;area.setAttribute('aria-label','Copy text manually');$('status').replaceChildren('Clipboard unavailable. Copy below:',area);area.select();return false;}}
function download(name,data){const url=URL.createObjectURL(new Blob([data],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}

async function loadCourse(meta){
 const allSessions=[],allProblems={},allKeys={},allModules=[];let legacyPolicy={};
 for(const spec of meta.moduleSources||[]){
  if(spec.sourceType==='legacy-packs'){
   const [packs,evalParts,repair]=await Promise.all([Promise.all(spec.packs.map(json)),Promise.all(spec.evaluatorPacks.map(json)),spec.repairPack?json(spec.repairPack):Promise.resolve(null)]);
   const localKeys=Object.assign({},...evalParts),local={...meta,module:spec.module,sessions:packs.flatMap(p=>p.sessions).sort((a,b)=>a.order-b.order),problems:Object.assign({},...packs.map(p=>p.problems))};
   applyCourseOverrides(local,localKeys,repair);
   for(const s of local.sessions)s.instructionVersion=local.instructionVersion||meta.version;
   allSessions.push(...local.sessions);Object.assign(allProblems,local.problems);Object.assign(allKeys,localKeys);allModules.push(spec.module);
   legacyPolicy={instructionVersion:local.instructionVersion,historicalLessonAnswerOverlap:local.historicalLessonAnswerOverlap,instructionSeparation:local.instructionSeparation};
  }else if(spec.sourceType==='authoring-pack'){
   const a=await json(spec.source);
   for(const s of a.sessions)s.instructionVersion=a.instructionVersion||a.version;
   allSessions.push(...a.sessions);Object.assign(allProblems,a.problems);Object.assign(allKeys,a.evaluators);allModules.push(a.module);
  }else throw Error(`Unknown module source type ${spec.sourceType}`);
 }
 const built={...meta,...legacyPolicy,modules:allModules.sort((a,b)=>a.order-b.order),sessions:allSessions,problems:allProblems};
 await prepareContractHashes(built);await prepareAssessmentFingerprints(built,allKeys);
 return {built,allKeys};
}
async function init(){
 const [meta,road]=await Promise.all([json('course/t22/generated/course-meta.json'),json('course/t22/generated/roadmap.json')]);roadmap=road;
 const loaded=await loadCourse(meta);course=loaded.built;keys=loaded.allKeys;
 state=emptyEvidence();
 try{const raw=localStorage.getItem(STORAGE_KEY);if(raw)state=validateEvidence(JSON.parse(raw),course);if(migrateHistoricalLessonAnswerExposure(state,course))persist('Historical answer-containing M01 lesson exposure was conservatively migrated; prior attempts were preserved.');}catch{storageOK=false;tell('Existing T22 Elite study storage could not be read. It has not been overwritten. Export any new work before leaving.');}
 options($('module'),modules().map(m=>[m.id,`${moduleCode(m.id)} · ${m.title}`]));
 const params=new URLSearchParams(location.search),requestedModule=Number(params.get('module'))||1,requestedSession=Math.max(1,Number(params.get('session'))||1);
 const initial=modules().find(m=>m.order===requestedModule)||modules()[0];selectModule(initial.id,Math.min(moduleSessions(initial.id).length,requestedSession));
 put('assessmentWarning',course.assessmentWarning);
 $('module').addEventListener('change',()=>selectModule($('module').value,1));$('search').addEventListener('input',sessionsList);$('session').addEventListener('change',()=>selectSession($('session').value));
 $('previous').onclick=()=>{const list=moduleSessions(),idx=list.findIndex(s=>s.id===session.id);if(idx>0)selectSession(list[idx-1].id);};
 $('next').onclick=()=>{const list=moduleSessions(),idx=list.findIndex(s=>s.id===session.id);if(idx>=0&&idx<list.length-1)selectSession(list[idx+1].id);};
 $('mainTask').onclick=()=>selectSession(session.id,'main');$('transferTask').onclick=()=>selectSession(session.id,'transfer');
 $('note').onclick=()=>{put('learning','LEARNING NOTE — ASSISTANCE, NOT INDEPENDENT EVIDENCE\n\n'+session.lesson);$('learning').hidden=false;noteSeen=true;if($('assistance').value==='independent')$('assistance').value='guided';const e=expose(state,problemId,undefined,'lessonSeenAt');e.lessonContentVersion=session.instructionVersion||course.instructionVersion||course.version;persist('Learning note opened; assistance exposure recorded.');};
 $('save').onclick=()=>{const answer=$('answer').value.trim(),minutes=Number($('minutes').value);if(!answer){tell('Record your working or attempted reasoning before saving.');return;}if(answer.length>100000||!Number.isFinite(minutes)||minutes<0||minutes>100000){tell('Check answer length and minutes.');return;}const referenceSeenBefore=!!answerExposureAt(state,problemId);const assistance=referenceSeenBefore?'revealed':noteSeen&&$('assistance').value==='independent'?'guided':$('assistance').value;const a={id:uuid(),problemId,at:new Date().toISOString(),answer,assistance,minutes,result:'unreviewed',error:'',referenceSeenBefore,noteSeenDuringAttempt:noteSeen,contractHash:session.contractHash,assessmentFingerprint:course.assessmentFingerprints[problemId]};state.attempts.push(a);lastSaved=a.id;$('reveal').disabled=false;$('review').disabled=false;persist('Attempt saved. No mastery clearance was granted.');renderHistory();renderQueue();renderModuleEvidence();};
 $('reveal').onclick=reveal;
 $('saveReview').onclick=()=>{const a=state.attempts.find(x=>x.id===lastSaved);if(!a||a.problemId!==problemId||a.reviewOf)return;state.attempts.push({...a,id:uuid(),at:new Date().toISOString(),reviewOf:a.id,result:$('result').value,error:$('error').value});persist('Review saved against the original attempt. It is not a new practice day.');renderHistory();renderQueue();renderModuleEvidence();};
 $('copyTask').onclick=()=>copy('[T22 ELITE — LEARNER TASK]\n\n'+taskText(course.problems[problemId]));
 $('copyPacket').onclick=async()=>{const targetSession=session,targetProblem=problemId,token=visit;try{if(visit!==token||problemId!==targetProblem||session.id!==targetSession.id){tell('Evaluator-packet export cancelled because navigation changed.');return;}const at=new Date().toISOString();exposeAnswersForSession(state,targetSession,at);persist('Answer-bearing packet export recorded for both fixed tasks.');await copy(compilerPacket(course,targetSession,keys,targetProblem));renderHistory();renderQueue();renderModuleEvidence();}catch(e){tell(e.message);}};
 $('copyFreshProbe').onclick=()=>copy(freshProbePacket(course,session));
 $('export').onclick=()=>download('t22-elite-study-record.json',JSON.stringify(state,null,2));
 $('import').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>15000000)throw Error('Evidence file is too large');const incoming=validateEvidence(JSON.parse(await file.text()),course);state=mergeEvidence(state,incoming,course);const migrated=migrateHistoricalLessonAnswerExposure(state,course);persist(migrated?'Evidence merged; legacy M01 answer-containing lesson exposure migrated conservatively.':'Evidence merged; existing attempts retained.');renderHistory();renderQueue();renderModuleEvidence();}catch(err){tell('Import rejected: '+err.message);}finally{e.target.value='';}};
 if(storageOK)tell(`Ready: ${course.modules.length} loaded modules, ${course.sessions.length} sessions, ${Object.keys(course.problems).length} fixed tasks, 65-module roadmap.`);
}
init().catch(e=>tell('T22 Elite course could not start: '+e.message));
