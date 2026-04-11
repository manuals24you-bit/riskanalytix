const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', 'utf8');

// 1. Add colScenario style
c = c.replace(
  "colN: { width: 18 }, colElement: { width: 88 }, colThreat: { width: 92 },\n  colEffect: { width: 75 }, colS: { width: 16 }, colP: { width: 16 },\n  colR: { width: 18 }, colLevel: { width: 48 }, colAction: { flex: 1 },",
  "colN: { width: 18 }, colElement: { width: 72 }, colThreat: { width: 76 },\n  colEffect: { width: 62 }, colS: { width: 16 }, colP: { width: 16 },\n  colR: { width: 18 }, colLevel: { width: 44 }, colScenario: { width: 80 }, colAction: { flex: 1 },"
);

// 2. Add scenario header in table
c = c.replace(
  "<Text style={[S.tableHeaderCell, S.colAction]}>{t.action}</Text>",
  "<Text style={[S.tableHeaderCell, S.colScenario]}>{t.scenario || 'Scenariusz'}</Text>\n            <Text style={[S.tableHeaderCell, S.colAction]}>{t.action}</Text>"
);

// 3. Add scenario cell in table rows
c = c.replace(
  "<Text style={[S.tableCell, S.colAction]}>{translated.action || ''}</Text>",
  "<Text style={[S.tableCell, S.colScenario, { color: '#6B7280', fontStyle: 'italic' }]}>{e.scenario || ''}</Text>\n                <Text style={[S.tableCell, S.colAction]}>{translated.action || ''}</Text>"
);

// 4. Add scenario to pdfTranslations - add to getPdfT return
// Already handled via t.scenario from translations

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/RiskReportPDF.tsx', c, 'utf8');
console.log('done:');
console.log('  colScenario style:', c.includes('colScenario:'));
console.log('  scenario header:', c.includes("t.scenario || 'Scenariusz'"));
console.log('  scenario cell:', c.includes('e.scenario'));