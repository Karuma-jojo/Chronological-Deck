// Synthetic selection-only adversarial tests + real-pool digest (NO real draw).
import assert from 'node:assert/strict';
import {createHash,generateKeyPairSync,sign} from 'node:crypto';
import { poolManifest,inventory,requirements,preflight,proveJointFeasibility,allocate as allocateProduction,sealHidden,verifyHidden as verifyProductionHidden,certifyRealProbes,validateRealVisibleCoverage as validateProductionCoverage,syntheticOnly,REAL_PROBES,canonicalJson,digest,hiddenPrecommitmentBody,precommitmentSignaturePayload,PRECOMMIT_RECEIPT_DOMAIN } from './gate4-calibration-sampler-v1.mjs';
const {allocate,verifyHidden,validateRealVisibleCoverage}=syntheticOnly;
const seedA='a'.repeat(64),seedB='b'.repeat(64),nonce='c'.repeat(64);
const raw=[],g3=[],evidence=[];
for(let i=0;i<18;i++){
 const id='RAW-SYN-'+String(i).padStart(3,'0'),name=i<3?'Synthetic Repeat':`Synthetic unique ${i}`,eid='E-'+id;
 raw.push({candidateId:id,candidateName:name,origin:i%2?'SOURCE-A':'SOURCE-B',evidenceRecordIds:[eid],candidateRelations:null});
 g3.push({candidateId:id,candidateName:name,origin:i%2?'SOURCE-A':'SOURCE-B',referenceScale:i%3?'DEPLOYABLE':'UNRESOLVED',bundleStructure:i%3?'SINGLE_PRIMARY_MOVE':'BUNDLED_MOVES',actionShape:i%2?'LABEL_ONLY':'EXPLICIT_ACTION',contextReach:'GENERAL',triggerBoundary:'CLEAR',operationBoundary:'CLEAR',outputBoundary:'CLEAR'});
 evidence.push({recordId:eid,candidateId:id,evidenceBasis:i%2?'SOURCE_LEAD':'SOURCE_FACT',recordChannel:i%2?'NONE':'BATTLE',claimKind:i%2?'SOURCE_TERMINOLOGY':'HISTORICAL_OCCURRENCE',linkedRecordIds:[]});
}
const inv=inventory(raw,g3,evidence,{expected:18});
assert.equal(inv.poolCount,18);
assert.equal(inv.poolSha256,'046b73e03f5b262bbf1678c733565f7791d545b67cfaa66dc40ae054da8600ad','synthetic pool golden SHA');
assert.equal(inv.clusters.find(c=>c.members.includes('RAW-SYN-000')).members.length,3,'chain closed');
assert.equal(inv.edgeRegister.length,2);
assert.ok(inv.clusters.length>1,'diagnostic grouping did not collapse pool');
const again=inventory([...raw].reverse(),[...g3].reverse(),[...evidence].reverse(),{expected:18});
assert.equal(inv.poolSha256,again.poolSha256,'canonical manifest independent of record order');
assert.deepEqual(inv.clusters,again.clusters);
const req={visible:['ORIGIN:SOURCE-A','ORIGIN:SOURCE-B','REF:UNRESOLVED'],hidden:['ACTION:LABEL_ONLY','BUNDLE:BUNDLED_MOVES'],limits:{visibleClusters:8,visibleIds:12,hiddenClusters:6,hiddenIds:9,giantComponentMax:5}};
assert.ok(preflight(inv,req));
assert.equal(proveJointFeasibility(inv,req).feasible,true);
const result=allocate(inv,seedA,seedB,req);
assert.deepEqual(result,allocate(again,seedA,seedB,req));
assert.equal(result.visibleManifest.visibleSha256,'63b8ec3fd532a3b2abcf36ee39b842d34a2cf45f17f1f5d326cd88ada9c642ed');
assert.ok(!result.visibleManifest.visibleIds.some(x=>result.hiddenPrivate.hiddenIds.includes(x)));
const sealed=sealHidden(result.hiddenPrivate,nonce);
const {privateKey:syntheticSigningKey,publicKey:syntheticVerifyKey}=generateKeyPairSync('ed25519');
const syntheticSigner='SYNTHETIC-CUSTODIAN-KEY-NOT-FOR-PRODUCTION';
const acceptedProtocolHead='e'.repeat(40);
function signSyntheticReceipt(commitment,draw,requirement){
 const body=hiddenPrecommitmentBody(commitment,draw.visibleManifest,requirement,{
  signerId:syntheticSigner,protocolHeadSha:acceptedProtocolHead,
  issuedAtUtc:'2026-10-24T00:00:00.000Z'
 });
 return {body,signature:sign(null,precommitmentSignaturePayload(body),syntheticSigningKey).toString('base64')};
}
function approvedContext(inventoryX,requirement,draw,commitment=sealHidden(draw.hiddenPrivate,nonce)){
 const receipt=signSyntheticReceipt(commitment,draw,requirement);
 return {inventory:inventoryX,visibleManifest:draw.visibleManifest,requirements:requirement,
  trustedVisibleManifestSha256:digest('SMMC-G4-CAL-VISIBLE-v1',draw.visibleManifest),
  trustedArchivedReceiptSha256:digest(PRECOMMIT_RECEIPT_DOMAIN,receipt),
  trustedProtocolHeadSha:acceptedProtocolHead,
  signedPrecommitmentReceipt:receipt,
  trustedCustodianPublicKeys:{[syntheticSigner]:syntheticVerifyKey.export({type:'spki',format:'pem'})}};
}
const context=approvedContext(inv,req,result);
assert.equal(result.visibleManifest.syntheticOnly,true);
assert.equal(result.hiddenPrivate.syntheticOnly,true);
assert.equal(sealed.syntheticOnly,true);
assert.equal(context.signedPrecommitmentReceipt.body.syntheticOnly,true);
assert.equal(verifyProductionHidden(sealed,result.hiddenPrivate,nonce,context),false,
 'a valid synthetic receipt/replay must never authorize production');
