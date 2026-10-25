# P05 — CRT theorem, official use and project bridge scope

**PUBLIC_DEVELOPMENT_ONLY — author research draft; independent mathematical acceptance pending.**

Author: Codex, the builder/research author. Date: 2026-10-26, Asia/Kolkata. Production baseline: `5660936a21c4fc48763ba863ca113265a358984c`; preceding public research head: `ce8f957fa3f8a40dd2ee502da6374fa8033b5eab`. Authority: the [v0.4 operating amendment](../ARSENAL-GATE4-STEP3-OPERATING-AMENDMENT-v0.4.md). Question: `CRT_THIN_RICH_SCOPE`, its complete three-candidate option.

## Research answer

The inspected Putnam and Beyond passage states and proves CRT for arbitrary pairwise coprime integer moduli greater than one. The official 2023 C1 invocation fits those hypotheses with moduli $2,3,5$. Its congruence alignment is a correct instance of that theorem. A separate challenge with the composite moduli $4,9,25$ confirms why the general theorem is not limited to three prime moduli.

The contest argument also needs a coverage reduction and finite counting. In particular, the problem's restrictions initially place each colour in a **subset** of a residue class. To optimize empty cups, one may fill that entire class without violating the restriction. That saturation argument justifies the full-class model used before invoking CRT. It does not follow from the pairwise colour restrictions alone.

The project bridge record reports that the frozen ledger names CRT as a bridge need. It does not acquire the official historical occurrence or the book's theorem specification merely because all three names match. Conversely, the single official application is not evidence that its named theorem has an intended domain confined to that one puzzle. The mathematical instance relation is supported; a final full-domain candidate alias or specialization still needs an explicit scope convention and admitted owner-specific evidence.

## Exact participants and candidate-owned evidence

| Candidate | Frozen owned record | Evidentiary reach before this draft |
| --- | --- | --- |
| `RAW-BRIDGE-090` — Chinese remainder theorem | `E-RAW-BRIDGE-090-01` | Project-derived index signal at frozen `course/smmc/ledger-2023.mjs`, line 137, for SMMC-2023-C1 |
| `RAW-OFFICIAL-011` — Chinese Remainder Theorem | `E-RAW-OFFICIAL-011-source` | Verified official historical occurrence: the solution explicitly invokes CRT in a congruence construction; original locator PDF 17 |
| `RAW-SOURCE-p-crt` — Chinese Remainder Theorem | `E-RAW-SOURCE-p-crt-source` | Original locator PDF 8, section 5.2.7: the book has a dedicated subsection |

All three participants and their owned witness IDs are retained. A contents-page record does not silently gain the theorem's body, and the bridge's index signal does not become a Battle record. The new readings and deductions in this draft require the existing supplemental evidence process before stronger formal use.

The accepted Gate-3 measurements are unchanged. In particular, its unresolved trigger on the official row reflects that row's narrower admitted claim; this draft's additional reconstruction is not an unrecorded edit to that measurement.

## Sources inspected directly

