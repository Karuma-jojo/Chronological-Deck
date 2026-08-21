# Chrono-Deck Dual ARC Extractor

Use this after an Atomic ARC finishes.

The archive has one logical ARC and two document representations:

- `<ARC>-RAW.md` — forensic chronological black-box record.
- `<ARC>-POLISHED.md` — canonical readable/narrative study record.

Both documents MUST be generated independently from the original ARC conversation.

Do not generate POLISHED by summarizing RAW.
Do not generate RAW by expanding POLISHED.

---

## Invocation

Generate BOTH downloadable Markdown files for this completed Atomic ARC from the actual conversation.

### Identity

Use one stable logical ARC id, for example:

`T22-M01-A02`

Create:

`T22-M01-A02-RAW.md`

with:

```yaml
arc_id: T22-M01-A02-RAW
logical_arc_id: T22-M01-A02
document_type: raw_dump
document_status: raw
```

and:

`T22-M01-A02-POLISHED.md`

with:

```yaml
arc_id: T22-M01-A02-POLISHED
logical_arc_id: T22-M01-A02
document_type: polished_extract
document_status: editing
```

Use known ARC/module metadata when supported by the conversation or curriculum card. Do not invent unknown values.

Use `null` for unknown scalars and `[]` for unknown lists where appropriate.

### Mathematics

Use Obsidian/Markdown MathJax only:

- inline: `$...$`
- display: `$$...$$`

Do not use `\\(...\\)` or `\\[...\\]` except inside fenced code blocks where literal source text must be preserved.

---

# FILE 1 — ULTRA-DETAILED RAW DUMP

Treat the original conversation as the primary source of truth.

Preserve the ARC chronologically and forensically.

Do NOT:

- rewrite it into a clean textbook solution;
- smooth over struggle;
- invent missing reasoning;
- silently correct old mistakes;
- make User work look more independent than it was;
- remove embarrassing but pedagogically meaningful errors.

Include when present:

- opening problem / mission;
- starting knowledge and Allowed-Facts Ledger;
- every serious User attempt;
- baby-step algebra and intermediate calculations when they mattered;
- wrong turns, failed conjectures, abandoned routes and arithmetic slips;
- User reactions/thoughts that affected the investigation;
- significant WALL evaluations;
- every HINT;
- every FORGE interaction with nominal level;
- what FORGE taught or demonstrated;
- nominal versus actual informational effect;
- GUIDE / REVEAL / counterexample / accidental-over-help events;
- turning points;
- proof/derivation/implementation attempts in actual order;
- final result exactly as ownership was actually achieved;
- applications;
- unfamiliar transfer;
- recovery if any;
- provenance;
- error ledger;
- prerequisite/proof/recovery debt;
- final clearance.

For each major bridge record where meaningful:

```text
BRIDGE:
NOMINAL CONTROL STATE:
HIGHEST EFFECTIVE ASSISTANCE:
USER CONTRIBUTION:
ENGINE CONTRIBUTION:
PROVENANCE:
RECOVERY OWED: YES / NO
```

Use conservative provenance.

Do not label something `[USER'S WORK]` merely because the User typed the final equation when FORGE/GUIDE materially supplied the structure.

If a lower nominal FORGE level functionally became more revealing, record the higher effective assistance.

If the available conversation cannot support a detail, mark it unavailable rather than inventing it.

The RAW DUMP may be extremely long. Completeness is more important than elegance.

---

# FILE 2 — CANONICAL POLISHED EXTRACT

Generate this independently from the original conversation.

Optimize for:

- future study;
- navigability;
- mathematical clarity;
- a memorable narrative of the actual investigation;
- accurate provenance.

Preserve important false starts and mistakes, but do not reproduce every repetitive dead end.

Recommended structure:

1. Mission
2. Starting Position
3. Investigation Chronicle
4. Main Ideas
5. Important False Starts / Turning Points
6. Final Proof / Derivation / Implementation
7. Application
8. Unfamiliar Transfer
9. Mistakes Worth Remembering
10. Provenance / Assistance
11. Proof / Recovery Debt
12. Media
13. Short Conclusion
14. Experience / Chronicle
15. Clearance

The narrative may be vivid and readable, but it must not fictionalize events or rewrite assistance history.

### Media rule

Missing media NEVER blocks document generation or ARC clearance.

When an image, GIF, diagram or video belongs somewhere but is not available, insert a stable placeholder such as:

```html
<!-- MEDIA-SLOT: T22-M01-A02-M01
 type: image
 purpose: diagram used during the unequal-endpoint investigation
 status: pending
-->
```

For external videos, preserve a normal link/metadata reference rather than copying the video itself.

`media_status: pending` means presentation work remains. It does NOT mean the ARC is academically incomplete.

---

# SEMANTIC ARCHIVE ENRICHMENT

If the connected Chrono-Deck private archive tools are available, use them AFTER the current ARC has been reconstructed from this conversation and BEFORE finalizing frontmatter.

Preferred tool:

`suggest_arc_frontmatter_links`

Provide it with the current ARC's known title, concise summary, topics, skills and error themes. It searches completed/parked polished ARC records and returns semantically similar candidates.

You may also use:

- `search_completed_arc_archive` for a specific concept/error/proof-pattern lookup;
- `get_arc_archive_bundle` to verify an exact logical ARC/document identity;
- `find_semantically_related_arcs` when the current logical ARC is already present in the archive.

### What semantic search MAY enrich

Semantic search may propose candidates for:

- `related`
- cross-ARC comparison notes
- recurring error-theme references
- conceptually similar prior investigations
- possible `deepens` relationships ONLY when the current conversation/curriculum record independently supports that directional relationship.

### What semantic search MUST NOT determine

Never infer any of the following from similarity alone:

- `arc_id`
- `logical_arc_id`
- terminal/module/atomic identity
- chronology
- prerequisites
- `depends_on`
- clearance
- proof debt
- implementation debt
- transfer debt
- recovery debt
- assistance level
- provenance
- User ownership

Those fields remain grounded in the current conversation and canonical curriculum records.

A semantically similar ARC is not automatically a prerequisite, ancestor, dependency, or historical predecessor.

If semantic archive tools are unavailable, continue extraction normally. Their absence must never block file generation.

Do not include low-confidence or obviously superficial semantic matches merely to fill frontmatter. An empty `related: []` is preferable to a false relationship.

---

# FINAL OUTPUT

Create the actual two `.md` files and provide both download links.

Before finishing, verify:

- both files use the same `logical_arc_id`;
- their `arc_id` values are distinct;
- RAW and POLISHED were independently reconstructed from the source conversation;
- provenance reflects actual informational effect;
- no missing media blocked extraction;
- semantic enrichment, if used, changed only fields it was allowed to enrich;
- Markdown mathematics uses `$...$` and `$$...$$`.
