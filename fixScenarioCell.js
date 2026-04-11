const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

// Fix scenario cell - use tr(e).scenario
const oldCell = `<Text style={[S.tableCell, S.colScenario, { color: '#6B7280',  }]}>{translated.scenario || e.scenario || ''}</Text>`;
const newCell = `<Text style={[S.tableCell, S.colScenario, { color: '#6B7280' }]}>{tr(e).scenario || e.scenario || ''}</Text>`;

if (c.includes(oldCell)) {
  c = c.replace(oldCell, newCell);
  console.log('cell fixed');
} else {
  // Try finding just the scenario cell pattern
  const idx = c.indexOf('colScenario, { color:');
  console.log('found at:', idx);
  console.log('context:', c.slice(idx, idx+120));
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', c, 'utf8');