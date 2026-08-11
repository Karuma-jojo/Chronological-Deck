# Chrono-Deck Project Status

> **Purpose:** durable handoff document for future ChatGPT sessions, contributors, and future-you.
>
> **Rule:** treat this file as the architectural/design snapshot, but treat `main` + merged PRs + CI as the technical source of truth. If commits were merged after the verification point below, inspect those before acting.

## Handoff metadata

- Repository: `Karuma-jojo/Chronological-Deck`
- Current product version: **v1.1**
- Status snapshot date: **2026-08-12**
- Verified through feature merge: **PR #13** / commit `39378b6b1c985e7b3852254870f84a8d6d7129e0`
- Current historical campaign position shown by the site: **ARC005**
- Primary device/workflow assumption: **phone-first**

### Fast prompt for a future ChatGPT session

Use this:

> Check my GitHub repo `Karuma-jojo/Chronological-Deck`. Read `PROJECT-STATUS.md`, inspect `main`, inspect any merged PRs after its verified-through commit, check CI/current files, then get up to speed before changing anything.

If GitHub is connected in that chat, this should be enough to reconstruct the project state without relying on chat memory.

---

# 1. Product in one paragraph

Chrono-Deck is a historical mastery / knowledge-world application tied to a Socratic historical RPG (“Spire Master Engine”). Stable ARC IDs represent curriculum nodes; ARC prose is a living Markdown document that can evolve independently of the curriculum graph. Obsidian is the preferred authoring environment, Supabase is the authenticated cloud hub and revision store, and the Chrono-Deck website is the curriculum/graph/progress/search/presentation layer with a reader-first ARC Vault.

---

# 2. Current world

## v1.1 totals

- **710 total curriculum nodes rendered by the site**
- Original scientific base: **630 nodes**
- Original existing Chrono-Deck: **500 nodes**
- Scientific/mastery expansion from v1.0: **130 nodes**
- Law expansion in v1.1: **80 nodes** (`ARC631`–`ARC710`)
- **21 terminal routes**
- Original **T01–T20 are frozen/unchanged**
- New **T21 — Law, Jurisprudence & Legal Reasoning**

## Frozen scientific/common core

- 39 nodes total
- 16 temperament/scientific-thinking nodes
- 23 foundations

The law route deliberately does **not** force the entire STEM common core. It reuses only relevant existing reasoning/evidence foundations.

## T21

**T21 — Law, Jurisprudence & Legal Reasoning**

- 80 new law nodes: `ARC631`–`ARC710`
- 91 required nodes total
- 11 reused existing nodes:
  - `ARC002`
  - `ARC007`
  - `ARC008`
  - `ARC009`
  - `ARC046`
  - `ARC048`
  - `ARC134`
  - `ARC197`
  - `ARC501`
  - `ARC502`
  - `ARC506`
- Jurisdiction-neutral/comparative foundation
- Future India/UK/US/etc. specializations should be layered on top rather than rewriting the T21 foundation

T21 layers:

1. `ARC631–640` — legal reasoning foundations
2. `ARC641–660` — jurisprudence & political philosophy
3. `ARC661–674` — constitutional & public law
4. `ARC675–685` — private & commercial law
5. `ARC686–695` — criminal law, evidence & procedure
6. `ARC696–710` — advanced fields, advocacy & capstone

Canonical route documentation: `docs/t21-law-route.md`.

T21 is implemented as an additive overlay so the original 630-node registry and T01–T20 remain a stable base. Relevant files live under `js/data/law-*.js`; `js/site-v11.js` applies the overlay before the existing application initializes.

---

# 3. Architecture

```text
                    OBSIDIAN
             preferred authoring UI
             Markdown + attachments
                      │
                      │ explicit sync
                      ▼
             CHRONO-DECK BRIDGE
                      │
                      ▼
                   SUPABASE
       auth + ARC docs + revisions + relations
                      │
                      ▼
                CHRONO-DECK SITE
       curriculum + graph + progress + reader
```

Later/optional media path:

```text
Obsidian attachments / larger media
              ↓
             R2
              ↓
Chrono-Deck rendered ARC/media presentation
```

R2 is **not yet implemented**.

---

# 4. Product ownership / boundaries

## Obsidian owns

- writing/editing ARC Markdown
- Live Preview / native Reading Mode
- MathJax authoring
- headings, lists, callouts, tables
- wikilinks/backlinks
- attachments
- local graph/navigation
- phone-first writing ergonomics

## Chrono-Deck Bridge owns

