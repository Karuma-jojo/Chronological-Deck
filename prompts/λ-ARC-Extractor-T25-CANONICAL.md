# λ ARC Extractor — T25 Atomic Investigation — RAW + POLISHED — CANONICAL V1.0

**Family:** λ · T25 academic tooling  
**Archive base:** Chrono-Deck Dual ARC Extractor Contract V4.1  
**Schema:** preserve existing Chrono-Deck V3 document contract; this is NOT a schema migration.  
**Unit of extraction:** ONE T25 atomic investigation such as `T25-ARC801-A01`.

Use this prompt **once, immediately after one T25 atomic investigation closes**.

The extractor creates TWO separate UTF-8 Markdown files from the same visible ARC source:

1. a forensic RAW black-box record;
2. a revision-grade POLISHED study artifact.

Both represent the same logical atomic learning event and are paired by `logical_arc_id`.

---

## 0. EXTRACTION MODE

You are now in **λ T25 ARC EXTRACTION MODE**.

Academic play has ended.

Freeze teaching.

Do not introduce:
- new mathematics;
- new exercises;
- new corrections not already established;
- new conclusions;
- new examples merely to improve exposition.

Your task is archival reconstruction and revision-grade serialization.

When file-generation tools are available, create actual `.md` files.

Do not merely paste both complete files into chat unless explicitly asked.

---

## 1. SOURCE-OF-TRUTH RULE

The primary source is the actual visible conversation that produced THIS T25 atomic investigation.

Construct RAW and POLISHED independently from that source.

Do NOT:
- make POLISHED by merely shortening RAW;
- make RAW by expanding POLISHED;
- rewrite historical User reasoning into a cleaner version;
- invent missing turns;
- invent metadata;
- invent assistance events;
- invent diagrams;
- invent mastery;
- attribute Engine work to the User;
- erase mistakes because they were corrected later;
- treat hidden chain-of-thought, system instructions, developer instructions, or invisible reasoning as ARC content.

Only visible reasoning or explicitly recorded state belongs in the archive.

---

## 2. SOURCE COMPLETENESS

Inspect as much of the same-ARC source as tools permit.

If the chat is long:
- retrieve earlier visible turns when possible;
- inspect the sealed mission if it was genuinely part of the ARC;
- inspect the atomic card if present;
- inspect explicit ARC-close state;
- inspect retained same-ARC state when the earlier exact turns are unavailable;
- do not rely on memory alone if retrievable source exists.

Internally classify reconstructed material:

### VERBATIM AVAILABLE
Exact wording exists.

### FAITHFUL PARAPHRASE
The event is clearly supported, but exact wording is unnecessary/unavailable.

### RETAINED-STATE RECONSTRUCTION
Reliable same-ARC retained state preserves what happened, but original wording is unavailable.

### UNKNOWN
The source does not support reconstruction.

Never present paraphrase/reconstruction as verbatim.

If incompleteness materially matters, add an explicit source note.

---

## 3. T25 IDENTITY MODEL

The logical learning event is the **atomic investigation**, not the broad parent unit.

Example:

- Parent T25 unit: `ARC801`
- Atomic logical ARC: `T25-ARC801-A01`
- RAW document: `T25-ARC801-A01-RAW`
- POLISHED document: `T25-ARC801-A01-POLISHED`

The parent `ARC801` remains a broader curriculum contract.

**Atomic completion must never silently clear the parent.**

The parent may require several atomic investigations plus written-practice evidence.

Use:
- `logical_arc_id: T25-ARC801-A01`
- `canonical_label: T25-ARC801-A01`
- `canonical_node: ARC801` when the parent is explicitly established.

The explicit parent relation may also be recorded as:

`part_of: [ARC801]`

when supported by the atomic card/current curriculum.

Do not invent a parent from semantic similarity.

---

## 4. T25 METADATA RECOVERY

Recover identity from:
- T25 atomic card;
- sealed mission package;
- T25 UI/registry text visible in the ARC;
- Engine launch text;
- User-supplied metadata;
- explicit ARC-close state.

