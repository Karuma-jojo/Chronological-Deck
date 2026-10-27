# P03 — Smallest counterexample and infinite descent

**PUBLIC_DEVELOPMENT_ONLY — author research draft; independent mathematical acceptance pending.**

Author: Codex, the builder/research author. Date: 2026-10-26, Asia/Kolkata. Production baseline: `5660936a21c4fc48763ba863ca113265a358984c`; preceding public research head: `150346c4778cbd3b07e29f94ad0a109883e9dd84`. Authority: the [v0.4 operating amendment](../ARSENAL-GATE4-STEP3-OPERATING-AMENDMENT-v0.4.md). Question: `MINIMAL_DESCENT_DISTINCTION`, the complete registered five-candidate option.

## Research answer

Smallest-counterexample proof and infinite descent have a shared well-founded core on an explicitly specified bad-object domain: if every bad object would yield another bad object with a strictly smaller natural-number measure, then no bad object exists. One can present this as contradicting a least measure or as an impossible indefinitely descending construction. On that common setting these are two ways to use the same criterion.

This is a **scoped mathematical comparison**, not full-domain alias certification of all five raw candidates. Hammack presents a proof organization for statements indexed by natural numbers; Engel demonstrates impossibility arguments and concrete transformations; Putnam and Beyond states the well-ordering/descent principle broadly and also applies it to positive integer labels on a grid. Their shared principle does not determine the final grain or training identity of the raw expressions.

The two project tags remain semantically thin under their own evidence. Their presence in a vocabulary, even as separate labels, establishes neither equivalence to the textbook descriptions nor mathematical distinctness.

## Exact participants and candidate-owned evidence

| Candidate | Frozen owned record | Current evidentiary reach |
| --- | --- | --- |
| `RAW-SOURCE-h-smallest-counterexample` — Proof by Smallest Counterexample | `E-RAW-SOURCE-h-smallest-counterexample-source` | Source proof-structure term; original locator PDF 5, section 10.3 |
| `RAW-SOURCE-e-infinite-descent` — Infinite Descent | `E-RAW-SOURCE-e-infinite-descent-source` | Source terminology and an actual descent solution; original locator PDF 129, chapter 6 |
| `RAW-SOURCE-p-infinite-descent` — Fermat's Infinite Descent Principle | `E-RAW-SOURCE-p-infinite-descent-source` | Dedicated source subsection; original locator PDF 8, section 5.1.2 |
| `RAW-LEGACY-minimal-counterexample` — MINIMAL-COUNTEREXAMPLE | `E-RAW-LEGACY-minimal-counterexample-schema` | Project-derived index signal from the frozen method vocabulary |
| `RAW-LEGACY-descent` — DESCENT | `E-RAW-LEGACY-descent-schema` | Project-derived index signal from the frozen method vocabulary |

Original locators and claims are preserved. The new body readings below are developmental observations requiring candidate-owned supplemental admission before formal use. A familiar book explanation is not replacement evidence for either legacy tag. Gate-3 UNRESOLVED measurements neither prove equivalence nor establish that no method exists.

## Canonical sources inspected directly

