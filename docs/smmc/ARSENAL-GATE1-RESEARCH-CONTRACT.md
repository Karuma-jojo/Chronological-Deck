# SMMC Arsenal — Gate 1 research contract

Status: **REVIEW CANDIDATE — ontology remains unfrozen**  
Scope: evidence discipline for Arsenal research. This gate does **not** accept, merge, split, rank or order any candidate ability.

## 1. Purpose

Gate 1 defines how every later Arsenal claim must be researched before the project begins candidate harvesting.

The research problem is unusually easy to corrupt:

- the 88-problem SMMC ledger records successful mathematics but not every discovery move that happened in scratch work;
- the existing method tags were designed as a useful historical annotation vocabulary, not as a finished learner ontology;
- source books use overlapping terminology at different levels of granularity;
- a frequently tagged method is not automatically important to learn first;
- a rare method is not automatically difficult;
- two methods appearing together are not automatically a genuine combo;
- polished official solutions systematically hide some search behavior;
- the finite historical corpus must remain protected under Gate 0.

Therefore the Arsenal may not be authored from model memory, vibes, tag frequency, or one book's table of contents.

## 2. Canonical evidence set

Every Gate-2+ research pass must inspect the relevant material from this set before making a canonical claim.

### S0 — official SMMC corpus and project ledger

Canonical project sources:

- `course/smmc/ledger-2017.mjs` through `ledger-2025.mjs`;
- `course/smmc/ledger.mjs`;
- official SMMC problem/solution evidence already used to audit those rows;
- `course/smmc/schema.mjs`;
- `docs/smmc/FINAL-SYNTHESIS-2017-2025.md`;
- Gate-0 corpus-protection contract and runtime semantics.

Role:

- establishes what mathematics appears in the historical SMMC corpus;
- supports **Battle Record** evidence;
- supports historical method co-presence and domain breadth;
- does **not** by itself establish how a human discovered a route;
- does **not** establish pedagogical learning order or difficulty.

The current ledger contains 88 official problems, including 72 East A/B problems and 16 supplementary C problems. Existing method tags are research input, not a frozen Arsenal ontology.

### S1 — Paul Zeitz, *The Art and Craft of Problem Solving*

Required anchors:

- Chapter 1, especially §1.2 **The Three Levels of Problem Solving**;
- Chapter 2, **Strategies for Investigating Problems**;
- Chapter 3, **Tactics for Solving Problems**;
- later topic chapters when a candidate technique needs exact source evidence.

What this source establishes for Gate 1:

- **Strategy** = broad mathematical/psychological ideas for starting and pursuing problems;
- **Tactic** = broadly reusable mathematical methods;
- **Tool** = narrowly focused techniques for specific situations;
- a **crux move** may occur at strategy, tactic or tool level and is therefore an event in a solution history, not automatically a fourth level;
- investigation and polished argument are distinct objects.

Project rule:

Zeitz's labels are strong evidence about problem-solving granularity, but they are not mechanically binding. If the Arsenal later classifies a source-named tactic differently for learner reasons, the source wording and the project rationale must both be preserved.

### S2 — Arthur Engel, *Problem-Solving Strategies*

Required anchors:

- Preface;
- chapters corresponding to any candidate under review;
- Chapter 14 for additional/further strategies when relevant.

What this source establishes for Gate 1:

- contest training can be organized around recurring **Great Ideas**, not topics alone;
- worked examples and large problem families are used to train those ideas;
- difficulty is unstable under prior exposure/training;
- a related training problem can radically change how difficult a later problem feels.

Project rule:

Never use historical rarity, source ordering or a numeric difficulty label as a proxy for pedagogical importance.

### S3 — Richard Hammack, *Book of Proof*

Required anchors:

- Introduction and dependency tree;
- Chapters 4–6: direct, contrapositive and contradiction;
- Chapter 7: non-conditional forms, existence and uniqueness;
- Chapter 9: disproof/counterexample;
- Chapter 10: induction, strong induction and smallest counterexample.

What this source establishes for Gate 1:

- proof architectures have a dependency structure that is different from topic taxonomy;
- direct, contrapositive and contradiction are distinct proof forms;
- cases, existence/uniqueness, disproof, induction, strong induction and smallest-counterexample reasoning deserve explicit proof-structure treatment.

Project rule:

A **Proof Form** is not to be collapsed into the Strategy/Tactic/Tool ladder merely because it can also function tactically in a contest solution.

### S4 — Daniel J. Velleman, *How To Prove It: A Structured Approach*

Required anchors:

- Preface;
- Chapters 1–2 for logic/quantifiers;
- Chapter 3 for structured proving;
- Chapter 6 for induction/strong induction.

What this source establishes for Gate 1:

- proofs are built from reusable structures that can be combined and nested;
- logical form guides the choice of proof structure;
- foundational logic/quantifier competence precedes many proof-form decisions;
- scratch work and final proof have different purposes.

Project rule:

This is evidence for keeping **Foundation** and **Proof Form** conceptually separate from discovery heuristics.

### S5 — Titu Andreescu and Razvan Gelca, *Putnam and Beyond*

Required anchors:

- **A Study Guide**;
- Chapter 1, **Methods of Proof**;
- later topic sections only when a candidate technique requires them.

What this source establishes for Gate 1:

- theory/examples should precede targeted problem work;
- serious independent attempts should precede solution reading;
- even solved problems should be reviewed for additional insight;
- competitors should use authentic competition problems to identify weaknesses and should write full solutions for comparison;
- contradiction, induction, pigeonhole, ordering and invariance are treated as fundamental/universal proof methods.

Project rule:

This source primarily informs training/evidence design and broad method significance; it does not license copying its chapter structure as the Arsenal ontology.

## 3. Required evidence classes

Every canonical research claim must be tagged with exactly one primary evidence class. Multiple evidence records may support the same candidate.

### `HISTORICAL_BATTLE`

Evidence that a move appears in, is compatible with, or is productive in successful SMMC mathematics.

Examples:
- ledger tag on a specific problem;
- official solution uses an invariant;
- official route performs a graph reformulation.

This supports Battle Record. It does **not** prove discovery value.

### `SOURCE_HEURISTIC`

Evidence from Zeitz, Engel, Putnam-style training sources or another approved problem-solving source about how solvers search, recognize, simplify, transform or combine ideas.

This primarily supports Discovery Record and training design.

### `PROOF_STRUCTURE`

Evidence from Hammack, Velleman or another approved proof source about logical/proof architecture.

This supports Proof Form definitions and proof prerequisites.

### `PREREQUISITE_MATHEMATICS`

Evidence that a candidate is unintelligible or unusable without a mathematical concept, definition or theorem family.

This supports hard/soft prerequisite edges, not importance ranking.

### `PROJECT_SYNTHESIS`

A conclusion produced by reconciling several sources or by designing a learner-facing abstraction.

Examples:
- deciding that legacy `GRAPH-REFORMULATION` should become a child under a broader Recasting family;
- deciding that a card should be split because it contains two independently trainable operations.

A synthesis record must cite the underlying evidence it reconciles. It may never masquerade as a quotation or source fact.

## 4. Three records that must never be conflated

The Arsenal must preserve three separate evidence channels:

### Battle Record

Question answered:

> Has this move appeared productively in successful SMMC mathematics?

Typical evidence: official problems, official solutions, ledger tags.

### Discovery Record

Question answered:

> Does this move help a solver find a route before the solution is known?

Typical evidence: problem-solving sources, scratch-work commentary, training examples, learner process evidence.

Official polished solutions may under-report this channel.

### Transfer Record

Question answered:

> Can this learner recognize and deploy the move without being told to use it on fresh material?

Typical evidence: future Forge transfer tasks, Boss attempts and Arena evidence.

Reading a source, seeing a solution, or completing a labeled drill cannot create Transfer Record by itself.

## 5. Source-inspection rule

No canonical Arsenal item may be authored solely from model memory.

Before a candidate can enter the Gate-2 raw harvest, the researcher must:

1. inspect the relevant source passage(s), not merely remember the book;
2. record source ID plus chapter/section or exact project path/problem ID;
3. paraphrase the supported claim in project language;
4. state what the source does **not** establish;
5. separate source wording from project synthesis;
6. avoid storing long copyrighted excerpts in the repository.

If a source cannot currently be inspected, the candidate may be logged as `UNVERIFIED_SOURCE_LEAD` but may not become canonical.

## 6. Granularity is not decided in Gate 1

Gate 1 deliberately does not answer whether any specific item is a Strategy, Proof Form, Tactic, Tool or Specialist.

The working hypothesis for later testing is:

- Foundation;
- Strategy / Scoutcraft;
- Proof Form;
- Tactic;
- Tool;
- Specialist / Relic;
- Crux as an event annotation outside the hierarchy.

This is **not frozen**.

The existing `SMMC_METHOD_TAGS` vocabulary is likewise not frozen as learner-facing Arsenal abilities.

Gate 2 must harvest raw candidates before Gate 3 defines and applies the granularity test.

## 7. Required provenance record for Gate 2+

