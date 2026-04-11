const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// 1. Add scenario column header
const oldHeaders = `{[t('analysis.colElement'), t('analysis.colThreat'), t('analysis.colEffect'), 'S', 'P', 'R', t('analysis.colLevel'), t('analysis.colAction'), ''].map((h, i) => (`;
const newHeaders = `{[t('analysis.colElement'), t('analysis.colThreat'), t('analysis.colEffect'), 'S', 'P', 'R', t('analysis.colLevel'), t('analysis.colAction'), t('analysis.scenario') || 'Scenariusz', ''].map((h, i) => (`;

c = c.replace(oldHeaders, newHeaders);
console.log('headers updated:', c.includes("t('analysis.scenario') || 'Scenariusz'"));

// 2. Add scenario cell after action cell, before delete button
const oldActionCell = `<td style={{ padding: '8px 10px', fontSize: '11px', color: '#8a99b0', maxWidth: '150px' }}>{e.action}</td>
                          <td style={{ padding: '8px 10px' }}><button onClick={() => removeEntry(e.id)}`;

const newActionCell = `<td style={{ padding: '8px 10px', fontSize: '11px', color: '#8a99b0', maxWidth: '150px' }}>{e.action}</td>
                          <td style={{ padding: '6px 8px', minWidth: '160px' }}>
                            <input
                              value={e.scenario || ''}
                              onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, scenario: ev.target.value } : x))}
                              placeholder='Kiedy / sytuacja...'
                              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #1e2d45', color: '#8a99b0', fontSize: '10px', padding: '2px 0', outline: 'none', width: '100%' }}
                            />
                          </td>
                          <td style={{ padding: '8px 10px' }}><button onClick={() => removeEntry(e.id)}`;

c = c.replace(oldActionCell, newActionCell);
console.log('scenario cell added:', c.includes("e.scenario || ''"));

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done');