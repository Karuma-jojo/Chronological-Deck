-- Run after the isolated setup and the actual migration. Synthetic data only.
begin;
insert into public.arc_documents values
 ('00000000-0000-0000-0000-000000000001','A-RAW','A','raw_dump','Shared variables','fully_mastered'),
 ('00000000-0000-0000-0000-000000000001','B-POLISHED','B','polished_extract','Distractor','fully_mastered'),
 ('00000000-0000-0000-0000-000000000001','C-RAW','C','raw_dump','Incomplete authority','fully_mastered'),
 ('00000000-0000-0000-0000-000000000002','SECRET-RAW','SECRET','raw_dump','Other owner','fully_mastered');
insert into public.arc_logical_arcs values
 ('00000000-0000-0000-0000-000000000001','A','fully_mastered'),
 ('00000000-0000-0000-0000-000000000001','B','fully_mastered'),
 ('00000000-0000-0000-0000-000000000001','C','incomplete'),
 ('00000000-0000-0000-0000-000000000002','SECRET','fully_mastered');
insert into public.arc_sections values
 ('00000000-0000-0000-0000-000000000001','A-RAW','shared','Shared input',E'Before paragraph.\n\nBoth predicates use one shared input.\n\n$$x^2=9$$\n\nAfter paragraph.');
insert into public.arc_section_embeddings
 (user_id,arc_id,logical_arc_id,document_type,section_id,section_heading,chunk_index,content,embedding)
select user_id,arc_id,logical_arc_id,document_type,'shared','Shared input',i,
 'Both predicates use one shared input.',
 (array[1.0]::real[] || array_fill(0.0::real,array[383]))::extensions.vector
from public.arc_documents cross join generate_series(0,5) i where arc_id='A-RAW';
insert into public.arc_section_embeddings
 (user_id,arc_id,logical_arc_id,document_type,section_id,section_heading,chunk_index,content,embedding)
select user_id,arc_id,logical_arc_id,document_type,'test','Test',0,
 case when logical_arc_id='B' then 'An unrelated chemical experiment.' else 'Both predicates use one shared input.' end,
 (array[1.0]::real[] || array_fill(0.0::real,array[383]))::extensions.vector
from public.arc_documents where logical_arc_id<>'A';

do $checks$
declare q tsquery; v_strict tsquery; snippet text; n integer;
  v extensions.vector := (array[1.0]::real[] || array_fill(0.0::real,array[383]))::extensions.vector;
begin
  select retrieval_query,strict_query into q,v_strict from chrono_search_private.query_terms('why did both predicates use a shared input');
  if not (to_tsvector('english','shared input') @@ q) or to_tsvector('english','shared input') @@ v_strict
    then raise exception 'Natural language must allow partial keyword coverage'; end if;
  select retrieval_query into q from chrono_search_private.query_terms('"shared input"');
  if to_tsvector('english','shared unexpected input') @@ q then raise exception 'Lost phrase semantics'; end if;
  select retrieval_query into q from chrono_search_private.query_terms('input -shared');
  if to_tsvector('english','shared input') @@ q then raise exception 'Lost exclusion semantics'; end if;
  select retrieval_query into q from chrono_search_private.query_terms('input OR predicate');
  if not (to_tsvector('english','predicate') @@ q) then raise exception 'Lost OR semantics'; end if;
  select retrieval_query into q from chrono_search_private.query_terms('the and or');
  if numnode(q)<>0 then raise exception 'Stopwords should not become keywords'; end if;
  select chrono_search_private.passage_context(heading,content_markdown,'Both predicates use one shared input.') into snippet from public.arc_sections;
  if snippet not like '%Before paragraph.%' or snippet not like '%$$x^2=9$$%'
    then raise exception 'Lost surrounding source context or equation'; end if;
  if chrono_search_private.passage_context('H','unrelated','missing chunk') <> 'missing chunk'
    then raise exception 'Unknown source must return original chunk'; end if;
  select count(*) into n from public.chrono_hybrid_search_arc_chunks_admin(
    '00000000-0000-0000-0000-000000000001','shared input',v,null,null,true,100);
  if n<>3 then raise exception 'Owner/authority/diversity filters failed: %',n; end if;
  if exists (select 1 from public.chrono_hybrid_search_arc_chunks_admin(
    '00000000-0000-0000-0000-000000000001','shared input',v,null,null,true,100)
    where logical_arc_id in ('C','SECRET')) then raise exception 'Clearance or owner leak'; end if;
  if (select logical_arc_id from public.chrono_hybrid_search_arc_chunks_admin(
    '00000000-0000-0000-0000-000000000001','shared input',v,null,null,true,1)) <> 'A'
    then raise exception 'Fusion should promote joint evidence'; end if;
  if not exists (select 1 from public.chrono_hybrid_search_arc_chunks_admin(
    '00000000-0000-0000-0000-000000000001','shared input',v,'C',null,false,10))
    then raise exception 'Incomplete override or logical filter failed'; end if;
  select count(*) into n from public.chrono_hybrid_search_arc_chunks_admin(
    '00000000-0000-0000-0000-000000000001','shared input',v,null,'polished_extract',true,100);
  if n<>1 then raise exception 'Document-type filter failed'; end if;
  if exists (select 1 from public.chrono_hybrid_search_arc_chunks_admin(
    '00000000-0000-0000-0000-000000000001',' ',v,null,null,true,10))
    then raise exception 'Empty query must not browse the archive'; end if;
  if has_function_privilege('authenticated','public.chrono_hybrid_search_arc_chunks_admin(uuid,text,extensions.vector,text,text,boolean,integer)','execute')
    or has_function_privilege('anon','public.chrono_hybrid_search_arc_chunks(text,extensions.vector,text,text,boolean,integer)','execute')
    then raise exception 'RPC privilege leak'; end if;
end;
$checks$;

set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000001',true);
do $checks$
declare v extensions.vector := (array[1.0]::real[] || array_fill(0.0::real,array[383]))::extensions.vector;
begin
  if not exists (select 1 from public.chrono_hybrid_search_arc_chunks('shared input',v,null,null,true,10))
    then raise exception 'Public invoker cannot read own archive'; end if;
  if exists (select 1 from chrono_search_private.search_chunks(
    '00000000-0000-0000-0000-000000000002','shared input',v,null,null,true,10))
    then raise exception 'Private invoker bypassed RLS'; end if;
end;
$checks$;
reset role;
rollback;
