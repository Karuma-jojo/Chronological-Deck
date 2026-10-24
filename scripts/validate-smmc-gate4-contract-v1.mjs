// Gate-4 schema review suite. Every mathematical example is a SYNTHETIC
// validator fixture — never a disposition on a real SMMC raw candidate.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { ARSENAL_GATE2_RAW_CANDIDATES as raw, ARSENAL_GATE2_RAW_EVIDENCE as evidence } from "../course/smmc/arsenal/candidates-v0.mjs";
import { ARSENAL_GATE3_GRANULARITY_RECORDS as g3 } from "../course/smmc/arsenal/granularity-ledger-v0.mjs";
import { ARSENAL_GATE4_PENDING_BUNDLE as pending } from "../course/smmc/arsenal/tribunal-ledger-v0.mjs";
import { validateGate4Bundle, createGate4PendingBundle, gate3Ref,
  gate4ContentDigest, gate4TerminalCaseDigest,
  gate4TerminalRelationDigest, gate4RelationClaimIdentity } from "../course/smmc/arsenal/tribunal-contract-v1.mjs";
const sha = b => createHash("sha256").update(b).digest("hex");
const indexEvidence=b=>new Map([...evidence,...b.supplementalEvidence].map(x=>[x.recordId,x]));
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
 recordId:"G4-EVID-altered-battle",candidateId:battle.candidateId,
 candidateName:battle.candidateName,evidenceBasis:battle.evidenceBasis,
 recordChannel:battle.recordChannel,claimKind:battle.claimKind,
 verificationStatus:battle.verificationStatus,ontologyType:null,
 sourceId:battle.sourceId,sourceArtifactSha256:battle.sourceArtifactSha256,
 sourceLocator:structuredClone(battle.sourceLocator),
 historicalProblemIds:structuredClone(battle.historicalProblemIds),
 claim:"ALTERED OFFICIAL CLAIM",doesNotEstablish:battle.doesNotEstablish
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
 const scopeId="G4-SCOPE-held-"+i;
 held.scopeReviews.push({
   scopeReviewRecordId:scopeId,candidateIds:[c.candidateId],
   question:"Identify whether frozen evidence suffices for candidate treatment",
   scopeClassification:"GATE4_OWNED",reviewer:"Synthetic independent-review marker",
   decision:"Unresolved Gate4-owned evidence investigation",acceptedVersion:"604c3e9715024f3248e493eb2d2d73254d4ef318",
   permittedProceduralEffect:"OWNERSHIP_CLASSIFICATION_ONLY",
   successorObligation:"Complete source investigation and provisional treatment"
 });
 c.scopeReviewRecordId=scopeId;
 c.holdQuestion="Which mathematical action does this candidate name?";
 c.missingEvidence="No adequate candidate-owned mathematical identity evidence yet";
 c.accountableOwner="Gate 4 research reviewer";
 c.reviewerFindings=["SYNTHETIC held-scope review; unapproved and not graduation"];
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
const heldMissingScope=structuredClone(held);
heldMissingScope.cases[0].scopeClassification=null;
assert.throws(()=>validateGate4Bundle(heldMissingScope,raw,evidence,g3),
 /held action\/scope|scope review not owned or different classification/);
negativeCount++;
const heldMisownedUpstream=structuredClone(held);
heldMisownedUpstream.cases[0].holdReason="SOURCE_IDENTITY_GAP";
assert.throws(()=>validateGate4Bundle(heldMisownedUpstream,raw,evidence,g3),
 /held action\/scope/);
negativeCount++;
const heldMissingQuestion=structuredClone(held);
heldMissingQuestion.cases[0].missingEvidence=null;
assert.throws(()=>validateGate4Bundle(heldMissingQuestion,raw,evidence,g3),
 /held action\/scope/);
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
 b.cases[0].scopeClassification="GATE4_OWNED";
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
// G4-R194-06: duplicate exact mathematical claim cannot acquire a fresh ID
// merely by changing JavaScript property insertion or unordered domain order.
const duplicateClaim=structuredClone(reviewed);
const clonedHyp=structuredClone(duplicateClaim.relationHypotheses[0]);
clonedHyp.hypothesisId="G4-HYP-synthetic-equivalence-reencoded";
clonedHyp.mathematicalClaim=Object.fromEntries(
  Object.entries(clonedHyp.mathematicalClaim).reverse());
clonedHyp.mathematicalClaim.intendedDomains.reverse();
duplicateClaim.relationHypotheses.push(clonedHyp);
for(const id of ids)
  duplicateClaim.cases.find(c=>c.candidateId===id).relationHypothesisIds.push(clonedHyp.hypothesisId);
assert.equal(gate4RelationClaimIdentity(duplicateClaim.relationHypotheses[0]),
  gate4RelationClaimIdentity(clonedHyp));
assert.throws(()=>validateGate4Bundle(duplicateClaim,raw,evidence,g3),
  /duplicated exact relation claim must share one hypothesis ID/);
