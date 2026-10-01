# SMMC Arsenal — Gate 1 research contract

Status: **G1-R01–R05 + F1–F3 + C01–C03 REPAIRED — independent closure review required; ontology and representation remain unfrozen**  
Scope: evidence discipline only. Gate 1 does **not** accept, merge, split, type, rank, order, prerequisite-link, or choose a data representation for any Arsenal candidate.

## 1. Purpose

Gate 1 defines the epistemic contract for every later Arsenal research claim.

It deliberately answers:

- what source or observation a claim came from;
- what kind of claim it is;
- which evidence channel it can support;
- how strongly it has been verified;
- what the evidence does **not** establish.

It deliberately does **not** answer:

- what the final ontology levels are;
- whether a candidate is a Strategy, Proof Form, Tactic, Tool, Foundation, Specialist, event, tag, relation, card, or something else;
- whether two names merge or split;
- where an item belongs in a prerequisite graph;
- how an item should be ranked, displayed, or gamified.

The existing 88-problem method tags are research input, not a finished learner ontology.

## 2. Frozen canonical source register

The exact canonical source identities are frozen in:

`docs/smmc/ARSENAL-SOURCE-REGISTER-v1.md`

A title alone is not a source identity.

For books, a canonical source is identified by bibliographic edition plus the SHA-256 of the exact artifact used for Gate-1 research.

For the SMMC corpus, the project snapshot is pinned to the Gate-0 merge commit. Problem-paper links remain in the learner-safe paper registry, while official solution booklets are frozen separately in the authoring-only `course/smmc/official-solution-sources-v1.mjs` with exact URLs, page counts, and SHA-256 fingerprints.

A VERIFIED historical Battle claim that relies on an official solution must identify the exact frozen solution artifact and its SHA-256. “Official site” or a year alone is not sufficient provenance.

Only sources listed as **CANONICAL** in the source register may directly support a canonical Gate-2+ source claim.

### Source-register amendment rule

A new or replacement source does not become canonical because a builder finds it useful.

Before it can support canonical evidence, a source-register amendment must record:

1. exact bibliographic/version identity;
2. stable source URL or exact artifact filename plus SHA-256, as applicable;
3. the claim kinds it is allowed to support;
4. what it does not establish;
5. why the existing canonical set is insufficient;
6. an independent review of the amendment.

Until that amendment is accepted, material from the source may be logged only with `evidenceBasis: SOURCE_LEAD`, `recordChannel: NONE`, and `verificationStatus: UNVERIFIED_SOURCE_LEAD`. It may be inspected, located, hashed, and paraphrased as a lead, but it may not settle a candidate, prerequisite, ranking, combo, Battle/Discovery/Transfer claim, or ontology decision.

## 3. Claim-specific source roles

Source roles are descriptive. They do not create ontology decisions.

### S0 — official SMMC evidence + frozen project corpus

The official SMMC problem/solution documents are primary historical evidence for what actually appeared in a competition problem or successful official route.

The repository ledger/schema/synthesis at the frozen S0 commit are **project-derived indices and summaries**. They are valuable for retrieval, counts, and cross-checking, but a method tag by itself is not proof that the tagged move appears in the official solution.

S0 can support:

- historical occurrence;
- historical co-presence;
- domain/year/population measurements;
- project-derived overlap/bridge metadata.

S0 does not by itself establish:

- how a human discovered the route;
- general pedagogical importance;
- difficulty;
- learning order;
- learner transfer.

### S1 — Zeitz

In the frozen second edition, Zeitz explicitly introduces his terminology of **Strategy**, **Tactics**, and **Tools** as three problem-solving levels, while noting that these are not standard definitions. He also describes a mathematical **crux move** and says a crux can occur at strategic, tactical, or tool level.

This can support:

- source terminology;
- source-authored granularity distinctions;
- discovery/search heuristics;
- investigation-versus-final-argument observations.

It does **not** force the Arsenal to use those levels, nor does it determine how the Arsenal must represent a crux.

### S2 — Engel