assert.equal(verifyHidden(sealed,result.hiddenPrivate,nonce),false,'old contextless hash verification must fail');
assert.ok(verifyHidden(sealed,result.hiddenPrivate,nonce,context));
const fabricatedHidden=structuredClone(result.hiddenPrivate);
fabricatedHidden.hiddenIds=['RAW-SYN-NOT-IN-THE-POOL'];
fabricatedHidden.hiddenClusters=['C:RAW-SYN-NOT-IN-THE-POOL'];
const forgedCommitment=sealHidden(fabricatedHidden,nonce);
assert.equal(verifyHidden(forgedCommitment,fabricatedHidden,nonce,context),false,
 'properly sealed but mathematically impossible hidden challenge must FAIL');
const staleHash=structuredClone(result.hiddenPrivate);staleHash.hiddenSha256='0'.repeat(64);
assert.equal(verifyHidden(sealHidden(staleHash,nonce),staleHash,nonce,context),false);
const fakeVisible=structuredClone(result.visibleManifest);fakeVisible.visibleIds=['RAW-UNKNOWN'];
assert.equal(verifyHidden(sealed,result.hiddenPrivate,nonce,{...context,visibleManifest:fakeVisible}),false);
const wrongSeed={...result.visibleManifest,publicSeed:'f'.repeat(64)};
assert.equal(verifyHidden(sealed,result.hiddenPrivate,nonce,{...context,visibleManifest:wrongSeed}),false);
// Independently compute salted commitment bytes after the protocol version bump.
const independentSealed=createHash('sha256').update('SMMC-G4-CAL-SEALED-CHALLENGE-v1\n'+
 canonicalJson({nonce,...result.hiddenPrivate})+'\n','utf8').digest('hex');
assert.equal(sealed.commitment,independentSealed,'independent commitment byte contract');
assert.equal(verifyHidden(sealed,result.hiddenPrivate,nonce,{
 ...context,trustedArchivedReceiptSha256:'0'.repeat(64)}),false,'unarchived receipt must fail');
