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
  }
});

export default SMMC_PUBLIC_PROBLEMS_V1;
