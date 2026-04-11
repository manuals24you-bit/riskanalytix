const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/translations.ts', 'utf8');

const langs = [
  { find: 'riskScore: "R = S\u00d7P", action: "Dzia\u0142anie ochronne",', add: ' scenario: "Scenariusz zagro\u017cenia",' },
  { find: 'riskScore: "R = S\u00d7P", action: "Protective measure",', add: ' scenario: "Hazard scenario",' },
  { find: 'riskScore: "R = S\u00d7P", action: "Schutzma\u00dfnahme",', add: ' scenario: "Gef\u00e4hrdungsszenario",' },
  { find: 'riskScore: "R = S\u00d7P", action: "Mesure de protection",', add: ' scenario: "Sc\u00e9nario de danger",' },
  { find: 'riskScore: "R = S\u00d7P", action: "Misura di protezione",', add: ' scenario: "Scenario di pericolo",' },
  { find: 'riskScore: "R = S\u00d7P", action: "Medida de protecci\u00f3n",', add: ' scenario: "Escenario de peligro",' },
  { find: 'riskScore: "R = S\u00d7P", action: "Ochrann\u00e9 opat\u0159en\u00ed",', add: ' scenario: "Sc\u00e9n\u00e1\u0159 nebezpe\u010d\u00ed",' },
];

let count = 0;
for (const { find, add } of langs) {
  const idx = c.indexOf(find);
  if (idx > -1) {
    c = c.slice(0, idx + find.length) + add + c.slice(idx + find.length);
    count++;
  } else {
    console.log('NOT found:', find.slice(0, 40));
  }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/translations.ts', c, 'utf8');
console.log('Added to', count, 'languages');
console.log('pl ok:', c.includes('scenario: "Scenariusz zagro'));
console.log('en ok:', c.includes('scenario: "Hazard scenario"'));