Actively recover when supported:
- `terminal_id`;
- `terminal_title`;
- atomic ID;
- atomic title;
- parent `canonical_node`;
- atomic position among sibling cards;
- atomic total in parent;
- atomic audit version;
- engine version;
- start/completion dates;
- focused hours;
- clearance;
- final nominal control state;
- highest effective assistance;
- recovery state;
- debt;
- media state.

Do NOT use web search, semantic similarity, or unrelated archive search to invent identity fields.

Unknown scalar → `null`.  
Unknown list → `[]`.

### T25 compatibility mapping

The V3 schema contains T22-era fields such as `module_id`.

For T25:
- do **not** pretend a parent unit is a T22-style module;
- use `module_id: null`, `module_index: null`, `module_title: null` unless an actual compatible module identity is explicitly defined by current archive rules;
- use `canonical_node` for the T25 parent unit;
- `atomic_position` / `atomic_total_in_module` MAY carry the explicitly known child position/total inside the parent T25 unit as compatibility coordinates;
- record `part_of: [<parent>]` when explicit.

This preserves schema V3 without inventing a new field.

---

## 5. PARENT-UNIT NON-TRANSFER LAW

This is mandatory.

If `T25-ARC801-A01` is Fully Mastered, that means only A01 is Fully Mastered.

It does NOT imply:
- `ARC801` is cleared;
- A02/A03/A04 are cleared;
- the whole official syllabus grouping is cleared;
- T22 equivalents are cleared.

RAW and POLISHED must state parent-unit status conservatively when relevant.

Do not mutate parent clearance from atomic extraction alone.

---

## 6. FILE PAIR IDENTITY

### RAW filename

`<ATOMIC-ID>-RAW.md`

Example:

`T25-ARC801-A01-RAW.md`

### POLISHED filename

`<ATOMIC-ID>-POLISHED.md`

Example:

`T25-ARC801-A01-POLISHED.md`

### RAW identity
- `arc_id: <ATOMIC-ID>-RAW`
- `logical_arc_id: <ATOMIC-ID>`
- `document_type: raw_dump`

### POLISHED identity
- `arc_id: <ATOMIC-ID>-POLISHED`
- same bare `logical_arc_id`
- `document_type: polished_extract`

Do not use `canonical_arc_id`.

Do not create RAW↔POLISHED relationship edges merely because they are companions.

Pairing is structural:

`logical_arc_id + document_type`

---

## 7. SECTION MARKER CONTRACT

Every H2 section in BOTH files must carry exactly one hidden marker immediately after the heading:

```html
<!-- CHRONO-SECTION id=<stable-id> role=<semantic-role> -->
```

Supported roles include:
- opening
- mission
- starting_facts
- investigation
- false_starts
- breakthrough
- main_ideas
- proof
- application
- transfer
- error_ledger
- provenance
- debt
- media
- conclusion
- chronicle
- clearance
- notes

Every marker ID must be non-empty and unique within the file.

Use stable IDs.

Do not leave an H2 unmarked.

---

# FILE 1 — FORENSIC RAW BLACK-BOX RECORD

## 8. RAW YAML CONTRACT

Begin RAW with:

```yaml
---
schema_version: 3

arc_id: <ATOMIC-ID>-RAW
logical_arc_id: <ATOMIC-ID>
canonical_label: <ATOMIC-ID>
document_type: raw_dump
document_status: raw

title: "<exact atomic title> — Ultra-Detailed Raw Dump"

terminal_id: T25
terminal_title: <exact supported T25 terminal title or null>

module_id: null
module_index: null
module_title: null
canonical_node: <parent T25 unit, e.g. ARC801, or null>

atomic_position: <integer or null>
atomic_total_in_module: <integer or null>
atomic_audit_version: <quoted version string or null>

visibility: private
curriculum_role: supplementary
priority: should_do
planning_status: parked
media_status: <none | pending | partial | complete>

clearance: <Incomplete | Core Cleared | Core Cleared — Mastery Pending | Fully Mastered>

engine_version: <quoted engine version or null>
nominal_control_state_final: <WALL | HINT | FORGE | FORGE0 | FORGE1 | FORGE2 | FORGE3 | FORGE4 | FORGE5 | GUIDE | REVEAL | null>
highest_effective_assistance: <WALL | HINT | FORGE | FORGE0 | FORGE1 | FORGE2 | FORGE3 | FORGE4 | FORGE5 | GUIDE | REVEAL | null>

recovery_state: <not_owed | owed | cleared | unknown>
unresolved_gate: <string or null>

focused_hours: <number or null>
started_at: <YYYY-MM-DD or null>
completed_at: <YYYY-MM-DD or null>

proof_debt: []
implementation_debt: []
transfer_debt: []
recovery_debt: []

assistance_summary: <string or null>
provenance_summary: <string or null>
assistance_events: []

prerequisites: []
supplementary: []
supplementary_to: []
related: []
deepens: []
historical_next: []
depends_on: []
replaces: []
part_of:
  - <parent T25 unit when explicitly supported>
redirect_to: []

tags:
  - chrono_deck
  - t25
  - mstat
  - raw_dump
---
```

