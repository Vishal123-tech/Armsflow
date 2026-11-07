# Additional recipients
Russia and United States supplier-network views use official SIPRI annual supplier exports for 2010–2025, downloaded 7 November 2026 through the Import/Export values UI. Recipient filter selected; Imported weapons, Country, Ranking. Source CSVs are preserved in data/raw. Source hashes, filters, annual values and retrieval details are stored in data/processed/additional_recipients.json.

The API sums rounded supplier/year cells, retaining raw blanks as null in the processed snapshot. For aggregation, blank cells contribute no identified volume; zero cells may hide positive values below 0.5 million TIV. Shares and concentration are approximate and can differ from SIPRI totals due to rounding. These quantities are TIV, not dollars or counts of weapons. India retains its original register-based precision.

Recipient selector changes the supplier network, ranking and timeline. Connections appear only after a supplier is selected. The equipment explorer and dedicated period-comparison page remain India-only. Additional equipment registers have not been collected. No ML work started.

Rebuild the processed JSON after collecting both CSVs: `python -m pipeline.prepare_recipients --retrieved-date YYYY-MM-DD`. Use the actual source download date.
