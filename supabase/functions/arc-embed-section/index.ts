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
  type?: string
  table?: string
  schema?: string
  record?: EmbeddingRow
}

function requiredEnv(name: string) {
  const value = String(Deno.env.get(name) || '').trim()
  if (!value) throw new Error(`Missing required Edge Function secret: ${name}`)
  return value
}

export default {
  fetch: withSupabase({ auth: 'none' }, async (req, ctx) => {
    let webhookSecret: string
    try {
      webhookSecret = requiredEnv('CHRONO_EMBED_WEBHOOK_SECRET')
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error('Chrono-Deck embedding function is not configured:', message)
      return Response.json({ error: 'Embedding service is not configured.' }, { status: 500 })
    }

    if (req.headers.get('x-chrono-embed-secret') !== webhookSecret) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
        .is('embedding', null)

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