negativeCount++;
const distinctClaim=structuredClone(duplicateClaim);
distinctClaim.relationHypotheses[1].mathematicalClaim.description=
  "SYNTHETIC distinct operation, separately evidenced and challenged";
assert.notEqual(gate4RelationClaimIdentity(distinctClaim.relationHypotheses[0]),
  gate4RelationClaimIdentity(distinctClaim.relationHypotheses[1]));
assert.equal(validateGate4Bundle(distinctClaim,raw,evidence,g3).relations,2);
// PR #194 R194-01: compare against the frozen ID set and demand explicit
// research/evidence context for each named candidate.
const unknownComparison=structuredClone(reviewed);
unknownComparison.cases.find(c=>c.candidateId===ids[0]).comparisonCandidateIds.push("RAW-NOT-IN-ORE");
assert.throws(()=>validateGate4Bundle(unknownComparison,raw,evidence,g3),
 /unknown comparison candidate RAW-NOT-IN-ORE/);
negativeCount++;
const extraRealComparison=structuredClone(reviewed);
const extraCandidate=raw.find(c=>!ids.includes(c.candidateId));
assert.ok(extraCandidate);
extraRealComparison.cases.find(c=>c.candidateId===ids[0])
 .comparisonCandidateIds.push(extraCandidate.candidateId);
assert.throws(()=>validateGate4Bundle(extraRealComparison,raw,evidence,g3),
 /comparison candidate lacks explicit supporting or held-research context/);
negativeCount++;
// Shared mathematical relation alone is a documented comparison context;
// duplicate citation of the other source is not universally mandatory.
const legitimateRelationOnlyComparison=structuredClone(reviewed);
legitimateRelationOnlyComparison.cases.find(c=>c.candidateId===ids[0]).comparisonEvidenceRecordIds=[];
assert.equal(validateGate4Bundle(legitimateRelationOnlyComparison,raw,evidence,g3).relations,1);
// R194-03: supplemental source labels must not impersonate other raw candidates.
const badSupplementalName=structuredClone(reviewed);
badSupplementalName.supplementalEvidence[0].candidateName="NOT THE FROZEN NAME";
assert.throws(()=>validateGate4Bundle(badSupplementalName,raw,evidence,g3),
 /supplemental evidence candidateName differs from frozen raw candidate/);
negativeCount++;
function relationReject(label,mutate,match){
 const b=structuredClone(reviewed);mutate(b);
 assert.throws(()=>validateGate4Bundle(b,raw,evidence,g3),match,label);
 negativeCount++;
}
relationReject("overlap-only MERGE",b=>{b.relationHypotheses[0].mathematicalClaim.comparisonScope="NOT_EQUIVALENCE_CLAIM";},/full intended domains required/);
relationReject("missing symmetric participant",b=>{b.cases.find(x=>x.candidateId===ids[1]).relationHypothesisIds=[];},/asymmetric participant reference|relational primary lacks matching authoritative/);
relationReject("no domain evidence on other side",b=>{b.relationHypotheses[0].mathematicalClaim.intendedDomains.pop();},/full intended domains required/);
relationReject("invented final ontology field",b=>{b.relationHypotheses[0].canonicalId="FINAL-1";},/unexpected\/missing keys/);
relationReject("dangling relation ID",b=>{b.relationHypotheses[0].conflictsWithHypothesisIds=["G4-HYP-unknown"];},/dangling conflict/);
relationReject("unsupported source domain",b=>{b.relationHypotheses[0].mathematicalClaim.intendedDomains[0].evidenceRecordIds=[ex.get(ids[1]).recordId];},/borrowed domain support/);