In the frozen artifact, Engel describes his compact contest training as organized around recurring **Great Ideas**, with many problems chosen to illustrate them. He also explicitly warns that problem difficulty is unstable under prior training and that a related training problem can make a later problem dramatically easier.

This can support:

- source terminology;
- training-design evidence;
- discovery/method-family leads;
- caution against treating rarity or historical difficulty as stable learner difficulty.

It does **not** make Engel's chapter structure, ordering, or named principles the project ontology.

### S3 — Hammack

In the frozen Book of Proof artifact, Hammack:

- organizes **his book's chapters** with an explicit dependency tree;
- treats direct proof, contrapositive proof, and contradiction as three main techniques for conditional statements;
- separately covers cases, non-conditional forms, existence/uniqueness, disproof/counterexample, induction, strong induction, and smallest counterexample.

This can support:

- source terminology;
- proof-structure distinctions;
- evidence that this text teaches some proof techniques separately;
- evidence about **the dependency organization of this edition of this book**.

It does **not** establish a universal proof-architecture dependency DAG, nor does it force those techniques to occupy a separate top-level Arsenal class.

### S4 — Velleman

In the frozen second edition, Velleman develops a structured-proving approach in which proof structures can be combined and nested, and in his examples the logical form of the statement guides choice of proof structure. His book orders logic/quantifiers before the systematic proof-strategy chapter and later induction.

This can support:

- source terminology;
- proof-structure evidence;
- logical-form-guided proof planning;
- evidence about Velleman's own pedagogical sequence.

It does **not** establish a universal prerequisite order, and it does not force the Arsenal to separate “Foundation” from any future proof-form category.

### S5 — *Putnam and Beyond*

In the frozen 2007 artifact, the Study Guide recommends a training pattern that includes theory/examples, serious independent problem attempts, delayed solution reading, review even after success, authentic Putnam problems to diagnose weaknesses, and writing full solutions for comparison. Chapter 1 separately presents contradiction, induction, pigeonhole, ordering/extremal elements, and invariance as methods of proof and describes their basic/universal use.

This can support:

- source training advice;
- source terminology;
- broad method significance inside that text;
- later project synthesis about training design.

It does **not** automatically become project law, a universal learning sequence, or an Arsenal ontology.

## 4. Orthogonal evidence axes

The first Gate-1 candidate mixed source type, claim type, channel, and inference status into one “evidence class.” That is forbidden now.

Every research record uses separate axes.

### Axis A — `evidenceBasis`

What kind of epistemic object is this record?

#### `SOURCE_FACT`

A claim directly supported by a **frozen canonical** source passage or exact frozen official SMMC artifact.

Examples:

- Zeitz defines “tool” narrowly in his own terminology;
- a frozen official SMMC solution actually uses an invariant;
- Hammack calls direct/contrapositive/contradiction three main techniques for conditional statements.

A source fact must be inspected, paraphrased, locatable, and tied to the canonical source identity. If the evidence is a frozen official solution artifact, its canonical SHA-256 is mandatory.

#### `SOURCE_LEAD`

A claim or potentially useful observation from a source that is **not yet canonical** under the source register.

Examples:

- an inspected chapter from a newly suggested problem-solving book awaiting source-register review;
- a newly discovered article or alternative official revision not yet admitted to the canonical set;
- a bibliographic lead that may matter at a later gate.

A `SOURCE_LEAD` is the honest home for noncanonical source material. It must use `recordChannel: NONE` and `verificationStatus: UNVERIFIED_SOURCE_LEAD`.

Inspection can establish what that source says, but it does not grant canonical evidentiary authority. If a later source-register amendment accepts the source, create a linked canonical `SOURCE_FACT` record; do not silently reinterpret the old lead.

#### `PROJECT_DERIVED`

A mechanically derived fact from frozen project data.

Examples:

- count of current ledger tags;
- number of distinct years/domains containing a tag;
- a co-occurrence count from the 88-row ledger.

This basis is descriptive. It does not convert a ledger tag into verified official-solution occurrence.

