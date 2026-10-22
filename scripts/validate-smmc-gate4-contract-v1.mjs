// Gate-4 schema review suite. Every mathematical example is a SYNTHETIC
// validator fixture — never a disposition on a real SMMC raw candidate.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { ARSENAL_GATE2_RAW_CANDIDATES as raw, ARSENAL_GATE2_RAW_EVIDENCE as evidence } from "../course/smmc/arsenal/candidates-v0.mjs";
import { ARSENAL_GATE3_GRANULARITY_RECORDS as g3 } from "../course/smmc/arsenal/granularity-ledger-v0.mjs";
import { ARSENAL_GATE4_PENDING_BUNDLE as pending } from "../course/smmc/arsenal/tribunal-ledger-v0.mjs";
import { validateGate4Bundle, createGate4PendingBundle, gate3Ref } from "../course/smmc/arsenal/tribunal-contract-v1.mjs";
const sha = b => createHash("sha256").update(b).digest("hex");
const checkBlob=(path,expected)=>{
  const bytes=readFileSync(path);
  const actual=createHash("sha1").update("blob "+bytes.length+"\0").update(bytes).digest("hex");
  assert.equal(actual,expected,"frozen source changed: "+path);
};
const pinned={
  "docs/smmc/ARSENAL-GATE0-CORPUS-PROTECTION.md":"e6d6a1f213a32775452ba108430a9ce4924a0f96",
  "course/smmc/runtime/exposure.mjs":"a4eb2375d76506f1e5931f3889ab65de458db484",
  "docs/smmc/ARSENAL-GATE1-RESEARCH-CONTRACT.md":"865826360b78b940e217a11e0a91fd7aee73a2d8",
  "docs/smmc/ARSENAL-GATE3-GRANULARITY-CONTRACT.md":"57f91b25f56ba18b49a71f641888b0f73de1bbd1",
  "course/smmc/arsenal/granularity-ledger-v0.mjs":"a968f71f567d86242d183412ef5df64aefa73c70",
  "course/smmc/arsenal/granularity-contract-v1.mjs":"d638ca43297f22c27c6ed2f81da941d4aeeca1b7",
  "course/smmc/arsenal/granularity-mass-pass-v1.mjs":"78a0880b41b29a74c043092b4e0bf4178d3b78aa",
  "course/smmc/arsenal/granularity-audit-v1.mjs":"1d7c6bfb73df23da5ced6c3fea2ea3d06b34d397",
  "course/smmc/arsenal/granularity-official-adjudication-v7d.mjs":"3a99e591ca33884d18bb0d94d34a5ae2d7b02792",
  "docs/smmc/ARSENAL-GATE4-CANDIDATE-TRIBUNAL-CONTRACT.md":"16758ce2a4a7780b1c6a57af3594729831e30232"
};
for(const [p,h] of Object.entries(pinned))checkBlob(p,h);
assert.equal(sha(readFileSync("docs/smmc/ARSENAL-GATE4-CANDIDATE-TRIBUNAL-CONTRACT.md")),
 "747625cdd58fdd197024d8b3ae52a5463dc603b3e616fb0d554de1abe63d74c7",
 "reviewed contract SHA-256 changed");
