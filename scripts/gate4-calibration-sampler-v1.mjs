// Gate 4 calibration v0.2 — SELECTION-ONLY library. No real cohort drawn at import.
// No dispositions, judgments, canonical ontology objects, or trusted pins are produced.
import { createHash } from 'node:crypto';
export const VERSION='G4-CAL-SAMPLER-v0.3.0';
// Keep the pinned 661-row canonical pool serialization byte-identical.
export const POOL_VERSION='G4-CAL-SAMPLER-v0.2.0';
export const BASE='eeb54bb0cf25a2022e1b7e40d6e15ee2e46f82ad';
export const PINS=Object.freeze({
  raw:'a9cbeb55a2a829a881e228be6d6b22f667baa2c7',
  gate3:'a968f71f567d86242d183412ef5df64aefa73c70',
  gate4:'9dac5f6b6e21ad144d541ccea9088cd875b44163'
});
const fail=s=>{throw Error('G4-CAL: '+s);};
const yes=(p,s)=>{if(!p)fail(s)};
const stable=v=>Array.isArray(v)?v.map(stable):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])])):v;
export const canonicalJson=v=>JSON.stringify(stable(v));
const sha=x=>createHash('sha256').update(x,'utf8').digest('hex');
export const digest=(domain,v)=>sha(domain+'\n'+canonicalJson(v)+'\n');
export const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const uniq=x=>[...new Set(x)];
const sorted=x=>[...x].sort();
const exactHex=s=>typeof s==='string'&&/^[0-9a-f]{64}$/.test(s);
// All names denote SOURCE-FIRST INVESTIGATIONS, never preassigned dispositions.
export const REAL_PROBES=Object.freeze([
 'RECAST_SYNONYM_SPECIFIC','SMALL_CASES_UMBRELLA','MINIMAL_DESCENT_DISTINCTION',
 'CONTRAPOSITIVE_DIRECT_OPAQUE','CRT_THIN_RICH_SCOPE','GRAPH_FAMILY_TRANSFORM',
 'AUXILIARY_UMBRELLA_MOVE','OFFICIAL_BUNDLED','CRUX_SOURCE_DEFINED',
 'GATE3_UNRESOLVED','DIVERGENT_SAME_NAME','EVIDENCE_RICH_THIN_PAIR',
 'SOURCE_SCOPE_CONFLICT','FULL_DOMAIN_ALIAS_SPECIALIZATION','SAME_SCOPE_TRANSITIVITY_FALSIFIER',
 'COMPONENT_OWNER_CLOSURE','DIRECTIONAL_CONTAINMENT_CYCLE',
 'STANDALONE_COMPOUND','SPLIT_COMBO_DUAL','POTENTIAL_EVIDENCE_HOLD'
]);
const certifiedRealRegistries=new WeakSet();
const realProbeDomain='SMMC-G4-CAL-REAL-PROBES-v1';
const eq=(x,y)=>canonicalJson(x)===canonicalJson(y);
// Only frozen observation fields; a name match is a research probe, not a verdict.
const FAMILIES=Object.freeze([
 ['RECAST',/(recast|change your point of view|cross.domain|translation|reformulation)/i],
 ['SMALL_CASES',/(small cases|experiment)/i],
 ['MINIMAL_DESCENT',/(minimal counterexample|descent)/i],
 ['CONTRAPOSITIVE_DIRECT',/(contraposit|\bdirect\b)/i],
 ['CRT',/(chinese remainder)/i],
 ['GRAPH',/(graph theory|graph reformulation|matrix.to.graph)/i],
 ['AUXILIARY',/(auxiliary|construct|normaliz|substitut|make it easier)/i],
 ['CRUX',/(crux move)/i]
]);
function assertFrozen(raw,g3,evidence,expected=661){
 yes(Array.isArray(raw)&&Array.isArray(g3)&&Array.isArray(evidence),'inputs must be arrays');
 yes(raw.length===expected&&g3.length===expected&&evidence.length===expected,'input cardinality mismatch');
 for(const [label,rows,key] of [['raw',raw,'candidateId'],['g3',g3,'candidateId'],['evidence',evidence,'recordId']]) {
  yes(rows.every(r=>r&&typeof r[key]==='string'),label+' missing IDs');
  yes(new Set(rows.map(r=>r[key])).size===rows.length,label+' duplicate IDs');
 }
 const rawIds=new Set(raw.map(r=>r.candidateId));
 yes(g3.every(r=>rawIds.has(r.candidateId)),'foreign Gate3 ID');
 yes(evidence.every(e=>rawIds.has(e.candidateId)),'foreign evidence owner');
 const ev=new Map(evidence.map(e=>[e.recordId,e]));
 yes(raw.every(c=>Array.isArray(c.evidenceRecordIds)&&c.evidenceRecordIds.every(id=>ev.get(id)?.candidateId===c.candidateId)),'owned evidence mismatch');
 yes(g3.every(g=>{const c=raw.find(c=>c.candidateId===g.candidateId);return c.candidateName===g.candidateName&&c.origin===g.origin}), 'Gate3 identity mismatch');
}
export function poolManifest(raw,g3,evidence,{expected=661}={}){
 assertFrozen(raw,g3,evidence,expected);
 const byG3=new Map(g3.map(r=>[r.candidateId,r]));
 const rows=sorted(raw.map(r=>r.candidateId)).map(id=>{
  const r=raw.find(x=>x.candidateId===id);
  return {candidateId:id,raw:r,gate3:byG3.get(id)};
 });
 const ev=sorted(evidence.map(e=>e.recordId)).map(id=>evidence.find(e=>e.recordId===id));
 const payload={version:POOL_VERSION,base:BASE,pins:PINS,rows,evidence:ev};
 const bytes=Buffer.from('SMMC-G4-CAL-POOL-v1\n'+canonicalJson(payload)+'\n','utf8');
 return {version:POOL_VERSION,sha256:createHash('sha256').update(bytes).digest('hex'),byteLength:bytes.length,payload};
}
// Diagnostic labels are strata ONLY. They NEVER create connected-component edges.
export function inventory(raw,g3,evidence,{expected=661}={}) {
 const manifest=poolManifest(raw,g3,evidence,{expected});
 const g3By=new Map(g3.map(x=>[x.candidateId,x]));
 const evBy=new Map(evidence.map(x=>[x.recordId,x]));
 const items=raw.map(c=>({c,g:g3By.get(c.candidateId)}));
 const byName=new Map();
 for(const {c,g} of items){const k=norm(c.candidateName);const a=byName.get(k)||[];a.push({c,g});byName.set(k,a)}
 const parent=new Map(raw.map(r=>[r.candidateId,r.candidateId]));
 const root=id=>{let x=id;while(parent.get(x)!==x)x=parent.get(x);return x};
 const union=(a,b)=>{a=root(a);b=root(b);if(a!==b)parent.set(a<b?b:a,a<b?a:b)};
 // Mandatory co-allocation only exact normalized-name groups, not topic names or G3 bundles.
 const edgeRegister=[];
 for(const [name,group] of byName){if(group.length>1){const ids=sorted(group.map(x=>x.c.candidateId));for(let i=1;i<ids.length;i++){union(ids[0],ids[i]);edgeRegister.push({type:'COALLOC_EXACT_NORMALIZED_NAME',from:ids[0],to:ids[i],name})}}}
 // Frozen explicit candidateRelations could add edges ONLY when strictly typed and registered.
 // All accepted Gate2 candidates currently have null candidateRelations: no inferred additions.
 for(const {c} of items)yes(c.candidateRelations===null||c.candidateRelations===undefined,'unreviewed candidateRelations edge grammar; STOP');
 const byCluster=new Map();for(const {c,g} of items){const k=root(c.candidateId),a=byCluster.get(k)||[];a.push({c,g});byCluster.set(k,a)}
 const clusters=[];
 for(const entries of byCluster.values()){
  const ids=sorted(entries.map(x=>x.c.candidateId));const labels=new Set();
  for(const {c,g} of entries){
   labels.add('ORIGIN:'+c.origin);
   labels.add('REF:'+g.referenceScale);labels.add('BUNDLE:'+g.bundleStructure);
   labels.add('ACTION:'+g.actionShape);
   const owned=c.evidenceRecordIds.map(id=>evBy.get(id));
   if(owned.some(e=>e.recordChannel==='BATTLE'&&e.claimKind==='HISTORICAL_OCCURRENCE'))labels.add('EVIDENCE:OFFICIAL');
   if(!owned.some(e=>e.evidenceBasis==='SOURCE_FACT' || (e.recordChannel==='BATTLE'&&e.claimKind==='HISTORICAL_OCCURRENCE')))labels.add('EVIDENCE:THIN');
   for(const [name,re] of FAMILIES)if(re.test(c.candidateName))labels.add('PROBE:'+name);
   const group=byName.get(norm(c.candidateName));
   if(group.length>1){const sig=x=>canonicalJson([x.g.referenceScale,x.g.bundleStructure,x.g.actionShape,x.g.contextReach,x.g.triggerBoundary,x.g.operationBoundary,x.g.outputBoundary]);if(new Set(group.map(sig)).size>1)labels.add('NAME:DIVERGENT_G3')}
  }
  clusters.push({id:'C:'+ids[0],members:ids,labels:sorted(labels)});
 }
 clusters.sort((a,b)=>a.id.localeCompare(b.id));
 // Evidence links across owners are potential exposure paths, not automatic identity/union.
 const crossing=[];
 for(const e of evidence){for(const ref of e.linkedRecordIds||[]){const other=evBy.get(ref);yes(other,'frozen linked evidence missing');if(other.candidateId!==e.candidateId)crossing.push([e.candidateId,other.candidateId,e.recordId,ref]);}}
 const clusterById=new Map(clusters.flatMap(c=>c.members.map(id=>[id,c.id])));
 const crossEdges=sorted(uniq(crossing.filter(([a,b])=>clusterById.get(a)!==clusterById.get(b)).map(x=>canonicalJson(x)))).map(x=>JSON.parse(x));
 const counts={};for(const x of clusters)for(const t of x.labels)counts[t]=(counts[t]||0)+1;
 const evidenceOwners=Object.fromEntries(raw.map(c=>[c.candidateId,sorted(c.evidenceRecordIds)]));
 return {poolSha256:manifest.sha256,poolBytes:manifest.byteLength,poolCount:raw.length,clusters,edgeRegister,crossEdges,counts,largest:Math.max(...clusters.map(c=>c.members.length)),evidenceOwners};
}
// Fixed selection requirements, no trial-disposition labels. CRT probe only if present.
export function requirements(inv){
 const origin=sorted(Object.keys(inv.counts).filter(x=>x.startsWith('ORIGIN:')));
 const must=['PROBE:RECAST','PROBE:SMALL_CASES','PROBE:MINIMAL_DESCENT','PROBE:CONTRAPOSITIVE_DIRECT','PROBE:GRAPH','PROBE:AUXILIARY','PROBE:CRUX','BUNDLE:BUNDLED_MOVES','REF:UNRESOLVED','NAME:DIVERGENT_G3'];
 if(inv.counts['PROBE:CRT'])must.push('PROBE:CRT');
 const visible=sorted([...origin,...must,'EVIDENCE:THIN','EVIDENCE:OFFICIAL']);
 const hidden=['REF:UNRESOLVED','BUNDLE:BUNDLED_MOVES','EVIDENCE:OFFICIAL','ACTION:LABEL_ONLY'];
 return {visible,hidden,limits:{visibleClusters:48,visibleIds:160,hiddenClusters:16,hiddenIds:64,giantComponentMax:64}};
}
// An external reviewer accepts a source-first register of possible real
// investigations. It cannot attest that a MERGE/SPLIT/HOLD outcome is true.
// The caller-supplied digest is an external trust root, NOT a self-approval.
export function certifyRealProbes(inv,registry,independentApprovedDigest){
 yes(registry&&typeof registry==='object'&&!Array.isArray(registry),'independent real-probe register required; STOP');
 yes(registry.version==='G4-CAL-REAL-PROBES-v1'&&registry.poolSha256===inv.poolSha256,
  'real-probe register references wrong version/pool');
 yes(exactHex(independentApprovedDigest)&&
  digest(realProbeDomain,registry)===independentApprovedDigest,
  'independently approved real-probe register digest absent/incorrect; STOP');
 yes(Array.isArray(registry.probes)&&registry.probes.length===REAL_PROBES.length,
  'real-probe register incomplete; STOP');
 const kinds=registry.probes.map(p=>p.kind);
 yes(eq(sorted(kinds),sorted(REAL_PROBES)),
  'real-probe register missing mandatory section-7 investigation; STOP');
 const memberToCluster=new Map(inv.clusters.flatMap(c=>c.members.map(id=>[id,c.id])));
 const probes=registry.probes.map(p=>{
  yes(typeof p.researchQuestion==='string'&&p.researchQuestion.trim().length>14 &&
   typeof p.sourceFirstReviewRef==='string'&&p.sourceFirstReviewRef.trim().length>7,
   'real-probe investigation lacks source-first question/provenance');
  yes(Array.isArray(p.options)&&p.options.length>0,
   'real-probe investigation has no eligible frozen group: '+p.kind);
  const opts=p.options.map(option=>{
   yes(Array.isArray(option.candidateIds)&&option.candidateIds.length>=1 &&
    new Set(option.candidateIds).size===option.candidateIds.length,
    'invalid real-probe candidate group');
   yes(Array.isArray(option.witnesses)&&option.witnesses.length===option.candidateIds.length,
    'real-probe group must cite each candidate-owned source evidence');
   const ids=sorted(option.candidateIds);
   yes(option.witnesses.every(w=>ids.includes(w.candidateId)&&
      Array.isArray(w.evidenceRecordIds)&&w.evidenceRecordIds.length>0&&
      w.evidenceRecordIds.every(id=>inv.evidenceOwners[w.candidateId]?.includes(id))),
      'real-probe witness missing/foreign evidence: '+p.kind);
   yes(new Set(option.witnesses.map(w=>w.candidateId)).size===ids.length,
    'real-probe witness ownership not bijective');
   return {candidateIds:ids,clusterIds:sorted(new Set(ids.map(id=>memberToCluster.get(id))))};
  });
  return {kind:p.kind,options:opts};
 });
 const certificate=Object.freeze({digest:independentApprovedDigest,probes});
 certifiedRealRegistries.add(certificate);
 return certificate;
}
function prepareRealDraw(inv,req){
 if(inv.poolCount===661)yes(req.realProbeCertification &&
   certifiedRealRegistries.has(req.realProbeCertification) &&
   exactHex(req.realProbeCertification.digest)&&
   Array.isArray(req.realProbeCertification.probes)&&
   req.realProbeCertification.probes.length===REAL_PROBES.length,
   '661-case real cohort requires an independently approved complete source-first investigation register; STOP');
}
function mustNotCross(inv,a,b){return !crosses(inv,a,b).length;}
function selectRegisteredProbes(inv,req,seed,hidden){
 const reg=req.realProbeCertification;
 if(!reg)return [];
 const byId=new Map(inv.clusters.map(c=>[c.id,c]));
 const hiddenIds=new Set(hidden.map(c=>c.id)),selected=new Map();
 for(const probe of [...reg.probes].sort((a,b)=>a.kind.localeCompare(b.kind))){
  const ranked=[];
  for(const opt of probe.options){
   if(opt.clusterIds.some(id=>hiddenIds.has(id)))continue;
   const additions=opt.clusterIds.filter(id=>!selected.has(id)).map(id=>byId.get(id));
   if(additions.some(x=>!x))continue;
   const trial=[...selected.values(),...additions];
   if(trial.length>req.limits.visibleClusters||
      trial.reduce((n,c)=>n+c.members.length,0)>req.limits.visibleIds||
      !mustNotCross(inv,trial,hidden))continue;
   ranked.push({additions,addedCount:additions.length,
    addedIds:additions.reduce((n,c)=>n+c.members.length,0),
    score:randomScore(seed,inv.poolSha256,'REAL:'+probe.kind,opt.clusterIds.join('|'))});
  }
  yes(ranked.length>0,'real investigation source-first coverage infeasible: '+probe.kind+'; STOP');
  ranked.sort((a,b)=>a.addedCount-b.addedCount||a.addedIds-b.addedIds||
    a.score.localeCompare(b.score));
  for(const c of ranked[0].additions)selected.set(c.id,c);
 }
 return [...selected.values()].sort((a,b)=>a.id.localeCompare(b.id));
}
export function validateRealVisibleCoverage(inv,visibleManifest,req){
 prepareRealDraw(inv,req);
 const selected=new Set(visibleManifest.visibleIds);
 const missing=(req.realProbeCertification?.probes||[]).filter(p=>
  !p.options.some(o=>o.candidateIds.every(id=>selected.has(id)))).map(p=>p.kind);
 yes(!missing.length,'real investigation visible coverage missing: '+missing.join(',')+'; STOP');
 return true;
}
export function preflight(inv,req=requirements(inv)){
 yes(inv.poolCount>0 && inv.clusters.length>0,'empty candidate pool');
 const seen=new Set(inv.clusters.flatMap(c=>c.members));
 yes(seen.size===inv.poolCount,'missing/duplicate clustered ID');
 yes(inv.largest<=req.limits.giantComponentMax,'giant co-allocation component; STOP');
 const missing=uniq([...req.visible,...req.hidden]).filter(t=>!inv.counts[t]);
 yes(!missing.length,'missing mandatory pre-observation strata: '+missing.join(','));
 for(const tag of req.visible.filter(x=>req.hidden.includes(x)))yes(inv.counts[tag]>=2,'singleton dual-set stratum: '+tag);
 yes(new Set(req.visible).size===req.visible.length&&new Set(req.hidden).size===req.hidden.length,'duplicate coverage requirements');
 return {population:inv.poolCount,clusterCount:inv.clusters.length,largestComponent:inv.largest,coallocationEdges:inv.edgeRegister.length,crossClusterEvidenceEdges:inv.crossEdges.length,coverageCounts:inv.counts,feasibility:'NECESSARY_ONLY; joint allocation must succeed or STOP'};
}
// Exact finite search for a disjoint visible/hidden coverage WITNESS, without
// seeds or a selected/cohort manifest. Emits counts/boolean only; witness IDs
// are deliberately discarded. If resource cap is reached, FAIL CLOSED.
export function proveJointFeasibility(inv,req=requirements(inv),maxNodes=200000){
 preflight(inv,req);
 const lists=inv.clusters;
 const labels=new Map([...new Set([...req.visible,...req.hidden])].map(t=>[
  t,lists.filter(c=>c.labels.includes(t)).map(c=>c.id)]));
 const byId=new Map(lists.map(c=>[c.id,c]));
 const exposure=new Set(inv.crossEdges.flatMap(([a,b])=>[a,b]));
 let calls=0;
 const dfs=(v,h,vNeed,hNeed,vCount,hCount)=>{
  if(++calls>maxNodes)fail('joint-feasibility solver cap reached: STOP; no seed draw');
  if(!vNeed.length&&!hNeed.length)return true;
  const options=[];
  for(const [side,need] of [['VISIBLE',vNeed],['HIDDEN',hNeed]])for(const tag of need){
   const eligible=labels.get(tag).filter(id=>!v.has(id)&&!h.has(id)&&
    (side==='VISIBLE'?(v.size<req.limits.visibleClusters&&vCount+byId.get(id).members.length<=req.limits.visibleIds):
      (h.size<req.limits.hiddenClusters&&hCount+byId.get(id).members.length<=req.limits.hiddenIds)));
   if(!eligible.length)return false;
   options.push({side,tag,eligible});
  }
  options.sort((a,b)=>a.eligible.length-b.eligible.length || a.side.localeCompare(b.side) || a.tag.localeCompare(b.tag));
  const {side,eligible}=options[0];
  const rank=id=>byId.get(id).labels.filter(x=>(side==='VISIBLE'?vNeed:hNeed).includes(x)).length;
  eligible.sort((a,b)=>rank(b)-rank(a)||a.localeCompare(b));
  for(const id of eligible){
   const c=byId.get(id),V=side==='VISIBLE',v2=new Set(v),h2=new Set(h);
   (V?v2:h2).add(id);
   const vid=new Set([...v2].flatMap(x=>byId.get(x).members));
   const hid=new Set([...h2].flatMap(x=>byId.get(x).members));
   if(inv.crossEdges.some(([a,b])=>(vid.has(a)&&hid.has(b))||(vid.has(b)&&hid.has(a))))continue;
   const next=V?vNeed.filter(t=>!c.labels.includes(t)):hNeed.filter(t=>!c.labels.includes(t));
   if(dfs(v2,h2,V?next:vNeed,V?hNeed:next,vCount+(V?c.members.length:0),hCount+(V?0:c.members.length)))return true;
  }
  return false;
 };
 yes(dfs(new Set(),new Set(),req.visible,req.hidden,0,0), 'no disjoint bounded coverage allocation exists; STOP');
 return {feasible:true,exploredNodes:calls,witnessWithheld:true};
}
const randomScore=(seed,pool,phase,id)=>sha('SMMC-G4-CAL-SELECT-v1\n'+phase+'\n'+pool+'\n'+seed+'\n'+id+'\n');
const enforceSeed=s=>yes(exactHex(s),'seed must be 64 lowercase hex chars from independent 256-bit CSPRNG');
function cover(pool,required,seed,poolHash,phase,limits,forbidden=[],viability=()=>true,initial=[]){
 let left=new Set(required),chosen=[...initial],forbid=new Set(forbidden),usedIds=chosen.reduce((n,c)=>n+c.members.length,0);
 for(const c of chosen)for(const tag of c.labels)left.delete(tag);
 yes(chosen.length<=limits.clusters&&usedIds<=limits.ids,phase+' mandatory investigations exceed caps; STOP');
 while(left.size){
  const opts=pool.filter(c=>!forbid.has(c.id)&&chosen.every(x=>x.id!==c.id)&&c.members.length+usedIds<=limits.ids&&chosen.length<limits.clusters)
   .map(c=>({c,gain:c.labels.filter(x=>left.has(x)).length,score:randomScore(seed,poolHash,phase,c.id)}))
   .filter(x=>x.gain>0 && viability([...chosen,x.c]));
  if(!opts.length)fail(phase+' infeasible at missing strata '+sorted(left).join(','));
  opts.sort((a,b)=>b.gain-a.gain||a.score.localeCompare(b.score)||a.c.id.localeCompare(b.c.id));
  const x=opts[0].c;chosen.push(x);usedIds+=x.members.length;for(const t of x.labels)left.delete(t);
 }
 return chosen;
}
function crosses(inv,visible,hidden){const v=new Set(visible.flatMap(c=>c.members)),h=new Set(hidden.flatMap(c=>c.members));return inv.crossEdges.filter(([a,b])=>(v.has(a)&&h.has(b))||(v.has(b)&&h.has(a)))}
export function allocate(inv,publicSeed,privateSeed,req=requirements(inv)){
 prepareRealDraw(inv,req);preflight(inv,req);enforceSeed(publicSeed);enforceSeed(privateSeed);
 yes(publicSeed!==privateSeed,'public/private seeds must differ');
 const hidden=cover(inv.clusters,req.hidden,privateSeed,inv.poolSha256,'HIDDEN',{clusters:req.limits.hiddenClusters,ids:req.limits.hiddenIds},[],current=>{
  const used=new Set(current.map(x=>x.id));
  return req.visible.every(t=>inv.clusters.some(c=>!used.has(c.id)&&c.labels.includes(t)));
 });
 const hIds=new Set(hidden.map(c=>c.id));
 const initial=selectRegisteredProbes(inv,req,publicSeed,hidden);
 const visible=cover(inv.clusters,req.visible,publicSeed,inv.poolSha256,'VISIBLE',
   {clusters:req.limits.visibleClusters,ids:req.limits.visibleIds},[...hIds],
   current=>mustNotCross(inv,current,hidden),initial);
 yes(!crosses(inv,visible,hidden).length,'hidden/visible cross-cluster evidence leakage; STOP');
 const hashIds=arr=>digest('SMMC-G4-CAL-COHORT-v1',arr.map(x=>({cluster:x.id,ids:x.members})).sort((a,b)=>a.cluster.localeCompare(b.cluster)));
 const visibleManifest={version:VERSION,poolSha256:inv.poolSha256,publicSeed,visibleClusters:visible.map(x=>x.id),visibleIds:sorted(visible.flatMap(x=>x.members)),visibleSha256:hashIds(visible)};
 const hiddenPrivate={version:VERSION,poolSha256:inv.poolSha256,privateSeed,hiddenClusters:hidden.map(x=>x.id),hiddenIds:sorted(hidden.flatMap(x=>x.members)),hiddenSha256:hashIds(hidden)};
 validateRealVisibleCoverage(inv,visibleManifest,req);
 return {visibleManifest,hiddenPrivate};
}
// Nonenumerable public commitment: nonce + private 256-bit seed must remain sealed.
export function sealHidden(hiddenPrivate,nonce){enforceSeed(nonce);return {version:VERSION,poolSha256:hiddenPrivate.poolSha256,commitment:digest('SMMC-G4-CAL-SEALED-CHALLENGE-v1',{nonce,...hiddenPrivate})}}
export function verifyHidden(commitment,hiddenPrivate,nonce,context){
 // Reveal only after an independently pinned visible manifest and rubric freeze.
 if(!context||!context.inventory||!context.visibleManifest||!context.requirements||
    !exactHex(context.trustedVisibleManifestSha256))return false;
 try{
  const {inventory:inv,visibleManifest:visible,requirements:req}=context;
  if(digest('SMMC-G4-CAL-VISIBLE-v1',visible)!==context.trustedVisibleManifestSha256)return false;
  const replay=allocate(inv,visible.publicSeed,hiddenPrivate.privateSeed,req);
  if(!eq(replay.visibleManifest,visible)||!eq(replay.hiddenPrivate,hiddenPrivate))return false;
  if(commitment.version!==VERSION||commitment.poolSha256!==inv.poolSha256||
     commitment.poolSha256!==visible.poolSha256)return false;
  return sealHidden(hiddenPrivate,nonce).commitment===commitment.commitment;
 }catch{return false;}
}