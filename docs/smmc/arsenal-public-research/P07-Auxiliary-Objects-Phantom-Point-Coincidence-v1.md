# P07 — Auxiliary objects and phantom-point coincidence

**PUBLIC_DEVELOPMENT_ONLY — author research draft; independent mathematical acceptance pending.**

Author: Codex, the builder/research author. Date: 2026-10-26, Asia/Kolkata. Production baseline: `5660936a21c4fc48763ba863ca113265a358984c`; preceding public research head: `aead2141d4666cd6514f0a4c604649e18d7dac0e`. Authority: the [v0.4 operating amendment](../ARSENAL-GATE4-STEP3-OPERATING-AMENDMENT-v0.4.md). Question: `AUXILIARY_UMBRELLA_MOVE`, its complete three-candidate option.

## Research answer

Zeitz's auxiliary-object discussion is a geometric construction strategy: add an object that makes a useful mathematical relation available. His phantom-point examples give a more specified proof pattern: construct a point with a desired property, establish that it coincides with a target point, and transfer the property. The midpoint and centroid examples show why the coincidence step must be proved rather than drawn into the picture.

On the explicit geometric profiles below, the checklist's coincidence version is a specialization of auxiliary construction. An ordinary added diagonal need not involve a phantom point, so the two profiles are not identical. This is a scoped comparison of proof patterns, not certification that every use of either raw source expression has exactly that full intended domain.

The project AUXILIARY-OBJECT tag still has only its own vocabulary evidence. The book's geometric examples do not define a universal cross-domain operation for that tag. Nor is every phantom construction necessarily a proof by contradiction: the source also uses positive construction and uniqueness.

## Exact participants and candidate-owned evidence

| Candidate | Frozen owned record | Evidentiary reach before this draft |
| --- | --- | --- |
| `RAW-LEGACY-auxiliary-object` — AUXILIARY-OBJECT | `E-RAW-LEGACY-auxiliary-object-schema` | A literal entry in the frozen SMMC method vocabulary; no complete operational meaning |
| `RAW-SOURCE-z-draw-auxiliary` — Drawing an Auxiliary Object | `E-RAW-SOURCE-z-draw-auxiliary-source` | Zeitz's strategy index explicitly lists the expression; original locator PDF 382 |
| `RAW-SOURCE-z-phantom-point` — Phantom Point | `E-RAW-SOURCE-z-phantom-point-source` | The same strategy index lists phantom point separately; original locator PDF 382 |

All three participants and their owned witness IDs are included. The two index records remain index records; the new body readings below do not silently broaden their admitted claims or alter Gate-3 UNRESOLVED measurements. Stronger formal use needs owner-specific supplemental evidence and acceptance.

## Sources inspected directly

The uploaded `S1-ZEITZ-2007-2E` artifact has 383 pages and SHA-256 `be9d5f2bd96e3010fc30b3d9dee191a787ad4624fffe20aa28cf7a3e73382565`. Its byte hash was checked again in this batch.

| Passage | Direct reading used |
| --- | --- |
| PDF 279, printed 262, section 8.2 | An auxiliary diagonal enables congruence; the discussion advises choosing useful objects sparingly |
| PDF 280, printed 263, Example 8.2.12 | Parallel constructions through a midpoint create $D',E'$; the proof identifies them with the given midpoints |
| PDF 293–295, printed 276–278, section 8.3 | Auxiliary lines in similarity arguments, and the centroid example's intersection/uniqueness role |
| PDF 299, printed 282, section 8.4 checklist | Separate entries for drawing auxiliary objects and constructing a point whose coincidence with an existing point is proved |
| PDF 309–310, printed 292–293, Example 8.4.6 | A pictured three-circle configuration, power-of-a-point comparisons and phantom second intersections |
| PDF 382, printed 365, strategy index | Auxiliary-object and phantom-point locators |

PDF 279, 280, 295, 299, 309 and 310 were rendered and visually inspected. Text for the listed passages was read directly. The coordinate reconstructions below use explicitly stated, fresh label conventions; they are not a transcription of every label/formula in the book's centroid discussion.

