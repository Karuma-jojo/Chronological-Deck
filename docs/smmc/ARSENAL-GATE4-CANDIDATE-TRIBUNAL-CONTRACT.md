# SMMC Arsenal — Gate 4 Candidate Tribunal Contract v0.3

**Status:** `REVISED DRAFT v0.3 — INDEPENDENT EXACT-HEAD CONTRACT REVIEW REQUIRED`  
**Gate state:** Gate 4 `READY TO OPEN`; **no calibration, mass adjudication, canonicalization, or later-gate work is authorized by this draft.**  
**Proposed repository path:** `docs/smmc/ARSENAL-GATE4-CANDIDATE-TRIBUNAL-CONTRACT.md`  
**Parent repository:** `Karuma-jojo/Chronological-Deck`  
**Original draft:** 2026-10-21; **bounded contract repair:** 2026-10-22.  
**Review chain:** v0.1 adversarial review (`G4-C01`, `G4-C02`, `G4-N03`–`G4-N05`; reviewed artifact SHA-256 `644c9dfa12edf4f22c6cecb225856dec4d2c160258a9db0043222d39d32ef8ac`); v0.2 adversarial review (`G4-R01`, `G4-R02`, two nonblocking validator/calibration checks; reviewed artifact SHA-256 `10d71fc12c21adb19188f7315a79e4111e2ad359c3b00712396fa7e8b816c1b9`). See `SMMC-Gate4-v0.1-Independent-Adversarial-Review.md` and `SMMC-Gate4-v0.2-Independent-Adversarial-Review.md`.**  
**Change scope:** Bounded **v0.2 → v0.3 contract-only** repair of the comparison-domain test and graduation/amendment rule, plus three targeted consistency fixtures. No predecessor edits, calibration decisions, candidate verdicts, executable validator, or Gate 5+ artifact.  
**Authority:** Proposal for independent review, **not** a retroactive modification of any frozen Gate 0–3 artifact.

## 0. Exact ancestry, sources of truth and status interpretation

Gate 4 begins only from the accepted *contents* of Gates 0–3, not from their pre-closure status banners. Some frozen files intentionally retain historical text such as “review candidate”; the later reviewed acceptance/merge records settle their final gate status. **Do not edit historical banners in frozen files merely to make them read as closed.**

| Gate | Scope inherited | Independently accepted source SHA | Merge / integration SHA |
| --- | --- | --- | --- |
| 0 | Historical corpus exposure and protection | `37cd46553ebccc6f5fa47b45beb2bf4ad3381251` | `761023355678bc9088236e79bc12e68aa5107cb6` |
| 1 | Canonical sources and evidence contract | `3052b8c53dd9e8bd598f51bc8423470086776625` | `1a485cf7a2c495ab717cadee60a7762d96994f34` |
| 2 | Raw candidate/evidence harvest | `ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7` | `7600dd377192aafe6ca777636d94474736ea4e4f` |
| 3 | Granularity diagnostic and its mass application | `147e602b32c34ffa4dfe1401e39bc0484e35f948` | `252e6160fe82308fcd2449b023bd3eccf8444c3d` |

Gate 3's final independent PASS is recorded in [PR #186, review 6295761083](https://github.com/Karuma-jojo/Chronological-Deck/pull/186#issuecomment-6295761083); its freeze/merge verification is in [closure 6295890907](https://github.com/Karuma-jojo/Chronological-Deck/pull/186#issuecomment-6295890907). The reviewer reported byte-identical preservation of the 24 changed PR files, and three successful post-merge workflows at the integration SHA.

**Inherited authoritative files (read-only):**

- Gate 0: `docs/smmc/ARSENAL-GATE0-CORPUS-PROTECTION.md`, `course/smmc/runtime/exposure.mjs` and protected historical learner flows.
- Gate 1: `docs/smmc/ARSENAL-GATE1-RESEARCH-CONTRACT.md`, `docs/smmc/ARSENAL-SOURCE-REGISTER-v1.md`, `course/smmc/arsenal/canonical-sources-v1.mjs`, `course/smmc/arsenal/evidence-contract-v1.mjs`.
- Gate 2: `docs/smmc/ARSENAL-GATE2-RAW-CANDIDATE-HARVEST.md`, `course/smmc/arsenal/candidates-v0.mjs` and its eleven frozen source/provenance blobs. The accepted raw-harvest semantic/provenance SHA-256 is `f947742d48b46a45d3a49d86e334123f752fcd28dccf351b7e7114ddcf08861f`.
- Gate 3: `docs/smmc/ARSENAL-GATE3-GRANULARITY-CONTRACT.md`, `docs/smmc/ARSENAL-GATE3-MASS-PASS-REPORT.md`, `course/smmc/arsenal/granularity-contract-v1.mjs`, `granularity-ledger-v0.mjs`, `granularity-mass-pass-v1.mjs`, and the frozen 127-official-case semantic adjudication and bundle audit artifacts.

**Input population, not an output target:** 661 frozen raw candidates and 661 Gate-3 assessments (45 fixed calibration + 616 mass); the 616 include 118 accepted official-role overlays and 498 unchanged nonofficial mass assessments. These numbers define required **input coverage**, not canonical Arsenal size. Gate 3 diagnoses 12 bundles and reports 25 normalized duplicate-name groups, including 14 with differing diagnostic signatures. None is a tribunal decision.

## 1. Gate 4's single question

> **Given each accepted raw candidate as expressed, its legitimate evidence, and comparisons with other candidate expressions, what *provisional treatment* should the future ontology research investigate or carry forward?**

Gate 4 is a **candidate-adjudication proposal layer**, not a canonical ontology or combo graph. It evaluates independently useful identity, distinction, redundancy, compoundness, scope and potential exclusion while preserving counterarguments and provenance. Its outputs are *accepted tribunal recommendations for handoff*, not final canonical objects.

No fixed canonical count, final inventory, type hierarchy, navigation, rarity, importance weighting, learning order, or prerequisite graph is implied.

## 2. Strict authority boundary

### Gate 4 MAY

1. Compare multiple Gate-2 raw candidates and their own evidence records while preserving the identity of which record supports which claim.
2. Reuse the fixed Gate-3 measurements as **diagnostics**, not decision rules.
3. Propose a single **administrative primary routing disposition** under §3–§4A; retain *every independently evidence-supported additional mathematical relation* as a structured shared hypothesis under §4B, even if its relation class differs from the primary. Unsupported speculation belongs in contrary hypotheses, not asserted relation records.
4. Propose alias-equivalence, decomposition, containment or compound-structure hypotheses for examination at later gates.
5. Record insufficient evidence as a **review work state**, not as a made-up seventh disposition.
6. Create a separate Gate-4 synthesis/evaluation overlay; when necessary, inspect a registered canonical source anew under Gate-1 rules and place new evidence in a separately reviewed supplemental overlay. This may not modify or silently upgrade frozen Gate-2 claims.
7. Escalate an upstream factual defect or missing research coverage via a **separate amendment/reopen request**, never by changing a protected predecessor silently.

