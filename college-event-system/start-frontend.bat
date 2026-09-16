@echo off
title College Event System - React Frontend
echo ===================================================
echo Starting React Vite Frontend on Port 5173...
echo ===================================================
cd /d "%~dp0frontend"
call npm run dev
pause