relationReject("borrowed synthesis record",b=>{
 const one=b.cases.find(x=>x.candidateId===ids[0]);
 one.synthesisRecordIds=["G4-EVID-synthetic-1"];
},/borrowed or invalid synthesis reference/);
// Explicit same-scope A≈B and B≈C with supported A≠C is not allowed to
// slip through as a nonchallenged pair of relations. Synthetic graph only.
const tri=structuredClone(reviewed);
const cE=sourceFacts.find(x=>!ids.includes(x.candidateId));
assert.ok(cE);
const c=tri.cases.find(x=>x.candidateId===cE.candidateId);
const common="SYNTHETIC SHARED INTENDED DOMAIN";
for(const d of tri.relationHypotheses[0].mathematicalClaim.intendedDomains)d.domain=common;
tri.supplementalEvidence.push({
 recordId:"G4-EVID-synthetic-2",candidateId:cE.candidateId,candidateName:c.rawNameSnapshot,
 evidenceBasis:"PROJECT_SYNTHESIS",recordChannel:"NONE",
 claimKind:"RELATION_PROPOSAL",verificationStatus:"SYNTHESIS_PROPOSAL",
 ontologyType:null,linkedRecordIds:[cE.recordId],
 claim:"SYNTHETIC TOY CLAIM ONLY",doesNotEstablish:"No mathematical equivalence established"
});
Object.assign(c,{
 workStatus:"PROPOSED",proposedPrimaryDisposition:"MERGE",scopeClassification:"GATE4_OWNED",
 candidateOwnedFacts:[{evidenceRecordId:cE.recordId,note:"Synthetic owned reference"}],
 comparisonCandidateIds:[ids[1]],comparisonEvidenceRecordIds:[ex.get(ids[1]).recordId],
 synthesisRecordIds:["G4-EVID-synthetic-2"],hypothesis:"Synthetic equivalence",
 contraryHypotheses:["Potential synthetic separating witness"],
 nonEquivalenceOrCountertest:"Synthetic check covering full common domain",
 relationHypothesisIds:["G4-HYP-synthetic-bc"],rationale:"TEST FIXTURE ONLY"
});
tri.statusHistory.push({
 eventId:"G4-EVENT-synthetic-2",candidateId:cE.candidateId,fromStatus:"PENDING",
 toStatus:"PROPOSED",evidenceRecordIds:[cE.recordId],reviewer:"Test harness",
 acceptedVersion:eventVersion,reopenedFromVersion:null
});
const bId=ids[1],third=cE.candidateId;
const bCase=tri.cases.find(x=>x.candidateId===bId);
bCase.relationHypothesisIds.push("G4-HYP-synthetic-bc");
const base=tri.relationHypotheses[0];
tri.relationHypotheses.push({
 ...structuredClone(base),
 hypothesisId:"G4-HYP-synthetic-bc",
 participantRawCandidateIds:[bId,third].sort(),
 mathematicalClaim:{
   ...structuredClone(base.mathematicalClaim),
   description:"SYNTHETIC B=C toy claim",
   intendedDomains:[bId,third].sort().map(id=>({
     candidateId:id,domain:common,evidenceRecordIds:[id===third?cE.recordId:ex.get(id).recordId]
   }))
 },
 supportEvidenceRecordIds:[ex.get(bId).recordId,cE.recordId],
 synthesisRecordIds:["G4-EVID-synthetic-1","G4-EVID-synthetic-2"]
});
assert.equal(validateGate4Bundle(tri,raw,evidence,g3).relations,2);
const contra=structuredClone(tri);
contra.cases.find(x=>x.candidateId===ids[0]).relationHypothesisIds.push("G4-HYP-synthetic-ac-unequal");
contra.cases.find(x=>x.candidateId===third).relationHypothesisIds.push("G4-HYP-synthetic-ac-unequal");
contra.relationHypotheses.push({
 ...structuredClone(base),
 hypothesisId:"G4-HYP-synthetic-ac-unequal",relationKind:"PARENT_CHILD",
 participantRawCandidateIds:[ids[0],third].sort(),
 relationDirection:{kind:"PARENT_TO_CHILD",sourceId:ids[0],targetIds:[third]},
 mathematicalClaim:{
   description:"SYNTHETIC A not equal to C",comparisonScope:"NOT_EQUIVALENCE_CLAIM",
   intendedDomains:[ids[0],third].map(id=>({
     candidateId:id,domain:common,evidenceRecordIds:[id===third?cE.recordId:ex.get(id).recordId]
   })),
   separatingWitness:"SYNTHETIC mathematical differentiating example",coupling:null
 },
 supportEvidenceRecordIds:[ex.get(ids[0]).recordId,cE.recordId],
 synthesisRecordIds:["G4-EVID-synthetic-0","G4-EVID-synthetic-2"]
});
assert.throws(()=>validateGate4Bundle(contra,raw,evidence,g3),
 /same-scope transitive MERGE contradicted/);
negativeCount++;

