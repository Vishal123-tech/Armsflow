"""Local, read-only ArmsFlow website backed by the verified DuckDB snapshot."""
from decimal import Decimal
from pathlib import Path

import duckdb
from flask import Flask, g, jsonify, render_template, request

ROOT = Path(__file__).resolve().parents[1]
MODELS = {
    "eq_8c235db6029020c94826": {"key":"rafale","label":"Delta-wing aircraft","credit":"Original illustrative exterior created for ArmsFlow"},
    "eq_06d7d9b18776a836ee01": {"key":"tank","label":"Main battle tank","credit":"Original illustrative exterior created for ArmsFlow"},
    "eq_2e9bf1c50515933d0006": {"key":"frigate","label":"Frigate","credit":"Original illustrative exterior created for ArmsFlow"},
    "eq_25a0a15bd7ba2032479c": {"key":"submarine","label":"Submarine","credit":"Original illustrative exterior created for ArmsFlow"},
}


def create_app(database=None):
    app=Flask(__name__)
    app.config.update(DATABASE=str(database or ROOT/"data/processed/armsflow.duckdb"),JSON_SORT_KEYS=False)
    app.json.sort_keys=False

    def connection():
        if "db" not in g:
            if not Path(app.config["DATABASE"]).is_file():
                raise RuntimeError("Build the verified database before starting the website.")
            g.db=duckdb.connect(app.config["DATABASE"],read_only=True)
        return g.db

    def rows(sql,params=None):
        cursor=connection().execute(sql,params or [])
        names=[c[0] for c in cursor.description]
        def encode(v):
            if isinstance(v,Decimal):
                return int(v) if v==v.to_integral_value() else float(v)
            if hasattr(v,"isoformat"):
                return v.isoformat()
            return v
        return [dict(zip(names,map(encode,row))) for row in cursor.fetchall()]

    def country():
        value=request.args.get("recipient","india")
        if value not in ("india","russia","united_states"):
            raise ValueError("Choose India, Russia or United States.")
        return value

    def period():
        value=request.args.get("period","2021-2025")
        if not rows("SELECT period_id FROM analysis_period WHERE period_id=?",[value]):
            raise ValueError("Choose a period available in this snapshot.")
        return value

    @app.teardown_appcontext
    def close_db(_error):
        db=g.pop("db",None)
        if db is not None:
            db.close()

    @app.after_request
    def headers(response):
        response.headers["X-Content-Type-Options"]="nosniff"
        response.headers["Referrer-Policy"]="strict-origin-when-cross-origin"
        response.headers["Content-Security-Policy"]="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
        if request.path.startswith("/api/"):
            response.headers["Cache-Control"]="no-store"
        return response

    @app.errorhandler(ValueError)
    def bad_request(error):
        return jsonify(error=str(error)),400

    @app.errorhandler(duckdb.Error)
    @app.errorhandler(RuntimeError)
    def unavailable(error):
        app.logger.error("Database unavailable: %s",error)
        return jsonify(error="Data is unavailable. Build the database and Step 3 metrics, then restart the app."),503

    @app.get("/")
    def home():
        return render_template("index.html")

    @app.get("/api/health")
    def health():
        count=rows("SELECT count(*) AS count FROM equipment")[0]["count"]
        rows("SELECT count(*) FROM metric_period_summary")
        return jsonify(status="ok",equipment_records=count,mode="read_only")

    @app.get("/api/meta")
    def meta():
        return jsonify(
            recipient={"id":"india","name":"India"}, coverage={"start":2010,"end":2025},
            categories=rows("SELECT category,count(*) AS count FROM equipment GROUP BY category ORDER BY category"),
            periods=rows("SELECT * FROM analysis_period ORDER BY start_year,end_year"),
            comparisons=rows("SELECT * FROM analysis_comparison ORDER BY comparison_id"),
            models=MODELS, default_equipment=next(iter(MODELS)),
            source=rows("SELECT publisher,url,retrieved_date FROM source_snapshot WHERE source_id='sipri_india_register'")[0],
            counts=rows("SELECT (SELECT count(*) FROM equipment) AS equipment,(SELECT count(*) FROM transfer_deal) AS deals,(SELECT count(*) FROM delivery) AS delivery_rows")[0])

    @app.get("/api/equipment")
    def equipment():
        recipient=country()
        query=request.args.get("q","").strip()
        category=request.args.get("category","")
        supplier=request.args.get("supplier","")
        if len(query)>80:
            raise ValueError("Keep the search under 80 characters.")
        conditions=["t.recipient_id=?"]
        params=[recipient]
        if category:
            if not rows("SELECT 1 FROM equipment WHERE category=? LIMIT 1",[category]):
                raise ValueError("Unknown equipment category.")
            conditions.append("e.category=?")
            params.append(category)
        if supplier:
            if not rows("SELECT 1 FROM entity WHERE entity_id=?",[supplier]):
                raise ValueError("Unknown supplier.")
            conditions.append("t.supplier_id=?")
            params.append(supplier)
        if query:
            conditions.append("(contains(lower(e.designation),lower(?)) OR contains(lower(e.description),lower(?)))")
            params.extend([query,query])
        result=rows("""SELECT e.equipment_id,e.designation,e.description,e.category,
            string_agg(DISTINCT supplier.display_label,', ' ORDER BY supplier.display_label) AS suppliers,
            CASE WHEN count(*) FILTER(WHERE d.quantity_delivered IS NULL)=0 THEN sum(d.quantity_delivered) ELSE NULL END AS delivered_quantity,
            min(d.delivery_year) AS first_delivery_year,max(d.delivery_year) AS last_delivery_year,
            count(*) FILTER(WHERE d.quantity_estimated IS TRUE) AS estimated_rows
            FROM equipment e JOIN transfer_deal t USING(equipment_id)
            JOIN entity supplier ON supplier.entity_id=t.supplier_id
            JOIN delivery d USING(source_id,sipri_deal_id)
            WHERE """+" AND ".join(conditions)+" GROUP BY e.equipment_id,e.designation,e.description,e.category ORDER BY e.designation",params)
        for item in result:
            item["model"]=MODELS.get(item["equipment_id"])
        if request.args.get("models_only")=="1":
            result=[item for item in result if item["model"]]
        return jsonify(items=result,count=len(result),quantity_basis="Historical deliveries in 2010–2025")

    @app.get("/api/equipment/<equipment_id>")
    def equipment_detail(equipment_id):
        country()
        found=rows("SELECT * FROM equipment WHERE equipment_id=?",[equipment_id])
        if not found:
            return jsonify(error="Equipment record not found."),404
        item=found[0]
        records=rows("""SELECT d.*,t.supplier_id,s.display_label AS supplier
          FROM delivery d JOIN transfer_deal t USING(source_id,sipri_deal_id)
          JOIN entity s ON s.entity_id=t.supplier_id WHERE t.equipment_id=?
          ORDER BY d.delivery_year,t.supplier_id,d.sipri_deal_id""",[equipment_id])
        item.update(model=MODELS.get(equipment_id),recipient="India",deliveries=records)
        item["delivered_quantity"]=sum(r["quantity_delivered"] for r in records) if all(r["quantity_delivered"] is not None for r in records) else None
        item["tiv_million"]=round(sum(r["tiv_delivered_million"] or 0 for r in records),6) if all(r["tiv_delivered_million"] is not None for r in records) else None
        item["suppliers"]=sorted({r["supplier"] for r in records})
        item["delivery_years"]=sorted({r["delivery_year"] for r in records})
        item["estimated_rows"]=sum(r["quantity_estimated"] is True for r in records)
        item["unspecified_estimate_rows"]=sum(r["quantity_estimated"] is None for r in records)
        item["source"]=rows("SELECT title,publisher,url,retrieved_date FROM source_snapshot WHERE source_id='sipri_india_register'")[0]
        item["claims"]=rows("""SELECT c.*,s.publisher,s.url FROM evidence_claim c JOIN source_snapshot s ON c.source_id=s.source_id
          WHERE c.sipri_deal_id IN (SELECT sipri_deal_id FROM transfer_deal WHERE equipment_id=?)""",[equipment_id])
        item["issues"]=rows("""SELECT issue_id,field_name,description FROM quality_issue
          WHERE status='open' AND sipri_deal_id IN (SELECT sipri_deal_id FROM transfer_deal WHERE equipment_id=?)""",[equipment_id])
        return jsonify(item)

    @app.get("/api/overview")
    def overview():
        recipient,p=country(),period()
        if recipient!="india":
            from .recipient_data import overview as extra_overview
            return jsonify(extra_overview(recipient,p))
        summary=rows("SELECT * FROM metric_period_summary WHERE recipient_id=? AND period_id=?",[recipient,p])[0]
        suppliers=rows("""SELECT s.supplier_id,e.display_label AS supplier,e.entity_type,s.recorded_tiv_million,s.share_percent,s.metric_status
            FROM metric_period_shares s JOIN entity e ON e.entity_id=s.supplier_id
            WHERE recipient_id=? AND period_id=? ORDER BY stable_position""",[recipient,p])
        timeline=rows("""SELECT s.start_year AS year,s.supplier_id,e.display_label AS supplier,s.share_percent
            FROM metric_period_shares s JOIN entity e ON e.entity_id=s.supplier_id
            WHERE recipient_id=? AND period_kind='annual' ORDER BY start_year,stable_position""",[recipient])
        return jsonify(summary=summary,suppliers=suppliers,timeline=timeline,units="millions of SIPRI TIV")

    @app.get("/api/similarity")
    def similarity():
        import json
        path = ROOT / "data/processed/supplier_similarity.json"
        if not path.is_file():
            return jsonify(error="Build similarity profiles with python -m pipeline.similarity."), 503
        data = json.loads(path.read_text(encoding="utf-8"))
        profiles = data.pop("profiles")
        recipient = request.args.get("recipient", "India")
        if recipient not in profiles:
            raise ValueError("Choose an eligible country from the similarity selector.")
        data["countries"] = sorted(profiles)
        data["selected"] = profiles[recipient]
        data["matches"] = [profiles[n["country"]] for n in profiles[recipient]["neighbors"]]
        return jsonify(data)

    @app.get("/api/insights")
    def insights():
        import json
        recipient = country()
        year = request.args.get("year", "all")
        if year not in ("all", "2021", "2022", "2023", "2024", "2025"):
            raise ValueError("Choose a review year between 2021 and 2025.")
        path = ROOT / "data/processed/ml_insights.json"
        if not path.is_file():
            return jsonify(error="ML results are not built. Run python -m pipeline.ml_insights."), 503
        data = json.loads(path.read_text(encoding="utf-8"))
        data["rows"] = [r for r in data["rows"] if r["recipient"] == recipient and (year == "all" or r["year"] == int(year))]
        return jsonify(data)

    @app.get("/api/compare")
    def compare():
        recipient=country()
        if recipient!="india":
            raise ValueError("Period comparison currently covers India only; use the supplier network period selector for other recipients.")
        before=request.args.get("before","2011-2015")
        after=request.args.get("after","2021-2025")
        found=rows("SELECT comparison_id FROM analysis_comparison WHERE earlier_period_id=? AND later_period_id=?",[before,after])
        if not found:
            raise ValueError("Choose an available equal-length comparison: earlier period first.")
        key=found[0]["comparison_id"]
        summary=rows("SELECT * FROM metric_period_changes WHERE comparison_id=? AND recipient_id=?",[key,recipient])[0]
        suppliers=rows("""SELECT c.*,e.display_label AS supplier FROM metric_supplier_changes c
          JOIN entity e ON e.entity_id=c.supplier_id WHERE comparison_id=? AND recipient_id=? ORDER BY share_change_pp DESC""",[key,recipient])
        return jsonify(summary=summary,suppliers=suppliers)

    @app.get("/api/sources")
    def sources():
        return jsonify(sources=rows("SELECT source_id,publisher,title,url,retrieved_date FROM source_snapshot ORDER BY source_id"),
                       issues=rows("SELECT issue_id,field_name,description,status FROM quality_issue ORDER BY issue_id"),
                       models=MODELS,rights="Information from the Stockholm International Peace Research Institute (SIPRI), https://www.sipri.org/databases/armstransfers. Non-commercial educational research demonstration; source material retains its publisher's rights.")

    return app