assert.equal(verifyHidden(sealed,result.hiddenPrivate,nonce,{
 ...context,trustedProtocolHeadSha:'f'.repeat(40)}),false,'wrong exact protocol head must fail');
const changedSignature=structuredClone(context.signedPrecommitmentReceipt);
changedSignature.signature='A'+changedSignature.signature.slice(1);
assert.equal(verifyHidden(sealed,result.hiddenPrivate,nonce,{
 ...context,signedPrecommitmentReceipt:changedSignature}),false,'signature/receipt tamper must fail');
const rogueKeys={...context.trustedCustodianPublicKeys,[syntheticSigner]:
 generateKeyPairSync('ed25519').publicKey.export({type:'spki',format:'pem'})};
assert.equal(verifyHidden(sealed,result.hiddenPrivate,nonce,{
 ...context,trustedCustodianPublicKeys:rogueKeys}),false,'unauthorized verification key must fail');
assert.equal(verifyHidden(sealed,result.hiddenPrivate,'d'.repeat(64),context),false);
assert.ok(!JSON.stringify(sealed).includes('RAW-SYN'));
assert.ok(!JSON.stringify(result.visibleManifest).includes(result.hiddenPrivate.privateSeed));
// Only a source-first reviewer may approve a REAL eligibility register.
// Synthetic probes below check the protocol, not genuine mathematical outcomes.
const designated=result.visibleManifest.visibleIds[0];
const syntheticRegister={version:'G4-CAL-REAL-PROBES-v1',poolSha256:inv.poolSha256,
 probes:REAL_PROBES.map(kind=>({kind,
 researchQuestion:'Which source-bounded competing interpretations need adversarial comparison? '+kind,
 sourceFirstReviewRef:'SYNTHETIC-REVIEW-NOT-PRODUCTION',
 options:[{candidateIds:[designated],
  witnesses:[{candidateId:designated,evidenceRecordIds:['E-'+designated]}]}]}))};
const certDigest=digest('SMMC-G4-CAL-REAL-PROBES-v1',syntheticRegister);
const cert=certifyRealProbes(inv,syntheticRegister,certDigest);
assert.equal(cert.probes.length,REAL_PROBES.length);
const certifiedBytes=canonicalJson(cert);
assert.ok(Object.isFrozen(cert.probes[0].options[0].candidateIds));
assert.ok(Object.isFrozen(cert.probes[0].options[0].clusterIds));
assert.throws(()=>{cert.probes[0].options[0].candidateIds[0]='RAW-SYN-017';},TypeError,
 'certified option must be deeply immutable');
assert.throws(()=>{cert.probes[0].options[0].clusterIds.push('C:RAW-SYN-017');},TypeError,
 'certified cluster option must be deeply immutable');
const sourceOriginal=syntheticRegister.probes[0].options[0].candidateIds[0];
syntheticRegister.probes[0].options[0].candidateIds[0]='RAW-SYN-017';
syntheticRegister.probes[0].options[0].witnesses[0].candidateId='RAW-SYN-017';
assert.equal(canonicalJson(cert),certifiedBytes,'source mutations may not affect an approved certificate');
syntheticRegister.probes[0].options[0].candidateIds[0]=sourceOriginal;
syntheticRegister.probes[0].options[0].witnesses[0].candidateId=sourceOriginal;
const forgedCert=structuredClone(cert);
assert.throws(()=>allocate(inv,seedA,seedB,{...req,realProbeCertification:forgedCert}),
 /certified real-probe option content/,'a matching-looking copy without approved provenance must fail');
const certifiedReq={...req,realProbeCertification:cert};
const certifiedResult=allocate(inv,seedA,seedB,certifiedReq);
assert.ok(validateRealVisibleCoverage(inv,certifiedResult.visibleManifest,certifiedReq));
const certifiedContext=approvedContext(inv,certifiedReq,certifiedResult);
assert.ok(verifyHidden(sealHidden(certifiedResult.hiddenPrivate,nonce),
 certifiedResult.hiddenPrivate,nonce,certifiedContext));
