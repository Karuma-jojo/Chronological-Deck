# M04 v2 independent adversarial review — exact-head follow-up

Date: 2026-10-02  
Reviewed implementation head: `d89444017bed13dbcb6f336b6ae36c86971805f4`  
Review branch: `codex/t22-m04-v2-independent-review`  
Builder branch: `codex/t22-m04-godlike-v2`  
Mode: **independent adversarial follow-up; audit first, no content edits in this report**

## Verification receipt before semantic review

The reviewed head has an isolated exact-head validation success:

- workflow run: **37020610056**
- job: **110882418043**
- syntax checks: PASS
- M04 structural / semantic / deterministic-math checks: PASS
- Chromium installation: PASS
- real learner M04 browser workflow: PASS

That green run proves the implemented checks passed. It does **not** by itself prove that the checks classify semantic distance correctly. The purpose of this follow-up is to attack those classifications and the module boundary independently.

## Sources / standards used

- current T22 v1.2 builder/adversarial protocol and M04 modernization handoff;
- `M04-DEEP-SOURCE-AUDIT-v1.0.md`;
- `M04-V2-DESIGN-GATE.md`;
- `M04-SOURCE-DOSSIER-AND-PEDAGOGY-EVIDENCE.md`;
- current learner-facing `m04.json`;
- historical M04 Astra findings that must remain closed;
- current M05/M06/M26 boundary.

The decisive evidence-distance rule is the current protocol rule: **changed numbers/context alone are not transfer; for a claimed changed-surface Transfer, identify the exact mathematical decision that changes, whether the prompt supplies it, whether instruction visibly rehearses it, and whether a mechanical copier of the lesson would still succeed.**

---

# Disposition

## **BOUNDED REPAIR REQUIRED**

The v2 reconstruction is materially better than historical M04. The 24-session architecture remains sound, the new learner-facing table/tree artifacts are real, the conditioning/randomness/total-probability instruction is much stronger, and the historical M04-01→M04-04 repairs remain closed.

The follow-up nevertheless finds **six concrete defects** before publication. None requires a structural rebuild.

---

# R01 — evidence-distance ledger still overclaims many Transfer slots

**Severity: 🔴 publication blocker for evidence claims**

The builder corrected some overclaims, but the current ledger still labels 20/24 Transfer slots as `changed-surface Transfer`. A strict reread of the *entire visible lesson*, including worked example, guided check and distinction check, shows that most of those Transfers rehearse the same mathematical decision/error pattern already made explicit in instruction.

Examples:

- **S01-T:** lesson already teaches that overlapping labels such as “tail/odd” are not complete atoms and explicitly audits atomic recording rules; Transfer repeats invalid-label repair.
- **S02-T:** worked instruction explicitly presents a mass assignment whose total exceeds 1 and repairs normalization; Transfer repeats the illegal-ledger audit.
- **S03-T:** guided instruction already contrasts equiprobable atoms with non-equiprobable aggregate count labels; Transfer repeats that exact multiplicity distinction.
- **S07-T:** instruction already contains an actual two-way table, both conditioning directions, and the time-axis/information-versus-causation distinction; Transfer repeats all three.
- **S08-T:** instruction explicitly warns that multiplication of two marginals is illegal without independence; Transfer is that exact wrong solver.
- **S12-T:** guided instruction already gives static (P(F),P(G),P(F\cap G)) data and asks for conditional/product diagnosis; Transfer is the same surface.
- **S15-T:** instruction explicitly teaches both representativeness and gambler's-fallacy errors; Transfer repeats them.
- **S16-T:** instruction explicitly says one exact path is not the exactly-k event and asks “which arrangements did you count?”; Transfer is the one-path omission.
- **S17-T:** instruction explicitly warns against adding overlapping at-least-one component events; Transfer is the blind-addition wrong solver.
- **S18-T:** instruction explicitly shows unequal-rate averaging is wrong and warns against reverse conditioning; Transfer repeats both.
- **S21-T:** guided instruction already provides expectations only, asks for an affine expectation and asks whether a nonlinear second moment can be recovered; Transfer repeats that exact evidence surface.
- **S23-T:** guided instruction already compares equal-EV risky versus certain models and asks what expectation can/cannot decide; Transfer is the same conclusion in memo form.

Under the current protocol these are useful retrieval/error-diagnosis tasks, but they are not honest changed-surface transfer merely because the prose framing changes.

