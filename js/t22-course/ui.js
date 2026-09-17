import {STORAGE_KEY,emptyEvidence,validateEvidence,mergeEvidence,expose,exposeAnswersForSession,taskText,reviewQueue,moduleEvidenceSummary,compilerPacket,freshProbePacket,evidenceIsCurrent,prepareAssessmentFingerprints} from './core.js';

const $=id=>document.getElementById(id);
const tell=x=>$('status').textContent=x;
const uuid=()=>crypto.randomUUID();
let course,roadmap,state,session,problemId,lastSaved=null,keys=null,visit=0,noteSeen=false,storageOK=true;
const drafts=new Map();
const put=(id,text)=>$(id).textContent=text;
async function json(url){const r=await fetch(url);if(!r.ok)throw Error(`Could not load ${url} (${r.status})`);return r.json();}
function persist(message){if(storageOK){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{storageOK=false;}}if(message)tell(message+(storageOK?'':' — held in memory only; export now to keep it.'));return storageOK;}
function options(select,items){select.replaceChildren(...items.map(([value,label,disabled])=>{const o=document.createElement('option');o.value=value;o.textContent=label;o.disabled=!!disabled;return o;}));}
function button(label,fn){const b=document.createElement('button');b.textContent=label;b.addEventListener('click',fn);return b;}

