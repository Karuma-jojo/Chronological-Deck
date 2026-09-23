// Learner-visible neutral SMMC training prompts.
// Historical SMMC statements are intentionally absent.

export const SMMC_PUBLIC_PROBLEMS_V1 = Object.freeze({
  "S-NEUTRAL-MB1-01": {
    id: "S-NEUTRAL-MB1-01",
    unitId: "S-METHOD-B1-U01",
    role: "main",
    prompt: "Let x,y>0 with x+y=1. Prove that 1/(1+x)+1/(1+y) ≥ 4/3. Determine exactly when equality holds, and explain why no larger universal constant can replace 4/3."
  },
  "S-NEUTRAL-MB1-02": {
    id: "S-NEUTRAL-MB1-02",
    unitId: "S-METHOD-B1-U01",
    role: "transfer",
    prompt: "Let a,b,c>0 with abc=1. Find the largest constant C for which (1+a)(1+b)(1+c) ≥ C always holds. Prove both the bound and its sharpness."
  },
  "S-NEUTRAL-N1-01": {
    id: "S-NEUTRAL-N1-01",
    unitId: "S-BRIDGE-N1-U01",
    role: "main",
    prompt: "Use the Euclidean algorithm to compute gcd(84,30), then write the gcd in the form 84u+30v. Use your identity to produce one integer solution of 84x+30y=18."
  },
  "S-NEUTRAL-N1-02": {
    id: "S-NEUTRAL-N1-02",
    unitId: "S-BRIDGE-N1-U01",
    role: "transfer",
    prompt: "Solve the congruence 35x ≡ 10 (mod 50). Give the complete set of integer solutions as residue classes and justify every cancellation or division you use."
  },
  "S-NEUTRAL-GR1-01": {
    id: "S-NEUTRAL-GR1-01",
    unitId: "S-BRIDGE-GR1-U01",
    role: "main",
    prompt: "Let G be a finite connected simple graph in which every vertex has degree 2. Prove that G is a cycle. Your proof should explain why the walk you construct cannot leave a smaller cycle and visit additional vertices."
  },
  "S-NEUTRAL-GR1-02": {
    id: "S-NEUTRAL-GR1-02",
    unitId: "S-BRIDGE-GR1-U01",
    role: "transfer",
    prompt: "At a gathering, acquaintance is mutual and every person knows exactly two other people at the gathering. Prove that the people can be partitioned into groups, each of which can sit around a circular table so that every person has exactly their two acquaintances as neighbours."
  },
  "S-NEUTRAL-K1-01": {
    id: "S-NEUTRAL-K1-01",
    unitId: "S-METHOD-K1-U01",
    role: "main",
    prompt: "For integers n≥k≥1, prove bijectively that the number of ordered k-tuples of positive integers (x1,...,xk) with x1+...+xk=n is C(n-1,k-1). Give both the encoding and the recovery rule."
  },
  "S-NEUTRAL-K1-02": {
    id: "S-NEUTRAL-K1-02",
    unitId: "S-METHOD-K1-U01",
    role: "transfer",
    prompt: "For integers n≥0 and k≥1, count the ordered k-tuples of nonnegative integers (x1,...,xk) with x1+...+xk=n by giving a reversible encoding. Explain explicitly why the answer differs from the positive-parts version."
  }
});

export default SMMC_PUBLIC_PROBLEMS_V1;
