// SMMC whole-paper vault scaffold v1.
// A/B sessions are the finite East competition corpus. A session PDF contains four
// questions, so opening a whole official paper must not silently preserve pristine status.

import ledger from "./ledger.mjs";
import { exposureClass, markExposure } from "./runtime/exposure.mjs";

const sessionOrder = { A: 1, B: 2, C: 3 };
const groups = new Map();

for (const problem of ledger) {
  const id = String(problem.year) + "-" + problem.session;
  if (!groups.has(id)) groups.set(id, []);
  groups.get(id).push(problem);
}

export const SMMC_PAPERS_V1 = Object.freeze(
  [...groups.entries()]
    .map(([id, problems]) => {
      const ordered = [...problems].sort((a,b) => a.problem - b.problem);
      return Object.freeze({
        id,
        year: ordered[0].year,
        session: ordered[0].session,
        eastRelevant: ordered.every(p => p.eastRelevant),
        problemIds: Object.freeze(ordered.map(p => p.id))
      });
    })
    .sort((a,b) => a.year - b.year || sessionOrder[a.session] - sessionOrder[b.session])
);

export const SMMC_EAST_PAPERS_V1 = Object.freeze(
  SMMC_PAPERS_V1.filter(p => p.eastRelevant && (p.session === "A" || p.session === "B"))
);

export const SMMC_SUPPLEMENTARY_PAPERS_V1 = Object.freeze(
  SMMC_PAPERS_V1.filter(p => !p.eastRelevant)
);

export const SMMC_PAPER_VAULT_POLICY = Object.freeze({
  sessionMinutes: 180,
  eastSessions: Object.freeze(["A", "B"]),
  openingWholeSessionConsumesAllStatements: true,
  isolatedProblemRule: "A single-problem view must not reveal sibling questions from the same session.",
  currentOfficialPdfRule: "The organiser session PDF is a whole-paper reveal unless a genuinely isolated problem source is provided.",
  competitionDayRule: "A+B day mode uses two separate three-hour session records; do not infer an unstated break duration."
});

export function paperById(id) {
  return SMMC_PAPERS_V1.find(p => p.id === id) || null;
}

export function paperVaultStatus(state, paperOrId) {
  const paper = typeof paperOrId === "string" ? paperById(paperOrId) : paperOrId;
  if (!paper) throw new Error("Unknown SMMC paper");
  const rows = paper.problemIds.map(problemId => ({
    problemId,
    exposure: exposureClass(state, problemId)
  }));
  const development = rows.filter(x => x.exposure.class === "development").length;
  const statementExposed = rows.filter(x => x.exposure.class === "transfer").length;
  const sealed = rows.filter(x => x.exposure.class === "sealed").length;
  const status = development ? "development-exposed" :
    statementExposed ? "statement-exposed" : "sealed-pristine";
  return Object.freeze({
    paperId: paper.id,
    status,
    sealed,
    statementExposed,
    development,
    pristinePaperEligible: status === "sealed-pristine",
    rows: Object.freeze(rows)
  });
}

export function wholePaperRevealImpact(state, paperOrId) {
  const paper = typeof paperOrId === "string" ? paperById(paperOrId) : paperOrId;
  if (!paper) throw new Error("Unknown SMMC paper");
  const currentlySealed = paper.problemIds.filter(id => exposureClass(state,id).class === "sealed");
  return Object.freeze({
    paperId: paper.id,
    problemIds: paper.problemIds,
    newlyStatementExposed: Object.freeze(currentlySealed),
    consumesPristinePaper: currentlySealed.length > 0
  });
}

export function markWholePaperStatementSeen(state, paperOrId, at = new Date().toISOString()) {
  const paper = typeof paperOrId === "string" ? paperById(paperOrId) : paperOrId;
  if (!paper) throw new Error("Unknown SMMC paper");
  for (const problemId of paper.problemIds) {
    markExposure(state, problemId, "statementSeenAt", at);
  }
  return paperVaultStatus(state, paper);
}
