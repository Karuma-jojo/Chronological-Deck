export function createLawNode(
  number,
  title,
  level,
  summary,
  masteryPrereqs,
  { gateway = false, stage = "Law & jurisprudence", masteryScope = "" } = {},
) {
  const id = `ARC${number}`;
  return {
    id,
    arc: `ARC ${number}`,
    title,
    kind: "new",
    level,
    domains: ["Law & Jurisprudence"],
    summary,
    storyPrereqs: [],
    crossLinks: [],
    masteryPrereqs: [...masteryPrereqs],
    playOrder: null,
    sourceStart: null,
    sourceEnd: null,
    deck: "Law & Jurisprudence Expansion",
    commonGroup: null,
    gatewayTags: gateway ? ["Law"] : [],
    terminalTags: ["T21"],
    requiredByCount: 1,
    stage,
    ...(masteryScope ? { masteryScope } : {}),
  };
}
