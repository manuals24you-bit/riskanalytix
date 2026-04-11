const fs = require('fs');
const c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

const plBlock = c.indexOf("plan1name: '");
console.log('PL block at:', plBlock);
for (let i = 1; i <= 7; i++) {
  const key = `plan3f${i}: '`;
  const idx = c.indexOf(key, plBlock);
  if (idx === -1) { console.log(`plan3f${i}: NOT FOUND`); continue; }
  const end = c.indexOf("'", idx + key.length);
  console.log(`plan3f${i}: ${c.slice(idx + key.length, end)}`);
}