import { WORLD } from "./data/world.js";
const BYID = new Map(WORLD.nodes.map(n => [n.id,n]));
const TERMINALS = new Map(WORLD.terminals.map(t => [t.id,t]));
const DEFAULT_TERM = "T05";
const LSKEY = "chrono_mastery_world_v1_progress";
const TERMKEY = "chrono_mastery_world_v1_terminal";
let currentTerminal = localStorage.getItem(TERMKEY) || DEFAULT_TERM;
let cleared = loadProgress();
let selectedNode = null;
let focusSet = null;

function loadProgress(){
  try{
    const x=JSON.parse(localStorage.getItem(LSKEY)||"null");
    if(Array.isArray(x)) return new Set(x.filter(id=>BYID.has(id)));
  }catch(e){}
  return new Set(WORLD.current.defaultCleared||[]);
}
function saveProgress(opts={}){
  localStorage.setItem(LSKEY,JSON.stringify([...cleared]));
  localStorage.setItem(TERMKEY,currentTerminal);
  updateAll();
  if(opts.cloud!==false && !suppressCloudPush) scheduleCloudPush();
}

// -------------------------
// CLOUD SYNC — native Supabase REST/Auth, no JS dependency
// -------------------------
const SYNCCFGKEY = "chrono_mastery_sync_config_v1";
const SYNCSESSIONKEY = "chrono_mastery_sync_session_v1";
const SYNCSQL = `-- Chrono-Deck v1.0 cloud progress
create table if not exists public.chrono_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  cleared text[] not null default '{}',
  terminal text not null default 'T05',
  world_version text not null default '1.0',
  updated_at timestamptz not null default now()
);

alter table public.chrono_progress enable row level security;

grant select, insert, update, delete
on table public.chrono_progress
to authenticated;

drop policy if exists "chrono_select_own" on public.chrono_progress;
drop policy if exists "chrono_insert_own" on public.chrono_progress;
drop policy if exists "chrono_update_own" on public.chrono_progress;
drop policy if exists "chrono_delete_own" on public.chrono_progress;

create policy "chrono_select_own"
on public.chrono_progress for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "chrono_insert_own"
on public.chrono_progress for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "chrono_update_own"
on public.chrono_progress for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "chrono_delete_own"
on public.chrono_progress for delete
to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.chrono_set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists chrono_progress_updated_at on public.chrono_progress;
create trigger chrono_progress_updated_at
before update on public.chrono_progress
for each row execute function public.chrono_set_updated_at();`;

let syncConfig = loadSyncConfig();
let syncSession = loadSyncSession();
let syncPushTimer = null;
let syncPollTimer = null;
let suppressCloudPush = false;
let lastCloudUpdatedAt = null;
let syncBusy = false;

