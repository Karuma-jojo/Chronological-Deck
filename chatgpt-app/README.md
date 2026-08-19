# Chrono-Deck ChatGPT App — T22 Vertical Slice

This directory contains a ChatGPT-native MCP App for the first three Atomic ARCs of T22 Module 01. ChatGPT remains the adaptive game master; the app supplies the polished game screen, authoritative session state, V11.3 control buttons, durable resume codes, and two-file extraction.

## Launch content

- **Terminal:** T22 — Mathematical Quantitative Research & Capital Building
- **Module:** ARC053 — Newton I: Calculus — The Fluxions
- **Playable Atomic ARCs:** T22-M01-A01 through T22-M01-A03
- **Expansion foundation:** all 58 T22 modules and 596 Atomic ARCs are read from the existing audited catalog. Only the first three are launch-enabled in this release.

## Run locally

Requires Node.js 20 or newer.

```bash
cd chatgpt-app
npm install
npm test
npm start
```

The server listens at `http://localhost:8787/mcp`. Set these environment variables as needed:

- `PORT`: HTTP port.
- `CHRONO_DATA_DIR`: directory for durable session and export storage.
- `CHRONO_PUBLIC_URL`: public HTTPS origin used in download links.

For cross-session saves in deployment, mount `CHRONO_DATA_DIR` on persistent storage. The default local directory is `chatgpt-app/data`.

The included Dockerfile uses the repository root as its build context:

```bash
docker build -f chatgpt-app/Dockerfile -t chrono-deck-t22 .
docker run --rm -p 8787:8787 \
  -e CHRONO_PUBLIC_URL=https://your-public-origin.example \
  -e CHRONO_DATA_DIR=/data \
  -v chrono-deck-data:/data \
  chrono-deck-t22
```

Use persistent storage for personal play. Add authentication and a user-scoped database before turning this single-player build into a public multi-user service.

## Connect to ChatGPT

1. Deploy the server at a public HTTPS origin, or expose the local port through an HTTPS development tunnel.
2. In ChatGPT, enable Developer mode under **Settings → Security and login**.
3. In **Plugins**, add the server URL including `/mcp`.
4. Select the new connection in a chat and ask: `Open the T22 Chrono-Deck game.`

The app does not call the OpenAI API and does not contain an OpenAI API key. The selected ChatGPT model runs the narrative and reasoning inside the conversation.

## Interaction flow

1. `open_t22_game` displays the three-ARC launch screen or resumes a code.
2. `start_t22_arc` seals a server-side session and returns a model instruction for V11.3 boot calibration.
3. UI controls call `set_v11_control`, then send the exact reserved code as a ChatGPT turn.
4. `save_t22_checkpoint` stores a spoiler-safe state summary plus visible state, accepted/provisional claims, unresolved gate, proof debt, assistance provenance, phase, clearance, and Recovery Gate status.
5. `dual_extract_t22` writes independently composed raw-dump and polished-extract Markdown files and returns download links.

The UI also supports ChatGPT fullscreen mode. Its composer remains the place where the player makes free-form investigative moves.
