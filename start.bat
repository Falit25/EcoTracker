@echo off
echo Starting EcoTrack server...
echo.
echo Server will be available at: http://localhost:3000
echo Admin panel: http://localhost:3000/admin.html
echo Admin password: admin123
echo.
node complete-server.js
if errorlevel 1 (
    echo.
    echo ERROR: Failed to start server!
    echo Make sure Node.js is installed and try again.
    echo.
)
pause