function loadSyncConfig(){
  try{return JSON.parse(localStorage.getItem(SYNCCFGKEY)||"null")||{};}catch(e){return {};}
}
function loadSyncSession(){
  try{return JSON.parse(localStorage.getItem(SYNCSESSIONKEY)||"null");}catch(e){return null;}
}
function persistSyncSession(s){
  syncSession=s||null;
  if(syncSession) localStorage.setItem(SYNCSESSIONKEY,JSON.stringify(syncSession));
  else localStorage.removeItem(SYNCSESSIONKEY);
  updateSyncUI();
}
function syncReady(){return !!(syncConfig?.url && syncConfig?.key);}
function signedIn(){return !!(syncSession?.access_token && syncSession?.user?.id);}
function cleanBase(u){return String(u||"").trim().replace(/\/+$/,"");}
function syncHeaders(withAuth=true){
  const h={"apikey":syncConfig.key,"Content-Type":"application/json","Accept":"application/json"};
  if(withAuth && syncSession?.access_token) h["Authorization"]="Bearer "+syncSession.access_token;
  return h;
}
function setSyncStatus(msg,kind="warn"){
  const el=document.getElementById("syncStatus");
  if(el){el.textContent=msg;el.className="sync-status "+kind;}
  const sum=document.getElementById("syncSummary");
  if(sum) sum.textContent=msg;
}
function updateSyncUI(){
  const pill=document.getElementById("syncPill");
  if(!pill)return;
  if(signedIn()){
    const email=syncSession?.user?.email||"account";
    pill.textContent="☁ Cloud sync: "+email;
    setSyncStatus("Signed in as "+email+". Changes sync automatically; other open devices poll about every 20 seconds.","good");
  }else if(syncReady()){
    pill.textContent="☁ Cloud sync: configured";
    setSyncStatus("Cloud configured on this device. Sign in to start automatic cross-device sync.","warn");
  }else{
    pill.textContent="☁ Cloud sync: off";
    setSyncStatus("Cloud sync is optional. Local progress still works exactly as before.","warn");
  }
}
function hydrateSyncFields(){
  document.getElementById("syncUrl").value=syncConfig?.url||"";
  document.getElementById("syncKey").value=syncConfig?.key||"";
  document.getElementById("syncEmail").value=syncConfig?.email||syncSession?.user?.email||"";
  document.getElementById("syncSql").value=SYNCSQL;
  updateSyncUI();
}
async function authRequest(path,body){
  if(!syncReady()) throw Error("Save your Supabase Project URL and public anon/publishable key first.");
  const r=await fetch(cleanBase(syncConfig.url)+"/auth/v1/"+path,{
    method:"POST",headers:syncHeaders(false),body:JSON.stringify(body)
  });
  let j={}; try{j=await r.json();}catch(e){}
  if(!r.ok) throw Error(j.msg||j.message||j.error_description||("Auth error "+r.status));
  return j;
}
async function refreshSyncSession(){
  if(!syncSession?.refresh_token) return syncSession;
  const exp=(syncSession.expires_at||0)*1000;
  if(exp && exp>Date.now()+90000) return syncSession;
  try{
    const j=await authRequest("token?grant_type=refresh_token",{refresh_token:syncSession.refresh_token});
    if(j?.access_token){
      if(!j.expires_at && j.expires_in) j.expires_at=Math.floor(Date.now()/1000)+j.expires_in;
      persistSyncSession(j);
    }
  }catch(err){
    persistSyncSession(null);
    throw Error("Cloud session expired. Sign in again.");
  }
  return syncSession;
}
async function cloudFetchRow(){
  if(!signedIn()) return null;
  await refreshSyncSession();
  const uid=encodeURIComponent(syncSession.user.id);
  const r=await fetch(cleanBase(syncConfig.url)+"/rest/v1/chrono_progress?user_id=eq."+uid+"&select=user_id,cleared,terminal,world_version,updated_at",{
    headers:syncHeaders(true)
  });
  let j={}; try{j=await r.json();}catch(e){}
  if(!r.ok) throw Error(j.message||j.hint||("Cloud read error "+r.status));
  return Array.isArray(j)?(j[0]||null):null;
}
async function cloudPush(){
  if(!signedIn() || syncBusy) return;
  syncBusy=true;
  try{
    await refreshSyncSession();
    setSyncStatus("Syncing local changes…","warn");
    const body={
      user_id:syncSession.user.id,
      cleared:[...cleared],
      terminal:currentTerminal,
      world_version:WORLD.version
    };
    const r=await fetch(cleanBase(syncConfig.url)+"/rest/v1/chrono_progress?on_conflict=user_id",{
      method:"POST",
      headers:{...syncHeaders(true),"Prefer":"resolution=merge-duplicates,return=representation"},
      body:JSON.stringify(body)
    });
    let j={}; try{j=await r.json();}catch(e){}
    if(!r.ok) throw Error(j.message||j.hint||("Cloud write error "+r.status));
    const row=Array.isArray(j)?j[0]:j;
    if(row?.updated_at) lastCloudUpdatedAt=row.updated_at;
    setSyncStatus("Synced ☁ "+new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"}),"good");
  }catch(err){
    setSyncStatus("Sync error: "+err.message,"bad");
  }finally{syncBusy=false;}
}
function scheduleCloudPush(){
  if(!signedIn()) return;
  clearTimeout(syncPushTimer);
  syncPushTimer=setTimeout(cloudPush,900);
}
function applyCloudRow(row,merge=false){
  if(!row)return;
  suppressCloudPush=true;
  const remote=(Array.isArray(row.cleared)?row.cleared:[]).filter(id=>BYID.has(id));
  cleared=merge ? new Set([...cleared,...remote]) : new Set(remote);
  if(row.terminal && TERMINALS.has(row.terminal)) currentTerminal=row.terminal;
  localStorage.setItem(LSKEY,JSON.stringify([...cleared]));
  localStorage.setItem(TERMKEY,currentTerminal);
  if(document.getElementById("terminalSelect")) terminalSelect.value=currentTerminal;
  if(row.updated_at) lastCloudUpdatedAt=row.updated_at;
  updateAll();
  suppressCloudPush=false;
}
async function initialCloudReconcile(){
  if(!signedIn())return;
  try{
    setSyncStatus("Checking cloud progress…","warn");
    const row=await cloudFetchRow();
    const initKey="chrono_sync_initialized_"+syncSession.user.id;
    const initialized=localStorage.getItem(initKey)==="1";
    if(!row){
      await cloudPush();
    }else if(!initialized){
      // First connection on a device: union prevents accidentally erasing progress
      // that already exists either locally or in the cloud.
      applyCloudRow(row,true);
      await cloudPush();
    }else{
      applyCloudRow(row,false);
      setSyncStatus("Cloud progress loaded ☁","good");
    }
    localStorage.setItem(initKey,"1");
    startSyncPolling();
  }catch(err){setSyncStatus("Initial sync error: "+err.message,"bad");}
}
async function pollCloud(){
  if(!signedIn() || syncBusy || document.hidden)return;
  try{
    const row=await cloudFetchRow();
    if(!row)return;
    if(row.updated_at && row.updated_at!==lastCloudUpdatedAt){
      applyCloudRow(row,false);
      setSyncStatus("Updated from another device ☁","good");
    }
  }catch(err){
    // Keep local mode working quietly if network is temporarily unavailable.
    setSyncStatus("Cloud temporarily unavailable; local progress is safe. "+err.message,"warn");
  }
}
function startSyncPolling(){
  clearInterval(syncPollTimer);
  if(signedIn()) syncPollTimer=setInterval(pollCloud,20000);
}
async function syncNow(){
  if(!signedIn())throw Error("Sign in first.");
  const row=await cloudFetchRow();
  if(row?.updated_at && row.updated_at!==lastCloudUpdatedAt) applyCloudRow(row,false);
  await cloudPush();
}
document.getElementById("saveSyncConfig").addEventListener("click",()=>{
  const url=cleanBase(document.getElementById("syncUrl").value);
  const key=document.getElementById("syncKey").value.trim();
  const email=document.getElementById("syncEmail").value.trim();
  if(!/^https:\/\/.+\.supabase\.co$/i.test(url)) return setSyncStatus("That does not look like a Supabase Project URL.","bad");
  if(!key) return setSyncStatus("Paste the public anon/publishable key.","bad");
  syncConfig={url,key,email};
  localStorage.setItem(SYNCCFGKEY,JSON.stringify(syncConfig));
  setSyncStatus("Cloud settings saved on this device. Create an account or sign in.","good");
  updateSyncUI();
});
document.getElementById("syncSignUp").addEventListener("click",async()=>{
  try{
    const email=document.getElementById("syncEmail").value.trim();
    const password=document.getElementById("syncPassword").value;
    if(password.length<6)throw Error("Use a password of at least 6 characters.");
    syncConfig={...syncConfig,email};localStorage.setItem(SYNCCFGKEY,JSON.stringify(syncConfig));
    const j=await authRequest("signup",{email,password});
    if(j?.access_token){
      if(!j.expires_at && j.expires_in) j.expires_at=Math.floor(Date.now()/1000)+j.expires_in;
      persistSyncSession(j);await initialCloudReconcile();
    }else{
      setSyncStatus("Account created. Check your email to confirm it, then use Sign in.","good");
    }
  }catch(err){setSyncStatus("Sign-up error: "+err.message,"bad");}
});
document.getElementById("syncSignIn").addEventListener("click",async()=>{
  try{
    const email=document.getElementById("syncEmail").value.trim();
    const password=document.getElementById("syncPassword").value;
    syncConfig={...syncConfig,email};localStorage.setItem(SYNCCFGKEY,JSON.stringify(syncConfig));
    const j=await authRequest("token?grant_type=password",{email,password});
    if(!j.expires_at && j.expires_in) j.expires_at=Math.floor(Date.now()/1000)+j.expires_in;
    persistSyncSession(j);
    document.getElementById("syncPassword").value="";
    await initialCloudReconcile();
  }catch(err){setSyncStatus("Sign-in error: "+err.message,"bad");}
});
document.getElementById("syncSignOut").addEventListener("click",async()=>{
  try{
    if(signedIn()){
      await refreshSyncSession();
      await fetch(cleanBase(syncConfig.url)+"/auth/v1/logout",{method:"POST",headers:syncHeaders(true)});
    }
  }catch(e){}
  persistSyncSession(null);
  clearInterval(syncPollTimer);
  setSyncStatus("Signed out. Local progress remains on this device.","warn");
});
document.getElementById("disconnectSync").addEventListener("click",()=>{
  if(!confirm("Disconnect cloud sync on this device? Local progress will remain."))return;
  persistSyncSession(null);syncConfig={};
  localStorage.removeItem(SYNCCFGKEY);
  clearInterval(syncPollTimer);
  hydrateSyncFields();
});
document.getElementById("syncNow").addEventListener("click",async()=>{
  try{await syncNow();}catch(err){setSyncStatus("Sync error: "+err.message,"bad");}
});
document.getElementById("copySyncSql").addEventListener("click",async()=>{
  try{
    await navigator.clipboard.writeText(SYNCSQL);
    setSyncStatus("Supabase SQL copied.","good");
  }catch(e){
    document.getElementById("syncSql").select();
    setSyncStatus("Clipboard permission was blocked; SQL selected so you can copy it manually.","warn");
  }
});
window.addEventListener("storage",e=>{
  if(e.key===LSKEY && e.newValue){
    try{
      const arr=JSON.parse(e.newValue);
      if(Array.isArray(arr)){suppressCloudPush=true;cleared=new Set(arr.filter(id=>BYID.has(id)));updateAll();suppressCloudPush=false;}
    }catch(err){}
  }
});
document.addEventListener("visibilitychange",()=>{if(!document.hidden && signedIn())pollCloud();});

function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}
function levelNum(l){return Number(String(l||"L0").replace(/\D/g,""))||0;}
function activePrereqs(n){
  const terminalSpecific=n?.terminalMasteryPrereqs?.[currentTerminal];
  return Array.isArray(terminalSpecific)?terminalSpecific:(n?.masteryPrereqs||[]);
}
function activeTitle(n){return n?.terminalTitles?.[currentTerminal]||n?.title||n?.id||"";}
function activeSummary(n){return n?.terminalSummaries?.[currentTerminal]||n?.summary||"";}
function activeScope(n){return n?.terminalMasteryScope?.[currentTerminal]||n?.masteryScope||"";}
function status(id){
  if(cleared.has(id)) return "cleared";
  const n=BYID.get(id); if(!n) return "locked";
  return activePrereqs(n).every(x=>cleared.has(x)) ? "ready" : "locked";
}
function reqClosure(ids){
  const out=new Set(ids), stack=[...ids];
  while(stack.length){
    const u=stack.pop(), n=BYID.get(u);
    for(const p of activePrereqs(n)){
      if(!out.has(p)){out.add(p);stack.push(p);}
    }
  }
  return out;
}
function descendants(id){
  const out=new Set([id]), q=[id];
  while(q.length){
    const u=q.shift();
    for(const n of WORLD.nodes){
      if(activePrereqs(n).includes(u) && !out.has(n.id)){out.add(n.id);q.push(n.id);}
    }
  }
  return out;
}
function prereqs(id){ return reqClosure([id]); }
function dl(name,text,type="application/json"){
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([text],{type}));
  a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),800);
}

