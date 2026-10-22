// SMMC Arsenal Gate 4 executable contract v1 — REVIEW CANDIDATE ONLY.
// This schema does not authorize adjudication, canonical abilities, or Gate 5.
// Mathematics in the proposal fields needs independent human source review;
// a passing structural validator is NOT a proof of mathematical identity.
import { createHash } from "node:crypto";
import { validateGate1EvidenceRecord } from "./evidence-contract-v1.mjs";

const invariant = (yes, why) => { if (!yes) throw Error("Gate4: " + why); };
const own = (x,k) => Object.prototype.hasOwnProperty.call(x,k);
const plain = x => x !== null && typeof x === "object" && !Array.isArray(x);
const unique = xs => new Set(xs).size === xs.length;
const nonempty = x => typeof x === "string" && x.trim().length > 0;
const stringArray = x => Array.isArray(x) && x.every(nonempty) && unique(x);
const exact = (o, keys, where) => {
  invariant(plain(o), where + " must be an object");
  invariant(JSON.stringify(Object.keys(o).sort()) === JSON.stringify([...keys].sort()), where + " unexpected/missing keys");
};
const enumValue = (value, allowed, where) => invariant(allowed.includes(value), where + " invalid enum");
const someText = (v,k) => invariant(nonempty(v), k + " requires substantive text");
const optionalText = (v,k) => invariant(v === null || nonempty(v), k + " must be null or text");
const mustArray = (x,k) => invariant(Array.isArray(x), k + " must be an array");
const noDup = (x,k) => invariant(unique(x), k + " duplicate");
const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const sha256 = obj => createHash("sha256").update(JSON.stringify(obj)).digest("hex");
export const gate3Ref = row => "G3-SHA256-" + sha256(row);

export const G4_DISPOSITIONS = Object.freeze(["ACCEPT","MERGE","SPLIT","PARENT_CHILD","COMBO","REJECT"]);
export const G4_STATUSES = Object.freeze(["PENDING","EVIDENCE_HOLD","PROPOSED","CHALLENGED","REVIEWED_FOR_HANDOFF"]);
export const G4_HOLD_REASONS = Object.freeze(["SOURCE_IDENTITY_GAP","THIN_CANDIDATE_EVIDENCE","CONFLICTING_EVIDENCE","UPSTREAM_DEFECT","LATER_GATE_CANONICAL_CHOICE"]);
export const G4_SCOPE = Object.freeze(["GATE4_OWNED","UPSTREAM_AMENDMENT_REQUIRED","LATER_GATE_ONLY"]);
export const G4_CASE_KEYS = Object.freeze([
  "tribunalCaseId","candidateId","rawNameSnapshot","rawOriginSnapshot","rawEvidenceRecordIds",
  "comparisonCandidateIds","comparisonEvidenceRecordIds","frozenGate3SnapshotRef",
  "workStatus","proposedPrimaryDisposition","holdReason","scopeClassification",
  "nextEvidenceOrAction","scopeReviewRecordId","candidateOwnedFacts","comparativeFacts",
  "synthesisRecordIds","hypothesis","contraryHypotheses","triggerOperationOutputAnalysis",
  "nonEquivalenceOrCountertest","relationHypothesisIds","scopeLimitations","handoffOwners",
  "reviewerFindings","rationale"
]);
export const G4_RELATION_KEYS = Object.freeze([
  "hypothesisId","relationKind","participantRawCandidateIds","localComponentHandles",
  "componentDefinitions","conflictsWithHypothesisIds","relationDirection","mathematicalClaim",
  "supportEvidenceRecordIds","synthesisRecordIds","counterEvidenceRecordIds",
  "nonEquivalenceOrCountertest","limitationsAndScope","reviewStatus","laterGateOwner"
]);
export const G4_BUNDLE_KEYS = Object.freeze(["cases","relationHypotheses","supplementalEvidence","scopeReviews","statusHistory"]);
const G4_FACT_KEYS=["evidenceRecordId","note"];
const G4_COMPONENT_KEYS=["handle","ownerRawCandidateId","definition","scope","operation"];
const G4_DIRECTION_KEYS=["kind","sourceId","targetIds"];
const G4_CLAIM_KEYS=["description","intendedDomains","comparisonScope","separatingWitness","coupling"];
const G4_DOMAIN_KEYS=["candidateId","domain","evidenceRecordIds"];
const G4_SCOPE_KEYS=["scopeReviewRecordId","candidateIds","question","scopeClassification",
  "reviewer","decision","acceptedVersion","permittedProceduralEffect","successorObligation"];
