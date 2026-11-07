"""Create the Step 3 figures, results, report and executed notebook."""
import argparse
from decimal import Decimal
import json
import os
from pathlib import Path
import sys

import duckdb
from .build_database import ROOT
from .build_metrics import build_metrics

PERIODS=["2011-2015","2016-2020","2021-2025"]
NAMES={"russia":"Russia","france":"France","israel":"Israel","united_states":"United States","other":"Other suppliers"}
COLORS={"russia":"#596E40","france":"#387BA2","israel":"#199887","united_states":"#D99B33","other":"#B6BEC5"}


def query(con,sql,params=None):
    cursor=con.execute(sql,params or [])
    names=[column[0] for column in cursor.description]
    return [dict(zip(names,row)) for row in cursor.fetchall()]


def serial(value):
    if isinstance(value,Decimal):
        return float(value)
    if hasattr(value,"isoformat"):
        return value.isoformat()
    raise TypeError(type(value).__name__)


def collect_results():
    with duckdb.connect(str(ROOT/"data/processed/armsflow.duckdb"),read_only=True) as con:
        return {
            "scope":"India, imported major conventional arms; SIPRI snapshot retrieved 6 November 2026",
            "units":"Transfer volume: millions of SIPRI TIV. Shares: fractions unless a field says percent or pp.",
            "method":"Aggregate delivered TIV first, then divide by the period total; unknown suppliers included.",
            "metadata":query(con,"SELECT * FROM analysis_metadata"),
            "sources":query(con,"SELECT source_id,url,retrieved_date,sha256 FROM source_snapshot"),
            "period_summaries":query(con,"SELECT * FROM metric_period_summary ORDER BY start_year,end_year"),
            "supplier_shares":query(con,"SELECT s.*,e.display_label AS supplier FROM metric_period_shares s JOIN entity e ON e.entity_id=s.supplier_id ORDER BY start_year,end_year,stable_position"),
            "period_changes":query(con,"SELECT * FROM metric_period_changes ORDER BY comparison_id"),
            "supplier_changes":query(con,"SELECT s.*,e.display_label AS supplier FROM metric_supplier_changes s JOIN entity e ON e.entity_id=s.supplier_id ORDER BY comparison_id,share_change_pp DESC")
        }


