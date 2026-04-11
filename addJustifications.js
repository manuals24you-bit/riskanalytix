const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find the closing of each table row in step 3 and add justification row after it
// Look for the pattern: </tr> after the entries map rows
// Actually better: find the end of each <tr> in the entries map and add a second row

// Find the return statement in entries.map to add justification row
const step3 = c.indexOf('STEP 3');
const entriesMap = c.indexOf('entries.map', step3);
const trClose = c.indexOf('                        </tr>', entriesMap);
console.log('tr close at:', trClose);
console.log('context:', JSON.stringify(c.slice(trClose - 50, trClose + 40)));

// Insert justification row after the </tr>
const justificationRow = `
                        {/* Justification row */}
                        {(e.justificationS || e.justificationP || getRiskLevel(e.severity, e.probability).cls === 'high') && (
                          <tr key={e.id + '-just'} style={{ borderBottom: '1px solid rgba(30,45,69,.6)', background: 'rgba(232,168,56,.03)' }}>
                            <td colSpan={10} style={{ padding: '6px 10px' }}>
                              <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: '9px', color: '#4a5a72', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '3px' }}>Uzasadnienie S ({e.severity})</div>
                                  <input
                                    value={e.justificationS || ''}
                                    onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, justificationS: ev.target.value } : x))}
                                    placeholder="np. możliwość amputacji przy kontakcie z wrzecionem"
                                    style={{ width: '100%', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '4px 8px', fontSize: '11px', boxSizing: 'border-box' }}
                                  />
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: '9px', color: '#4a5a72', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '3px' }}>Uzasadnienie P ({e.probability})</div>
                                  <input
                                    value={e.justificationP || ''}
                                    onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, justificationP: ev.target.value } : x))}
                                    placeholder="np. codzienny kontakt operatora ze strefą zagrożenia"
                                    style={{ width: '100%', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '4px 8px', fontSize: '11px', boxSizing: 'border-box' }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}`;

// Insert always (not conditionally) for better UX - show both fields always
const justificationRowAlways = `
                        {/* Justification row */}
                        <tr key={e.id + '-just'} style={{ borderBottom: '1px solid rgba(30,45,69,.6)', background: 'rgba(232,168,56,.03)' }}>
                          <td colSpan={10} style={{ padding: '6px 10px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '9px', color: e.justificationS ? '#E8A838' : '#E84040', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '3px' }}>
                                  Uzasadnienie S {!e.justificationS && <span style={{ color: '#E84040' }}>*wymagane</span>}
                                </div>
                                <input
                                  value={e.justificationS || ''}
                                  onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, justificationS: ev.target.value } : x))}
                                  placeholder="np. możliwość amputacji przy kontakcie z wrzecionem"
                                  style={{ width: '100%', background: '#0B0F1A', border: \`1px solid \${e.justificationS ? '#1e2d45' : '#E84040'}\`, borderRadius: '4px', color: '#F0EDE8', padding: '4px 8px', fontSize: '11px', boxSizing: 'border-box' }}
                                />
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '9px', color: e.justificationP ? '#E8A838' : '#E84040', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '3px' }}>
                                  Uzasadnienie P {!e.justificationP && <span style={{ color: '#E84040' }}>*wymagane</span>}
                                </div>
                                <input
                                  value={e.justificationP || ''}
                                  onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, justificationP: ev.target.value } : x))}
                                  placeholder="np. codzienny kontakt operatora ze strefą zagrożenia"
                                  style={{ width: '100%', background: '#0B0F1A', border: \`1px solid \${e.justificationP ? '#1e2d45' : '#E84040'}\`, borderRadius: '4px', color: '#F0EDE8', padding: '4px 8px', fontSize: '11px', boxSizing: 'border-box' }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>`;

c = c.slice(0, trClose + 30) + justificationRowAlways + c.slice(trClose + 30);

// Also add validation - block step 4 if any entry missing justification
// Find the "next step" button in step 3
const nextStep4Btn = c.indexOf("setStep(4)", c.indexOf('STEP 3'));
const nextStep4BtnFull = c.lastIndexOf('<button', nextStep4Btn);
console.log('next step4 btn at:', nextStep4BtnFull);

// Add disabled condition
c = c.replace(
  "onClick={() => setStep(4)} style={{ padding: '11px 28px', borderRadius: '6px', border: 'none', background: '#E8A838'",
  "onClick={() => { const missing = entries.some(e => !e.justificationS || !e.justificationP); if (missing) { alert('Uzupełnij uzasadnienia S i P dla wszystkich zagrożeń'); return; } setStep(4); }} style={{ padding: '11px 28px', borderRadius: '6px', border: 'none', background: '#E8A838'"
);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done, justificationS in file:', c.includes('justificationS'));