const G4_HISTORY_KEYS=["eventId","candidateId","fromStatus","toStatus","evidenceRecordIds",
  "reviewer","acceptedVersion","reopenedFromVersion"];
const ALLOWED_EXTRA_EVIDENCE_KEYS=new Set([
  "recordId","candidateId","candidateName","evidenceBasis","recordChannel","claimKind",
  "verificationStatus","ontologyType","sourceId","sourceVersionOrCommit","sourceLocator",
  "sourceArtifactSha256","historicalProblemIds","learnerAttemptIds","learnerContext",
  "linkedRecordIds","claim","sourceTerminology","doesNotEstablish","researcherNote"
]);
const idToken = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
const hypId = /^G4-HYP-[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
const evId = /^G4-EVID-[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
const scopeId = /^G4-SCOPE-[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
const histId = /^G4-EVENT-[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
const tempId = /^G4-TMP-G4-CASE-RAW-[a-zA-Z0-9-]+-[a-zA-Z0-9]+$/;
const transitions = Object.freeze({
  PENDING:["EVIDENCE_HOLD","PROPOSED"],
  EVIDENCE_HOLD:["PROPOSED","CHALLENGED"],
  PROPOSED:["CHALLENGED","REVIEWED_FOR_HANDOFF"],
  CHALLENGED:["EVIDENCE_HOLD","PROPOSED"],
  REVIEWED_FOR_HANDOFF:[]
});

export function createGate4PendingBundle(rawCandidates,gate3Rows) {
  invariant(Array.isArray(rawCandidates) && Array.isArray(gate3Rows),"raw/G3 arrays required");
  invariant(rawCandidates.length === 661 && gate3Rows.length === 661,"661 input candidates and G3 rows required");
  const rowById=new Map(gate3Rows.map(row=>[row.candidateId,row]));
  const cases=rawCandidates.map(raw=>{
    const row=rowById.get(raw.candidateId);
    invariant(row,"missing G3 row for "+raw.candidateId);
    return Object.freeze({
      tribunalCaseId:"G4-CASE-"+raw.candidateId,candidateId:raw.candidateId,
      rawNameSnapshot:raw.candidateName,rawOriginSnapshot:raw.origin,
      rawEvidenceRecordIds:Object.freeze([...raw.evidenceRecordIds]),
      comparisonCandidateIds:Object.freeze([]),comparisonEvidenceRecordIds:Object.freeze([]),
      frozenGate3SnapshotRef:gate3Ref(row),workStatus:"PENDING",
      proposedPrimaryDisposition:null,holdReason:null,scopeClassification:null,
      nextEvidenceOrAction:null,scopeReviewRecordId:null,
      candidateOwnedFacts:Object.freeze([]),comparativeFacts:Object.freeze([]),
      synthesisRecordIds:Object.freeze([]),hypothesis:null,contraryHypotheses:Object.freeze([]),
      triggerOperationOutputAnalysis:null,nonEquivalenceOrCountertest:null,
      relationHypothesisIds:Object.freeze([]),scopeLimitations:Object.freeze([]),
      handoffOwners:Object.freeze([]),reviewerFindings:Object.freeze([]),rationale:null
    });
  });
  return Object.freeze({cases:Object.freeze(cases),relationHypotheses:Object.freeze([]),
    supplementalEvidence:Object.freeze([]),scopeReviews:Object.freeze([]),statusHistory:Object.freeze([])});
}

function validateFacts(facts,known,owner,where) {
  mustArray(facts,where);
  const ids=[];
  for(const f of facts) {
    exact(f,G4_FACT_KEYS,where+" fact");
    invariant(known.has(f.evidenceRecordId),where+" unknown evidence");
    if(owner !== null) invariant(known.get(f.evidenceRecordId).candidateId === owner,where+" borrowed candidate fact");
    someText(f.note,where+" fact.note");
    ids.push(f.evidenceRecordId);
  }
  noDup(ids,where+" facts");
}
function nonemptyArrayOfText(value,where) {
  invariant(stringArray(value),where+" requires unique strings");
}
function validateCase(c,raw,gr,known,relationsById,scopeById) {
  const w="case "+raw.candidateId;
  exact(c,G4_CASE_KEYS,w);
  invariant(c.tribunalCaseId==="G4-CASE-"+raw.candidateId,w+" invalid stable case ID");
  invariant(c.candidateId===raw.candidateId && c.rawNameSnapshot===raw.candidateName &&
    c.rawOriginSnapshot===raw.origin,w+" frozen raw identity mismatch");
  invariant(same(c.rawEvidenceRecordIds,raw.evidenceRecordIds),w+" frozen owned evidence changed");
  invariant(c.frozenGate3SnapshotRef===gate3Ref(gr),w+" G3 digest mismatch");
  enumValue(c.workStatus,G4_STATUSES,w+" status");
  invariant(c.proposedPrimaryDisposition===null||G4_DISPOSITIONS.includes(c.proposedPrimaryDisposition),w+" bad disposition");
  invariant(c.holdReason===null||G4_HOLD_REASONS.includes(c.holdReason),w+" bad holdReason");
  invariant(c.scopeClassification===null||G4_SCOPE.includes(c.scopeClassification),w+" bad scope");
  optionalText(c.nextEvidenceOrAction,w+" next action");
  invariant(c.scopeReviewRecordId===null||scopeById.has(c.scopeReviewRecordId),w+" scopeReviewRecordId unknown");
  if(c.scopeReviewRecordId!==null) invariant(scopeById.get(c.scopeReviewRecordId).candidateIds.includes(c.candidateId),w+" scope review not owned");
  nonemptyArrayOfText(c.comparisonCandidateIds,w+" comparisonCandidateIds");
  nonemptyArrayOfText(c.comparisonEvidenceRecordIds,w+" comparisonEvidenceRecordIds");
  const compared=new Set(c.comparisonCandidateIds);
  invariant(!compared.has(c.candidateId),w+" cannot compare itself");
  for(const id of c.comparisonEvidenceRecordIds) {
    invariant(known.has(id) && compared.has(known.get(id).candidateId),w+" borrowed comparison evidence");
  }
  validateFacts(c.candidateOwnedFacts,known,c.candidateId,w+" owned");
  validateFacts(c.comparativeFacts,known,null,w+" comparative");
  for(const f of c.comparativeFacts)
    invariant(compared.has(known.get(f.evidenceRecordId).candidateId),w+" comparative fact owner not named");
  nonemptyArrayOfText(c.synthesisRecordIds,w+" synthesis IDs");
  for(const id of c.synthesisRecordIds) invariant(known.has(id) && known.get(id).evidenceBasis==="PROJECT_SYNTHESIS",w+" invalid synthesis reference");
  optionalText(c.hypothesis,w+" hypothesis");
  invariant(Array.isArray(c.contraryHypotheses) && c.contraryHypotheses.every(nonempty),w+" contrary hypotheses invalid");
  optionalText(c.triggerOperationOutputAnalysis,w+" operation analysis");
  optionalText(c.nonEquivalenceOrCountertest,w+" countertest");
  nonemptyArrayOfText(c.relationHypothesisIds,w+" relations");
  for(const id of c.relationHypothesisIds)
    invariant(relationsById.has(id) && relationsById.get(id).participantRawCandidateIds.includes(c.candidateId),w+" relation does not include participant");
  invariant(Array.isArray(c.scopeLimitations)&&c.scopeLimitations.every(nonempty),w+" scopeLimitations invalid");
  invariant(Array.isArray(c.reviewerFindings)&&c.reviewerFindings.every(nonempty),w+" reviewerFindings invalid");
  invariant(stringArray(c.handoffOwners) && c.handoffOwners.every(x=>["Gate 5","Gate 8"].includes(x)),w+" handoff owners invalid");
  optionalText(c.rationale,w+" rationale");
  if(c.workStatus==="PENDING"){
    invariant(c.proposedPrimaryDisposition===null && c.holdReason===null &&
      c.scopeClassification===null && c.scopeReviewRecordId===null &&
      c.nextEvidenceOrAction===null && c.hypothesis===null && c.rationale===null &&
      c.relationHypothesisIds.length===0 && c.synthesisRecordIds.length===0 &&
      c.comparisonCandidateIds.length===0 && c.comparisonEvidenceRecordIds.length===0 &&
      c.candidateOwnedFacts.length===0 && c.comparativeFacts.length===0 &&
      c.contraryHypotheses.length===0 && c.scopeLimitations.length===0 &&
      c.reviewerFindings.length===0 && c.handoffOwners.length===0 &&
      c.triggerOperationOutputAnalysis===null && c.nonEquivalenceOrCountertest===null,
      w+" PENDING must remain unadjudicated");
  } else if(c.workStatus==="EVIDENCE_HOLD"){
    invariant(c.proposedPrimaryDisposition===null,w+" held primary must be null");
    invariant(G4_HOLD_REASONS.includes(c.holdReason) && c.holdReason!=="LATER_GATE_CANONICAL_CHOICE",w+" cannot evade hold via later gate");
    invariant(c.scopeClassification!=="LATER_GATE_ONLY" && nonempty(c.nextEvidenceOrAction),w+" held action/scope invalid");
  } else if(c.workStatus==="CHALLENGED"){
    invariant(c.reviewerFindings.length>0 && c.contraryHypotheses.length>0,w+" challenged case lacks objections");
  } else {
    invariant(c.proposedPrimaryDisposition!==null && nonempty(c.rationale) &&
      nonempty(c.hypothesis) && c.candidateOwnedFacts.length+c.comparativeFacts.length>0 &&
      c.synthesisRecordIds.length>0,w+" proposed/reviewed decision lacks review evidence");
    if(c.workStatus==="REVIEWED_FOR_HANDOFF"){
      invariant(c.scopeReviewRecordId!==null && c.scopeClassification==="LATER_GATE_ONLY" && c.handoffOwners.length>0 &&
        c.reviewerFindings.length>0 && c.holdReason===null,
        w+" handoff needs independently verified downstream-only scope");
    }
  }
}
function validateRelation(r,known,caseById,hypById) {
  exact(r,G4_RELATION_KEYS,"relation");
  invariant(hypId.test(r.hypothesisId),"relation invalid hypothesisId");
  enumValue(r.relationKind,["MERGE","SPLIT","PARENT_CHILD","COMBO"],r.hypothesisId+" kind");
  nonemptyArrayOfText(r.participantRawCandidateIds,r.hypothesisId+" participants");
  invariant(r.participantRawCandidateIds.every(id=>caseById.has(id)),r.hypothesisId+" missing participant");
  nonemptyArrayOfText(r.localComponentHandles,r.hypothesisId+" handles");
  invariant(Array.isArray(r.componentDefinitions),r.hypothesisId+" componentDefinitions invalid");
  invariant(r.componentDefinitions.length===r.localComponentHandles.length,r.hypothesisId+" component count mismatch");
  nonemptyArrayOfText(r.conflictsWithHypothesisIds,r.hypothesisId+" conflicts");
  invariant(!r.conflictsWithHypothesisIds.includes(r.hypothesisId),r.hypothesisId+" self-conflict");
  for(const id of r.conflictsWithHypothesisIds) invariant(hypById.has(id),r.hypothesisId+" dangling conflict");
  invariant(r.relationDirection===null||plain(r.relationDirection),r.hypothesisId+" direction invalid");
  if(r.relationDirection!==null) {
    exact(r.relationDirection,G4_DIRECTION_KEYS,r.hypothesisId+" direction");
    enumValue(r.relationDirection.kind,["PARENT_TO_CHILD","SOURCE_TO_COMPONENTS","COMPOSED_FROM"],r.hypothesisId+" direction kind");
    someText(r.relationDirection.sourceId,r.hypothesisId+" direction source");
    nonemptyArrayOfText(r.relationDirection.targetIds,r.hypothesisId+" targetIds");
  }
  exact(r.mathematicalClaim,G4_CLAIM_KEYS,r.hypothesisId+" claim");
  someText(r.mathematicalClaim.description,r.hypothesisId+" claim text");
  enumValue(r.mathematicalClaim.comparisonScope,["FULL_INTENDED_DOMAINS","NOT_EQUIVALENCE_CLAIM"],r.hypothesisId+" comparison scope");
  optionalText(r.mathematicalClaim.separatingWitness,r.hypothesisId+" witness");
  optionalText(r.mathematicalClaim.coupling,r.hypothesisId+" coupling");
  mustArray(r.mathematicalClaim.intendedDomains,r.hypothesisId+" intended domains");
  const domains=new Map();
  for(const dom of r.mathematicalClaim.intendedDomains){
    exact(dom,G4_DOMAIN_KEYS,r.hypothesisId+" domain");
    invariant(r.participantRawCandidateIds.includes(dom.candidateId)&&!domains.has(dom.candidateId),r.hypothesisId+" domain ownership/duplicate");
    someText(dom.domain,r.hypothesisId+" domain text");
    nonemptyArrayOfText(dom.evidenceRecordIds,r.hypothesisId+" domain evidence");
    for(const id of dom.evidenceRecordIds)
      invariant(known.has(id) && known.get(id).candidateId===dom.candidateId,r.hypothesisId+" borrowed domain support");
    domains.set(dom.candidateId,dom);
  }
  for(const d of ["supportEvidenceRecordIds","synthesisRecordIds","counterEvidenceRecordIds"])
    nonemptyArrayOfText(r[d],r.hypothesisId+" "+d);
  invariant(r.supportEvidenceRecordIds.length>0 && r.synthesisRecordIds.length>0,r.hypothesisId+" no support/synthesis");
  for(const id of [...r.supportEvidenceRecordIds,...r.counterEvidenceRecordIds])
    invariant(known.has(id) && r.participantRawCandidateIds.includes(known.get(id).candidateId),
      r.hypothesisId+" evidence not owned by participants");
  for(const id of r.synthesisRecordIds) invariant(known.has(id) && known.get(id).evidenceBasis==="PROJECT_SYNTHESIS",r.hypothesisId+" non-synthesis record");
  someText(r.nonEquivalenceOrCountertest,r.hypothesisId+" non-equivalence test");
  someText(r.limitationsAndScope,r.hypothesisId+" limitations");
  enumValue(r.reviewStatus,["PROPOSED","CHALLENGED","REVIEWED_FOR_HANDOFF"],r.hypothesisId+" status");
  invariant(r.laterGateOwner===(r.relationKind==="COMBO"?"Gate 8":"Gate 5"),r.hypothesisId+" wrong gate owner");
  for(const id of r.participantRawCandidateIds)
    invariant(caseById.get(id).relationHypothesisIds.includes(r.hypothesisId),r.hypothesisId+" asymmetric participant reference");
  for(const id of r.conflictsWithHypothesisIds)
    invariant(hypById.get(id).conflictsWithHypothesisIds.includes(r.hypothesisId) && r.reviewStatus==="CHALLENGED" &&
      hypById.get(id).reviewStatus==="CHALLENGED",r.hypothesisId+" unresolved unchallenged conflict");
  for(const def of r.componentDefinitions){
    exact(def,G4_COMPONENT_KEYS,r.hypothesisId+" component");
    invariant(tempId.test(def.handle) && def.handle.startsWith("G4-TMP-G4-CASE-"+def.ownerRawCandidateId+"-"),r.hypothesisId+" invalid handle ownership");
    invariant(r.localComponentHandles.includes(def.handle),r.hypothesisId+" unlisted handle");
    invariant(r.participantRawCandidateIds.includes(def.ownerRawCandidateId),r.hypothesisId+" missing component owner");
    for(const k of ["definition","scope","operation"])someText(def[k],r.hypothesisId+" "+k);
  }
  if(r.relationKind==="MERGE"){
    invariant(r.participantRawCandidateIds.length>=2 && r.localComponentHandles.length===0 &&
      r.relationDirection===null && r.mathematicalClaim.comparisonScope==="FULL_INTENDED_DOMAINS" &&
      r.mathematicalClaim.intendedDomains.length===r.participantRawCandidateIds.length &&
      r.participantRawCandidateIds.every(id=>domains.has(id)),r.hypothesisId+" full intended domains required; overlap-only MERGE forbidden");
    invariant(same(r.participantRawCandidateIds,[...r.participantRawCandidateIds].sort()),r.hypothesisId+" MERGE participants must be sorted");
  } else if(r.relationKind==="PARENT_CHILD"){
    invariant(r.participantRawCandidateIds.length===2 && r.relationDirection?.kind==="PARENT_TO_CHILD" &&
      r.relationDirection.targetIds.length===1 && r.relationDirection.sourceId!==r.relationDirection.targetIds[0] &&
      r.participantRawCandidateIds.includes(r.relationDirection.sourceId) &&
      r.participantRawCandidateIds.includes(r.relationDirection.targetIds[0]),r.hypothesisId+" invalid directional containment");
  } else if(r.relationKind==="SPLIT"){
    invariant(r.localComponentHandles.length>=2 && r.relationDirection?.kind==="SOURCE_TO_COMPONENTS" &&
      r.relationDirection.targetIds.length===r.localComponentHandles.length &&
      same([...r.relationDirection.targetIds].sort(),[...r.localComponentHandles].sort()) &&
      r.participantRawCandidateIds.includes(r.relationDirection.sourceId),r.hypothesisId+" incomplete split");
  } else {
    invariant(r.relationDirection?.kind==="COMPOSED_FROM" &&
      r.relationDirection.targetIds.length>=2 && nonempty(r.mathematicalClaim.coupling) &&
      r.relationDirection.targetIds.every(id=>r.participantRawCandidateIds.includes(id)||r.localComponentHandles.includes(id)),
      r.hypothesisId+" COMBO requires specific coupling and components");
  }
  if(r.reviewStatus==="REVIEWED_FOR_HANDOFF")
    invariant(r.participantRawCandidateIds.every(id=>caseById.get(id).workStatus==="REVIEWED_FOR_HANDOFF"),r.hypothesisId+" reviewed relation has unfinished owner case");
}

export function validateGate4Bundle(bundle,rawCandidates,rawEvidence,gate3Rows,{graduation=false}={}) {
  exact(bundle,G4_BUNDLE_KEYS,"bundle");
  for(const k of G4_BUNDLE_KEYS)mustArray(bundle[k],k);
  invariant(rawCandidates.length===661&&gate3Rows.length===661&&rawEvidence.length===661,
    "frozen 661 input population required");
  invariant(bundle.cases.length===661,"661 cases required; no defaults or hidden omissions");
  const rawById=new Map(rawCandidates.map(x=>[x.candidateId,x]));
  const grById=new Map(gate3Rows.map(x=>[x.candidateId,x]));
  const caseById=new Map(bundle.cases.map(x=>[x.candidateId,x]));
  invariant(rawById.size===661&&grById.size===661&&caseById.size===661,"duplicate raw/G3/case ID");
  invariant([...caseById.keys()].every(id=>rawById.has(id)&&grById.has(id)), "unknown raw/G3/case ID");
  const known=new Map(rawEvidence.map(e=>[e.recordId,e]));
  invariant(known.size===661,"duplicate frozen evidence record ID");
  for(const raw of rawCandidates){
    invariant(raw.evidenceRecordIds.every(id=>known.get(id)?.candidateId===raw.candidateId),
      "Gate2 evidence ownership mismatch "+raw.candidateId);
    invariant(grById.get(raw.candidateId).candidateName===raw.candidateName &&
      grById.get(raw.candidateId).origin===raw.origin, "Gate3 identity mismatch "+raw.candidateId);
  }
  for(const e of bundle.supplementalEvidence){
    invariant(plain(e)&&Object.keys(e).every(k=>ALLOWED_EXTRA_EVIDENCE_KEYS.has(k)),"unrecognized supplemental evidence key");
    invariant(evId.test(e.recordId)&&!known.has(e.recordId),"supplemental evidence ID invalid/colliding");
    invariant(caseById.has(e.candidateId),"supplemental evidence candidate missing");
    validateGate1EvidenceRecord(e);
    invariant(e.recordChannel!=="BATTLE","Gate4 supplemental evidence cannot fabricate or replace frozen official Battle claims");
    invariant(nonempty(e.doesNotEstablish) && nonempty(e.claim),"supplemental evidence missing limitation/claim");
    if(e.evidenceBasis==="PROJECT_SYNTHESIS"){
      invariant(e.recordChannel==="NONE"&&stringArray(e.linkedRecordIds)&&e.linkedRecordIds.length>0,
        "synthesis must link specific supporting evidence");
      for(const id of e.linkedRecordIds)
        invariant(known.has(id) && known.get(id).evidenceBasis!=="SOURCE_LEAD",
          "synthesis linked support missing or unsupported lead");
    }
    known.set(e.recordId,e);
  }
  const scopes=new Map(),relations=new Map(),handleOwner=new Map();
  for(const p of bundle.scopeReviews){
    exact(p,G4_SCOPE_KEYS,"scope review");
    invariant(scopeId.test(p.scopeReviewRecordId)&&!scopes.has(p.scopeReviewRecordId),"duplicate/invalid scope review");
    invariant(stringArray(p.candidateIds)&&p.candidateIds.length>0&&p.candidateIds.every(id=>caseById.has(id)),"scope review participant missing");
    enumValue(p.scopeClassification,G4_SCOPE,"scope review class");
    for(const k of ["question","reviewer","decision","acceptedVersion","permittedProceduralEffect","successorObligation"])someText(p[k],"scope review "+k);
    invariant(/^[0-9a-f]{40}$/.test(p.acceptedVersion),"scope review must cite exact reviewed commit SHA");
    invariant(!/waiv|exempt|override.*661|skip.*treatment/i.test(p.permittedProceduralEffect),"scope review cannot waive Gate4 treatment");
    scopes.set(p.scopeReviewRecordId,p);
  }
  for(const r of bundle.relationHypotheses){
    invariant(plain(r)&&hypId.test(r.hypothesisId)&&!relations.has(r.hypothesisId),"relation ID duplicate/invalid");
    relations.set(r.hypothesisId,r);
  }
  for(const c of bundle.cases){
    validateCase(c,rawById.get(c.candidateId),grById.get(c.candidateId),known,relations,scopes);
  }
  for(const r of bundle.relationHypotheses) {
    validateRelation(r,known,caseById,relations);
    for(const def of r.componentDefinitions){
      if(handleOwner.has(def.handle))invariant(handleOwner.get(def.handle)===def.ownerRawCandidateId,
        r.hypothesisId+" foreign/unowned handle collision");
      else handleOwner.set(def.handle,def.ownerRawCandidateId);
    }
    for(const handle of r.localComponentHandles)invariant(handleOwner.has(handle),"unresolved handle");
  }
  // Constrained syntactic cross-hypothesis checks. True mathematical equivalence
  // and its counterexamples cannot be inferred from strings and need a reviewer.
  const active=bundle.relationHypotheses.filter(r=>r.reviewStatus==="REVIEWED_FOR_HANDOFF");
  const directional=new Map();
  for(const r of active.filter(x=>x.relationKind==="PARENT_CHILD")){
    const from=r.relationDirection.sourceId,to=r.relationDirection.targetIds[0];
    invariant(!directional.has(to+"->"+from),"unchallenged reversed parent-child");
    directional.set(from+"->"+to,r.hypothesisId);
  }
  function visit(x,chain=new Set()){
    invariant(!chain.has(x),"unchallenged containment cycle");
    const next=new Set(chain);next.add(x);
    for(const k of directional.keys())if(k.startsWith(x+"->"))visit(k.slice(x.length+2),next);
  }
  for(const k of directional.keys())visit(k.split("->")[0]);
  const historyByCase=new Map();
  const eventIDs=new Set();
  for(const e of bundle.statusHistory){
    exact(e,G4_HISTORY_KEYS,"status event");
    invariant(histId.test(e.eventId)&&!eventIDs.has(e.eventId),"invalid or duplicate status history event");
    eventIDs.add(e.eventId);
    invariant(caseById.has(e.candidateId),"status event unknown candidate");
    enumValue(e.toStatus,G4_STATUSES,"event toStatus");
    invariant(e.fromStatus===null||G4_STATUSES.includes(e.fromStatus),"event fromStatus");
    invariant(stringArray(e.evidenceRecordIds)&&e.evidenceRecordIds.every(id=>known.has(id)),"event evidence invalid");
    someText(e.reviewer,"event reviewer");
    someText(e.acceptedVersion,"event version");
    optionalText(e.reopenedFromVersion,"event reopen");
    const seq=historyByCase.get(e.candidateId)||[];
    if(seq.length===0)invariant(e.fromStatus==="PENDING","first status event must start at PENDING");
    else invariant(e.fromStatus===seq[seq.length-1].toStatus,"history transition broken");
    if(e.fromStatus==="REVIEWED_FOR_HANDOFF")
      invariant(nonempty(e.reopenedFromVersion),"terminal status requires explicit versioned reopen");
    else invariant(transitions[e.fromStatus]?.includes(e.toStatus),"illegal status transition");
    seq.push(e);historyByCase.set(e.candidateId,seq);
  }
  for(const c of bundle.cases){
    const seq=historyByCase.get(c.candidateId)||[];
    invariant((seq.length===0&&c.workStatus==="PENDING")||
      (seq.length>0&&seq[seq.length-1].toStatus===c.workStatus),"case state not supported by append-only history");
  }
  if(graduation){
    invariant(bundle.cases.every(c=>c.workStatus==="REVIEWED_FOR_HANDOFF" &&
      c.proposedPrimaryDisposition!==null && c.holdReason===null &&
      c.scopeClassification==="LATER_GATE_ONLY" && c.reviewerFindings.length>0),
      "full graduation requires 661 completed treatments; no holds or waivers");
    invariant(bundle.relationHypotheses.every(r=>r.reviewStatus==="REVIEWED_FOR_HANDOFF"),
      "graduation blocked by unresolved relation");
  }
  return Object.freeze({
    cases:bundle.cases.length,pending:bundle.cases.filter(c=>c.workStatus==="PENDING").length,
    held:bundle.cases.filter(c=>c.workStatus==="EVIDENCE_HOLD").length,
    challenged:bundle.cases.filter(c=>c.workStatus==="CHALLENGED").length,
    completed:bundle.cases.filter(c=>c.workStatus==="REVIEWED_FOR_HANDOFF").length,
    relations:bundle.relationHypotheses.length,scopeReviews:bundle.scopeReviews.length,graduation
  });
}
