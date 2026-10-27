@echo off
cd /d "%~dp0"
set "PATH=%~dp0tools\node-v24.22.1-win-x64;%PATH%"
set "npm_config_cache=%~dp0.npm-cache"
call npm.cmd start
pause