### Gate 4 MUST NOT

- Mutate Gate 0–3 accepted files or reinterpret old source/evidence IDs as if their frozen provenance had changed.
- Write `ontologyType` into the Gate-2 candidates or decide the final Foundation/Strategy/Proof Form/Tactic/Tool/Specialist hierarchy (reserved to **Gate 5**).
- Create canonical merge/split child IDs, irreversible canonical deletion, final alias tables, or final parent-child edges (reserved to **Gate 5**, subject to its contract).
- Establish true synergistic combination edges from co-presence or final Combo Lab objects (reserved to **Gate 8**).
- Establish hard/soft prerequisites or DAG edges (reserved to **Gate 6**).
- Make authoritative Battle/Discovery/Transfer matrices (Gate 7), rankings/curricula (Gate 9), transfer-validity claims (Gate 10 and learner studies), or UX/Forge/Boss/Arena objects (Gates 13–15).
- Convert a Gate-3 `DEPLOYABLE` label into ACCEPT, `MACRO` into SPLIT, `MICRO` into REJECT, `BUNDLED_MOVES` into COMBO, or `GENERAL` into evidence of observed Transfer.
- Promote a raw ledger tag, an index lead, source-book chapter title or mathematical familiarity into verified historical occurrence.

**Authority distinction:** Gate 4 can *recommend* `MERGE`, `SPLIT`, `PARENT_CHILD`, or `COMBO`; the final canonical structure requires later independent approval. A proposal can be rejected by the later gate without retroactively rewriting Gate 4.

## 3. Six provisional dispositions — no preselected winners

`ACCEPT`: Recommend carrying an expression forward as an independently distinguishable candidate for future ontology evaluation. **Not** final canonical acceptance, type assignment, training readiness, or product authorization.

`MERGE`: Recommend that two or more candidate expressions share a mathematical identity sufficiently strongly that a later gate should examine a canonical union. Must name all compared raw IDs, specify the proposed shared core, and establish identity **across each expression's evidence-supported intended deployment domain**, not just a convenient overlap of examples. Preserve genuine scope/source distinctions and test at least one non-equivalence possibility **outside any narrower overlap when the evidenced domains differ**. Similar words or agreement on a selected subdomain are insufficient.

`SPLIT`: Recommend decomposition of one overpacked expression into independently intelligible *proposed components*. Must identify distinct operations or mathematical roles, explain how each can be recognized or trained separately, and retain the original umbrella relationship. Components remain **descriptions or temporary review handles**, not minted canonical IDs.

`PARENT_CHILD`: Recommend a possible containment/generalization/specialization relationship between separately meaningful expressions. Must provide direction and a mathematical containment test or reason. Neither chapter nesting nor source category naming establishes an ontology hierarchy. **No final hierarchy edge yet.**

`COMBO`: Recommend investigating a *compound expression involving distinguishable moves* at Gate 8. Must name apparent constituent candidate IDs (or explicitly marked provisional component handles), identify what each contributes, and explain why this is a compound **hypothesis**, not automatically a verified synergy. Mere historical co-occurrence never suffices.

`REJECT`: Recommend not carrying the expression forward as a standalone ability **for a stated, evidence-supported reason** (e.g., opaque unsupported retrieval token, duplicated non-actionable label, non-ability metadata) while keeping the original raw record, evidence and rejected rationale permanently queryable. Rejection is not erasure or proof that the underlying mathematics lacks value. Thin evidence by itself is normally an **evidence hold** rather than REJECT.

A candidate receives **one administrative primary routing disposition** only after a reasoned comparison; that label **does not exhaust the mathematics** and is not a winner-take-all deletion of other supported relationships. Such relationships must live in a *separate shared relation-hypothesis register* (§4B) and be referenced by all involved cases. Unsupported or disputed alternatives remain traceable as contrary hypotheses. A candidate can be `PENDING`, `EVIDENCE_HOLD`, `PROPOSED`, `CHALLENGED`, or `REVIEWED_FOR_HANDOFF` under §6A. `EVIDENCE_HOLD` is **a work status, never a seventh disposition**, and must not be mass-converted into ACCEPT/REJECT. A Gate-4-owned unresolved treatment is a graduation blocker until **substantively resolved under Gate 4 or until a separately reviewed change to the *gate charter and success criteria* is accepted as a new, explicitly narrowed contract**; a candidate-specific review/waiver cannot satisfy the unchanged Gate-4 pass condition. Naming a later gate is never sufficient.

## 4. Adjudication test: mathematical identity, not a regex

For each case, ask and record:

1. **Expression and evidence:** What exactly does this particular raw label and *its own* source evidence establish? Is its evidence a verified SOURCE_FACT, a PROJECT_DERIVED retrieval signal, or a source-specific heuristic?
2. **Recognizability:** Is there a non-circular signature for knowing when a learner might use it? Is that signature expressed by accepted evidence, or only assumed from model familiarity?
3. **Independent operation:** Can the alleged candidate be performed meaningfully without automatically executing the proposed neighbor? What is the operation/output, if genuinely supported?
4. **Distinctive failure:** Is there a plausible *mathematical* condition or counterexample on which one candidate succeeds, fails, or behaves differently from another? Do not invent failure modes as source facts.
5. **Granularity:** How do the Gate-3 grain/bundle/action/boundary diagnostics limit confidence? A diagnostic mismatch is a review trigger, not a winner.
6. **Alternative hypotheses:** Could the pair be (a) synonyms, (b) parent/child, (c) two independent moves, (d) a composite, or (e) a label versus an operation? Explain why the preferred disposition beats a serious alternative.
7. **Downstream ownership:** Which question remains for Gate 5 (canonical identity/type/hierarchy) or Gate 8 (mathematical synergy)? If source evidence is inadequate, what *specific* allowed evidence could resolve it?

A proposed training distinction is a useful **test**, not a license for Gate 4 to author lessons or assert demonstrated learner mastery.

## 4A. Evidence tests and deterministic primary routing (G4-C01)

