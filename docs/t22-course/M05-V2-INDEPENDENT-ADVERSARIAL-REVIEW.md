# M05 v2 independent adversarial review

Date: 2026-10-04  
Reviewed candidate branch: `codex/t22-m05-deep-source-restart`  
Frozen implementation head reviewed: `c8d3518b3902ca312c3141dad7b138b308f4f858`  
Full T22 Elite builder run: **#643 / 37155016405 — SUCCESS**  
Module: **T22E-TRD01 · Trading Games & Decisions Under Uncertainty**  
Candidate version: `m05-authoring-v2-deep-source-candidate`

## Review posture

This is a fresh skeptical review of the frozen builder-green candidate. Historical Astra acceptance is not reused. Builder CI is treated as evidence that the declared checks ran, not as evidence that the semantic/pedagogical claims are true.

The source-led 24-session architecture is substantially stronger than the old M05 and survives this review. I do **not** recommend structural demolition. The review does, however, find several justified evidence/assessment defects that must be repaired before M05 can be accepted.

## Verdict

**REPAIR REQUIRED — architecture survives.**

No mathematical error requiring a session split/merge/reorder was found in the finite decision / bankroll / supplied-utility / 2×2 game spine. The defects are concentrated in:

- overclaimed evidence distance;
- assessment-specific coaching in visible lessons;
- answer-bearing assessment representations;
- one under-delivered decision-tree representation;
- precision of the strictly-competitive mixed-strategy boundary.

---

# R01 — S04-T evidence distance is inflated

Severity: **major evidence defect**

Candidate claim:

`S04-T = changed-surface Transfer`

Why this does not survive hostile review:

The visible lesson already says:

> “On the Transfer, the tree itself is wrong. Repair the node semantics before computing.”

The public Transfer representation then says:

> “The .50 labels on the two action branches are the model error. The decision maker chooses the root branch.”

Those two surfaces supply the central diagnosis that the evidence ledger claims the learner must newly make. The task still usefully tests decision-node/chance-node reasoning, but it is **retrieval / reasoning reconstruction**, not changed-surface transfer.

Required repair:

- downgrade S04-T;
- remove its decisionAudit entry unless a fresh decision remains;
- rewrite the visible Fade generically;
- neutralize the answer-bearing problem-representation note.

---

# R02 — S22-T evidence distance is inflated

Severity: **major evidence defect**

Candidate claim:

`S22-T = changed-surface Transfer`

But the visible lesson says:

> “The Transfer gives a general bimatrix and asks whether the reduction is even legal.”

The public task representation then says:

> “Do not discard the second payoff component unless strict competition is established.”

That is essentially the scored conceptual decision. S20 also already explicitly teaches that a general bimatrix cannot be reduced by automatically making the column player minimize row payoff.

The task is good misconception retrieval, but not fresh transfer.

Required repair:

- downgrade S22-T to retrieval/reasoning reconstruction;
- remove its decisionAudit entry;
- remove Transfer-specific coaching from the lesson;
- neutralize the representation note.

---

# R03 — S24-T evidence distance is inflated

Severity: **major evidence defect**

Candidate claim:

`S24-T = changed-surface Transfer`

Visible instruction says:

> “The Transfer is strategic and requires rejecting chance/zero-sum leakage.”

The problem representation says:

> “This is a bimatrix of strategic choices, not a chance table.”

Those statements give away the model classification and one of the two central errors before the learner responds. S20–S22 also rehearse the same distinction.

Required repair:

- downgrade S24-T;
- remove its decisionAudit entry;
- remove assessment-specific wording from S24 instruction;
- make the task representation data-only.

---

# R04 — S24-M “fresh Main” is overclaimed

Severity: **major evidence defect**

Candidate claim:

`S24-M = fresh Main evidence`

The candidate decisionAudit additionally records:

`decisionSuppliedByPrompt: false`

That is not defensible. The public prompt explicitly tells the learner to:

- “Build whatever auditable representation you think is appropriate”;
- “classify the model”;
- compute EMV;
- check the hard constraint;
- compute supplied expected utility;
- solve a probability threshold;
- audit a universal-best claim.

Visible S24 instruction then explicitly announces that the fixed Main uses “monetary EMV, a hard loss cap, supplied lottery utility and sensitivity.”

The Main is a useful integrated synthesis, but the exact mathematical actions are substantially supplied by prompt/instruction. It should be labelled **integrated reasoning reconstruction**, not fresh evidence.

This repair is preferable to inventing a harder task merely to preserve a prestigious evidence label. The protocol explicitly forbids quota-driven transfer inflation.

Required repair:

- downgrade S24-M;
- remove its fresh decisionAudit entry;
- rewrite the Fade so it does not name the fixed Main/Transfer ingredients.

---

# R05 — several public assessment representations leak scored answers

Severity: **major assessment-validity defect**

