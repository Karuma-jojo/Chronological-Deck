// T25 M.Stat audited v4 curriculum manifest.
// Source of truth: ISI M.Stat audited final study syllabus v2.0 (2026-09-14),
// validated by the supplied audit package: 80 targets / 162 bounded session steps.
//
// IMPORTANT: route entries are generated mechanically from audited target/step data.
// This does NOT auto-generate learning cards. T25_ATOMIC_CARDS remains hand-authored.

import { T25_MSTAT_AUDIT_PHASE_1 } from "./t25-mstat-audit-phase-1.js";
import { T25_MSTAT_AUDIT_PHASE_2 } from "./t25-mstat-audit-phase-2.js";
import { T25_MSTAT_AUDIT_PHASE_3 } from "./t25-mstat-audit-phase-3.js";
import { T25_MSTAT_AUDIT_PHASE_4 } from "./t25-mstat-audit-phase-4.js";
import { T25_MSTAT_AUDIT_PHASE_5 } from "./t25-mstat-audit-phase-5.js";
import { T25_MSTAT_AUDIT_PHASE_6 } from "./t25-mstat-audit-phase-6.js";
import { T25_MSTAT_AUDIT_PHASE_7 } from "./t25-mstat-audit-phase-7.js";

export const T25_MSTAT_AUDIT_VERSION = "4.0-audited-v2-162";
const withPhase = (targets, phase) => targets.map(target => ({ ...target, phase }));
export const T25_MSTAT_TARGETS = [
  ...withPhase(T25_MSTAT_AUDIT_PHASE_1, 1),
  ...withPhase(T25_MSTAT_AUDIT_PHASE_2, 2),
  ...withPhase(T25_MSTAT_AUDIT_PHASE_3, 3),
  ...withPhase(T25_MSTAT_AUDIT_PHASE_4, 4),
  ...withPhase(T25_MSTAT_AUDIT_PHASE_5, 5),
  ...withPhase(T25_MSTAT_AUDIT_PHASE_6, 6),
  ...withPhase(T25_MSTAT_AUDIT_PHASE_7, 7),
];

const PARENT_BY_TARGET = Object.freeze({
  F1:"ARC801",F2:"ARC801",F3:"ARC801",F4:"ARC801",F5:"ARC802",
  A1:"ARC803",A2:"ARC804",A3:"ARC812",A5:"ARC905",G1:"ARC805",A4:"ARC806",G2:"ARC807",
  P1:"ARC809",P2:"ARC809",P3:"ARC817",P4:"ARC818",P6:"ARC819",J1:"ARC820",J2:"ARC820",
  D1:"ARC821",D2:"ARC821",N1:"ARC828",R5:"ARC827",R1:"ARC827",
  M0:"ARC815",M1:"ARC814",M2:"ARC815",M3:"ARC815",M4:"ARC816",M5:"ARC906",
  C1:"ARC810",C2:"ARC811",C3:"ARC811",C4:"ARC812",C5:"ARC812",C6:"ARC813",C7:"ARC813",G3:"ARC808",G4:"ARC808",
  D0:"ARC822",D3:"ARC822",D4:"ARC822",D5:"ARC823",D6:"ARC822",J3:"ARC824",J4:"ARC824",J5:"ARC824",J6:"ARC908",P5:"ARC821",
  N3:"ARC825",N2:"ARC828",O1:"ARC826",O2:"ARC826",O3:"ARC826",L1:"ARC907",L2:"ARC829",L3:"ARC829",O4:"ARC826",
  E1:"ARC830",E2:"ARC832",E3:"ARC833",E4:"ARC833",E5:"ARC831",E6:"ARC831",
  T1:"ARC835",T2:"ARC835",T3:"ARC835",T4:"ARC834",T5:"ARC834",T6:"ARC835",
  R2:"ARC836",R3:"ARC837",R4:"ARC838",S1:"ARC843",S2:"ARC845",S3:"ARC844",
  V1:"ARC839",V2:"ARC840",V3:"ARC841",V4:"ARC842",
});

if (T25_MSTAT_TARGETS.length !== 80) throw new Error(`Audited M.Stat target count must be 80; found ${T25_MSTAT_TARGETS.length}.`);
if (new Set(T25_MSTAT_TARGETS.map(t => t.code)).size !== 80) throw new Error("Duplicate audited M.Stat target code.");
if (new Set(T25_MSTAT_TARGETS.map(t => t.phase)).size !== 7) throw new Error("Audited M.Stat target phases must cover 1 through 7.");

export const T25_TARGET_BY_CODE = new Map(T25_MSTAT_TARGETS.map((target, index) => [target.code, { ...target, targetOrder: index + 1, parentId: PARENT_BY_TARGET[target.code] }]));
for (let i = 0; i < T25_MSTAT_TARGETS.length; i += 1) {
  const target = T25_MSTAT_TARGETS[i];
  if (!PARENT_BY_TARGET[target.code]) throw new Error(`Missing T25 parent context for audited target ${target.code}.`);
  if (!Number.isInteger(target.phase) || target.phase < 1 || target.phase > 7) throw new Error(`Invalid audited phase for ${target.code}.`);
  for (const prerequisite of target.prerequisites) {
    const earlier = T25_MSTAT_TARGETS.findIndex(t => t.code === prerequisite);
    if (earlier < 0) throw new Error(`${target.code} refers to unknown prerequisite ${prerequisite}.`);
    if (earlier >= i) throw new Error(`${target.code} precedes prerequisite ${prerequisite} in audited study order.`);
  }
}

let routeOrder = 0;
export const T25_MSTAT_ROUTE = T25_MSTAT_TARGETS.flatMap((target, targetIndex) =>
  target.steps.map((title, stepIndex) => ({
    routeOrder: ++routeOrder,
    syllabusCode: `${target.code}.${stepIndex + 1}`,
    targetCode: target.code,
    targetOrder: targetIndex + 1,
    stepNumber: stepIndex + 1,
    phase: target.phase,
    parentId: PARENT_BY_TARGET[target.code],
    title,
    targetTitle: target.title,
    targetPrerequisites: [...target.prerequisites],
    targetExitCheck: target.exitCheck,
    exactScope: target.exactScope,
    block: target.block,
    priorityRank: target.priorityRank,
    evidencePolicy: target.evidencePolicy,
  }))
);

if (T25_MSTAT_ROUTE.length !== 162) throw new Error(`Audited M.Stat session route must contain 162 steps; found ${T25_MSTAT_ROUTE.length}.`);
for (let i = 0; i < T25_MSTAT_ROUTE.length; i += 1) {
  if (T25_MSTAT_ROUTE[i].routeOrder !== i + 1) throw new Error(`Audited M.Stat route gap at ${i + 1}.`);
}
if (new Set(T25_MSTAT_ROUTE.map(r => r.syllabusCode)).size !== 162) throw new Error("Duplicate audited M.Stat session-step code.");
if (new Set(T25_MSTAT_ROUTE.map(r => r.phase)).size !== 7) throw new Error("Audited M.Stat session route must retain all seven learning phases.");

export const T25_ROUTE_BY_ORDER = new Map(T25_MSTAT_ROUTE.map(r => [r.routeOrder, r]));
export const T25_ROUTE_BY_CODE = new Map(T25_MSTAT_ROUTE.map(r => [r.syllabusCode, r]));
