import ledger from '../../course/smmc/ledger.mjs';
import { SMMC_UNITS_V1 } from '../../course/smmc/authoring/units-v1.mjs';
import { SMMC_PUBLIC_PROBLEMS_V1 } from '../../course/smmc/authoring/public-problems-v1.mjs';
import { SMMC_EVALUATOR_V1 } from '../../course/smmc/authoring/evaluator-v1.mjs';
import {
  emptySmmcState, validateSmmcState, markExposure, exposureClass,
  selfReportUnitComplete, certifiedUnitIds,
} from '../../course/smmc/runtime/exposure.mjs';
import { unlockStatus } from '../../course/smmc/runtime/unlock.mjs';
import { officialPaperUrl } from '../../course/smmc/sources-v1.mjs';
import { routeStepsForT25Targets } from '../../course/smmc/t25-crosswalk.mjs';
import {readWorkspaceNav,rememberSmmcLocation,t25Href,smmcHref,restoreViewport} from '../workspace-nav.js';
import {readWorkspaceDraft,writeWorkspaceDraft,clearWorkspaceDraft} from '../workspace-drafts.js';

const $=id=>document.getElementById(id);
const HIST_KEY='chrono_smmc_historical_evidence_v1';
const STUDY_KEY='chrono_smmc_neutral_study_v1';
const uuid=()=>crypto.randomUUID();
const tell=x=>$('status').textContent=x;
const put=(id,text)=>$(id).textContent=text;
let histState=emptySmmcState();
let studyState={version:1,attempts:[]};
let currentUnit=null,currentTaskId=null,currentProblem=null,storageOK=true,currentTab='study';
let researchVisible=false,paperVisible=false;
const allUnitIds=SMMC_UNITS_V1.map(x=>x.id);
const moduleIds=[...new Set(SMMC_UNITS_V1.map(x=>x.moduleId))];

