-- One rebuildable India source snapshot. Units: millions of SIPRI TIV.
CREATE TABLE source_snapshot (
    source_id VARCHAR PRIMARY KEY, publisher VARCHAR NOT NULL, title VARCHAR NOT NULL,
    url VARCHAR NOT NULL, local_path VARCHAR NOT NULL, retrieved_date DATE NOT NULL,
    sha256 VARCHAR NOT NULL, manifest_json JSON NOT NULL, csv_header JSON
);
CREATE TABLE raw_row (
    source_id VARCHAR REFERENCES source_snapshot(source_id), source_line INTEGER,
    cells JSON NOT NULL, PRIMARY KEY (source_id, source_line)
);
CREATE TABLE entity (
    entity_id VARCHAR PRIMARY KEY, source_label VARCHAR UNIQUE NOT NULL,
    display_label VARCHAR NOT NULL,
    entity_type VARCHAR NOT NULL CHECK (entity_type IN ('country', 'historical', 'non_state', 'unknown'))
);
CREATE TABLE equipment (
    equipment_id VARCHAR PRIMARY KEY, designation VARCHAR NOT NULL,
    description VARCHAR NOT NULL, category VARCHAR NOT NULL,
    UNIQUE (designation, description, category)
);
CREATE TABLE transfer_deal (
    source_id VARCHAR REFERENCES source_snapshot(source_id), sipri_deal_id VARCHAR,
    supplier_id VARCHAR NOT NULL REFERENCES entity(entity_id),
    recipient_id VARCHAR NOT NULL REFERENCES entity(entity_id),
    equipment_id VARCHAR NOT NULL REFERENCES equipment(equipment_id),
    PRIMARY KEY (source_id, sipri_deal_id)
);
CREATE TABLE delivery (
    source_id VARCHAR, sipri_deal_id VARCHAR, delivery_year INTEGER CHECK (delivery_year BETWEEN 2010 AND 2025),
    source_line INTEGER NOT NULL, order_year INTEGER CHECK (order_year BETWEEN 1900 AND 2025),
    order_year_estimated BOOLEAN, quantity_delivered DECIMAL(18,6) CHECK (quantity_delivered >= 0),
    quantity_estimated BOOLEAN, delivery_year_estimated BOOLEAN,
    condition_reported VARCHAR NOT NULL, sipri_estimate_raw VARCHAR NOT NULL,
    tiv_unit_million DECIMAL(18,6) CHECK (tiv_unit_million >= 0),
    tiv_delivered_million DECIMAL(18,6) CHECK (tiv_delivered_million >= 0),
    local_production_reported BOOLEAN,
    PRIMARY KEY (source_id, sipri_deal_id, delivery_year),
    FOREIGN KEY (source_id, sipri_deal_id) REFERENCES transfer_deal(source_id, sipri_deal_id),
    FOREIGN KEY (source_id, source_line) REFERENCES raw_row(source_id, source_line)
);
CREATE TABLE bilateral_annual (
    source_id VARCHAR REFERENCES source_snapshot(source_id),
    recipient_id VARCHAR REFERENCES entity(entity_id), supplier_id VARCHAR REFERENCES entity(entity_id),
    delivery_year INTEGER CHECK (delivery_year BETWEEN 2010 AND 2025),
    tiv_million DECIMAL(18,6) CHECK (tiv_million >= 0),
    coverage_status VARCHAR NOT NULL CHECK (coverage_status IN ('reported_value', 'rounded_zero', 'no_identified_deliveries')),
    raw_value VARCHAR NOT NULL, source_line INTEGER NOT NULL,
    PRIMARY KEY (source_id, recipient_id, supplier_id, delivery_year),
    FOREIGN KEY (source_id, source_line) REFERENCES raw_row(source_id, source_line),
    CHECK ((coverage_status='no_identified_deliveries' AND tiv_million IS NULL)
        OR (coverage_status='rounded_zero' AND tiv_million IS NOT NULL AND tiv_million=0)
        OR (coverage_status='reported_value' AND tiv_million IS NOT NULL AND tiv_million>0))
);
CREATE TABLE recipient_annual (
    source_id VARCHAR REFERENCES source_snapshot(source_id), recipient_id VARCHAR REFERENCES entity(entity_id),
    delivery_year INTEGER CHECK (delivery_year BETWEEN 2010 AND 2025),
    reported_total_tiv_million DECIMAL(18,6) CHECK (reported_total_tiv_million >= 0),
    raw_value VARCHAR NOT NULL, source_line INTEGER NOT NULL,
    PRIMARY KEY (source_id, recipient_id, delivery_year),
    FOREIGN KEY (source_id, source_line) REFERENCES raw_row(source_id, source_line)
);
CREATE TABLE supplier_period (
    source_id VARCHAR REFERENCES source_snapshot(source_id), recipient_id VARCHAR REFERENCES entity(entity_id),
    supplier_id VARCHAR REFERENCES entity(entity_id), start_year INTEGER, end_year INTEGER,
    reported_tiv_million DECIMAL(18,6) CHECK (reported_tiv_million >= 0),
    reported_share_percent DECIMAL(6,3) CHECK (reported_share_percent BETWEEN 0 AND 100),
    raw_tiv VARCHAR NOT NULL, raw_share VARCHAR NOT NULL, source_line INTEGER NOT NULL,
    PRIMARY KEY (source_id, recipient_id, supplier_id, start_year, end_year),
    FOREIGN KEY (source_id, source_line) REFERENCES raw_row(source_id, source_line),
    CHECK (start_year >= 2010 AND end_year <= 2025 AND start_year <= end_year)
);
CREATE TABLE recipient_period (
    source_id VARCHAR REFERENCES source_snapshot(source_id), recipient_id VARCHAR REFERENCES entity(entity_id),
    start_year INTEGER, end_year INTEGER, reported_total_tiv_million DECIMAL(18,6), source_line INTEGER NOT NULL,
    PRIMARY KEY (source_id, recipient_id, start_year, end_year),
    FOREIGN KEY (source_id, source_line) REFERENCES raw_row(source_id, source_line)
);
CREATE TABLE evidence_claim (
    claim_id VARCHAR PRIMARY KEY, source_id VARCHAR REFERENCES source_snapshot(source_id),
    deal_source_id VARCHAR, sipri_deal_id VARCHAR, field_name VARCHAR NOT NULL,
    value_text VARCHAR NOT NULL, unit VARCHAR NOT NULL, locator VARCHAR NOT NULL, note VARCHAR NOT NULL,
    FOREIGN KEY (deal_source_id, sipri_deal_id) REFERENCES transfer_deal(source_id, sipri_deal_id)
);
CREATE TABLE quality_issue (
    issue_id VARCHAR PRIMARY KEY, source_id VARCHAR REFERENCES source_snapshot(source_id),
    sipri_deal_id VARCHAR, field_name VARCHAR NOT NULL, issue_type VARCHAR NOT NULL,
    related_claim_id VARCHAR REFERENCES evidence_claim(claim_id), description VARCHAR NOT NULL,
    status VARCHAR NOT NULL CHECK (status IN ('open','resolved'))
);
CREATE TABLE build_metadata (
    build_id VARCHAR PRIMARY KEY, pipeline_version VARCHAR NOT NULL, built_at_utc VARCHAR NOT NULL,
    input_sha256 VARCHAR NOT NULL, code_sha256 VARCHAR NOT NULL, logical_data_sha256 VARCHAR NOT NULL,
    duckdb_version VARCHAR NOT NULL
);

