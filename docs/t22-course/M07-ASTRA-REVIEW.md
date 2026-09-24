# M07 independent review — repairs required

Date: 2026-09-24  
Repository: `Karuma-jojo/Chronological-Deck`  
Branch: `codex/t22-pedagogical-rebuild`  
Reviewed head: `1e5e94842803c2221a34256daf04c40ee18b640b`  
Verdict: **M07 NOT ACCEPTED/FROZEN. Bounded repairs required; preserve the architecture and correct mathematics. M08 CLOSED.**

This is the independent disposition requested after the existing M07 build. It does not regenerate M07 or reopen M01–M06. The later M05/M06 acceptance in `M05-M06-ASTRA-FOLLOWUP.md` is preserved. The historical checkpoint `bd0b54f71524b831ec264d9fcae1afb3d2dfd7dc` is not today's head.

## Recovered state and review scope

Recovered the actual branch ref and commit ancestry, including the M05/M06 repair/acceptance chain, M07 builder repairs and subsequent verification/handoff commits. The latest chain includes `84baddc69643f4654eb87bf05ed907febf37b077` (verified implementation), `d187cc3`, `d393a5e`, `1fdd001`, `3b00e18`, and `1e5e948` (handoff-check pin). All blobs in the local review snapshot were checked against the remote Git blob hashes. No `AGENTS.md` was present in that tree.

Read the boundary, authoring pack, CERBERUS audit, handoff, recovery log, prerequisite records, runtime exposure/fingerprint code, validation scripts and actual CI logs. Content scope: all24 lessons, all48 public task/evaluator pairs, all120 ownership-to-evidence mappings. Locators below refer to `course/t22/authoring/m07.json` at the reviewed SHA. `C1` means the first required-ownership claim; `M3` means Main rubric row3; `T1` means Transfer row1. Stable session/task prefix is `T22V3::T22E-MKT01::`.

The module has a useful sequence from price/cash-flow language through returns, signed P&L, quotes/orders/fills and an integrated ledger. M02 is correctly declared before logarithms. Quantity-weighting, short-P&L signs, compound returns, bid/ask sides and fee reconciliation have correct numerical references. M45–M56 boundaries remain intact. These strengths should survive the repair.

## M07-01 — solved answers and practice overlap fixed assessments [high]

| Source lesson | Affected fixed task | Evidence and classification |
|---|---|---|
| S17 worked example (`sessions[16].lesson`) | S17 Main | Both use a buy100 order, fills30 then20, cancellation of50 and final position+50. The lesson explicitly supplies the cumulative fill, cancelled remainder and final position requested by Main. This is direct worked-answer exposure. |
| S16 guided check (`sessions[15].lesson`) | S16 Transfer | Both use bid50.80/ask51.10 and sell limit51.00. The lesson supplies the answer that it cannot immediately execute against bid50.80. The later51.05 subquestion is additional, but the first scored eligibility decision is already solved. Calling the sentence a guided check does not make it unsolved. |
| S07 guided check (`sessions[6].lesson`) | S07 Main, inverse-conversion subpart | The lesson explicitly gives the pair simple return−.20 ↔ log return ln(.8); Main asks for the simple return corresponding to ln(.8). This is the same solved conversion pair in reverse, not merely an incidental repeated number. |
| S03 guided check (`sessions[2].lesson`) | S04 Main | Both use80→92 and ask for the simple return. The guide supplies the12-unit difference but leaves the return for the learner. Record this as overlapping practice of the return subproblem, not a fabricated full-reference reveal. |

The separation test checks that a long literal prompt fragment is absent from the same session's lesson. Rewording identical data defeats it; cross-session practice is outside that comparison. The 24 `builder-reviewed-separated` records and the CERBERUS claim of zero known leakage are contradicted by these examples.

**Repair:** replace the affected instructional instances with distinct data and reasoning opportunities; preserve the fixed tasks where useful. Re-audit across lessons as well as within each session. Update the human separation ledger and add targeted semantic/data guards, rather than lengthening literal forbidden fragments. This does not prohibit teaching the general method or reusing established principles.

## M07-02 — coverage count is not semantic observability [high]

All120 records currently map claim i to Main rubric row i. The validator no longer *requires* that positional arrangement, but its membership check accepts the arrangement without checking meaning. `coverageAudit.policy` says the one-to-one mapping was deliberately audited; the following counterexamples disprove that assertion.

