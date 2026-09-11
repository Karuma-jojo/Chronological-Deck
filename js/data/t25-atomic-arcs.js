// T25 atomic investigation cards.
// Parent ARC801 is a curriculum unit; these cards are bounded learning events.
// Keep parent IDs stable and append atomic cards without renumbering existing T25 units.

function card(id, parentId, title, centralCapability, principalObstacle, requiredOwnership, inScope, outOfScope, exitCondition, mode = "learn") {
  return {
    id,
    parentId,
    title,
    centralCapability,
    principalObstacle,
    requiredOwnership,
    inScope,
    outOfScope,
    exitCondition,
    mode,
  };
}

export const T25_ATOMIC_AUDIT_VERSION = "1.0";

export const T25_ATOMIC_CARDS = [
  card(
    "T25-ARC801-A01",
    "ARC801",
    "Domain-Safe Algebra",
    "Manipulate elementary real-valued algebraic expressions while preserving both value and the conditions under which the expression is defined.",
    "Algebraic simplification can preserve a formula on its legal domain while silently changing the domain itself.",
    [
      "Determine the real domain of a supplied elementary expression.",
      "Simplify rational expressions without silently restoring excluded points.",
      "State conditions required by common power, root and logarithm manipulations.",
      "Detect invalid cancellation, illegal denominators and domain loss.",
      "Distinguish agreement on the original domain from equality as unrestricted functions.",
      "Audit an unfamiliar algebraic simplification for legality.",
    ],
    [
      "Fractions and rational expressions",
      "Integer and elementary rational powers",
      "Roots in the real-number setting",
      "Elementary logarithmic expressions",
      "Denominator, logarithm and root restrictions",
      "Expression simplification with preserved domains",
    ],
    [
      "Polynomial-root theory and Vieta relations (ARC803)",
      "Trigonometric identities (ARC805)",
      "Complex branch behaviour (ARC806)",
      "Limits, differentiation and integration",
      "Advanced function theory (ARC802)",
    ],
    "The learner performs ordinary algebra without losing track of where each step and expression are legally defined."
  ),

  card(
    "T25-ARC801-A02",
    "ARC801",
    "Equations & Inequalities as Solution Sets",
    "Treat equations and inequalities as claims about solution sets, distinguishing reversible transformations from transformations that may add or lose candidates.",
    "A useful transformed statement is not automatically logically equivalent to the original one.",
    [
      "Describe an equation by its solution set rather than only its displayed syntax.",
      "Distinguish equivalence-preserving steps from one-way implications.",
      "Explain why squaring can introduce candidates requiring verification.",
      "Avoid illegal division by an expression that may be zero, or split the relevant cases.",
      "Manipulate inequalities while tracking sign conditions correctly.",
      "Intersect algebraic candidates with the original domain and verify final answers in the original statement.",
    ],
    [
      "Elementary linear and nonlinear equations",
      "Rational equations",
      "Elementary equations involving roots, powers or logarithms",
      "Inequalities and sign-dependent operations",
      "Extraneous and lost solutions",
      "Candidate-versus-verified solution reasoning",
    ],
    [
      "Theory of polynomial equations (ARC803)",
      "Coordinate-geometry equation solving (ARC807)",
      "Trigonometric-equation theory (ARC805)",
      "Optimization (ARC812)",
      "Numerical root finding and abstract algebra",
    ],
    "The learner sees solving as preserving, narrowing or carefully relating solution sets rather than blindly moving symbols."
  ),

  card(
    "T25-ARC801-A03",
    "ARC801",
    "Functions, Changed Inputs & Parameters",
    "Interpret function notation operationally: know what the input is, what is substituted, and which symbols vary versus label a fixed member of a family.",
    "Notation such as f(x+h), f(a) or f_theta(x) must be interpreted by substitution and role rather than visual pattern matching.",
    [
      "Evaluate functions at unfamiliar changed inputs by actual substitution.",
      "Distinguish the expression used as input from the function output.",
      "Identify variable, parameter and fixed constant from context.",
      "Reinterpret the same formula when a different symbol is designated as the variable.",
      "Handle parameterized families without confusing parameter variation with input variation.",
      "Preserve domain restrictions after substitution.",
    ],
    [
      "Function as input-output rule on a domain",
      "Variables, parameters and constants",
      "Dummy-variable naming",
      "Changed inputs such as x+h, 2x, a and x^2",
      "Parameterized families",
      "Domain checking after substitution",
    ],
    [
      "Injectivity, surjectivity and bijections (ARC802)",
      "Inverse functions and systematic composition (ARC802)",
      "Relation theory (ARC802)",
      "Limits (ARC810)",
      "Derivatives and difference quotients (ARC811 / T22 calculus)",
      "Multivariable calculus",
    ],
    "Changed-input notation and parameter roles no longer create conceptual ambiguity."
  ),

  card(
    "T25-ARC801-A04",
    "ARC801",
    "Mathematical Claims, Quantifiers & Counterexamples",
    "Read elementary mathematical statements according to logical structure and identify what kind of evidence could establish or refute them.",
    "Examples, definitions, conjectures, implications and quantified claims have different evidential requirements.",
    [
      "Identify hypothesis and conclusion in an implication.",
      "Distinguish a statement from its converse and use the contrapositive correctly.",
      "Translate simple universal and existential statements between words and symbols.",
      "Negate elementary universal and existential statements correctly.",
      "Explain why one example cannot prove a universal statement.",
      "Refute a false universal statement with a valid counterexample.",
      "Provide a witness for an existential statement.",
      "Distinguish a definition from a theorem requiring proof.",
      "Determine whether an argument actually establishes its stated claim.",
    ],
    [
      "Implication, converse and contrapositive",
      "Necessary and sufficient conditions at an elementary level",
      "Universal and existential quantification",
      "Negation of simple quantified statements",
      "Examples, witnesses and counterexamples",
      "Definition versus theorem, assumption versus conclusion",
    ],
    [
      "A formal logic course",
      "Truth-table drill beyond operational usefulness",
      "Proof by induction as a dedicated technique",
      "Set-theoretic foundations",
      "Equivalence relations (ARC802)",
      "Olympiad proof training and advanced proof methods belonging to later units",
    ],
    "The learner can tell what an elementary mathematical claim says, what assumptions it uses, and what evidence would establish or refute it."
  ),
];

export const T25_ATOMIC_BY_ID = new Map(T25_ATOMIC_CARDS.map(c => [c.id, c]));
export const T25_ATOMIC_BY_PARENT = new Map();
for (const c of T25_ATOMIC_CARDS) {
  if (!T25_ATOMIC_BY_PARENT.has(c.parentId)) T25_ATOMIC_BY_PARENT.set(c.parentId, []);
  T25_ATOMIC_BY_PARENT.get(c.parentId).push(c);
}
