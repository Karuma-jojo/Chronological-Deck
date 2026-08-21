# Chrono-Deck Private Semantic Archive MCP

This service exposes the authenticated Chrono-Deck semantic archive to ChatGPT as read-only MCP tools.

It is deliberately separate from the public game MCP service because the ARC archive is private user data.

## What it enables

Once connected, a ChatGPT conversation can call:

- `search_completed_arc_archive` — hybrid semantic + lexical search over completed/parked ARC chunks.
- `get_arc_archive_bundle` — exact RAW/POLISHED/canonical document identity lookup for one `logical_arc_id`.
- `find_semantically_related_arcs` — candidate related ARC suggestions for an ARC already in the archive.
- `suggest_arc_frontmatter_links` — safe semantic candidates for extractor `related` enrichment.
- `get_arc_embedding_status` — ready/pending semantic chunk counts.

The archive tools are read-only.

## Source-of-truth boundary

Semantic similarity is NOT curriculum truth.

The connector may help enrich:

- `related`
- cross-ARC comparison notes
- recurring error-theme references
- possible `deepens` links only when separately supported

It must never invent or decide from similarity alone:

- `arc_id` / `logical_arc_id`
- module/terminal/atomic identity
- chronology
- prerequisites / dependencies
- clearance
- provenance / User ownership
- assistance level
- proof/recovery/transfer/implementation debt

The current ARC conversation and canonical curriculum records remain authoritative for those fields.

## Prerequisites

The Supabase project must already have:

1. ARC Vault / Obsidian bridge migrations
2. `supabase/arc-archive-v1.sql`
3. `supabase/arc-archive-sync-v1.sql`
4. `supabase/arc-semantic-search-v1.sql`
5. deployed Edge Functions:
   - `arc-embed-section`
   - `arc-semantic-search`
   - `arc-semantic-backfill`
6. the INSERT webhook from `public.arc_section_embeddings` to `arc-embed-section`

## Server

The dedicated server entrypoint is:

```bash
cd chatgpt-app
node archive-server.js
```

Its MCP endpoint is:

```text
https://YOUR-SERVICE.example/mcp
```

The root and `/health` endpoints are public, but the MCP endpoint requires a bearer token.

## Required environment variables

```text
CHRONO_ARCHIVE_MCP_TOKEN=<long-random-secret>
CHRONO_SUPABASE_URL=https://YOURPROJECT.supabase.co
CHRONO_SUPABASE_ANON_KEY=<publishable/anon key>
CHRONO_SUPABASE_EMAIL=<the same Supabase user that owns the ARC archive>
CHRONO_SUPABASE_PASSWORD=<that user's password>
CHRONO_ARCHIVE_PUBLIC_URL=https://YOUR-ARCHIVE-SERVICE.example
```

The Supabase credentials stay on the server. They are never returned by MCP tools.

The server signs in as the normal Supabase user, so existing RLS remains the privacy boundary. It caches and refreshes the user session in memory.

## Render deployment

Recommended as a separate Render web service from the game service.

Repository:

```text
https://github.com/Karuma-jojo/Chronological-Deck
```

Branch:

```text
main
```

Build command:

```bash
cd chatgpt-app && npm install
```

Start command:

```bash
cd chatgpt-app && node archive-server.js
```

Health check:

```text
/health
```

Choose Singapore for lowest latency from India.

## Connect from ChatGPT

Create a custom MCP/connector pointing at:

```text
https://YOUR-ARCHIVE-SERVICE.example/mcp
```

Configure bearer authentication with the value of `CHRONO_ARCHIVE_MCP_TOKEN`.

Do not paste the Supabase password, anon key, or other archive credentials into normal chats. Only the dedicated bearer token belongs in the connector authentication setting.

After connection, a fresh ChatGPT conversation can retrieve completed ARC history without having the old conversations in context.

## Dual Extract integration

`prompts/arc-dual-extractor.md` now contains a safe enrichment phase.

Extraction order is:

```text
CURRENT ARC CONVERSATION
        ↓
reconstruct authoritative RAW + POLISHED content
        ↓
derive factual frontmatter from current conversation/curriculum
        ↓
query completed semantic archive (if connector is available)
        ↓
add only safe candidate related/cross-reference metadata
        ↓
write the two Markdown files
```

The archive search is an enrichment layer, not a replacement for the source conversation.

## Backlog

Older synced ARCs can be embedded with `arc-semantic-backfill`. Once all existing chunks are ready, every new Obsidian sync automatically seeds new embedding chunks; the webhook embeds them without per-ARC work.
