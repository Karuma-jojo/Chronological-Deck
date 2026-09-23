// Shared navigation memory for the T25 / Aster / SMMC study workspace.
// Navigation is UI state only: it never grants clearance, certification, or assessment evidence.

import {workspaceCloudState,reconcileWorkspaceScope,scheduleWorkspaceScopeSync} from './workspace-cloud.js';

export const WORKSPACE_NAV_KEY = "chrono_math_workspace_nav_v3";
const LEGACY_KEYS = ["chrono_math_workspace_nav_v2","chrono_math_workspace_nav_v1"];
let navCloudReady=false,navCloudApplying=false;

const now=()=>new Date().toISOString();
const nonnegative=value=>Number.isFinite(Number(value))&&Number(value)>=0?Number(value):0;

export function emptyWorkspaceNav(){
  return {
    version:3,
    t25:{session:1,presentation:"plain",task:"main",scrollY:0,updatedAt:null},
    smmc:{tab:"study",unitId:null,taskId:null,problemId:null,scroll:{study:0,map:0},updatedAt:null},
  };
}

function safeStorage(){try{return window.localStorage;}catch{return null;}}
function storedRaw(storage){
  if(!storage)return null;
  const current=storage.getItem(WORKSPACE_NAV_KEY);
  if(current)return current;
  for(const key of LEGACY_KEYS){
    const value=storage.getItem(key);
    if(value)return value;
  }
  return null;
}
export function hasStoredWorkspaceNav(){return Boolean(storedRaw(safeStorage()));}

function stamp(value){
  return typeof value==="string"&&Number.isFinite(Date.parse(value))?value:null;
}

function normalize(value){
  const fallback=emptyWorkspaceNav();
  if(!value||![1,2,3].includes(value.version))return fallback;
  const session=Number(value.t25?.session);
  const presentation=value.t25?.presentation==="anime"?"anime":"plain";
  const task=value.t25?.task==="transfer"?"transfer":"main";
  const tab=value.smmc?.tab==="map"?"map":"study";
  return {
    version:3,
    t25:{
      session:Number.isInteger(session)&&session>=1&&session<=162?session:1,
      presentation,
      task,
      scrollY:nonnegative(value.t25?.scrollY),
      updatedAt:stamp(value.t25?.updatedAt),
    },
    smmc:{
      tab,
      unitId:typeof value.smmc?.unitId==="string"?value.smmc.unitId:null,
      taskId:typeof value.smmc?.taskId==="string"?value.smmc.taskId:null,
      problemId:typeof value.smmc?.problemId==="string"?value.smmc.problemId:null,
      scroll:{
        study:nonnegative(value.smmc?.scroll?.study),
        map:nonnegative(value.smmc?.scroll?.map),
      },
      updatedAt:stamp(value.smmc?.updatedAt),
    },
  };
}

export function readWorkspaceNav(){
  const storage=safeStorage();
  if(!storage)return emptyWorkspaceNav();
  try{
    const raw=storedRaw(storage);
    if(!raw)return emptyWorkspaceNav();
    const normalized=normalize(JSON.parse(raw));
    if(!storage.getItem(WORKSPACE_NAV_KEY)){
      try{storage.setItem(WORKSPACE_NAV_KEY,JSON.stringify(normalized));}catch{}
    }
    return normalized;
  }catch{return emptyWorkspaceNav();}
}

function writeLocal(value){
  const normalized=normalize(value),storage=safeStorage();
  if(storage)try{storage.setItem(WORKSPACE_NAV_KEY,JSON.stringify(normalized));}catch{}
  return normalized;
}

function newer(a,b){
  const at=Date.parse(a?.updatedAt||"")||0,bt=Date.parse(b?.updatedAt||"")||0;
  return bt>at?b:a;
}

export function mergeWorkspaceNav(local,remote){
  const a=normalize(local),b=remote?normalize(remote):emptyWorkspaceNav();
  return normalize({
    version:3,
    t25:newer(a.t25,b.t25),
    smmc:newer(a.smmc,b.smmc),
  });
}

function scheduleNavCloud(){
  if(!navCloudReady||navCloudApplying||!workspaceCloudState().signedIn)return;
  scheduleWorkspaceScopeSync(
    "workspace_nav",
    readWorkspaceNav,
    mergeWorkspaceNav,
    result=>{
      if(result.status!=="synced"||!result.payload)return;
      navCloudApplying=true;writeLocal(result.payload);navCloudApplying=false;
    }
  );
}