#### `LEARNER_EMPIRICAL`

An observation from actual learner work.

Examples:

- scratch-work route chosen before any hint;
- Forge performance;
- Boss loadout prediction;
- Arena deployment;
- assistance level;
- delayed same-task reconstruction as **retention** evidence.

Learner evidence must identify the task/attempt and exposure state.

Same-task delayed reconstruction is never Transfer. It is retained as useful learner evidence under `recordChannel: NONE` + `claimKind: RETENTION`.

#### `PROJECT_SYNTHESIS`

A project inference or design proposal derived from other records.

Examples:

- proposing that two source terms may be aliases;
- proposing that one concept may be a parent of another;
- proposing a hard/soft prerequisite;
- proposing a UI representation for crux;
- arguing that a historical pair reflects genuine synergy.

Synthesis must cite the records it reconciles. It may never masquerade as a source fact.

### Axis B — `recordChannel`

What evidence question can this record answer?

Exactly one of:

- `BATTLE` — what actually appears productively in historical SMMC mathematics;
- `DISCOVERY` — what helps a solver find a route before the route is known;
- `TRANSFER` — what a learner can recognize/deploy on fresh material without being told;
- `NONE` — useful research evidence that does not itself answer one of those three questions.

If one observation genuinely supports two channels, create two linked records rather than blurring the channels.

### Axis C — `claimKind`

What proposition is the record making?

Controlled initial vocabulary:

- `SOURCE_TERMINOLOGY`
- `HISTORICAL_OCCURRENCE`
- `HISTORICAL_COOCCURRENCE`
- `DISCOVERY_HEURISTIC`
- `PROOF_STRUCTURE`
- `PREREQUISITE_MATHEMATICS`
- `TRAINING_DESIGN`
- `LEARNER_PERFORMANCE`
- `RETENTION`
- `INDEX_SIGNAL`
- `CORPUS_MEASUREMENT`
- `ONTOLOGY_PROPOSAL`
- `REPRESENTATION_PROPOSAL`
- `RELATION_PROPOSAL`
- `OTHER`

Gate 1 freezes this research vocabulary only. It does not freeze any future candidate type.

### Axis D — future `ontologyType`

This axis is intentionally **unset** during Gate 1 and raw Gate-2 harvesting.

A record may mention source terminology such as “strategy” or “method,” but that wording does not populate `ontologyType`.

Later gates may define an ontology-type vocabulary. Gate 1 has no authority to do so.

### Complete admissibility matrix

The orthogonal axes are not freely combinable.

The executable allow-list lives in:

`course/smmc/arsenal/evidence-contract-v1.mjs`

**Every basis × channel × claim-kind combination not explicitly listed below is forbidden.**

| evidenceBasis | BATTLE | DISCOVERY | TRANSFER | NONE |
|---|---|---|---|---|
| `SOURCE_FACT` | `HISTORICAL_OCCURRENCE`, `HISTORICAL_COOCCURRENCE` | `DISCOVERY_HEURISTIC` | **forbidden** | `SOURCE_TERMINOLOGY`, `PROOF_STRUCTURE`, `PREREQUISITE_MATHEMATICS`, `TRAINING_DESIGN`, `OTHER` |
| `SOURCE_LEAD` | **forbidden** | **forbidden** | **forbidden** | `SOURCE_TERMINOLOGY`, `HISTORICAL_OCCURRENCE`, `HISTORICAL_COOCCURRENCE`, `DISCOVERY_HEURISTIC`, `PROOF_STRUCTURE`, `PREREQUISITE_MATHEMATICS`, `TRAINING_DESIGN`, `OTHER` |
| `PROJECT_DERIVED` | **forbidden** | **forbidden** | **forbidden** | `INDEX_SIGNAL`, `CORPUS_MEASUREMENT`, `HISTORICAL_COOCCURRENCE`, `OTHER` |
| `LEARNER_EMPIRICAL` | **forbidden** | `LEARNER_PERFORMANCE` | `LEARNER_PERFORMANCE` | `LEARNER_PERFORMANCE`, `RETENTION`, `OTHER` |
| `PROJECT_SYNTHESIS` | **forbidden** | **forbidden** | **forbidden** | `PREREQUISITE_MATHEMATICS`, `TRAINING_DESIGN`, `ONTOLOGY_PROPOSAL`, `REPRESENTATION_PROPOSAL`, `RELATION_PROPOSAL`, `OTHER` |

