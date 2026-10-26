# P10 — What an UNRESOLVED record does and does not establish

**PUBLIC_DEVELOPMENT_ONLY — author research draft; independent mathematical acceptance pending.**

Author: Codex, the builder/research author. Date: 2026-10-26, Asia/Kolkata. Production baseline: `5660936a21c4fc48763ba863ca113265a358984c`; preceding public research head: `bff5f4b5124a683179b7cae3f8a3653a54efc081`. Authority: the [v0.4 operating amendment](../ARSENAL-GATE4-STEP3-OPERATING-AMENDMENT-v0.4.md). Question: `GATE3_UNRESOLVED`, **both** registered options.

## Research answer

Direct source reading clarifies genuine operations for both candidates. Hammack's smallest-counterexample outline specifies an indexed universal claim, a first case, a least failing index and a contradiction using earlier truth. His direct-proof outline specifies assuming an antecedent and deriving its consequent, with actual definitions and witness construction filling the mathematical gap.

The frozen owned records are much thinner: they point to the contents page and report that the topics are treated. An operational explanation in the book and an admitted evidence record reporting that explanation are different things. The fuller readings can support new candidate-owned observations; they do not retroactively enlarge those contents-page claims or silently overwrite Gate-3 measurements.

UNRESOLVED is therefore neither proof that a source lacks an operation nor an instruction to force a Gate-4 HOLD. It also is not automatically cleared by writing a familiar outline from memory. Here the clarification is grounded in the exact source body, with its mathematical obligations tested.

## Both options and their owned evidence

| Registered option | Candidate | Frozen owned record / claim reach | Earlier public comparison |
| --- | --- | --- | --- |
| 1 | `RAW-SOURCE-h-smallest-counterexample` — Proof by Smallest Counterexample | `E-RAW-SOURCE-h-smallest-counterexample-source`; PDF 5, section 10.3 in the contents; the source explicitly treats the technique | [P03](P03-Minimal-Counterexample-Infinite-Descent-v1.md) |
| 2 | `RAW-SOURCE-h-direct-proof` — Direct Proof | `E-RAW-SOURCE-h-direct-proof-source`; PDF 5, chapter 4 in the contents; the source gives it a chapter | [P04](P04-Direct-Contrapositive-Proof-Scope-v1.md) |

Both accepted Gate-3 rows are REVIEWED with unresolved grain/bundle and trigger/operation/output boundaries. Their rationales expressly restrict the inference to the owned evidence. These are preserved measurements, not an upstream defect exposed merely by finding a fuller passage.

The two options are independently investigated below. They are not a mandated pairwise alias comparison. Both candidates were already in the cumulative public focus set, so this question adds two investigated options and no new distinct candidate ID.

## Canonical source inspected

Source: uploaded `S3-HAMMACK-BOOK-OF-PROOF-3.4`, Book of Proof 3.4, 380 pages; local SHA-256 reverified as `e0e471ca794ddda7bc46704b22885e1582350b7fc5881f8ba9a61b3747ec79fd`.

| Passage | Observation used here |
| --- | --- |
| PDF 5, printed v | The frozen contents-page locators |
| PDF 128, printed 116 | The existential witness definition of divisibility |
| PDF 130–131, printed 118–119, section 4.3 | The direct-proof outline and requirement to justify the steps between assumption and conclusion |
| PDF 133, printed 121 | Direct proof of divisibility transitivity by combining two integer witnesses |
| PDF 203, printed 191, section 10.3 | The smallest-counterexample outline and $4\mid(5^n-1)$ example |
| PDF 204, printed 192 | The subsequent prime-factorization proof, already considered in P03; the smaller quantity need not be the predecessor |

Text for all listed passages was read. PDF 130, 133 and 203 were rendered and visually inspected. New body observations are distinguished from the original contents-page records; no supplemental record is admitted by this note.

## Option 1 — Smallest-counterexample proof

### What the source reading clarifies

| Boundary | New body observation | Remaining limit |
| --- | --- | --- |
| Input/trigger | A universal sequence of statements indexed by positive integers, with a first case to check in the displayed outline | It does not mechanically recognize or solve every suitable problem |
| Operation | Suppose a false statement exists, choose a least failing index, use truth at earlier allowed indices, and derive a contradiction | The problem-specific argument producing the contradiction is essential |
| Output | The supposed bad set is empty, proving the indexed universal claim | A chosen least bad index alone does not establish emptiness |
| Domain | The usual positive-integer order supports a least counterexample | A different domain/order needs its own well-founded justification |
| Grain | A structured proof organization with several obligations | A final standalone/compound/family treatment is not fixed by the outline's number of written steps |

The source's predecessor example is one implementation. The following factorization proof uses a smaller quotient, as recorded in P03. It would be too narrow to define every smallest-counterexample proof as “decrement by one.”

### Mathematical reconstruction of the source example

For positive integers $n$, prove $4\mid(5^n-1)$. The first case is $5^1-1=4$.

If a counterexample existed, choose its least index $k$. The first case gives $k>1$. Minimality gives an integer $a$ with

$$
5^{k-1}-1=4a.
$$

Then

$$
5^k-1=5(5^{k-1}-1)+4=4(5a+1),
$$