**Primary is an administrative routing label, not an exclusive mathematical truth.** Reviewers must first record the supported treatment hypotheses; the following ordered tests then determine the routing label *from the evidence*, not from preference or desired output counts. A supported secondary proposal is preserved under §4B regardless of routing. The preference order is only for a reproducible work queue and cannot pre-decide what Gate 5 or 8 will canonize.

**Operational decision tests:**

1. **MERGE versus PARENT_CHILD — full intended-domain test (G4-R01).** First derive each candidate's **evidence-supported intended deployment domain** separately from its own expression and admitted evidence, recording `domainA`, `domainB`, evidentiary locators, known exclusions and uncertainty. A reviewer may not shrink either domain merely to make the two expressions agree. Propose MERGE only when evidence supports equivalence of the mathematical role **throughout both intended domains** (their full supported scopes), including corresponding triggers, operations and outputs, after explicitly testing distinguishing instances from **both sides of any overlap**. An unexplained scope difference is not repaired by agreeing on a convenient shared subset. If one domain is evidenced as a **proper** specialization of the other, a MERGE proposal based only on their intersection is forbidden; test a directional PARENT_CHILD hypothesis with a supported containment explanation and a separating broader-domain input or condition. Example, synthetic only: “factor a polynomial” versus “factor a quadratic polynomial” may act alike on quadratic inputs; the former's intended domain also includes higher-degree polynomials, so their quadratic overlap does **not** justify MERGE. The narrower operation may justify PARENT_CHILD if supported by admissible evidence. A legitimate overlap-only equivalence may be recorded as a *scoped comparative observation* in the case's synthesis/limitations, **not** a full MERGE hypothesis. If the scope/identity relation cannot be responsibly established (including missing domain evidence), use a Gate-4-owned `THIN_CANDIDATE_EVIDENCE`/`CONFLICTING_EVIDENCE` hold and record falsifiable research actions. Proposed full identity is symmetric; proper containment is directional; neither becomes a final Gate-5 edge.
2. **SPLIT versus COMBO.** Propose SPLIT when the raw *expression's identity* packs **separable roles or actions** that can be meaningfully recognized/executed independently, and its wording/evidence does not itself establish a coherent jointly deployed technique. Propose COMBO when evidence identifies **distinct components and a specific operational coupling** (e.g., a sequencing dependency, one operation furnishing an input for the next, or a jointly defined construction); juxtaposition, a comma, or historical co-occurrence alone does not pass. Both hypotheses can be supported: then ask whether the raw expression primarily denotes separable parts (**SPLIT primary**) or the distinctive *joint action* (**COMBO primary**), citing the deciding evidence. If this cannot be settled from the evidence, keep a Gate-4 hold and both *nonfinal* alternatives; do not use Gate-3 `BUNDLED_MOVES` as a tie-break.
3. **ACCEPT versus REJECT.** ACCEPT means there is positive, candidate-owned evidence for a distinguishable mathematical role worth carrying into ontology investigation, not proof of future learner-facing status. REJECT means the current raw expression is affirmatively evidenced as non-actionable retrieval metadata, duplicate non-ability packaging, or other specified non-standalone material **after** checking for a source-supported underlying role. A `LABEL_ONLY` measurement is not sufficient for REJECT; a sparse chapter heading, familiar theorem name, or opaque tag with insufficient evidence normally requires hold, not REJECT. A genuine independent role is not rejected because it is also a specialization/part of a combo.

**Primary routing order after evidence tests:**

- If **full intended-domain equivalence under §4A(1)** is evidenced and requires cross-case reconciliation, use `MERGE` as primary for **every participant** in that single proposed equivalence group (none receives an arbitrary `ACCEPT` as group leader). **An overlap-only match or established proper specialization is not eligible for this precedence**. If the same candidate also has supported split, hierarchy or combo claims, record them as additional relations.
- Otherwise, if its **own expression is composite**, prefer `SPLIT` or `COMBO` by the identity-versus-coupling test above; preserve a supported competing COMBO/SPLIT relation in §4B.
- Otherwise, if evidenced **proper containment** is the main unresolved cross-case relation, use `PARENT_CHILD` for participating cases *unless another primary above already routes them*; record direction only in the shared relation.
- Otherwise, choose `ACCEPT` or `REJECT` by positive-evidence test. If any required comparison remains genuinely indeterminate, set primary `null` and `EVIDENCE_HOLD` (not a coin flip).

This order does not imply MERGE is mathematically more important than COMBO, nor that a composite could not survive as a standalone canonical item. Two reviewers disagreeing about a *mathematical test* must log a challenge, not quietly invoke the routing order to suppress disagreement.

**Illustrative non-decision:** Gate-3 `RAW-BRIDGE-070` is a bundle diagnostic only. Under Gate 4 it might receive a SPLIT hypothesis (clearing denominators; primitive-integer normalization) and a COMBO hypothesis if candidate-owned/new registered evidence establishes a genuine coupling. Either or both may be recorded. It is *not* pre-adjudicated here; whether the expression chiefly means the decomposition or the coupling must be argued case-by-case, otherwise held.

## 4B. Shared relation-hypothesis register (G4-C01)

There must be **one authoritative record for each exact proposed mathematical claim**, not independent per-candidate copies that can disagree. Its stable review-only `hypothesisId` is referenced from all participant cases, including a candidate whose primary disposition is something else. Hypothesis IDs and temporary component handles **never** become canonical ability IDs. For each record require:

```text
hypothesisId                       # stable, unique Gate-4 review hypothesis ID
relationKind                       # MERGE | SPLIT | PARENT_CHILD | COMBO
participantRawCandidateIds         # exact unique raw IDs; sorted when symmetric
localComponentHandles             # optional stable review-only handles owned by a split/compound case
componentDefinitions             # explicit owner, scope and distinct operation for each handle
conflictsWithHypothesisIds       # named conflicting alternatives; empty if no conflict
relationDirection                 # null for symmetric MERGE; typed parent->child, source->components, or composed-from for others
mathematicalClaim                 # exact full-intended-domain identity, proper containment,
                                  # decomposition or coupling; name raw-evidence-supported domains
                                  # for every proposed MERGE (overlap-only observations do not qualify)
supportEvidenceRecordIds          # source identity and original owning candidate retained
synthesisRecordIds                # Gate-1-valid PROJECT_SYNTHESIS + NONE; linked supports
counterEvidenceRecordIds          # empty only with an explicit documented search/null reason
nonEquivalenceOrCountertest       # attempted falsifier/differentiator and its outcome
limitationsAndScope               # doesNotEstablish, open boundaries, alternative interpretations
reviewStatus                      # PROPOSED | CHALLENGED | REVIEWED_FOR_HANDOFF
laterGateOwner                    # Gate 5 for ontology identity/hierarchy; Gate 8 for combo interaction
```

