@echo off
title College Event System - Spring Boot Backend
echo ===================================================
echo Starting Spring Boot Backend Server on Port 8080...
echo ===================================================
cd /d "%~dp0backend"
call mvnw.cmd spring-boot:run
pause