Every research evidence record should be able to answer:

```text
candidateId
candidateName
sourceId
sourceLocator
evidenceClass
claim
sourceTerminology
historicalProblemIds
supports
doesNotEstablish
confidence
researcherNote
```

The future candidate object may add aliases, type, trigger, operation, failure modes, prerequisites and relations, but those ontology fields are intentionally deferred.

## 8. Conflict and reconciliation rules

When sources disagree, do not silently choose one.

Record the disagreement and ask what each source is classifying.

Common causes:

- one source names a broad family while another names an executable subtechnique;
- one source classifies by proof architecture while another classifies by discovery behavior;
- the project ledger tags a move for historical retrieval rather than pedagogy;
- a source calls something a “method” in ordinary English without making an ontology claim.

Resolution belongs to the later tribunal, with an explicit disposition and rationale.

Source authority is **claim-specific**, not a total ranking. For example:

- official SMMC evidence outranks a textbook for what happened in an SMMC solution;
- Zeitz/Engel are stronger than a polished official solution for general discovery heuristics;
- Hammack/Velleman are stronger for proof-form structure;
- learner Transfer Record is stronger than any book for whether this learner can independently deploy an ability.

## 9. Forbidden shortcuts

Later builders/reviewers must reject any research pass that does one of the following:

- treats tag frequency as importance, difficulty or learning order;
- treats co-occurrence as proof of causal synergy;
- treats rarity as difficulty;
- treats GREEN/AMBER/RED as ability strength;
- treats a polished solution as a full record of discovery;
- treats a chapter heading as sufficient evidence for an Arsenal card;
- creates a “god card” so broad that it has no reproducible operation;
- creates a narrow card solely because one algebraic identity has a name;
- merges two candidates merely because they often appear together;
- splits candidates merely to make the skill tree visually richer;
- turns the crux into a level/card class;
- lets fantasy rarity, XP, damage or other UI metaphors decide mathematical mastery;
- leaks private historical metadata into a protected learner attempt;
- uses an LLM-generated explanation as provenance for a canonical mathematical claim.

## 10. Historical-frequency and combo rules

Counts may be recomputed from the 88-row ledger, but they are descriptive only.

For any frequency claim record:

- population: all 88, East 72, or supplementary 16;
- exact tag/query;
- count;
- number of distinct years;
- number of distinct primary domains;
- limitations of the tag.

For any pair/co-occurrence claim record:

- pair;
- co-occurrence count;
- problem IDs;
- domains/years;
- whether a source explains an actual mathematical interaction.

Until that final interaction is established, call the pair a **recorded method partner**, not a combo.

## 11. Prerequisite research rule

Later prerequisite work must distinguish:

### Hard prerequisite

Without it, the learner cannot meaningfully understand or execute the candidate.

### Soft prerequisite

The candidate is mathematically intelligible without it, but learning it first materially improves pedagogy, efficiency or reliability.

Recommended-before is not the same as required-before.

A prerequisite edge needs a reason. “This appears earlier in the book” is not enough.

## 12. Gate-0 inheritance

Gate 1 and every later gate inherit the accepted Gate-0 corpus-protection semantics.

Research tooling may inspect private evaluator/ledger evidence for authoring, but learner-facing historical attempts must continue to obey:

- protected synopsis/search semantics;
- record-first/reveal-second persistence;
- monotone exposure evidence;
- cloud merge without evidence loss;
- stronger→weaker state normalization;
- exact route/classification anti-leak protections;
- absolute-time timestamp ordering;
- paper/session isolation.

No ontology or UI improvement may weaken these guarantees.

## 13. Gate-1 deliverables

Gate 1 is complete only when the repository contains:

1. this research contract;
2. the canonical source register and claim-specific source roles above;
3. the five evidence classes;
4. the Battle / Discovery / Transfer separation;
5. provenance requirements for later candidate records;
6. conflict-resolution and forbidden-shortcut rules;
7. explicit inheritance of Gate 0;
8. a bounded independent review confirming that a fresh builder can follow the contract without inventing ontology decisions.

Gate 1 produces **no accepted Arsenal abilities**.

## 14. Handoff to Gate 2

If Gate 1 is independently accepted, Gate 2 may create the raw candidate research ledger.

Gate 2 must:

- harvest before merging;
- preserve aliases separately;
- represent every current SMMC method tag;
- inspect all five book sources for additional plausible candidates;
- preserve source terminology even when two names may later merge;
- record why each candidate entered the pool;
- make no final type/granularity decision.

**STOP:** do not begin Gate 2 until this contract receives independent adversarial acceptance.
