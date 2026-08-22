import { withSupabase } from 'npm:@supabase/server@^1'

const model = new Supabase.ai.Session('gte-small')

interface Body {
  mode?: 'search' | 'related' | 'bundle' | 'status'
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

function requiredEnv(name: string) {
  const value = String(Deno.env.get(name) || '').trim()
  if (!value) throw new Error(`Missing required Edge Function secret: ${name}`)
  return value
}

function missingRpc(error: { code?: string; message?: string } | null) {
  const text = `${error?.code || ''} ${error?.message || ''}`
  return /PGRST202|could not find the function|schema cache/i.test(text)
}

export default {
  fetch: withSupabase({ auth: 'none' }, async (req, ctx) => {
    let archiveSecret: string
    let archiveUserId: string

    try {
      archiveSecret = requiredEnv('CHRONO_ARCHIVE_SECRET')
      archiveUserId = requiredEnv('CHRONO_ARCHIVE_USER_ID')
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error('Chrono-Deck archive access is not configured:', message)
      return Response.json({ error: 'Archive service is not configured.' }, { status: 500 })
    }

    if (req.headers.get('x-chrono-archive-secret') !== archiveSecret) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: Body = {}
    try {
      body = await req.json() as Body
    } catch {
      body = {}
    }

    const mode = body.mode || 'search'

    if (mode === 'status') {
      const { data, error } = await ctx.supabaseAdmin.rpc(
        'chrono_semantic_embedding_status_admin',
        { p_user_id: archiveUserId },
      )
      if (error) return Response.json({ error: error.message }, { status: 500 })
      return Response.json(data)
    }

    if (mode === 'bundle') {
      const logicalArcId = String(body.logicalArcId || '').trim()
      if (!logicalArcId) {
        return Response.json({ error: 'logicalArcId is required.' }, { status: 400 })
      }

      const modern = await ctx.supabaseAdmin.rpc(
        'chrono_load_arc_bundle_with_authority_admin',
        {
          p_user_id: archiveUserId,
          p_logical_arc_id: logicalArcId,
        },
      )

      if (!modern.error) {
        const payload = modern.data && typeof modern.data === 'object' ? modern.data as Record<string, unknown> : {}
        return Response.json({
          mode: 'bundle',
          logicalArcId,
          authority: payload.authority || null,
          documents: Array.isArray(payload.documents) ? payload.documents : [],
        })
      }

      // Safe rolling deployment: an older production schema can still serve
      // document bundles until arc-logical-authority-v1 is applied.
      if (!missingRpc(modern.error)) {
        return Response.json({ error: modern.error.message }, { status: 500 })
      }

      const legacy = await ctx.supabaseAdmin.rpc(
        'chrono_load_arc_bundle_admin',
        {
          p_user_id: archiveUserId,
          p_logical_arc_id: logicalArcId,
        },
      )
      if (legacy.error) return Response.json({ error: legacy.error.message }, { status: 500 })

      return Response.json({
        mode: 'bundle',
        logicalArcId,
        authority: null,
        documents: Array.isArray(legacy.data) ? legacy.data : [],
      })
    }

    if (mode === 'related') {
      const logicalArcId = String(body.logicalArcId || '').trim()
      if (!logicalArcId) {
        return Response.json({ error: 'logicalArcId is required.' }, { status: 400 })
      }

      const { data, error } = await ctx.supabaseAdmin.rpc(
        'chrono_semantic_related_arcs_admin',
        {
          p_user_id: archiveUserId,
          p_logical_arc_id: logicalArcId,
          p_limit: boundedLimit(body.limit, 8, 50),
        },
      )
      if (error) return Response.json({ error: error.message }, { status: 500 })

      return Response.json({
        mode: 'related',
        logicalArcId,
        suggestions: data || [],
        authoritative: false,
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

      const { data, error } = await ctx.supabaseAdmin.rpc(
        'chrono_hybrid_search_arc_chunks_admin',
        {
          p_user_id: archiveUserId,
          p_query: query,
          p_query_embedding: embedding,
          p_logical_arc_id: body.logicalArcId || null,
          p_document_type: body.documentType || null,
          p_completed_only: body.completedOnly !== false,
          p_limit: boundedLimit(body.limit, 20, 100),
        },
      )
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
