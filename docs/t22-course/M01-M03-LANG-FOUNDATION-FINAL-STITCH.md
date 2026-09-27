# T22 Lang-foundation final stitch — LF-R01–LF-R06 resolution

Date: 2026-09-27  
Repository: `Karuma-jojo/Chronological-Deck`  
Repair branch: `codex/t22-lang-foundation-final-stitch`  
Base head: `60d0e9377ca49f5ee43de6c141c4368d557cd3ee`

## Status

**BOUNDED FINAL-STITCH REPAIR IMPLEMENTED; FULL WORKFLOW + INDEPENDENT RECONFIRMATION PENDING.**

This repair closes the remaining failure mode exposed after the first Lang pass: a general idea could appear in instruction, be assessed only on a special case, and then be promoted downstream as if the general capability had been independently owned.

No module architecture is expanded.

- M01 remains 17 sessions.
- M02 remains 24 sessions.
- M03 remains 30 sessions.
- M10 remains 24 sessions.
- Stable session/task IDs remain unchanged.
- No new M10 assessment ownership is added.

## LF-R01 — M03-S26 general binomial theorem ownership was weaker than M10's prerequisite claim

**Finding:** S26 stated the general theorem but owned only “expand for a small positive integer n,” and Main observed only n=4. M10-S10 then cited the finite theorem for arbitrary positive integer n.

**Repair:**

S26 claim 5 is now:

> State and use the finite binomial theorem for positive integer n, and explain combinatorially why the coefficient of x^(n−k)y^k is C(n,k).

Main is now `obligationVersion=3` and publicly requires all three layers:

1. state `(x+y)^n = Σ(k=0..n) C(n,k)x^(n−k)y^k` for positive integer n;
2. explain why `C(n,k)` counts the choices of which k factors contribute y;
3. apply the theorem to a fresh full expansion of `(u+v)^5`.

The exact claim-evidence row names separate rubric observers for the general theorem statement, the combinatorial coefficient argument, and the fresh numerical application.

M10's dependency validator now checks the upstream claim **and its public evidence**, not merely the existence of “binomial” language.

## LF-R02 — guided→Main n=4 clone

**Finding:** Guided expanded `(a+b)^4`; Main expanded `(x+y)^4`.

**Repair:** Guided no longer performs a full expansion. It asks only for the coefficient of `p^4q^2` in `(p+q)^6`, with a factor-choice explanation. Main separately requires the general theorem and a full n=5 expansion.

The semantic-separation ledger explicitly records this distinction.

## LF-R03 — permutation↔combination conceptual bridge regressed

**Finding:** the earlier explanation `P(n,r)=C(n,r)r!` disappeared when binomial ownership was added.

**Repair:** S26 again derives:

- choose the r-element subset in `C(n,r)` ways;
- order its r selected elements in `r!` ways;
- hence `P(n,r)=C(n,r)·r!`.

This is instructional support and does not consume a sixth ownership slot.

## LF-R04 — one/no/infinite systems were taught but not owned

**Finding:** M01-S13 and M02-S04 taught/rendered all three system outcomes, but canonical M01 ownership and both fixed S13 tasks still observed only unique systems.

**Repair:**

M01-S13 claim 4 is now:

> Classify an elementary two-equation linear system as having one, no, or infinitely many solutions from its elimination outcome.

The S13 contract hash changes with that stronger capability.

Transfer is now `obligationVersion=3` and requires three fresh systems:

- one solution from a determinate elimination equation;
- no solution from a contradiction such as `0=2`;
- infinitely many solutions from the identity `0=0`.

The rubric separately observes all three classifications and the interpretation of contradiction versus dependence.

M02-S04's prerequisite audit now explicitly cites **M01-S13 fixed Transfer v3** as the algebraic owner of the classification. S04 remains the geometric retrieval/representation layer.

## LF-R05 — S22 Guided replayed the fixed cosine reconstruction

**Finding:** Guided and Transfer both reconstructed `cos(A+B)` from `cos(A−B)` by replacing B with −B.

**Repair:** Guided now starts from the established sine-addition identity, substitutes `−B`, derives `sin(A−B)`, and evaluates a fresh exact angle. The fixed Transfer still reconstructs the cosine sum identity.

The learner is taught the neighborhood without immediately rehearsing the ownership-critical fixed move.

## LF-R06 — S22 chord proof compressed the rotation lemma

**Finding:** “the same chord subtends angle A−B” hid the distance-preserving rotation step.

**Repair:** S22 now explicitly says:

- rotate both unit-circle points rigidly by `−B`;
- rigid rotation preserves Euclidean distance;
- the two points become `P_(A−B)` and `P_0=(1,0)`;
- therefore the chord's squared length is `2−2cos(A−B)`.

No isometry unit is introduced.

## Semantic regressions added

The final stitch adds guards that specifically reject the old failure mode.

### M03-S26

CI now requires:

- the canonical ownership claim to be general in positive integer n;
- the Main public prompt to state the general theorem;
- the Main public prompt to require the general `C(n,k)` factor-choice explanation;
- the fresh n=5 application;
- exact rubric observers for all three layers;
- the restored `P(n,r)=C(n,r)·r!` bridge;
- semantic-separation metadata showing Guided is coefficient-only n=6 reasoning, not a cloned full expansion.

### M10-S10 dependency receipt

M10 validation now refuses to accept M03 merely because S26 mentions binomial expansion. It requires the exact general ownership claim, Main v3, the general theorem in the public request, and the general coefficient-choice rubric evidence.

### M01-S13

CI now requires the stronger canonical claim, changed contract hash, Transfer v3, and explicit rubric evidence for one/no/infinitely-many classifications.

### M02-S22

CI now requires the rigid-rotation distance-preservation statement and a Guided sine-difference reconstruction distinct from the fixed cosine-sum reconstruction.

### Browser

Real Chromium must see:

- the M01-S13 three-way public classification task;
- the S22 rigid-rotation proof closure;
- the distinct S22 Guided move;
- the M03-S26 general theorem wording;
- the general coefficient-choice request;
- the fresh n=5 expansion.

## Correct status

R01–R08: **closed**  
Original Lang L01–L10: **substantively repaired**  
LF-R01–LF-R06: **repaired on isolated branch**  
Architecture: **keep**  
Freeze: **not self-declared; full workflow + independent reconfirmation still required**
