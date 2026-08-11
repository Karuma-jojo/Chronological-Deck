import { createLawNode } from "./law-node.js";

const STAGE = "Legal reasoning foundations";

export const LAW_FOUNDATIONS = [
  createLawNode(631, "Law, Norms & Institutions", "L0", "What makes a legal rule different from a habit, moral norm, command or social convention; how institutions create, apply and enforce law.", ["ARC008", "ARC046"], { gateway: true, stage: STAGE }),
  createLawNode(632, "Legal Traditions & Families", "L0", "Compare common-law, civil-law, Roman, Islamic, Hindu, customary and mixed legal traditions, including codification and judge-made law.", ["ARC631"], { stage: STAGE }),
  createLawNode(633, "Sources of Law & Hierarchy of Authority", "L0", "Constitutions, statutes, regulations, cases, custom and persuasive authority; resolve conflicts among sources and levels of law.", ["ARC631", "ARC632"], { stage: STAGE }),
  createLawNode(634, "Reading Cases: Facts, Issues, Holdings & Reasons", "L0", "Extract legally material facts, procedural posture, issues, holdings, ratio decidendi, dicta and the court's chain of reasoning.", ["ARC633"], { stage: STAGE }),
  createLawNode(635, "Legal Research, Citation & Weight of Authority", "L0", "Find primary and secondary authority, trace validity and subsequent treatment, cite accurately and distinguish binding from persuasive sources.", ["ARC633", "ARC634"], { stage: STAGE }),
  createLawNode(636, "Deduction, Induction & Abduction in Legal Reasoning", "L0", "Use deductive rule application, inductive generalization and abductive inference to move between facts, rules and explanations.", ["ARC002", "ARC008", "ARC134"], { gateway: true, stage: STAGE }),
  createLawNode(637, "Syllogisms, Enthymemes & Rule Application", "L0", "Build and test legal syllogisms, expose hidden premises and handle defeasible rules, exceptions and open-textured terms.", ["ARC636", "ARC008"], { stage: STAGE }),
  createLawNode(638, "Analogy, Precedent & Distinguishing Cases", "L1", "Reason from precedent by identifying legally relevant similarities and differences; distinguish, extend, narrow or overrule analogies.", ["ARC634", "ARC637"], { stage: STAGE }),
  createLawNode(639, "Fallacies, Burdens & Argument Mapping", "L1", "Map competing legal arguments, identify fallacies and premise gaps, allocate burdens and evaluate rebuttals and counterexamples.", ["ARC637", "ARC501"], { stage: STAGE }),
  createLawNode(640, "Rhetoric, Persuasion & Adversarial Advocacy", "L1", "Use ethos, logos, pathos, framing, narrative and concession without sacrificing accuracy; construct arguments for both sides.", ["ARC639"], { stage: STAGE }),
];
