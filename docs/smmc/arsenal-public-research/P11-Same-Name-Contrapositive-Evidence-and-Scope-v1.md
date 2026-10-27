# P11 — Same-name contrapositive proofs with different evidence signatures

**PUBLIC_DEVELOPMENT_ONLY — author research draft; independent mathematical acceptance pending.**

Author: Codex, the builder/research author. Date: 2026-10-26, Asia/Kolkata. Production baseline: `5660936a21c4fc48763ba863ca113265a358984c`; preceding public research head: `bff5f4b5124a683179b7cae3f8a3653a54efc081`. Authority: the [v0.4 operating amendment](../ARSENAL-GATE4-STEP3-OPERATING-AMENDMENT-v0.4.md). Question: `DIVERGENT_SAME_NAME`, its complete two-candidate option.

## Research answer

The differing Gate-3 signatures are explained by what the two **owned evidence records actually report**. Hammack's record reports a chapter from the contents page. Velleman's record reports an operational summary: prove a conditional through its contrapositive. Those claim depths justify different historical diagnostics without establishing different mathematics.

Direct reading supplies the missing Hammack outline. On the explicit classical conditional-proof interface specified below, the two sources describe **the same assumption/goal transformation for every input in that interface**, not merely two proofs of one example. Both retain the background, assume the negated consequent and aim to derive the negated antecedent.

This supports a positive scoped alias hypothesis at that proof-setup/reduction grain. A common name alone would not establish it; the two actual outlines and their stated domain do. It does not automatically merge the raw records, certify all instructional packaging as identical, or admit the new Hammack observation.

## Exact participants and owned records

| Candidate | Frozen owned record | Frozen claim / locator | Preserved Gate-3 diagnostic |
| --- | --- | --- | --- |
| `RAW-SOURCE-h-contrapositive-proof` — Contrapositive Proof | `E-RAW-SOURCE-h-contrapositive-proof-source` | Hammack gives the term a chapter; PDF 5, chapter 5 in the contents | UNRESOLVED grain/bundle; operation boundary UNRESOLVED |
| `RAW-SOURCE-v-contrapositive` — Contrapositive Proof | `E-RAW-SOURCE-v-contrapositive-source` | Velleman lists proving a conditional through its contrapositive; PDF 390, summary | DEPLOYABLE / SINGLE_PRIMARY_MOVE; operation boundary CLEAR |

The Velleman row's trigger/output boundaries remain UNRESOLVED in the frozen assessment. A clear operation boundary is not a claim that every other boundary was settled.

Both candidates appeared in [P04](P04-Direct-Contrapositive-Proof-Scope-v1.md). P11 revisits them to answer the signature-versus-identity question more explicitly; it adds no new distinct focus ID. Neither record can borrow the other's stronger claim. The new Hammack body observation is separately tied to Hammack's own canonical source.

## Sources inspected directly

| Source | Canonical identity | Reading used here |
| --- | --- | --- |
| `S3-HAMMACK-BOOK-OF-PROOF-3.4` | Uploaded Book of Proof 3.4, 380 pages; SHA-256 `e0e471ca794ddda7bc46704b22885e1582350b7fc5881f8ba9a61b3747ec79fd` | PDF 5; PDF 140–141, printed 128–129, general outline; PDF 143, printed 131, a compound conclusion and De Morgan/case reasoning |
| `S4-VELLEMAN-2006-2E` | Uploaded How to Prove It, 398 pages; SHA-256 `eca0a0a955668e721df2f2e2aaf0d1e31044844a8c6e1435541c5531c863c142` | PDF 105–107, printed 91–93, change in givens/goal and worked inequality; PDF 390, printed 376, operational summary |

Both byte hashes were checked again in this batch. The listed text was read, and Hammack PDF 141 and 143 and Velleman PDF 105 and 390 were rendered and visually inspected. Frozen contents/summary locators stay unchanged. The new source observations remain research notes pending candidate-owned admission.

Hammack's general outline is not limited to the integer example that follows it. Velleman's general strategy is likewise not limited to his real-inequality example. The examples illustrate the schemes; they do not define exclusive number-system boundaries.

## One stated interface, two independently read outlines

Define the comparison domain $\mathcal D$ as tasks of proving a classical conditional $P\Rightarrow Q$ under fixed background assumptions $\Gamma$. Parameters, variable domains and the scopes of quantifiers are already specified. Negations must be computed within those same domains.

The operational grain under comparison is **setting up the contrapositive subproblem and the sound return to the original goal**. It does not include an automatic algorithm that solves the problem-specific derivation.

At that grain, the transformation is

$$
\Phi(\Gamma,\ P\Rightarrow Q)
=\bigl(\Gamma\cup\{\neg Q\},\ \text{goal }\neg P\bigr).
$$

Hammack PDF 141 explicitly starts from $\neg Q$ and ends at $\neg P$. Velleman PDF 105 displays the same change in givens and goal, and PDF 390 repeats it. The unchanged contextual givens are visible in Velleman's worked example and remain background to Hammack's propositions as well.

Therefore $\Phi_H=\Phi_V$ on the stated domain $\mathcal D$, up to renaming auxiliary symbols and expressing logically correct negations in different notation. This is equality of the **local operation profile**, not just equality of the conclusions that some unrelated proof methods might establish.

### Why the wrapper is sound

Suppose the transformed derivation establishes $\neg P$ from $\Gamma,\neg Q$. To prove the original conditional, assume $P$ under $\Gamma$. If $\neg Q$ also held, the transformed derivation would give $\neg P$, a contradiction. Thus $\neg\neg Q$, and in the stated classical setting $Q$. Discharge the assumption $P$.

