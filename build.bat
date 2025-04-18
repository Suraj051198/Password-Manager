@echo off
echo Building Password Manager Application...

echo.
echo Building Frontend...
call npm install
call npm run build

echo.
echo Building Backend...
cd Backend
call npm install
call npm run build

echo.
echo Build completed! The application is ready for production.
echo.
echo To start the application:
echo 1. Start the backend: cd Backend && npm run prod
echo 2. Serve the frontend dist folder using a static file server
echo.
pause 