const terminalSelect=document.getElementById("terminalSelect");
WORLD.terminals.forEach(t=>{
  const o=document.createElement("option");o.value=t.id;o.textContent=`${t.id} · ${t.name} (${t.count} arcs)`;terminalSelect.appendChild(o);
});
terminalSelect.value=currentTerminal;
terminalSelect.addEventListener("change",()=>{currentTerminal=terminalSelect.value;localStorage.setItem(TERMKEY,currentTerminal);selectedNode=null;focusSet=null;updateAll();scheduleCloudPush();});

function terminalPath(){return new Set(TERMINALS.get(currentTerminal).required);}

function routeStage(n,t){
  const terminalStage=n?.terminalStages?.[t.id];
  if(Number.isInteger(terminalStage) && terminalStage>=0 && terminalStage<=4) return terminalStage;
  if(n.commonGroup==="Scientific Temperament") return 0;
  if(n.commonGroup==="Universal Foundations") return 1;
  if((n.gatewayTags||[]).some(g=>t.gateways.includes(g))) return 2;
  if(n.kind==="new" && levelNum(n.level)>=5) return 4;
  return 3;
}
const defaultStageNames=["Scientific temperament","Universal foundations","Field gateway","Advanced field depth","Graduate forge"];

function wrapText(s,max=22){
  const ws=String(s).split(/\s+/), out=[];let line="";
  for(const w of ws){const test=(line+" "+w).trim(); if(test.length>max&&line){out.push(line);line=w;} else line=test;}
  if(line)out.push(line);return out.slice(0,3);
}

