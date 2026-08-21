import { withSupabase } from 'npm:@supabase/server@^1'

const model = new Supabase.ai.Session('gte-small')

interface EmbeddingRow {
  id: string
  user_id: string
  arc_id: string
  logical_arc_id: string
  section_id: string
  chunk_index: number
  content: string
  embedding?: number[] | null
}

interface WebhookPayload {
  type: 'INSERT'
  table: 'arc_section_embeddings'
  schema: 'public'
  record: EmbeddingRow
  old_record: null
}

export default {
  fetch: withSupabase({ auth: 'secret' }, async (req, ctx) => {
    const payload = await req.json() as WebhookPayload
    const row = payload?.record

    if (!row?.id || !row?.content) {
      return Response.json({ error: 'Missing embedding row id/content.' }, { status: 400 })
    }

    if (row.embedding) {
      return Response.json({ ok: true, skipped: true, id: row.id })
    }

    try {
      const embedding = await model.run(row.content, {
        mean_pool: true,
        normalize: true,
      })

      const { error } = await ctx.supabaseAdmin
        .from('arc_section_embeddings')
        .update({
          embedding: JSON.stringify(embedding),
          embedding_model: 'gte-small',
          embedded_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', row.id)

      if (error) {
        console.error('Chrono-Deck embedding update failed:', error.message)
        return Response.json({ error: error.message, id: row.id }, { status: 500 })
      }

      return Response.json({
        ok: true,
        id: row.id,
        arcId: row.arc_id,
        logicalArcId: row.logical_arc_id,
        sectionId: row.section_id,
        chunkIndex: row.chunk_index,
        model: 'gte-small',
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error('Chrono-Deck embedding generation failed:', message)
      return Response.json({ error: message, id: row.id }, { status: 500 })
    }
  }),
}