| Source | Verified identity | Inspected passages |
| --- | --- | --- |
| `S3-HAMMACK-BOOK-OF-PROOF-3.4` | Uploaded Book of Proof 3.4, 380 pages; SHA-256 `e0e471ca794ddda7bc46704b22885e1582350b7fc5881f8ba9a61b3747ec79fd` | PDF 203, printed 191, section 10.3; PDF 204, printed 192, the subsequent prime-factorization argument |
| `S2-ENGEL-1998` | Uploaded Problem-Solving Strategies, 401 pages; SHA-256 `abc16cf21b4389bc357246140c88422a387aceb741c539de5f5da27f954cc096` | PDF 128–129, printed 124–125, chapter 6 E12; PDF 374–375, section 14.2 and its initial example |
| `S5-GELCA-ANDREESCU-2007` | Uploaded Putnam and Beyond, 807 pages; SHA-256 `143c74f8267984e34a6f260d1e20c51cd63e7e73c499161f85c4981e0f620fba` | PDF 262–263, printed 248–249, section 5.1.2; the principle and its positive-grid example are used here |
| `S0-PROJECT-SCHEMA` | [Frozen schema at commit 1a485cf7a2c495ab717cadee60a7762d96994f34](https://github.com/Karuma-jojo/Chronological-Deck/blob/1a485cf7a2c495ab717cadee60a7762d96994f34/course/smmc/schema.mjs#L27-L38) | The method list explicitly includes both tag strings; it does not define their operations |

All three local book byte hashes were checked. The cited text was read directly; Hammack PDF 203, Engel PDF 128, 129 and 375, and Putnam and Beyond PDF 262 were rendered and visually inspected. Historical priority claims in the books are outside this investigation.

## Source observations

Hammack describes smallest-counterexample proof as combining induction and contradiction. The outline checks a first case, assumes a false statement exists, chooses the least failing index and derives a contradiction using earlier truth. Its adjacent example uses the predecessor index. The subsequent uniqueness-of-prime-factorization proof instead passes to a quotient smaller than the supposed least counterexample. Thus the outline must not be treated as a definition restricting the method to decrementing by one.

Engel's section 14.2 describes producing smaller positive-integer data from hypothetical solution data and explains why indefinite strict decrease is impossible. The earlier chapter-6 example is particularly important: its repeated halving changes an equation coefficient. A correct reconstruction must preserve an admissible family/state, not silently freeze the original coefficient.

Putnam and Beyond ties descent to least positive-integer elements, and also states the eventual-stationarity form for weakly decreasing integer sequences. Its positive-integer harmonic-grid example uses a minimum principle, showing that the source's scope is not confined to an explicit polynomial-solution transformation.

The frozen project schema supplies the two literal method tags. It provides no candidate-owned domain, measure, transformation, theorem or historical occurrence for them. That limitation survives comparison with richer textbook material.

## The common criterion, with its exact scope

Let $S$ be a set of purported bad objects and let $\mu:S\to\mathbb N_{>0}$. Suppose

$$
\forall x\in S\ \exists y\in S:\quad\mu(y)<\mu(x).
$$

Then $S$ is empty. If it were nonempty, the nonempty set of attained measures $\mu(S)$ would have a least value. Choose an object attaining it. The stated condition supplies a smaller attained value, a contradiction.

This proof requires only the least-value principle; there is no need to calculate an actual infinite chain. If a concrete transformation is available, repeatedly applying it gives the usual descent presentation: the integer measure falls by at least one each time and cannot stay positive indefinitely.

For indexed statements $P(n)$, choose $S=\{n:\neg P(n)\}$. A least-counterexample proof uses truth at smaller allowed indices. If the reasoning supplies a smaller bad index from every alleged bad index, it instantiates the criterion above. This comparison concerns that explicitly stated setting. It is not a claim that every proof written as a smallest-counterexample argument yields the same algorithm, that an arbitrary constructive map can be extracted, or that all uses of minimization are one training operation.

## Candidate operation profiles

| Source expression | Assumed objects and source role | Core obligation | Output of successful reasoning |
| --- | --- | --- | --- |
| Hammack smallest-counterexample term | A first false indexed statement; later, a least integer with purportedly nonunique factorization | Justify the least choice, earlier truth and contradiction; the smaller object need not be $n-1$ | The supposed counterexample cannot exist |
| Engel descent term | Hypothetical solution data, sometimes within an enlarged coefficient family | Specify the state, preserved condition, integrality and strict well-founded decrease | Impossibility of nontrivial solution data |
| Putnam and Beyond descent-principle term | Strictly decreasing positive integer values, weak descent/stationarity, or a minimum-value application | Verify the integer order/minimum principle and the inference needed by the application | Impossibility of indefinite strict descent, or a structural conclusion |
| Legacy MINIMAL-COUNTEREXAMPLE | A vocabulary label | Locate candidate-owned operational evidence before assigning the textbook role | Undetermined by its present index record |
| Legacy DESCENT | A vocabulary label | Locate candidate-owned state/measure/domain evidence before assigning the textbook role | Undetermined by its present index record |

The source-based profiles overlap. Their table columns are not final ontology types and do not prove proper containment.

## A reconstruction that exposes the state-definition issue

Engel's chapter-6 example considers $x^2+y^2+z^2=2xyz$ in integers and rules out nonzero triples. To reconstruct its repeated halving without an invalid closure claim, consider the larger hypothetical state family

$$
S=\{(k,x,y,z): k\in2\mathbb N_{>0},\ (x,y,z)\in\mathbb Z^3\setminus\{(0,0,0)\},
\ x^2+y^2+z^2=kxyz\}.
$$

An even $k$ makes the right side even, so the number of odd coordinates on the left is even. If exactly two coordinates were odd, the left side would be 2 modulo 4, while the even coefficient times a product containing an even coordinate would be 0 modulo 4. Hence all three coordinates must be even.

Write $(x,y,z)=(2a,2b,2c)$. Division by 4 gives

$$
a^2+b^2+c^2=2kabc.
$$

Thus the transformation is $(k,x,y,z)\mapsto(2k,x/2,y/2,z/2)$. The coefficient grows, while the positive integer measure

$$
\mu(k,x,y,z)=|x|+|y|+|z|
$$

halves. The new triple remains integral and nonzero, and the new coefficient remains positive and even. This establishes closure in the stated family and strict measure decrease, contradicting the common criterion. The original coefficient-2 problem is included. The zero triple is not ruled out and is explicitly excluded from the bad-state family.

This explains two important boundaries. Every coordinate of a state need not decrease; the specified measure must decrease. Also, the preserved condition must be evaluated on the full state: the coefficient-changing halving step is not the same algebraic rule as keeping $k=2$ after halving. Once $k$ is included as part of the object, the family relation itself is fixed.

The sibling script checks the unconditional identity

$$
R(k,2a,2b,2c)=4R(2k,a,b,c),\qquad
R(k,x,y,z)=x^2+y^2+z^2-kxyz.
$$

At $k=2,a=b=c=1$, the left residual is $-4$, whereas $4R(2,1,1,1)=4$. This is a countertest of an incorrect algebraic normalization, **not a claimed nontrivial solution** to an impossible even-coefficient equation. In contrast, $(k,x,y,z)=(1,3,3,3)$ and $(3,1,1,1)$ are genuine odd-coefficient solutions, so an unqualified extension to every integer coefficient would be false.

## Other successful and failed separation tests

### M1. Smaller and bounded below does not automatically mean well founded

The sequence $q_n=2^{-n}$ is positive and strictly decreasing forever. Its positive-real domain has no attained least term. Conversely, the constant positive integer sequence is infinite and weakly decreasing, but not strictly decreasing. The two controls isolate the order and strictness assumptions. The general reciprocal-power formula proves the first claim; checking a finite prefix is only a script sanity check.

### M2. Leaving the bad set cannot contradict minimal badness

Let the bad integers be the positive evens. The smallest is 2. Sending 2 to 1 reduces a positive integer measure, but 1 is not bad; there is no contradiction. This models an invalid proof of the false assertion that all positive integers are odd, even though its first case is true. Closure in the bad set is indispensable.

Similarly, $5\to4\to3\to2\to1$ is a valid finite descent. If the transformation is only defined above 1 and 1 is still allowed, the chain's existence supplies no impossibility proof. One must eliminate terminal bad cases or justify the rule at every supposed bad object.

### M3. The same reduction can be written in either style

Every positive integer has a representation $n=2^r u$ with $r\ge0$ and $u$ positive odd. For a smallest-counterexample proof, a least bad $n$ cannot be odd; hence it is $2m$ with $m<n$. Minimality supplies a representation of $m$, which supplies one for $n$, a contradiction.

Equivalently, if a positive integer lacking such a representation existed, halving its even value would produce a smaller positive integer still lacking a representation. Otherwise multiplying the smaller representation by 2 would solve the original. This is the same bad-set closure argument presented as descent. The two descriptions do not require distinct mathematical mechanisms for this example.

This is an original background illustration, not borrowed evidence defining either project tag. The script checks 1,024 positive inputs and the largest halving count in that range is 10; the general proof above establishes existence for all positive integers.

### M4. The descent principle can support a positive structural conclusion

For the positive-integer grid setting used by Putnam and Beyond, the set of all attained labels is a nonempty subset of the positive integers and has an attained minimum $m$. At a vertex with that value, each neighbor is at least $m$. If their arithmetic mean equals $m$, each neighbor must equal $m$. Repeating along finite paths in the connected grid makes every label $m$.

This is our direct minimum-value reconstruction of the source application. It needs no search for a least false indexed statement or explicit endless chain of new Diophantine solutions. The minimum principle is shared, while the application-level work differs. Removing an assumption can invalidate this particular proof without by itself proving the conclusion false on the enlarged domain.

The script's 2-by-2 torus is an explicitly finite analogue, not a substitute proof for the infinite grid. Exhausting its 81 assignments with labels 1–3 leaves precisely the three constant harmonic assignments.

## Rival claims assessed

| Claim | Test and result |
| --- | --- |
| Minimal-counterexample and descent are wholly unrelated | Rejected on the stated common bad-set/measure setting: the least-value proof and iterative-decrease presentation use the same criterion |
| Every smallest-counterexample argument only uses $n-1$ | The source's following factorization proof uses a smaller quotient; the proposed scope boundary fails |
| Descent always decreases every coordinate of the original fixed-parameter tuple | The earlier Engel example changes the coefficient; a correctly defined full state and a well-founded measure repair the misleading restriction |
| Descent means any numerical decrease | The positive-rational chain and weakly decreasing constant integer sequence expose the missing order/strictness conditions |
| The three textbook headings are full aliases in all intended domains | The common principle is established; the complete source scopes and operational grain are not. Full MERGE is not certified |
| The two schema tags inherit the corresponding textbook meanings | Rejected as an evidentiary inference: the owned schema records supply strings, not those meanings |
| Different schema entries prove different abilities | Also unsupported; vocabulary separation is not a mathematical separation theorem |

The strongest positive outcome is the explicitly scoped common mechanism and the concrete state/closure specification. The strongest remaining limit is that mechanism-sharing does not answer the full identity/grain question for every raw expression.

## Reproduction and outstanding research

Run from repository root:

    python3 docs/smmc/arsenal-public-research/P02-P03-mathematical-checks.py

P03 controls passed: all 128 even-coefficient/coordinate residue tuples modulo 4, with 16 allowable tuples all even; 3,087 unconditional coefficient-scaling identities; strict absolute-value measure decrease for nonzero doubled tuples; zero/odd-coefficient boundaries; closure and endpoint countertests; the positive-rational and weak-descent controls; 1,024 factorization inputs; and the 81 finite-torus assignments. Source-example reconstructions and original controls are not accepted evidence records or held-out performance.

Outstanding actions are to review the exact operation profiles, determine whether any stronger full-domain relationship can be supported, and trace operational project evidence for each legacy tag if it is to receive a formal meaning. No additional historical occurrence is asserted from a tag string. New source observations require candidate-owned admission before formal incorporation.

All five participants in the registered option are covered in this first author draft. Their final routing dispositions and independent review remain pending. No primary, shared relation, supplemental evidence record or production status is changed; all 661 production cases remain PENDING and formal Calibration PASS is not claimed.
