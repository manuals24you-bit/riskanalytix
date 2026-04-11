const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

const old = 'scenario: e.scenario || null, riskMethod:';
const newVal = 'scenario: e.scenario || null, justificationS: e.justificationS || null, justificationP: e.justificationP || null, riskMethod:';

if (c.includes(old)) {
  c = c.replace(old, newVal);
  console.log('fixed');
} else {
  // Find what's there
  const idx = c.indexOf('scenario: e.scenario');
  console.log('scenario at:', idx, c.slice(idx, idx + 80));
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('justificationS in api:', c.includes('justificationS: e.justificationS'));