**Shared consistency invariants:** A MERGE record names at least two distinct raw IDs, is symmetric, has no canonical winner, and is present by reference in *every* named case. Every MERGE record must contain or resolve to both parties' evidence-supported **full intended domains** and a non-equivalence test beyond selected overlapping examples. Do not auto-mint a transitive claim (`A≈B`, `B≈C` does not *by software* certify `A≈C`). But **mathematical consistency still requires transitivity if A≈B and B≈C assert full equivalence on the same legitimately supported domain**: an independently supported A≠C witness in that same domain must mark at least one premise `CHALLENGED` and block handoff, rather than being dismissed as “no automatic transitivity.” A PARENT_CHILD record names an **ordered** broad/narrow pair and must not assert reverse containment absent explicit mutually challenged records; cyclic candidate-level parenthood is a challenge, not an accepted hierarchy. A SPLIT record has one source raw ID and two or more distinct local component handles/descriptions; a COMBO record names two or more distinct components and an evidenced interaction, not mere co-presence. **Every COMBO/relation record referring to a local component handle must include that handle's owning raw candidate ID among `participantRawCandidateIds`, and that owner case must reference the very same hypothesis.** No unowned or indirectly invisible component relationships are permitted in v0.3. Every used handle has a unique owner and definition; every referenced raw ID/evidence/synthesis ID exists; cross-case references point to identical `hypothesisId`/content. Contradictory unchallenged records, dangling handles, missing component owners, asymmetric MERGE references, or any participant omitting a supported relation **fail validation and block graduation**. Parallel conflicting hypotheses may coexist only in `CHALLENGED` status with explicit conflict links and adjudication work items, not silently both approved.

Relation proposals remain Gate-4 `PROJECT_SYNTHESIS` claims, not the Gate-5 canonical alias/hierarchy or Gate-8 confirmed synergy graph.

## 4C. Hold taxonomy and nondelegable Gate-4 questions (G4-C02)

A hold must carry a controlled `holdReason`, affected question, exact missing/contradictory evidence, candidate IDs, next falsifiable action, accountable owner, review history and an independently reviewable **scope classification** (`GATE4_OWNED`, `UPSTREAM_AMENDMENT_REQUIRED`, or `LATER_GATE_ONLY`). Allowed reason values:

- `SOURCE_IDENTITY_GAP`: canonical source ID/hash/locator is not settled; **Gate 4 cannot invent it**. Owner: Gate 1 source-amendment process if required; Gate 4 suspends its dependent decision.
- `THIN_CANDIDATE_EVIDENCE`: owned facts cannot support identity, distinctness or an evidenced treatment. Owner: Gate 4 targeted registered-source inspection/supplemental evidence, or explicit upstream Gate-2 amendment if the original candidate/evidence snapshot is defective.
- `CONFLICTING_EVIDENCE`: serious incompatible readings or source-specific meanings make a Gate-4 identity/disposition choice underdetermined. Owner: Gate 4 comparative research/independent challenge; *not* automatic Gate 5 deferral.
- `UPSTREAM_DEFECT`: accepted frozen data/measurement/contract appears inconsistent. Owner: separately reviewed amendment of the affected Gate 0–3 gate. Gate 4 **halts** dependent use pending disposition.
- `LATER_GATE_CANONICAL_CHOICE`: Gate 4 has already completed its **supported provisional treatment** and the remaining question is exclusively final alias/type/parent-child ontology (Gate 5) or proved mathematical combo interaction (Gate 8). It may accompany `REVIEWED_FOR_HANDOFF`, **not** replace an unresolved Gate-4 identity/treatment with an `EVIDENCE_HOLD` label.

**Hand-off admissibility:** For `LATER_GATE_ONLY`, the case must have an evidence-backed non-null primary, exact reviewed supporting/contrary hypotheses, all supported relation references, an explicit narrow remaining canonical question and a reviewer-certified explanation of why no Gate-4 evidence/disposition question remains unanswered. Its handoff owner is Gate 5 or 8 as appropriate. Generic “Gate 5 will decide” is invalid. An actual `EVIDENCE_HOLD` **always blocks graduation under the unchanged 661-case Gate-4 charter**, regardless of individual approvals, reviewer signatures, or future-owner assignments. Resolve it with admitted evidence and an independently reviewed treatment; do not substitute a scope-review certificate for the research answer.

**Amendment authority (G4-R02):** `scopeReviews` may correct a case's *ownership classification*, document a source/identity defect requiring a **proper upstream amendment**, or record the downstream-only residual after a completed treatment. Such records are **not waivers** and do not turn an unanswered Gate-4 question into `REVIEWED_FOR_HANDOFF`. A source defect blocks the affected case until the upstream repair is independently accepted and its consequences re-evaluated. If the intended Gate-4 **success criteria or population obligation** must materially change, open a **separate, independently reviewed gate-charter/success-criteria amendment**, with explicit excluded/reduced deliverables, all affected raw IDs, rationale, replacement exit tests and successor obligations. That new charter must be separately accepted *before* a different completion claim; it cannot be represented as an unqualified graduation under this unchanged contract. No candidate-specific exception can amend the 661-case exit test by accumulation.

**Adversarial mass-hold / mass-exception rule:** A population of 661 `EVIDENCE_HOLD` rows **must fail** graduation, even if each row carries an individual approval or a candidate-specific deferral. In fact **any** unresolved Gate-4-owned hold, challenged relation necessary for treatment, or upstream-blocked case fails full graduation under this charter. Synthetic counterexample: 661 candidate-specific signed “scope amendments,” zero supported primaries and zero completed cases **must fail**, not pass by 661 individually approved exceptions. There is no fabricated percentage quota; the standard is substantive completion of each inherited Gate-4 treatment obligation. Rechartering the gate is a separate governance action and cannot masquerade as an exception-based PASS under the old success criteria.


## 5. Evidence and comparison discipline

