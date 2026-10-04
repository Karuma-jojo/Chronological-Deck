# T22 M03 v2.0 r3 — Independent Adversarial Review r1

**Reviewed candidate:** `m03-authoring-v2.0-six-tools-candidate-r3`  
**Exact implementation SHA:** `05d7bae1e7e2dc55a292de649fd9a013129476a7`  
**Builder branch:** `codex/t22-m03-six-tools-upgrade`  
**Builder validation:** T22 Elite run #724 / `37226819327` — SUCCESS on the exact SHA above  
**Review branch:** `codex/t22-m03-v2-independent-review`  
**Mode:** REVIEW only — no implementation repair is authorized by this document  
**Disposition:** **REPAIRS REQUIRED**

## Reviewer stance

This review treats builder assertions, CI success and self-authored audit metadata as claims to be
falsified rather than as acceptance evidence. The reviewed implementation is frozen at the exact
SHA above. No finding below is waived because the workflow is green.

The candidate architecture is coherent and substantially stronger than the published v1.7.2
baseline: 36 learner positions, 72 fixed tasks, 72 evaluators and 180 recorded ownership claims.
The six new stable sessions are interleaved at positions 7, 11, 17, 28, 31 and 35 without
renumbering S01–S30.

## Independent mathematical re-derivation

I independently re-derived the fixed-task mathematics rather than trusting stored references.

Checked surfaces include:
- implication/iff/counterexample examples;
- quantified witness order and exact negation;
- divisibility/parity and direct/contrapositive/contradiction proofs;
- ordinary and strong induction targets;
- least-counterexample inequality and finite extremal argument;
- set identities, products, equivalence relations and finite mappings;
- factorial/permutation/repeated-object/combination/binomial counts;
- reversible encodings and variable fibre sizes;
- both new double-counting identities;
- stars-and-bars / inclusion-exclusion / pigeonhole finite counts;
- invariant/reachability and integer-rank termination arguments;
- final S30 incidence bound and exact surjection count.

I found **no mathematical error in the current fixed-task reference answers**. In particular:
- S29's 11-of-20 consecutive-integers guarantee survives exhaustive finite checking;
- S30 Main has the valid (52>48) incidence/capacity contradiction;
- S30 Transfer has exactly (3^5-3cdot2^5+3=150) onto maps and the required fibre-size guarantee;
- S34's marked-string domain has size 12, output set size 7, and nonconstant fibre sizes;
- S35's identities evaluate to 80 and 81 as claimed;
- S36's two-pile process terminates after 11 moves at ((6,0)).

The findings below are therefore evidence-contract, freshness, artifact-integrity and closeout
findings, not hidden arithmetic failures.

---

## R01 — BLOCKER — Strategy Lab source is textually corrupted

The source file `docs/t22-course/M03-V2-STRATEGY-LABS.md` is itself malformed, and the
compiled Master Pack reproduces the corruption.

Examples in the reviewed exact head include:
- A1: `if (3mid n^2), then (3mid n)` instead of divisibility notation;
- A2/A5/B3 display mathematics serialized as bare `[` ... `]` blocks;
- A4 contains literal form-feed control characters before `orall`;
- A4 also contains `xin`, `exists yin` rather than valid symbols/LaTeX;
- A5 contains `nge1`, `5^nge4n+1`;
- B2 contains `ldots`;
- B3 contains `xle5`.

A control-character scan finds two literal form-feed bytes in the Strategy Lab source.

### Why this is material

The Strategy Labs are learner-facing diagnostic material. Broken mathematical notation changes or
destroys the statement being posed. The full browser workflow is green because it does not render
or inspect this appended Markdown lab source. This is exactly the class of human-visible artifact
failure that structural tests can miss.

### Required repair

Repair the Strategy Lab source notation, regenerate the Master Pack from that source, and add a
regression that rejects:
- ASCII control characters other than ordinary whitespace;
- known broken TeX-token serialization such as `mid`, `ldots`, `nge`, `le` when the
  backslash/symbol has been lost;
- malformed display-math delimiters in the lab artifact.

This finding alone blocks independent acceptance.

---

## R02 — MATERIAL — Strategy Lab freshness is overstated

The source blueprint requires fresh mixed strategy probes and explicitly rejects a changed
constant/noun as sufficient evidence of fresh transfer.

Several v2 lab probes do not meet that standard.

### A5

`5^n >= 4n+1` is semantically very close to:
- S13 Transfer: (2^nge n+1);
- S33 Main: (3^nge2n+1).

Changing the base and linear coefficient does not create a strong independent strategy-choice
diagnostic.

### B8

The lab process “replace two list entries (a,b) by (a+b); prove termination and determine the
final entry” is almost the same process already used in S36 visible Guided check, which asks the
learner to replace two adjacent entries by their sum and identify a preserved quantity and a
decreasing integer rank.

This is rehearsal, not a clean post-module mixed diagnostic.

### A1

`3 | n^2 => 3 | n` is also close to the existing square-divisibility contrapositive pattern in
S10 Main. This is less severe than A5/B8, but it is weak as a supposedly fresh strategy probe.

### Required repair

Replace A5 and B8 with genuinely different mathematical structures. Prefer replacing A1 as well.
Run semantic clone review against:
- all 72 fixed prompts;
- all 36 visible lessons and guided checks;
- historical v1.7.2 labs;
- the new v2 labs.

