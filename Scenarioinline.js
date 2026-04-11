const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// 1. Remove scenario field from new entry form
const scenarioFormField = `\n                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>{t('analysis.scenario') || 'Scenariusz zagro\u017cenia'}</label><input value={newEntry.scenario || ''} onChange={e => setNewEntry(p => ({ ...p, scenario: e.target.value }))} style={{ ...inputStyle, width: '100%' }} placeholder='Kiedy / sytuacja / odleg\u0142o\u015b\u0107 operatora...' /></div>`;
c = c.split(scenarioFormField).join('');
console.log('form field removed, remaining:', (c.match(/newEntry\.scenario/g)||[]).length);

// 2. Find the table rows where entries are displayed and add inline scenario editing
// Look for the action cell in table and add scenario input below it
const actionCell = `<td style={{ padding: '8px 10px', fontSize: '11px', color: '#8a99b0', maxWidth: '150px' }}>{e.action}</td>`;
const idx = c.indexOf(actionCell);
console.log('action cell found at:', idx);

if (idx > -1) {
  const scenarioCell = `
                          <td style={{ padding: '4px 10px 8px', fontSize: '10px', color: '#8a99b0' }} colSpan={9}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#4a5a72', fontSize: '10px', whiteSpace: 'nowrap' }}>{t('analysis.scenario') || 'Scenariusz'}:</span>
                              <input
                                value={e.scenario || ''}
                                onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, scenario: ev.target.value } : x))}
                                placeholder='Kiedy / sytuacja / odleg\u0142o\u015b\u0107 operatora...'
                                style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid #1e2d45', color: '#8a99b0', fontSize: '10px', padding: '2px 0', outline: 'none' }}
                              />
                            </div>
                          </td>`;
  
  // Find the closing </tr> after this action cell
  const trCloseIdx = c.indexOf('</tr>', idx);
  c = c.slice(0, trCloseIdx) + scenarioCell + '\n                        </tr>\n                        <tr>' + c.slice(trCloseIdx);
  console.log('inline scenario added to table');
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done:', c.includes('Kiedy / sytuacja'));