| Source | Identity and locator | What was inspected |
| --- | --- | --- |
| `S5-GELCA-ANDREESCU-2007` | Uploaded Putnam and Beyond, 807 pages; SHA-256 `143c74f8267984e34a6f260d1e20c51cd63e7e73c499161f85c4981e0f620fba` | PDF 8, contents; PDF 282–283, printed 268–269, section 5.2.7: statement, construction, general solution and exponent example; PDF 284, printed 270, adjacent exercises |
| `S0-SMMC-SOLUTION-2023` | [Official 2023 solutions](https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2023solutions.pdf), PDF 17, Problem C1; canonical registry says 23 pages and SHA-256 `446d9d19f962e9bbc727422be6a5c1de62fcf0fc3d0cf424494861d7eb7d832c` | Live official PDF text for the problem and solution |
| `S0-PROJECT-LEDGER` | [Frozen 2023 ledger](https://github.com/Karuma-jojo/Chronological-Deck/blob/1a485cf7a2c495ab717cadee60a7762d96994f34/course/smmc/ledger-2023.mjs#L127-L141) | The C1 entry, especially line 137's bridgeNeeds list and the adjacent project audit note |

The uploaded book bytes were rehashed; PDF 282 and 283 were rendered and visually inspected. The official text was inspected through the primary competition site; its live binary was not downloaded and rehashed in this batch, so the table reports the **existing frozen pin**, not a fresh authentication claim. No successful visual inspection of official PDF pixels is claimed. The frozen project ledger was fetched at its exact commit; its file blob is `f61f55d0cbf4c8b96af131a244dc25d0dec3d2a6`.

Historical-priority and cryptography claims adjacent to the book subsection are outside this investigation.

## Source observations

The book specifies integer residues, pairwise coprime positive moduli greater than one, existence, and uniqueness modulo their product. Its proof gives an explicit inverse-sum construction. The following example chooses exponents so several expressions become prescribed perfect powers; it is not a cup-counting problem.

The official problem restricts same-colour cup numbers modulo $2,3,5$. The solution invokes CRT to align the classes, counts empty positions using units modulo $30$, and obtains $538$. Its full-class model requires the saturation justification reconstructed below.

The project entry lists CRT alongside other bridge needs and supplies an authorial audit note about its role. Those are project assertions and retrieval leads, not independent source authentication, proof of prerequisite necessity, or evidence of a learner's transfer.

## Source-bounded operation profiles

| Expression | Recognizable input | Operation visible in the new reading | Output and scope limit |
| --- | --- | --- | --- |
| Book CRT | Integer residues $a_i$ with pairwise coprime moduli $m_i>1$ | Form the product, obtain modular inverses, combine compatible residue coordinates | One integer residue class modulo $\prod_i m_i$; no optimization objective is supplied |
| Official CRT invocation | Three colour-class residues after a justified coverage reduction | Align the residues with one shift $x$ using CRT | A common congruence shift. Identifying/counting uncovered cups requires further number theory and finite-window reasoning |
| Frozen project bridge | A label attached to the C1 project entry | No complete theorem hypothesis check or deployment procedure is specified by the owned index claim | A named bridge need; intended operational scope is not established |

The full official proof uses several functions, but that does not automatically turn its harvested CRT label into a compound candidate. Likewise, the book's explicit construction does not license importing all of it into the bridge record.

## Mathematical reconstruction and attempted falsifiers

### M1. The theorem's complete stated input contract

Let $m_1,\ldots,m_k>1$ be pairwise coprime integers, and let $a_i\in\mathbb Z$. Write

$$
M=\prod_{i=1}^{k}m_i,\qquad M_i=M/m_i.
$$

Pairwise coprimality gives $\gcd(M_i,m_i)=1$, so there is an integer $b_i$ with $M_i b_i\equiv1\pmod{m_i}$. The source construction is

$$
x_0=\sum_{i=1}^{k}a_i M_i b_i.
$$

For any fixed index $j$, every summand except the $j$th is divisible by $m_j$, while the $j$th is congruent to $a_j$. Thus $x_0$ solves all congruences. If $x$ is another solution, every $m_i$ divides $x-x_0$; pairwise coprimality implies their product divides the difference. Conversely, $x_0+Mt$ solves all congruences for every integer $t$.

This reconstructs both existence and the complete solution class. “Unique solution” means one residue class modulo $M$, not one integer. Residues may be negative or unreduced. A choice of inverse does not matter modulo $M$.

As an original deployment beyond the official moduli, impose

$$
x\equiv3\pmod4,\qquad x\equiv4\pmod9,\qquad x\equiv7\pmod{25}.
$$

All three moduli are composite, but pairwise coprime. The construction uses coefficients $225,100,576$ and gives

$$
x\equiv3(225)+4(100)+7(576)\equiv607\pmod{900}.
$$

The script independently enumerates all residues over one complete period before checking the construction. It checks every residue tuple for $(2,3,5)$, $(3,4,5)$ and $(4,9,25)$: $30+60+900=990$ systems, plus 64 negative/unreduced-residue cases and period shifts.

### M2. Coprimality cannot simply be omitted

Our original inconsistent system

$$
x\equiv1\pmod2,\qquad x\equiv0\pmod4
$$

has no solution. The compatible noncoprime system

$$
x\equiv1\pmod4,\qquad x\equiv3\pmod6
$$

instead has $x\equiv9\pmod{12}$, giving two representatives $9,21$ modulo the product $24$. Thus unrestricted existence and product-modulus uniqueness both fail after deleting the theorem's hypothesis.

For clarity, the following two-modulus extension is an **author deduction**, not a claim that the inspected book passage states a generalized CRT. For positive $m,n$, put $d=\gcd(m,n)$. A common solution requires $d\mid(b-a)$. Conversely, write $x=a+mt$ and divide the remaining congruence by $d$:

$$
\frac{m}{d}\,t\equiv\frac{b-a}{d}\pmod{n/d}.
$$

If $n/d>1$, the coefficient is invertible modulo $n/d$, giving exactly one $t$ class; if $n/d=1$, that constraint is automatic. The resulting $x$ class has period $m(n/d)=\operatorname{lcm}(m,n)$. This proves the compatibility criterion and the correct period for two moduli.

The script exhausts all residue systems for $2\le m,n\le12$, totaling 5,929 systems, by direct search over each complete least-common-multiple period. Of these, 3,294 have coprime moduli and also match the inverse-sum construction. These finite controls supplement the argument; they do not extend the source-owned claim by themselves.

### M3. The book's exponent application is a different deployment task

The source considers $x_i=iS$ for $i=1,2,3,4$, with

$$
A=\sum_{i=1}^4 i^2=30,\quad
B=\sum_{i=1}^4 i^3=100,\quad
C=\sum_{i=1}^4 i^5=1300,\qquad
S=A^mB^nC^p.
$$

The three sums have the following factor exponents:

| Sum | Exponents of $(A,B,C)$ | Sufficient divisibility target |
| --- | --- | --- |
| $\sum_i x_i^2$ | $(2m+1,\,2n,\,2p)$ | All divisible by 5, to obtain a fifth power |
| $\sum_i x_i^3$ | $(3m,\,3n+1,\,3p)$ | All divisible by 2, to obtain a square |
| $\sum_i x_i^5$ | $(5m,\,5n,\,5p+1)$ | All divisible by 3, to obtain a cube |

Solving the resulting three congruence systems gives the author-computed residues

$$
m\equiv12,\qquad n\equiv15,\qquad p\equiv10\pmod{30}.
$$

In particular, take $m=12+30j,n=15,p=10$ for every integer $j\ge0$. Each displayed target divisibility holds. Dividing the relevant exponents by $5,2,3$ explicitly produces the three integer perfect-power roots. As $j$ increases, $S$ strictly increases because $A>1$, so this gives infinitely many distinct positive solutions.

This is a sufficient construction, not a classification of all solutions. It does not require $A,B,C$ themselves to be coprime: divisibility of each displayed exponent is sufficient even when the bases share factors. The script checks four actual positive solutions using exact integer arithmetic, in addition to the general construction above.

### M4. Original verification of the periodic coverage model

Consider the colour restrictions as a coverage problem on $1,\ldots,N$. If a colour occurs, all its occupied numbers lie in one residue class modulo its assigned modulus: fix one occurrence and compare every other occurrence with it. Fill every number in that same class with that colour. This preserves all same-colour restrictions and can only reduce empty positions. If a colour is absent, choose any class for it and fill that class.

Therefore every allowed configuration has a saturated configuration with at most as many empty cups. Conversely, each saturated configuration is allowed. The optimum over all arrangements equals the optimum over the residue-class choices; no assumption of full occupancy has been smuggled into the initial restrictions.

For moduli $2,3,5$, CRT gives a common shift $x$. A number is uncovered exactly when

$$
2\nmid(n-x),\quad3\nmid(n-x),\quad5\nmid(n-x),
$$

equivalently $\gcd(n-x,30)=1$. This last equivalence uses the prime divisors of $30$, not CRT alone.

The unit residues are

$$
U=\{1,7,11,13,17,19,23,29\}\pmod{30}.
$$

Their successive cyclic gaps are $6,4,2,4,2,4,6,2$. Consequently every six consecutive integers contain a unit; two disjoint six-position blocks show that every 13-position block contains at least two. The interval from $24$ through $36$ has exactly the two unit positions $29,31$, so the lower bound is attained.

More generally, for $N=30q+r$ the minimum uncovered count in this model is

$$
8q+\min_{s\in\{0,\ldots,29\}}
\sum_{i=0}^{r-1}\mathbf1_{\gcd(s+i,30)=1}.
$$

Every shift in the minimum is realizable by an allowed residue-class choice. For $N=2023=30(67)+13$, the value is $8(67)+2=538$. Choosing $x\equiv7\pmod{30}$ makes the tail correspond to $24,\ldots,36$; the colour residues are then $1$ modulo $2$, $1$ modulo $3$, and $2$ modulo $5$.

The script checks all 30 saturated choices against the direct colour-membership condition at all 2,023 positions, totaling 60,690 membership comparisons. It also enumerates all 30 length-13 windows and checks the general minimum formula for every size $0,\ldots,120$. The saturation and gap arguments above provide the reduction and lower-bound proofs.

### M5. A theorem can transfer while a later shortcut fails

Return to pairwise coprime composite moduli $4,9,25$. CRT still aligns arbitrary residue classes, as M1 demonstrates. But after alignment, an uncovered position need only avoid divisibility by those three whole moduli. It need not be coprime to their product.

For example, with $n-x=2$, none of $4,9,25$ divides the difference, yet $\gcd(2,900)=2$. Thus replacing coverage by the unit condition fails in this altered problem, although CRT itself remains valid. This is an original transfer countertest, not a claim that the competition source makes that extension.

The lesson for scope is specific: distinguish the CRT alignment from the prime-factor unit test, periodic counting, and finite optimization. Shared use of a theorem does not automatically identify the whole surrounding solution workflow.

## Alternatives and research recommendations

| Comparison | Serious possibilities | Finding and remaining boundary |
| --- | --- | --- |
| Book theorem / official invocation | Same general named theorem; an instance linked to a general ability; a narrowly documented application | The official congruences satisfy the book theorem's hypotheses. The composite-modulus challenge establishes wider mathematical applicability. One occurrence does not settle the official candidate's entire intended ability scope |
| Project bridge / book theorem | An intended exact theorem reference; a broader instructional bridge; unresolved label | The ledger names the need but its owned index record lacks the theorem contract. A likely intended match is a research hypothesis, not imported provenance |
| Project bridge / official occurrence | A bridge motivated by that use; a separate learning requirement; unresolved intended operation | Both point to C1, but a project assertion does not become official usage or proof that every solution requires CRT |
| CRT / the whole cup solution | A component operation inside a larger workflow; an excessively broad candidate interpretation | Alignment, saturation, unit recognition and counting have distinct proof obligations. Co-use does not establish a new compound or authorize a split |

The provisional mathematical recommendation is to retain the exact pairwise-coprime CRT kernel as the leading shared interpretation, preserve the official application as its own occurrence, and leave the bridge's owned evidentiary limitations explicit. A source role difference alone is not a mathematical specialization. A final alias, parent-child, split or compound recommendation needs a fully stated candidate scope, sufficient owned evidence and independent acceptance.

## Reproduction, remaining questions and ledger state

Run:

    python3 docs/smmc/arsenal-public-research/P04-P05-mathematical-checks.py

P05 controls passed: 990 complete pairwise-coprime residue tuples, 64 negative/unreduced residue cases, 5,929 complete two-modulus compatibility systems, the inconsistent/product-period boundaries, the composite-modulus transfer challenge, four exact positive book-example solutions, all 30 periodic coverage choices, 60,690 cup-membership comparisons, and all sizes $0,\ldots,120$ for the minimum formula.

The first author draft investigates the full registered option and all three participants. Open work is independent mathematical review, full intended scope/grain, and admission of stronger owner-specific observations where formal use needs them. The live official text reading does not mint a new authenticity pin or replace the frozen source record.

No production source record, Gate-3 measurement, candidate primary or formal relation is changed. All 661 production cases remain PENDING. No seed, cohort, formal calibration result or Gate 4 graduation is produced.
