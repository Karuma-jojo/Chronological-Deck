# T22 rebuild: Sol builder, Astra reviewer

Status: handoff scaffold, not a completed curriculum audit. Created 2026-09-17.
Repository: https://github.com/Karuma-jojo/Chronological-Deck
Branch: codex/t22-pedagogical-rebuild
Starting main commit: 1617c616ce89c20591b7e9460728f00601f8f096
T25 PR156 is merged into that main commit. Do not rebuild T25.

## Recommended division of work

Use GPT-5.6 Sol for repository inventory, source mapping, bounded module authoring, implementation, tests and documented repairs. Use GPT-6 Astra for a short architecture/sample review before bulk authoring, and a final risk-focused audit. These are workflow recommendations, not benchmark or credit-saving guarantees.

Use High reasoning for curriculum design and mathematical authoring if that control is available. Routine documentation or mechanical implementation can use a lower setting. Model selection happens in the user's interface; this document does not switch models or launch agents. Keep work sequential unless the user separately requests delegation.

Do not assume Astra will find only minor tweaks. A serious conceptual or prerequisite flaw needs a substantive repair. Changing models is not independent human certification, and both models can share errors.

Official model guidance consulted:
https://developers.openai.com/api/docs/guides/latest-model
It describes Astra's stronger general capability and long-task coherence. It does not establish an exact ChatGPT credit ratio or prove which model is cheaper for this particular build. Compare actual usage and rework for the initial batch.

## Workflow

1. Sol: complete Stage A in SOL-BUILD-SPEC.md. Save inventory, findings, dependency route, migration proposals and three complete sample modules. Prepare a concrete review packet and push.
2. Astra: use ASTRA-AUDIT.md in architecture mode. Audit the route and independently work the sample problems. Record blocking findings with repairs.
3. Sol: resolve architecture blockers, then author and integrate bounded batches. Continue from RUN-LOG.md. Do not redesign approved structure without evidence.
4. Astra: use ASTRA-AUDIT.md in final mode. Review risk-sensitive mathematics and empirical claims, migration, WALL boundaries and end-to-end readiness.
5. Sol: repair documented findings and run affected checks. Return unresolved substantive issues for review.
6. User decides whether to merge. Learner pilots and career outcomes remain separate evidence.

The early audit is an intentional review checkpoint in this proposed workflow, not an access-control approval requirement. If the user requests continuous Sol execution, follow that instruction, label the architecture provisionally self-reviewed, and preserve unresolved risks for later review.

## Copy this to Sol

Work in Karuma-jojo/Chronological-Deck on codex/t22-pedagogical-rebuild. Read docs/t22-rebuild/START-HERE.md, RUN-LOG.md and SOL-BUILD-SPEC.md. Continue the documented next stage without restarting. For the first run, complete Stage A, including three complete sample modules and the architecture review packet. Commit and actually push coherent checkpoints, verify the remote commit, then report the saved review packet. Do not begin full-course bulk authoring before this first review checkpoint unless I explicitly ask you to continue. Do not merge or deploy.

## Copy this to Astra for the first review

Read docs/t22-rebuild/RUN-LOG.md, REVIEW-PACKET.md and ASTRA-AUDIT.md on codex/t22-pedagogical-rebuild. Perform architecture mode against the recorded commit. Audit assumptions, prerequisites, role coverage and sample references; derive sample answers independently. Save specific findings and review scope, commit and push them. Do not rewrite the whole course, merge, deploy, or claim the entire bank is certified. REVIEW-PACKET.md is produced by Sol in Stage A; if absent, report the exact missing deliverable.

## Copy this to Sol after review

Continue from docs/t22-rebuild/RUN-LOG.md on codex/t22-pedagogical-rebuild. Resolve the findings in ASTRA-FINDINGS.md, provide evidence for each resolution, then continue the authorised stages in SOL-BUILD-SPEC.md. Save and push each coherent batch. Preserve the audited architecture, and log any necessary changes with their consequences. No merge or deployment.

## Copy this to Astra for the final review

Use final mode in docs/t22-rebuild/ASTRA-AUDIT.md against the exact commit in REVIEW-PACKET.md. Inspect original sources and changed files, not only Sol's summaries. Report tested, manually checked, sampled and unchecked content separately. Save findings and release disposition on the branch. No merge or deployment.

## Files

- SOL-BUILD-SPEC.md: substantive curriculum and implementation scaffold.
- ASTRA-AUDIT.md: architecture and final review contracts.
- RUN-LOG.md: current recoverable state and next actions.
- Later documents listed in the build specification do not exist yet.

Completing this handoff is not a claim that T22 has already been audited or rebuilt.