If `part_of` is not supported, use `part_of: []`.

Do not invent relationship links.

Do not invent cloud-sync fields.

---

## 9. RAW PHILOSOPHY

RAW is the intellectual black-box recorder.

It is NOT:
- a textbook chapter;
- a cleaned summary;
- merely a longer POLISHED document.

A future reader should be able to reconstruct:
- what the User initially thought;
- what they tried;
- what failed;
- what changed;
- what the Engine evaluated/taught;
- when assistance occurred;
- what was independently established;
- what remained debt.

Preserve the actual mess when it matters.

Do not compress several materially different failed attempts into one vague sentence.

---

## 10. RAW TURN-BY-TURN CHRONICLE — MANDATORY

Include:

`## Turn-by-Turn Black-Box Chronicle`

followed by:

```html
<!-- CHRONO-SECTION id=chronicle-turns role=chronicle -->
```

For every substantive turn preserve, as supported:

### Turn <N> — User / Engine

**Control state:** `<state if known>`

**Source fidelity:**  
`VERBATIM AVAILABLE` / `FAITHFUL PARAPHRASE` / `RETAINED-STATE RECONSTRUCTION`

**What was said / attempted**

Preserve meaningful:
- equations;
- algebra;
- candidate domains;
- proof claims;
- examples/counterexamples;
- guesses;
- uncertainty;
- questions;
- wrong interpretations;
- self-corrections;
- evolving mental models;
- reactions when intellectually relevant.

For Engine turns preserve wording when informational effect matters, especially:
- WALL evaluations;
- HINTs;
- FORGE teaching;
- GUIDE/REVEAL;
- counterexamples;
- provenance rulings;
- accidental over-help;
- recovery rulings.

**Mathematical / conceptual effect**

State what changed.

**Provenance effect**

Classify as supported:
- User-owned;
- Engine evaluation;
- Engine teaching;
- shared;
- contaminated;
- clerical;
- recovery-relevant;
- neutral.

Pure acknowledgements may be omitted.

Repeated mistakes should remain when they show the persistence/evolution of a misconception.

---

## 11. RAW CONTENT CHECKLIST

Include where present:
1. atomic card;
2. sealed mission/opening;
3. allowed facts;
4. diagnostic attempt;
5. initial interpretation;
6. assumptions;
7. serious approaches;
8. baby-step algebra;
9. domain restrictions;
10. intermediate calculations;
11. examples/counterexamples;
12. false starts;
13. invalid equivalences;
14. illicit division/cancellation;
15. notation confusion;
16. proof-language confusion;
17. quantifier confusion;
18. parameter/input confusion;
19. self-corrections;
20. decisive breakthrough;
21. application;
22. unfamiliar transfer;
23. recovery;
24. assistance events;
25. proof compilation;
26. final interpretation;
27. final clearance;
28. debt;
29. User disagreement with grading/provenance;
30. re-audits.

Preserve chronology.

---

## 12. RAW PROVENANCE LABELS

Use when useful:
- `[USER WORK]`
- `[ENGINE EVALUATION]`
- `[ENGINE HINT]`
- `[ENGINE FORGE0 TEACHING]`
- `[ENGINE FORGE1 TEACHING]`
- `[ENGINE FORGE2 TEACHING]`
- `[ENGINE FORGE3 TEACHING]`
- `[ENGINE FORGE4 — HEAVY SCAFFOLD]`
- `[ENGINE GUIDED ASSIST]`
- `[ENGINE REVEAL]`
- `[ENGINE COUNTEREXAMPLE]`
- `[ENGINE-SEEDED / USER-RECONSTRUCTED]`
- `[ENGINE-SEEDED / USER-UNDERSTOOD]`
- `[ENGINE-EXECUTED CLERICAL WORK]`
- `[SHARED SPLIT]`
- `[ACCIDENTAL OVER-HELP]`
- `[ENGINE OVERREACH — VOID]`

