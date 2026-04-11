const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find all scenario div occurrences
const scenarioDiv1 = `\n                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>{t('analysis.scenario') || 'Scenariusz zagro\u017cenia'}</label><input value={newEntry.scenario || ''} onChange={e => setNewEntry(p => ({ ...p, scenario: e.target.value }))} style={{ ...inputStyle, width: '100%' }} placeholder='Kiedy / sytuacja / odleg\u0142o\u015b\u0107 operatora...' /></div>`;

const scenarioDiv2 = `\n                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>{t('analysis.scenario') || 'Scenariusz zagro\u017cenia'}</label><input value={newEntry.scenario || ''} onChange={e => setNewEntry(p => ({ ...p, scenario: e.target.value }))} style={{ ...inputStyle, width: '100%' }} placeholder='Kiedy / w jakiej sytuacji / odleg\u0142o\u015b\u0107 operatora...' /></div>`;

// Count occurrences
const count1 = c.split(scenarioDiv1).length - 1;
const count2 = c.split(scenarioDiv2).length - 1;
console.log('div1 count:', count1, 'div2 count:', count2);

// Remove all occurrences of div1
while (c.includes(scenarioDiv1)) {
  c = c.replace(scenarioDiv1, '');
}
// Remove all occurrences of div2
while (c.includes(scenarioDiv2)) {
  c = c.replace(scenarioDiv2, '');
}

// Insert exactly one after action field
const marker = "t('analysis.action')}</label><input value={newEntry.action} onChange={e => setNewEntry(p => ({ ...p, action: e.target.value }))} style={inputStyle} /></div>";
const idx = c.indexOf(marker);
if (idx > -1) {
  const insertAfter = idx + marker.length;
  const scenarioField = `\n                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>{t('analysis.scenario') || 'Scenariusz zagro\u017cenia'}</label><input value={newEntry.scenario || ''} onChange={e => setNewEntry(p => ({ ...p, scenario: e.target.value }))} style={{ ...inputStyle, width: '100%' }} placeholder='Kiedy / sytuacja / odleg\u0142o\u015b\u0107 operatora...' /></div>`;
  c = c.slice(0, insertAfter) + scenarioField + c.slice(insertAfter);
  console.log('inserted once');
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');

// Verify
const finalCount = (c.match(/gridColumn: 'span 2'.*scenario/g) || []).length;
console.log('final scenario divs:', finalCount);
