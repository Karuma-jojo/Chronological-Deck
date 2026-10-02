# M04 v2.1 final independent confirmation

Date: 2026-10-02  
Module: `ARC048 — Finite Probability, Conditional Probability, Independence & Expectation`  
Confirmation branch: `codex/t22-m04-v2-final-confirmation`  
Repaired implementation head confirmed before this documentation commit: `e7bb7e421f482db952871d747ff9ecbbd2040e0a`  
Canonical M04 blob: `69ab0e03b246bb5e4a0d4836ef2bc335380580cc`  
Canonical candidate version: `m04-authoring-v2.1-independent-review-repair-r1`

## Scope

This is a bounded independent confirmation of the repaired R01–R06 contract from:

- `docs/t22-course/M04-V2-INDEPENDENT-ADVERSARIAL-REVIEW.md`

It does not reopen M05, M06 or M26 and does not rewrite M04 content. The question is whether the exact repaired M04 closes the six findings without creating a new blocker.

## Exact-head validation receipt

The repaired implementation head `e7bb7e421f482db952871d747ff9ecbbd2040e0a` passed the complete T22 Elite workflow:

- workflow run: **37023511435**
- job: **110892242945**
- syntax checks: PASS
- structural / pedagogy / semantic / evidence regressions: PASS
- deterministic M04 math checks: PASS
- inherited M01–M15 protections: PASS
- Chromium installation: PASS
- full browser evidence workflow: PASS
- real learner M04 browser workflow: PASS

An earlier isolated M04 browser rerun after the v2.1 browser-regression fix also passed:

- isolated M04 review run: **37022743950**
- M04 learner browser: PASS

The final full-workflow receipt is controlling because it validates the repaired M04 together with inherited repository protections.

---

# R01 confirmation — evidence-distance honesty

**CLOSED.**

The repaired ledger contains exactly:

- fresh Main evidence: **S24-M only**;
- changed-surface Transfer: **S09-T, S10-T, S13-T, S24-T only**;
- S14-M: retrieval;
- every other nominal Transfer slot: honestly retrieval unless separately proof/reconstruction-owned by its Main.

There are exactly **5 decision-audit rows**, matching the one fresh Main plus four genuine changed-surface Transfers.

The repair therefore no longer treats a new story, new numbers or a task slot named “Transfer” as sufficient evidence of transfer.

---

# R02 confirmation — S14 freshness overclaim

**CLOSED.**

S14-M is now explicitly classified **retrieval**.

That is the correct classification because visible instruction already states:

- pairwise checks are insufficient for mutual independence;
- the triple-intersection factorization must also be checked.

The XOR task remains pedagogically valuable without falsely claiming the method was independently selected.

---

# R03 confirmation — S24 fresh synthesis

**CLOSED.**

The repaired S24 instruction no longer pre-solves the staged route/marginal/independence structure used by the Main.

Instruction now synthesizes:

- repeated independent trials;
- complement;
- expectation.

The versioned S24-M instead gives:

- mixed route counts plus conditional rates;
- a staged finite model that the learner must reconstruct;
- joint probability;
- weighted marginal;
- independence diagnosis;
- expectation;
- a decision-boundary claim.

No representation is prescribed. The learner chooses an auditable table/tree/partition/leaf representation.

The Main is therefore materially separated from the worked/guided synthesis and remains the one canonical **fresh Main evidence** target.

S24-M is `obligationVersion=3`.

---

# R04 confirmation — forward total probability versus direct conditioning / Bayes

**CLOSED.**

The repaired wording now makes the mathematically correct boundary:

1. total probability is a **forward marginalization** rule;
2. (P(A\mid B)) and (P(B\mid A)) cannot be exchanged by swapping the bar;
3. if a complete finite joint model is already available, M04-S07's direct definition
   [
   P(B\mid A)=\frac{P(A\cap B)}{P(A)}
   ]
   remains legal;
4. M06 owns **Bayes as a general inversion/update rule**, not every numerical reverse conditional obtainable directly from an already completed joint model.

S18-M/T and S24-T now enforce this boundary without pretending the reverse conditional is mathematically unavailable.

---

# R05 confirmation — S19/S20 ownership order

**CLOSED.**

S19-T now uses four **distinct payoff values with unequal probabilities** and tests weighted expectation only.

It no longer asks the learner to reason about repeated-value multiplicity, so S20 retains ownership of the atom-versus-distinct-label multiplicity issue.

S19-T is `obligationVersion=3`.

---

# R06 confirmation — S20 wrong-solver discrimination

**CLOSED.**

S20-T now uses equiprobable atomic values:

[
\{1,1,1,1,3,7,9,9\}.
]

Correct atomic mean:

[
\frac{32}{8}=4.
]

Blind distinct-label mean:

[
\frac{1+3+7+9}{4}=5.
]

Thus the targeted wrong solver can no longer obtain the correct answer accidentally. The rubric explicitly observes the unequal multiplicities (4,1,1,2).

S20-T is `obligationVersion=2`.

---

# Historical protections reconfirmed

The v2.1 repair does not regress the accepted historical repairs:

- M04-01: S11 explicitly derives complemented-event independence;
- M04-02: claim ownership is not reverted to positional mapping; S05 claim 3 and S13 claim 5 retain their intended Transfer ownership;
- M04-03: S22 retains the labelled ordered-sample positional-marginal derivation;
- M04-04: S04 does not invoke independence before S11 owns it.

Stable module/session/task IDs remain preserved. Changed public assessment contracts are versioned rather than silently mutated.

---

# Final disposition

## **ACCEPT REPAIRED M04 v2.1 FOR PUBLICATION HANDOFF**

No unresolved blocker was found in the R01–R06 confirmation pass.

This acceptance applies to the exact M04 content blob:

`69ab0e03b246bb5e4a0d4836ef2bc335380580cc`

and the repaired implementation state validated at:

`e7bb7e421f482db952871d747ff9ecbbd2040e0a`.

The next action is publication/merge only after explicit user authorization. This confirmation itself does not publish M04 to `main`.
