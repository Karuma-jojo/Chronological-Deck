// Canonical T25 MSTAT-120 atomic registry.
//
// LEARNER-FACING INVARIANT:
// T25_MSTAT_120_ROUTE is the frozen 001 -> 120 study chronology. Parent ARC IDs are
// organizational/prerequisite/evidence context only and never override routeOrder.
//
// AUTHORING INVARIANT:
// T25_ATOMIC_CARDS contains only individually authored and audited learning contracts.
// Route entries without finished contracts remain visible as planned positions; they
// are never filled with generic placeholder cards.
//
// The already-audited 001-025 prefix is preserved byte-for-byte in a frozen module so
// later five-card batches can be appended without repeatedly rewriting finished work.

import {
  T25_ATOMIC_AUDIT_VERSION,
  T25_MSTAT_120_ROUTE as FROZEN_ROUTE,
  T25_ATOMIC_CARDS as AUTHORED_001_025,
} from "./t25-atomic-arcs-001-025.js";
import { T25_ATOMIC_BATCH_026_030 } from "./t25-atomic-batch-026-030.js";

export { T25_ATOMIC_AUDIT_VERSION };
export const T25_MSTAT_120_ROUTE = FROZEN_ROUTE;
export const T25_ATOMIC_CARDS = [
  ...AUTHORED_001_025,
  ...T25_ATOMIC_BATCH_026_030,
].sort((a, b) => a.routeOrder - b.routeOrder);

// ---------------------------------------------------------------------------
// Canonical route and progressive-authoring validation
// ---------------------------------------------------------------------------

if (T25_MSTAT_120_ROUTE.length !== 120) {
  throw new Error(`MSTAT-120 route manifest must contain 120 entries; found ${T25_MSTAT_120_ROUTE.length}.`);
}
for (let i = 0; i < T25_MSTAT_120_ROUTE.length; i += 1) {
  const expected = i + 1;
  const spec = T25_MSTAT_120_ROUTE[i];
  if (spec.routeOrder !== expected) throw new Error(`MSTAT-120 route manifest gap at ${expected}.`);
}
if (new Set(T25_MSTAT_120_ROUTE.map(r => r.syllabusCode)).size !== 120) {
  throw new Error("Duplicate MSTAT-120 syllabus code in route manifest.");
}
if (new Set(T25_ATOMIC_CARDS.map(c => c.id)).size !== T25_ATOMIC_CARDS.length) {
  throw new Error("Duplicate authored T25 atomic ID.");
}
if (new Set(T25_ATOMIC_CARDS.map(c => c.routeOrder)).size !== T25_ATOMIC_CARDS.length) {
  throw new Error("Duplicate authored T25 route position.");
}

// Authored cards must form one contiguous prefix. This prevents a later card from
// appearing 'ready' while an earlier route position is still only a placeholder.
for (let i = 0; i < T25_ATOMIC_CARDS.length; i += 1) {
  const c = T25_ATOMIC_CARDS[i];
  const expectedOrder = i + 1;
  if (c.routeOrder !== expectedOrder) {
    throw new Error(`Authored T25 prefix gap: expected route ${expectedOrder}, found ${c.routeOrder}.`);
  }
  const spec = T25_MSTAT_120_ROUTE[c.routeOrder - 1];
  if (!spec || spec.syllabusCode !== c.syllabusCode || spec.parentId !== c.parentId || spec.title !== c.title) {
    throw new Error(`Authored card ${c.id} does not match canonical MSTAT-120 route position ${c.routeOrder}.`);
  }
  for (const field of ["focus", "purpose", "centralCapability", "principalObstacle", "applicationScope", "transferScope", "exitCondition", "nextArcBoundary"]) {
    if (!c[field] || c[field].length < 20) throw new Error(`${c.id} has an incomplete ${field}.`);
  }
  if (!Array.isArray(c.entryPrerequisites) || c.entryPrerequisites.length === 0 ||
      !Array.isArray(c.requiredOwnership) || c.requiredOwnership.length < 5 ||
      !Array.isArray(c.inScope) || c.inScope.length < 4 ||
      !Array.isArray(c.outOfScope) || c.outOfScope.length < 4) {
    throw new Error(`${c.id} has an incomplete atomic learning contract.`);
  }
}

export const T25_ATOMIC_BY_ID = new Map(T25_ATOMIC_CARDS.map(c => [c.id, c]));
export const T25_ATOMIC_BY_ORDER = new Map(T25_ATOMIC_CARDS.map(c => [c.routeOrder, c]));
export const T25_ROUTE_BY_ORDER = new Map(T25_MSTAT_120_ROUTE.map(r => [r.routeOrder, r]));
export const T25_ATOMIC_BY_PARENT = new Map();
for (const c of T25_ATOMIC_CARDS) {
  if (!T25_ATOMIC_BY_PARENT.has(c.parentId)) T25_ATOMIC_BY_PARENT.set(c.parentId, []);
  T25_ATOMIC_BY_PARENT.get(c.parentId).push(c);
}
for (const cards of T25_ATOMIC_BY_PARENT.values()) cards.sort((a, b) => a.routeOrder - b.routeOrder);
