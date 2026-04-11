const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', 'utf8');

const fixes = [
  { old: "plan3f3: 'Matryca ryzyka S\u00d7P'", new: "plan3f3: 'Matryca ryzyka S\u00d7P + S\u00d7F\u00d7P\u00d7A'" },
  { old: "plan3f3: 'Risk matrix S\u00d7P'", new: "plan3f3: 'Risk matrix S\u00d7P + S\u00d7F\u00d7P\u00d7A'" },
  { old: "plan3f3: 'Risikomatrix S\u00d7P'", new: "plan3f3: 'Risikomatrix S\u00d7P + S\u00d7F\u00d7P\u00d7A'" },
  { old: "plan3f3: 'Matrice de risques S\u00d7P'", new: "plan3f3: 'Matrice de risques S\u00d7P + S\u00d7F\u00d7P\u00d7A'" },
  { old: "plan3f3: 'Matrice di rischio S\u00d7P'", new: "plan3f3: 'Matrice di rischio S\u00d7P + S\u00d7F\u00d7P\u00d7A'" },
  { old: "plan3f3: 'Matriz de riesgos S\u00d7P'", new: "plan3f3: 'Matriz de riesgos S\u00d7P + S\u00d7F\u00d7P\u00d7A'" },
  { old: "plan3f3: 'Matice rizik S\u00d7P'", new: "plan3f3: 'Matice rizik S\u00d7P + S\u00d7F\u00d7P\u00d7A'" },
];

// Also check plan2f3 - BASIC should only have SxP
// And add to plan2 description that SxFxPxA is PRO only

let count = 0;
for (const { old, new: n } of fixes) {
  if (c.includes(old)) {
    c = c.replace(old, n);
    count++;
  } else {
    console.log('NOT FOUND:', old.slice(0, 50));
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/landingTranslations.ts', c, 'utf8');
console.log('Fixed:', count);