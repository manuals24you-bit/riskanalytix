const fs = require('fs');
const c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

// Find all plan3f values for PL (first occurrence)
let idx = 0;
for (let i = 1; i <= 7; i++) {
  const key = `plan3f${i}:`;
  idx = c.indexOf(key, idx);
  if (idx === -1) break;
  const end = c.indexOf(',', idx);
  console.log(`plan3f${i}:`, c.slice(idx + key.length, end).trim());
  idx++;
}
