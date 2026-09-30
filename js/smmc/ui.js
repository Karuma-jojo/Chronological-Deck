import { FOUNDATION_UNITS } from '../../course/smmc/authoring/foundation-ladder.mjs';
import ledger from '../../course/smmc/ledger.mjs';
import { SMMC_UNITS_V1 } from '../../course/smmc/authoring/units-v1.mjs';
import { SMMC_PUBLIC_PROBLEMS_V1 } from '../../course/smmc/authoring/public-problems-v1.mjs';
import {
  emptySmmcState, validateSmmcState, mergeSmmcState, markExposure, exposureClass,
  markPaperExposure, paperExposureClass, paperKeyForProblem, pristinePaperKeys,
  selfReportUnitComplete, certifiedUnitIds,
} from '../../course/smmc/runtime/exposure.mjs';
import { emptySmmcStudy, validateSmmcStudy, mergeSmmcStudy } from '../../course/smmc/runtime/study.mjs';
import { unlockStatus } from '../../course/smmc/runtime/unlock.mjs';
import { officialPaperUrl } from '../../course/smmc/sources-v1.mjs';
import { routeStepsForT25Targets } from '../../course/smmc/t25-crosswalk.mjs';
import {readWorkspaceNav,rememberSmmcLocation,t25Href,smmcHref,restoreViewport,hasStoredWorkspaceNav,reconcileWorkspaceNavCloud,enableWorkspaceNavCloud} from '../workspace-nav.js';
import {readWorkspaceDraft,writeWorkspaceDraft,clearWorkspaceDraft} from '../workspace-drafts.js';
import {workspaceCloudState,reconcileWorkspaceScope,scheduleWorkspaceScopeSync} from '../workspace-cloud.js';

const $=id=>document.getElementById(id);
const HIST_KEY='chrono_smmc_historical_evidence_v1';
const STUDY_KEY='chrono_smmc_neutral_study_v1';
const uuid=()=>crypto.randomUUID();
const tell=x=>$('status').textContent=x;
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
function refreshSmmcViews(){
  renderUnit(currentUnit?.id||SMMC_UNITS_V1[0].id,currentTaskId);
  renderProblemList();
  if(currentProblem)renderHistorical(currentProblem.id);
  renderHistory();
}
function applySmmcCloudResult(kind,result){
  if(result.status==='error'){cloudBadge('error','Saved locally');return;}
  if(result.status==='local-only'){cloudBadge('local','Local');return;}
  let needsResync=false;
  if(result.payload){
    cloudApplying=true;
    if(kind==='historical'){
      const merged=mergeSmmcState(histState,result.payload,ledger,moduleIds,allUnitIds);
      needsResync=JSON.stringify(merged)!==JSON.stringify(result.payload);
      histState=merged;
    }else{
      const merged=mergeSmmcStudy(studyState,result.payload,Object.keys(SMMC_PUBLIC_PROBLEMS_V1));
      needsResync=JSON.stringify(merged)!==JSON.stringify(result.payload);
      studyState=merged;
    }
    if(storageOK){
      try{
        localStorage.setItem(HIST_KEY,JSON.stringify(histState));
        localStorage.setItem(STUDY_KEY,JSON.stringify(studyState));
      }catch{storageOK=false;}
    }
    refreshSmmcViews();
    cloudApplying=false;
  }
  cloudBadge('synced','Synced ☁');
  if(needsResync){
    if(kind==='historical')scheduleHistoricalSync(0);
    else scheduleStudySync(0);
  }
}
let histState=emptySmmcState();
let studyState=emptySmmcStudy();
let evaluatorPromise=null;
const evaluatorBank=()=>evaluatorPromise??=import('../../course/smmc/authoring/evaluator-v1.mjs').then(m=>m.SMMC_EVALUATOR_V1);
let currentUnit=null,currentTaskId=null,currentProblem=null,storageOK=true,currentTab='study',cloudReady=false,cloudApplying=false,cloudReconciling=false;
let researchVisible=false,paperVisible=false,synopsisVisible=false,pathVisible=false,lessonMode='learn';
const allUnitIds=SMMC_UNITS_V1.map(x=>x.id);
const moduleIds=[...new Set(SMMC_UNITS_V1.map(x=>x.moduleId))];
const cloneJson=value=>JSON.parse(JSON.stringify(value));

function scheduleHistoricalSync(delay=900){
  if(workspaceCloudState().signedIn)cloudBadge('syncing','Saving…');
  scheduleWorkspaceScopeSync(
    'smmc_historical',
    ()=>histState,
    (local,remote)=>mergeSmmcState(local,remote,ledger,moduleIds,allUnitIds),
    result=>applySmmcCloudResult('historical',result),
    delay
  );
}
function scheduleStudySync(delay=900){
  if(workspaceCloudState().signedIn)cloudBadge('syncing','Saving…');
  scheduleWorkspaceScopeSync(
    'smmc_study',
    ()=>studyState,
    (local,remote)=>mergeSmmcStudy(local,remote,Object.keys(SMMC_PUBLIC_PROBLEMS_V1)),
    result=>applySmmcCloudResult('study',result),
    delay
  );
}
function persistHistoricalCandidate(candidate){
  if(!storageOK){
    tell('Protected archive locked: durable browser storage is unavailable, so historical material was not revealed.');
    return false;
  }
  let checked;
  try{
    checked=validateSmmcState(candidate,ledger,moduleIds,allUnitIds);
  }catch(error){
    tell('Protected archive locked: the exposure record could not be validated.');
    return false;
  }
  try{
    localStorage.setItem(HIST_KEY,JSON.stringify(checked));
  }catch{
    storageOK=false;
    tell('Protected archive locked: exposure could not be durably recorded, so historical material was not revealed.');
    return false;
  }
  histState=checked;
  if(cloudReady&&!cloudApplying)scheduleHistoricalSync();
  return true;
}
function commitHistoricalMutation(mutator){
  const candidate=cloneJson(histState);
  mutator(candidate);
  return persistHistoricalCandidate(candidate);
}

