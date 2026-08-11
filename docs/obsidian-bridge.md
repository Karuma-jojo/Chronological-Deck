# Chrono-Deck ↔ Obsidian bridge contract

Obsidian is the primary human authoring surface for ARC documents. Supabase is the authenticated structured mirror/index. The World Registry in `js/data/world.js` remains the immutable seed for the original curriculum; user-created supplementary notes live in the database overlay and do not require editing `world.js`.

## Canonical ARC note

Use a normal Markdown note whose filename begins with its stable ID, for example:

`ARC004 - Zeno's Paradoxes.md`

Recommended frontmatter:

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
supplementary:
  - "[[SUP-A1B2C3D4E5 - Infinite checkpoints]]"
related:
  - "[[ARC005 - Democritus]]"
deepens: []
historical_next: []
depends_on: []
replaces: []
part_of: []
redirect_to: []
---
```

The Markdown body remains ordinary Obsidian Markdown/LaTeX. H2 headings become first-class `arc_sections` during sync. `## Short Conclusion` and `## Experience / Chronicle` map to the dedicated document fields; other H2 headings remain ordered sections.

## Metadata dimensions

These fields intentionally describe different things:

- `document_status`: `raw | editing | polished`
- `visibility`: `private | public`
- `curriculum_role`: `core | supplementary | optional`
- `priority`: `must_do | should_do | nice_to_have`
- `planning_status`: `pending | active | deferred | parked`

Do not overload one field to mean another. A polished ARC can still be pending; a supplementary ARC can still be must-do.

## Typed relationship properties

The bridge converts these top-level Obsidian properties into rows in `arc_relationships`:

| Obsidian property | Relationship type | Meaning |
|---|---|---|
| `prerequisites` | `prerequisite` | target should be understood first |
| `supplementary` | `supplementary` | target is a child/side investigation from this ARC |
| `supplementary_to` | `supplementary_to` | this ARC is supplementary to target |
| `related` | `related` | useful non-prerequisite cross-link |
| `deepens` | `deepens` | target develops this idea further |
| `historical_next` | `historical_next` | explicit chronology edge |
| `depends_on` | `depends_on` | broader technical dependency |
| `replaces` | `replaces` | this ARC supersedes target |
| `part_of` | `part_of` | this ARC is a component of target |
| `redirect_to` | `redirect_to` | old/merged ARC resolves to target |

Relationship values should be Obsidian wikilinks to files whose names begin with their stable ID. Plain IDs are also accepted.

## Stable IDs

Existing registry IDs stay unchanged: `ARC004`, `SIDE264`, etc.

User-created supplementary notes use locally generated IDs such as `SUP-A1B2C3D4E5`. These belong to the database graph overlay, not the frozen World Registry seed. IDs remain permanent even when titles, prose, status, or graph relationships change.

Merges should preserve the old ID using `redirect_to` rather than deleting it. Splits should preserve the parent note and link new child IDs.

## Sync semantics

`Chrono-Deck: Sync current ARC to Chrono-Deck` performs one authenticated Supabase RPC call. The transaction atomically updates:

1. `arc_documents`
2. ordered `arc_sections`
3. typed `arc_relationships`
4. one immutable `arc_revisions` snapshot

The note receives only convenience sync metadata (`chrono_synced_at`, `chrono_revision`) after a successful server commit.

The plugin never writes the Supabase publishable key, password, access token, or refresh token into an ARC note. The publishable key and session tokens use Obsidian SecretStorage; the password is only held in memory during sign-in.

## Conflict policy (v0.1)

Obsidian is authoritative for a note when the user explicitly runs **Sync current ARC**. There is no automatic background push in v0.1.

This intentionally avoids silent overwrites while the bridge is new. Pull/reconcile and background sync can be added later with explicit revision comparison.

## Supplementary ARC creation

The plugin command **Create supplementary ARC from current note**:

1. generates a permanent `SUP-...` ID;
2. creates a Markdown note in the configured ARC folder;
3. gives it `curriculum_role: supplementary` and `planning_status: pending`;
4. adds `supplementary_to: [[parent]]` to the child;
5. adds the child wikilink to the parent's `supplementary` property using Obsidian's frontmatter API.

The note is not sent to Supabase until the user explicitly syncs it.
