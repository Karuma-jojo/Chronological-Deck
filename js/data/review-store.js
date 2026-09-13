import { SupabaseArcRepository, CloudSchemaError } from "./supabase-arc-store.js";

export const REVIEW_TYPES = ["recall", "concept_discrimination", "error_repair", "mini_problem", "unfamiliar_transfer", "mixed_review"];
export const REVIEW_PROVENANCE = ["user_created", "extractor_suggested", "error_derived", "assistance_derived", "parent_mixed"];
export function localReviewDate(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
export function formatReviewDate(value) {
  if (!value) return "Not scheduled";
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d, 12).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
export function retentionSummary(items, today = localReviewDate()) {
  const active = items.filter(i => i.state === "active");
  const due = active.map(i => i.due_on).filter(Boolean).sort();
  const state = active.some(i => i.repair_recommended) ? "repair_recommended"
    : !active.length || active.some(i => !i.last_reviewed_at) ? "unverified"
    : active.every(i => i.stage >= 3) ? "maintaining" : "in_review";
  return { state, active: active.length, due_on: due[0] || null,
    overdue: active.filter(i => i.due_on < today).length,
    due: active.filter(i => i.due_on <= today).length };
}
export const A01_REVIEW_TARGET = Object.freeze({
  logical_arc_id: "T25-ARC801-A01", curriculum_scope: "ARC801", source_key: "a01-absolute-value-v1",
  item_type: "concept_discrimination", provenance: "user_created",
  prompt: "For real u, why is √(u²) = |u| rather than simply u? Explain both signs of u and give a counterexample to √(u²) = u.",
  reference: "The principal square root is nonnegative. For real u, |u| = u if u ≥ 0, and |u| = −u if u < 0. In both cases |u| ≥ 0 and |u|² = u², so √(u²) = |u|. For example u = −3 gives √9 = 3, not −3.",
  personal_note: "Delayed-retention target: during A01 I understood the sign behavior in context, but did not independently learn absolute value deeply as its own concept. This is not proof debt, recovery debt, an A01 failure, or a reason to reopen A01.",
});

// Reuse the existing cloud config, session, headers and error handling. No new
// credentials, local persistence, grading service or archive write path.
export class SupabaseReviewRepository {
  constructor(transport = new SupabaseArcRepository()) { this.transport = transport; }
  getState() { return this.transport.getState(); }
  async rpc(name, body) {
    try { return await this.transport.rpc(name, body); }
    catch (error) {
      if (error instanceof CloudSchemaError) throw new CloudSchemaError("Review layer not installed. Apply supabase/arc-review-retention-v1.sql; ordinary T25 study remains available.");
      throw error;
    }
  }
  authority(id) { return this.transport.rpc("chrono_load_logical_arc_authority", { p_logical_arc_id: id }); }
  load(id, scope = null) { return this.rpc("chrono_load_arc_review", { p_logical_arc_id: id, p_curriculum_scope: scope }); }
  create(item, today = localReviewDate()) { return this.rpc("chrono_create_arc_review_item", { p_item: item, p_today: today }); }
  update(item, patch, today = localReviewDate()) { return this.rpc("chrono_update_arc_review_item", { p_item_id: item.id, p_patch: patch, p_expected_version: item.lock_version, p_today: today }); }
  record(request) { return this.rpc("chrono_record_arc_review_attempt", request); }
  history(id) { return this.rpc("chrono_list_arc_review_attempts", { p_item_id: id }); }
}
