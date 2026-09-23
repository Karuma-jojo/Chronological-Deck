// Public browser credentials for this Chrono-Deck deployment.
// Supabase publishable keys are intentionally safe to ship to clients; RLS protects user data.
// A local override in chrono_mastery_sync_config_v1 still wins for portable/self-hosted copies.

export const DEFAULT_CLOUD_CONFIG = Object.freeze({
  url: "https://locvizvoqdwmdvnqofsv.supabase.co",
  key: "sb_publishable_qK1AXlrKT2AQzClpRNHP_A_Rf55iV5c",
});