function renderRoadmap(){
 const list=$('roadmap');list.replaceChildren();
 for(const m of roadmap.modules){const row=document.createElement('div');row.className='roadmap-row'+(m.order===1?' active':' planned');row.innerHTML=`<span>${String(m.order).padStart(2,'0')}</span><b>${m.title}</b><em>${m.order===1?'AUTHORED':'PLANNED'}</em>`;list.append(row);}
}
function renderQueue(){
 const rows=reviewQueue(course,state).slice(0,12);
 $('queue').replaceChildren(...rows.map(r=>button(`${String(r.order).padStart(2,'0')} · ${r.reason}${r.due?' · '+new Date(r.due).toISOString().slice(0,10):''}`,()=>selectSession(r.order))));
}
function renderModuleEvidence(){
 const s=moduleEvidenceSummary(course,state);put('evidenceSummary',`${s.both}/${s.total} sessions currently have fresh independent secure evidence on both fixed main and transfer tasks. This is evidence coverage, not automatic M01 clearance.`);
}
function renderHistory(){
 const items=state.attempts.filter(a=>a.problemId===problemId).slice(-12).reverse();
 $('history').replaceChildren(...items.map(a=>{const el=document.createElement('article');const current=evidenceIsCurrent(a,course);el.textContent=`${a.at} · ${a.assistance} · ${a.result}${a.reviewOf?' · review':''}${current?'':' · STALE CONTRACT/ASSESSMENT'}\n${a.referenceSeenBefore?'Answer reference was already exposed. ':''}${a.noteSeenDuringAttempt?'Learning note used. ':''}\n${a.answer}`;return el;}));
}
function sessionsList(){
 const q=$('search').value.toLowerCase().trim();
 const list=course.sessions.filter(s=>`${s.order} ${s.id} ${s.title} ${s.focus}`.toLowerCase().includes(q));
 options($('session'),list.map(s=>[s.order,`${String(s.order).padStart(2,'0')} · ${s.title}`]));
 if(list.some(s=>s.order===session?.order))$('session').value=session.order;
}
function contractText(s){return [s.centralCapability,'PRINCIPAL OBSTACLE',s.principalObstacle,'ENTRY PREREQUISITES',...s.entryPrerequisites,'REQUIRED OWNERSHIP',...s.requiredOwnership,'APPLICATION SCOPE',s.applicationScope,'TRANSFER SCOPE',s.transferScope,'EXIT CONDITION',s.exitCondition,'OUT OF SCOPE',...s.outOfScope].join('\n\n');}
function showProblem(id){
 if(problemId)drafts.set(problemId,$('answer').value);
 problemId=id;visit++;lastSaved=null;noteSeen=false;
 const p=course.problems[id],prior=state.exposures[id];
 put('taskMeta',`${p.kind.toUpperCase()} · ${id}`);put('problem',taskText(p));
 put('exposure',prior?`Previously displayed in this browser log (${prior.views} view${prior.views===1?'':'s'}).${prior.referenceSeenAt?' Answer-bearing material has been exposed for this task.':''}`:'First display in this browser log. Outside exposure is unknown.');
 expose(state,id);persist();
 $('answer').value=drafts.get(id)||'';$('assistance').value='independent';$('minutes').value='0';$('reference').hidden=true;put('reference','');$('learning').hidden=true;put('learning','');$('reveal').disabled=true;$('review').disabled=true;renderHistory();renderQueue();renderModuleEvidence();
}
function selectSession(order,kind='main'){
 session=course.sessions.find(s=>s.order===Number(order));if(!session)throw Error('Unknown M01 session');
 $('search').value='';sessionsList();$('session').value=session.order;
 put('sessionMeta',`M01 · Session ${String(session.order).padStart(2,'0')} · ${session.id}`);put('title',session.title);put('focus',session.focus);put('contractText',contractText(session));
 $('previous').disabled=session.order===1;$('next').disabled=session.order===course.sessions.length;
 showProblem(session[kind]);window.history.replaceState(null,'',`?module=1&session=${session.order}`);
}
async function evaluator(){return keys;}
async function reveal(){
 const id=problemId,token=visit,saved=lastSaved;if(!saved)return;
 try{const refs=await evaluator();if(problemId!==id||visit!==token||lastSaved!==saved)return;const r=refs[id];
  put('reference',r.reference+'\n\n'+r.rubric.map(x=>`${x.points} points: ${x.criterion}`).join('\n')+'\n\n'+r.marking);$('reference').hidden=false;expose(state,id,undefined,'referenceSeenAt');persist('Evaluator reference opened; answer exposure recorded.');
 }catch(e){tell(e.message);}
}
async function copy(text){try{await navigator.clipboard.writeText(text);tell('Copied.');return true;}catch{const area=document.createElement('textarea');area.value=text;area.readOnly=true;area.setAttribute('aria-label','Copy text manually');$('status').replaceChildren('Clipboard unavailable. Copy below:',area);area.select();return false;}}
function download(name,data){const url=URL.createObjectURL(new Blob([data],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}

async function init(){
 const [meta,road]=await Promise.all([json('course/t22/generated/course-meta.json'),json('course/t22/generated/roadmap.json')]);
 const [packs,evalParts]=await Promise.all([Promise.all(meta.packs.map(json)),Promise.all(meta.evaluatorPacks.map(json))]);
 keys=Object.assign({},...evalParts);
 course={...meta,sessions:packs.flatMap(p=>p.sessions).sort((a,b)=>a.order-b.order),problems:Object.assign({},...packs.map(p=>p.problems))};roadmap=road;
 await prepareAssessmentFingerprints(course,keys);
 state=emptyEvidence();
 try{const raw=localStorage.getItem(STORAGE_KEY);if(raw)state=validateEvidence(JSON.parse(raw),course);}catch{storageOK=false;tell('Existing T22 Elite study storage could not be read. It has not been overwritten. Export any new work before leaving.');}
 renderRoadmap();sessionsList();
 const requested=Math.min(course.sessions.length,Math.max(1,Number(new URLSearchParams(location.search).get('session'))||1));selectSession(requested);
 put('moduleTitle',`M01 · ${course.module.title}`);put('moduleDestination',course.module.destination);put('moduleGate',course.module.gate);put('assessmentWarning',course.assessmentWarning);
 $('search').addEventListener('input',sessionsList);$('session').addEventListener('change',()=>selectSession($('session').value));
 $('previous').onclick=()=>selectSession(session.order-1);$('next').onclick=()=>selectSession(session.order+1);$('mainTask').onclick=()=>selectSession(session.order,'main');$('transferTask').onclick=()=>selectSession(session.order,'transfer');
 $('note').onclick=()=>{put('learning','LEARNING NOTE — ASSISTANCE, NOT INDEPENDENT EVIDENCE\n\n'+session.lesson);$('learning').hidden=false;noteSeen=true;if($('assistance').value==='independent')$('assistance').value='guided';expose(state,problemId,undefined,'lessonSeenAt');persist('Learning note opened; assistance exposure recorded.');};
 $('save').onclick=()=>{
  const answer=$('answer').value.trim(),minutes=Number($('minutes').value);if(!answer){tell('Record your working or attempted reasoning before saving.');return;}if(answer.length>100000||!Number.isFinite(minutes)||minutes<0||minutes>100000){tell('Check answer length and minutes.');return;}
  const referenceSeenBefore=!!state.exposures[problemId]?.referenceSeenAt;
  const assistance=referenceSeenBefore?'revealed':noteSeen&&$('assistance').value==='independent'?'guided':$('assistance').value;
  const a={id:uuid(),problemId,at:new Date().toISOString(),answer,assistance,minutes,result:'unreviewed',error:'',referenceSeenBefore,noteSeenDuringAttempt:noteSeen,contractHash:session.contractHash,assessmentFingerprint:course.assessmentFingerprints[problemId]};
  state.attempts.push(a);lastSaved=a.id;$('reveal').disabled=false;$('review').disabled=false;persist('Attempt saved. No mastery clearance was granted.');renderHistory();renderQueue();renderModuleEvidence();
 };
 $('reveal').onclick=reveal;
 $('saveReview').onclick=()=>{const a=state.attempts.find(x=>x.id===lastSaved);if(!a||a.problemId!==problemId||a.reviewOf)return;state.attempts.push({...a,id:uuid(),at:new Date().toISOString(),reviewOf:a.id,result:$('result').value,error:$('error').value});persist('Review saved against the original attempt. It is not a new practice day.');renderHistory();renderQueue();renderModuleEvidence();};
 $('copyTask').onclick=()=>copy('[T22 ELITE — LEARNER TASK]\n\n'+taskText(course.problems[problemId]));
 $('copyPacket').onclick=async()=>{
  const targetSession=session,targetProblem=problemId,token=visit;
  try{
   const refs=await evaluator();
   if(visit!==token||problemId!==targetProblem||session.id!==targetSession.id){tell('Evaluator-packet export cancelled because navigation changed.');return;}
   const at=new Date().toISOString();exposeAnswersForSession(state,targetSession,at);persist('Answer-bearing packet export recorded for both fixed tasks.');
   await copy(compilerPacket(course,targetSession,refs,targetProblem));renderHistory();renderQueue();renderModuleEvidence();
  }catch(e){tell(e.message);}
 };
 $('copyFreshProbe').onclick=()=>copy(freshProbePacket(course,session));
 $('export').onclick=()=>download('t22-elite-study-record.json',JSON.stringify(state,null,2));
 $('import').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>15000000)throw Error('Evidence file is too large');const incoming=validateEvidence(JSON.parse(await file.text()),course);state=mergeEvidence(state,incoming,course);persist('Evidence merged; existing attempts retained.');renderHistory();renderQueue();renderModuleEvidence();}catch(err){tell('Import rejected: '+err.message);}finally{e.target.value='';}};
 if(storageOK)tell(`Ready: ${course.sessions.length} authored M01 sessions, ${Object.keys(course.problems).length} fixed tasks, 65-module roadmap.`);
}
init().catch(e=>tell('T22 Elite course could not start: '+e.message));
