# Chrono-Deck ARC Semantic Search

This layer makes completed ARC archives searchable by meaning, not only by exact words.

It is intentionally separate from the Dual ARC Extractor:

- extraction decides what the current ARC actually was;
- semantic search helps retrieve and relate already-synced ARC knowledge.

Semantic search must never rewrite provenance, clearance, or historical facts in frontmatter.

## What semantic search is allowed to enrich

Semantic retrieval can safely help suggest:

- `related` ARC candidates;
- nearby concepts worth cross-linking;
- recurring error themes across completed ARCs;
- earlier proofs or investigations that resemble a current one;
- prior mastery/recovery material worth reopening.

These are suggestions, not source-of-truth metadata.

Identity fields such as `arc_id`, `logical_arc_id`, module position, title, clearance, assistance provenance, and recovery debt must still come from the current ARC conversation/curriculum record.

So the intended relationship is:

```text
CURRENT ARC CONVERSATION
        |
        +--> authoritative RAW/POLISHED extraction
        |
        +--> deterministic frontmatter

COMPLETED ARC SEMANTIC INDEX
        |
        +--> optional related/deepens/search suggestions
```

## Architecture

```text
Obsidian ARC sync
    |
    v
arc_sections
    |
    | trigger creates overlapping semantic chunks
    v
arc_section_embeddings
    |
    | Database Webhook
    v
arc-embed-section Edge Function
    |
    | Supabase built-in gte-small model
    v
384-dimensional pgvector embeddings
    |
    +--> chrono_hybrid_search_arc_chunks()
    +--> chrono_semantic_related_arcs()
    +--> arc-semantic-search Edge Function
```

The system uses Supabase's built-in `gte-small` model, so no OpenAI API key or external embedding provider is required.

## Why hybrid search

Pure vector search is good for meaning. Full-text search is good for exact equations, names, symbols, and phrases.

Chrono-Deck combines both:

```text
hybrid score = semantic similarity + lexical boost
```

This lets searches such as:

> where did I confuse a favorable example with a universal proof?

find conceptually similar RAW/POLISHED passages even if those exact words were never used, while exact phrases and terminology still get boosted.

## Completion filter

Semantic search defaults to completed/parked documents:

```text
planning_status = parked
```

Set `completedOnly: false` only when unfinished/active documents should also be searched.

## One-time setup

Run migrations in this order:

1. existing ARC Vault / Obsidian bridge migrations;
2. `supabase/arc-archive-v1.sql`;
3. `supabase/arc-archive-sync-v1.sql`;
4. `supabase/arc-semantic-search-v1.sql`.

Then deploy the Edge Functions:

```bash
supabase functions deploy arc-embed-section --no-verify-jwt
supabase functions deploy arc-semantic-search
supabase functions deploy arc-semantic-backfill
```

`arc-embed-section` is designed for a Database Webhook and therefore uses secret-key authentication inside the function even though gateway JWT verification is disabled.

## Create the Database Webhook

In Supabase Dashboard:

1. Database → Webhooks → Create webhook.
2. Table: `public.arc_section_embeddings`.
3. Event: `INSERT` only.
4. Destination: Supabase Edge Function.
5. Function: `arc-embed-section`.
6. Method: `POST`.
7. Add the Supabase secret/service auth header using the Dashboard's secure webhook option.
8. Create webhook.

Only `INSERT` is needed because every ARC section change causes Chrono-Deck to rebuild that section's chunk rows.

After this one-time configuration, future ARC syncs automatically create fresh embedding rows and the webhook embeds them without per-ARC work.

## Backfill old ARC chunks

The SQL migration creates semantic chunk rows for already-existing sections, but those old rows initially have `embedding = NULL` because the webhook did not exist when they were inserted.

Call the authenticated `arc-semantic-backfill` function until `processed` becomes `0`.

Example request body:

```json
{
  "limit": 100
}
```

Or backfill one logical ARC:

```json
{
  "logicalArcId": "T22-M01-A02",
  "limit": 100
}
```

This is a one-time migration/backlog operation, not a per-ARC workflow.

## Semantic search API

Call `arc-semantic-search` while authenticated with the user's normal Supabase session.

### Meaning + keyword search

```json
{
  "mode": "search",
  "query": "where did I mistake one favorable example for a universal proof?",
  "completedOnly": true,
  "limit": 20
}
```

Optional filters:

```json
{
  "logicalArcId": "T22-M01-A02",
  "documentType": "raw_dump"
}
```

### Related ARC suggestions

```json
{
  "mode": "related",
  "logicalArcId": "T22-M01-A02",
  "limit": 8
}
```

These results are candidates for `related`, not automatic truth.

### Embedding status

```json
{
  "mode": "status"
}
```

Returns total, ready and pending chunk counts.

## Chunking policy

Each H2-backed `arc_section` is split into overlapping chunks of approximately:

- 1800 characters per chunk;
- 200 characters overlap.

This is deliberately simple and stable. It prevents giant RAW sections from becoming one semantic blob while preserving enough neighboring context for mathematical reasoning.

The chunking policy can be changed later without changing the canonical Markdown files. Re-sync/rebuild simply regenerates the semantic derivative index.

## Frontmatter rule

Semantic search does **not** make frontmatter authoritative by itself.

The safe workflow is:

```text
conversation -> extractor -> authoritative frontmatter
                         |
                         v
                      sync
                         |
                         v
                 semantic indexing
                         |
                         v
         related/search suggestions later
```

If a future ChatGPT/Supabase connector gives the extractor live access to the completed archive, semantic results may be passed in as **enrichment context**. The extractor may then use supported candidates for `related` or `deepens`, but it must never use semantic similarity to invent:

- prerequisites;
- proof ownership;
- recovery debt;
- clearance;
- historical chronology;
- assistance provenance.

Those remain source-of-truth facts from the ARC itself.

## Human workload

After setup, the intended per-ARC human workflow remains:

```text
finish ARC
-> generate RAW + POLISHED
-> place in Obsidian
-> Sync current ARC
-> done
```

Embedding generation and semantic indexing are background infrastructure, not study work.
