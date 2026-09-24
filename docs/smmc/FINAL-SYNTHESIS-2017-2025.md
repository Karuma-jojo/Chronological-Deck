# SMMC × T25 final evidence synthesis — 2017–2025

Status: **COMPANION ARCHITECTURE v1.0 FROZEN**
Primary-domain reconciliation remains open only at the per-problem hybrid-label level; see `DOMAIN-RECONCILIATION-2017-2025.md`.

## 1. Corpus

The companion ledger now contains the complete official 2017–2025 corpus:

- 88 official problems;
- 72 East-core A/B problems;
- 16 C-session supplementary problems.

Current prerequisite-overlap audit:

| Corpus | GREEN | AMBER | RED |
| --- | ---: | ---: | ---: |
| All 88 | 39 | 27 | 22 |
| East 72 | 30 | 24 | 18 |
| C supplementary 16 | 9 | 3 | 4 |

Interpretation:

- **GREEN** does not mean easy. It means T25 plus existing T25 prerequisite bridges supply enough mathematics for a fair unfamiliar attempt.
- **AMBER** means a bounded SMMC bridge or method lesson should come first.
- **RED** means a substantial SMMC-specific bridge or specialist route is needed.

For East-core, roughly 42% of the historical problems are currently GREEN, 33% AMBER and 25% RED. This is strong evidence for a companion architecture rather than a second independent degree-sized syllabus.

---

# 2. What is now frozen

The SMMC companion is:

[
oxed{
	ext{T25 core}
ightarrow
	ext{targeted SMMC bridges}
ightarrow
	ext{methods spine}
ightarrow
	ext{sealed transfer}
ightarrow
	ext{timed papers}
}
]

T25 remains untouched in purpose.

SMMC does **not** become additional T25 targets and does not grant T25 clearance.

---

# 3. Content architecture

The canonical structured definitions live in `course/smmc/curriculum-v1.mjs`.

## Mandatory core bridges

### S-BRIDGE-N1 — Contest number theory beyond BR-N

This is now unquestionably justified across the corpus.

It extends, rather than duplicates, T25's small integer/parity bridge.

Minimum content:
- gcd/Euclid and prime-factor structure;
- congruences beyond parity;
- CRT/totient;
- rational-root/integer-polynomial arguments;
- factorial/binomial divisibility;
- introductory valuations;
- bounded elementary Diophantine reasoning.

Do not turn this into a full abstract-number-theory course.

### S-BRIDGE-GR1 — Graphs and discrete structural reductions

Repeated matrix, pursuit, game and extremal problems require graph language.

Minimum content:
- degree/components;
- paths/cycles/trees;
- 2-regular cycle decompositions;
- cliques;
- graph distance;
- elementary pursuit/guarding;
- P/N game-state reasoning;
- translating matrices/geometry into graphs.

### S-BRIDGE-AN1 — Infinite series and asymptotic constructions

This is a true gap because canonical T25 intentionally stops short of general series tests.

Minimum content:
- comparison/subseries arguments;
- harmonic benchmark;
- alternating remainders;
- block counterexamples;
- asymptotic recurrence estimates;
- rigorous finite-to-infinite passages.

### S-BRIDGE-AN2 — Elementary real analysis and convex structure

Keep this bounded and problem-driven.

Minimum content:
- infimum/supremum;
- compact extrema;
- nested compact sets;
- one-sided limit control;
- boundedness/regularity facts around Riemann integrability;
- elementary convex-function structure;
- envelopes/supporting lines.

No measure theory.

### S-BRIDGE-GF1 — Generating functions + elementary first-order ODEs

Required by a small but recurring family.

Minimum content:
- ordinary generating functions;
- convolution/product;
- recurrence differentiation;
- separable/linear first-order ODEs;
- simple qualitative ODE arguments;
- coefficient/limit extraction.

No general ODE course.

### S-BRIDGE-GEO1 — Structural geometry beyond T25 coordinates

The corpus does **not** justify a giant IMO synthetic-geometry syllabus.

It does justify:
- convex hulls;
- Minkowski sums;
- lattice/midpoint geometry;
- tilings/dissections;
- simple spatial incidence;
- vector/Gram translations.

