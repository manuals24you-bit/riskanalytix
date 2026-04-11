const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

const marker = `            <div style={{ display: 'flex', justifyContent: 'space-between' }}>\n              <button onClick={() => setStep(2)}`;

const residualTable = `
            {entries.length > 0 && (
              <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e2d45', fontSize: '10px', color: '#E8A838', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                  {t('analysis.residualRisk') || 'Ryzyko resztkowe po zastosowaniu środków ochronnych'}
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {[t('analysis.colElement'), t('analysis.colAction'), t('analysis.residualReduction') || 'Poziom redukcji', 'S', 'P\'', 'R\'', t('analysis.colLevel')].map((h, i) => (
                        <th key={i} style={{ textAlign: 'left', fontSize: '9px', color: '#8a99b0', padding: '8px 10px', borderBottom: '1px solid #1e2d45', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map(e => {
                      const reductionLevel = e.reductionLevel || 'none';
                      const resS = e.severity;
                      const resP = reductionLevel === 'high' ? Math.max(e.probability - 2, 1) : reductionLevel === 'medium' ? Math.max(e.probability - 1, 1) : e.probability;
                      const resR = resS * resP;
                      const resRisk = getRiskLevel(resS, resP);
                      return (
                        <tr key={e.id} style={{ borderBottom: '1px solid rgba(30,45,69,.4)' }}>
                          <td style={{ padding: '8px 10px', fontSize: '11px', color: '#F0EDE8', maxWidth: '120px' }}>{translateRiskEntry(e, (localStorage.getItem('i18nextLng') || 'pl') as any).element}</td>
                          <td style={{ padding: '8px 10px', fontSize: '10px', color: '#8a99b0', maxWidth: '140px' }}>{e.action}</td>
                          <td style={{ padding: '6px 8px' }}>
                            <select
                              value={e.reductionLevel || 'none'}
                              onChange={ev => {
                                const level = ev.target.value;
                                const newP = level === 'high' ? Math.max(e.probability - 2, 1) : level === 'medium' ? Math.max(e.probability - 1, 1) : e.probability;
                                const newR = e.severity * newP;
                                setEntries(p => p.map(x => x.id === e.id ? { ...x, reductionLevel: level, residualS: e.severity, residualP: newP, residualR: newR } : x));
                              }}
                              style={{ background: '#0B0F1A', border: '1px solid #1e2d45', borderRadius: '4px', color: '#F0EDE8', padding: '3px 6px', fontSize: '10px' }}
                            >
                              <option value="none">{t('analysis.reductionNone') || '— brak —'}</option>
                              <option value="high">{t('analysis.reductionHigh') || 'Wysoki (P-2)'}</option>
                              <option value="medium">{t('analysis.reductionMedium') || 'Średni (P-1)'}</option>
                              <option value="low">{t('analysis.reductionLow') || 'Niski (info)'}</option>
                            </select>
                          </td>
                          <td style={{ padding: '8px 10px', fontSize: '12px', color: '#F0EDE8' }}>{resS}</td>
                          <td style={{ padding: '8px 10px', fontSize: '12px', color: reductionLevel !== 'none' ? '#34C77B' : '#F0EDE8' }}>{resP}</td>
                          <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: 700, color: riskColor(resRisk.cls) }}>{resR}</td>
                          <td style={{ padding: '8px 10px' }}>
                            <span style={{ background: riskBg(resRisk.cls), color: riskColor(resRisk.cls), border: \`1px solid \${riskColor(resRisk.cls)}44\`, padding: '2px 7px', borderRadius: '3px', fontSize: '10px', fontFamily: 'monospace' }}>{riskLabel(resRisk.cls)}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
`;

const idx = c.indexOf(marker);
if (idx === -1) {
  console.log('marker not found');
  process.exit(1);
}

c = c.slice(0, idx) + residualTable + c.slice(idx);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done:', c.includes('residualRisk'));