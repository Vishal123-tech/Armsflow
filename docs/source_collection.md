# Reproducing the Step 1 source collection

Collection date: 6 November 2026. Start at [SIPRI's official database](https://armstransfers.sipri.org/). The edition includes 1950–2025; this project's pilot selects India and 2010–2025. New exports can differ after SIPRI revises its database, so keep dated snapshots and never overwrite these originals.

## 1. Annual supplier table

Open **Data → Import/Export values**.

- Recipient: **IND : India**, selected from the dropdown. Typing the name alone is insufficient.
- Year range 1: **2010** to **2025**; ranges 2 and 3 empty.
- Report with: **Imported weapons**.
- Summarize data by: **Country**.
- Sort data by: **Ranking**.
- Region and Supplier: unrestricted.
- Choose **DOWNLOAD AS CSV**.

Original filename: `import-export-values_2010-2025_2010-2025.csv`.
Saved as `data/raw/sipri_india_supplier_tiv_2010_2025.csv` with identical bytes.

## 2. Equipment delivery records

Open **Data → Transfer register**.

- Recipient: **IND : India**.
- Year range: **2010** to **2025**.
- Supplier, category, designation, description and status: unrestricted.
- Order by: **Buyer**.
- Check **Register with deliveries broken down by year**.
- Check **Register with only deliveries in the Year Range**.
- Choose **DOWNLOAD AS CSV**.

Original filename: `trade-register.csv`.
Saved as `data/raw/sipri_india_transfer_register_2010_2025.csv` with identical bytes.

The selected options mean quantities refer to deliveries in the chosen period. Do not relabel them as total orders or current inventory. Deals ordered before 2010 can appear because they had deliveries within the requested years.

## 3. Published comparison periods

Repeat the Import/Export values settings, with year ranges **2011–2015**, **2016–2020** and **2021–2025**. Download the CSV.

Original filename: `import-export-values_2011-2015_2016-2020_2021-2025.csv`.
Saved as `data/raw/sipri_india_supplier_tiv_comparison_periods.csv`.

The three `Percentage` column names repeat in this export. Parse columns by position and their adjacent period label; an ordinary dictionary keyed by header would overwrite two of them.

## 4. Supporting sources

Direct publisher URLs for the six supporting documents are in `data/source_manifest.json`. PDF page 6 (India's main suppliers) and page 9 (Russia's historical shares) of the SIPRI fact sheet were extracted and visually inspected. The MoD source's Rafale paragraph was read, along with Dassault's dated contract announcement and clarification.

Preserve downloaded HTML/PDF bytes, record retrieval date and hashes, and keep analysis separately. The timestamp inside each SIPRI CSV is preserved verbatim; the source does not specify its timezone. No login, payment, commercial licence, account creation or publication was needed for these downloads.