---

## Specialist modules

These are not mandatory before ordinary SMMC participation.

### S-SPECIAL-ALG1 — Finite fields and polynomial algebra

Used for advanced finite-field matrix/polynomial/projective problems.

### S-SPECIAL-ALG2 — Operator and function-space methods

A narrow extension motivated especially by the 2025 invariant-function-space problem.

### S-SPECIAL-NT2 — Gaussian integers and perfect-power Diophantine methods

A specialist/open-problem route, not baseline SMMC preparation.

---

# 4. Methods spine

The complete 88-problem method tags make the methods layer non-negotiable.

Observed counts across the full ledger include:

| Method | Tagged problems |
| --- | ---: |
| BOUNDING | 41 |
| CASE-DECOMPOSITION | 34 |
| CONSTRUCTION | 29 |
| CROSS-DOMAIN | 28 |
| AUXILIARY-OBJECT | 26 |
| FACTORIZATION | 20 |
| INDUCTION | 19 |
| SYMMETRY | 13 |
| RECURRENCE-REFORMULATION | 13 |
| LEMMA-EXTRACTION | 12 |
| CONTRADICTION | 12 |
| NORMALIZATION | 12 |

Therefore SMMC training must explicitly teach:

1. **S-METHOD-B1** — bounding/comparison/sharpness;
2. **S-METHOD-C1** — case architecture + lemma extraction;
3. **S-METHOD-K1** — construction/encoding/bijection;
4. **S-METHOD-X1** — auxiliary objects + cross-domain translation;
5. **S-METHOD-I1** — stronger induction/recurrences/invariants;
6. **S-METHOD-E1** — extremal/minimal-counterexample reasoning;
7. **S-METHOD-S1** — symmetry/parity/normalization;
8. **S-METHOD-O1** — open-problem partial progress;
9. **S-METHOD-W1** — contest proof writing.

These are short reusable training units, not subject courses.

---

# 5. How this integrates with T25

## Stage 0 — T25 dominates

Early mathematical development remains T25-first.

SMMC appears only as:
- occasional curiosity;
- method examples using already-cleared prerequisites;
- no large specialist detours.

Default load can be approximately:

[
95% 	ext{ T25} / 5% 	ext{ SMMC}.
]

## Stage 1 — GREEN transfer begins

When a problem's stable `t25Targets` are cleared:

[
	ext{T25 prerequisite evidence}
ightarrow
oxed{	ext{sealed S-XFER}}
]

No pre-teaching of the specific solution.

A GREEN label means the difficulty should come from discovery, not missing vocabulary.

## Stage 2 — AMBER bridges become demand-driven

When an otherwise appropriate problem is AMBER:

[
	ext{T25}
ightarrow
	ext{bounded S-BRIDGE / S-METHOD}
ightarrow
	ext{fresh transfer problem}.
]

Do not teach a bridge simply because it exists in the catalogue.

Use the first repeated need as the trigger.

A reasonable mature load is approximately:

[
80% 	ext{ T25} / 20% 	ext{ SMMC}.
]

## Stage 3 — RED specialist preparation

Only after mathematical foundations are strong:

[
	ext{core bridge}
ightarrow
	ext{specialist extension where wanted}
ightarrow
	ext{RED development problem}.
]

RED problems are not ordinary mastery gates.

Some are open or research-flavoured.

## Stage 4 — Competition season

Shift from content acquisition to evidence:

[
	ext{unseen individual problems}
ightarrow
	ext{timed mini-sets}
ightarrow
	ext{full 3-hour sessions}
ightarrow
	ext{full A+B day}.
]

A serious competition-season load may temporarily reach roughly:

[
60% 	ext{primary maths/T25 maintenance} / 40% 	ext{SMMC}.
]

The ratio is a scheduling heuristic, not an academic contract.

---

# 6. WALL and assistance policy

Historical transfer is meaningful only if the task remains unfamiliar.

For a sealed S-XFER:

### Before attempt

Learner may see:
- exact official problem statement;
- allowed time;
- whether ordinary tools/calculator are permitted;
- prerequisites already cleared.

