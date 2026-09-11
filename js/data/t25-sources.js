// Scope references, not proof certificates. Recheck application-year rules.
export const T25_REVIEWED_ON = "2026-09-11";
const gate = "https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/";
export const T25_SOURCES = {
  mstat: { title: "ISI M.Stat PSA/PSB syllabus · 2026", year: 2026, url: "https://admission.isical.ac.in/Syllabus/MStat-PSA-PSB-Syllabus-2026.pdf", provenance: "Full official PDF supplied by the learner; read in full. Live ISI retrieval was intermittent during review." },
  msqe: { title: "ISI MSQE syllabus · 2026", year: 2026, url: "https://admission.isical.ac.in/Programs/MSQE.html", provenance: "Full official MSQE-Syllabus-2026.pdf supplied by the learner; read in full. Programme page is the resource entry point." },
  cmi: { title: "CMI MSc Data Science entrance syllabus", year: null, url: "https://www.cmi.ac.in/admissions/syllabus/datascience-syllabus.pdf", provenance: "Official undated syllabus linked from the current admissions page; read in full on the review date." },
  st: { title: "GATE Statistics · 2027", year: 2027, url: gate + "ST_GATE2027_Syllabus.pdf" },
  da: { title: "GATE Data Science & AI · 2027", year: 2027, url: gate + "DA_GATE2027_Syllabus.pdf" },
  ma: { title: "GATE Mathematics · 2027", year: 2027, url: gate + "MA_GATE2027_Syllabus.pdf" },
  cs: { title: "GATE Computer Science · 2027", year: 2027, url: gate + "CS_GATE2027_Syllabus.pdf" },
  ga: { title: "GATE General Aptitude · 2027", year: 2027, url: gate + "GA_GATE2027_Syllabus.pdf" },
  gatePairs: { title: "GATE 2027 permitted two-paper combinations", year: 2027, url: "https://gate2027.iitm.ac.in/two_paper_combinations" },
  gateEligibility: { title: "GATE 2027 eligibility", year: 2027, url: "https://gate2027.iitm.ac.in/eligibility_criteria" },
  cmiAdmissions: { title: "CMI admissions · 2026", year: 2026, url: "https://www.cmi.ac.in/admissions/" },
  study: { title: "IES: Organizing Instruction and Study to Improve Student Learning", year: 2007, url: "https://ies.ed.gov/ncee/wwc/PracticeGuide/1" },
};

export const T25_PAPERS = {
  mstat: "https://admission.isical.ac.in/Programs/MStat.html",
  msqe: "https://admission.isical.ac.in/Programs/MSQE.html",
  cmi: "https://www.cmi.ac.in/admissions/syllabus.php",
  gate: "https://gate2027.iitm.ac.in/",
};

export const T25_EXAMS = {
  mstat: { name: "ISI M.Stat", priority: "Primary", source: "mstat", advice: "Use the complete syllabus and both PSA and PSB practice. Projects support written mathematics; they do not substitute for it." },
  cmi: { name: "CMI MSc Data Science", priority: "Closest complementary entrance", source: "cmi", advice: "Add number theory, discrete reasoning and pseudocode interpretation. This overlap is a curriculum judgement, not an admission-probability ranking." },
  st: { name: "GATE ST", priority: "Conditional statistics extension", source: "st", advice: "Strong statistics overlap, with substantial extra analysis, stochastic processes and advanced inference. Choose it for a verified destination programme." },
  da: { name: "GATE DA", priority: "Conditional computing extension", source: "da", advice: "Adds Python, algorithms, databases, machine learning and AI. CMI entrance-level pseudocode alone does not cover it." },
  msqe: { name: "ISI MSQE", priority: "Conditional economics branch", source: "msqe", advice: "Share mathematics and statistics; commit separately to microeconomics, macroeconomics and the additional optimisation topics." },
  ma: { name: "GATE MA", priority: "Specialist alternative", source: "ma", advice: "Requires extensive analysis, algebra, topology, differential equations and numerical methods. Activate after a deliberate mathematics-programme decision." },
  cs: { name: "GATE CS", priority: "Specialist alternative", source: "cs", advice: "Requires a broad CS curriculum including C, systems, automata, compilers and networks. It is a separate preparation commitment." },
};
