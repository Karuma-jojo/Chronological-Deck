import fs from "node:fs";

const sql = fs.readFileSync("supabase/arc-logical-authority-v1.sql", "utf8");
const edge = fs.readFileSync("supabase/functions/arc-archive-access/index.ts", "utf8");
const client = fs.readFileSync("chatgpt-app/lib/archive-client.js", "utf8");

function requireText(source, needle, label = needle) {
  if (!source.includes(needle)) throw new Error(`Missing logical-authority contract: ${label}`);
}

function forbidText(source, needle, label = needle) {
  if (source.includes(needle)) throw new Error(`Forbidden logical-authority contract: ${label}`);
}

requireText(sql, "create table if not exists public.arc_logical_arcs", "authority table");
requireText(sql, "create table if not exists public.arc_logical_arc_revisions", "authority revision ledger");
requireText(sql, "primary key (user_id, logical_arc_id)", "logical ARC primary key");
requireText(sql, "alter table public.arc_logical_arcs enable row level security", "authority RLS");
requireText(sql, "revoke insert, update, delete on public.arc_logical_arcs from anon, authenticated", "RPC-only authority mutation");
requireText(sql, "chrono_update_logical_arc_authority", "explicit authority update RPC");
requireText(sql, "AUTHORITY_CONFLICT", "optimistic authority conflict guard");
requireText(sql, "authority_revision = l.authority_revision + 1", "revision increment");
requireText(sql, "chrono_refresh_logical_arc_identity", "identity seed/refresh function");
requireText(sql, "chrono_logical_authority_drift_admin", "representation drift audit");
requireText(sql, "coalesce(l.clearance, d.clearance)", "public semantic authority clearance");
requireText(sql, "coalesce(cl.clearance, d.clearance)", "related-ARC authority clearance");
requireText(sql, "chrono_load_arc_bundle_with_authority_admin", "admin authority bundle");

const syncStart = sql.indexOf("create or replace function public.chrono_sync_obsidian_arc_v3");
const syncEnd = sql.indexOf("-- Additive bundle RPCs", syncStart);
if (syncStart < 0 || syncEnd < 0) throw new Error("Could not isolate chrono_sync_obsidian_arc_v3");
const syncBody = sql.slice(syncStart, syncEnd);
requireText(syncBody, "chrono_refresh_logical_arc_identity", "V3 sync seeds/refreshes authority identity");
forbidText(syncBody, "update public.arc_logical_arcs", "ordinary document sync must not directly mutate academic authority");
forbidText(syncBody, "recovery_state =", "ordinary document sync must not set recovery authority");
forbidText(syncBody, "highest_effective_assistance =", "ordinary document sync must not set assistance authority");

const dollarQuotes = (sql.match(/\$\$/g) || []).length;
if (dollarQuotes % 2 !== 0) throw new Error(`Unbalanced SQL dollar quotes: ${dollarQuotes}`);
if (!/^\s*--[\s\S]*\bbegin;/.test(sql)) throw new Error("Logical authority migration must begin transactionally");
if (!/commit;\s*$/i.test(sql)) throw new Error("Logical authority migration must commit transactionally");

requireText(edge, "chrono_load_arc_bundle_with_authority_admin", "Edge authority bundle RPC");
requireText(edge, "chrono_load_arc_bundle_admin", "Edge legacy bundle fallback");
requireText(edge, "authority: payload.authority || null", "Edge authority response");
requireText(edge, "missingRpc", "rolling-deployment fallback guard");

requireText(client, "export async function loadArcBundleWithAuthority", "authority-aware archive client");
requireText(client, "authority:", "archive client authority field");
requireText(client, "export async function loadArcBundle(logicalArcId)", "legacy document-array client API retained");
requireText(client, "return bundle.documents", "legacy client compatibility");

console.log("Logical ARC authority v1 contract checks passed.");