| Session | Affected claims / current evidence | Required disposition |
|---|---|---|
| S01 | C1 definition → M1 cash210; C2 price/distribution/sale distinction → only M2 distribution6; C4 separate later events → M4 net21 | Apply/compute and define are different obligations. Narrow C1 or elicit the intended definition. Link the multi-event distinctions to the actual event rows and explanation, not just one amount or their net. C3→sale proceeds is a valid trade-cash observer; no gratuitous rewrite needed. |
| S04 | C2 show G=1+R → M2 numerical R; C3 conversion → only M3 relationship | M3 is the relationship observer; numerical conversions use M1/M2 as appropriate. Clarify whether C1/C2 claim application in this instance or a definition/algebraic derivation: the current public request can be answered by the numerical identity1.15=1+.15. Do not silently demand an extra derivation. |
| S05 | C4 explain nonadditivity → M4 incorrect arithmetic sum; C5 use counterexample → M5 changed-base explanation | The explanation is M5; the numerical counterexample is the factor/product/return/sum comparison across M1–M4. Use the actual combination needed. |
| S06 | C2 compute each log → M2 product law; C3 add logs → M3 cancellation; C4 show cancellation → M4 final log | Map C2 to M1, C3 to the log-law/result rows, C4 to M3. Keep C1's wording within what writing the one-period expressions demonstrates. |
| S07 | C1 derive formula → M1 allows “used/derived”; C5 same sign AND unequal magnitude → M5 only rejects equality | Neither task requests the derivation or sign comparison. Narrow the claims to demonstrated application, or explicitly request and score the missing reasoning. Do not pretend use proves derivation. |
| S09 | C4 interpret P&L sign → M4 underlying12% return | Use the P&L/sign evidence and make the scored interpretation match the existing public sign request. A positive underlying return alone is not the claimed P&L interpretation. |
| S10 | C3 sign interpretation → M3 signed formula; C4 connect formula forms → M4 sign interpretation | Swap/remap to the actual sign and formula evidence. C5 also lists recalls, although the lesson does not introduce that term; see M07-04. |
| S11 | C3 compute P&L → M3 underlying return; C4 quantity-independent return → M4 P&L70 | C3 belongs to M4, C4 to M5's scaling explanation. Keep C5 linked to the appropriate part of M5. |
| S16 | C2 SELL constraint → M2 BUY ask rejection; C3 immediate crossing → M3 later ask | Use Transfer's explicitly requested sell constraint (T1) for C2 and Main's immediate-crossing rowM2 for C3. Main contains no sell-limit request. |
| S17 | C3 position after EACH fill → M3 +30 then+50 | The public prompt asks only for final signed position; reconcile the scope as in M07-03. |
| S22 | C2 subtract sells → M2 classifies a BUY; C3 classify add/reduce → M3 numerical+3; C4 exact close at zero → M4 crosses through zero; C5 crossing → M5 rejects “buy=open long” | C2 has actual sell observers in Transfer. C3 needs classification rows. C5 needs the crossing row. Neither task has a trade ending exactly flat, so C4 is not independently demonstrated by crossing zero inside a larger fill. Add one bounded exact-closure case or narrow the claim. |
| S24 | C1 diagnose initial marketability → M1 | Main does not request that diagnosis; Transfer does. Map to Transfer if retained, and separately remove or explicitly request the hidden Main obligation. |

Other session mappings—S02, S03, S08, S12–S15, S18–S21 and S23—did not yield a material claim/row mismatch in this pass. That is a bounded content-review result, not external certification of learner mastery. S15 and selected later Transfers still have the separate issues below.

**Repair:** re-audit all120 links, permitting several rubric rows and Main/Transfer observers as appropriate. Prefer narrowing overstated labels where the demonstrated capability is sufficient; do not append ceremonial explanations to every prompt. Persist a reviewed semantic contract with a mutation test that rejects a wrong-but-existing criterion. Test logs must distinguish structural membership from independently reviewed meaning.

## M07-03 — public requests, scoring and fill quantity [medium]

