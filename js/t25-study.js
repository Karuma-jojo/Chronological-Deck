import { T25_BY_ID } from "./data/t25-entrance-prep.js";
import { T25_SOURCES, T25_REVIEWED_ON } from "./data/t25-sources.js";

export const T25_EVIDENCE_KEY = "chrono_t25_evidence_v1";
export const ASSISTANCE = { independent: "Independent", hinted: "Hint used", guided: "Guided work", solution_seen: "Solution seen" };
export const QUESTION_KINDS = { official: "Official paper (reference recorded)", textbook: "Textbook / course", original: "Original exam-style", mock: "Mock / mixed set" };
const MAX_ATTEMPTS = 5000;

function shortText(value, max, required = false) {
  if (typeof value !== "string" || value.length > max || (required && !value.trim())) throw new Error("Invalid or overlong text in practice record.");
  return value.trim();
}

export function validateAttempt(a) {
  if (!a || typeof a !== "object" || !T25_BY_ID.has(a.unitId)) throw new Error("Practice record has an unknown unit.");
  if (!Object.hasOwn(ASSISTANCE, a.assistance) || !Object.hasOwn(QUESTION_KINDS, a.kind)) throw new Error("Unknown practice or assistance type.");
  const id = shortText(a.id, 100, true), ref = shortText(a.ref, 300, true), notes = shortText(a.notes ?? "", 4000);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date) || !Number.isFinite(Date.parse(a.date)) || new Date(a.date).toISOString().slice(0, 10) !== a.date) throw new Error("Use a valid date.");
  if (a.minutes !== null && (!Number.isFinite(a.minutes) || a.minutes <= 0 || a.minutes > 1440)) throw new Error("Minutes must be between 0 and 1440, or blank.");
  if (!(a.score === null && a.maxScore === null)) {
    if (!Number.isFinite(a.score) || !Number.isFinite(a.maxScore) || a.maxScore <= 0 || Math.abs(a.score) > a.maxScore) throw new Error("Enter both marks fields, with a positive maximum; earned marks may be negative but cannot exceed the maximum in magnitude.");
  }
  return { id, unitId: a.unitId, date: a.date, ref, kind: a.kind, assistance: a.assistance, score: a.score, maxScore: a.maxScore, minutes: a.minutes, notes };
}

export function validateEvidence(data) {
  if (!data || data.version !== 1 || !Array.isArray(data.attempts) || data.attempts.length > MAX_ATTEMPTS) throw new Error("Expected a T25 evidence backup, version 1, with at most 5,000 records.");
  const attempts = data.attempts.map(validateAttempt);
  if (new Set(attempts.map(a => a.id)).size !== attempts.length) throw new Error("Duplicate record IDs in backup.");
  return { version: 1, attempts };
}

export function mergeEvidence(current, incoming) {
  const merged = new Map(validateEvidence(current).attempts.map(a => [a.id, a]));
  for (const a of validateEvidence(incoming).attempts) {
    if (merged.has(a.id) && JSON.stringify(merged.get(a.id)) !== JSON.stringify(a)) throw new Error("A backup conflicts with an existing record. No records were replaced.");
    merged.set(a.id, a);
  }
  return validateEvidence({ version: 1, attempts: [...merged.values()] });
}

export function newAttempt(fields) {
  const id = globalThis.crypto?.randomUUID?.() ?? `attempt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return validateAttempt({ ...fields, id });
}

export function buildT25Prompt(unitId, mode = "investigate") {
  const u = T25_BY_ID.get(unitId);
  if (!u || !["investigate", "learn", "practice", "review", "project"].includes(mode)) throw new Error("Unknown study contract or mode.");
  const source = T25_SOURCES[u.source];
  const context = [
    `Chrono-Deck T25 · ${u.id} · ${u.title}`,
    "Primary goal: ISI M.Stat entrance preparation, followed by quantitative research. Mathematics on paper comes first; build implementation competence gradually.",
    `Scope reference: ${source.title} (${source.url}); reviewed ${T25_REVIEWED_ON}. Check the application-year syllabus before claiming exam alignment.`,
    `Target: ${u.target}`,
    `Unit checklist (may require several sessions):\n${u.mastery.map(s => `- ${s}`).join("\n")}`,
    `Prerequisite units: ${u.prerequisites.join(", ") || "none; diagnose basic notation first"}.`,
    `Related T22 study: ${u.reuse.join(", ") || "no exact existing atomic link recorded"}. These references may cover only part of this unit.`,
    "Ask what I have already established, using a brief diagnostic only where evidence is missing. Do not restart mastered material by default. Supply definitions, notation conventions and any allowed earlier lemmas before testing a new proof. Never make me rediscover a definition as if it were a theorem.",
    "Keep assistance provenance explicit. Simulation, a polished app, time spent or an AI-written proof does not establish independent mastery. Do not mark anything cleared automatically.",
  ];
  const instructions = {
    investigate: "Use the current λ T25 atomic workflow. If this parent unit has registered T25 atomic cards, select exactly ONE bounded card and compile that card with `λ-Compiler-T25-Sealed-Spire-Mission-CANONICAL.md`; do not seal the whole parent checklist as one mission. Run the resulting sealed Mission Package under the frozen canonical ω SPIRE Master + ω Runtime Guardian. Those runtime documents own [WALL], [HINT], [FORGE0] and the other assistance controls; do not restate or invent an older V11.3/[FORGE] control scheme. [WALL] does not expire because I struggle or time passes. Only my explicit assistance control can authorize help beyond WALL. Establish prerequisite definitions and legal starting facts before blind play, preserve zero-novelty WALL behavior, and keep sibling/later T25 breakthroughs outside the mission. Start only after the bounded atomic target is identified.",
    learn: "Start an ordinary learning session, outside the sealed Spire wall. Supply unfamiliar definitions and one small worked example, then give me a related problem without its solution. Use this for prerequisite repair, not compulsory rediscovery of every convention. Ask for my paper work and wait. A later independent task will establish what I can reconstruct.",
    practice: "Run written entrance practice, one question at a time. Let me attempt it before feedback. For an official PYQ, use the actual paper content available in this chat or retrieve and verify it; record exam, year, paper and question number. Never invent a PYQ label. If no verified question is available, label your question ORIGINAL EXAM-STYLE and make no claim about official difficulty. Alternate short objective reasoning and descriptive proof/derivation as appropriate. Grade the reasoning against an explicit rubric after my attempt and track any assistance. Start topic practice now; do not require finishing the entire route first.",
    review: "Run a delayed retrieval check: ask me to reconstruct one key idea and then solve one unseen transfer problem on paper. Withhold the solution until I attempt it. Distinguish independent recovery from work done after hints or viewing a solution. Record the date, reference, time and exact error to repair; do not infer mastery from one percentage or invent admission cutoffs.",
    project: `Create one small mathematical experiment for ${u.project || "this unit"}. First ask me for the model, assumptions, prediction, derivation and a sanity check on paper. Help me turn those into pseudocode. I should write or modify one small mathematical function and explain every input/output, invariant and test. You may implement interface, graphics and repetitive plumbing. Use incremental, runnable changes, deterministic test cases and seeded simulation where useful. Compare numerical uncertainty with analytical predictions. Keep the result small enough to return to exam practice in the same week; no full game engine or extra backend unless required. Do not write the mathematical solution before my attempt.`,
  };
  return [...context, instructions[mode]].join("\n\n");
}
