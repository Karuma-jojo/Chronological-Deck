// Individually authored T25 M.Stat audited-v4 cards 153-154.
export const T25_ATOMIC_V4_153_154 = [
  {
    id: "T25-ARC844-A1153",
    routeOrder: 153,
    syllabusCode: "S3.1",
    targetCode: "S3",
    parentId: "ARC844",
    title: "Compute one- and two-unit inclusion probabilities in a concrete design.",
    focus: "Translate a concrete unequal-probability or overlapping-frame sampling mechanism into first- and second-order inclusion probabilities by working from the actual sample-selection events rather than assuming simple-random-sampling formulas.",
    purpose: "Make inclusion probabilities operational: the learner must identify what event includes a unit or pair and compute its probability correctly before any inverse-probability estimator is attempted.",
    centralCapability: "Given a fully specified finite-population sampling design, derive pi_i=P(i in s) and pi_ij=P(i and j in s), including designs where units can be reachable through overlapping selection routes, and distinguish these probabilities from draw probabilities or sample-set probabilities.",
    principalObstacle: "The main trap is treating a unit's inclusion probability as its probability on one draw, adding overlapping routes without correcting their intersection, or replacing pair inclusion pi_ij by pi_i pi_j without a justified independence statement.",
    entryPrerequisites: ["S1 sample-set probabilities and design randomness", "P3 inclusion-exclusion for overlapping events", "J1 indicator-variable probability reasoning"],
    requiredOwnership: [
      "Define the inclusion indicator I_i and identify pi_i=E(I_i)=P(i in s)",
      "Define pi_ij=E(I_i I_j)=P(i and j in s) for distinct units",
      "Compute inclusion through multiple selection routes using unions and inclusion-exclusion rather than naive addition",
      "Distinguish per-draw selection probability, first-order inclusion probability, pair inclusion probability and probability of an entire realised sample",
      "Recognise that pi_ij generally is not pi_i pi_j under without-replacement or otherwise dependent designs",
      "Check computed probabilities against 0<=pi_i<=1 and 0<=pi_ij<=min(pi_i,pi_j)",
      "Use fixed-size identities such as sum_i pi_i=n when the design genuinely has fixed sample size n",
      "Keep the finite-population quantity of interest separate from the randomness introduced by the design"
    ],
    inScope: [
      "First-order inclusion probabilities in concrete finite-population designs",
      "Second-order inclusion probabilities for pairs of units",
      "Overlapping selection routes handled by inclusion-exclusion",
      "Elementary consistency checks implied by fixed sample size or probability bounds"
    ],
    outOfScope: [
      "Horvitz-Thompson or other inverse-probability unbiasedness proofs, reserved for S3.2",
      "General variance estimation for Horvitz-Thompson estimators",
      "PPS algorithm design or advanced unequal-probability sampling schemes",
      "Model-based survey inference or nonresponse adjustment"
    ],
    applicationScope: "Entrance problems describing households, clusters, frames, links or staged selection rules and asking for the probability that a named unit or pair appears in the final sample.",
    transferScope: "An unfamiliar overlapping-frame design where a unit can enter through more than one route and the learner must reconstruct the relevant union/intersection events, detect dependence, and reject an apparently plausible product or simple-sum probability.",
    exitCondition: "Given a concrete finite-population design with at least one overlapping or dependent selection feature, independently derive all requested pi_i and pi_ij values from sample-selection events and verify them using probability bounds or a fixed-size identity when applicable.",
    nextArcBoundary: "154 S3.2 uses the first-order inclusion probabilities now owned to prove an inverse-inclusion-weighted estimator unbiased; it does not expand into general survey-estimator variance theory."
  },
  {
    id: "T25-ARC844-A1154",
    routeOrder: 154,
    syllabusCode: "S3.2",
    targetCode: "S3",
    parentId: "ARC844",
    title: "Prove an inverse-inclusion-weighted estimate is unbiased.",
    focus: "Use inclusion indicators and positive first-order inclusion probabilities to prove inverse-probability weighting recovers a finite-population total in expectation, while keeping totals, counts and means conceptually distinct.",
    purpose: "Turn inverse-inclusion weighting from a remembered recipe into a one-line indicator-expectation argument whose assumptions and estimand are visible, especially in unequal-inclusion designs.",
    centralCapability: "For a finite-population total Y=sum_i y_i and a design with known pi_i>0, express the Horvitz-Thompson form sum_i I_i y_i/pi_i and prove design-unbiasedness by linearity of expectation, then determine what additional known quantity is needed to convert a total estimate into a population mean.",
    principalObstacle: "The main trap is dividing by inclusion probabilities without naming the estimand, confusing an estimated household/person total with a mean, or overlooking a unit with pi_i=0, for which no inverse-inclusion unbiased total estimator of this form can recover that unit's contribution.",
    entryPrerequisites: ["S3.1 first-order inclusion probabilities and indicators", "J1 linearity of expectation", "finite-population total versus mean distinction"],
    requiredOwnership: [
      "Write a sample sum as a population sum using inclusion indicators I_i",
      "Use E(I_i)=pi_i to show E[I_i y_i/pi_i]=y_i for every unit with pi_i>0",
      "Apply linearity of expectation without introducing an unnecessary independence assumption",
      "State the positivity requirement pi_i>0 for every population unit whose contribution must be estimable",
      "Distinguish an unbiased estimator of a finite-population total from an estimator of a population mean",
      "When N is known, convert an unbiased total estimator to an unbiased mean estimator by dividing by N",
      "Explain why unequal inclusion probabilities make an unweighted sample sum or sample mean generally biased for the corresponding population target",
      "Diagnose a proposed inverse-probability expression whose weights correspond to draw probabilities rather than actual inclusion probabilities"
    ],
    inScope: [
      "Design-unbiased inverse-inclusion estimation of finite-population totals",
      "Indicator-variable proof of Horvitz-Thompson unbiasedness",
      "Known-N conversion from total to population mean",
      "Bias diagnosis for naive unweighted estimators under unequal inclusion"
    ],
    outOfScope: [
      "Horvitz-Thompson variance formulas involving second-order inclusion probabilities",
      "Ratio estimators when population size or auxiliary totals are unknown",
      "Calibration, generalized regression, nonresponse or post-stratification weighting",
      "Asymptotic survey-sampling theory"
    ],
    applicationScope: "Entrance questions asking for an unbiased household, person, item or monetary total under unequal inclusion, or asking the learner to prove that a supplied inverse-probability estimator is unbiased.",
    transferScope: "A disguised network or overlapping-frame problem where the target is a count or total, the observed units have unequal inclusion probabilities, and the learner must choose the correct estimand and prove the weighting rather than reflexively report a sample mean.",
    exitCondition: "Given unequal positive inclusion probabilities and fixed finite-population values, independently construct the inverse-inclusion-weighted estimator for a stated total, prove its design-unbiasedness from indicators, and correctly convert to a mean only when the required population size is known.",
    nextArcBoundary: "155 V1.1 leaves survey-sampling design inference entirely and begins randomized experimental design with the CRD treatment/error model and one-way ANOVA sum-of-squares decomposition."
  }
];
