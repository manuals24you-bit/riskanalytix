const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');

// Replace all unescaped apostrophes inside string values in the French section
// These are patterns like d'outils, d'axe, l'outil, etc.
const replacements = [
  ["d'outils", "d\u2019outils"],
  ["d'axe ", "d\u2019axe "],
  ["d'axe'", "d\u2019axe'"],
  ["d'un ", "d\u2019un "],
  ["d'une ", "d\u2019une "],
  ["l'outil", "l\u2019outil"],
  ["l'op\u00e9rateur", "l\u2019op\u00e9rateur"],
  ["l'observation", "l\u2019observation"],
  ["l'alimentation", "l\u2019alimentation"],
  ["l'ing\u00e9stion", "l\u2019ing\u00e9stion"],
  ["l'outil", "l\u2019outil"],
  ["dell'utensile", "dell\u2019utensile"],
  ["de l'huile", "de l\u2019huile"],
];

let count = 0;
for (const [from, to] of replacements) {
  const before = c;
  c = c.split(from).join(to);
  if (c !== before) count++;
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');
console.log('Fixed', count, 'patterns');