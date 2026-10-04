# M03 v2 — final micro-cleanup receipt

Date: 2026-10-04  
Candidate: `m03-authoring-v2.0-six-tools-candidate-r3`  
Branch: `codex/t22-m03-six-tools-upgrade`  
Status: **builder candidate; exact-head full workflow and independent adversarial review required**

This bounded pass closes six concrete defects identified in the follow-up review without reopening
the 36-position architecture or changing unrelated fixed assessment contracts.

## MC-01 — Spire grading instruction

The historical v1.7.2 Master Pack repeatedly says a learner must satisfy all five ownership claims
"in both" Main and Transfer. That wording is too strong because the canonical evidence ledger
deliberately assigns some claims only to Main and some only to Transfer.

Disposition:
- do **not** rewrite the historical v1.7.2 artifact;
- compile a new v2 Master Pack from the current authoring source;
- the new pack grades each fixed task only against the ownership claims/public obligations actually
  assigned to that task by `claimEvidence`.

## MC-02 — S04 first-use divisibility notation

Before the first use of `4|n`, S04 now states the bounded just-in-time meaning:

> for integers d,n, `d|n` means `n=dk` for some integer k.

The lesson explicitly says this is notation support only; S08 still owns the full
divisibility/parity proof language. No S04 fixed task changed.

## MC-03 — S14 prime/composite vocabulary

Before the strong-induction worked example, S14 now defines:
- prime: integer `p≥2` whose only positive divisors are 1 and p;
- composite: integer `n≥2` expressible as `n=ab` with integers `2≤a,b<n`.

No number-theory ownership beyond the example is added. Fixed S14 tasks are unchanged.

## MC-04 — S16 cardinality notation

S16 now explicitly defines `|A|` for a finite set A as the number of elements in A before using
`|P(A)|=2^|A|`.

Fixed S16 tasks are unchanged.

## MC-05 — S24–S26 factorial / permutation / combination ranges

S24 now states:
- n is a nonnegative integer;
- `0!=1`;
- `P(n,r)` is used for integers `n≥0`, `0≤r≤n`;
- `P(n,0)=1`.

S25 carries the convention through repeated-object/multinomial grouping, including nonnegative
multiplicities and the neutral `0!` factor.

S26 now states:
- `C(n,r)=n!/[r!(n-r)!]` for integers `n≥0`, `0≤r≤n`;
- `C(n,0)=C(n,n)=1`;
- the binomial endpoint terms `k=0,n` are legal because `0!=1`.

No S24–S26 fixed assessment prompt, evaluator or obligation version changed.

## MC-06 — stale v1.7.2 pack status

The historical v1.7.2 pack contains a now-stale paragraph saying its v1.7 evidence/provenance
repair is "not frozen yet". That file is retained as historical provenance rather than silently
rewritten.

The replacement v2 Master Pack records the current candidate status explicitly and points to a
fresh exact-head verification receipt. Historical publication and current v2 review state are
therefore no longer conflated.

## Versioning / evidence consequences

Instruction-only changes in r3:
- S04: `m03-s04-instruction-v2-jit-divisibility-r1`
- S14: `m03-s14-instruction-v2-prime-composite-r1`
- S16: `m03-s16-instruction-v2-cardinality-notation-r1`
- S24: `m03-s24-instruction-v2-factorial-range-r1`
- S25: `m03-s25-instruction-v2-multinomial-range-r1`
- S26: `m03-s26-instruction-v2-combination-range-r1`

The fixed prompts/evaluators for those sessions are unchanged. Their session contracts/instruction
versions change honestly; no historical evidence is rewritten.

## Acceptance gate

This receipt is not acceptance. Publication still requires:
1. complete structural/pedagogy/semantic/evidence regressions;
2. independent deterministic mathematics;
3. clone/contamination checks;
4. Chromium learner workflow on the exact head;
5. exact-head verification receipt;
6. independent adversarial review of the repaired candidate.

No merge to `main` is authorized by this receipt.