-- Browse individual deliveries without computing Step 3 metrics.
CREATE VIEW delivery_detail AS
SELECT d.*, s.display_label AS supplier, r.display_label AS recipient,
       e.designation, e.description, e.category,
       src.url AS source_url, src.retrieved_date, src.sha256 AS source_sha256,
       EXISTS (SELECT 1 FROM quality_issue q WHERE q.source_id=d.source_id
               AND (q.sipri_deal_id=d.sipri_deal_id OR q.sipri_deal_id IS NULL)
               AND q.status='open') AS has_open_quality_issue
FROM delivery d JOIN transfer_deal t USING (source_id, sipri_deal_id)
JOIN entity s ON s.entity_id=t.supplier_id JOIN entity r ON r.entity_id=t.recipient_id
JOIN equipment e USING (equipment_id) JOIN source_snapshot src ON src.source_id=d.source_id;

CREATE VIEW bilateral_annual_detail AS
SELECT b.*, s.display_label AS supplier, s.entity_type AS supplier_type,
       r.display_label AS recipient, src.url AS source_url, src.retrieved_date
FROM bilateral_annual b JOIN entity s ON s.entity_id=b.supplier_id
JOIN entity r ON r.entity_id=b.recipient_id JOIN source_snapshot src ON src.source_id=b.source_id;
