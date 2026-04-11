const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find e.action cell
const marker = "{e.action}</td>";
const idx = c.indexOf(marker);
console.log('e.action found at:', idx);
if (idx === -1) { process.exit(1); }

const endIdx = idx + marker.length;

const scenarioCell = `
                          <td style={{ padding: '6px 8px', minWidth: '160px' }}>
                            <input
                              value={e.scenario || ''}
                              onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, scenario: ev.target.value } : x))}
                              placeholder='Kiedy / sytuacja...'
                              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #1e2d45', color: '#8a99b0', fontSize: '10px', padding: '2px 0', outline: 'none', width: '100%' }}
                            />
                          </td>`;

c = c.slice(0, endIdx) + scenarioCell + c.slice(endIdx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done:', c.includes('e.scenario'));
