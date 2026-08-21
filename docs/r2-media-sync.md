# Chrono-Deck R2 Media Sync

Chrono-Deck keeps Markdown and structured ARC metadata in Supabase while moving binary ARC assets to Cloudflare R2.

## Ownership model

```text
Obsidian vault
  = canonical human-authored ARC Markdown + local assets

Supabase Postgres
  = ARC mirror, sections, relationships, revisions, semantic index, media manifest

Cloudflare R2
  = binary media objects only
```

The Markdown is never rewritten to R2 URLs. Local Obsidian embeds stay local and portable.

## Local layout

```text
Chrono-Deck/
├── ARCs/
│   ├── T22-M01-A03-RAW.md
│   └── T22-M01-A03-POLISHED.md
└── Assets/
    └── T22-M01-A03/
        ├── secant-sketch.png
        ├── derivation.gif
        └── notebook-photo.jpg
```

## R2 object key

Binary objects are content-addressed:

```text
<user>/<logical-arc-id>/<sha256>-<safe-filename>
```

A file whose content hash already exists does not need to be uploaded again. RAW and POLISHED can point to the same object.

## Security

The Obsidian plugin must never contain long-lived R2 credentials.

The intended flow is:

```text
Obsidian Bridge
  |  existing Supabase user session
  v
Chrono-Deck media gateway on Render
  |  validates the Supabase user
  |  holds R2 credentials server-side
  v
short-lived presigned PUT / GET URL
  |
  v
Obsidian <----------------------> Cloudflare R2
```

The media bytes travel directly between Obsidian and R2. Render only authorizes and signs the operation.

## Push flow

`Chrono-Deck: Sync current ARC to Chrono-Deck` will eventually perform:

```text
1. Read current Markdown.
2. Discover supported local media references.
3. Resolve each referenced local file inside the vault.
4. Hash the file with SHA-256.
5. Reuse an already-known R2 object when the hash is present.
6. Otherwise request a short-lived presigned PUT URL.
7. Upload the binary directly to R2.
8. Sync the ARC Markdown/document/sections/relationships to Supabase.
9. Sync the media manifest to Supabase.
10. Stamp the local ARC revision/fingerprint.
```

Only the open ARC is synced. Unrelated Obsidian files are ignored.

## Pull flow

```text
1. Pull ARC Markdown from Supabase.
2. Load its media manifest.
3. For each R2-backed item missing locally, request a short-lived presigned GET URL.
4. Download into Chrono-Deck/Assets/<logical-arc-id>/.
5. Keep the original Markdown reference unchanged.
```

A second device can therefore reconstruct both the ARC note and its local visual assets.

## External media

Normal web/YouTube/Vimeo references remain URLs and use `storage_backend: external`. They are not rehosted.

## Supabase media manifest

`arc_media_items.storage_backend` distinguishes:

- `r2` — normal Chrono-Deck binary asset;
- `supabase` — temporary/fallback backend during migration;
- `external` — URL-only media.

The manifest also records object key, content hash, file name, MIME type, byte size, local path, remote ETag, and upload time.

## Migration strategy

The existing private Supabase Storage bucket remains empty/available until R2 passes an end-to-end upload + pull test. After R2 is proven, it can be removed or retained only as an emergency fallback. Keeping the bucket during transition avoids risking existing media while the new path is being validated.
