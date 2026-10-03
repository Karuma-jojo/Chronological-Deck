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
- `MACRO` — broader than one deployable move. This includes families/areas/umbrellas **and bundles of multiple same-grain or not-proven-different-grain moves**. If the evidence only establishes “more than one operation,” use `MACRO + BUNDLED_MOVES`; do not infer mixed grain.
- `CROSS_SCALE` — reserved for cases where mixed grain is itself supported: **(a)** the accepted candidate expression/evidence explicitly supports components at different reference grains, or **(b)** a source-defined role/label is explicitly stated to occur at more than one grain. A bundle is not CROSS_SCALE merely because it contains several operations.
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
- `LOW` — genuinely tentative **among assessments that are already supported by the accepted candidate-owned evidence**; more than one supported reading remains plausible and the row should receive extra reviewer attention.

A row may be `UNRESOLVED + HIGH`: that means high confidence that **unresolved is the correct assessment** under the available accepted evidence. `LOW` is never permission to fill a dimension that the evidence does not support. Thin evidence still forces `UNRESOLVED` on the unsupported dimensions.

### F. Trigger / operation / output boundaries

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

Gate 3 currently operates in **strict candidate-owned Gate-2 evidence mode**.

For each candidate, Gate 3 may use only:
- the accepted raw candidate expression itself; and
- the accepted evidence record IDs already attached to that exact candidate.

Gate 3 does **not** inspect a frozen canonical PDF beyond what the candidate-owned Gate-2 evidence record itself establishes, and it does not use general mathematical familiarity to fill missing semantics. If richer source inspection is ever allowed, that would require a later explicit contract amendment plus an auditable Gate-3 analysis locator; it is not part of this calibration or the planned mass pass.

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

## 5A. Fail-closed record schema

Every Gate-3 row must contain **exactly** the allowed record keys defined in `ARSENAL_GATE3_RECORD_KEYS`. Unknown keys are rejected.

This means a future commit cannot quietly add fields such as `difficulty`, `importance`, `tribunalDecision`, `finalRepresentation`, or any other later-gate payload and still pass validation. The allowlist is the primary enforcement wall; the rationale validator also rejects a small set of explicit merge/split/drop/keep/final-representation recommendations.

## 6. Raw-pool immutability

The 661 accepted Gate-2 candidates are the fixed population for Gate 3.

The Gate-3 ledger is an overlay. It must prove:

- exactly 661 granularity rows;
- exactly one row per accepted raw candidate ID;
- exact candidate-name and origin snapshots;
- no unknown or missing candidate IDs;
- every cited evidence ID belongs to that candidate;
- Gate-2 candidates/evidence remain unchanged;
- the accepted Gate-2 ore fingerprint remains equal to the frozen SHA-256 snapshot `f947742d48b46a45d3a49d86e334123f752fcd28dccf351b7e7114ddcf08861f`; the fingerprint covers raw candidates, raw evidence, official route index/meta, and the source-closure rule/zones/reviewed-items/meta;
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

This is deliberate. We do not auto-classify the remaining 616 from string patterns.

## 8. What the first calibration is testing

The calibration intentionally includes awkward cases:

- `DIRECT` remains `UNRESOLVED` because the frozen legacy tag gives only shorthand.
- `GRAPH`, `ODE`, `Groups`, and Engel's `Graph Theory` are macro labels, even though graph/ODE/group methods may later yield excellent abilities.
- Zeitz's `Strategy`, `Tactic`, and `Tool` are measured as source category expressions; `Crux Move` is a scale-variable source role and therefore calibrates `CROSS_SCALE` without `BUNDLED_MOVES`. This does not adopt Zeitz's taxonomy.
- `Adjacent-Swap Improvement Argument` and Velleman's conjunction-goal split are clean deployable moves.
- the audit-note `Recoverability Lemma` is now deliberately **UNRESOLVED in grain** because its candidate-owned index evidence supplies only the label; its `PROBLEM_LOCAL` reach comes only from that record's explicit historical-problem attachment.
- `Positivity of Squares (x² ≥ 0)` supplies the independent `MICRO + GENERAL` anchor: a reusable fact narrower than a complete deliberate move.
- `Smallest Nondivisible Multiplier Advances Prime Support` supplies an independent `DEPLOYABLE + PROBLEM_LOCAL` anchor, demonstrating that semantic reach and grain are orthogonal.
- `Clearing denominators and primitive-integer normalization`, `Combining Techniques`, row-replacement-plus-cofactor expansion, and the Dilation–Derivative Boundedness Bootstrap test `MACRO + BUNDLED_MOVES`: the accepted evidence establishes multiple operations but not mixed reference grains.
- `Chinese Remainder Theorem` is the strict-evidence stress case: its attached Gate-2 record establishes only a dedicated subsection, so grain/bundle/trigger/operation/output remain `UNRESOLVED` despite the theorem being mathematically familiar.
- `Finite-Field Quotient Model of the Projective Plane` exercises `LOW` confidence correctly: its attached official evidence does support a concrete representation move, but there is genuine evidence-supported ambiguity about whether the expression is exactly one deployable move or a somewhat broader specialized construction.

The point is not to make these 45 sacred. The point is to make the ruler attackable before it touches all 661 candidates.

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
