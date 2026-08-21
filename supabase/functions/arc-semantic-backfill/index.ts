import { withSupabase } from 'npm:@supabase/server@^1'

const model = new Supabase.ai.Session('gte-small')

interface BackfillBody {
  logicalArcId?: string | null
  limit?: number
}

function boundedLimit(value: unknown) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return 50
  return Math.max(1, Math.min(Math.trunc(parsed), 100))
}

export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    let body: BackfillBody = {}
    try {
      if (req.headers.get('content-length') !== '0') body = await req.json() as BackfillBody
    } catch {
      body = {}
    }

    const limit = boundedLimit(body.limit)

    let query = ctx.supabase
      .from('arc_section_embeddings')
      .select('id,arc_id,logical_arc_id,section_id,chunk_index,content')
      .is('embedding', null)
      .order('id', { ascending: true })
      .limit(limit)

    const logicalArcId = String(body.logicalArcId || '').trim()
    if (logicalArcId) query = query.eq('logical_arc_id', logicalArcId)

    const { data: rows, error: loadError } = await query
    if (loadError) return Response.json({ error: loadError.message }, { status: 500 })

    if (!rows?.length) {
      return Response.json({ ok: true, processed: 0, remainingHint: 0, logicalArcId: logicalArcId || null })
    }

    const failures: Array<{ id: number; error: string }> = []
    let processed = 0

    for (let offset = 0; offset < rows.length; offset += 8) {
      const group = rows.slice(offset, offset + 8)
      const outcomes = await Promise.all(group.map(async (row) => {
        try {
          const embedding = await model.run(row.content, {
            mean_pool: true,
            normalize: true,
          })

          const { error } = await ctx.supabase
            .from('arc_section_embeddings')
            .update({
              embedding: JSON.stringify(embedding),
              embedding_model: 'gte-small',
              embedded_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', row.id)

          if (error) throw new Error(error.message)
          return { ok: true as const, id: row.id }
        } catch (error) {
          return {
            ok: false as const,
            id: row.id,
            error: error instanceof Error ? error.message : String(error),
          }
        }
      }))

      for (const outcome of outcomes) {
        if (outcome.ok) processed += 1
        else failures.push({ id: outcome.id, error: outcome.error })
      }
    }

    return Response.json({
      ok: failures.length === 0,
      processed,
      attempted: rows.length,
      failures,
      logicalArcId: logicalArcId || null,
      note: rows.length === limit ? 'Call again to continue if more pending chunks remain.' : 'Backfill batch reached the end of the current pending set.',
    }, { status: failures.length ? 207 : 200 })
  }),
}