def figures(data):
    cache=ROOT/"work/matplotlib"
    cache.mkdir(parents=True,exist_ok=True)
    os.environ.setdefault("MPLCONFIGDIR",str(cache))
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    import numpy as np

    plt.rcParams.update({"font.family":"DejaVu Sans","font.size":10,"axes.titlesize":12,
                         "axes.titleweight":"bold","axes.labelcolor":"#47515C","text.color":"#172737",
                         "xtick.color":"#47515C","ytick.color":"#47515C","axes.spines.top":False,
                         "axes.spines.right":False,"axes.edgecolor":"#CAD1D5","svg.fonttype":"none"})
    out=ROOT/"reports"
    out.mkdir(exist_ok=True)
    shares={(r["period_id"],r["supplier_id"]):r["share_percent"] for r in data["supplier_shares"]}
    summaries={r["period_id"]:r for r in data["period_summaries"]}
    keys=list(NAMES)
    grouped={}
    for p in PERIODS:
        grouped[p]={k:shares[(p,k)] for k in keys[:-1]}
        grouped[p]["other"]=100-sum(grouped[p].values())
    fig,axes=plt.subplots(2,2,figsize=(14,9.6),gridspec_kw={"height_ratios":[1,1]})
    fig.patch.set_facecolor("#FAFBF9")
    fig.subplots_adjust(left=.09,right=.96,bottom=.12,top=.81,hspace=.60,wspace=.35)
    fig.text(.09,.95,"ARMSFLOW  /  STEP 3",fontsize=10,weight="bold",color="#596E40")
    fig.text(.09,.905,"India’s supplier mix changed substantially",fontsize=23,weight="bold")
    fig.text(.09,.868,"Historical imports of major conventional arms  •  delivery-based TIV  •  2010–2025",fontsize=11,color="#56626D")

    ax=axes[0,0]
    left=np.zeros(3)
    for key in keys:
        values=np.array([grouped[p][key] for p in PERIODS])
        ax.barh(range(3),values,left=left,height=.55,color=COLORS[key],label=NAMES[key])
        for y,(value,offset) in enumerate(zip(values,left)):
            if value>=7:
                ax.text(offset+value/2,y,f"{value:.1f}%",ha="center",va="center",fontsize=9,
                        color="white" if key in keys[:3] else "#172737",weight="bold")
        left+=values
    ax.set(yticks=range(3),yticklabels=[p.replace("-","–") for p in PERIODS],xlim=(0,100),xlabel="Share of recorded import TIV (%)")
    ax.invert_yaxis()
    ax.set_title("Supplier shares in five-year periods",loc="left",pad=14)
    ax.legend(loc="upper left",bbox_to_anchor=(0,-.22),ncol=3,frameon=False,fontsize=8.5,columnspacing=1)
    ax.spines["left"].set_visible(False)

    ax=axes[0,1]
    change={k:grouped[PERIODS[-1]][k]-grouped[PERIODS[0]][k] for k in keys}
    ordered=sorted(keys,key=lambda k:change[k])
    ax.barh([NAMES[k] for k in ordered],[change[k] for k in ordered],color=[COLORS[k] for k in ordered],height=.55)
    for i,k in enumerate(ordered):
        value=change[k]
        ax.text(value+(.8 if value>=0 else -.8),i,f"{value:+.1f}",va="center",ha="left" if value>=0 else "right",fontsize=10,weight="bold")
    ax.axvline(0,color="#596675",lw=.8)
    ax.set_xlim(-40,38)
    ax.set_xlabel("Percentage-point change, 2011–15 to 2021–25")
    ax.set_title("Which suppliers gained share?",loc="left",pad=14)
    ax.spines["left"].set_visible(False)

    ax=axes[1,0]
    years=list(range(2010,2026))
    values=[float(summaries[f"{y}-{y}"]["total_tiv_million"]) for y in years]
    ax.bar(years,values,color="#627E91",width=.68)
    ax.set(xticks=[2010,2013,2016,2019,2022,2025],ylabel="Millions of SIPRI TIV",ylim=(0,max(values)*1.2))
    ax.set_title("Annual import volumes fluctuate",loc="left",pad=14)
    ax.grid(axis="y",color="#E3E7E5",lw=.7)
    ax.set_axisbelow(True)

    ax=axes[1,1]
    hhi=[summaries[p]["hhi"] for p in PERIODS]
    ax.plot(range(3),hhi,color="#596E40",marker="o",markersize=9,lw=2.5)
    for x,value in enumerate(hhi):
        ax.annotate(f"{value:.3f}",(x,value),xytext=(0,12),textcoords="offset points",ha="center",weight="bold")
    ax.set(xticks=range(3),xticklabels=[p.replace("-","–") for p in PERIODS],ylim=(0,1),ylabel="Concentration (HHI, 0–1)",xlim=(-.3,2.3))
    ax.set_title("Import suppliers became less concentrated",loc="left",pad=14)
    ax.grid(axis="y",color="#E3E7E5",lw=.7)
    fig.text(.09,.057,"Source: SIPRI Arms Transfers Database, 1950–2025 edition; downloaded 6 Nov 2026. Calculations: ArmsFlow.",fontsize=9,color="#56626D")
    fig.text(.09,.033,"TIV is transfer volume, not money or weapon counts. ‘Other’ includes unknown suppliers. HHI does not measure military dependence.",fontsize=8.5,color="#56626D")
    for ext in ("png","svg"):
        fig.savefig(out/f"india_supplier_analysis.{ext}",dpi=150,facecolor=fig.get_facecolor())
    plt.close(fig)

    fig,ax=plt.subplots(figsize=(12,5.7))
    fig.patch.set_facecolor("#FAFBF9")
    fig.subplots_adjust(left=.09,right=.97,top=.80,bottom=.22)
    for key in keys[:-1]:
        ax.plot(years,[shares[(f"{y}-{y}",key)] for y in years],marker="o",markersize=3.5,lw=2,label=NAMES[key],color=COLORS[key])
    ax.set(ylim=(0,100),xlim=(2010,2025),xticks=range(2010,2026,3),ylabel="Share of recorded import TIV (%)")
    ax.grid(axis="y",color="#E3E7E5")
    ax.legend(loc="upper left",bbox_to_anchor=(0,-.17),ncol=4,frameon=False)
    fig.text(.09,.93,"India’s annual supplier shares",fontsize=21,weight="bold")
    fig.text(.09,.855,"Four selected suppliers; all suppliers, including unknown, remain in each year’s denominator.",fontsize=10,color="#56626D")
    fig.text(.09,.035,"Source: SIPRI delivery register, 2010–2025; snapshot 6 Nov 2026. Annual shares can be volatile around large deliveries.",fontsize=9,color="#56626D")
    fig.savefig(out/"india_annual_supplier_shares.png",dpi=150,facecolor=fig.get_facecolor())
    plt.close(fig)


