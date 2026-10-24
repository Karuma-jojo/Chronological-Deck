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
// Deterministic normalization for review identities and immutable content pins:
// plain-object property insertion order is never evidence of mathematical difference.
function stableValue(x) {
  if(Array.isArray(x))return x.map(stableValue);
  if(plain(x))return Object.fromEntries(
    Object.keys(x).sort().map(k=>[k,stableValue(x[k])]));
  return x;
}
const stableJson = obj => JSON.stringify(stableValue(obj));
export const gate4ContentDigest = obj =>
  createHash("sha256").update(stableJson(obj)).digest("hex");
// Only the mathematically claim-defining fields belong in a hypothesis identity.
// Evidence/reviewer/status metadata are attributes of ONE shared record, not a
// reason to invent another authoritative ID for the same exact proposed claim.
// Temporary component names are alpha-bound review handles, not part of a
// mathematical claim's identity. Normalize every handle by the mathematical
// content it denotes, including owner, definition, scope, and operation.
const componentMeaning = def => ({
  ownerRawCandidateId:def.ownerRawCandidateId,
  definition:def.definition,scope:def.scope,operation:def.operation
});
export function gate4RelationClaimIdentity(r) {
  const claim=r.mathematicalClaim;
  const components=new Map(r.componentDefinitions.map(def=>[def.handle,componentMeaning(def)]));
  const normalizedComponents=[...components.values()].sort((a,b)=>
    stableJson(a).localeCompare(stableJson(b)));
  const normalizedTarget=id => components.has(id)
    ? {role:"LOCAL_COMPONENT",meaning:components.get(id)}
    : {role:"RAW_CANDIDATE",candidateId:id};
  // An SPLIT is a set of source-owned decomposed components, not an ordered
  // series. COMBO IS ordered: A then B may differ from B then A.
  const targets=r.relationDirection?.targetIds.map(normalizedTarget)||[];
  const normalizedTargets=r.relationKind==="SPLIT"
    ? [...targets].sort((a,b)=>stableJson(a).localeCompare(stableJson(b)))
    : targets;
  return stableJson({
    relationKind:r.relationKind,
    participants:[...r.participantRawCandidateIds].sort(),
    direction:r.relationDirection===null ? null : {
      kind:r.relationDirection.kind,
      sourceId:r.relationDirection.sourceId,
      targets:normalizedTargets
    },
    components:normalizedComponents,
    mathematicalClaim:{
      description:claim.description,
      comparisonScope:claim.comparisonScope,
      intendedDomains:[...claim.intendedDomains]
        .map(d=>({candidateId:d.candidateId,domain:d.domain}))
        .sort((a,b)=>a.candidateId.localeCompare(b.candidateId)),
      separatingWitness:claim.separatingWitness,
      coupling:claim.coupling
    }
  });
}
// Protect the CONTENT of every evidence record relied upon by a terminal
// treatment, not just the record IDs. Follow synthesis-linked dependencies
// transitively. Frozen Gate-2 records remain anchored to the accepted ore;
// every Gate-4 supplemental record is included as an exact stable snapshot.
function gate4EvidenceClosure(rootIds,evidenceById) {
  invariant(evidenceById instanceof Map,"terminal digest requires full frozen/supplemental evidence index");
  const visited=new Set(),inProgress=new Set(),collected=new Map();
  const visit=id=>{
    invariant(nonempty(id),"terminal evidence closure contains invalid reference");
    if(visited.has(id))return;
    invariant(!inProgress.has(id),"terminal evidence dependency cycle "+id);
    const e=evidenceById.get(id);
    invariant(e && e.recordId===id,"terminal evidence dependency missing: "+id);
    inProgress.add(id);
    for(const child of e.linkedRecordIds||[]){
      invariant(nonempty(child),"terminal evidence has invalid linked dependency: "+id);
      visit(child);
    }
    inProgress.delete(id);
    visited.add(id);
    collected.set(id,e);
  };
  for(const id of rootIds)visit(id);
  return [...collected.entries()].sort(([a],[b])=>a.localeCompare(b))
    .map(([recordId,record])=>({recordId,record}));
}
const gate4CaseEvidenceRoots=c=>[
  ...c.rawEvidenceRecordIds,...c.comparisonEvidenceRecordIds,
  ...c.candidateOwnedFacts.map(f=>f.evidenceRecordId),
  ...c.comparativeFacts.map(f=>f.evidenceRecordId),
  ...c.synthesisRecordIds
];
const gate4RelationEvidenceRoots=r=>[
  ...r.supportEvidenceRecordIds,...r.synthesisRecordIds,
  ...r.counterEvidenceRecordIds,
  ...r.mathematicalClaim.intendedDomains.flatMap(dom=>dom.evidenceRecordIds)
];
export function gate4TerminalCaseDigest(c,relationById,evidenceById) {
  invariant(relationById instanceof Map,"terminal case digest requires relation index");
  const related=c.relationHypothesisIds.map(id=>{
    const r=relationById.get(id);
    if(!r)throw Error("Gate4: terminal case references missing relation "+id);
    return r;
  }).sort((a,b)=>a.hypothesisId.localeCompare(b.hypothesisId));
  const evidence=gate4EvidenceClosure([
    ...gate4CaseEvidenceRoots(c),
    ...related.flatMap(gate4RelationEvidenceRoots)
  ],evidenceById);
  return gate4ContentDigest({case:c,related,evidence});
}
export function gate4TerminalRelationDigest(r,evidenceById) {
  return gate4ContentDigest({relation:r,
    evidence:gate4EvidenceClosure(gate4RelationEvidenceRoots(r),evidenceById)
  });
}
// Independently accepted historical supplemental-evidence manifests freeze the
// ENTIRE previously accepted record-ID set and exact contents at that version.
// A versioned reopening can add new IDs, never rewrite/delete accepted old IDs.
// The caller must source these manifests from immutable independent approvals.
export function gate4HistoricalEvidenceDigest(recordIds,evidenceById) {
  invariant(Array.isArray(recordIds) && stringArray(recordIds),
    "historical evidence manifest requires unique record IDs");
  invariant(recordIds.length>0 && recordIds.every(id=>/^G4-EVID-/.test(id)),
    "historical evidence manifest must contain accepted Gate4 supplemental IDs");
  invariant(evidenceById instanceof Map,"historical evidence manifest requires evidence index");
  const sorted=[...recordIds].sort();
  const records=sorted.map(id=>{
    const record=evidenceById.get(id);
    invariant(record && record.recordId===id,
      "previously accepted historical evidence missing: "+id);
    return {recordId:id,record};
  });
  return gate4ContentDigest(records);
}
export const gate3Ref = row => "G3-SHA256-" + sha256(row);