| Task | Problem | Bounded repair |
|---|---|---|
| S07 Main | M4 additionally demands that the zero-price boundary be distinguished. The prompt asks for the strictly-positive-price domain. `R>−1` fully answers that request. | Request the zero-price explanation explicitly if it is important, or score the requested domain alone. |
| S17 Main | M3 scores position after each fill (+30,+50), but the public request asks for cumulative fills after each fill and only the **final** signed position. M2 also expects remaining70 then50 although “remaining working quantity before cancellation” can reasonably mean just50. | Explicitly request intermediate position/remainder states, or score only the states actually requested. |
| S24 Main | M1 awards2 points for an initial marketability diagnosis absent from the requested computations. “It does not immediately fill” is supplied information, not the learner's diagnosis that the ask exceeds the limit. | Ask for the diagnosis or remove that scored obligation. The Transfer already requests it. |
| S15 Transfer | Submitted size8 is given, but the reported fill specifies only49.80. The reference/rubric assumes all8 filled to get398.40 and total deviation1.60. S02 explicitly teaches that submitted size is not filled size. | State that all8 execute at49.80, or provide the actual fill quantity. Accept a learner who identifies the missing quantity under the current wording. Make the same full-fill assumption explicit in S15's worked example, which also jumps from submitted10 to cash300.80 without a reported size. |

The S15 numbers are correct **conditional on** the intended full fill; this is a specification ambiguity, not an arithmetic mistake. Negative scope checks such as “do not invent unprovided fees” do not automatically require a separate disclaimer. Likewise, necessary intermediate arithmetic can be shown by a valid equivalent computation rather than a ceremonial list of every intermediate value.

## M07-04 — short/cover and mark terminology need small novice bridges [medium]

S02 assigns positive/negative inventory signs but does not explain short-sale mechanics. S10 then starts with “short ... later cover” and supplies formulas. There is no plain-language account of borrowing/selling units and later buying units back to return them, or a definition of *cover*. The existing M01/M02/M05 prerequisite sources do not supply that missing market-language bridge. “Borrow/margin/distribution mechanics” are named as excluded, while the Main reference also names *recalls* without teaching the term.

Add a brief simplified cash-flow derivation: initial sale receipts minus later repurchase cost explains q(P0−P1); define cover, and explain any exclusion the learner is expected to name. This needs no regulation, queue theory, margin calculation or deep borrowing mechanics. Alternatively remove untaught named exclusions from the ownership requirement. The basic borrowed-sale/repurchase model agrees with the SEC's [Introduction to Short Sales](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-51), consulted2026-09-24.

S09 introduces “mark-to-market”; S12 uses *mark* and *unrealized* in formulas; S23 uses marked equity. Define a mark as the supplied valuation price for units still held, not a new sale or cash receipt. State that unrealized P&L changes marked value while the actual cash ledger stays unchanged until a cash event. The existing examples/formulas can then do their intended teaching work.

The S15/S16 execution-price and limit-constraint distinctions themselves are sound. The SEC's [Understanding Order Types](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-14) supports distinguishing order instructions from actual executions, potentially different fill prices, and limit-price constraints from guaranteed fills. These sources are terminology checks, not investment recommendations.

## M07-05 — selected Transfers remain parallel drills [medium]

S19 Transfer repeats two buys followed by a partial sale under the same average-cost convention, asking for the same outputs. S21 Transfer repeats the same frozen bid/ask round trip and two fees. S24 Transfer repeats the limit→two fills→immediate exit ledger with different data and omits Main's interim mark calculation; its explicit initial eligibility question is useful but does not substantially change the representation or inference. S18's two-fill weighted mean is also useful practice, but should not be advertised as strong changed-surface transfer by itself.

Repair the bounded S19/S21/S24 set to require reconstruction or diagnosis on a changed surface while retaining taught mathematics: for example, identify an inconsistency in a supplied ledger, recover a missing aggregate from a reported total, or reconcile a proposed fee/spread decomposition. Choose fresh data and leave the decisive inference to the learner. Do not turn these suggestions into solved steps in the public task. Do not rebuild all24 sessions. Existing useful direction changes, such as long→short and buy→sell in other Transfers, should be preserved.

## Versioning and historical exposure are part of the repair

Current instruction version is `m07-instruction-v1-cerberus`; authoring version is `m07-authoring-v1-cerberus`; all48 task obligations are version1. Both historical overlap maps are empty. `initialVersionAudit`'s original no-history statement cannot be used to assume no one has since opened these published candidate lessons.