// Independent PR #194 I01–I06 regression set. Every example is synthetic.
for(const kind of ["MERGE","SPLIT","PARENT_CHILD","COMBO"]){
 const b=structuredClone(reviewed);
 b.relationHypotheses=[];
 for(const id of ids){
   const c=b.cases.find(x=>x.candidateId===id);
   c.proposedPrimaryDisposition=kind;c.relationHypothesisIds=[];
 }
 assert.throws(()=>validateGate4Bundle(b,raw,evidence,g3),
   /relational primary lacks matching authoritative/,kind+" without relation");
 negativeCount++;
}
const componentOwner=ids[0],partHandles=[
 "G4-TMP-G4-CASE-"+componentOwner+"-part1",
 "G4-TMP-G4-CASE-"+componentOwner+"-part2"
];
const partDefs=partHandles.map((handle,i)=>({
 handle,ownerRawCandidateId:componentOwner,definition:"Synthetic part "+(i+1),
 scope:"Synthetic operation domain",operation:"Synthetic operation "+(i+1)
}));
const splitRel=(name,description)=>({
 hypothesisId:name,relationKind:"SPLIT",
 participantRawCandidateIds:[componentOwner],
 localComponentHandles:[...partHandles],
 componentDefinitions:structuredClone(partDefs),
 conflictsWithHypothesisIds:[],
 relationDirection:{kind:"SOURCE_TO_COMPONENTS",sourceId:componentOwner,targetIds:[...partHandles]},
 mathematicalClaim:{
   description,comparisonScope:"NOT_EQUIVALENCE_CLAIM",
   intendedDomains:[{candidateId:componentOwner,domain:"Synthetic domain",
     evidenceRecordIds:[ex.get(componentOwner).recordId]}],
   separatingWitness:null,coupling:null
 },
 supportEvidenceRecordIds:[ex.get(componentOwner).recordId],
 synthesisRecordIds:["G4-EVID-synthetic-0"],counterEvidenceRecordIds:[],
 nonEquivalenceOrCountertest:"Synthetic component operation differentiation",
 limitationsAndScope:"Purely synthetic; no canonical abilities",
 reviewStatus:"PROPOSED",laterGateOwner:"Gate 5"
});
const multi=structuredClone(reviewed);
const split1=splitRel("G4-HYP-synthetic-split-1","Synthetic decomposition hypothesis one");
const split2=splitRel("G4-HYP-synthetic-split-2","Synthetic decomposition hypothesis two");
multi.relationHypotheses.push(split1,split2);
multi.cases.find(x=>x.candidateId===componentOwner).relationHypothesisIds.push(
 split1.hypothesisId,split2.hypothesisId
);
assert.equal(validateGate4Bundle(multi,raw,evidence,g3).relations,3);
// G4-R194-08: identical SPLIT components with ALPHA-RENAMED review handles
// must not mint a second authoritative hypothesis ID.
const alphaRename=structuredClone(multi);
const alphaA=alphaRename.relationHypotheses[1];
const alphaB=alphaRename.relationHypotheses[2];
alphaB.mathematicalClaim=structuredClone(alphaA.mathematicalClaim);
const renamed=new Map(alphaB.localComponentHandles.map((handle,i)=>[
 handle,"G4-TMP-G4-CASE-"+componentOwner+"-alias"+(i+1)
]));
alphaB.localComponentHandles=alphaB.localComponentHandles.map(x=>renamed.get(x));
alphaB.componentDefinitions=alphaB.componentDefinitions.map(def=>({
 ...def,handle:renamed.get(def.handle)
}));
alphaB.relationDirection.targetIds=alphaB.relationDirection.targetIds.map(x=>renamed.get(x));
assert.equal(gate4RelationClaimIdentity(alphaA),gate4RelationClaimIdentity(alphaB));
assert.throws(()=>validateGate4Bundle(alphaRename,raw,evidence,g3),
 /duplicated exact relation claim must share one hypothesis ID/);
negativeCount++;
// Reusing review-only handle names with different mathematical operations
// remains a DIFFERENT claim, rather than a forced structural merge.
const genuinelyDifferentSplit=structuredClone(alphaRename);
genuinelyDifferentSplit.relationHypotheses[2].componentDefinitions[0].operation=
 "A demonstrably different synthetic component operation";
assert.notEqual(gate4RelationClaimIdentity(genuinelyDifferentSplit.relationHypotheses[1]),
 gate4RelationClaimIdentity(genuinelyDifferentSplit.relationHypotheses[2]));
assert.equal(validateGate4Bundle(genuinelyDifferentSplit,raw,evidence,g3).relations,3);
// R194-02: being a participant in A's SPLIT cannot make B the source.
const stolenSplitPrimary=structuredClone(multi);
const nonSource=ids.find(id=>id!==componentOwner);
const stolenSplit=stolenSplitPrimary.relationHypotheses.find(r=>r.relationKind==="SPLIT");
stolenSplit.participantRawCandidateIds.push(nonSource);
stolenSplitPrimary.cases.find(c=>c.candidateId===nonSource)
 .relationHypothesisIds.push(stolenSplit.hypothesisId);
stolenSplitPrimary.cases.find(c=>c.candidateId===nonSource).proposedPrimaryDisposition="SPLIT";
assert.throws(()=>validateGate4Bundle(stolenSplitPrimary,raw,evidence,g3),
 /relational primary lacks matching authoritative nonchallenged hypothesis/);
negativeCount++;
// The mathematical source *can* route SPLIT, retaining MERGE as a secondary.
const ownedSplitPrimary=structuredClone(multi);
ownedSplitPrimary.cases.find(c=>c.candidateId===componentOwner)
 .proposedPrimaryDisposition="SPLIT";
assert.equal(validateGate4Bundle(ownedSplitPrimary,raw,evidence,g3).relations,3);
const foreignOwnedSplitComponents=structuredClone(multi);
foreignOwnedSplitComponents.relationHypotheses[1].componentDefinitions[0]
 .ownerRawCandidateId=nonSource;
foreignOwnedSplitComponents.relationHypotheses[1].participantRawCandidateIds.push(nonSource);
foreignOwnedSplitComponents.cases.find(c=>c.candidateId===nonSource)
 .relationHypothesisIds.push(foreignOwnedSplitComponents.relationHypotheses[1].hypothesisId);
assert.throws(()=>validateGate4Bundle(foreignOwnedSplitComponents,raw,evidence,g3),
 /invalid handle ownership|incomplete split or component not owned by split source/);
