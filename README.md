# Chrono-Deck Scientific Mastery World v1.0

A 630-node interactive scientific knowledge graph with a frozen 39-node personal scientific core and postgraduate terminal routes.

## Deploy on GitHub Pages

Replace the existing repository `index.html` with the `index.html` in this folder, commit/push, and GitHub Pages will serve the new version.

## Cloud sync setup (one time)

Cloud sync is optional. The app always keeps a local/offline copy of progress.

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase_setup.sql`.
3. In Supabase, copy your **Project URL** and the **public anon/publishable key**.
4. Open Chrono-Deck and expand **Cloud sync**.
5. Paste the Project URL + public anon/publishable key and click **Save cloud settings**.
6. Create an account with email/password. If email confirmation is enabled, confirm it.
7. Sign in with the same account on every device.

After sign-in:
- local changes are pushed automatically after a short debounce;
- open devices check the cloud about every 20 seconds;
- when a device connects for the first time, local + cloud cleared arcs are merged to avoid accidental loss;
- later changes use the latest cloud state;
- local progress remains available if the network or cloud is unavailable.

## Security

The public anon/publishable key is designed for browser clients when Row Level Security is enabled.

**Never put a Supabase `service_role` key or any secret/admin key in this public repository.**

The included SQL enables Row Level Security and permits each authenticated user to read/write only their own `user_id` row.

## Progress compatibility

The v1.0 app preserves the existing localStorage keys used by v0.2, so progress already recorded in the same browser should carry over automatically.

You can still use **Export progress** / **Import progress** as an independent backup.

# Chrono-Deck Scientific Mastery World v1.0

A 630-node interactive scientific knowledge graph with a frozen 39-node personal scientific core and postgraduate terminal routes.

## ChatGPT-native T22 game

The [`chatgpt-app`](chatgpt-app/) directory contains a ChatGPT MCP App vertical slice for T22: one module, three launch-enabled Atomic ARCs, a polished fullscreen-capable game surface, Spire Master Engine V11.3 controls, durable save/resume codes, and Dual Extract Markdown downloads. Its catalog adapter reads the full audited T22 route so later expansion does not require a new application architecture.

## Deploy on GitHub Pages

Replace the existing repository `index.html` with the `index.html` in this folder, commit/push, and GitHub Pages will serve the new version.

## Cloud sync setup (one time)

Cloud sync is optional. The app always keeps a local/offline copy of progress.

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase_setup.sql`.
3. In Supabase, copy your **Project URL** and the **public anon/publishable key**.
4. Open Chrono-Deck and expand **Cloud sync**.
5. Paste the Project URL + public anon/publishable key and click **Save cloud settings**.
6. Create an account with email/password. If email confirmation is enabled, confirm it.
7. Sign in with the same account on every device.

After sign-in:
- local changes are pushed automatically after a short debounce;
- open devices check the cloud about every 20 seconds;
- when a device connects for the first time, local + cloud cleared arcs are merged to avoid accidental loss;
- later changes use the latest cloud state;
- local progress remains available if the network or cloud is unavailable.

## Security

The public anon/publishable key is designed for browser clients when Row Level Security is enabled.

**Never put a Supabase `service_role` key or any secret/admin key in this public repository.**

The included SQL enables Row Level Security and permits each authenticated user to read/write only their own `user_id` row.

## Progress compatibility

The v1.0 app preserves the existing localStorage keys used by v0.2, so progress already recorded in the same browser should carry over automatically.

You can still use **Export progress** / **Import progress** as an independent backup.
