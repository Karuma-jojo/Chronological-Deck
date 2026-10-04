# T22 M03 v2 r4 — Follow-up adversarial confirmation

Date: 2026-10-05  
Exact repair SHA reviewed: `ed10a7b142e5f771ac1d61965e2038707e3265b9`  
Exact-head workflow: run #735 / `37232371604` — **SUCCESS**  
Prior review: `M03-V2-INDEPENDENT-ADVERSARIAL-REVIEW-r1.md`  
Repair resolution: `M03-V2-INDEPENDENT-REVIEW-REPAIR-RESOLUTION-r1.md`

## Disposition

**ACCEPT — recorded independent-review findings are closed.**

This disposition applies to the r4 candidate on the exact SHA above. It does not claim an external
human review and it does not merge or publish the branch by itself.

## Fresh follow-up checks

I rechecked the repair against the original findings rather than accepting the repair receipt as
proof.

### Artifact integrity

The Strategy Lab source and compiled r4 Master Pack have no disallowed ASCII control characters.
The r3 serialization failures are absent. The repaired mathematical statements are readable and
well-formed.

### Strategy-Lab freshness

The final proof/counting labs are not simple changed-constant copies of the fixed M03 bank or the
historical v1.7.2 probes. During follow-up, one intermediate replacement was rejected because its
divisibility proof shape remained too close to S09; final A4 is instead the distinct
`|x| >= x` case-proof surface.

The final lab set exercises different representations and choices: midpoint inequality, nonlinear
existence/uniqueness, claim repair, absolute-value cases, recurrence conjecture/proof, constrained
ordered strings, reversible subset pairing, constant-fibre division, modulo-class holes, subset
complement, grid-line rectangle encoding, reachability invariant and a difference process.

I independently checked the underlying mathematics of the new probes:
- A1 follows by adding x to x<y and dividing the resulting inequalities by 2;
- A2 has witness x=1 and uniqueness because (v^3+v-(u^3+u)=(v-u)(v^2+uv+u^2+1)), whose second factor is positive;
- A3 repairs to (a=b) or (a=-b);
- A4 is equality exactly for (x>=0);
- A5 gives (a_n=n^2);
- B1 count is (inom42 P(3,2)^2=216);
- B2 has (2^7=128) even-cardinality subsets by toggling one distinguished element;
- B3 gives (inom84/2=35) unlabeled splits;
- B4 follows from four residue classes modulo 4;
- B5 gives (2^{10}-2^7=896);
- B6 gives (inom52inom42=60) rectangles;
- B7 is impossible because every move changes x+y by 3 while 10+10 is not divisible by 3;
- B8 always terminates because list length falls by one, while parity of the total sum is
  preserved because one move changes the sum by twice the smaller chosen entry; the final entry
  is therefore odd.

### Literal evidence ownership

The S33/S34/S35/S36 ownership repairs now distinguish supplied structure from learner-created
structure. Claim wording, public request and rubric observers remain aligned, and no fixed task was
changed to manufacture observability after the fact.

### Cueing honesty

S07-M, S31-T and S34-T now admit the relevant prompt/lesson cueing. Their classifications no
longer imply uncued discovery where the public prompt supplies the broad route.

### Fixed-contract preservation

The canonicalized `problems + evaluators` payload on r4 is identical to the reviewed r3
implementation. Thus the bounded review repair did not silently change any of the 72 fixed task
contracts while correcting metadata and unscored lab material.

### Technical verification

Run #735 passed on the exact repair SHA:
- syntax;
- structural/pedagogy/semantic/evidence regressions;
- independent M03 math checks;
- clone/serialization and R01–R05 repair regressions;
- inherited downstream guards;
- Chromium learner workflow;
- r4 artifact packaging.

## Final review conclusion

No remaining material defect from R01–R05 survives on
`ed10a7b142e5f771ac1d61965e2038707e3265b9`, and this follow-up pass found no new blocker in
the repaired surfaces.

**M03 v2.0 r4 is accepted by this adversarial review cycle as the publication candidate.**

A repository merge to `main` remains a separate user-authorized action.
