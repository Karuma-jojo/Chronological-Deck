import { buildT22RichModule2 } from "./t22-rich-module-2.js";
import { buildT22RichModule3 } from "./t22-rich-module-3.js";
import { buildT22RichModule4 } from "./t22-rich-module-4.js";
import { buildT22RichModule5 } from "./t22-rich-module-5.js";
import { buildT22RichModule6 } from "./t22-rich-module-6.js";
import { buildT22RichModule7 } from "./t22-rich-module-7.js";
import { buildT22RichModule8 } from "./t22-rich-module-8.js";
import { buildT22RichModule9 } from "./t22-rich-module-9.js";
import { buildT22RichModule10 } from "./t22-rich-module-10.js";
import { buildT22RichModule11 } from "./t22-rich-module-11.js";
import { buildT22RichModule12 } from "./t22-rich-module-12.js";
import { buildT22RichModule13 } from "./t22-rich-module-13.js";
import { buildT22RichModule14 } from "./t22-rich-module-14.js";
import { buildT22RichModule15 } from "./t22-rich-module-15.js";
import { buildT22RichModule16 } from "./t22-rich-module-16.js";
import { buildT22RichModule17 } from "./t22-rich-module-17.js";
import { buildT22RichModule18 } from "./t22-rich-module-18.js";
import { buildT22RichModule19 } from "./t22-rich-module-19.js";
import { buildT22RichModule20 } from "./t22-rich-module-20.js";
import { buildT22RichModule21 } from "./t22-rich-module-21.js";
import { buildT22RichModule22 } from "./t22-rich-module-22.js";
import { buildT22RichModule23 } from "./t22-rich-module-23.js";
import { buildT22RichModule24 } from "./t22-rich-module-24.js";
import { buildT22RichModule25 } from "./t22-rich-module-25.js";
import { buildT22RichModule26 } from "./t22-rich-module-26.js";
import { buildT22RichModule27 } from "./t22-rich-module-27.js";
import { buildT22RichModule28 } from "./t22-rich-module-28.js";
import { buildT22RichModule29 } from "./t22-rich-module-29.js";
import { buildT22RichModule30 } from "./t22-rich-module-30.js";
import { buildT22RichModule31 } from "./t22-rich-module-31.js";
import { buildT22RichModule32 } from "./t22-rich-module-32.js";
import { buildT22RichModule33 } from "./t22-rich-module-33.js";

export const T22_RICH_SYLLABUS_VERSION = "3.0";

