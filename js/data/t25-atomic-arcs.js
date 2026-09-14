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
import { T25_ATOMIC_V4_016_020 } from "./t25-atomic-v4-016-020.js";
import { T25_ATOMIC_V4_021_025 } from "./t25-atomic-v4-021-025.js";
import { T25_ATOMIC_V4_026_030 } from "./t25-atomic-v4-026-030.js";
import { T25_ATOMIC_V4_031_035 } from "./t25-atomic-v4-031-035.js";
import { T25_ATOMIC_V4_036_040 } from "./t25-atomic-v4-036-040.js";
import { T25_ATOMIC_V4_041_045 } from "./t25-atomic-v4-041-045.js";
import { T25_ATOMIC_V4_046_050 } from "./t25-atomic-v4-046-050.js";
import { T25_ATOMIC_V4_051_055 } from "./t25-atomic-v4-051-055.js";
import { T25_ATOMIC_V4_056_060 } from "./t25-atomic-v4-056-060.js";
import { T25_ATOMIC_V4_061_065 } from "./t25-atomic-v4-061-065.js";
import { T25_ATOMIC_V4_066_070 } from "./t25-atomic-v4-066-070.js";
import { T25_ATOMIC_V4_071_075 } from "./t25-atomic-v4-071-075.js";
import { T25_ATOMIC_V4_076_080 } from "./t25-atomic-v4-076-080.js";
import { T25_ATOMIC_V4_081_084 } from "./t25-atomic-v4-081-084.js";
import { T25_ATOMIC_V4_085_088 } from "./t25-atomic-v4-085-088.js";
import { T25_ATOMIC_V4_089_092 } from "./t25-atomic-v4-089-092.js";
import { T25_ATOMIC_V4_093_096 } from "./t25-atomic-v4-093-096.js";
import { T25_ATOMIC_V4_097_100 } from "./t25-atomic-v4-097-100.js";
import { T25_ATOMIC_V4_101_104 } from "./t25-atomic-v4-101-104.js";
import { T25_ATOMIC_V4_105_108 } from "./t25-atomic-v4-105-108.js";
import { T25_ATOMIC_V4_109_112 } from "./t25-atomic-v4-109-112.js";
import { T25_ATOMIC_V4_113_116 } from "./t25-atomic-v4-113-116.js";
import { T25_ATOMIC_V4_117_118 } from "./t25-atomic-v4-117-118.js";
import { T25_ATOMIC_V4_119_122 } from "./t25-atomic-v4-119-122.js";
import { T25_ATOMIC_V4_123_126 } from "./t25-atomic-v4-123-126.js";
import { T25_ATOMIC_V4_127_130 } from "./t25-atomic-v4-127-130.js";
import { T25_ATOMIC_V4_131_134 } from "./t25-atomic-v4-131-134.js";
import { T25_ATOMIC_V4_135_136 } from "./t25-atomic-v4-135-136.js";
import { T25_ATOMIC_V4_137_138 } from "./t25-atomic-v4-137-138.js";
import { T25_ATOMIC_V4_139_140 } from "./t25-atomic-v4-139-140.js";
import { T25_ATOMIC_V4_141_142 } from "./t25-atomic-v4-141-142.js";
import { T25_ATOMIC_V4_143_144 } from "./t25-atomic-v4-143-144.js";
import { T25_ATOMIC_V4_145_146 } from "./t25-atomic-v4-145-146.js";
import { T25_ATOMIC_V4_147_148 } from "./t25-atomic-v4-147-148.js";

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
  ...T25_ATOMIC_V4_016_020,
  ...T25_ATOMIC_V4_021_025,
  ...T25_ATOMIC_V4_026_030,
  ...T25_ATOMIC_V4_031_035,
  ...T25_ATOMIC_V4_036_040,
  ...T25_ATOMIC_V4_041_045,
  ...T25_ATOMIC_V4_046_050,
  ...T25_ATOMIC_V4_051_055,
  ...T25_ATOMIC_V4_056_060,
  ...T25_ATOMIC_V4_061_065,
  ...T25_ATOMIC_V4_066_070,
  ...T25_ATOMIC_V4_071_075,
  ...T25_ATOMIC_V4_076_080,
  ...T25_ATOMIC_V4_081_084,
  ...T25_ATOMIC_V4_085_088,
  ...T25_ATOMIC_V4_089_092,
  ...T25_ATOMIC_V4_093_096,
  ...T25_ATOMIC_V4_097_100,
  ...T25_ATOMIC_V4_101_104,
  ...T25_ATOMIC_V4_105_108,
  ...T25_ATOMIC_V4_109_112,
  ...T25_ATOMIC_V4_113_116,
  ...T25_ATOMIC_V4_117_118,
  ...T25_ATOMIC_V4_119_122,
  ...T25_ATOMIC_V4_123_126,
  ...T25_ATOMIC_V4_127_130,
  ...T25_ATOMIC_V4_131_134,
  ...T25_ATOMIC_V4_135_136,
  ...T25_ATOMIC_V4_137_138,
  ...T25_ATOMIC_V4_139_140,
  ...T25_ATOMIC_V4_141_142,
  ...T25_ATOMIC_V4_143_144,
  ...T25_ATOMIC_V4_145_146,
  ...T25_ATOMIC_V4_147_148,
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