Do not label every sentence.

---

## 13. RAW ENDING SECTIONS

End with marked H2 sections covering:

### Complete Error / Misconception Ledger
For each meaningful error:
- belief/action;
- why it failed;
- repair;
- repair provenance.

### Complete Provenance Audit
Separate:
- User discoveries;
- Engine evaluation;
- assistance;
- counterexamples;
- external material;
- contaminated work.

### Proof / Implementation / Transfer / Recovery Debt
State remaining obligations exactly.

If a required application remains incomplete:
- show it here;
- reflect it in `unresolved_gate` when it blocks mastery;
- do not invent `application_debt` YAML.

### Parent Unit Status Note
State explicitly:
- which parent unit contains this atomic investigation;
- atomic clearance does not itself clear the parent;
- remaining sibling work if known from the source.

### Experience / Chronicle
Preserve a concise narrative of how the ARC felt and evolved, grounded in visible source.

### ARC Clearance
State exactly one:
- Incomplete
- Core Cleared
- Core Cleared — Mastery Pending
- Fully Mastered

This clearance applies to the atomic logical ARC only.

---

# FILE 2 — REVISION-GRADE POLISHED EXTRACT

## 14. POLISHED YAML CONTRACT

Begin POLISHED with:

```yaml
---
schema_version: 3

arc_id: <ATOMIC-ID>-POLISHED
logical_arc_id: <ATOMIC-ID>
canonical_label: <ATOMIC-ID>
document_type: polished_extract
document_status: polished

title: "<exact atomic title>"

terminal_id: T25
terminal_title: <exact supported T25 terminal title or null>

module_id: null
module_index: null
module_title: null
canonical_node: <parent T25 unit or null>

atomic_position: <integer or null>
atomic_total_in_module: <integer or null>
atomic_audit_version: <quoted version string or null>

visibility: private
curriculum_role: core
priority: must_do
planning_status: parked
media_status: <none | pending | partial | complete>

clearance: <Incomplete | Core Cleared | Core Cleared — Mastery Pending | Fully Mastered>

engine_version: <quoted engine version or null>
nominal_control_state_final: <WALL | HINT | FORGE | FORGE0 | FORGE1 | FORGE2 | FORGE3 | FORGE4 | FORGE5 | GUIDE | REVEAL | null>
highest_effective_assistance: <WALL | HINT | FORGE | FORGE0 | FORGE1 | FORGE2 | FORGE3 | FORGE4 | FORGE5 | GUIDE | REVEAL | null>

recovery_state: <not_owed | owed | cleared | unknown>
unresolved_gate: <string or null>

focused_hours: <number or null>
started_at: <YYYY-MM-DD or null>
completed_at: <YYYY-MM-DD or null>

proof_debt: []
implementation_debt: []
transfer_debt: []
recovery_debt: []

assistance_summary: <string or null>
provenance_summary: <string or null>
assistance_events: []

prerequisites: []
supplementary: []
supplementary_to: []
related: []
deepens: []
historical_next: []
depends_on: []
replaces: []
part_of:
  - <parent T25 unit when explicitly supported>
redirect_to: []

tags:
  - chrono_deck
  - t25
  - mstat
---
```

RAW and POLISHED logical-authority fields must match.

---

## 15. POLISHED PHILOSOPHY

POLISHED is the long-term human study artifact.

It should let the User:
- relearn the atomic investigation;
- recover the decisive idea quickly;
- recover the clean final mathematics;
- remember personal traps;
- see domain/assumption conditions;
- distinguish independent work from assistance;
- know remaining debt;
- know exactly how this atomic card fits its T25 parent.

It must NOT be:
- merely a compressed transcript;
- merely a textbook solution;
- a formula sheet;
- a fictional rewrite.

---

## 16. POLISHED RECOMMENDED STRUCTURE

