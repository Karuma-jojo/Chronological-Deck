// SMMC final-engine roadmap scaffold v1.
// This is an executable build plan over the already-frozen curriculum architecture.
// It does not certify unfinished features or change canonical T25 academic state.

import ledger from "./ledger.mjs";
import { SMMC_CONTENT_MODULES, SMMC_METHOD_MODULES } from "./curriculum-v1.mjs";
import { SMMC_REQUIREMENTS_V1 } from "./requirements-v1.mjs";
import { SMMC_UNITS_V1 } from "./authoring/units-v1.mjs";

const authored = new Set(SMMC_UNITS_V1.map(x => x.id));
const planned = (id, title, stage = "core-authoring") =>
  Object.freeze({ id, title, stage, status: authored.has(id) ? "authored" : "planned" });

export const SMMC_ENGINE_PHASES = Object.freeze([
  {
    id: "research-freeze",
    order: 1,
    title: "Close primary-domain reconciliation",
    status: "pending",
    exitCriteria: [
      "every disputed hybrid is reviewed under the written tie-break rule",
      "aggregate domain totals are reproducible",
      "every intentional disagreement with the newer benchmark is documented"
    ]
  },
  {
    id: "core-authoring",
    order: 2,
    title: "Finish core methods and bridge units",
    status: "active",
    exitCriteria: [
      "fundamental method modules have authored neutral units",
      "N1, GR1 and AN1 recurring gaps are deepened",
      "AN2, GF1 and GEO1 have sufficient authored coverage for East requirements",
      "mixed neutral synthesis can be assembled without consuming historical PYQs"
    ]
  },
  {
    id: "east-requirements",
    order: 3,
    title: "Map every East AMBER/RED problem to exact authored units",
    status: "pending",
    exitCriteria: [
      "every East non-GREEN problem has an exact unit requirement row",
      "unknown or unauthored prerequisites remain fail-closed",
      "C-session and open-problem specialist mappings remain lower priority"
    ]
  },
  {
    id: "evidence-integration",
    order: 4,
    title: "Connect T25 readiness and genuine SMMC unit certification",
    status: "scaffolded",
    exitCriteria: [
      "normal learner flow reads canonical T25 evidence rather than manual target entry",
      "unit certification requires explicit academic evidence/review",
      "self-report remains progress metadata and never certifies"
    ]
  },
  {
    id: "historical-transfer",
    order: 5,
    title: "Implement protected S-XFER attempts and 0-7 review",
    status: "scaffolded",
    exitCriteria: [
      "isolated unseen attempt start/submit/review flow exists",
      "timing, assistance and exposure are preserved",
      "0-7 scoring and partial-credit review are durable",
      "reattempt history remains distinct from first-unseen evidence"
    ]
  },
  {
    id: "paper-vault",
    order: 6,
    title: "Protect whole papers and implement S-PAPER",
    status: "scaffolded",
    exitCriteria: [
      "whole A/B sessions are first-class vault objects",
      "opening a session paper cannot silently preserve pristine-paper status",
      "three-hour session attempts are durable",
      "A+B competition-day history can be represented without leaking later questions"
    ]
  },
  {
    id: "specialists",
    order: 7,
    title: "Finish rare RED specialist routes",
    status: "later",
    exitCriteria: [
      "specialist routes are authored only where exact East/open-problem gaps justify them",
      "research/open-problem preparation does not delay the core transfer machine"
    ]
  }
]);

export const SMMC_TRAINING_LADDER = Object.freeze([
  "acquisition",
  "near-transfer",
  "mixed-neutral-synthesis",
  "historical-unseen-transfer"
]);

