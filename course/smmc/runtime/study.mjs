export const SMMC_STUDY_VERSION = 1;

export const emptySmmcStudy = () => ({ version: SMMC_STUDY_VERSION, attempts: [] });

const stamp = value =>
  typeof value === "string" &&
  /^\d{4}-\d\d-\d\dT/.test(value) &&
  Number.isFinite(Date.parse(value));

const assistance = new Set(["independent","neutral-tool","hint","guided","revealed"]);

export function validateSmmcStudy(value, knownTaskIds = []) {
  if (!value || typeof value !== "object" || Array.isArray(value) ||
      value.version !== SMMC_STUDY_VERSION ||
      !Array.isArray(value.attempts) || value.attempts.length > 10000) {
    throw new Error("Unsupported neutral study record");
  }

  const known = new Set(knownTaskIds);
  const seen = new Set();
  const out = emptySmmcStudy();

  for (const a of value.attempts) {
    if (!a || typeof a !== "object" ||
        typeof a.id !== "string" || a.id.length > 120 || seen.has(a.id) ||
        !known.has(a.taskId) ||
        !stamp(a.at) ||
        typeof a.answer !== "string" || a.answer.length > 100000 ||
        !assistance.has(a.assistance) ||
        !Number.isFinite(a.minutes) || a.minutes < 0 || a.minutes > 100000 ||
        typeof a.referenceSeenBefore !== "boolean" ||
        (a.referenceOpenedAt !== undefined && !stamp(a.referenceOpenedAt))) {
      throw new Error("Invalid neutral study attempt");
    }
    seen.add(a.id);
    out.attempts.push({
      id:a.id,
      taskId:a.taskId,
      at:a.at,
      answer:a.answer,
      assistance:a.assistance,
      minutes:a.minutes,
      referenceSeenBefore:a.referenceSeenBefore,
      ...(a.referenceOpenedAt ? { referenceOpenedAt:a.referenceOpenedAt } : {}),
    });
  }
  return out;
}

export function mergeSmmcStudy(local, remote, knownTaskIds = []) {
  const a = validateSmmcStudy(local, knownTaskIds);
  const b = remote ? validateSmmcStudy(remote, knownTaskIds) : emptySmmcStudy();
  const merged = new Map(a.attempts.map(x => [x.id,x]));
  for (const x of b.attempts) {
    const old = merged.get(x.id);
    if (old && JSON.stringify(old) !== JSON.stringify(x)) {
      throw new Error("Conflicting SMMC neutral attempt ID");
    }
    merged.set(x.id,x);
  }
  return validateSmmcStudy({
    version:SMMC_STUDY_VERSION,
    attempts:[...merged.values()].sort((x,y)=>x.at.localeCompare(y.at)),
  }, knownTaskIds);
}
