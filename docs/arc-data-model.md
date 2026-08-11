# Chrono-Deck ARC data model

Chrono-Deck deliberately separates the **World Registry** from **ARC Documents**.

## 1. World Registry: stable identity and graph structure

`js/data/world.js` owns curriculum topology:

- stable node ID (`ARC005`, `SIDE291`, etc.)
- historical/mastery prerequisite edges
- terminal-route membership
- level, domain and registry metadata
- the 630-node curriculum inventory

Stable IDs are references. Changing an ARC's prose must never require changing its ID.

A registry edit is therefore a structural curriculum change and is validated by `scripts/validate-world.mjs`.

## 2. ARC Documents: mutable learning records

ARC Documents are living records keyed by the stable World Registry ID. Their editable shape is versioned independently from the curriculum graph.

Current schema (`schemaVersion: 1`):

```text
arcId               stable registry key
canonicalLabel       display label such as ARC005
title                editable title
status               raw | editing | polished
visibility           private | public
shortConclusion      editable summary/conclusion
experience           editable chronicle/reflection
sections[]            ordered first-class content units
revision              monotonically increasing save number
createdAt
updatedAt
```

Each section contains:

```text
id                    stable section ID
type                  narrative | investigation | proof | definition |
                      conclusion | reflection | dialogue | media | notes
heading               editable heading
contentMarkdown       Markdown/LaTeX source text
visibility            private | public
position              display order
```

Adding new section types later should be a schema-compatible extension, not a new table or a rewrite of every ARC.

## 3. Repository contract

The Vault UI does not care where ARC Documents are physically stored. It depends on a small repository interface:

```text
load(arcId)
save(document, revisionNote)
listDocuments()
listRevisions(arcId)
restoreRevision(arcId, revisionId)
importDocument(document, revisionNote)
```

`IndexedDbArcRepository` is the current local-first implementation.

A future `SupabaseArcRepository` should implement the same operations. That lets Chrono-Deck move from local drafts to authenticated cloud persistence without redesigning the editor.

## 4. Revision rule

Every save creates an immutable revision snapshot.

Restoring an older snapshot does **not** delete or rewrite newer history. The restored content is saved as a new revision. This keeps experimentation reversible.

## 5. Intended Supabase mapping

The cloud implementation should use relational tables roughly equivalent to:

```text
arc_documents
arc_sections
arc_revisions
```

The database is an implementation detail. The user-facing conceptual model remains:

**one stable ARC identity → one living document → many ordered sections → many revisions**.
