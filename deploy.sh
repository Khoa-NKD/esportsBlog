#!/usr/bin/env bash
set -e

echo "=========================================="
echo "  ESPORTS PULSE - PRE-DEPLOY VERIFICATION "
echo "=========================================="

echo -e "\n[1/3] Compiling and bundling Frontend..."
cd frontend
npm run build
echo "✓ Frontend build completed successfully."

echo -e "\n[2/3] Compiling and packaging Backend..."
cd ../backend
./mvnw clean package -DskipTests -B
echo "✓ Backend build completed successfully."

cd ..
echo -e "\n[3/3] Checking Git Status..."
git status --short

echo "=========================================="
echo "  ALL SYSTEMS GREEN: READY FOR DEPLOYMENT! "
echo "=========================================="
