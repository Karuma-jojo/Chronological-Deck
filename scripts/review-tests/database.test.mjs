import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { fixture, USER, OTHER, sql } from './fixture.mjs';
import { A01_REVIEW_TARGET, retentionSummary, localReviewDate, formatReviewDate, SupabaseReviewRepository } from '../../js/data/review-store.js';
import { CloudSchemaError } from '../../js/data/supabase-arc-store.js';

const plus=(date,days)=>{const d=new Date(`${date}T12:00:00Z`); d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10)};
test('review SQL, identity, ownership, scheduling and deletion',async t=>{
 const {db,today,as,admin}=await fixture();
 const call=async(fn,args,casts)=> (await db.query(`select public.${fn}(${args.map((_,i)=>`$${i+1}::${casts[i]}`).join(',')}) v`,args.map(a=>typeof a==='object'&&a!==null?JSON.stringify(a):a))).rows[0].v;
 const create=(extra={})=>call('chrono_create_arc_review_item',[{...A01_REVIEW_TARGET,id:randomUUID(),source_key:randomUUID(),...extra},today],['jsonb','date']);
 const update=(item,patch)=>call('chrono_update_arc_review_item',[item.id,patch,item.lock_version,today],['uuid','jsonb','integer','date']);
 const record=(item,result,extra={},id=randomUUID())=>call('chrono_record_arc_review_attempt',[item.id,id,item.lock_version,{result,...extra},today],['uuid','uuid','integer','jsonb','date']);
 const load=()=>call('chrono_load_arc_review',['T25-ARC801-A01',null],['text','text']);
 const history=i=>call('chrono_list_arc_review_attempts',[i.id],['uuid']);
 const due=async(i,stage=0)=>{await admin(`update arc_review_items set due_on=$1::date,stage=$2 where user_id=$3 and id=$4`,[today,stage,USER,i.id]);return {...i,due_on:today,stage}};
 let item;
 try {
 await t.test('additive migration reapplication is idempotent',async()=>{await admin(sql);assert.equal((await load()).length,0)});
 await t.test('manual A01 target saves and loads with exactly one logical identity',async()=>{item=await create({source_key:'a01-absolute-value-v1'});assert.equal(item.logical_arc_id,'T25-ARC801-A01');assert.equal(item.due_on,plus(today,3));assert.equal(item.state,'active');assert.equal((await load()).length,1);assert.equal(retentionSummary([item]).state,'unverified')});
 await t.test('RAW/POLISHED aliases and retried setup do not duplicate or overwrite',async()=>{
   for(const suffix of ['RAW','POLISHED']) {const same=await create({source_key:'a01-absolute-value-v1',logical_arc_id:`T25-ARC801-A01-${suffix}`,prompt:'must not overwrite'});assert.equal(same.id,item.id);assert.equal(same.prompt,item.prompt)}
   assert.equal((await load()).length,1);
 });
 await t.test('real identity refresh after representation resync leaves reviews intact',async()=>{
   const before=await load();await db.query(`select chrono_refresh_logical_arc_identity($1,'T25-ARC801-A01')`,[USER]);
   await db.query(`update arc_documents set updated_at=now(),clearance='incomplete' where user_id=$1`,[USER]);
   await db.query(`select chrono_refresh_logical_arc_identity($1,'T25-ARC801-A01')`,[USER]);
   assert.deepEqual(await load(),before);
 });
 await t.test('A01 academic clearance and recovery are not changed by item creation',async()=>{const a=(await db.query(`select clearance,recovery_state from arc_logical_arcs`)).rows[0];assert.deepEqual(a,{clearance:'fully_mastered',recovery_state:'not_owed'})});
 await t.test('independent clean due attempt advances stage and seven-day interval',async()=>{item=await due(item);const r=await record(item,'clean',{unfamiliar_transfer:true});item=r.item;assert.equal(item.stage,1);assert.equal(item.due_on,plus(today,7));assert.equal(r.attempt.unfamiliar_transfer,true);assert.equal(retentionSummary([item]).state,'in_review')});
 await t.test('early clean practice cannot accelerate or postpone the scheduled stage',async()=>{const r=await record(item,'clean');assert.equal(r.item.stage,1);assert.equal(r.item.due_on,item.due_on);item=r.item});
 await t.test('shaky result lowers stage and schedules a three-day recheck',async()=>{item=(await record(item,'shaky',{error_kind:'unknown'})).item;assert.equal(item.stage,0);assert.equal(item.due_on,plus(today,3))});
 await t.test('conceptual failure recommends repair without mastery/debt mutation',async()=>{
   const before=(await db.query(`select to_jsonb(a) v from arc_logical_arcs a where user_id=$1`,[USER])).rows[0].v;
   item=(await record(item,'failed',{error_kind:'conceptual'})).item;
   assert.equal(item.repair_recommended,true);assert.equal(item.due_on,plus(today,1));assert.equal(retentionSummary([item]).state,'repair_recommended');
   assert.deepEqual((await db.query(`select to_jsonb(a) v from arc_logical_arcs a where user_id=$1`,[USER])).rows[0].v,before);
 });
 await t.test('clerical failure metadata differs and does not imply conceptual repair',async()=>{let c=await due(await create(),3);const r=await record(c,'failed',{error_kind:'clerical'});assert.equal(r.item.stage,3);assert.equal(r.item.repair_recommended,false);assert.equal(r.item.due_on,plus(today,3));assert.equal(r.attempt.error_kind,'clerical')});
 await t.test('assisted clean attempt is preserved but does not promote independent retention',async()=>{const c=await due(await create(),2);const r=await record(c,'clean',{assistance:'forge0'});assert.equal(r.item.stage,2);assert.equal(r.item.due_on,plus(today,3));assert.equal(r.attempt.assistance,'forge0')});
 await t.test('full default progression and maintenance use documented intervals',async()=>{for(const [stage,days] of [[1,21],[2,60],[3,180],[4,180],[5,180]]){const c=await due(await create(),stage);const r=await record(c,'clean');assert.equal(r.item.stage,Math.min(5,stage+1));assert.equal(r.item.due_on,plus(today,days))}});
 await t.test('retry/double-click returns one immutable attempt, rejects altered payload',async()=>{
   const c=await due(await create());const id=randomUUID();const first=await record(c,'clean',{},id);const again=await record(c,'clean',{},id);
   assert.equal(again.replayed,true);assert.deepEqual(again.item,first.item);assert.equal((await history(c)).length,1);
   await assert.rejects(record(c,'failed',{},id),/attempt ID reused/);
 });
 await t.test('stale-session submissions with distinct IDs cannot advance one schedule twice',async()=>{const c=await due(await create());const both=await Promise.allSettled([record(c,'clean'),record(c,'clean')]);assert.equal(both.filter(x=>x.status==='fulfilled').length,1);assert.match(both.find(x=>x.status==='rejected').reason.message,/REVIEW_CONFLICT/);assert.equal((await history(c)).length,1)});
 await t.test('attempt insertion rolls back if schedule update fails (actual SQL transaction)',async()=>{
   const c=await due(await create());
   await admin(`create function review_test_fail() returns trigger language plpgsql as $$ begin raise exception 'injected schedule write failure'; end $$; create trigger review_test_fail before update on arc_review_items for each row execute function review_test_fail()`);
   await assert.rejects(record(c,'clean'),/injected schedule write failure/);
   await admin('drop trigger review_test_fail on arc_review_items; drop function review_test_fail()');
   assert.equal((await history(c)).length,0);assert.equal((await load()).find(x=>x.id===c.id).lock_version,c.lock_version);
 });
 await t.test('mathematical edits reset current evidence but preserve history snapshots',async()=>{const old=(await history(item))[0];item=await update(item,{prompt:'Revised mathematical question',reference:'Revised rubric'});assert.equal(item.last_reviewed_at,null);assert.equal(item.stage,0);assert.deepEqual((await history(item))[0],old);assert.notEqual(old.item_snapshot.prompt,item.prompt)});
 await t.test('personal notes do not reset established evidence',async()=>{let c=await due(await create(),2);c=(await record(c,'clean')).item;const n=await update(c,{personal_note:'My note'});assert.equal(n.stage,c.stage);assert.equal(n.last_reviewed_at,c.last_reviewed_at)});
 await t.test('suggestions need acceptance; ignored/archived items are not due work',async()=>{
   let c=await create({provenance:'extractor_suggested'});assert.equal(c.state,'pending');assert.equal(c.due_on,null);await assert.rejects(record(c,'clean'),/Only accepted/);
   c=await update(c,{state:'active'});assert.equal(c.due_on,plus(today,3));c=(await record(c,'shaky')).item;
   c=await update(c,{state:'archived'});assert.equal(retentionSummary([c]).active,0);assert.equal(c.due_on,null);assert.equal((await history(c)).length,1);
 });
 await t.test('parent mixed review has a scope without a fake logical authority row',async()=>{const c=await create({logical_arc_id:null,curriculum_scope:'ARC801',item_type:'mixed_review',provenance:'parent_mixed'});assert.equal(c.logical_arc_id,null);assert.equal(c.state,'pending');assert.equal((await db.query(`select count(*)::int n from arc_logical_arcs where logical_arc_id='ARC801'`)).rows[0].n,0);const loaded=await call('chrono_load_arc_review',[null,'ARC801'],['text','text']);assert.equal(loaded.length,1)});
 await t.test('cross-user RLS read, mutations, identity spoofing, and direct writes are denied',async()=>{
   await as(OTHER);assert.equal((await load()).length,0);assert.equal((await history(item)).length,0);
   await assert.rejects(update(item,{prompt:'attack'}),/not found/);await assert.rejects(record(item,'clean'),/not found/);
   await assert.rejects(db.query(`update arc_review_items set prompt='attack'`),/permission denied/);
   await assert.rejects(db.query(`delete from arc_review_attempts`),/permission denied/);
   const otherItem=await create({user_id:USER});assert.equal(otherItem.user_id,OTHER);
   await assert.rejects(create({logical_arc_id:'T25-ARC999-A01'}),/Archive this logical ARC/);
   await as();assert.equal((await db.query(`select count(*)::int n from arc_review_items where user_id=$1`,[OTHER])).rows[0].n,0);
   await assert.rejects(db.query(`insert into arc_review_attempts(user_id,id,item_id) values($1,$2,$3)`,[USER,randomUUID(),item.id]),/permission denied/);
 });
 await t.test('anonymous access and authenticated sessions without UID cannot mutate',async()=>{
   await as(null,'anon');await assert.rejects(load(),/permission denied/);await assert.rejects(create(),/permission denied/);
   await as(null);await assert.rejects(create(),/Authentication required/);assert.equal((await load()).length,0);await as();
 });
 await t.test('invalid metadata / identity edits fail without an attempt or authority write',async()=>{await assert.rejects(update(item,{logical_arc_id:'T25-ARC999-A01'}),/immutable/);await assert.rejects(record(item,'clean',{error_kind:'conceptual'}),/cannot be marked clean/);await assert.rejects(record(item,'automatic_pass'),/check constraint/)});
 await t.test('calendar DATE survives server time zone changes and validates client date',async()=>{const c=await create();for(const tz of ['Pacific/Honolulu','Pacific/Kiritimati','UTC']){await db.query(`select set_config('TimeZone',$1,false)`,[tz]);assert.equal((await load()).find(x=>x.id===c.id).due_on,c.due_on)}await assert.rejects(call('chrono_create_arc_review_item',[{...A01_REVIEW_TARGET,id:randomUUID(),source_key:randomUUID()},'2000-01-01'],['jsonb','date']),/local calendar/)});
 await t.test('logical deletion through existing RPC cascades own items and attempts only',async()=>{
   await call('chrono_delete_logical_arc',['T25-ARC801-A01','T25-ARC801-A01'],['text','text']);
   assert.equal((await load()).length,0);assert.equal((await history(item)).length,0);assert.equal((await db.query(`select count(*)::int n from arc_review_attempts`)).rows[0].n,0);
   assert.equal((await call('chrono_load_arc_review',[null,'ARC801'],['text','text'])).length,1,'independent parent scope survives child deletion');
   await as(OTHER);assert.equal((await load()).length,1);await as();
 });
 }finally{await db.close()}
});

