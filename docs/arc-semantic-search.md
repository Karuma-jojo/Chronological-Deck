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

Identity fields such as `arc_id`, `logical_arc_id`, module position, title,
clearance, assistance provenance, and recovery debt must still come from the
current ARC conversation/curriculum record.

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

The production path is fully database-triggered. No Dashboard-created Database
Webhook is required.

```text
Obsidian ARC sync
    |
    v
arc_sections
    |
    | chrono_seed_section_embedding_chunks()
    v
arc_section_embeddings
    |
    | AFTER INSERT trigger
    v
chrono_dispatch_embedding_job()
    |
    | pg_net POST + Vault-backed shared secret
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

The system uses Supabase's built-in `gte-small` model, so no OpenAI API key or
external embedding provider is required.

`supabase/arc-embedding-webhook-v1.sql` contains the database dispatcher and
trigger. The dispatcher reads `chrono_embed_webhook_secret` from Supabase Vault
and sends it in `x-chrono-embed-secret`.

`supabase/functions/arc-embed-section/index.ts` reads the matching
`CHRONO_EMBED_WEBHOOK_SECRET` managed Edge Function secret. Never commit the
secret value.

## Why hybrid search

Pure vector search is good for meaning. Full-text search is good for exact
equations, names, symbols, and phrases.

The current implementation is `supabase/arc-search-quality-v2.sql`, applied after
`arc-logical-authority-v1.sql`. It combines ranks from both channels:

```text
hybrid score = 1 / (60 + semantic rank) + 1 / (60 + lexical rank)
```

Each channel contributes up to 200 candidates; a missing channel contributes
zero. Raw cosine and text scores have different scales, so they are no longer
added directly. `hybrid_score` is an ordering score, not a confidence or
probability, and must not be compared with scores from the old formula.

Plain natural-language queries retrieve any English non-stopword query term.
Lexical ordering uses term coverage, normalized text rank, and a small bonus for
matching the original complete query. This avoids requiring every word in a
long question to occur in one passage. Quoted phrases, explicit `OR`, and
`-excluded` terms keep Postgres websearch semantics in the lexical channel;
semantic matches can still appear independently.

There is no date boost or special preference for a particular ARC. No embedding
model change is required. This lets searches such as:

> where did I confuse a favorable example with a universal proof?

find conceptually similar RAW/POLISHED passages even if those exact words were
never used, while exact phrases and terminology still get boosted.

## Completion filter

Semantic search defaults to academically cleared ARC documents. Completion is
deliberately **not** inferred from `planning_status`, because planning state and
academic mastery are different dimensions.

`completedOnly: true` uses logical ARC authority clearance, falling back to the
document only when authority is absent. Included clearance values are:

```text
core_cleared
core_cleared_mastery_pending
fully_mastered
```

and excludes:

```text
incomplete
```

The human-readable Markdown frontmatter values are:

- `Incomplete`
- `Core Cleared`
- `Core Cleared — Mastery Pending`
- `Fully Mastered`

Set `completedOnly: false` only when unfinished/incomplete documents should
also be searched.

## Production migration order

The live production ledger is recorded in `supabase/PRODUCTION-SCHEMA.md`.

For the Archive/semantic layer, the important sequence is:

1. existing ARC Vault / Obsidian bridge migrations;
2. `supabase/arc-archive-v1.sql`;
3. `supabase/arc-archive-sync-v1.sql`;
4. `supabase/arc-semantic-search-v1.sql`;
5. `supabase/arc-embedding-webhook-v1.sql`;
6. `supabase/arc-archive-private-api-v1.sql`;
7. `supabase/arc-clearance-semantic-completion-v1.sql`;
8. `supabase/arc-clearance-admin-completion-fix.sql`;
9. later storage/media migrations listed in `supabase/PRODUCTION-SCHEMA.md`;
10. `supabase/arc-logical-authority-v1.sql`;
11. `supabase/arc-search-quality-v2.sql` (production uses pgvector 0.8.2).

Then deploy the Edge Functions:

```bash
supabase functions deploy arc-embed-section --no-verify-jwt
supabase functions deploy arc-semantic-search
supabase functions deploy arc-semantic-backfill
supabase functions deploy arc-archive-access --no-verify-jwt
```

`arc-embed-section` and `arc-archive-access` intentionally disable Supabase
gateway JWT verification because they perform their own narrow shared-secret
authentication. Their secret values must live in managed Edge Function secrets,
not source code.

## Academic clearance ingestion

The clearance migration adds a first-class `arc_documents.clearance` field and
teaches the Obsidian sync RPC to read `clearance:` directly from the source
Markdown frontmatter. Existing synced records preserve their stored clearance
if an older note lacks the field.

Legacy canonical notes are backfilled conservatively from explicit
academic-status statements only. This keeps `planning_status` available for
workflow planning without abusing it as a proxy for mastery.

## Automatic embedding dispatch

Every insert into `public.arc_section_embeddings` with `embedding IS NULL`
fires `chrono_dispatch_embedding_job_trg`.

The trigger calls `chrono_dispatch_embedding_job()`, which:

1. reads `chrono_embed_webhook_secret` from Supabase Vault;
2. POSTs the new chunk row to `arc-embed-section` through `pg_net`;
3. authenticates with `x-chrono-embed-secret`.

The Edge Function generates `gte-small` embeddings and updates the row only if
its `embedding` column is still `NULL`. This makes duplicate job delivery safe
and avoids overwriting an embedding that another worker already completed.

No Dashboard-created webhook is part of the current production architecture.

## Backfill old ARC chunks

The SQL migration creates semantic chunk rows for already-existing sections, but
older rows may initially have `embedding = NULL`.

Call the authenticated `arc-semantic-backfill` function until `processed`
becomes `0`.

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

This is a migration/backlog operation, not a per-ARC workflow.

## Semantic search API

Call `arc-semantic-search` while authenticated with the user's normal Supabase
session.

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

The current implementation uses a 1600-character step.

Existing chunk storage and embeddings stay unchanged in search quality v2.
The results contain at most two windows per document section, so one long RAW
section cannot fill the result page with overlapping windows. RAW and POLISHED
representations remain independently searchable.

At retrieval time, the selected window is matched against the archived section
and expanded to nearby paragraph boundaries within 400 characters on each side.
Short sections (up to 2600 characters including the heading) are returned in
full. The heading is included for later windows. If the source cannot be matched
exactly, the original window is returned. This handles both normal newlines and
the literal newline separators found in some historical index rows. Expansion
does not rewrite source Markdown, section IDs, source hashes, or embeddings.

The chunking policy can be changed later without changing the canonical
Markdown files. Re-sync/rebuild simply regenerates the semantic derivative
index.

## Search quality benchmark and checks

`scripts/fixtures/archive-search-benchmark-v2.json` contains 30 authored queries
covering all eight indexed ARCs. A successful hit needs both the expected ARC
and a matching passage evidence pattern, not merely the right document title.
The live run used the same unfiltered queries, `completedOnly: true`, and a
40-result limit before and after deployment.

On the 2026-10-07 corpus (460 ready passages), the audited results were:

| Metric | Previous search | Search quality v2 |
| --- | --- | --- |
| Relevant passage first | 20/30 | 28/30 |
| Relevant passage in first five | 27/30 | 30/30 |
| Mean reciprocal rank, first 40 | 0.7794 | 0.9667 |

These are a small authored regression benchmark, not a guarantee about every
query or a large future corpus. The fixture records one target-label correction:
real-power domain conventions belong to Domain-Safe Algebra, not the
positive-integer power-rule ARC. No rank constants were tuned against these
results. The development/held-out split is recorded for diagnostics; label
inspection means it is not a blind external evaluation.

Per-query ranks and split summaries are in
`docs/archive-search-quality-v2-benchmark.json`. Retrieved private conversations
and embeddings must not be committed. To score local connector snapshots with
shape `{ "cases": [{ "id": "...", "results": [...] }] }`:

```bash
node scripts/score-archive-search-benchmark.mjs \
  scripts/fixtures/archive-search-benchmark-v2.json /path/to/private-snapshot.json
node scripts/test-archive-search-quality-v2.mjs
```

The Archive search quality workflow executes the actual SQL migration against
an isolated pgvector/Postgres database, then tests phrase/exclusion handling,
joint ranking evidence, section diversity, source context, owner isolation,
clearance authority, optional filters, and function privileges. It also checks
the benchmark scorer. Private helpers use SECURITY INVOKER and RLS; the public
RPC derives the owner from `auth.uid()`. The admin wrapper remains executable
only by `service_role` (and the database owner).

Rollback restores the two hybrid RPC definitions from
`supabase/arc-logical-authority-v1.sql`. Unused private helpers can remain until a
later cleanup. Both Edge Functions keep their existing RPC signatures and do
not need redeployment for this SQL-only upgrade.

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

If a future ChatGPT/Supabase connector gives the extractor live access to the
completed archive, semantic results may be passed in as **enrichment context**.
The extractor may then use supported candidates for `related` or `deepens`, but
it must never use semantic similarity to invent:

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

Embedding generation and semantic indexing are infrastructure, not study work.
