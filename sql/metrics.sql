-- Step 3: volumes use delivery-register precision; the annual export supplies
-- the coverage grid. A blank means no IDENTIFIED deliveries, not proof of none.
CREATE TABLE IF NOT EXISTS analysis_period (
    period_id VARCHAR PRIMARY KEY, start_year INTEGER NOT NULL, end_year INTEGER NOT NULL,
    period_kind VARCHAR NOT NULL, CHECK (start_year <= end_year)
);
CREATE TABLE IF NOT EXISTS analysis_comparison (
    comparison_id VARCHAR PRIMARY KEY, earlier_period_id VARCHAR NOT NULL,
    later_period_id VARCHAR NOT NULL, comparison_kind VARCHAR NOT NULL
);

CREATE OR REPLACE VIEW metric_supplier_year AS
WITH records AS (
    SELECT t.recipient_id, t.supplier_id, d.delivery_year,
           sum(d.tiv_delivered_million) AS recorded_tiv,
           count(*) AS delivery_rows,
           count(*) FILTER (WHERE d.tiv_delivered_million IS NULL) AS missing_tiv_rows
    FROM delivery d JOIN transfer_deal t USING (source_id, sipri_deal_id)
    WHERE d.source_id='sipri_india_register'
    GROUP BY t.recipient_id, t.supplier_id, d.delivery_year
)
SELECT b.recipient_id, b.supplier_id, b.delivery_year,
       b.tiv_million AS rounded_source_tiv_million, b.coverage_status AS source_coverage_status,
       CASE WHEN coalesce(r.missing_tiv_rows,0)>0 THEN NULL
            WHEN r.delivery_rows>0 THEN r.recorded_tiv
            WHEN b.coverage_status='no_identified_deliveries' THEN 0
            ELSE NULL END::DECIMAL(18,6) AS recorded_tiv_million,
       CASE WHEN coalesce(r.missing_tiv_rows,0)>0 THEN 'incomplete'
            WHEN r.delivery_rows>0 THEN 'recorded'
            WHEN b.coverage_status='no_identified_deliveries' THEN 'no_identified_deliveries'
            ELSE 'incomplete' END AS analysis_coverage_status,
       coalesce(r.delivery_rows,0) AS delivery_rows
FROM bilateral_annual b LEFT JOIN records r USING (recipient_id,supplier_id,delivery_year)
WHERE b.source_id='sipri_india_annual';

CREATE OR REPLACE VIEW metric_supplier_period AS
WITH universe AS (SELECT DISTINCT recipient_id,supplier_id FROM metric_supplier_year)
SELECT p.period_id,p.start_year,p.end_year,p.period_kind,u.recipient_id,u.supplier_id,
       count(y.delivery_year)::INTEGER AS covered_years,
       (p.end_year-p.start_year+1)::INTEGER AS expected_years,
       CASE WHEN count(y.delivery_year)=p.end_year-p.start_year+1
                  AND count(*) FILTER (WHERE y.analysis_coverage_status='incomplete')=0
            THEN sum(y.recorded_tiv_million) ELSE NULL END AS recorded_tiv_million,
       count(*) FILTER (WHERE y.analysis_coverage_status='no_identified_deliveries') AS no_identified_years,
       count(*) FILTER (WHERE y.source_coverage_status='rounded_zero') AS rounded_zero_source_years
FROM analysis_period p CROSS JOIN universe u
LEFT JOIN metric_supplier_year y ON y.recipient_id=u.recipient_id AND y.supplier_id=u.supplier_id
     AND y.delivery_year BETWEEN p.start_year AND p.end_year
GROUP BY p.period_id,p.start_year,p.end_year,p.period_kind,u.recipient_id,u.supplier_id;

CREATE OR REPLACE VIEW metric_period_shares AS
WITH totals AS (
    SELECT *, sum(recorded_tiv_million) OVER w AS partial_total,
           count(*) FILTER (WHERE recorded_tiv_million IS NULL) OVER w AS incomplete_suppliers
    FROM metric_supplier_period
    WINDOW w AS (PARTITION BY recipient_id,period_id)
), shares AS (
    SELECT *, CASE WHEN incomplete_suppliers=0 THEN partial_total ELSE NULL END AS total_tiv_million,
           CASE WHEN incomplete_suppliers=0 AND partial_total>0
                THEN recorded_tiv_million/partial_total ELSE NULL END AS share,
           CASE WHEN incomplete_suppliers>0 THEN 'incomplete_coverage'
                WHEN partial_total=0 THEN 'no_recorded_deliveries' ELSE 'ok' END AS metric_status
    FROM totals
)
SELECT *, share*100 AS share_percent,
       dense_rank() OVER (PARTITION BY recipient_id,period_id ORDER BY recorded_tiv_million DESC NULLS LAST) AS volume_rank,
       row_number() OVER (PARTITION BY recipient_id,period_id ORDER BY recorded_tiv_million DESC NULLS LAST,supplier_id) AS stable_position
