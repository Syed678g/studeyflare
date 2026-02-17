Write-Host "Step 1: Install Next/React..."
npm install next react react-dom

Write-Host "Step 2: Update scripts..."
node -e "let fs=require('fs');let p=require('./package.json');p.scripts={dev:'next dev',build:'next build',start:'next start'};fs.writeFileSync('package.json',JSON.stringify(p,null,2));console.log('Scripts added');"

Write-Host "Step 3: Install all dependencies..."
npm install

Write-Host "Step 4: Build..."
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed"; exit 1 }

Write-Host "Step 5: Git operations..."
git add .
git commit -m 'Prepare Studyflare for Vercel deployment'

Write-Host "Step 6: Push..."
git push origin main
