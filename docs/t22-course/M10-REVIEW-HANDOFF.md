# T22 Elite — M10 Review Handoff

Date: 2026-09-24  
Repository: `Karuma-jojo/Chronological-Deck`  
Branch: `codex/t22-pedagogical-rebuild`  
Module: **M10 · Derivatives & Local Linearity (`ARC053`)**

## Current status

**Builder-verified, semantically repaired candidate. Independent pedagogical acceptance has not occurred and is not claimed.**

The repaired mathematical/semantic implementation was verified at:

- implementation head: `207db95e3186dc9127c92222dea2dd68ca6fc37f`
- T22 Elite Actions run: `35996509740`
- job: `107622609998`
- conclusion: **SUCCESS**
- syntax: PASS
- inherited M01–M09 regressions: PASS
- M10 semantic/evidence validator: PASS
- M10 independent mathematics after repair: PASS
- Chromium installation: PASS
- real browser evidence workflow: PASS

Run URL: https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35996509740

See `docs/t22-course/M10-RESOLUTION.md` for the complete repair record.

## What is frozen for this review

The mathematical spine remains the original 24-session architecture:

1. finite change → local rate;
2. derivative at a point;
3. tangent/rate/units;
4. finite differentiability diagnostics;
5. derivative as a function;
6. differentiability ⇒ continuity;
7. local linearity;
8. first-order approximation;
9. derivative linearity;
10. positive-integer power rule;
11. polynomials;
12. product rule;
13. quotient/domain;
14. chain rule from local models;
15. nested chains/domain/error diagnosis;
16. sine/cosine from M09 limits;
17. remaining elementary trig family;
18. scoped inverse derivative;
19. conditional implicit differentiation;
20. natural exponential;
21. arbitrary-base exponential/logarithm/log differentiation;
22. local sensitivity/elasticity;
23. derivative forensics;
24. synthesis.

Do not redesign this route without a concrete mathematical or pedagogical defect.

## Semantic repair summary

All **72 original ownership claims** were reviewed against the literal public Main/Transfer tasks and rubric rows.

Final repaired ownership count: **69 observable claims**.

Three claims were removed because fixed assessment did not observe them:

- S06 discontinuity-as-screen claim;
- S10 positive-integer exponent-scope-awareness claim;
- S13 negative-integer-power extension claim.

Numerous other claims were remapped or narrowed so the wording matches what the learner actually performs.

Machine-readable audit:

`docs/t22-course/audit/m10-ownership-audit.json`

Reviewed semantic contract:

`docs/t22-course/audit/m10-semantic-contract.json`

## Materially changed assessments

Exactly five fixed assessments changed materially; stable IDs were retained and `obligationVersion` advanced to 2:

- `T22V3::ARC053::S12-M@1`
- `T22V3::ARC053::S14-T@1`
- `T22V3::ARC053::S15-T@1`
- `T22V3::ARC053::S20-M@1`
- `T22V3::ARC053::S21-M@1`

No other M10 fixed task obligation version changed.

Because M10 has never been registered in the learner runtime, no M10 runtime learner evidence exists to migrate or silently recertify.

## High-risk repaired areas

### S12 product rule
Main now reconstructs the rule from an exact increment expansion, explicitly disposes of the cross increment, then applies the rule.

Ownership says **reconstruct**, not fresh proof, because instruction already teaches the derivation.

### S14 chain rule
Transfer now directly observes local-model composition and the proof-safety issue around a possibly zero inner increment.

Formal big-O was removed.

### S15 nested chain rule
Transfer now diagnoses both a missing chain factor and an illegal domain-restoration/evaluation claim.

### S16 trig proof
Main remains a proof reconstruction because guided practice already supplies the cosine identity and required M09 limits.

It is not labeled fresh independent proof evidence.

### S18 inverse derivative
Ownership now says apply the scoped relation with visible hypotheses, rather than state/prove the theorem already proved by instruction.

### S20 natural exponential
Main now directly requires:

- stating `lim(h→0)(e^h−1)/h=1`;
- reconstructing `(e^x)'=e^x`;
- applying the result through composition.

### S21 logs/arbitrary bases
Main now directly derives:

- `(b^x)'=b^x ln b`;
- `(log_b x)'=1/(x ln b)`;
- `(ln x)'=1/x`.

Transfer retains logarithmic differentiation with positivity/domain control.

S21 was sizing-reviewed and remains one session.

## Asymptotic notation

S07 now explicitly defines:

`r(h)=o(h)` means `r(h)/h→0` as `h→0`.

This is shorthand only.

S14 no longer uses formal `O(h)`; it writes out the local boundedness of `k(h)/h`.

Systematic asymptotic notation remains M12.

## Assessment independence

All 48 tasks were reviewed against all legal M09 instruction and all preceding/current M10 instruction.

Primary labels:

- 10 Main tasks: **retrieval**
- 7 Main tasks: **proof reconstruction**
- 7 Main tasks: **fresh Main evidence**
- 24 Transfer tasks: **changed-surface Transfer**

These are descriptive evidence labels, not grades.

The validator also runs a global M09+M10 instruction→assessment textual overlap screen; semantic classification remains the controlling interpretation.

## Repository preservation

The M10 preservation baseline still pins:

- M01–M09 authoring packs;
- shared course meta/roadmap;
- semantic prerequisite ledger;
- learner UI runtime.

Those blobs remain unchanged.

M10 is still **not registered** in the shared learner UI because doing so in this bounded repair would require changing older progression guards outside M10.

## Independent-review target

A genuinely separate reviewer should now attack:

1. whether each of the 69 retained claims is truly observable rather than merely related;
2. whether S12/S14/S15/S20/S21 v2 tasks are sufficiently independent after legal instruction;
3. whether any reconstruction task has accidentally been described as fresh;
4. S14 zero-inner-increment proof safety;
5. S18 inverse theorem hypotheses;
6. S19 branch-existence boundary;
7. S20/S21 exponential/logarithm assumptions and domains;
8. S23/S24 forensic and synthesis rubric observability;
9. the S01→S24 flow and downstream M11/M12 boundaries.

Do not modify M01–M09 merely to make review easier.

## Stop boundary

Stop after M10.

- Do not open M11.
- Do not silently register M10 into the shared runtime.
- Do not call M10 independently accepted without an actually separate review.