function persist(){
  if(!storageOK)return false;
  try{
    localStorage.setItem(HIST_KEY,JSON.stringify(histState));
    localStorage.setItem(STUDY_KEY,JSON.stringify(studyState));
    return true;
  }catch{storageOK=false;tell('Browser storage is unavailable. Export before leaving if you want to keep this session.');return false;}
}
function validateStudy(x){
  if(!x||typeof x!=='object'||x.version!==1||!Array.isArray(x.attempts)||x.attempts.length>10000)throw Error('Unsupported neutral study record');
  const known=new Set(Object.keys(SMMC_PUBLIC_PROBLEMS_V1)),seen=new Set(),out={version:1,attempts:[]};
  for(const a of x.attempts){
    if(!a||typeof a!=='object'||typeof a.id!=='string'||seen.has(a.id)||!known.has(a.taskId)||
      typeof a.at!=='string'||!Number.isFinite(Date.parse(a.at))||typeof a.answer!=='string'||a.answer.length>100000||
      !['independent','neutral-tool','hint','guided','revealed'].includes(a.assistance)||
      !Number.isFinite(a.minutes)||a.minutes<0||a.minutes>100000||typeof a.referenceSeenBefore!=='boolean')throw Error('Invalid neutral attempt');
    seen.add(a.id);out.attempts.push({...a});
  }
  return out;
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
  put('workspacePosition',currentTab==='map'
    ? `Historical map · ${currentProblem?problemLabel(currentProblem):'last problem remembered'}`
    : `Study · ${currentUnit?.id||'last unit remembered'}`);
}
function renderT25Connections(targetCodes,containerId){
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
  window.history.replaceState(null,'',smmcHref({
    tab:currentTab,
    unitId:currentUnit?.id||null,
    taskId:currentTaskId||null,
    problemId:currentProblem?.id||null,
  }));
}
function saveViewport(){
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
  const study=which==='study';currentTab=study?'study':'map';
  $('studyView').hidden=!study;$('studyNav').hidden=!study;$('mapView').hidden=study;$('mapNav').hidden=study;
  $('tabStudy').classList.toggle('active',study);$('tabMap').classList.toggle('active',!study);
  rememberSmmcLocation({tab:currentTab,unitId:currentUnit?.id||null,taskId:currentTaskId||null,problemId:currentProblem?.id||null});
  renderWorkspaceNav();if(updateUrl)replaceSmmcUrl();
  if(restore){
    const remembered=readWorkspaceNav();
    restoreViewport({scrollY:remembered.smmc.scroll[currentTab]});
  }
}
function unitLabel(u){return (u.kind==='bridge'?'Bridge':'Method')+' · '+u.id+' · '+u.title;}
function renderUnitList(){
  const q=$('unitSearch').value.trim().toLowerCase();
  const list=SMMC_UNITS_V1.filter(u=>(u.id+' '+u.moduleId+' '+u.title+' '+u.learningNote).toLowerCase().includes(q));
  opts($('unitSelect'),list.map(u=>[u.id,unitLabel(u)]));
  if(currentUnit&&list.some(u=>u.id===currentUnit.id))$('unitSelect').value=currentUnit.id;
}
function renderUnit(id,preferredTask=null){
  const idx=SMMC_UNITS_V1.findIndex(u=>u.id===id);if(idx<0)return;
  currentUnit=SMMC_UNITS_V1[idx];$('unitSelect').value=id;
  put('unitMeta',currentUnit.kind.toUpperCase()+' · '+currentUnit.moduleId+' · unit '+currentUnit.orderWithinModule);
  put('unitTitle',currentUnit.title);put('learningNote',currentUnit.learningNote);
  const us=histState.units[id]||{};
  put('unitProgress',us.certifiedAt?'Certified externally at '+us.certifiedAt+'.':us.selfReportedComplete?'Self-reported complete; not certified.':'Not yet self-reported complete.');
  $('prevUnit').disabled=idx===0;$('nextUnit').disabled=idx===SMMC_UNITS_V1.length-1;
  renderT25Connections(currentUnit.t25Targets,'unitT25Connections');
  const task=[currentUnit.mainTaskId,currentUnit.transferTaskId].includes(preferredTask)?preferredTask:currentUnit.mainTaskId;
  showTask(task);
  rememberSmmcLocation({unitId:currentUnit.id,taskId:task});
  renderWorkspaceNav();
}
function showTask(id){
  if(currentTaskId)writeWorkspaceDraft('smmc',currentTaskId,$('answer').value);
  currentTaskId=id;const p=SMMC_PUBLIC_PROBLEMS_V1[id];
  put('taskMeta',p.role.toUpperCase()+' · '+id);put('problemText',p.prompt);
  $('answer').value=readWorkspaceDraft('smmc',id);$('assistance').value='independent';$('minutes').value='0';$('revealRef').disabled=true;$('reference').hidden=true;put('referenceText','');
  renderHistory();
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
  const list=ledger.filter(p=>(problemLabel(p)+' '+p.synopsis).toLowerCase().includes(q));
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
  if(changed){researchVisible=false;paperVisible=false;}
  $('problemSelect').value=id;put('histTitle',problemLabel(currentProblem));
  const exposure=exposureClass(histState,id);put('histExposure','Exposure record: '+exposure.class+'. '+exposure.reason+'. Metadata viewing is not counted as contamination.');
  put('histSynopsis',currentProblem.synopsis);
  renderT25Connections(currentProblem.t25Targets,'problemT25Connections');
  rememberSmmcLocation({problemId:id});
  renderWorkspaceNav();
  if(currentTab==='map')replaceSmmcUrl();

  const paper=officialPaperUrl(currentProblem);
  $('openOfficialPaper').href=paper||'#';
  $('openOfficialPaper').hidden=!paper;
  $('togglePaper').disabled=!paper;
  $('togglePaper').textContent=paperVisible?'Hide official paper':'Show official paper here';
  put('paperGuide',paper
    ? `Read ${currentProblem.session}${currentProblem.problem} on page 2 of the official ${currentProblem.year} session ${currentProblem.session} paper.`
    : 'No official paper URL is mapped yet for this record.');
  const frame=$('officialPaperFrame');
  frame.hidden=!paperVisible;
  if(paperVisible&&paper&&frame.src!==paper)frame.src=paper;
  const unlock=unlockStatus(currentProblem,{clearedT25Targets:clearedTargets(),certifiedUnits:certifiedUnitIds(histState)});
  const b=$('unlockBadge');b.className='badge '+statusClass(unlock.status);b.textContent=statusText(unlock.status);
  const parts=['Status: '+statusText(unlock.status)+'.'];
  if(unlock.missingT25&&unlock.missingT25.length)parts.push('Missing T25 targets: '+unlock.missingT25.join(', ')+'.');
  if(unlock.missingUnits&&unlock.missingUnits.length)parts.push('Missing certified SMMC units: '+unlock.missingUnits.join(', ')+'.');
  if(unlock.status==='requirement-map-pending')parts.push('This non-GREEN problem stays locked until its exact authored-unit requirements are mapped.');
  if(currentProblem.overlap==='green'&&unlock.status==='ready-transfer')parts.push('No extra SMMC content unit is required after the mapped T25 prerequisites.');
  put('unlockText',parts.join('\n\n'));
  renderResearch(researchVisible);
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
  try{
    const h=localStorage.getItem(HIST_KEY);if(h)histState=validateSmmcState(JSON.parse(h),ledger,moduleIds,allUnitIds);
    const s=localStorage.getItem(STUDY_KEY);if(s)studyState=validateStudy(JSON.parse(s));
  }catch(e){storageOK=false;tell('Existing SMMC browser record could not be read and has not been overwritten. Export from this session if needed.');}
  const params=new URLSearchParams(location.search),remembered=readWorkspaceNav();
  const requestedTab=params.get('tab')==='map'?'map':params.get('tab')==='study'?'study':remembered.smmc.tab;
  const requestedUnit=params.get('unit')||remembered.smmc.unitId;
  const unit=SMMC_UNITS_V1.find(x=>x.id===requestedUnit)||SMMC_UNITS_V1[0];
  const requestedTask=params.get('task')||remembered.smmc.taskId;
  const requestedProblem=params.get('problem')||remembered.smmc.problemId;
  const problem=ledger.find(x=>x.id===requestedProblem)||ledger[0];
  renderUnitList();renderUnit(unit.id,requestedTask);renderProblemList();renderOverlapSummary();renderHistorical(problem.id);switchTab(requestedTab,false,false,false);replaceSmmcUrl();
  $('unitSearch').oninput=renderUnitList;$('unitSelect').onchange=()=>renderUnit($('unitSelect').value);
  $('answer').addEventListener('input',()=>{if(currentTaskId)writeWorkspaceDraft('smmc',currentTaskId,$('answer').value);});
  $('prevUnit').onclick=()=>{const i=SMMC_UNITS_V1.findIndex(x=>x.id===currentUnit.id);if(i>0)renderUnit(SMMC_UNITS_V1[i-1].id);};
  $('nextUnit').onclick=()=>{const i=SMMC_UNITS_V1.findIndex(x=>x.id===currentUnit.id);if(i<SMMC_UNITS_V1.length-1)renderUnit(SMMC_UNITS_V1[i+1].id);};
  $('mainTask').onclick=()=>showTask(currentUnit.mainTaskId);$('transferTask').onclick=()=>showTask(currentUnit.transferTaskId);
  $('saveAttempt').onclick=()=>{
    const answer=$('answer').value.trim(),minutes=Number($('minutes').value);if(!answer){tell('Record your working before saving.');return;}
    if(answer.length>100000||!Number.isFinite(minutes)||minutes<0||minutes>100000){tell('Check answer length and minutes.');return;}
    const hadReference=studyState.attempts.some(a=>a.taskId===currentTaskId&&a.referenceOpenedAt);
    studyState.attempts.push({id:uuid(),taskId:currentTaskId,at:new Date().toISOString(),answer,assistance:$('assistance').value,minutes,referenceSeenBefore:hadReference});
    clearWorkspaceDraft('smmc',currentTaskId);$('revealRef').disabled=false;persist();renderHistory();tell('Neutral training attempt saved. Historical PYQ exposure unchanged.');
  };
  $('revealRef').onclick=()=>{
    const r=SMMC_EVALUATOR_V1[currentTaskId];put('referenceText',r.reference+'\n\n'+r.rubric.map(x=>'• '+x).join('\n'));$('reference').hidden=false;
    const latest=[...studyState.attempts].reverse().find(a=>a.taskId===currentTaskId);if(latest)latest.referenceOpenedAt=latest.referenceOpenedAt||new Date().toISOString();
    persist();tell('Evaluator reference opened for this neutral task.');
  };
  $('selfReport').onclick=()=>{selfReportUnitComplete(histState,currentUnit.id);persist();renderUnit(currentUnit.id);tell('Unit self-report saved. This does not certify or unlock historical problems.');};
  $('tabStudy').onclick=()=>switchTab('study');$('tabMap').onclick=()=>switchTab('map');
  $('problemSearch').oninput=renderProblemList;$('problemSelect').onchange=()=>renderHistorical($('problemSelect').value);
  $('applyTargets').onclick=()=>{renderHistorical(currentProblem.id);tell('T25 target preview updated locally. No T25 clearance record was changed.');};
  $('togglePaper').onclick=()=>{
    const paper=officialPaperUrl(currentProblem);
    if(!paper)return;
    paperVisible=!paperVisible;
    renderHistorical(currentProblem.id);
    tell(paperVisible?'Official SMMC session paper opened. No exposure status was changed.':'Official paper hidden. No exposure status was changed.');
  };
  $('revealResearch').onclick=()=>{
    researchVisible=!researchVisible;
    renderResearch(researchVisible);
    tell(researchVisible
      ? 'Research metadata shown for planning only. Nothing was written to your exposure record.'
      : 'Research metadata hidden. Nothing was written to your exposure record.');
  };
  $('export').onclick=()=>download('smmc-study-record.json',{historical:histState,neutralStudy:studyState});
  $('import').onchange=async e=>{
    const file=e.target.files[0];if(!file)return;try{
      if(file.size>10000000)throw Error('Record is too large');const incoming=JSON.parse(await file.text());
      histState=validateSmmcState(incoming.historical,ledger,moduleIds,allUnitIds);studyState=validateStudy(incoming.neutralStudy);
      persist();renderUnit(currentUnit.id);renderHistorical(currentProblem.id);renderHistory();tell('SMMC record imported.');
    }catch(err){tell('Import rejected: '+err.message);}finally{e.target.value='';}
  };
  window.addEventListener('pagehide',()=>{
    if(currentTaskId)writeWorkspaceDraft('smmc',currentTaskId,$('answer').value);
    saveViewport();
  });
  const focus=params.get('focus');
  const rememberedAfter=readWorkspaceNav();
  restoreViewport({focusId:focus,scrollY:rememberedAfter.smmc.scroll[currentTab]});
  if(storageOK)tell('Ready: '+SMMC_UNITS_V1.length+' authored units, '+Object.keys(SMMC_PUBLIC_PROBLEMS_V1).length+' neutral tasks, and '+ledger.length+' historical problem records. Resumed '+(currentTab==='map'?problemLabel(currentProblem):currentUnit.id+' · '+currentTaskId)+'.');
}
init().catch(e=>tell('SMMC companion could not start: '+e.message));