Conversely, a derivation of $P\Rightarrow Q$ under $\Gamma$ yields $\neg P$ from $\neg Q$: assuming $P$ would give $Q$, contradicting $\neg Q$. Both source outlines use this same contrapositive correspondence.

No claim is made here that the classical return from double negation works unchanged in every alternative logic. No common background assumption is negated, dropped or silently strengthened.

## Discriminating source example: a compound consequent

Hammack's PDF 143 proposition is, for integers $x,y$,

$$
5\nmid xy\quad\Rightarrow\quad
(5\nmid x\ \land\ 5\nmid y).
$$

For either source outline, the contrapositive setup is

$$
(5\mid x\ \lor\ 5\mid y)\quad\Rightarrow\quad5\mid xy.
$$

The OR follows from negating the conjunction. If $x=5a$, then $xy=5(ay)$; if $y=5a$, then $xy=5(xa)$. Thus each case produces the target divisibility. The source's case reasoning fills the middle of the common setup.

A proposed separating profile in which one source only handles atomic conclusions fails: Hammack explicitly negates a compound conclusion, while Velleman's $P,Q$ scheme imposes no atomic-only restriction.

As an original error control, take $x=5,y=1$. The correct negated consequent is true, but the incorrect condition “$5\mid x$ AND $5\mid y$” is false. Replacing OR by AND loses valid contrapositive inputs; it is not an alternative rendering of the same scope.

The script checks all 25 residue pairs modulo 5, including the nine correct contrapositive antecedent cases and this incorrect-negation boundary. The integer witness argument above proves the general statement; the finite controls are not its sole justification.

## Original quantified stress test: injectivity of a composition

This example is an author control, not a newly claimed occurrence in either book.

Let $g:D\to E$ and $f:E\to F$ be functions. Consider

$$
P:\ f\circ g\text{ is injective},\qquad
Q:\ g\text{ is injective}.
$$

Both outlines transform the task $P\Rightarrow Q$ into assuming noninjectivity of $g$ and proving noninjectivity of $f\circ g$, retaining the function types.

Negating the quantified definition gives witnesses $x,y\in D$ with

$$
x\ne y,\qquad g(x)=g(y).
$$

Applying the function $f$ gives

$$
f(g(x))=f(g(y)).
$$

The same distinct pair witnesses failure of injectivity of the composition. This proves the contrapositive on arbitrary sets, with no finiteness assumption and no extra injectivity assumption on $f$. If $D$ is empty, the relevant injectivity statements are vacuously true and there is no noninjectivity witness to assume.

The converse is false: with $D=E=\{0,1\}$, $g$ the identity and $f$ constant, $g$ is injective while $f\circ g$ is not. Proving the converse would therefore not be an interchangeable version of this proof.

The script exhausts 447 typed function pairs with domain size 0–3, intermediate-set size 1–3 and codomain size 1–2. There are 272 cases with noninjective $g$, all transferring an actual witness; 85 injective compositions; and 90 failures of the converse. These are finite mathematical controls, not 447 new candidates or evidence that every future use of both labels has been enumerated.

This test extends the comparison beyond an atomic conditional or the two books' original examples. The universal equality of the two setup schemes still follows from their parameterized definitions, not from the number of finite cases tested.

## What could and could not separate the candidates

| Hypothesis | Evidence or test | Developmental conclusion |
| --- | --- | --- |
| Same normalized name alone proves identity | Compare the two owned claim depths before reading the bodies | Insufficient; a common string is a retrieval lead |
| Different Gate-3 signatures prove distinct mathematics | Compare the admitted contents claim with the admitted operational summary, then read both outlines | Unsupported; evidence depth explains the observed diagnostic difference |
| The two outlines have the same local operation on $\mathcal D$ | Write the assumption/goal maps explicitly and compare the wrapper | Supported for the entire stated interface, not only one example |
| One outline excludes compound or quantified conditions | Inspect the compound source example and the general schemes; test a quantified original family | No such restriction is supported by the inspected outlines |
| One candidate is a proper specialization merely because its record is thinner | Distinguish evidence reach from mathematical scope | Unsupported; a weaker record is not a smaller mathematical operation |
| All possible instructional meanings of both raw labels are already identical | Compare operation grain with examples, packaging and unadmitted scope choices | Not established by this scoped result alone |

No source-supported separating input exists **within the stated identical interface**: both maps have the same specified action there. A claim outside $\mathcal D$ would need its own source-supported boundary; different examples or a hypothetical hardening preference do not supply one.

## Provisional relation recommendation and stopping boundary

If the later canonical operation is explicitly scoped to this classical conditional-proof setup/reduction interface, the positive recommendation is to treat the two outlines as aliases of that operation, retaining their separate source provenance.

The remaining formal work is to review that declared grain, admit the source observations under their own owners, and make the authorized candidate-level decision. It is not an obligation to keep searching indefinitely for another arithmetic example after the common schematic operation has been identified.

This draft does not impose that scope on currently unresolved raw fields or create a formal MERGE. It also does not change the historical Gate-3 rows: the stronger Hammack observation is new evidence to be reviewed, not a fact that the old contents-page record already contained.

## Reproduction and ledger state

Run:

    python3 docs/smmc/arsenal-public-research/P10-P11-mathematical-checks.py

P11 controls passed: the 25 source-example residue pairs, the incorrect-negation counterexample, all 447 typed function pairs, transferred witnesses and the converse boundary. P04's earlier arithmetic/logic controls and source notes are unchanged and are not presented as newly executed or unseen.

The complete option and both participants are covered. Independent mathematical acceptance, evidence admission and final candidate-level treatment remain pending. All 661 production cases remain PENDING with zero primary dispositions and zero formal relations. No source record, Gate-3 measurement, trust pin, seed, cohort, formal Calibration PASS or Gate 4 graduation is created or altered.
