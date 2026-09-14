// Canonical T25 M.Stat atomic registry — audited v4 reset.
//
// LEARNER-FACING INVARIANT:
// T25_MSTAT_ROUTE is the audited prerequisite-safe 001 -> 162 session chronology.
// Parent ARC IDs remain stable organizational/prerequisite/evidence context only.
//
// AUTHORING INVARIANT:
// T25_ATOMIC_CARDS contains only individually authored and audited session cards.
// Route entries without finished contracts remain planned positions; no generic cards.
// Fresh v4 logical IDs reserve A1001-A1162 inside each stable parent namespace,
// preventing any accidental legacy-clearance transfer while remaining archive-compatible.

import {
  T25_MSTAT_AUDIT_VERSION,
  T25_MSTAT_TARGETS,
  T25_MSTAT_ROUTE,
  T25_TARGET_BY_CODE,
  T25_ROUTE_BY_ORDER as AUDITED_ROUTE_BY_ORDER,
  T25_ROUTE_BY_CODE,
} from "./t25-mstat-audit-v4.js";
import { T25_ATOMIC_V4_001_005 } from "./t25-atomic-v4-001-005.js";
import { T25_ATOMIC_V4_006_010 } from "./t25-atomic-v4-006-010.js";
import { T25_ATOMIC_V4_011_015 } from "./t25-atomic-v4-011-015.js";

export const T25_ATOMIC_AUDIT_VERSION = T25_MSTAT_AUDIT_VERSION;
export { T25_MSTAT_TARGETS, T25_MSTAT_ROUTE, T25_TARGET_BY_CODE, T25_ROUTE_BY_CODE };

// Temporary mixed-cache compatibility only. Do not use this name in new code.
// It intentionally points to the audited 162-step route so a stale 1.8.x UI
// degrades cosmetically instead of crashing while the new bundle propagates.
export const T25_MSTAT_120_ROUTE = T25_MSTAT_ROUTE;

export const T25_ATOMIC_CARDS = [
  ...T25_ATOMIC_V4_001_005,
  ...T25_ATOMIC_V4_006_010,
  ...T25_ATOMIC_V4_011_015,
].sort((a, b) => a.routeOrder - b.routeOrder);

if (T25_MSTAT_TARGETS.length !== 80) throw new Error(`T25 audited target manifest must contain 80 targets; found ${T25_MSTAT_TARGETS.length}.`);
if (T25_MSTAT_ROUTE.length !== 162) throw new Error(`T25 audited session route must contain 162 entries; found ${T25_MSTAT_ROUTE.length}.`);
if (new Set(T25_MSTAT_ROUTE.map(r => r.syllabusCode)).size !== 162) throw new Error("Duplicate T25 audited session-step code.");
if (new Set(T25_ATOMIC_CARDS.map(c => c.id)).size !== T25_ATOMIC_CARDS.length) throw new Error("Duplicate authored T25 v4 atomic ID.");
if (new Set(T25_ATOMIC_CARDS.map(c => c.routeOrder)).size !== T25_ATOMIC_CARDS.length) throw new Error("Duplicate authored T25 v4 route position.");

// Authored cards must remain a contiguous prefix of the audited session route.
for (let i = 0; i < T25_ATOMIC_CARDS.length; i += 1) {
  const card = T25_ATOMIC_CARDS[i];
  const expectedOrder = i + 1;
  if (card.routeOrder !== expectedOrder) throw new Error(`Authored T25 v4 prefix gap: expected ${expectedOrder}, found ${card.routeOrder}.`);
  const spec = AUDITED_ROUTE_BY_ORDER.get(card.routeOrder);
  if (!spec || spec.syllabusCode !== card.syllabusCode || spec.targetCode !== card.targetCode || spec.parentId !== card.parentId || spec.title !== card.title) {
    throw new Error(`Authored T25 v4 card ${card.id} does not match audited route position ${card.routeOrder}.`);
  }
  const expectedLogicalId = `T25-${card.parentId}-A${1000 + card.routeOrder}`;
  if (card.id !== expectedLogicalId) throw new Error(`Authored T25 v4 card ${card.id} must use fresh archive-compatible logical ID ${expectedLogicalId}.`);
  for (const field of ["focus","purpose","centralCapability","principalObstacle","applicationScope","transferScope","exitCondition","nextArcBoundary"]) {
    if (!card[field] || card[field].length < 20) throw new Error(`${card.id} has an incomplete ${field}.`);
  }
  if (!Array.isArray(card.entryPrerequisites) || card.entryPrerequisites.length === 0 ||
      !Array.isArray(card.requiredOwnership) || card.requiredOwnership.length < 5 ||
      !Array.isArray(card.inScope) || card.inScope.length < 4 ||
      !Array.isArray(card.outOfScope) || card.outOfScope.length < 4) {
    throw new Error(`${card.id} has an incomplete atomic learning contract.`);
  }
}

export const T25_ATOMIC_BY_ID = new Map(T25_ATOMIC_CARDS.map(c => [c.id, c]));
export const T25_ATOMIC_BY_ORDER = new Map(T25_ATOMIC_CARDS.map(c => [c.routeOrder, c]));
export const T25_ROUTE_BY_ORDER = AUDITED_ROUTE_BY_ORDER;
export const T25_ATOMIC_BY_PARENT = new Map();
for (const card of T25_ATOMIC_CARDS) {
  if (!T25_ATOMIC_BY_PARENT.has(card.parentId)) T25_ATOMIC_BY_PARENT.set(card.parentId, []);
  T25_ATOMIC_BY_PARENT.get(card.parentId).push(card);
}
for (const cards of T25_ATOMIC_BY_PARENT.values()) cards.sort((a, b) => a.routeOrder - b.routeOrder);