function renderRoute(){
  const t=TERMINALS.get(currentTerminal), path=terminalPath();
  document.getElementById("routeTitle").textContent=`${t.id} · ${t.name}`;
  document.getElementById("routeSummary").textContent=t.summary;
  document.getElementById("terminalExit").textContent=t.exit;
  document.getElementById("mRoute").textContent=t.count;

  const search=(document.getElementById("routeSearch").value||"").toLowerCase().trim();
  const filter=document.getElementById("routeFilter").value;
  const visible=[...path].map(id=>BYID.get(id)).filter(Boolean).filter(n=>{
    if(search && !(n.id+" "+n.arc+" "+activeTitle(n)+" "+activeSummary(n)+" "+activeScope(n)).toLowerCase().includes(search)) return false;
    const st=status(n.id);
    if(filter==="remaining" && st==="cleared") return false;
    if(filter==="ready" && st!=="ready") return false;
    if(filter==="new" && n.kind!=="new") return false;
    if(filter==="existing" && n.kind!=="existing") return false;
    return true;
  });

  const cols=[[],[],[],[],[]];
  visible.forEach(n=>cols[routeStage(n,t)].push(n));
  const orderedIndex=new Map((t.order||[]).map((id,index)=>[id,index]));
  cols.forEach(arr=>arr.sort((a,b)=>{
    if(orderedIndex.size) return (orderedIndex.get(a.id)??9999)-(orderedIndex.get(b.id)??9999);
    const sa=status(a.id), sb=status(b.id);
    const rank={ready:0,locked:1,cleared:2};
    return rank[sa]-rank[sb] || levelNum(a.level)-levelNum(b.level) || (a.playOrder||9999)-(b.playOrder||9999) || a.id.localeCompare(b.id);
  }));

  const svg=document.getElementById("routeGraph");
  [...svg.querySelectorAll(".render")].forEach(e=>e.remove());
  const colX=[20,240,460,680,900], nodeW=180,nodeH=48,rowGap=10,top=62;
  const maxRows=Math.max(...cols.map(x=>x.length),1);
  const H=Math.max(800,top+maxRows*(nodeH+rowGap)+70);
  svg.setAttribute("viewBox",`0 0 1100 ${H}`);
  svg.style.height=H+"px";
  const pos=new Map();
  const stageNames=t.stageNames||defaultStageNames;

  cols.forEach((arr,ci)=>{
    const lab=document.createElementNS("http://www.w3.org/2000/svg","text");
    lab.setAttribute("x",colX[ci]);lab.setAttribute("y","27");lab.setAttribute("class","stage-label render");lab.textContent=stageNames[ci]||defaultStageNames[ci];svg.appendChild(lab);
    const ct=document.createElementNS("http://www.w3.org/2000/svg","text");
    ct.setAttribute("x",colX[ci]);ct.setAttribute("y","43");ct.setAttribute("class","stage-count render");ct.textContent=`${arr.length} shown`;svg.appendChild(ct);
    arr.forEach((n,ri)=>pos.set(n.id,{x:colX[ci],y:top+ri*(nodeH+rowGap),w:nodeW,h:nodeH}));
  });

  // edges first
  visible.forEach(n=>{
    const b=pos.get(n.id); if(!b)return;
    for(const p of activePrereqs(n)){
      const a=pos.get(p); if(!a)return;
      const pathEl=document.createElementNS("http://www.w3.org/2000/svg","path");
      const x1=a.x+a.w,y1=a.y+a.h/2,x2=b.x,y2=b.y+b.h/2,mid=(x1+x2)/2;
      pathEl.setAttribute("d",`M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`);
      pathEl.setAttribute("class","edge render");
      pathEl.dataset.source=p;pathEl.dataset.target=n.id;svg.appendChild(pathEl);
    }
  });

  cols.forEach(arr=>arr.forEach(n=>{
    const p=pos.get(n.id), g=document.createElementNS("http://www.w3.org/2000/svg","g");
    const st=status(n.id);
    g.setAttribute("class",`node ${n.kind} ${st} render${selectedNode===n.id?" selected":""}`);
    g.setAttribute("transform",`translate(${p.x},${p.y})`);
    g.dataset.id=n.id;g.style.cursor="pointer";
    if(focusSet && !focusSet.has(n.id))g.classList.add("searchdim");
    const r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("width",p.w);r.setAttribute("height",p.h);g.appendChild(r);
    const dot=document.createElementNS("http://www.w3.org/2000/svg","circle");dot.setAttribute("cx","169");dot.setAttribute("cy","10");dot.setAttribute("r","4");dot.setAttribute("class",`status-dot ${st}`);g.appendChild(dot);
    const lines=wrapText(activeTitle(n),27);
    lines.forEach((s,i)=>{const tx=document.createElementNS("http://www.w3.org/2000/svg","text");tx.setAttribute("x","8");tx.setAttribute("y",String(15+i*11));tx.setAttribute("class","t");tx.textContent=s;g.appendChild(tx);});
    const m=document.createElementNS("http://www.w3.org/2000/svg","text");m.setAttribute("x","8");m.setAttribute("y","43");m.setAttribute("class","m");m.textContent=`${n.arc} · ${n.level} · ${n.kind}`;g.appendChild(m);
    g.addEventListener("click",()=>{selectedNode=n.id;focusSet=null;showDetail(n.id);renderRoute();});
    svg.appendChild(g);
  }));

  if(focusSet){
    svg.querySelectorAll(".edge").forEach(e=>{
      if(focusSet.has(e.dataset.source)&&focusSet.has(e.dataset.target)) e.classList.add("hot");
    });
  }
}

