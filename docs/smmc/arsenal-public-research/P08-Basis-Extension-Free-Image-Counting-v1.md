# P08 — Extend a vector to a basis and count free images

**PUBLIC_DEVELOPMENT_ONLY — author research draft; independent mathematical acceptance pending.**

Author: Codex, the builder/research author. Date: 2026-10-26, Asia/Kolkata. Production baseline: `5660936a21c4fc48763ba863ca113265a358984c`; preceding public research head: `472547490be7c1bcfc82ecd7e89f02a17679c30a`. Authority: the [v0.4 operating amendment](../ARSENAL-GATE4-STEP3-OPERATING-AMENDMENT-v0.4.md). Question: `OFFICIAL_BUNDLED`, its complete one-candidate option.

## Research answer

The official occurrence supports a coherent coupling with separately intelligible obligations. Extending the fixed nonzero vector produces a basis adapted to the constraint. The linear-extension theorem then turns arbitrary images of the remaining basis vectors into a bijective parametrization of the permitted maps. Counting those independent choices gives the number of matrices.

The output of the extension step is therefore used concretely by the counting argument. It is not merely decorative co-occurrence. However, this does not prove an irreducible compound ability or exceptional synergy. The same fixed-image count has a row-equation proof that does not explicitly extend a basis. Nor does the word “and” decide the final grain.

The main mathematical boundary is precise: for fixed $v\ne0$ and fixed $\lambda$, the number is $q^{n(n-1)}$ over a field with $q$ elements. Allowing any eigenvalue multiplies that number by $q$. Changing the allowed maps, replacing a basis by a dependent list, or replacing the field by a residue ring can invalidate the free-choice count.

## Exact participant and candidate-owned evidence

| Candidate | Frozen owned record | Evidentiary reach |
| --- | --- | --- |
| `RAW-OFFICIAL-088` — Extend a Vector to a Basis and Count Free Images | `E-RAW-OFFICIAL-088-source` | Verified occurrence for SMMC-2025-A2: a fixed nonzero vector is extended to a basis and remaining images are chosen freely; original locator PDF 2, section “Solution 1” |

The display name is a project-harvested description of the occurrence, not a claim that the competition document names a universal method with that exact title.

Gate 3 already records MACRO / BUNDLED_MOVES, with clear trigger, operation and output. That is a reason to investigate the internal roles, not an automatic SPLIT or COMBO. The one owned occurrence remains unchanged; no separate component evidence owner, canonical component ID or formal relation is manufactured here.

## Primary source and reading limits

Source: `S0-SMMC-SOLUTION-2025`, [official 2025 solutions](https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2025_solutions.pdf), PDF 2–3, A2 and its lemma. The current text reports 25 pages, matching the canonical register's page count. The existing frozen artifact pin is SHA-256 `0fcacace7c3c9f3a34b7c368abdbc9436e35215e7e406158b25bfd9437940345`.

The primary-site PDF text was read directly. The live binary was not downloaded/rehashed, and the screenshot interface did not expose usable pixels for inspection. The hash above is the existing frozen pin, not a new live-artifact authentication claim. The direct body reference used below is the lemma's **Proof 1**, within the main solution; this does not rewrite the original locator's wording.

The source asks for an average number of nonzero eigenvectors over matrices modulo a prime. Its first lemma proof extends the given vector to a basis and counts independent remaining images. Other supplied proofs use a linear map on matrix space, explicit equations and a change of basis. These alternatives help test whether the particular extension route is mathematically necessary.

**Source-reading caveat.** The retrieved text of Proof 2 displays an exponent $n^2-n+1$ after a kernel dimension $n^2-n$, while the lemma fixes $\lambda$. Proof 4 subsequently counts an unspecified-eigenvalue event. These two counts must be distinguished. Without usable PDF pixels, this draft does not attribute every displayed discrepancy to printing rather than extraction, or declare a verified erratum in the frozen artifact. It reconstructs Proof 1, derives the two event counts independently, and does not import those other displayed counts as fixed-$\lambda$ facts.

## Operational coupling and separate proof obligations

| Role in this occurrence | Input | Action | Output used next |
| --- | --- | --- | --- |
| Adapt a basis | A nonzero $v$ in finite-dimensional $V$ | Complete $(v)$ to an ordered basis $(v,b_2,\ldots,b_n)$ | Independent spanning coordinates with the constrained vector first |
| Justify the parametrization | That basis and one prescribed image $T(v)=w$ | Prove that every assignment of the other basis images extends uniquely to a linear map | A bijection between permitted image lists and permitted maps |
| Count free images | A finite codomain, and no extra constraints on the remaining images | Count each free image and multiply independent choices | The fixed-image matrix count |