const MODULE_1 = {
  moduleId: "ARC053",
  syllabusVersion: T22_RICH_SYLLABUS_VERSION,
  roleTarget: "Quantitative research hybrid: mathematically dominant, implementation-capable, research-first.",
  modulePurpose:
    "Build the single-variable derivative as a local sensitivity and first-order modelling tool, then derive the core algebraic differentiation machinery needed later in optimization, probability, statistics, machine learning and scientific computing.",
  moduleDestination:
    "The learner can reconstruct a derivative from finite changes, justify local control, interpret differentiability as first-order local linearity, and derive/apply the core power, product/quotient and chain-rule structures without formula-only memorization.",
  entryPrerequisites: [
    "Basic arithmetic and algebra",
    "Functions and function evaluation",
    "Coordinates, line slope and average rate",
    "Deductive reasoning and willingness to justify claims",
  ],
  explicitlyOutOfScope: [
    "General sequence/function limit theory beyond what the active derivative argument requires",
    "Integration and the Fundamental Theorem of Calculus",
    "Taylor series or second-order approximation",
    "Multivariable calculus, Jacobians or Hessians",
    "Optimization and Newton methods",
    "Implicit differentiation and a large catalogue of special-function derivative tricks",
  ],
  arcs: {
    "T22-M01-A01": {
      focus: "From finite secant rates to the need for an instantaneous rate.",
      roleRelevance:
        "Trains local-rate reasoning and disciplined inference from finite observations, a recurring pattern in empirical and mathematical modelling.",
      purpose:
        "Create the need for an instantaneous rate from quantities that are only directly measurable over finite intervals.",
      principalObstacle:
        "A rate at one instant cannot be computed by ordinary distance-over-time on a zero-length interval, yet finite secant rates can approach a stable candidate.",
      entryPrerequisites: ["Algebra", "Functions", "Coordinates", "Slope / average rate"],
      target:
        "Independently construct a defensible meaning of instantaneous rate from families of finite secant rates without substituting a zero interval.",
      requiredMastery: [
        "Distinguish average rate from instantaneous rate",
        "Compute and compare shrinking finite-interval rates",
        "Identify a stable candidate without treating finite numerical agreement as proof",
        "Explain why direct substitution of a zero interval is invalid",
        "Transfer the finite-to-local-rate idea to a different changing quantity",
      ],
      applicationScope:
        "One concrete changing-system application in which a local rate must be inferred from finite observations.",
      transferScope:
        "Different surface context, same finite-to-local rate problem; no cosmetic number swap.",
      explicitlyOutOfScope: [
        "General difference-quotient formalism",
        "General epsilon-delta theory",
        "Tangent-line/local-linearity interpretation",
        "Differentiation rules",
      ],
      nextArcBoundary:
        "A02 owns universal control of the shrinking-interval idea through the difference quotient.",
    },
    "T22-M01-A02": {
      focus: "Universal vanishing-interval control and the difference quotient.",
      roleRelevance:
        "Builds quantifier discipline, error control and the distinction between a convenient sample path and a universal local claim.",
      purpose:
        "Turn the informal shrinking-secant idea into a controlled mathematical object whose local value is not an artifact of one convenient approach path.",
      principalObstacle:
        "Agreement along one family of shrinking intervals does not establish a unique local rate for all sufficiently nearby admissible choices.",
      entryPrerequisites: [
        "T22-M01-A01",
        "Algebraic manipulation",
        "Absolute value / elementary inequalities as needed",
      ],
      target:
        "Construct and control a difference quotient under genuinely vanishing intervals with the correct logical quantifier order.",
      requiredMastery: [
        "Construct the relevant difference quotient",
        "Handle asymmetric nearby points rather than only one symmetric sequence",
        "Distinguish a special shrinking path from universal local control",
        "Represent approximation error as a magnitude",
        "Prove a tolerance-to-neighborhood statement in a concrete case",
        "Distinguish candidate discovery from proof",
      ],
      applicationScope:
        "One operational use of the established local-rate value after the central proof is secure.",
      transferScope:
        "A different function or setting in which a plausible shrinking family may or may not establish the universal claim.",
      explicitlyOutOfScope: [
        "General theory of limits",
        "Tangent-line/local-linearity interpretation",
        "Differentiation rules",
        "General continuity theory",
      ],
      nextArcBoundary:
        "A03 owns the geometric and modelling meaning of the derivative as a first-order local line.",
    },
    "T22-M01-A03": {
      focus: "Tangent slope, local linearity and first-order sensitivity.",
      roleRelevance:
        "Local linearization is foundational for optimization, likelihood methods, Taylor approximations, numerical analysis, multivariable calculus and model sensitivity.",
      purpose:
        "Convert the derivative from a limiting number into the first-order local model of a nonlinear function.",
      principalObstacle:
        "Understand why one line captures first-order local behaviour, not merely why shrinking secants look visually tangent.",
      entryPrerequisites: ["T22-M01-A01", "T22-M01-A02", "Equations of lines", "Algebra"],
      target:
        "Establish and use the local representation f(a+h) = f(a) + m h + r(h), where m is the derivative and the residual is negligible relative to h.",
      requiredMastery: [
        "Connect derivative and tangent slope without relying only on a picture",
        "Construct the tangent / local linear approximation at a point",
        "Explain first-order negligible error using error divided by displacement",
        "Use the local line to estimate nearby function values",
        "Distinguish small absolute error from first-order local accuracy",
        "Diagnose a corner/cusp-style case where one local linear model fails",
        "Defend the idea in an unfamiliar transfer",
      ],
      applicationScope:
        "One nearby-value approximation or local-sensitivity problem using a genuinely nonlinear function.",
      transferScope:
        "Change surface/domain while preserving the question of whether one first-order local model captures nearby behaviour.",
      explicitlyOutOfScope: [
        "General Taylor series",
        "Second-order approximation",
        "Newton's method",
        "Multivariable differentials",
        "Derivative rules not yet established",
      ],
      nextArcBoundary:
        "A04 owns systematic derivative structure for powers and polynomials.",
    },
    "T22-M01-A04": {
      focus: "Power-rule structure from first principles rather than memorization.",
      roleRelevance:
        "Builds the habit of deriving reusable sensitivity laws from algebraic structure instead of treating calculus as a formula catalogue.",
      purpose:
        "Discover why the local sensitivity of x^n has coefficient n and exponent n-1.",
      principalObstacle:
        "Extract the first-order contribution of a power under a small perturbation and justify why the remaining terms vanish at smaller order.",
      entryPrerequisites: [
        "T22-M01-A01 through A03",
        "Polynomial algebra",
        "Factorization / binomial reasoning",
      ],
      target:
        "Derive d(x^n)/dx = n x^(n-1) for positive integer n from the derivative definition or equivalent first-order increment structure, then justify the finite-sum and constant-multiple linearity needed to extend the result to polynomials.",
      requiredMastery: [
        "Derive rather than quote the power rule",
        "Explain structurally why n first-order single-perturbation contributions produce the coefficient n while n-1 factors retain x",
        "Justify derivative linearity for finite sums and constant multiples from the difference quotient rather than assuming it as another memorized rule",
        "Combine linearity with the power rule to differentiate finite polynomials",
        "Distinguish derivation from pattern recognition",
        "Transfer the perturbation structure to an unfamiliar polynomial-like expression without importing later derivative rules",
      ],
      applicationScope:
        "One polynomial sensitivity/rate model where the derivative has an interpretable operational meaning.",
      transferScope:
        "A changed algebraic or modelling surface requiring recognition of the same first-order power structure, without relying on product, reciprocal, quotient or chain rules not yet established.",
      explicitlyOutOfScope: [
        "Arbitrary real powers",
        "Logarithmic differentiation",
        "Exponential/logarithmic derivative theory",
        "General Taylor series",
        "Product, reciprocal, quotient or chain rules as premises",
      ],
      nextArcBoundary:
        "A05 owns first-order change under products, reciprocals and ratios.",
    },
    "T22-M01-A05": {
      focus: "First-order algebra: products, reciprocals and ratio sensitivity.",
      roleRelevance:
        "Directly trains perturbation propagation through algebraic combinations, a pattern that later reappears in statistical, financial and numerical models.",
      purpose:
        "Understand product and quotient rules as consequences of first-order change rather than unrelated formulas.",
      principalObstacle:
        "When several quantities change simultaneously, identify which increment terms survive at first order, prove which interaction terms become negligible, and preserve the conditions under which reciprocal or ratio expressions remain defined.",
      entryPrerequisites: ["T22-M01-A03", "T22-M01-A04", "Algebraic expansion", "Nonzero denominator logic"],
      target:
        "Derive the product rule from increment/local-linear structure, then derive reciprocal change and quotient behaviour with the necessary denominator conditions rather than quoting named rules.",
      requiredMastery: [
        "Derive the product rule from a two-factor perturbation",
        "Prove that the cross-product of two first-order increments is negligible relative to the base displacement",
        "Derive the reciprocal derivative from exact local algebra under a nonzero base-value condition and justify nearby denominator admissibility",
        "Construct the quotient rule from product/reciprocal structure",
        "State and use denominator conditions correctly",
        "Apply the structure in a nontrivial algebraic sensitivity problem",
      ],
      applicationScope:
        "Sensitivity of a quantity built multiplicatively or as a ratio, with interpretation of the resulting first-order effects.",
      transferScope:
        "A different model surface that requires recognizing first-order product/ratio algebra rather than recalling a named rule, without using composition or chain-rule machinery.",
      explicitlyOutOfScope: ["Composition / chain rule", "Implicit differentiation", "Logarithmic differentiation"],
      nextArcBoundary:
        "A06 owns nested dependence: one changing quantity feeding another.",
    },
    "T22-M01-A06": {
      focus: "Composition, nested dependence and propagation of local sensitivity.",
      roleRelevance:
        "Core machinery for transformed variables, likelihoods, loss functions, optimization objectives, computational graphs and later matrix calculus.",
      purpose:
        "Reconstruct the chain rule as the propagation of local scaling through nested dependence.",
      principalObstacle:
        "A change in an outer quantity is mediated by an intermediate quantity whose own local scale of change must also be accounted for, without hiding unjustified division by an inner increment that may vanish along nearby points.",
      entryPrerequisites: ["T22-M01-A03 through A05", "Function composition"],
      target:
        "Derive (f∘g)'(x) = f'(g(x)) g'(x) from local changes / local linearity and controlled remainders rather than a memorized outside-inside mnemonic or an unsafe cancellation argument.",
      requiredMastery: [
        "Distinguish direct from mediated dependence",
        "Derive the multiplicative scaling of local changes through a composition using first-order local models",
        "Control the composed remainder so the derivation remains valid even when the inner increment can be zero along nearby points",
        "Track evaluation points correctly",
        "Apply the rule through more than one nesting layer",
        "Diagnose an invalid chain-rule manipulation, including hidden division by a vanishing inner increment",
        "Transfer the nested-sensitivity structure to an unfamiliar dependency problem",
      ],
      applicationScope:
        "One sensitivity calculation involving an intermediate transformed variable or nested model component.",
      transferScope:
        "A different dependency structure requiring recognition of nested local scaling rather than syntactic formula matching.",
      explicitlyOutOfScope: [
        "Multivariable chain rule",
        "Jacobians",
        "Backpropagation as a full algorithm",
        "Implicit differentiation",
      ],
      nextArcBoundary:
        "The following module owns general convergence and limit machinery; later modules reactivate chain-rule structure in multivariable and matrix settings.",
    },
  },
};

