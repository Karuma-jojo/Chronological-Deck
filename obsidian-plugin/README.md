# Chrono-Deck Bridge for Obsidian

Private mobile-compatible bridge for authoring Chrono-Deck ARC notes in Obsidian while keeping Supabase as the shared structured cloud hub.

## Install for private testing

Copy this folder into your Obsidian vault as:

`.obsidian/plugins/chrono-deck-bridge/`

Then enable **Chrono-Deck Bridge** under **Settings → Community plugins**.

Requires Obsidian 1.11.4+ because credentials use Obsidian SecretStorage.

## One-time configuration

1. Run `supabase/arc-vault.sql` if the ARC Vault schema is not installed yet.
2. Run `supabase/obsidian-bridge.sql` once.
3. Run `supabase/obsidian-sync-v2.sql` once.
4. In Obsidian plugin settings, enter the same Supabase project URL and account email on each device.
5. Add/select your **public publishable/anon key** through SecretStorage. Never use `service_role`.
6. Run **Chrono-Deck: Sign in to Supabase** on that device.

## Commands

- **Validate current ARC note** — checks the required frontmatter contract.
- **Sign in to Supabase** — creates a Supabase Auth session; tokens are kept in SecretStorage.
- **Sync current ARC to Chrono-Deck** — pushes the current Markdown note, structured sections, metadata and relationships. The push includes the revision the local note was based on; Supabase rejects stale writes.
- **Pull current ARC from Chrono-Deck** — updates the open ARC when the cloud has a newer revision. It refuses to overwrite locally edited content.
- **Pull all Chrono-Deck ARCs to this device** — creates missing cloud ARCs under the configured ARC folder and updates clean tracked notes. Conflicts are skipped rather than overwritten.
- **Create supplementary ARC from current note** — creates and cross-links a new `SUP-...` note locally.
- **Open Chrono-Deck website** — opens the configured web app.

## Cross-device workflow

Phone:

`edit ARC -> Sync current ARC -> Supabase`

Laptop / another phone:

`Pull all Chrono-Deck ARCs -> edit -> Sync current ARC`

The bridge stores `chrono_revision`, `chrono_synced_at` and a content fingerprint in synchronized ARC frontmatter. These are bookkeeping fields used to prevent accidental overwrites.

This is ARC sync, not full Obsidian-vault sync: themes, workspace layout, unrelated notes and other plugin settings are not copied.

See `docs/obsidian-bridge.md` for the canonical ARC metadata/relationship contract.

## Reader + editor experience (v0.3.1)

- **Open current ARC in beautiful reader** opens a mobile-first rendered article using Obsidian's Markdown renderer.
- Math is rendered with Obsidian MathJax. The reader understands both Obsidian `$...$` / `$$...$$` and legacy `\\(...\\)` / `\\[...\\]` delimiters.
- **Fix math rendering in current ARC** can convert legacy delimiters outside fenced code blocks to Obsidian-compatible MathJax delimiters; use it only when a note actually needs conversion.
- Chrono-Deck does not alter Obsidian's normal editor width or spacing. Obsidian owns the edit layout completely; `styles.css` styles only the dedicated ARC reader.
- **Show current ARC revision storage** reports how many full revision snapshots remain and their approximate JSON size.

## Revision retention (v0.3)

Run `supabase/obsidian-reader-v3.sql` once. After successful Obsidian pushes, the plugin keeps revision 1, the latest 50 full snapshots, and every 25th older revision as a milestone. Revision numbers remain monotonic; pruning old snapshot rows does not reset the revision counter.