assert.equal(raw.length,661);
assert.equal(evidence.length,661);
assert.equal(g3.length,661);
assert.equal(new Set(raw.map(x=>x.candidateId)).size,661);
assert.equal(new Set(g3.map(x=>x.candidateId)).size,661);
assert.equal(new Set(pending.cases.map(x=>x.candidateId)).size,661);
assert.deepEqual(pending,createGate4PendingBundle(raw,g3),"scaffold is not deterministic");
const summary=validateGate4Bundle(pending,raw,evidence,g3);
assert.deepEqual([summary.cases,summary.pending,summary.completed,summary.relations],[661,661,0,0]);
const cp=()=>structuredClone(pending);
let negativeCount=0;
function reject(label,mutator,pattern){
 const b=cp();
 mutator(b);
 assert.throws(()=>validateGate4Bundle(b,raw,evidence,g3),pattern,"FAIL-CLOSED fixture: "+label);
 negativeCount++;
}
reject("unknown schema key",b=>{b.cases[0].ontologyType="Strategy";},/unexpected\/missing keys/);
reject("missing raw case",b=>{b.cases.pop();},/661 cases required/);
reject("extra raw case",b=>{b.cases.push(structuredClone(b.cases[0]));},/661 cases required/);
reject("duplicate raw case",b=>{b.cases[1]=structuredClone(b.cases[0]);},/duplicate raw\/G3\/case ID/);
reject("unknown raw ID",b=>{b.cases[0].candidateId="RAW-NOT-IN-ORE";},/unknown raw\/G3\/case ID/);
reject("raw name tamper",b=>{b.cases[0].rawNameSnapshot+=" updated";},/frozen raw identity mismatch/);
reject("borrowed evidence ID",b=>{b.cases[0].rawEvidenceRecordIds=[...b.cases[1].rawEvidenceRecordIds];},/frozen owned evidence changed/);
reject("G3 digest tamper",b=>{b.cases[0].frozenGate3SnapshotRef="G3-SHA256-0000";},/G3 digest mismatch/);
reject("pending silently accepted",b=>{b.cases[0].proposedPrimaryDisposition="ACCEPT";},/PENDING must remain unadjudicated/);
reject("null handoff primary",b=>{b.cases[0].workStatus="REVIEWED_FOR_HANDOFF";},/proposed\/reviewed decision lacks review evidence/);
reject("pending forged later gate owner",b=>{b.cases[0].handoffOwners=["Gate 5"];},/PENDING must remain unadjudicated/);
reject("extra final alias table",b=>{b.finalAliases=[];},/unexpected\/missing keys/);
reject("no candidate ID disappearance after reject",b=>{b.cases[0].candidateId=b.cases[1].candidateId;},/duplicate raw\/G3\/case ID/);
reject("bogus supplemental hash",b=>{b.supplementalEvidence.push({
 recordId:"G4-EVID-bogus",candidateId:b.cases[0].candidateId,candidateName:b.cases[0].rawNameSnapshot,
 evidenceBasis:"SOURCE_FACT",recordChannel:"NONE",claimKind:"SOURCE_TERMINOLOGY",
 verificationStatus:"VERIFIED",ontologyType:null,sourceId:"UNREGISTERED",
 sourceArtifactSha256:"invalid",sourceLocator:{kind:"PDF",pdfPage:1},claim:"FAKE",doesNotEstablish:"Nothing"
});},/sourceId is not present|does not match/);
const battle=evidence.find(x=>x.recordChannel==="BATTLE"&&x.claimKind==="HISTORICAL_OCCURRENCE");
assert.ok(battle,"frozen Battle fixture source missing");
reject("altered synthetic official Battle claim",b=>{b.supplementalEvidence.push({
 ...structuredClone(battle),recordId:"G4-EVID-altered-battle",claim:"ALTERED OFFICIAL CLAIM"
});},/cannot fabricate or replace frozen official Battle claims/);
reject("illegal status history jump",b=>{b.statusHistory.push({
 eventId:"G4-EVENT-illegal",candidateId:b.cases[0].candidateId,fromStatus:"PENDING",
 toStatus:"REVIEWED_FOR_HANDOFF",evidenceRecordIds:[],reviewer:"Synthetic test",
 acceptedVersion:"604c3e9715024f3248e493eb2d2d73254d4ef318",reopenedFromVersion:null
});},/illegal status transition/);
assert.throws(()=>validateGate4Bundle(pending,raw,evidence,g3,{graduation:true}),/full graduation requires 661 completed treatments/);
negativeCount++;
// The literal all-661-holds scenario is structurally valid as work in progress,
 // but explicitly invalid as a graduated Tribunal.
const held=cp();
for(let i=0;i<held.cases.length;i++){
 const c=held.cases[i];
 c.workStatus="EVIDENCE_HOLD";
 c.proposedPrimaryDisposition=null;
 c.holdReason="THIN_CANDIDATE_EVIDENCE";
 c.scopeClassification="GATE4_OWNED";
 c.nextEvidenceOrAction="Inspect registered passage and test candidate identity";
 held.statusHistory.push({
   eventId:"G4-EVENT-held-"+i,candidateId:c.candidateId,
   fromStatus:"PENDING",toStatus:"EVIDENCE_HOLD",evidenceRecordIds:[],
   reviewer:"Synthetic fixture only",acceptedVersion:"604c3e9715024f3248e493eb2d2d73254d4ef318",
   reopenedFromVersion:null
 });
}
assert.equal(validateGate4Bundle(held,raw,evidence,g3).held,661);
assert.throws(()=>validateGate4Bundle(held,raw,evidence,g3,{graduation:true}),
 /full graduation requires 661 completed treatments/);
