const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/translations.ts', 'utf8');

const fixes = [
  { find: 'action: "Schutzma\u00dfnahme", save: "Speichern"', add: ' scenario: "Gef\u00e4hrdungsszenario",' },
  { find: 'action: "Misura protettiva", save: "Salva"', add: ' scenario: "Scenario di pericolo",' },
  { find: 'action: "Ochrann\u00e9 opat\u0159en\u00ed", save: "Ulo\u017eit"', add: ' scenario: "Sc\u00e9n\u00e1\u0159 nebezpe\u010d\u00ed",' },
];

let count = 0;
for (const { find, add } of fixes) {
  const idx = c.indexOf(find);
  if (idx > -1) {
    c = c.slice(0, idx + find.length) + add + c.slice(idx + find.length);
    count++;
    console.log('Fixed:', find.slice(0, 30));
  } else {
    console.log('NOT found:', find.slice(0, 30));
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/translations.ts', c, 'utf8');
console.log('Done:', count, 'fixes');