negativeCount++;
// R194-04: exact component-definition identity does not depend on object key insertion order.
const reorderedComponentFields=structuredClone(multi);
reorderedComponentFields.relationHypotheses[2].componentDefinitions[0]=Object.fromEntries(
 Object.entries(reorderedComponentFields.relationHypotheses[2].componentDefinitions[0]).reverse()
);
assert.equal(validateGate4Bundle(reorderedComponentFields,raw,evidence,g3).relations,3);
const conflictingDefinition=structuredClone(multi);
conflictingDefinition.relationHypotheses[2].componentDefinitions[0].operation="INCOMPATIBLE NEW OPERATION";
assert.throws(()=>validateGate4Bundle(conflictingDefinition,raw,evidence,g3),
 /component definition conflict across relations/);
negativeCount++;
const duplicateHandle=structuredClone(multi);
duplicateHandle.relationHypotheses[1].componentDefinitions[1].handle=partHandles[0];
assert.throws(()=>validateGate4Bundle(duplicateHandle,raw,evidence,g3),
 /duplicate local component definition/);
negativeCount++;
// A COMBO secondary may coexist with a MERGE primary. Its temporary handle
// must belong to a named participating raw candidate.
const combo=structuredClone(reviewed);
const comboHandle=partHandles[0];
combo.relationHypotheses.push({
 hypothesisId:"G4-HYP-synthetic-combo",relationKind:"COMBO",
 participantRawCandidateIds:ids,localComponentHandles:[comboHandle],
 componentDefinitions:[structuredClone(partDefs[0])],
 conflictsWithHypothesisIds:[],
 relationDirection:{kind:"COMPOSED_FROM",sourceId:componentOwner,
   targetIds:[ids[1],comboHandle]},
 mathematicalClaim:{
   description:"Synthetic joint method distinct from standalone equivalence",
   comparisonScope:"NOT_EQUIVALENCE_CLAIM",
   intendedDomains:ids.map(id=>({candidateId:id,domain:"Synthetic inputs",
     evidenceRecordIds:[ex.get(id).recordId]})),
   separatingWitness:null,coupling:"Synthetic sequencing of distinct operations"
 },
 supportEvidenceRecordIds:ids.map(id=>ex.get(id).recordId),
 synthesisRecordIds:["G4-EVID-synthetic-0","G4-EVID-synthetic-1"],
 counterEvidenceRecordIds:[],nonEquivalenceOrCountertest:"Synthetic independence challenge",
 limitationsAndScope:"Only a hypothetical combination",reviewStatus:"PROPOSED",
 laterGateOwner:"Gate 8"
});
for(const id of ids)combo.cases.find(x=>x.candidateId===id).relationHypothesisIds.push("G4-HYP-synthetic-combo");
assert.equal(validateGate4Bundle(combo,raw,evidence,g3).relations,2);
// Ordered COMBO target sequence is NOT erased by alpha-normalization.
const sequenceA=combo.relationHypotheses.find(x=>x.relationKind==="COMBO");
const sequenceB=structuredClone(sequenceA);
sequenceB.relationDirection.targetIds.reverse();
assert.notEqual(gate4RelationClaimIdentity(sequenceA),
 gate4RelationClaimIdentity(sequenceB));
// R194-02: the COMBO's component supplier is not the source expression.
const stolenComboPrimary=structuredClone(combo);
stolenComboPrimary.cases.find(c=>c.candidateId!==componentOwner &&
 c.relationHypothesisIds.includes("G4-HYP-synthetic-combo"))
 .proposedPrimaryDisposition="COMBO";
assert.throws(()=>validateGate4Bundle(stolenComboPrimary,raw,evidence,g3),
 /relational primary lacks matching authoritative nonchallenged hypothesis/);
negativeCount++;
// A source-owned COMBO primary must remain legal with a secondary MERGE.
const ownedComboPrimary=structuredClone(combo);
ownedComboPrimary.cases.find(c=>c.candidateId===componentOwner)
 .proposedPrimaryDisposition="COMBO";
assert.equal(validateGate4Bundle(ownedComboPrimary,raw,evidence,g3).relations,2);
const prematureComboHandoff=structuredClone(combo);
prematureComboHandoff.relationHypotheses[1].reviewStatus="REVIEWED_FOR_HANDOFF";
assert.throws(()=>validateGate4Bundle(prematureComboHandoff,raw,evidence,g3),
 /reviewed relation missing completed participants or downstream handoff owner/);
negativeCount++;
const bogusComboSource=structuredClone(combo);
bogusComboSource.relationHypotheses[1].relationDirection.sourceId="RAW-DOES-NOT-EXIST";
assert.throws(()=>validateGate4Bundle(bogusComboSource,raw,evidence,g3),
 /COMBO requires specific coupling and components/);
negativeCount++;
const foreignHandle=structuredClone(combo);
const foreign="G4-TMP-G4-CASE-RAW-OTHER-part1";
foreignHandle.relationHypotheses[1].localComponentHandles=[foreign];
foreignHandle.relationHypotheses[1].componentDefinitions[0].handle=foreign;
foreignHandle.relationHypotheses[1].componentDefinitions[0].ownerRawCandidateId="RAW-OTHER";
foreignHandle.relationHypotheses[1].relationDirection.targetIds=[ids[1],foreign];
assert.throws(()=>validateGate4Bundle(foreignHandle,raw,evidence,g3),
 /missing component owner/);
