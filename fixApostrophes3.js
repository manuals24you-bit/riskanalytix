const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');

const replacements = [
  ["d'usinage", "d\u2019usinage"],
  ["d'observation", "d\u2019observation"],
  ["d'arr\u00eat", "d\u2019arr\u00eat"],
  ["d'axe", "d\u2019axe"],
  ["d'huile", "d\u2019huile"],
  ["l'outil", "l\u2019outil"],
  ["l'huile", "l\u2019huile"],
  ["de l'", "de l\u2019"],
  ["du l'", "du l\u2019"],
  ["Enlèvement des copeaux", "Enl\u00e8vement des copeaux"],
];

let count = 0;
for (const [from, to] of replacements) {
  const before = c;
  c = c.split(from).join(to);
  if (c !== before) { count++; console.log('Fixed:', from); }
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');
console.log('Total fixed:', count);