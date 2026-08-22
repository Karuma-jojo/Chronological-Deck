# Chrono-Deck Supabase Production Parity

This file records the production Supabase migration ledger and the source files
that are expected to reproduce the live Archive/semantic/media infrastructure.

It is a **source-control parity record**, not a replacement for Supabase's own
migration table.

Last reconciled against production: **2026-08-22**.

## Production migration ledger

| Version | Migration | Repository source |
| --- | --- | --- |
| `20260821104559` | `arc_archive_v1` | `supabase/arc-archive-v1.sql` |
| `20260821104624` | `arc_archive_sync_v1` | `supabase/arc-archive-sync-v1.sql` |
| `20260821104655` | `arc_semantic_search_v1` | `supabase/arc-semantic-search-v1.sql` |
| `20260821104956` | `arc_embedding_webhook_v1` | `supabase/arc-embedding-webhook-v1.sql` |
| `20260821105112` | `arc_archive_private_api_v1` | `supabase/arc-archive-private-api-v1.sql` |
| `20260821132105` | `arc_clearance_semantic_completion_v1` | `supabase/arc-clearance-semantic-completion-v1.sql` |
| `20260821134505` | `arc_clearance_admin_completion_fix` | `supabase/arc-clearance-admin-completion-fix.sql` |
| `20260821141456` | `arc_media_storage_v1` | `supabase/arc-media-storage-v1.sql` |
| `20260821143726` | `arc_storage_hygiene_v1` | `supabase/arc-storage-hygiene-v1.sql` |
| `20260821144124` | `arc_media_r2_v1` | `supabase/arc-media-r2-v1.sql` |
| `20260821190012` | `arc_media_placement_cleanup_v2` | `supabase/arc-media-placement-cleanup-v2.sql` |

## Deployed Edge Function source

Production currently uses these Archive/semantic functions:

- `supabase/functions/arc-embed-section/index.ts`
- `supabase/functions/arc-semantic-search/index.ts`
- `supabase/functions/arc-semantic-backfill/index.ts`
- `supabase/functions/arc-archive-access/index.ts`

The repository must never contain the deployed secret values. Edge Function
authentication secrets belong in Supabase managed secrets; the embedding
dispatcher's corresponding shared secret is stored in Supabase Vault.

## Required secret names

### `arc-embed-section`

Edge Function secret:

```text
CHRONO_EMBED_WEBHOOK_SECRET
```

Supabase Vault secret containing the same value for the database dispatcher:

```text
chrono_embed_webhook_secret
```

### `arc-archive-access`

Edge Function secrets:

```text
CHRONO_ARCHIVE_SECRET
CHRONO_ARCHIVE_USER_ID
```

The Render Archive service sends `CHRONO_SUPABASE_ARCHIVE_TOKEN` as the
`x-chrono-archive-secret` header. Its value must match
`CHRONO_ARCHIVE_SECRET` in the Supabase Edge Function environment.

## Live semantic dispatch path

```text
arc_sections
  ↓
chrono_seed_section_embedding_chunks()
  ↓
arc_section_embeddings
  ↓ AFTER INSERT trigger
chrono_dispatch_embedding_job()
  ↓ pg_net
arc-embed-section
  ↓ gte-small
arc_section_embeddings.embedding
```

`arc-embed-section` is intentionally idempotent: it updates an embedding row
only while that row's `embedding` column is still `NULL`.

## Authority boundary

This parity snapshot does not change the Archive's authority model:

- SQL/frontmatter/session state own identity, clearance, chronology,
  prerequisites, provenance, recovery debt, and planning status.
- Embeddings and hybrid search are derived retrieval infrastructure.
- Semantic similarity may suggest relationships such as `related`; it must not
  manufacture authoritative metadata.

## Next schema work

Production parity is deliberately separate from the planned Archive Schema V2
work. Future migrations may add logical-ARC authority, RAW/POLISHED pair
constraints, structured assistance/recovery debt, curriculum coordinates, and
stable semantic section roles.