const alteredInv=structuredClone(inv);
alteredInv.clusters[0].members=[...alteredInv.clusters[0].members,'INJECTED-ID'];
assert.throws(()=>allocate(alteredInv,seedA,seedB,certifiedReq),
 /certified real-probe option content or inventory changed/,'inventory mutated since certification must fail');
// Full-inventory acceptance boundary: these mutations keep the original
// members, ownership and pool digest intact. Each must fail before selection.
const inventoryTamperCases=[
 ['sampling label',tampered=>{tampered.clusters[0].labels[0]='INJECTED:LABEL';}],
 ['coverage count',tampered=>{const key=Object.keys(tampered.counts)[0];tampered.counts[key]++;}],
 ['cross-owner exposure edge',tampered=>{
   tampered.crossEdges.push([certifiedResult.visibleManifest.visibleIds[0],
    certifiedResult.hiddenPrivate.hiddenIds[0],'SYNTH-OWNER-A','SYNTH-OWNER-B']);
 }],
 ['cluster diagnostic register',tampered=>{tampered.edgeRegister.push({
  type:'FORGED_COALLOC',from:'RAW-SYN-003',to:'RAW-SYN-004',name:'forged'
 });}],
 ['inventory scalar',tampered=>{tampered.poolBytes++;}]
];
for(const [attack,mutate] of inventoryTamperCases){
 const altered=structuredClone(inv);
 mutate(altered);
 assert.equal(altered.poolSha256,inv.poolSha256,attack+' retains pool SHA');
 assert.deepEqual(altered.clusters.map(c=>c.members),inv.clusters.map(c=>c.members),
  attack+' retains all cluster memberships');
 assert.deepEqual(altered.evidenceOwners,inv.evidenceOwners,
  attack+' retains candidate-owned evidence');
 assert.throws(()=>allocate(altered,seedA,seedB,certifiedReq),
  /certified real-probe option content or inventory changed/,
  attack+' must be rejected by allocation at certification boundary');
 assert.throws(()=>validateRealVisibleCoverage(altered,certifiedResult.visibleManifest,certifiedReq),
  /certified real-probe option content or inventory changed/,
  attack+' must be rejected by visible-coverage validation');
}
assert.deepEqual(allocate(inv,seedA,seedB,certifiedReq),certifiedResult,
 'unchanged approved inventory continues to allocate deterministically');
assert.equal(validateRealVisibleCoverage(inv,certifiedResult.visibleManifest,certifiedReq),true,
 'unchanged approved inventory still validates');
const omitted=structuredClone(certifiedResult.visibleManifest);
omitted.visibleIds=omitted.visibleIds.filter(id=>id!==designated);
assert.throws(()=>validateRealVisibleCoverage(inv,omitted,certifiedReq),/real investigation visible coverage missing/);
const incomplete=structuredClone(syntheticRegister);incomplete.probes.pop();
assert.throws(()=>certifyRealProbes(inv,incomplete,
 digest('SMMC-G4-CAL-REAL-PROBES-v1',incomplete)),/register incomplete/);
assert.throws(()=>certifyRealProbes(inv,syntheticRegister,'0'.repeat(64)),/digest absent\/incorrect/);
const borrowed=structuredClone(syntheticRegister);
borrowed.probes[0].options[0].witnesses[0].evidenceRecordIds=['UNKNOWN-EVIDENCE'];
assert.throws(()=>certifyRealProbes(inv,borrowed,
 digest('SMMC-G4-CAL-REAL-PROBES-v1',borrowed)),/missing\/foreign evidence/);
assert.throws(()=>allocateProduction({...inv,poolCount:661},seedA,seedB,req),
 /frozen 661-case production inventory/,'caller-declared size cannot establish a production context');
