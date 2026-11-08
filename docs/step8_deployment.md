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

## Deployment verification — 8 November 2026

- Live URL: https://armsflow-di1q.onrender.com
- Render service: `srv-dboarm3l550s7396ncs0`; initial deployment: `dep-dboarmbl550s7396ndu0`.
- Deployed application commit: `eae7c98dfac3f32d8fc471e811a86c94cdbea912`.
- Build restored the verified runtime snapshot. Gunicorn 26.2.0 started successfully; Render health requests returned HTTP 200.
- Live browser checks: supplier map, France-to-India connection, AASM equipment detail history, Rafale 3D rendering, ML review summary and 80-profile similarity summary loaded. No browser console errors were captured.
- Compact runtime snapshot passed 243 local API responses; the four web tests also passed after deployment preparation.
- [Live site screenshot](live-site.png). Frontend/mobile checks from Step 7 remain applicable; physical-device testing is not claimed.
- Public-repository deployment uses manual updates. To publish later application changes: push to GitHub, then select Manual Deploy → Deploy latest commit on this service and verify health again.


## Two-minute portfolio walkthrough

1. Open the 3D explorer and explain that models are illustrative; delivery quantities come from historical source records.
2. Open Supplier network, select India and a period, then click a supplier to inspect the relationship and equipment photos. Zoom the map to show country/city labels.
3. Switch to Russia or the United States to demonstrate that the network is not fixed to India; explain that detailed equipment records remain India-only.
4. Compare India's supplier shares across equal-length periods.
5. Show ML insights as unusual historical changes, not forecasts or proof of political causes.
6. Open Similar countries to explain similarity of supplier mix, then finish on Sources and the limitations.