function showDetail(id){
  const n=BYID.get(id);if(!n)return;
  selectedNode=id;
  const t=TERMINALS.get(currentTerminal);
  const currentStage=routeStage(n,t);
  const stageNames=t.stageNames||defaultStageNames;
  document.getElementById("detailTitle").textContent=`${n.arc} · ${activeTitle(n)}`;
  document.getElementById("detailSummary").textContent=activeSummary(n)||"No summary stored.";
  const tags=document.getElementById("detailTags");tags.innerHTML="";
  const tagVals=[[n.kind,n.kind],[n.level,"term"],...(n.domains||[]).map(x=>[x,"term"])];
  tagVals.forEach(([txt,cl])=>{const s=document.createElement("span");s.className=`tag ${cl}`;s.textContent=txt;tags.appendChild(s);});
  document.getElementById("nodeControls").classList.remove("hidden");
  const ck=document.getElementById("clearedCheck");ck.checked=cleared.has(id);
  const termNames=(n.terminalTags||[]).map(x=>TERMINALS.get(x)?.name).filter(Boolean);
  const lines=n.sourceStart?`lines ${n.sourceStart}–${n.sourceEnd}`:"Mastery Expansion v1.0";
  document.getElementById("detailKV").innerHTML=`
    <div>Status</div><div>${status(id)}</div>
    <div>Stage</div><div>${esc(stageNames[currentStage]||n.stage)}</div>
    <div>Prereqs</div><div>${activePrereqs(n).map(x=>esc(BYID.get(x)?.arc||x)).join(", ")||"—"}</div>
    <div>Used by</div><div>${termNames.length?esc(termNames.join(" · ")):"Optional / exploration"}</div>
    <div>Source</div><div>${n.kind==="existing"?"Current Chrono-Deck, "+lines:lines}</div>
    <div>Historical</div><div>${n.storyPrereqs?.length?esc(n.storyPrereqs.join(", ")):"—"}</div>
    <div>Core scope</div><div>${activeScope(n)?esc(activeScope(n)):"—"}</div>`;
}
document.getElementById("clearedCheck").addEventListener("change",e=>{
  if(!selectedNode)return;e.target.checked?cleared.add(selectedNode):cleared.delete(selectedNode);saveProgress();
});
document.getElementById("focusPrereqs").addEventListener("click",()=>{if(selectedNode){focusSet=prereqs(selectedNode);renderRoute();}});
document.getElementById("focusDesc").addEventListener("click",()=>{if(selectedNode){focusSet=descendants(selectedNode);renderRoute();}});
document.getElementById("highlightCore").addEventListener("click",()=>{focusSet=new Set([...WORLD.commonScientific,...WORLD.commonFoundations]);renderRoute();});
document.getElementById("highlightPrereqs").addEventListener("click",()=>{if(selectedNode){focusSet=prereqs(selectedNode);renderRoute();}});
document.getElementById("clearHighlight").addEventListener("click",()=>{focusSet=null;renderRoute();});
document.getElementById("routeSearch").addEventListener("input",renderRoute);
document.getElementById("routeFilter").addEventListener("change",renderRoute);

