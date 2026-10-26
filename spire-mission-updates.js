"use strict";
(function () {
 const PATCH_SCHEMA="spire-mission-patch-v1", BACKUP_KEY="spire42-before-last-quick-update";
 const $q=id=>document.getElementById(id);
 const levelRank={unassessed:0,introduced:1,assisted:2,independent:3,retained_transfer:4};
 function decode(input) {
   const code=String(input||"").trim();
   if(!code||code.length>14000||!/^[A-Za-z0-9_-]+$/.test(code))throw Error("Invalid or oversized mission code.");
   const binary=atob(code.replace(/-/g,"+").replace(/_/g,"/"));
   return JSON.parse(new TextDecoder().decode(Uint8Array.from(binary,ch=>ch.charCodeAt(0))));
 }
 function safeText(x,max=3500) {return String(x??"").slice(0,max)}
 function validatePatch(p) {
   if(!p||p.schema!==PATCH_SCHEMA||typeof p.id!=="string"||!/^[a-z0-9-]{3,80}$/i.test(p.id)||
      !Array.isArray(p.evidence)||p.evidence.length>12||!Array.isArray(p.journal)||p.journal.length>12)
     throw Error("Not a valid reviewed mission update.");
   if(p.evidence.some(e=>!e||!TEMPLATE.anchors.some(a=>a.id===e.id)||
      !(e.level in levelRank)||typeof e.evidence_ref!=="string"||e.evidence_ref.length>200||
      !e.evidence_ref||typeof e.evidence_note!=="string"||e.evidence_note.length>3500||
      !/^\d{4}-\d{2}-\d{2}$/.test(e.date||"")))throw Error("Mission update contains invalid evidence.");
   if(p.journal.some(e=>!e||typeof e.id!=="string"||e.id.length>140||
      typeof e.title!=="string"||e.title.length>180||
      typeof e.details!=="string"||e.details.length>7000))throw Error("Mission update contains an invalid journal entry.");
   if(p.mission&&(typeof p.mission.id!=="string"||p.mission.id.length>100||
      typeof p.mission.title!=="string"||p.mission.title.length>180))throw Error("Mission pointer is invalid.");
   return p;
 }
 function addUniqueText(existing,addition,max,joiner) {
   const prior=safeText(existing,max);
   if(!addition||prior.includes(addition))return prior;
   const merged=(prior?prior+joiner:"")+addition;
   return merged.length<=max?merged:prior;
 }
 function previewText(p){
   const lines=[ "Mission update: "+(p.mission?.title||p.id),"", "Evidence claims:" ];
   p.evidence.forEach(e=>lines.push(e.id+" · "+e.level+" · "+e.evidence_ref));
   lines.push("","Adds "+p.journal.length+" dated journal entries (duplicates skipped).",
     "Existing notes, unrelated seals, and stronger evidence are retained.",
     "A private local backup is saved. Apply this update?");
   return lines.join("\n");
 }
 function applyMissionCode(code) {
   let p;
   try{p=validatePatch(decode(code))}catch(e){$q("quickStatus").textContent="Could not read update: "+e.message;return}
   const applied=Array.isArray(ledger.appliedMissionPatches)?ledger.appliedMissionPatches:[];
   if(applied.includes(p.id)){$q("quickStatus").textContent="Already merged: "+p.id+". No changes made.";return}
   if(!confirm(previewText(p))){$q("quickStatus").textContent="Update not applied.";return}
   const updated=clone(ledger);
   updated.journal??=[]; updated.checkpoints??=[];
   for(const e of p.evidence){
     const target=updated.anchors.find(a=>a.id===e.id);
     if(!target)continue;
     const earlierRank=levelRank[target.level]??0;
     const laterRank=levelRank[e.level]??0;
     target.evidence_ref=addUniqueText(target.evidence_ref,e.evidence_ref,500,"; ");
     target.evidence_note=addUniqueText(target.evidence_note,e.evidence_note,3500,"\n\n");
     if(laterRank>earlierRank){
       target.level=e.level;
       target.verification="tutor_reviewed";
       target.date=e.date;
     } else if(laterRank===earlierRank&&!["tutor_reviewed","official"].includes(target.verification)){
       target.verification="tutor_reviewed";
       target.date=e.date;
     }
     if(target.level==="independent" && e.level==="independent" && !target.provenance)
       target.provenance="Strategy independently identified; review/repair and task context are specified in evidence note.";
   }
   const known=new Set(updated.journal.map(x=>x.id));
   for(const event of p.journal)if(!known.has(event.id)){
     updated.journal.push({id:safeText(event.id,140),date:safeText(event.date,10),
       mission:safeText(event.mission,100),type:safeText(event.type,40),
       title:safeText(event.title,180),details:safeText(event.details,7000),
       assistance:safeText(event.assistance,450),seal_delta:safeText(event.seal_delta,450)});
     known.add(event.id);
   }
   const oldId=String(updated.mission?.id||"");
   if(p.mission&&(!oldId||oldId==="SP-2026-10-26-001"||oldId===p.mission.id)){
     updated.mission={id:safeText(p.mission.id,100),title:safeText(p.mission.title,180),
       status:safeText(p.mission.status,250),source:safeText(p.mission.source,500),
       next:safeText(p.mission.next,800),updated_at:safeText(p.date,10)};
   }
   updated.appliedMissionPatches=[...applied,p.id].slice(-200);
   if(!valid(updated))throw Error("Merged ledger failed validation.");
   try{localStorage.setItem(BACKUP_KEY,JSON.stringify(ledger))}
   catch(e){$q("quickStatus").textContent="Could not save a safety backup, so no change was applied.";return}
   ledger=updated;
   save(); render();
   $q("quickStatus").textContent="Merged "+p.id+" · All existing data retained · Previous ledger backed up on this device.";
   $q("undoQuick").disabled=false;
 }
 $q("applyQuick").onclick=()=>applyMissionCode($q("quickCode").value);
 $q("undoQuick").disabled=!localStorage.getItem(BACKUP_KEY);
 $q("undoQuick").onclick=()=>{
   const b=localStorage.getItem(BACKUP_KEY);
   if(!b)return;
   let saved;try{saved=JSON.parse(b)}catch{return}
   if(!valid(saved)||!confirm("Undo the most recent quick merge and restore the previous local ledger?"))return;
   ledger=saved;localStorage.removeItem(BACKUP_KEY);save();render();
   $q("undoQuick").disabled=true;$q("quickStatus").textContent="Previous ledger restored.";
 };
 const hash=location.hash;
 if(hash.startsWith("#mission-update=")){
   let code="";
   try{code=decodeURIComponent(hash.slice("#mission-update=".length))}
   catch(e){$q("quickStatus").textContent="Invalid mission update URL."}
   history.replaceState(null,"",location.pathname+location.search);
   if(code){$q("quickCode").value=code;applyMissionCode(code)}
 }
})();
