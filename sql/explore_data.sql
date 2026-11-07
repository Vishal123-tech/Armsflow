-- Run against data/processed/armsflow.duckdb. These browse stored evidence;
-- supplier-share calculations and trend metrics belong to Step 3.

-- 1. Historical Rafale deliveries. NULL estimate flags mean unspecified.
SELECT supplier, recipient, designation, delivery_year, quantity_delivered,
       quantity_estimated, order_year, has_open_quality_issue, source_url, source_line
FROM delivery_detail
WHERE recipient = 'India' AND designation = 'Rafale'
ORDER BY delivery_year;

-- 2. Why order-year and production fields need review.
SELECT q.issue_id, q.field_name, q.description, c.value_text AS related_claim,
       s.url AS claim_source
FROM quality_issue q
LEFT JOIN evidence_claim c ON c.claim_id = q.related_claim_id
LEFT JOIN source_snapshot s ON s.source_id = c.source_id
WHERE q.sipri_deal_id = '58668';

-- 3. Inspect rounded values and missing cells before analysis.
SELECT supplier, delivery_year, raw_value, tiv_million, coverage_status
FROM bilateral_annual_detail
WHERE supplier IN ('Czechia', 'unknown supplier(s)')
ORDER BY supplier, delivery_year;