Verification status is also basis-constrained:

| evidenceBasis | allowed verificationStatus |
|---|---|
| `SOURCE_FACT` | `VERIFIED` |
| `SOURCE_LEAD` | `UNVERIFIED_SOURCE_LEAD` |
| `PROJECT_DERIVED` | `VERIFIED` or `INDEX_LEAD` |
| `LEARNER_EMPIRICAL` | `VERIFIED` |
| `PROJECT_SYNTHESIS` | `SYNTHESIS_PROPOSAL` |

Consequences:

- `SOURCE_FACT + TRANSFER` is impossible;
- `PROJECT_DERIVED + DISCOVERY` is impossible;
- `LEARNER_EMPIRICAL + BATTLE` is impossible;
- `SOURCE_LEAD` can never directly enter Battle/Discovery/Transfer;
- raw ledger tags/counts/co-occurrences remain `PROJECT_DERIVED + NONE`;
- project synthesis cannot self-certify any Battle/Discovery/Transfer channel.

Gate-2 evidence records must pass the executable validator. The matrix is an allow-list, not guidance.

### Verification status

Each record also carries one of:

- `VERIFIED`
- `INDEX_LEAD`
- `UNVERIFIED_SOURCE_LEAD`
- `SYNTHESIS_PROPOSAL`

Verification status is not an evidence channel or ontology type.

## 5. Battle / Discovery / Transfer are not interchangeable

### Battle

Question:

> Is there verified historical evidence that this move actually appears productively in SMMC mathematics?

A verified Battle occurrence requires traceable official evidence.

A current ledger method tag may help locate the problem, but until the tagged move is traced to the audited official statement/solution evidence it remains an `INDEX_LEAD`.

“Compatible with this solution” is not Battle evidence.

If compatibility is worth recording, it is a `PROJECT_SYNTHESIS` with channel `NONE`, unless later evidence shows actual use.

### Discovery

Question:

> Does this move help a solver find a route before the solution is known?

Possible evidence:

- source-authored investigation heuristics;
- source scratch-work commentary;
- learner scratch work before route exposure;
- repeated learner process observations.

A polished official solution can occasionally contain explicit discovery commentary, but absence from a polished solution is not evidence of absence from discovery.

### Transfer

Question:

> Can this learner recognize and deploy the move on fresh material without being told to use it?

Possible evidence:

- unlabeled Forge transfer on a fresh task;
- fresh Boss attempts;
- fresh Arena material.

A Transfer record requires all three learner-context facts:

- `taskFreshness: FRESH`;
- `methodPrompting: UNPROMPTED`;
- `routeExposure: UNSEEN`.

Same-task delayed reconstruction is **retention**, not transfer, even if no new hint is given.

Reading a source, seeing a worked solution, completing a labeled execution drill, or reconstructing the same task later cannot alone create Transfer evidence.

## 6. Strict historical-evidence rule

For `recordChannel: BATTLE` + `claimKind: HISTORICAL_OCCURRENCE`:

Required:

1. exact SMMC problem ID;
2. exact frozen official source identity/locator;
3. if an official solution booklet is used, the exact canonical solution-artifact SHA-256;
4. concise statement of what move actually occurs;
5. whether it occurs in the problem statement, official solution, or both;
6. verification status `VERIFIED`.

Not sufficient by itself:

- existing ledger method tag;
- model judgment that a move could work;
- another book solving a similar problem;
- co-occurrence statistics;
- a plausible alternative solution not documented in the frozen official evidence.

Alternative valid solutions may be useful project research, but unless they are part of the frozen official evidence they must be labeled as synthesis/alternative mathematics rather than historical occurrence.

