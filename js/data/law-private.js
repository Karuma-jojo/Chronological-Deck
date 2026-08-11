import { createLawNode } from "./law-node.js";

const STAGE = "Private & commercial law";

export const LAW_PRIVATE = [
  createLawNode(675, "Contract I: Formation, Offer, Acceptance & Consent", "L2", "Form agreements through offer, acceptance, consideration or cause, intention and capacity while separating bargains from nonbinding arrangements.", ["ARC633", "ARC637"], { gateway: true, stage: STAGE }),
  createLawNode(676, "Contract II: Terms, Interpretation & Vitiating Factors", "L3", "Interpret express and implied terms; analyze mistake, misrepresentation, duress, undue influence, illegality and unfair terms.", ["ARC675", "ARC639"], { stage: STAGE }),
  createLawNode(677, "Contract III: Breach, Damages & Specific Relief", "L3", "Classify breach and calculate expectation, reliance, restitutionary and specific remedies with mitigation and remoteness limits.", ["ARC676"], { stage: STAGE }),
  createLawNode(678, "Tort I: Duty, Breach, Fault & Standards of Care", "L2", "Analyze negligence and other civil wrongs through duty, breach, fault, standards of care and policy constraints.", ["ARC633", "ARC506"], { stage: STAGE }),
  createLawNode(679, "Tort II: Causation, Remoteness & Defences", "L3", "Distinguish factual and legal causation, intervening causes, remoteness, comparative fault and affirmative defences.", ["ARC678", "ARC506"], { stage: STAGE }),
  createLawNode(680, "Property: Possession, Ownership, Transfer & Estates", "L2", "Possession, title, ownership, transfer, estates and competing claims to land, goods and intangible property.", ["ARC633"], { stage: STAGE }),
  createLawNode(681, "Equity, Trusts & Fiduciary Obligations", "L3", "Equitable jurisdiction, injunctions, trusts, fiduciary loyalty, confidence and remedies where strict legal rules are inadequate.", ["ARC680", "ARC677"], { stage: STAGE }),
  createLawNode(682, "Family Law, Capacity & Legal Status", "L3", "Marriage and partnership, parent-child relations, guardianship, capacity, support and the legal construction of personal status.", ["ARC668", "ARC680"], { stage: STAGE }),
  createLawNode(683, "Corporate Personality, Governance & Agency", "L3", "Separate legal personality, limited liability, agency, directors' duties, shareholder power and governance structures.", ["ARC675", "ARC681"], { stage: STAGE }),
  createLawNode(684, "Commercial Transactions, Sale & Secured Credit", "L3", "Sale of goods, payment, warranties, risk allocation, security interests and priority in commercial transactions.", ["ARC675", "ARC680", "ARC683"], { stage: STAGE }),
  createLawNode(685, "Insolvency, Bankruptcy & Creditor Priorities", "L4", "Collective debt enforcement, insolvency estates, restructuring, liquidation, priorities and the tradeoff between rescue and distribution.", ["ARC684", "ARC681"], { stage: STAGE }),
];
