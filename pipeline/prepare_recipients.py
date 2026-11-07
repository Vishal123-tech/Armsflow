"""Rebuild additional recipient JSON from locally collected official CSV exports."""
import argparse
import hashlib
import json
from datetime import date
from pathlib import Path
from .clean import read_export, number

ROOT = Path(__file__).resolve().parents[1]


def build(retrieved_date):
    date.fromisoformat(retrieved_date)
    result = {}
    for country in ('russia', 'united_states'):
        path = ROOT / f'data/raw/sipri_{country}_supplier_tiv_2010_2025.csv'
        export = read_export(path, 'Supplier')
        if export.header[1:17] != [str(y) for y in range(2010, 2026)]:
            raise ValueError('Expected annual 2010-2025 supplier columns.')
        items, seen = [], set()
        for line, cells in export.rows:
            name = cells[0].strip()
            if name.lower().startswith('total'):
                continue
            if not name or name in seen:
                raise ValueError(f'Blank or duplicate supplier at line {line}')
            seen.add(name)
            values = [None if not cell.strip() else float(number(cell, required=True)) for cell in cells[1:17]]
            items.append(dict(supplier=name, supplier_id=name.lower().replace(' ', '_'), values=values))
        result[country] = dict(items=items, source=dict(
            url='https://armstransfers.sipri.org/ArmsTransfer/ImportExport',
            retrieved_date=retrieved_date, sha256=hashlib.sha256(path.read_bytes()).hexdigest(),
            path=path.relative_to(ROOT).as_posix(), recipient=country, years=[2010, 2025],
            basis='Rounded annual supplier TIV; blank means no identified deliveries; zero means less than 0.5 million TIV.'))
    destination = ROOT / 'data/processed/additional_recipients.json'
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(result, indent=2), encoding='utf-8')
    print('Prepared additional recipient data from local exports.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--retrieved-date', required=True, help='Actual source retrieval date, YYYY-MM-DD')
    build(parser.parse_args().retrieved_date)