These are descriptive proof roles, not newly admitted component handles. The linear-extension justification is the interface between extension and counting; dividing a proof into such obligations does not settle how many learner abilities it should become.

The final averaging over vectors/eigenvalues is part of the surrounding problem solution. It is not silently absorbed into the harvested candidate's whole intended operation.

## Mathematical reconstruction and attempted falsifiers

### M1. A nonzero vector can be completed to a basis

Let $V=\mathbb F_q^n$ with $n\ge1$. Since $v\ne0$, the one-vector list $(v)$ is independent. If the present independent list does not span $V$, some standard coordinate vector lies outside its span; otherwise all standard vectors, and hence $V$, would be in the span. Append one such vector. Independence is preserved and the span dimension increases by one.

After at most $n-1$ additions, this gives a basis $B=(v,b_2,\ldots,b_n)$. It is sufficient to choose **one** completion. The official prime-field setting is a special case; the finite-field formulation here is an author generalization of the same argument.

### M2. Free image assignments must form a bijection with maps

Fix any $w\in V$ and choose arbitrary $y_2,\ldots,y_n\in V$. Every $x\in V$ has one coordinate expression $x=a_1v+\sum_{i=2}^n a_i b_i$. Define

$$
T(x)=a_1w+\sum_{i=2}^n a_i y_i.
$$

Unique coordinates make this well defined; the formula is linear and has the required basis images. Any other linear map with those images agrees on every coordinate expression, so it is the same map. Conversely, every map with $T(v)=w$ supplies exactly one such image list.

There are $q^n$ choices for each of the $n-1$ remaining images. Thus

$$
\#\{T:V\to V\text{ linear}:T(v)=w\}
=(q^n)^{n-1}=q^{n(n-1)}.
$$

With $w=\lambda v$, this is the source lemma for fixed $v\ne0$ and fixed $\lambda$. It is not a count of possible completions of $v$, and it does not require $T$ to be invertible.

The same proof, as a separate author deduction, gives $q^{m(d-1)}$ maps from $\mathbb F_q^d$ to $\mathbb F_q^m$ with one prescribed nonzero input vector and an arbitrary prescribed output. The relevant free-choice count comes from the codomain size, not just the input dimension.

### M3. Counting every basis completion overcounts descriptions

For fixed first vector $v$, the number of ordered completions is

$$
C(v)=\prod_{j=1}^{n-1}(q^n-q^j).
$$

At stage $j$, the current span has $q^j$ vectors, all forbidden for the next independent vector. An empty product for $n=1$ is 1.

If one enumerates every completion and every compatible free-image list, each permitted linear map is described once for **each** completion. Multiplying the fixed-basis map count by $C(v)$ therefore counts pairs “basis description / map,” not distinct maps.

Our explicit $\mathbb F_2^2$ control with $v=(1,0)$ and $T(v)=v$ has two ordered completions and four maps. Enumerating both bases gives eight descriptions, with every map appearing twice. The source's choice of one basis avoids this overcount.

### M4. Independence, nonzero input and the allowed map class matter

The following original controls test actual failures of a broader free-image rule.

| Altered condition | Exact consequence | Why the source count does not transfer unchanged |
| --- | --- | --- |
| Use $v=0$ with $T(v)=\lambda v$ | Every linear map qualifies: $q^{n^2}$ | The zero vector cannot be the first vector of a basis, and every map sends it to zero |
| Use the spanning list $e_1,e_2,e_1+e_2$ in $\mathbb F_2^2$ | Only 16 of 64 possible image triples are consistent | The third image must equal the sum of the first two; dependent generators cannot have independent arbitrary images |
| Restrict to invertible maps in $\mathbb F_2^2$ | Two invertible maps fix $e_1$, versus four unrestricted maps; none sends $e_1$ to zero | The basis images must themselves form a basis, so the remaining images are not unrestricted |
| Replace the field by $\mathbb Z/4\mathbb Z$ and use $v=(2,0)$ | 64 matrices satisfy $Mv=v$, versus the invalid field formula's 16 | $v$ is nonzero but has $2v=0$, so it cannot be part of a free-module basis; nonzero does not mean the needed coefficient is invertible |

For the ring example, $M_{11}$ must be odd and $M_{21}$ even; the other two entries are arbitrary. The count is $2\cdot2\cdot4^2=64$. Also $1v=3v$, so two distinct eigenvalue labels produce the same event. This is **not** the field with four elements; it is an out-of-domain residue-ring countertest.

These failures do not weaken the source lemma's field hypotheses. They identify what its coupling actually uses.

### M5. A fixed eigenvalue and any eigenvalue are different events

For $v\ne0$ over a field, $\lambda v=\mu v$ implies $\lambda=\mu$: use a nonzero coordinate of $v$ and its inverse. Thus the fixed-$\lambda$ events are disjoint, and