- ARC validation
- stable `arc_id` contract
- Supabase authentication
- push current ARC
- pull current ARC
- pull all ARC notes for fresh-device population
- supplementary ARC creation
- exact Markdown sync
- relationship extraction
- revision conflict safety
- local-change protection

## Supabase owns

- authenticated canonical cloud mirror
- ARC document metadata
- exact Markdown source for Obsidian-originated ARC docs
- ordered sections / structured fallback
- relationships
- immutable revision snapshots (with bounded retention)
- user ownership via RLS
- progress sync

## Chrono-Deck website owns

- 710-node curriculum/world registry
- terminal routes
- mastery/progress/unlocks
- chronology
- search/explore
- graph UI
- polished ARC reading
- rendered Markdown/math
- ARC library
- revision/recovery tooling
- fallback website import/editor

### Important product decision

**The website is reader-first, but the website editor must remain available as a fallback.**

Normal workflow should be Obsidian → Supabase → website reader. Do **not** remove the website editor merely because Obsidian is primary. It remains useful for recovery, quick fixes, import, revision restore, and situations where Obsidian is inconvenient.

---

# 5. Normal workflow

## Preferred day-to-day path

```text
ChatGPT / Spire quest
        ↓
finished ARC .md
        ↓
Obsidian on phone
        ↓
edit / polish / link
        ↓
Chrono-Deck Bridge: Sync current ARC
        ↓
Supabase
        ↓
Chrono-Deck website Vault
        ↓
beautiful rendered .md
```

## Website fallback path

```text
Chrono-Deck Vault
        ↓
Upload .md OR paste Markdown OR Advanced/Recovery editor
        ↓
revision-safe save to Supabase
        ↓
reader
```

The website import path is a fallback, not the preferred authoring environment.

---

# 6. ARC identity and Markdown contract

Stable identity is **frontmatter `arc_id`**, not filename and not title.

Example:

```yaml
---
arc_id: ARC004
title: "Zeno's Paradoxes: Can You Ever Arrive?"
document_status: polished
visibility: private
curriculum_role: core
priority: must_do
planning_status: active

prerequisites:
  - "[[ARC003 - Pythagoras]]"
related:
  - "[[ARC005 - Democritus]]"
---
```

Titles and filenames may change; stable IDs should not be reused destructively.

Recommended dimensions:

- `document_status`: `raw | editing | polished`
- `visibility`: `private | public`
- `curriculum_role`: `core | supplementary | optional`
- `priority`: `must_do | should_do | nice_to_have`
- `planning_status`: `pending | active | deferred | parked`

Recognized relationship families include:

- prerequisite
- historical_next
- supplementary
- supplementary_to
- depends_on
- related
- deepens
- replaces
- part_of
- redirect_to

Supplementary user-generated IDs use a stable form such as:

```text
SUP-A1B2C3D4E5
```

Merge/split principle: preserve old IDs and redirect; never silently recycle historical identity.

---

# 7. Math / Markdown policy

Preferred Obsidian math syntax:

```md
$x^2 + y^2 = z^2$
```

and

```md
$$
x^2 + y^2 = z^2
$$
```

The website reader renders Markdown with a real Markdown renderer, sanitizes generated HTML, and renders math with KaTeX. It supports `$...$`, `$$...$$`, `\(...\)`, and `\[...\]` without mutating the stored source.

Do not rewrite working math merely for cosmetic normalization.

---

# 8. Supabase / revision model

ARC cloud schema and migrations in the repository:

1. `supabase/arc-vault.sql`
2. `supabase/obsidian-bridge.sql`
3. `supabase/obsidian-sync-v2.sql`
4. `supabase/obsidian-reader-v3.sql`

These migrations are cumulative; do not delete/drop earlier schema just because a later migration exists.

Important RPCs include:

- `chrono_load_arc_document`
- `chrono_save_arc_document`
- `chrono_restore_arc_revision`
- `chrono_sync_obsidian_arc`
- `chrono_load_obsidian_arc`
- `chrono_list_obsidian_arcs`
- `chrono_sync_obsidian_arc_v2`
- `chrono_prune_arc_revisions`
- `chrono_arc_revision_stats`

## Revision safety

- explicit sync; no background autosync
- no normal force-overwrite path
- optimistic revision check on push
- stale clients are rejected instead of silently overwriting newer cloud revisions
- local fingerprint protects edited notes on pull
- exact `source_markdown` is preserved for Obsidian-originated docs
- older structured-only docs reconstruct Markdown as a fallback