export const SMMC_MODULE_BUILD_PLAN = Object.freeze([
  {
    moduleId: "S-BRIDGE-N1",
    priority: "core",
    units: Object.freeze([
      planned("S-BRIDGE-N1-U01", "Euclid, Bezout and solvable congruences"),
      planned("S-BRIDGE-N1-U02", "Chinese remainders and coprime residue counting"),
      planned("S-BRIDGE-N1-U03", "Prime factors, polynomial divisibility and rational-root obstructions"),
      planned("S-BRIDGE-N1-U04", "Valuations, factorial/binomial divisibility and Diophantine descent")
    ])
  },
  {
    moduleId: "S-BRIDGE-GR1",
    priority: "core",
    units: Object.freeze([
      planned("S-BRIDGE-GR1-U01", "Degrees, components and cycle structure"),
      planned("S-BRIDGE-GR1-U02", "Cliques, graph reductions and finite game states"),
      planned("S-BRIDGE-GR1-U03", "Distance, pursuit and guarding reductions")
    ])
  },
  {
    moduleId: "S-BRIDGE-AN1",
    priority: "core",
    units: Object.freeze([
      planned("S-BRIDGE-AN1-U01", "Positive-series comparison and harmonic divergence"),
      planned("S-BRIDGE-AN1-U02", "Alternating series and block constructions"),
      planned("S-BRIDGE-AN1-U03", "Asymptotic counterexamples and recurrence growth")
    ])
  },
  {
    moduleId: "S-BRIDGE-AN2",
    priority: "core",
    units: Object.freeze([
      planned("S-BRIDGE-AN2-U01", "Extrema, compactness and integrability consequences"),
      planned("S-BRIDGE-AN2-U02", "Convex envelopes and contest optimization")
    ])
  },
  {
    moduleId: "S-BRIDGE-GF1",
    priority: "core",
    units: Object.freeze([
      planned("S-BRIDGE-GF1-U01", "Generating functions, convolution and recurrence translation"),
      planned("S-BRIDGE-GF1-U02", "First-order ODEs and coefficient extraction")
    ])
  },
  {
    moduleId: "S-BRIDGE-GEO1",
    priority: "core",
    units: Object.freeze([
      planned("S-BRIDGE-GEO1-U01", "Convex hulls, Minkowski sums and tilings"),
      planned("S-BRIDGE-GEO1-U02", "Lattice, spatial incidence and vector/Gram reformulation")
    ])
  },
  {
    moduleId: "S-SPECIAL-ALG1",
    priority: "later",
    units: Object.freeze([
      planned("S-SPECIAL-ALG1-U01", "Finite fields and polynomial algebra", "specialists")
    ])
  },
  {
    moduleId: "S-SPECIAL-ALG2",
    priority: "later",
    units: Object.freeze([
      planned("S-SPECIAL-ALG2-U01", "Operator and function-space methods", "specialists")
    ])
  },
  {
    moduleId: "S-SPECIAL-NT2",
    priority: "later",
    units: Object.freeze([
      planned("S-SPECIAL-NT2-U01", "Gaussian integers and perfect-power Diophantine methods", "specialists")
    ])
  },
  {
    moduleId: "S-METHOD-B1",
    priority: "fundamental-method",
    units: Object.freeze([planned("S-METHOD-B1-U01", "Choose the quantity before bounding it")])
  },
  {
    moduleId: "S-METHOD-C1",
    priority: "fundamental-method",
    units: Object.freeze([planned("S-METHOD-C1-U01", "Build exhaustive cases and extract reusable lemmas")])
  },
  {
    moduleId: "S-METHOD-K1",
    priority: "fundamental-method",
    units: Object.freeze([planned("S-METHOD-K1-U01", "Encode an object so it can be recovered")])
  },
  {
    moduleId: "S-METHOD-X1",
    priority: "fundamental-method",
    units: Object.freeze([planned("S-METHOD-X1-U01", "Introduce an auxiliary object that exposes structure")])
  },
  {
    moduleId: "S-METHOD-I1",
    priority: "fundamental-method",
    units: Object.freeze([planned("S-METHOD-I1-U01", "Strengthen the induction claim until the step closes")])
  },
  {
    moduleId: "S-METHOD-E1",
    priority: "fundamental-method",
    units: Object.freeze([planned("S-METHOD-E1-U01", "Choose an extremal object or minimal counterexample")])
  },
  {
    moduleId: "S-METHOD-S1",
    priority: "fundamental-method",
    units: Object.freeze([planned("S-METHOD-S1-U01", "Exploit symmetry, parity and normalization")])
  },
  {
    moduleId: "S-METHOD-O1",
    priority: "later",
    units: Object.freeze([planned("S-METHOD-O1-U01", "Record rigorous partial progress on open problems", "specialists")])
  },
  {
    moduleId: "S-METHOD-W1",
    priority: "fundamental-method",
    units: Object.freeze([planned("S-METHOD-W1-U01", "Turn scratch reasoning into a marker-ready proof")])
  }
]);

export const SMMC_CANDIDATE_BRIDGES = Object.freeze([
  {
    id: "S-BRIDGE-ALG1",
    title: "Contest polynomial and determinant methods",
    status: "candidate-not-canonical",
    decisionGate: "Add only if the exact-gap pass confirms a recurring AMBER gap not owned by T25 or S-SPECIAL-ALG1.",
    motivatingProblems: Object.freeze(["SMMC-2025-B3"]),
    possibleScope: Object.freeze([
      "Vandermonde structure and alternating-polynomial divisibility",
      "determinants as multivariate polynomials",
      "roots-of-unity filters and coefficient comparisons",
      "structured or circulant matrices",
      "Gram-style algebraic translations"
    ])
  }
]);

export const SMMC_EAST_REQUIREMENT_BACKLOG = Object.freeze(
  ledger
    .filter(p => p.eastRelevant && p.overlap !== "green")
    .map(p => Object.freeze({
      problemId: p.id,
      overlap: p.overlap,
      currentUnits: Object.freeze([...(SMMC_REQUIREMENTS_V1[p.id] || [])]),
      status: SMMC_REQUIREMENTS_V1[p.id]?.length ? "mapped" : "pending"
    }))
);

export const SMMC_ENGINE_FEATURES = Object.freeze({
  domainReconciliation: "open",
  neutralAuthoring: "partial",
  eastRequirementMapping: "partial",
  t25EvidenceIngestion: "contract-scaffolded",
  unitCertification: "runtime-primitive-present-ui-path-missing",
  historicalTransferRunner: "contract-scaffolded",
  historicalReviewAndScoring: "contract-scaffolded",
  paperVault: "contract-scaffolded",
  paperRunner: "contract-scaffolded",
  specialists: "later"
});

export const SMMC_CANONICAL_MODULE_IDS = Object.freeze([
  ...SMMC_CONTENT_MODULES.map(x => x.id),
  ...SMMC_METHOD_MODULES.map(x => x.id)
]);
