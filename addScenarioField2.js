const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

const marker = "t('analysis.action')}</label><input value={newEntry.action} onChange={e => setNewEntry(p => ({ ...p, action: e.target.value }))} style={inputStyle} /></div>";
const idx = c.indexOf(marker);
console.log('marker found at:', idx);

if (idx === -1) { process.exit(1); }

const insertAfter = idx + marker.length;
const scenarioField = `\n                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>{t('analysis.scenario') || 'Scenariusz zagro\u017cenia'}</label><input value={newEntry.scenario || ''} onChange={e => setNewEntry(p => ({ ...p, scenario: e.target.value }))} style={{ ...inputStyle, width: '100%' }} placeholder='Kiedy / sytuacja / odleg\u0142o\u015b\u0107 operatora...' /></div>`;

c = c.slice(0, insertAfter) + scenarioField + c.slice(insertAfter);

// Also fix missing scenario in state reset
c = c.replace(
  "setNewEntry({ element: '', threat: '', effect: '', s: 3, p: 2, action: '' })",
  "setNewEntry({ element: '', threat: '', effect: '', s: 3, p: 2, action: '', scenario: '' })"
);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done:', c.includes('Scenariusz zagro'));