function persist(){
  if(!storageOK)return false;
  try{
    localStorage.setItem(HIST_KEY,JSON.stringify(histState));
    localStorage.setItem(STUDY_KEY,JSON.stringify(studyState));
  }catch{
    storageOK=false;
    tell('Browser storage is unavailable. Export before leaving if you want to keep this session.');
    return false;
  }
  if(cloudReady&&!cloudApplying){
    scheduleHistoricalSync();
    scheduleStudySync();
  }
  return true;
}
async function reconcileSmmcCloud(){
  if(cloudReconciling)return;
  if(!workspaceCloudState().signedIn){cloudReady=true;cloudBadge('local','Local');return;}
  cloudReconciling=true;cloudBadge('syncing','Syncing…');
  try{
    const [historical,study]=await Promise.all([
      reconcileWorkspaceScope(
        'smmc_historical',
        histState,
        (local,remote)=>mergeSmmcState(local,remote,ledger,moduleIds,allUnitIds)
      ),
      reconcileWorkspaceScope(
        'smmc_study',
        studyState,
        (local,remote)=>mergeSmmcStudy(local,remote,Object.keys(SMMC_PUBLIC_PROBLEMS_V1))
      ),
    ]);
    applySmmcCloudResult('historical',historical);
    applySmmcCloudResult('study',study);
  }catch(error){cloudBadge('error','Saved locally');}
  finally{cloudReady=true;cloudReconciling=false;}
}
function download(name,obj){
  const url=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function opts(select,items){select.replaceChildren(...items.map(([value,label])=>{const o=document.createElement('option');o.value=value;o.textContent=label;return o;}));}
function renderWorkspaceNav(){
  const remembered=readWorkspaceNav();
  $('workspaceT25').href=t25Href({presentation:'plain'});
  $('workspaceAster').href=t25Href({presentation:'anime'});
  $('workspaceSMMC').href=smmcHref({
    tab:currentTab,
    unitId:currentUnit?.id||remembered.smmc.unitId,
    taskId:currentTaskId||remembered.smmc.taskId,
    problemId:currentProblem?.id||remembered.smmc.problemId,
  });
  $('resumeT25FromUnit').href=t25Href();
  $('resumeT25FromProblem').href=t25Href();
  put('workspacePosition',pathVisible?'Your learning path':currentTab==='map'
    ? `Past papers · ${currentProblem?problemLabel(currentProblem):'choose a paper'}`
    : `${currentUnit?.title||'Choose a lesson'}`);
}
function renderT25Connections(targetCodes,containerId){
  if(!targetCodes.length){$(containerId).replaceChildren();return;}
  const steps=routeStepsForT25Targets(targetCodes);
  const unique=[...new Map(steps.map(step=>[step.routeOrder,step])).values()];
  const box=$(containerId);box.className='connection-list';
  box.replaceChildren(...unique.map(step=>{
    const card=document.createElement('article');card.className='t25-connection';
    const title=document.createElement('strong');title.textContent=`${String(step.routeOrder).padStart(3,'0')} · ${step.syllabusCode} · ${step.title}`;
    const small=document.createElement('small');small.textContent=`${step.targetCode} · ${step.targetTitle}`;
    const actions=document.createElement('div');actions.className='actions';
    const plain=document.createElement('a');plain.className='button';plain.textContent='Open T25';plain.href=t25Href({session:step.routeOrder,presentation:'plain',task:'main',focus:'problem'});
    const aster=document.createElement('a');aster.className='button';aster.textContent='Open in Aster';aster.href=t25Href({session:step.routeOrder,presentation:'anime',task:'main',focus:'problem'});
    actions.append(plain,aster);card.append(title,small,actions);return card;
  }));
}
function replaceSmmcUrl(){
  const href=smmcHref({
    tab:currentTab,
    unitId:currentUnit?.id||null,
    taskId:currentTaskId||null,
    problemId:currentProblem?.id||null,
  });
  const url=new URL(href,location.href);if(pathVisible)url.searchParams.set('view','path');url.searchParams.set('activity',lessonMode);
  window.history.replaceState(null,'',url);
}
function saveViewport(){
  if(pathVisible)return;
  rememberSmmcLocation({
    tab:currentTab,
    unitId:currentUnit?.id||null,
    taskId:currentTaskId||null,
    problemId:currentProblem?.id||null,
    scrollY:window.scrollY,
  });
}
function switchTab(which,updateUrl=true,restore=true,saveCurrent=true){
  if(saveCurrent)saveViewport();
  pathVisible=which==='path';const study=which!=='map';currentTab=study?'study':'map';
  $('pathView').hidden=!pathVisible;$('studyView').hidden=!study||pathVisible;
  $('studyNav').hidden=!study||pathVisible;$('mapView').hidden=study;$('mapNav').hidden=study;
  document.querySelector('.layout').dataset.view=pathVisible?'path':currentTab;
  $('tabPath').classList.toggle('active',pathVisible);
  $('tabStudy').classList.toggle('active',study&&!pathVisible);$('tabMap').classList.toggle('active',!study);
  for(const id of ['tabPath','tabStudy','tabMap'])$(id).setAttribute('aria-pressed',String($(id).classList.contains('active')));
  rememberSmmcLocation({tab:currentTab,unitId:currentUnit?.id||null,taskId:currentTaskId||null,problemId:currentProblem?.id||null});
  renderWorkspaceNav();if(updateUrl)replaceSmmcUrl();
  if(restore&&pathVisible){window.scrollTo(0,0);}
  else if(restore){
    const remembered=readWorkspaceNav();
    restoreViewport({scrollY:remembered.smmc.scroll[currentTab]});
  }
}
function unitLabel(u){return (u.kind==='foundation'?'Chapter 1 · Step '+u.orderWithinModule:u.kind==='bridge'?'Bridge':'Method')+' · '+u.title;}
function renderUnitList(){
  const q=$('unitSearch').value.trim().toLowerCase();
  const list=[...FOUNDATION_UNITS,...SMMC_UNITS_V1.filter(u=>u.kind!=='foundation')].filter(u=>(u.id+' '+u.moduleId+' '+u.title+' '+u.learningNote).toLowerCase().includes(q));
  opts($('unitSelect'),list.map(u=>[u.id,unitLabel(u)]));
  if(currentUnit&&list.some(u=>u.id===currentUnit.id))$('unitSelect').value=currentUnit.id;
}
function renderFoundationPath(){
  const attempted=new Set(studyState.attempts.map(a=>a.taskId));
  const ids=FOUNDATION_UNITS.flatMap(u=>[u.mainTaskId,u.transferTaskId]);
  put('foundationProgress',`${ids.filter(id=>attempted.has(id)).length} of ${ids.length} exercises have a saved attempt. Attempts and self-reports do not certify mastery.`);
  $('continueFoundation').textContent=ids.every(id=>attempted.has(id))?'Return to mixed practice':attempted.size?'Continue chapter →':'Start chapter →';
  $('foundationPath').replaceChildren(...FOUNDATION_UNITS.map((u,i)=>{
    const b=document.createElement('button');b.type='button';
    b.setAttribute('aria-current',currentUnit?.id===u.id?'step':'false');
    const title=document.createElement('strong');title.textContent=`${i+1}. ${u.title}`;
    const detail=document.createElement('small');detail.textContent=`${u.stage} · ${[u.mainTaskId,u.transferTaskId].filter(id=>attempted.has(id)).length}/2 attempted`;
    b.append(title,detail);b.onclick=()=>{openLesson(u.id);};return b;
  }));
}
function showLessonMode(mode,scroll=false){
  lessonMode=mode==='learn'?'learn':'practice';
  $('learnPanel').hidden=lessonMode!=='learn';$('practicePanel').hidden=lessonMode!=='practice';
  $('showLearn').setAttribute('aria-pressed',String(lessonMode==='learn'));
  $('showPractice').setAttribute('aria-pressed',String(lessonMode==='practice'));
  if(mode==='review'){$('attemptHistory').open=true;}
  if(currentUnit)replaceSmmcUrl();
  if(scroll)$(mode==='review'?'attemptHistory':lessonMode==='learn'?'learnPanel':'practicePanel').scrollIntoView({block:'start'});
}
function openLesson(id,task=null){
  $('unitSearch').value='';renderUnitList();renderUnit(id,task);
  switchTab('study',true,false);
  if(window.innerWidth<=800)$('browseLessons').open=false;
  $('unitTitle').scrollIntoView({block:'start'});
}
function updateNextExercise(){
  const saved=studyState.attempts.some(a=>a.taskId===currentTaskId);
  const route=currentUnit.kind==='foundation'?FOUNDATION_UNITS:SMMC_UNITS_V1.filter(u=>u.kind!=='foundation');
  const last=route.at(-1).id===currentUnit.id;
  $('nextExercise').disabled=!saved;
  put('taskHelp',saved?'Attempt recorded. Continue when ready, or compare your reasoning with the optional help.':'Save your attempt to unlock help and the next problem. Incomplete work is welcome.');
  $('nextExercise').textContent=currentTaskId===currentUnit.mainTaskId?'Next problem →':last?'Return to your path':'Next lesson →';
  put('questionPosition',`Problem ${currentTaskId===currentUnit.mainTaskId?1:2} of 2 · ${currentUnit.title}`);
  $('mainTask').setAttribute('aria-pressed',String(currentTaskId===currentUnit.mainTaskId));
  $('transferTask').setAttribute('aria-pressed',String(currentTaskId===currentUnit.transferTaskId));
  $('revealRef').disabled=!saved;$('revealHint').disabled=!saved;
}
function saveGuidedDraft(){
  if(currentUnit?.guided)writeWorkspaceDraft('smmc',currentUnit.id+'-guided',$('guidedAnswer').value);
}
function renderUnit(id,preferredTask=null){
  const idx=SMMC_UNITS_V1.findIndex(u=>u.id===id);if(idx<0)return;
  const changed=currentUnit?.id!==id;
  saveGuidedDraft();
  currentUnit=SMMC_UNITS_V1[idx];$('unitSelect').value=id;
  put('unitMeta',currentUnit.kind==='foundation'?`Chapter 1 · Step ${currentUnit.orderWithinModule} of ${FOUNDATION_UNITS.length} · ${currentUnit.stage}`:currentUnit.kind==='bridge'?'Build a missing tool':'Practise a problem-solving method');
  put('unitTitle',currentUnit.title);put('learningNote',currentUnit.learningNote);
  const foundation=currentUnit.kind==='foundation';
  $('unitConnections').hidden=foundation;$('foundationEntry').hidden=!foundation;
  put('foundationEntry',foundation?currentUnit.entry+' '+(currentUnit.prerequisiteUnits.length?'Builds on the preceding chapter step.':''):'');
  $('mainTask').textContent=currentUnit.taskLabels?.[0]||'Main task';
  $('transferTask').textContent=currentUnit.taskLabels?.[1]||'Transfer task';
  $('guidedPanel').hidden=!currentUnit.guided;
  put('guidedPrompt',currentUnit.guided?.prompt||'');
  $('guidedAnswer').value=currentUnit.guided?readWorkspaceDraft('smmc',id+'-guided'):'';
  $('guidedFeedback').hidden=true;put('guidedFeedback','');
  renderFoundationPath();
  const us=histState.units[id]||{};
  put('unitProgress',us.certifiedAt?'Certified externally at '+us.certifiedAt+'.':us.selfReportedComplete?'Self-reported complete; not certified.':'Not yet self-reported complete.');
  const route=foundation?FOUNDATION_UNITS:SMMC_UNITS_V1.filter(u=>u.kind!=='foundation');
  const position=route.findIndex(u=>u.id===id);
  $('prevUnit').disabled=position===0;$('nextUnit').disabled=position===route.length-1;
  renderT25Connections(currentUnit.t25Targets,'unitT25Connections');
  const task=[currentUnit.mainTaskId,currentUnit.transferTaskId].includes(preferredTask)?preferredTask:currentUnit.mainTaskId;
  showTask(task);
  showLessonMode(changed?(foundation&&currentUnit.orderWithinModule<5?'learn':'practice'):lessonMode);
  rememberSmmcLocation({unitId:currentUnit.id,taskId:task});
  renderWorkspaceNav();
}
function showTask(id){
  if(currentTaskId)writeWorkspaceDraft('smmc',currentTaskId,$('answer').value);
  currentTaskId=id;const p=SMMC_PUBLIC_PROBLEMS_V1[id];
  put('taskMeta',p.evidence||p.role.toUpperCase()+' · '+id);put('problemText',p.prompt);
  $('answer').value=readWorkspaceDraft('smmc',id);$('assistance').value='independent';$('minutes').value='0';$('revealRef').disabled=true;$('reference').hidden=true;put('referenceText','');
  $('revealHint').hidden=!id.startsWith('S-FOUND-ALG-');$('revealHint').disabled=true;
  $('hint').hidden=true;put('hintText','');
  const earlier=studyState.attempts.filter(a=>a.taskId===id);
  if(earlier.some(a=>a.referenceOpenedAt))$('assistance').value='revealed';
  else if(earlier.some(a=>a.assistance==='hint'))$('assistance').value='hint';
  renderHistory();updateNextExercise();
  if(currentUnit){rememberSmmcLocation({unitId:currentUnit.id,taskId:id});if(currentTab==='study')replaceSmmcUrl();}
  renderWorkspaceNav();
}
function renderHistory(){
  const rows=studyState.attempts.filter(a=>a.taskId===currentTaskId).slice(-12).reverse();
  $('history').replaceChildren(...rows.map(a=>{const el=document.createElement('article');el.textContent=a.at+' · '+a.assistance+' · '+a.minutes+' min\n'+(a.referenceSeenBefore?'Reference had already been seen.\n':'')+a.answer;return el;}));
}

function renderOverlapSummary(){
  const tally=rows=>({
    green:rows.filter(x=>x.overlap==='green').length,
    amber:rows.filter(x=>x.overlap==='amber').length,
    red:rows.filter(x=>x.overlap==='red').length,
  });
  const groups=[
    ['All 88',tally(ledger)],
    ['East A+B',tally(ledger.filter(x=>x.eastRelevant))],
  ];
  $('overlapSummary').replaceChildren(...groups.map(([title,count])=>{
    const box=document.createElement('section');box.className='overlap-group';
    const h=document.createElement('h3');h.textContent=title;box.append(h);
    const stats=document.createElement('div');stats.className='overlap-stats';
    for(const key of ['green','amber','red']){
      const item=document.createElement('div');item.className='overlap-stat '+key;
      const n=document.createElement('strong');n.textContent=count[key];
      const label=document.createElement('span');label.textContent=key.toUpperCase();
      item.append(n,label);stats.append(item);
    }
    box.append(stats);return box;
  }));
}

function problemLabel(p){return p.year+' '+p.session+p.problem+' · '+(p.eastRelevant?'East':'C supplementary');}
function renderProblemList(){
  const q=$('problemSearch').value.trim().toLowerCase();
  const list=ledger.filter(p=>{
    const base=problemLabel(p)+' '+p.id;
    const exposed=exposureClass(histState,p.id).class!=='sealed';
    const searchable=exposed?base+' '+p.synopsis:base;
    return searchable.toLowerCase().includes(q);
  });
  opts($('problemSelect'),list.map(p=>[p.id,problemLabel(p)]));
  if(currentProblem&&list.some(p=>p.id===currentProblem.id))$('problemSelect').value=currentProblem.id;
}
function clearedTargets(){return [...new Set($('t25Input').value.split(/[\s,]+/).map(x=>x.trim()).filter(Boolean))];}
function statusClass(status){if(status==='ready-transfer')return 'green';if(status==='ready-development')return 'amber';return 'neutral';}
function statusText(status){return ({
  'ready-transfer':'Ready transfer','ready-development':'Development only','locked-t25':'T25 prerequisites',
  'locked-smmc-bridge':'SMMC unit needed','locked-specialist':'Specialist unit needed','requirement-map-pending':'Authoring pending'
})[status]||status;}
function renderHistorical(id){
  const changed=!currentProblem||currentProblem.id!==id;
  currentProblem=ledger.find(p=>p.id===id);if(!currentProblem)return;
  if(changed){researchVisible=false;paperVisible=false;synopsisVisible=false;}
  $('problemSelect').value=id;put('histTitle',problemLabel(currentProblem));
  const exposure=exposureClass(histState,id);
  put('histExposure','Problem exposure: '+exposure.class+'. '+exposure.reason+'. Statement/summary exposure is persistent; hint-bearing research metadata moves this problem to development.');
  $('histSynopsis').hidden=!synopsisVisible;
  put('histSynopsis',synopsisVisible?currentProblem.synopsis:'');
  $('revealSynopsis').textContent=synopsisVisible?'Hide ledger summary':'Show ledger summary · marks this problem statement-seen';
  const routeHintsVisible=exposure.class==='development';
  $('mappingTools').hidden=!routeHintsVisible;
  $('problemConnections').hidden=!routeHintsVisible;
  if(routeHintsVisible)renderT25Connections(currentProblem.t25Targets,'problemT25Connections');
  else $('problemT25Connections').replaceChildren();
  rememberSmmcLocation({problemId:id});
  renderWorkspaceNav();
  if(currentTab==='map')replaceSmmcUrl();

  const paper=officialPaperUrl(currentProblem);
  const paperKey=paperKeyForProblem(currentProblem);
  const paperExposure=paperExposureClass(histState,ledger,paperKey);
  const sessionProblems=ledger.filter(problem=>paperKeyForProblem(problem)===paperKey);
  const eastPaperKeys=[...new Set(ledger.filter(problem=>problem.eastRelevant).map(paperKeyForProblem))];
  const pristineEast=pristinePaperKeys(histState,ledger,{eastOnly:true});
  put('paperExposure','Session '+paperKey+' vault state: '+paperExposure.class+'. '+paperExposure.reason+'.');
  put('pristineInventory','Pristine East A/B sessions: '+pristineEast.length+' / '+eastPaperKeys.length+'.');
  $('openOfficialPaper').disabled=!paper;
  $('openOfficialPaper').hidden=!paper;
  $('togglePaper').disabled=!paper;
  $('togglePaper').textContent=paperVisible?'Hide official paper':'Show official paper here';
  put('paperGuide',paper
    ? `Warning: this PDF contains all ${sessionProblems.length} problems in session ${paperKey}. Opening it marks every statement in that session as seen. Use isolated problem access when you want to preserve the rest of a paper.`
    : 'No official paper URL is mapped yet for this record.');
  const frame=$('officialPaperFrame');
  frame.hidden=!paperVisible;
  if(paperVisible&&paper&&frame.src!==paper)frame.src=paper;
  const b=$('unlockBadge');
  if(!routeHintsVisible){
    b.className='badge neutral';b.textContent='Protected';
    put('unlockText','Protected unfamiliar-transfer material. Exact T25 mappings, bridge identity, GREEN/AMBER/RED-distinguishing readiness, and method-specific prerequisite guidance are hidden until you explicitly reveal hint-bearing research metadata.');
  }else{
    const unlock=unlockStatus(currentProblem,{clearedT25Targets:clearedTargets(),certifiedUnits:certifiedUnitIds(histState)});
    b.className='badge '+statusClass(unlock.status);b.textContent=statusText(unlock.status);
    const parts=['Status: '+statusText(unlock.status)+'.'];
    if(unlock.missingT25&&unlock.missingT25.length)parts.push('Missing T25 targets: '+unlock.missingT25.join(', ')+'.');
    if(unlock.missingUnits&&unlock.missingUnits.length)parts.push('Missing certified SMMC units: '+unlock.missingUnits.join(', ')+'.');
    if(unlock.status==='requirement-map-pending')parts.push('This non-GREEN problem stays locked until its exact authored-unit requirements are mapped.');
    if(currentProblem.overlap==='green'&&unlock.status==='ready-transfer')parts.push('No extra SMMC content unit is required after the mapped T25 prerequisites.');
    put('unlockText',parts.join('\n\n'));
  }
  renderResearch(researchVisible);
}
function confirmAndMarkPaperOpened(){
  if(!currentProblem)return false;
  const paperKey=paperKeyForProblem(currentProblem);
  const paperState=histState.papers?.[paperKey]||{};
  if(!paperState.paperOpenedAt){
    const count=ledger.filter(problem=>paperKeyForProblem(problem)===paperKey).length;
    const ok=window.confirm(
      `Open official ${paperKey} session paper? This reveals all ${count} problem statements and permanently marks that full paper as opened for corpus-preservation purposes.`
    );
    if(!ok)return false;
    if(!commitHistoricalMutation(candidate=>markPaperExposure(candidate,ledger,paperKey,'paperOpenedAt')))return false;
    renderProblemList();
  }
  return true;
}

function renderResearch(show){
  $('researchInfo').hidden=!show;
  $('revealResearch').textContent=show?'Hide GREEN / AMBER / RED research metadata':'Show GREEN / AMBER / RED research metadata';
  if(!show)return;
  const p=currentProblem,row=$('researchColor');row.replaceChildren();
  const dot=document.createElement('span');dot.className='dot '+p.overlap;
  const label=document.createElement('span');label.textContent=p.overlap.toUpperCase();row.append(dot,label);
  put('researchDetails',[
    'Primary domain: '+p.primaryDomain,
    'Secondary tags: '+(p.secondaryTags.join(', ')||'—'),
    'Method tags: '+(p.methodTags.join(', ')||'—'),
    'T25 targets: '+p.t25Targets.join(', '),
    'Existing T25 bridges: '+(p.t25Bridges.join(', ')||'—'),
    'Bridge needs: '+(p.bridgeNeeds.join('; ')||'none'),
    'Assessment role: '+p.assessmentRole,
    'Audit note: '+p.auditNote
  ].join('\n\n'));
}
async function init(){
  const initialParams=new URLSearchParams(location.search);
  const explicitWorkspace=initialParams.has('tab')||initialParams.has('unit')||initialParams.has('task')||initialParams.has('problem')||initialParams.has('view');
  let navReconciled=false,navReconcilePromise=null;
  if(!explicitWorkspace&&!hasStoredWorkspaceNav()&&workspaceCloudState().signedIn){
    navReconcilePromise=reconcileWorkspaceNavCloud().then(()=>{navReconciled=true;});
    await Promise.race([
      navReconcilePromise,
      new Promise(resolve=>setTimeout(resolve,700))
    ]);
  }
  try{
    const h=localStorage.getItem(HIST_KEY);if(h)histState=validateSmmcState(JSON.parse(h),ledger,moduleIds,allUnitIds);
    const s=localStorage.getItem(STUDY_KEY);if(s)studyState=validateSmmcStudy(JSON.parse(s),Object.keys(SMMC_PUBLIC_PROBLEMS_V1));
  }catch(e){storageOK=false;tell('Existing SMMC browser record could not be read and has not been overwritten. Export from this session if needed.');}
  const params=initialParams,remembered=readWorkspaceNav();
  const requestedTab=params.get('tab')==='map'?'map':params.get('tab')==='study'?'study':remembered.smmc.tab;
  const requestedUnit=params.get('unit')||remembered.smmc.unitId;
  const unit=SMMC_UNITS_V1.find(x=>x.id===requestedUnit)||FOUNDATION_UNITS[0];
  const requestedTask=params.get('task')||remembered.smmc.taskId;
  const requestedProblem=params.get('problem')||remembered.smmc.problemId;
  const problem=ledger.find(x=>x.id===requestedProblem)||ledger[0];
  renderUnitList();renderUnit(unit.id,requestedTask);renderProblemList();renderOverlapSummary();renderHistorical(problem.id);switchTab(params.get('view')==='path'||(!requestedUnit&&!explicitWorkspace)?'path':requestedTab,false,false,false);replaceSmmcUrl();
  showLessonMode(params.get('activity')==='practice'||(!params.has('activity')&&params.has('task'))?'practice':params.get('activity')==='learn'?'learn':lessonMode);
  $('browseLessons').open=window.innerWidth>800;
  $('continueFoundation').onclick=()=>{
    const attempted=new Set(studyState.attempts.map(a=>a.taskId));
    const u=FOUNDATION_UNITS.find(u=>!attempted.has(u.mainTaskId)||!attempted.has(u.transferTaskId))||FOUNDATION_UNITS[4];
    openLesson(u.id,!attempted.has(u.mainTaskId)?u.mainTaskId:u.transferTaskId);
  };
  $('showLearn').onclick=()=>showLessonMode('learn');
  $('showPractice').onclick=()=>showLessonMode('practice');
  $('showReview').onclick=()=>showLessonMode('review',true);
  $('beginPractice').onclick=()=>showLessonMode('practice',true);
  $('returnToLesson').onclick=()=>{
    if($('assistance').value==='independent')$('assistance').value='neutral-tool';
    showLessonMode('learn',true);
  };
  $('chooseRefresher').onclick=()=>{switchTab('path');$('chapterSteps').open=true;};
  $('nextExercise').onclick=()=>{
    if(!studyState.attempts.some(a=>a.taskId===currentTaskId))return;
    if(currentTaskId===currentUnit.mainTaskId){showTask(currentUnit.transferTaskId);showLessonMode('practice',true);return;}
    const route=currentUnit.kind==='foundation'?FOUNDATION_UNITS:SMMC_UNITS_V1.filter(u=>u.kind!=='foundation');
    const idx=route.findIndex(u=>u.id===currentUnit.id);
    if(route[idx+1])openLesson(route[idx+1].id);else switchTab('path');
  };
  $('tabPath').onclick=()=>switchTab('path');
  $('guidedAnswer').addEventListener('input',saveGuidedDraft);
  $('guidedFeedbackButton').onclick=async()=>{
    if(!$('guidedAnswer').value.trim()){tell('Try the guided step before comparing with feedback.');return;}
    const id=currentUnit.id;saveGuidedDraft();
    try{
      const {FOUNDATION_GUIDED_FEEDBACK}=await import('../../course/smmc/authoring/foundation-references.mjs');
      if(currentUnit.id!==id)return;
      put('guidedFeedback',FOUNDATION_GUIDED_FEEDBACK[id]);$('guidedFeedback').hidden=false;
    }catch{tell('Could not load feedback. Your draft is still available.');}
  };
  $('revealHint').onclick=async()=>{
    const id=currentTaskId;
    const latest=[...studyState.attempts].reverse().find(a=>a.taskId===id);
    if(!latest)return;
    try{
      const bank=await evaluatorBank();if(currentTaskId!==id)return;
      if(!bank[id].hint)return;
      latest.assistance='hint';persist();$('assistance').value='hint';
      put('hintText',bank[id].hint);$('hint').hidden=false;renderHistory();
      tell('Hint opened. This problem is now assisted practice.');
    }catch{tell('Could not load the hint.');}
  };
  $('unitSearch').oninput=renderUnitList;$('unitSelect').onchange=()=>openLesson($('unitSelect').value);
  $('answer').addEventListener('input',()=>{if(currentTaskId)writeWorkspaceDraft('smmc',currentTaskId,$('answer').value);});
  const moveUnit=offset=>{const route=currentUnit.kind==='foundation'?FOUNDATION_UNITS:SMMC_UNITS_V1.filter(u=>u.kind!=='foundation');const i=route.findIndex(x=>x.id===currentUnit.id);if(route[i+offset])renderUnit(route[i+offset].id);};
  $('prevUnit').onclick=()=>moveUnit(-1);$('nextUnit').onclick=()=>moveUnit(1);
  $('mainTask').onclick=()=>{showTask(currentUnit.mainTaskId);showLessonMode('practice');};$('transferTask').onclick=()=>{showTask(currentUnit.transferTaskId);showLessonMode('practice');};
  $('saveAttempt').onclick=()=>{
    const answer=$('answer').value.trim(),minutes=Number($('minutes').value);if(!answer){tell('Record your working before saving.');return;}
    if(answer.length>100000||!Number.isFinite(minutes)||minutes<0||minutes>100000){tell('Check answer length and minutes.');return;}
    const hadReference=studyState.attempts.some(a=>a.taskId===currentTaskId&&a.referenceOpenedAt);
    studyState.attempts.push({id:uuid(),taskId:currentTaskId,at:new Date().toISOString(),answer,assistance:hadReference?'revealed':studyState.attempts.some(a=>a.taskId===currentTaskId&&a.assistance==='hint')?'hint':$('assistance').value,minutes,referenceSeenBefore:hadReference});
    clearWorkspaceDraft('smmc',currentTaskId);$('revealRef').disabled=false;$('revealHint').disabled=false;persist();renderHistory();renderFoundationPath();updateNextExercise();tell('Neutral training attempt saved. Historical PYQ exposure unchanged.');
  };
  $('revealRef').onclick=async()=>{
    const id=currentTaskId;
    const latest=[...studyState.attempts].reverse().find(a=>a.taskId===id);if(!latest)return;
    try{
      const bank=await evaluatorBank();if(currentTaskId!==id)return;const r=bank[id];
      put('referenceText',r.reference+'\n\n'+r.rubric.map(x=>'• '+x).join('\n'));$('reference').hidden=false;
      if(latest)latest.referenceOpenedAt=latest.referenceOpenedAt||new Date().toISOString();
      persist();tell('Evaluator reference opened for this neutral task.');
    }catch(err){tell('Could not load evaluator reference: '+err.message);}
  };
  $('selfReport').onclick=()=>{selfReportUnitComplete(histState,currentUnit.id);persist();renderUnit(currentUnit.id,currentTaskId);tell('Unit self-report saved. This does not certify or unlock historical problems.');};
  $('tabStudy').onclick=()=>switchTab('study');$('tabMap').onclick=()=>switchTab('map');
  $('problemSearch').oninput=renderProblemList;$('problemSelect').onchange=()=>renderHistorical($('problemSelect').value);
  $('applyTargets').onclick=()=>{renderHistorical(currentProblem.id);tell('T25 target preview updated locally. No T25 clearance record was changed.');};
  $('revealSynopsis').onclick=()=>{
    if(!currentProblem)return;
    if(!synopsisVisible){
      const exposure=histState.exposures?.[currentProblem.id]||{};
      if(!exposure.statementSeenAt){
        const ok=window.confirm(
          `Show the ledger summary for ${currentProblem.id}? This is isolated exposure: only this problem will be marked statement-seen; the other problems in its session remain protected.`
        );
        if(!ok)return;
        if(!commitHistoricalMutation(candidate=>markExposure(candidate,currentProblem.id,'statementSeenAt')))return;
        renderProblemList();
      }
      synopsisVisible=true;
    }else synopsisVisible=false;
    renderHistorical(currentProblem.id);
    tell(synopsisVisible?'Ledger summary shown; this problem is now statement-seen. Other problems in the session were not changed.':'Ledger summary hidden. Exposure history is retained.');
  };
  $('togglePaper').onclick=()=>{
    const paper=officialPaperUrl(currentProblem);
    if(!paper)return;
    if(!paperVisible&&!confirmAndMarkPaperOpened())return;
    paperVisible=!paperVisible;
    renderHistorical(currentProblem.id);
    tell(paperVisible?'Official SMMC session paper opened; every statement in this session is now marked seen.':'Official paper hidden. The exposure record is intentionally retained.');
  };
  $('openOfficialPaper').onclick=()=>{
    const paper=officialPaperUrl(currentProblem);
    if(!paper)return;
    if(!confirmAndMarkPaperOpened())return;
    renderHistorical(currentProblem.id);
    window.open(paper,'_blank','noopener,noreferrer');
    tell('Official SMMC session paper opened in a new tab; every statement in this session is now marked seen.');
  };
  $('revealResearch').onclick=()=>{
    if(!currentProblem)return;
    if(!researchVisible){
      const exposure=histState.exposures?.[currentProblem.id]||{};
      if(!exposure.materialHintSeenAt){
        const ok=window.confirm(
          `Reveal method/color/research metadata for ${currentProblem.id}? This can suggest a route, so this problem will be permanently marked material-hint-seen and development-only.`
        );
        if(!ok)return;
        if(!commitHistoricalMutation(candidate=>markExposure(candidate,currentProblem.id,'materialHintSeenAt')))return;
        renderProblemList();
      }
      researchVisible=true;
    }else researchVisible=false;
    renderHistorical(currentProblem.id);
    tell(researchVisible
      ? 'Hint-bearing research metadata shown. This problem is now development-only; other problems were not changed.'
      : 'Research metadata hidden. The exposure record is intentionally retained.');
  };
  $('export').onclick=()=>{download('smmc-study-record.json',{historical:histState,neutralStudy:studyState});$('toolsMenu').open=false;};
  $('import').onchange=async e=>{
    const file=e.target.files[0];if(!file)return;try{
      if(file.size>10000000)throw Error('Record is too large');const incoming=JSON.parse(await file.text());
      histState=validateSmmcState(incoming.historical,ledger,moduleIds,allUnitIds);studyState=validateSmmcStudy(incoming.neutralStudy,Object.keys(SMMC_PUBLIC_PROBLEMS_V1));
      persist();renderUnit(currentUnit.id);renderHistorical(currentProblem.id);renderHistory();$('toolsMenu').open=false;tell('SMMC record imported.');
    }catch(err){tell('Import rejected: '+err.message);}finally{e.target.value='';}
  };
  if(!navReconciled)void (navReconcilePromise||reconcileWorkspaceNavCloud()).finally(enableWorkspaceNavCloud);
  else enableWorkspaceNavCloud();
  renderCloudBadge();
  void reconcileSmmcCloud();
  document.addEventListener('chrono:cloud-context-changed',()=>{cloudReady=false;void reconcileSmmcCloud();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&cloudReady&&workspaceCloudState().signedIn)void reconcileSmmcCloud();});
  window.addEventListener('pagehide',()=>{
    if(currentTaskId)writeWorkspaceDraft('smmc',currentTaskId,$('answer').value);
    saveGuidedDraft();saveViewport();
  });
  const focus=params.get('focus');
  const rememberedAfter=readWorkspaceNav();
  restoreViewport({focusId:focus,scrollY:rememberedAfter.smmc.scroll[currentTab]});
  document.addEventListener('pointerdown',e=>{if(!$('toolsMenu').contains(e.target))$('toolsMenu').open=false;});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')$('toolsMenu').open=false;});
  if(storageOK)tell('Ready: '+(pathVisible?'Choose your next step.':currentTab==='map'?'Browse official past papers.':currentUnit.title+'. Choose Learn or Practise.'));
}
init().catch(e=>tell('SMMC companion could not start: '+e.message));