- Inherit the exact Gate-1 allow-list of `evidenceBasis × recordChannel × claimKind × verificationStatus` and canonical Source ID/hash/locator rules. **No unauthorized combination or ontologyType assignment.**
- Each decision separates (i) candidate-owned facts, (ii) comparison facts from other explicitly named candidates, and (iii) new `PROJECT_SYNTHESIS` with `recordChannel: NONE` and a linked support chain. No borrowed fact silently becomes a fact about another candidate.
- A researcher may inspect canonical PDF passages for Gate-4 analysis **only with exact registered edition/artifact identity and auditable locators**. Record source-backed observations separately, with `doesNotEstablish` and no excessive verbatim copyrighted text. If the new observation would change frozen Gate-2 historical facts or Gate-3 measurement semantics, stop and request a separately reviewed upstream amendment instead of correcting silently.
- `SOURCE_LEAD` or general knowledge may motivate a question, but cannot settle a canonical research claim. Changes to the source register require the Gate-1 amendment mechanism.
- The 127 official solution-occurrence records have verified Battle roles under their own exact claims; that **does not** certify other raw candidates as Battle evidence. A method that could solve a historical problem is not thereby an official historical occurrence.
- A polished official solution cannot establish the discovery route the original solver actually used. Historical frequency, co-presence, and difficulty/rarity proxies cannot determine identity or disposition.
- No manufactured Transfer evidence. Transfer requires a fresh, unprompted, route-unseen learner attempt; same-task delayed work is retention, not Transfer.
- **Learner-exposure boundary (G4-N05):** an AI/reviewer reading canonical official source material in a separate authoring context is **not automatically learner exposure**. A learner personally opening official solutions/papers through repo URLs, local PDFs, admin views or other off-platform channels **can** affect historical freshness even if the Gate-0 browser code saw nothing. Do not assert it was recorded automatically. The future Gate-14 Boss and Gate-15 Arena workflows must provide an explicit honest self-report/manual contamination/reconciliation path, conservative inventory exclusion where uncertain, and tests preserving Gate-0 monotone recording and isolation; until then treat out-of-band exposure as a documented risk, not pristine proof.
- Preserve honest `UNRESOLVED` in Gate-3 fields. Its presence is a reason for targeted investigation, not a decision defect to be papered over.

## 6. Proposed review overlay — not yet a frozen executable schema

**Do not append these fields to** `candidates-v0.mjs` or `granularity-ledger-v0.mjs`. Proposed new review-only representation, to be frozen only after contract and calibration review:

```text
tribunalCaseId                # stable review ID
candidateId                   # existing exact raw ID, 1:1 anchor
rawNameSnapshot               # exact frozen name
rawOriginSnapshot             # exact frozen origin
rawEvidenceRecordIds          # candidate-owned references
comparisonCandidateIds        # explicitly named other raw IDs, if any
comparisonEvidenceRecordIds   # supporting others' evidence kept separately
frozenGate3SnapshotRef        # exact row locator/digest, not an editable copy
workStatus                    # PENDING | EVIDENCE_HOLD | PROPOSED |
                              # CHALLENGED | REVIEWED_FOR_HANDOFF
proposedPrimaryDisposition    # six §3 values; null only during PENDING/HOLD or unresolved CHALLENGED
holdReason                    # §4C taxonomy or null
scopeClassification           # GATE4_OWNED | UPSTREAM_AMENDMENT_REQUIRED | LATER_GATE_ONLY | null
nextEvidenceOrAction          # falsifiable action and exact expected support if held
scopeReviewRecordId           # independent ownership/amendment-process audit record or null;
                              # never a waiver of Gate-4-owned treatment
candidateOwnedFacts           # locators + limited paraphrases
comparativeFacts              # per-source/candidate separation
synthesisRecordIds            # valid Gate-1 PROJECT_SYNTHESIS links
hypothesis                    # mathematical identity/structure claim
contraryHypotheses            # strongest alternative(s)
triggerOperationOutputAnalysis # source-bounded, no fabricated detail
nonEquivalenceOrCountertest   # attempted distinction, or reason unavailable
relationHypothesisIds        # references to shared authoritative §4B register (all supported relations)
scopeLimitations              # uncertainty, notEstablished, deferrals
handoffOwners                 # named future gates; explicit unresolved work
reviewerFindings              # objections, resolution, exact reviewed version
rationale                     # why proposal is best *under evidence*
```

The old free-form `provisionalRelationProposals` field is **not allowed** in this revised schema; §4B shared relation records are authoritative for proposal identity and consistency. This block is a **contractual minimum interface**; implementation must make it executable before calibration. The executable schemas must close over **exact allowed keys**, field types, enum values, unique stable IDs and `null` semantics; schema changes after review require another contract/calibration acceptance. Do not implement an improvised flexible schema and let it become authoritative by usage.

### 6A. Mandatory lifecycle and executable protections (G4-N03)

- Allowed transitions: `PENDING → EVIDENCE_HOLD | PROPOSED`; `EVIDENCE_HOLD → PROPOSED | CHALLENGED` after cited new evidence; `PROPOSED → CHALLENGED | REVIEWED_FOR_HANDOFF`; `CHALLENGED → EVIDENCE_HOLD | PROPOSED`; `REVIEWED_FOR_HANDOFF` is terminal within a reviewed version and can change only by an explicit versioned reopen/review event. Never silently overwrite history or skip status review.
- `PENDING` must have null primary; `EVIDENCE_HOLD` must have null primary, a recognized non-`LATER_GATE_CANONICAL_CHOICE` hold reason and a specific next action; `PROPOSED` and `REVIEWED_FOR_HANDOFF` must have a valid non-null primary and verified evidence chain; `CHALLENGED` must retain contested alternatives and explicit objections (primary may be null if withdrawn). `REVIEWED_FOR_HANDOFF` asserts **completed Gate-4-scope treatment and independently checked relation consistency**, not canonical ontology or synergy acceptance.
- Exactly **661 raw IDs = 661 Gate-3 measured IDs = 661 Gate-4 case anchors**, with no extras/duplicates, exact frozen raw names/origins, exact original candidate-owned evidence lists, and an immutable Gate-3 row identity/digest. No candidate may disappear because its recommendation is REJECT or a hold.
- Minimum separate read-only anchored objects: `cases`, `relationHypotheses`, `supplementalEvidence`, `scopeReviews`, and `statusHistory`. Each must have fixed allowed keys/ID namespace and no dangling references. The minimum namespace convention is `G4-CASE-<rawCandidateId>`, `G4-HYP-<stable-token>`, `G4-EVID-<stable-token>`, `G4-SCOPE-<stable-token>`, and `G4-TMP-<case-token>-<component-token>`; **handles are never new canonical candidate IDs**. The reviewed calibration contract must specify stable-token normalization and uniqueness before use.
- Supplemental source observation and synthesis records must pass the Gate-1 evidence admissibility matrix. Every new `SOURCE_FACT` requires a registered canonical Source ID, exact digest/locator and its own `doesNotEstablish`; every new synthesis record must cite specific accepted evidence IDs via `linkedRecordIds`, with candidate ownership preserved. Comparison evidence is never silently transferred into another candidate's frozen record.
- Guard all 11 Gate-2 frozen Git blob pins, the accepted Gate-2 semantic/provenance SHA-256, Gate-3 original calibration and overlays, and Gate 0/1 artifact identity. Validator must prove no protected predecessor file was modified and no final ontology/alias-table/DAG/combo graph/importance/product output is emitted.
- Negative fixtures **before calibration** must reject: arbitrary unknown schema keys; 660/662 cases; duplicate/wrong raw ID; a made-up source hash; a synthetic changed Battle claim; a null primary in `REVIEWED_FOR_HANDOFF`; a hold recoded `LATER_GATE_CANONICAL_CHOICE`; dangling component; missing symmetric MERGE participant; contradictory unchallenged directions; bogus Gate-5 owner used for Gate-4 uncertainty; a 661-hold graduation attempt **and a 661 individually approved scope-deferral graduation attempt with zero treatment answers**. Additional mandatory adversarial tests: (a) **general polynomial factorization vs its quadratic specialization** may agree on every tested quadratic but must not be declared MERGE on quadratic-only scope; (b) genuinely full-domain equivalent aliases with the **same** evidenced intended scope remain eligible for symmetric MERGE; (c) A≈B, B≈C (all same full scope) alongside a supported A≠C witness produces `CHALLENGED`, not silent transitivity avoidance; (d) a COMBO using a foreign temporary handle without its owner raw ID/case reference must fail. These are synthetic protocol fixtures, **not** new Arsenal adjudications. CI establishes structure only; independent mathematical attack remains mandatory.
- Exact field types/serialization and test harness may be implemented in a **separately reviewed contract/calibration implementation step**, but **no calibration adjudication begins** until these minimum checks are executable, independently adversarially tested and accepted. Prose by itself is insufficient.

