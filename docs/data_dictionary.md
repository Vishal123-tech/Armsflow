# Source data dictionary

These are notes on the downloaded source fields, not a cleaned database schema. Original spelling, blanks, precision, estimates and source IDs are retained.

## Annual supplier export

| Field | Meaning and handling |
|---|---|
| Supplier | SIPRI's supplier label; preserve `unknown supplier(s)` as a separate category. |
| 2010 … 2025 | Annual volume in **millions of SIPRI trend-indicator values**. Retain the CSV's numeric precision. |
| 2010-2025 | Source-provided aggregate across the selected period. |
| Percentage | Source-provided, rounded share of recipient import TIV for the selected period. |
| Sum total years / Percentage of total | Source-provided aggregate over the requested ranges. |
| Total exports to India | A total row, not another supplier. |
| Blank annual cell | The export says no deliveries were identified; preserve the blank before defining analytical treatment. It does not prove no transfer occurred. |
| Numeric zero | The source legend treats zero as a rounded volume below 0.5 million TIV; it is not automatically an exact zero. |

The comparison file has annual columns, a period total and a repeated `Percentage` column for each of its three periods. Do not collapse repeated headers. Rounded shares may not sum exactly to 100%; rounded annual cells may not sum exactly to the published aggregate.

## Annual equipment delivery register

| Source field | Interpretation |
|---|---|
| SIPRI AT Database ID | Deal identifier from the source, retained as text. One ID can occur in several years. |
| Supplier / Recipient | Source entity labels. Recipient is India throughout this pilot. |
| Designation | Source equipment designation, including punctuation/suffixes. Distinct labels are not automatically distinct models. |
| Description | SIPRI equipment description. |
| Armament category | Broad source category, such as Aircraft or Sensors. Components and complete platforms must remain distinguishable. |
| Order date | Exported order year; preserve as supplied and review conflicts separately. |
| Order date is estimate | Source estimate marker. Keep `Yes`, `No` and blank distinct. |
| Deliveries in the Year Range | Units delivered in this source record/year under the selected filters. Not units ordered or current holdings. |
| Deliveries in the Year Range is estimate | Quantity estimate marker; the pilot contains `Yes`, `No` and blank. |
| Delivery year | The delivery year for this row. |
| Delivery year is estimate | Source marker for estimated delivery timing. |
| Status | Source condition/status label, for example New or Second hand. |
| SIPRI estimate | An additional numeric export field. Its precise relationship to the other TIV fields needs clarification; preserve raw and exclude from calculations for now. It is not an estimate-confidence percentage. |
| TIV deal unit | Unit TIV field in the source; not a sale price. |
| TIV delivery values | Delivery TIV for the row, in millions of SIPRI TIV. Used only for source consistency checks in Step 1. |
| Local production | Source flag retained verbatim; does not by itself establish where a complete platform was assembled. Rafale interpretation is pending review. |

Quantity comparisons should refer to a particular equipment item and unit. Adding aircraft, missiles, engines and sensors into one total would not describe a country's number of complete weapon platforms.

## Provenance

Each manifest entry gives its source ID, publisher, URL, local path, retrieval date, capture method, filters, byte size and SHA-256 hash. The original generated timestamps remain inside the CSVs. A hash detects file changes; it does not prove the factual accuracy of each record.
