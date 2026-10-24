// Synthetic selection-only adversarial tests + real-pool digest (NO real draw).
import assert from 'node:assert/strict';
import { poolManifest,inventory,requirements,preflight,proveJointFeasibility,allocate,sealHidden,verifyHidden,canonicalJson,digest } from './gate4-calibration-sampler-v1.mjs';
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
assert.ok(verifyHidden(sealed,result.hiddenPrivate,nonce));
assert.equal(sealed.commitment,'106f22ea4c034f4cbfacdcc4232637cf4ce9745546b49e1998a2c0e454e1c3f2','sealed commitment golden SHA');
assert.equal(verifyHidden(sealed,result.hiddenPrivate,'d'.repeat(64)),false);
assert.ok(!JSON.stringify(sealed).includes('RAW-SYN'));
assert.ok(!JSON.stringify(result.visibleManifest).includes(result.hiddenPrivate.privateSeed));
// Deliberately crossed, source-linked hidden/visible case IDs must fail closed.
const exposureTamper=structuredClone(inv);
exposureTamper.crossEdges=[[result.visibleManifest.visibleIds[0],result.hiddenPrivate.hiddenIds[0],
  'SYNTHETIC-VISIBLE-REF','SYNTHETIC-HIDDEN-REF']];
assert.throws(()=>allocate(exposureTamper,seedA,seedB,req),/evidence leakage/);
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
const necessary=preflight(real,realReq);
const joint=proveJointFeasibility(real,realReq);
console.log('G4_CAL_PREFLIGHT',JSON.stringify({clusterCount:real.clusters.length,largest:real.largest,dualSetFeasible:joint.feasible,exploredNodes:joint.exploredNodes,hiddenIDsNotDrawn:true}));
const summary={sha256:real.poolSha256,bytes:real.poolBytes,raw:real.poolCount,clusters:real.clusters.length,largest:real.largest,coallocationEdges:real.edgeRegister.length,crossEvidenceEdges:real.crossEdges.length,originTags:Object.keys(real.counts).filter(x=>x.startsWith('ORIGIN:')).sort(),coverage:requirements(real).visible.map(k=>[k,real.counts[k]||0])};
console.log('G4_CAL_POOL_MANIFEST',JSON.stringify(summary));
console.log('G4_CAL_TESTS_PASS',JSON.stringify({synthetic:true,realDraw:false,realAdjudications:0}));