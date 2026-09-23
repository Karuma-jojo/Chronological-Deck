import {STORAGE_KEY,emptyEvidence,validateEvidence,mergeEvidence,expose,taskText,sceneText,publicOpening,compilerPacket,reviewQueue} from './core.js';
import SMMC_CONNECTIONS_BY_T25 from '../../course/smmc/connection-index-v1.mjs';
import {readWorkspaceNav,rememberT25Location,t25Href,smmcHref,restoreViewport,hasStoredWorkspaceNav,reconcileWorkspaceNavCloud,enableWorkspaceNavCloud} from '../workspace-nav.js';
import {readWorkspaceDraft,writeWorkspaceDraft,clearWorkspaceDraft} from '../workspace-drafts.js';
import {workspaceCloudState,reconcileWorkspaceScope,scheduleWorkspaceScopeSync} from '../workspace-cloud.js';
const $=id=>document.getElementById(id);
const tell=x=>$('status').textContent=x;
const uuid=()=>crypto.randomUUID();
let course,state,session,problemId,lastSaved=null,keys=null,notesPromise=null,fullCoursePromise=null,visit=0,noteSeen=false,referenceBefore=false,storageOK=true,currentTaskKind='main',cloudReady=false,cloudApplying=false,cloudReconciling=false;
const put=(id,text)=>$(id).textContent=text;
function cloudBadge(kind='local',text){
 const el=$('workspaceCloud');if(!el)return;
 el.className='workspace-cloud '+(kind==='local'?'':kind);
 el.textContent=text||(kind==='synced'?'Synced ☁':kind==='syncing'?'Saving…':kind==='error'?'Cloud issue':'Local');
}
function renderCloudBadge(){
 const cloud=workspaceCloudState();
 cloudBadge(cloud.signedIn?'syncing':'local',cloud.signedIn?'Checking ☁':'Local');
}
function applyT25CloudResult(result){
 if(result.status==='error'){cloudBadge('error','Saved locally');return;}
 if(result.status==='local-only'){cloudBadge('local','Local');return;}
 if(result.payload){
   cloudApplying=true;
   state=result.payload;
   if(storageOK)try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{storageOK=false;}
   renderHistory();renderQueue();setPresentation();
   cloudApplying=false;
 }
 cloudBadge('synced','Synced ☁');
}
async function json(url){const r=await fetch(url);if(!r.ok)throw Error(`Could not load ${url} (${r.status})`);return r.json();}
async function runtimeCourse(){try{return await json('course/generated/runtime.json');}catch{return json('course/generated/course.json');}}
async function fullCourse(){return fullCoursePromise??=json('course/generated/course.json');}
async function noteBank(){
 if(notesPromise)return notesPromise;
 notesPromise=json('course/generated/notes.json').catch(async()=>{
   const full=await fullCourse();
   return {
     sessions:Object.fromEntries(full.sessions.map(s=>[s.order,s.lesson])),
     bridges:Object.fromEntries(full.bridges.map(b=>[b.id,b.lesson])),
   };
 });
 return notesPromise;
}
function persist(message){
 if(storageOK){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{storageOK=false;}}
 if(message)tell(message+(storageOK?'':' — held in memory only; export now to keep it.'));
 if(cloudReady&&!cloudApplying){
   if(workspaceCloudState().signedIn)cloudBadge('syncing','Saving…');
   scheduleWorkspaceScopeSync(
     't25_course',
     ()=>state,
     (local,remote)=>remote?mergeEvidence(local,remote,course):local,
     applyT25CloudResult
   );
 }
 return storageOK;
}
async function reconcileT25Cloud(){
 if(cloudReconciling)return;
 if(!workspaceCloudState().signedIn){cloudReady=true;cloudBadge('local','Local');return;}
 cloudReconciling=true;cloudBadge('syncing','Syncing…');
 try{
   const result=await reconcileWorkspaceScope('t25_course',state,(local,remote)=>remote?mergeEvidence(local,remote,course):local);
   applyT25CloudResult(result);
 }catch(error){cloudBadge('error','Saved locally');}
 finally{cloudReady=true;cloudReconciling=false;}
}
function options(select,items){select.replaceChildren(...items.map(([value,label])=>{const o=document.createElement('option');o.value=value;o.textContent=label;return o;}));}
function button(label,fn){const b=document.createElement('button');b.textContent=label;b.addEventListener('click',fn);return b;}
function sessionsList(){
 const q=$('search').value.toLowerCase().trim();const list=course.sessions.filter(s=>`${s.order} ${s.card.syllabusCode} ${s.card.title}`.toLowerCase().includes(q));
 options($('session'),list.map(s=>[s.order,`${String(s.order).padStart(3,'0')} · ${s.card.syllabusCode} · ${s.card.title}`]));
 if(list.some(s=>s.order===session?.order))$('session').value=session.order;
}
function renderWorkspaceNav(){
 const order=session?.order||readWorkspaceNav().t25.session;
 const anime=$('presentation').value==='anime';
 $('workspaceT25').href=t25Href({session:order,presentation:'plain',task:currentTaskKind});
 $('workspaceAster').href=t25Href({session:order,presentation:'anime',task:currentTaskKind});
 $('workspaceSMMC').href=smmcHref();
 $('resumeSMMC').href=smmcHref();
 $('workspaceT25').classList.toggle('active',!anime);
 $('workspaceAster').classList.toggle('active',anime);
 put('workspacePosition',`Session ${String(order).padStart(3,'0')} · ${currentTaskKind==='transfer'?'transfer':'main'} · ${anime?'Aster':'Plain'}`);
}
function renderSmmcConnections(){
 if(!session)return;
 const target=session.card.targetCode||String(session.card.syllabusCode||'').split('.')[0];
 const rows=SMMC_CONNECTIONS_BY_T25[target]||[];
 put('smmcConnectionNote',rows.length
  ? `${rows.length} historical SMMC problem${rows.length===1?'':'s'} map to target ${target}. Open one and you can return to this exact T25 session.`
  : `No audited historical SMMC problem is mapped directly to target ${target} yet.`);
 const box=$('smmcConnections');box.className='connection-list';
 box.replaceChildren(...rows.slice(0,12).map(([id,east])=>{
  const m=id.match(/^SMMC-(\d{4})-([ABC])(\d)$/);
  const label=m?`${m[1]} ${m[2]}${m[3]}`:id;
  const a=document.createElement('a');a.className='connection-link';a.href=smmcHref({tab:'map',problemId:id,focus:'histTitle'});
  const strong=document.createElement('strong');strong.textContent=label;
  const small=document.createElement('small');small.textContent=east?'East A/B · historical map':'C supplementary · historical map';
  a.append(strong,small);return a;
 }));
}
function renderQueue(){
 $('queue').replaceChildren(...reviewQueue(course,state).slice(0,12).map(r=>button(`${String(r.order).padStart(3,'0')} · ${r.reason}${r.due?' · '+new Date(r.due).toISOString().slice(0,10):''}`,()=>selectSession(r.order))));
}
function renderHistory(){
 const items=state.attempts.filter(a=>a.problemId===problemId).slice(-12).reverse();
 $('history').replaceChildren(...items.map(a=>{const el=document.createElement('article');el.textContent=`${a.at} · ${a.assistance} · ${a.result}${a.reviewOf?' · review of saved attempt':''}\n${a.referenceSeenBefore?'Reference previously exposed. ':''}${a.noteSeenDuringAttempt?'Learning note used during attempt. ':''}\n${a.answer}`;return el;}));
}
function showProblem(id,context='session'){
 if(problemId)writeWorkspaceDraft('t25',problemId,$('answer').value);
 problemId=id;visit++;lastSaved=null;noteSeen=false;
 const p=course.problems[id];const prior=state.exposures[id];referenceBefore=!!prior?.referenceSeenAt;
 put('exposure',prior?`Previously displayed in this log (${prior.views} view${prior.views===1?'':'s'}).${prior.referenceSeenAt?' Evaluator reference has been opened.':''}${prior.packetExportedAt?' Engine packet exported.':''}`:'First display in this log. Outside exposure is unknown.');
 expose(state,id);persist();
 put('taskMeta',`${id} · ${p.kind}`);put('problem',taskText(p));$('answer').value=readWorkspaceDraft('t25',id);$('assistance').value='independent';$('minutes').value='0';
 $('reference').hidden=true;put('reference','');$('learning').hidden=true;put('learning','');$('reveal').disabled=true;$('review').disabled=true;
 renderHistory();renderQueue();
 $('copyOpening').disabled=!p.order;$('copyPacket').disabled=!p.order;
 // A mixed or bridge task uses no session scene that could imply a mathematical connection.
 $('scene').hidden=context!=='session'||!p.order||$('presentation').value!=='anime';
 $('story').hidden=context!=='session'||!p.order||$('presentation').value!=='anime';
 $('contract').hidden=context!=='session';
 if(context!=='session'){put('title',context==='bridge'?'Prerequisite bridge':'Mixed practice');put('sessionMeta','Practice bank · no topic label supplied');}
}
function setPresentation(){
 const anime=$('presentation').value==='anime',p=course.problems[problemId];const ep=course.campaign.find(x=>x.phase===session.phase);
 rememberT25Location({session:session.order,presentation:anime?'anime':'plain',task:currentTaskKind});
 window.history.replaceState(null,'',t25Href({session:session.order,presentation:anime?'anime':'plain',task:currentTaskKind}));
 renderWorkspaceNav();
 put('scene',sceneText(ep));$('scene').hidden=!anime||!p?.order||$('contract').hidden;$('story').hidden=!anime||!p?.order||$('contract').hidden;
 options($('storyChoice'),ep.choice.map((v,i)=>[i,v]));$('storyChoice').value=state.story[ep.phase]?.choice??0;
 put('closure',state.story[ep.phase]?.completed?ep.closure+' '+ep.choiceOutcomes[state.story[ep.phase].choice]:'The episode remains open. Pauses and incorrect attempts carry no story penalty.');
}
function selectSession(order,kind='main'){
 session=course.sessions.find(s=>s.order===Number(order));if(!session)throw Error('Unknown session');
 currentTaskKind=kind==='transfer'?'transfer':'main';
 $('search').value='';sessionsList();$('session').value=session.order;
 put('sessionMeta',`Phase ${session.phase} · ${session.card.id}`);put('title',session.card.title);
 put('contractText',[session.card.centralCapability,'PREREQUISITES',...session.card.entryPrerequisites,'REQUIRED OWNERSHIP',...session.card.requiredOwnership,'EXIT',session.card.exitCondition,'OUT OF SCOPE',...session.card.outOfScope,session.evidenceWarning].join('\n\n'));
 $('previous').disabled=session.order===1;$('next').disabled=session.order===162;
 showProblem(session[currentTaskKind]);setPresentation();renderSmmcConnections();
}
async function evaluator(){if(!keys)keys=await json('course/generated/evaluator.json');return keys;}
async function reveal(){
 const id=problemId,token=visit,saved=lastSaved;if(!saved)return;
 try{const refs=await evaluator();if(problemId!==id||visit!==token||lastSaved!==saved)return;
  const r=refs[id];put('reference',(r.answer!==undefined?`Correct option: ${String.fromCharCode(65+r.answer)}\n\n`:'')+r.reference+'\n\n'+r.rubric.map(x=>`${x.points} points: ${x.criterion}`).join('\n')+'\n\n'+r.marking);
  $('reference').hidden=false;expose(state,id,undefined,'referenceSeenAt');persist('Reference opened and exposure recorded.');
 }catch(e){tell(e.message);}
}
async function copy(text){try{await navigator.clipboard.writeText(text);tell('Copied.');}catch{const area=document.createElement('textarea');area.value=text;area.readOnly=true;area.setAttribute('aria-label','Copy text manually');$('status').replaceChildren('Clipboard unavailable. Copy the text below:',area);area.select();}}
function download(name,data){const url=URL.createObjectURL(new Blob([data],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
async function init(){
 const initialParams=new URLSearchParams(location.search);
 const explicitWorkspace=initialParams.has('session')||initialParams.has('presentation')||initialParams.has('task');
 let navReconciled=false;
 if(!explicitWorkspace&&!hasStoredWorkspaceNav()&&workspaceCloudState().signedIn){
   await Promise.race([
     reconcileWorkspaceNavCloud().then(()=>{navReconciled=true;}),
     new Promise(resolve=>setTimeout(resolve,700))
   ]);
 }
 course=await runtimeCourse();state=emptyEvidence();
 try{const raw=localStorage.getItem(STORAGE_KEY);if(raw)state=validateEvidence(JSON.parse(raw),course);}catch{storageOK=false;tell('Existing study storage could not be read. It has not been overwritten. New work is held in memory; export it before leaving.');}
 const params=initialParams,remembered=readWorkspaceNav();
 const requestedPresentation=params.get('presentation');
 $('presentation').value=requestedPresentation==='anime'||requestedPresentation==='plain'?requestedPresentation:remembered.t25.presentation;
 const requestedSession=Number(params.get('session'));
 const requestedTask=params.get('task')==='transfer'?'transfer':params.get('task')==='main'?'main':remembered.t25.task;
 sessionsList();selectSession(Math.min(162,Math.max(1,Number.isInteger(requestedSession)&&requestedSession?requestedSession:remembered.t25.session)),requestedTask);
 $('search').addEventListener('input',sessionsList);$('session').addEventListener('change',()=>selectSession($('session').value));
 $('answer').addEventListener('input',()=>{if(problemId)writeWorkspaceDraft('t25',problemId,$('answer').value);});
 $('previous').onclick=()=>selectSession(session.order-1);$('next').onclick=()=>selectSession(session.order+1);
 $('mainTask').onclick=()=>selectSession(session.order);$('transferTask').onclick=()=>selectSession(session.order,'transfer');$('presentation').onchange=setPresentation;
 $('note').onclick=async()=>{
  try{
   const p=course.problems[problemId],b=course.bridges.find(x=>x.tasks.includes(problemId)),notes=await noteBank();
   const note=p.order?notes.sessions[p.order]:b?notes.bridges[b.id]:null;
   if(!note){tell('No learning note is attached to this synthesis or objective task.');return;}
   put('learning','LEARNING NOTE — ASSISTANCE, OUTSIDE WALL\n\n'+note);$('learning').hidden=false;noteSeen=true;$('assistance').value='guided';expose(state,problemId,undefined,'lessonSeenAt');persist('Learning note opened; assistance recorded for this attempt.');
  }catch(e){tell('Could not load learning note: '+e.message);}
 };
 $('save').onclick=()=>{
  const answer=$('answer').value.trim(),minutes=Number($('minutes').value);
  if(!answer){tell('Record your working or what you attempted before saving.');return;}
  if(answer.length>50000||!Number.isFinite(minutes)||minutes<0||minutes>100000){tell('Check the answer length and minutes.');return;}
  const revealedSince=!!state.exposures[problemId]?.referenceSeenAt&&!referenceBefore;
  const assistance=revealedSince?'revealed':noteSeen&&$('assistance').value==='independent'?'guided':$('assistance').value;
  const a={id:uuid(),problemId,at:new Date().toISOString(),answer,assistance,minutes,result:'unreviewed',error:'',referenceSeenBefore:!!state.exposures[problemId]?.referenceSeenAt,noteSeenDuringAttempt:noteSeen};
  state.attempts.push(a);lastSaved=a.id;clearWorkspaceDraft('t25',problemId);$('reveal').disabled=false;$('review').disabled=false;persist('Attempt saved. Academic clearance is unchanged.');renderHistory();renderQueue();
 };
 $('reveal').onclick=reveal;
 $('saveReview').onclick=()=>{
  const a=state.attempts.find(x=>x.id===lastSaved);if(!a||a.problemId!==problemId)return;
  state.attempts.push({...a,id:uuid(),at:new Date().toISOString(),reviewOf:a.id,result:$('result').value,error:$('error').value});persist('Review saved as a separate record.');renderHistory();renderQueue();
 };
 $('copyOpening').onclick=()=>{const p=course.problems[problemId];copy(publicOpening(course,course.sessions[p.order-1],$('presentation').value==='anime',problemId));};
 $('copyPacket').onclick=async()=>{
  const anime=$('presentation').value==='anime';
  try{
    const [full,refs]=await Promise.all([fullCourse(),evaluator()]);
    const s=full.sessions[full.problems[problemId].order-1];
    await copy(compilerPacket(full,s,refs,anime));expose(state,s.main,undefined,'packetExportedAt');persist();
  }catch(e){tell(e.message);}
 };
 $('export').onclick=()=>download('t25-study-record.json',JSON.stringify(state,null,2));
 $('import').onchange=async e=>{
  const file=e.target.files[0];if(!file)return;try{if(file.size>10000000)throw Error('Evidence file is too large');const incoming=validateEvidence(JSON.parse(await file.text()),course);state=mergeEvidence(state,incoming,course);persist('Evidence merged; existing attempts retained.');renderHistory();renderQueue();setPresentation();}catch(err){tell('Import rejected: '+err.message);}finally{e.target.value='';}
 };
 put('setWarning',course.assessmentWarning);
 options($('setSelect'),course.sets.map(s=>[s.id,`${s.title} · ${s.minutes} min guide`]));
 $('startSet').onclick=()=>{
  const set=course.sets.find(s=>s.id===$('setSelect').value);
  $('setItems').replaceChildren(...set.problems.map((id,i)=>button(`Item ${i+1}${state.exposures[id]?' · previously displayed':''}`,()=>showProblem(id,'set'))));
  showProblem(set.problems[0],'set');tell(`${set.title}. Provisional time guide: ${set.minutes} minutes. No countdown penalty. Items reuse the bank; this is not an unseen official mock.`);
 };
 $('bridges').replaceChildren(...course.bridges.flatMap(b=>[...b.tasks.map((id,i)=>button(`${b.title} · ${i+1}`,()=>{showProblem(id,'bridge');tell(`Prerequisite bridge. Open the learning note if needed; this grants no atomic clearance.`);}))]));
 $('saveChoice').onclick=()=>{const old=state.story[session.phase];state.story[session.phase]={choice:Number($('storyChoice').value),completed:old?.completed||false};persist('Story choice saved.');setPresentation();};
 $('finishStory').onclick=()=>{state.story[session.phase]={choice:Number($('storyChoice').value),completed:true};persist('Your report of SPIRE phase certification was recorded for story continuity only.');setPresentation();};
 if(!navReconciled)void reconcileWorkspaceNavCloud().finally(enableWorkspaceNavCloud);
 else enableWorkspaceNavCloud();
 renderCloudBadge();
 void reconcileT25Cloud();
 document.addEventListener('chrono:cloud-context-changed',()=>{cloudReady=false;void reconcileT25Cloud();});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&cloudReady&&workspaceCloudState().signedIn)void reconcileT25Cloud();});
 window.addEventListener('pagehide',()=>{
   if(problemId)writeWorkspaceDraft('t25',problemId,$('answer').value);
   rememberT25Location({session:session.order,presentation:$('presentation').value,task:currentTaskKind,scrollY:window.scrollY});
 });
 restoreViewport({focusId:params.get('focus'),scrollY:remembered.t25.scrollY});
 if(storageOK)tell(`Ready: ${course.sessions.length} sessions and ${Object.keys(course.problems).length} original tasks. Resumed at session ${String(session.order).padStart(3,'0')} · ${currentTaskKind}.`);
}
init().catch(e=>tell('Course could not start: '+e.message));
