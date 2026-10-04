# M03 v2 — selective strengthening audit for existing core

Date: 2026-10-04  
Candidate: `m03-authoring-v2.0-six-tools-candidate-r1`  
Status: **pre-repair audit; bounded changes only**

The source-grounded 36-position proposal does not ask for a wholesale rewrite of S01–S30.
This audit compares the published v1.7.2 core against the proposal's explicit
"existing sessions to strengthen" table and identifies only the gaps that still need material
action after S31–S36 were added.

## Disposition table

| Stable session(s) | Proposal request | Current-candidate disposition |
| --- | --- | --- |
| S01–S06 | contrasting examples, domain/scope emphasis | **Satisfied / no task change.** Existing logic route plus new S31 now supplies the missing dependence contrast without bloating the opening. |
| S07 | after refutation, request a useful correction **and prove the correction** | **Repair required.** Current Transfer asks for a correction but does not require proof that the repaired statement is universally true. |
| S09–S14 | make givens/goal transformations and scratch-search vs final-proof distinction explicit | **Small instruction repair required in S09 only.** S09 can own the search/final-proof discipline; S10–S14 can reuse it without six near-duplicate meta-lessons. Fixed assessments need not change. |
| S18 | accept two containments or arbitrary-element iff | **Satisfied.** Current ownership/evaluator already permits mathematically equivalent proof routes. |
| S20–S21 | formalize M02 function intuition; domain legality; inverse image ≠ inverse function | **Satisfied.** No M02 duplication needed. |
| S25–S27 | visible encoding / constant-multiplicity justification | **Satisfied and strengthened by new S34.** Existing factorial/stars-and-bars bridges remain; S34 explicitly owns reversible encodings/fibres. |
| S28 | preserve the three-set bridge | **Satisfied.** Do not broaden to general inclusion–exclusion. |
| S29 | require genuinely useful hole design independently | **Satisfied.** Existing Transfer requires the consecutive-pair partition and is decision-audited. |
| S30 | mixed, unlabeled route selection after all tools are taught | **Repair required.** Current Main names pigeonhole and current Transfer explicitly supplies the missing-output sets and inclusion–exclusion route. They are valid synthesis exercises but do not observe independent route selection at the new 36-position exit. |

## R01 — S07 repaired-claim proof

Keep S07 Main unchanged.

Materially version S07 Transfer so the learner must:

1. refute the original zero-product/AND statement with a legal counterexample;
2. repair the conclusion to inclusive OR;
3. **prove** the repaired statement for arbitrary real inputs;
4. preserve the original domain and hypothesis unless a change is explicitly justified.

The visible lesson will use a different divisibility example to teach
**refute → repair → prove**, so the zero-product proof is not rehearsed.

Expected version consequences:
- S07 instruction receives a session-specific v2 instruction version;
- S07-T obligation version increments;
- the changed session contract / assessment fingerprint correctly stales old evidence for the
  strengthened obligation while preserving the historical attempt record.

## R02 — S09 proof-search discipline

Keep both fixed S09 assessments unchanged.

Add a bounded paragraph to the visible lesson:

- in scratchwork, write givens and target definitions;
- work backward from the target to discover a needed witness/lemma;
- failed routes are allowed in scratchwork;
- the final proof presents only the justified forward logical spine.

This is instructional strengthening, not a new scored ownership claim.

Expected version consequences:
- S09 receives a session-specific v2 instruction version;
- fixed assessment fingerprints remain unchanged;
- the session contract hash changes because the visible contract/instruction changes, so future
  evidence must be interpreted with the new session version rather than pretending the old lesson
  was identical.

## R03 — S30 unlabeled final synthesis

Materially version S30 Main and Transfer.

### Proposed Main

A family (mathcal F) consists of 13 distinct 4-element subsets of
(U={1,ldots,8}). Prove that some element of (U) belongs to at least 7 members of
(mathcal F).

The prompt does **not** name double counting or pigeonhole. A complete solution must define the
finite incidences, count them, make the capacity contradiction and state existence-not-identity.

This combines:
- finite incidence representation / double counting;
- finite capacity / pigeonhole reasoning;
- proof communication.

### Proposed Transfer

For a 5-element domain (D) and 3-element codomain (C):

- count the functions (D	o C) that use every output at least once;
- separately prove that every such function has an output with at least two preimages.

The prompt does not supply a named-method checklist or predefine missing-output event sets.
A correct solution may use inclusion–exclusion or an equivalent exact finite count; all overlaps
must be justified. The existence claim must distinguish guarantee from identity.

Reference count: (3^5-3cdot2^5+3cdot1^5=150).

### New S30 ownership

1. define the finite objects/states and constraints before selecting a method;
2. select and justify a representation/method without a method label being supplied;
3. combine two or more previously owned M03 tools coherently;
4. verify edge/boundary/overlap conditions and distinguish existence from identification where relevant;
5. communicate a complete proof/count with valid alternative routes accepted.

Expected version consequences:
- S30 instruction becomes session-specific v2;
- S30-M obligation version increments from 2 to 3;
- S30-T obligation version increments from 3 to 4;
- both changed fixed contracts receive new fingerprints;
- earlier attempts remain stored but cannot certify the new S30 obligations.

## Non-findings

No evidence currently justifies changing S01–S06, S08, S10–S29 beyond S09's bounded
instructional clarification. New S31–S36 should not be used as an excuse to churn accepted
content whose prerequisite/observability contract is already adequate.

## Stop rule after repair

After R01–R03:
- rerun claim→request→rubric audit;
- rerun all deterministic mathematics;
- rerun clone/separation checks including Strategy Labs;
- rerun all inherited downstream preservation guards;
- run full Chromium learner workflow on the exact head;
- stop as **builder candidate awaiting independent adversarial review**.

No merge to `main` is authorized by this audit.
