import { createLawNode } from "./law-node.js";

const STAGE = "Advanced fields, advocacy & capstone";

export const LAW_ADVANCED = [
  createLawNode(696, "Remedies, Enforcement & Contempt", "L4", "Choose and enforce damages, injunctions, declarations, restitution, specific performance and coercive or compensatory contempt remedies.", ["ARC677", "ARC681", "ARC666", "ARC695"], { stage: STAGE }),
  createLawNode(697, "International Law: Sources, Treaties & Custom", "L3", "Treaty formation and interpretation, customary international law, general principles, state responsibility and international institutions.", ["ARC633", "ARC661"], { stage: STAGE }),
  createLawNode(698, "Human Rights, Humanitarian & International Criminal Law", "L4", "International human rights obligations, armed-conflict rules, atrocity crimes, individual responsibility and enforcement institutions.", ["ARC697", "ARC668", "ARC660"], { stage: STAGE }),
  createLawNode(699, "Technology Law: Privacy, Cybersecurity, AI & Digital Platforms", "L4", "Apply public and private law to data protection, surveillance, cybersecurity, automated decisions, platform governance and AI accountability.", ["ARC668", "ARC672", "ARC693"], { stage: STAGE }),
  createLawNode(700, "Intellectual Property: Copyright, Patent & Trademark", "L4", "Justifications, subject matter, scope, infringement, defences and remedies across copyright, patents and trademarks.", ["ARC680", "ARC656"], { stage: STAGE }),
  createLawNode(701, "Labour & Employment Law", "L4", "Employment status, contracts, wages, workplace rights, discrimination, collective bargaining and dismissal.", ["ARC675", "ARC669"], { stage: STAGE }),
  createLawNode(702, "Environmental & Natural Resources Law", "L4", "Regulation of pollution, land, water and climate harms through permits, standards, liability, precaution and public-trust ideas.", ["ARC672", "ARC678"], { stage: STAGE }),
  createLawNode(703, "Tax Law & Public Revenue", "L4", "Tax bases, incidence, avoidance/evasion boundaries, statutory interpretation, administration and constitutional constraints on revenue.", ["ARC673", "ARC667"], { stage: STAGE }),
  createLawNode(704, "Consumer, Competition & Market Regulation", "L4", "Consumer protection, antitrust/competition, unfair practices, market power, regulatory design and enforcement.", ["ARC656", "ARC672", "ARC684"], { stage: STAGE }),
  createLawNode(705, "Negotiation, Mediation & Arbitration", "L4", "Interest-based negotiation, bargaining strategy, mediation, arbitration agreements, arbitral procedure and enforcement of awards.", ["ARC197", "ARC675", "ARC695"], { stage: STAGE }),
  createLawNode(706, "Legal Ethics & Professional Responsibility", "L4", "Duties to client, court and justice system; confidentiality, conflicts, competence, candour, independence and professional discipline.", ["ARC640", "ARC665", "ARC695"], { stage: STAGE }),
  createLawNode(707, "Judicial Decision-Writing & Opinion Structure", "L5", "Write reasoned judgments that separate facts, issues, rules, findings and holdings; address counterarguments and craft administrable rules.", ["ARC634", "ARC638", "ARC667", "ARC706"], { stage: STAGE }),
  createLawNode(708, "Moot Court: Oral Advocacy & Appellate Argument", "L5", "Prepare written and oral appellate advocacy, answer hostile questions, concede strategically and defend a position from the record and authorities.", ["ARC640", "ARC635", "ARC707"], { stage: STAGE }),
  createLawNode(709, "Comparative Law, Legal Transplants & Institutional Design", "L5", "Compare how different systems solve common problems; analyze transplants, path dependence and institutional fit before importing legal rules.", ["ARC632", "ARC657", "ARC661"], { stage: STAGE }),
  createLawNode(710, "Capstone: Integrated Legal Problem, Brief & Judgment", "L5", "Resolve a complex multi-field record by researching authority, briefing both sides, presenting oral argument and writing a defensible reasoned judgment.", ["ARC708", "ARC709", "ARC694", "ARC696", "ARC698", "ARC699"], {
    stage: STAGE,
    masteryScope: "Clear by producing a research-backed brief for both sides, conducting an oral moot under questioning, and writing a reasoned judgment that identifies authority, facts, standards, remedies, counterarguments and ethical constraints.",
  }),
];
