"""Verify and restore the committed read-only runtime snapshot at build time."""
import hashlib
import json
import zipfile
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]

def main():
    archive = ROOT / "deployment/runtime.zip"
    manifest = json.loads((ROOT / "deployment/manifest.json").read_text(encoding="utf-8"))
    if hashlib.sha256(archive.read_bytes()).hexdigest() != manifest["sha256"]:
        raise RuntimeError("Runtime snapshot checksum mismatch")
    target = ROOT / "data/processed"
    target.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(archive) as source:
        if set(source.namelist()) != set(manifest["files"]):
            raise RuntimeError("Unexpected runtime archive contents")
        for name in manifest["files"]:
            if Path(name).name != name:
                raise RuntimeError("Unsafe runtime filename")
            (target / name).write_bytes(source.read(name))
    print("Verified runtime snapshot restored.")

if __name__ == "__main__":
    main()
