# Chrono-Deck ↔ Obsidian bridge contract

Obsidian is the primary human authoring surface for ARC documents. Supabase is the authenticated structured mirror/index and cross-device ARC hub. The World Registry in `js/data/world.js` remains the immutable seed for the original curriculum; user-created supplementary notes live in the database overlay and do not require editing `world.js`.

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

Relationship values should be Obsidian wikilinks to files whose names begin with their stable ID. Plain IDs are also accepted. Cloud-created files use the stable ID as the filename (`ARC004.md`) so reconstructed relationship links like `[[ARC004]]` remain portable.

## Stable IDs

Existing registry IDs stay unchanged: `ARC004`, `SIDE264`, etc.

User-created supplementary notes use locally generated IDs such as `SUP-A1B2C3D4E5`. These belong to the database graph overlay, not the frozen World Registry seed. IDs remain permanent even when titles, prose, status, or graph relationships change.

Merges should preserve the old ID using `redirect_to` rather than deleting it. Splits should preserve the parent note and link new child IDs.

## Push semantics (v0.2)

`Chrono-Deck: Sync current ARC to Chrono-Deck` performs one authenticated Supabase RPC call. The transaction atomically updates:

1. `arc_documents`
2. ordered `arc_sections`
3. typed `arc_relationships`
4. one immutable `arc_revisions` snapshot
5. the exact current Obsidian Markdown source for cross-device reconstruction

The client sends `p_expected_revision`, the cloud revision the local note was based on. Supabase holds a per-user/per-ARC transaction lock and rejects the write if the cloud revision no longer matches. A stale phone or laptop therefore cannot silently overwrite a newer device.

After a successful push, the note receives three bookkeeping properties:

- `chrono_revision`
- `chrono_synced_at`
- `chrono_fingerprint`

The fingerprint ignores `chrono_*` properties themselves and is used only to tell whether a tracked local file has changed since its last successful push/pull.

## Pull semantics (v0.2)

**Pull current ARC from Chrono-Deck** loads the cloud copy for the open ARC.

**Pull all Chrono-Deck ARCs to this device** lists the user's cloud ARCs and creates missing files under the configured ARC folder. New cloud-created files use stable filenames such as `Chrono-Deck/ARCs/ARC004.md`.

For an existing local ARC:

- same local/cloud revision → leave the file alone;
- cloud newer + local fingerprint unchanged → update the local note;
- cloud newer + local note edited → report a conflict and leave the local file untouched;
- local revision newer than cloud → report a conflict and leave the local file untouched.

There is deliberately no force-overwrite or background autosync in v0.2. Conflict resolution remains explicit while the bridge is being proven.

Older ARC rows created by the website may not yet have an exact `source_markdown` copy. The pull path reconstructs a canonical Markdown note from the stored document, sections and relationships. Once that note is pushed from Obsidian, future pulls can preserve its exact Markdown source.

## Security

The plugin never writes the Supabase publishable key, password, access token, or refresh token into an ARC note. The publishable key and session tokens use Obsidian SecretStorage; the password is only held in memory during sign-in. Supabase Auth JWTs are sent to the Data API/RPC layer and RLS restricts rows to the signed-in user.

## Supplementary ARC creation

The plugin command **Create supplementary ARC from current note**:

1. generates a permanent `SUP-...` ID;
2. creates a Markdown note in the configured ARC folder;
3. gives it `curriculum_role: supplementary` and `planning_status: pending`;
4. adds `supplementary_to: [[parent]]` to the child;
5. adds the child wikilink to the parent's `supplementary` property using Obsidian's frontmatter API.

The note is not sent to Supabase until the user explicitly syncs it.

## Device model

Supabase synchronizes Chrono-Deck ARC content and ARC metadata. It does not attempt to synchronize Obsidian themes, workspace layout, unrelated notes, hotkeys or third-party plugin configuration. Each device installs/configures the private Chrono-Deck Bridge once, signs into the same Supabase account, then uses Pull/Sync for ARC content.


## Reader, MathJax, and revision retention (v0.3)

The bridge now has a presentation layer without changing canonical ownership: the `.md` file remains authoritative on the device, while **Open current ARC in beautiful reader** renders its body through Obsidian's `MarkdownRenderer` and hides raw frontmatter from the reading surface.

Chrono-Deck canonical Markdown should prefer Obsidian MathJax delimiters:

- inline: `$x^2 + y^2 = z^2$`
- display: `$$ ... $$`

The reader temporarily normalizes legacy `\\(...\\)` and `\\[...\\]` forms for display. **Fix math rendering in current ARC** can persist that conversion while leaving fenced code blocks untouched.

`supabase/obsidian-reader-v3.sql` adds bounded revision retention. The default policy keeps revision 1, the most recent 50 full snapshots, and every 25th older revision. This avoids unbounded duplication of complete Markdown/JSON snapshots while retaining dense recent history and sparse long-term milestones. Revision numbers themselves are never renumbered or reused.
