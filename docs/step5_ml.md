# Step 5: unusual supplier changes

An experimental retrospective Isolation Forest model is now available at /#insights. It covers India, Russia and the United States. It does not forecast transfers or infer political intent.

## Reproduce

From the project folder, using Python 3.13:

```powershell
.venv\Scripts\python.exe -m pip install -r requirements-ml.txt
.venv\Scripts\python.exe -m pipeline.ml_insights
.venv\Scripts\python.exe -m unittest tests.test_ml tests.test_web -v
```

Results are written to data/processed/ml_insights.json and reports/ml_evaluation.json. The website reads the generated JSON; it does not retrain during requests or require scikit-learn to serve the page. Rebuild whenever the underlying data changes. Input SHA-256 hashes and the library version are recorded in the report.

## Design

A row is one recipient/supplier change from the previous year. Every supplier has a complete 2010–2025 annual grid. Both-zero pairs and transitions with zero recipient totals are excluded. All remaining covered suppliers, including unknown suppliers, contribute to the denominator. India uses register-precision metrics; Russia and US use rounded source cells. Blank source cells represent no identified transfers, not proof of no transfers. Unavailable India TIV aborts training.

Training: 2011–2020 transitions (2010 supplies the initial lag). Evaluation: 2021–2025, never used to fit the model or threshold. This is a retrospective time split on a later-retrieved snapshot, not a reconstruction of information available at the time.

Features: absolute share change in percentage points; log(1+current TIV) minus log(1+previous TIV); log(1+absolute TIV change). The 1 in the log expression is one million TIV. Tree model needs no learned scaling. No recipient IDs, supplier IDs or future features enter the model. Pooled training can still reflect recipient scale. Parameters: 300 trees, random seed 42, max_samples auto, contamination auto. Higher negative score_samples means more unusual. A review flag requires a score at or above the training 95th percentile. Percentiles are relative ranks, not probabilities.

## Evaluation

293 training observations (India 123, Russia 40, US 130); 152 review observations. Model flags: 7. Simple absolute share-change baseline >=10 pp: 26. Shared flags: 7. Mean pairwise flag-set Jaccard overlap for seeds 7/21/42: 70.9%. This is moderate stability, not predictive accuracy. The baseline comparison does not establish ML superiority. The model's flagged rows in this snapshot are concentrated in Russia; small totals amplify share movements. Before/after recipient totals are displayed alongside each result to expose this effect.

No verified anomaly labels exist, so precision/recall/accuracy cannot be claimed. Scores are candidates for analyst review. Explanations report observed input changes; they are not causal explanations or formal feature attributions. Broader coverage and expert review are required before production use or country clustering.

## Verification

Nine ML/web tests passed: complete annual grids and India total reconciliation; zero/missing-year handling; unchanged pre-2021 features after modifying future volumes; independent reproduction of model scores and threshold; API filtering and invalid inputs; existing web routes and records.

Algorithm reference: https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html
Data provenance: docs/source_collection.md and docs/multiple_recipients.md.

Step 6 (similar supplier profiles) remains pending user approval.
