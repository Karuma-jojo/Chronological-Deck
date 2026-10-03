# SMMC Arsenal — Gate 3 granularity contract

Status: **CALIBRATION IN PROGRESS — Gate 3 open; tribunal / ontology / prerequisite / ranking gates remain closed**

Accepted Gate-2 parent:
- independently accepted exact SHA: `ab94f22f32c8ee8e05ae56969bb78a8bcc505ae7`
- preserved on `main` through merge commit: `7600dd377192aafe6ca777636d94474736ea4e4f`
- frozen raw pool: **661 candidates / 661 evidence records**

Gate 3 does **not** reopen Gate 2. No more harvesting is permitted inside this gate.

## 1. What Gate 3 is trying to learn

The raw pool intentionally contains ore at many scales:

- broad areas such as `GRAPH`, `ODE`, or `Groups`;
- source-authored category words such as Zeitz's Strategy / Tactic / Tool;
- proof schemas such as Direct Proof;
- reusable moves such as Adjacent-Swap Improvement;
- highly local historical moves;
- explicitly bundled bridge phrases;
- ambiguous shorthand inherited from the old ledger.

Gate 3 asks only:

> **At what grain is each raw candidate currently expressed?**

It does **not** ask whether the item survives, what its final type is, which names are aliases, or how it should be taught.

## 2. Diagnostic reference unit

For measurement only, Gate 3 uses this reference unit:

> A **deployable mathematical move** is a reusable deliberate move for which a learner can identify a recognizable trigger, execute one coherent primary operation, and obtain a meaningful mathematical output or piece of progress.

This is a ruler, **not an ontology**.

A future Arsenal may intentionally contain objects above or below this scale. A Gate-3 `DEPLOYABLE` result is not a keep decision; `MICRO` is not a delete decision; `MACRO` is not a split command.

## 3. Orthogonal granularity dimensions

Every reviewed raw candidate receives the following independent measurements.

### A. `referenceScale`

- `MICRO` — narrower than the diagnostic move; usually a local substep, instance, or context-dependent supporting fragment.
- `DEPLOYABLE` — approximately one coherent reusable move at the diagnostic scale.
- `MACRO` — broader than one move; typically a family, area, level, or umbrella that can contain multiple deployable moves.
- `CROSS_SCALE` — the current expression is demonstrably multi-grain in one of two ways only: **(a)** it packages independently meaningful moves at more than one grain, or **(b)** a source-defined role/label is explicitly stated to occur at more than one grain. The second case does **not** imply a bundle.
- `UNRESOLVED` — the available accepted evidence and raw wording do not support a responsible scale call.

These are measurements of the **current candidate expression**, not claims about what the mathematics “really is.”

### B. `bundleStructure`

- `SINGLE_PRIMARY_MOVE`
- `BUNDLED_MOVES`
- `UNRESOLVED`

A proof may contain many internal algebraic steps and still count as one primary move. `BUNDLED_MOVES` is reserved for wording that actually packages independently meaningful operations.

### C. `actionShape`

- `EXPLICIT_ACTION` — **lexical/current-expression test only**: the candidate wording itself directly states an action, normally through an imperative/verb phrase or an action gerund such as “split…”, “analyze…”, “diagonalize…”, or “clearing denominators…”.
- `IMPLICIT_ACTION` — the current expression is noun-like/compressed but denotes an operation that the candidate-owned accepted evidence makes recoverable. Evidence may justify that an operation exists, but it does not convert noun-like wording into `EXPLICIT_ACTION`.
- `LABEL_ONLY` — the current expression names a topic, theorem, family, fact, proof category, or source category without itself specifying an operation. A theorem can therefore be `LABEL_ONLY` while still being approximately deployable in scale.
- `UNRESOLVED` — even the action-shape distinction is not supportable from the accepted candidate expression/evidence.
- `UNRESOLVED`

This is not an ontology type. For example, a theorem can be `LABEL_ONLY` as phrased while still becoming an excellent future tool.

### D. `contextReach`

- `GENERAL` — current wording is reusable across problems/domains without essential dependence on one source instance.
- `SOURCE_LOCAL` — the wording is tied to a particular source treatment or specialized representation, even if it might later generalize.
- `PROBLEM_LOCAL` — the current expression depends on one historical problem/route context.
- `UNRESOLVED`

This is **not Transfer evidence**. It measures semantic dependence of the wording, not observed learner transfer.

### E. Confidence

`confidence` means **confidence in the Gate-3 assessment**, not confidence in the underlying mathematical truth, source, or historical occurrence.

- `HIGH` — strong confidence that the recorded granularity dimensions are the best supported reading of the current candidate expression under the accepted evidence.
- `MEDIUM` — some meaningful ambiguity remains, but the recorded assessment is still preferable to the alternatives.
- `LOW` — genuinely tentative calibration call; more than one assessment remains plausible and the row should receive extra reviewer attention.

A row may be `UNRESOLVED + HIGH`: that means high confidence that **unresolved is the correct assessment** under the available accepted evidence. Conversely, a familiar theorem name may receive LOW confidence if the accepted source row is too thin to pin down its exact grain.

### E. Trigger / operation / output boundaries

Each receives:

- `CLEAR`
- `PARTIAL`
- `ABSENT`
- `UNRESOLVED`

Questions:

1. **Trigger:** can we say what kind of situation invites the move?
2. **Operation:** can we say what the solver deliberately does?
3. **Output:** can we say what immediate mathematical object, simplification, bound, contradiction, representation, or progress the move produces?

These boundary tests are what keep Gate 3 from collapsing into vague “feels too broad” judgments.

## 4. Evidence discipline

Gate 3 inherits the accepted Gate-1 contract.