function renderProgress(){
  const t=TERMINALS.get(currentTerminal), required=new Set(t.required);
  const done=[...required].filter(x=>cleared.has(x)).length;
  const pct=Math.round(done/t.count*100);
  document.getElementById("mProgress").textContent=`${done}/${t.count}`;
  document.getElementById("routeProgressBar").style.width=pct+"%";
  document.getElementById("routeProgressText").textContent=`${done} cleared · ${t.count-done} remaining · ${pct}% of ${t.name}. Overall world: ${cleared.size}/${WORLD.nodes.length}.`;
}
document.getElementById("resetProgress").addEventListener("click",()=>{
  if(confirm("Reset all mastery progress?")){cleared=new Set(WORLD.current.defaultCleared||[]);saveProgress();}
});
document.getElementById("exportProgress").addEventListener("click",()=>{
  dl("chrono_progress.json",JSON.stringify({version:WORLD.version,terminal:currentTerminal,cleared:[...cleared],exportedAt:new Date().toISOString()},null,2));
});
document.getElementById("exportWorld").addEventListener("click",()=>dl("chrono_mastery_world_v1.json",JSON.stringify(WORLD,null,2)));
document.getElementById("importProgressBtn").addEventListener("click",()=>document.getElementById("importProgressFile").click());
document.getElementById("importProgressFile").addEventListener("change",async e=>{
  const f=e.target.files?.[0];if(!f)return;
  try{const j=JSON.parse(await f.text());if(!Array.isArray(j.cleared))throw Error("Missing cleared array");
    cleared=new Set(j.cleared.filter(id=>BYID.has(id)));if(j.terminal&&TERMINALS.has(j.terminal)){currentTerminal=j.terminal;terminalSelect.value=currentTerminal;}
    saveProgress();
  }catch(err){alert("Could not import progress: "+err.message);}
  e.target.value="";
});

