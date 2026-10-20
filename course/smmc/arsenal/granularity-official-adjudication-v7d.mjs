// SMMC Arsenal Gate 3 v7D — consolidated review-only semantic ledger.
// This does NOT imply independent acceptance of the new 48 decisions or authorize
// integration of the 118 official mass rows into the still-blocked v6 classifier.
// Preserves 9 accepted calibration observations and all 92 independently accepted
// (research scope) v7C cases without alteration. Also preserves the 30 old v7B
// mass judgments in the other 26 cases; only their 48 DEFER/null roles are filled.
import { ARSENAL_GATE3_OFFICIAL_ADJUDICATION_V7C } from './granularity-official-adjudication-v7c.mjs';
import { ARSENAL_GATE3_V7D_BATCH_01 } from './granularity-official-adjudication-v7d-batch-01.mjs';
import { ARSENAL_GATE3_V7D_BATCH_02 } from './granularity-official-adjudication-v7d-batch-02.mjs';
const proposals = Object.freeze([...ARSENAL_GATE3_V7D_BATCH_01, ...ARSENAL_GATE3_V7D_BATCH_02]);
const map = new Map(proposals.map(p => [p.candidateId, p]));
if (proposals.length !== 26 || map.size !== 26)
  throw new Error('V7D must cover 26 distinct formerly partially reviewed mass cases');
const observed = new Set();
export const ARSENAL_GATE3_OFFICIAL_ADJUDICATION_V7D = Object.freeze(
  ARSENAL_GATE3_OFFICIAL_ADJUDICATION_V7C.map(base => {
    const fill = map.get(base.candidateId);
    if (!fill) return base;
    observed.add(base.candidateId);
    if (base.frozenCalibration || base.overallDisposition !== 'REVISE_OR_SUPPORT_BUILDER_PROPOSAL')
      throw new Error('V7D cannot change protected or already-complete case: '+base.candidateId);
    const newRoles = {};
    for (const role of ['trigger','output','context']) {
      if (!Object.hasOwn(fill.roles,role)) continue;
      if (base[role].boundaryDecision !== null || base[role].reviewDisposition !== 'DEFER')
        throw new Error('V7D attempted to override existing role: '+base.candidateId+'/'+role);
      const p = fill.roles[role];
      const source = p.witness === null ? null :
        base.sourceClaim.includes(p.witness) ? 'ACCEPTED_CLAIM' :
        base.candidateName.includes(p.witness) ? 'RAW_EXPRESSION' : 'UNSUPPORTED';
      if (source === 'UNSUPPORTED')
        throw new Error('V7D cannot use off-candidate evidence: '+base.candidateId+'/'+role);
      newRoles[role] = Object.freeze({
        boundaryDecision: p.boundaryDecision,
        previousBuilderProposal: base[role].previousBuilderProposal,
        reviewDisposition: 'NEW_BUILDER_PROPOSAL',
        witness: p.witness,
        witnessSource: source,
        rationale: p.rationale,
      });
    }
    return Object.freeze({
      ...base, ...newRoles,
      overallDisposition: 'COMPLETE_BUILDER_ROLES_CONSOLIDATED_AWAITING_INDEPENDENT_REVIEW',
      acceptance: 'NOT_INDEPENDENTLY_ACCEPTED_AS_COMPLETE_LEDGER',
    });
  })
);
if (observed.size !== 26 || ARSENAL_GATE3_OFFICIAL_ADJUDICATION_V7D.length !== 127)
  throw new Error('V7D complete candidate coverage drifted');
if (ARSENAL_GATE3_OFFICIAL_ADJUDICATION_V7D.some(r =>
  ['trigger','output','context'].some(role=>r[role].boundaryDecision===null)))
  throw new Error('V7D must not contain unresolved reviewer-work null decisions');
export const ARSENAL_GATE3_OFFICIAL_ADJUDICATION_META_V7D = Object.freeze({
  status: '127_COMPLETE_BUILDER_ROLES_48_REVIEW_PENDING_NO_INTEGRATION',
  population: 127,
  readOnlyCalibrationReferences: 9,
  acceptedV7CResearchMassCasesPreserved: 92,
  previousV7BMassCasesRetain30Decisions: 26,
  newlyFilledDimensions: Object.freeze({trigger:11,output:15,context:22}),
  newlyFilledTotal: 48,
  independentAcceptanceOfNew48: false,
  consolidated127Accepted: false,
  massClassifierVersionUnchanged: 'v6',
  gate3Graduated: false,
  gate4Unlocked: false,
});