### Strict historical co-occurrence rule

Raw ledger-tag co-occurrence is **not Battle evidence**.

A mechanically recomputed pair from current ledger tags must be recorded as:

- `evidenceBasis: PROJECT_DERIVED`;
- `recordChannel: NONE`;
- `claimKind: HISTORICAL_COOCCURRENCE`.

Its `verificationStatus` may be `VERIFIED` only in the narrow sense that the project-data computation was reproduced. That does not upgrade either tag to verified historical occurrence.

A `recordChannel: BATTLE` + `claimKind: HISTORICAL_COOCCURRENCE` record is permitted only when:

1. there are two linked `SOURCE_FACT + BATTLE + HISTORICAL_OCCURRENCE + VERIFIED` records;
2. both linked records refer to the same SMMC problem ID;
3. each occurrence is independently traceable to frozen official evidence;
4. any solution evidence carries the frozen canonical artifact SHA-256.

If either move is only an `INDEX_LEAD`, the pair cannot become Battle co-occurrence.

## 7. Provenance schema for Gate 2+

Every evidence record must be able to answer:

```text
recordId
candidateId
candidateName

evidenceBasis
recordChannel
claimKind
verificationStatus
ontologyType: null

sourceId
sourceVersionOrCommit
sourceLocator
sourceArtifactSha256
historicalProblemIds
learnerAttemptIds
learnerContext

claim
sourceTerminology
supports
doesNotEstablish
confidence
linkedRecordIds
researcherNote
```

Rules:

- `ontologyType` remains null until a later ontology gate explicitly authorizes values.
- Fields that do not apply are null/empty; they are not silently repurposed.
- `PROJECT_SYNTHESIS` records must point to supporting `linkedRecordIds`.
- `LEARNER_EMPIRICAL` records must identify learner attempt/task evidence and exposure/assistance context.
- a canonical `SOURCE_FACT` must use a CANONICAL source ID from the frozen register.
- a `SOURCE_LEAD` must use a provisional/noncanonical source identity, `recordChannel: NONE`, and `verificationStatus: UNVERIFIED_SOURCE_LEAD`.
- any VERIFIED SMMC solution-backed Battle record must carry the exact frozen `sourceArtifactSha256`.
- `sourceLocator` is a structured object, never a free-text page reference.
- Transfer learner records must satisfy the fresh/unprompted/unseen rules above.
- delayed same-task reconstruction uses `claimKind: RETENTION` and `recordChannel: NONE`.

## 8. Canonical sourceLocator grammar

`sourceLocator` is a tagged structured object. Free text such as “page 3” is invalid.

The executable grammar lives in `course/smmc/arsenal/evidence-contract-v1.mjs`.

### PDF locator

Use for canonical book PDFs and SMMC paper/solution PDFs:

```text
{
  kind: "PDF",
  pdfPage: <positive integer>,
  printedPage: <optional string>,
  section: <optional string>,
  anchor: <optional short identifying label>
}
```

Rules:

- `pdfPage` is always the **1-based physical page index in the exact frozen PDF artifact**.
- `printedPage` is optional and records the page number/label printed on the page itself.
- If PDF page 20 displays printed page 12, record `pdfPage: 20, printedPage: "12"`.
- `section` may hold a chapter/section/problem label such as `"1.2"` or `"2021 A3"`.
- `anchor` may hold a short identifying heading/phrase; it is not a substitute for `pdfPage`.

### Repository locator

Use for project files:

```text
{
  kind: "REPO",
  path: "course/smmc/ledger-2021.mjs",
  lineStart: 10,
  lineEnd: 20
}
```

Rules:

- path is repository-relative;
- line numbers are 1-based and inclusive;
- `sourceVersionOrCommit` separately records the exact commit being cited.

### Web locator

Use only where the evidence object itself is a web page rather than a frozen PDF/repository artifact:

```text
{
  kind: "WEB",
  url: "https://...",
  heading: <optional string>,
  retrievedAt: <optional explicit-timezone ISO timestamp>
}
```

