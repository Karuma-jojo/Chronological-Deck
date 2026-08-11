import { createLawNode } from "./law-node.js";

const STAGE = "Jurisprudence & political philosophy";

export const LAW_JURISPRUDENCE = [
  createLawNode(641, "Ancient Law & Justice: Greek, Roman, Indian & Chinese Traditions", "L1", "Survey foundational ideas of justice, duty, order, citizenship and adjudication across several ancient legal and philosophical traditions.", ["ARC007", "ARC631"], { gateway: true, stage: STAGE }),
  createLawNode(642, "Natural Law: Aquinas to Modern Natural-Law Theory", "L1", "Examine the claim that legal validity or obligation is connected to reason, morality, human goods or a higher normative order.", ["ARC641"], { stage: STAGE }),
  createLawNode(643, "Hobbes: Sovereignty, Security & Command", "L1", "Study sovereign authority, the state of nature, political obligation and the legal problem of order under centralized power.", ["ARC631", "ARC641"], { stage: STAGE }),
  createLawNode(644, "Locke: Rights, Property & Limited Government", "L1", "Natural rights, consent, property, toleration and the justification and limits of political authority.", ["ARC643"], { stage: STAGE }),
  createLawNode(645, "Rousseau: General Will & Popular Sovereignty", "L1", "Popular sovereignty, civic freedom, legitimacy and tensions between collective self-rule and individual liberty.", ["ARC643"], { stage: STAGE }),
  createLawNode(646, "Bentham & Mill: Utility, Codification & Liberty", "L1", "Utilitarian foundations of legislation, codification, harm, liberty and the measurement of public welfare.", ["ARC641"], { stage: STAGE }),
  createLawNode(647, "Kant: Autonomy, Duty & Right", "L1", "Persons as ends, autonomy, universalization, coercion and the relation between moral duty and juridical right.", ["ARC641"], { stage: STAGE }),
  createLawNode(648, "Legal Positivism I: Austin & Command Theory", "L2", "Analyze law as sovereign command backed by sanctions and the separation of legal validity from moral merit.", ["ARC643", "ARC642"], { stage: STAGE }),
  createLawNode(649, "Legal Positivism II: Hart, Rules & Open Texture", "L2", "Primary and secondary rules, the rule of recognition, internal point of view and the limits created by linguistic open texture.", ["ARC648", "ARC637"], { stage: STAGE }),
  createLawNode(650, "Kelsen: Pure Theory, Validity & Norm Hierarchies", "L2", "Understand legal systems as hierarchies of norms, validity relations and institutional authorization rather than moral or sociological facts.", ["ARC648", "ARC633"], { stage: STAGE }),
  createLawNode(651, "Legal Realism: Holmes, Llewellyn & Courts in Action", "L2", "Test formal doctrine against judicial behavior, institutional incentives, factual uncertainty and the practical prediction of legal outcomes.", ["ARC638", "ARC649"], { stage: STAGE }),
  createLawNode(652, "Dworkin: Principles, Rights & Law as Integrity", "L2", "Contrast rules with principles, examine hard cases and rights, and reason about coherent interpretation across a legal system.", ["ARC649", "ARC638"], { stage: STAGE }),
  createLawNode(653, "Rawls: Justice as Fairness", "L2", "Original position, veil of ignorance, basic liberties, fair equality of opportunity and distributive justice.", ["ARC644", "ARC647"], { stage: STAGE }),
  createLawNode(654, "Critical Legal Studies: Power, Indeterminacy & Structure", "L2", "Examine claims that doctrine can be indeterminate and that legal categories may reproduce political, economic and institutional power.", ["ARC651", "ARC652"], { stage: STAGE }),
  createLawNode(655, "Feminist, Critical Race & Postcolonial Jurisprudence", "L2", "Analyze how law constructs and distributes power across gender, race, caste, class, colonial history and social identity.", ["ARC654", "ARC653"], { stage: STAGE }),
  createLawNode(656, "Law & Economics: Incentives, Costs & Institutional Design", "L2", "Use incentives, externalities, transaction costs, bargaining and welfare analysis to evaluate legal rules while identifying normative limits.", ["ARC197", "ARC646"], { stage: STAGE }),
  createLawNode(657, "Sociological & Pragmatist Jurisprudence", "L2", "Study law as a social institution shaped by practice, consequences, professional culture and changing social needs.", ["ARC651"], { stage: STAGE }),
  createLawNode(658, "Authority, Legitimacy & Political Obligation", "L2", "Ask when law has authority, why subjects should obey it and how consent, fairness, democracy and associative duties compete.", ["ARC643", "ARC644", "ARC645", "ARC649"], { stage: STAGE }),
  createLawNode(659, "Civil Disobedience, Resistance & Emergency Powers", "L2", "Reason about principled lawbreaking, conscientious refusal, resistance, necessity and the limits of state power during emergencies.", ["ARC658", "ARC653"], { stage: STAGE }),
  createLawNode(660, "Punishment: Retribution, Deterrence, Rehabilitation & Restoration", "L2", "Compare theories of punishment and proportionality, including retributive, consequentialist, rehabilitative and restorative approaches.", ["ARC646", "ARC647", "ARC653"], { stage: STAGE }),
];