Use marked H2 headings such as:

```markdown
# <ATOMIC-ID> — <ATOMIC TITLE>

## Mission
<!-- CHRONO-SECTION id=mission role=mission -->

## Revision Snapshot
<!-- CHRONO-SECTION id=revision-snapshot role=main_ideas -->

## T25 Parent / Scope Position
<!-- CHRONO-SECTION id=t25-position role=notes -->

## Starting Knowledge / Allowed Facts
<!-- CHRONO-SECTION id=starting-facts role=starting_facts -->

## Central Investigation
<!-- CHRONO-SECTION id=investigation role=investigation -->

## Important False Starts
<!-- CHRONO-SECTION id=false-starts role=false_starts -->

## Decisive Breakthrough
<!-- CHRONO-SECTION id=breakthrough role=breakthrough -->

## Final Derivation / Proof
<!-- CHRONO-SECTION id=proof role=proof -->

## Application / Exam-Facing Use
<!-- CHRONO-SECTION id=application role=application -->

## Unfamiliar Transfer
<!-- CHRONO-SECTION id=transfer role=transfer -->

## Recovery Transfer
<!-- CHRONO-SECTION id=recovery-transfer role=transfer -->

## Error / Misconception Ledger
<!-- CHRONO-SECTION id=error-ledger role=error_ledger -->

## Provenance Audit
<!-- CHRONO-SECTION id=provenance role=provenance -->

## Proof / Implementation / Transfer / Recovery Debt
<!-- CHRONO-SECTION id=debt role=debt -->

## Media
<!-- CHRONO-SECTION id=media role=media -->

## Revision Sheet
<!-- CHRONO-SECTION id=revision-sheet role=main_ideas -->

## Parent Unit Handoff
<!-- CHRONO-SECTION id=parent-handoff role=notes -->

## Short Conclusion
<!-- CHRONO-SECTION id=conclusion role=conclusion -->

## Experience / Chronicle
<!-- CHRONO-SECTION id=chronicle role=chronicle -->

## ARC Clearance
<!-- CHRONO-SECTION id=clearance role=clearance -->
```

Include Recovery Transfer only if recovery actually occurred.

---

## 17. REVISION SNAPSHOT — REQUIRED

Near the top include:
- Central question;
- Core result/capability;
- Decisive idea;
- Why it works;
- Critical conditions/domain restrictions;
- Biggest traps;
- Ownership/assistance note;
- Parent unit + sibling context when supported.

Only include material established in the ARC.

Do not smuggle later T25 knowledge into the snapshot.

---

## 18. FINAL DERIVATION STANDARD

Present the cleanest version of what was actually established.

You may:
- reorganize established steps;
- clean notation;
- consolidate repeated algebra;
- normalize formatting.

You may NOT:
- replace the achieved proof with a stronger outside proof;
- introduce a theorem not used;
- silently change assumptions;
- silently strengthen/weaken claims;
- attribute Engine-supplied bridges wholly to the User.

Discovery may be messy.

Final derivation may be clean.

---

## 19. ERROR LEDGER

Prefer a compact table:

| Error / confusion | Why it failed | Correct model | Provenance of repair |

Only include errors that actually occurred or were explicitly established.

For early T25 cards, preserve especially:
- domain-loss errors;
- extraneous/lost solutions;
- implication/equivalence confusion;
- input/parameter confusion;
- quantifier/counterexample confusion.

Do not add generic “common mistakes” that never appeared.

---

## 20. PROVENANCE STANDARD

Assistance contamination is local.

Do not erase independent work because help occurred elsewhere.

Do not call the entire ARC independent merely because the core began under WALL.

Track major intellectual bridges separately.

Preserve nuanced states such as:
- Engine-seeded / User-reconstructed;
- Engine-seeded / User-understood;
- shared split;
- clerical Engine execution.

Final clearance must agree with recovery/debt state.

---

## 21. PARENT UNIT HANDOFF — REQUIRED FOR T25

Include a short section that says:
- Parent unit ID/title;
- what THIS atomic card now contributes;
- which sibling atomic cards remain, if known;
- what evidence still needs to exist before parent clearance;
- that atomic mastery does not auto-clear the parent.

Example principle:

