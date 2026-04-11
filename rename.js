const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = execSync('Get-ChildItem C:/Projects/riskpro/frontend/src -Recurse -Include "*.ts","*.tsx" | Select-Object -ExpandProperty FullName', {shell: 'powershell'}).toString().trim().split('\r\n');

let count = 0;
files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  const orig = c;
  c = c.replace(/RiskPro/g, 'RiskAnalytix');
  if (c !== orig) {
    fs.writeFileSync(f, c);
    count++;
    console.log('Updated:', path.basename(f));
  }
});
console.log('Total files updated:', count);