def write_report(data):
    summaries={r["period_id"]:r for r in data["period_summaries"]}
    shares={(r["period_id"],r["supplier_id"]):r for r in data["supplier_shares"]}
    long=next(r for r in data["period_changes"] if r["comparison_kind"]=="long_term")
    recent=next(r for r in data["period_changes"] if r["comparison_id"]=="2016-2020_to_2021-2025")
    lines=["# Step 3 — India's suppliers and historical changes", "",
           "**Calculated from the validated India database, 2010–2025. Step 4 has not started.**", "",
           "![India supplier analysis](../reports/india_supplier_analysis.png)", "",
           "## Results", "",
           "Shares below use delivered TIV, aggregated across each five-year period. They are calculated values rounded for display; they are not copied from the published percentages. Changes are calculated before rounding, so displayed differences may not subtract exactly.", "",
           "| Supplier | 2011–2015 | 2016–2020 | 2021–2025 | Change, first to last |",
           "|---|---:|---:|---:|---:|"]
    for key in list(NAMES)[:-1]:
        values=[shares[(p,key)]["share_percent"] for p in PERIODS]
        lines.append(f"| {NAMES[key]} | {values[0]:.1f}% | {values[1]:.1f}% | {values[2]:.1f}% | {values[2]-values[0]:+.1f} pp |")
    lines.extend(["", "The rounded published Russia shares of 70%, 51% and 40% are reproduced at SIPRI's display precision. See the [SIPRI fact sheet](https://www.sipri.org/sites/default/files/2026-03/fs_2603_at_2025.pdf), pages 6 and 9.", "",
                  "| Metric | 2011–2015 | 2016–2020 | 2021–2025 |", "|---|---:|---:|---:|"])
    for title,field,format_spec,multiplier in [("Total import volume (million TIV)","total_tiv_million",",.2f",1),
                                              ("Top-three share (%)","top_three_share",".1f",100),
                                              ("Concentration (HHI)","hhi",".3f",1),
                                              ("Unknown-supplier share (%)","unknown_supplier_share",".3f",100)]:
        values=[format(summaries[p][field]*multiplier,format_spec) for p in PERIODS]
        lines.append(f"| {title} | {' | '.join(values)} |")
    lines.extend(["",f"The supplier-mix distance between 2011–2015 and 2021–2025 is **{long['supplier_mix_distance']:.3f}** on a 0–1 scale. Between 2016–2020 and 2021–2025 it is **{recent['supplier_mix_distance']:.3f}**. Recorded import volume changed by **{recent['volume_change_percent']:+.2f}%** between those two most recent periods.","",
                  "These describe historical changes in recorded import volume and supplier composition. They do not establish political causes, current weapon stocks or total military dependence.","",
                  "## Method", "",
                  "Let V(s,P) be supplier s's delivered TIV in period P, and T(P) the sum over all suppliers.", "",
                  "| Measure | Definition |", "|---|---|",
                  "| Supplier share | V(s,P) / T(P), defined only for positive complete totals |",
                  "| Top-three share | Sum of the three largest shares; stable supplier-ID order resolves boundary ties |",
                  "| Concentration | HHI = sum of squared fractional shares; range 0–1 |",
                  "| Share change | 100 × (later share − earlier share), in percentage points |",
                  "| Supplier-mix distance | Half the sum of absolute supplier-share differences, with aligned supplier identities |",
                  "| Volume change | 100 × (later total / earlier total − 1), defined only with positive earlier total |", "",
                  "Period shares are computed after summing TIV, never by averaging annual percentages. All tied top suppliers are reported. Comparison periods must have equal length, be non-overlapping and run chronologically.", "",
                  "## Coverage and uncertainty", "",
                  "- The delivery register supplies more precise TIV than the rounded annual table. Its totals reconcile with the source tables within 0.5 million TIV.",
                  "- The 167 explicitly blank supplier-year cells contribute zero **identified** volume in the derived calculation only when there are no corresponding register deliveries. Original SQL NULLs and source statuses remain unchanged.",
                  "- Eleven rounded-zero source cells have positive underlying register TIV; these small flows remain in the calculations.",
                  "- Missing coverage rows, missing register TIV or unreconciled positive cells yield incomplete periods. Shares, HHI and supplier-mix distance become unavailable rather than using a partial denominator.",
                  "- A complete zero-total period is labelled no recorded deliveries; shares and concentration are undefined. Unknown-supplier volume remains included and separately reported.",
                  "- Three source-field review issues remain open. No new certainty is assigned to estimated deliveries, and no order-year or local-production conflict is silently overwritten.",
                  "- This pilot covers India only. No global comparison, ML prediction or causal geopolitical conclusion has been produced.","",
                  "## Outputs and reproduction", "",
                  "- [Executed notebook](../notebooks/02_supplier_patterns.ipynb)",
                  "- [Annual supplier-share chart](../reports/india_annual_supplier_shares.png)",
                  "- [Vector overview chart](../reports/india_supplier_analysis.svg)",
                  "- [Machine-readable results](../reports/analysis_results.json)",
                  "- [SQL metric definitions](../sql/metrics.sql) and [example queries](../sql/analysis_queries.sql)",
                  "- [Validation report](step3_validation.json)", "",
                  "From the project folder, install `requirements-analysis.txt` into `.venv` if necessary, then run:", "",
                  "```powershell", ".\\.venv\\Scripts\\python.exe -m pipeline.analyze --notebook",
                  ".\\.venv\\Scripts\\python.exe -m unittest discover -s tests -v", "```", "",
                  "The analysis command verifies the original snapshot and base SQL tables, installs/rebuilds metric views atomically, and writes the report, charts and JSON. `--notebook` also executes all notebook cells. If rebuilding the Step 2 database, run the analysis command again afterwards to restore its derived views.", "",
                  "The analysis produces 29 periods (16 annual, 12 five-year windows and the full span), 638 supplier-period records, and 18 comparisons. Twelve metric checks reconcile sources and validate bounds. Ten hand-case/integration tests cover weighted periods, ties, new suppliers, unknown suppliers, zero totals, missing coverage and repeatability; the eight ingestion tests remain part of the full suite.","",
                  "## Next approval", "", "Step 4 will build the website and 3D equipment viewer after your approval. These are analysis artifacts, not the website interface.", ""])
    (ROOT/"docs/step3_analysis.md").write_text("\n".join(lines),encoding="utf-8")


