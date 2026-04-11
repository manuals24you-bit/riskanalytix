const fs = require('fs');
const c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

// Find all plan3f3 occurrences
let idx = 0;
let count = 0;
while (true) {
  idx = c.indexOf('plan3f3:', idx + 1);
  if (idx === -1) break;
  const end = c.indexOf(',', idx);
  console.log(count++, JSON.stringify(c.slice(idx, end + 1)));
}