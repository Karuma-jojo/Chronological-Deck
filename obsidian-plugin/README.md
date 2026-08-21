# Chrono-Deck Bridge for Obsidian

Private mobile-compatible bridge for authoring Chrono-Deck ARC notes in Obsidian while keeping Supabase as the shared structured cloud hub and Cloudflare R2 as the private ARC-media store.

## Install and update with BRAT (recommended)

Chrono-Deck Bridge is distributed as GitHub releases so private installs can update without manually copying plugin files.

1. In Obsidian, open **Settings → Community plugins → Browse** and install **BRAT**.
2. Enable BRAT.
3. Open the Command Palette and run **BRAT: Add a beta plugin for testing**.
4. Enter this repository:

   `https://github.com/Karuma-jojo/Chronological-Deck`

5. Choose the latest release when BRAT asks for a version.
6. Enable **Chrono-Deck Bridge** under **Settings → Community plugins**.

If an older manual copy of `chrono-deck-bridge` already exists, BRAT installs the same plugin ID into that plugin folder, replacing the release files. Reload or re-enable the plugin after the first BRAT install.

Future Chrono-Deck Bridge releases are published with `main.js`, `manifest.json`, and `styles.css`, which BRAT can pull online. Plugin changes must bump the semantic version in `obsidian-plugin/manifest.json`; CI rejects plugin-asset changes that reuse an already-published version.

### Manual fallback

If BRAT is unavailable, copy the release assets into:

`.obsidian/plugins/chrono-deck-bridge/`

Required release files are `main.js`, `manifest.json`, and `styles.css`. Then reload Obsidian and enable **Chrono-Deck Bridge**.

Requires Obsidian 1.11.4+ because credentials use Obsidian SecretStorage.

## One-time configuration

1. Run the Chrono-Deck Supabase migrations already tracked by the repository.
2. In Obsidian plugin settings, enter the same Supabase project URL and account email on each device.
3. Add/select your **public publishable/anon key** through SecretStorage. Never use `service_role`.
4. Run **Chrono-Deck: Sign in to Supabase** on that device.
5. Leave the default ARC folder as `Chrono-Deck/ARCs` and asset folder as `Chrono-Deck/Assets` unless you intentionally use a different vault layout.
6. The default media gateway is `https://chrono-deck-media.onrender.com`. R2 credentials live on that server and are never stored by the Obsidian plugin.

## Commands

- **Validate current ARC note** — checks the required frontmatter contract.
- **Sign in to Supabase** — creates a Supabase Auth session; tokens are kept in SecretStorage.
- **Sync current ARC to Chrono-Deck** — pushes the current Markdown note, structured sections, metadata and relationships, then discovers local ARC media and mirrors missing content-addressed objects to private R2.
- **Pull current ARC from Chrono-Deck** — updates the open ARC when the cloud has a newer revision and restores missing R2-backed assets. It refuses to overwrite locally edited Markdown or a locally different media file.
- **Pull all Chrono-Deck ARCs to this device** — creates missing cloud ARCs, updates clean tracked notes, and restores missing media. Conflicts are skipped rather than overwritten.
- **Show current ARC revision storage** — reports the full revision snapshots retained for the active ARC.
- **Show Chrono-Deck archive storage health** — reports Markdown, revision, embedding, and ARC-table footprint.
- **Create supplementary ARC from current note** — creates and cross-links a new `SUP-...` note locally.
- **Open Chrono-Deck website** — opens the configured web app.

## Cross-device workflow

Phone or laptop A:

`edit ARC + local assets -> Sync current ARC -> Supabase metadata/search + R2 binaries`

Laptop or phone B:

`Pull all Chrono-Deck ARCs -> missing assets restored -> edit -> Sync current ARC`

The bridge stores `chrono_revision`, `chrono_synced_at`, `chrono_fingerprint`, and media bookkeeping in synchronized ARC frontmatter. These `chrono_*` fields are machine-owned and excluded from substantive-content fingerprinting.

This is ARC sync, not full Obsidian-vault sync: themes, workspace layout, unrelated notes and other plugin settings are not copied.

## Local-first media behavior (v0.4)

Normal Obsidian references remain normal local references, for example:

```markdown
![[../Assets/T22-M01-A03/secant-sketch.png]]
```

The plugin does not rewrite that embed to an R2 URL.

On Sync it discovers supported media outside fenced code blocks, resolves the local vault file, calculates SHA-256, checks whether the corresponding R2 object already exists, uploads only when missing, and writes metadata to `arc_media_items`. RAW and POLISHED documents can therefore point at the same content-addressed R2 object.

On Pull it loads the manifest and restores a missing local file through a short-lived signed R2 URL. The downloaded bytes are SHA-256 verified before writing. If a file already exists at the local path but has different content, the bridge keeps the local file and reports a conflict.

YouTube and Vimeo references remain external links and are not rehosted. The first media-bridge release uses a 100 MiB per-file safety cap.

## Reader + editor experience

- **Open current ARC in beautiful reader** opens a mobile-first rendered article using Obsidian's Markdown renderer.
- Math is rendered with Obsidian MathJax. The reader understands both Obsidian `$...$` / `$$...$$` and legacy `\\(...\\)` / `\\[...\\]` delimiters.
- **Fix math rendering in current ARC** permanently converts legacy delimiters outside fenced code blocks to Obsidian-compatible MathJax delimiters.
- While an `arc_id` note is active, `styles.css` applies a narrower focus layout to Obsidian's normal editor. For the cleanest editing experience, use Obsidian **Live Preview**.

## Revision retention and storage hygiene

The current bridge keeps revision 1, the latest 20 full snapshots, and every 50th older revision as a milestone. Revision numbers remain monotonic; pruning old snapshot rows does not reset the revision counter.

Substantive no-op syncs do not mint a new revision, and unchanged H2 sections remain in place so their semantic embeddings are not regenerated unnecessarily.

See `docs/obsidian-bridge.md` for the canonical ARC metadata/relationship contract and `docs/arc-media-sync.md` for the R2 media architecture and acceptance test.