The [frozen project schema](https://github.com/Karuma-jojo/Chronological-Deck/blob/1a485cf7a2c495ab717cadee60a7762d96994f34/course/smmc/schema.mjs#L27-L38), already read at that exact commit in P04, supplies the literal tag. It supplies no theorem of geometry and no historical contest occurrence.

## Source observations and bounded profiles

The auxiliary-object passage follows a proof using diagonals. It offers a search strategy, not a deterministic procedure for finding the right line in every configuration. Its cautions concern relevance and diagram clutter. The next example deliberately avoids assuming the desired midpoint relation: it constructs parallel lines whose angle information is available and gives the new intersections different names until coincidence has been proved.

The centroid example again separates the intersection of two lines from the eventual common intersection of three. A uniquely specified division ratio on a particular median identifies the new intersection with the old one.

The later checklist states the coincidence pattern explicitly. The three-circle example also presents a contradiction-oriented use. That is an additional presentation, not a requirement that all phantom-point arguments begin by negating their goal.

| Profile on the inspected geometric scope | Trigger / input | Solver action | Mathematical output and obligation |
| --- | --- | --- | --- |
| Auxiliary-object construction | A configuration and a desired intermediate relation | Add a relevant line, point or other geometric object, then apply valid facts to the augmented configuration | New usable relations; the added object's existence and all deductions still need justification |
| Checklist's phantom coincidence pattern | A target point and a feature easier to construct than to establish directly at that target | Construct $P'$ with that feature, prove a characterization identifying $P'$ with the target $P$, then transfer the feature | $P'=P$ and the desired property at $P$; uniqueness/incidence conditions are essential |
| Contradiction-oriented phantom use | A proposed failure of coincidence/concurrency in a specified configuration | Work with actual well-defined intersections and derive an incompatible distinction | The assumed distinction fails; neither an impossible drawing nor an unjustified cancellation is evidence |
| Frozen project tag alone | A method-vocabulary retrieval label | No complete construction rule or domain is specified | Intended scope remains unestablished by its owned record |

These are developmental profiles. They do not create a final card, hierarchy or component-owner record.

## Mathematical reconstruction and attempted falsifiers

### M1. An auxiliary diagonal need not be a phantom-point construction

For an original ordinary-construction control, label a nondegenerate parallelogram **cyclically** as

$$
A=0,\quad B=u,\quad C=u+v,\quad D=v,
$$

with independent plane vectors $u,v$. Add diagonal $AC$. The two triangles $ABC$ and $CDA$ have equal corresponding side lengths: their side vectors give lengths $\lVert u\rVert,\lVert v\rVert,\lVert u+v\rVert$. Thus they are congruent by SSS.

This adds a useful segment between existing vertices and proves a relation. It does not construct a new point to be identified with an old one. It is a separating example for the two **stated operation profiles**, not a claim that the source calls every diagonal a new named technique.

### M2. A phantom midpoint must be identified, not presumed

Here is an author-supplied affine verification of the source's midpoint construction. It uses algebra rather than claiming the book uses coordinates.

Translate a nondegenerate triangle so $A=0$, write $B=u,C=v$, and require $u,v$ independent. The given midpoint of $AB$ is $F=u/2$. Construct the line through $F$ parallel to $BC$, and let its intersection with $AC$ be $E'$. Then

$$
E'=\frac{u}{2}+t(v-u)=sv.
$$

Independence gives $1/2-t=0$ and $t=s$, hence $t=s=1/2$. Therefore $E'=v/2=E$, the actual midpoint of $AC$.

Likewise, let the line through $F$ parallel to $AC$ meet $BC$ at $D'$. Writing

$$
D'=\frac{u}{2}+tv=(1-s)u+sv
$$

gives $s=t=1/2$, so $D'=(u+v)/2=D$.

The construction supplied the parallelism. The argument supplied the midpoint identification. It would be circular to label $E'$ as $E$ at the start and then treat the desired parallelism as already proved.

All three mid-segments now have half the lengths of the corresponding triangle sides. The four small triangles have the same three side lengths and are congruent by SSS. Their areas are each one quarter of the original area.

The nondegeneracy requirement gives unique intersections. With collinear data $A=(0,0),B=(2,0),C=(4,0)$, the line through $F=(1,0)$ parallel to $BC$ coincides with line $AC$. It has infinitely many common points, rather than a uniquely defined $E'$. This is a boundary to the construction, not a counterexample to the usual nondegenerate-triangle theorem.

### M3. A shared characterization proves centroid coincidence

Use the fresh convention $D=(B+C)/2$, $E=(C+A)/2$, $F=(A+B)/2$. Let $G$ be the intersection of medians $AD,BE$, and let $G'$ be the intersection of $AD,CF$. With $A=0,B=u,C=v$, solving the first intersection means

$$
\frac{t}{2}u+\frac{t}{2}v=(1-s)u+\frac{s}{2}v.
$$

Coefficient comparison gives $t=s=2/3$. Solving the second intersection in the same way again gives parameter $2/3$ on $AD$. Therefore

$$
G=G'=\frac{A+B+C}{3}.
$$

There is only one point at that parameter on the nondegenerate median. This is the coincidence argument: the third median does not receive concurrence merely by being drawn near the earlier intersection.

The source uses similarity and a division-ratio characterization. Our algebra independently verifies the intended uniqueness mechanism with one consistent label convention. It does not replace the book's proof with a new alleged source fact.

For all 496 ordered pairs $B,C$ from the integer grid $[-2,2]^2$ with $A=(0,0)$ and nonzero oriented area, the script checks the two midpoint constructions, four congruent subtriangles, centroid intersection coincidence, and the ordinary diagonal control. These are multiple checks on the same 496 inputs, not five independent collections of geometry problems. The formulas above provide the general arguments.

### M4. Coincidence requires a genuinely identifying condition

The positive proof pattern is:

1. Define a new object by a valid construction, checking existence and any uniqueness it needs.
2. Derive a condition that the new point and the target both satisfy in the **same specified locus**.
3. Prove that this condition has only one point in that locus.
4. Identify the points and transfer the constructed property.

The “same locus” qualification matters. An unsigned equality of distances from $X$ does not determine a point in the plane: with $X=(0,0)$, the distinct points $(1,0)$ and $(-1,0)$ have equal distance from $X$. On a fixed ray, by contrast, a fixed positive distance specifies one point. A fixed division parameter on a given segment is likewise identifying.

Thus an equality is not automatically a coincidence proof. The remaining incidence/ray/domain information is part of the operation's mathematical contract.

### M5. A controlled reconstruction of the circle phantom step

Write the power of point $X$ with respect to circle $i$ as

$$
p_i(X)=\lVert X-c_i\rVert^2-r_i^2.
$$

If $X$ is the finite intersection of two common-chord **lines**, each equality of powers gives

$$
p_1(X)=p_3(X),\qquad p_2(X)=p_3(X),
$$

so $p_1(X)=p_2(X)$. This power-equality statement does not require trusting the drawing.

For the phantom second-intersection presentation, impose the pictured kind of configuration explicitly: circles 1 and 2 have two common points $E,F$, and $X$ lies strictly inside both circles. The straight line $FX$ has second intersections $E_1,E_2$ with those circles. Both points lie on the ray from $X$ away from $F$. The chord-product identities give

$$
FX\cdot XE_1=-p_1(X),\qquad
FX\cdot XE_2=-p_2(X).
$$

For completeness, these signs follow by parametrizing the line by signed distance from $X$: the monic circle quadratic has the two signed intersection distances as roots, whose product is $p_i(X)$. Here the roots have opposite signs because $X$ is inside.

Since $FX>0$, equal powers yield $XE_1=XE_2$. The common ray makes that distance identifying, so $E_1=E_2$. It is the common intersection other than $F$, hence equals $E$. This proves that $F,X,E$ are collinear. No bent “false line” is used as an actual geometric object in this reconstruction.

Our original exact fixture has radius 2 for all three circles and centers

$$
c_1=(2,0),\quad c_2=(0,2),\quad c_3=(1,2).
$$

Every pair intersects twice. The first two radical-axis equations give $X=(1/2,1/2)$, whose power is $-3/2$ for all three circles. Circles 1 and 2 share $F=(0,0)$ and $E=(2,2)$. Direct second-intersection calculations along $FX$ give precisely $E_1=E_2=(2,2)$.

The fixture is original, not a digitization of the book's diagram or an additional historical occurrence.

### M6. Pairwise circle intersections alone do not guarantee finite concurrence

This scope test prevents extending a pictured construction without its existence conditions. Take three radius-2 circles with collinear centers

$$
(0,0),\quad(1,0),\quad(2,0).
$$

Every pair intersects in two points, since each center distance is positive and less than 4. Subtracting circle equations shows that their common-chord lines are

$$
x=\frac12,\qquad x=1,\qquad x=\frac32.
$$

They are distinct parallel lines, with no finite common point. Thus deleting the finite-intersection condition invalidates a universal concurrency claim. This example lies outside the source's pictured configuration; it is not presented as a refutation of the pictured proof.

For a correctly scoped broader **line** lemma, circle equations have the form $x^2+y^2+u_i x+v_i y+w_i=0$. The difference of two power functions is linear. If two radical axes are nonparallel, their unique intersection satisfies all three power equalities by transitivity, so it lies on the third axis. Pairwise actual circle intersections are unnecessary for this line statement; when there are no intersections, the axes should not be called actual common chords.

The script checks that line lemma on 108 nonparallel triples drawn from 12 explicitly specified real circles. It separately checks the genuine crossing-circle phantom fixture and the parallel-axis counterexample. It also verifies the elementary boundary $0\cdot1=0\cdot2$ with $1\ne2$, reminding us why cancellation in M5 required $FX>0$.

## Alternatives and research recommendations

| Comparison or proposed boundary | Serious alternatives / test | Bounded finding |
| --- | --- | --- |
| Auxiliary construction / checklist's phantom coincidence pattern | Full aliases; a construction family and a specified proof pattern | Under the explicit profiles, adding the phantom point is an auxiliary construction, while an ordinary diagonal supplies a construction without coincidence. This supports a proper specialization **on that stated convention**, not automatic full-domain candidate certification |
| Phantom point / proof by contradiction | Necessarily the same strategy; optional contradiction presentation; positive uniqueness argument | The midpoint construction and centroid characterization support positive coincidence proofs; the later circle example also supports a contradiction-oriented presentation. A mandatory-contradiction definition is too narrow |
| Separate book index entries | Mathematical distinction; different instructional emphasis; overlapping uses | Separate entries alone decide none of these. The body constructions and obligations supply the useful comparison |
| Project AUXILIARY-OBJECT / book geometric strategy | Intended match; a wider cross-domain family; several project uses; unresolved tag | The schema record supplies only the label. A wider intended domain cannot be imported from mathematical familiarity |
| Drawing / completed proof | A useful search aid; established mathematical construction | A drawing can suggest the point or line. Existence, incidence, nondegeneracy and coincidence still require proof |

The provisional recommendation is to preserve the source-bounded hierarchy hypothesis and its separating example, while making the coincidence/uniqueness obligation explicit. The three raw candidates receive no formal MERGE, PARENT_CHILD, SPLIT, COMBO or primary disposition in this draft. In particular, the project tag is not rejected merely because its owned evidence is thin.

## Reproduction, remaining questions and ledger state

Run:

    python3 docs/smmc/arsenal-public-research/P06-P07-mathematical-checks.py

P07 controls passed: 496 nondegenerate triangle inputs with the stated midpoint, congruence, centroid and diagonal checks; the coincident-line boundary; 108 nonparallel radical-axis triples; the exact crossing-circle fixture; the parallel common-chord counterexample; and the distance/cancellation boundaries. General proofs and configuration assumptions are stated independently of the finite checks.

The first author draft investigates the full registered option and all three participants. Independent mathematical review, full intended candidate scopes/grain, and admission of stronger owner-specific observations remain open. Source records and Gate-3 measurements stay unchanged.

All 661 production cases remain PENDING, with zero primary dispositions and zero formal relations. No source authentication pin, seed, cohort, formal Calibration PASS or Gate 4 graduation is produced.