### Required repair

Reclassify all slots from first principles. On this review, only the following current Transfer contracts have a defensible changed mathematical action/surface:

- **S09-T:** construct-correct-tree → repair a malformed tree;
- **S10-T:** protocol given → infer protocol from proposed conditional branches;
- **S13-T:** classify supplied pair → construct an independent non-disjoint pair;
- **S24-T:** integrated construction → audit/repair a multi-concept proposed analysis.

Everything else should be retrieval/reconstruction unless its public task is materially redesigned.

This is an evidence-label repair, not a demand to manufacture 24 “transfer” claims.

---

# R02 — S14 Main is not fresh Main evidence

**Severity: 🟠 evidence overclaim**

Current instruction says:

- checking every pair is not enough;
- mutual independence additionally requires the triple intersection equality;
- pairwise checks alone leave the triple unresolved;
- guided check asks for the four equalities;
- Fade says not to stop after the three pair equations.

The Main then explicitly commands:

- compute all pair intersections;
- test pairwise independence;
- compute the triple intersection;
- decide mutual independence.

Therefore the claimed learner decision (“decide to inspect the triple intersection”) is both visibly rehearsed and explicitly supplied by the public prompt.

The XOR data are a useful counterexample, but **novel data are not fresh method selection**.

### Required repair

Relabel S14-M as retrieval (or, if a proof obligation is added, reasoning reconstruction). Keep the mathematically valuable XOR task.

---

# R03 — S24 Main still fails the fresh-synthesis claim

**Severity: 🔴 synthesis blocker**

S24 instruction currently fully rehearses the same integrated route as the Main:

- two-route staged model;
- branch/joint computation;
- overall marginal;
- conditional-vs-marginal independence diagnosis;
- numerical expectation;
- posterior boundary.

The guided check repeats the same route again.

The Main changes names/numbers and says “representation of your choice,” but still explicitly asks for exactly the same four outputs. A learner can mechanically copy the S24 worked/guided architecture. This violates the protocol's specific S24 attack: **integration without near-isomorphic rehearsal**.

### Required repair

Keep S24 as the only canonical fresh synthesis target, but change the *instructional worked example* to a different integrated strand (for example repeated-trial complement + expectation), then version the Main to a mixed-data staged problem that requires reconstructing/choosing the model rather than copying an immediately preceding two-route example.

The Main should still observe all five S24 ownership claims exactly.

---

# R04 — Bayes boundary is enforced with a mathematically false “not licensed / not answered” implication

**Severity: 🔴 mathematical/boundary wording blocker**

M04 correctly defers **Bayes as a general inversion rule** to M06. But M04 already owns direct conditional probability in S07 in both directions.

Current S18/S24 wording sometimes slides from:

> total probability itself does not invert a conditional

to the stronger implication:

> a reverse/posterior quantity is not licensed by the completed finite model.

That stronger implication is false in several current tasks.

Example: S18 computes all branch contributions and overall defect probability. From those quantities, (P(M_3\mid defect)=P(M_3\cap defect)/P(defect)) is directly computable by the already-owned S07 definition. Likewise S24's completed joint leaves make (P(L\mid success)) directly computable from the joint and marginal.

The curriculum boundary should be enforced by **scope**, not by pretending the quantity is mathematically unavailable.

### Required repair

Use exact language:

- M04 does **not** introduce Bayes' theorem/posterior inversion as a reusable new rule;
- do not obtain (P(B\mid A)) by swapping (P(A\mid B));
- if a complete finite joint model is already available, direct S07 conditioning remains legal;
- M06 later owns the general inversion/update machinery.

Remove “posterior not licensed by these calculations” from S24 Main and use the M05 decision boundary there instead.

---

# R05 — S19 Transfer leaks S20's multiplicity distinction upstream

**Severity: 🟠 ownership sequencing defect**

S19 owns finite expectation as a probability-weighted average. S20 owns expectation under equally likely finite outcomes, atomic multiplicity and the distinction between averaging atoms versus distinct value labels.

Current S19-T uses repeated value 8 and explicitly asks why averaging distinct labels ({-2,1,8}) is wrong. That is exactly the multiplicity/label distinction S20 is supposed to own next.

### Required repair

Keep S19-T as a payoff-table representation change if desired, but use **distinct payoff labels with unequal probabilities**. Save repeated-label/multiplicity diagnostics for S20.