For canonical PDF evidence, the PDF locator and frozen artifact hash take precedence over a browser page URL.

## 9. Source inspection rule

No canonical Arsenal item may be authored solely from model memory.

Before a source-backed record can become `VERIFIED`, the researcher must:

1. inspect the relevant canonical source passage;
2. confirm the exact source identity against the source register;
3. record an auditable locator;
4. paraphrase only what the source supports;
5. record a meaningful `doesNotEstablish` boundary;
6. separate source fact from project synthesis;
7. avoid storing long copyrighted excerpts in the repository.

If the exact artifact is unavailable or its hash/version does not match, the record cannot be verified against that canonical source.

A noncanonical source may still be inspected, but its record remains `SOURCE_LEAD + NONE + UNVERIFIED_SOURCE_LEAD` until a reviewed source-register amendment accepts that source.

## 10. Ontology and representation remain completely unfrozen

Gate 1 records evidence. It does not decide representation.

The following are **research hypotheses only**, inherited from earlier discussion and explicitly open to later rejection:

- a Strategy / Tactic / Tool ladder;
- a separate Proof Form class;
- a Foundation class;
- a Specialist/Relic class;
- modeling Crux as an event annotation;
- modeling Crux as a card, relation, tag, event, or another representation;
- any parent/child hierarchy among current method tags.

Zeitz supplies source evidence about his three levels and his use of “crux move.” Hammack and Velleman supply proof-structure evidence. Those facts constrain honest source attribution; they do **not** settle the Arsenal data model.

No Gate-1 rule may reject a future representation merely because it differs from the current working hypothesis.

## 11. Conflict and reconciliation rules

When records disagree, preserve the disagreement.

Ask first whether they are making the same kind of claim.

Common non-conflicts:

- broad source family vs executable subtechnique;
- proof structure vs discovery heuristic;
- historical retrieval tag vs learner-facing ability;
- source terminology vs project ontology;
- source training order vs mathematical prerequisite;
- official occurrence vs learner transfer.

No total source ranking exists.

Authority is claim-specific:

- exact official SMMC evidence is authoritative for what appears in that official problem/solution;
- a book is authoritative for what that edition says and how it organizes its own pedagogy;
- learner empirical evidence is authoritative for the recorded learner event, subject to exposure/assistance validity;
- project synthesis is never upgraded into source fact by repetition.

A later tribunal may resolve ontology questions, but it must cite the records and explain the disposition.

## 12. Frequency, difficulty, importance and combos

Historical counts are descriptive measurements only.

A frequency record must state:

- population: all 88, East 72, or supplementary 16;
- exact tag/query;
- count;
- distinct years;
- distinct primary domains;
- whether the count is based on ledger tags or verified official occurrences;
- known limitations.

Never infer from frequency alone:

- importance;
- difficulty;
- learning order;
- mastery;
- prerequisite status.

Rarity is not difficulty.

A co-occurrence record is not a combo.

For a pair, record:

- pair;
- count;
- problem IDs;
- years/domains;
- evidence basis;
- whether the pair is raw ledger-tag co-occurrence or linked verified official occurrences;
- whether actual mathematical interaction has been independently justified.

Raw ledger-tag pairs always use `recordChannel: NONE`, even when the count itself is mechanically VERIFIED.

Battle co-occurrence requires two linked VERIFIED official historical-occurrence records for the same problem, as specified in §6.

Until mathematical interaction is independently justified, call the pair a **recorded method partner** only.

## 13. Prerequisite research rule

“Hard” and “soft” are research labels for later prerequisite proposals, not ontology levels.

### Hard prerequisite proposal

Claim:

> Without this mathematics, the candidate cannot be meaningfully understood or executed.

### Soft prerequisite proposal

Claim:

> The candidate remains intelligible without it, but prior study plausibly improves pedagogy, efficiency, or reliability.

A prerequisite proposal is initially `PROJECT_SYNTHESIS` + `claimKind: PREREQUISITE_MATHEMATICS` unless the source is merely being quoted about its own ordering.

