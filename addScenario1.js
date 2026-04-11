const fs = require('fs');

// 1. Add scenario to RiskEntry type
let types = fs.readFileSync('C:/Projects/riskpro/frontend/src/types/index.ts', 'utf8');
types = types.replace(
  '  action:      string\n  sortOrder:   number',
  '  action:      string\n  scenario?:   string\n  sortOrder:   number'
);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/types/index.ts', types, 'utf8');
console.log('types updated:', types.includes('scenario?:'));

// 2. Add scenario to newEntry state and addEntry functions in NewAnalysisPage.tsx
let page = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Add scenario to newEntry initial state
page = page.replace(
  "const [newEntry, setNewEntry] = useState({ element: '', threat: '', effect: '', s: 3, p: 2, action: '' })",
  "const [newEntry, setNewEntry] = useState({ element: '', threat: '', effect: '', s: 3, p: 2, action: '', scenario: '' })"
);

// Add scenario when adding from template (single)
page = page.replace(
  /action: tpl\.actions\[0\] \|\| '', sortOrder: p\.length,/,
  "action: tpl.actions[0] || '', scenario: '', sortOrder: p.length,"
);

// Add scenario when adding from template (multiple)
page = page.replace(
  /action: tpl\.actions\[0\] \|\| '', sortOrder: p\.length \+ i,/,
  "action: tpl.actions[0] || '', scenario: '', sortOrder: p.length + i,"
);

// Add scenario when adding custom entry
page = page.replace(
  "action: newEntry.action, sortOrder: p.length,",
  "action: newEntry.action, scenario: newEntry.scenario || '', sortOrder: p.length,"
);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', page, 'utf8');
console.log('NewAnalysisPage updated');