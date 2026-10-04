# M03 v2 — six-tools source / pedagogy supplement

Date: 2026-10-04  
Module: `T22E-DISC01 — Mathematical Reasoning & Discrete Foundations`  
Candidate: `m03-authoring-v2.0-six-tools-candidate-r1`  
Status: **builder-authored supplement; exact-head full validation and independent adversarial review pending**

This document supplements, rather than rewrites, the published v1.7.2 source dossier. The
published 30-session state remains historical authority for its own acceptance record. The v2
candidate adds six bounded mathematical capabilities while preserving the old S01–S30 stable
session/task identities.

## 1. Controlling design proposal

Primary build brief: **T22 M03 — source-grounded session proposal**, prepared 4 October 2026.

The brief concludes that the existing source base is sufficient and recommends a 36-position
candidate consisting of the existing 30 capabilities plus six bounded additions. It explicitly
says the position numbers are proposal positions, not permission to replace the existing stable
session identities. That distinction controls this implementation.

The six additions implemented here are:

| Stable ID | Learner position | Capability |
| --- | ---: | --- |
| S31 | 07 | Quantifier order and allowed witness dependence |
| S32 | 11 | Constructive existence and uniqueness |
| S33 | 17 | Well-ordering, least counterexamples and finite extrema |
| S34 | 28 | Bijections, encodings and uniform fibres |
| S35 | 31 | Double counting and combinatorial identities |
| S36 | 35 | Invariants, nonnegative-integer ranks and termination |

## 2. Source roles

### Daniel J. Velleman — *How to Prove It: A Structured Approach*, 2nd ed.

Role: rigorous proof-construction comparator.

Relevant material in the supplied edition includes quantifiers and their equivalences, structured
proof strategies, proofs involving quantifiers, existence-and-uniqueness proofs, functions and
mathematical induction. Its preface explicitly motivates proof structures whose choice follows
the logical form of the statement.

Used here for:
- S31 scope/order/dependence discipline;
- S32 separation of existence and uniqueness obligations;
- the broader requirement that the learner understand the proof contract before algebraic work.

Not imported:
- later infinite-set theory;
- any exercise wording;
- any claim that the textbook experimentally validates T22.

### Richard Hammack — *Book of Proof*

Role: beginner-facing proof / counting comparator already recorded in the published dossier and
the 2026-10-04 design proposal.

Used here for elementary existence/uniqueness, smallest-counterexample and finite
counting-map structure. No source exercise is copied into a fixed task.

### Lehman, Leighton & Meyer — *Mathematics for Computer Science*

Role: discrete-mathematics comparator already recorded in the design proposal.

Used here for the mathematical distinction among states, invariants and decreasing
nonnegative-integer measures, and as a route comparator for proof/induction/counting.

Not imported:
- programming syntax;
- graph algorithms;
- asymptotic analysis.

### Zeitz / Soberón / Pólya

Role: problem-solving / representation comparators.

Used here to strengthen route selection, reversible representation, double counting, extremal
reasoning and invariant thinking. These sources motivate strategy practice; they do not make a
fixed assessment "fresh" merely because a named strategy is contest-relevant.

### Existing repository authority

The existing M03 boundary, semantic-prerequisite ledger, M04/M08/M09/M10–M15 contracts and
published M03 provenance remain the authority for ownership boundaries. In particular:

- probability and expectation remain M04;
- epsilon-limit definitions and analysis theorems remain M09;
- the finite binomial theorem remains owned by stable M03 S26;
- M08 may consume invariant/rank mathematics but M03 does not import Python;
- M13–M15 may consume proof habits without importing linear-algebra theorems backward.

## 3. Self-containment ledger

| New session | Must be present before assessment | Explicit non-assumption |
| --- | --- | --- |
| S31 | explicit domains; quantifier order; permitted dependence; exact nested negation | no epsilon/delta terminology |
| S32 | existence / at-most-one / exactly-one; candidate verification; two-object uniqueness argument | solving an equation does not automatically certify a legal solution or uniqueness |
| S33 | well-ordering for nonnegative integers; nonempty counterexample set; legal smaller case; finite minimum | arbitrary nonempty real sets do not automatically have minima |
| S34 | finite map/inverse; fibre as preimage; equal-fibre theorem | symmetry does not automatically justify division |
| S35 | one finite incidence set; two exact decompositions; boundaries | algebraic resemblance alone is not a combinatorial proof |
| S36 | state; legal move; invariant; nonnegative integer rank; strict decrease | preservation does not imply reachability/termination; real decrease alone does not imply finite termination |

## 4. Fixed-task originality / separation notes

All twelve new fixed tasks were newly authored for this build. Their visible worked/guided
examples use different mathematical objects from the fixed assessments.

Particularly important adversarial surfaces:

- **S31-T:** the allowed-output table is not shown in instruction; the learner must recast
  `∀x∃y` as an input-dependent choice and `∃y∀x` as a common-output requirement.
- **S34-T:** the proposed divide-by-three argument is intentionally tempting; the learner must
  inspect fibres and discover their sizes vary.
- **S35-T:** the prompt gives only the finite sum identity; it does not supply the counted set or
  the two decompositions.
- **S36-M:** the easy invariant `x+y` is true but non-decisive. The learner must choose a
  different preserved property (for example parity) that separates the initial and target states.

## 5. Deterministic mathematics checks

Builder-side deterministic checks cover the new fixed-task reference mathematics:

- S31: `m=n+1` is a legal odd-difference witness for every integer n; choosing `n=m`
  defeats every proposed global m; the finite allowed-output table has a dependent selection but
  empty global intersection.
- S32: the affine equation has the claimed unique real solution; `x²=16` has two real
  solutions and one nonnegative solution.
- S33: the least-counterexample inequality is numerically checked over a broad finite range and
  the proof algebra is independently re-derived.
- S34: subset/bit-string cardinality is 32; the marked-string domain has size 12, the nonzero
  output set has size 7, and fibre sizes are not constant.
- S35: both sides of the Main identity equal 80; the Transfer identity equals 81.
- S36: the Main start and target agree in sum but disagree in the decisive parity invariant;
  the two-pile process terminates after 11 moves at `(6,0)`.

These checks test reference correctness. They do not establish pedagogical effectiveness,
difficulty calibration or independent review.

## 6. Pedagogical rhythm

Each new session follows the candidate rhythm from the controlling proposal:

1. retrieve only the prerequisite actually needed;
2. define the mathematical object/contract;
3. teach the tool with a worked example and a failure/contrast;
4. require a genuine guided action;
5. assess the owned capability in Main;
6. change a meaningful representation/obstacle in Transfer;
7. leave method selection for delayed mixed practice rather than calling a close clone "fresh".

## 7. Acceptance boundary

This candidate is **not accepted or published** merely because it is authored.

Before publication it still requires:

- all standing syntax/structural/semantic/provenance validators;
- exact claim → public request → rubric re-audit;
- semantic clone audit against S01–S30 and the existing Strategy Labs;
- deterministic math checks for all new surfaces;
- actual Chromium learner traversal including the six new positions;
- downstream dependency regressions;
- an exact-head verification receipt;
- a fresh independent adversarial review and repair of every justified material finding.

No update to the accepted semantic-prerequisite row is made at builder stage.