// Historical precommitment substitution: two valid hidden draws, one identical visible
// manifest, and even TWO valid custodian signatures. Only the originally archived
// receipt is authorized; replay/hash/signature validity alone must not suffice.
const tiny={
 poolCount:3,poolSha256:'1'.repeat(64),largest:1,edgeRegister:[],crossEdges:[],
 clusters:[
  {id:'C:V',members:['V'],labels:['PROBE:VISIBLE']},
  {id:'C:H1',members:['H1'],labels:['PROBE:HIDDEN']},
  {id:'C:H2',members:['H2'],labels:['PROBE:HIDDEN']}
 ],
 counts:{'PROBE:VISIBLE':1,'PROBE:HIDDEN':2}
};
const tinyReq={visible:['PROBE:VISIBLE'],hidden:['PROBE:HIDDEN'],
 limits:{visibleClusters:1,visibleIds:1,hiddenClusters:1,hiddenIds:1,giantComponentMax:2}};
const tinyA=allocate(tiny,seedA,seedB,tinyReq);
let tinyB;
for(const c of '0123456789abcdef'){
 const tryDraw=allocate(tiny,seedA,c.repeat(64),tinyReq);
 if(tryDraw.hiddenPrivate.hiddenIds[0]!==tinyA.hiddenPrivate.hiddenIds[0]){tinyB=tryDraw;break;}
}
assert.ok(tinyB,'synthetic fixture must exhibit alternate valid hidden selection');
assert.deepEqual(tinyB.visibleManifest,tinyA.visibleManifest,'visible manifest is the same across commitments');
const originalTinyCommit=sealHidden(tinyA.hiddenPrivate,nonce);
const alternateTinyCommit=sealHidden(tinyB.hiddenPrivate,nonce);
const trustedTinyContext=approvedContext(tiny,tinyReq,tinyA,originalTinyCommit);
assert.ok(verifyHidden(originalTinyCommit,tinyA.hiddenPrivate,nonce,trustedTinyContext));
const lateSigned=signSyntheticReceipt(alternateTinyCommit,tinyB,tinyReq);
assert.equal(verifyHidden(alternateTinyCommit,tinyB.hiddenPrivate,nonce,{
 ...trustedTinyContext,signedPrecommitmentReceipt:lateSigned}),false,
 'a later validly signed commitment cannot replace the historically archived receipt');
assert.equal(verifyHidden(alternateTinyCommit,tinyB.hiddenPrivate,nonce,trustedTinyContext),false,
 'a different valid challenge cannot borrow the original signed commitment');
assert.equal(verifyHidden(alternateTinyCommit,tinyB.hiddenPrivate,nonce,{
 ...trustedTinyContext,
 signedPrecommitmentReceipt:lateSigned,
 trustedArchivedReceiptSha256:digest(PRECOMMIT_RECEIPT_DOMAIN,lateSigned)}),true,
 'replacement is valid only when the OUTSIDE verifier changes its pinned trust anchor; custody must forbid this');
// Greedy can die even when an exact joint witness exists. Never reseed or
// silently replace a seeded draw with the feasibility oracle's witness.
const greedyTrap={
 poolCount:5,poolSha256:'2'.repeat(64),largest:1,edgeRegister:[],crossEdges:[],
 clusters:[
  {id:'C:A',members:['A'],labels:['H1','H2','V1','V2']},
  {id:'C:B',members:['B'],labels:['H1']},
  {id:'C:C',members:['C'],labels:['H2']},
  {id:'C:D',members:['D'],labels:['V1']},
  {id:'C:E',members:['E'],labels:['V2']}
 ],
 counts:{H1:2,H2:2,V1:2,V2:2}
};
const greedyReq={visible:['V1','V2'],hidden:['H1','H2'],
 limits:{visibleClusters:1,visibleIds:1,hiddenClusters:2,hiddenIds:2,giantComponentMax:2}};
assert.equal(proveJointFeasibility(greedyTrap,greedyReq).feasible,true,
 'non-seeded exact feasibility exists');
