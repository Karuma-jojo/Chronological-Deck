import assert from "node:assert/strict";

class MemoryStorage {
  constructor(){this.map=new Map();}
  getItem(k){return this.map.has(k)?this.map.get(k):null;}
  setItem(k,v){this.map.set(k,String(v));}
  removeItem(k){this.map.delete(k);}
  clear(){this.map.clear();}
}

globalThis.localStorage=new MemoryStorage();
globalThis.document={dispatchEvent(){}};
globalThis.CustomEvent=class{constructor(type){this.type=type;}};

const cfg={url:"https://example.supabase.co",key:"public"};
const session={
  access_token:"token",
  refresh_token:"refresh",
  expires_at:Math.floor(Date.now()/1000)+3600,
  user:{id:"11111111-1111-1111-1111-111111111111",email:"test@example.com"}
};
localStorage.setItem("chrono_mastery_sync_config_v1",JSON.stringify(cfg));
localStorage.setItem("chrono_mastery_sync_session_v1",JSON.stringify(session));

let rows=new Map();
let forceConflict=false;
function jsonResponse(body,status=200){
  return new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json"}});
}
globalThis.fetch=async(url,options={})=>{
  const u=new URL(String(url));
  if(!u.pathname.endsWith("/rest/v1/chrono_workspace_state"))throw new Error("Unexpected URL "+u);
  const scope=(u.searchParams.get("scope")||"").replace(/^eq\./,"");
  const method=(options.method||"GET").toUpperCase();
  if(method==="GET"){
    const row=rows.get(scope);
    return jsonResponse(row?[row]:[]);
  }
  if(method==="POST"){
    const body=JSON.parse(options.body);
    if(rows.has(body.scope))return jsonResponse({message:"duplicate"},409);
    const row={scope:body.scope,payload:body.payload,lock_version:1,updated_at:"2026-09-24T00:00:00.000Z"};
    rows.set(body.scope,row);return jsonResponse([row],201);
  }
  if(method==="PATCH"){
    const wanted=Number((u.searchParams.get("lock_version")||"").replace(/^eq\./,""));
    const row=rows.get(scope);
    if(forceConflict){
      forceConflict=false;
      rows.set(scope,{...row,payload:{counter:5},lock_version:row.lock_version+1,updated_at:"2026-09-24T00:00:02.000Z"});
      return jsonResponse([]);
    }
    if(!row||row.lock_version!==wanted)return jsonResponse([]);
    const body=JSON.parse(options.body);
    const next={...row,...body,updated_at:"2026-09-24T00:00:01.000Z"};
    rows.set(scope,next);return jsonResponse([next]);
  }
  throw new Error("Unexpected method "+method);
};

const cloud=await import("../js/workspace-cloud.js");
const nav=await import("../js/workspace-nav.js");

assert.equal(cloud.workspaceCloudState().signedIn,true);

let result=await cloud.reconcileWorkspaceScope(
  "t25_course",
  {counter:2},
  (local,remote)=>({counter:Math.max(local.counter,remote?.counter||0)})
);
assert.equal(result.status,"synced");
assert.deepEqual(rows.get("t25_course").payload,{counter:2});
assert.equal(rows.get("t25_course").lock_version,1);

rows.set("t25_course",{scope:"t25_course",payload:{counter:3},lock_version:2,updated_at:"2026-09-24T00:00:00.000Z"});
forceConflict=true;
result=await cloud.reconcileWorkspaceScope(
  "t25_course",
  {counter:4},
  (local,remote)=>({counter:Math.max(local.counter,remote?.counter||0)})
);
assert.equal(result.status,"synced");
assert.deepEqual(result.payload,{counter:5});
assert.deepEqual(rows.get("t25_course").payload,{counter:5});

const local={
  version:3,
  t25:{session:10,presentation:"plain",task:"main",scrollY:100,updatedAt:"2026-09-24T00:00:01.000Z"},
  smmc:{tab:"study",unitId:"U1",taskId:"Q1",problemId:null,scroll:{study:50,map:0},updatedAt:"2026-09-24T00:00:03.000Z"}
};
const remote={
  version:3,
  t25:{session:20,presentation:"anime",task:"transfer",scrollY:400,updatedAt:"2026-09-24T00:00:04.000Z"},
  smmc:{tab:"map",unitId:null,taskId:null,problemId:"SMMC-2023-A1",scroll:{study:0,map:200},updatedAt:"2026-09-24T00:00:02.000Z"}
};
const merged=nav.mergeWorkspaceNav(local,remote);
assert.equal(merged.t25.session,20,"newer remote T25 position should win");
assert.equal(merged.t25.presentation,"anime");
assert.equal(merged.smmc.unitId,"U1","newer local SMMC position should win");
assert.equal(merged.smmc.tab,"study");

localStorage.removeItem("chrono_mastery_sync_session_v1");
const localOnly=await cloud.reconcileWorkspaceScope(
  "workspace_nav",
  {version:3,t25:{session:1,presentation:"plain",task:"main",scrollY:0,updatedAt:null},smmc:{tab:"study",unitId:null,taskId:null,problemId:null,scroll:{study:0,map:0},updatedAt:null}},
  (a)=>a
);
assert.equal(localOnly.status,"local-only");

console.log("Workspace cloud transport and component-wise navigation merge passed.");
