@echo off
cd /d "%~dp0"
echo Open http://127.0.0.1:8000 in your browser. Press Ctrl+C to stop.
".venv\Scripts\python.exe" -m web
pause