## 7. Calibration before full Tribunal

The contract reviewer should require a precommitted **heterogeneous calibration sample**, chosen for *stress coverage* without selecting desired disposition counts. At minimum include:

- `Recast / Change Your Point of View / cross-domain translation`: synonym vs general strategy vs specific translation.
- `Small Cases / experimentation`: operation versus discovery umbrella.
- `Minimal Counterexample / Descent`: proof structure, extremal method, or genuinely distinct techniques.
- `Contrapositive / Contrapositive Proof / DIRECT`: source-rich proof form versus opaque ledger label; **do not expand DIRECT from model memory**.
- `Chinese Remainder Theorem` from thin source index versus any richer occurrence (if present): same name, different evidentiary reach.
- `Graph Theory / Graph Reformulation / matrix-to-graph translation`: topic/family versus deployable transformation versus composite.
- `Auxiliary Object / construction / normalization / substitution / make it easier`: overbroad umbrella versus concrete move.
- A verified official `BUNDLED_MOVES` example, a source-defined term (`Crux Move`), and a deliberately `UNRESOLVED` Gate-3 row.
- At least one exact duplicate-name group whose Gate-3 signatures differ and one proposal whose best answer is **evidence hold**.

Before selecting any calibration judgments, publish a deterministic sampling protocol (exact candidate-pool SHA, PR commit, inclusion rules and public seed/hash) plus a **held-out challenge allocation independently selected by the reviewer** and hidden from builder tuning until the procedure is frozen. Ensure coverage across every raw origin, evidence-rich/evidence-thin same-name pairs, source-scope conflicts, **full-intended-domain MERGE versus overlapping-scope proper specialization**, same-scope equivalence consistency (no unexamined contradiction of transitivity), temporary component-owner closure, directional containment and cycles, standalone vs compound formulations, a SPLIT+COMBO dual hypothesis, and at least one legitimate hold. Pre-register identifiers and review selection without preselecting disposition frequencies. If the builder tunes the protocol to a held-out failure, the reviewer must reseat a genuinely unseen held-out set under a newly frozen seed/selection record; rerun all regressions. For each case the reviewer tries falsifiers and distinguishes the recommendation from a serious alternative. Approval is not a vote for convenient counts. Repair the **contract or procedure** if it systematically classifies prematurely; re-review the exact head before any 661-case mass pass. This is a **calibration-stage acceptance requirement** (G4-N04), not authority to begin calibration today.

## 8. Mass-pass execution and consistency audits (future; not authorized yet)

If a separate independent reviewer accepts this contract *and then* a heterogeneous calibration on its own exact SHA:

1. Generate exactly one case anchored to each of 661 frozen raw candidate IDs, preserving raw records unmodified.
2. Surface pairwise duplicate names, near-synonyms, family/submove ambiguities and compounds without automatically deciding them; explicitly audit the 25 previously reported normalized duplicate-name groups and the 14 differing-signature groups, but do **not** assume they are exhaustive.
3. Require source-backed rationale and alternative-disposition analysis on every proposed case; cross-reference all linked IDs and block dangling references or undefined temporary handles.
4. Maintain one authoritative *review-hypothesis record* (not a canonical ability) per exact claim; require all participant cases to refer to the same ID; detect conflicting reciprocal proposals, **overlap-only MERGE attempts**, accidental automatic transitive MERGE closure **and contrary same-scope A≠C witnesses to two asserted full-scope equivalences**, cyclic suggested containment and inconsistent cross-case group membership. A conflict becomes `CHALLENGED` and blocks handoff until addressed rather than being silently normalized by union-find or string matching.
5. Enforce full intended-domain/symmetric MERGE participant/reference consistency, directional parent-child and source-to-component semantics for split/compound hypotheses, **mandatory inclusion of all referenced temporary-component owning raw IDs in relation participants and reciprocal case references**, and preservation of supported secondary relations even when another primary routes the case.
6. Audit the 12 Gate-3 diagnostic bundles without assuming all are Gate-4 COMBO or SPLIT; audit broad LABEL_ONLY/MACRO entries without default rejection.
7. Report counts by raw origin, each *proposed* disposition, challenges, work status and §4C hold category; report each hold's independently classified **scope owner**, action, review evidence and whether it blocks graduation. Also report relation-hypothesis counts independently of primary labels; no relation disappears because it is secondary. These are measured **outputs**, never targets.
8. The handoff keeps rejected records and every rival hypothesis searchable; no final canonical IDs, types, DAG or combo graph are emitted.

If mass adjudication reveals a missing canonical source, a frozen candidate omission, a Gate-3 inconsistency or a new CROSS_SCALE interpretation, **STOP** and request the appropriate explicit earlier-gate amendment. Do not backfill frozen evidence or secretly expand the candidate pool.

### 8A. Graduation debt ledger and scope audit (G4-C02, G4-R02)