test('calendar formatting uses local components and overdue is not forgetting',()=>{
 const prior=process.env.TZ;
 try{for(const tz of ['America/Los_Angeles','Pacific/Kiritimati','Asia/Kolkata']){process.env.TZ=tz;assert.equal(localReviewDate(new Date(2026,8,16,0,5)),'2026-09-16');assert.match(formatReviewDate('2026-09-16'),/16/);}}
 finally{if(prior===undefined)delete process.env.TZ;else process.env.TZ=prior}
 assert.equal(retentionSummary([{state:'active',due_on:'2026-01-01',stage:4,last_reviewed_at:'2025-12-01',repair_recommended:false}],'2026-09-16').state,'maintaining');
});
test('browser repository reuses transport and reports missing review schema',async()=>{
 const calls=[];const repo=new SupabaseReviewRepository({getState:()=>({signedIn:true}),rpc:async(n,b)=>{calls.push([n,b]);return []}});
 await repo.load('T25-ARC801-A01');await repo.create({...A01_REVIEW_TARGET,id:randomUUID()},'2026-09-16');await repo.record({p_attempt_id:'same'});
 assert.equal(calls[0][0],'chrono_load_arc_review');assert.equal(calls[1][1].p_today,'2026-09-16');assert.equal(calls[2][1].p_attempt_id,'same');
 const missing=new SupabaseReviewRepository({rpc:async()=>{throw new CloudSchemaError('missing')}});await assert.rejects(missing.load('A01'),/Review layer not installed/);
});