A representation may supply data/scaffold. It must not do the scored reasoning for the learner.

Clear leaks on the frozen candidate include:

### S01-M
Prompt asks learner to **build** the action–state–consequence table from prose. The public representation already supplies the completed table.

This destroys evidence for the “build an auditable table from prose” claim.

### S04-M
Prompt asks learner to **build** the decision tree, label node types and place consequences. The public representation already supplies the complete tree structure, action branches, chance probabilities and terminal consequences; its note explicitly gives the node labels.

This is incompatible with the claimed construction evidence.

### S04-T
The malformed tree is appropriate evidence input, but its note identifies the exact model error.

### S08-M
The representation is not fatal, but the note “do not invent state probabilities” supplies a scored conceptual conclusion.

### S15-M
The note says “Both preserve C ≻ B ≻ A,” directly answering part (a).

### S20-M
The note “Use the second component for the column player's preference” supplies a scored reading rule.

### S22-T
The note supplies the legality condition that the task asks the learner to diagnose.

### S24-T
The note directly classifies the model as strategic rather than chance.

Required repair:

- remove S01-M and S04-M assessment representations, because constructing those representations is itself part of the observed capability;
- retain data representations where useful but rewrite answer-bearing notes neutrally;
- rerun browser and claim-observability checks.

No analogous objection is raised to learner-facing **instructional** representations; those are desirable.

---

# R06 — visible instruction contains assessment-specific coaching

Severity: **moderate pedagogical/evidence defect**

The frozen lessons explicitly mention the fixed assessment in multiple places:

- S04: “On the Transfer…”
- S22: “The Transfer…”
- S24: “The fixed Main…” / “The Transfer…”

This creates an avoidable instruction→assessment channel. A lesson should teach the concept, not tell the learner what the fixed assessment is about.

Required repair:

Rewrite those Fade passages in domain-general language while preserving the conceptual boundary.

---

# R07 — S04 decision-tree representation under-delivers its owned visual distinction

Severity: **moderate representation defect**

S04 owns the distinction between a **decision node** and a **chance node**, but the generic learner-facing `probabilityTree` rendering visually looks like an ordinary tree whose root is merely “Choose.” The semantic distinction exists in prose, but the representation itself does not visibly encode the two node types.

Required repair:

- make the instructional tree explicitly label the root as a decision node and the risky split as a chance node (textual node markers are sufficient; no renderer rewrite is required);
- do **not** put those answer labels into the fixed Main representation, because R05 requires that Main to be constructed by the learner.

---

# R08 — strict-competition wording should be tightened before mixed strategies

Severity: **moderate mathematical-boundary precision**

The module sometimes uses “strictly competitive/zero-sum-style” loosely. For pure security calculations this is harmless when the problem explicitly says the column player prefers smaller row payoffs. For mixed-strategy expected-payoff indifference, however, the numerical representation matters: the module is averaging the row player's numbers and treating the column player as minimizing that expected row payoff.

Required repair:

At S22/S23, state the working model precisely:

> for these elementary 2×2 calculations, the supplied one-number matrix is explicitly the row player's payoff, and the column player's criterion is to minimize **expected row payoff**.

Then clarify that this is a supplied zero-sum/minimizing representation for the calculation; M05 is not proving that every ordinally strictly competitive game may be transformed this way without the appropriate expected-utility representation conditions.

This keeps the exercise elementary and avoids importing the full minimax/representation theorem.

---

# Findings not raised

The following survived this review:

- 24-session macro architecture;
- M04→M05 boundary;
- M06 Bayes/value-of-information boundary;
- M07 market-mechanics boundary;
- finite first-hit ruin / stopping semantics;
- feasibility-versus-optimal-sizing separation;
- multiplicative wealth/recovery arithmetic;
- certain-outcome ordinal representation versus lottery-utility distinction;
- positive-affine expected-utility invariance example;
- CE / finite risk-premium calculations under supplied utility tables;
- general bimatrix before adversarial specialization;
- elementary 2×2 indifference algebra, subject to R08 wording repair.

The independent math oracle and Transfer oracle passed on the frozen candidate, but that does not override R01–R08 because these findings concern evidence meaning, answer leakage and representation/boundary semantics rather than arithmetic.

## Repair contract

Repair **R01–R08 without rebuilding the 24-session architecture**.

After repair:

1. update evidenceDistance and decisionAudit honestly;
2. update handoff counts/text;
3. update structural/browser assertions that currently hard-code inflated evidence counts;
4. preserve stable IDs and historical attempts;
5. version a public task only if its actual prompt/evaluator obligation changes — removing/neutralizing a representation scaffold is an assessment-surface change and must be recorded in the reconstruction change ledger even if the prose prompt is unchanged;
6. rerun full T22 Elite CI including the real M05 browser;
7. freeze the repaired exact head;
8. conduct a separate exact-head confirmation before any publication.

**Do not merge to main from this review commit.**
