# M03 boundary & authoring contract — T22E-DISC01

Date: 2026-09-18  
Status: **FINAL ACCEPTED — 30 sessions / 60 fixed tasks / 150 ownership claims; M04 remains closed**

## Semantic ancestry

Required macro prerequisites:
- **M01 · T22E-FND01** — algebra, equations, inequalities, exact arithmetic;
- **M02 · T22E-FND02** — functions as input/output objects, domains/ranges, composition and inverse-function intuition.

The M02 edge is intentional: M03 formalizes functions as mappings, images/preimages and injective/surjective/bijective claims. It must not duplicate M02 merely to preserve an obsolete M01-only edge.

## Ownership

M03 owns:
- propositions, connectives, implication/biconditional, necessary/sufficient language;
- predicates, universal/existential quantifiers and correct negation;
- counterexamples and edge-case discipline;
- direct, contrapositive and contradiction proof habits;
- elementary integers, divisibility and parity as proof objects;
- ordinary and strong induction / recursive proof structure;
- sets, subsets, power sets, operations, set identities and finite cardinality;
- Cartesian products and relations;
- functions as formal mappings, image/preimage, injectivity/surjectivity/bijectivity and inverse claims;
- equivalence relations and partitions at an elementary finite level;
- finite addition/product counting principles, permutations, repeated objects, combinations, stars-and-bars, complement/inclusion-exclusion and pigeonhole reasoning;
- one mixed logic/proof/set/counting synthesis.

M03 explicitly does **not** own:
- probability, conditional probability, independence or expectation → M04;
- sequence limits/convergence/infinite-series proofs → M09;
- calculus;
- graph-theory algorithms;
- abstract algebra/group theory;
- measure/cardinality of infinite sets beyond elementary countable examples.

## Atomic route — 30 sessions

01. Mathematical statements, truth values & predicates  
02. AND, OR, NOT & truth tables  
03. Implication, converse, inverse & contrapositive  
04. Biconditionals; necessary & sufficient conditions  
05. Universal & existential quantifiers  
06. Negating quantified claims correctly  
07. Counterexamples, boundary cases & claim debugging  
08. Integers, divisibility & parity language  
09. Direct proof architecture  
10. Proof by contraposition  
11. Proof by contradiction  
12. Remainder classes & exhaustive proof cases  
13. Mathematical induction  
14. Strong induction & recursive claims  
15. Sets, membership, subsets & equality  
16. Power sets & finite cardinality  
17. Union, intersection, difference & complement  
18. Set identities & De Morgan laws  
19. Cartesian products & relations  
20. Functions as mappings; domain, codomain, image & preimage  
21. Injective, surjective, bijective & inverse claims  
22. Equivalence relations & partitions  
23. Addition & product counting principles  
24. Permutations, factorials & ordered selections  
25. Permutations with repeated objects & multinomial grouping  
26. Combinations, binomial coefficients & subsets  
27. Stars-and-bars: combinations with repetition  
28. Complement counting & inclusion-exclusion  
29. Pigeonhole principle  
30. M03 synthesis — claims, proof, sets & finite counting

The authoring audit expanded the provisional 26 to 30 because repeated-object permutations, combinations, stars-and-bars, inclusion-exclusion and pigeonhole have distinct failure modes and deserve bounded sessions. Probability remains outside M03.

## Publication gate

Before M03 is marked authored:
1. every session has novice instruction, distinct worked/guided examples, Main + Transfer and 10-point evaluators;
2. every retained ownership claim has exact public-request + rubric evidence, following the repaired M02-03 rule;
3. every new symbol/operation has an M01/M02/prior-M03/JIT source;
4. fixed-task instruction separation is checked;
5. references/proofs/counts are independently re-derived, with proof rubrics accepting valid alternate arguments;
6. evidence fingerprints and answer-exposure semantics remain unchanged;
7. M03 is loaded into the shared runtime without changing the T22 Elite storage key or legacy T22/T25 state;
8. Chromium validates module selection, save/reveal/review, draft provenance and cross-module export/import;
9. semantic status + roadmap become accepted/authored only after those checks pass;
10. create M03 REVIEW-HANDOFF and stop. No M04 authoring.


## Acceptance evidence

M03 passed its publication gate in two stages:

- `db52b613f9a0adcc1e2ae9fd628cb28d033083f9` — 150/150 ownership claims manually re-audited for actual observability. Five cross-task directions were corrected and pinned to Transfer: S25 multinomial grouping; S28 divisibility inclusion-exclusion; S29 engineered pigeonholes; S30 finite-function noninjectivity; S30 surjection inclusion-exclusion. GitHub Actions run `35310713858` — **SUCCESS**.
- `d3f3e8b70abf51e297c545fdc739ad506262e90f` — M03 loaded through the existing authoring-pack runtime. Chromium exercised 3-module selection, 30-session M03 scoping, M03 save/reveal/review, unsaved-draft + assistance provenance across module round-trips, answer-bearing packet exposure and three-module export/import. GitHub Actions run `35325699018` — **SUCCESS**.

The evidence key remains `chrono_t22_elite_course_evidence_v1`. Historical T22 progress and T25 state were not changed.

**Review boundary:** create `M03-REVIEW-HANDOFF.md` and stop. Do not author M04 in this pass.
