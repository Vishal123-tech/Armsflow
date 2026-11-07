-- Period values use delivery-register TIV. All suppliers, including unknown,
-- are included in totals. Units are millions of SIPRI TIV, not dollars.

SELECT period_id,total_tiv_million,top_suppliers,top_supplier_share,
       top_three_share,hhi,unknown_supplier_share,metric_status
FROM metric_period_summary
WHERE period_kind='five_year' ORDER BY start_year;

SELECT e.display_label AS supplier,recorded_tiv_million,share_percent
FROM metric_period_shares s JOIN entity e ON e.entity_id=s.supplier_id
WHERE period_id='2021-2025' ORDER BY stable_position;

SELECT e.display_label AS supplier,earlier_share,later_share,share_change_pp
FROM metric_supplier_changes s JOIN entity e ON e.entity_id=s.supplier_id
WHERE comparison_id='2011-2015_to_2021-2025' ORDER BY share_change_pp DESC;

SELECT comparison_id,supplier_mix_distance,volume_change_percent,hhi_change,comparison_status
FROM metric_period_changes WHERE comparison_kind<>'annual' ORDER BY comparison_id;