negativeCount++;
const falseHandoff=structuredClone(held);
falseHandoff.cases[0].holdReason="LATER_GATE_CANONICAL_CHOICE";
assert.throws(()=>validateGate4Bundle(falseHandoff,raw,evidence,g3),
 /cannot evade hold via later gate/);
negativeCount++;
// A signed review/waiver is never a substitute for 661 substantive verdicts.
reject("661 individually signed scope certificates cannot graduate",b=>{
 const version="604c3e9715024f3248e493eb2d2d73254d4ef318";
 b.scopeReviews=b.cases.map((c,i)=>({
 scopeReviewRecordId:"G4-SCOPE-synthetic-"+i,candidateIds:[c.candidateId],
 question:"Synthetic ownership only",scopeClassification:"GATE4_OWNED",
 reviewer:"Synthetic reviewer",decision:"Record incomplete treatment",
 acceptedVersion:version,permittedProceduralEffect:"CLASSIFY_ONLY",
 successorObligation:"Complete the actual Gate-4 treatment before graduation"
 }));
 // A direct graduation attempt is below; here, waiver records alone must not confer progress.
 b.cases[0].scopeReviewRecordId="G4-SCOPE-synthetic-0";
},/PENDING must remain unadjudicated/);
const w=cp();w.scopeReviews=w.cases.map((c,i)=>({
 scopeReviewRecordId:"G4-SCOPE-signed-"+i,candidateIds:[c.candidateId],
 question:"Synthetic ownership only",scopeClassification:"GATE4_OWNED",
 reviewer:"Synthetic independent reviewer",decision:"No substantive treatment",
 acceptedVersion:"604c3e9715024f3248e493eb2d2d73254d4ef318",
 permittedProceduralEffect:"CLASSIFY_ONLY",successorObligation:"Provide Gate-4 treatment"
}));
assert.throws(()=>validateGate4Bundle(w,raw,evidence,g3,{graduation:true}),
 /full graduation requires 661 completed treatments/);
negativeCount++;

