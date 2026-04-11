const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

// Remove duplicate scenario header
const header = `\n            <Text style={[S.tableHeaderCell, S.colScenario]}>{t.scenario || 'Scenariusz'}</Text>`;
const firstHeader = c.indexOf(header);
const secondHeader = c.indexOf(header, firstHeader + 1);
if (secondHeader > -1) {
  c = c.slice(0, secondHeader) + c.slice(secondHeader + header.length);
  console.log('duplicate header removed');
}

// Remove duplicate scenario cell
const cell = `\n                <Text style={[S.tableCell, S.colScenario, { color: '#6B7280',  }]}>{e.scenario || ''}</Text>`;
const firstCell = c.indexOf(cell);
const secondCell = c.indexOf(cell, firstCell + 1);
if (secondCell > -1) {
  c = c.slice(0, secondCell) + c.slice(secondCell + cell.length);
  console.log('duplicate cell removed');
}

// Also check scenario in translated entries - e.scenario needs translated scenario
// Replace e.scenario with (translated.scenario || e.scenario || '')
c = c.replace(
  "{e.scenario || ''}",
  "{translated.scenario || e.scenario || ''}"
);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', c, 'utf8');
console.log('done');
console.log('scenario headers:', (c.match(/colScenario.*Scenariusz/g)||[]).length);
console.log('scenario cells:', (c.match(/colScenario.*e\.scenario/g)||[]).length);