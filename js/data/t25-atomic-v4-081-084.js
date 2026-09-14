// Hand-authored T25 M.Stat v4 session cards 081-084.
// These contracts implement audited syllabus steps D0.1 through D3.2 only.
// V4 logical IDs reserve A1001-A1162 so they stay distinct from legacy T25 atomic authority.

export const T25_ATOMIC_V4_081_084 = [
  {
    id:"T25-ARC822-A1081",routeOrder:81,syllabusCode:"D0.1",targetCode:"D0",parentId:"ARC822",
    title:"Check CDF axioms and distinguish a jump from a density value.",
    focus:"Treating the cumulative distribution function F(x)=P(X<=x) as the universal scalar-law representation, checking its global axioms and reading atoms from jumps without confusing either a jump size or a density height with the other.",
    purpose:"Establish a representation that works uniformly for discrete, continuous and mixed laws before named continuous families are introduced, so later probability calculations remain valid even when no density exists everywhere.",
    centralCapability:"Given a proposed scalar CDF, accept or reject it from monotonicity, right-continuity and limiting values; recover endpoint-sensitive probabilities and point masses from its increments and jumps; and state when differentiating a CDF does or does not legitimately produce a density.",
    principalObstacle:"The learner may think every distribution has a PDF, mistake F(x)-F(x-) for a density value, forget the <= convention in F(x)=P(X<=x), or check only local nonnegativity instead of the CDF's global monotonicity/right-continuity/tail requirements.",
    entryPrerequisites:["063-064 / C1 one-sided limits and continuity","031-032 / P3 event arithmetic on nonuniform spaces","037-038 / J1 expectation through indicators and event notation"],
    requiredOwnership:[
      "State the defining CDF F(x)=P(X<=x) and use it to distinguish P(X<x), P(X<=x), P(a<X<=b) and related endpoint variants.",
      "Check that a proposed CDF is nondecreasing, right-continuous and has limits 0 at -infinity and 1 at +infinity.",
      "Recover the atom at x from the jump F(x)-F(x-) and explain why a jump is probability mass rather than density height.",
      "For an absolutely continuous stretch, recover a density from F' only where the derivative representation is justified, while retaining the possibility of atoms elsewhere.",
      "Give or analyse a valid distribution for which point masses and a continuous component coexist, showing why a single ordinary PDF alone would lose information."
    ],
    applicationScope:"Piecewise CDFs, discrete/continuous/mixed scalar laws, endpoint-sensitive event probabilities and proposed CDF validation problems at ISI entrance depth.",
    transferScope:"An unfamiliar piecewise cumulative function containing flats, jumps and smooth pieces, requiring the learner to audit the axioms globally, identify atoms exactly and resist inventing a density where none is justified.",
    inScope:["CDF axioms","Right-continuity","Atoms as jumps","Endpoint-sensitive CDF probabilities","Density recovery only on justified absolutely continuous pieces"],
    outOfScope:["Measure-theoretic Lebesgue decomposition","Weak convergence of distribution functions","Empirical-process asymptotics","Multivariate copula theory"],
    exitCondition:"Independently accept or reject one unfamiliar proposed CDF with proof, compute at least one strict/non-strict endpoint probability correctly, identify every visible atom from jumps, and state precisely whether a PDF representation is available on each relevant piece.",
    nextArcBoundary:"082 · D0.2 keeps the CDF as authority but now constructs or characterises a genuinely mixed/atomic law from a constraint, retaining both continuous mass and jumps in all probability calculations.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC822-A1082",routeOrder:82,syllabusCode:"D0.2",targetCode:"D0",parentId:"ARC822",
    title:"Construct or characterise a mixed/atomic law from a CDF constraint.",
    focus:"Building a scalar probability law that contains both atoms and continuous accumulation, using CDF constraints to determine unknown masses, continuous normalisation and exact event probabilities without discarding either component.",
    purpose:"Force ownership of mixed distributions before named families: the learner should be able to reconstruct the law from structural constraints rather than assuming every problem belongs to a pure PMF or pure PDF template.",
    centralCapability:"Given a CDF or partial law with unknown constants, determine atomic and continuous components from jumps, derivatives/integrals and total probability; then compute probabilities while preserving strict/non-strict endpoint effects and all components of the mixture.",
    principalObstacle:"The learner may normalise only the density piece, forget that atoms consume part of the unit mass, double-count jump points when integrating, or replace a mixed law by a PDF and thereby erase positive point probabilities.",
    entryPrerequisites:["081 / D0.1 CDF axioms, jumps and endpoint conventions","073-074 / C6 finite and improper integration discipline","029-032 / P2-P3 counting/event arithmetic and probability normalisation"],
    requiredOwnership:[
      "Decompose a piecewise CDF into flat, jump and absolutely continuous pieces and identify the probability carried by each component.",
      "Use total mass one to solve unknown jump sizes or density normalising constants without double counting atom locations.",
      "Construct a valid CDF from a stated mixture containing one or more atoms plus a continuous component and verify all CDF axioms.",
      "Compute event probabilities that include an atomic endpoint correctly, distinguishing < from <= whenever the jump matters.",
      "Explain why a continuous one-dimensional marginal does not, by itself, imply that a higher-dimensional joint density exists; treat this as a warning, not as a new multivariate-density theory."
    ],
    applicationScope:"Finite mixtures of atoms and elementary continuous pieces; piecewise CDF reconstruction; probability queries where endpoint atoms materially change the answer.",
    transferScope:"A fresh law specified indirectly by jump sizes, interval probability constraints and a continuous formula, requiring simultaneous use of CDF structure, normalisation and endpoint logic to recover the complete distribution.",
    inScope:["Mixed discrete-continuous laws","Atomic masses","Continuous CDF pieces","Normalisation across components","Strict versus non-strict event endpoints"],
    outOfScope:["General mixture-model estimation","Latent-class inference","Singular multivariate distributions beyond the stated warning","Measure decomposition theorems"],
    exitCondition:"Construct or fully characterise one unfamiliar mixed law from CDF/probability constraints, verify total mass and CDF validity, and correctly evaluate an event whose answer changes if an atom at an endpoint is ignored.",
    nextArcBoundary:"083 · D3.1 moves to canonical continuous families, where support and parameter conventions become part of the law rather than optional notation.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC822-A1083",routeOrder:83,syllabusCode:"D3.1",targetCode:"D3",parentId:"ARC822",
    title:"Work one uniform and one exponential probability/moment problem.",
    focus:"Using uniform and exponential laws from their support and parameter definitions, including exact interval/tail probabilities, finite moments and a first-principles proof/use of exponential memorylessness.",
    purpose:"Make named distributions operational rather than mnemonic: every calculation must begin from support and parameterisation, and memorylessness should be derived from conditional probability rather than quoted as a slogan.",
    centralCapability:"Solve representative uniform and exponential probability or moment questions, keeping support and rate/scale conventions explicit, and prove or invoke exponential memorylessness only after checking the conditioning event and positive-time hypotheses.",
    principalObstacle:"The learner may use the wrong exponential parameter convention, forget support truncation, treat a uniform density height as an interval probability, or apply memorylessness to a non-exponential law or to an event that is not a residual-waiting-time statement.",
    entryPrerequisites:["081-082 / D0 CDF/support/atom discipline","073-074 / C6 definite and improper integrals","039-044 / D1-D2 discrete named laws and waiting-time conventions","041-042 / J2 variance and covariance calculations"],
    requiredOwnership:[
      "For Uniform(a,b), state support and density, compute interval probabilities by length ratio/integration and derive at least one required moment directly.",
      "For an exponential law, state clearly whether the parameter is a rate and write the corresponding density, CDF and survival function on the correct support.",
      "Compute exponential probabilities and ordinary moments by integration or a justified tail-integral identity, checking convergence rather than assuming moments exist.",
      "Prove P(X>s+t | X>s)=P(X>t) for an exponential variable from the survival function and identify exactly where s,t>=0 and positive conditioning probability are used.",
      "Reject a fake memorylessness claim for a non-exponential example or a malformed conditioning event, explaining the structural reason it fails."
    ],
    applicationScope:"Elementary Uniform(a,b) and exponential(rate) calculations involving intervals, tails, expected values, variances or residual waiting times.",
    transferScope:"A new waiting-time or bounded-support problem where the learner must reconstruct the correct family calculation from support and CDF/survival structure rather than pattern-match a memorised formula.",
    inScope:["Uniform support and density","Exponential rate parameterisation","CDF/survival calculations","Ordinary moments with existence checks","Exponential memorylessness"],
    outOfScope:["Poisson-process theory beyond the waiting-time identity","Hazard-rate theory","Gamma sums reserved for D4","Statistical estimation of distribution parameters"],
    exitCondition:"Solve one unfamiliar uniform problem and one unfamiliar exponential problem, with support and parameter convention stated explicitly, and include either a derivation or legally targeted use of memorylessness whose conditioning logic is fully justified.",
    nextArcBoundary:"084 · D3.2 adds the normal law: standardisation becomes the main computational bridge, while moments must still be tied to the stated parameterisation rather than memorised symbols alone.",
    mode:"learn",evidencePolicy:"standard"
  },
  {
    id:"T25-ARC822-A1084",routeOrder:84,syllabusCode:"D3.2",targetCode:"D3",parentId:"ARC822",
    title:"Standardise a normal probability and compute a required moment.",
    focus:"Working with N(mu,sigma^2) by explicit standardisation to a standard normal variable, translating inequalities with sign-safe algebra, and deriving required low-order moments from the stated mean/variance structure.",
    purpose:"Make normal-distribution calculations exact and convention-safe before later inference topics: standardisation is a change of variable with support/order consequences, not a table-look-up ritual.",
    centralCapability:"Given a normal variable with stated mean and variance, convert probability statements to standard-normal form without losing inequality direction or scale, use symmetry/complements correctly, and compute or derive the requested ordinary moment from Z=(X-mu)/sigma.",
    principalObstacle:"The learner may confuse variance with standard deviation, divide by sigma^2 instead of sigma, mishandle a negative affine coefficient, use a normal table before translating the event correctly, or quote higher moments without checking which parameterisation is being used.",
    entryPrerequisites:["083 / D3.1 support/parameter discipline for named continuous laws","006-007 / F3 changed inputs and affine transformations","037-042 / J1-J2 expectation, variance and covariance algebra"],
    requiredOwnership:[
      "Interpret X~N(mu,sigma^2) with sigma>0 and form Z=(X-mu)/sigma~N(0,1), distinguishing variance sigma^2 from standard deviation sigma.",
      "Translate one-sided and interval probability events into Z-inequalities, preserving or reversing inequality direction correctly under any additional affine transformation.",
      "Use standard-normal symmetry and complements to reduce probabilities to the available CDF form without double counting tails.",
      "Derive E[X] and Var(X) from X=mu+sigma Z and compute at least one required raw or central moment using known standard-normal moments supplied or previously established.",
      "State when a requested normal moment is finite and avoid importing unrelated MGF machinery before D4."
    ],
    applicationScope:"Univariate normal probabilities and low-order moments under the N(mu,sigma^2) convention, including affine re-expression and symmetry/complement calculations.",
    transferScope:"An unfamiliar normal probability involving a shifted/scaled threshold or interval, requiring the learner to standardise algebraically first and only then invoke standard-normal information; or a moment expressed after an affine transformation.",
    inScope:["Normal N(mu,sigma^2) convention","Standardisation","Standard-normal symmetry","Tail/interval probabilities","Low-order ordinary and central moments"],
    outOfScope:["Multivariate normal distributions","CLT and asymptotic normal approximation","Normal-theory inference","MGF-based identification reserved for D4"],
    exitCondition:"Solve one unfamiliar normal probability by explicit standardisation with all inequality and scale steps shown, then compute or derive a requested low-order moment from the affine representation X=mu+sigma Z without parameter confusion.",
    nextArcBoundary:"085 · D4.1 begins gamma/beta and moment-existence work; it introduces new integral normalisations and inverse-moment conditions rather than extending the normal calculation catalogue.",
    mode:"learn",evidencePolicy:"standard"
  }
];