Learner may **not** see:
- primary domain;
- secondary tags;
- method tags;
- GREEN/AMBER/RED;
- bridge need;
- solution structure;
- likely theorem;
- answer shape;
- number of cases;
- evaluator/reference solution.

### During WALL

Neutral mathematical-tool teaching is permitted only when it does not reveal why that tool is relevant to the active problem.

If assistance materially exposes the route, the attempt ceases to count as pristine unfamiliar-transfer evidence.

### After attempt

Reveal:
- score estimate;
- proof gaps;
- method comparison;
- reference route;
- bridge diagnosis;
- delayed reattempt date.

---

# 7. Historical-corpus preservation

The 88-problem corpus is finite.

Do not assign a problem permanently by year alone.

Use learner-exposure state:

### Development eligible

Solution or substantial route has already been seen.

### Transfer eligible

Statement may have been seen, but the solution/method has not been materially exposed.

### Sealed-paper eligible

The learner has not materially seen the statements/solutions for that full paper.

Whole-paper preservation is more valuable than preserving isolated easy problems.

The system should therefore maintain an exposure ledger with at least:

- `statementSeen`;
- `solutionSeen`;
- `materialHintSeen`;
- `attempted`;
- `attemptScore`;
- `assistanceLevel`;
- `reattemptEligibleAt`.

Private tags in the current SMMC ledger are evaluator metadata and must never be interpreted as learner-visible hints.

---

# 8. Score evidence

The main outcome variable is not curriculum completion.

Track:

- unseen attempt score;
- time;
- proof completeness;
- useful partial progress;
- whether the decisive method was self-discovered;
- assistance level;
- delayed reconstruction;
- full-paper score.

Ultimately:

[
oxed{
	ext{SMMC readiness}
approx
	ext{points produced on unseen timed A+B material}
}
]

not:

[
	ext{number of SMMC lessons completed}.
]

---

# 9. Open problems

Every historical B4 currently remains explicitly marked `open-problem` in the companion ledger.

For open/research items, scoring must distinguish:

- complete resolution of a solved subpart;
- correct special case;
- meaningful reduction;
- upper/lower bound;
- structural lemma;
- computational evidence;
- conjecture only.

Do not require a complete answer to an unresolved problem.

Do not build a general research-mathematics curriculum solely because B4 can contain open material.

---

# 10. Aster integration

Aster is allowed only as an optional presentation layer.

Architecture:

[
	ext{private evaluator/reference}
quad|quad
	ext{frozen SMMC task}
quad|quad
	ext{public story state}
quad|quad
	ext{academic evidence}.
]

Story state cannot change:
- problem wording;
- available mathematics;
- scoring;
- clearance;
- hints.

During WALL, Aster must not encode:
- domain;
- method;
- number of cases;
- answer shape;
- warm/cold feedback;
- metaphors that reveal the breakthrough.

Wrong attempts, slow progress, or pauses create **no narrative punishment**.

Aster consequences belong after an attempt/review checkpoint.

---

# 11. Primary-domain frequency caveat

The newer SMMC-2027 research audit and the independently authored ledger disagree on several hybrid primary labels.

This does not affect:
- T25 overlap;
- bridge needs;
- method training;
- sealed-transfer logic.

Until reconciliation closes, use:
- the newer research aggregate table for broad historical domain-frequency statements;
- the ledger's method/secondary/bridge metadata for training design.

See `DOMAIN-RECONCILIATION-2017-2025.md`.

---

# 12. Final architecture

The final companion is:

[
oxed{
egin{array}{c}
	ext{T25 M.Stat core}\
downarrow\
	ext{stable prerequisite crosswalk}\
downarrow\
	ext{six bounded core SMMC bridges}\
+	ext{ three optional specialists}\
downarrow\
	ext{nine-method problem-solving spine}\
downarrow\
	ext{sealed S-XFER problems}\
downarrow\
	ext{timed S-PAPER evidence}\
downarrow\
	ext{delayed reattempt + diagnosis}
end{array}
}
]

No canonical T25 content needs to be replaced.

No giant standalone olympiad syllabus is justified by the corpus.

The system should become more SMMC-heavy only as T25 prerequisites accumulate and timed-transfer evidence shows that the extra training is useful.