A future candidate-mass report must provide the following **three disjoint substantive case classes plus one separately counted downstream annotation**, not a single “661 reviewed” figure. It must additionally list `PENDING`/`CHALLENGED` as unfinished workflow states when present. No per-candidate amendment/waiver constitutes a fourth graduation class:

1. **Completed Gate-4 provisional treatments:** non-null evidence-backed primaries with all supported relations captured, independently checked for cross-case coherence, and no unresolved Gate-4-scope questions.
2. **Gate-4-owned evidence holds:** thin/contradictory source-bounded research or undefined identity/disposition; **these block graduation until substantively resolved**. Candidate-specific waivers/review certificates cannot move them into the completed class.
3. **Upstream-defect blocked cases:** exact affected IDs, frozen-source or contract defect, amended-gate owner, and status; **these block graduation** until the correct *upstream* amendment is accepted and dependent case(s) substantively revisited. A request or approval to fix an upstream file is not itself a Gate-4 treatment.
4. **Downstream-only canonical questions:** completed Gate-4 recommendations carrying specifically named Gate-5 identity/type or Gate-8 synergy verification questions. These can hand off because the provisional Gate-4 question is already answered; they are **not** counted as unresolved Gate-4 evidence holds.

The report must reconcile all 661 raw IDs exactly once in the disjoint **substantive case partition** (completed treatment / Gate-4-owned hold / upstream-blocked), with any `PENDING`/`CHALLENGED` workflow states separately marked as not completed and reconciled against case IDs. **No formally amended exception bucket exists under this charter.** Category (4) is **a separate annotation only on completed treatment cases**; publish its count separately. Scope-review and upstream-amendment records are provenance/ownership events, **not substitute treatments**. Each such record must specify the affected exact raw IDs, disputed question, approver/review decision, immutable accepted version, permitted procedural effect and successor obligation; validator rejects unversioned prose exemptions. Independent reviewers must challenge every claimed downstream-only question and verify treatment completion. A mass-hold or mass-waiver substitution fails regardless of documentation polish. Under the unchanged 661-case charter **full Gate-4 graduation requires 661 completed Gate-4 treatments and zero unresolved/blocked cases**, as a consequence of the per-ID obligation, **not** a target for disposition frequencies. A separately accepted reduced-scope charter must use its own modified success-criteria claim; it may not borrow this one.

## 9. Gate-0 exposure obligation register — historical closure versus future feature completion

The **frozen Gate-0 contract** accepted corpus-protection controls, not finished Boss/Arena systems. The runtime schema in `course/smmc/runtime/exposure.mjs` already has persisted per-problem `statementSeenAt`, `materialHintSeenAt`, `solutionSeenAt`, `evaluatorSeenAt`, `domainMetadataSeenAt`; paper-level `paperOpenedAt`, `solutionOpenedAt`, `attemptedAt`, `arenaConsumedAt`; attempts with an `assistance` category and optional 0–7 `attemptScore`. Gate 0's acceptance tests cover protected synopsis/research/paper reveals, isolation, fail-closed durable writes, merge coherence and pristine inventory. **Schema capability is not proof that a future end-to-end gameplay flow exists.**

| Requirement | Status based on frozen contract/runtime | Named future owner / acceptance point |
| --- | --- | --- |
| Isolated statement/research exposure, official full-paper warning and contamination; pristine East-paper inventory | **Gate 0 accepted** within its tested UI scope | Gate 0 regression inheritance for every later UI change |
| Persistent per-problem and per-paper state; stronger-to-weaker normalization; monotone merge; fail-closed reveal; timezone-correct ordering | **Gate 0 accepted** within its tested paths | Gate 0 regression inheritance; reopen Gate 0 for an identified regression |
| Historical attempt schema, assistance categories, optional 0–7 scores | **Primitives exist**; not a claim of Boss/Arena orchestration | Gate 14: attempt recording, scoring/assistance interpretation and evidence validity |
| Boss zero-feedback attempt, loadout prediction, crux, 0–7 evaluation, delayed retake and post-attempt evidence | **Not completed by Gate 0's scope** | Gate 14: Boss evidence prototype, manual/off-platform historical-solution exposure declaration and adversarial non-leak test |
| Full paper timed Arena consumption, solver-facing metadata isolation and trustworthy pristine/fresh inventory eligibility | **Not completed by Gate 0's scope** | Gate 15: Arena workflow, manual/off-platform exposure disclosure, conservative freshness reconciliation and protected-browser tests, after Gate 14 |
| Forge first-time recognition, unprompted transfer and evidence classification on new neutral tasks | **Not completed by Gate 0's scope** | Gate 13: small Forge prototype; Gate 14–15 verify Boss/Arena analogues |

**Gate 4 owner:** preserve exposure guards and this obligation register; **do not implement gameplay**. If a requirement in the original Gate-0 mandate is found not to be covered by its accepted tests, file a scope-gap issue describing the exact missing behavior, evidence and owner. Assign it to a future gate only if doing so does not weaken an existing Gate-0 invariant; otherwise request a Gate-0 amendment. No phrase like “Gate 0 closed” substitutes for that analysis.

## 10. Independent adversarial contract-review checklist — REQUIRED before calibration

A reviewer other than the builder should fetch the proposed exact PR head plus the accepted Gate 0–3 artifacts and decide **PASS / CHANGES REQUIRED** with candidate-/clause-specific evidence. This draft has **not** received that review.

Minimum attack obligations:

1. **Ancestry:** verify all accepted SHAs, eleven frozen Gate-2 blobs/digest, 45 calibration rows, 661 IDs and accepted Gate-3 semantic overlays; reject any silent upstream mutation.
2. **Semantic non-leak:** locate any provision allowing a Gate-4 proposed `MERGE`, `SPLIT`, `PARENT_CHILD` or `COMBO` to turn into final Gate-5 or Gate-8 canonical state without an independent later decision.
3. **Evidentiary discipline:** challenge source-rich versus thin identical labels, cross-candidate evidence borrowing, source-book chapter headings, project tags, verified official use, compatibility-only arguments, and noncanonical references.
4. **Dispositions:** demand a real mathematical criterion and counter-hypothesis for each of the six; attack forced choices where evidence genuinely warrants `EVIDENCE_HOLD`. Independently reproduce §4A precedence for MERGE vs PARENT_CHILD, SPLIT vs COMBO and ACCEPT vs REJECT, including `RAW-BRIDGE-070` without pre-adjudicating it.
5. **Fail-closed behavior:** try an opaque token, conflicting proposed merge group, fake child ID, unsupported ontology type, cyclic suggested parenthood, co-presence-only COMBO, and synthetic evidence with an altered official claim.
6. **Gate 0 debt:** compare the original learner-exposure requirement with the frozen Gate-0 acceptance contract/runtime; flag missing functionality and test ownership; do not retroactively claim Boss/Arena completion.
7. **Completeness:** verify that later full-mass checks cannot discard a rejected candidate, double-count a raw ID, silently fill missing decisions with default ACCEPT/REJECT, suppress a secondary supported relation, declare 661 holds passed merely by assigning Gate 5 as owner, **or graduate 661 individually signed candidate-specific deferrals with zero completed treatments**. Validate full-domain MERGE tests, same-scope consistency, component-owner closure, shared symmetric/directional relation ledger, exact keys/status transitions, and held-out calibration plan.
8. **Authority and reproducibility:** check no preselected final card count, hierarchy, source ranking, rarity, scalar importance metric, learner mastery, or navigation architecture; identify the exact acceptance and freeze procedure.