// Synthetic relationships use actual raw IDs only as test anchors, NOT as candidate
// verdicts. All claims are explicitly fabricated and never exported as corpus evidence.
const sourceFacts=evidence.filter(e=>e.evidenceBasis==="SOURCE_FACT"&&e.candidateId);
assert.ok(sourceFacts.length>=2);
const [aE,bE]=sourceFacts.slice(0,2);
const ids=[aE.candidateId,bE.candidateId].sort();
const ex=new Map(sourceFacts.map(x=>[x.candidateId,x]));
const reviewed=cp();
const eventVersion="604c3e9715024f3248e493eb2d2d73254d4ef318";
for(let i=0;i<ids.length;i++){
 const id=ids[i],c=reviewed.cases.find(x=>x.candidateId===id),own=ex.get(id),
 other=ids[1-i],otherE=ex.get(other);
 const synthId="G4-EVID-synthetic-"+i;
 reviewed.supplementalEvidence.push({
   recordId:synthId,candidateId:id,candidateName:c.rawNameSnapshot,
   evidenceBasis:"PROJECT_SYNTHESIS",recordChannel:"NONE",
   claimKind:"RELATION_PROPOSAL",verificationStatus:"SYNTHESIS_PROPOSAL",
   ontologyType:null,linkedRecordIds:[own.recordId],
   claim:"SYNTHETIC hypothetical equivalence for negative test only",
   doesNotEstablish:"No true equivalence, learner skill or official occurrence"
 });
 Object.assign(c,{
   workStatus:"PROPOSED",proposedPrimaryDisposition:"MERGE",
   scopeClassification:"GATE4_OWNED",candidateOwnedFacts:[{evidenceRecordId:own.recordId,note:"Synthetic owned fact"}],
   comparisonCandidateIds:[other],comparisonEvidenceRecordIds:[otherE.recordId],
   synthesisRecordIds:[synthId],hypothesis:"SYNTHETIC equivalence not accepted",
   contraryHypotheses:["Could be different operations"],
   nonEquivalenceOrCountertest:"SYNTHETIC countertest in both domains",
   relationHypothesisIds:["G4-HYP-synthetic-equivalence"],
   rationale:"SYNTHETIC fixture only, not candidate adjudication"
 });
 reviewed.statusHistory.push({
   eventId:"G4-EVENT-synthetic-"+i,candidateId:id,fromStatus:"PENDING",
   toStatus:"PROPOSED",evidenceRecordIds:[own.recordId],reviewer:"Test harness",
   acceptedVersion:eventVersion,reopenedFromVersion:null
 });
}
reviewed.relationHypotheses.push({
 hypothesisId:"G4-HYP-synthetic-equivalence",relationKind:"MERGE",
 participantRawCandidateIds:ids,localComponentHandles:[],componentDefinitions:[],
 conflictsWithHypothesisIds:[],relationDirection:null,
 mathematicalClaim:{
   description:"SYNTHETIC shared role only",comparisonScope:"FULL_INTENDED_DOMAINS",
   intendedDomains:ids.map(id=>({candidateId:id,domain:"Entire synthetic toy domain of "+id,
     evidenceRecordIds:[ex.get(id).recordId]})),
   separatingWitness:null,coupling:null
 },
 supportEvidenceRecordIds:ids.map(id=>ex.get(id).recordId),
 synthesisRecordIds:["G4-EVID-synthetic-0","G4-EVID-synthetic-1"],
 counterEvidenceRecordIds:[],
 nonEquivalenceOrCountertest:"SYNTHETIC test contrasting both deployment domains",
 limitationsAndScope:"NOT a real mathematics claim; testing only",
 reviewStatus:"PROPOSED",laterGateOwner:"Gate 5"
});
assert.equal(validateGate4Bundle(reviewed,raw,evidence,g3).relations,1);
function relationReject(label,mutate,match){
 const b=structuredClone(reviewed);mutate(b);
 assert.throws(()=>validateGate4Bundle(b,raw,evidence,g3),match,label);
 negativeCount++;
}
relationReject("overlap-only MERGE",b=>{b.relationHypotheses[0].mathematicalClaim.comparisonScope="NOT_EQUIVALENCE_CLAIM";},/full intended domains required/);
relationReject("missing symmetric participant",b=>{b.cases.find(x=>x.candidateId===ids[1]).relationHypothesisIds=[];},/asymmetric participant reference/);
relationReject("no domain evidence on other side",b=>{b.relationHypotheses[0].mathematicalClaim.intendedDomains.pop();},/full intended domains required/);
relationReject("invented final ontology field",b=>{b.relationHypotheses[0].canonicalId="FINAL-1";},/unexpected\/missing keys/);
relationReject("dangling relation ID",b=>{b.relationHypotheses[0].conflictsWithHypothesisIds=["G4-HYP-unknown"];},/dangling conflict/);
relationReject("unsupported source domain",b=>{b.relationHypotheses[0].mathematicalClaim.intendedDomains[0].evidenceRecordIds=[ex.get(ids[1]).recordId];},/borrowed domain support/);
relationReject("unowned temporary handle",b=>{
 const r=b.relationHypotheses[0],h="G4-TMP-G4-CASE-RAW-OTHER-not-owned";
 r.relationKind="COMBO";r.laterGateOwner="Gate 8";
 r.localComponentHandles=[h];r.componentDefinitions=[{
   handle:h,ownerRawCandidateId:"RAW-OTHER",definition:"Synthetic",scope:"Synthetic",operation:"Synthetic"
 }];
 r.relationDirection={kind:"COMPOSED_FROM",sourceId:ids[0],targetIds:[ids[1],h]};
 r.mathematicalClaim.comparisonScope="NOT_EQUIVALENCE_CLAIM";r.mathematicalClaim.coupling="Synthetic coupling";
},/missing component owner/);
console.log("Gate4 REVIEW CANDIDATE structural checks passed:",
 JSON.stringify({population:summary.cases,pending:summary.pending,relations:summary.relations,
 negativeFixtures:negativeCount,calibrationStarted:false,gate5Started:false}));