Version S19-T because its public contract changes.

---

# R06 — S20 wrong-solver discriminator can accidentally return the correct number

**Severity: 🟠 misconception-evidence defect**

S20 is supposed to distinguish:

> average over equiprobable atomic outcomes

from

> average each distinct value label once.

But:

- guided values ({0,0,0,4,4,8,8,8}) have atomic mean 4 and distinct-label mean ((0+4+8)/3=4);
- Transfer values ({1,1,3,3,7,7,9,9}) give every distinct label equal multiplicity, so the distinct-label mean is legitimately the same as the atomic mean.

Those examples are useful for explaining *when* label averaging happens to work, but they are poor targets for the module's recorded wrong solver “ignore atomic multiplicity.” A wrong solver can use the wrong general method and still obtain the correct number on the targeted Transfer.

### Required repair

Version S20-T to include **unequal multiplicities where the blind distinct-label mean differs numerically from the atomic mean**. Require both calculations and the reason for the discrepancy.

---

# Session-level follow-up verdict

| S | Verdict | Main evidence | Transfer evidence | Reviewer note |
| ---: | --- | --- | --- | --- |
| 01 | 🟡 | retrieval | **retrieval** | T currently overlabelled |
| 02 | 🟡 | retrieval | **retrieval** | illegal-ledger audit already worked |
| 03 | 🟡 | retrieval | **retrieval** | aggregate multiplicity already guided |
| 04 | 🟡 | retrieval | **retrieval** | exact-complement error already taught |
| 05 | 🟡 | retrieval | **retrieval** | region ledger already introduced |
| 06 | 🟡 | retrieval | **retrieval** | reverse inclusion–exclusion already guided |
| 07 | 🟡 | retrieval | **retrieval** | table + time-axis both visibly taught |
| 08 | 🟡 | retrieval | **retrieval** | illegal marginal product already taught |
| 09 | 🟢 | retrieval | changed-surface Transfer | malformed-tree repair is a real action change |
| 10 | 🟢 | retrieval | changed-surface Transfer | infer protocol from branch state |
| 11 | 🟢 | retrieval | retrieval | already honest |
| 12 | 🟡 | retrieval | **retrieval** | static probability surface appears in guided |
| 13 | 🟢 | proof reconstruction | changed-surface Transfer | construction obligation is useful |
| 14 | 🟠 | **retrieval** | **retrieval** | fresh-Main claim false; T also supplies same criterion |
| 15 | 🟡 | retrieval | **retrieval** | both biases explicitly taught |
| 16 | 🟡 | retrieval | **retrieval** | one-path omission explicitly taught |
| 17 | 🟡 | retrieval | **retrieval** | blind-addition error explicitly taught |
| 18 | 🔴 | retrieval | **retrieval** | also repair reverse-conditioning boundary wording |
| 19 | 🟠 | retrieval | repair then retrieval | current T leaks S20 |
| 20 | 🟠 | retrieval | retrieval | strengthen wrong-solver numerical discrimination |
| 21 | 🟡 | proof reconstruction | **retrieval** | summary-data form is already guided |
| 22 | 🟢 | proof reconstruction | retrieval | honest |
| 23 | 🟡 | retrieval | **retrieval** | equal-EV interpretation already guided |
| 24 | 🔴 | **fresh only after repair** | changed-surface Transfer | current Main is near-isomorphic rehearsal |

---

# What remains strong

The follow-up specifically confirms these v2 improvements:

- 24-session architecture still does not require structural rebuild;
- actual learner-facing two-way-table and probability-tree artifacts now exist;
- S07 nonuniform conditioning and time-axis explanation are substantial improvements;
- S11 historical complement-independence derivation remains closed;
- S13 exclusivity/independence contrast remains strong;
- S15 now directly attacks representativeness and gambler's fallacy;
- S18 weighted-branch misconception is explicit;
- S21/S22 historical linearity/indicator repairs remain strong;
- S23 preserves the M05 decision boundary;
- browser/runtime checks now inspect the real rendered M04 v2 surfaces.

## Final review disposition

**BOUNDED REPAIR REQUIRED — R01 through R06.**

Do not publish this exact reviewed head. Repair only these findings, rerun exact-head static/math/browser validation, then perform a short independent confirmation pass against the repaired SHA.
