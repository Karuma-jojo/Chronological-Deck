# Chrono-Deck ARC Media Sync

Chrono-Deck keeps Obsidian as the human/canonical authoring surface and Supabase as the authenticated cloud mirror/index.

The Markdown note stays local-first. Media is mirrored separately so the note does not need to be rewritten to remote URLs.

## Canonical local layout

```text
<Obsidian Vault>/
└── Chrono-Deck/
    ├── ARCs/
    │   ├── T22-M01-A02-RAW.md
    │   └── T22-M01-A02-POLISHED.md
    └── Assets/
        └── T22-M01-A02/
            ├── secant-sketch.png
            ├── error-bound.gif
            └── working-photo.jpg
```

Both RAW and POLISHED documents may reference the same local asset.

## Private cloud layout

Supabase Storage bucket:

```text
chrono-arc-media
```

The bucket is private. Object keys are scoped to the signed-in user and logical ARC. The intended stable key is:

```text
<user-id>/<logical-arc-id>/<content-hash>-<filename>
```

Content hashing makes uploads idempotent: an unchanged asset can be skipped, and two documents can safely refer to the same stored object.

## Media manifest

`arc_media_items` stores metadata only; binary objects live in Supabase Storage.

The media manifest records:

- ARC/document identity;
- logical ARC identity;
- stable slot key;
- media type;
- upload/link state;
- local path;
- content hash;
- object key;
- file name;
- MIME type;
- byte size;
- alt text / purpose;
- external URL where applicable.

`chrono_sync_arc_media_manifest(...)` replaces the manifest for one ARC document after its current media state is known.

`chrono_load_arc_media_manifest(...)` returns the current cloud media manifest for pull/reconstruction.

## Status semantics

`media_status` is presentation/storage state only. It never changes academic clearance.

```text
none      no media referenced
pending   media exists but nothing has been uploaded/linked yet
partial   some media is ready, some is not
complete  every current item is uploaded or externally linked
```

Missing media must never block RAW/POLISHED extraction or academic clearance.

## Planned Obsidian flow

The Bridge will extend the existing explicit `Sync current ARC to Chrono-Deck` command rather than add background autosync.

For one ARC note:

```text
read exact Markdown
→ discover supported local embeds / external media links
→ hash local files
→ upload only missing content-hash objects
→ sync ARC Markdown/document/sections/relationships
→ sync media manifest
→ stamp local revision/fingerprint
```

On pull:

```text
load ARC Markdown
→ load media manifest
→ download missing local assets into Chrono-Deck/Assets/<logical-arc-id>/
→ preserve local Markdown references
```

The cloud mirrors Chrono-Deck ARC content and assets, not the whole Obsidian vault. Themes, workspace layout, unrelated notes, hotkeys, and third-party plugin settings remain device-local.

## External video

YouTube/Vimeo/web video references remain URLs. They are represented as `linked` manifest items and are not copied into object storage.

## Current implementation state

The Supabase backend is live: private bucket, per-user object policies, manifest metadata columns, and sync/load RPCs are installed.

The remaining work is Bridge wiring: local media discovery, hashing, upload/download, and transparent manifest sync during the existing ARC Push/Pull commands.
