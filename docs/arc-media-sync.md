# Chrono-Deck ARC Media Sync

Chrono-Deck keeps Obsidian as the human/canonical authoring surface, Supabase as the authenticated structured mirror/index, and Cloudflare R2 as the private binary store for ARC media.

The Markdown note stays local-first. Media is mirrored separately, so local Obsidian embeds are never rewritten to remote URLs.

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

Primary binary store: Cloudflare R2 bucket:

```text
chrono-deck-arc-media
```

The bucket remains private. R2 API credentials live only on the dedicated Render media gateway, never in Obsidian, Markdown, Supabase rows, or the browser.

Object keys are scoped to the authenticated user and logical ARC:

```text
<user-id>/<logical-arc-id>/<sha256>-<filename>
```

The Obsidian Bridge computes SHA-256 locally and asks the authenticated media gateway for short-lived presigned R2 URLs. It performs a HEAD check first, so an unchanged object is not uploaded again.

The older private Supabase Storage bucket remains available only as a temporary fallback while the R2 round-trip is being proven. New bridge media uses `storage_backend = 'r2'`.

## Media manifest

`arc_media_items` stores metadata only; R2 stores the binary bytes.

The media manifest records:

- ARC/document identity;
- logical ARC identity;
- stable slot key;
- media type;
- upload/link state;
- storage backend;
- local path;
- SHA-256 content hash;
- R2 object key;
- file name;
- MIME type;
- byte size;
- remote ETag and observed upload time where available;
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

Missing media never blocks RAW/POLISHED extraction or academic clearance.

## Obsidian push flow

The existing explicit `Sync current ARC to Chrono-Deck` command handles both text and media. There is no background autosync.

```text
read exact Markdown
→ discover supported local media / external video links
→ SHA-256 local files
→ ask authenticated Render gateway for short-lived R2 URLs
→ HEAD R2 object and PUT only when missing
→ sync ARC Markdown/document/sections/relationships to Supabase
→ sync media manifest to Supabase
→ stamp local revision/fingerprint/media status
→ prune bounded old revision snapshots
```

Current supported local binary types include common images, GIF/SVG, MP4/WebM/MOV, common audio formats, and PDF. The first bridge release uses a 100 MiB per-file safety cap.

## Obsidian pull flow

```text
load ARC Markdown
→ apply normal revision/fingerprint conflict protection
→ load media manifest
→ for each uploaded R2 item, check the intended local path
→ if missing, download through a short-lived signed URL
→ verify SHA-256
→ recreate the local asset
→ preserve the original Markdown reference
```

A locally existing file whose hash differs from the cloud manifest is never overwritten. It is reported as a conflict instead.

The cloud mirrors Chrono-Deck ARC content and assets, not the whole Obsidian vault. Themes, workspace layout, unrelated notes, hotkeys, and third-party plugin settings remain device-local.

## External video

YouTube/Vimeo references remain URLs. They are represented as `linked` manifest items with `storage_backend = 'external'` and are not rehosted.

## Storage hygiene

The archive intentionally keeps Postgres focused on searchable knowledge rather than binaries. Current Obsidian sync also avoids rebuilding unchanged sections/embeddings and ignores bookkeeping-only `chrono_*` changes when deciding whether a new revision is necessary.

Per-ARC automatic pruning keeps revision 1, the newest 20 full snapshots, and every 50th older milestone. The storage-health RPC and Obsidian command expose archive text/revision/embedding footprint for periodic checks.

## Current implementation state

R2 media support is live in the repository:

- private R2 bucket configured;
- authenticated Render presign gateway deployed;
- R2-aware Supabase media manifest live;
- Obsidian Bridge v0.4 performs media discovery, hashing, upload, manifest sync, safe pull restoration, and external-video linking.

The remaining acceptance step is a real-device round-trip test from the locally installed Obsidian plugin: upload a small asset, confirm the hashed R2 object, repeat sync without duplication, remove the local copy, and pull it back with the same SHA-256.