const MODULE_2 = buildT22RichModule2(T22_RICH_SYLLABUS_VERSION);
const MODULE_3 = buildT22RichModule3(T22_RICH_SYLLABUS_VERSION);
const MODULE_4 = buildT22RichModule4(T22_RICH_SYLLABUS_VERSION);
const MODULE_5 = buildT22RichModule5(T22_RICH_SYLLABUS_VERSION);
const MODULE_6 = buildT22RichModule6(T22_RICH_SYLLABUS_VERSION);
const MODULE_7 = buildT22RichModule7(T22_RICH_SYLLABUS_VERSION);
const MODULE_8 = buildT22RichModule8(T22_RICH_SYLLABUS_VERSION);
const MODULE_9 = buildT22RichModule9(T22_RICH_SYLLABUS_VERSION);
const MODULE_10 = buildT22RichModule10(T22_RICH_SYLLABUS_VERSION);
const MODULE_11 = buildT22RichModule11(T22_RICH_SYLLABUS_VERSION);
const MODULE_12 = buildT22RichModule12(T22_RICH_SYLLABUS_VERSION);
const MODULE_13 = buildT22RichModule13(T22_RICH_SYLLABUS_VERSION);
const MODULE_14 = buildT22RichModule14(T22_RICH_SYLLABUS_VERSION);
const MODULE_15 = buildT22RichModule15(T22_RICH_SYLLABUS_VERSION);
const MODULE_16 = buildT22RichModule16(T22_RICH_SYLLABUS_VERSION);
const MODULE_17 = buildT22RichModule17(T22_RICH_SYLLABUS_VERSION);
const MODULE_18 = buildT22RichModule18(T22_RICH_SYLLABUS_VERSION);
const MODULE_19 = buildT22RichModule19(T22_RICH_SYLLABUS_VERSION);
const MODULE_20 = buildT22RichModule20(T22_RICH_SYLLABUS_VERSION);
const MODULE_21 = buildT22RichModule21(T22_RICH_SYLLABUS_VERSION);
const MODULE_22 = buildT22RichModule22(T22_RICH_SYLLABUS_VERSION);
const MODULE_23 = buildT22RichModule23(T22_RICH_SYLLABUS_VERSION);
const MODULE_24 = buildT22RichModule24(T22_RICH_SYLLABUS_VERSION);
const MODULE_25 = buildT22RichModule25(T22_RICH_SYLLABUS_VERSION);
const MODULE_26 = buildT22RichModule26(T22_RICH_SYLLABUS_VERSION);
const MODULE_27 = buildT22RichModule27(T22_RICH_SYLLABUS_VERSION);
const MODULE_28 = buildT22RichModule28(T22_RICH_SYLLABUS_VERSION);
const MODULE_29 = buildT22RichModule29(T22_RICH_SYLLABUS_VERSION);
const MODULE_30 = buildT22RichModule30(T22_RICH_SYLLABUS_VERSION);
const MODULE_31 = buildT22RichModule31(T22_RICH_SYLLABUS_VERSION);
const MODULE_32 = buildT22RichModule32(T22_RICH_SYLLABUS_VERSION);
const MODULE_33 = buildT22RichModule33(T22_RICH_SYLLABUS_VERSION);

