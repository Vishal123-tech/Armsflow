# Ten-country expansion — 9 November 2026

The supplier network and equipment library now cover India, United States, Russia, United Kingdom, France, China, Pakistan, Israel, North Korea and Ukraine for 2010–2025. Nine nuclear-armed states are highlighted according to [SIPRI Yearbook 2026](https://www.sipri.org/media/press-release/2026/increasing-focus-nuclear-weapons-amid-heightened-escalation-risks-new-sipri-yearbook-out-now). This contextual grouping does not imply nuclear-weapon transfers, treaty recognition or a ranking of military power. Ukraine is an additional country, not part of the nuclear-armed grouping.

## Sources and scope

- Official global [SIPRI transfer register](https://armstransfers.sipri.org/ArmsTransfer/TransferRegister), downloaded 8 November 2026. All recipient/supplier/category filters unrestricted, years 2010–2025, deliveries broken down by year and only deliveries within range checked. Original file: `data/raw/sipri_global_transfer_register_2010_2025.csv`.
- Official [SIPRI Military Expenditure workbook](https://www.sipri.org/databases/milex), 1949–2025 v1.2, downloaded 8 November 2026. Original file: `data/raw/sipri_milex_1949_2025.xlsx`.
- Hashes, retrieval dates and country counts are in `data/focus_source_manifest.json` and `data/spending_source_manifest.json`.

The register has 14,877 unique deal/year rows. The ten-country selection has 3,204 delivery rows and 833 recipient-specific equipment entries. A designation shared by two countries is counted once per recipient; these are not 833 unique weapon designs. All 782 India delivery rows reconcile exactly to the existing pilot by deal/year/TIV. The India database and its corroborating evidence remain intact.

Non-India network figures now use precise delivery-register TIV rather than rounded annual supplier-table cells. Small differences from the earlier Russia/US network are expected. The ML change-review model remains on its documented three-country snapshot; it has not been retrained. Comparison remains India-only, and the four illustrative 3D examples remain India examples. New records use existing attributed representative photos when available; missing photos are explicitly identified.

Spending includes current US dollars, constant 2024 US dollars and share of GDP for 2010–2025: 480 country-year measures. Blue/red workbook flags are preserved as estimates/high uncertainty. Missing values remain null. Workbook country footnotes remain authoritative. Spending is the total military budget measure, not weapons import spending, and cannot be equated with TIV.

North Korea has only one recorded import delivery in this register (2010) and no 2025 spending value. Zero recorded imports in a selected period does not mean no arsenal, no domestic production or complete disclosure.

## Reproduction

Install `requirements-data.txt`, then run:

```text
python -m pipeline.expand_countries
python -m pipeline.prepare_spending
npm run build
python scripts/package_runtime.py
```

The runtime archive includes focused-country records and spending JSON, not original global exports. Publisher rights and existing non-commercial demonstration scope remain unchanged.

## Validation

All 36 tests passed. Eight focused/web tests passed again after the map status fix. Tests compare country totals and equipment identities against the raw export, verify recipient isolation and missing/estimated values, and preserve the India pilot checks. Browser checks covered Pakistan → China → equipment details, Ukraine's 273-record library and recipient-specific detail, North Korea's empty period, and a 390px mobile viewport with no horizontal overflow.
