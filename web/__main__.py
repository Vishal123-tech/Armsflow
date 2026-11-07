import argparse
from . import create_app

parser=argparse.ArgumentParser(description="Run the local ArmsFlow website.")
parser.add_argument("--port",type=int,default=8000)
args=parser.parse_args()
create_app().run(host="127.0.0.1",port=args.port,debug=False,use_reloader=False)