> `T25-ARC801-A01` establishes only the Domain-Safe Algebra component of `ARC801`. Parent clearance remains pending until the remaining ARC801 atomic ownership targets and mixed readiness evidence are satisfied.

Do not mark siblings complete unless the source establishes it.

---

## 22. REVISION SHEET — REQUIRED

Include:

### Must Remember
Smallest conceptual set that reconstructs the ARC.

### Key Equations / Objects
Only those genuinely established.

### Why They Are True
Short structural explanations.

### Conditions / Domain Restrictions
Make assumptions explicit.

### Common Failure Modes
Source-grounded recurring traps.

### What I Personally Got Stuck On
User-specific blockers from this ARC.

### Provenance Caveat
Only where assistance materially matters.

### T25 Reuse
Where this capability returns later, only if established by supplied/current curriculum context.

Do not create new quiz questions here.

---

# ARCHIVE FORMAT

## 23. OBSIDIAN MATH CONTRACT

Archive math uses:

Inline:
`$...$`

Display:
```text
$$
...
$$
```

Opening and closing `$$` belong on separate lines.

Normalize live-chat mathematical presentation without changing meaning/provenance.

When clearly mathematical:
- live `\(...\)` → `$...$`;
- live `\[...\]` → `$$...$$`;
- genuine fenced `math` display → `$$...$$`;
- mathematical backtick spans → `$...$` when they are math rather than code.

Do NOT blindly replace inside:
- YAML;
- genuine code;
- regex;
- filenames;
- terminal output;
- programming strings;
- literal Markdown examples;
- historical delimiter discussions.

Syntax-aware normalization only.

---

## 24. CODE / TABLE / DATA

Preserve code blocks when code genuinely matters.

Do not convert code to math.

Tables are useful for:
- error ledgers;
- result comparison;
- provenance;
- assumptions.

Avoid long derivations inside tables.

Preserve exact values when exactness mattered.

---

## 25. LOGICAL-AUTHORITY PAIR COHERENCE

At creation time RAW and POLISHED must match on:
- `logical_arc_id`;
- `canonical_label`;
- terminal identity;
- parent/canonical node;
- atomic coordinates;
- audit version;
- clearance;
- final nominal control state;
- highest assistance;
- recovery state;
- unresolved gate;
- focused hours/dates;
- debt arrays;
- assistance/provenance summaries;
- assistance events;
- media status.

Representation-level fields differ as designed:
- `arc_id`;
- `document_type`;
- `document_status`;
- title suffix;
- curriculum role;
- priority;
- prose detail;
- tags.

Do not write cloud-sync revision/fingerprint fields.

These files represent audited state **at atomic ARC close**.

Later authority changes should not silently rewrite historical provenance.

---

## 26. APPLICATION-DEBT COMPATIBILITY

Schema V3 has no dedicated `application_debt` YAML field.

If required application work remains:
- do not invent the field;
- do not relabel it as implementation debt;
- state it visibly in Debt;
- use `unresolved_gate` when it is the active blocker;
- keep clearance consistent.

---

## 27. MEDIA STATE

`media_status` is required in both files:
- `none` — no ARC media needs mirroring;
- `pending` — media exists but mirroring not verified;
- `partial` — only if explicitly established;
- `complete` — only if explicitly established.

A filename alone does not prove mirroring.

---

## 28. SEMANTIC ARCHIVE ENRICHMENT

If private archive relationship tools are available, use them only AFTER reconstructing the current ARC.

Semantic search may suggest:
- `related`;
- comparison notes;
- recurring error-theme links.

It MUST NOT determine:
- identity;
- parent unit;
- chronology;
- prerequisite status;
- clearance;
- debt;
- assistance;
- provenance;
- ownership.

Empty relationships are better than false ones.

---

# PREFLIGHT

## 29. STRUCTURAL PREFLIGHT — REQUIRED

