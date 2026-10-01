# SMMC Arsenal — Gate 1 research contract

Status: **G1-R01–R05 REPAIRED — independent follow-up required; ontology and representation remain unfrozen**  
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

For the SMMC corpus, the project snapshot is pinned to the Gate-0 merge commit and official source registry. Individual historical Battle claims must additionally identify the exact official problem/solution source used to verify the occurrence.

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

Until that amendment is accepted, material from the source may be logged only as an `UNVERIFIED_SOURCE_LEAD`. It may not settle a candidate, prerequisite, ranking, combo, or ontology decision.

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

A claim directly supported by a frozen canonical source passage or exact official SMMC source.

Examples:

- Zeitz defines “tool” narrowly in his own terminology;
- an official SMMC solution actually uses an invariant;
- Hammack calls direct/contrapositive/contradiction three main techniques for conditional statements.

A source fact must be paraphrased and locatable.

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
- Forge transfer performance;
- Boss loadout prediction;
- Arena deployment;
- assistance level;
- delayed reconstruction.

Learner evidence must identify the task/attempt and exposure state.

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
- `ONTOLOGY_PROPOSAL`
- `REPRESENTATION_PROPOSAL`
- `OTHER`

Gate 1 freezes this research vocabulary only. It does not freeze any future candidate type.

### Axis D — future `ontologyType`

This axis is intentionally **unset** during Gate 1 and raw Gate-2 harvesting.

A record may mention source terminology such as “strategy” or “method,” but that wording does not populate `ontologyType`.

Later gates may define an ontology-type vocabulary. Gate 1 has no authority to do so.

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

- unlabeled Forge transfer;
- fresh Boss attempts;
- Arena attempts;
- delayed reconstruction under defined assistance rules.

Reading a source, seeing a worked solution, or completing a labeled execution drill cannot alone create Transfer evidence.

## 6. Strict historical-evidence rule

For `recordChannel: BATTLE` + `claimKind: HISTORICAL_OCCURRENCE`:

Required:

1. exact SMMC problem ID;
2. exact official source identity/locator;
3. concise statement of what move actually occurs;
4. whether it occurs in the problem statement, official solution, or both;
5. verification status `VERIFIED`.

Not sufficient by itself:

- existing ledger method tag;
- model judgment that a move could work;
- another book solving a similar problem;
- co-occurrence statistics;
- a plausible alternative solution not documented as historical evidence.

Alternative valid solutions may be useful project research, but unless they are part of the frozen official evidence they must be labeled as synthesis/alternative mathematics rather than historical occurrence.

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

## 8. Source inspection rule

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

## 9. Ontology and representation remain completely unfrozen

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

## 10. Conflict and reconciliation rules

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

## 11. Frequency, difficulty, importance and combos

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
- whether actual mathematical interaction has been independently justified.

Until interaction is justified, call it a **recorded method partner** only.

## 12. Prerequisite research rule

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

## 13. Forbidden shortcuts

Reject any later research pass that:

- treats ledger frequency as importance, difficulty, learning order, or mastery;
- treats co-occurrence as causal synergy;
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
- silently converts learner process evidence into Battle evidence, or Battle evidence into Transfer evidence.

There is deliberately **no** Gate-1 ban on representing Crux as a card/event/tag/etc.; that is a later ontology/representation question.

## 14. Gate-0 inheritance

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

## 15. Gate-1 deliverables

Gate 1 passes only when all of the following survive independent review:

1. exact canonical source register;
2. source-amendment rule;
3. claim-specific source roles with explicit limitations;
4. orthogonal `evidenceBasis`, `recordChannel`, `claimKind`, verification status, and future `ontologyType` axes;
5. explicit `LEARNER_EMPIRICAL` support;
6. strict verified-Battle rule;
7. provenance schema;
8. conflict/reconciliation rules;
9. frequency/difficulty/co-occurrence safeguards;
10. Gate-0 inheritance;
11. explicit statement that ontology and representation remain unfrozen.

Gate 1 produces **no accepted Arsenal abilities**.

## 16. Handoff to Gate 2

Only after independent Gate-1 acceptance may Gate 2 create the raw candidate ledger.

Gate 2 must:

- harvest before merging;
- preserve aliases separately;
- represent every current SMMC method tag as at least a retrieval lead;
- inspect the canonical book sources for additional plausible candidates;
- preserve source terminology without treating it as ontology type;
- attach evidence records using the orthogonal schema above;
- keep `ontologyType: null`;
- make no final merge/split/type/prerequisite/ranking decision.

**STOP:** Gate 2 remains closed until independent review accepts this repaired Gate-1 contract.