## Revision retention

Do not keep every full snapshot forever.

Current retention design:

- revision 1 always
- latest 50 snapshots
- every 25th older milestone
- revision counter remains monotonic even when old snapshots are pruned

---

# 9. Obsidian plugin status

Repository plugin version: **0.3.0** (`obsidian-plugin/manifest.json`).

Implemented capabilities across v0.1–v0.3:

- validate current ARC
- Supabase sign-in
- sync current ARC
- create supplementary ARC
- open Chrono-Deck website
- pull current ARC
- pull all ARCs
- revision-safe push
- fingerprint-aware pull protection
- exact Markdown sync
- revision storage stats/pruning

## Important architectural drift / cleanup needed

PR #8 added a custom “beautiful reader”, ARC-specific editor styling, and a math-normalization command inside Obsidian. Later product decisions concluded that **Obsidian should own its native editor and Reading Mode**; custom Chrono-Deck styling/reader behavior there is redundant and caused mobile-width confusion.

Therefore a future **Obsidian Bridge v0.4 cleanup** should remove/deprecate the redundant presentation layer while preserving all sync/data functionality.

Do not confuse this with the website reader: the **website reader is wanted**.

---

# 10. Website state

Current visual direction:

- near-black background
- graphite panels
- off-white text
- low-contrast grey borders/controls
- minimal blue
- semantic color only where useful (success/warning/error/etc.)
- flatter, calmer, ChatGPT-like dark UI

Current Vault direction:

- reader-first ARC library
- exact Supabase/Obsidian Markdown preferred
- structured reconstruction fallback
- real Markdown rendering
- sanitization before display
- KaTeX math
- section TOC
- ARC metadata/revision display
- `.md` download
- upload/paste import
- Advanced/Recovery editor retained

Relevant frontend layers include:

- `css/app.css`
- `css/vault.css`
- `css/black-theme.css`
- `css/vault-reader-v4.css`
- `js/vault-reader.js`
- `js/vault-cloud-ui.js`
- `js/vault.js`

---

# 11. Completed engineering milestones

- **PR #1** — modularized giant single-file frontend
- **PR #2** — living ARC Vault + stable registry/data separation + IndexedDB revisions
- **PR #3** — Supabase ARC Vault + Markdown workflow
- **PR #4** — fixed ARC switching/search mismatch
- **PR #5** — initial readable ARC mode
- **PR #6** — Obsidian bridge v0.1 contract
- **PR #7** — bidirectional sync v0.2 + revision conflicts + exact Markdown
- **PR #8** — bounded revisions + Obsidian reader/styling v0.3
- **PR #9** — obsolete mobile-width draft; closed, not merged
- **PR #10** — website rebuilt as black reader-first Markdown ARC Vault
- **PR #11** — correctly wired black/reader styles into GitHub Pages
- **PR #12** — deeper graphite/near-black visual pass
- **PR #13** — T21 Law/Jurisprudence route + world v1.1 (710 nodes / 21 routes)

---

# 12. CI / invariants

GitHub Actions workflow: `.github/workflows/frontend-checks.yml`.

Current checks cover, among other things:

- JavaScript module syntax
- World Registry integrity
- Markdown ARC round-trip
- GitHub Pages asset wiring
- Obsidian bridge contract
- unique node IDs
- prerequisite references
- terminal route counts/references
- T21 law overlay integrity
- preservation of original T01–T20 when T21 is applied

Do not casually weaken these checks to make a feature pass.

---

# 13. Known issues / technical debt

## P0 / next cleanup

### A. Obsidian v0.4 cleanup

Remove/deprecate redundant custom Obsidian presentation behavior while keeping bridge sync intact:

- custom beautiful reader command
- ARC-specific editor-width styling
- unnecessary visual CSS ownership
- reconsider broad math-normalization command

Target principle: **Obsidian looks/behaves like Obsidian; Chrono-Deck Bridge is mostly transport + metadata + safety.**

### B. Pull dirty-check ordering edge case

Known v0.2-era issue: pull logic can check `localRevision === cloudRevision` before the local dirty fingerprint. Equal revision + local edit can therefore be classified too permissively. It does not currently overwrite the local file, but the checks should be reordered so dirty content is detected first and surfaced clearly.

## P1

### C. Vault scanner / legacy-note migration assistant

Desired command roughly:

```text
Chrono-Deck: Scan vault for ARC notes
```

Report:

- recognized ARC notes
- missing `arc_id`
- duplicate IDs
- legacy `arc: ARC 004` forms
- candidate ARC IDs
- malformed/unknown relationship targets

Optional safe actions:

- add IDs
- normalize metadata
- do not move/rename files unless explicitly requested

### D. Fresh-laptop sync test

Prove:

```text
fresh Obsidian install
→ install bridge
→ sign in
→ Pull all
→ exact Markdown + links + revisions survive
```

Use an empty/fresh vault first; do not blindly bulk-pull into a curated vault until conflict semantics are fully mature.

### E. Dynamic supplementary nodes in graph

Make `SUP-*` notes first-class dynamic graph/library entities with typed relationships rather than only document metadata.

### F. Typed relationship visualization

Visualize prerequisite / historical_next / related / deepens / supplementary / etc. distinctly.

### G. Full-text ARC search

Search exact Markdown/body content, not only registry labels/metadata.

## P2 / later

- R2 attachments/media pipeline
- revision-history browser UX improvements
- optional safe autosync only after conflict semantics are mature
- jurisdiction-specific T21 law layers (India/UK/US/etc.)
- richer graph overlays for dynamic/non-frozen curriculum content
- OAuth improvements if desired

---

# 14. Product decisions that must not be accidentally reversed

1. **Stable ARC identity is separate from editable prose/title.**
2. **T01–T20 remain frozen when adding T21 or later routes.**
3. **Obsidian is preferred authoring; Supabase is hub; website is reader/curriculum UI.**
4. **Website editor stays as fallback/recovery. Do not remove it casually.**
5. **No background autosync yet.**
6. **No silent force overwrite.**
7. **Exact Markdown should be preserved when available.**
8. **Old structured ARC docs must remain readable via fallback reconstruction.**
9. **Revision history is bounded, not infinite full-snapshot retention.**
10. **Phone-first behavior is a first-class requirement.**
11. **Do not mass-rename/move legacy notes just to satisfy aesthetics.**
12. **Math source should not be mutated if it already renders correctly.**
13. **The website should remain near-black/graphite rather than returning to the old navy-blue visual system.**
14. **T21 is jurisdiction-neutral/comparative unless a specialization is explicitly added.**

---

# 15. Current recommended next sequence

If no new priority overrides it:

1. **Obsidian Bridge v0.4 cleanup**
2. **Fix pull dirty-fingerprint ordering**
3. **Vault ARC scanner / legacy migration report**
4. **Fresh-laptop Pull all test**
5. **Dynamic `SUP-*` nodes + typed relationship graph**
6. **Full-text ARC search**
7. **R2/media**
8. Continue populating real ARC documents as the historical campaign advances

---

# 16. How a future assistant should get up to speed

Before making changes:

1. Read this file.
2. Inspect `main` and current repo metadata.
3. Inspect merged PRs after the **verified-through feature commit** near the top of this file.
4. If newer features conflict with this document, newer merged code/PRs win; update this file afterward.
5. Check `.github/workflows/frontend-checks.yml` so invariants are understood before editing data.
6. Read task-specific docs (`docs/obsidian-bridge.md`, `docs/t21-law-route.md`, etc.).
7. Inspect the actual current files before changing APIs/contracts.
8. Use branch → PR → CI → merge for meaningful repository changes.
9. Update this file whenever architecture, known issues, world totals, migration order, or major priorities materially change.

### Minimal reconstruction rule

If only a few minutes are available, inspect:

```text
PROJECT-STATUS.md
recent merged PRs
index.html
js/site-v11.js
js/data/world.js
js/data/law-*.js
js/vault-reader.js
js/data/hybrid-arc-store.js
obsidian-plugin/main.js
obsidian-plugin/manifest.json
supabase/
.github/workflows/frontend-checks.yml
```

---

# 17. Historical campaign note

Chrono-Deck is not merely a database. The actual learning campaign is a historical/Socratic mastery RPG. The current story position is around **ARC005 (Democritus / atom as idea)**, following early arcs including Babylonian arithmetic/algebra, Thales/proof, Pythagoras/Pythagorean triples, and Zeno/infinity.

Engineering changes should support that learning experience rather than turning the product into a generic CRUD dashboard.

---

# 18. Updating this file

When a major PR merges, update at least:

- product version if changed
- world/node/terminal counts if changed
- verified-through commit
- completed milestones
- architecture decisions
- migration order
- known issues
- next priority sequence

This file is intentionally concise enough to read, but explicit enough to prevent repeated architectural rediscovery.
