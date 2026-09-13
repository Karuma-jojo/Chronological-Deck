import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
export const USER='00000000-0000-4000-8000-000000000001', OTHER='00000000-0000-4000-8000-000000000002';
export const sql=readFileSync('supabase/arc-review-retention-v1.sql','utf8');
export async function fixture() {
 const db=new PGlite();
 await db.exec(`create role anon; create role authenticated; create schema auth;
 create table auth.users(id uuid primary key);
 create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
 grant usage on schema auth to authenticated,anon; grant execute on function auth.uid() to authenticated,anon;`);
 const authority=readFileSync('supabase/arc-logical-authority-v1.sql','utf8');
 // Execute the actual authority DDL/serializer and identity-refresh function.
 // Unrelated semantic/vector search functions are outside this isolated fixture.
 await db.exec(authority.slice(authority.indexOf('create table'),authority.indexOf('-- Backfill')) .split('-- Backfill')[0].replace(/begin;\s*$/,''));
 await db.exec(`create table arc_documents(user_id uuid,arc_id text,logical_arc_id text,document_type text,canonical_label text default 'A01',title text default 'Domain-safe algebra',clearance text default 'fully_mastered',archive_metadata jsonb default '{}',created_at timestamptz default now(),updated_at timestamptz default now(),primary key(user_id,arc_id));`);
 const start=authority.indexOf('create or replace function public.chrono_refresh_logical_arc_identity(');
 const end=authority.indexOf('$$;',start)+3;
 await db.exec(authority.slice(start,end));
 // Minimal archive/media dependencies for the UNMODIFIED production delete RPC.
 for(const table of ['arc_sections','arc_section_embeddings','arc_revisions']) await db.exec(`create table ${table}(user_id uuid,arc_id text,foreign key(user_id,arc_id) references arc_documents on delete cascade)`);
 await db.exec(`create table arc_relationships(user_id uuid,from_arc_id text,to_arc_id text);
 create table arc_media_items(user_id uuid,arc_id text,logical_arc_id text,object_key text,storage_backend text,status text,content_hash text,file_name text,mime_type text,byte_size bigint,updated_at timestamptz,foreign key(user_id,arc_id) references arc_documents on delete cascade);
 create table arc_media_orphans(user_id uuid,object_key text,logical_arc_id text,content_hash text,file_name text,mime_type text,byte_size bigint,first_unreferenced_at timestamptz,last_seen_at timestamptz,primary key(user_id,object_key));`);
 for(const table of ['arc_documents','arc_sections','arc_section_embeddings','arc_revisions','arc_relationships','arc_media_items','arc_media_orphans']) await db.exec(`alter table ${table} enable row level security; create policy own on ${table} to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid()); grant select,insert,update,delete on ${table} to authenticated;`);
 await db.exec(readFileSync('supabase/arc-logical-delete-v1.sql','utf8'));
 await db.exec(readFileSync('supabase/arc-logical-delete-grant-fix-v1.sql','utf8'));
 await db.exec(sql);
 await db.exec(`insert into auth.users values('${USER}'),('${OTHER}');
 insert into arc_logical_arcs(user_id,logical_arc_id,canonical_label,title,clearance,recovery_state) values
 ('${USER}','T25-ARC801-A01','A01','Domain-safe algebra','fully_mastered','not_owed'),
 ('${OTHER}','T25-ARC801-A01','A01','Other learner','fully_mastered','not_owed');
 insert into arc_documents(user_id,arc_id,logical_arc_id,document_type) values
 ('${USER}','T25-ARC801-A01-RAW','T25-ARC801-A01','raw_dump'),
 ('${USER}','T25-ARC801-A01-POLISHED','T25-ARC801-A01','polished_extract');`);
 const today=(await db.query(`select current_date::text d`)).rows[0].d;
 async function as(user=USER,role='authenticated') {
   await db.exec('reset role');
   await db.query(`select set_config('request.jwt.claim.sub',$1,false)`,[user||'']);
   await db.exec(`set role ${role}`);
 }
 async function admin(query,params=[]) { await db.exec('reset role');try{return params.length ? await db.query(query,params) : await db.exec(query)}finally{await as();} }
 await as();
 return {db,today,as,admin};
}
