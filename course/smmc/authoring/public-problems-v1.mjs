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
  },
  "S-NEUTRAL-AN1-01": {
    id: "S-NEUTRAL-AN1-01",
    unitId: "S-BRIDGE-AN1-U01",
    role: "main",
    prompt: "Prove that the harmonic series Σ(n=1 to ∞) 1/n diverges by grouping terms into blocks whose endpoints are powers of 2. Your proof must give a uniform positive lower bound for every sufficiently late block."
  },
  "S-NEUTRAL-AN1-02": {
    id: "S-NEUTRAL-AN1-02",
    unitId: "S-BRIDGE-AN1-U01",
    role: "transfer",
    prompt: "Decide whether Σ(n=1 to ∞) 1/(n+√n) converges or diverges. Give a direct comparison with a standard benchmark series and justify the comparison inequality."
  },
  "S-NEUTRAL-X1-01": {
    id: "S-NEUTRAL-X1-01",
    unitId: "S-METHOD-X1-U01",
    role: "main",
    prompt: "Let a,b>0 with a+b=s fixed. Prove that ab≤s²/4 by introducing an auxiliary quantity that measures the imbalance between a and b. State exactly where equality occurs."
  },
  "S-NEUTRAL-X1-02": {
    id: "S-NEUTRAL-X1-02",
    unitId: "S-METHOD-X1-U01",
    role: "transfer",
    prompt: "Let x1,...,xn be real numbers with x1+...+xn=0. Prove that Σ_{1≤i<j≤n}(xi-xj)² = n Σ_{i=1}^n xi². Organize the proof by introducing or expanding an auxiliary aggregate quantity rather than summing pairwise terms one at a time."
  },
  "S-NEUTRAL-N1-03": {
    id: "S-NEUTRAL-N1-03",
    unitId: "S-BRIDGE-N1-U02",
    role: "main",
    prompt: "Solve the simultaneous congruences x≡2 (mod 3), x≡3 (mod 5), and x≡2 (mod 7). Give the unique residue class modulo 105 and justify why it is unique modulo the product."
  },
  "S-NEUTRAL-N1-04": {
    id: "S-NEUTRAL-N1-04",
    unitId: "S-BRIDGE-N1-U02",
    role: "transfer",
    prompt: "How many residue classes modulo 30 are coprime to 30? Solve by treating residues modulo 2, 3, and 5 as independent CRT coordinates, and explain why each allowed coordinate choice gives exactly one class modulo 30."
  },
  "S-NEUTRAL-I1-01": {
    id: "S-NEUTRAL-I1-01",
    unitId: "S-METHOD-I1-U01",
    role: "main",
    prompt: "Let F0=0, F1=1, and F_{n+2}=F_{n+1}+F_n. Prove that F_n is even exactly when 3 divides n. Do not induct on the single statement 'F_n is even iff 3|n'; instead formulate and prove a stronger repeating parity pattern for triples of consecutive terms."
  },
  "S-NEUTRAL-I1-02": {
    id: "S-NEUTRAL-I1-02",
    unitId: "S-METHOD-I1-U01",
    role: "transfer",
    prompt: "Prove that every integer n≥12 can be written as n=4a+5b with nonnegative integers a,b. Use an induction architecture that makes clear why several consecutive base cases are needed and why adding 4 closes the induction."
  },
  "S-NEUTRAL-W1-01": {
    id: "S-NEUTRAL-W1-01",
    unitId: "S-METHOD-W1-U01",
    role: "main",
    prompt: "Write a marker-ready proof of the following statement: if n is an integer and n² is even, then n is even. You may use parity facts, but you must state the proof strategy, make the key implication explicit, and finish by connecting it back to the original claim. A list of examples is not a proof."
  },
  "S-NEUTRAL-W1-02": {
    id: "S-NEUTRAL-W1-02",
    unitId: "S-METHOD-W1-U01",
    role: "transfer",
    prompt: "Let a,b,c be real numbers with a+b+c=0. Prove that a³+b³+c³=3abc. Present the argument as a complete contest proof: state where the assumption is used, justify any factorization or substitution, and close the proof with the exact required identity."
  },
  "S-NEUTRAL-C1-01": {
    id: "S-NEUTRAL-C1-01",
    unitId: "S-METHOD-C1-U01",
    role: "main",
    prompt: "Let x and y be real numbers. Prove both identities max(x,y)=(x+y+|x-y|)/2 and min(x,y)=(x+y-|x-y|)/2. Design a two-case proof by comparing x and y: state an exhaustive nonoverlapping partition, assign the equality boundary explicitly, isolate the resulting behavior of |x-y| as a reusable lemma, and use that lemma for both identities."
  },
  "S-NEUTRAL-C1-02": {
    id: "S-NEUTRAL-C1-02",
    unitId: "S-METHOD-C1-U01",
    role: "transfer",
    prompt: "Classify exactly all real pairs (x,y) for which |x+y|=|x|+|y|. Your final answer must be an if-and-only-if condition. Design an exhaustive nonoverlapping sign-based case architecture that handles zero without duplication, extract a reusable lemma for the genuinely opposite-sign case, and prove both directions of the classification."
  },
  "S-NEUTRAL-E1-01": {
    id: "S-NEUTRAL-E1-01",
    unitId: "S-METHOD-E1-U01",
    role: "main",
    prompt: "Fix an integer n≥1. Among all pairs of nonnegative integers (a,b) with a+b=n, determine the maximum possible value of ab and characterize every maximizing pair. Use an extremal/local-improvement proof: choose a maximizing pair, justify that one exists, and derive its forced structure by showing that an allowed one-unit transfer would strictly improve any pair whose coordinates are too far apart."
  },
  "S-NEUTRAL-E1-02": {
    id: "S-NEUTRAL-E1-02",
    unitId: "S-METHOD-E1-U01",
    role: "transfer",
    prompt: "Prove that every integer n≥2 can be written as a product of one or more primes. Use a minimal-counterexample argument rather than induction: if a counterexample exists, choose the least one, explain why it cannot itself be prime, reduce the composite case to strictly smaller integers, and close the contradiction without assuming the desired result for numbers that are not smaller."
  }
});

export default SMMC_PUBLIC_PROBLEMS_V1;
