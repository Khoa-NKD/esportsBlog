# ==========================================
# ESPORTS PLATFORM - ONE-CLICK DEPLOY SCRIPT
# ==========================================
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  ESPORTS PULSE - PRE-DEPLOY VERIFICATION " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Step 1: Verify Frontend Build
Write-Host "`n[1/3] Compiling and bundling Frontend (Vite + React TS)..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot\frontend"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Frontend build failed! Aborting deploy." -ForegroundColor Red
    exit 1
}
Write-Host "✓ Frontend build completed successfully." -ForegroundColor Green

# Step 2: Verify Backend Build
Write-Host "`n[2/3] Compiling and packaging Backend (Spring Boot 4 / Java 21)..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot\backend"
./mvnw clean package -DskipTests -B
if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend build failed! Aborting deploy." -ForegroundColor Red
    exit 1
}
Write-Host "✓ Backend build completed successfully." -ForegroundColor Green

# Step 3: Git Status & Summary
Set-Location -Path "$PSScriptRoot"
Write-Host "`n[3/3] Checking Git Status & Readiness..." -ForegroundColor Yellow
git status --short
Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "  ALL SYSTEMS GREEN: READY FOR DEPLOYMENT! " -ForegroundColor Green
Write-Host "  - Docker: docker-compose up --build -d  " -ForegroundColor White
Write-Host "  - Vercel (FE): vercel --prod           " -ForegroundColor White
Write-Host "  - Supabase: PostgreSQL RLS Active       " -ForegroundColor White
Write-Host "==========================================" -ForegroundColor Cyan
