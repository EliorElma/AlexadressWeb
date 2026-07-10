@echo off
rem חיתוך שוליים שקופים מתמונות ה-band — דאבל-קליק וזהו
cd /d "%~dp0"
python tools\trim-bands.py