assert.throws(()=>allocate(greedyTrap,seedA,seedB,greedyReq),/VISIBLE infeasible/,
 'greedy hidden selection must STOP rather than secretly backtrack or reseed');
// Deliberately crossed, source-linked hidden/visible case IDs must fail closed.
const exposureTamper=structuredClone(inv);
exposureTamper.crossEdges=[[result.visibleManifest.visibleIds[0],result.hiddenPrivate.hiddenIds[0],
  'SYNTHETIC-VISIBLE-REF','SYNTHETIC-HIDDEN-REF']];
const exposureSafe=allocate(exposureTamper,seedA,seedB,req);
assert.ok(!exposureSafe.visibleManifest.visibleIds.includes(exposureTamper.crossEdges[0][0]) ||
 !exposureSafe.hiddenPrivate.hiddenIds.includes(exposureTamper.crossEdges[0][1]),
 'source-linked candidate ownership may never cross visible-hidden boundary');
// A stratum with exactly one supplier cannot serve both sealed and visible sets.
const singleton=structuredClone(inv);
let found=false;for(const c of singleton.clusters){if(c.labels.includes('REF:UNRESOLVED')){if(found)c.labels=c.labels.filter(x=>x!=='REF:UNRESOLVED');else found=true;}}
singleton.counts['REF:UNRESOLVED']=1;
assert.throws(()=>preflight(singleton,{...req,visible:['REF:UNRESOLVED'],hidden:['REF:UNRESOLVED']}),/singleton dual-set stratum/);

assert.throws(()=>allocate(inv,'weak',seedB,req),/seed must/);
assert.throws(()=>allocate(inv,seedA,seedA,req),/seeds must differ/);
assert.throws(()=>preflight(inv,{...req,visible:['PROBE:NONEXISTENT']}),/missing mandatory/);
assert.throws(()=>preflight(inv,{...req,visible:['REF:UNRESOLVED'],hidden:['REF:UNRESOLVED'],limits:{...req.limits,giantComponentMax:2}}),/giant/);
const duplicate=structuredClone(raw);duplicate[2].candidateId=duplicate[1].candidateId;
assert.throws(()=>poolManifest(duplicate,g3,evidence,{expected:18}),/duplicate/);
const contaminated=structuredClone(evidence);contaminated[0].linkedRecordIds=['E-RAW-SYN-005'];
const inv2=inventory(raw,g3,contaminated,{expected:18});assert.ok(inv2.crossEdges.length>=1);
// Source/diagnostic metadata never supplies a fabricated disposition or final ontology.
assert.ok(!Object.keys(result.visibleManifest).some(k=>/disposition|canonical|judg/i.test(k)));
// Actual frozen 661-case manifest creation and preflight: no public/private seed, NO draw.
import { ARSENAL_GATE2_RAW_CANDIDATES as realRaw, ARSENAL_GATE2_RAW_EVIDENCE as realEvidence } from '../course/smmc/arsenal/candidates-v0.mjs';
import { ARSENAL_GATE3_GRANULARITY_RECORDS as realG3 } from '../course/smmc/arsenal/granularity-ledger-v0.mjs';
const real=inventory(realRaw,realG3,realEvidence);
assert.equal(real.poolSha256,'d404cf6b3b4810df7843881a9ffb27ea106753db9e753966ef0a6000a671ca5a','frozen canonical pool drift');
assert.equal(real.poolBytes,1739956,'frozen canonical pool byte count drift');
const realReq=requirements(real);
// G4-CR195-01/02: guard checks only. No real register, seed selection or draw.
// These calls must fail BEFORE either supplied synthetic test seed can be used.
assert.throws(()=>allocateProduction(real,seedA,seedB,realReq),
 /independently approved complete source-first investigation register/);
assert.throws(()=>validateProductionCoverage(real,{visibleIds:[]},realReq),
 /independently approved complete source-first investigation register/);
