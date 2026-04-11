const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Replace scenario: '' with tpl.scenario || '' when adding from template
c = c.split("action: tpl.actions[0] || '', scenario: '', sortOrder: p.length,")
     .join("action: tpl.actions[0] || '', scenario: tpl.scenario || '', sortOrder: p.length,");

c = c.split("action: tpl.actions[0] || '', scenario: '', sortOrder: p.length + i,")
     .join("action: tpl.actions[0] || '', scenario: tpl.scenario || '', sortOrder: p.length + i,");

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done:', c.includes('tpl.scenario'));