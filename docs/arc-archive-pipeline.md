# Chrono-Deck ARC Archive Pipeline

Goal: keep archival overhead tiny so most time stays in live Spire play.

## One logical ARC, two documents

Every completed Atomic ARC may have two first-class Markdown representations:

- `<ARC>-RAW.md` — ultra-detailed chronological black-box record.
- `<ARC>-POLISHED.md` — canonical readable/narrative study record.

Both share one stable logical identity:

```yaml
logical_arc_id: T22-M01-A02
```

but have distinct document ids:

```yaml
# RAW
arc_id: T22-M01-A02-RAW
document_type: raw_dump

# POLISHED
arc_id: T22-M01-A02-POLISHED
document_type: polished_extract
```

`arc_id` remains the unique document key used by the existing Obsidian/Supabase bridge. `logical_arc_id` groups representations of the same learning event.

## The human workflow

The intended post-ARC workload is:

1. Finish the ARC.
2. Ask the AI to run `prompts/arc-dual-extractor.md` against the original conversation.
3. Download the two generated Markdown files into the configured Obsidian ARC folder.
4. Quick review only if desired.
5. Sync each note with the existing Chrono-Deck Obsidian command.

Do not hand-write the RAW dump. Do not hand-write the polished narrative.

The two documents must be independently reconstructed from the original conversation; POLISHED is not a summary of RAW.

## Media does not block completion

Missing screenshots, GIFs, diagrams or video links are presentation debt, not academic debt.

Use stable placeholders in Markdown:

```html
<!-- MEDIA-SLOT: T22-M01-A02-M01
 type: image
 purpose: diagram used during the investigation
 status: pending
-->
```

The archive schema tracks `media_status` separately from `document_status` and ARC clearance.

Recommended meanings:

- `none` — no media expected.
- `pending` — media slots exist but are unresolved.
- `partial` — some media resolved.
- `complete` — all intended media resolved.

A polished extract may therefore be mathematically complete while media remains pending.

## Search now, embeddings later

`supabase/arc-archive-v1.sql` adds section-level PostgreSQL full-text search immediately. H2 sections are already first-class `arc_sections`, so search returns precise sections instead of whole giant files.

It also adds:

- `logical_arc_id`
- `document_type`
- `media_status`
- `tags`
- `arc_media_items`
- `chrono_load_arc_bundle(...)`
- `chrono_search_arc_sections(...)`

This gives useful lexical search without requiring an embedding provider.

Semantic/vector embeddings should be a later background worker. They must never become a manual per-ARC task.

Desired future behaviour:

1. sync/change document;
2. detect changed sections;
3. chunk only changed sections;
4. embed those chunks automatically;
5. upsert vectors;
6. never ask the User to "embed an ARC" manually.

## R2 / object storage

Cloudflare R2 is optional binary storage for screenshots, GIFs, diagrams, exports and other large assets.

It is not required for Markdown search or ARC completion.

Recommended split:

- Supabase: document metadata, sections, relationships, search, mastery/provenance, media metadata.
- R2: binary assets.
- External videos: keep URL + metadata instead of copying the video.

R2 integration should be added only after the paired-document and search workflow is proven.

## Create empty paired notes for backlog work

For older ARCs that need to be backfilled, the repository includes:

```bash
node scripts/create-arc-archive-pair.mjs \
  --arc-id T22-M01-A02 \
  --title "Vanishing Intervals & the Difference Quotient" \
  --module-id T22-M01 \
  --module-title "Derivatives — Fluxions" \
  --canonical-node ARC053 \
  --out Chrono-Deck/ARCs
```

This creates both stable Markdown shells with correct identities and media policy.

Normally, however, the AI extractor should generate the completed files directly so the User does not need to fill the shells by hand.

## Database migration order

For an existing Chrono-Deck Supabase project:

1. existing ARC Vault / Obsidian bridge migrations;
2. `supabase/arc-archive-v1.sql`;
3. `supabase/arc-archive-sync-v1.sql`.

The archive sync migration keeps the existing Obsidian plugin compatible. If richer fields are not sent by the plugin yet, the database infers pairing from stable `-RAW` / `-POLISHED` ids.

## Backlog rule

Do not stop T22 play to finish old multimedia polishing.

Old documents can safely exist in states such as:

```text
RAW       complete
POLISHED  editing
SEARCH    available
MEDIA     pending
```

Backfill old ARCs in batches after the pipeline is established.
