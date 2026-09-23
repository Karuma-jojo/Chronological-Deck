// Lightweight cross-device workspace sync over the existing Chrono-Deck Supabase session.
// Local storage remains authoritative for immediate writes; this is an account-private durable mirror.

const CFG_KEY="chrono_mastery_sync_config_v1";
const SESSION_KEY="chrono_mastery_sync_session_v1";
const TABLE="chrono_workspace_state";
const VALID_SCOPES=new Set(["t25_course","smmc_historical","smmc_study","workspace_nav"]);
const timers=new Map();

function readJson(key){
  try{return JSON.parse(localStorage.getItem(key)||"null");}catch{return null;}
}
function cleanBase(value){return String(value||"").trim().replace(/\/+$/,"");}
function context(){
  const config=readJson(CFG_KEY)||{},session=readJson(SESSION_KEY)||{};
  return {
    url:cleanBase(config.url),
    key:String(config.key||"").trim(),
    email:String(session?.user?.email||config.email||"").trim(),
    accessToken:String(session.access_token||"").trim(),
    refreshToken:String(session.refresh_token||"").trim(),
    expiresAt:Number(session.expires_at||0),
    userId:String(session?.user?.id||"").trim(),
  };
}
export function workspaceCloudState(){
  const c=context(),configured=Boolean(c.url&&c.key);
  return {...c,configured,signedIn:Boolean(configured&&c.accessToken&&c.userId)};
}
function persistSession(value){
  if(value)localStorage.setItem(SESSION_KEY,JSON.stringify(value));
  else localStorage.removeItem(SESSION_KEY);
  document.dispatchEvent(new CustomEvent("chrono:cloud-context-changed"));
}
async function parse(response){
  const raw=await response.text();
  if(!raw)return null;
  try{return JSON.parse(raw);}catch{return raw;}
}
function message(payload,fallback){
  if(typeof payload==="string"&&payload)return payload;
  return payload?.message||payload?.hint||payload?.details||payload?.error_description||fallback;
}
function headers(c){
  return {
    apikey:c.key,
    Authorization:`Bearer ${c.accessToken}`,
    "Content-Type":"application/json",
    Accept:"application/json",
  };
}
async function refresh(){
  let c=workspaceCloudState();
  if(!c.signedIn)return c;
  const exp=c.expiresAt*1000;
  if(!exp||exp>Date.now()+90000)return c;
  if(!c.refreshToken)throw new Error("Cloud session expired. Sign in again from Chrono-Deck home.");
  const response=await fetch(`${c.url}/auth/v1/token?grant_type=refresh_token`,{
    method:"POST",
    headers:{apikey:c.key,"Content-Type":"application/json",Accept:"application/json"},
    body:JSON.stringify({refresh_token:c.refreshToken}),
  });
  const payload=await parse(response);
  if(!response.ok){
    persistSession(null);
    throw new Error(message(payload,"Cloud session expired. Sign in again."));
  }
  if(!payload.expires_at&&payload.expires_in)payload.expires_at=Math.floor(Date.now()/1000)+Number(payload.expires_in);
  persistSession(payload);
  return workspaceCloudState();
}
function scopeUrl(c,scope,extra={}){
  const url=new URL(`${c.url}/rest/v1/${TABLE}`);
  url.searchParams.set("user_id",`eq.${c.userId}`);
  url.searchParams.set("scope",`eq.${scope}`);
  for(const [key,value] of Object.entries(extra))url.searchParams.set(key,value);
  return url;
}
function assertScope(scope){
  if(!VALID_SCOPES.has(scope))throw new Error(`Unknown workspace cloud scope: ${scope}`);
}
async function fetchRow(scope){
  assertScope(scope);
  const c=await refresh();
  if(!c.signedIn)return {context:c,row:null,localOnly:true};
  const url=scopeUrl(c,scope,{select:"scope,payload,lock_version,updated_at"});
  const response=await fetch(url,{headers:headers(c),cache:"no-store"});
  const payload=await parse(response);
  if(!response.ok)throw new Error(message(payload,`Workspace cloud read failed (${response.status})`));
  return {context:c,row:Array.isArray(payload)?payload[0]||null:null,localOnly:false};
}
async function insertRow(c,scope,payload){
  const response=await fetch(`${c.url}/rest/v1/${TABLE}`,{
    method:"POST",
    headers:{...headers(c),Prefer:"return=representation"},
    body:JSON.stringify({user_id:c.userId,scope,payload,lock_version:1}),
  });
  const body=await parse(response);
  if(response.status===409)return null;
  if(!response.ok)throw new Error(message(body,`Workspace cloud insert failed (${response.status})`));
  return Array.isArray(body)?body[0]||null:body;
}
async function patchRow(c,scope,payload,version){
  const url=scopeUrl(c,scope,{lock_version:`eq.${version}`});
  const response=await fetch(url,{
    method:"PATCH",
    headers:{...headers(c),Prefer:"return=representation"},
    body:JSON.stringify({payload,lock_version:version+1}),
  });
  const body=await parse(response);
  if(!response.ok)throw new Error(message(body,`Workspace cloud update failed (${response.status})`));
  return Array.isArray(body)?body[0]||null:body;
}
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);

export async function reconcileWorkspaceScope(scope,localPayload,merge){
  assertScope(scope);
  if(typeof merge!=="function")throw new Error("Workspace cloud merge function is required");
  let local=localPayload;
  for(let attempt=0;attempt<3;attempt++){
    const {context:c,row,localOnly}=await fetchRow(scope);
    if(localOnly)return {payload:local,status:"local-only",updatedAt:null};
    const merged=merge(local,row?.payload??null);
    if(row&&same(merged,row.payload))return {payload:merged,status:"synced",updatedAt:row.updated_at};
    const saved=row
      ? await patchRow(c,scope,merged,Number(row.lock_version||1))
      : await insertRow(c,scope,merged);
    if(saved)return {payload:merged,status:"synced",updatedAt:saved.updated_at||null};
    local=merged; // optimistic conflict: refetch and merge again.
  }
  throw new Error("Workspace changed on another device repeatedly. Retry sync.");
}

export function scheduleWorkspaceScopeSync(scope,getLocal,merge,onResult,delay=900){
  assertScope(scope);
  clearTimeout(timers.get(scope));
  if(!workspaceCloudState().signedIn){
    onResult?.({status:"local-only",payload:getLocal(),updatedAt:null});
    return;
  }
  timers.set(scope,setTimeout(async()=>{
    timers.delete(scope);
    try{onResult?.(await reconcileWorkspaceScope(scope,getLocal(),merge));}
    catch(error){onResult?.({status:"error",error,payload:getLocal(),updatedAt:null});}
  },delay));
}

export function cancelWorkspaceScopeSync(scope){
  clearTimeout(timers.get(scope));
  timers.delete(scope);
}
