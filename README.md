# Chrono-Deck

An interactive science and mathematics knowledge graph with historical study, research routes, entrance preparation and an ARC archive.

The current registry has **838 world nodes and 24 terminal routes**. The original 39-node scientific core is preserved. Stable IDs are never recycled.

- **T22:** 58 research modules, decomposed into 596 atomic ARCs, for mathematically led quantitative research.
- **T23:** 66 nodes for computational and field science, across six stages.
- **T25:** 46 M.Stat entrance units, with a selectable companion-exam extension. The complete catalogue contains 104 entrance units; the extra 58 are not all required for M.Stat.

Open `index.html` through a static HTTP server or the existing GitHub Pages site. There is no frontend package installation or build step. Deploy the complete repository assets together; replacing only the HTML is insufficient.

## Entrance preparation

Use **T25 · ISI entrance preparation** in the header, or select T25 in the terminal menu. Choose the M.Stat core or one companion exam, select a unit, and open a copy-ready investigation, learning, practice, review or project prompt.

The [T25 route guide](docs/t25-entrance-prep.md) explains the official syllabus map, study flow, exam priorities, evidence backups and audit scope. The reference baseline is ISI 2026, the currently linked CMI syllabus, and the revised GATE 2027 syllabi. Recheck application-year rules.

## Progress and archive

Existing world and T22 progress keys are preserved. T25 concept checkmarks use the existing world-progress mechanism. T25 practice evidence and the companion-exam choice are **device-local**, with a separate evidence export/import. A concept checkmark is a self-assessment; it does not certify exam readiness.

The page contains the existing optional cloud-sync setup controls. The [Obsidian bridge guide](docs/obsidian-bridge.md) describes the archive integration. These are separate from the T25 practice log. Keep backups using each relevant export control.

T25 atomic cards also have a small cloud-backed [review / retention layer](docs/t25-review-retention.md), shown as **Revision Stack**. Delayed reviews never silently change academic clearance. It uses the existing cloud login and is separate from the device-local practice log.

The [ChatGPT-native app](chatgpt-app/) is a separate T22 vertical slice with its own launch coverage. Adding T25 to this website does not automatically add T25 game launches to that app.

## Validation

```sh
node scripts/test-t25.mjs
node scripts/validate-world.mjs
node scripts/validate-t22-atomic.mjs
node scripts/validate-t22-rich-syllabus.mjs
node scripts/test-markdown.mjs
node scripts/test-obsidian-contract-v3.mjs
```

The older world validator intentionally checks the registry through T23; the T25 test validates the final overlay and preserves that legacy baseline. Additional per-module checks live in `scripts/` and existing GitHub Actions workflows.
