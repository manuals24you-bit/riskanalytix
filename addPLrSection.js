const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find insertion point - before the navigation buttons in step 3
// We know residual table ends before navigation buttons
// Find the step 3 navigation div (setStep(3) going back, setStep(4) going forward)
const step3NavMarker = "onClick={() => setStep(3)} style={{ padding: '11px 22px'";
const step3NavIdx = c.indexOf(step3NavMarker);
console.log('step3 nav at:', step3NavIdx);

// Find the container div before the nav buttons
const navDivIdx = c.lastIndexOf('<div style={{ display:', step3NavIdx);
console.log('nav div at:', navDivIdx);

// PLr calculation function - Tab.K.1 ISO 13849-1
const plrSection = `
            {entries.length > 0 && (
              <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e2d45', background: 'rgba(52,199,123,.06)' }}>
                  <span style={{ fontSize: '10px', color: '#34C77B', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                    PLr / ISO 13849-1 — Wymagany poziom zapewnienia bezpiecze\u0144stwa
                  </span>
                </div>
                <div style={{ padding: '10px 16px 14px', borderBottom: '1px solid #1e2d45', fontSize: '11px', color: '#6B7280', lineHeight: 1.6 }}>
                  PLr obliczany automatycznie z Tab.K.1 wg ISO 13849-1:2023 na podstawie S (ci\u0119\u017cko\u015b\u0107) i F (ekspozycja/P z analizy). Parametr P (mo\u017cliwo\u015b\u0107 unikni\u0119cia)
                  {' '}<strong style={{ color: '#E8A838' }}>domy\u015blnie P2</strong> (konserwatywny — bezpieczniejszy).
                  {user?.subscription === 'PRO' || user?.role === 'ADMIN' ? ' Mo\u017cesz zmieni\u0107 na P1 per zagro\u017cenie.' : ' Zmiana na P1 dost\u0119pna w planie PRO.'}
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Element', 'S', 'F (z P)', 'P (unikni\u0119cie)', 'PLr (auto)', 'PLr (korekta)', 'PL osi\u0105gni\u0119ty', 'Kategoria'].map((h, i) => (
                        <th key={i} style={{ textAlign: 'left', fontSize: '9px', color: '#8a99b0', padding: '8px 10px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((e) => {
                      const lang2 = (localStorage.getItem('i18nextLng') || 'pl') as any;
                      const sParam = e.severity >= 3 ? 'S2' : 'S1';
                      const fParam = e.probability >= 3 ? 'F2' : 'F1';
                      const pParam = e.plrP || 'P2';
                      // Tab.K.1 ISO 13849-1
                      const plrMap: Record<string, string> = {
                        'S1-F1-P1': 'a', 'S1-F1-P2': 'b', 'S1-F2-P1': 'b', 'S1-F2-P2': 'c',
                        'S2-F1-P1': 'c', 'S2-F1-P2': 'd', 'S2-F2-P1': 'd', 'S2-F2-P2': 'e',
                      };
                      const plrAuto = plrMap[\`\${sParam}-\${fParam}-\${pParam}\`] || 'b';
                      const plrColor = (pl: string) => pl === 'e' ? '#E84040' : pl === 'd' ? '#F59E0B' : pl === 'c' ? '#E8A838' : '#34C77B';
                      return (
                        <tr key={e.id} style={{ borderBottom: '1px solid rgba(30,45,69,.4)' }}>
                          <td style={{ padding: '7px 10px', fontSize: '11px', fontWeight: 600, color: '#F0EDE8', maxWidth: '110px' }}>{translateRiskEntry(e, lang2).element}</td>
                          <td style={{ padding: '7px 10px', fontSize: '11px', color: '#8a99b0' }}>{sParam}</td>
                          <td style={{ padding: '7px 10px', fontSize: '11px', color: '#8a99b0' }}>{fParam}</td>
                          <td style={{ padding: '7px 10px' }}>
                            {(user?.subscription === 'PRO' || user?.role === 'ADMIN') ? (
                              <select value={pParam} onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, plrP: ev.target.value } : x))}
                                style={{ background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '2px 4px', fontSize: '10px' }}>
                                <option value="P1">P1 — mo\u017cliwe</option>
                                <option value="P2">P2 — niemożliwe</option>
                              </select>
                            ) : (
                              <span style={{ fontSize: '10px', color: '#6B7280' }}>P2 <span style={{ color: '#E8A838', fontSize: '9px' }}>PRO</span></span>
                            )}
                          </td>
                          <td style={{ padding: '7px 10px' }}>
                            <span style={{ background: \`\${plrColor(plrAuto)}22\`, color: plrColor(plrAuto), border: \`1px solid \${plrColor(plrAuto)}44\`, padding: '2px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 700, fontFamily: 'monospace' }}>
                              PL {plrAuto.toUpperCase()}
                            </span>
                          </td>
                          <td style={{ padding: '7px 10px' }}>
                            <input value={e.plrManual || ''} onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, plrManual: ev.target.value } : x))}
                              placeholder="a-e"
                              style={{ width: '44px', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#E8A838', padding: '3px 6px', fontSize: '11px', textAlign: 'center', fontFamily: 'monospace' }} />
                          </td>
                          <td style={{ padding: '7px 10px' }}>
                            <input value={e.plAchieved || ''} onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, plAchieved: ev.target.value } : x))}
                              placeholder="a-e"
                              style={{ width: '44px', background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#34C77B', padding: '3px 6px', fontSize: '11px', textAlign: 'center', fontFamily: 'monospace' }} />
                          </td>
                          <td style={{ padding: '7px 10px' }}>
                            <select value={e.plCategory || ''} onChange={ev => setEntries(p => p.map(x => x.id === e.id ? { ...x, plCategory: ev.target.value } : x))}
                              style={{ background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '2px 4px', fontSize: '10px' }}>
                              <option value="">—</option>
                              {['B','1','2','3','4'].map(v => <option key={v} value={v}>Kat. {v}</option>)}
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ padding: '10px 16px', borderTop: '1px solid #1e2d45', fontSize: '10px', color: '#4a5a72', lineHeight: 1.6 }}>
                  ⚠️ PLr obliczony z domy\u015blnym P=P2 (konserwatywnym). Ostateczna ocena parametru P nale\u017cy do producenta maszyny lub certyfikowanego specjalisty BHP. Narz\u0119dzie ma charakter wy\u0142\u0105cznie wspomagaj\u0105cy.
                </div>
              </div>
            )}
`;

c = c.slice(0, navDivIdx) + plrSection + c.slice(navDivIdx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('PLr section added:', c.includes('PLr / ISO 13849-1'));