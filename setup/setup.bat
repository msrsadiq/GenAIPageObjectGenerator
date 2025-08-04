@echo off
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo All dependencies installed.
echo ----------------------------
echo To start the app locally:
echo   1. In one terminal: cd backend && node index.js
echo   2. In another:     cd frontend && npm run dev
echo Then open http://localhost:3000
pause
