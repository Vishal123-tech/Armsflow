# Step 8 — Render Free deployment

## Runtime

The service uses Python 3.13, Flask and Gunicorn, with one worker and two threads. Static frontend assets are prebuilt and committed. ML results are precomputed: the server does not train models or install the ML toolchain.

Build: `pip install -r requirements-deploy.txt && python scripts/restore_runtime.py`

Start: `gunicorn 'web:create_app()' --bind 0.0.0.0:$PORT --workers 1 --threads 2 --timeout 120`

Health path: `/api/health`. Instance: Free. Public repository deployments are updated manually.

## Data and attribution

Information from the Stockholm International Peace Research Institute (SIPRI), https://www.sipri.org/databases/armstransfers . Source snapshots were collected 6–7 November 2026; the data is historical, not a live feed. This is a non-commercial educational research demonstration. Source data and third-party assets retain their original rights; no new data license is granted. See https://www.sipri.org/about/terms-and-conditions before reusing or commercializing the data.

`deployment/runtime.zip` contains only the website's read-only database tables and three derived JSON files. Original CSV/PDF/HTML exports, raw-row archive tables, build metadata and local source paths are excluded. The original full local database remains unchanged. The manifest records an archive checksum, checked before restoration at build time. Runtime database files are outside Flask's static directory.

To refresh the bundle after validating a new local snapshot, run `python scripts/package_runtime.py`, verify the application against it, then commit the bundle and manifest together. Do not run the restoration command over a full local research database unless you intend to replace it with the smaller serving copy.

## Hosting limitations

Render Free sleeps after inactivity and can take time to wake. Files written while serving requests are ephemeral. The app is read-only; each deployment restores the committed snapshot, so no persistent disk is required. There is no visitor login, upload or data editing feature.

Deployment verification is recorded below after the service goes live.
