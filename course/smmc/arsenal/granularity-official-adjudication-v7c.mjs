// Gate 3 v7C: review-only, non-integrated 127-record official semantic ledger.
// 9 immutable accepted calibration references, 26 unchanged partially adjudicated
// mass records, 92 newly complete builder semantic proposals. The 48 null
// dimensions of the prior 26 remain DEFER, not automatic UNRESOLVED.
import { ARSENAL_GATE3_OFFICIAL_ADJUDICATION_V7B } from './granularity-official-adjudication-v7b.mjs';
import { ARSENAL_GATE3_V7C_BATCH_01 } from './granularity-official-adjudication-v7c-batch-01.mjs';
import { ARSENAL_GATE3_V7C_BATCH_02 } from './granularity-official-adjudication-v7c-batch-02.mjs';
import { ARSENAL_GATE3_V7C_BATCH_03 } from './granularity-official-adjudication-v7c-batch-03.mjs';
const newlyProposed = Object.freeze([
  ...ARSENAL_GATE3_V7C_BATCH_01, ...ARSENAL_GATE3_V7C_BATCH_02, ...ARSENAL_GATE3_V7C_BATCH_03,
]);
const byId = new Map(newlyProposed.map(x => [x.candidateId, x]));
if (byId.size !== 92 || newlyProposed.length !== 92) throw new Error('V7C new builder cases must be 92 unique official IDs');
export const ARSENAL_GATE3_OFFICIAL_ADJUDICATION_V7C = Object.freeze(
  ARSENAL_GATE3_OFFICIAL_ADJUDICATION_V7B.map(base => {
    const added = byId.get(base.candidateId);
    if (!added) return base; // Exact same object and all decisions for accepted/reviewed v7B entries.
    if (base.frozenCalibration || base.overallDisposition !== 'DEFER_PENDING_INDIVIDUAL_ADJUDICATION')
      throw new Error('V7C cannot modify frozen or previously reviewed case '+base.candidateId);
    const one = role => Object.freeze({
      boundaryDecision: added[role].boundaryDecision,
      previousBuilderProposal: base[role].previousBuilderProposal,
      reviewDisposition: 'NEW_BUILDER_PROPOSAL',
      witness: role === 'context' ? null : (added[role].witness ?? null),
      witnessSource: role === 'context' || added[role].witness === null ? null :
        (base.sourceClaim.includes(added[role].witness) ? 'ACCEPTED_CLAIM' :
         base.candidateName.includes(added[role].witness) ? 'RAW_EXPRESSION' : 'UNSUPPORTED'),
      rationale: added[role].rationale,
    });
    return Object.freeze({
      ...base,
      trigger: one('trigger'), output: one('output'), context: one('context'),
      overallDisposition: 'NEW_BUILDER_COMPLETE_AWAITING_INDEPENDENT_REVIEW',
      acceptance: 'NOT_INDEPENDENTLY_ACCEPTED',
    });
  })
);
export const ARSENAL_GATE3_OFFICIAL_ADJUDICATION_META_V7C = Object.freeze({
  status: 'BUILDER_92_COMPLETE_SEMANTIC_PROPOSALS_NOT_INTEGRATED',
  population: 127,
  frozenCalibrationReferences: 9,
  priorPartiallyReviewedMassRows: 26,
  newlyProposedCompleteMassRows: 92,
  priorMassRoleDecisions: Object.freeze({ trigger: 15, output: 11, context: 4 }),
  remainingPartialRoleDimensions: 48,
  underlyingMassClassifierVersion: 'v6',
  independentMathematicalAcceptance: false,
  gate3Graduated: false,
  gate4Open: false,
});