contradicting the choice of $k$. The actual contradiction uses the displayed arithmetic relation, not the bare coexistence of a true predecessor and a false successor.

The new script checks 64 positive inputs and their recursively constructed integer witnesses, with $a_0=0$ and $a_n=5a_{n-1}+1$. The $n=0$ identity is also valid, but is a separate boundary observation; it does not change the source's displayed first-case convention. The least-counterexample argument above proves the positive-integer result generally.

### Falsifiers of an incomplete proof profile

As an original logical control, let $S_1,S_2$ be true and $S_3$ false. A least bad index exists, and every earlier statement is true. These facts are compatible; no contradiction has yet been obtained. This defeats “choose the smallest counterexample, therefore the theorem is true.”

For a finite sequence, the premise

$$
S_1\ \land\ \bigwedge_{k=2}^{N}(S_{k-1}\Rightarrow S_k)
$$

forces all $S_k$ true. At a first false index, the preceding true statement would falsify the transition. The script checks all 256 truth patterns of length eight; exactly the all-true pattern satisfies the base and all transitions. Without the base, the all-false pattern satisfies every transition vacuously.

The infinite positive-integer proof requires the corresponding transition for every index, or another valid least-bad contradiction, not just a checked prefix.

The order matters as well. On all of $\mathbb Z$, the predicate $S(n):n\ge0$ has a true case at zero and is closed under increment, yet is false at every negative integer. The negative bad set has no least element in the usual order, because $k-1<k<0$ for every negative $k$. A base plus a forward step does not cover the negative direction. This does not prohibit well-founded arguments on integer objects using a separately specified order or measure.

## Option 2 — Direct proof

### What the source reading clarifies

The outline starts with a conditional $P\Rightarrow Q$, adds $P$ to the current givens, and derives $Q$ using valid reasoning. The surrounding domain assumptions remain in force. The middle is a proof obligation, not an automatic inference.

The contents-page claim does not specify this procedure, but PDF 130–133 does. It also shows how a logical outline can host concrete work such as extracting witnesses, choosing fresh symbols and constructing the witness needed for the conclusion.

### Mathematical reconstruction with a zero boundary

The source proposition is, for integers $a,b,c$,

$$
(a\mid b\ \land\ b\mid c)\Rightarrow a\mid c.
$$

By the source's witness definition, write $b=ad$ and $c=be$ with $d,e\in\mathbb Z$. Then

$$
c=(ad)e=a(de),
$$

and $de$ is an integer witness for $a\mid c$. This is a completed local derivation under the assumed antecedents, not just a restatement of the direct-proof outline.

Under that definition $0\mid0$ is true: $0=0d$ has an integer witness. If $a=0$, the antecedents force $b=c=0$ and the proof still works. Writing an unjustified quotient $c/a$ would instead introduce division by zero. The witness proof requires neither such division nor an extra assumption $a\ne0$.

The script checks 729 generated witness triples $a,d,e\in[-4,4]$, and exhausts all 343 triples $a,b,c\in[-3,3]$, including 83 antecedent-satisfying cases. It explicitly distinguishes $0\mid0$ from $0\mid1$. These finite checks supplement the general witness argument.

### What remains broader or unresolved

“Assume $P$, derive $Q$” is a proof-organization interface. Different conditionals require different middle arguments, which may contain cases or auxiliary lemmas. The source does not provide a universal algorithm that takes any true conditional and returns its proof.

The direct outline is mathematically intelligible. Its eventual learning grain and relationship to other proof organizations remain separate questions. P04 discusses the interaction with contraposition; this note does not infer a new relationship merely because the two source topics share a chapter family.

## Evidence and treatment alternatives

| Alternative inference | Assessment |
| --- | --- |
| Gate-3 UNRESOLVED means the source has no operation | Refuted here by the directly read outlines and worked mathematical arguments |
| Familiarity alone can fill the old records' missing boundaries | Unsupported; the new observations must retain source identity, ownership and locators |
| Fuller reading clarifies operational boundaries | Supported in both options, with the explicit obligations above |
| Clarification automatically changes historical Gate-3 measurements | Unsupported; the old measurements were made against thinner admitted claims |
| Any unresolved candidate must receive a Gate-4 HOLD | Not a warranted automatic rule; eventual treatment depends on adequate admitted evidence and the actual remaining questions |
| These examples settle final grain and all relations | Not established by the local reconstructions |

The provisional recommendation is to preserve the operational clarification as candidate-owned research ready for review, while keeping the old contents-page records and measurements intact. The two investigation questions have substantive answers; the next formal step is review/admission at a stated grain, not an indefinite search for more examples to prove that an outline exists.

## Reproduction and ledger state

Run:

    python3 docs/smmc/arsenal-public-research/P10-P11-mathematical-checks.py

P10's mathematical controls passed with the counts above. The general proofs, the finite controls and the evidence-status reasoning have distinct roles; a script cannot admit a source observation or issue a primary disposition.

Both registered options and both participants are covered. Independent mathematical acceptance and final treatment remain pending. No source record, Gate-3 measurement, accepted scope, primary disposition or formal relation changes. All 661 production cases remain PENDING. Formal Calibration PASS and Gate 4 graduation remain pending.
