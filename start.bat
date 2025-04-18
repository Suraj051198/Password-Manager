@echo off
echo Starting Password Manager Application...

echo.
echo Starting Backend Server...
start cmd /k "cd Backend && npm run prod"

echo.
echo Starting Frontend Server...
start cmd /k "npx serve dist -p 5174"

echo.
echo Application started!
echo Frontend: http://localhost:5174
echo Backend: http://localhost:5000
echo.
echo Press any key to close this window...
pause 