// Resolve learner-facing T25 prerequisite references without inflating the generated runtime payload.
// Explicit session/target IDs become links. Truly identifier-free basics must be classified here
// so they are shown deliberately as assumed foundations instead of looking accidentally broken.

export const ASSUMED_FOUNDATION_PREREQUISITES = Object.freeze([
  "Elementary factorisation and fraction notation",
  "Meaning of a real-valued function domain",
  "Real-number sign and order",
  "Elementary exponent notation",
  "Basic equation notation and substitution",
  "Elementary implication language from ordinary mathematics",
  "Ordering and interval notation on the real line",
  "Basic function notation and evaluation",
  "Elementary algebra with symbolic parameters",
  "Basic set/function notation from ordinary mathematics",
  "Ability to evaluate a concrete candidate example",
  "Elementary algebra and set/function notation",
  "Elementary equality and membership notation",
  "Elementary finite-set enumeration",
  "Elementary polynomial expansion, collection of coefficients and substitution",
  "Elementary finite-sum notation",
  "Ability to manipulate a linear or geometric pattern symbolically",
  "Elementary factorisation and finite arithmetic",
  "Elementary Euclidean triangle facts and coordinate-plane distance",
  "Elementary Cartesian coordinates and Pythagorean distance",
  "Elementary product-rule intuition",
  "Finite algebraic expansion and indexed sums",
  "Basic order and arithmetic from foundations",
  "Basic ranking and ordered data",
  "Basic finite sums and arithmetic",
  "Elementary algebraic elimination",
]);

const ASSUMED = new Set(ASSUMED_FOUNDATION_PREREQUISITES);
export const INTENTIONAL_NONLINKED_PREREQUISITES = Object.freeze([
  ["No new T25 v4 session is required; prior F1 evidence may be used diagnostically", "prior evidence only"],
]);
const INTENTIONAL_NONLINKED = new Map(INTENTIONAL_NONLINKED_PREREQUISITES);
const CURATED_ALIASES = new Map([
  ["finite-population total versus mean distinction", "S1.1"],
]);
const REFERENCE_TOKEN = /\b\d{3}(?:-\d{3})?\b|\b[A-Z]\d+(?:\.\d+)?\b/g;

export function buildPrerequisiteIndex(sessions) {
  const byOrder = new Map();
  const bySyllabus = new Map();
  const byTargetFirst = new Map();
  for (const s of sessions) {
    const order = Number(s.order);
    if (!Number.isInteger(order) || order < 1) throw new Error("Invalid T25 prerequisite session order");
    byOrder.set(order, order);
    bySyllabus.set(String(s.card.syllabusCode), order);
    if (!byTargetFirst.has(String(s.card.targetCode))) byTargetFirst.set(String(s.card.targetCode), order);
  }
  return {byOrder, bySyllabus, byTargetFirst};
}

function resolveToken(token, index) {
  if (/^\d{3}(?:-\d{3})?$/.test(token)) {
    const order = Number(token.slice(0, 3));
    return index.byOrder.get(order) ?? null;
  }
  if (token.includes(".")) return index.bySyllabus.get(token) ?? null;
  return index.byTargetFirst.get(token) ?? null;
}

export function prerequisiteParts(text, index, currentOrder = Infinity) {
  const alias = CURATED_ALIASES.get(text);
  if (alias) {
    const order = resolveToken(alias, index);
    if (order && order < currentOrder) return {parts:[{text, order}], linked:true, assumed:false, note:null};
  }

  const parts = [];
  let cursor = 0;
  let linked = false;
  for (const match of text.matchAll(REFERENCE_TOKEN)) {
    if (match.index > cursor) parts.push({text:text.slice(cursor, match.index), order:null});
    const token = match[0];
    const order = resolveToken(token, index);
    if (order && order < currentOrder) {
      parts.push({text:token, order});
      linked = true;
    } else {
      parts.push({text:token, order:null});
    }
    cursor = match.index + token.length;
  }
  if (cursor < text.length) parts.push({text:text.slice(cursor), order:null});
  if (!parts.length) parts.push({text, order:null});
  return {parts, linked, assumed:!linked && ASSUMED.has(text), note:linked?null:INTENTIONAL_NONLINKED.get(text)??null};
}