export const T22_RICH_MODULES = Object.freeze({
  ARC053: MODULE_1,
  SIDE263: MODULE_2,
  ARC510: MODULE_3,
  ARC511: MODULE_4,
  SIDE276: MODULE_5,
  SIDE278: MODULE_6,
  SIDE279: MODULE_7,
  SIDE280: MODULE_8,
  SIDE267: MODULE_9,
  SIDE271: MODULE_10,
  ARC711: MODULE_11,
  ARC512: MODULE_12,
  ARC515: MODULE_13,
  ARC717: MODULE_14,
  ARC585: MODULE_15,
  ARC713: MODULE_16,
  ARC048: MODULE_17,
  SIDE476: MODULE_18,
  ARC502: MODULE_19,
  ARC503: MODULE_20,
  ARC517: MODULE_21,
  ARC504: MODULE_22,
  ARC712: MODULE_23,
  ARC505: MODULE_24,
  ARC539: MODULE_25,
  ARC531: MODULE_26,
  ARC533: MODULE_27,
  ARC534: MODULE_28,
  ARC537: MODULE_29,
  ARC506: MODULE_30,
  ARC507: MODULE_31,
  ARC508: MODULE_32,
  ARC509: MODULE_33,
});

export function getT22RichModule(moduleId) {
  return T22_RICH_MODULES[moduleId] ?? null;
}

export function enrichT22AtomicArc(moduleId, arc) {
  const module = getT22RichModule(moduleId);
  const rich = module?.arcs?.[arc?.id];
  if (!rich) return { ...arc };
  return {
    ...arc,
    syllabusVersion: module.syllabusVersion,
    roleTarget: module.roleTarget,
    ...rich,
  };
}