const requirementsAttacks=[
 ['removed visible tag',q=>{q.visible.pop();}],
 ['empty visible requirements',q=>{q.visible=[];}],
 ['empty hidden requirements',q=>{q.hidden=[];}],
 ['relaxed visible cluster cap',q=>{q.limits.visibleClusters++;}],
 ['relaxed visible ID cap',q=>{q.limits.visibleIds++;}],
 ['relaxed hidden cluster cap',q=>{q.limits.hiddenClusters++;}],
 ['relaxed hidden ID cap',q=>{q.limits.hiddenIds++;}],
 ['relaxed giant component cap',q=>{q.limits.giantComponentMax++;}]
];
for(const [attack,mutate] of requirementsAttacks){
 const changed=structuredClone(realReq);mutate(changed);
 // Retain the same certificate object: erasing requirements cannot bypass its use.
 changed.realProbeCertification=cert;
 assert.throws(()=>allocateProduction(real,seedA,seedB,changed),
  /fixed production requirements or caps changed/,attack+' must fail before allocation');
 assert.throws(()=>validateProductionCoverage(real,{visibleIds:[]},changed),
  /fixed production requirements or caps changed/,attack+' must fail before validation');
}
const downgraded=structuredClone(real),removedCluster=downgraded.clusters.pop();
downgraded.poolCount-=removedCluster.members.length;downgraded.counts={};
for(const c of downgraded.clusters)for(const t of c.labels)
 downgraded.counts[t]=(downgraded.counts[t]||0)+1;
for(const id of removedCluster.members)delete downgraded.evidenceOwners[id];
assert.equal(downgraded.poolSha256,real.poolSha256,'retain the real digest in the attack');
assert.equal(downgraded.poolCount,660);
assert.throws(()=>allocateProduction(downgraded,seedA,seedB,requirements(downgraded)),
 /frozen 661-case production inventory/,'count downgrade must not opt out of certification');
assert.throws(()=>validateProductionCoverage(downgraded,{visibleIds:[]},requirements(downgraded)),
 /frozen 661-case production inventory/,'empty real coverage must not pass after count downgrade');
assert.throws(()=>syntheticOnly.allocate(downgraded,seedA,seedB,requirements(downgraded)),
 /production pool cannot use SYNTHETIC_ONLY/,'real pool cannot escape through the test API');
assert.throws(()=>syntheticOnly.allocate(real,seedA,seedB,realReq),
 /production pool cannot use SYNTHETIC_ONLY/);
const forgedProductionVisible=structuredClone(result.visibleManifest);
const forgedProductionHidden=structuredClone(result.hiddenPrivate);
delete forgedProductionVisible.syntheticOnly;delete forgedProductionHidden.syntheticOnly;
const forgedProductionCommitment=sealHidden(forgedProductionHidden,nonce);
const forgedProductionContext=approvedContext(inv,req,
 {visibleManifest:forgedProductionVisible,hiddenPrivate:forgedProductionHidden},forgedProductionCommitment);
assert.equal(verifyProductionHidden(forgedProductionCommitment,forgedProductionHidden,nonce,
 forgedProductionContext),false,'stripping test markers and signing again cannot authorize production');
const necessary=preflight(real,realReq);
const joint=proveJointFeasibility(real,realReq);
console.log('G4_CAL_PREFLIGHT',JSON.stringify({clusterCount:real.clusters.length,largest:real.largest,dualSetFeasible:joint.feasible,exploredNodes:joint.exploredNodes,hiddenIDsNotDrawn:true}));
const summary={sha256:real.poolSha256,bytes:real.poolBytes,raw:real.poolCount,clusters:real.clusters.length,largest:real.largest,coallocationEdges:real.edgeRegister.length,crossEvidenceEdges:real.crossEdges.length,originTags:Object.keys(real.counts).filter(x=>x.startsWith('ORIGIN:')).sort(),coverage:requirements(real).visible.map(k=>[k,real.counts[k]||0])};
console.log('G4_CAL_POOL_MANIFEST',JSON.stringify(summary));
console.log('G4_CAL_TESTS_PASS',JSON.stringify({synthetic:true,realDraw:false,realAdjudications:0}));
