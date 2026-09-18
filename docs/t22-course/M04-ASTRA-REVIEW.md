# M04 independent review — bounded repairs required

Date: 2026-09-18  
Reviewed branch: `codex/t22-pedagogical-rebuild`  
Reviewed handoff head: `733b7bcba34a9adbeaa327b06e344511587e353e`  
Accepted M04 implementation checkpoint: `d23b9d3b1b618904f907f8f6d6bfaef55c72873e`  
Verified handoff workflow: GitHub Actions run `35358966763` — **SUCCESS**  
Scope: **M04 only — no M05/M06 authoring, no main merge, no deployment**

## Resolution update — 2026-09-18

M04-01 through M04-04 have been implemented in the bounded repair pass ending at `10df637dbb46bd4985a1f98fc298c746b52bf1fd`. See `M04-RESOLUTION.md` for exact changes, assessment versioning and provenance decisions. The findings below remain the immutable review rationale; current status is **repaired, awaiting bounded independent follow-up before M05/M06**.

## Verdict

**M04 is mathematically strong and provenance-safe, but it is not yet independently acceptable as the probability foundation for M05/M06/M26.**

I found **two true blockers**, one meaningful novice-safety finding, and one optional polish item:

- **M04-01 (high / blocker):** S11 Transfer still requires the untaught theorem that independence is preserved under complementation.
- **M04-02 (high / blocker):** the claimed `120/120 exact public-task → rubric` ownership audit is not semantically true. Many claim-evidence rows point to unrelated rubric criteria, and at least two required ownership claims are not actually observed by the fixed task contract.
- **M04-03 (medium):** S22 uses positional symmetry for without-replacement draws as an unexplained shortcut even though S12 was explicitly repaired to avoid that exact style of shortcut.
- **M04-04 (low / optional polish):** S04 uses the word/assumption “independently” seven sessions before independence is defined, even though the guided check can be stated without it.

These are bounded repairs. I found **no need to rewrite M04**, and I found **no incorrect numerical reference answer** in the representative independent recomputations below.

## Repository / ancestry verification

The branch ancestry matches the handoff claim.

- `829699fce941cdedf59b76aa2d656ca93d283e0b` → `d23b9d3b1b618904f907f8f6d6bfaef55c72873e` is exactly **6 commits ahead / 0 behind**.
- `d23b9d3b1b618904f907f8f6d6bfaef55c72873e` → `733b7bcba34a9adbeaa327b06e344511587e353e` is exactly **1 commit ahead / 0 behind**.
- The reviewed branch head is exactly `733b7bcba34a9adbeaa327b06e344511587e353e`; there was no hidden later branch commit at review start.
- The handoff-only commit did not alter `course/t22/authoring/m04.json`; it added the handoff/checker and workflow/log metadata.
- The M04 implementation chain touches T22 Elite course/runtime/audit files only. I found no T25 file and no legacy T22 progress/state file in the M04 implementation diff.

The supplied CI claim is also real: run `35358966763` completed successfully, including syntax, structural/pedagogy/semantic/evidence regressions and the Chromium browser evidence workflow.

## What passes

### Mathematical core

Representative results re-derived independently:

- **S03 dice counting:** sum 9 has ((3,6),(4,5),(5,4),(6,3)), so (4/36=1/9).
- **S07 conditioning:** among the six evens in (1,ldots,12), two are multiples of 3, so (P(A|B)=2/6=1/3); among the four multiples of 3, two are even, so (P(B|A)=2/4=1/2).
- **S08 multiplication rule:** (0.48(0.35)=0.168), and (0.168/0.42=0.4).
- **S09 tree:** leaves (0.495,0.055,0.315,0.135) sum to 1; pass (=0.81).
- **S10 replacement:** with replacement (=(5/8)(3/8)=15/64); without replacement (=(5/8)(3/7)=15/56). Also (P(G_2|G_1)=5/8) versus (4/7).
- **S12 without replacement:** (P(A)=(4/6)(3/5)+(2/6)(4/5)=2/3); (P(A|B)=3/5); joint (=2/5) versus product (=4/9), so dependence is correctly diagnosed.
- **S14 XOR example:** each marginal is (1/2), each pair intersection is (1/4), triple intersection is 0 while product of marginals is (1/8): pairwise independent, not mutually independent.
- **S16 exactly three successes:** (inom53(0.6)^3(0.4)^2=0.3456).
- **S17 complement:** (1-0.75^4=0.68359375).
- **S18 total probability:** (0.50(0.01)+0.30(0.03)+0.20(0.06)=0.026).
- **S19 expectation:** ((-3)(0.2)+(1)(0.5)+(7)(0.3)=2).
- **S20 uniform mean:** ((2+5+8+11+14+17)/6=9.5).
- **S21 linearity check:** (E[X]=2,E[Y]=3); (E[3X-2Y+5]=5). Direct values are (3,9,3), also mean 5. (E[X^2]=20/3
eq4=(E[X])^2).
- **S22 expected count:** expected red count is (3(4/10)=1.2). The value is correct; the instructional justification is the issue in M04-03.
- **S24 synthesis:** leaves (0.30,0.10,0.30,0.30); (P(Acap S)=0.30); total success (=0.60); (0.75
eq0.60) gives dependence; expected score (=4(0.6)-1(0.4)=2). No posterior is requested.

### Probability-boundary checks

- S07 states the denominator restriction `P(B)>0`, keeps (P(A|B)) distinct from (P(B|A)), and does not teach Bayes inversion.
- S08 uses the correct multiplication direction and recovers the reverse conditional only from a known joint and positive marginal.
- S10 updates both numerator/state and denominator without replacement.
- S12 now genuinely derives the unconditional second-draw probability from first-stage branches rather than asserting symmetry.
- S13 correctly distinguishes disjointness from independence, including the zero-probability (arnothing) edge case.
- S14 genuinely teaches the difference between pairwise and mutual independence.
- S15-S17 derive repeated-trial formulas from exact paths, combinations and complements; no named binomial distribution is smuggled in.
- S18 explicitly requires a disjoint/exhaustive partition and frames the calculation as forward marginalization; posterior inversion is deferred.
- S19-S23 keep expectation finite and elementary. S21 does not introduce `E[XY]=E[X]E[Y]`; it explicitly blocks nonlinear misuse with (E[X^2]
eq(E[X])^2). S22 correctly states that linearity of expectation does not require independence. S23 leaves risk/utility/decision policy to M05.
- S24 requires leaf construction, joint probability, total probability, dependence diagnosis and expectation, and explicitly forbids a posterior.

### Preacceptance repair verification

The five recorded repairs are not all equally successful:

1. **S11 hidden complement-independence:** **not fully repaired**. Main is fixed, but Transfer still requires the same missing theorem. See M04-01.
2. **S12 unexplained second-draw symmetry shortcut:** **passed**. The marginal is derived from branches.
3. **S14 lesson too close to pairwise-not-mutual assessment:** **passed**. The lesson uses three independently tossed coins for a mutually independent triple plus an ordinary dependent pair; the fixed tasks use XOR / a four-point construction.
4. **S21 downstream (E[XY]) drift:** **passed**. The lesson uses finite linearity and a squaring counterexample instead.
5. **S24 synthesis lesson too isomorphic to fixed task:** **passed**. North/South damage with (.2/.8,.1/.3,-5/1) is materially distinct from the A/B and X/Y fixed tasks.

### Evidence / provenance

The evidence system passes this review.