“This chapter comes earlier in the book” is not enough to establish a project prerequisite.

A source's training recommendation is evidence to consider, not automatic project law.

## 14. Forbidden shortcuts

Reject any later research pass that:

- treats ledger frequency as importance, difficulty, learning order, or mastery;
- treats co-occurrence as causal synergy;
- labels raw ledger-tag co-occurrence as Battle evidence;
- upgrades Battle co-occurrence without two linked VERIFIED official occurrences for the same problem;
- treats rarity as difficulty;
- treats GREEN/AMBER/RED as ability strength;
- treats a polished solution as a complete discovery record;
- treats a ledger tag as verified Battle occurrence without official traceability;
- treats “compatible with” as “historically used”;
- treats a chapter dependency/order as a universal prerequisite DAG;
- treats source training advice as automatic project law;
- treats source terminology as an already-frozen ontology type;
- lets model memory substitute for source inspection;
- uses an unregistered source to settle a canonical claim;
- uses an LLM explanation as provenance;
- leaks private historical metadata into a protected learner attempt;
- silently converts learner process evidence into Battle evidence, or Battle evidence into Transfer evidence;
- counts same-task delayed reconstruction as Transfer;
- creates a record using a basis × channel × claim-kind combination outside the executable allow-list;
- uses an ambiguous free-text locator such as “page 3” instead of the structured locator grammar.

There is deliberately **no** Gate-1 ban on representing Crux as a card/event/tag/etc.; that is a later ontology/representation question.

## 15. Gate-0 inheritance

Every later gate inherits accepted Gate-0 corpus protection.

Research tooling may inspect private authoring evidence, but learner-facing historical work must preserve:

- protected synopsis/search semantics;
- record-first/reveal-second persistence;
- monotone exposure evidence;
- cloud merge without evidence loss;
- stronger→weaker state normalization;
- route/classification anti-leak protections;
- absolute-time timestamp ordering;
- paper/session isolation.

No ontology, research UI, or learner UI change may weaken those guarantees without reopening the relevant Gate-0 regression review.

## 16. Gate-1 deliverables

Gate 1 passes only when all of the following survive independent review:

1. exact canonical source register;
2. exact frozen 2017–2025 official solution-artifact registry with mandatory hashes for solution-backed Battle evidence;
3. source-amendment rule;
4. claim-specific source roles with explicit limitations;
5. orthogonal `evidenceBasis`, `recordChannel`, `claimKind`, verification status, and future `ontologyType` axes;
6. explicit `LEARNER_EMPIRICAL` and `SOURCE_LEAD` support;
7. complete executable basis × channel × claim-kind admissibility matrix;
8. explicit fresh/unprompted/unseen Transfer semantics and separate same-task retention semantics;
9. strict verified-Battle occurrence and co-occurrence rules;
10. structured sourceLocator grammar for PDFs, repository files, and web pages;
11. provenance schema;
12. conflict/reconciliation rules;
13. frequency/difficulty/co-occurrence safeguards;
14. Gate-0 inheritance;
15. explicit statement that ontology and representation remain unfrozen.

Gate 1 produces **no accepted Arsenal abilities**.

## 17. Handoff to Gate 2

Only after independent Gate-1 acceptance may Gate 2 create the raw candidate ledger.

Gate 2 must:

- harvest before merging;
- preserve aliases separately;
- represent every current SMMC method tag as at least a retrieval lead;
- inspect the canonical book sources for additional plausible candidates;
- preserve source terminology without treating it as ontology type;
- attach evidence records using the orthogonal schema above and pass `validateGate1EvidenceRecord()`;
- use only the structured sourceLocator grammar above;
- count same-task delayed reconstruction as retention, never Transfer;
- keep noncanonical source material as `SOURCE_LEAD + NONE + UNVERIFIED_SOURCE_LEAD` until separately admitted;
- keep `ontologyType: null`;
- make no final merge/split/type/prerequisite/ranking decision.

**STOP:** Gate 2 remains closed until independent review accepts this repaired Gate-1 contract.
