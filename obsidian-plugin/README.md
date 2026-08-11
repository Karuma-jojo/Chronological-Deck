# Chrono-Deck Bridge for Obsidian

Early private bridge for authoring Chrono-Deck ARC notes in Obsidian while keeping Supabase as the structured cloud index.

## Install for private testing

Copy this folder into your Obsidian vault as:

`.obsidian/plugins/chrono-deck-bridge/`

Then enable **Chrono-Deck Bridge** under **Settings → Community plugins**.

Requires Obsidian 1.11.4+ because credentials use Obsidian SecretStorage.

## One-time configuration

1. Run `supabase/obsidian-bridge.sql` in the same Supabase project where `supabase/arc-vault.sql` is already installed.
2. In Obsidian plugin settings, enter the Supabase project URL and email.
3. Add/select your **public publishable/anon key** through the SecretStorage control. Never use `service_role`.
4. Run **Chrono-Deck: Sign in to Supabase**. Your password is prompted and is not stored.

## Commands

- **Validate current ARC note** — checks the required frontmatter contract.
- **Sign in to Supabase** — creates a Supabase Auth session; tokens are kept in SecretStorage.
- **Sync current ARC to Chrono-Deck** — sends document sections + typed relationships in one database transaction.
- **Create supplementary ARC from current note** — creates and cross-links a new `SUP-...` note locally.
- **Open Chrono-Deck website** — opens the configured web app.

See `docs/obsidian-bridge.md` for the canonical frontmatter and relationship contract.