A reviewed granularity row must cite at least one evidence record already attached to that exact Gate-2 candidate. Gate 3 does not upgrade source claims and does not create fake Battle/Discovery/Transfer evidence.

The granularity assessment itself is a project analysis of the accepted candidate expression and its accepted evidence.

Rules:

- official SMMC solution records remain exactly `SOURCE_FACT + BATTLE + HISTORICAL_OCCURRENCE + VERIFIED`;
- source-book terminology remains source terminology;
- old ledger tags remain project-derived retrieval/index evidence;
- `contextReach: GENERAL` is **not** a claim of learner Transfer;
- model familiarity with a named theorem is not a substitute for the accepted source record;
- if accepted evidence is too thin, use `UNRESOLVED`.

## 5. Hard wall around later gates

Gate 3 may **not** write or infer any of the following as a decision:

- final ontology type;
- aliases;
- merge groups or merge targets;
- split targets / child candidate IDs;
- keep/drop decisions;
- rank, rarity, importance, or difficulty;
- hard or soft prerequisites;
- parent/child relations;
- combo relations or synergy graphs;
- learning order;
- Forge / Boss / Arena representation;
- final learner-facing card representation;
- Crux representation.

The executable contract rejects fields that would leak those decisions into a Gate-3 record.

A Gate-3 rationale may explain why wording is broad, narrow, bundled, or ambiguous. It may **not** say “merge X into Y,” “split into A/B,” or “drop this.”

## 6. Raw-pool immutability

The 661 accepted Gate-2 candidates are the fixed population for Gate 3.

The Gate-3 ledger is an overlay. It must prove:

- exactly 661 granularity rows;
- exactly one row per accepted raw candidate ID;
- exact candidate-name and origin snapshots;
- no unknown or missing candidate IDs;
- every cited evidence ID belongs to that candidate;
- Gate-2 candidates/evidence remain unchanged;
- no additional harvest is performed.

If Gate 3 discovers that some mathematical concept is missing, that observation is **not** permission to append it here. It belongs in a separately justified reopen/amendment process after this gate.

## 7. Calibration before mass review

Before classifying all 661 rows, the builder must calibrate the ruler on a deliberately mixed set containing:

- legacy method shorthand;
- broad secondary/content tags;
- bridge bundles;
- audit-note route leads;
- verified official solution moves;
- source-authored category terms;
- proof structures;
- named theorems/tools;
- explicit discovery heuristics;
- at least one `MICRO`, `DEPLOYABLE`, `MACRO`, `CROSS_SCALE`, and `UNRESOLVED` example.

The repaired calibration ledger reviews **45** candidates and leaves the remaining **616** explicitly `UNREVIEWED`.

This is deliberate. We do not auto-classify the remaining 618 from string patterns.

## 8. What the first calibration is testing

The calibration intentionally includes awkward cases:

- `DIRECT` remains `UNRESOLVED` because the frozen legacy tag gives only shorthand.
- `GRAPH`, `ODE`, `Groups`, and Engel's `Graph Theory` are macro labels, even though graph/ODE/group methods may later yield excellent abilities.
- Zeitz's `Strategy`, `Tactic`, `Tool`, and `Crux Move` are measured as source category expressions; this does not adopt Zeitz's taxonomy.
- `Adjacent-Swap Improvement Argument` and Velleman's conjunction-goal split are clean deployable moves.
- the audit-note `Recoverability Lemma` is now deliberately **UNRESOLVED in grain** because its candidate-owned index evidence supplies only the label; its `PROBLEM_LOCAL` reach comes only from that record's explicit historical-problem attachment.
- `Positivity of Squares (x² ≥ 0)` supplies the independent `MICRO + GENERAL` anchor: a reusable fact narrower than a complete deliberate move.
- `Smallest Nondivisible Multiplier Advances Prime Support` supplies an independent `DEPLOYABLE + PROBLEM_LOCAL` anchor, demonstrating that semantic reach and grain are orthogonal.
- `Clearing denominators and primitive-integer normalization`, `Combining Techniques`, and row-replacement-plus-cofactor expansion test explicit bundles.
- `Chinese Remainder Theorem` tests a named theorem that is approximately deployable in scale while still being `LABEL_ONLY` as phrased; its calibration confidence is deliberately LOW because the accepted source row is a TOC-level terminology fact rather than an operational exposition.
- the official Dilation–Derivative Boundedness Bootstrap tests a historically coherent route that still contains multiple meaningful operations.

The point is not to make these 43 sacred. The point is to make the ruler attackable before it touches all 661 candidates.

## 9. Gate-3 graduation criteria

Gate 3 is not complete until:

1. the granularity contract survives independent adversarial review;
2. the calibration cases survive a bounded attack on the definitions and edge cases;
3. all 661 accepted candidates have exactly one `REVIEWED` row;
4. every reviewed row passes the executable contract and cites candidate-owned evidence;
5. every `UNRESOLVED` scale call has a substantive rationale rather than silent guessing;
6. the final distribution is mechanically reported by origin and by granularity dimensions;
7. an adversarial sample checks consistency across duplicate-looking names from different sources without merging them;
8. no Gate-2 mutation or Gate-4+ leakage is present;
9. exact-head CI is green;
10. an independent reviewer accepts the exact SHA.

Only then may the next tribunal/adjudication gate open.

## 10. Current state

`Gate 0 ✅ → Gate 1 ✅ → Gate 2 ✅ → Gate 3 🟡 CALIBRATION → later tribunal/ontology/prerequisite/ranking gates 🔒`

Gate 3 has started. No candidate has yet been merged, split, deleted, typed, ranked, prerequisite-linked, or related.