The independent review should return an itemized blocker register with severity, clause, reproduction or mathematical counterexample, acceptable repair boundary, and exact reviewed commit SHA. The author may repair **only the rejected contract/calibration scope** and must obtain a fresh exact-SHA review before progressing.

## 11. Proposed Gate-4 pass condition and protected closure (not active until contract acceptance)

Gate 4 may graduate only after **all** of the following have been independently verified:

- Contract accepted first on an exact reviewed SHA; **separate** mixed calibration accepted before mass adjudication.
- Every one of the frozen 661 candidate IDs has exactly one preserved case anchored to the exact raw/evidence/measurement snapshot, and **all 661** are `REVIEWED_FOR_HANDOFF` with independently supportable, non-null evidence-backed provisional primaries and no unanswered Gate-4-owned treatment question. There is **no candidate-specific exception alternative**. `PENDING`, `EVIDENCE_HOLD`, `CHALLENGED`, upstream-blocked states, signed scope-review waivers or blanket later-gate-owner labels **do not graduate**. No defaults. The only way to change these fundamental criteria is a separately independently approved **gate-charter/success-criteria revision with explicitly changed scope and newly reviewed exit conditions**, which must be called a **modified-scope** graduation, never the unqualified PASS under this contract.
- All source/evidence/cross-case references resolve; source claims pass the inherited Gate-1 matrix; no frozen Gate 0–3 bytes or semantic pins were changed.
- No opaque label was made mathematically concrete from memory alone; no duplicate merger was justified only by a normalized string; no combo was asserted from co-occurrence alone.
- All supported MERGE/SPLIT/PARENT_CHILD/COMBO relationships survive in validated shared hypotheses, regardless of primary routing. MERGE proposals must withstand whole-intended-domain comparison; contradictory same-scope equivalences and unowned temporary handles block graduation. Contradictions, core duplicate identity uncertainty and Gate-4-owned challenges are **substantively resolved under Gate-4 evidence/tests**, not waived with reviewed candidate-specific exceptions; only the *final* canonical ontology/combo decision may remain downstream. Naming Gate 5/8 does not itself resolve Gate-4 research.
- Full reports include the §8A disjoint case partition, independent hold/scope audit, the reviewed relation inventory and its contradictory-claim checks, proposed disposition counts, failed alternatives, rejected/held candidates, provenance and exact Gate-5/Gate-8 residual canonical questions. No canonical graph or final source rank is authored.
- Exact-head SMMC authoring, frontend integrity and T22 atomic checks are green; an **independent graduation reviewer** reports no remaining Gate-4-scope blocker.
- Acceptance binds to the exact implementation SHA. Freeze the accepted tree and merge by the project’s separately verified exact-head procedure. Gate 5 remains locked until this closure succeeds.

**Branch protection note:** the Gate-3 closure reported `main`'s GitHub `protected=false`. Independent exact-SHA review, blob comparisons, merge-commit preservation and CI are real controls, but they are **not** a platform-enforced protected-branch rule. Branch protection should be evaluated independently before later merges; do not call it already enforced.

## 11A. Independent review repair traceability

| Review finding | v0.2/v0.3 repair locus | Acceptance stage |
| --- | --- | --- |
| `G4-C01` (blocking) | §4A deterministic mathematical comparisons/administrative routing; §4B shared relation registry; §6A and §8 consistency checks | **Independent contract exact-head review**; independently attack again during calibration |
| `G4-C02` (blocking) | §4C controlled hold reasons, nondelegable Gate-4 work, candidate-specific amendment rule; §8A disjoint debt audit; §11 stronger graduation | **Independent contract exact-head review**, and final tribunal graduation audit |
| `G4-N03` | §6/§6A minimum schema, status transitions, IDs, negative fixtures and frozen pins | Mandatory executable validator and **independent acceptance before calibration**, not merely documentation |
| `G4-N04` | §7 preregistered seed/protocol and reviewer-held-out adversarial cases | Mandatory independent calibration acceptance before mass pass |
| `G4-N05` | §5 exposure distinction and §9 future Boss/Arena ownership | Gate 14–15 functional tests; Gate-0 regression inheritance |
| `G4-R01` (v0.2 blocker) | §3, §4A and §4B full intended-domain MERGE test; §6A/§7/§8 mandatory scope and transitivity fixtures | **Fresh independent contract exact-head review**; executable and held-out checks before mass pass |
| `G4-R02` (v0.2 blocker) | §4C removal of candidate-specific waivers; §8A three-class accounting; §11 all-661 completed exit test, separate gate-recharter route | **Fresh independent contract exact-head review** and final graduation audit |
| v0.2 nonblocking consistency tests | §4B same-scope transitivity challenge; temporary component-owner closure; §6A amendment provenance | Executable negative fixtures and independent calibration attack |

This v0.3 draft implements **no calibration cases, validators, tribunal decisions, ontology changes or GitHub merge**. Acceptance must cite a new exact PR-head SHA; neither the v0.1 nor v0.2 file hashes/reviews approve this revised text.

## 12. Immediate next authorized work

1. Place **this contract draft only** on a new scoped Gate-4 branch/PR (if repository authoring is approved).
2. Have an independent reviewer attack §0–§11 against the frozen repository artifacts.
3. Repair any review-proven contract defects, obtain fresh exact-SHA acceptance, and freeze the **Gate-4 contract**.
4. **Only then** design and review a deliberately heterogeneous calibration; do not adjudicate 661 rows now.

**STOP: This document is a v0.3 bounded contract-repair proposal responding to the independent v0.2 CHANGES REQUIRED review. It does not approve itself, authorize calibration, adjudicate candidates or start the Candidate Tribunal mass pass.**