negativeCount++;
// Source registration is not made up by either the status history or synthesis.
const holdRecovery=structuredClone(reviewed);
holdRecovery.statusHistory.unshift({
 eventId:"G4-EVENT-initial-hold",candidateId:ids[0],fromStatus:"PENDING",
 toStatus:"EVIDENCE_HOLD",evidenceRecordIds:[],reviewer:"Synthetic held reviewer",
 acceptedVersion:eventVersion,reopenedFromVersion:null
});
const recovering=holdRecovery.statusHistory.find(e=>e.candidateId===ids[0] &&
 e.toStatus==="PROPOSED");
recovering.fromStatus="EVIDENCE_HOLD";recovering.evidenceRecordIds=[];
assert.throws(()=>validateGate4Bundle(holdRecovery,raw,evidence,g3),
 /leaving evidence hold requires newly cited candidate-owned supplemental evidence/);
negativeCount++;
recovering.evidenceRecordIds=["G4-EVID-synthetic-0"];
assert.equal(validateGate4Bundle(holdRecovery,raw,evidence,g3).relations,1);
// Authored scope-review text is not independent approval. Only a separately
// supplied, pinned immutable digest can authorize REVIEWED_FOR_HANDOFF.
const complete=structuredClone(reviewed);
const first=complete.cases.find(x=>x.candidateId===ids[0]);
const scopeRef="G4-SCOPE-certified-synthetic";
const scope={
 scopeReviewRecordId:scopeRef,candidateIds:[ids[0]],
 question:"Synthetic completed Gate-4 treatment; canonical question remains",
 scopeClassification:"LATER_GATE_ONLY",reviewer:"External synthetic reviewer",
 decision:"Approve only classification of remaining ontology question",
 acceptedVersion:eventVersion,permittedProceduralEffect:"CLASSIFY_ONLY",
 successorObligation:"Gate 5 must independently decide canonical identity"
};
complete.scopeReviews.push(scope);
Object.assign(first,{
 workStatus:"REVIEWED_FOR_HANDOFF",scopeClassification:"LATER_GATE_ONLY",
 scopeReviewRecordId:scopeRef,handoffOwners:["Gate 5"],
 reviewerFindings:["Synthetic independent reviewer checked status and relations"]
});
complete.statusHistory.push({
 eventId:"G4-EVENT-synthetic-completed",candidateId:ids[0],
 fromStatus:"PROPOSED",toStatus:"REVIEWED_FOR_HANDOFF",
 evidenceRecordIds:[ex.get(ids[0]).recordId],reviewer:"Synthetic accepted reviewer",
 acceptedVersion:eventVersion,reopenedFromVersion:null
});
assert.throws(()=>validateGate4Bundle(complete,raw,evidence,g3),
 /independent scope-review certificate missing/);
negativeCount++;
const digest=x=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
const approvedScope=new Map([[scopeRef,digest(scope)]]);
// An independently accepted content-addressed treatment must be supplied
// separately from the live tribunal bundle. These synthetic pins only
// simulate an independent approval for regression, not real acceptance.
assert.throws(()=>validateGate4Bundle(complete,raw,evidence,g3,{
 trustedScopeReviews:approvedScope
}),/terminal case content differs from independently accepted snapshot/);
negativeCount++;
const acceptedTerminalCases=new Map([[first.tribunalCaseId,{
 acceptedVersion:eventVersion,
 sha256:gate4TerminalCaseDigest(first,new Map(
   complete.relationHypotheses.map(r=>[r.hypothesisId,r])),indexEvidence(complete))
}]]);
const terminalOpts={trustedScopeReviews:approvedScope,
 trustedTerminalCases:acceptedTerminalCases};
assert.equal(validateGate4Bundle(complete,raw,evidence,g3,terminalOpts).completed,1);
// G4-R194-05: neither the rationale, hypothesis nor supporting mathematical
// relation may be rewritten after a first accepted terminal decision.
const rewrittenRationale=structuredClone(complete);
rewrittenRationale.cases.find(c=>c.candidateId===ids[0]).rationale=
 "Different synthetic justification substituted without any review or reopen";
assert.throws(()=>validateGate4Bundle(rewrittenRationale,raw,evidence,g3,terminalOpts),
 /terminal case content differs from independently accepted snapshot/);
negativeCount++;
const rewrittenHypothesis=structuredClone(complete);
rewrittenHypothesis.cases.find(c=>c.candidateId===ids[0]).hypothesis=
 "Different mathematical identity claim substituted silently";
assert.throws(()=>validateGate4Bundle(rewrittenHypothesis,raw,evidence,g3,terminalOpts),
 /terminal case content differs from independently accepted snapshot/);
negativeCount++;
const rewrittenRelatedRelation=structuredClone(complete);
rewrittenRelatedRelation.relationHypotheses[0].mathematicalClaim.description=
 "A new proof of an incompatible operation, not originally reviewed";
