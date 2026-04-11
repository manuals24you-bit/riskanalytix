const fs = require('fs');
const files = [
  'C:/Projects/riskpro/frontend/src/pages/legal/PrivacyPage.tsx',
  'C:/Projects/riskpro/frontend/src/pages/legal/RodoPage.tsx',
  'C:/Projects/riskpro/frontend/src/pages/admin/AdminPage.tsx',
  'C:/Projects/riskpro/frontend/src/pages/AdminPage.tsx',
];
files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  const orig = c;
  c = c.replace(/riskpro\.pl/g, 'riskanalytix.pl');
  c = c.replace(/riskpro\.com/g, 'riskanalytix.com');
  if (c !== orig) {
    fs.writeFileSync(f, c);
    console.log('Updated:', f.split('/').pop());
  }
});