$$
\#\{M:v\text{ is an eigenvector of }M\}
=q\cdot q^{n(n-1)}.
$$

The distinction is visible at $n=1$: for fixed $\lambda$ there is one scalar matrix, while for unspecified $\lambda$ all $q$ scalar matrices qualify.

Counting pairs $(M,v)$ with $v$ an eigenvector, or equivalently triples $(M,v,\lambda)$ because the eigenvalue is unique, gives

$$
(q^n-1)\,q\,q^{n(n-1)}.
$$

Divide by the $q^{n^2}$ equally weighted matrices to obtain the surrounding problem's average

$$
\mathbb E[\text{number of nonzero eigenvectors}]
=\frac{q^n-1}{q^{n-1}}
=q-q^{1-n}.
$$

This counts vectors, not eigenlines. Each invariant one-dimensional subspace contributes $q-1$ nonzero eigenvectors, so the average number of eigenlines is smaller by that factor. For example, at $q=3,n=2$, the two averages are $8/3$ and $4/3$ respectively. Checking only $q=2$ would conceal that distinction.

### M6. A different proof can reach the count without explicit basis extension

As an independent author reconstruction of the row-equation route, choose a coordinate $j$ with $v_j\ne0$. For a fixed output $w$, row $i$ must satisfy

$$
\sum_k M_{ik}v_k=w_i.
$$

Choose all $n-1$ coefficients except $M_{ij}$ freely, and solve uniquely

$$
M_{ij}=v_j^{-1}\left(w_i-\sum_{k\ne j}M_{ik}v_k\right).
$$

The rows have independent choices, yielding $q^{n(n-1)}$ matrices again. This verifies the lemma without treating every use of that count as the same basis-extension workflow. An alternative route does not remove the actual input/output dependency inside Proof 1.

## Reproducible controls and limits

Run:

    python3 docs/smmc/arsenal-public-research/P08-P09-mathematical-checks.py

The script directly enumerates all matrices in seven prime-field cases. Separately, it constructs matrices as $YB^{-1}$ from assigned basis images and checks equality of the complete fixed-$(v,\lambda)$ matrix sets.

| Field / dimension | Matrices exhausted | Fixed-$v$, fixed-$\lambda$ count | Average nonzero eigenvectors |
| --- | --- | --- | --- |
| $\mathbb F_2$, $n=1$ | 2 | 1 | 1 |
| $\mathbb F_2$, $n=2$ | 16 | 4 | $3/2$ |
| $\mathbb F_2$, $n=3$ | 512 | 64 | $7/4$ |
| $\mathbb F_3$, $n=1$ | 3 | 1 | 2 |
| $\mathbb F_3$, $n=2$ | 81 | 9 | $8/3$ |
| $\mathbb F_5$, $n=1$ | 5 | 1 | 4 |
| $\mathbb F_5$, $n=2$ | 625 | 25 | $24/5$ |

Totals: 1,244 matrices, 4,164 constrained basis-image assignments, and 1,139 candidate completion lists containing 709 valid ordered bases. Counts refer to the displayed mathematical corpora; they are not independent real-candidate investigations. The script also checks the completion overcount, dependent-generator, invertible-map and residue-ring controls. All passed.

The finite cases supplement the general proofs. They neither authenticate the official binary nor certify a final ability decomposition or learner transfer.

## Alternatives and research recommendation

| Hypothesis | Test / evidence | Developmental assessment |
| --- | --- | --- |
| The occurrence is merely two unrelated moves mentioned together | Trace the basis output through the unique-extension bijection into the count | Unsupported: the output of one obligation is used by the next |
| The whole expression is one coherent coupled workflow | Reconstruct one fixed basis, free images, unique extension and the count | Supported on this occurrence's specified scope |
| It is one irreducible compound with exceptional synergy | Compare the row-equation route and distinguish procedural roles | Not established; coherence alone is not irreducibility or a synergy measure |
| Every matrix count of this kind requires explicit basis extension | Solve a nonzero-coordinate row constraint directly | False as a claim about proof routes; M6 provides a valid alternative |
| The bundled diagnostic alone demands SPLIT/COMBO | Compare evidence ownership and possible learning grains | The diagnostic does not supply final component identities or treatment decisions |

The provisional recommendation is to retain the evidenced coupling, with the linear-extension bijection and typed counting event explicit. Basis adaptation and free-image parametrization are plausible roles for later granularity review. A final split, compound or standalone decision needs its own justified scope and admitted component evidence; no canonical component names or IDs are invented here.

The complete registered option and its one participant have been investigated in this first author draft. Independent mathematical acceptance and final grain remain open. All 661 production cases remain PENDING, with zero primary dispositions and zero formal relations. No source record, Gate-3 measurement, seed, cohort or formal Calibration PASS is changed or created.
