# M03 v2 six-tools upgrade — design gate

Date: 2026-10-04  
Module: `T22E-DISC01 · Mathematical Reasoning & Discrete Foundations`  
Mode: **BUILD / bounded upgrade of an existing published module**  
Branch: `codex/t22-m03-six-tools-upgrade`  
Recovered baseline: `087a9b98299e0021e009590f92123d3c05e50ab5`

## Gate 0 — recovered authority

The branch was created from the exact current `main` head above. The published M03 baseline is
`m03-authoring-v1.7.2-publication-state-r1`: 30 sessions, 60 stable fixed task IDs and
150 ownership claims. Historical v1.4 acceptance and the v1.7.2 publication record remain
provenance for that state only; they do not certify this materially expanded candidate.

Canonical learner evidence remains in the existing shared store:
`chrono_t22_elite_course_evidence_v1`.

No T25 content, legacy progress, later-module mathematics or unrelated module content is in scope.
No merge to `main` is authorized by this build.

## Gate 1 — boundary contract

**Destination.** A learner can translate a mathematical claim into exact obligations, prove or
refute it, construct and verify objects, reason about finite sets/maps/counts, choose useful
finite representations, and use elementary reduction/invariant methods without importing
probability, analysis or later algorithmic machinery.

**Entry.** Published M01 algebra/arithmetic/inequalities plus M02 function/domain,
finite-sum and elementary recurrence intuition.

**Retained M03 ownership.** All existing 30-session logic/proof/set/map/counting ownership,
including the general finite binomial theorem in stable session `S26`.

**Six bounded additions.**

1. stable new `S31` — quantifier order and allowed witness dependence;
2. stable new `S32` — constructive existence and uniqueness;
3. stable new `S33` — well-ordering, least counterexample and finite extrema;
4. stable new `S34` — bijections, encodings and uniform fibres;
5. stable new `S35` — double counting and combinatorial identities;
6. stable new `S36` — invariants, integer ranks and termination.

The new IDs are deliberately outside S01–S30. Existing session/task IDs are not renumbered.
Only their learner-facing `order` positions move so the six new units can be interleaved.

**Deferred.** Probability/independence/expectation (M04); epsilon-limit theory (M09);
calculus/infinite series; graph algorithms (M22); substantial contest number theory,
geometry, graph theory and generating functions (SMMC Companion/later owners).

## Support-theorem ledger

| Support result | First new consumer | Action here | Boundary |
| --- | --- | --- | --- |
| Witness may depend on earlier universally quantified variable | S31 | define + demonstrate | no epsilon language |
| Existence / at-most-one / exactly-one decomposition | S32 | define + prove with elementary equations | no linear-algebra theorem import |
| Well-ordering of nonnegative integers | S33 | state explicitly + apply | no claim that arbitrary real sets have minima |
| Every nonempty finite real set has a minimum | S33 | state for finite-extremal transfer | no compactness/completeness theory |
| Finite constant-fibre counting: `|A|=q|B|` | S34 | derive from partition into fibres | no group actions/Burnside |
| Equality by two counts of one finite incidence set | S35 | teach as deterministic counting structure | no probability/expectation |
| Nonnegative integer rank strictly decreases ⇒ no infinite move sequence | S36 | prove using well-ordering | no asymptotic/algorithm analysis |

## Gate 2 — source roles

The existing M03 source dossier remains applicable and is supplemented by the
2026-10-04 source-grounded blueprint supplied for this upgrade.

- **Curriculum authority:** current repository M03 boundary, dependency/semantic ledgers and
  downstream M04/M08/M09/M10–M15 contracts.
- **Proof route comparator:** Velleman, *How to Prove It*, especially quantifiers,
  proof strategies and existence/uniqueness.
- **Beginner proof/counting comparator:** Hammack, *Book of Proof*.
- **Discrete route / invariant comparator:** Lehman–Leighton–Meyer,
  *Mathematics for Computer Science*.
- **Problem-solving comparators:** Zeitz, Soberón and Pólya.
- **Pedagogy comparators:** MAA Instructional Practices Guide and IES/WWC practice guide.

These sources shape definitions, contrasts and sequencing; they do not override T22 ownership
or certify this implementation experimentally.

## Gate 3 — compact pre-authoring artifacts

### Concept dependency graph

`S05/S06 → S31 → old S07 onward`  
`old S09 direct proof → S32 → old S10/S11`  
`old S13/S14 induction → S33 → sets`  
`old S20/S21 mappings + old S23/S24 counting → S34 → old S25/S26`  
`S34 + old S26 → S35 → old S27/S28/S29`  
`parity + induction + S33 + relations → S36 → old S30 synthesis`

### Conceptual distinctions to make explicit

- `∀x∃y` versus `∃y∀x`; dependence versus one witness for all;
- existence versus at-most-one versus exactly-one;
- least integer counterexample versus unjustified real minimum;
- bijection versus constant-fibre surjection versus unsafe symmetry division;
- same finite incidence set counted two ways versus algebraic pattern matching;
- invariant versus reachability; rank/termination versus terminal-result identification.

### Misconception map

The build must reject these wrong solvers:

- swapping quantifiers without changing meaning;
- reporting an algebraic candidate without checking domain/existence;
- treating failed search as uniqueness;
- assuming every nonempty real set has a minimum;
- dividing by a symmetry count without constant multiplicity;
- equating two unrelated counts;
- treating preservation as proof of termination or reachability;
- using a decreasing real-valued quantity as if it guaranteed finitely many steps.

### Representation progression

plain language ↔ quantified symbols → witness-dependence table/function →
two-solution uniqueness comparison → least-counterexample set →
finite maps/preimages/fibres → incidence pairs/table → state-transition diagram with invariant/rank.

### Downstream obligations

- M04 receives deterministic finite-set/counting structure only; probability semantics remain M04.
- M08 may consume state/invariant/rank ideas as mathematical prerequisites, not Python syntax.
- M09 may consume quantifier dependence but still owns epsilon definitions/theorems.
- M10 continues to consume stable S26 finite-binomial ownership.
- M13–M15 may reuse existence/uniqueness and mapping proof habits while owning linear algebra.

### Narrative spine

**Say exactly what the claim asks → construct/refute legally → choose a representation →
justify that representation → reduce or preserve structure → communicate the proof.**

### Candidate session architecture

Learner positions are 1–36. Existing stable IDs keep their identity; their `order` changes.
New stable IDs are inserted at learner positions **7, 11, 17, 28, 31, 35**.

### Split/merge decision

Keep all six as distinct sessions. Each introduces a different failure mode and observable
decision. Do not merge them into neighboring sessions merely to preserve the historical
30-session count.

## Pilot rule

Author S31 first as the pilot. It must contain:

- explicit domains/scope and witness-dependence explanation;
- a fully solved worked example different from both fixed tasks;
- a guided learner action with no fixed-task answer leakage;
- Main + changed-surface Transfer with 10-point fair rubrics;
- exact claim→public-request→rubric evidence;
- prerequisite, separation, evidence-distance, decision and wrong-solver receipts;
- independent mathematical re-derivation before proceeding.

After the pilot passes its local gates, author S32–S36 one at a time and then perform the
whole-module route/provenance/browser audit. Final status must remain **candidate awaiting
independent adversarial review**.