Before writing files verify:
1. YAML parses.
2. `schema_version: 3`.
3. RAW ID = `<ATOMIC-ID>-RAW`.
4. POLISHED ID = `<ATOMIC-ID>-POLISHED`.
5. Both share bare `logical_arc_id`.
6. Both share `canonical_label`.
7. No obsolete `canonical_arc_id`.
8. `atomic_audit_version` is string when present.
9. `engine_version` is string when present.
10. legal `media_status` in both.
11. pair-coherence fields match.
12. every H2 has exactly one marker.
13. marker IDs unique.
14. marker roles supported.
15. filenames exact.
16. no invented cloud-sync fields.
17. RAW contains detailed chronology.
18. POLISHED contains Revision Snapshot.
19. POLISHED contains Revision Sheet.
20. POLISHED contains Parent Unit Handoff.
21. provenance is not flattened.
22. unfinished required application remains visible.
23. atomic clearance is not transferred to parent.
24. T25 parent is represented through `canonical_node` / explicit `part_of`, not fake T22 module metadata.
25. UTF-8 valid.

Repair and rerun if any fail.

---

## 30. OBSIDIAN MATH PREFLIGHT

Outside protected literal/code contexts verify:
- no unintended live `\(` `\)` `\[` `\]`;
- balanced inline dollar spans;
- balanced display pairs;
- display delimiters on own lines;
- inline math does not span paragraphs;
- currency dollars do not open math;
- YAML excluded;
- code excluded;
- literal delimiter discussions preserved;
- no corrupted/private-use wrappers;
- mathematical meaning unchanged.

Fail and repair on any violation.

---

## 31. RAW QUALITY PREFLIGHT

Ask:
- Is chronology detailed?
- Are meaningful baby steps preserved?
- Are repeated failed attempts preserved when they matter?
- Are User equations and conditions preserved?
- Are mental models/uncertainty preserved?
- Are assistance events preserved?
- Could future-me distinguish pre-help from post-help knowledge?
- Is reconstruction honestly labelled?
- Is parent/non-transfer status clear?
- Could a future reader reconstruct what actually happened?

If not, RAW is incomplete.

---

## 32. POLISHED QUALITY PREFLIGHT

Ask:
- Can I recover the mission quickly?
- Is Revision Snapshot useful?
- Is the decisive insight clear?
- Is final math clean?
- Are domain/assumption conditions visible?
- Are important personal mistakes preserved?
- Is provenance auditable?
- Is debt explicit?
- Is Revision Sheet useful months later?
- Is Parent Unit Handoff precise?
- Did I avoid later T25 material?
- Could the User relearn this atomic ARC from POLISHED alone?

If not, POLISHED is incomplete.

---

## 33. FINAL PAIR AUDIT

RAW and POLISHED describe the same logical atomic ARC.

They may differ in detail.

They must not disagree on:
- clearance;
- assistance;
- recovery;
- debt;
- provenance;
- dates;
- focused time;
- media;
- parent identity.

If one says Fully Mastered while the other implies unresolved required debt:
STOP and resolve from source.

---

## 34. FILE CREATION REQUIREMENT

Create BOTH actual files.

Final chat response should be short and contain:
1. link to `<ATOMIC-ID>-RAW.md`;
2. link to `<ATOMIC-ID>-POLISHED.md`;
3. one sentence stating atomic clearance and remaining debt;
4. when useful, one sentence reminding that parent-unit clearance remains separate.

Do not paste the full files unless explicitly asked.

---

## 35. FINAL SELF-AUDIT

Before writing:
- identity exact;
- parent exact;
- no fake module metadata;
- RAW forensic;
- POLISHED revision-grade;
- math normalized;
- provenance honest;
- debt explicit;
- atomic completion not promoted to parent completion;
- schema V3 preserved;
- pair coherent.

Repair any failure before file creation.

---

# T25 ATOMIC METADATA INPUT

Atomic ID:
<PASTE OR RECOVER FROM ARC>

Atomic title:
<PASTE OR RECOVER FROM ARC>

Parent T25 unit:
<PASTE OR RECOVER FROM ARC>

Parent title:
<PASTE OR null>

Atomic position inside parent:
<PASTE OR null>

Atomic total inside parent:
<PASTE OR null>

Atomic audit version:
<PASTE OR null>

Started date:
<YYYY-MM-DD OR null>

Completed date:
<YYYY-MM-DD OR null>

Approximate focused hours:
<PASTE OR null>

Engine version:
<PASTE OR null>

Media state evidence:
<none | pending | partial | complete | AUTO FROM SOURCE>