assert.throws(()=>validateGate4Bundle(rewrittenRelatedRelation,raw,evidence,g3,terminalOpts),
 /terminal case content differs from independently accepted snapshot/);
negativeCount++;
// Merely reordering JSON object properties does NOT change substantive
// accepted mathematical content under stable canonical content hashing.
const propertyReordered=structuredClone(complete);
propertyReordered.cases.find(c=>c.candidateId===ids[0]).hypothesis=
 first.hypothesis; // no substantive change
propertyReordered.relationHypotheses[0].mathematicalClaim=Object.fromEntries(
 Object.entries(propertyReordered.relationHypotheses[0].mathematicalClaim).reverse()
);
assert.equal(validateGate4Bundle(propertyReordered,raw,evidence,g3,terminalOpts).completed,1);
// A terminal relation additionally requires its own independently pinned
// whole-record snapshot, not only the accepted participant-case closure.
const completeBoth=structuredClone(complete);
// A second-layer synthesis dependency proves the accepted digest protects a
// TRANSITIVE referenced support chain, not merely the directly cited record.
const baseSynthesis=completeBoth.supplementalEvidence.find(x=>x.recordId==="G4-EVID-synthetic-0");
const priorSupport=baseSynthesis.linkedRecordIds[0];
const nestedSupport={
 ...structuredClone(baseSynthesis),
 recordId:"G4-EVID-synthetic-dependency",
 claim:"SYNTHETIC nested supporting interpretation",
 linkedRecordIds:[priorSupport],
 doesNotEstablish:"No actual official occurrence or accepted mathematical truth"
};
completeBoth.supplementalEvidence.splice(
 completeBoth.supplementalEvidence.findIndex(x=>x.recordId===baseSynthesis.recordId),
 0,nestedSupport);
baseSynthesis.linkedRecordIds.push(nestedSupport.recordId);
const otherId=ids[1],otherCase=completeBoth.cases.find(c=>c.candidateId===otherId);
const secondScope={
 ...scope,scopeReviewRecordId:"G4-SCOPE-certified-second-synthetic",
 candidateIds:[otherId],decision:"Second independent synthetic terminal classification"
};
completeBoth.scopeReviews.push(secondScope);
Object.assign(otherCase,{
 workStatus:"REVIEWED_FOR_HANDOFF",scopeClassification:"LATER_GATE_ONLY",
 scopeReviewRecordId:secondScope.scopeReviewRecordId,handoffOwners:["Gate 5"],
 reviewerFindings:["Second synthetic reviewer checked final hypothesis"]
});
completeBoth.statusHistory.push({
 eventId:"G4-EVENT-synthetic-completed-second",candidateId:otherId,
 fromStatus:"PROPOSED",toStatus:"REVIEWED_FOR_HANDOFF",
 evidenceRecordIds:[ex.get(otherId).recordId],reviewer:"Second synthetic reviewer",
 acceptedVersion:eventVersion,reopenedFromVersion:null
});
completeBoth.relationHypotheses[0].reviewStatus="REVIEWED_FOR_HANDOFF";
const relation=completeBoth.relationHypotheses[0];
const casesById=new Map(completeBoth.cases.map(c=>[c.candidateId,c]));
const relationsById=new Map(completeBoth.relationHypotheses.map(r=>[r.hypothesisId,r]));
const trustedCasesBoth=new Map(ids.map(id=>{
 const x=casesById.get(id);
 return [x.tribunalCaseId,{acceptedVersion:eventVersion,
  sha256:gate4TerminalCaseDigest(x,relationsById,indexEvidence(completeBoth))}];
}));
const trustedScopeBoth=new Map([...approvedScope,
 [secondScope.scopeReviewRecordId,digest(secondScope)]]);
const trustedRelations=new Map([[relation.hypothesisId,{
 acceptedVersion:eventVersion,sha256:gate4TerminalRelationDigest(relation,indexEvidence(completeBoth))
}]]);
const bothOpts={trustedScopeReviews:trustedScopeBoth,
 trustedTerminalCases:trustedCasesBoth,trustedTerminalRelations:trustedRelations};
assert.throws(()=>validateGate4Bundle(completeBoth,raw,evidence,g3,{
 trustedScopeReviews:trustedScopeBoth,trustedTerminalCases:trustedCasesBoth
}),/terminal relation content differs from independently accepted snapshot/);
negativeCount++;
assert.equal(validateGate4Bundle(completeBoth,raw,evidence,g3,bothOpts).completed,2);
// G4-R194-07: neither a directly cited interpretation, its limitations,
// nor a transitively linked synthesis may be silently replaced.
for(const [evidenceId,field,value] of [
 ["G4-EVID-synthetic-0","claim","Contradictory replacement never accepted"],
 ["G4-EVID-synthetic-0","doesNotEstablish","Changed limitation secretly"],
 ["G4-EVID-synthetic-dependency","claim","Changed underlying nested evidence"],
 ["G4-EVID-synthetic-dependency","doesNotEstablish","Different dependency scope"]
]){
 const altered=structuredClone(completeBoth);
 altered.supplementalEvidence.find(x=>x.recordId===evidenceId)[field]=value;
 assert.throws(()=>validateGate4Bundle(altered,raw,evidence,g3,bothOpts),
  /terminal case content differs from independently accepted snapshot/,
  "silent evidence edit: "+evidenceId+"."+field);
 negativeCount++;
}
const evidenceOrderChange=structuredClone(completeBoth);
// Reorder INDEPENDENT records while preserving the declared linkedRecordIds
// topological order (dependency before dependent synthesis).
const unrelated=evidenceOrderChange.supplementalEvidence
 .find(x=>x.recordId==="G4-EVID-synthetic-1");