function writeWorkspaceNav(value){
  const normalized=writeLocal(value);
  scheduleNavCloud();
  return normalized;
}

export function rememberT25Location(patch={}){
  const state=readWorkspaceNav(),old=state.t25,session=Number(patch.session??old.session);
  const next={
    session:Number.isInteger(session)?Math.min(162,Math.max(1,session)):old.session,
    presentation:patch.presentation==="anime"?"anime":patch.presentation==="plain"?"plain":old.presentation,
    task:patch.task==="transfer"?"transfer":patch.task==="main"?"main":old.task,
    scrollY:patch.scrollY===undefined?old.scrollY:nonnegative(patch.scrollY),
  };
  const changed=next.session!==old.session||next.presentation!==old.presentation||next.task!==old.task||next.scrollY!==old.scrollY;
  state.t25={...next,updatedAt:changed?now():old.updatedAt};
  return writeWorkspaceNav(state);
}

export function rememberSmmcLocation(patch={}){
  const state=readWorkspaceNav(),old=state.smmc,tab=patch.tab?(patch.tab==="map"?"map":"study"):old.tab;
  const next={
    ...old,
    tab,
    ...(patch.unitId!==undefined?{unitId:patch.unitId||null}:{}),
    ...(patch.taskId!==undefined?{taskId:patch.taskId||null}:{}),
    ...(patch.problemId!==undefined?{problemId:patch.problemId||null}:{}),
    scroll:{
      ...old.scroll,
      ...(patch.scrollY!==undefined?{[tab]:nonnegative(patch.scrollY)}:{}),
    },
  };
  const changed=next.tab!==old.tab||next.unitId!==old.unitId||next.taskId!==old.taskId||next.problemId!==old.problemId||
    next.scroll.study!==old.scroll.study||next.scroll.map!==old.scroll.map;
  state.smmc={...next,updatedAt:changed?now():old.updatedAt};
  return writeWorkspaceNav(state);
}

export async function reconcileWorkspaceNavCloud(){
  if(!workspaceCloudState().signedIn){navCloudReady=true;return {status:"local-only",payload:readWorkspaceNav()};}
  try{
    const result=await reconcileWorkspaceScope("workspace_nav",readWorkspaceNav(),mergeWorkspaceNav);
    if(result.payload){
      navCloudApplying=true;writeLocal(result.payload);navCloudApplying=false;
    }
    return result;
  }finally{navCloudReady=true;}
}

export function enableWorkspaceNavCloud(){
  navCloudReady=true;
  scheduleNavCloud();
}

export function t25Href({session,presentation,task,focus}={}){
  const state=readWorkspaceNav();
  const s=Number.isInteger(Number(session))?Math.min(162,Math.max(1,Number(session))):state.t25.session;
  const mode=presentation==="anime"?"anime":presentation==="plain"?"plain":state.t25.presentation;
  const taskKind=task==="transfer"?"transfer":task==="main"?"main":state.t25.task;
  const params=new URLSearchParams({session:String(s),presentation:mode,task:taskKind});
  if(focus)params.set("focus",focus);
  return `t25-course.html?${params.toString()}`;
}

export function smmcHref({tab,unitId,taskId,problemId,focus}={}){
  const state=readWorkspaceNav();
  const next={
    tab:tab||state.smmc.tab,
    unitId:unitId!==undefined?unitId:state.smmc.unitId,
    taskId:taskId!==undefined?taskId:state.smmc.taskId,
    problemId:problemId!==undefined?problemId:state.smmc.problemId,
  };
  const params=new URLSearchParams({tab:next.tab==="map"?"map":"study"});
  if(next.tab==="map"&&next.problemId)params.set("problem",next.problemId);
  if(next.tab!=="map"&&next.unitId)params.set("unit",next.unitId);
  if(next.tab!=="map"&&next.taskId)params.set("task",next.taskId);
  if(focus)params.set("focus",focus);
  return `smmc-course.html?${params.toString()}`;
}

export function restoreViewport({focusId,scrollY=0}={}){
  history.scrollRestoration="manual";
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    if(focusId){
      const target=document.getElementById(focusId);
      if(target){target.scrollIntoView({block:"start"});return;}
    }
    window.scrollTo(0,nonnegative(scrollY));
  }));
}
