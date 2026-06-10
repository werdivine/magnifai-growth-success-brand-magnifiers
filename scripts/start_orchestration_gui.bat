@echo off
echo ========================================================
echo   Antigravity Orchestration UI Launcher
echo ========================================================
echo.
echo Starting OpenFang Daemon (Background OS)...
start "OpenFang Daemon" cmd /c "C:\Users\Administrator\.openfang\bin\openfang.exe start"

echo Starting Flowise Visual Builder...
start "Flowise UI" cmd /c "podman start flowise || podman run -d -p 3000:3000 --name flowise flowiseai/flowise"

echo.
echo Waiting for services to initialize (10 seconds)...
ping 127.0.0.1 -n 11 > nul

echo Opening Dashboards...
start http://127.0.0.1:4200
start http://localhost:3000

echo.
echo Orchestration interfaces are now live!
echo Close this window. The services are running in their own windows.
pause
