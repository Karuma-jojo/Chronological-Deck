import { createLawNode } from "./law-node.js";

const STAGE = "Criminal law, evidence & procedure";

export const LAW_PROCEDURE = [
  createLawNode(686, "Criminal Liability I: Actus Reus, Mens Rea & Causation", "L2", "Construct offences from conduct, circumstance, result and mental elements; analyze causation and coincidence.", ["ARC633", "ARC660", "ARC506"], { gateway: true, stage: STAGE }),
  createLawNode(687, "Criminal Liability II: Defences, Attempts & Complicity", "L3", "Justification and excuse, insanity, mistake, self-defence, necessity, attempt, conspiracy, aiding and joint liability.", ["ARC686", "ARC659"], { stage: STAGE }),
  createLawNode(688, "Sentencing, Proportionality & Correctional Justice", "L3", "Apply sentencing purposes, aggravation and mitigation, proportionality, discretion and alternatives to incarceration.", ["ARC660", "ARC687"], { stage: STAGE }),
  createLawNode(689, "Criminal Procedure: Investigation, Search, Arrest & Charge", "L3", "Police powers, warrants, search and seizure, arrest, interrogation, charging discretion and exclusionary protections.", ["ARC668", "ARC670", "ARC686"], { stage: STAGE }),
  createLawNode(690, "Criminal Trial, Counsel & Fair Process", "L3", "Presumption of innocence, right to counsel, impartial tribunal, confrontation, plea processes and fair-trial guarantees.", ["ARC689", "ARC670"], { stage: STAGE }),
  createLawNode(691, "Evidence I: Relevance, Admissibility & Exclusion", "L3", "Determine logical and legal relevance, admissibility, prejudice, exclusionary rules and foundational requirements.", ["ARC501", "ARC634", "ARC690"], { stage: STAGE }),
  createLawNode(692, "Evidence II: Hearsay, Witnesses & Character", "L3", "Testimonial competence, credibility, impeachment, hearsay and exceptions, character and prior-acts evidence.", ["ARC691", "ARC639"], { stage: STAGE }),
  createLawNode(693, "Evidence III: Experts, Forensics & Digital Evidence", "L4", "Evaluate expert reliability, scientific and statistical proof, authentication, chain of custody and digital evidence.", ["ARC691", "ARC048", "ARC502", "ARC501"], { stage: STAGE }),
  createLawNode(694, "Burdens, Presumptions & Standards of Proof", "L4", "Distinguish burdens of production and persuasion, presumptions and civil/criminal proof standards; avoid base-rate and prosecutor fallacies.", ["ARC693", "ARC048", "ARC502", "ARC639"], { stage: STAGE }),
  createLawNode(695, "Civil Procedure, Jurisdiction & Case Management", "L3", "Subject-matter and personal jurisdiction, pleadings, service, interim relief, discovery, trial, appeal and preclusion.", ["ARC633", "ARC670"], { stage: STAGE }),
];
