// Hand-authored T25 M.Stat v4 session cards 031-035.
// These contracts implement audited syllabus steps P3.1 through P6.1 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_031_035 = [
  {
    id:"T25-ARC817-A1031",routeOrder:31,syllabusCode:"P3.1",targetCode:"P3",parentId:"ARC817",
    title:"Derive and use complement, inclusion-exclusion and union bounds.",
    focus:"Treating probability arithmetic as set algebra with masses, including overlapping events and nonuniform finite spaces, rather than relying on favourable-over-total counting by habit.",
    purpose:"Build the event-calculus layer needed before conditioning: the learner must be able to derive finite probability identities from disjoint pieces and use them safely even when elementary outcomes are not equiprobable.",
    centralCapability:"Given a finite probability space and overlapping events, verify that the assigned masses form a coherent probability law, compute complements and unions by set decomposition, apply two- or three-event inclusion-exclusion where justified, and use the union bound as an inequality rather than an equality.",
    principalObstacle:"A learner may assume equiprobability without evidence, add overlapping event probabilities directly, or treat the union bound as exact; another common failure is to manipulate event formulas symbolically without checking that the underlying atomic probabilities are nonnegative and sum to one.",
    entryPrerequisites:["027-028 / P1 outcome modelling and counting","009 / F5.1 set operations by membership","007-008 / F4 proof and counterexample discipline"],
    requiredOwnership:[
      "Check nonnegativity and normalisation of an explicitly assigned finite probability law before using it.",
      "Derive P(A^c)=1-P(A) from a disjoint partition rather than memorising it as an isolated formula.",
      "Compute P(A∪B) and small finite unions by inclusion-exclusion, identifying exactly which intersections correct the overcount.",
      "Use P(A∪B)≤P(A)+P(B) and its finite extension as bounds, and state why equality need not hold.",
      "Separate combinatorial counting from probability weighting when elementary outcomes have unequal masses."
    ],
    applicationScope:"Finite or explicitly weighted sample spaces, overlapping events, complement calculations, finite inclusion-exclusion and elementary upper bounds on unions.",
    transferScope:"A fresh nonuniform probability assignment where naive favourable-over-total counting or direct addition gives the wrong answer, requiring a set decomposition and mass-based calculation.",
    inScope:["Probability axioms on finite spaces","Complements","Finite inclusion-exclusion","Union bounds","Nonuniform elementary-outcome probabilities"],
    outOfScope:["Conditional probability reserved for P4","Infinite unions except the monotone-limit passage in P3.2","Independence reserved for P6","Measure-theoretic probability"],
    exitCondition:"Given one unfamiliar nonuniform finite probability model, verify coherence, compute an overlapping union exactly by set decomposition, and produce a valid union-bound estimate while explaining why it is or is not sharp.",
    nextArcBoundary:"032 · P3.2 extends the same event arithmetic to increasing/decreasing sequences of events and justifies infinite-event probabilities only through monotone limits.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC817-A1032",routeOrder:32,syllabusCode:"P3.2",targetCode:"P3",parentId:"ARC817",
    title:"Pass a finite event calculation to a monotone limit with the stated probability law.",
    focus:"Using countable additivity through continuity of probability for increasing or decreasing event sequences, while keeping the finite approximation and limiting event explicitly connected.",
    purpose:"Prepare the learner to handle infinite unions/intersections without importing measure theory: every infinite-event calculation must be reduced to a justified monotone sequence of finite events whose probabilities are already known.",
    centralCapability:"Given an increasing sequence of events A_n or a decreasing sequence with the required finite-probability context, identify its limiting union/intersection, compute the finite-stage probabilities, and pass to the limit using the appropriate continuity law; state countable additivity at the operational level without treating arbitrary limits as automatically interchangeable with probability.",
    principalObstacle:"The learner may jump directly from an infinite union to a guessed sum, fail to prove that the approximating events are monotone, or use continuity from above without checking the required probability hypotheses; symbolic limit notation can hide the fact that the finite stage must match the intended event.",
    entryPrerequisites:["031 / P3.1 finite event arithmetic and union bounds","018-019 / A5 elementary sequence-limit logic","009 / F5 set membership and unions/intersections"],
    requiredOwnership:[
      "Construct finite-stage events whose union or intersection is exactly the target infinite event.",
      "Prove the event sequence is increasing or decreasing before invoking continuity of probability.",
      "Use P(∪A_n)=lim P(A_n) for increasing sequences and the corresponding decreasing-event continuity law under its stated conditions.",
      "Distinguish countable additivity for disjoint events from a generic sum of overlapping event probabilities.",
      "Carry a finite complement/inclusion-exclusion calculation through the limit without silently assuming convergence of unrelated expressions."
    ],
    applicationScope:"Elementary infinite unions/intersections generated by monotone finite truncations, such as repeated-trial tail events or nested event families where finite probabilities are explicit.",
    transferScope:"A fresh infinite-event problem in which the most natural representation is not initially monotone, requiring the learner to redesign the finite approximants before taking a probability limit.",
    inScope:["Increasing event continuity","Decreasing event continuity","Countable additivity for disjoint events","Finite truncations","Limit passage from finite probability calculations"],
    outOfScope:["Borel-Cantelli lemmas","Measure-theoretic continuity proofs","Almost-sure convergence","Infinite independent products except when later justified in P6"],
    exitCondition:"Represent one unfamiliar infinite union or intersection as a monotone limit of finite events, derive the finite-stage probability exactly, and justify the limiting probability with the correct continuity law and hypotheses.",
    nextArcBoundary:"033 · P4.1 changes the reference class: instead of enlarging event families, it conditions on known information and rebuilds probabilities inside the conditioned event.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC818-A1033",routeOrder:33,syllabusCode:"P4.1",targetCode:"P4",parentId:"ARC818",
    title:"Compute a conditional law directly from event masses.",
    focus:"Rebuilding the probability reference class after conditioning, with the denominator P(B)>0 and every conditional probability interpreted as mass inside B divided by the mass of B.",
    purpose:"Make conditioning a change of reference population rather than a formula trick, so later Bayes and independence-after-conditioning questions are grounded in event masses.",
    centralCapability:"Given a table, tree, finite sample space or weighted event model and information B with P(B)>0, compute P(A|B) directly from P(A∩B)/P(B), derive the multiplication rule from that definition, and construct the full conditional distribution over a finite partition when requested.",
    principalObstacle:"Learners often keep the old denominator after information is revealed, reverse A|B and B|A, or condition on a zero-probability event in a discrete setting; another trap is to use independence prematurely to replace intersections by products.",
    entryPrerequisites:["031-032 / P3 event masses and probability laws","009 / F5 set intersections and partitions","027 / P1 explicit sample-space modelling"],
    requiredOwnership:[
      "State the conditioning event and verify P(B)>0 before forming a finite conditional probability.",
      "Interpret A|B as restricting attention to B and then measuring the fraction of B-mass lying in A.",
      "Compute conditional probabilities directly from event masses or table/tree entries without assuming independence.",
      "Derive P(A∩B)=P(A|B)P(B) and its reversed form when both conditional probabilities are defined.",
      "Check that a finite conditional law over a partition of B is nonnegative and sums to one."
    ],
    applicationScope:"Finite tables, trees, urn/sampling stories and weighted spaces where a revealed event changes the reference class and conditional masses can be computed directly.",
    transferScope:"A fresh information-revelation problem whose wording tempts the learner to preserve the original denominator, requiring reconstruction of the conditioned population from first principles.",
    inScope:["Definition of conditional probability","Positive conditioning mass","Multiplication rule","Conditional finite distributions","Reference-class changes after information"],
    outOfScope:["Bayes reversal and total probability reserved for P4.2","Independence tests reserved for P6","Conditional densities","Regular conditional probability"],
    exitCondition:"Given one unfamiliar table or tree, compute a complete finite conditional law from raw event masses, justify the denominator change, and derive any required joint mass using the multiplication rule without assuming independence.",
    nextArcBoundary:"034 · P4.2 reverses the direction of information using a partition, total probability and Bayes; denominator reconstruction remains central but now must combine several source classes.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC818-A1034",routeOrder:34,syllabusCode:"P4.2",targetCode:"P4",parentId:"ARC818",
    title:"Reverse the information direction using a partition and Bayes.",
    focus:"Deriving total probability and Bayes from a partition of source cases, with posterior denominators assembled from all ways the observed evidence can occur.",
    purpose:"Build reverse-conditioning fluency without turning Bayes into a memorised fraction: the learner should see the denominator as the total evidence mass and update source weights accordingly.",
    centralCapability:"Given a finite partition H_1,...,H_k and observed event E, compute P(E) by total probability, then obtain posterior probabilities P(H_i|E) from prior masses and likelihoods, preserving zero/positive-mass conditions and distinguishing the direction of each conditional probability.",
    principalObstacle:"The most common error is swapping likelihood and posterior, or placing only the favoured hypothesis in the denominator instead of summing every partition route to the evidence; tree diagrams can also obscure whether branch labels are priors, likelihoods or joint masses.",
    entryPrerequisites:["033 / P4.1 direct conditioning and multiplication rule","031 / P3 finite union arithmetic","027-028 / P1 partition/counting awareness"],
    requiredOwnership:[
      "Identify or construct a disjoint exhaustive partition of source cases before applying total probability.",
      "Compute P(E)=ΣP(E|H_i)P(H_i) and explain each term as a joint route to the evidence.",
      "Apply Bayes as P(H_i|E)=P(E|H_i)P(H_i)/P(E) only when P(E)>0.",
      "Keep priors, likelihoods, joint masses and posteriors distinct in tables and trees.",
      "Check posterior normalisation across the partition and use that check to detect denominator or direction errors."
    ],
    applicationScope:"Finite diagnostic, classification, urn, source-mixture and reverse-sampling problems expressible through a small partition and observed evidence.",
    transferScope:"A fresh reverse-conditioning problem given in prose rather than a table, requiring the learner to invent the partition, reconstruct the evidence denominator, and explain why an intuitive base-rate-ignoring answer is wrong.",
    inScope:["Finite partitions","Law of total probability","Bayes theorem","Prior/likelihood/posterior distinction","Posterior normalisation"],
    outOfScope:["Continuous Bayes formulas","Bayesian inference as a full statistical framework","Likelihood-ratio testing","Independence beyond what is explicitly supplied"],
    exitCondition:"Solve one unfamiliar reverse-conditioning problem from raw priors and conditional evidence probabilities, derive the denominator by total probability, compute all requested posteriors, and explain exactly how the reference class changed.",
    nextArcBoundary:"035 · P6.1 leaves posterior updating and asks whether events factorise at all: independence must be tested from the probability law and explicitly separated from disjointness.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC819-A1035",routeOrder:35,syllabusCode:"P6.1",targetCode:"P6",parentId:"ARC819",
    title:"Test independence and contrast it with disjointness.",
    focus:"Testing independence by probability factorisation and conditional invariance while keeping set-theoretic disjointness separate from merely having an intersection of probability zero.",
    purpose:"Prevent one of the most damaging probability confusions before pairwise/mutual independence: disjointness means impossible co-occurrence as sets, whereas independence means that the joint probability factorises or that positive-probability conditioning leaves the other event's probability unchanged.",
    centralCapability:"Given two events in a finite or explicitly specified probability model, test independence using P(A∩B)=P(A)P(B) or an equivalent positive-denominator conditional criterion, test disjointness separately using A∩B=∅, and explain why nonempty probability-zero overlap is not the same thing as disjointness.",
    principalObstacle:"Because both notions involve intersections, learners may equate P(A∩B)=0 with set-theoretic disjointness or with independence, infer independence from visual separation/symmetry without checking masses, or use a conditional criterion when the conditioning event has probability zero.",
    entryPrerequisites:["033-034 / P4 conditioning and Bayes","031 / P3 intersection/union probability arithmetic","027 / P1 explicit outcome modelling"],
    requiredOwnership:[
      "Test independence from the actual factorisation P(A∩B)=P(A)P(B), not from informal unrelatedness.",
      "Test disjointness by the set statement A∩B=∅; do not replace it by P(A∩B)=0 unless the model guarantees that every elementary outcome in the intersection would have positive mass.",
      "Give or diagnose a finite zero-mass counterexample in which A∩B is nonempty but P(A∩B)=0, and state why this does not make the events disjoint.",
      "Prove that if A and B are disjoint with P(A)>0 and P(B)>0, then they cannot be independent.",
      "Use P(A|B)=P(A) only when P(B)>0 and recognise it as an equivalent independence test under that condition.",
      "Construct or diagnose examples showing that overlapping events may be independent and that probability-zero events create trivial independence edge cases."
    ],
    applicationScope:"Pairs of events in finite sample spaces, including weighted models with possible zero-mass elementary outcomes, where intersections and marginal probabilities can be computed exactly.",
    transferScope:"A fresh model in which symmetry tempts an independence claim or a zero-mass overlap tempts a disjointness claim, requiring the learner to apply the set and probability criteria separately.",
    inScope:["Event independence","Factorisation criterion","Conditional invariance criterion","Set-theoretic disjointness versus probability-zero overlap","Zero-probability edge cases"],
    outOfScope:["Pairwise versus mutual independence reserved for P6.2","Conditional independence after conditioning reserved for P6.2","Random-variable independence","Measure-theoretic independence"],
    exitCondition:"For one unfamiliar pair of events in an explicitly specified model, determine set-theoretic disjointness and probabilistic independence separately, justify each conclusion with the correct criterion, and handle any zero-probability overlap or zero-marginal edge case without conflating the two notions.",
    nextArcBoundary:"036 · P6.2 extends from two-event independence to pairwise versus mutual independence and shows how conditioning can create or destroy independence.",
    mode:"learn",evidencePolicy:"standard"
  }
];
