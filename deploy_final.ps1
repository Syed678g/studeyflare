Write-Host "Installing dependencies..."
npm install next@latest react@latest react-dom@latest
npm install

Write-Host "Building project..."
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed"; exit 1 }

Write-Host "Performing Git operations..."
git add .
git commit -m "Prepare Studyflare for Vercel deployment"
if ($LASTEXITCODE -ne 0) { Write-Host "Nothing to commit or commit failed" }

Write-Host "Pushing to remote..."
git push origin main
