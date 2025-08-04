#!/bin/bash

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "✅ All dependencies installed."
echo "-------------------------------------"
echo "To start the app locally:"
echo "  1. In one terminal: cd backend && node index.js"
echo "  2. In another:     cd frontend && npm run dev"
echo "Then open http://localhost:3000"