def notebook(execute=False):
    import nbformat as nbf
    path=ROOT/"notebooks/02_supplier_patterns.ipynb"
    path.parent.mkdir(exist_ok=True)
    nb=nbf.v4.new_notebook()
    nb.metadata["kernelspec"]={"display_name":"Python 3 (ArmsFlow)","language":"python","name":"python3"}
    nb.cells=[
        nbf.v4.new_markdown_cell("# ArmsFlow: India's supplier patterns\n\nHistorical imports of major conventional arms, 2010–2025. Source: [SIPRI](https://armstransfers.sipri.org/), downloaded 6 November 2026. TIV is transfer volume, not money or weapon counts. Run the project analysis command before this notebook."),
        nbf.v4.new_code_cell("from pathlib import Path\nimport sys\nimport duckdb\nfrom IPython.display import Image, display\nROOT = Path.cwd()\nif not (ROOT / 'data/processed/armsflow.duckdb').exists():\n    ROOT = ROOT.parent\nif str(ROOT) not in sys.path:\n    sys.path.insert(0, str(ROOT))\nDB = ROOT / 'data/processed/armsflow.duckdb'\nassert DB.is_file()\nprint('Loaded the validated India database.')"),
        nbf.v4.new_markdown_cell("## Five-year supplier shares\nAggregate delivered TIV first; divide each supplier's period total by the recipient's total. Unknown suppliers remain in the denominator."),
        nbf.v4.new_code_cell("with duckdb.connect(str(DB), read_only=True) as con:\n    rows = con.execute(\"\"\"SELECT period_id, e.display_label, round(share_percent, 2) AS share_percent\n        FROM metric_period_shares s JOIN entity e ON e.entity_id=s.supplier_id\n        WHERE period_kind='five_year' AND supplier_id IN ('russia','france','israel','united_states')\n        ORDER BY start_year, share_percent DESC\"\"\").fetchall()\nfor period, supplier, share in rows:\n    print(f'{period}  {supplier:15}  {share:6.2f}%')"),
        nbf.v4.new_code_cell("with duckdb.connect(str(DB), read_only=True) as con:\n    rows = con.execute(\"SELECT period_id, total_tiv_million, top_three_share, hhi FROM metric_period_summary WHERE period_kind='five_year' ORDER BY start_year\").fetchall()\nfor period, total, top3, hhi in rows:\n    print(f'{period}: {total:,.2f} million TIV | top 3 {100*top3:.1f}% | HHI {hhi:.3f}')"),
        nbf.v4.new_markdown_cell("## Changes and validation\nPercentage-point changes compare shares; volume changes compare TIV totals. Supplier-mix distance is half the sum of absolute share differences."),
        nbf.v4.new_code_cell("from pipeline.build_metrics import verify\nwith duckdb.connect(str(DB), read_only=True) as con:\n    checks = verify(con)\n    changes = con.execute(\"SELECT comparison_id, supplier_mix_distance, volume_change_percent FROM metric_period_changes WHERE comparison_kind <> 'annual' ORDER BY comparison_id\").fetchall()\nprint(f'{len(checks)} metric checks passed.')\nfor comparison, distance, volume in changes:\n    print(f'{comparison}: mix distance {distance:.3f}; volume change {volume:+.2f}%')"),
        nbf.v4.new_code_cell("display(Image(filename=str(ROOT / 'reports/india_supplier_analysis.png')))\ndisplay(Image(filename=str(ROOT / 'reports/india_annual_supplier_shares.png')))"),
        nbf.v4.new_markdown_cell("## Interpretation limits\n\nThis is a retrospective India pilot using one revised SIPRI snapshot. Source estimates and unresolved field conflicts remain. It is not a current inventory, a causal explanation of geopolitical events or an ML forecast. Incomplete coverage invalidates share metrics; a complete zero-total period has undefined shares. Rebuild with `python -m pipeline.analyze --notebook`.")
    ]
    nbf.write(nb,path)
    if execute:
        from nbclient import NotebookClient
        from jupyter_client import KernelManager
        for name,folder in [("JUPYTER_RUNTIME_DIR","jupyter"),("IPYTHONDIR","ipython")]:
            target=ROOT/"work"/folder
            target.mkdir(parents=True,exist_ok=True)
            os.environ.setdefault(name,str(target))
        manager=KernelManager(kernel_name="python3")
        manager.kernel_spec.argv[0]=sys.executable
        try:
            NotebookClient(nb,km=manager,timeout=90,startup_timeout=30,kernel_name="python3",
                           resources={"metadata":{"path":str(ROOT)}}).execute()
        finally:
            if manager.has_kernel:
                manager.shutdown_kernel(now=True)
        nbf.write(nb,path)
    return path


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--notebook",action="store_true",help="Execute and save the notebook as well")
    args=parser.parse_args()
    validation=build_metrics()
    (ROOT/"docs/step3_validation.json").write_text(json.dumps(validation,indent=2)+"\n",encoding="utf-8")
    data=collect_results()
    figures(data)
    (ROOT/"reports/analysis_results.json").write_text(json.dumps(data,indent=2,ensure_ascii=False,default=serial)+"\n",encoding="utf-8")
    write_report(data)
    path=notebook(args.notebook)
    print("Report: "+str(ROOT/"docs/step3_analysis.md"))
    print("Notebook: "+str(path)+( " (executed)" if args.notebook else " (ready to run)"))
    for row in data["period_summaries"]:
        if row["period_kind"]=="five_year":
            print(f"{row['period_id']}: {row['total_tiv_million']:,.2f} million TIV; HHI {row['hhi']:.3f}; top-three share {100*row['top_three_share']:.1f}%")


if __name__=="__main__":
    main()