Because labs are unscored, this does not invalidate canonical task evidence, but it does block the
claim that the shipped strategy lab is a clean independent diagnostic.

---

## R03 — MATERIAL — Several ownership claims overstate what the learner constructs

The candidate has a structurally complete 180-claim ledger, but a few new-session claims are
stronger than their public tasks actually observe.

| Session | Current ownership claim | What the public task actually observes | Repair direction |
|---|---|---|---|
| S33 | “State the well-ordering principle…” | Main asks the learner to justify existence of a least counterexample; rubric only requires legal invocation | Narrow to “invoke/use well-ordering correctly”, or explicitly request a statement of the principle |
| S34 | “Define an explicit finite encoding map…” | Main supplies the forward rule for (phi) | Narrow to formalise/use the supplied encoding, or remove the encoding rule from the prompt |
| S34 | “Use division by a multiplicity only after proving all fibres have the same positive size, and detect when that condition fails” | Fixed Transfer tests the failure/nonconstant-fibre half only | Narrow to the audited capability or add an independent positive constant-fibre assessment |
| S35 | “Define one finite incidence or pair set…” | Main supplies (I={(S,i):...}) | Narrow to interpret/use a supplied incidence set, or withhold (I) |
| S36 | “Define the state space, legal moves, initial state and target/terminal condition…” | Main/Transfer supply those objects and rules | Narrow to model/interpret a supplied finite process, or make construction observable |

### Why this is material

The protocol's evidence rule is literal: if the prompt supplies the representation/partition/
state, the learner cannot be credited with inventing or defining it. A numerically complete
ownership ledger is not enough if the verbs overclaim agency.

The cleanest repair is mostly **claim narrowing**, not task churn.

---

## R04 — MATERIAL — Decision-audit metadata is not fully honest about supplied decisions

Three decision-audit entries should be corrected even if their task classifications remain useful.

### S07 Main

The audit marks `decisionSuppliedByPrompt=false` for choosing a productive counterexample search
family. The prompt explicitly requires a search-family commitment and gives examples:
“sign, zero, or a boundary”. The successful family is sign.

This is still legitimate evidence of counterexample execution, but it is not fully uncued strategy
selection as currently described.

### S31 Transfer

The audit says the learner independently decides to translate the table into a dependent function
and common-output test. The prompt explicitly requires constructing a function and either giving a
common (y) or proving none exists by checking candidates.

The changed-surface Transfer label is defensible; the metadata should admit that the broad
representation/decision is prompted.

### S34 Transfer

The audit says the decision to inspect fibre sizes is unsupplied. The prompt explicitly says
“inspect enough fibres to determine whether their sizes are constant”.

Again, the learner still has to discover the outcome and multiplicity pattern, so the task remains
meaningful. The audit should mark the inspection decision as supplied.

### Required repair

Correct `decisionSuppliedByPrompt` and/or narrow each recorded “decision” to the genuinely
unsupplied step. Do not inflate “fresh Main” or “changed-surface Transfer” by hiding prompt cues.

---

## R05 — LOW/MATERIAL CLOSEOUT — exact-head status text is stale after run #724

The exact builder head has a successful full workflow and Chromium run #724, but several current
artifacts still say exact-head verification is pending or required.

Examples include:
- Master Pack status saying it is awaiting an exact-head verification receipt;
- final micro-cleanup receipt saying exact-head full workflow is required;
- `repairVersionAudit.v2SixToolsUpgrade.status` saying exact-head CI is pending.

The module-level status “builder candidate awaiting independent review” is still appropriate.
Only the exact-head-CI-pending wording is stale.

### Required repair

After R01–R04 are repaired and a new exact-head run passes, write one real closeout receipt that
pins:
- exact implementation SHA;
- workflow run ID / run number;
- structural/evidence result;
- independent math/clone checks;
- Chromium result;
- reviewer disposition.

Do not label the module independently accepted until the follow-up review closes the material
findings.

---

## Positive findings

The review did **not** find a reason to abandon the 36-position architecture.

- The route follows the intended bounded-addition design rather than absorbing later probability,
  analysis, programming or specialist contest topics.
- S31–S36 are placed at sensible prerequisite points.
- S07's refute→repair→prove strengthening is a real improvement.
- S09's scratch-search versus final-proof distinction is useful and source-consistent.
- S30 is materially better than the old method-scaffolded synthesis; its current prompts do not
  name the intended counting methods.
- The final S04/S14/S16/S24–S26 definition/range cleanup is mathematically correct and appropriately
  bounded.
- Stable S01–S30 identities are preserved while materially strengthened fixed obligations are
  versioned.
- The fixed reference mathematics survived an independent re-derivation pass.

## Disposition

**REPAIRS REQUIRED.**

This candidate is close, but it is not independently accepted at r3.

The minimum bounded repair set is:
1. repair Strategy Lab notation/control characters and add a serialization guard;
2. replace the semantically rehearsed A5/B8 labs (preferably A1 too);
3. narrow the overstated S33/S34/S35/S36 ownership verbs or make those actions genuinely observable;
4. correct S07/S31/S34 decision-audit honesty;
5. run the full exact-head workflow/Chromium suite again and write a truthful post-run receipt.

A follow-up independent review should then inspect the repaired exact head. If those findings are
closed without new material defects, M03 would be a strong candidate for independent acceptance.