The review reproduction confirms that a lesson exposure followed by a later nominally independent secure attempt can currently qualify for S07 Main, S16 Transfer and S17 Main. The shared runtime has no M07 solved-source ledger telling it otherwise. This is a metadata/content gap; no new generic evidence architecture is required.

Repair requirements:

1. Keep stable IDs and the shared evidence key. Bump the instruction version after separating the lessons.
2. Record source→target solved links: S07→S07-M, S16→S16-T, S17→S17-M. Keep S03→S04-M in the separate practice-overlap record; do not invent a full reference reveal for unsolved practice.
3. Use timestamp-aware migration for old solved instruction. Preserve evidence preceding exposure; do not allow post-exposure work to qualify as independent. A new clean lesson must not erase an older solved exposure during either import order.
4. Version changed prompt/evaluator obligations; retain old attempts as stale where appropriate. Ownership-contract changes must also preserve the distinction between the old and new contract. Do not simply relabel old records secure.
5. If a fixed numeric task is retained after solved exposure, require a fresh solution-free replacement probe for independent evidence. If a task is substantively replaced, document the deliberate equivalence/non-equivalence policy; do not carry an answer-specific contamination label or independent credit across versions by accident.
6. Test repaired clean instruction, legacy solved exposures, guided-only practice, stale task contracts, pre/post-exposure timing, both merge orders and browser export/import/reload. Reuse the accepted M05/M06 patterns.

`audit/m07-review-baseline.json` records the reviewed authoring SHA256,24 session-contract hashes,48 assessment fingerprints and all obligation versions. It is a historical baseline, not a new learner record. No learner progress was modified in this review.

## Verification actually performed

| Check | Result and limit |
|---|---|
| Exact-head full GitHub Actions | [Run35928115540](https://github.com/Karuma-jojo/Chronological-Deck/actions/runs/35928115540), job107407975009, **SUCCESS**, head `1e5e94842803c2221a34256daf04c40ee18b640b`. Inspected completed job steps and decoded logs, including checkout SHA. |
| Real browser job | Chromium installation and browser evidence step both succeeded. Logs explicitly confirm seven-module scope, M07 draft/assistance provenance, save/reveal/review, export/import, packet exposure, corrupt-storage preservation and mobile width. Browser was not skipped. This review did not repeat Chromium locally. |
| Local existing workflow commands | All52 syntax/non-browser invocations passed against the recovered snapshot. Existing M01–M06 and shared semantic/evidence checks remain green. |
| Independent numeric review | `node docs/t22-course/audit/m07-review-checks.mjs` recomputes all48 Main/Transfer numeric cases; PASS. S15-T is explicitly conditional on the intended full8-unit fill. No material numerical-reference error found. Symbolic log/domain/sign reasoning was also read manually. |
| Adversarial reproductions | Same script reproduces all120 same-index Main mappings, the S16 sell-limit/ask-row mismatch, S17 solved overlap and the three unclassified solved-exposure cases. Its successful exit confirms reproduction, **not** pedagogical acceptance. It is not installed as a publication gate. |
| Human semantic/pedagogical review | M07-01 through M07-05 remain OPEN. Existing green CI and builder audit are insufficient for acceptance. |

The previous builder implementation run35927759177 on84baddc is preserved in the handoff; the later exact-head result above is additional evidence. The present review changes documentation and review artifacts only. It does not claim to implement the repairs, alter runtime contracts or produce a repair-head Actions result.

## Smallest next work and stop

Repair M07-01 through M07-05 in M07's authoring pack and its necessary semantic/separation/version guards. Use the existing shared provenance machinery unless a concrete regression requires a narrow change. Write `M07-RESOLUTION.md`, update the handoff and log, run the complete required checks, push a coherent repair checkpoint and inspect the actual full repair-head Actions result. Then stop for bounded independent follow-up. M08 remains closed.

M01–M06 remain accepted. The learner should continue M02 after reported M01 completion; reconstructed RAW extracts are not a complete independent audit trail and have not been newly recertified here. The recorded hours/rates extraction typo remains corrected: hours→seconds multiplies by3600; per-hour rates→per-second rates divide by3600;72 km/h=20 m/s was correct.