evidenceOrderChange.supplementalEvidence=[
 unrelated,...evidenceOrderChange.supplementalEvidence.filter(x=>x!==unrelated)
];
assert.equal(validateGate4Bundle(evidenceOrderChange,raw,evidence,g3,bothOpts).completed,2);
const changedAcceptedRelation=structuredClone(completeBoth);
changedAcceptedRelation.relationHypotheses[0].mathematicalClaim.description=
 "SILENT NEW MATHEMATICAL CLAIM WITHOUT REVIEW";
assert.throws(()=>validateGate4Bundle(changedAcceptedRelation,raw,evidence,g3,bothOpts),
 /terminal case content differs from independently accepted snapshot/);
negativeCount++;
// Even replacing self-reported case pins with the author's new hashes cannot
// evade a separately accepted immutable terminal-relation hash.
const forgedCasePins=new Map(ids.map(id=>{
 const c=changedAcceptedRelation.cases.find(z=>z.candidateId===id);
 return [c.tribunalCaseId,{acceptedVersion:eventVersion,
  sha256:gate4TerminalCaseDigest(c,new Map(changedAcceptedRelation.relationHypotheses
    .map(r=>[r.hypothesisId,r])),indexEvidence(changedAcceptedRelation))}];
}));
assert.throws(()=>validateGate4Bundle(changedAcceptedRelation,raw,evidence,g3,{
 ...bothOpts,trustedTerminalCases:forgedCasePins
}),/terminal relation content differs from independently accepted snapshot/);
negativeCount++;
const forged=structuredClone(complete);
forged.scopeReviews[0].decision="Builder changed the approved rationale";
assert.throws(()=>validateGate4Bundle(forged,raw,evidence,g3,{
 trustedScopeReviews:approvedScope
}),/independent scope-review certificate missing/);
negativeCount++;
const pinnedPrefix=new Map([[eventVersion,{
 eventsCount:complete.statusHistory.length,sha256:digest(complete.statusHistory)
}]]);
const reopened=structuredClone(complete);
reopened.cases.find(x=>x.candidateId===ids[0]).workStatus="CHALLENGED";
reopened.statusHistory.push({
 eventId:"G4-EVENT-synthetic-reopened",candidateId:ids[0],
 fromStatus:"REVIEWED_FOR_HANDOFF",toStatus:"CHALLENGED",
 evidenceRecordIds:[],reviewer:"Synthetic reopen review",
 acceptedVersion:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
 reopenedFromVersion:eventVersion
});
assert.equal(validateGate4Bundle(reopened,raw,evidence,g3,{
 trustedStatusHistoryPrefixes:pinnedPrefix
}).challenged,1);
const unpinned=structuredClone(reopened);
assert.throws(()=>validateGate4Bundle(unpinned,raw,evidence,g3),
 /externally pinned accepted prior-history prefix/);
negativeCount++;
const inventedVersion=structuredClone(reopened);
inventedVersion.statusHistory.at(-1).reopenedFromVersion="bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
assert.throws(()=>validateGate4Bundle(inventedVersion,raw,evidence,g3,{
 trustedStatusHistoryPrefixes:pinnedPrefix
}),/reopenedFromVersion does not match/);
negativeCount++;
const terminalToTerminal=structuredClone(reopened);
terminalToTerminal.cases.find(x=>x.candidateId===ids[0]).workStatus="REVIEWED_FOR_HANDOFF";
terminalToTerminal.statusHistory.at(-1).toStatus="REVIEWED_FOR_HANDOFF";
assert.throws(()=>validateGate4Bundle(terminalToTerminal,raw,evidence,g3,{
 trustedScopeReviews:approvedScope,trustedStatusHistoryPrefixes:pinnedPrefix
}),/terminal reopen must enter substantive review/);
negativeCount++;
const mutatedHistory=structuredClone(reopened);
mutatedHistory.statusHistory[0].reviewer="Rewritten historical reviewer";
assert.throws(()=>validateGate4Bundle(mutatedHistory,raw,evidence,g3,{
 trustedStatusHistoryPrefixes:pinnedPrefix
}),/externally pinned accepted prior-history prefix/);
negativeCount++;
console.log("Gate4 REVIEW CANDIDATE structural checks passed:",
 JSON.stringify({population:summary.cases,pending:summary.pending,relations:summary.relations,
 negativeFixtures:negativeCount,calibrationStarted:false,gate5Started:false}));