- M04 uses the existing shared key exactly: `chrono_t22_elite_course_evidence_v1`.
- Assessment fingerprints hash problem ID, obligation version, kind, prompt, session ID and the full evaluator marking contract.
- M04 IDs remain stable under `T22V3::ARC048::...`.
- Lesson consultation records guided provenance; the browser regression proves an M04 draft that consulted the note cannot be silently relabelled independent after an M04→M01→M04 round trip.
- Unsaved M04 Main and Transfer text plus assistance provenance survive module round trips.
- Packet export marks **both** fixed tasks as reference-exposed.
- Save/reveal/review attaches review to the original saved attempt.
- M01/M02/M03/M04 attempts coexist in one evidence store and survive export/import.
- Corrupt evidence is preserved rather than silently reset.
- No parallel M04 evidence store was introduced.

No provenance migration is required merely because this review exists.

---

# True blockers

## M04-01 — S11 Transfer still assumes complement-independence (high / blocker)

**Exact location**

- Session: **S11 — Independence via the product rule**
- Fixed task: `T22V3::ARC048::S11-T@1`
- File: `course/t22/authoring/m04.json`

**Concrete evidence**

S11 lesson teaches the product definition

[
P(Acap B)=P(A)P(B),
]

then checks a direct joint. It does **not** prove that if (C) and (D) are independent then (C) and (D^c) are also independent.

But S11 Transfer asks:

> “…decide whether C and D are independent, and if they are use factorization to compute (P(Ccap D^c)).”

Its reference immediately uses

[
P(Ccap D^c)=P(C)P(D^c)=rac12cdotrac23=rac13.
]

That step is valid mathematically only after proving complement-independence, e.g.

[
P(Ccap D^c)
=P(C)-P(Ccap D)
=P(C)-P(C)P(D)
=P(C)(1-P(D))
=P(C)P(D^c).
]

The current lesson never supplies that bridge.

**Why it matters**

This is exactly the kind of hidden theorem dependency the S11 preacceptance repair was supposed to remove. A novice who only owns the stated product definition cannot legitimately jump from “C and D are independent” to factorization with (D^c).

The Main repair therefore succeeded only locally; the fixed Transfer still tests an untaught theorem.

**Required repair**

Preferred bounded repair:

1. Teach/derive complement-independence inside S11, on instructional data distinct from the fixed tasks.
2. State that the derivation uses the product definition plus the complement rule.
3. Keep the fixed Transfer only if the lesson now genuinely owns that theorem.
4. Add a focused regression that prevents S11-T from depending on complement-independence unless the lesson/prerequisite audit explicitly owns it.

Alternative: replace S11-T with a transfer that only uses the directly taught product criterion.

**Evidence / versioning**

- If repaired **lesson-side only**, no fixed assessment needs versioning. Bump the M04 instruction version and preserve prior lesson-exposure timestamps; no prior attempt needs invalidation.
- If S11-T itself is materially changed, bump its `obligationVersion` so the existing fingerprint mechanism preserves old attempts as stale rather than treating them as current.

## M04-02 — 120/120 exact ownership observability is not semantically true (high / blocker)

**Exact location**

- File: `course/t22/authoring/m04.json` — `claimEvidence`, Main prompts and evaluators
- Gate: `scripts/test-t22-elite-m04.mjs`

**Concrete evidence**

The static gate checks that:

- every claim has a ledger row;
- every row says `task:"main"`;
- its stored `publicRequest` equals the Main prompt;
- every named rubric criterion literally exists in the evaluator.

It does **not** check whether that rubric criterion actually observes the claim. Manual review finds repeated semantic mis-pairing.

Examples:

### S05 — an ownership claim is not assessed at all

Required ownership includes:

> “Use (P(Acup B)=P(A)+P(B)) for disjoint events.”

But Main uses (A=) even and (B=>4), whose intersection is ({6}): **not disjoint**.

Transfer uses multiples of 3 and numbers (>10), whose intersection is ({12}): also **not disjoint**.

So neither fixed task actually requires using the disjoint addition rule, yet the ledger maps this claim to the unrelated rubric criterion:

> “(P(Acap B)=1/6).”

This is a genuine observability hole, not merely a mislabeled mapping.

### S21 — “derive linearity” is not publicly requested

Required ownership includes:

> “Derive it from finite weighted sums.”

Main asks the learner to compute (E[X]), (E[Y]), apply linearity to (3X-2Y+5), verify numerically, explain no independence is required, and reject (E[X^2]=(E[X])^2).

It never asks for the finite-sum derivation

[
E[aX+bY+c]
=sum_omega (aX(omega)+bY(omega)+c)P(omega)
=aE[X]+bE[Y]+c.
]

The claim is mapped to the rubric criterion:

> “Uses linearity to obtain (E[3X-2Y+5]=5).”

Application is not derivation.

### Other exact ledger mismatches

Manual review found at least one semantically wrong claim→criterion pairing in:

- **S02**
- **S04–S15**
- **S17–S21**

Representative examples:

- **S02:** “Solve a missing probability by normalization” maps to the rubric for the event probability (0.62).
- **S04:** “Use a complement to compute an at-least-one event” maps to the rubric rejecting “all 1s” as the complement.
- **S06:** overlap-explanation and union-calculation claims are mapped to each other’s rubric items.
- **S09:** “Ensure outgoing branch probabilities sum to 1” maps to the leaf-product criterion; “check all leaf probabilities sum to 1” maps to the fail-probability criterion.
- **S10:** replacement/state, with-replacement, without-replacement and denominator claims are positionally shifted across unrelated rubric rows.
- **S18:** “verify partition events are disjoint and exhaustive” maps to the numerical joint-contribution criterion.
- **S19:** “check probabilities form a valid model” maps to the weighted-average interpretation criterion.
- **S20:** the atomic-mean / multiplicity claims are not mapped to the rubric items that actually score them.

This pattern shows that “120 links exist” has been mistaken for “120 claims are semantically observed.”

**Why it matters**

The course contract says ownership is not granted by page completion; it depends on observable assessment evidence. If a claim can be marked covered by an unrelated rubric item, the session can appear complete without the learner demonstrating the owned capability.

This is especially serious in S05 and S21 because the public fixed task itself does not request the full claim.

**Required repair**

1. Re-audit all **120** claim-evidence rows semantically, not positionally.
2. For each claim, point to the exact public request and the exact criterion(s) that actually score that request.
3. Permit multiple rubric criteria per claim where needed; do not force one positional criterion.
4. For claims not actually requested, repair the fixed task contract rather than merely editing `claimEvidence`.
5. At minimum, make S05 publicly require a genuinely disjoint-event addition calculation and make S21 publicly require the finite-sum derivation (or narrow the ownership claim if that derivation is intentionally not owned).
6. Strengthen `scripts/test-t22-elite-m04.mjs` with task-specific semantic regressions for the repaired gaps. A generic string-membership check is not enough.

**Evidence / versioning**

- Pure `claimEvidence` metadata corrections do **not** require learner-evidence migration.
- Any fixed task/evaluator materially changed to close a true observability hole must receive a new `obligationVersion`; the existing fingerprint mechanism should make older attempts stale while preserving them.
- Do not globally invalidate M04 evidence. Version only changed assessments.

---

# Meaningful quality finding

## M04-03 — S22 reintroduces an unexplained positional-symmetry shortcut (medium)

**Exact location**

- Session: **S22 — Indicators & expected counts without independence**
- Lesson and Main reference in `course/t22/authoring/m04.json`

**Concrete evidence**

The lesson says:

> “By symmetry (P(	ext{red on each position})=3/5)…”

Main asks the learner to:

> “justify (E[I_i]=4/10) for each position”

and the reference says:

> “by positional symmetry (P(	ext{draw }i	ext{ red})=4/10).”

