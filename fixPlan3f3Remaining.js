const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

const fixes = [
  { old: "plan3f3: 'S\u00d7P risk matrix'", new: "plan3f3: 'S\u00d7P + S\u00d7F\u00d7P\u00d7A risk matrix'" },
  { old: "plan3f3: 'S\u00d7W Risikomatrix'", new: "plan3f3: 'Risikomatrix S\u00d7P + S\u00d7F\u00d7P\u00d7A'" },
  { old: "plan3f3: 'Matrice rischi S\u00d7P'", new: "plan3f3: 'Matrice rischi S\u00d7P + S\u00d7F\u00d7P\u00d7A'" },
];

let count = 0;
for (const { old, new: n } of fixes) {
  if (c.includes(old)) { c = c.replace(old, n); count++; console.log('fixed:', old); }
  else console.log('NOT FOUND:', old);
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', c, 'utf8');
console.log('Fixed:', count);