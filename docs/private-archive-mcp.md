# Chrono-Deck Private Semantic Archive MCP

This service exposes the authenticated Chrono-Deck semantic archive to ChatGPT
as read-only MCP tools.

It is deliberately separate from the public game MCP service because the ARC
archive is private user data.

## What it enables

Once connected, a ChatGPT conversation can call:

- `search_completed_arc_archive` — hybrid semantic + lexical search over
  academically cleared ARC chunks;
- `get_arc_archive_bundle` — exact RAW/POLISHED/canonical document identity
  lookup for one `logical_arc_id`;
- `find_semantically_related_arcs` — candidate related ARC suggestions for an
  ARC already in the archive;
- `suggest_arc_frontmatter_links` — safe semantic candidates for extractor
  `related` enrichment;
- `get_arc_embedding_status` — ready/pending semantic chunk counts.

The archive tools are read-only.

## Source-of-truth boundary

Semantic similarity is NOT curriculum truth.

The connector may help enrich:

- `related`;
- cross-ARC comparison notes;
- recurring error-theme references;
- possible `deepens` links only when separately supported.

It must never invent or decide from similarity alone:

- `arc_id` / `logical_arc_id`;
- module/terminal/atomic identity;
- chronology;
- prerequisites / dependencies;
- clearance;
- provenance / User ownership;
- assistance level;
- proof/recovery/transfer/implementation debt.

The current ARC conversation and canonical curriculum records remain
authoritative for those fields.

## Runtime architecture

```text
ChatGPT connector
    ↓ bearer auth
chatgpt-app/archive-server.js
    ↓
chatgpt-app/lib/archive-client.js
    ↓ x-chrono-archive-secret
Supabase arc-archive-access Edge Function
    ↓ service-role-only admin RPCs
chrono_hybrid_search_arc_chunks_admin()
chrono_load_arc_bundle_admin()
chrono_semantic_related_arcs_admin()
chrono_semantic_embedding_status_admin()
    ↓
private ARC archive tables + embeddings
```

`arc-archive-access` is source-controlled at:

```text
supabase/functions/arc-archive-access/index.ts
```

The current admin RPC snapshot is source-controlled at:

```text
supabase/arc-archive-private-api-v1.sql
```

## Supabase prerequisites

The production migration order is tracked in:

```text
supabase/PRODUCTION-SCHEMA.md
```

The private Archive path requires the core archive/semantic schema plus:

- `supabase/arc-embedding-webhook-v1.sql`;
- `supabase/arc-archive-private-api-v1.sql`;
- `supabase/arc-clearance-semantic-completion-v1.sql`;
- `supabase/arc-clearance-admin-completion-fix.sql`.

Deployed Edge Functions:

- `arc-embed-section`;
- `arc-semantic-search`;
- `arc-semantic-backfill`;
- `arc-archive-access`.

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

The root and `/health` endpoints are public, but the MCP endpoint requires a
bearer token.

## Render environment variables

The current Archive server/client uses:

```text
CHRONO_ARCHIVE_PUBLIC_URL=https://YOUR-ARCHIVE-SERVICE.example
CHRONO_ARCHIVE_OAUTH_SECRET=<long-random-OAuth-signing-secret>
CHRONO_ARCHIVE_USER_ID=<UUID of the archive owner>
CHRONO_SUPABASE_URL=https://YOURPROJECT.supabase.co
CHRONO_SUPABASE_ARCHIVE_TOKEN=<shared-archive-edge-token>
```

An emergency/static MCP bearer token may also be configured:

```text
CHRONO_ARCHIVE_MCP_TOKEN=<optional-long-random-emergency-token>
```

`CHRONO_SUPABASE_ARCHIVE_TOKEN` is sent only to the private Supabase
`arc-archive-access` Edge Function as `x-chrono-archive-secret`.

`CHRONO_ARCHIVE_USER_ID` is also used by the OAuth access-token check so an
issued Archive token cannot be replayed for a different owner.

The older email/password/anon-key sign-in flow is no longer the current Archive
client architecture.

## Supabase Edge Function secrets

Configure `arc-archive-access` with managed Edge Function secrets:

```text
CHRONO_ARCHIVE_SECRET=<same value as Render CHRONO_SUPABASE_ARCHIVE_TOKEN>
CHRONO_ARCHIVE_USER_ID=<UUID of the archive owner>
```

Configure `arc-embed-section` with:

```text
CHRONO_EMBED_WEBHOOK_SECRET=<long-random-embedding-dispatch-token>
```

Store the same embedding-dispatch value in Supabase Vault under:

```text
chrono_embed_webhook_secret
```

Do **not** commit any of these values. The repository contains names and
contracts only.

`arc-archive-access` and `arc-embed-section` run with Supabase gateway JWT
verification disabled and perform their own narrow shared-secret
authentication. The archive function then calls only service-role-protected
admin RPCs for the configured archive owner.

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

## Connect from ChatGPT

Create a custom MCP/connector pointing at:

```text
https://YOUR-ARCHIVE-SERVICE.example/mcp
```

Configure bearer authentication with the value of `CHRONO_ARCHIVE_MCP_TOKEN`.

Do not paste Supabase archive tokens, database credentials, or other service
secrets into normal chats.

After connection, a fresh ChatGPT conversation can retrieve completed ARC
history without having the old conversations in context.

## Dual Extract integration

`prompts/arc-dual-extractor.md` contains the safe enrichment phase.

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

The archive search is an enrichment layer, not a replacement for the source
conversation.

## Completion semantics

The private admin RPCs use academic `clearance`, not `planning_status`, when
`completedOnly` is requested.

Completed means one of:

```text
core_cleared
core_cleared_mastery_pending
fully_mastered
```

`incomplete` is excluded.

## Backlog

Older synced ARCs can be embedded with `arc-semantic-backfill`. Once all
existing chunks are ready, every new Obsidian sync automatically seeds new
embedding chunks; the database trigger dispatches them without per-ARC work.
