import { createLawNode } from "./law-node.js";

const STAGE = "Constitutional & public law";

export const LAW_PUBLIC = [
  createLawNode(661, "The State, Constitutions & Separation of Powers", "L2", "Model the legal state, constituent power and division of legislative, executive and judicial authority.", ["ARC633", "ARC658"], { gateway: true, stage: STAGE }),
  createLawNode(662, "Rule of Law, Constitutionalism & Limited Government", "L2", "Legality, generality, prospectivity, institutional restraint and the tension between democratic power and constitutional limits.", ["ARC661", "ARC649"], { stage: STAGE }),
  createLawNode(663, "Legislatures: Representation, Procedure & Delegated Power", "L2", "How legislatures create law, represent interests, structure procedure and delegate rulemaking while remaining accountable.", ["ARC661", "ARC633"], { stage: STAGE }),
  createLawNode(664, "Executive Power & the Administrative State", "L2", "Executive authority, agencies, discretion, implementation, delegated legislation and the modern regulatory state.", ["ARC661", "ARC663"], { stage: STAGE }),
  createLawNode(665, "Courts, Judicial Independence & the Judicial Role", "L2", "Institutional independence, impartiality, appointment, jurisdiction and competing conceptions of what judges should do.", ["ARC661", "ARC652"], { stage: STAGE }),
  createLawNode(666, "Judicial Review, Standing & Constitutional Remedies", "L3", "Review legality and constitutionality, justiciability, standing, standards of review and remedies against unlawful public action.", ["ARC662", "ARC665"], { stage: STAGE }),
  createLawNode(667, "Constitutional Interpretation: Text, History, Structure & Purpose", "L3", "Compare textual, originalist, historical, structural, purposive, precedent-based and living-constitution approaches.", ["ARC638", "ARC652", "ARC662"], { stage: STAGE }),
  createLawNode(668, "Fundamental Rights & Proportionality", "L3", "Analyze rights, limitations, balancing, proportionality, strict scrutiny-style tests and positive versus negative obligations.", ["ARC653", "ARC662", "ARC667"], { stage: STAGE }),
  createLawNode(669, "Equality, Anti-Discrimination & Classification", "L3", "Formal and substantive equality, suspect classifications, disparate treatment and impact, accommodation and remedial equality.", ["ARC655", "ARC668"], { stage: STAGE }),
  createLawNode(670, "Due Process, Natural Justice & Fair Hearing", "L3", "Notice, hearing, impartial decision-maker, reasons, procedural fairness and substantive constraints on arbitrary power.", ["ARC662", "ARC665"], { stage: STAGE }),
  createLawNode(671, "Federalism & Multi-Level Government", "L3", "Allocate powers across national, regional and local governments; resolve supremacy, competence and intergovernmental conflicts.", ["ARC661", "ARC662"], { stage: STAGE }),
  createLawNode(672, "Administrative Law: Jurisdiction, Reasonableness & Review", "L3", "Control administrative power through legality, jurisdiction, reasonableness, proportionality, procedural fairness and judicial review.", ["ARC664", "ARC666", "ARC670"], { stage: STAGE }),
  createLawNode(673, "Public Finance, Taxing Power & Accountability", "L3", "Constitutional and administrative principles governing taxation, expenditure, appropriation, audit and fiscal accountability.", ["ARC663", "ARC664"], { stage: STAGE }),
  createLawNode(674, "Elections, Democratic Legitimacy & Political Parties", "L3", "Voting systems, representation, districting, campaign regulation, party organization and legal safeguards for democratic competition.", ["ARC645", "ARC663", "ARC669"], { stage: STAGE }),
];
