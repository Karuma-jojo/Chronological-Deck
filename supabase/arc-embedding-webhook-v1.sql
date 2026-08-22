-- Chrono-Deck automatic semantic embedding dispatch
-- Reconciled from live Supabase migration:
--   20260821104956 arc_embedding_webhook_v1
--
-- Run AFTER supabase/arc-semantic-search-v1.sql.
--
-- The trigger dispatches newly-seeded embedding chunks to the
-- arc-embed-section Edge Function through pg_net. The shared secret is read
-- from Supabase Vault and is never stored in this repository.

begin;

create or replace function public.chrono_dispatch_embedding_job()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  v_secret text;
  v_url text := 'https://locvizvoqdwmdvnqofsv.supabase.co/functions/v1/arc-embed-section';
begin
  if new.embedding is not null then
    return new;
  end if;

  select decrypted_secret
    into v_secret
  from vault.decrypted_secrets
  where name = 'chrono_embed_webhook_secret'
  order by created_at desc
  limit 1;

  if nullif(v_secret, '') is null then
    raise exception 'Missing Vault secret: chrono_embed_webhook_secret';
  end if;

  perform net.http_post(
    url := v_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-chrono-embed-secret', v_secret
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'arc_section_embeddings',
      'schema', 'public',
      'record', jsonb_build_object(
        'id', new.id,
        'user_id', new.user_id,
        'arc_id', new.arc_id,
        'logical_arc_id', new.logical_arc_id,
        'section_id', new.section_id,
        'chunk_index', new.chunk_index,
        'content', new.content,
        'embedding', new.embedding
      )
    )
  );

  return new;
end;
$$;

drop trigger if exists chrono_dispatch_embedding_job_trg
  on public.arc_section_embeddings;

create trigger chrono_dispatch_embedding_job_trg
after insert on public.arc_section_embeddings
for each row
when (new.embedding is null)
execute function public.chrono_dispatch_embedding_job();

revoke all on function public.chrono_dispatch_embedding_job()
  from public, anon, authenticated;
grant execute on function public.chrono_dispatch_embedding_job()
  to service_role;

commit;