function populateExploreFilters(){
  const domains=[...new Set(WORLD.nodes.flatMap(n=>n.domains||[]))].sort();
  const ds=document.getElementById("domainFilter");domains.forEach(d=>{const o=document.createElement("option");o.value=d;o.textContent=d;ds.appendChild(o);});
  const levels=[...new Set(WORLD.nodes.map(n=>n.level))].sort((a,b)=>levelNum(a)-levelNum(b));
  const ls=document.getElementById("levelFilter");levels.forEach(l=>{const o=document.createElement("option");o.value=l;o.textContent=l;ls.appendChild(o);});
  const ts=document.getElementById("terminalFilter");WORLD.terminals.forEach(t=>{const o=document.createElement("option");o.value=t.id;o.textContent=t.name;ts.appendChild(o);});
}
function renderExplore(){
  const q=(document.getElementById("exploreSearch").value||"").toLowerCase().trim();
  const d=document.getElementById("domainFilter").value,l=document.getElementById("levelFilter").value,k=document.getElementById("kindFilter").value,t=document.getElementById("terminalFilter").value;
  let arr=WORLD.nodes.filter(n=>{
    if(q && !(n.id+" "+n.arc+" "+activeTitle(n)+" "+activeSummary(n)+" "+(n.domains||[]).join(" ")).toLowerCase().includes(q))return false;
    if(d && !(n.domains||[]).includes(d))return false;
    if(l && n.level!==l)return false;
    if(k && n.kind!==k)return false;
    if(t && !(n.terminalTags||[]).includes(t))return false;
    return true;
  }).sort((a,b)=>(a.playOrder||9999)-(b.playOrder||9999)||a.id.localeCompare(b.id));
  document.getElementById("exploreCount").textContent=`Showing ${arr.length} of ${WORLD.nodes.length} nodes.`;
  const g=document.getElementById("exploreGrid");g.innerHTML="";
  arr.forEach(n=>{
    const c=document.createElement("div");c.className=`node-card ${cleared.has(n.id)?"cleared":""}`;
    c.innerHTML=`<div class="meta"><span class="tag ${n.kind}">${esc(n.arc)}</span><span class="tag">${esc(n.level)}</span><span class="tag">${esc(status(n.id))}</span></div><h3>${esc(activeTitle(n))}</h3><p>${esc(activeSummary(n)).slice(0,220)}</p>`;
    c.addEventListener("click",()=>{switchTab("route");const candidate=(n.terminalTags||[])[0];if(candidate){currentTerminal=candidate;terminalSelect.value=candidate;}selectedNode=n.id;showDetail(n.id);renderRoute();renderProgress();});
    g.appendChild(c);
  });
}
["exploreSearch","domainFilter","levelFilter","kindFilter","terminalFilter"].forEach(id=>document.getElementById(id).addEventListener(id==="exploreSearch"?"input":"change",renderExplore));

