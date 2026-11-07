# Step 4 — Local website

Run `start_armsflow.cmd`, then open http://127.0.0.1:8000. Keep its terminal open; Ctrl+C stops the server.

The local India pilot includes 149 searchable equipment records, four original illustrative 3D exteriors, delivery history with estimate flags, a supplier map, historical shares, period comparisons and source links. Models support rotation, zoom, wireframe and preset views. The models are visual illustrations, not precise replicas. Quantities describe historical deliveries, not current inventories.

Flask reads DuckDB without changing source data. Three.js and the map geometry are bundled locally. Install Python dependencies with `pip install -r requirements-web.txt`; frontend rebuilds use `npm ci` then `npm run build`. Existing database and compiled assets are included locally. Third-party notices are in web/static/THIRD_PARTY_NOTICES.txt.

Validation: frontend build passed; four web integration tests passed (routes, source quantities, filters and metrics). Desktop browser inspection verified the aircraft viewer, supplier map and comparison screen. Mobile layout rules are implemented but device testing is still pending. Preview: website-preview.png.

Step 5 awaits approval. Its first prerequisite is broader validated country coverage before training anomaly detection.
