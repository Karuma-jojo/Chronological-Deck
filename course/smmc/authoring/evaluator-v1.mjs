// Engine/evaluator references for neutral SMMC training.
// Not learner-facing under WALL. These are valid routes, not mandatory proof styles.

export const SMMC_EVALUATOR_V1 = Object.freeze({
  "S-NEUTRAL-MB1-01": {
    reference: [
      "Since x+y=1, the left side is (2+x+y)/((1+x)(1+y)) = 3/(2+xy).",
      "For x,y>0 with x+y=1, xy≤1/4, so 2+xy≤9/4.",
      "The denominator is positive, hence 3/(2+xy)≥3/(9/4)=4/3.",
      "Equality in xy≤1/4 occurs exactly at x=y=1/2, so equality holds there.",
      "Because equality is actually attained, any constant larger than 4/3 fails at x=y=1/2."
    ].join(" "),
    rubric: [
      "Must preserve the inequality direction when bounding the positive denominator.",
      "Must identify equality at x=y=1/2.",
      "Must separately justify sharpness, not merely prove ≥4/3."
    ]
  },
  "S-NEUTRAL-MB1-02": {
    reference: [
      "AM-GM gives 1+a≥2√a, 1+b≥2√b, and 1+c≥2√c.",
      "Multiplying, (1+a)(1+b)(1+c)≥8√(abc)=8.",
      "At a=b=c=1, the product equals 8.",
      "Therefore the largest possible universal constant is C=8."
    ].join(" "),
    rubric: [
      "A correct alternative lower-bound route is acceptable.",
      "Must exhibit a=b=c=1 to establish sharpness."
    ]
  },
  "S-NEUTRAL-N1-01": {
    reference: [
      "84=2·30+24 and 30=1·24+6, so gcd(84,30)=6.",
      "Back-substitution gives 6=30-24=30-(84-2·30)=3·30-84.",
      "Thus one Bézout pair is u=-1, v=3.",
      "Multiplying by 3 gives 18=-3·84+9·30, so one solution is x=-3, y=9."
    ].join(" "),
    rubric: [
      "Must show Euclid, not simply state gcd=6.",
      "Must back-substitute or otherwise justify the Bézout coefficients.",
      "Any correct integer solution of the final equation is acceptable."
    ]
  },
  "S-NEUTRAL-N1-02": {
    reference: [
      "gcd(35,50)=5, and 5 divides 10, so solutions exist.",
      "Divide the congruence and modulus by 5: 7x≡2 (mod 10).",
      "Since 7·3≡1 (mod 10), multiply by 3 to get x≡6 (mod 10).",
      "Equivalently modulo 50 the five residue classes are 6,16,26,36,46.",
      "The division step is legal because the original congruence 50 | (35x-10) is equivalent to 10 | (7x-2) after factoring out 5."
    ].join(" "),
    rubric: [
      "Must use the gcd solvability condition or an equivalent divisibility argument.",
      "Must not cancel 5 while leaving modulus 50 unchanged.",
      "Must give the complete solution x≡6 (mod 10), not a single integer."
    ]
  }
});

export default SMMC_EVALUATOR_V1;