The numerical claim is correct. The issue is that no earlier accepted M04 lesson has established the positional-symmetry theorem for sampling without replacement. In fact S12 was deliberately repaired so that the unconditional second-draw marginal was derived from branches rather than asserted by symmetry.

For a Class-10-ish learner, “by positional symmetry” is a theorem-sized shortcut unless it is explained via one of the already owned routes, for example:

- uniform random order / counting of ordered samples; or
- explicit total-probability branches for the relevant position.

**Why it matters**

S22’s main conceptual point is powerful precisely because dependence does not block indicator linearity. Hiding the marginal calculation behind an unexplained symmetry assertion makes the flagship example look easier than the prerequisites justify and partially undoes the discipline established in S12.

**Required repair**

Add a short JIT derivation before using positional symmetry. A clean route is:

- explain that every ordered sample without replacement is equally likely;
- for any fixed draw position, each original card occurs in that position equally often;
- therefore the probability that position (i) is red is the initial red fraction.

Alternatively, derive the needed marginals from branch/total-probability reasoning.

Record the exact prerequisite source in the S22 prerequisite audit.

**Evidence / versioning**

This can be repaired lesson-side without changing the fixed prompt. Bump the instruction version; preserve existing attempts. No answer-exposure migration is required if the new instructional example remains distinct from the fixed task.

---

# Optional polish

## M04-04 — S04 names independence before S11 defines it (low)

**Exact location**

- Session: **S04**
- Guided check in `course/t22/authoring/m04.json`

**Concrete evidence**

S04 says:

> “Three equally likely binary answers are generated independently…”

but event independence is not defined until S11.

The exercise only needs a uniform 8-string sample space. The word “independently” adds an undeclared assumption/concept without helping the S04 target.

**Required repair**

Replace it with wording such as:

> “Choose one of the eight 3-bit strings uniformly.”

No assessment change is needed.

**Evidence / versioning**

Lesson-only wording change; no learner-evidence migration or assessment version bump required.

---

## Semantic-separation review

I did not find a new answer-equivalence blocker beyond M04-01’s hidden theorem dependency.

- S14 lesson and both fixed tasks are semantically distinct in data and instructional structure.
- S24 lesson uses a different source/outcome surface, probabilities and values from Main and Transfer.
- S07-S10 use different instructional data from their fixed tasks.
- S15-S18 teach the general method on different (n,p), source counts or rates.
- S19-S23 use different finite value tables/surfaces.

The recorded 24/24 separation ledger is therefore broadly credible as a separation record. It should not, however, be used as evidence that prerequisite ownership or claim observability is correct; those are separate questions.

## Final acceptance answer

> Given accepted M01–M03 foundations, is M04 prerequisite-safe, mathematically correct, novice-usable, assessment-valid, semantically separated, provenance-safe, and sufficiently complete to serve as the probability foundation for M05, M06 and later quantitative statistics?

**Not yet.**

- **Mathematically correct:** yes, on the reviewed representative calculations and edge cases.
- **Boundary-complete:** yes; it covers the intended finite probability / conditioning / independence / expectation foundation without importing Bayes, M05 decision policy, formal M26 distribution machinery, Monte Carlo, LLN/CLT or measure theory.
- **Semantically separated:** substantially yes; the five preacceptance repairs mostly worked, including S14/S21/S24.
- **Provenance-safe:** yes; shared evidence runtime, fingerprints, exposure semantics and four-module coexistence are sound.
- **Prerequisite-safe / novice-usable:** not fully, because S11-T and S22 still rely on untaught shortcuts.
- **Assessment-valid:** not yet, because the 120/120 ownership-observability claim is overstated and S05/S21 contain real unobserved ownership obligations.

Repair **M04-01 through M04-03**, correct the full claim-evidence ledger under M04-02, apply M04-04 opportunistically, rerun the same static/math/browser gates, and then stop for a bounded re-review of the repairs.

**Do not author M05 or M06 until those bounded M04 repairs are accepted.**