FROM shares;

CREATE OR REPLACE VIEW metric_period_summary AS
SELECT s.recipient_id,s.period_id,s.start_year,s.end_year,s.period_kind,
       max(s.metric_status) AS metric_status, max(s.total_tiv_million) AS total_tiv_million,
       CASE WHEN max(s.metric_status)='ok' THEN
           string_agg(e.display_label,' / ' ORDER BY s.supplier_id)
             FILTER (WHERE s.volume_rank=1 AND s.recorded_tiv_million>0) ELSE NULL END AS top_suppliers,
       CASE WHEN max(s.metric_status)='ok' THEN
           count(*) FILTER (WHERE s.volume_rank=1 AND s.recorded_tiv_million>0) ELSE NULL END AS top_supplier_tie_count,
       max(s.share) AS top_supplier_share,
       sum(s.share ORDER BY s.supplier_id) FILTER (WHERE s.stable_position<=3) AS top_three_share,
       sum(s.share*s.share ORDER BY s.supplier_id) AS hhi,
       CASE WHEN max(s.metric_status)='incomplete_coverage' THEN NULL ELSE
           count(*) FILTER (WHERE s.recorded_tiv_million>0 AND e.entity_type<>'unknown') END AS named_supplier_count,
       CASE WHEN max(s.metric_status)='ok' THEN coalesce(sum(s.share ORDER BY s.supplier_id) FILTER (WHERE e.entity_type='unknown'),0)
            ELSE NULL END AS unknown_supplier_share
FROM metric_period_shares s JOIN entity e ON e.entity_id=s.supplier_id
GROUP BY s.recipient_id,s.period_id,s.start_year,s.end_year,s.period_kind;

CREATE OR REPLACE VIEW metric_supplier_changes AS
SELECT c.comparison_id,c.comparison_kind,a.recipient_id,a.supplier_id,
       a.period_id AS earlier_period_id,b.period_id AS later_period_id,
       a.recorded_tiv_million AS earlier_tiv_million,b.recorded_tiv_million AS later_tiv_million,
       a.share AS earlier_share,b.share AS later_share,
       (b.share-a.share)*100 AS share_change_pp
FROM analysis_comparison c
JOIN metric_period_shares a ON a.period_id=c.earlier_period_id
JOIN metric_period_shares b ON b.period_id=c.later_period_id
     AND b.recipient_id=a.recipient_id AND b.supplier_id=a.supplier_id;

CREATE OR REPLACE VIEW metric_period_changes AS
WITH distance AS (
    SELECT comparison_id,recipient_id,sum(abs(later_share-earlier_share) ORDER BY supplier_id)/2 AS supplier_mix_distance
    FROM metric_supplier_changes GROUP BY comparison_id,recipient_id
)
SELECT c.comparison_id,c.comparison_kind,a.recipient_id,
       a.period_id AS earlier_period_id,b.period_id AS later_period_id,
       CASE WHEN a.metric_status='incomplete_coverage' OR b.metric_status='incomplete_coverage' THEN 'incomplete_coverage'
            WHEN a.metric_status<>'ok' OR b.metric_status<>'ok' THEN 'undefined_no_recorded_deliveries'
            ELSE 'ok' END AS comparison_status,
       a.total_tiv_million AS earlier_total_tiv_million,b.total_tiv_million AS later_total_tiv_million,
       CASE WHEN a.total_tiv_million>0 THEN (b.total_tiv_million/a.total_tiv_million-1)*100 ELSE NULL END AS volume_change_percent,
       d.supplier_mix_distance,
       b.hhi-a.hhi AS hhi_change,
       (b.top_supplier_share-a.top_supplier_share)*100 AS top_supplier_share_change_pp
FROM analysis_comparison c
JOIN metric_period_summary a ON a.period_id=c.earlier_period_id
JOIN metric_period_summary b ON b.period_id=c.later_period_id AND b.recipient_id=a.recipient_id
JOIN distance d ON d.comparison_id=c.comparison_id AND d.recipient_id=a.recipient_id;
