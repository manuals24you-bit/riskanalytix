const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Fix missing scenario in reset
c = c.replace(
  "setNewEntry({ element: '', threat: '', effect: '', s: 3, p: 2, action: '' })",
  "setNewEntry({ element: '', threat: '', effect: '', s: 3, p: 2, action: '', scenario: '' })"
);

// Find action input and add scenario field after it
const actionField = "t('analysis.action')}</label><input value={newEntry.action} onChange={e => setNewEntry(p => ({ ...p, action: e.target.value }))} style={inputStyle} /></div>";
const idx = c.indexOf(actionField);

if (idx === -1) {
  console.log('action field not found');
  process.exit(1);
}

const insertAfter = idx + actionField.length;
const scenarioField = `\n                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>{t('analysis.scenario') || 'Scenariusz zagro\u017cenia'}</label><input value={newEntry.scenario || ''} onChange={e => setNewEntry(p => ({ ...p, scenario: e.target.value }))} style={{ ...inputStyle, width: '100%' }} placeholder='Kiedy / w jakiej sytuacji / odleg\u0142o\u015b\u0107 operatora...' /></div>`;

c = c.slice(0, insertAfter) + scenarioField + c.slice(insertAfter);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done:', c.includes('Scenariusz zagro'));