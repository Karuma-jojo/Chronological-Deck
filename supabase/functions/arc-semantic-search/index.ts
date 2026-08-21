import { withSupabase } from 'npm:@supabase/server@^1'

const model = new Supabase.ai.Session('gte-small')

interface SearchBody {
  mode?: 'search' | 'related' | 'status'
  query?: string
  logicalArcId?: string | null
  documentType?: string | null
  completedOnly?: boolean
  limit?: number
}

function boundedLimit(value: unknown, fallback: number, max: number) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.max(1, Math.min(Math.trunc(parsed), max))
}

export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    let body: SearchBody
    try {
      body = await req.json() as SearchBody
    } catch {
      return Response.json({ error: 'Expected a JSON request body.' }, { status: 400 })
    }

    const mode = body.mode || 'search'

    if (mode === 'status') {
      const { data, error } = await ctx.supabase.rpc('chrono_semantic_embedding_status')
      if (error) return Response.json({ error: error.message }, { status: 500 })
      return Response.json(data)
    }

    if (mode === 'related') {
      const logicalArcId = String(body.logicalArcId || '').trim()
      if (!logicalArcId) {
        return Response.json({ error: 'logicalArcId is required for related-ARC suggestions.' }, { status: 400 })
      }

      const { data, error } = await ctx.supabase.rpc('chrono_semantic_related_arcs', {
        p_logical_arc_id: logicalArcId,
        p_limit: boundedLimit(body.limit, 8, 50),
      })

      if (error) return Response.json({ error: error.message }, { status: 500 })

      return Response.json({
        mode: 'related',
        logicalArcId,
        suggestions: data || [],
        note: 'Semantic relationship suggestions are candidates, not authoritative frontmatter.',
      })
    }

    const query = String(body.query || '').trim()
    if (!query) {
      return Response.json({ error: 'query is required.' }, { status: 400 })
    }

    try {
      const embedding = await model.run(query, {
        mean_pool: true,
        normalize: true,
      })

      const { data, error } = await ctx.supabase.rpc('chrono_hybrid_search_arc_chunks', {
        p_query: query,
        p_query_embedding: embedding,
        p_logical_arc_id: body.logicalArcId || null,
        p_document_type: body.documentType || null,
        p_completed_only: body.completedOnly !== false,
        p_limit: boundedLimit(body.limit, 20, 100),
      })

      if (error) return Response.json({ error: error.message }, { status: 500 })

      return Response.json({
        mode: 'search',
        query,
        model: 'gte-small',
        completedOnly: body.completedOnly !== false,
        results: data || [],
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return Response.json({ error: message }, { status: 500 })
    }
  }),
}