export const G4_DISPOSITIONS = Object.freeze(["ACCEPT","MERGE","SPLIT","PARENT_CHILD","COMBO","REJECT"]);
export const G4_STATUSES = Object.freeze(["PENDING","EVIDENCE_HOLD","PROPOSED","CHALLENGED","REVIEWED_FOR_HANDOFF"]);
export const G4_HOLD_REASONS = Object.freeze(["SOURCE_IDENTITY_GAP","THIN_CANDIDATE_EVIDENCE","CONFLICTING_EVIDENCE","UPSTREAM_DEFECT","LATER_GATE_CANONICAL_CHOICE"]);
export const G4_SCOPE = Object.freeze(["GATE4_OWNED","UPSTREAM_AMENDMENT_REQUIRED","LATER_GATE_ONLY"]);
export const G4_CASE_KEYS = Object.freeze([
  "tribunalCaseId","candidateId","rawNameSnapshot","rawOriginSnapshot","rawEvidenceRecordIds",
  "comparisonCandidateIds","comparisonEvidenceRecordIds","frozenGate3SnapshotRef",
  "workStatus","proposedPrimaryDisposition","holdReason","scopeClassification",
  "nextEvidenceOrAction","holdQuestion","missingEvidence","accountableOwner","scopeReviewRecordId","candidateOwnedFacts","comparativeFacts",
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
      nextEvidenceOrAction:null,holdQuestion:null,missingEvidence:null,accountableOwner:null,scopeReviewRecordId:null,
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
function validateCase(c,raw,gr,known,relationsById,scopeById,caseById) {
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
  for(const k of ["holdQuestion","missingEvidence","accountableOwner"]) optionalText(c[k],w+" "+k);
  invariant(c.scopeReviewRecordId===null||scopeById.has(c.scopeReviewRecordId),w+" scopeReviewRecordId unknown");
  if(c.scopeReviewRecordId!==null) invariant(scopeById.get(c.scopeReviewRecordId).candidateIds.includes(c.candidateId) && scopeById.get(c.scopeReviewRecordId).scopeClassification===c.scopeClassification,w+" scope review not owned or different classification");
  nonemptyArrayOfText(c.comparisonCandidateIds,w+" comparisonCandidateIds");
  nonemptyArrayOfText(c.comparisonEvidenceRecordIds,w+" comparisonEvidenceRecordIds");
  const compared=new Set(c.comparisonCandidateIds);
  invariant(!compared.has(c.candidateId),w+" cannot compare itself");
  for(const id of compared)
    invariant(caseById.has(id),w+" unknown comparison candidate "+id);
  for(const id of c.comparisonEvidenceRecordIds) {
    invariant(known.has(id) && compared.has(known.get(id).candidateId),w+" borrowed comparison evidence");
  }
  validateFacts(c.candidateOwnedFacts,known,c.candidateId,w+" owned");
  validateFacts(c.comparativeFacts,known,null,w+" comparative");
  for(const f of c.comparativeFacts)
    invariant(compared.has(known.get(f.evidenceRecordId).candidateId),w+" comparative fact owner not named");
  nonemptyArrayOfText(c.synthesisRecordIds,w+" synthesis IDs");
  for(const id of c.synthesisRecordIds) {
    const e=known.get(id);
    invariant(e && e.evidenceBasis==="PROJECT_SYNTHESIS" && e.candidateId===c.candidateId,
      w+" borrowed or invalid synthesis reference");
    invariant(e.linkedRecordIds.every(ref=>known.has(ref) &&
      (known.get(ref).candidateId===c.candidateId||compared.has(known.get(ref).candidateId))),
      w+" synthesis support borrowed without named comparison owner");
  }
  optionalText(c.hypothesis,w+" hypothesis");
  invariant(Array.isArray(c.contraryHypotheses) && c.contraryHypotheses.every(nonempty),w+" contrary hypotheses invalid");
  optionalText(c.triggerOperationOutputAnalysis,w+" operation analysis");
  optionalText(c.nonEquivalenceOrCountertest,w+" countertest");
  // A compared candidate can be supported by another candidate's owned evidence,
  // by a documented comparative fact, or by an exact shared relation. A hold may
  // instead document an explicit, not-yet-evidenced comparison work item.
  // No evidence may silently migrate into this candidate's ownership.
  for(const comparedId of compared){
    const evidenceContext=[...c.comparisonEvidenceRecordIds,
      ...c.comparativeFacts.map(f=>f.evidenceRecordId)].some(id=>
      known.get(id)?.candidateId===comparedId);
    const relationContext=c.relationHypothesisIds.some(id=>{
      const r=relationsById.get(id);
      return r?.participantRawCandidateIds.includes(c.candidateId) &&
        r.participantRawCandidateIds.includes(comparedId);
    });
    const synthesisContext=c.synthesisRecordIds.some(id=>
      known.get(id)?.linkedRecordIds?.some(ref=>known.get(ref)?.candidateId===comparedId));
    const heldActionContext=c.workStatus==="EVIDENCE_HOLD" &&
      nonempty(c.nextEvidenceOrAction) &&
      c.nextEvidenceOrAction.includes(comparedId);
    invariant(evidenceContext||relationContext||synthesisContext||heldActionContext,
      w+" comparison candidate lacks explicit supporting or held-research context: "+comparedId);
  }
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
      c.nextEvidenceOrAction===null && c.holdQuestion===null && c.missingEvidence===null &&
      c.accountableOwner===null && c.hypothesis===null && c.rationale===null &&
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
    invariant(["GATE4_OWNED","UPSTREAM_AMENDMENT_REQUIRED"].includes(c.scopeClassification) &&
      (c.holdReason!=="CONFLICTING_EVIDENCE" || c.scopeClassification==="GATE4_OWNED") &&
      (!["SOURCE_IDENTITY_GAP","UPSTREAM_DEFECT"].includes(c.holdReason) ||
        c.scopeClassification==="UPSTREAM_AMENDMENT_REQUIRED") &&
      nonempty(c.nextEvidenceOrAction) && nonempty(c.holdQuestion) &&
      nonempty(c.missingEvidence) && nonempty(c.accountableOwner) &&
      c.reviewerFindings.length>0 && c.scopeReviewRecordId!==null,
      w+" held action/scope, question, accountable owner or review provenance invalid");
  } else if(c.workStatus==="CHALLENGED"){
    invariant(c.reviewerFindings.length>0 && c.contraryHypotheses.length>0,w+" challenged case lacks objections");
  } else {
    invariant(c.proposedPrimaryDisposition!==null && nonempty(c.rationale) &&
      nonempty(c.hypothesis) && c.candidateOwnedFacts.length+c.comparativeFacts.length>0 &&
      c.synthesisRecordIds.length>0 && c.candidateOwnedFacts.length>0,w+" proposed/reviewed decision lacks review evidence");
    if(["MERGE","SPLIT","PARENT_CHILD","COMBO"].includes(c.proposedPrimaryDisposition)){
      invariant(c.relationHypothesisIds.some(id=>{
        const r=relationsById.get(id);
        return r && r.relationKind===c.proposedPrimaryDisposition &&
          r.reviewStatus!=="CHALLENGED" && r.participantRawCandidateIds.includes(c.candidateId) &&
          (!["SPLIT","COMBO"].includes(c.proposedPrimaryDisposition) ||
            r.relationDirection?.sourceId===c.candidateId);

      }),w+" relational primary lacks matching authoritative nonchallenged hypothesis");
    }
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
  for(const id of r.synthesisRecordIds) invariant(known.has(id) && known.get(id).evidenceBasis==="PROJECT_SYNTHESIS" &&
    r.participantRawCandidateIds.includes(known.get(id).candidateId) &&
    known.get(id).linkedRecordIds.every(ref=>known.has(ref) &&
      r.participantRawCandidateIds.includes(known.get(ref).candidateId)),
    r.hypothesisId+" synthesis source outside participant set");
  someText(r.nonEquivalenceOrCountertest,r.hypothesisId+" non-equivalence test");
  someText(r.limitationsAndScope,r.hypothesisId+" limitations");
  enumValue(r.reviewStatus,["PROPOSED","CHALLENGED","REVIEWED_FOR_HANDOFF"],r.hypothesisId+" status");
  invariant(r.laterGateOwner===(r.relationKind==="COMBO"?"Gate 8":"Gate 5"),r.hypothesisId+" wrong gate owner");
  for(const id of r.participantRawCandidateIds)
    invariant(caseById.get(id).relationHypothesisIds.includes(r.hypothesisId),r.hypothesisId+" asymmetric participant reference");
  for(const id of r.conflictsWithHypothesisIds)
    invariant(hypById.get(id).conflictsWithHypothesisIds.includes(r.hypothesisId) && r.reviewStatus==="CHALLENGED" &&
      hypById.get(id).reviewStatus==="CHALLENGED",r.hypothesisId+" unresolved unchallenged conflict");
  const relationHandles=new Set();
  for(const def of r.componentDefinitions){
    invariant(!relationHandles.has(def.handle),r.hypothesisId+" duplicate local component definition");
    relationHandles.add(def.handle);
    exact(def,G4_COMPONENT_KEYS,r.hypothesisId+" component");
    invariant(tempId.test(def.handle) && def.handle.startsWith("G4-TMP-G4-CASE-"+def.ownerRawCandidateId+"-"),r.hypothesisId+" invalid handle ownership");
    invariant(r.localComponentHandles.includes(def.handle),r.hypothesisId+" unlisted handle");
    invariant(r.participantRawCandidateIds.includes(def.ownerRawCandidateId),r.hypothesisId+" missing component owner");
    for(const k of ["definition","scope","operation"])someText(def[k],r.hypothesisId+" "+k);
  }
  invariant(relationHandles.size===r.localComponentHandles.length &&
    r.localComponentHandles.every(id=>relationHandles.has(id)),r.hypothesisId+" component handle-definition bijection");
  if(r.relationKind==="SPLIT"){
    const declared=new Set(r.componentDefinitions.map(def=>stableJson(componentMeaning(def))));
    invariant(declared.size===r.componentDefinitions.length,
      r.hypothesisId+" SPLIT has duplicate mathematical component meanings under different handles");
  }
  if(r.relationKind==="MERGE"){
    // Equivalence-group participants normally route MERGE, unless another independently
    // evidenced higher-priority proposal is under active challenge. Do not reject
    // secondary hypotheses of a different kind solely for not being primary.
    if(r.reviewStatus==="REVIEWED_FOR_HANDOFF")for(const id of r.participantRawCandidateIds)
      invariant(caseById.get(id).proposedPrimaryDisposition==="MERGE",
        r.hypothesisId+" reviewed MERGE requires MERGE primary in every case");
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
      r.participantRawCandidateIds.includes(r.relationDirection.sourceId) &&
      r.componentDefinitions.every(def=>def.ownerRawCandidateId===r.relationDirection.sourceId),
      r.hypothesisId+" incomplete split or component not owned by split source");
  } else {
    invariant(r.relationDirection?.kind==="COMPOSED_FROM" &&
      r.participantRawCandidateIds.includes(r.relationDirection.sourceId) &&
      r.relationDirection.targetIds.length>=2 && nonempty(r.mathematicalClaim.coupling) &&
      r.relationDirection.targetIds.every(id=>r.participantRawCandidateIds.includes(id)||r.localComponentHandles.includes(id)),
      r.hypothesisId+" COMBO requires specific coupling and components");
  }
  if(r.reviewStatus==="REVIEWED_FOR_HANDOFF")
    invariant(r.participantRawCandidateIds.every(id=>
      caseById.get(id).workStatus==="REVIEWED_FOR_HANDOFF" &&
      caseById.get(id).handoffOwners.includes(r.laterGateOwner)),
      r.hypothesisId+" reviewed relation missing completed participants or downstream handoff owner");
}

export function validateGate4Bundle(bundle,rawCandidates,rawEvidence,gate3Rows,{
  graduation=false,
  // External, independently accepted immutable attestation registry; never obtain
  // it from cases/scopeReviews themselves. Keys are review IDs; values are SHA-256
  // digests of exact approved scopeReview JSON. Missing approvals fail closed.
  trustedScopeReviews=null,
  // Map accepted historical commit -> externally pinned {eventsCount,sha256}
  // over the append-only statusHistory prefix. Never build pins from current input.
  trustedStatusHistoryPrefixes=null,
  // Two independent trust roots. Entries must be loaded from *previously
  // accepted immutable review artifacts*, NOT computed from the candidate
  // bundle under inspection:
  //   trustedTerminalCases: Map<caseId,{acceptedVersion,sha256}>
  //   trustedTerminalRelations: Map<hypothesisId,{acceptedVersion,sha256}>
  trustedTerminalCases=null,
  trustedTerminalRelations=null,
  // Immutable, independently accepted *complete* supplemental-evidence
  // manifests for every previously terminal version that is later reopened:
  // Map<acceptedVersion,{acceptedVersion,evidenceRecordIds:string[],sha256:string}>
  // Registry membership and completeness must be authenticated externally.
  // Evidence IDs accepted by that version may NEVER be modified or removed,
  // even while all related cases are CHALLENGED, PROPOSED, or held.
  trustedHistoricalEvidenceManifests=null,
}={}) {
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
    invariant(e.candidateName===rawById.get(e.candidateId).candidateName,
      "supplemental evidence candidateName differs from frozen raw candidate");
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
  const scopes=new Map(),relations=new Map(),handleOwner=new Map(),claimFingerprints=new Set();
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
    const fingerprint=gate4RelationClaimIdentity(r);
    invariant(!claimFingerprints.has(fingerprint),"duplicated exact relation claim must share one hypothesis ID");
    claimFingerprints.add(fingerprint);
    relations.set(r.hypothesisId,r);
  }
  for(const c of bundle.cases){
    validateCase(c,rawById.get(c.candidateId),grById.get(c.candidateId),known,relations,scopes,caseById);
    if(c.workStatus==="REVIEWED_FOR_HANDOFF"){
      const p=scopes.get(c.scopeReviewRecordId);
      invariant(trustedScopeReviews instanceof Map && trustedScopeReviews.get(p.scopeReviewRecordId)===sha256(p),
        "independent scope-review certificate missing or does not match approved bytes");
      invariant(p.scopeClassification==="LATER_GATE_ONLY" && /^[0-9a-f]{40}$/.test(p.acceptedVersion),
        "approved scope review must identify a versioned downstream-only claim");
    }
  }
  for(const r of bundle.relationHypotheses) {
    validateRelation(r,known,caseById,relations);
    for(const def of r.componentDefinitions){
      if(handleOwner.has(def.handle))invariant(G4_COMPONENT_KEYS.every(k=>handleOwner.get(def.handle)[k]===def[k]),
        r.hypothesisId+" component definition conflict across relations");
      else handleOwner.set(def.handle,Object.freeze({...def}));
    }
    for(const handle of r.localComponentHandles)invariant(handleOwner.has(handle),"unresolved handle");
  }
  // Constrained syntactic cross-hypothesis checks. True mathematical equivalence
  // and its counterexamples cannot be inferred from strings and need a reviewer.
  const active=bundle.relationHypotheses.filter(r=>r.reviewStatus!=="CHALLENGED");
  const directional=new Map();
  for(const r of active.filter(x=>x.relationKind==="PARENT_CHILD")){
    const from=r.relationDirection.sourceId,to=r.relationDirection.targetIds[0];
    invariant(!directional.has(to+"->"+from),"unchallenged reversed parent-child");
    directional.set(from+"->"+to,r.hypothesisId);
  }
  // Structural transitivity challenge: when same-domain MERGE proposals connect
  // A≈B≈C, an explicitly supported separating witness A≠C (encoded by a
  // proper-containment hypothesis) cannot coexist unchallenged. This detects
  // declared contradictions only; it cannot invent unrecorded mathematical facts.
  const mergeNeighbors=new Map();
  for(const r of active.filter(x=>x.relationKind==="MERGE")){
    const domains=r.mathematicalClaim.intendedDomains;
    const allSame=domains.length===r.participantRawCandidateIds.length &&
      domains.every(d=>d.domain===domains[0]?.domain);
    if(!allSame)continue;
    for(const x of r.participantRawCandidateIds){
      const key=x+"|"+domains[0].domain;
      const old=mergeNeighbors.get(key)||new Set();
      for(const y of r.participantRawCandidateIds)if(y!==x)old.add(y);
      mergeNeighbors.set(key,old);
    }
  }
  const connected=(a,b,domain)=>{
    const seen=new Set([a]),q=[a];
    while(q.length){
      const x=q.shift();
      for(const y of mergeNeighbors.get(x+"|"+domain)||[]){
        if(y===b)return true;
        if(!seen.has(y)){seen.add(y);q.push(y);}
      }
    }
    return false;
  };
  for(const r of active.filter(x=>x.relationKind==="PARENT_CHILD" &&
    nonempty(x.mathematicalClaim.separatingWitness))){
    const [a,b]=r.participantRawCandidateIds;
    const d=r.mathematicalClaim.intendedDomains;
    if(d.length===2&&d.every(x=>x.domain===d[0].domain))
      invariant(!connected(a,b,d[0].domain),"same-scope transitive MERGE contradicted by explicit separating witness; mark hypotheses CHALLENGED");
  }
  function visit(x,chain=new Set()){
    invariant(!chain.has(x),"unchallenged containment cycle");
    const next=new Set(chain);next.add(x);
    for(const k of directional.keys())if(k.startsWith(x+"->"))visit(k.slice(x.length+2),next);
  }
  for(const k of directional.keys())visit(k.split("->")[0]);
  const historyByCase=new Map();
  const eventIDs=new Set();
  for(const [eventIndex,e] of bundle.statusHistory.entries()){
    exact(e,G4_HISTORY_KEYS,"status event");
    invariant(histId.test(e.eventId)&&!eventIDs.has(e.eventId),"invalid or duplicate status history event");
    eventIDs.add(e.eventId);
    invariant(caseById.has(e.candidateId),"status event unknown candidate");
    enumValue(e.toStatus,G4_STATUSES,"event toStatus");
    invariant(e.fromStatus===null||G4_STATUSES.includes(e.fromStatus),"event fromStatus");
    invariant(stringArray(e.evidenceRecordIds)&&e.evidenceRecordIds.every(id=>known.has(id)),"event evidence invalid");
    someText(e.reviewer,"event reviewer");
    invariant(/^[0-9a-f]{40}$/.test(e.acceptedVersion),"event acceptedVersion must be an exact commit SHA");
    optionalText(e.reopenedFromVersion,"event reopen");
    if(e.reopenedFromVersion!==null)
      invariant(/^[0-9a-f]{40}$/.test(e.reopenedFromVersion),"reopenedFromVersion must be an exact commit SHA");
    const seq=historyByCase.get(e.candidateId)||[];
    if(seq.length===0)invariant(e.fromStatus==="PENDING","first status event must start at PENDING");
    else invariant(e.fromStatus===seq[seq.length-1].toStatus,"history transition broken");
    for(const id of e.evidenceRecordIds)
      invariant(known.get(id).candidateId===e.candidateId,"status event borrows another candidate's evidence");
    if(e.fromStatus==="REVIEWED_FOR_HANDOFF"){
      invariant(["EVIDENCE_HOLD","PROPOSED","CHALLENGED"].includes(e.toStatus),
        "terminal reopen must enter substantive review, not terminal again");
      const prev=seq[seq.length-1];
      invariant(e.reopenedFromVersion===prev.acceptedVersion,
        "reopenedFromVersion does not match the previous terminal review");
      const historical=trustedHistoricalEvidenceManifests instanceof Map
        ?trustedHistoricalEvidenceManifests.get(prev.acceptedVersion):null;
      invariant(historical && historical.acceptedVersion===prev.acceptedVersion &&
        Array.isArray(historical.evidenceRecordIds) &&
        /^[0-9a-f]{64}$/.test(historical.sha256) &&
        historical.sha256===gate4HistoricalEvidenceDigest(
          historical.evidenceRecordIds,known),
        "previously accepted historical evidence was changed, deleted or lacks independent manifest");

      const pin=trustedStatusHistoryPrefixes instanceof Map
        ?trustedStatusHistoryPrefixes.get(e.reopenedFromVersion):null;
      invariant(pin && Number.isInteger(pin.eventsCount) && pin.eventsCount>0 &&
        pin.eventsCount<=eventIndex && /^[0-9a-f]{64}$/.test(pin.sha256) &&
        sha256(bundle.statusHistory.slice(0,pin.eventsCount))===pin.sha256 &&
        bundle.statusHistory.slice(0,pin.eventsCount).some(z=>z.candidateId===e.candidateId &&
          z.toStatus==="REVIEWED_FOR_HANDOFF" && z.acceptedVersion===e.reopenedFromVersion),
        "terminal reopen needs an externally pinned accepted prior-history prefix");
    } else {
      invariant(e.reopenedFromVersion===null,"nonterminal event cannot assert reopenedFromVersion");
      invariant(transitions[e.fromStatus]?.includes(e.toStatus),"illegal status transition");
    }
    if(e.fromStatus==="EVIDENCE_HOLD" && ["PROPOSED","CHALLENGED"].includes(e.toStatus)){
      const previously=new Set(seq.flatMap(event=>event.evidenceRecordIds));
      invariant(e.evidenceRecordIds.length>0 &&
        e.evidenceRecordIds.some(id=>id.startsWith("G4-EVID-") &&
          !previously.has(id) && known.get(id)?.candidateId===e.candidateId),
        "leaving evidence hold requires newly cited candidate-owned supplemental evidence");
    }
    seq.push(e);historyByCase.set(e.candidateId,seq);
  }
  for(const c of bundle.cases){
    const seq=historyByCase.get(c.candidateId)||[];
    invariant((seq.length===0&&c.workStatus==="PENDING")||
      (seq.length>0&&seq[seq.length-1].toStatus===c.workStatus),"case state not supported by append-only history");
  }
  // Immutable external terminal snapshots are mandatory for the FIRST
  // accepted handoff as well as subsequent validation. The local status event
  // is only a version reference, never evidence that a reviewer approved bytes.
  for(const c of bundle.cases.filter(x=>x.workStatus==="REVIEWED_FOR_HANDOFF")){
    const seq=historyByCase.get(c.candidateId)||[];
    const accepted=seq.at(-1);
    invariant(accepted?.toStatus==="REVIEWED_FOR_HANDOFF",
      "terminal case requires exact versioned terminal acceptance event");
    const pin=trustedTerminalCases instanceof Map
      ? trustedTerminalCases.get(c.tribunalCaseId):null;
    invariant(pin && /^[0-9a-f]{40}$/.test(pin.acceptedVersion) &&
      /^[0-9a-f]{64}$/.test(pin.sha256) &&
      pin.acceptedVersion===accepted.acceptedVersion &&
      pin.sha256===gate4TerminalCaseDigest(c,relations,known),
      "terminal case content differs from independently accepted snapshot; versioned reopen required");
  }
  for(const r of bundle.relationHypotheses.filter(x=>x.reviewStatus==="REVIEWED_FOR_HANDOFF")){
    const pin=trustedTerminalRelations instanceof Map
      ? trustedTerminalRelations.get(r.hypothesisId):null;
    invariant(pin && /^[0-9a-f]{40}$/.test(pin.acceptedVersion) &&
      /^[0-9a-f]{64}$/.test(pin.sha256) &&
      pin.sha256===gate4TerminalRelationDigest(r,known) &&
      r.participantRawCandidateIds.every(id=>{
        const seq=historyByCase.get(id)||[];
        return seq.at(-1)?.toStatus==="REVIEWED_FOR_HANDOFF" &&
          seq.at(-1).acceptedVersion===pin.acceptedVersion;
      }),
      "terminal relation content differs from independently accepted snapshot; versioned reopen required");
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
