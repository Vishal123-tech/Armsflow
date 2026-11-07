# Step 6: similar supplier profiles

The Similar countries page at /#similarity compares 80 eligible country/territory import profiles for 2021–2025. It uses an unsupervised scikit-learn NearestNeighbors index, not supervised prediction or forced cluster assignments.

## Authentic source and collection

Source: https://armstransfers.sipri.org/ArmsTransfer/TransferRegister
Retrieved 7 November 2026. All recipient, supplier and weapon filters were left unrestricted. Years 2021 through 2025, Buyer ordering, with both “Register with deliveries broken down by year” and “Register with only deliveries in the Year Range” checked. Downloaded with the official CSV button. Original source timestamp: 7 Nov 2026 1:49:55 PM, unspecified timezone.

Unchanged source bytes: data/raw/sipri_global_transfer_register_2021_2025.csv. The SHA-256 hash and exact filters are in data/global_source_manifest.json and reports/similarity_validation.json. There are 4,761 unique deal/year records and 170 source recipient names. No delivery TIV is blank; only 2021–2025 occurs. Parsing rejects unexpected schema, duplicate deal/year, nonnumeric/negative/nonfinite TIV and out-of-range years. No deduplication, interpolation or silent dropped records. Aggregation conserves total TIV. All India supplier totals reconcile exactly with the verified pilot, including 12,665.76 million TIV overall.

SIPRI's terms and non-commercial restrictions still apply; source files have not been publicly published. Existing source manifests and the India database are unchanged. The global register is used for this similarity feature only; it does not silently expand the equipment explorer, network or Step 5 model.

## Method and eligibility

Aggregate delivered TIV by recipient and supplier over the five-year period. Exclude source-designated non-state/organization recipients (asterisks) and unknown recipients. Require at least 100 million identified-supplier TIV and unknown-supplier TIV <=10% of the recipient total. These pragmatic quality thresholds are disclosed in the UI; all 90 exclusions have reasons. Source naming is retained without asserting political recognition.

Unknown suppliers remain in displayed total volume and unknown share but are excluded from matching. Remaining known supplier TIV is renormalized to shares summing to one. There are 62 supplier dimensions. Supplier absence is a zero recorded share, not evidence that no transfer could have occurred. Source zero TIV and uncertain deliveries retain the source interpretation.

Fit an exact brute-force nearest-neighbor index to square-root shares. Euclidean distance divided by sqrt(2) is Hellinger distance on these probability vectors. Display score = 100 * (1 - distance). Identical profiles score 100; disjoint supplier profiles score 0. Scores are not confidence, probabilities or geopolitical alignment. Results exclude the query country; tied distances rounded to 12 decimal places are ordered alphabetically. All profile dimensions enter matching; the UI shows eight leading supplier dimensions plus aggregated Other when needed.

This is descriptive retrieval fitted and queried on the same historical snapshot. No predictive-accuracy claim or artificial temporal train/test split is appropriate. It compares supplier composition, not spending, total military capability, domestic production or alliances. Import totals are shown separately to expose differences in scale.

## Validation and sensitivity

Fourteen focused ML/web tests passed. Tests independently calculate Hellinger neighbors for every profile, verify self-exclusion and deterministic ordering, identical/disjoint endpoints, scale invariance, unknown handling and eligibility, source uniqueness/year range/conservation, India reconciliation, API filters and existing ML/web behavior.

Leave-one-year-out sensitivity recomputes shares and neighbors after dropping each of the five years. The full-period eligible cohort stays fixed; recipients with zero remaining known volume are omitted from that run. Runs available are shown per profile (normally five). Across available runs, 77.99% of original top-five neighbors are retained on average. A separate cosine-distance comparison retains 77.5% of top-five neighbors. These are sensitivity measures, not accuracy or external validation. No tuning was done against a target neighbor list.

India's nearest five in this snapshot: China (52.0), Kazakhstan (48.4), Greece (44.1), Iraq (39.8), Algeria (39.3). India's mean leave-one-year-out retention is 88%. These moderate scores should not be read as close political alignment.

## Reproduce

```powershell
.venv\Scripts\python.exe -m pip install -r requirements-ml.txt
.venv\Scripts\python.exe -m pipeline.similarity
.venv\Scripts\python.exe -m unittest tests.test_similarity tests.test_ml tests.test_web -v
```

Output: data/processed/supplier_similarity.json and reports/similarity_validation.json. API: /api/similarity?recipient=India. Frontend: web/frontend/similarity.js. Build frontend with npm run build, then restart the local web server after Python route changes. Model results are generated offline; server requests only read JSON.

Algorithm reference: https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.NearestNeighbors.html

Step 7 (broader integration and testing) remains pending user approval. Step 8 (deployment and portfolio demo) has not started.