function renderStory(){
  const mains=WORLD.nodes.filter(n=>n.kind==="existing"&&n.playOrder).sort((a,b)=>a.playOrder-b.playOrder);
  const byAnchor=new Map();
  WORLD.nodes.filter(n=>n.kind==="existing"&&n.id.startsWith("SIDE")).forEach(s=>{
    const a=s.storyPrereqs?.[0];if(!a)return;if(!byAnchor.has(a))byAnchor.set(a,[]);byAnchor.get(a).push(s);
  });
  const box=document.getElementById("storyList");box.innerHTML="";
  mains.forEach(n=>{
    const sides=byAnchor.get(n.id)||[];
    const r=document.createElement("div");r.className="story-row";
    r.innerHTML=`<span>#${String(n.playOrder).padStart(3,"0")}</span><div><strong>${esc(n.arc)} · ${esc(n.title)}</strong><div class="subtitle">${sides.length} linked side mission${sides.length===1?"":"s"}${cleared.has(n.id)?" · cleared":""}</div></div><span>${esc(n.deck||"")}</span>`;
    r.addEventListener("click",()=>{switchTab("explore");document.getElementById("exploreSearch").value=n.id;renderExplore();});
    box.appendChild(r);
  });
}

function updateAll(){renderRoute();renderProgress();renderExplore();renderStory();if(selectedNode)showDetail(selectedNode);}

function switchTab(name){
  document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));
  document.getElementById("routeTab").style.display=name==="route"?"block":"none";
  document.getElementById("exploreTab").style.display=name==="explore"?"block":"none";
  document.getElementById("storyTab").style.display=name==="story"?"block":"none";
  if(name==="explore")renderExplore();if(name==="story")renderStory();
}
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>switchTab(b.dataset.tab)));

populateExploreFilters();
updateAll();
hydrateSyncFields();
if(signedIn()){
  initialCloudReconcile();
}else{
  updateSyncUI();
}