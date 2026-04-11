const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');

// Fix French apostrophes - replace single quotes inside strings with escaped or unicode
const fixes = [
  ["de l'outil'", "de l\\'outil'"],
  ["de l'axe'", "de l\\'axe'"],
  ["d'axes'", "d\\'axes'"],
  ["de l'op\u00e9rateur'", "de l\\'op\u00e9rateur'"],
  ["de l'observation'", "de l\\'observation'"],
  ["de l'alimentation'", "de l\\'alimentation'"],
  ["d'huile'", "d\\'huile'"],
  ["de l'ing\u00e9stion'", "de l\\'ing\u00e9stion'"],
  ["du mandrin'", "du mandrin'"],  // ok
  // Fix all problematic apostrophes in fr section
];

// More robust fix - find all occurrences of unescaped apostrophes inside string values
// Pattern: find ' that is not at start/end of a string value
let fixCount = 0;

// Fix specific known issues
const problematicPatterns = [
  { from: "effect: '\u00c9jection de la pi\u00e8ce ou de l'outil' },", to: "effect: '\u00c9jection de la pi\u00e8ce ou de l\u2019outil' }," },
  { from: "threat: 'Erreur programme NC \u2014 collision d'axes'", to: "threat: 'Erreur programme NC \u2014 collision d\u2019axes'" },
  { from: "effect: 'D\u00e9g\u00e2ts machine, blessure op\u00e9rateur' },\n        l19", to: "effect: 'D\u00e9g\u00e2ts machine, blessure op\u00e9rateur' },\n        l19" },
  { from: "effect: 'Infortunio da errore di osservazione' },\n        l26", to: "effect: 'Infortunio da errore di osservazione' },\n        l26" },
];

// Find all strings with unescaped apostrophes in French/Italian sections
// Replace all ' inside { element/threat/effect: '...' } with unicode right single quote
const stringPattern = /('(?:element|threat|effect)':\s*')((?:[^'\\]|\\.)*?[^\\])'(\s*[,}])/g;

// Actually let's do a simpler targeted fix
// Find the exact problematic line
if (c.includes("de l'outil' },")) {
  c = c.replace("de l'outil' },", "de l\u2019outil' },");
  fixCount++;
}
if (c.includes("collision d'axes'")) {
  c = c.replace(/collision d'axes'/g, "collision d\u2019axes'");
  fixCount++;
}
if (c.includes("de l'alimentation'")) {
  c = c.replace(/de l'alimentation'/g, "de l\u2019alimentation'");
  fixCount++;
}
if (c.includes("de l'ing\u00e9stion'")) {
  c = c.replace(/de l'ing\u00e9stion'/g, "de l\u2019ing\u00e9stion'");
  fixCount++;
}
if (c.includes("de l'observation'")) {
  c = c.replace(/de l'observation'/g, "de l\u2019observation'");
  fixCount++;
}
if (c.includes("de l'op\u00e9rateur'")) {
  c = c.replace(/de l'op\u00e9rateur'/g, "de l\u2019op\u00e9rateur'");
  fixCount++;
}
if (c.includes("de l'outil'")) {
  c = c.replace(/de l'outil'/g, "de l\u2019outil'");
  fixCount++;
}
// Italian  
if (c.includes("dell'utensile'")) {
  c = c.replace(/dell'utensile'/g, "dell\u2019utensile'");
  fixCount++;
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');
console.log('Fixed', fixCount, 'apostrophes');
