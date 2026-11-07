# Data quality review — Step 1

**Result: source collection and structural validation passed; some field interpretations remain open.** No raw values have been changed. The complete machine-readable result is in `source_validation.json`.

Step 2 follow-up: the database preserves these issues in `quality_issue`. The original zero-count diagnostic was corrected to recognize 11 source cells containing `0 ` with a trailing space. They are now distinguished from the 167 blank cells. See `step2_database.md`; no original file was edited.

## Observed coverage and estimates

- The equipment export contains 782 annual delivery rows, 233 deal IDs and 149 distinct designation labels across 9 categories. The 22 supplier labels include an unknown-supplier group; do not silently discard it.
- Quantity flags are `Yes` on 542 rows, `No` on 208 and blank on 32. A blank flag is not the same as an explicit `No`. The eventual interface should display estimates clearly.
- The supplier table has 167 blank annual cells. Preserve the original blanks, then document any treatment of them for charts or features in Step 2.
- No exact duplicate rows or duplicate deal/year keys were found in this snapshot. Future editions still require these checks.

## Rafale example

SIPRI deal ID **58668** has four delivery rows: 4 aircraft in 2019, 9 in 2020, 19 in 2021 and 4 in 2022. The first two quantities are flagged as estimates. They sum to 36; the [MoD review dated 17 December 2022](https://www.pib.gov.in/Pressreleasepage.Aspx?Lang=2&PRID=1884353&Reg=3) corroborates completion of 36 deliveries from France by December 2022.

This corroborates the programme total, not each annual split. These deliveries do not establish today's fleet size or operational availability.

| Field | Source evidence | Treatment before display |
|---|---|---|
| Order year | All four SIPRI rows contain `2017`; [Dassault's announcement](https://www.dassault-aviation.com/wp-content/blogs.dir/2/files/2016/09/PR_Dassault_Rafale-Signature_India.pdf) dates the contract to 23 September 2016. | Open conflict. Retain both claims and their sources. Do not silently replace the raw order year. A separately sourced contract date can be shown with attribution. |
| Local production | The SIPRI rows contain `Yes`. [Dassault's 2018 clarification](https://www.dassault-aviation.com/wp-content/blogs.dir/2/files/2018/09/PR_Dassault-Aviation_Rafale-India.pdf) describes offsets and manufacturing parts in India. | Meaning needs review. Parts/offset activity does not establish local assembly of these 36 complete aircraft. Do not derive an assembly-country badge from this flag. |
| SIPRI estimate | The export includes this numeric field alongside separate estimate flags and TIV fields. | Meaning not resolved. Keep the field raw and exclude it from calculations until documented. |

## What the checks establish

The CSVs are structurally usable and correctly scoped to the India pilot. Published period-share values match another SIPRI output, and annual register TIV sums match the supplier export within the checked rounding tolerance. These two checks use related SIPRI sources and are not independent validation of every transfer. The MoD report provides separate support for the Rafale programme total.

## Limits that carry into later steps

1. SIPRI covers major conventional arms, rather than a complete inventory of every small arm, ammunition item or domestically produced system. Use the saved methodology for category boundaries.
2. Observed historical imports do not measure current holdings, readiness, losses or retirements. Never label the delivered quantities as current stock.
3. This is one recipient over 16 years. A multi-country dataset with sufficient history is still required for useful clustering and time-based ML evaluation. Do not train the planned global models on this pilot alone.
4. Country boundaries, historical names and non-state recipients must be handled explicitly when expanding coverage. No entity remapping has been performed here.
5. The database is revised retrospectively. A model trained on today's historical snapshot cannot be described as a real-time historical backtest without vintage data.
6. Public 3D assets have not been collected. Each future asset needs an appropriate licence and model/variant identification; a visual model is not evidence for equipment quantities.
7. Publishers retain rights to their source material. The raw folder is excluded from Git. Before public deployment, choose permitted displays/exports under the source terms; no permission request or publication has been sent.

These issues do not prevent building a pilot database that preserves the original evidence. They must remain visible rather than being erased during cleaning.
