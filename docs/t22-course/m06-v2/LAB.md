# Finite evidence and decision laboratory

Run `python3 course/t22/labs/m06-finite-evidence-lab.py`. Standard Python3 library only; no downloads, seed, fitted data or numerical approximation is needed.

This is supplied-code assistance. M06 assesses the mathematics; independent implementation waits for M08. Read the complete joint tables and explain the results before running the file. Running or copying this program does not clear a session or establish independent coding.

The supplied example has prior(3/8,5/8), utilities(7,−3),(1,1),(0,0), and report-channel rows(2/3,1/3),(1/4,3/4). Predict the baseline, report policy, gross information value and a same-unit fee threshold. Compare an informative, null, perfect and impossible-third-report channel. Explain every supported posterior and why no conditional is computed for an impossible report.

The program cross-checks three routes: normalize report posteriors and average optimal actions; maximize each report's direct joint-mass action contribution; exhaust every supplied report-contingent policy. It also checks pre-observation posterior averaging and0≤EVSI≤EVPI. Exact agreement proves these finite calculations, not empirical calibration or live profitability.

After M08, independently implement the same model from a blank file, then handle an unseen third state, a tied optimal action, an impossible report and a fee specified in incompatible currency units. Record syntax help, supplied code and mathematical hints separately. No automatic equivalence grants this coding checkpoint from the M06 supplied program.
