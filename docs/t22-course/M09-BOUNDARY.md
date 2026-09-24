# M09 — Sequences, Convergence & Limits

Date: 2026-09-24. Module `SIDE263`. Builder: this session. Independent review: not claimed.

## Recovery and authority

User explicitly accepted M01–M08 as the baseline, then authorized building M09 and pushing to main. This supersedes historical M09-closed and no-main instructions for this assignment only. It does not authorize M10, T25, SMMC edits or migration of legacy progress.

Recovered main: `2f8bd161fc9b9a0163713ed0c7f4341879b47419`. Recovered working branch: `de020e0e7a3a37d62b0d7570512be46755b70ec2`, six commits ahead, zero behind main. The build starts from that working branch, preserving the M08 follow-up acceptance and M01–M08 prerequisite cleanup. Its complete downloaded tree was checked against Git blob hashes before local work. Local Git's initial snapshot commit is a tooling baseline, not a remote ancestry claim.

The user's baseline acceptance is recorded without relabeling historical independent-review records. M01 completion remains reported learner progress with the previously stated audit limitations. Nothing here externally recertifies that learner's mastery.

## Scope and prerequisite audit

Canonical prerequisites are M02 (`T22E-FND02`) and M03 (`T22E-DISC01`), with M01 transitive. M08 programming is not required. The legacy SIDE263 entry that required derivatives is not reused. The canonical M09-B01 bridge is implemented without assuming ARC053.

| Capability reused | Earlier owner or local teaching |
| --- | --- |
| Domains, algebra, functions and principal square roots | M01; M02-S02, S11 |
| Indexed/geometric sequences and recurrence notation | M02-S17–S20 |
| Radians, unit-circle signs, sin²+cos²=1 and tangent | M02-S21–S22 |
| Quantifiers, negation, counterexamples, contradiction, induction | M03-S05–S07, S11, S13 |
| Floor and strict integer cutoffs | Defined M09-S02, practiced S03 |
| Triangle inequality | Derived M09-S05 before limit-law proofs |
| Supremum and completeness | Explained locally M09-S12; completeness is an explicit real-number fact, not an assumed proof skill |
| Function limit along approaching sequences | Explained M09-S21 before its Transfer |
| General IVT and EVT proofs | Not required; theorem statements and hypotheses taught S25–S26 |

M09 owns quantified elementary sequence and function limits, laws and counterexamples, monotone bounded convergence, elementary recurrences, one-sided and infinite limits, continuity, IVT, bisection accuracy and EVT hypotheses. It does not own derivatives, l'Hopital, integration, infinite series, Taylor expansions, probabilistic convergence, uniform convergence or completeness equivalences. Later modules retain these boundaries.

## Source ledger and adaptations

All seven primary sources were opened for mathematical definitions and hypotheses. Original exercises and prose were written for this route; source exercises were not copied. Exact URLs, checked date, supported use and per-session source IDs live in `m09.json`.

| Source | Decision supported | Adaptation/limit |
| --- | --- | --- |
| [Lebl, Sequences and limits](https://www.jirka.org/ra/html/sec_seqsandlims.html) | Epsilon-N, boundedness, subsequences, monotone convergence | Explain least upper bound locally; no construction of the reals |
| [OpenStax 2.5](https://openstax.org/books/calculus-volume-1/pages/2-5-the-precise-definition-of-a-limit) | Epsilon-delta and threshold meanings | Restrict to approachable domain points; do not permit vacuous isolated-point limits |
| [OpenStax 2.3](https://openstax.org/books/calculus-volume-1/pages/2-3-the-limit-laws) | Laws, algebra and squeeze | Justify legal domains and nonzero denominators |
| [OpenStax 2.4](https://openstax.org/books/calculus-volume-1/pages/2-4-continuity) | Continuity and IVT | Existence is distinguished from uniqueness |
| [SFU trigonometric limits](https://www.sfu.ca/math-coursenotes/Math%20157%20Course%20Notes/sec_TrigLimits.html) | Geometric area squeeze | Derive a local cosine error bound rather than assume cosine continuity circularly |
| [OpenStax 4.6](https://openstax.org/books/calculus-volume-1/pages/4-6-limits-at-infinity-and-asymptotes) | End limits and asymptote signs | No derivative-dependent methods imported |
| [OpenStax 4.3, EVT only](https://openstax.org/books/calculus-volume-1/pages/4-3-maxima-and-minima) | Attained extrema on closed bounded intervals | Use elementary algebra; general EVT proof deferred explicitly |

Sources establish mathematical facts. They do not certify teaching quality. The session audits and actual learner evidence serve different roles.

## Session-sizing decision

**27 sessions; no inherited session-count quota.** S01 was the vertical slice for distinguishing universal tails from observations, then each session was authored with its public tasks, solutions, scoring and semantic links before integration. The sequence isolates these obstacles:

| Sessions | Instructional purpose | Why the boundaries are retained |
| --- | --- | --- |
| S01–S04 | Tails, definition, strict error budgets, negation | Eventual/infinite frequency, construction and refutation require different quantified actions |
| S05–S09 | Uniqueness, boundedness, laws and squeeze | Establish each tool before using it; distinguish global bounds from vanishing envelopes |
| S10–S14 | Geometric behavior, subsequences, monotone theorem, recurrences, signed infinity | Avoid fixed-point and unboundedness fallacies |
| S15–S18 | Punctured domains, affine delta, local nonlinear bounds, one-sided limits | Move from indexed to continuous inputs in usable steps |
| S19–S23 | Cancellation, radicals, trigonometry, end limits, local infinity | Each involves a distinct legal transformation or approach convention |
| S24–S26 | Continuity, IVT/bisection, EVT | Separate equality with the point value, root existence and extrema attainment |
| S27 | Synthesis | Link a continuous extension to indexed error guarantees; challenge finite/path-only evidence |

S03 could superficially be merged with S02, but minimal strict cutoffs and uniform worst-case guarantees are separate from constructing any valid epsilon-N certificate. S16 and S17 stay separate because the latter introduces a preliminary local bound. S25 and S26 stay separate because root bracketing and extremum attainment are different capabilities. S21 has a longer geometric derivation; its inputs are explicitly owned before it and no derivatives are smuggled in.

## Publication semantics

`authored-builder-verified` means built, self-reviewed and checked, not independently accepted. The semantic ledger's `accepted` status is scoped to the builder's boundary/prerequisite acceptance required by the runtime publication gate. It is not a claim of external content review. Stop after M09.
